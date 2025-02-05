<script setup lang="ts">
import CadastroComponent from '../components/CadastroComponent.vue'
import PointsComponents from '@/components/PointsComponents.vue'
import QualityAssuranceComponent from '@/components/QualityAssuranceComponent.vue'
import TriggersComponent from '@/components/TriggersComponent.vue'
import WorkLifeBalanceComponent from '@/components/WorkLifeBalanceComponent.vue'
import AbilityChartComponent from '@/components/AbilityChartComponent.vue'
import RequisitionsChart from '@/components/RequisitionsComponent.vue'
import RelationshipComponent from '@/components/RelationshipComponent.vue'
import CustomTracksComponent from '@/components/CustomTracksComponent.vue'
import WelcomeComponent from '@/components/WelcomeComponent.vue'
import ExportImportFloater from '@/components/floater/ExportImportFloater.vue'
import { onMounted, ref } from 'vue'

const selectedAnomaly = ref('')
const selectedCompetency = ref('')
const selectedReality = ref('')
const selectedName = ref('')
const selectedPronoun = ref('')

const howToUse = () => {
  if (localStorage.getItem('firstView')) {
    return
  } else {
    alert(
      'Seja bem vindo ao site de gerenciamento pessoal de ficha da agencia triangulo. \n O site possui um sistema de save automatico no local storage do navegador. \n Para ter certeza que a informação foi salva sempre mude o alvo da caixa de texto. \n\n ATENÇÃO A VERSÃO MOBILE AINDA NÃO FOI IMPLEMENTADA!',
    )
    localStorage.setItem('firstView', 'false')
  }
}

onMounted(() => {
  howToUse()
})

const updateAnomaly = (value: string) => {
  selectedAnomaly.value = value
}

const updateCompetency = (value: string) => {
  selectedCompetency.value = value
}

const updateReality = (value: string) => {
  selectedReality.value = value
}

const updateName = (newName: string) => {
  selectedName.value = newName
}

const updatePronoun = (newPronoun: string) => {
  selectedPronoun.value = newPronoun
}
</script>

<template>
  <div class="container">
    <div class="basic_info">
      <CadastroComponent
        @anomaly-selected="updateAnomaly"
        @competency-selected="updateCompetency"
        @reality-selected="updateReality"
        @new-name="updateName"
        @new-pronoun="updatePronoun"
      />
    </div>
    <div class="halfpage">
      <div class="left_bar">
        <points-components />
        <TriggersComponent :competency="selectedCompetency" :reality="selectedReality" />
      </div>
      <div class="right_bar">
        <QualityAssuranceComponent />
      </div>
    </div>
    <div class="worklife">
      <WorkLifeBalanceComponent :chave="'work1'" />
    </div>
    <div class="anomaly_abilities">
      <AbilityChartComponent :selected="selectedAnomaly" />
    </div>
    <div class="requistion_and_work_life_benefits">
      <RequisitionsChart :selected="selectedCompetency" />
    </div>
    <div class="relationship">
      <RelationshipComponent :selected="selectedReality" />
    </div>
    <div class="custom_tracks">
      <CustomTracksComponent />
    </div>
    <div class="welcome">
      <WelcomeComponent :nome-personagem="selectedName" :pronome-personagem="selectedPronoun" />
    </div>
    <ExportImportFloater />
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1024px;
  margin: 20px auto;

  .halfpage {
    display: flex;

    .left_bar {
      width: 100%;
    }
  }

  .anomaly_abilities {
    ul {
      li {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
