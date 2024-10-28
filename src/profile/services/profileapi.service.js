import axios from 'axios';

const http = axios.create({
    'baseURL': "http://localhost:3000"
});

http.defaults.headers.common['Content-Type'] = 'application/json';
http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export class ProfileApi {
    constructor() {
        this.endpoint = '/profiles';
    }

    getProfileData() {
        return http.get(`${this.endpoint}?id=1`);
    }

    updateProfileData(profile) {
        return http.put(`${this.endpoint}/1`, profile);
    }
}