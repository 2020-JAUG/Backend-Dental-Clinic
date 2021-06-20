
const bcrypt = require('bcrypt');
const Dentist = require('../models/dentist.js');


class Professional {

    constructor(){

    }

    async findAllDentists() {
        return Dentist.find();
    }

    async createDentist(dentist){
        dentist.password = await bcrypt.hash( dentist.password, 10 );
        return Dentist.create(dentist);
    }

    async findDentistInfo(body) {
        return Dentist.find(
             {city: body.city}, // {isActive : true, city: body.city} he comentado isActive para que de momento por frontend 
             //salgan todos los dentistas sin necesidad de activas la cuenta ya que al registrarse isaActive:false
             {name: '$name',
             _id: 0,
             city: '$city',
             speciality: '$speciality',
             image: '$image'}
         );
     }

    async updateDentist(bodyData){
        return Dentist.findByIdAndUpdate(
            {_id: bodyData.dentist},
            {name: bodyData.name,
            phone: bodyData.phone,
            email: bodyData.email,
            speciality: bodyData.speciality,
            city: bodyData.city,},
            {new:true,omitUndefined:true}
        )
    }

    async modifyPassword(body) {

        let dentist = await Dentist.findById(body.dentist);
 
        let oldPassword = body.oldPassword;
 
        let password = dentist.password;
 
        let verify = await bcrypt.compare(oldPassword, password);
        
        if(!verify){
         throw new Error('Wrong user or password');
        }
        
        let newPassword = await bcrypt.hash( body.newPassword, 10 );
 
        return Dentist.findByIdAndUpdate( 
         { _id: body.dentist },
         { password: newPassword }) 
 
     }
 

    async findByEmail(email){
        return Dentist.findOne(
            {email: email}
        )
    }

    async findByRole(email){
        let result = await Dentist.findOne(
            {email: email}, {email: '$email'}
        );
        return result;
    }

    async findById(id){
        return Dentist.findOne(
            {_id: id}
        )
    }

    async addSpeciality(bodyData){
        return Dentist.findByIdAndUpdate(
            {_id: bodyData.id},
            {$push: {speciality: bodyData.speciality}}
        )
    }

    async deleteDentist(bodyData){
        return Dentist.findByIdAndDelete(
            {_id: bodyData.id},
        )
    }

};

let dentistController = new Professional();
module.exports = dentistController;