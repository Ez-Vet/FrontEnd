import http from '../../shared/services/http-common'

export class AppointmentsApiService {
    constructor() {
        this.endpoint = '/appointments';
    }

    getAppointments() {
        return http.get(`${this.endpoint}`);
    }
}