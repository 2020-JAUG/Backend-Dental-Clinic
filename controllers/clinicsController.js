const Clinic = require('../models/clinic');

class Hospital {

    constructor(){

    }

    async findAllClinics() {
        return Clinic.find();
    }

}

let clinicsController = new Hospital();
module.exports = clinicsController;