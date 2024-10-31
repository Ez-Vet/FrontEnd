<template>
    <div class="main-content">
        <pv-button class="btn" @click="openDialog = true">Añadir mascota</pv-button>
        <div class="pet-list">
            <template v-for="pet in pets">
                <petCard :pet="pet" />
            </template>
        </div>
    </div>

    <pv-dialog v-model:visible="openDialog" modal header="Nueva mascota">
        <div class="dialog-content">
            <pv-inputtext v-model="newPet.name" placeholder="Nombre" />
            <pv-inputtext v-model="newPet.species" placeholder="Especie" />
            <pv-inputtext v-model="newPet.age" placeholder="Edad" />
            <pv-inputtext v-model="newPet.gender" placeholder="Sexo" />
            <pv-inputtext v-model="newPet.description" placeholder="Descripcion" />
            <pv-button @click="savePet">Guardar</pv-button>
        </div>
    </pv-dialog>
</template>

<script>
import petCard from './pet-card.component.vue';
import { Pet } from '../model/pet.entity';
import { PetsApiService } from "../services/petsapi.service"

export default {
    name: 'PetList',
    components: { petCard },
    data() {
        return {
            api: new PetsApiService(),
            pets: null,
            openDialog: false,
            newPet: new Pet({})
        };
    },
    methods: {
        getPets() {
            this.api.getPets().then((res => {
                const data = res.data;

                this.pets = data.map(pet => new Pet(pet));
            }))
        },
        savePet() {
            this.api.addPet(this.newPet).then((res => {
                const status = res.status;

                if (status == 201) {
                    this.openDialog = false;
                    this.getPets();
                }
            }))
        }
    }
    ,
    mounted() {
        this.getPets();
    }
};
</script>

<style scoped>
.pet-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

}

.main-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: auto;
    margin-top: 100px;

    .btn {
        align-self: end;
    }
}

.dialog-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>