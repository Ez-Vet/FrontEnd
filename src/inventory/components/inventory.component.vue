<template>
    <div class="main-content">
        <!-- Filtros y Tabla -->
        <div class="content-wrapper">
            <!-- Tabla de citas con fotos -->
            <div class="table-section">
                <DataTable v-model:filters="filters" :value="inventory" class="custom-table" responsiveLayout="scroll"
                    :paginator="true" :rows="5">
                    <template #header>
                        <div class="flex justify-end gap-5">
                            <Button :label="$t('Inventory.Add_Product')" class="add-button" @click="openAddDialog" />
                            <pv-inputtext v-model="filters['global'].value" placeholder="Search" />
                        </div>
                    </template>
                    <!-- Columnas de la tabla -->
                    <Column field="name" sortable :header="$t('Inventory.Product')" />
                    <Column field="type" sortable :header="$t('Inventory.Type')" />
                    <Column field="quantity" :header="$t('Inventory.Stock')" sortable>
                        <template #body="{ data }">
                            <div class="edit-quantity">
                                <span>{{ data.quantity }}</span>
                                <Button @click="openDialog(data)">{{ $t('Inventory.Edit') }}</Button>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>

    <Dialog :header="$t('Inventory.EditStock')" v-model:visible="showEditDialog" :modal="true" :closable="true"
        class="custom-dialog">
        <pv-inputtext v-model="selectedProduct.quantity" />
        <Button :label="$t('Inventory.Save')" class="p-button-success mt-2" @click="updateProduct(selectedProduct)" />
    </Dialog>

    <Dialog :header="$t('Inventory.NewProduct')" v-model:visible="showAddDialog" :modal="true" :closable="true"
        class="custom-dialog ">
        <div class="add-dialog">
            <pv-inputtext v-model="newProduct.name" :placeholder="$t('Inventory.Name')" />
            <pv-inputtext v-model="newProduct.type" :placeholder="$t('Inventory.Type')" />
            <pv-inputtext v-model="newProduct.quantity" :placeholder="$t('Inventory.Stock')" />
            <Button :label="$t('Inventory.Add')" class="p-button-success mt-2" @click="addProduct" />
        </div>
    </Dialog>
</template>

<script>
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
import { InventoryApiService } from '../services/inventoryapi.service';
import { Inventory } from '../model/inventory.entity';
import { FilterMatchMode } from '@primevue/core/api';

export default {
    name: 'InventoryComponent',
    components: {
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
            api: new InventoryApiService(),
            inventory: null,
            showEditDialog: false,
            showAddDialog: false,
            newProduct: null,
            selectedProduct: null,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
        };
    },
    methods: {
        openDialog(data) {
            this.showEditDialog = true;
            this.selectedProduct = new Inventory(data);
        },
        openAddDialog() {
            this.showAddDialog = true;
            this.newProduct = new Inventory({});
        },
        updateProduct(product) {
            this.api.updateInventory(product).then((res) => {
                this.showEditDialog = false;
                this.selectedProduct = null;
                this.inventory = null;
                this.getInventory();
            });
        },
        getInventory() {
            this.api.getInventory().then((res) => {
                this.inventory = res.data.map((i) => new Inventory(i));
            });
        },
        addProduct() {
            this.api.addInventory(this.newProduct).then((res) => {
                this.showAddDialog = false;
                this.newProduct = null;
                this.inventory = null;
                this.getInventory();
            });
        }
    },
    mounted() {
        this.getInventory();
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

.edit-quantity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;
    margin-right: -80px;
    margin-inline: auto;

    button {
        background-color: #7776bc;
    }
}

.add-dialog {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>