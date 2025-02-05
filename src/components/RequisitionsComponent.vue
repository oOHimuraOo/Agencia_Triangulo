<script setup lang="ts">
import SelectInput from './inputs/SelectInput.vue'
import ChartTittleCell2 from './cells/competency/ChartTittleCell2.vue'
import ChartTextCell from './cells/competency/ChartTextCell.vue'
import { computed } from 'vue';
import dados from '../others/json/jsonData'

interface Props {
  selected: string
}

const props = defineProps<Props>()

const innitialRequisitionName = computed(() => {
  const competencia: string = props.selected
  return dados.competency[competencia]?.["InitialRequisition"].name || "Nome Não encontrado"
})

const innitialRequisitionText = computed(() => {
  const competencia:string = props.selected
  return dados.competency[competencia]?.["InitialRequisition"].text || "Texto não encontrado"
})

const innitialRequisitionPG = computed(() => {
  const competencia: string = props.selected
  return dados.competency[competencia]?.["Pg"] || "Pagina não encontrada"
})
</script>

<template>
  <div class="anomaly_title_container">
    <h2>Requisitions & Work/life Benefits</h2>
    <div>
      <SelectInput tipo="Comp" :viewer="true" :selected="props.selected" />
    </div>
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
                    <ChartTittleCell2 :-nome="innitialRequisitionName" :page="innitialRequisitionPG" />
                  </li>
                  <li>
                    <ChartTextCell :efeito="innitialRequisitionText" />
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
                    <ChartTittleCell2 :-nome="' '" :page="' '" />
                  </li>
                  <li>
                    <ChartTextCell :efeito="' '" />
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
                    <ChartTittleCell2 :-nome="' '" :page="' '" />
                  </li>
                  <li>
                    <ChartTextCell :efeito="' '" />
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
                    <ChartTittleCell2 :-nome="' '" :page="' '" />
                  </li>
                  <li>
                    <ChartTextCell :efeito="' '" />
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
                    <ChartTittleCell2 :-nome="' '" :page="' '" />
                  </li>
                  <li>
                    <ChartTextCell :efeito="' '" />
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
                    <ChartTittleCell2 :-nome="' '" :page="' '" />
                  </li>
                  <li>
                    <ChartTextCell :efeito="' '" />
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
      width: 100%;
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

.body {
  display: flex;
  height: 250px;
}
</style>
