/*
"firstName": "Diego Daniel",
"lastName": "Bastidas",
"specialty": "Cirujano",
"email": "diego123@gmail.com",
"document": "74658432",
"phone": "980441940"
* */

export class Profile {
    constructor({ firstName, lastName, specialty, email, document, phone }) {
        this.id = 0;
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.specialty = specialty || '';
        this.email = email || '';
        this.document = document || '';
        this.phone = phone || '';
    }
}