
const Admin = require('../models/adminModel');

class User {

    constructor(){

    }

    async findAllAdmins() {
        return Admin.find();
    }

    async createAdmin(body){
        return Admin.create(body);
    }

    async updateAdmin(body){
        return Admin.findByIdAndUpdate(
            {_id: body.id},
            {phone: body.phone,
            email: body.email},
            {new:true,omitUndefined:true}
        )
    }

    async deleteAdmin(bodyData){
        return Admin.findByIdAndDelete(
            {_id: bodyData.id},
        )
    }
}

let adminController = new User();
module.exports = adminController;