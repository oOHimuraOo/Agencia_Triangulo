<script setup lang="ts">
import SingleLineNumberInput from './inputs/SingleLineNumberInput.vue'

const emit = defineEmits(['agencyStandingChanged'])

const quandoAgencyStandingChanged = (valor: string) => {
  emit('agencyStandingChanged', valor)
}
</script>

<template>
  <div class="input_container">
    <ul>
      <li>
        <SingleLineNumberInput nome="Commendations" :chave="'Commendations'" />
      </li>
      <li>
        <SingleLineNumberInput
          nome="Demerits"
          :chave="'Demerits'"
          @agency-standing-changed="quandoAgencyStandingChanged"
        />
      </li>
      <li>
        <SingleLineNumberInput nome="Additional Burnout" :chave="'Additional Burnout'" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.input_container {
  ul {
    li {
      margin-bottom: 20px;
    }
  }
}
</style>
