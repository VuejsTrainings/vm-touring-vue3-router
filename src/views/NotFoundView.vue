<script setup>
    const props = defineProps({
        resource:{
            type: String,
            required: true,
            default: 'page',
        }
    })
</script>
<template>
    <h1>Not found</h1>
    <h3>The {{ props.resource }} you're looking for is not here. </h3>
    <router-link :to="{ name: 'event-list' }">Back Home!</router-link>
</template>