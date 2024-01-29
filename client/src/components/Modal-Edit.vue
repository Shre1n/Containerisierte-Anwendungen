<script setup lang="ts">


import { editInputs, sharedStates } from "@/sharedStates";
import type { PutModule } from "@/interfaces/PutModule";
import { postModule, putModule, renderModuleList } from "@/database.service";


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

</script>

<template>
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
</template>

<style scoped>

</style>