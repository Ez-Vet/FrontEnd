import http from '../../shared/services/http-common'

export class ProfileApi {
    constructor() {
        this.endpoint = '/users';
    }

    getProfileData() {
        const id = localStorage.getItem('user');
        return http.get(`${this.endpoint}?id=${id}`);
    }

    updateProfileData(profile) {
        const id = localStorage.getItem('user');
        return http.put(`${this.endpoint}/${id}`, profile);
    }
}