<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import blue from '../../assets/AnomalyTriangle60.png'
import yellow from '../../assets/RealityTriangle60.png'
import red from '../../assets/CompetencyTriangle60.png'

interface Props {
  tipo: 'Anom' | 'Comp' | 'Real'
  viewer: boolean
  selected?: string
  chave?: string
}

const props = defineProps<Props>()
const emit = defineEmits([
  'update:selected',
  'anomalySelected',
  'competencySelected',
  'realitySelected',
])

const selectedOption = ref(props.selected || '')

const atualizarSelected = (valor: string) => {
  selectedOption.value = valor
  selecionarOpcao()
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

    if (save['selected'] !== undefined) {
      atualizarSelected(save['selected'])
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
    selected: selectedOption.value ?? selectedOption,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

onMounted(() => {
  loadInfos()
})

watch(
  () => props.selected,
  (newValue) => {
    selectedOption.value = newValue ?? ''
  },
)

watch([selectedOption], () => {
  salvarInfos()
})

const selecionarOpcao = () => {
  if (props.tipo === 'Anom') {
    emit('anomalySelected', selectedOption.value)
  } else if (props.tipo === 'Comp') {
    emit('competencySelected', selectedOption.value)
  } else {
    emit('realitySelected', selectedOption.value)
  }
  emit('update:selected', selectedOption.value)
}

const name = computed(() => {
  if (props.tipo === 'Anom') return 'Anomaly'
  if (props.tipo === 'Comp') return 'Competency'
  return 'Reality'
})

const color = computed(() => {
  if (props.tipo === 'Anom') return blue
  if (props.tipo === 'Comp') return red
  return yellow
})

const classColor = computed(() => {
  if (props.tipo === 'Anom') return 'blue'
  if (props.tipo === 'Comp') return 'red'
  return 'yellow'
})

const options = computed(() => {
  if (props.tipo === 'Anom') {
    return [
      'Whisper',
      'Timepiece',
      'Dream',
      'Catalogue',
      'Growth',
      'Manifold',
      'Drain',
      'Gun',
      'Absence',
    ]
  }
  if (props.tipo === 'Comp') {
    return ['PR', 'R&D', 'Barista', 'CEO', 'Intern', 'Gravedigger', 'Reception', 'Hotline', 'Clown']
  }
  return [
    'Caretaker',
    'Overbooked',
    'Pursued',
    'Star',
    'Struggling',
    'Newborn',
    'Romantic',
    'Backbone',
    'Creature',
  ]
})
</script>

<template>
  <div class="input_container">
    <img :src="color" alt="Símbolo da agência" />
    <div>
      <label>{{ name }}</label>
      <select
        id="select_input"
        :disabled="viewer"
        v-model="selectedOption"
        @change="atualizarSelected(intemediator($event))"
        :class="classColor"
      >
        <option v-for="(opcao, index) in options" :key="index" :value="opcao">
          {{ opcao }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input_container {
  width: 100%;
  display: flex;

  img {
    width: 60px;
    height: 60px;
  }

  div {
    display: flex;
    flex-direction: column;

    label {
      color: gray;
      font-family: sans-serif;
      margin-left: 10px;
      font-weight: bold;
      font-size: 20px;
    }

    select {
      padding: 10px;
      border: none;
      box-shadow: inset 0 -2px 0 gray;
      height: 100%;
      width: 300px;
      color: white;
      font-family: sans-serif;
      font-size: 12px;
      text-transform: uppercase;

      &:focus {
        outline: none;
      }
    }

    .blue {
      box-shadow: inset 0 -2px 0 blue;
    }

    .red {
      box-shadow: inset 0 -2px 0 red;
    }

    .yellow {
      box-shadow: inset 0 -2px 0 yellow;
    }
  }
}
</style>
