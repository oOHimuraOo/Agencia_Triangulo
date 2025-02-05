<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

interface Props {
  chave: string
}

const props = defineProps<Props>()

const contato = ref('')
const relacionamento = ref('')

const atualizarContato = (valor: string) => {
  contato.value = valor
}

const atualizarRelacionamento = (valor: string) => {
  relacionamento.value = valor
}

const intemediator = (evento: Event) => {
  const text = (evento.target as HTMLInputElement).value
  return text
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

    if (save['contato'] !== undefined) {
      atualizarContato(save['contato'])
    }
    if (save['relacionamento'] !== undefined) {
      atualizarRelacionamento(save['relacionamento'])
    }
  } catch (error) {
    console.error('Houve um erro ao carregar as informações', error)
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
    contato: contato.value ?? contato,
    relacionamento: relacionamento.value ?? relacionamento,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

onMounted(() => {
  loadInfos()
})

watch([contato, relacionamento], () => {
  salvarInfos()
})
</script>

<template>
  <div class="emergency_container">
    <div class="text_1">
      <span>Emergency Contact</span>
      <input
        type="text"
        name=""
        id=""
        placeholder="Digite aqui!"
        :value="contato"
        @blur="atualizarContato(intemediator($event))"
      />
    </div>
    <div class="text_2">
      <span>Relationship</span>
      <input
        type="text"
        name=""
        id=""
        placeholder="Digite aqui!"
        :value="relacionamento"
        @blur="atualizarRelacionamento(intemediator($event))"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.emergency_container {
  background-color: #505050;
  border: 2px solid gray;
  border-radius: 16px;
  padding: 15px;
  width: 290px;
  margin-left: 15px;

  .text_1,
  .text_2 {
    background-color: transparent;
    margin-bottom: 15px;

    span {
      color: red;
      font-size: 12px;
      font-family: sans-serif;
      font-weight: bold;
      text-transform: uppercase;
      background-color: transparent;
    }

    input {
      margin-top: 5px;
      color: lightgray;
      width: 100%;
      padding: 5px;
      font-family: sans-serif;
      font-size: 16px;
      font-weight: bold;
      background-color: transparent;
      border: none;
      outline: none;
    }
  }

  .text_2 {
    margin-bottom: 0;
  }
}
</style>
