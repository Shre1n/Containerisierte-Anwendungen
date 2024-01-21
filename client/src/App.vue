<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from "vue";
import { renderModuleList } from "@/database.service";

onMounted(async () => {
  await renderModuleList();
})

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView/>
</template>

<style scoped>

</style>
