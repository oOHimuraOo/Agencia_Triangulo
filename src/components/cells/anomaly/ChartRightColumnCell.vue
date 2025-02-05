<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import fal from '../../../assets/falha.png'

interface Props {
  Falha: string
  pergunta: string
  resposta1: string
  resposta2: string
  numero1: string
  numero2: string
}

const props = defineProps<Props>()

const respostasA = ref(0)
const respostasB = ref(0)
const practiced = ref(false)

const atualizarRespostasA = (valor: number, checked: boolean) => {
  if (checked) {
    respostasA.value = valor
  } else {
    respostasA.value = valor - 1
  }
}

const atualizarRespostasB = (valor: number, checked: boolean) => {
  if (checked) {
    respostasB.value = valor
  } else {
    respostasB.value = valor - 1
  }
}

const atualizarPracticed = (valor: boolean) => {
  practiced.value = valor
}

const intermadiator = (a: boolean, numero: number, event: Event) => {
  if (!event) {
    return
  }
  const valor = (event.target as HTMLInputElement).checked

  if (a) {
    atualizarRespostasA(numero, valor)
  } else {
    atualizarRespostasB(numero, valor)
  }
}

const salvarInfos = () => {
  if (!props.pergunta) {
    return
  }

  if (localStorage.getItem(props.pergunta)) {
    localStorage.removeItem(props.pergunta)
  }

  const chave = props.pergunta
  const dict = {
    '1': respostasA.value ?? respostasA,
    '2': respostasB.value ?? respostasB,
    '3': practiced.value ?? practiced,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

const carregarInfos = () => {
  if (!props.pergunta) {
    return
  }

  const memoria = localStorage.getItem(props.pergunta)
  if (!memoria) {
    return
  }

  try {
    const save = JSON.parse(memoria)

    if (save['1'] !== undefined) {
      atualizarRespostasA(save['1'], true)
    }
    if (save['2'] !== undefined) {
      atualizarRespostasB(save['2'], true)
    }
    if (save['3'] !== undefined) {
      atualizarPracticed(save['3'])
    }
  } catch (error) {
    console.error('Erro ao carregar as informações', error)
  }
}

onMounted(() => {
  carregarInfos()
})

watch([respostasA, respostasB, practiced], () => {
  salvarInfos()
})

const falha = computed(() => {
  return props.Falha
})

const pergunta = computed(() => {
  return props.pergunta
})

const resposta1 = computed(() => {
  return props.resposta1
})

const resposta2 = computed(() => {
  return props.resposta2
})

const numero1 = computed(() => {
  return props.numero1
})

const numero2 = computed(() => {
  return props.numero2
})

const falhaIMG = computed(() => {
  return fal
})
</script>

<template>
  <div class="right_container">
    <div class="failure_container">
      <p>
        <img :src="falhaIMG" />
        {{ falha }}
      </p>
    </div>
    <div class="question_container">
      <div class="left_tab_container">
        <p><span>q:</span> {{ pergunta }}</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<span>a:</span> {{ resposta1 }}</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<span>b:</span> {{ resposta2 }}</p>
      </div>
      <div class="right_tab_container">
        <ul>
          <li>
            <p>
              <span>Practiced?</span>
            </p>
            <input
              type="checkbox"
              name=""
              id=""
              :checked="practiced"
              @click="atualizarPracticed(!practiced)"
            />
          </li>
          <li>
            <p><span>Page #</span> 72</p>
          </li>
          <li>
            <p><span>a:</span></p>
            <input
              type="checkbox"
              :checked="respostasA > 0"
              @click="intermadiator(true, 1, $event)"
              name=""
              id=""
            />
            <input
              type="checkbox"
              :checked="respostasA > 1"
              @click="intermadiator(true, 2, $event)"
              name=""
              id=""
            />
            <input
              type="checkbox"
              :checked="respostasA > 2"
              name=""
              id=""
              @click="intermadiator(true, 3, $event)"
            />
            <p>{{ numero1 }}</p>
          </li>
          <li>
            <p><span>B:</span></p>
            <input
              type="checkbox"
              :checked="respostasB > 0"
              @click="intermadiator(false, 1, $event)"
              name=""
              id=""
            />
            <input
              type="checkbox"
              :checked="respostasB > 1"
              @click="intermadiator(false, 2, $event)"
              name=""
              id=""
            />
            <input
              type="checkbox"
              :checked="respostasB > 2"
              @click="intermadiator(false, 3, $event)"
              name=""
              id=""
            />
            <p>{{ numero2 }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.right_container {
  border: 2px solid rgba($color: #0000ff, $alpha: 0.7);
  border-top: none;
  border-left: none;
  height: 100%;
  width: 100%;
  border-radius: 16px;
  border-start-end-radius: 0;
  border-end-start-radius: 0;

  .failure_container {
    padding: 16px;

    img {
      height: 20px;
      width: 20px;
      margin-right: 5px;
    }

    p {
      color: rgba($color: #ff0000, $alpha: 0.7);
      font-size: 16px;
      font-family: sans-serif;
      font-weight: normal;
      background-color: transparent;

      span {
        color: red;
        font-weight: bold;
        background-color: transparent;
      }
    }
  }

  .question_container {
    display: flex;
    padding: 8px;
    margin: 8px;
    background-color: rgba($color: #0000ff, $alpha: 0.3);
    border-radius: 16px;
    justify-content: space-between;

    .left_tab_container {
      background-color: transparent;

      p {
        width: 90%;
        font-family: sans-serif;
        font-weight: normal;
        font-size: 16px;
        color: gray;
        background-color: transparent;

        span {
          color: blue;
          font-weight: bold;
          background-color: transparent;
          text-transform: uppercase;
        }
      }
    }

    .right_tab_container {
      background-color: transparent;

      ul {
        background-color: transparent;

        li {
          background-color: transparent;
          display: flex;
          margin-bottom: 5px;
        }
      }

      input {
        margin-left: 5px;
        margin-right: 5px;
      }

      p {
        font-family: sans-serif;
        font-weight: normal;
        font-size: 14px;
        color: gray;
        background-color: transparent;

        span {
          color: blue;
          font-weight: bold;
          background-color: transparent;
          text-transform: uppercase;
        }
      }
    }
  }
}
</style>
