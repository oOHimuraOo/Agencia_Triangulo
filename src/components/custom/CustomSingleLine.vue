<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import tringuloCinza from '../../assets/play-svgrepo-com copy 3.svg'
import bola from '../../assets/circle-svgrepo-com copy 3.svg'

interface Props {
  chave: string
}

const props = defineProps<Props>()

const nome = ref('')
const max = ref(0)
const counter = ref(0)

const atualizarNome = (valor: string) => {
  nome.value = valor
}

const atualizarMax = (valor: number) => {
  if (valor > 15) {
    max.value = 15
  } else {
    max.value = valor
  }
}

const atualizarCounter = (valor: number, checked: boolean) => {
  if (checked) {
    counter.value = valor
  } else {
    counter.value = valor - 1
  }
}

const intermediatorText = (evento: Event) => {
  const text = (evento.target as HTMLInputElement).value
  return text
}

const intermediatorNumber = (evento: Event) => {
  const numero = (evento.target as HTMLInputElement).value
  return Number(numero)
}

const ajustadorDeValor = (numero: number) => {
  if (numero > max.value) {
    atualizarCounter(max.value, true)
    return max.value
  }
}

const intermediador = (numero: number, evento: Event) => {
  const checked = (evento.target as HTMLInputElement).checked
  if (numero > max.value) {
    ;(evento.target as HTMLInputElement).checked = false
    atualizarCounter(Number(ajustadorDeValor(numero)), checked)
  } else {
    atualizarCounter(numero, checked)
  }
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
    if (save['max'] !== undefined) {
      atualizarMax(save['max'])
    }
    if (save['counter'] !== undefined) {
      atualizarCounter(save['counter'], true)
    }
  } catch (error) {
    console.error('Não foi possivel carregar as informações', error)
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
    max: max.value ?? max,
    counter: counter.value ?? counter,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

onMounted(() => {
  loadInfos()
})

watch([nome, max, counter], () => {
  salvarInfos()
})

const triangulo = computed(() => {
  return tringuloCinza
})

const bolaCinza = computed(() => {
  return bola
})
</script>

<template>
  <div class="custom_template_container">
    <div class="title_text_container">
      <div class="left_text">
        <label>name</label>
        <input
          type="text"
          id="name"
          :value="nome"
          @blur="atualizarNome(intermediatorText($event))"
        />
      </div>
      <div class="right_text">
        <label>max</label>
        <input
          type="number"
          id="max"
          :value="max"
          @blur="atualizarMax(intermediatorNumber($event))"
        />
      </div>
    </div>
    <ul>
      <li>
        <img :src="triangulo" />
      </li>
      <li>
        <input
          type="checkbox"
          class="um"
          :checked="counter > 0"
          @click="intermediador(1, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="dois"
          :checked="counter > 1"
          @click="intermediador(2, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="tres"
          :checked="counter > 2"
          @click="intermediador(3, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="quatro"
          :checked="counter > 3"
          @click="intermediador(4, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="cinco"
          :checked="counter > 4"
          @click="intermediador(5, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="seis"
          :checked="counter > 5"
          @click="intermediador(6, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="sete"
          :checked="counter > 6"
          @click="intermediador(7, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="oito"
          :checked="counter > 7"
          @click="intermediador(8, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="nove"
          :checked="counter > 8"
          @click="intermediador(9, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="dez"
          :checked="counter > 9"
          @click="intermediador(10, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="onze"
          :checked="counter > 10"
          @click="intermediador(11, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="doze"
          :checked="counter > 11"
          @click="intermediador(12, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="treze"
          :checked="counter > 12"
          @click="intermediador(13, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="catorze"
          :checked="counter > 13"
          @click="intermediador(14, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <input
          type="checkbox"
          class="quinze"
          :checked="counter > 14"
          @click="intermediador(15, $event)"
        />
        <span>-</span>
      </li>
      <li>
        <img :src="bolaCinza" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.custom_template_container {
  border: 2px solid gray;
  border-radius: 16px;
  background-color: transparent;
  padding: 10px;
  margin-bottom: 15px;

  .title_text_container {
    background-color: transparent;
    display: flex;
    width: 100%;
    height: 40px;
    align-content: space-between;
    margin-bottom: 15px;

    .left_text {
      display: flex;
      align-items: center;
      width: 80%;
      padding: 5px;
      border: 2px solid gray;
      border-radius: 32px;
      margin-right: 10px;
    }

    .right_text {
      display: flex;
      align-items: center;
      width: 20%;
      padding: 5px;
      border: 2px solid gray;
      border-radius: 32px;
    }

    label {
      color: white;
      font-family: sans-serif;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: bold;
      margin-left: 5px;
      margin-right: 5px;
    }

    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      font-size: 12;
      color: gray;
      font-family: sans-serif;
      font-weight: normal;
      text-transform: uppercase;

      -webkit-appearance: none;
      -moz-appearance: textfield;
      appearance: textfield;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: center;

    li {
      display: flex;
      align-items: center;

      img {
        height: 25px;
        width: 25px;
      }

      input {
        width: 25px;
        height: 25px;
        appearance: none;
        background-color: rgba($color: #a5a5a5, $alpha: 0.4);
        border: 2px solid gray;
        border-radius: 4px;
        position: relative;

        &::before {
          content: ' ';
          color: lightgray;
          font-size: 15px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        &:checked {
          background-color: rgba($color: #ff00ff, $alpha: 0.4);

          &::after {
            content: '✔';
            color: white;
            font-size: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }

      .um {
        &::before {
          content: '1';
        }
      }
      .dois {
        &::before {
          content: '2';
        }
      }
      .tres {
        &::before {
          content: '3';
        }
      }
      .quatro {
        &::before {
          content: '4';
        }
      }
      .cinco {
        &::before {
          content: '5';
        }
      }
      .seis {
        &::before {
          content: '6';
        }
      }
      .sete {
        &::before {
          content: '7';
        }
      }
      .oito {
        &::before {
          content: '8';
        }
      }
      .nove {
        &::before {
          content: '9';
        }
      }
      .dez {
        &::before {
          content: '10';
        }
      }
      .onze {
        &::before {
          content: '11';
        }
      }
      .doze {
        &::before {
          content: '12';
        }
      }
      .treze {
        &::before {
          content: '13';
        }
      }
      .catorze {
        &::before {
          content: '14';
        }
      }
      .quinze {
        &::before {
          content: '15';
        }
      }

      span {
        color: gray;
        font-size: 30px;
        height: 25px;
        line-height: 21px;
        font-family: sans-serif;
        font-weight: bold;
      }

      img {
        margin-right: 15px;
      }
    }
  }
}
</style>
