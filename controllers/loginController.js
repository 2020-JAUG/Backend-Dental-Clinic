const clientsController = require('./clientsController');
const dentistController = require('./dentistController');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "Trigmongos team";


class LoginController {

    async validateClient(mailCheck,passwordCheck){
        
        let client = await clientsController.findByEmail(mailCheck);
        if (client == null){
            throw new Error('Wrong user or password');
        }
        let password = client.password;

        let verify = await bcrypt.compare(passwordCheck, password);

        if(!verify){
            throw new Error('Wrong user or password');
        }

        let payload = {
            clientId : client.id,
            createdAt: new Date,
            isAdmin: client.isAdmin,
        };

        return jwt.sign(payload, secret);
    }

    async validateDentist(mailCheck,passwordCheck){
        
        let dentist = await dentistController.findByEmail(mailCheck);
        if (dentist == null){
            throw new Error('Wrong user or password');
        }
        let password = dentist.password;

        let verify = await bcrypt.compare(passwordCheck, password);

        if(!verify){
            throw new Error('Wrong user or password');
        }

        let payload = {
            dentistId : dentist.id,
            createdAt: new Date,
            isAdmin: dentist.isAdmin,
        };

        return jwt.sign(payload, secret);
    }
}

const loginController = new LoginController();
module.exports = loginController;