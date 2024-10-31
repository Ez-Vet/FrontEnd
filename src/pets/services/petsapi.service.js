import http from '../../shared/services/http-common'

export class PetsApiService {
    constructor() {
        this.endpoint = '/pets';
    }

    getPets() {
        return http.get(`${this.endpoint}`);
    }

    updatePet(data) {
        return http.put(`${this.endpoint}/${data.id}`, data);
    }

    addPet(pet) {
        return http.post(`${this.endpoint}`, pet);
    }
}