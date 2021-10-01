const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //Leer token
    const token = req.header('x-token');

    console.log(token);

    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No hay token de acceso'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT
}