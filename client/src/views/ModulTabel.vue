<script setup lang="ts">

import { accessSiteInputs, editInputs, sharedStates } from "@/sharedStates";
import { computed, onMounted } from "vue";
import { deleteModules, exitAccessId, renderModuleList } from "@/database.service";
import type { Module } from "@/interfaces/Module";
import ListEntrys from "@/components/ListEntrys.vue";
import ModalEdit from "@/components/Modal-Edit.vue";

onMounted(async () => {
  await renderModuleList();
})


function triggerAddModuleModal() {
  editInputs.moduleId = 0;
  editInputs.moduleName = "";
  editInputs.moduleCrp = 0;
  editInputs.moduleGrade = 0;
  editInputs.moduleWeight = 0;

  sharedStates.formVisible = !sharedStates.formVisible;
}


const calculateAverageGrade = computed(() => {
  const moduleList: Module[] = sharedStates.moduleList;
  const passedModules: Module[] = moduleList.filter((module) => module.moduleGrade >= 50);
  if (passedModules.length === 0) {
    return "";
  }

  const totalGrade = passedModules.reduce((sum, module) => sum + module.moduleGrade, 0);
  const averageGrade = totalGrade / passedModules.length;

  return averageGrade.toFixed(1)
})

async function handleDeleteAllModules() {
  await deleteModules();
  await renderModuleList();
}

async function handleStartNewOverview() {
  await exitAccessId();
  await renderModuleList();
  accessSiteInputs.getText = '';
  accessSiteInputs.postText = '';
  sharedStates.showList = false;
}

</script>

<template>
  <div id="app" class="container">
    <div class="row justify-content-center mt-5">
      <div class="card" id="master-card">
        <div class="row justify-content-around mt-3">
          <div class="col">
            <h5 class="card-title">Übersicht</h5>
            <h6 class="card-subtitle mb-2">Informationen über belegte Module</h6>
          </div>
          <div class="col-auto">
            <button v-if="sharedStates.formVisible" class="btn btn-danger mx-1" @click="triggerAddModuleModal">
              Schließen
            </button>
            <button v-if="!sharedStates.formVisible" class="btn btn-success mx-1" @click="triggerAddModuleModal">
              Modul hinzufügen
            </button>
          </div>
        </div>


        <ModalEdit/>

        <div class="container">
          <ListEntrys/>
        </div>

        <div class="row d-flex my-4" :class="calculateAverageGrade !== '' ? 'justify-content-around' : 'justify-content-end'">
          <div v-if="calculateAverageGrade !== ''" class="col d-flex align-content-center align-items-center">
            <h5 class="m-0">Durchschnittsnote: {{ calculateAverageGrade }}%</h5>
          </div>
          <div v-if="sharedStates.moduleList.length !== 0" class="col-auto">
            <button class="btn btn-danger" @click="handleDeleteAllModules">Lösche alle Module</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-end mt-3">
      <div class="col-auto p-0">
        <button class="btn btn-primary" @click="handleStartNewOverview">Neue übersicht öffnen</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>