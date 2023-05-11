<script setup>
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const unsavedChanges = ref(true)

onBeforeRouteLeave( () => {
    if (unsavedChanges.value) {
        const accept = window.confirm("There are unsaved changes, are you sure you want to leave?")
        if(! accept) {
            return false
        }
    }
});

</script>

<template>
    <p>Edit the event</p>
</template>

<style scoped>

</style>