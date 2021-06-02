const Dentist = require('../models/dentist');

class Professional {

    constructor(){

    }

    async findAllDentists() {
        return Dentist.find();
    }



};

let dentistController = new Professional();
module.exports = dentistController;