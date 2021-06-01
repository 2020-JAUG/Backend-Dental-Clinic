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

    async updateClinic(bodyData){
        return Clinic.findByIdAndUpdate(
            {_id: bodyData.id},
            {phone: bodyData.phone}
        )
    }

    async deleteClinic(bodyData){
        return Clinic.findByIdAndDelete(
            {_id: bodyData.id},
        )
    }
}

let clinicsController = new Hospital();
module.exports = clinicsController;