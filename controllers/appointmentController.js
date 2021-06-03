
const bcrypt = require("bcrypt");
const Clinic = require("../models/clinic");
const Client = require("../models/client");
const Dentist = require("../models/dentist");
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
        const date = data.date;
        const meet = Appointment.find({date: date});
        // data.client == meet.client
        console.log(meet);



        const clientId = data.client;
        const clinicId = data.clinic;
        const dentistId = data.dentist;
        
        const clientInfo = await Client.findById(clientId);
        const clinicInfo = await Clinic.findById(clinicId);
        const dentistInfo = await Dentist.findById(dentistId);
        // if (!dentistInfo){
        //     throw new Error('dentist does not exist');
        // }


        // console.log(dentistInfo);

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

        let dentist1 = {
            idDentist: data.dentist,
            nombre: dentistInfo.name,
            especialidad: dentistInfo.speciality[0],
        }
        console.log(clinic1,client1,dentist1);
        return Appointment.create(
            {client:client1,
            clinic:clinic1,
            dentist: dentist1,
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