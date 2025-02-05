<script setup lang="ts">
import questionArea from './questions/QuestionArea.vue'
import CrachaEmployee from './employee/CrachaEmployee.vue'
import EmergencyContactEmployee from './employee/EmergencyContactEmployee.vue'
import SalaryEmployee from './employee/SalaryEmployee.vue'
import dados, { type agentData } from '../others/json/jsonData'
import { computed } from 'vue'

interface Props {
  nomePersonagem: string
  pronomePersonagem: string
}

const props = defineProps<Props>()

const nomePersonagem = computed(() => {
  return props.nomePersonagem
})

const pronomePersonagem = computed(() => {
  return props.pronomePersonagem
})

const question1 = computed(() => {
  const data: agentData = dados.Agent
  return data.questions[1]
})

const question2 = computed(() => {
  const data: agentData = dados.Agent
  return data.questions[2]
})

const question3 = computed(() => {
  const data: agentData = dados.Agent
  return data.questions[3]
})

const question4 = computed(() => {
  const data: agentData = dados.Agent
  return data.questions[4]
})

const question5 = computed(() => {
  const data: agentData = dados.Agent
  return data.questions[5]
})

const question6 = computed(() => {
  const data: agentData = dados.Agent
  return data.questions[6]
})

const question7 = computed(() => {
  const data: agentData = dados.Agent
  return data.questions[7]
})

const question8 = computed(() => {
  const data: agentData = dados.Agent
  return data.questions[8]
})
</script>

<template>
  <div class="welcome_container">
    <div class="upper_container">
      <div class="left_column_container">
        <div class="title_text_container">
          <h2>Welcome, Agent!</h2>
          <p>
            Please answer the following questions as truthfully as posssible so the
            <span>Agency</span> and your coworkers can learn more about you.
          </p>
        </div>
        <div class="questions_container">
          <questionArea :pergunta="question1" :number="1" :chave="'q1'" />
          <questionArea :pergunta="question2" :number="2" :chave="'q2'" />
          <questionArea :pergunta="question3" :number="3" :chave="'q3'" />
          <questionArea :pergunta="question4" :number="4" :chave="'q4'" />
        </div>
      </div>
      <div class="right_column_container">
        <div class="cracha">
          <CrachaEmployee :nome="nomePersonagem" :pronome="pronomePersonagem" :chave="'cracha1'" />
        </div>
        <div class="emergency">
          <EmergencyContactEmployee :chave="'emergency1'" />
        </div>
        <div class="salary">
          <SalaryEmployee :chave="'salary1'" />
        </div>
      </div>
    </div>
    <div class="bottom_container">
      <div class="questions_container">
        <questionArea :pergunta="question5" :number="5" :chave="'q5'" />
        <questionArea :pergunta="question6" :number="6" :chave="'q6'" />
        <questionArea :pergunta="question7" :number="7" :chave="'q7'" />
        <questionArea :pergunta="question8" :number="8" :chave="'q8'" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.welcome_container {
  .upper_container {
    display: flex;

    .left_column_container {
      width: 70%;

      .title_text_container {
        h2 {
          color: white;
          font-family: sans-serif;
          font-weight: bold;
          font-size: 36px;
          margin-top: 25px;
          margin-bottom: 10px;
        }

        p {
          color: gray;
          font-family: sans-serif;
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 15px;

          span {
            color: rgba($color: #ff0000, $alpha: 0.7);
          }
        }
      }
    }

    .right_column_container {
      width: 30%;

      .cracha,
      .emergency {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
