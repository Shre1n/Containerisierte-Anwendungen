<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from "vue";
import { checkAccessId } from "@/database.service";

onMounted(async () => {
  const access = await checkAccessId();
  if (access) {
    window.location.href = "/";
  } else {
    window.location.href = "/access"
  }


})

</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
