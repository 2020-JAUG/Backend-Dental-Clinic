const Client = require("../models/client");
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


}

let clientsController = new Patient();
module.exports = clientsController;