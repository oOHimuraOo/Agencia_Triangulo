<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import triangulo from '../../assets/TrianguloVermelho50.png'

interface Props {
  skill: string
  chave: string
}

const props = defineProps<Props>()

const level = ref(0)
const max = ref(9)

const atualizarLevel = (valor: number, checked: boolean) => {
  if (checked) {
    level.value = valor
  } else {
    level.value = valor - 1
  }
}

const atualizarMax = (valor: number) => {
  max.value = valor
}

const intemediator = (numero: number, evento: Event) => {
  const checked = (evento.target as HTMLInputElement).checked
  atualizarLevel(numero, checked)
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

    if (save['level'] !== undefined) {
      atualizarLevel(save['level'], true)
    }
    if (save['max'] !== undefined) {
      atualizarMax(save['max'])
    }
  } catch (error) {
    console.log('Houve um erro ao carregar as informações', error)
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
    level: level.value ?? level,
    max: max.value ?? max,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

onMounted(() => {
  loadInfos()
})

watch([level, max], () => {
  salvarInfos()
})

const skill = computed(() => {
  return props.skill
})
</script>

<template>
  <div class="input_container">
    <div class="max_container">
      <label>max</label>
      <input
        type="number"
        id="max"
        :style="{ backgroundImage: `url('${triangulo}')` }"
        :value="max"
        readonly
      />
    </div>
    <div class="skill_container">
      <h3>{{ skill }}</h3>
      <ul>
        <li v-for="(x, index) in Array.from({ length: max })" :key="index">
          <input
            v-if="index + 1 <= level"
            checked
            type="checkbox"
            id=""
            @click="intemediator(index + 1, $event)"
          />
          <input v-else type="checkbox" id="" @click="intemediator(index + 1, $event)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input_container {
  display: flex;
  position: relative;

  label {
    color: white;
    display: flex;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 18px;
  }

  input {
    display: flex;
    background-size: 50px;
    height: 50px;
    width: 50px;
    padding: 8px;
    padding-top: 24px;
    color: gray;
    font-size: 30px;
    text-align: center;
    outline: none;
    background-color: transparent;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus {
      outline: none;
      border: none;
    }
  }

  .skill_container {
    margin-left: 8px;

    h3 {
      color: white;
      font-family: sans-serif;
      font-size: 18px;
      font-weight: bold;
    }

    ul {
      list-style: none;
      display: flex;

      li {
        margin-right: 8px;
      }
    }
  }
}
</style>
