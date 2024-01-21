<script setup lang="ts">
import { setAccessId, setAndGetNewAccessId } from "@/database.service";
import { reactive } from "vue";

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

</script>

<template>
<div class="container d-flex justify-content-center">
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
        :value="inputs.postText"/>
    <button @click="handleSetAccessId">Senden</button>
    <p>Du bist neu hier? Dann klicke hier um deine persönliche AccessId zu bekommen!</p>
    <button @click="generateAccessId">Erhalte deine AccessId</button>
  </template>

  <button v-if="inputs.getText.length !== 0" href="/" type="button" class="btn btn-secondary">Weiter gehts!</button>
</div>



</template>

<style scoped>

</style>