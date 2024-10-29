/* 
"mascota": "Firulais",
"dueno": "Juan Pérez",
"image": "firulais.jpg" 
*/

export class Pet {
    constructor({ name, owner, img }) {
        this.name = name;
        this.owner = owner;
        this.img = img;
    }
}