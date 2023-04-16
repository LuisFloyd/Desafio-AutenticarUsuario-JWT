const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'pgadmin2020',
    database: 'softjobs',
    allowExitOnIdle: true
})

const bcrypt = require('bcryptjs')

const registrarUsuario = async (email, password, rol, lenguage) => {
    const passwordEncriptada = await bcrypt.hashSync(password)
    const query = `INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)`
    const values = [email, passwordEncriptada, rol, lenguage]
    await pool.query(query, values)    
}

const verificaCredenciales = async (email, password) => {
    const query = `Select * from usuarios where email = $1`
    const values = [email]
    const { rows : [usuario],  rowCount } = await pool.query(query, values)
    if (rowCount === 0) { 
        throw { code: 401, message: "Email no existe!" }
    }
    const {password: passwordEncriptada} = usuario
    const passwordEsCorrecta = await bcrypt.compareSync(password, passwordEncriptada)
    if (!passwordEsCorrecta || !rowCount) 
        throw { code: 401, message: "contraseña incorrecta!" }
}

const datosUsuario = async (email) => {
    const query = `Select * from usuarios where email = $1`
    const values = [email]
    const { rows: [usuario], rowCount } = await pool.query(query, values)
    if (!rowCount) 
        throw { code: 404, message: "usuario no encontrado!" }
    delete usuario.password
    return usuario
}

module.exports = { registrarUsuario, verificaCredenciales, datosUsuario }
