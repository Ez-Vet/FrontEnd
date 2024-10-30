<template>
    <div class="main-content">
        <!-- Filtros y Tabla -->
        <div class="content-wrapper">
            <!-- Tabla de citas con fotos -->
            <div class="table-section">
                <DataTable :value="appointments" class="custom-table" responsiveLayout="scroll" :paginator="true"
                    :rows="5">
                    <!-- Columnas de la tabla -->
                    <Column :header="$t('Apointments.Photo')">
                        <template #body="{ data }">
                            <img :src="data.pet.img" :alt="data.pet.name + ' photo'" class="pet-photo"
                                v-if="data.pet.img" />
                            <span v-else>No image</span>
                        </template>
                    </Column>

                    <Column field="pet.name" :header="$t('Apointments.Pet')" />
                    <Column field="date" :header="$t('Apointments.Date')" />
                    <Column field="time" :header="$t('Apointments.Time')" />
                    <Column :header="$t('Apointments.State')">
                        <template #body="{ data }">
                            <div class="edit_status">
                                <Button @click="cambiarEstado(data)">{{ data.status ? $t('Apointments.completed') :
                                    $t('Apointments.pending')
                                    }}</Button>
                            </div>
                        </template>
                    </Column>

                    <Column :header="$t('Apointments.Diagnostic')">

                        <template #body="{ data }">
                            <div class="action-buttons">
                                <Button :label="$t('Apointments.Edit')" class="edit-button p-button-sm"
                                    @click="editarDiagnostico(data)" />
                                <Button :label="$t('Apointments.history')" class="history-button p-button-sm ml-2"
                                    @click="verHistorial(data)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <!-- Sección de filtros -->
            <div class="filter-section">
                <h3>Buscar por:</h3>

                <!-- Filtro por Mascota -->
                <div class="filter-option">
                    <AutoComplete v-model="selectedMascota" :suggestions="filteredMascotas"
                        completeMethod="filterMascota" field="mascota" placeholder="Buscar por Mascota" />
                </div>

                <!-- Filtro por Fecha -->
                <div class="filter-option">
                    <Calendar v-model="selectedDate" dateFormat="yy-mm-dd" placeholder="Buscar por Fecha" />
                </div>

                <!-- Filtro por Estado (con opción "Todos") -->
                <div class="filter-option">
                    <Dropdown v-model="selectedEstado" :options="estados" optionLabel="estado"
                        placeholder="Seleccionar Estado" />
                </div>

                <!-- Filtro por Dueño -->
                <div class="filter-option">
                    <AutoComplete v-model="selectedDueno" :suggestions="filteredDuenos" completeMethod="filterDueno"
                        field="dueno" placeholder="Buscar por Dueño" />
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para ver y editar el historial -->
    <Dialog header="Historial Clínico" v-model:visible="showHistoryDialog" :modal="true" :closable="true"
        class="custom-dialog">
        <div class="historial-card">
            <h3>Historial Clínico - Mascota: {{ historialSeleccionado.pet.name }}</h3>
            <p><strong>Propietario:</strong> {{ historialSeleccionado.pet.owner }}</p>
            <p><strong>🩺 Motivo de consulta:</strong> {{ historialSeleccionado.history.reasonConsultation }}</p>
            <p><strong>📋 Diagnóstico presuntivo:</strong> {{ historialSeleccionado.history.diagnosis }}</p>
            <p><strong>💊 Tratamiento:</strong> {{ historialSeleccionado.history.treatment }}</p>
            <p><strong>📅 Observaciones adicionales:</strong> {{ historialSeleccionado.history.observations }}</p>
        </div>
        <Button label="Cerrar" icon="pi pi-times" class="p-button-danger mt-2" @click="showHistoryDialog = false" />
    </Dialog>

    <Dialog header="Editar Diagnóstico" v-model:visible="showEditDialog" :modal="true" :closable="true"
        class="custom-dialog">
        <div class="edit-card">
            <h3>Editar Historial - Mascota: {{ citaSeleccionada.pet.name }}</h3>
            <p><strong>Propietario:</strong> {{ citaSeleccionada.pet.owner }}</p>
            <hr />
            <p><strong>🩺 Motivo de consulta:</strong></p>
            <textarea v-model="citaSeleccionada.history.reasonConsultation" rows="2" class="editable-field"></textarea>

            <p><strong>📋 Diagnóstico presuntivo:</strong></p>
            <textarea v-model="citaSeleccionada.history.diagnosis" rows="2" class="editable-field"></textarea>

            <p><strong>💊 Tratamiento:</strong></p>
            <textarea v-model="citaSeleccionada.history.treatment" rows="2" class="editable-field"></textarea>

            <p><strong>📅 Observaciones adicionales:</strong></p>
            <textarea v-model="citaSeleccionada.history.observations" rows="2" class="editable-field"></textarea>
        </div>
        <Button :label="$t('Apointments.Save')" class="p-button-success mt-2"
            @click="guardarDiagnostico(citaSeleccionada)" />
    </Dialog>
