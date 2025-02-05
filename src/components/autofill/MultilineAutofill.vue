<script setup lang="ts">
import { computed } from 'vue'
import yellow from '../../assets/play-svgrepo-com copy.svg'
import red from '../../assets/play-svgrepo-com.svg'

interface Props {
  tipo: 'Real' | 'Comp'
  placeholder: 1 | 2 | 3 | 4
  nome: string
  texto?: string
  specialA?: string
  specialB?: string
  texto2?: string
  texto3?: string
  extra: boolean
}

const props = defineProps<Props>()

const nome = computed(() => {
  return props.nome
})

const texto = computed(() => {
  return props.texto
})

const placeholder = computed(() => {
  const x = props.placeholder

  if (x === 1) {
    return 'Your GM may trigger this by spending 3 Chaos.'
  } else if (x === 2) {
    return 'Chek this to see if you can cancel your burnout.'
  } else if (x === 3) {
    return 'Receive 1 Demerit if you:'
  } else {
    return 'Receive 1 Commendation whe you do one of these:'
  }
})

const placeholder2 = 'if you do all 3 in a single mission, receive 3 bonus commendations.'

const classe = computed(() => {
  const tipo = props.tipo

  if (tipo === 'Real') {
    return 'yellow'
  } else {
    return 'red'
  }
})

const extra = computed(() => {
  return props.extra
})

const texto2 = computed(() => {
  return props.texto2
})

const texto3 = computed(() => {
  return props.texto3
})
</script>

<template>
  <div class="autofill_container">
    <div class="title_container">
      <img :src="yellow" v-if="classe === 'yellow'" />
      <img :src="red" v-else />
      <label :class="classe"> {{ nome }} </label>
    </div>
    <div class="body_container" :class="classe">
      <p class="frase_fixa">{{ placeholder }}</p>
      <p class="texto_autofill" v-if="texto">{{ texto }}</p>
      <p class="texto_autofill" v-if="specialA">{{ specialA }}</p>
      <p class="texto_autofill" v-if="specialB !== 'null'">{{ specialB }}</p>
      <p class="texto_autofill" v-if="extra">{{ texto2 }}</p>
      <p class="texto_autofill" v-if="extra">{{ texto3 }}</p>
      <p class="frase_fixa" v-if="extra">{{ placeholder2 }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.autofill_container {
  padding-left: 5px;

  .title_container {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    margin-bottom: 8px;
    margin-top: 8px;

    img {
      width: 25px;
      height: 25px;
      margin-left: 8px;
      margin-right: 8px;
    }

    label {
      color: gray;
      font-family: sans-serif;
      height: 100%;
      text-align: center;
      font-size: 25px;
      font-weight: bold;
    }

    .yellow {
      color: rgba($color: #ffff00, $alpha: 0.4);
    }

    .red {
      color: rgba($color: #ff0000, $alpha: 0.4);
    }
  }

  .body_container {
    margin-left: 20px;
    border-left: 2px solid gray;

    .frase_fixa {
      color: gray;
      font-family: sans-serif;
      font-size: 16px;
      font-weight: normal;
      padding: 10px;
    }

    .texto_autofill {
      color: white;
      padding: 5px;
      font-family: sans-serif;
      font-size: 16px;
      font-weight: normal;
      width: 80%;
      margin-left: 5px;
    }
  }

  .yellow {
    border-left: 2px solid rgba($color: #ffff00, $alpha: 0.4);
  }

  .red {
    border-left: 2px solid rgba($color: #ff0000, $alpha: 0.4);
  }
}
</style>
