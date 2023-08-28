const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const options = new chrome.Options();
options.headless(); // sin interfaz gráfica

const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

  describe('Web App Tests', function () {
  this.timeout(30000); 

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('inicio sesión correctamente', async function () {
    await driver.get('https://service-tp-selenium.onrender.com/');
    await driver.sleep(1000);
    const titulo = await driver.getTitle();
    assert.strictEqual(titulo, 'Log In');
    await driver.findElement(By.id('email')).sendKeys('jaimito@gmail.com');
    await driver.sleep(2000);
    await driver.findElement(By.id('password')).sendKeys('1234', Key.RETURN);
    await driver.sleep(2000); 
  });

  it('carga la página de inicio correctamente', async function () {
    await driver.get('https://service-tp-selenium.onrender.com/home')
    await driver.sleep(1000);
    const titulo = await driver.getTitle();
    assert.strictEqual(titulo, 'Home');
  });

  it('anda la barra de navegacion correctamente', async function () {
    const enlances = [
        {id: 'productos', titulo: 'Productos'},
        {id: 'descripcion', titulo: 'Descripcion'},
        {id: 'home', titulo: 'Home'}
    ];
    await driver.get('https://service-tp-selenium.onrender.com/home');
    for (const enlace of enlances) {
        await driver.findElement(By.id(enlace.id)).click();
        await driver.sleep(1000);
        const titulo = await driver.getTitle();
        assert.strictEqual(titulo, enlace.titulo);
    }
  });

  it('funciona la página de productos correctamente', async function () {
    await driver.get('https://service-tp-selenium.onrender.com/productos')
    await driver.sleep(1000);
    const titulo = await driver.getTitle();
    assert.strictEqual(titulo, 'Productos');
    const nombreProductoInput = await driver.findElement(By.name('nombre_producto'));
    await nombreProductoInput.sendKeys('Producto de prueba');
    await driver.sleep(1000);

    const descripcionInput = await driver.findElement(By.name('descripcion'));
    await descripcionInput.sendKeys('Descripción de prueba');
    await driver.sleep(1000);

    const precioInput = await driver.findElement(By.name('precio'));
    await precioInput.sendKeys('10');
    await driver.sleep(1000);

    const cantidadInput = await driver.findElement(By.name('cantidad'));
    await cantidadInput.sendKeys('5');
    await driver.sleep(1000);

    const enviarButton = await driver.findElement(By.css('input[type="submit"]'));
    await enviarButton.click();
    await driver.sleep(1000);

    const mensajeProductoCreado = await driver.findElement(By.xpath('//h1[text()="Producto creado"]'));
    assert.ok(mensajeProductoCreado);
  });

  it('sale de la cuenta correctamente', async function () {
    await driver.get('https://service-tp-selenium.onrender.com/home')
    await driver.sleep(1000);
    const titulo = await driver.getTitle();
    assert.strictEqual(titulo, 'Home');
    await driver.findElement(By.id('goOut')).click();
    await driver.sleep(1000);
    const titulo2 = await driver.getTitle();
    assert.strictEqual(titulo2, 'Log In');
   });
});
