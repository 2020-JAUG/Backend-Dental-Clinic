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

    async updateDentist(bodyData){
        return Dentist.findByIdAndUpdate(
            {_id: bodyData.id},
            {phone: bodyData.phone}
        )
    }



};

let dentistController = new Professional();
module.exports = dentistController;