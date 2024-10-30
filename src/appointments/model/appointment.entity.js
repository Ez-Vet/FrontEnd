/* 
"id": 1,
"fecha": "2024-10-20",
"hora": "10:00",
"estado": "Pendiente",
*/
import { History } from './history.entity'
import { Pet } from './pet.entity'

export class Appointment {
    constructor({ id, pet, date, time, status, history }) {
        this.id = id;
        this.pet = new Pet(pet);
        this.date = date;
        this.time = time;
        this.status = status;
        this.history = new History(history);
    }
}