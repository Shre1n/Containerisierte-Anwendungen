<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {onMounted} from "vue";
import {sharedStates} from "@/sharedStates";
import data from './testData.json'
import type {Module} from "@/interfaces/Module";

onMounted(async () => {
  sharedStates.moduleList = data.moduleList as Module[];

  try {
    const res = await fetch("/api/test");
    const data = await res.json();
    console.log("WOWW:", data.message)
  } catch (e) {
    console.log("ERRRRORRRR:", e)
  }

})

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
