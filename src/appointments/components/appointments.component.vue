<template>
    <div class="main-content">
        <!-- Filtros y Tabla -->
        <div class="content-wrapper">
            <!-- Tabla de citas con fotos -->
            <div class="table-section">
                <DataTable v-model:filters="filters" :value="appointments" class="custom-table"
                    responsiveLayout="scroll" :paginator="true" :rows="5">
                    <template #header>
                        <div class="flex justify-end gap-5">
                            <pv-inputtext v-model="filters['global'].value" placeholder="Search" />
                        </div>
                    </template>

                    <!-- Columnas de la tabla -->
                    <Column :header="$t('Appointments.Photo')">
                        <template #body="{ data }">
                            <img :src="'/img/' + data.pet.img" :alt="data.pet.name + ' photo'" class="pet-photo"
                                v-if="data.pet.img" />
                            <span v-else>No image</span>
                        </template>
                    </Column>

                    <Column field="pet.name" :header="$t('Appointments.Pet')" />
                    <Column field="date" :header="$t('Appointments.Date')" />
                    <Column field="time" :header="$t('Appointments.Time')" />
                    <Column :header="$t('Appointments.State')">
                        <template #body="{ data }">
                            <div class="edit_status">
                                <template v-if="isClientRoute">
                                    {{ data.status ? $t('Appointments.Completed') :
                                        $t('Appointments.Pending')
                                    }}
                                </template>

                                <template v-else="isClientRoute">
                                    <Button @click="cambiarEstado(data)">{{ data.status ? $t('Appointments.Completed') :
                                        $t('Appointments.Pending')
                                        }}</Button>
                                </template>
                            </div>
                        </template>
                    </Column>

                    <Column :header="$t('Appointments.Diagnostic')">

                        <template #body="{ data }">
                            <div class="action-buttons">
                                <template v-if="!isClientRoute">
                                    <Button :label="$t('Appointments.Edit')" class="edit-button p-button-sm"
                                        @click="editarDiagnostico(data)" />
                                </template>

                                <Button :label="$t('Appointments.History')" class="history-button p-button-sm ml-2"
                                    @click="verHistorial(data)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>

    <!-- Modal para ver y editar el historial -->
    <Dialog :header="$t('Appointments.HistoryClinic')" v-model:visible="showHistoryDialog" :modal="true"
        :closable="true" class="custom-dialog">
        <div class="historial-card">
            <h3>{{ $t('Appointments.History_Clinic') }} {{ historialSeleccionado.pet.name }}</h3>
            <p><strong>{{ $t('Appointments.Propiertary') }}</strong> {{ historialSeleccionado.pet.owner }}</p>
            <p><strong>🩺 {{ $t('Appointments.ReasonConsultation') }}</strong> {{
                historialSeleccionado.history.reasonConsultation }}</p>
            <p><strong>📋 {{ $t('Appointments.DiagnosticPresumptive') }}</strong> {{
                historialSeleccionado.history.diagnosis
            }}
            </p>
            <p><strong>💊 {{ $t('Appointments.Treatment') }}</strong> {{ historialSeleccionado.history.treatment }}</p>
            <p><strong>📅 {{ $t('Appointments.Observations') }}</strong> {{ historialSeleccionado.history.observations
                }}
            </p>
        </div>
        <Button :label="$t('Appointments.Close')" icon="pi pi-times" class="p-button-danger mt-2"
            @click="showHistoryDialog = false" />
    </Dialog>

    <Dialog :header="$t('Appointments.EditHistory')" v-model:visible="showEditDialog" :modal="true" :closable="true"
        class="custom-dialog">
        <div class="edit-card">
            <h3>{{ $t('Appointments.History_Clinic') }} {{ citaSeleccionada.pet.name }}</h3>
            <p><strong>{{ $t('Appointments.Propiertary') }}</strong> {{ citaSeleccionada.pet.owner }}</p>
            <hr />
            <p><strong>🩺 {{ $t('Appointments.ReasonConsultation') }}</strong></p>
            <textarea v-model="citaSeleccionada.history.reasonConsultation" rows="2" class="editable-field"></textarea>

            <p><strong>📋 {{ $t('Appointments.DiagnosticPresumptive') }}</strong></p>
            <textarea v-model="citaSeleccionada.history.diagnosis" rows="2" class="editable-field"></textarea>

            <p><strong>💊 {{ $t('Appointments.Treatment') }}</strong></p>
            <textarea v-model="citaSeleccionada.history.treatment" rows="2" class="editable-field"></textarea>

            <p><strong>📅 {{ $t('Appointments.Observations') }}</strong></p>
            <textarea v-model="citaSeleccionada.history.observations" rows="2" class="editable-field"></textarea>
        </div>
        <Button :label="$t('Appointments.Save')" class="p-button-success mt-2"
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
import { FilterMatchMode } from '@primevue/core/api';
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
            appointments: null, filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
        }
    },
    computed: {
        isClientRoute() {
            return this.$route.path.startsWith('/client');
        }
    },
    setup() {
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
                location.reload();
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
    padding: 80px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.historial-card,
.edit-card {
    width: 500px;
    padding: 0;
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