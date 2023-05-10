<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const router = useRouter();
const GStore = inject('GStore');
const props = defineProps({
    event: {
        type: Object,
        required: true,
    }
})
const register = function(){
    // some registration logic
    //redirection
    GStore.flashMessage = 'You\'ve been registered to ' + props.event.title;
    setTimeout( ()=>{ 
        GStore.flashMessage = '' 
    },3000 );
    router.push({name: 'event-details'});
}
</script>

<template>
    <p>Register to the event</p>
    <button @click.prevent="register">Register Me!</button>
</template>

<style scoped>

</style>