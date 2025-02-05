<script setup lang="ts">
import MarkerInput from './inputs/MarkerInput.vue'
</script>

<template>
  <div class="input_container">
    <ul>
      <li>
        <MarkerInput skill="Attentiveness" chave="Attentiveness"/>
      </li>
      <li>
        <MarkerInput skill="Duplicity" chave="Duplicity"/>
      </li>
      <li>
        <MarkerInput skill="Dynamism" chave="Dynamism"/>
      </li>
      <li>
        <MarkerInput skill="Empathy" chave="Empathy"/>
      </li>
      <li>
        <MarkerInput skill="Initiative" chave="Empathy"/>
      </li>
      <li>
        <MarkerInput skill="Persistence" chave="Persistence"/>
      </li>
      <li>
        <MarkerInput skill="Presence" chave="Presence"/>
      </li>
      <li>
        <MarkerInput skill="Professionalism" chave="Professionalism"/>
      </li>
      <li>
        <MarkerInput skill="Subtlety" chave="Subtlety"/>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.input_container {
  ul {
    li {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
