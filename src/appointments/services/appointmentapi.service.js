import http from '../../shared/services/http-common'

export class AppointmentsApiService {
    constructor() {
        this.endpoint = '/appointments';
    }

    getAppointments() {
        return http.get(`${this.endpoint}`);
    }
    updateAppointment(data) {
        return http.put(`${this.endpoint}/${data.id}`, data);
    }
}