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
            <RouterLink to="/profile">
                <button class="button">
                    <!-- <i class="pi pi-user"></i> -->
                    <img src="/img/user-icon.png">
                    {{ $t('Sidebar.Profile') }}
                </button>
            </RouterLink>

            <RouterLink to="/appointments">
                <button class="button">
                    <!-- <i class="pi pi-address-book"></i> -->
                    <img src="/img/book-icon.png">
                    {{ $t('Sidebar.Quotes') }}
                </button>
            </RouterLink>

            <RouterLink to="/inventory">
                <button class="button">
                    <img src="/img/pet-icon.png">
                    {{ $t('Sidebar.Inventory') }}
                </button>
            </RouterLink>

            <RouterLink to="/pets">
                <button class="button">
                    <img src="/img/pet-icon.png">
                    Mascotiñas
                </button>
            </RouterLink>

            <button class="button">
                <img src="/img/people-icon.png">
                {{ $t('Sidebar.Community') }}
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