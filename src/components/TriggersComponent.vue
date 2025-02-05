<script setup lang="ts">
import MultilineAutofill from './autofill/MultilineAutofill.vue'
import dados, { type competencyData, type realityData } from '../others/json/jsonData'
import { computed } from 'vue'

interface Props {
  competency: string
  reality: string
}

const props = defineProps<Props>()

const realNome1 = computed(() => {
  const real: string = props.reality
  const data: realityData = dados.reality
  return data[real]?.['RealityTrigger'].name || 'Nome não encontrado'
})

const realNome2 = computed(() => {
  const real: string = props.reality
  const data: realityData = dados.reality
  return data[real]?.['BournoutRelease'].name || 'Nome não encontrado'
})

const realText1 = computed(() => {
  const real: string = props.reality
  const data: realityData = dados.reality
  return data[real]?.['RealityTrigger'].text || 'Texto não encontrado'
})

const realText2 = computed(() => {
  const real: string = props.reality
  const data: realityData = dados.reality
  return data[real]?.['BournoutRelease'].text || 'Texto não encontrado'
})

const compNome1 = computed(() => {
  const comp: string = props.competency
  const data: competencyData = dados.competency
  return data[comp]?.['PrimeDirective'].name || 'Nome não encontrado'
})

const compText0A = computed(() => {
  const comp: string = props.competency
  const data: competencyData = dados.competency
  return data[comp]?.['PrimeDirective'].text.a || 'Texto não encontrado'
})

const compText0B = computed(() => {
  const comp: string = props.competency
  const data: competencyData = dados.competency
  return data[comp]?.['PrimeDirective'].text.b || 'Texto não encontrado'
})

const compText1 = computed(() => {
  const comp: string = props.competency
  const data: competencyData = dados.competency
  return data[comp]?.['SactionedBehaviors'].effect1 || 'Texto não encontrado'
})

const compText2 = computed(() => {
  const comp: string = props.competency
  const data: competencyData = dados.competency
  return data[comp]?.['SactionedBehaviors'].effect2 || 'Texto não encontrado'
})

const compText3 = computed(() => {
  const comp: string = props.competency
  const data: competencyData = dados.competency
  return data[comp]?.['SactionedBehaviors'].effect3 || 'Texto não encontrado'
})
</script>

<template>
  <div class="autofil_container">
    <ul>
      <li>
        <MultilineAutofill
          :nome="realNome1"
          :placeholder="1"
          :tipo="'Real'"
          :texto="realText1"
          :extra="false"
        />
      </li>
      <li>
        <MultilineAutofill
          :nome="realNome2"
          :placeholder="2"
          :tipo="'Real'"
          :texto="realText2"
          :extra="false"
        />
      </li>
      <li>
        <MultilineAutofill
          :nome="compNome1"
          :placeholder="3"
          :tipo="'Comp'"
          :special-a="compText0A"
          :special-b="compText0B"
          :extra="false"
        />
      </li>
      <li>
        <MultilineAutofill
          :nome="'Sanctioned Behavior'"
          :placeholder="4"
          :tipo="'Comp'"
          :texto="compText1"
          :extra="true"
          :texto2="compText2"
          :texto3="compText3"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
