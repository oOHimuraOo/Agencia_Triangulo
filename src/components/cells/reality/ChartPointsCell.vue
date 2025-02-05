<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import trianguloAmarelo from '../../../assets/play-svgrepo-com copy.svg'
import trianguloAmareloCima from '../../../assets/triangle-svgrepo-com copy.svg'

interface Props {
  chave: string
}

const props = defineProps<Props>()

const descricao = ref('')
const connection = ref('')
const network = ref(0)
const active = ref(false)

const atualizarDescricao = (valor: string) => {
  descricao.value = valor
}

const atualizarConnection = (valor: string) => {
  connection.value = valor
}

const atualizarNetwork = (valor: number, checked: boolean) => {
  if (checked) {
    network.value = valor
  } else {
    network.value = valor - 1
  }
}

const atualizarActive = (valor: boolean) => {
  active.value = valor
}

const intermediator = (numero: number, event: Event) => {
  if (!event) {
    return
  }

  const checked = (event.target as HTMLInputElement).checked
  atualizarNetwork(numero, checked)
}

const textIntermediator = (evento: Event | undefined) => {
  if (!evento) {
    return ''
  }

  const text = (evento.target as HTMLInputElement).value
  return text
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
    descricao: descricao.value ?? descricao,
    connection: connection.value ?? connection,
    network: network.value ?? network,
    active: active.value ?? active,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
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

    if (save['descricao'] !== undefined) {
      atualizarDescricao(save['descricao'])
    }
    if (save['connection'] !== undefined) {
      atualizarConnection(save['connection'])
    }
    if (save['network'] !== undefined) {
      atualizarNetwork(save['network'], true)
    }
    if (save['active'] !== undefined) {
      atualizarActive(save['active'])
    }
  } catch (error) {
    console.error('Erro ao carregar as informações', error)
  }
}

onMounted(() => {
  loadInfos()
})

watch([descricao, connection, network, active], () => {
  salvarInfos()
})

const trianguloCima = computed(() => {
  return trianguloAmareloCima
})

const triangulo = computed(() => {
  return trianguloAmarelo
})
</script>

<template>
  <div class="body_container">
    <div class="text_container">
      <p>
        <span>Descricao</span>
        <br /><br />
      </p>
      <textarea
        name=""
        id=""
        cols="30"
        rows="3"
        placeholder="Digite aqui a descrição da personagem"
        :value="descricao"
        @blur="atualizarDescricao(textIntermediator($event))"
      ></textarea>
    </div>
    <ul>
      <li>
        <p><span>0</span></p>
        <img :src="triangulo" alt="" />
      </li>
      <li>
        <p><span>1</span></p>
        <input
          type="checkbox"
          name=""
          id=""
          :checked="network > 0"
          @click="intermediator(1, $event)"
        />
      </li>
      <li>
        <p><span>2</span></p>
        <input
          type="checkbox"
          name=""
          id=""
          :checked="network > 1"
          @click="intermediator(2, $event)"
        />
      </li>
      <li>
        <p><span>3</span></p>
        <input
          type="checkbox"
          name=""
          id=""
          :checked="network > 2"
          @click="intermediator(3, $event)"
        />
      </li>
      <li>
        <p><span>4</span></p>
        <input
          type="checkbox"
          name=""
          id=""
          :checked="network > 3"
          @click="intermediator(4, $event)"
        />
      </li>
      <li>
        <p><span>5</span></p>
        <input
          type="checkbox"
          name=""
          id=""
          :checked="network > 4"
          @click="intermediator(5, $event)"
        />
      </li>
      <li>
        <p><span>6</span></p>
        <input
          type="checkbox"
          name=""
          id=""
          :checked="network > 5"
          @click="intermediator(6, $event)"
        />
      </li>
      <li>
        <p><span>7</span></p>
        <input
          type="checkbox"
          name=""
          id=""
          :checked="network > 6"
          @click="intermediator(7, $event)"
        />
      </li>
      <li>
        <p><span>8</span></p>
        <input
          type="checkbox"
          name=""
          id=""
          :checked="network > 7"
          @click="intermediator(8, $event)"
        />
      </li>
      <li class="nove">
        <p><span>9</span></p>
        <input
          type="checkbox"
          name=""
          id=""
          :checked="network > 8"
          @click="intermediator(9, $event)"
        />
        <p class="network">
          <span>Networked</span>
          <img :src="trianguloCima" alt="" />
        </p>
      </li>
    </ul>
    <div class="bottom_text_container">
      <div class="left_text_container">
        <p>
          <span>Connection Bonus:</span>
        </p>
        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          placeholder="Digite aqui a conecção bonus"
          :value="connection"
          @blur="atualizarConnection(textIntermediator($event))"
        ></textarea>
      </div>
      <div class="right_text_container">
        <input type="checkbox" name="" id="" :checked="active" @click="atualizarActive(!active)" />
        <p><span>Active</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.body_container {
  border: 2px solid rgba($color: #ffff00, $alpha: 0.7);
  border-top: none;
  border-radius: 16px;
  border-start-start-radius: 0;
  border-start-end-radius: 0;
  background-color: transparent;

  .text_container {
    padding: 16px;
    background-color: transparent;
  }

  textarea {
    width: 100%;
    color: gray;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: normal;
    text-transform: none;
    color: gray;
    background-color: transparent;
    resize: none;
    outline: none;
    border: none;
  }

  p {
    font-family: sans-serif;
    font-size: 16px;
    font-weight: normal;
    text-transform: none;
    color: gray;
    background-color: transparent;

    span {
      text-transform: uppercase;
      font-weight: bold;
      color: rgba($color: #ffff00, $alpha: 0.7);
      background-color: transparent;
    }
  }

  ul {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    padding-top: 0;
    background-color: transparent;

    li {
      background-color: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        margin-top: 5px;
        height: 25px;
        width: 25px;
      }

      input {
        margin-top: 5px;
        appearance: none;
        background-color: rgba($color: #ffff00, $alpha: 0.4);
        height: 25px;
        width: 25px;
        border-radius: 50%;
        border: 2px solid rgba($color: #ffff00, $alpha: 0.7);

        &:checked {
          background-color: rgba($color: #ff00ff, $alpha: 0.4);
          position: relative;

          &::after {
            content: '✔';
            color: white;
            font-size: 30px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }

    .nove {
      position: relative;

      .network {
        position: absolute;
        font-size: 12px;
        display: flex;
        align-items: center;
        bottom: -40%;
        left: -305%;
        text-align: center;

        img {
          margin: 0;
          margin-left: 5px;
          height: 10px;
          width: 10px;
        }

        span {
          color: rgba($color: #ffff00, $alpha: 0.6);
        }
      }
    }
  }

  .bottom_text_container {
    display: flex;
    padding: 0 16px;
    background-color: transparent;
    margin-bottom: 8px;
    margin-top: 8px;

    .left_text_container {
      background-color: transparent;
      width: 100%;

      p {
        margin-bottom: 16px;

        span {
          text-transform: capitalize;
        }
      }
    }

    .right_text_container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: transparent;
      justify-content: center;

      input {
        width: 50px;
        height: 50px;
        appearance: none;
        border: 2px solid rgba($color: #ffff00, $alpha: 0.7);
        background-color: rgba($color: #ffff00, $alpha: 0.4);
        border-radius: 8px;
        margin-bottom: 8px;

        &:checked {
          position: relative;
          background-color: rgba($color: #ff00ff, $alpha: 0.4);

          &::after {
            content: '✔';
            color: white;
            font-size: 30px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
