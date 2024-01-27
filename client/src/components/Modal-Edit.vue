<script setup lang="ts">
import { sharedStates } from "@/sharedStates";
import { reactive } from "vue";

const emit = defineEmits<{
  edit: [func: (id: number)=> void]
  update: [value: string]
}>()


function saveChanges() {
  sharedStates.formVisible = false;
  const index = sharedStates.moduleList.findIndex(module => module.id === editInputs.moduleId);

  if (index !== -1) {
    sharedStates.moduleList[index] = {
      ...sharedStates.moduleList[index],
      moduleName: editInputs.moduleName,
      moduleWeight: editInputs.moduleWeight,
      moduleCrp: editInputs.moduleCrp,
      moduleGrade: editInputs.moduleGrade,
    };
  } else {
    console.log(`Module not found.`);
  }

  console.log(sharedStates.moduleList)
}

const editInputs = reactive({
  moduleId: 0,
  moduleName: "",
  moduleCrp: 0,
  moduleGrade: 0,
  moduleWeight: 0
});

function edit(id: number) {
  const module = sharedStates.moduleList.find((m) => {
    return m.id = id
  });

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

</script>

<template>
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
      <button class="btn btn-primary" type="submit">Übernehmen</button>
    </form>
  </div>
</template>

<style scoped>

</style>