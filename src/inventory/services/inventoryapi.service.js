import http from '../../shared/services/http-common'

export class InventoryApiService {
    constructor() {
        this.endpoint = '/inventory';
    }

    getInventory() {
        return http.get(`${this.endpoint}`);
    }
    updateInventory(data) {
        return http.put(`${this.endpoint}/${data.id}`, data);
    }
    addInventory(data) {
        return http.post(`${this.endpoint}`, data);
    }
}