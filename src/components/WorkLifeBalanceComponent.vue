<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import alerta from '../assets/alert-triangle-svgrepo-com.svg'
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
const mvpValueUsado = ref(0)
const probationValue = ref(0)
const probationValueUsado = ref(0)
const competancyLevel = ref(0)
const competencyMax = ref(30)
const realityLevel = ref(0)
const realityMax = ref(30)
const anomalyLevel = ref(0)
const anomalyMax = ref(30)

const atualizarCompetencyMax = (valor: number) => {
  if (valor > 30) {
    competencyMax.value = 30
  } else if (valor < 0) {
    competencyMax.value = 0
  } else {
    competencyMax.value = valor
  }
}

const atualizarRealityMax = (valor: number) => {
  if (valor > 30) {
    realityMax.value = 30
  } else if (valor < 0) {
    realityMax.value = 0
  } else {
    realityMax.value = valor
  }
}

const atualizarAnomalyMax = (valor: number) => {
  if (valor > 30) {
    anomalyMax.value = 30
  } else if (valor < 0) {
    anomalyMax.value = 0
  } else {
    anomalyMax.value = valor
  }
}

const atualizarMvpValueUsado = (valor: number) => {
  mvpValueUsado.value = valor
}

const atualizarProbationValueUsado = (valor: number) => {
  probationValueUsado.value = valor
}

const modificarTrackLevel = (track: string, checked: boolean) => {
  if (checked) {
    if (track === 'comp') {
      if (competancyLevel.value >= competencyMax.value) {
        return
      }

      if (mvpValue.value > mvpValueUsado.value) {
        atualizarMvpValueUsado(mvpValueUsado.value + 1)
        atualizarCompetancyLevel(competancyLevel.value + 1, checked)
      } else {
        atualizarCompetancyLevel(competancyLevel.value + 1, checked)
        atualizarRealityMax(realityMax.value - 1)
        atualizarAnomalyMax(anomalyMax.value - 1)
      }
    } else if (track === 'real') {
      if (realityLevel.value >= realityMax.value) {
        return
      }

      atualizarRealityLevel(realityLevel.value + 1, checked)
      atualizarCompetencyMax(competencyMax.value - 1)
      atualizarAnomalyMax(anomalyMax.value - 1)
    } else {
      if (anomalyLevel.value >= anomalyMax.value) {
        return
      }

      if (probationValue.value > probationValueUsado.value) {
        atualizarProbationValueUsado(probationValueUsado.value + 1)
        atualizarAnomalyLevel(anomalyLevel.value + 1, checked)
      } else {
        atualizarAnomalyLevel(anomalyLevel.value + 1, checked)
        atualizarCompetencyMax(competencyMax.value - 1)
        atualizarRealityMax(realityMax.value - 1)
      }
    }
  } else {
    if (track === 'comp') {
      if (competancyLevel.value <= 0) {
        return
      }

      if (mvpValue.value > 0 && mvpValueUsado.value > 0) {
        atualizarMvpValueUsado(mvpValueUsado.value - 1)
        atualizarCompetancyLevel(competancyLevel.value, checked)
      } else {
        atualizarCompetancyLevel(competancyLevel.value, checked)
        atualizarRealityMax(realityMax.value + 1)
        atualizarAnomalyMax(anomalyMax.value + 1)
      }
    } else if (track === 'real') {
      if (realityLevel.value <= 0) {
        return
      }

      atualizarRealityLevel(realityLevel.value, checked)
      atualizarCompetencyMax(competencyMax.value + 1)
      atualizarAnomalyMax(anomalyMax.value + 1)
    } else {
      if (anomalyLevel.value <= 0) {
        return
      }

      if (probationValue.value > 0 && probationValueUsado.value > 0) {
        atualizarProbationValueUsado(probationValueUsado.value - 1)
        atualizarAnomalyLevel(anomalyLevel.value, checked)
      } else {
        atualizarAnomalyLevel(anomalyLevel.value, checked)
        atualizarCompetencyMax(competencyMax.value + 1)
        atualizarRealityMax(realityMax.value + 1)
      }
    }
  }
}

