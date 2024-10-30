import http from '../../shared/services/http-common'

export class ProfileApi {
    constructor() {
        this.endpoint = '/users';
    }

    getProfileData() {
        return http.get(`${this.endpoint}?id=1`);
    }

    updateProfileData(profile) {
        return http.put(`${this.endpoint}/1`, profile);
    }
}