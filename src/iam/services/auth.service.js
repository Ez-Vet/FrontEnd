import http from '../../shared/services/http-common'
import { User } from '../model/user.entity';

export class AuthApiService {
    constructor() {
        this.endpoint = '/users';
    }

    login(email, password) {
        return http.get(`${this.endpoint}?email=${email}&password=${password}`);
    }

    register(fullname, email, password, speciality, dni, phone) {
        const user = new User({ fullname, email, password, speciality, dni, phone });

        return http.post(this.endpoint, user)
    }
}