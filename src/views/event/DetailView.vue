<script setup>
const props = defineProps({
    event: {
        type: Object,
        required: true,
    },
});

</script>

<template>
        <p>{{ props.event.time }} on {{ props.event.date }} @ {{ props.event.location }}</p>
        <p>{{ props.event.description  }}</p>
</template>

<style scoped>

</style>