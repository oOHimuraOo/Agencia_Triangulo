<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import commendations from '../../assets/Commendations.png'
import demerits from '../../assets/Demerits.png'
import additionalBurnout from '../../assets/AdditionalBurnout.png'
import dados from '../../others/json/jsonData'

interface Props {
  nome: string
  chave: string
}

const props = defineProps<Props>()
const emit = defineEmits(['agencyStandingChanged'])

const atributo = ref(0)

const atualizarAtributo = (valor: number) => {
  atributo.value = valor
}

const intemediator = (evento: Event) => {
  const numero = (evento.target as HTMLInputElement).value
  return Number(numero)
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

    if (save['atributo'] !== undefined) {
      atualizarAtributo(save['atributo'])
    }
  } catch (error) {
    console.error('Houve um erro ao resgatar as informações', error)
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
    atributo: atributo.value ?? atributo,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

onMounted(() => {
  loadInfos()
  agencyStanding()
})

watch([atributo], () => {
  salvarInfos()
  agencyStanding()
})

const nome = computed(() => {
  return props.nome
})

const image = computed(() => {
  if (props.nome === 'Commendations') {
    return commendations
  }
  if (props.nome === 'Demerits') {
    return demerits
  }
  return additionalBurnout
})

const agencyStanding = () => {
  if (props.nome === 'Demerits') {
    switch (atributo.value) {
      case 0:
        emit('agencyStandingChanged', dados.Agency.Standing[0])
        break
      case 1:
        emit('agencyStandingChanged', dados.Agency.Standing[1])
        break
      case 2:
        emit('agencyStandingChanged', dados.Agency.Standing[2])
        break
      case 3:
        emit('agencyStandingChanged', dados.Agency.Standing[3])
        break
      case 4:
        emit('agencyStandingChanged', dados.Agency.Standing[4])
        break
      case 5:
        emit('agencyStandingChanged', dados.Agency.Standing[5])
        break
      case 6:
        emit('agencyStandingChanged', dados.Agency.Standing[6])
        break
      case 7:
        emit('agencyStandingChanged', dados.Agency.Standing[7])
        break
      case 8:
        emit('agencyStandingChanged', dados.Agency.Standing[8])
        break
      case 9:
        emit('agencyStandingChanged', dados.Agency.Standing[9])
        break
      default:
        emit('agencyStandingChanged', dados.Agency.Standing['10+'])
        break
    }
  }
}
</script>

<template>
  <div class="input_container">
    <img :src="image" alt="" />
    <input
      type="number"
      id="Input_Number"
      :value="atributo"
      @blur="atualizarAtributo(intemediator($event))"
    />
    <label> {{ nome }} </label>
  </div>
</template>

<style scoped lang="scss">
.input_container {
  width: 100%;
  display: flex;

  img {
    width: 50px;
    height: 50px;
    margin-right: 5px;
  }

  input {
    color: gray;
    padding: 0 7px;
    width: 50px;
    border: none;
    border-bottom: 2px solid gray;
    outline: none;
    font-size: 30px;
    margin-right: 8px;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  label {
    color: white;
    height: 50px;
    width: 100%;
    font-size: 30px;
    align-content: center;
    font-family: sans-serif;
    font-weight: bold;
  }
}
</style>
