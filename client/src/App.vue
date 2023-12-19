<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {onMounted} from "vue";
import {sharedStates} from "@/sharedStates";
import data from './testData.json'
import type {Module} from "@/interfaces/Module";

onMounted(()=> {
  sharedStates.moduleList = data.moduleList as Module[];
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
