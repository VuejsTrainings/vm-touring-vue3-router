<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const register = function(){
    // some registration logic
    //redirection
    router.push({name: 'event-details'});
}
</script>

<template>
    <p>Register to the event</p>
    <button @click.prevent="register">Register Me!</button>
</template>

<style scoped>

</style>