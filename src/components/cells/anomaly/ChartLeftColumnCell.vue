<script setup lang="ts">
import { computed } from 'vue'
import suc from '../../../assets/sucesso.png'
import tri from '../../../assets/triscendencia.png'

interface Props {
  Sucesso: string
  triforce: string
}

const props = defineProps<Props>()

const sucesso = computed(() => {
  return props.Sucesso
})

const triforce = computed(() => {
  return props.triforce
})

const triforceIMG = computed(() => {
  return tri
})

const sucessoIMG = computed(() => {
  return suc
})

</script>

<template>
  <div class="column_container">
    <div class="success_container">
      <p>
        <img :src="sucessoIMG" alt="" />
        {{ sucesso }}
      </p>
    </div>
    <div class="triscendance_container">
      <p>
        <img :src="triforceIMG" alt="" />
        {{ triforce }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.column_container {
  border: 2px solid rgba($color: #0000ff, $alpha: 0.7);
  border-top: none;
  border-right: none;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border-start-start-radius: 0;
  border-end-end-radius: 0;

  .success_container {
    padding: 16px;
    display: flex;
    background-color: transparent;

    img {
      height: 20px;
      width: 20px;
      margin-right: 5px;
    }

    p {
      color: gray;
      font-size: 16px;
      font-family: sans-serif;
      font-weight: normal;
      background-color: transparent;

      span {
        color: blue;
        font-weight: bold;
        background-color: transparent;
      }
    }
  }

  .triscendance_container {
    padding: 16px;
    display: flex;
    background-color: transparent;

    img {
      height: 20px;
      width: 20px;
      margin-right: 5px;
    }

    p {
      color: gray;
      font-size: 16px;
      font-family: sans-serif;
      font-weight: normal;
      background-color: transparent;

      span {
        padding: 2px;
        border-radius: 4px;
        background-color: rgba($color: #0000ff, $alpha: 0.4);
        color: blue;
        font-weight: bold;
      }
    }
  }
}
</style>
