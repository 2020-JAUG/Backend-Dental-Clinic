const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema ({
    client: {
        type: Object,
        required: true
    },

    clinic: {
        type: Object,
        required: true

    },

    // dentist:{
    //     type: Object,
    //     required: true
    // },

    date: {
        type: Date,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    }
});


// appointmentSchema.set('toJSON', toJSONConfig);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;