const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema ({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: "String",
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    city: {
        type: "String",
        required: true
    },
    cp: {
        type: "String",
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const toJSONConfig = {
    transform: (doc,ret,opt) => {//transform es un metodo de mongoose
           delete ret['password']//ret es un metodo encripta la password para enviarla con mas segura
           return ret
    }
}


clientSchema.set('toJSON', toJSONConfig);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;