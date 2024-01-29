<script setup lang="ts">

import { editInputs, sharedStates } from "@/sharedStates";
import { computed, onMounted } from "vue";
import { postModule, putModule, renderModuleList } from "@/database.service";
import type {Module} from "@/interfaces/Module";
import type { PutModule } from "@/interfaces/PutModule";
import ListEntrys from "@/components/ListEntrys.vue";

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


async function saveChanges() {
  sharedStates.formVisible = false;
  const updateData: PutModule = {
    moduleCrp: editInputs.moduleCrp,
    moduleGrade: editInputs.moduleGrade,
    moduleName: editInputs.moduleName,
    moduleWeight: editInputs.moduleWeight
  }
  if (editInputs.moduleId === 0) {
    await postModule(updateData);
  } else {
    await putModule(editInputs.moduleId, updateData);
  }
  await renderModuleList();
}

const calculateAverageGrade = computed(()=>{
  const moduleList: Module[] = sharedStates.moduleList;
  const passedModules: Module[] = moduleList.filter((module) => module.moduleGrade >= 50);
  if (passedModules.length === 0) {
    return "";
  }

  const totalGrade = passedModules.reduce((sum, module) => sum + module.moduleGrade, 0);
  const averageGrade = totalGrade / passedModules.length;

  return averageGrade.toFixed(1)
})

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


        <div class="justify-content-center d-flex">
          <form @submit.prevent="saveChanges" v-show="sharedStates.formVisible" style="max-width: 20em">
            <div class="mb-3">
              <label for="modulNameInput" class="form-label">Modul Name</label>
              <input v-model="editInputs.moduleName" type="text" class="form-control" id="modulNameInput">
            </div>
            <div class="mb-3">
              <label for="modulCrpInput" class="form-label">Modul Crp</label>
              <input v-model="editInputs.moduleCrp" type="number" class="form-control" id="modulCrpInput">
            </div>
            <div class="mb-3">
              <label for="modulGradeInput" class="form-label">Modul Grade:</label>
              <input v-model="editInputs.moduleGrade" type="number" class="form-control" id="modulGradeInput">
            </div>
            <div class="mb-3">
              <label for="modulWeightInput" class="form-label">Modul Weight:</label>
              <input v-model="editInputs.moduleWeight" type="number" class="form-control" id="modulWeightInput">
            </div>
            <button class="btn btn-primary" type="submit">Übernehmen</button>
          </form>
        </div>

        <div class="container">
          <ListEntrys/>
        </div>

        <div v-if="calculateAverageGrade !== ''" class="row justify-content-center mt-4">
            <h5 class="my-4">Durchschnittsnote: {{ calculateAverageGrade}}%</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>