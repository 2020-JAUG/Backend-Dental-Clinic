const Client = require("../models/client.js");
const bcrypt = require("bcrypt");

class Patient {
    constructor() {

    }

    async createClient(client) {
        client.password = await bcrypt.hash( client.password, 10 );
        return Client.create(client);
    }

    async findAllClients() {
        return Client.find();
    }

    async findByEmail(email){
        return Client.findOne(
            {email: email}
        )
    }

    async findByRole(email){
        let result = await Client.findOne(
            {email: email}, {email: '$email'}
        );
        return result;
    }

    async findById(id){
        return Client.findOne(
            {_id: id}
        )
    }

    async modifyClient(body) {

        return Client.findByIdAndUpdate( { _id: body.client },
            { name: body.name,
              email: body.email,
              phone: body.phone,
              password: body.password,
              city: body.city,
              cp: body.cp,
              isActive: body.isActive },
             { new:true, omitUndefined:true }
        )
    }

    async modifyPassword(body) {

       let client = await Client.findById(body.client);

       let oldPassword = body.oldPassword;

       let password = client.password;

       let verify = await bcrypt.compare(oldPassword, password);
       
       if(!verify){
        throw new Error('Wrong user or password');
       }
       
       let newPassword = await bcrypt.hash( body.newPassword, 10 );

       return Client.findByIdAndUpdate( 
        { _id: body.client },
        { password: newPassword }) 

    }



    async removeClient(req) {
            return Client.findByIdAndRemove( { _id: req._id } );
    }


}

let clientsController = new Patient();
module.exports = clientsController;