<script setup lang="ts">

import {sharedStates} from "@/sharedStates";
import {reactive} from "vue";

const editInputs = reactive({
  moduleName: "",
  moduleCrp: 0,
  moduleGrade: 0,
  moduleWeight: 0
});

function edit(moduleName: string) {
  const module = sharedStates.moduleList.find((m) => {
    return m.moduleName = moduleName
  });

  if (!module) {
    console.log("module Not found");
    return
  }

  editInputs.moduleName = module.moduleName;
  editInputs.moduleCrp = module.moduleCrp;
  editInputs.moduleGrade = module.moduleGrade;
  editInputs.moduleWeight = module.moduleWeight;

  sharedStates.formVisible = true;

}

function remove(moduleName: string) {
  sharedStates.moduleList = sharedStates.moduleList.filter((m) => {
    return m.moduleName !== moduleName;
  })
}

function saveChanges() {
  sharedStates.formVisible = false
  sharedStates.moduleList.forEach((_, i, modules) => {
    if (modules[i].moduleName === editInputs.moduleName) {
      modules[i].moduleName = editInputs.moduleName
      modules[i].moduleCrp = editInputs.moduleCrp
      modules[i].moduleGrade = editInputs.moduleGrade
      modules[i].moduleWeight = editInputs.moduleWeight
    }
  })
}
</script>

<template>
  <div id="app" class="container">
    <div class="row justify-content-center">
      <div class="col-auto">
        <button class="btn btn-primary mx-1" >Speichern</button>
        <button class="btn btn-success mx-1" >Laden</button>
      </div>
    </div>
    <div class="row justify-content-center mt-4">
      <div class="card" id="master-card">
        <h5 class="card-title">Übersicht</h5>
        <h6 class="card-subtitle mb-2">Informationen über belegte Module</h6>

        <div class="justify-content-center d-flex">
          <form @submit.prevent="saveChanges" v-show="sharedStates.formVisible" style="max-width: 10em">
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
            <button class="btn" type="submit">Übernehmen</button>
          </form>
        </div>
        <table id="master-head" class="table mt-4">
          <thead class="thead-dark">
          <tr>
            <th>Module</th>
            <th>Crp</th>
            <th>Note</th>
            <th>Gewichtung</th>
            <th>Editieren & Löschen</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="module in sharedStates.moduleList" :key="module.moduleName">
            <td>{{ module.moduleName }}</td>
            <td>{{ module.moduleCrp }}</td>
            <td>{{ module.moduleGrade }}%</td>
            <td>{{ module.moduleWeight }}</td>
            <td>
              <button class="btn btn-primary mx-1" @click="edit(module.moduleName)">Editieren</button>
              <button class="btn btn-danger mx-1" @click="remove(module.moduleName)">Löschen</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>