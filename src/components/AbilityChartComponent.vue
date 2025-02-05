<script setup lang="ts">
import ChartTitleCell from './cells/anomaly/ChartTitleCell.vue'
import ChartLeftColumnCell from './cells/anomaly/ChartLeftColumnCell.vue'
import ChartRightColumnCell from './cells/anomaly/ChartRightColumnCell.vue'
import SelectInput from './inputs/SelectInput.vue'
import dados from '../others/json/jsonData'
import { computed } from 'vue'

interface Props {
  selected: string
}

const props = defineProps<Props>()

const descobrirNome = computed(() => {
  return (habilidade: number) => {
    const anomalia: string = props.selected

    if (habilidade === 1) {
      return dados.anomaly[anomalia]?.['Habilidade 1']?.Nome || 'Nome Desconhecido'
    } else if (habilidade === 2) {
      return dados.anomaly[anomalia]?.['Habilidade 2']?.Nome || 'Nome Desconhecido'
    } else {
      return dados.anomaly[anomalia]?.['Habilidade 3']?.Nome || 'Nome Desconhecido'
    }
  }
})

const descobrirGatilho = computed(() => {
  return (habilidade: number) => {
    const anomalia: string = props.selected

    if (habilidade === 1) {
      return dados.anomaly[anomalia]?.['Habilidade 1']?.Texto || 'Trigger Desconhecido'
    } else if (habilidade === 2) {
      return dados.anomaly[anomalia]?.['Habilidade 2']?.Texto || 'Trigger Desconhecido'
    } else {
      return dados.anomaly[anomalia]?.['Habilidade 3']?.Texto || 'Trigger Desconhecido'
    }
  }
})

const descobrirSucesso = computed(() => {
  return (habilidade: number) => {
    const anomalia: string = props.selected

    if (habilidade === 1) {
      return dados.anomaly[anomalia]?.['Habilidade 1']?.Sucesso || 'Sucesso Desconhecido'
    } else if (habilidade === 2) {
      return dados.anomaly[anomalia]?.['Habilidade 2']?.Sucesso || 'Sucesso Desconhecido'
    } else {
      return dados.anomaly[anomalia]?.['Habilidade 3']?.Sucesso || 'Sucesso Desconhecido'
    }
  }
})

const descobrirTriforce = computed(() => {
  return (habilidade: number) => {
    const anomalia: string = props.selected

    if (habilidade === 1) {
      return dados.anomaly[anomalia]?.['Habilidade 1']?.Triforce || 'Triforce Desconhecido'
    } else if (habilidade === 2) {
      return dados.anomaly[anomalia]?.['Habilidade 2']?.Triforce || 'Triforce Desconhecido'
    } else {
      return dados.anomaly[anomalia]?.['Habilidade 3']?.Triforce || 'Triforce Desconhecido'
    }
  }
})

const descobrirFalha = computed(() => {
  return (habilidade: number) => {
    const anomalia: string = props.selected

    if (habilidade === 1) {
      return dados.anomaly[anomalia]?.['Habilidade 1']?.Falha || 'Falha desconhecida'
    } else if (habilidade === 2) {
      return dados.anomaly[anomalia]?.['Habilidade 2']?.Falha || 'Falha desconhecida'
    } else {
      return dados.anomaly[anomalia]?.['Habilidade 3']?.Falha || 'Falha desconhecida'
    }
  }
})

const descobrirPergunta = computed(() => {
  return (habilidade: number) => {
    const anomalia: string = props.selected

    if (habilidade === 1) {
      return dados.anomaly[anomalia]?.['Habilidade 1']?.Pergunta || 'Pergunta desconhecida'
    } else if (habilidade === 2) {
      return dados.anomaly[anomalia]?.['Habilidade 2']?.Pergunta || 'Pergunta desconhecida'
    } else {
      return dados.anomaly[anomalia]?.['Habilidade 3']?.Pergunta || 'Pergunta desconhecida'
    }
  }
})

const descobrirResposta1 = computed(() => {
  return (habilidade: number) => {
    const anomalia: string = props.selected

    if (habilidade === 1) {
      return dados.anomaly[anomalia]?.['Habilidade 1']?.['Resposta A'] || 'Resposta desconhecida'
    } else if (habilidade === 2) {
      return dados.anomaly[anomalia]?.['Habilidade 2']?.['Resposta A'] || 'Resposta desconhecida'
    } else {
      return dados.anomaly[anomalia]?.['Habilidade 3']?.['Resposta A'] || 'Resposta desconhecida'
    }
  }
})

const descobrirResposta2 = computed(() => {
  return (habilidade: number) => {
    const anomalia: string = props.selected

    if (habilidade === 1) {
      return dados.anomaly[anomalia]?.['Habilidade 1']?.['Resposta B'] || 'Resposta desconhecida'
    } else if (habilidade === 2) {
      return dados.anomaly[anomalia]?.['Habilidade 2']?.['Resposta B'] || 'Resposta desconhecida'
    } else {
      return dados.anomaly[anomalia]?.['Habilidade 3']?.['Resposta B'] || 'Resposta desconhecida'
    }
  }
})

