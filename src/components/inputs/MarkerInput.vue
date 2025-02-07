<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import triangulo from '../../assets/TrianguloVermelho50.png'

interface Props {
  skill: string
  chave: string
}

const props = defineProps<Props>()

const level = ref(0)
const max = ref(0)

const atualizarLevel = (valor: number, checked: boolean) => {
  if (checked) {
    if (valor > max.value) {
      level.value = max.value
    } else {
      level.value = valor
    }
  } else {
    if (valor <= 0) {
      level.value = 0
    } else {
      level.value = valor - 1
    }
  }
}

const atualizarMax = (valor: number) => {
  if (valor > 9) {
    max.value = 9
  } else if (valor <= 0) {
    max.value = 0
  } else {
    max.value = valor
  }

  atualizarLevel(level.value, true)
}

const intermediarNumero = (evento: Event) => {
  const numero = (evento.target as HTMLInputElement).value
  return Number(numero)
}

const intemediator = (numero: number, evento: Event, proibido: boolean) => {
  if (proibido) {
    ;(evento.target as HTMLInputElement).checked = false
    return
  }

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

const descobrirClasseDeMarcacao = (valor: number) => {
  if (valor <= max.value) {
    return 'correto'
  }
  return 'proibido'
}
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
        @blur="atualizarMax(intermediarNumero($event))"
      />
    </div>
    <div class="skill_container">
      <h3>{{ skill }}</h3>
      <ul>
        <li v-for="(x, index) in Array.from({ length: 9 })" :key="index">
          <input
            :checked="index +1 <= level"
            type="checkbox"
            id=""
            @click="
              intemediator(index + 1, $event, descobrirClasseDeMarcacao(index + 1) === 'proibido')
            "
            :class="descobrirClasseDeMarcacao(index + 1)"
          />
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

        .correto {
          height: 50px;
          width: 50px;
          border: none;
          outline: none;
          background-color: rgba($color: #00f700, $alpha: 0.4);
          border-radius: 8px;
          appearance: none;

          &:checked {
            background-color: rgba($color: #ff00ff, $alpha: 0.4);
            position: relative;

            &::after {
              content: '✔';
              color: white;
              font-size: 30px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }

        .proibido {
          height: 50px;
          width: 50px;
          border: none;
          outline: none;
          background-color: rgba($color: #808080, $alpha: 0.4);
          border-radius: 8px;
          appearance: none;
        }
      }
    }
  }
}
</style>
