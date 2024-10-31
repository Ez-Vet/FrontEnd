<template>
    <pv-card class="card">
        <template #title>
            {{ $t('Pet.Name') }} {{ pet.name }}
            <pv-divider />
        </template>
        <template #content>
            <div class="card-content">
                <div class="card-item">
                    <h2>{{ $t('Pet.Species') }}</h2>
                    <pv-inputtext v-model="pet.species" v-model:disabled="editMode" class="input" />
                </div>
                <div class="card-item">
                    <h2>{{ $t('Pet.Age') }}</h2>
                    <pv-inputtext v-model="pet.age" v-model:disabled="editMode" class="input" />
                </div>
                <div class="card-item">
                    <h2>{{ $t('Pet.Gender') }}</h2>
                    <pv-inputtext v-model="pet.gender" v-model:disabled="editMode" class="input" />
                </div>
                <div class="card-item">
                    <h2>{{ $t('Pet.Description') }}</h2>
                    <pv-inputtext v-model="pet.description" v-model:disabled="editMode" class="input" />
                </div>
                <pv-button @click="edit">{{ editMode ? $t('Pet.Edit') : $t('Pet.Save') }}</pv-button>
            </div>
        </template>
    </pv-card>
</template>

<script>
import { Pet } from '../model/pet.entity'
import { PetsApiService } from '../services/petsapi.service';

export default {
    name: 'PetCard',
    props: {
        pet: {
            type: Pet,
            required: true
        }
    },
    data() {
        return {
            api: new PetsApiService(),
            editMode: true
        }
    },
    methods: {
        edit() {
            this.editMode = !this.editMode;

            if (this.editMode)
                this.api.updatePet(this.pet).then();
        }
    }
}
</script>

<style scoped>
.card {
    width: 400px;
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 15px;

    h2 {
        font-weight: 700;
    }
}

.input {
    width: 100%;
}
</style>