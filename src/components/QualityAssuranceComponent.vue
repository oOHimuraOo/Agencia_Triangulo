<script setup lang="ts">
import MarkerInput from './inputs/MarkerInput.vue'
import quality from '../assets/quality_assunrancy.png'
import questionArea from './questions/QuestionArea.vue'
import dados, { type realityData } from '../others/json/jsonData'

interface Props {
  realitySelected: string
}

const props = defineProps<Props>()

const carregarPeguntas = (valor: number) => {
  const reality = props.realitySelected
  const data: realityData = dados.reality

  if (valor === 1) {
    return data[reality]?.OnboardingQuestions.a || ''
  } else if (valor === 2) {
    return data[reality]?.OnboardingQuestions.b || ''
  } else {
    return data[reality]?.OnboardingQuestions.c || ''
  }
}

const gerarChave = (valor: number) => {
  if (valor === undefined || valor === null) {
    return 'obq'
  }
  const novaChave = 'obq' + String(valor)
  return novaChave
}
</script>

<template>
  <div class="input_container">
    <div class="title_container">
      <h2>Quality Assurance</h2>
      <img :src="quality" alt="" />
    </div>
    <ul>
      <li>
        <MarkerInput skill="Attentiveness" chave="Attentiveness" />
      </li>
      <li>
        <MarkerInput skill="Duplicity" chave="Duplicity" />
      </li>
      <li>
        <MarkerInput skill="Dynamism" chave="Dynamism" />
      </li>
      <li>
        <MarkerInput skill="Empathy" chave="Empathy" />
      </li>
      <li>
        <MarkerInput skill="Initiative" chave="Empathy" />
      </li>
      <li>
        <MarkerInput skill="Persistence" chave="Persistence" />
      </li>
      <li>
        <MarkerInput skill="Presence" chave="Presence" />
      </li>
      <li>
        <MarkerInput skill="Professionalism" chave="Professionalism" />
      </li>
      <li>
        <MarkerInput skill="Subtlety" chave="Subtlety" />
      </li>
    </ul>
    <div class="title_container">
      <h3>Onboarding Questions</h3>
    </div>
    <ul>
      <li v-for="(x, index) in Array.from({ length: 3 })" :key="index">
        <questionArea
          :chave="gerarChave(index)"
          :number="9 + index"
          :pergunta="carregarPeguntas(index + 1)"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.input_container {
  .title_container {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: white;
      font-family: sans-serif;
      font-size: 38px;
      font-weight: bold;
      padding: 8px;
    }

    h3 {
      color: rgba($color: #ffff00, $alpha: 0.7);
      font-family: sans-serif;
      font-weight: bold;
      font-size: 28px;
    }

    img {
      width: 80px;
      height: 60px;
    }
  }
  ul {
    li {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
