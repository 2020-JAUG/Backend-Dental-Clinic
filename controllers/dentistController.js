const Dentist = require('../models/dentist');

class Professional {

    constructor(){

    }

    async findAllDentists() {
        return Dentist.find();
    }

    async createDentist(dentist){
        return Dentist.create(dentist);
    }



};

let dentistController = new Professional();
module.exports = dentistController;