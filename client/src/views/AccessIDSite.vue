<script setup lang="ts">
import { renderModuleList, setAccessId, setAndGetNewAccessId } from "@/database.service";
import { reactive } from "vue";
import { sharedStates } from "@/sharedStates";

const inputs = reactive({
  getText: '',
  postText: ''
})

function copy() {
  navigator.clipboard.writeText(inputs.getText)
}

async function generateAccessId() {
  const accessId = await setAndGetNewAccessId();
  if (accessId) {
    inputs.getText = accessId;
  }
}

async function handleSetAccessId() {
  const accessId = await setAccessId(inputs.postText);
  if (accessId) {
    inputs.getText = accessId;
  }
}

async function handleShowModuleList() {
  await renderModuleList();
  sharedStates.showList = true;
}

</script>

<template>
  <div id="app" class="container mt-5">
    <div class="row">


      <div class="col-5">
        <template v-if="inputs.getText.length !== 0">
          <p>Bewahre diese AccessId gut auf. Wenn du sie einmal verloren hast gibt es keinen Weg sie wieder zu
            bekommen.</p>
          <div class="input-group">
            <input
                class="form-control"
                ref="clone"
                readonly
                :value="inputs.getText"/>
            <button class="btn btn-primary" @click="copy">Kopieren!</button>
          </div>
        </template>
        <template v-if="inputs.getText.length === 0">
          <p>Du hast bereits eine AccessId? Kopiere sie in dieses Textfeld und sende sie ab um deine Daten zu
            bekommen.</p>
          <div class="input-group">
            <input
                class="form-control"
                ref="input"
                v-model="inputs.postText"/>
            <button class="btn btn-success" @click="handleSetAccessId">Senden</button>
          </div>
          <p>Du bist neu hier? Dann klicke hier um deine persönliche AccessId zu bekommen!</p>
          <button class="btn btn-secondary" @click="generateAccessId">Erhalte deine AccessId</button>
        </template>

        <button v-if="inputs.getText.length !== 0" @click="handleShowModuleList" type="button"
                class="btn btn-secondary mt-4">Weiter gehts!
        </button>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>