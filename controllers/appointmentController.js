
const bcrypt = require("bcrypt");
const Clinic = require("../models/clinic");
const Client = require("../models/client");
const Dentist = require("../models/dentist");
const Appointment = require("../models/appointment");


class Meeting {
    constructor() {

    }

    async createAppointment(data) {

        const clientId = data.client;
        const date = data.date;
        if (Appointment.findOne({date: date},{idClient: clientId}) != null ){
                throw new Error('You already have an appointment');
            }

        const clinicId = data.clinic;
        const dentistId = data.dentist;
        
        const clientInfo = await Client.findById(clientId);
        const clinicInfo = await Clinic.findById(clinicId);
        const dentistInfo = await Dentist.findById(dentistId);

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
            especialidad: dentistInfo.speciality,
        }

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

    async findByClient(id) {

        const clientAppointments =  await Appointment.find();

        let clientArray = [];

        for (let i in clientAppointments){

            if ( clientAppointments[i].client.idClient == id ){
                clientArray.push(clientAppointments[i]);
            }
        }

        return clientArray;
    }
    

    async findByDate(date, dentistId) {
        const dentistAppointments = await Appointment.find();

        let dentistArray = [];
        let j = 0;
        
        for(let i in dentistAppointments){

            console.log(dentistAppointments[i].date);
            console.log(dentistAppointments[i].dentist.idDentist);

            let dentDate = dentistAppointments[i].date;

            if  (dentDate == date) {
                dentistArray.push(dentistAppointments[i]);
            }

            if (dentistAppointments[i].dentist.idDentist == dentistId){
                j++;
            }
        } 

        return dentistArray;
    }

    async modifyAppointment(data) {
        const clinicId = data.clinic;
        const clinicInfo = await Clinic.findById(clinicId);
        
        let clinic1 = {
            idClinica: clinicId,
            nombre : clinicInfo.name,
            email : clinicInfo.email,
            city : clinicInfo.city,
        }
        return Appointment.findByIdAndUpdate( { _id: data._id },
            {
                clinic: clinic1,
                date: data.date,
                isActive: data.isActive
            }, {new:true,omitUndefined:true}        
        )
    }

    async removeAppointment(req) {
            return Appointment.findByIdAndRemove( { _id: req._id } );
    }
}

let appointmentController = new Meeting();
module.exports = appointmentController;