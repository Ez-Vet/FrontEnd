<template>
    <div class="sidebar-layout">
        <sidebarComponent />
        <notificiationsComponent />
        <router-view />
    </div>
</template>

<script>
import sidebarComponent from '../components/sidebar.component.vue';
import notificiationsComponent from '../../notifications/components/notification-list.component.vue';

export default {
    name: 'SidebarLayout',
    components: { sidebarComponent, notificiationsComponent }
}
</script>


<style scoped>
.sidebar-layout {
    display: flex;
    background-color: #8BDCD6;
}

body {
    background: #8BDCD6;
}
</style>