</template>

<script>
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; // para agrupar columnas opcionalmente
import Row from 'primevue/row';               // para filas agrupadas opcionalmente
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import { AppointmentsApiService } from '../services/appointmentapi.service';
import { Appointment } from '../model/appointment.entity'
import changelangComponent from "../../public/components/changelang.component.vue";
export default {

    components: {
        changelangComponent,
        DataTable,
        Column,
        ColumnGroup,
        Row,
        InputText,
        Button,
        Dialog,
        AutoComplete,
        Calendar,
        Dropdown,
    },
    data() {
        return {
            api: new AppointmentsApiService(),
            appointments: null,
        }
    },
    setup() {
        /*   const citas = ref([
              {
                  mascota: 'Firulais',
                  fecha: '2024-10-20',
                  hora: '10:00',
                  estado: 'Pendiente',
                  diagnostico: 'Problemas de estómago',
                  motivoConsulta: 'Vómitos ocasionales, pérdida de apetito',
                  tratamiento: 'Dieta blanda por 48 horas',
                  observaciones: 'Monitorear signos de empeoramiento.',
                  dueno: 'Juan Pérez',
                  image: 'firulais.jpg'
              },
              {
                  mascota: 'Max',
                  fecha: '2024-11-02',
                  hora: '12:00',
                  estado: 'Atendido',
                  diagnostico: 'Problemas de piel',
                  motivoConsulta: 'Rascarse excesivamente',
                  tratamiento: 'Crema tópica antihistamínica',
                  observaciones: 'Revisar en 1 semana.',
                  dueno: 'María López',
                  image: 'max.jpg'
              },
              {
                  mascota: 'Luna',
                  fecha: '2024-10-25',
                  hora: '14:00',
                  estado: 'Pendiente',
                  diagnostico: 'Dolor en las articulaciones',
                  motivoConsulta: 'Dificultad para caminar y saltar',
                  tratamiento: 'Antiinflamatorio no esteroideo (meloxicam)',
                  observaciones: 'Control en 1 mes.',
                  dueno: 'Carlos Sánchez',
                  image: 'luna.jpg'
              }
          ]); */

        const searchQuery = ref('');
        const selectedMascota = ref(null);
        const selectedDate = ref(null);
        const selectedEstado = ref(null);
        const selectedDueno = ref(null);
        const api = ref(new AppointmentsApiService());

        // Añadir opción "Todos" en el estado
        const estados = ref([{ estado: 'Todos' }, { estado: 'Pendiente' }, { estado: 'Atendido' }]);

        const filteredCitas = computed(() => {
            let filtered = citas.value;
            if (searchQuery.value) {
                filtered = filtered.filter((cita) =>
                    cita.mascota.toLowerCase().includes(searchQuery.value.toLowerCase())
                );
            }
            if (selectedDate.value) {
                // Convertir la fecha seleccionada a un formato que coincida con las fechas de las citas
                const formattedDate = new Date(selectedDate.value).toISOString().slice(0, 10);
                filtered = filtered.filter((cita) => cita.fecha === formattedDate);
            }
            if (selectedEstado.value && selectedEstado.value.estado !== 'Todos') {
                filtered = filtered.filter((cita) => cita.estado === selectedEstado.value.estado);
            }
            if (selectedMascota.value) {
                filtered = filtered.filter((cita) =>
                    cita.mascota.toLowerCase().includes(selectedMascota.value.toLowerCase())
                );
            }
            if (selectedDueno.value) {
                filtered = filtered.filter((cita) =>
                    cita.dueno.toLowerCase().includes(selectedDueno.value.toLowerCase())
                );
            }
            return filtered;
        });

        const filteredMascotas = ref([]);
        const filteredDuenos = ref([]);

        const filterMascota = (event) => {
            filteredMascotas.value = this.appointment
                .map((cita) => cita.mascota)
                .filter((mascota) =>
                    mascota.toLowerCase().includes(event.query.toLowerCase())
                );
        };

        const filterDueno = (event) => {
            filteredDuenos.value = citas.value
                .map((cita) => cita.dueno)
                .filter((dueno) =>
                    dueno.toLowerCase().includes(event.query.toLowerCase())
                );
        };

        const showHistoryDialog = ref(false);
        const showEditDialog = ref(false);
        const citaSeleccionada = ref({});
        const historialSeleccionado = ref({});

        const verHistorial = (data) => {
            historialSeleccionado.value = new Appointment(data);
            showHistoryDialog.value = true;
        };

        const editarDiagnostico = (cita) => {
            citaSeleccionada.value = new Appointment(cita);
            showEditDialog.value = true;
        };

        const guardarDiagnostico = (cita) => {
            api.value.updateAppointment(cita).then((response) => {
                console.log(response);
                showEditDialog.value = false;
            });
        };
        const cambiarEstado = (cita) => {
            cita.status = !cita.status;

            api.value.updateAppointment(cita).then((response) => {
                console.log(response);
            });
        };
        const getImagePath = (imageName) => {
            if (imageName) {
                return new URL(`../assets/img/${imageName}`, import.meta.url).href;
            }
            return null;
        };

        return {
            /* citas, */
            searchQuery,
            filteredCitas,
            showHistoryDialog,
            showEditDialog,
            citaSeleccionada,
            historialSeleccionado,
            verHistorial,
            editarDiagnostico,
            guardarDiagnostico,
            getImagePath,
            selectedMascota,
            selectedDate,
            selectedEstado,
            selectedDueno,
            filteredMascotas,
            filteredDuenos,
            estados,
            filterMascota,
            filterDueno,
            api,
            cambiarEstado
        };
    },
    mounted() {
        this.api.getAppointments().then((response => {
            const data = response.data;

            this.appointments = data.map(appointment => new Appointment(appointment))
        }))
    }
};
</script>

