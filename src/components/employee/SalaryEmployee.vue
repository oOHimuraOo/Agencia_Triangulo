<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

interface Props {
  chave: string
}

const props = defineProps<Props>()

const salary = ref('')

const atualizarSalary = (valor: string) => {
  salary.value = valor
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

    if (save['salary'] !== undefined) {
      atualizarSalary(save['salary'])
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
    salary: salary.value ?? salary,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

onMounted(() => {
  loadInfos()
})

watch([salary], () => {
  salvarInfos()
})
</script>

<template>
  <div class="emergency_container">
    <div class="text_1">
      <span>Annual Salary</span>
      <p>
        <span>R$:</span>
        <input
          type="text"
          name=""
          id=""
          placeholder="Digite aqui!"
          :value="salary"
          @blur="atualizarSalary(intemediator($event))"
        />
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.emergency_container {
  background-color: #505050;
  border: 2px solid gray;
  border-radius: 16px;
  padding: 15px;
  width: 290px;
  margin-left: 15px;

  .text_1 {
    background-color: transparent;

    span {
      color: red;
      font-size: 12px;
      font-family: sans-serif;
      font-weight: bold;
      text-transform: uppercase;
      background-color: transparent;
    }

    p {
      margin-top: 5px;
      color: lightgray;
      font-family: sans-serif;
      font-weight: bold;
      background-color: transparent;

      input {
        background-color: transparent;
        border: none;
        outline: none;
        padding: 5px;
        font-size: 16px;
        font-family: sans-serif;
        font-weight: bold;
        color: white;
      }
    }
  }
}
</style>
