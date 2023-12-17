<template>
  <div id="app" class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <router-view/>
        <b-button variant="primary" @click="save">Speichern</b-button>
        <b-button variant="success" @click="load">Laden</b-button>
      </div>
    </div>
    <div class="row justify-content-center mt-4">
      <b-card id="master-card"
              title="Übersicht"
              sub-title="Informationen über belegte Module"
      >
        <div class="justify-content-center d-flex">
          <b-form @submit.prevent="saveChanges" v-show="formVisible" style="max-width: 10em">
            <b-form-group label="Modulname" label-for="modulName">
              <b-form-input id="modulName" ref="moduleNameInput">

              </b-form-input>
            </b-form-group>
            <b-form-group label="Modulcrp" label-for="modulCrp">
              <b-form-input id="modulCrp" ref="moduleCrpInput">

              </b-form-input>
            </b-form-group>
            <b-form-group label="Modulgrade (%)" label-for="modulGrade">
              <b-form-input id="modulGrade" ref="moduleGradeInput">

              </b-form-input>
            </b-form-group>
            <b-form-group label="Modulweight" label-for="modulWeight">
              <b-form-input id="modulWeight" ref="moduleWeightInput">

              </b-form-input>
            </b-form-group>
            <b-button type="submit">Übernehmen</b-button>
          </b-form>
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
          <tr v-for="module in modules">
            <td>{{ module.moduleName }}</td>
            <td>{{ module.moduleCrp }}</td>
            <td>{{ module.moduleGrade }}%</td>
            <td>{{ module.moduleWeight }}</td>
            <td>
              <b-button variant="primary" @click="edit(module.moduleName)">Editieren</b-button>
              <b-button variant="danger" @click="remove(module.moduleName)">Löschen</b-button>
            </td>
          </tr>
          </tbody>
        </table>
      </b-card>
    </div>
  </div>
</template>


<script>
export default {
  name: 'App',
  configureWebpack:{
    devtool:"source-map"
  },
  data() {
    return {
      modules: [{moduleName: "LA", moduleCrp: 6, moduleGrade: 67, moduleWeight: 2}],
      formVisible: false
    }
  },
  methods: {
    edit(moduleName) {
      this.formVisible = true;
      this.$refs.moduleNameInput.value = moduleName;
      this.$refs.moduleCrpInput.value = this.modules.find((m) => {
        return m.moduleName = moduleName
      }).moduleCrp;
      this.$refs.moduleGradeInput.value = this.modules.find((m) => {
        return m.moduleName = moduleName
      }).moduleGrade;
      this.$refs.moduleWeightInput.value = this.modules.find((m) => {
        return m.moduleName = moduleName
      }).moduleWeight;
    },
    remove(moduleName) {
      this.modules = this.modules.filter((m) => {
        return m.moduleName !== moduleName;
      })
    },
    saveChanges() {
      this.formVisible = false
      this.modules.forEach((_,i,modules) => {
        if (modules[i].moduleName === this.$refs.moduleNameInput.value) {
          modules[i].moduleName = this.$refs.moduleNameInput.value
          modules[i].moduleCrp = this.$refs.moduleCrpInput.value
          modules[i].moduleGrade = this.$refs.moduleGradeInput.value
          modules[i].moduleWeight = this.$refs.moduleWeightInput.value
        }
      })
    }
  }

}
</script>

<style>
#master-head {
  background: darkkhaki;
  width: 100%;
  letter-spacing: 0.1em;
}

#master-card {
  background: cornsilk;
  width: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
