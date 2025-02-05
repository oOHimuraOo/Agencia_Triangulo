<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  efeito: string
}

const props = defineProps<Props>()

const efeito = computed(() => {
  return props.efeito
})
</script>

<template>
  <div class="text_container">
    <span>Effect</span>
    <br /><br />
    <p>
      {{ efeito }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.text_container {
  padding: 16px;
  border: 2px solid rgba($color: #ff0000, $alpha: 0.7);
  border-radius: 16px;
  border-top: none;
  border-start-start-radius: 0px;
  border-start-end-radius: 0px;

  span {
    color: rgba($color: #ff0000, $alpha: 0.7);
    font-family: sans-serif;
    font-size: 14px;
    font-weight: bold;
  }

  p {
    color: gray;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: normal;
  }
}
</style>
