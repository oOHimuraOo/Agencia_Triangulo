<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

interface Props {
  nome: string
}

const props = defineProps<Props>()

const texto = ref('')

const atualizarTexto = (valor: string) => {
  texto.value = valor
}

const intemediator = (evento: Event) => {
  const texto = (evento.target as HTMLInputElement).value
  return texto
}

const loadInfos = () => {
  if (!props.nome) {
    return
  }

  const memoria = localStorage.getItem(props.nome)
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
  if (!props.nome) {
    return
  }

  if (localStorage.getItem(props.nome)) {
    localStorage.removeItem(props.nome)
  }

  const chave = props.nome
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

const nome = computed(() => {
  return props.nome
})

const emit = defineEmits(['CharacterName', 'CharacterPronouns'])

const atualizarPropriedade = (value: Event) => {
  const valor = (value.target as HTMLInputElement).value
  if (props.nome === 'Character Name') {
    emit('CharacterName', valor)
  }
  if (props.nome === 'Pronouns') {
    emit('CharacterPronouns', valor)
  }
}
</script>

<template>
  <div class="input_container">
    <label> {{ nome }} </label>
    <input
      type="text"
      id="input_text"
      :value="texto"
      @blur="(atualizarPropriedade($event), atualizarTexto(intemediator($event)))"
    />
  </div>
</template>

<style scoped lang="scss">
.input_container {
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    color: grey;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 20px;
  }

  input {
    padding: 8px;
    font-size: 20px;
    font-family: sans-serif;
    color: white;

    border: none;
    border-bottom: 2px solid gray;
    outline: none;
  }
}
</style>
