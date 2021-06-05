const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dentistSchema = new Schema ({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    speciality: {
        type: Array,
        required: true
    },
    city: {
        type: String
    },
    incorporationDate:{
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean
    } 
    
});

const toJSONConfig = {
    transform: (doc,ret,opt) => {//transform es un metodo de mongoose
           delete ret['password']//ret es un metodo encripta la password para enviarla con mas segura
           return ret
    }
}

dentistSchema.set('toJSON', toJSONConfig);

const Dentist= mongoose.model('Dentist', dentistSchema);
module.exports = Dentist ;