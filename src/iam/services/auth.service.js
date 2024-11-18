import http from '../../shared/services/http-common'
import { User } from '../model/user.entity';

export class AuthApiService {
    constructor() {
        this.endpoint = '/authentication';
    }

    login(email, password) {
        const user = new User({ email, password });
        return http.post(`${this.endpoint}/sign-in`, user);
    }

    register(name, email, password, speciality, dni, phone) {
        const user = new User({ name, email, password, speciality, dni, phone });

        return http.post(`${this.endpoint}/sign-up`, user)
    }
}