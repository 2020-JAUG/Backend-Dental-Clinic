const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clinicSchema = new Schema ({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    postalCode: {
        type: Number,
        required: true
    },
    appointmentArray:{
        type: Array
    },
    isOpen: {
        type: Boolean
    } 
    
});



const Clinic = mongoose.model('Clinic',clinicSchema);
module.exports = Clinic ;