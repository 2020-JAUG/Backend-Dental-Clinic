const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dentistSchema = new Schema ({

    name: {
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



const Dentist= mongoose.model('Dentist', dentistSchema);
module.exports = Dentist ;