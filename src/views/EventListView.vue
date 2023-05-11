<script setup>
  import EventCard from '@/components/EventCard.vue';
  import { ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import EventsService from '@/services/EventsService.js';

  const router = useRouter();
  const route = useRoute();

  const events = ref(null);
  const totalEvents = ref(0);
  
  const props = defineProps({
    page: {
      type: Number,
      required: true
    }
  });

  const totalPages = computed(() => {
    return Math.ceil(totalEvents.value / 2);
  })

  const hasNextPage = computed(() => {
    return props.page < totalPages.value;
  })

  const useRouteBeforeEnter = () => {
      events.value = null;
      EventsService
        .getEvents(2, parseInt(route.query.page) || 1 )
        .then( res => {
            events.value = res.data;
            totalEvents.value = res.headers['x-total-count'];
        })
        .catch( () => {
          router.push({name: 'network-error'});
        });
  };
  useRouteBeforeEnter();
</script>

<template>
  <main>
    <h1>Events for good</h1>
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
      
      <div class="pagination">
        <RouterLink
          :to="{ query: {page: props.page - 1} }"
          v-if="props.page != 1"
          class="prev"
          rel="prev"
        >&lt; Previous</RouterLink>
        <div class="pages">
          <RouterLink
            v-for="pageIndex in totalPages"
            :key="pageIndex"
            :to="{ query: { page: pageIndex } }"
          > {{ pageIndex }} </RouterLink>
        </div>
        <RouterLink
          :to="{ query: {page: props.page + 1} }"
          rel="next"
          class="next"
          v-if="hasNextPage"
        >Next &gt;</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items:center;
}
.pagination{
  display: flex;
  justify-content: space-between;
  width: 290px;
}

.pagination a{
  /* flex: 1; */
  text-decoration: none;
  color: #2c3e50;
}
.pagination .prev{
  text-align: left
}
.pagination .next{
  text-align: right
}
.pagination .pages{
  text-align: center;
}
.pagination .pages:first-child{
  margin-left:40%;
}
.pagination .pages:last-child{
  margin-right:40%;
}
.pagination .pages a:not(:last-of-type)::after{
  content: ' | ';
}
</style>
