const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema ({
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
    isAdmin: {
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


adminSchema.set('toJSON', toJSONConfig);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;