<template>
    <div class="card">
        <div class="card-header">
            <h2 class="title">{{ $t('Profile.Personal') }}</h2>
            <button class="edit-button" @click="editProfile">
                {{ $t('Profile.Data') }}<i class="pi pi-pencil"></i>
            </button>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="input-group">
                    <label for="nombre" class="input-label">{{ $t('Profile.Fullname') }}</label>
                    <input type="text" id="nombre" placeholder="Ingresa tu nombre completo" class="input-text"
                        v-model="profile.fullname" :disabled="!isEditing" />
                </div>
                <div class="input-group">
                    <label for="especialidad" class="input-label">{{ $t('Profile.Speciality') }}</label>
                    <input type="text" id="especialidad" placeholder="Ingresa tu especialidad" class="input-text"
                        v-model="profile.speciality" :disabled="!isEditing" />
                </div>
                <div class="input-group">
                    <label for="correo" class="input-label">{{ $t('Profile.Email') }}</label>
                    <input type="email" id="correo" placeholder="Ingresa tu correo electrónico" class="input-text"
                        v-model="profile.email" :disabled="!isEditing" />
                </div>
                <div class="input-group">
                    <label for="dni" class="input-label">{{ $t('Profile.DNI') }}</label>
                    <input type="text" id="dni" placeholder="Ingresa tu DNI" class="input-text" v-model="profile.dni"
                        :disabled="!isEditing" />
                </div>
                <div class="input-group">
                    <label for="celular" class="input-label">{{ $t('Profile.Phone') }}</label>
                    <input type="text" id="celular" placeholder="Ingresa tu número de celular" class="input-text"
                        v-model="profile.phone" :disabled="!isEditing" />
                </div>


                <template v-if="isEditing">
                    <pv-button @click="saveChanges">{{ $t('Profile.Save') }}</pv-button>
                    <pv-button @click="cancelEdit">{{ $t('Profile.Cancel') }}</pv-button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { Profile } from "../model/profile.entity.js";
import { ProfileApi } from "../services/profileapi.service.js";

export default {
    data() {
        return {
            api: new ProfileApi(),
            profile: new Profile({}),
            isEditing: false, // State to toggle between edit and view modes
        };
    },
    methods: {
        editProfile() {
            this.isEditing = true;
        },
        cancelEdit() {
            this.isEditing = false;
        },
        saveChanges() {
            alert("Cambios guardados");
            this.isEditing = false;
            this.api.updateProfileData(this.profile).then();
        }
    },
    mounted() {
        this.api.getProfileData().then(user => {
            const data = user.data[0]

            this.profile = new Profile(data);
        })
    }
}
</script>

<style scoped>
.card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    height: 350px;
    flex-grow: 1;
    align-self: center;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-body {
    margin-top: 20px;
}

.row {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.input-group {
    flex: 1 1 45%;
}

.input-label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
    /* Color del texto para las etiquetas */
}

.input-text {
    width: 80%;
    padding: 2px;
    border-radius: 5px;
    border: 1px solid black;
    /* Solo el borde negro */
    background-color: transparent;
    /* Fondo transparente */
    color: #555;
    /* Color del texto dentro de los inputs */
}

.edit-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #007bff;
    display: flex;
    align-items: center;
}

.edit-button .pi {
    margin-left: 5px;
}

.title {
    color: black;
    /* Color del título "Datos personales" */
    font-size: 24px;
    font-weight: bold;
}

.input-text::placeholder {
    color: gray;
    /* Cambiar este color si quieres algo más claro u oscuro */
}
</style>