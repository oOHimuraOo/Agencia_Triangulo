<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import crimnalsGrooming from '../../assets/CriminalsGrooming50.png'

interface Props {
  chave: string
}

const props = defineProps<Props>()

const nome = ref('')
const max = ref(0)
const text = ref('')

const atualizarNome = (valor: string) => {
  nome.value = valor
}

const atualizarMax = (valor: number) => {
  max.value = valor
}

const atualizarText = (valor: string) => {
  text.value = valor
}

const intemediator = (evento: Event) => {
  const retorno = (evento.target as HTMLInputElement).value
  return retorno
}

const loadInfos = () => {
  if (!props.chave) {
    return
  }

  const memoria = localStorage.getItem(props.chave)
  if (!memoria) {
    return
  }

  try {
    const save = JSON.parse(memoria)

    if (save['nome'] !== undefined) {
      atualizarNome(save['nome'])
    }
    if (save['max'] !== undefined) {
      atualizarMax(save['max'])
    }
    if (save['text'] !== undefined) {
      atualizarText(save['text'])
    }
  } catch (error) {
    console.error('Erro ao carregar as informações', error)
  }
}

const salvarInfos = () => {
  if (!props.chave) {
    return
  }

  if (localStorage.getItem(props.chave)) {
    localStorage.removeItem(props.chave)
  }

  const chave = props.chave
  const dict = {
    nome: nome.value ?? nome,
    max: max.value ?? max,
    text: text.value ?? text,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

onMounted(() => {
  loadInfos()
})

watch([nome, max, text], () => {
  salvarInfos()
})

const crimnal = computed(() => {
  return crimnalsGrooming
})
</script>

<template>
  <div class="custom_template_container">
    <div class="title_text_container">
      <div class="left_text">
        <label>name</label>
        <input type="text" id="name" :value="nome" @blur="atualizarNome(intemediator($event))" />
      </div>
      <div class="right_text">
        <label>max</label>
        <input
          type="number"
          id="max"
          :value="max"
          @blur="atualizarMax(Number(intemediator($event)))"
        />
      </div>
    </div>
    <div class="body_container">
      <img :src="crimnal" alt="" />
      <span>:</span>
      <input type="text" name="" id="" :value="text" @blur="atualizarText(intemediator($event))" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom_template_container {
  border: 2px solid gray;
  border-radius: 16px;
  background-color: transparent;
  padding: 10px;
  margin-bottom: 15px;

  .title_text_container {
    background-color: transparent;
    display: flex;
    width: 100%;
    height: 40px;
    align-content: space-between;
    margin-bottom: 15px;

    .left_text {
      display: flex;
      align-items: center;
      width: 80%;
      padding: 5px;
      border: 2px solid gray;
      border-radius: 32px;
      margin-right: 10px;
    }

    .right_text {
      display: flex;
      align-items: center;
      width: 20%;
      padding: 5px;
      border: 2px solid gray;
      border-radius: 32px;
    }

    label {
      color: white;
      font-family: sans-serif;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: bold;
      margin-left: 5px;
      margin-right: 5px;
    }

    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      font-size: 12;
      color: gray;
      font-family: sans-serif;
      font-weight: normal;
      text-transform: uppercase;

      -webkit-appearance: none;
      -moz-appearance: textfield;
      appearance: textfield;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  .body_container {
    display: flex;
    width: 100%;
    align-content: center;

    img {
      height: 25px;
      width: 25px;
      margin-right: 5px;
    }

    span {
      font-family: sans-serif;
      font-weight: bold;
      font-size: 30px;
      color: gray;
      line-height: 20px;
      margin-right: 5px;
    }

    input {
      width: 100%;
      font-family: sans-serif;
      font-size: 20px;
      color: gray;
      border: none;
      outline: none;
      text-transform: uppercase;
    }
  }
}
</style>
