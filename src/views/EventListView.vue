<script>
  import EventCard from '@/components/EventCard.vue';
  import EventsService from '@/services/EventsService.js';
  import { defineComponent } from 'vue';
  import NProgress from 'nprogress';

export default defineComponent({
  components:{
    EventCard,
  },
  data(){
      return {
        events: null,
        totalEvents: 0,
      }
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  computed: {
    hasNextPage() {
      return this.page < this.totalPages;
    },
    totalPages(){
      return Math.ceil(this.totalEvents / 2);
    }
  },
  beforeRouteEnter( to, from, next ){
        // events.value = null;
        NProgress.start();
        EventsService
          .getEvents(2, parseInt(to.query.page) || 1 )
          .then( res => {
              next((comp) => {
                comp.events = res.data;
                comp.totalEvents = res.headers['x-total-count'];
              })
          })
          .catch( () => {
            next({name: 'network-error'});
          })
          .finally(() => {
            NProgress.done();
          });
  },
  beforeRouteUpdate( to ){
        // events.value = null;
        NProgress.start();
        EventsService
          .getEvents(2, parseInt(to.query.page) || 1 )
          .then( res => {
              this.events = res.data;
              this.totalEvents = res.headers['x-total-count'];
          })
          .catch( () => {
            return {name: 'network-error'};
          })
          .finally(() => {
            NProgress.done();
          });
  }
});
</script>
<template>
  <main>
    <h1>Events for good</h1>
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
      
      <div class="pagination">
        <RouterLink
          :to="{ query: {page: page - 1} }"
          v-if="page != 1"
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
          :to="{ query: {page: page + 1} }"
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
