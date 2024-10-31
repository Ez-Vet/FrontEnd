/* "id": 1,
"name": "Luna",
"species": "Perro",
"age": 3,
"gender": "Hembra" */

export class Pet {
    constructor({ id, name, species, age, gender, description }) {
        this.id = id || 0;
        this.name = name || '';
        this.species = species || '';
        this.age = age || '';
        this.gender = gender || '';
        this.description = description || '';
    }
}