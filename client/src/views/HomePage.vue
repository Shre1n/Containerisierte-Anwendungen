<script setup lang="ts">
import { onMounted } from "vue";
import { checkAccessId } from "@/database.service";
import ModulTabel from "@/views/ModulTabel.vue";
import AccessIDSite from "@/views/AccessIDSite.vue";
import { sharedStates } from "@/sharedStates";


onMounted(async () => {
  const access = await checkAccessId();
  if(access) {
    sharedStates.showList = true;
  } else {
    sharedStates.showList = false;
  }


})
</script>

<template>

  <template v-if="sharedStates.showList !== undefined">
    <ModulTabel v-show="sharedStates.showList"/>
    <AccessIDSite v-show="!sharedStates.showList"/>
  </template>


</template>

<style scoped>

</style>