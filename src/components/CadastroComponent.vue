<script setup lang="ts">
import { ref } from 'vue'
import SelectInput from './inputs/SelectInput.vue'
import SingleLineTextInput from './inputs/SingleLineTextInput.vue'

const emit = defineEmits([
  'anomalySelected',
  'competencySelected',
  'realitySelected',
  'newName',
  'newPronoun',
])

const selectedAnomaly = ref('')
const selectedCompetency = ref('')
const selectedReality = ref('')
const selectedName = ref('')
const selectedPronoun = ref('')

const updateAnomaly = (anomaly: string) => {
  selectedAnomaly.value = anomaly
  emit('anomalySelected', anomaly)
}

const updateCompetency = (competency: string) => {
  selectedCompetency.value = competency
  emit('competencySelected', competency)
}

const updateReality = (reality: string) => {
  selectedReality.value = reality
  emit('realitySelected', reality)
}

const updateName = (newName: string) => {
  selectedName.value = newName
  emit('newName', newName)
}

const updatePronoun = (newPronoun: string) => {
  selectedPronoun.value = newPronoun
  emit('newPronoun', newPronoun)
}
</script>

<template>
  <div class="cadastro_container">
    <div class="agent_info">
      <ul>
        <li>
          <SingleLineTextInput nome="Character Name" @character-name="updateName" chave="Character Name"/>
          <SingleLineTextInput nome="Pronouns" @-character-pronouns="updatePronoun" chave="Pronouns"/>
        </li>
        <li><SingleLineTextInput nome="Agency Title" chave="Agency Title"/></li>
        <li><SingleLineTextInput nome="Agency Standing" chave="Agency Standing"/></li>
      </ul>
    </div>
    <div class="agent_caracteristic">
      <ul>
        <li>
          <SelectInput
            tipo="Anom"
            :viewer="false"
            v-model:selected="selectedAnomaly"
            @anomalySelected="updateAnomaly"
            @competency-selected="updateCompetency"
            @reality-selected="updateReality"
            :chave="'anomalia1'"
          />
        </li>
        <li>
          <SelectInput
            tipo="Real"
            :viewer="false"
            v-model:selected="selectedReality"
            @anomalySelected="updateAnomaly"
            @competency-selected="updateCompetency"
            @reality-selected="updateReality"
            :chave="'realidade1'"
          />
        </li>
        <li>
          <SelectInput
            tipo="Comp"
            :viewer="false"
            v-model:selected="selectedCompetency"
            @anomalySelected="updateAnomaly"
            @competency-selected="updateCompetency"
            @reality-selected="updateReality"
            :chave="'competencia1'"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cadastro_container {
  display: flex;

  .agent_info {
    width: 100%;
    height: 100%;

    ul {
      li {
        margin-bottom: 4px;
        display: flex;
        div {
          margin-right: 5px;
          width: 100%;
        }
      }
    }
  }

  .agent_caracteristic {
    margin-left: 20px;
    ul {
      li {
        margin-bottom: 8px;
      }
    }
  }
}
</style>
