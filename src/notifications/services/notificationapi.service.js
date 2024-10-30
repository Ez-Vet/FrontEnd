import http from '../../shared/services/http-common'

export class NotificationApiService {
    constructor() {
        this.endpoint = '/notifications';
    }

    getNotifications() {
        return http.get(`${this.endpoint}`);
    }
}