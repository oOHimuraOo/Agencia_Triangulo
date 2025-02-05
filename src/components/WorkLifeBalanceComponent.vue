<script setup lang="ts">
import { computed, onMounted, Prop, ref, watch } from 'vue'
import alert from '../assets/alert-triangle-svgrepo-com.svg'
import medalhista from '../assets/Medalhista.png'
import prison from '../assets/prison-14-svgrepo-com.svg'
import playVermelho from '../assets/play-svgrepo-com.svg'
import playAmarelo from '../assets/play-svgrepo-com copy.svg'
import playAzul from '../assets/play-svgrepo-com copy 2.svg'
import bolaAzul from '../assets/circle-svgrepo-com copy 2.svg'
import bolaAmarela from '../assets/circle-svgrepo-com copy.svg'
import bolaVermelha from '../assets/circle-svgrepo-com.svg'
import playCinza from '../assets/play-svgrepo-com copy 3.svg'

interface Props {
  chave: string
}

const props = defineProps<Props>()

const mvpValue = ref(0)
const probationValue = ref(0)
const competancyLevel = ref(0)
const realityLevel = ref(0)
const anomalyLevel = ref(0)

const atualizarMvpValue = (valor: number) => {
  mvpValue.value = valor
}

const atualizarProbationValue = (valor: number) => {
  probationValue.value = valor
}

const atualizarCompetancyLevel = (valor: number, checked: boolean) => {
  if (checked) {
    competancyLevel.value = valor
  } else {
    competancyLevel.value = valor - 1
  }
}

const atualizarRealityLevel = (valor: number, checked: boolean) => {
  if (checked) {
    realityLevel.value = valor
  } else {
    realityLevel.value = valor - 1
  }
}

const atualizarAnomalyLevel = (valor: number, checked: boolean) => {
  if (checked) {
    anomalyLevel.value = valor
  } else {
    anomalyLevel.value = valor - 1
  }
}

const intemediator = (tipo: string, numero: number, evento: Event) => {
  const checked = (evento.target as HTMLInputElement).checked
  if (tipo === 'anom') {
    atualizarAnomalyLevel(numero, checked)
  } else if (tipo === 'comp') {
    atualizarCompetancyLevel(numero, checked)
  } else {
    atualizarRealityLevel(numero, checked)
  }
}

