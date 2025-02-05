<script setup lang="ts">
import CustomSingleLine from './custom/CustomSingleLine.vue'
import CustomDoubleLine from './custom/CustomDoubleLine.vue'
import CustomExotic from './custom/CustomExotic.vue'
</script>

<template>
  <div class="single_line_container">
    <CustomSingleLine :chave="'single1'" />
    <CustomSingleLine :chave="'single2'" />
    <CustomSingleLine :chave="'single3'" />
  </div>
  <div class="double_line_container">
    <CustomDoubleLine :chave="'double1'" />
    <CustomDoubleLine :chave="'double2'" />
  </div>
  <div class="custom_exotic_container">
    <CustomExotic :chave="'exotic1'" />
    <CustomExotic :chave="'exotic2'" />
    <CustomExotic :chave="'exotic3'" />
    <CustomExotic :chave="'exotic4'" />
  </div>
</template>

<style scoped lang="scss">
.custom_exotic_container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>
