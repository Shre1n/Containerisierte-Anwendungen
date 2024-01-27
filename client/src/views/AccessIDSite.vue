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
  <div id="app" class="container">
    <div class="row">


      <div class="col-5">
        <template v-if="inputs.getText.length !== 0">
          <p>Bewahre diese AccessId gut auf. Wenn du sie einmal verloren hast gibt es keinen Weg sie wieder zu
            bekommen.</p>
          <input
              ref="clone"
              readonly
              :value="inputs.getText"/>
          <button @click="copy">Kopieren!</button>
        </template>
        <template v-if="inputs.getText.length === 0">
          <p>Du hast bereits eine AccessId? Kopiere sie in dieses Textfeld und sende sie ab um deine Daten zu
            bekommen.</p>
          <input
              ref="input"
              v-model="inputs.postText"/>
          <button @click="handleSetAccessId">Senden</button>
          <p>Du bist neu hier? Dann klicke hier um deine persönliche AccessId zu bekommen!</p>
          <button @click="generateAccessId">Erhalte deine AccessId</button>
        </template>

        <button v-if="inputs.getText.length !== 0" @click="handleShowModuleList" type="button"
                class="btn btn-secondary">Weiter gehts!
        </button>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>