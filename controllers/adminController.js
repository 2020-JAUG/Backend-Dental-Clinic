
const Admin = require('../models/adminModel.js');
const bcrypt = require("bcrypt");

class User {

    constructor(){

    }

    async findAllAdmins() {
        return Admin.find();
    }

    async createAdmin(admin){
        admin.password = await bcrypt.hash( admin.password, 10 );
        return Admin.create(admin);
    }

    async findByEmail(email){
        return Admin.findOne(
            {email: email}
        )
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