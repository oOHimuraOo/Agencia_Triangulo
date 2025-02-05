<script setup lang="ts">
import MarkerInput from './inputs/MarkerInput.vue'
</script>

<template>
  <div class="input_container">
    <ul>
      <li>
        <MarkerInput skill="Attentiveness" />
      </li>
      <li>
        <MarkerInput skill="Duplicity" />
      </li>
      <li>
        <MarkerInput skill="Dynamism" />
      </li>
      <li>
        <MarkerInput skill="Empathy" />
      </li>
      <li>
        <MarkerInput skill="Initiative" />
      </li>
      <li>
        <MarkerInput skill="Persistence" />
      </li>
      <li>
        <MarkerInput skill="Presence" />
      </li>
      <li>
        <MarkerInput skill="Professionalism" />
      </li>
      <li>
        <MarkerInput skill="Subtlety" />
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
