const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { llavesecreta } = require('./llave_secreta')

const { registrarUsuario, verificaCredenciales, datosUsuario } = require('./consultas')
const { verificarExistenciaCredenciales, validaToken, reporteConsulta } = require('./middlewares')
const app = express()

app.listen(3000, () => { console.log('servidor corriendo!') })
app.use(cors())
app.use(express.json())
app.use(reporteConsulta)

app.post('/usuarios', verificarExistenciaCredenciales , async (req, res) => {    
    try {
        const { email, password, rol, lenguage } = req.body
        await registrarUsuario(email, password, rol, lenguage)
        res.send('usuario registrado con éxito!')
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
})

app.post('/login', verificarExistenciaCredenciales ,  async (req, res) => {
    try {
        const { email, password } = req.body
        await verificaCredenciales(email, password)
        const token = jwt.sign({ email }, llavesecreta)
        res.send(token)
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)        
    }
})

app.get('/usuarios', validaToken, async (req, res) => {
    try {
        const Authorization = req.header('Authorization')
        const token = Authorization.split("Bearer ")[1]
        const {email} = jwt.decode(token)
        const usuario = await datosUsuario(email)
        res.json(usuario)
    } catch (error) {
        res.status(error.code || 500).send(error)
    }
})
