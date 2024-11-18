export class User {
    constructor({ id, name, email, password, speciality, dni, phone, type }) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.speciality = speciality;
        this.dni = dni;
        this.phone = phone;
        this.type = type;
    }
}