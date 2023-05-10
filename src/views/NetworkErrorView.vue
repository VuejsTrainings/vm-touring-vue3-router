<template>
    <h1>Uh oh</h1>
    <h3>Looks like your network or the API server is down.<br />
        Please take a breath and
      <a href="#" @click="$router.go(-1)">click here</a> to try again.
    </h3>
</template>