const descobrirClasseDeMarcacao = (track: string, valor: number) => {
  if (track === 'comp') {
    if (valor >= competencyMax.value) {
      return 'proibido'
    }
    return 'correto'
  } else if (track === 'real') {
    if (valor >= realityMax.value) {
      return 'proibido'
    }
    return 'correto'
  } else {
    if (valor >= realityMax.value) {
      return 'proibido'
    }
    return 'correto'
  }
}

const alertaDeMudancaDeFuncionalidade = () => {
  alert(
    'Mudei a forma como as linhas de track funcionam. Caso você queira aumentar o seu track em 1 basta clicar no simbolo de seta no track desejado. Ele fará automaticamente todos os ajustes e verificações adequadas. Caso você queira diminuir basta clicar no simbolo de bola, ele fará todas os ajustes adequados.',
  )
}

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
    if (save['mvpUsado'] !== undefined) {
      atualizarMvpValueUsado(save['mvpUsado'])
    }
    if (save['probation'] !== undefined) {
      atualizarProbationValue(save['probation'])
    }
    if (save['probationUsado'] !== undefined) {
      atualizarProbationValueUsado(save['probationUsado'])
    }
    if (save['competency'] !== undefined) {
      atualizarCompetancyLevel(save['competency'], true)
    }
    if (save['competencyMax'] !== undefined) {
      atualizarCompetencyMax(save['competencyMax'])
    }
    if (save['reality'] !== undefined) {
      atualizarRealityLevel(save['reality'], true)
    }
    if (save['realityMax'] !== undefined) {
      atualizarRealityMax(save['realityMax'])
    }
    if (save['anomaly'] !== undefined) {
      atualizarAnomalyLevel(save['anomaly'], true)
    }
    if (save['anomalyMax'] !== undefined) {
      atualizarAnomalyMax(save['anomalyMax'])
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
    mvpUsado: mvpValueUsado.value ?? mvpValue,
    probation: probationValue.value ?? probationValue,
    probationUsado: probationValueUsado.value ?? probationValue,
    reality: realityLevel.value ?? realityLevel,
    realityMax: realityMax.value ?? realityMax,
    anomaly: anomalyLevel.value ?? anomalyLevel,
    anomalyMax: anomalyMax.value ?? anomalyMax,
    competency: competancyLevel.value ?? competancyLevel,
    competencyMax: competencyMax.value ?? competencyMax,
  }
  localStorage.setItem(chave, JSON.stringify(dict))
}

onMounted(() => {
  loadInfos()
})

watch(
  [
    mvpValue,
    mvpValueUsado,
    probationValue,
    probationValueUsado,
    realityLevel,
    realityMax,
    anomalyLevel,
    anomalyMax,
    competancyLevel,
    competencyMax,
  ],
  () => {
    salvarInfos()
  },
)

