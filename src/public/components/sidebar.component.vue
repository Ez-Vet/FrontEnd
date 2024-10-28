<script>
import changelangComponent from './changelang.component.vue';

export default {
    name: "sidebar",
    components: {
        changelangComponent
    }
}

</script>

<template>
    <div class="sidebar">
        <div class="change">
            <changelangComponent />
        </div>

        <div class="icons">
            <button class="button">
                <!-- <i class="pi pi-user"></i> -->
                <img src="/img/user-icon.png">
                Perfil
            </button>

            <RouterLink to="/appointments">
                <button class="button">
                    <!-- <i class="pi pi-address-book"></i> -->
                    <img src="/img/book-icon.png">
                    Citas
                </button>
            </RouterLink>

            <button class="button">
                <img src="/img/pet-icon.png">
                Inventario
            </button>

            <button class="button">
                <img src="/img/people-icon.png">
                Comunidad
            </button>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    width: 270px;
    background: #7776BC;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding-top: 10px;
    padding-left: 10px;
}

.button {
    width: 200px;
    /* border-radius: 19px; */
    padding-block: 5px;
    padding-inline: 10px;
    font-family: Roboto;
    font-size: 25px;
    display: flex;
    gap: 10px;
    align-items: center;
}

.button img {
    width: 40px;
}

.button:hover {
    background: #FFFFFF;
    font-weight: 600;
}

.icons {
    display: flex;
    flex-direction: column;
    /* width: 150px; */
    gap: 15px;
    align-items: center;
}
</style>