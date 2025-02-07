<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import barcode from '../../assets/bar-code-svgrepo-com.svg'
import horizontal from '../../assets/horizontal-rule-svgrepo-com.svg'
import camera from '../../assets/camera-svgrepo-com.svg'
import prof from '../../assets/profile-round-1342-svgrepo-com.svg'
import logo from '../../assets/Para Himura.png'

interface Props {
  nome: string
  pronome: string
  chave: string
}

const props = defineProps<Props>()

const profile = ref('')
const nomeValue = ref('')
const pronomeValue = ref('')

const atualizarNomePronome = (pro: boolean, valor: string) => {
  if (pro) {
    pronomeValue.value = valor
  } else {
    nomeValue.value = valor
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

    if (save['url'] !== undefined) {
      atualizarProfile(save['url'])
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
    url: profile.value ?? profile,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

const verificarSeNomePronome = () => {
  const memoria1 = localStorage.getItem('Character Name')
  const memoria2 = localStorage.getItem('Pronouns')
  if (!memoria1) {
    return
  }

  if (!memoria2) {
    return
  }

  try {
    const save1 = JSON.parse(memoria1)
    const save2 = JSON.parse(memoria2)

    if (save1['texto'] !== undefined) {
      atualizarNomePronome(false, save1['texto'])
    }
    if (save2['texto'] !== undefined) {
      atualizarNomePronome(true, save2['texto'])
    }
  } catch (error) {
    console.error('Houve um erro com a coleta de informações', error)
  }
}

onMounted(() => {
  loadInfos()
  verificarSeNomePronome()
})

watch([profile], () => {
  salvarInfos()
})

watch(
  () => props.nome,
  (novoNome) => {
    atualizarNomePronome(false, novoNome)
  },
)

watch(
  () => props.pronome,
  (novoPronome) => {
    atualizarNomePronome(true, novoPronome)
  },
)

const atualizarProfile = (value: string) => {
  profile.value = value
}

const solicitarUrl = () => {
  const resposta = prompt('Por favor insira a url da imagem desejada!')

  if (resposta !== null) {
    atualizarProfile(resposta)
  }
}

const profileIMG = computed(() => {
  if (profile.value !== '') {
    return profile.value
  }
  return prof
})
const bar = computed(() => {
  return barcode
})

const horizontalLine = computed(() => {
  return horizontal
})

const cameraIMG = computed(() => {
  return camera
})

const triangleLogoIMG = computed(() => {
  return logo
})
</script>

<template>
  <div class="cracha_container">
    <div class="top_container">
      <img class="special" :src="horizontalLine" alt="" />
      <div class="barcode_container">
        <img :src="bar" alt="" class="barcode" />
        <img :src="bar" alt="" class="barcode" />
      </div>
    </div>
    <div class="photo_container">
      <div class="photo">
        <div class="img_principal">
          <img :src="profileIMG" alt="" />
          <div class="img_secundaria">
            <a href="" @click.prevent="solicitarUrl">
              <img class="special" :src="cameraIMG" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="text_container">
      <div class="name_container">
        <span>Name</span>
        <p>{{ nomeValue }}</p>
      </div>
      <div class="extra_container">
        <div class="pronouns_container">
          <span>Pronouns</span>
          <p>{{ pronomeValue }}</p>
        </div>
        <img :src="triangleLogoIMG" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cracha_container {
  background-color: #505050;
  border: 2px solid gray;
  border-radius: 16px;
  width: 290px;
  margin-left: 15px;

  .top_container {
    background-color: transparent;
    padding: 5px;
    display: flex;
    justify-content: flex-end;
    margin-right: 14px;

    .barcode_container {
      background-color: transparent;
      display: flex;
      margin-right: 20px;
      margin-left: 10px;

      img {
        background-color: transparent;
        height: 25px;
        width: 100%;
      }
    }

    .special {
      margin-right: 3px;
      width: 75px;
      height: 15px;
      border-radius: 18px;
    }
  }

  .photo_container {
    background-color: transparent;

    padding: 15px;

    .photo {
      border: 2px solid gray;
      background-color: transparent;

      .img_principal {
        display: flex;
        position: relative;
        background-color: lightgray;

        img {
          height: 250px;
          width: 250px;
          background-color: transparent;
        }

        .img_secundaria {
          background-color: transparent;
          position: absolute;
          top: 5px;
          left: 5px;

          a {
            text-decoration: none;
            background-color: transparent;
            height: 25px;
            width: 25px;

            .special {
              background-color: transparent;
              height: 25px;
              width: 25px;
            }
          }
        }
      }
    }
  }

  .text_container {
    padding: 15px;
    display: flex;
    background-color: transparent;
    flex-direction: column;

    .name_container {
      background-color: transparent;
      span {
        color: red;
        font-size: 12px;
        font-family: sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        background-color: transparent;
      }

      p {
        color: lightgray;
        background-color: transparent;
        font-family: sans-serif;
        font-weight: bold;
      }
    }

    .extra_container {
      display: flex;
      background-color: transparent;
      justify-content: space-between;
      margin-top: 5px;
      align-items: center;

      img {
        background-color: transparent;
      }

      .pronouns_container {
        background-color: transparent;

        span {
          color: red;
          font-size: 12px;
          font-family: sans-serif;
          text-transform: uppercase;
          font-weight: bold;
          background-color: transparent;
        }

        p {
          color: lightgray;
          background-color: transparent;
          font-family: sans-serif;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