const alertaIMG = computed(() => {
  return alerta
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
              <a @click="modificarTrackLevel('comp', true)">
                <img :src="playColorido('Vermelho', false)" />
              </a>
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
                :checked="competancyLevel > 0 || competencyMax < 1"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 1)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 1 || competencyMax < 2"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 2)"
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
                :checked="competancyLevel > 2 || competencyMax < 3"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 3)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 3 || competencyMax < 4"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 4)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 4 || competencyMax < 5"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 5)"
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
                :checked="competancyLevel > 5 || competencyMax < 6"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 6)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 6 || competencyMax < 7"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 7)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 7 || competencyMax < 8"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 8)"
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
                :checked="competancyLevel > 8 || competencyMax < 9"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 9)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 9 || competencyMax < 10"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 10)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 10 || competencyMax < 11"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 11)"
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
                :checked="competancyLevel > 11 || competencyMax < 12"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 12)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 12 || competencyMax < 13"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 13)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 13 || competencyMax < 14"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 14)"
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
                :checked="competancyLevel > 14 || competencyMax < 15"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 15)"
              />
              <span class="special">-|</span>
            </div>
          </div>
        </div>
        <div class="linha_inferior">
          <div class="saida_container">
            <div class="input_container">
              <a @click="modificarTrackLevel('comp', false)">
                <img :src="playColorido('Vemelho', true)" />
              </a>
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
                :checked="competancyLevel > 29 || competencyMax < 30"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 30)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 28 || competencyMax < 29"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 29)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 27 || competencyMax < 28"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 28)"
              />
              <span>-</span>
              <input
                type="checkbox"
                class="tagged tagged-Y2"
                :checked="competancyLevel > 26 || competencyMax < 27"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 27)"
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
                :checked="competancyLevel > 25 || competencyMax < 26"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 26)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 24 || competencyMax < 25"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 25)"
              />
              <span>-</span>
              <input
                type="checkbox"
                class="tagged tagged-W8"
                :checked="competancyLevel > 23 || competencyMax < 24"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 24)"
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
                :checked="competancyLevel > 22 || competencyMax < 23"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 23)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 21 || competencyMax < 22"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 22)"
              />
              <span>-</span>
              <input
                type="checkbox"
                class="tagged tagged-T3"
                :checked="competancyLevel > 20 || competencyMax < 21"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 21)"
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
                :checked="competancyLevel > 19 || competencyMax < 20"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 20)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 18 || competencyMax < 19"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 19)"
              />
              <span>-</span>
              <input
                type="checkbox"
                class="tagged tagged-Q3"
                :checked="competancyLevel > 17 || competencyMax < 18"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 18)"
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
                :checked="competancyLevel > 16 || competencyMax < 17"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 17)"
              />
              <span>-</span>
              <input
                type="checkbox"
                name=""
                id=""
                :checked="competancyLevel > 15 || competencyMax < 16"
                @click.prevent="alertaDeMudancaDeFuncionalidade"
                :class="descobrirClasseDeMarcacao('comp', 16)"
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
          <a @click="modificarTrackLevel('real', true)">
            <img :src="playColorido('Amarelo', false)" />
          </a>
          <input
            type="checkbox"
            class="tagged tagged-C4"
            :checked="realityLevel > 0 || realityMax < 1"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 1)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 1 || realityMax < 2"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 2)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 2 || realityMax < 3"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 3)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-L11"
            :checked="realityLevel > 3 || realityMax < 4"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 4)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 4 || realityMax < 5"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 5)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 5 || realityMax < 6"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 6)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 6 || realityMax < 7"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 7)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-E2"
            :checked="realityLevel > 7 || realityMax < 8"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 8)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 8 || realityMax < 9"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 9)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-O4"
            :checked="realityLevel > 9 || realityMax < 10"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 10)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 10 || realityMax < 11"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 11)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 11 || realityMax < 12"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 12)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 12 || realityMax < 13"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 13)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-T6"
            :checked="realityLevel > 13 || realityMax < 14"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 14)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 14 || realityMax < 15"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 15)"
          />
          <span class="special special-LS">-|</span>
        </div>
        <div class="linha_inferior">
          <a @click="modificarTrackLevel('real', false)">
            <img :src="playColorido('Amarelo', true)" />
          </a>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 29 || realityMax < 30"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 30)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 28 || realityMax < 29"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 29)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 27 || realityMax < 28"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 28)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 26 || realityMax < 27"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 27)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-E3"
            :checked="realityLevel > 25 || realityMax < 26"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 26)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 24 || realityMax < 25"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 25)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 23 || realityMax < 24"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 24)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 22 || realityMax < 23"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 23)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-H5"
            :checked="realityLevel > 21 || realityMax < 22"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 22)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 20 || realityMax < 21"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 21)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-X3"
            :checked="realityLevel > 19 || realityMax < 20"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 20)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 18 || realityMax < 19"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 19)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 17 || realityMax < 18"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 18)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="realityLevel > 16 || realityMax < 17"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 17)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-V2"
            :checked="realityLevel > 15 || realityMax < 16"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('real', 16)"
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
          <a @click="modificarTrackLevel('anom', true)">
            <img :src="playColorido('Azul', false)" />
          </a>
          <input
            type="checkbox"
            class="tagged tagged-H4"
            :checked="anomalyLevel > 0 || anomalyMax < 1"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 1)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-H3"
            :checked="anomalyLevel > 1 || anomalyMax < 2"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 2)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 2 || anomalyMax < 3"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 3)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 3 || anomalyMax < 4"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 4)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-U2"
            :checked="anomalyLevel > 4 || anomalyMax < 5"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 5)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 5 || anomalyMax < 6"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 6)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-X2"
            :checked="anomalyLevel > 6 || anomalyMax < 7"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 7)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 7 || anomalyMax < 8"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 8)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 8 || anomalyMax < 9"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 9)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 9 || anomalyMax < 10"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 10)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-N1"
            :checked="anomalyLevel > 10 || anomalyMax < 11"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 11)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 11 || anomalyMax < 12"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 12)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-Q2"
            :checked="anomalyLevel > 12 || anomalyMax < 13"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 13)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 13 || anomalyMax < 14"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 14)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 14 || anomalyMax < 15"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 15)"
          />
          <span class="special special-LS">-|</span>
        </div>
        <div class="linha_inferior">
          <a @click="modificarTrackLevel('anom', false)">
            <img :src="playColorido('Azul', true)" />
          </a>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 29 || anomalyMax < 30"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 30)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 28 || anomalyMax < 29"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 29)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 27 || anomalyMax < 28"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 28)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 26 || anomalyMax < 27"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 27)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 25 || anomalyMax < 26"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 26)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 24 || anomalyMax < 25"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 25)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 23 || anomalyMax < 24"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 24)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-A7"
            :checked="anomalyLevel > 22 || anomalyMax < 23"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 23)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 21 || anomalyMax < 22"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 22)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 20 || anomalyMax < 21"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 21)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 19 || anomalyMax < 20"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 20)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-G8"
            :checked="anomalyLevel > 18 || anomalyMax < 19"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 19)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 17 || anomalyMax < 18"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 18)"
          />
          <span>-</span>
          <input
            type="checkbox"
            class="tagged tagged-L10"
            :checked="anomalyLevel > 16 || anomalyMax < 17"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 17)"
          />
          <span>-</span>
          <input
            type="checkbox"
            name=""
            id=""
            :checked="anomalyLevel > 15 || anomalyMax < 16"
            @click.prevent="alertaDeMudancaDeFuncionalidade"
            :class="descobrirClasseDeMarcacao('anom', 16)"
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
        cursor: pointer;
      }
      .entrada_container {
        margin-right: 5px;
      }

      .input_container {
        display: flex;
        align-items: center;

        .correto {
          height: 50px;
          width: 50px;
          border: none;
          outline: none;
          background-color: rgba($color: #ff0000, $alpha: 0.4);
          border-radius: 8px;
          appearance: none;

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

        .proibido {
          height: 50px;
          width: 50px;
          border: none;
          outline: none;
          background-color: rgba($color: #ff0000, $alpha: 0.4);
          border-radius: 8px;
          appearance: none;

          &:checked {
            background-color: rgba($color: #808080, $alpha: 0.4);
            position: relative;

            &::after {
              content: 'X';
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
        cursor: pointer;
      }

      .saida_container {
        margin-right: 5px;
      }

      .input_container {
        display: flex;
        align-items: center;

        .correto {
          height: 50px;
          width: 50px;
          border: none;
          outline: none;
          background-color: rgba($color: #ff0000, $alpha: 0.4);
          border-radius: 8px;
          appearance: none;

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

        .proibido {
          height: 50px;
          width: 50px;
          border: none;
          outline: none;
          background-color: rgba($color: #ff0000, $alpha: 0.4);
          border-radius: 8px;
          appearance: none;

          &:checked {
            background-color: rgba($color: #808080, $alpha: 0.4);
            position: relative;

            &::after {
              content: 'X';
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

      .correto {
        height: 50px;
        width: 50px;
        border: none;
        outline: none;
        background-color: rgba($color: #ff0000, $alpha: 0.4);
        border-radius: 8px;
        appearance: none;

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

      .proibido {
        height: 50px;
        width: 50px;
        border: none;
        outline: none;
        background-color: rgba($color: #ff0000, $alpha: 0.4);
        border-radius: 8px;
        appearance: none;

        &:checked {
          background-color: rgba($color: #808080, $alpha: 0.4);
          position: relative;

          &::after {
            content: 'X';
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
      .correto {
        background-color: rgba($color: #ffff00, $alpha: 0.4);
      }

      .proibido {
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
      .correto {
        background-color: rgba($color: #0000ff, $alpha: 0.4);
      }

      .proibido {
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