const intermediarNumero = (evento: Event) => {
  const numero = (evento.target as HTMLInputElement).value
  return Number(numero)
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

    if (save['mvp'] !== undefined) {
      atualizarMvpValue(save['mvp'])
    }
    if (save['probation'] !== undefined) {
      atualizarProbationValue(save['probation'])
    }
    if (save['competency'] !== undefined) {
      atualizarCompetancyLevel(save['competency'], true)
    }
    if (save['reality'] !== undefined) {
      atualizarRealityLevel(save['reality'], true)
    }
    if (save['anomaly'] !== undefined) {
      atualizarAnomalyLevel(save['anomaly'], true)
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
    mvp: mvpValue.value ?? mvpValue,
    probation: probationValue.value ?? probationValue,
    reality: realityLevel.value ?? realityLevel,
    anomaly: anomalyLevel.value ?? anomalyLevel,
    competency: competancyLevel.value ?? competancyLevel,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

onMounted(() => {
  loadInfos()
})

watch([mvpValue, probationValue, realityLevel, anomalyLevel, competancyLevel], () => {
  salvarInfos()
})

const alertaIMG = computed(() => {
  return alert
})

const medalhistaIMG = computed(() => {
  return medalhista
})

const prisonIMG = computed(() => {
  return prison
})

const playColorido = computed(() => {
  return (cor: string, bola: boolean) => {
    if (bola) {
      if (cor === 'Azul') {
        return bolaAzul
      }
      if (cor === 'Amarelo') {
        return bolaAmarela
      }
      return bolaVermelha
    } else {
      if (cor === 'Azul') {
        return playAzul
      }
      if (cor === 'Amarelo') {
        return playAmarelo
      }
      if (cor === 'Cinza') return playCinza
      return playVermelho
    }
  }
})

const trianguloAzulURL = './src/assets/play-svgrepo-com copy 2.svg'
</script>

<template>
  <div class="fullpage_container">
    <h2>Work/Life Balance</h2>
    <div class="multi_info_container">
      <div class="alert_container">
        <div class="intern_container_a">
          <img :src="alertaIMG" />
          <p>
            Each time you mark a box, you must <span>strike one out from the end</span> of the other
            tracks.
          </p>
        </div>
        <p>
          Mark 1 box per avaible time after each mission, then visit the playwalled Documents
          matching any code you mark.
        </p>
      </div>
      <div class="mvp_container">
        <div class="border_container">
          <div class="intern_container_a">
            <img :src="medalhistaIMG" />
            <div class="title_container">
              <b>MVP</b>
              <p>Times Received</p>
            </div>
          </div>
          <div class="intern_container_b">
            <input
              type="number"
              :value="mvpValue"
              @blur="atualizarMvpValue(intermediarNumero($event))"
            />
          </div>
        </div>
        <p>Awarded to the player who earns the most Commendations.</p>
      </div>
      <div class="probation_container">
        <div class="border_container gray">
          <div class="intern_container_a">
            <img :src="prisonIMG" />
            <div class="title_container">
              <b>Probation</b>
              <p>Times Received</p>
            </div>
          </div>
          <div class="intern_container_b gray">
            <input
              type="number"
              :value="probationValue"
              @blur="atualizarProbationValue(intermediarNumero($event))"
            />
          </div>
        </div>
        <p>Awarded to the player who earns the most Demerits</p>
      </div>
    </div>
    <div class="competency_container">
      <h3>Competency</h3>
      <div class="chart_container">
        <div class="linha_superior">
          <div class="entrada_container">
            <div class="title_container">
              <h5>&nbsp;</h5>
            </div>
            <div class="input_container">
              <img :src="playColorido('Vermelho', false)" />
            </div>
          </div>
          <div class="trainee_container">
            <div class="title_container">
              <h5>TRAINEE</h5>
              <span>---------------</span>
              <img :src="playColorido('Cinza', false)" />
            </div>
            <div class="input_container">
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 0"
                @click="intemediator('comp', 1, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 1"
                @click="intemediator('comp', 2, $event)"
              />
              <span>-</span>
            </div>
          </div>
          <div class="associate_container">
            <div class="title_container">
              <h5>Associate</h5>
              <span>---------------------------</span>
              <img :src="playColorido('Cinza', false)" alt="" />
            </div>
            <div class="input_container">
              <input
                type="checkbox"
                class="tagged tagged-A3"
                :checked="competancyLevel > 2"
                @click="intemediator('comp', 3, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 3"
                @click="intemediator('comp', 4, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 4"
                @click="intemediator('comp', 5, $event)"
              />
              <span>-</span>
            </div>
          </div>
          <div class="sr_associate_container">
            <div class="title_container">
              <h5>sr.associate</h5>
              <span>----------------------</span>
              <img :src="playColorido('Cinza', false)" alt="" />
            </div>
            <div class="input_container">
              <input
                type="checkbox"
                class="tagged tagged-D4"
                :checked="competancyLevel > 5"
                @click="intemediator('comp', 6, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 6"
                @click="intemediator('comp', 7, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 7"
                @click="intemediator('comp', 8, $event)"
              />
              <span>-</span>
            </div>
          </div>
          <div class="assistant_director_container">
            <div class="title_container">
              <h5>assistant director</h5>
              <span>-------------</span>
              <img :src="playColorido('Cinza', false)" alt="" />
            </div>
            <div class="input_container">
              <input
                type="checkbox"
                class="tagged tagged-G3"
                :checked="competancyLevel > 8"
                @click="intemediator('comp', 9, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 9"
                @click="intemediator('comp', 10, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 10"
                @click="intemediator('comp', 11, $event)"
              />
              <span>-</span>
            </div>
          </div>
          <div class="director_container">
            <div class="title_container">
              <h5>Director</h5>
              <span>----------------------------</span>
              <img :src="playColorido('Cinza', false)" alt="" />
            </div>
            <div class="input_container">
              <input
                type="checkbox"
                class="tagged tagged-J3"
                :checked="competancyLevel > 11"
                @click="intemediator('comp', 12, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 12"
                @click="intemediator('comp', 13, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 13"
                @click="intemediator('comp', 14, $event)"
              />
              <span>-</span>
            </div>
          </div>
          <div class="last_container">
            <div class="title_container">
              <h5>&nbsp;</h5>
              <span>------------</span>
            </div>
            <div class="input_container">
              <input
                type="checkbox"
                class="tagged tagged-N3"
                :checked="competancyLevel > 14"
                @click="intemediator('comp', 15, $event)"
              />
              <span class="special">-|</span>
            </div>
          </div>
        </div>
        <div class="linha_inferior">
          <div class="saida_container">
            <div class="input_container">
              <img :src="playColorido('Vemelho', true)" />
            </div>
            <div class="title_container">
              <h5>&nbsp;</h5>
            </div>
          </div>
          <div class="chair_container">
            <div class="input_container">
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 29"
                @click="intemediator('comp', 30, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 28"
                @click="intemediator('comp', 29, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 27"
                @click="intemediator('comp', 28, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                class="tagged tagged-Y2"
                :checked="competancyLevel > 26"
                @click="intemediator('comp', 27, $event)"
              />
              <span>-</span>
            </div>
            <div class="title_container">
              <img :src="playColorido('Cinza', false)" alt="" />
              <span>------------------------------------------------</span>
              <h5>Chair</h5>
            </div>
          </div>
          <div class="executive_vp_container">
            <div class="input_container">
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 25"
                @click="intemediator('comp', 26, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 24"
                @click="intemediator('comp', 25, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                class="tagged tagged-W8"
                :checked="competancyLevel > 23"
                @click="intemediator('comp', 24, $event)"
              />
              <span>-</span>
            </div>
            <div class="title_container">
              <img :src="playColorido('Cinza', false)" alt="" />
              <span>----------------------</span>
              <h5>executive vp</h5>
            </div>
          </div>
          <div class="senior_vp_container">
            <div class="input_container">
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 22"
                @click="intemediator('comp', 23, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 21"
                @click="intemediator('comp', 22, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                class="tagged tagged-T3"
                :checked="competancyLevel > 20"
                @click="intemediator('comp', 21, $event)"
              />
              <span>-</span>
            </div>
            <div class="title_container">
              <img :src="playColorido('Cinza', false)" alt="" />
              <span>---------------------------</span>
              <h5>senior vp</h5>
            </div>
          </div>
          <div class="vice_president_container">
            <div class="input_container">
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 19"
                @click="intemediator('comp', 20, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 18"
                @click="intemediator('comp', 19, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                class="tagged tagged-Q3"
                :checked="competancyLevel > 17"
                @click="intemediator('comp', 18, $event)"
              />
              <span>-</span>
            </div>
            <div class="title_container">
              <img :src="playColorido('Cinza', false)" alt="" />
              <span>--------------------</span>
              <h5>vice president</h5>
            </div>
          </div>
          <div class="regional_director_container">
            <div class="input_container">
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 16"
                @click="intemediator('comp', 17, $event)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 15"
                @click="intemediator('comp', 16, $event)"
              />
              <span class="special">-|</span>
            </div>
            <div class="title_container">
              <img :src="playColorido('Cinza', false)" alt="" />
              <span>--</span>
              <h5>regional director</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="text_container">
        <div class="left_text">
          <p>
            Each time you mark a box in your competancy track, increase your
            <span>Maximun Quality Assurance</span> by <span>1</span> in any <span>Qaulity</span>, up
            to a maximun of <span>9</span>. Then, gain <span>3</span> Commendations
          </p>
        </div>
        <div class="right_text">
          <p>
            When you receive <span>Mission MVP</span>, mark <span>1</span> box, in your
            <span>Competency track</span> without striking one out from the other tracks.
          </p>
        </div>
      </div>
    </div>
    <div class="reality_container">
      <h3>Reality</h3>
      <div class="chart_container yellow">
        <div class="linha_superior">
          <img :src="playColorido('Amarelo', false)" />
          <input
            type="checkbox"
            class="tagged tagged-C4"
            :checked="realityLevel > 0"
            @click="intemediator('real', 1, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 1"
            @click="intemediator('real', 2, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 2"
            @click="intemediator('real', 3, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-L11"
            :checked="realityLevel > 3"
            @click="intemediator('real', 4, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 4"
            @click="intemediator('real', 5, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 5"
            @click="intemediator('real', 6, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 6"
            @click="intemediator('real', 7, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-E2"
            :checked="realityLevel > 7"
            @click="intemediator('real', 8, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 8"
            @click="intemediator('real', 9, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-O4"
            :checked="realityLevel > 9"
            @click="intemediator('real', 10, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 10"
            @click="intemediator('real', 11, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 11"
            @click="intemediator('real', 12, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 12"
            @click="intemediator('real', 13, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-T6"
            :checked="realityLevel > 13"
            @click="intemediator('real', 14, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 14"
            @click="intemediator('real', 15, $event)"
          />
          <span class="special special-LS">-|</span>
        </div>
        <div class="linha_inferior">
          <img :src="playColorido('Amarelo', true)" />
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 29"
            @click="intemediator('real', 30, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 28"
            @click="intemediator('real', 29, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 27"
            @click="intemediator('real', 28, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 26"
            @click="intemediator('real', 27, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-E3"
            :checked="realityLevel > 25"
            @click="intemediator('real', 26, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 24"
            @click="intemediator('real', 25, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 23"
            @click="intemediator('real', 24, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 22"
            @click="intemediator('real', 23, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-H5"
            :checked="realityLevel > 21"
            @click="intemediator('real', 22, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 20"
            @click="intemediator('real', 21, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-X3"
            :checked="realityLevel > 19"
            @click="intemediator('real', 20, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 18"
            @click="intemediator('real', 19, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 17"
            @click="intemediator('real', 18, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 16"
            @click="intemediator('real', 17, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-V2"
            :checked="realityLevel > 15"
            @click="intemediator('real', 16, $event)"
          />
          <span class="special special-LI">-|</span>
        </div>
      </div>
      <div class="text_container_yellow">
        <div class="left_text">
          <p>
            Each time you mark a box in your <span>Reality track</span>, increase your
            <span>Connection</span> with any <span>Relationship</span> by <span>1</span>, then
            repeat for each <span>Network Relationship</span>.
          </p>
        </div>
        <div class="right_text">
          <p>
            When you receive neither <span>MVP</span> nor <span>Probation</span>, you may increase
            your <span>Connection</span> with any <span>Relationship</span> by <span>1</span>.
          </p>
        </div>
      </div>
    </div>
    <div class="anomaly_container">
      <h3>Anomaly</h3>
      <div class="chart_container blue">
        <div class="linha_superior">
          <img :src="playColorido('Azul', false)" />
          <input
            type="checkbox"
            class="tagged tagged-H4"
            :checked="anomalyLevel > 0"
            @click="intemediator('anom', 1, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-H3"
            :checked="anomalyLevel > 1"
            @click="intemediator('anom', 2, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 2"
            @click="intemediator('anom', 3, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 3"
            @click="intemediator('anom', 4, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-U2"
            :checked="anomalyLevel > 4"
            @click="intemediator('anom', 5, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 5"
            @click="intemediator('anom', 6, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-X2"
            :checked="anomalyLevel > 6"
            @click="intemediator('anom', 7, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 7"
            @click="intemediator('anom', 8, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 8"
            @click="intemediator('anom', 9, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 9"
            @click="intemediator('anom', 10, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-N1"
            :checked="anomalyLevel > 10"
            @click="intemediator('anom', 11, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 11"
            @click="intemediator('anom', 12, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-Q2"
            :checked="anomalyLevel > 12"
            @click="intemediator('anom', 13, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 13"
            @click="intemediator('anom', 14, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 14"
            @click="intemediator('anom', 15, $event)"
          />
          <span class="special special-LS">-|</span>
        </div>
        <div class="linha_inferior">
          <img :src="playColorido('Azul', true)" />
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 29"
            @click="intemediator('anom', 30, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 28"
            @click="intemediator('anom', 29, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 27"
            @click="intemediator('anom', 28, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 26"
            @click="intemediator('anom', 27, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 25"
            @click="intemediator('anom', 26, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 24"
            @click="intemediator('anom', 25, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 23"
            @click="intemediator('anom', 24, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-A7"
            :checked="anomalyLevel > 22"
            @click="intemediator('anom', 23, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 21"
            @click="intemediator('anom', 22, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 20"
            @click="intemediator('anom', 21, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 19"
            @click="intemediator('anom', 20, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-G8"
            :checked="anomalyLevel > 18"
            @click="intemediator('anom', 19, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 17"
            @click="intemediator('anom', 18, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-L10"
            :checked="anomalyLevel > 16"
            @click="intemediator('anom', 17, $event)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 15"
            @click="intemediator('anom', 16, $event)"
          />
          <span class="special special-LI">-|</span>
        </div>
      </div>
      <div class="text_container_blue">
        <div class="left_text">
          <p>
            <span>Each time you mark a box in your Anomaly track, pick one:</span>
          </p>
          <br />
          <ul>
            <li>
              <p><span>Practice:</span> Mark the Practiced on any Anomaly Ability.</p>
            </li>
            <li>
              <p>
                <span>Be Known:</span> Erase Practiced from an Anomaly ability and ask your team
                that ability's question. Mark the track of the answer that gets the most votes, then
                receive any unlocked Abilities.
              </p>
            </li>
          </ul>
          <br />
          <p>
            <span>(I can teach you what all this means if you spend 1 time to go to H4!)</span>
          </p>
        </div>
        <div class="right_text">
          <p>
            When you receive <span>Probation</span>, mark <span>1</span> box in your
            <span>Anomaly track</span> without striking one out from other tracks.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fullpage_container {
  padding: 10px;

  h2 {
    color: white;
    font-size: 35px;
    font-weight: bold;
    font-family: sans-serif;
    margin-bottom: 10px;
  }

  .multi_info_container {
    display: flex;
    background-color: transparent;

    .alert_container {
      display: flex;
      flex-direction: column;
      color: gray;
      font-family: sans-serif;
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: normal;
      background-color: transparent;

      .intern_container_a {
        display: flex;
        padding: 15px;
        background-color: rgba($color: #ff0000, $alpha: 0.4);
        border-radius: 30px;
        align-items: center;
        margin: 8px;

        img {
          width: 40px;
          height: 40px;
          margin-right: 5px;
          background-color: transparent;
        }

        p {
          color: white;
          background-color: transparent;
          font-family: sans-serif;
          font-size: 14px;
          font-weight: normal;

          span {
            background-color: transparent;
            font-weight: bold;
          }
        }
      }
    }

    .mvp_container {
      display: flex;
      flex-direction: column;
      color: gray;
      font-family: sans-serif;
      font-size: 16px;
      font-weight: normal;
      margin: 8px;
      margin-top: 0;

      .border_container {
        display: flex;
        padding: 15px;
        border: 2px solid rgba($color: #ff0000, $alpha: 0.4);
        border-radius: 15px;
        margin: 8px;

        .intern_container_a {
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 40px;
            height: 40px;
          }

          .title_container {
            color: white;
            font-family: sans-serif;
            font-weight: normal;
            font-size: 16px;
            margin-left: 5px;
            width: 150px;
          }
        }

        .intern_container_b {
          width: 50px;
          height: 40px;
          margin-left: 8px;
          border-left: 2px solid rgba($color: #ff0000, $alpha: 0.4);
          margin-right: 8px;

          input {
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            -webkit-appearance: none;
            -moz-appearance: textfield;
            appearance: textfield;
            color: gray;
            font-size: 16px;
            font-family: sans-serif;
            font-weight: normal;
            padding: 8px;

            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            &:focus {
              outline: none;
              border: none;
            }
          }
        }
      }
    }

    .probation_container {
      display: flex;
      flex-direction: column;
      color: gray;
      font-family: sans-serif;
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 8px;

      .border_container {
        display: flex;
        padding: 15px;
        border: 2px solid gray;
        border-radius: 15px;
        margin: 8px;

        .intern_container_a {
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 40px;
            height: 40px;
          }

          .title_container {
            color: cadetblue;
            font-family: sans-serif;
            font-weight: normal;
            font-size: 16px;
            margin-left: 5px;
            width: 150px;
          }
        }

        .intern_container_b {
          width: 50px;
          height: 40px;
          margin-left: 8px;
          border-left: 2px solid gray;
          margin-right: 8px;

          input {
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            -webkit-appearance: none;
            -moz-appearance: textfield;
            appearance: textfield;
            color: gray;
            font-size: 16px;
            font-family: sans-serif;
            font-weight: normal;
            padding: 8px;

            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            &:focus {
              outline: none;
              border: none;
            }
          }
        }
      }
    }

    .gray {
      border-color: gray;
    }
  }

  h3 {
    font-family: sans-serif;
    color: white;
    font-size: 28px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-transform: capitalize;
  }

  .chart_container {
    margin-bottom: 20px;

    .linha_superior {
      display: flex;

      img {
        height: 50px;
        width: 50px;
      }
      .entrada_container {
        margin-right: 5px;
      }

      .input_container {
        display: flex;
        align-items: center;

        input {
          height: 50px;
          width: 50px;
          border: none;
          outline: none;
          background-color: rgba($color: #ff0000, $alpha: 0.4);
          border-radius: 8px;
          appearance: none;
          cursor: pointer;

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
        .tagged {
          position: relative;

          &::before {
            content: '';
            position: absolute;
            color: rgba($color: #ff0000, $alpha: 0.7);
            font-size: 30px;
            font-weight: bolder;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          &-A3::before {
            content: 'A3';
          }
          &-D4::before {
            content: 'D4';
          }
          &-G3::before {
            content: 'G3';
          }
          &-J3::before {
            content: 'J3';
          }
          &-N3::before {
            content: 'N3';
          }
          &-Q3::before {
            content: 'Q3';
          }
          &-T3::before {
            content: 'T3';
          }
          &-W8::before {
            content: 'W8';
          }
          &-Y2::before {
            content: 'Y2';
          }
        }
        span {
          font-size: 30px;
          font-weight: bolder;
          font-family: sans-serif;
          color: rgba($color: #ff0000, $alpha: 0.7);
        }

        .special {
          position: relative;

          &::before {
            content: ' ';
            position: absolute;
            background-color: black;
            top: 0;
            right: 0;
            height: 17px;
            width: 15px;
          }
        }
      }
      .title_container {
        color: gray;
        font-size: 12px;
        font-family: sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        display: flex;
        align-items: center;

        h5 {
          margin-left: 5px;
          margin-right: 5px;
        }

        img {
          height: 5px;
          width: 5px;
          margin-top: 1px;
        }
      }
    }

    .linha_inferior {
      display: flex;
      margin-top: 5px;

      img {
        height: 50px;
        width: 50px;
      }

      .saida_container {
        margin-right: 5px;
      }

      .input_container {
        display: flex;
        align-items: center;
        input {
          height: 50px;
          width: 50px;
          border: none;
          outline: none;
          background-color: rgba($color: #ff0000, $alpha: 0.4);
          border-radius: 8px;
          appearance: none;
          cursor: pointer;

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

        .tagged {
          position: relative;

          &::before {
            content: '';
            position: absolute;
            color: rgba($color: #ff0000, $alpha: 0.7);
            font-size: 30px;
            font-weight: bolder;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          &-A3::before {
            content: 'A3';
          }
          &-D4::before {
            content: 'D4';
          }
          &-G3::before {
            content: 'G3';
          }
          &-J3::before {
            content: 'J3';
          }
          &-N3::before {
            content: 'N3';
          }
          &-Q3::before {
            content: 'Q3';
          }
          &-T3::before {
            content: 'T3';
          }
          &-W8::before {
            content: 'W8';
          }
          &-Y2::before {
            content: 'Y2';
          }
        }

        span {
          font-size: 30px;
          font-weight: bolder;
          font-family: sans-serif;
          color: rgba($color: #ff0000, $alpha: 0.7);
        }

        .special {
          position: relative;

          &::before {
            content: ' ';
            position: absolute;
            background-color: black;
            bottom: 0;
            right: 0;
            height: 13px;
            width: 15px;
          }
        }
      }

      .title_container {
        color: gray;
        font-size: 12px;
        font-family: sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        display: flex;
        align-items: center;

        h5 {
          margin-left: 5px;
          margin-right: 5px;
        }

        img {
          height: 5px;
          width: 5px;
          margin-top: 1px;
          transform: scaleX(-1);
        }
      }
    }
  }

  .text_container {
    display: flex;
    height: 60px;
    margin-bottom: 20px;

    .left_text {
      width: 50%;
      height: 100%;
      border-left: 3px solid rgba($color: #ff0000, $alpha: 0.4);
      margin-right: 10px;

      p {
        margin-left: 10px;
        color: gray;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: sans-serif;
        font-weight: normal;

        span {
          color: rgba($color: #ff0000, $alpha: 0.7);
        }
      }
    }

    .right_text {
      width: 50%;
      height: 100%;
      border-left: 3px solid rgba($color: #ff0000, $alpha: 0.4);

      p {
        margin-left: 10px;
        color: gray;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: sans-serif;
        font-weight: normal;

        span {
          color: rgba($color: #ff0000, $alpha: 0.7);
        }
      }
    }
  }

  .reality_container,
  .anomaly_container {
    .chart_container {
      img {
        margin-right: 5px;
      }

      .linha_superior,
      .linha_inferior {
        display: flex;
        align-items: center;
      }

      input {
        height: 50px;
        width: 50px;
        border: none;
        outline: none;
        background-color: rgba($color: #ff0000, $alpha: 0.4);
        border-radius: 8px;
        appearance: none;
        cursor: pointer;

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

      .tagged {
        position: relative;

        &::before {
          content: '';
          position: absolute;
          color: rgba($color: #ff0000, $alpha: 0.7);
          font-size: 30px;
          font-weight: bolder;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        &-C4::before {
          content: 'C4';
        }
        &-L11::before {
          content: 'L11';
        }
        &-E2::before {
          content: 'E2';
        }
        &-O4::before {
          content: 'O4';
        }
        &-T6::before {
          content: 'T6';
        }
        &-V2::before {
          content: 'V2';
        }
        &-X3::before {
          content: 'X3';
        }
        &-H5::before {
          content: 'H5';
        }
        &-E3::before {
          content: 'E3';
        }
        &-H4::before {
          content: 'H4';
        }
        &-H3::before {
          content: 'H3';
        }
        &-U2::before {
          content: 'U2';
        }
        &-X2::before {
          content: 'X2';
        }
        &-N1::before {
          content: 'N1';
        }
        &-Q2::before {
          content: 'Q2';
        }
        &-L10::before {
          content: 'L10';
        }
        &-G8::before {
          content: 'G8';
        }
        &-A7::before {
          content: 'A7';
        }
      }

      span {
        font-size: 30px;
        font-weight: bolder;
        font-family: sans-serif;
        color: rgba($color: #ff0000, $alpha: 0.7);
      }

      .special {
        position: relative;
        &-LS {
          &::before {
            content: ' ';
            position: absolute;
            background-color: black;
            top: 0;
            right: 0;
            height: 17px;
            width: 15px;
          }
        }

        &-LI {
          &::before {
            content: ' ';
            position: absolute;
            background-color: black;
            bottom: 0;
            right: 0;
            height: 13px;
            width: 15px;
          }
        }
      }
    }

    .yellow {
      input {
        background-color: rgba($color: #ffff00, $alpha: 0.4);
      }

      .tagged {
        &::before {
          color: rgba($color: #ffff00, $alpha: 0.7);
        }
      }

      span {
        color: rgba($color: #ffff00, $alpha: 0.7);
      }
    }

    .blue {
      input {
        background-color: rgba($color: #0000ff, $alpha: 0.4);
      }

      .tagged {
        &::before {
          color: rgba($color: #0000ff, $alpha: 0.7);
        }
      }

      span {
        color: rgba($color: #0000ff, $alpha: 0.7);
      }
    }
  }

  .text_container_yellow {
    display: flex;
    height: 60px;
    margin-bottom: 20px;

    .left_text {
      width: 50%;
      height: 100%;
      border-left: 3px solid rgba($color: #ffff00, $alpha: 0.4);
      margin-right: 10px;

      p {
        margin-left: 10px;
        color: gray;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: sans-serif;
        font-weight: normal;

        span {
          color: rgba($color: #ffff00, $alpha: 0.7);
        }
      }
    }

    .right_text {
      width: 50%;
      height: 100%;
      border-left: 3px solid rgba($color: #ffff00, $alpha: 0.4);

      p {
        margin-left: 10px;
        color: gray;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: sans-serif;
        font-weight: normal;

        span {
          color: rgba($color: #ffff00, $alpha: 0.7);
        }
      }
    }
  }

  .text_container_blue {
    display: flex;
    margin-bottom: 20px;

    .left_text {
      width: 50%;
      height: 100%;
      border-left: 3px solid rgba($color: #0000ff, $alpha: 0.4);
      margin-right: 10px;

      p {
        margin-left: 10px;
        color: gray;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: sans-serif;
        font-weight: normal;

        span {
          color: rgba($color: #0000ff, $alpha: 0.7);
        }
      }

      ul {
        list-style: circle;
        color: blue;
        padding-left: 25px;
      }
    }

    .right_text {
      width: 50%;
      height: 144px;
      border-left: 3px solid rgba($color: #0000ff, $alpha: 0.4);

      p {
        margin-left: 10px;
        color: gray;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: sans-serif;
        font-weight: normal;

        span {
          color: rgba($color: #0000ff, $alpha: 0.7);
        }
      }
    }
  }
}
</style>
