
const appointment = require("../models/appointment");
const bcrypt = require("bcrypt");
const Clinic = require("../models/clinic");
const Client = require("../models/client");
const Appointment = require("../models/appointment");


class Meeting {
    constructor() {

    }

    async createAppointment(data) {
        // Data should be like this:
        /*{
            "clientId": "60b67e0371c1b38f85c1191d",
            "clinicId": "60b653c5c75e9e233617715e",
            "date": "2021-01-01",
            "isActive": true
        }*/
        const clientId = data.client;
        const clinicId = data.clinic;
        // const dentist = data.dentistId;
        const clientInfo = await Client.findById(clientId);
        const clinicInfo = await Clinic.findById(clinicId);
        let client1 = {
            idClient: data.client,
            nombre : clientInfo.name,
            email : clientInfo.email,
            city : clientInfo.city,
        }
        let clinic1 = {
            idClinica: data.clinic,
            nombre : clinicInfo.name,
            email : clinicInfo.email,
            city : clinicInfo.city,
        }
        console.log(clinic1,client1);
        return Appointment.create(
            {client:client1,
            clinic:clinic1,
            date: data.date,
            isActive: data.isActive
            });
    }

    async findAllAppointments() {
        return Appointment.find();
    }

    async modifyAppointment(data) {
        return Appointment.findByIdAndUpdate( { _id: data._id },
            {
                client: data.clientId,
                clinic: data.clinicId,
                date: data.date,
                isActive: data.isActive
            }           
        )
    }

    async removeAppointment(req) {
            return Appointment.findByIdAndRemove( { _id: req._id } );
    }
}

let appointmentController = new Meeting();
module.exports = appointmentController;