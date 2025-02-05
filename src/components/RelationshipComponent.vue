<script setup lang="ts">
import ChartTittleCell3 from './cells/reality/ChartTittleCell3.vue'
import SelectInput from './inputs/SelectInput.vue'
import ChartPointsCell from './cells/reality/ChartPointsCell.vue'

interface Props {
  selected: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="anomaly_title_container">
    <h2>Relationships</h2>
    <div>
      <SelectInput tipo="Real" :viewer="true" :selected="props.selected" />
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

.body {
  display: flex;
  height: 250px;
}
</style>
