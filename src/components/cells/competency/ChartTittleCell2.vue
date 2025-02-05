<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  Nome: string
  page: string
}

const props = defineProps<Props>()

const nome = computed(() => {
  return props.Nome
})

const page = computed(() => {
  return props.page
})
</script>

<template>
  <div class="title_container">
    <ul>
      <li class="special ab">
        <span>Name</span>
        <p>{{ nome }}</p>
      </li>
      <li class="tg">
        <span>page/PD code</span>
        <p>{{ page }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.title_container {
  background-color: rgba($color: #ff0000, $alpha: 0.4);
  border: 2px solid rgba($color: #ff0000, $alpha: 0.7);
  border-bottom: none;
  border-radius: 16px;
  border-end-end-radius: 0;
  border-end-start-radius: 0;

  ul {
    display: flex;
    background-color: transparent;
    padding: 5px;

    li {
      width: 100%;
      background-color: transparent;
      border-left: 2px solid rgba($color: #ff0000, $alpha: 0.7);
      padding: 5px;

      span {
        background-color: transparent;
        color: #ff0000;
        text-transform: uppercase;
        font-family: sans-serif;
        font-size: 12px;
        font-weight: bold;
      }

      p {
        background-color: transparent;
        color: white;
        text-transform: uppercase;
        font-family: sans-serif;
        margin-top: 5px;
        font-weight: bold;
      }
    }

    .special {
      border-left: none;
    }

    .ab {
      width: 100%;
    }

    .tg {
      width: 25%;
      min-width: 25%;
      max-width: 25%;
    }
  }
}
</style>
