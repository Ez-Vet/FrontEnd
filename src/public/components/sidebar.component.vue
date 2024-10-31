<script>
import changelangComponent from './changelang.component.vue';

export default {
    name: "sidebar",
    components: {
        changelangComponent
    },
    computed: {
        isClientRoute() {
            return this.$route.path.startsWith('/client');
        }
    }
}

</script>

<template>
    <div class="sidebar">
        <div class="change">
            <changelangComponent />
        </div>

        <div class="icons">
            <!-- Estos enlaces ahora son relativos al contexto actual (client o doctor) -->
            <RouterLink to="profile">
                <button class="button">
                    <img src="/img/user-icon.png">
                    {{ $t('Sidebar.Profile') }}
                </button>
            </RouterLink>

            <RouterLink to="appointments">
                <button class="button">
                    <img src="/img/book-icon.png">
                    {{ $t('Sidebar.Quotes') }}
                </button>
            </RouterLink>
            <template v-if="!isClientRoute">
                <RouterLink to="inventory">
                    <button class="button">
                        <img src="/img/pet-icon.png">
                        {{ $t('Sidebar.Inventory') }}
                    </button>
                </RouterLink>
            </template>

            <template v-if="isClientRoute">
                <RouterLink to="pets">
                    <button class="button">
                        <img src="/img/pet-icon.png">
                        {{ $t('Sidebar.Pet') }}
                    </button>
                </RouterLink>
            </template>

            <!-- <button class="button">
                <img src="/img/people-icon.png">
                {{ $t('Sidebar.Community') }}
            </button> -->
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