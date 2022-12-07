const IS_ADMIN = false

const verifyRole = (req, res, next) => {
    if (!IS_ADMIN) return res.send({ error: 'NO TIENE LOS PERMISOS NECESARIOS PARA ACCEDER A LA RUTA SOLICITADA' })
    next()
}

//export { verifyRole }
module.exports = {verifyRole}