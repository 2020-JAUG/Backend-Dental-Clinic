const Clinic = require('../models/clinic');

class Hospital {

    constructor(){

    }

    async findAllClinics() {
        return Clinic.find();
    }

    async createClinic(clinic){
        return Clinic.create(clinic);
    }

    
}

let clinicsController = new Hospital();
module.exports = clinicsController;