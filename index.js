const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 9090

const usuarios = {
        email: 'jaimito@gmail.com',
        password: '1234'
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    let title = "<title>Log In</title>"
    let formulario = "<form action='/ingreso' method='post'>"
    formulario += "<input type='email' name='email' id='email' placeholder='Ingrese su email'>"
    formulario += "<input type='password' name='password' id='password' placeholder='Ingrese su contraseña'>"
    formulario += "<input type='submit' value='Enviar'>"
    formulario += "</form>"
    res.send(title + formulario)
})

app.get('/descripcion', (req, res) => {
    let title = "<title>Descripcion</title>"
    let navbar = "<a id='home' href='/home'>Inicio</a>"
        navbar += "<br>"
        navbar += "<a id='productos' href='/productos'>Productos</a>"
        navbar += "<br>"
        navbar += "<a id='descripcion' href='/descripcion'>Descripcion</a>"
    let descripcion = "<h1>Descripcion</h1>"
        descripcion += "<p>Esta pagina agrega productos :)</p>"
    res.send(title + navbar + descripcion)
})

app.get('/home', (req, res) => {
    let title = "<title>Home</title>"
    let navbar = "<a id='home' href='/home'>Inicio</a>"
        navbar += "<br>"
        navbar += "<a id='productos' href='/productos'>Productos</a>"
        navbar += "<br>"
        navbar += "<a id='descripcion' href='/descripcion'>Descripcion</a>"
    let home = "<h1>Bienvenido a la pagina de inicio</h1>"
    home += "<button><a id='goOut' href='/'>salir de la pagina</a></button>"
    res.send(title + navbar + home)
})

app.get('/productos', (req, res) => {
    let title = "<title>Productos</title>"
    let navbar = "<a id='home' href='/home'>Inicio</a>"
        navbar += "<br>"
        navbar += "<a id='productos' href='/productos'>Productos</a>"
        navbar += "<br>"
        navbar += "<a id='descripcion' href='/descripcion'>Descripcion</a>"
    let formulario = "<form action='/productos' method='post'>"
        formulario += "<input type='text' name='nombre_producto' placeholder='Ingrese el nombre del producto'>"
        formulario += "<input type='text' name='descripcion' placeholder='Ingrese la descripcion del producto'>"
        formulario += "<input type='text' name='precio' placeholder='Ingrese el precio del producto'>"
        formulario += "<input type='number' name='cantidad' placeholder='Ingrese la cantidad del producto'>"
        formulario += "<input type='submit' value='Enviar'>"
        formulario += "</form>"
    res.send(title + navbar + formulario)
})

app.post('/ingreso', (req, res) => {
    if(req.body.email != usuarios.email || req.body.password != usuarios.password){
        let malInicio = "<h1>Usuario o contraseña incorrectos</h1>"
        malInicio += "<a href='/'>Volver a ingresar</a>"
        res.send(malInicio)
    } else {
        res.redirect('/home')
    }
})

app.post('/productos', (req, res) => {
    if(req.body.nombre_producto == '' || req.body.descripcion == '' || req.body.precio == '' || req.body.cantidad == ''){
        res.redirect('/productos')
    }
    let navbar = "<a id='home' href='/home'>Inicio</a>"
        navbar += "<br>"
        navbar += "<a id='productos' href='/productos'>Productos</a>"
        navbar += "<br>"
        navbar += "<a id='descripcion' href='/descripcion'>Descripcion</a>"
    let producto = "<h1>Producto creado</h1>"
    res.send(navbar + producto)
})
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
})