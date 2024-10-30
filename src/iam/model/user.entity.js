export class User {
    constructor({ id, fullname, email, password, speciality, dni, phone }) {
        this.id = id;
        this.fullname = fullname;
        this.password = password;
        this.email = email;
        this.speciality = speciality;
        this.dni = dni;
        this.phone = phone;
    }
}