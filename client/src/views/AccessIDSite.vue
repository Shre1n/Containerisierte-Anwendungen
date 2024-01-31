<script setup lang="ts">
import { renderModuleList, setAccessId, setAndGetNewAccessId } from "@/database.service";
import { accessSiteInputs, sharedStates } from "@/sharedStates";

function copy() {
  navigator.clipboard.writeText(accessSiteInputs.getText)
}

async function generateAccessId() {
  const accessId = await setAndGetNewAccessId();
  if (accessId) {
    accessSiteInputs.getText = accessId;
  }
}

async function handleSetAccessId() {
  const accessId = await setAccessId(accessSiteInputs.postText);
  if (accessId) {
    accessSiteInputs.getText = accessId;
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
        <template v-if="accessSiteInputs.getText.length !== 0">
          <p>Bewahre diese AccessId gut auf. Wenn du sie einmal verloren hast gibt es keinen Weg sie wieder zu
            bekommen.</p>
          <div class="input-group">
            <input
                class="form-control"
                ref="clone"
                readonly
                :value="accessSiteInputs.getText"/>
            <button class="btn btn-primary" @click="copy">Kopieren!</button>
          </div>
        </template>
        <template v-if="accessSiteInputs.getText.length === 0">
          <p>Du hast bereits eine AccessId? Kopiere sie in dieses Textfeld und sende sie ab um deine Daten zu
            bekommen.</p>
          <div class="input-group">
            <input
                class="form-control"
                ref="input"
                v-model="accessSiteInputs.postText"/>
            <button class="btn btn-success" @click="handleSetAccessId">Senden</button>
          </div>
          <p class="mt-3">Du bist neu hier? Dann klicke hier um deine persönliche AccessId zu bekommen!</p>
          <button class="btn btn-secondary" @click="generateAccessId">Erhalte deine AccessId</button>
        </template>

        <button v-if="accessSiteInputs.getText.length !== 0" @click="handleShowModuleList" type="button"
                class="btn btn-success mt-4">Weiter gehts!
        </button>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>