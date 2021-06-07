const jwt = require('jsonwebtoken');
const secret = "Trigmongos team";

const authenticate = (req, res, next) => {

    try {

        if(!req.headers.authorization){
            // return new Error("No tienes autorización");
            throw new Error("No tenías token");
        }

        let token = req.headers.authorization.split(' ')[1];

        let auth = jwt.verify(token,secret);

        if((auth.dentistId != req.body.dentist) && auth.isAdmin != true){
            throw new Error("No tienes permiso para realizar esta acción de usuario");
        }

        return next();

    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }

}


module.exports = authenticate;