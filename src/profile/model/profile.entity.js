/*
"firstName": "Diego Daniel",
"lastName": "Bastidas",
"specialty": "Cirujano",
"email": "diego123@gmail.com",
"document": "74658432",
"phone": "980441940"
* */

export class Profile {
    constructor({ fullname, email, password, speciality, dni, phone }) {
        this.id = 0;
        this.fullname = fullname || '';
        this.password = password || '';
        this.speciality = speciality || '';
        this.dni = dni || '';
        this.email = email || '';
        this.phone = phone || '';
    }
}