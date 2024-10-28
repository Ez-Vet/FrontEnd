<template>
    <div class="sidebar-layout">
        <sidebarComponent />
        <router-view />
    </div>
</template>

<script>
import sidebarComponent from '../sidebar.component.vue';

export default {
    name: 'SidebarLayout',
    components: { sidebarComponent }
}
</script>

<style>
/* .sidebar-layout {
    display: flex;
}

.sidebar {
    width: 250px;
    background-color: #f4f4f4;
    padding: 20px;
}

.main-content {
    flex-grow: 1;
    padding: 20px;
} */
body {
    background: #8BDCD6;
}
</style>

<style scoped>
.sidebar-layout {
    display: flex;
}
</style>