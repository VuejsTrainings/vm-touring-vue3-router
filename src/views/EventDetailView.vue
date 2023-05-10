<script setup>
import {ref, onMounted } from 'vue';
import EventsService from '@/services/EventsService.js';

const event = ref(null);
const props = defineProps({
    id: {
        required: true,
    },
});

onMounted(() => {
    EventsService
        .getEvent( props.id )
        .then (res => event.value = res.data )
        .catch( err => console.log(err) )
})
</script>

<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description  }}</p>
    </div>
</template>

<style scoped>

</style>