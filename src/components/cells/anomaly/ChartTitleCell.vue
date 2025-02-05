<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  Nome: string
  Gatilho: string
  Quality: string
}

const props = defineProps<Props>()

const nome = computed(() => {
  return props.Nome
})

const gatilho = computed(() => {
  return props.Gatilho
})

const quality = computed(() => {
  return props.Quality
})
</script>

<template>
  <div class="title_container">
    <ul>
      <li class="special ab">
        <span>Ability</span>
        <p>{{ nome }}</p>
      </li>
      <li class="tg">
        <span>Trigger</span>
        <p>{{ gatilho }}</p>
      </li>
      <li class="ql">
        <span>Quality</span>
        <p>{{ quality }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.title_container {
  background-color: rgba($color: #0000ff, $alpha: 0.4);
  border: 2px solid rgba($color: #0000ff, $alpha: 0.7);
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
      border-left: 2px solid rgba($color: #0000ff, $alpha: 0.7);
      padding: 5px;

      span {
        background-color: transparent;
        color: blue;
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
        overflow-wrap: break-word;
      }
    }

    .special {
      border-left: none;
    }

    .ab,
    .tg {
      width: 45%;
      min-width: 45%;
      max-width: 45%;
    }

    .ql {
      width: 10%;
      min-width: 10%;
      max-width: 10%;
    }
  }
}
</style>
