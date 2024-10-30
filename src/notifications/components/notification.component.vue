<template>
    <div class="notification">
        <h2>{{ notification.description }}</h2>
        <pv-divider />
        <div class="date">
            <p>Fecha</p>
            <p>{{ notification.date }}</p>
        </div>

        <div class="time">
            <p>Hora</p>
            <p>{{ notification.time }}</p>
        </div>
    </div>
</template>
<script>
import { Notification } from '../model/notification.entity';

export default {
    props: {
        notification: {
            type: Notification,
            required: true
        }
    },
    methods: {
        toggle(event) {
            this.$refs.op.toggle(event);
        }
    }
};
</script>

<style scoped>
.notification {
    display: flex;
    flex-direction: column;
    /* gap: 10px; */
    background: #fff;
    padding: 10px 10px;
    border-radius: 8px;
    width: 200px;

    h2 {
        font-weight: 900;
    }

    .date {
        p:first-child {
            font-weight: 900;
        }
    }

    .time {
        p:first-child {
            font-weight: 900;
        }
    }
}
</style>