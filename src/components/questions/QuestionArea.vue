<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import pencil from '../../assets/pencil-write-svgrepo-com.svg'
import um from '../../assets/number-1-circle-svgrepo-com.svg'
import dois from '../../assets/number-2-circle-svgrepo-com.svg'
import tres from '../../assets/number-3-circle-svgrepo-com.svg'
import quatro from '../../assets/number-4-circle-svgrepo-com.svg'
import cinco from '../../assets/number-5-circle-svgrepo-com.svg'
import seis from '../../assets/number-6-circle-svgrepo-com.svg'
import sete from '../../assets/number-7-circle-svgrepo-com.svg'

interface Props {
  pergunta: string
  number: number
  chave: string
}

const props = defineProps<Props>()

const texto = ref('')

const atualizarTexto = (valor: string) => {
  texto.value = valor
}

const intermadiator = (evento: Event) => {
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

    if (save['texto'] !== undefined) {
      atualizarTexto(save['texto'])
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
    texto: texto.value ?? texto,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

onMounted(() => {
  loadInfos()
})

watch([texto], () => {
  salvarInfos()
})

const pergunta = computed(() => {
  return props.pergunta
})

const numero = computed(() => {
  if (props.number === 1) {
    return um
  }
  if (props.number === 2) {
    return dois
  }
  if (props.number === 3) {
    return tres
  }
  if (props.number === 4) {
    return quatro
  }
  if (props.number === 5) {
    return cinco
  }
  if (props.number === 6) {
    return seis
  }
  if (props.number === 7) {
    return sete
  }
  return pencil
})
</script>

<template>
  <div class="question_container">
    <div class="question">
      <img :src="numero" alt="" />
      <p>
        <span>
          {{ pergunta }}
        </span>
      </p>
    </div>
    <div class="answer">
      <textarea
        name=""
        id=""
        :value="texto"
        @blur="atualizarTexto(intermadiator($event))"
      ></textarea>
    </div>
  </div>
</template>

<style scoped lang="scss">
.question_container {
  width: 100%;

  .question {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }

    p {
      color: white;
      font-family: sans-serif;
      font-size: 16px;
      font-weight: normal;

      span {
        font-weight: bold;
      }
    }
  }

  .answer {
    margin-bottom: 25px;
    textarea {
      resize: none;
      width: 100%;
      height: 75px;
      line-height: 25px;
      font-family: sans-serif;
      font-weight: normal;
      font-size: 16px;
      color: lightgray;
      background: repeating-linear-gradient(black, black 23px, gray 23px, gray 25px);
      border: none;
      outline: none;

      &:focus {
        border: none;
        outline: none;
      }
    }
  }
}
</style>
