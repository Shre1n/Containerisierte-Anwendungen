<script setup lang="ts">

import { editInputs, sharedStates } from "@/sharedStates";
import { deleteModule, getModule, renderModuleList } from "@/database.service";


async function edit(id: number) {
  const module = await getModule(id);

  if (!module) {
    console.log("module Not found");
    return
  }
  editInputs.moduleId = module.id;
  editInputs.moduleName = module.moduleName;
  editInputs.moduleCrp = module.moduleCrp;
  editInputs.moduleGrade = module.moduleGrade;
  editInputs.moduleWeight = module.moduleWeight;

  sharedStates.formVisible = true;

}

async function remove(id: number) {
  await deleteModule(id);
  await renderModuleList();
}




</script>

<template>
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
    <tr v-for="module in sharedStates.moduleList" :key="module.id">
      <td>{{ module.moduleName }}</td>
      <td>{{ module.moduleCrp }}</td>
      <td>{{ module.moduleGrade }}%</td>
      <td>{{ module.moduleWeight }}</td>
      <td>
        <button class="btn btn-primary mx-1" @click="edit(module.id)">Editieren</button>
        <button class="btn btn-danger mx-1" @click="remove(module.id)">Löschen</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>