<script setup lang="ts">
import SingleLineNumberInput from './inputs/SingleLineNumberInput.vue'
</script>

<template>
  <div class="input_container">
    <ul>
      <li>
        <SingleLineNumberInput nome="Commendations" :chave="'Commendations'" />
      </li>
      <li>
        <SingleLineNumberInput nome="Demerits" :chave="'Demerits'" />
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