<style scoped>
.main-content {
    flex-grow: 1;
    padding: 20px;
    align-self: center;
}

.search-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

.search-input {
    width: 250px;
}

.search-button,
.add-button {
    padding: 10px 20px;
    border-radius: 20px;
}

.content-wrapper {
    display: flex;
    gap: 25px;
}

.table-section {
    flex-grow: 3;
}

.filter-section {
    flex-grow: 1;
    padding: 10px;
    background-color: #ded6ee;
    border-radius: 10px;
}

.filter-option {
    background-color: #ded6ee;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    text-align: center;
}

.filter-option p {
    margin: 0;
}

.custom-table {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.p-datatable-table {
    background: red !important;
}

.custom-table .p-datatable-header {
    background-color: #f0f0f0;
}

.custom-table .p-datatable-thead>tr>th {
    background-color: #d1eaff;
    padding: 10px;
    font-weight: bold;
}

.custom-table .p-datatable-tbody>tr>td {
    padding: 10px;
    background-color: white;
}

.action-buttons {
    display: flex;
    gap: 10px;
    align-items: center;
}

.pet-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.edit-button {
    border: 1px solid #7776bc;
    color: #7776bc;
    background-color: transparent;
}

.history-button {
    background-color: #7776bc;
    color: white;
}

.ml-2 {
    margin-left: 10px;
}

.custom-dialog {
    width: 500px;
    max-width: 100%;
}

.historial-card,
.edit-card {
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.editable-field {
    width: 100%;
    padding: 8px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}

.mt-2 {
    margin-top: 15px;
}

.edit_status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 150px;
    margin-right: -80px;

    button {
        background-color: #7776bc;
    }
}
</style>