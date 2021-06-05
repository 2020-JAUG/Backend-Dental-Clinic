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

    async findById(id){
        return Client.findOne(
            {_id: id}
        )
    }

    async modifyClient(body) {
        return Client.findByIdAndUpdate( { _id: body._id },
            { email: body.email,
              city: body.city,
              cp: body.cp,
              isActive: body.isActive },
             { new:true, omitUndefined:true }
        )
    }

    async removeClient(req) {
            return Client.findByIdAndRemove( { _id: req._id } );
    }


}

let clientsController = new Patient();
module.exports = clientsController;