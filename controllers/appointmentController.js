
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
        const message = data.message;
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

        const newAppointment = await Appointment.create(
            {client:client1,
            clinic:clinic1,
            dentist: dentist1,
            date: data.date,
            message : data.message,
            
            isActive: data.isActive
            });


        let newAppointmentId = String(newAppointment._id);

        const clinicApp = await Clinic.findByIdAndUpdate({_id: clinicId},
            {$push: {appointmentArray: newAppointmentId} });

        return newAppointment;
        
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
                    id : clientAppointments[i]._id,
                    clinicId : clientAppointments[i].clinic.idClinica,
                    clinicName: clientAppointments[i].clinic.name,
                    clinicAddress: clientAppointments[i].clinic.address,
                    clinicPhone: clientAppointments[i].clinic.phone,
                    clinicEmail: clientAppointments[i].clinic.email,
                    dentistName: clientAppointments[i].dentist.name,
                    date: clientAppointments[i].date,
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

    async findByDentist(dentistId) {

        const dentistSchedule =  await Appointment.find();
        console.log(dentistSchedule)

        let dentistArray = [];

        for (let i in dentistSchedule){

            if ( dentistSchedule[i].dentist.idDentist == dentistId ){
                const appointment2 = {
                    clinicName: dentistSchedule[i].clinic.name,
                    clinicAddress: dentistSchedule[i].clinic.address,
                    clinicPhone: dentistSchedule[i].clinic.phone,
                    clinicEmail: dentistSchedule[i].clinic.email,
                    dentistName: dentistSchedule[i].dentist.name,
                    date: dentistSchedule[i].date,
                }
                dentistArray.push(appointment2);
            }
        }
        return dentistArray;
    }

    async modifyAppointment(data) {

        const clinicId = data.clinic;

        const clinicInfo = await Clinic.findById(clinicId);

        let clinic1 = {
            idClinica: clinicId,
            name : clinicInfo.name,
            phone : clinicInfo.phone,
            email : clinicInfo.email,
            city : clinicInfo.city,
        }

        return Appointment.findByIdAndUpdate( { _id: data.id },
            {
                clinic: clinic1,
                date: data.date,
                isActive: data.isActive

            }, {new:true,omitUndefined:true}
        )
    }

    async removeAppointment(data) {

        const clinicId = data.clinic;
        const appointmentId = data.id;

        const deleteAppointment = await Appointment.findByIdAndRemove( { _id: appointmentId } );

        const clinicApp = await Clinic.findByIdAndUpdate({_id: clinicId},
        { $pull : {appointmentArray: appointmentId} });

        return deleteAppointment;
 }
}

let appointmentController = new Meeting();
module.exports = appointmentController;