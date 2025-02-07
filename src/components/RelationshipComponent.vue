<script setup lang="ts">
import ChartTittleCell3 from './cells/reality/ChartTittleCell3.vue'
import SelectInput from './inputs/SelectInput.vue'
import ChartPointsCell from './cells/reality/ChartPointsCell.vue'
import questionArea from './questions/QuestionArea.vue'
import dados, { type realityData } from '../others/json/jsonData'

interface Props {
  selected: string
}

const props = defineProps<Props>()

const carregarPeguntas = (valor: number) => {
  const reality = props.selected
  const data: realityData = dados.reality

  if (valor === 1) {
    return data[reality]?.RelationshipMatrix.questions[1] || ''
  } else if (valor === 2) {
    return data[reality]?.RelationshipMatrix.questions[2] || ''
  } else {
    return data[reality]?.RelationshipMatrix.questions[3] || ''
  }
}

const gerarChave = (valor: number) => {
  const novaChave = 'rmq' + String(valor)
  return novaChave
}
</script>

<template>
  <div class="anomaly_title_container">
    <h2>Relationships</h2>
    <div>
      <SelectInput tipo="Real" :viewer="true" :selected="props.selected" />
    </div>
  </div>
  <div class="relationship_questions_container">
    <h3>Relationship Matrix Questions:</h3>
    <ul>
      <li v-for="(x, index) in Array.from({ length: 3 })" :key="index">
        <questionArea
          :chave="gerarChave(index)"
          :number="12 + index"
          :pergunta="carregarPeguntas(index + 1)"
        />
      </li>
    </ul>
  </div>
  <div class="anomaly_ablities">
    <div class="ul">
      <li>
        <ul class="line">
          <li>
            <ul>
              <li class="margin">
                <ul>
                  <li>
                    <ChartTittleCell3 :chave="'7'" />
                  </li>
                  <li>
                    <ChartPointsCell :chave="'1'" />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="end_line">
            <ul>
              <li class="margin">
                <ul>
                  <li>
                    <ChartTittleCell3 :chave="'8'" />
                  </li>
                  <li>
                    <ChartPointsCell :chave="'2'" />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <ul class="line">
          <li>
            <ul>
              <li class="margin">
                <ul>
                  <li>
                    <ChartTittleCell3 :chave="'9'" />
                  </li>
                  <li>
                    <ChartPointsCell :chave="'3'" />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="end_line">
            <ul>
              <li class="margin">
                <ul>
                  <li>
                    <ChartTittleCell3 :chave="'10'" />
                  </li>
                  <li>
                    <ChartPointsCell :chave="'4'" />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <ul class="line">
          <li>
            <ul>
              <li class="margin">
                <ul>
                  <li>
                    <ChartTittleCell3 :chave="'11'" />
                  </li>
                  <li>
                    <ChartPointsCell :chave="'5'" />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="end_line">
            <ul>
              <li class="margin">
                <ul>
                  <li>
                    <ChartTittleCell3 :chave="'12'" />
                  </li>
                  <li>
                    <ChartPointsCell :chave="'6'" />
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </div>
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
  .line {
    width: 100%;
    display: flex;

    li {
      margin-right: 5px;
    }

    .end_line {
      margin-right: 0;
    }
  }

  ul {
    width: 100%;

    .margin {
      margin-bottom: 15px;
    }
  }
}
.relationship_questions_container {
  h3 {
    color: rgba($color: #ffff00, $alpha: 0.7);
    font-size: 22px;
    font-family: sans-serif;
    font-weight: bold;
    margin-bottom: 16px;
  }
}
.body {
  display: flex;
  height: 250px;
}
</style>
