const jwt = require('jsonwebtoken')
const { llavesecreta } = require('./llave_secreta')

const verificarExistenciaCredenciales =  (req, res, next) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(409).send('No se encontró email o password!!!')
        console.log('No se encontró email o password!!!')
        // throw { code: 401, message: "throw por Email o password sin dato!", status: 402, error: "error throw No se encontró email o password sin dato!" }
        throw{}//no veo donde aparecen los datos code , message, status, error
    }
    next()
}
const validaToken =  (req, res, next) => {
    try {
        const Authorization = req.header('Authorization')
        const token = Authorization.split("Bearer ")[1]
        if (!token) {
            res.status(404).send('No se encontró el Token!')
            throw {}
        }    
        jwt.verify(token, llavesecreta)
        next()
    } catch (error) {
        res.status(525).send('problemas con el token!!!')
        console.log('problemas con el token!!!')
        throw{}
    }
}
const reporteConsulta =  (req, res, next) => {
    const parametros = req.params
    const query = req.query
    const verbo = req.method
    const url = req.url
    const body = req.body
    const header = req.header('Authorization')
    console.log(`
        Hoy ${new Date()}
        Se ha recibido una consulta en la ruta app.${verbo}(${url})
        con los siguientes datos:
        `, {parametros} , {query}, {body}, {header})
        // `, {parametros} , {query}, {body})
    next()
}

module.exports = {verificarExistenciaCredenciales, validaToken, reporteConsulta}
