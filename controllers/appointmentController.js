
const bcrypt = require("bcrypt");
const Clinic = require("../models/clinic.js");
const Client = require("../models/client.js");
const Dentist = require("../models/dentist.js");
const Appointment = require("../models/appointment.js");


class Meeting {
    constructor() {

    }

    async createAppointment(data) {

        const clientId = data.client;
        const date = data.date;
        console.log(date, clientId);
        const check = await Appointment.findOne({date: date}, {idClient: clientId});
        if (check != null ){
                throw new Error('You already have an appointment');
            }

        const clinicId = data.clinic;
        const dentistId = data.dentist;

        const clientInfo = await Client.findById(clientId);
        const clinicInfo = await Clinic.findById(clinicId);
        const dentistInfo = await Dentist.findById(dentistId);

        let client1 = {
            idClient: data.client,
            name : clientInfo.name,
            phone: clientInfo.phone,
            email : clientInfo.email,
            city : clientInfo.city,
        }
        let clinic1 = {
            idClinica: data.clinic,
            name : clinicInfo.name,
            phone: clinicInfo.phone,
            addres: clinicInfo.addres,
            email : clinicInfo.email,
            city : clinicInfo.city,
        }

        let dentist1 = {
            idDentist: data.dentist,
            name: dentistInfo.name,
            phone: dentistInfo.phone,
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


    // FUNCIONA, FALTA ACTUALIZAR LOS MODELS CREADOS DE APPOINTMENT
    async findByClient(id) {

        const clientAppointments =  await Appointment.find({isActive: true});

        let clientArray = [];

        for (let i in clientAppointments){

            if ( clientAppointments[i].client.idClient == id ){
                const appointment = {
                    clinicName: clientAppointments[i].clinic.name,
                    clinicAddress: clientAppointments[i].clinic.address,
                    clinicPhone: clientAppointments[i].clinic.phone,
                    clinicEmail: clientAppointments[i].clinic.email,
                    dentistName: clientAppointments[i].dentist.name,
                    date: clientAppointments[i].date 
                }
                    clientArray.push(appointment);
            }
        }

        return clientArray;
    }


    async findByDate(date, dentistId) {
        const dentistAppointments = await Appointment.find(
            {date: date},
            {idDentist: dentistId});

        let dentistArray = [];

        for(let i in dentistAppointments){
            const object = await Appointment.findById(dentistAppointments[0]._id);
            dentistArray.push(object);
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