const descobrirNumero1 = computed(() => {
  return (habilidade: number) => {
    const anomalia: string = props.selected

    if (habilidade === 1) {
      return dados.anomaly[anomalia]?.['Habilidade 1']?.['numeracao A'] || 'Numero desconhecida'
    } else if (habilidade === 2) {
      return dados.anomaly[anomalia]?.['Habilidade 2']?.['numeracao A'] || 'Numero desconhecida'
    } else {
      return dados.anomaly[anomalia]?.['Habilidade 3']?.['numeracao A'] || 'Numero desconhecida'
    }
  }
})

const descobrirNumero2 = computed(() => {
  return (habilidade: number) => {
    const anomalia: string = props.selected

    if (habilidade === 1) {
      return dados.anomaly[anomalia]?.['Habilidade 1']?.['numeracao B'] || 'Numero desconhecida'
    } else if (habilidade === 2) {
      return dados.anomaly[anomalia]?.['Habilidade 2']?.['numeracao B'] || 'Numero desconhecida'
    } else {
      return dados.anomaly[anomalia]?.['Habilidade 3']?.['numeracao B'] || 'Numero desconhecida'
    }
  }
})

const descobrirQualidade = computed(() => {
  return (habilidade: number) => {
    const anomalia: string = props.selected

    if (habilidade === 1) {
      return dados.anomaly[anomalia]?.['Habilidade 1']?.Qualidade || 'Qualidade desconhecida'
    } else if (habilidade === 2) {
      return dados.anomaly[anomalia]?.['Habilidade 2']?.Qualidade || 'Qualidade desconhecida'
    } else {
      return dados.anomaly[anomalia]?.['Habilidade 3']?.Qualidade || 'Qualidade desconhecida'
    }
  }
})
</script>

<template>
  <div class="anomaly_title_container">
    <h2>anomalie ablities</h2>
    <div>
      <SelectInput tipo="Anom" :viewer="true" :selected="props.selected" />
    </div>
  </div>
  <div class="anomaly_ablities">
    <ul>
      <li class="margin">
        <ul>
          <li>
            <ChartTitleCell
              :-nome="descobrirNome(1)"
              :-gatilho="descobrirGatilho(1)"
              :-quality="descobrirQualidade(1)"
            />
          </li>
          <li class="body">
            <div class="left_container">
              <ChartLeftColumnCell
                :-sucesso="descobrirSucesso(1)"
                :triforce="descobrirTriforce(1)"
              />
            </div>
            <div class="right_container">
              <ChartRightColumnCell
                :-falha="descobrirFalha(1)"
                :numero1="descobrirNumero1(1)"
                :numero2="descobrirNumero2(1)"
                :pergunta="descobrirPergunta(1)"
                :resposta1="descobrirResposta1(1)"
                :resposta2="descobrirResposta2(1)"
              />
            </div>
          </li>
        </ul>
      </li>
      <li class="margin">
        <ul>
          <li>
            <ChartTitleCell
              :-nome="descobrirNome(2)"
              :-gatilho="descobrirGatilho(2)"
              :-quality="descobrirQualidade(2)"
            />
          </li>
          <li class="body">
            <div class="left_container">
              <ChartLeftColumnCell
                :-sucesso="descobrirSucesso(2)"
                :triforce="descobrirTriforce(2)"
              />
            </div>
            <div class="right_container">
              <ChartRightColumnCell
                :-falha="descobrirFalha(2)"
                :numero1="descobrirNumero1(2)"
                :numero2="descobrirNumero2(2)"
                :pergunta="descobrirPergunta(2)"
                :resposta1="descobrirResposta1(2)"
                :resposta2="descobrirResposta2(2)"
              />
            </div>
          </li>
        </ul>
      </li>
      <li class="margin">
        <ul>
          <li>
            <ChartTitleCell
              :-nome="descobrirNome(3)"
              :-gatilho="descobrirGatilho(3)"
              :-quality="descobrirQualidade(3)"
            />
          </li>
          <li class="body">
            <div class="left_container">
              <ChartLeftColumnCell
                :-sucesso="descobrirSucesso(3)"
                :triforce="descobrirTriforce(3)"
              />
            </div>
            <div class="right_container">
              <ChartRightColumnCell
                :-falha="descobrirFalha(3)"
                :numero1="descobrirNumero1(3)"
                :numero2="descobrirNumero2(3)"
                :pergunta="descobrirPergunta(3)"
                :resposta1="descobrirResposta1(3)"
                :resposta2="descobrirResposta2(3)"
              />
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.anomaly_title_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;

  h2 {
    width: 100%;
    text-transform: capitalize;
    color: white;
    font-family: sans-serif;
    font-size: 35px;
    font-weight: bolder;
  }
}

.anomaly_ablities {
  ul {
    .margin {
      margin-bottom: 15px;
    }
  }
}

.body {
  display: flex;
  height: 250px;

  .left_container {
    width: 100%;
  }

  .right_container {
    width: 100%;
  }
}
</style>
