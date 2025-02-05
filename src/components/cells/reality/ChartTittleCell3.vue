<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

interface Props {
  chave: string
}

const props = defineProps<Props>()

const nome = ref('')
const player = ref('')

const atualizarNome = (valor: string) => {
  nome.value = valor
}

const atualizarPlayer = (valor: string) => {
  player.value = valor
}

const intermediadorTexto = (evento: Event) => {
  const texto = (evento.target as HTMLInputElement).value
  return texto
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
    if (save['jogador'] !== undefined) {
      atualizarPlayer(save['jogador'])
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
    jogador: player.value ?? player,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

onMounted(() => {
  loadInfos()
})

watch([nome, player], () => {
  salvarInfos()
})
</script>

<template>
  <div class="title_container">
    <ul>
      <li class="special ab">
        <span>Name</span>
        <input
          type="text"
          name=""
          id=""
          placeholder="digite aqui!"
          :value="nome"
          @blur="atualizarNome(intermediadorTexto($event))"
        />
      </li>
      <li class="tg">
        <span>Played by</span>
        <input
          type="text"
          name=""
          id=""
          placeholder="digite aqui!"
          :value="player"
          @blur="atualizarPlayer(intermediadorTexto($event))"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.title_container {
  background-color: rgba($color: #ffff00, $alpha: 0.4);
  border: 2px solid rgba($color: #ffff00, $alpha: 0.7);
  border-bottom: none;
  border-radius: 16px;
  border-end-end-radius: 0;
  border-end-start-radius: 0;

  ul {
    display: flex;
    background-color: transparent;
    padding: 5px;

    li {
      width: 100%;
      background-color: transparent;
      border-left: 2px solid rgba($color: #ffff00, $alpha: 0.7);
      padding: 5px;

      span {
        background-color: transparent;
        color: #ffff00;
        text-transform: uppercase;
        font-family: sans-serif;
        font-size: 12px;
        font-weight: bold;
      }

      input {
        background-color: transparent;
        color: white;
        text-transform: uppercase;
        font-family: sans-serif;
        margin-top: 5px;
        font-weight: bold;
        width: 100%;
        padding: 5px;
        outline: none;
        border: none;
      }
    }

    .special {
      border-left: none;
    }

    .ab {
      width: 100%;
    }

    .tg {
      width: 35%;
      min-width: 35%;
      max-width: 35%;
    }
  }
}
</style>
