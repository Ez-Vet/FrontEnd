<template>
    <div class="notification__button" @click="toggle">
        <img src="/img/notification-icon.png">
        <pv-popover ref="op">
            <div class="notification__list">
                <template v-for="notification in notifications">
                    <notificationComponent :notification="notification" />
                </template>
            </div>
        </pv-popover>
    </div>

</template>
<script>
import notificationComponent from './notification.component.vue';
import { Notification } from '../model/notification.entity';
import { NotificationApiService } from '../services/notificationapi.service';


export default {
    data() {
        return {
            api: new NotificationApiService(),
            notifications: null
        };
    },
    methods: {
        toggle(event) {
            this.$refs.op.toggle(event);
        }
    },
    components: { notificationComponent },
    mounted() {
        /*    this.api.getNotifications().then((response => {
               const data = response.data;
   
               this.appointments = data.map(notification => new Notification(notification));
           })) */

        this.api.getNotifications().then((res => {
            const data = res.data;
            this.notifications = data.map(notification => new Notification(notification));
        }))
    }
};
</script>

<style scoped>
.notification__button {
    border-radius: 500px;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    background: #D9D8FB;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 10px;
    margin-right: 10px;

    img {
        width: 35px;
    }
}

.notification__list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>

<style>
.p-popover {
    border-color: #D9D8FB !important;
}

.p-popover-content {
    background: #D9D8FB;
}
</style>
