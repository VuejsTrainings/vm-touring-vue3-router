<script setup>
  import EventCard from '@/components/EventCard.vue';
  import { ref, onMounted } from 'vue';
  import EventsService from '@/services/EventsService.js';

  let events = ref(null);

  onMounted(() => {
    EventsService
      .getEvents()
      .then( res => {
        events.value = res.data;
      })
      .catch(err => {
        console.log(err)
      }
      );
  })
</script>

<template>
  <main>
    <h1>Events for good</h1>
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </main>
</template>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items:center;
}
</style>
