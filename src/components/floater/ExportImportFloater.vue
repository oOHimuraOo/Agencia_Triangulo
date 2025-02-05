<script setup lang="ts">
import importar from '../../assets/import-svgrepo-com.svg'
import exportar from '../../assets/export-3-svgrepo-com.svg'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const recarregarPagina = () => {
  router.go(0)
}

const importIMG = computed(() => {
  return importar
})

const exportIMG = computed(() => {
  return exportar
})

const gerarExport = () => {
  const dict = {
    anomalyRightColomun1: localStorage.getItem('anomalyRightColomun1') || '',
    anomalyRightColomun2: localStorage.getItem('anomalyRightColomun2') || '',
    anomalyRightColomun3: localStorage.getItem('anomalyRightColomun3') || '',
    'Character Name': localStorage.getItem('Character Name') || '',
    Pronouns: localStorage.getItem('Pronouns') || '',
    'Agency Title': localStorage.getItem('Agency Title') || '',
    'Agency Standing': localStorage.getItem('Agency Standing') || '',
    anomalia1: localStorage.getItem('anomalia1') || '',
    realidade1: localStorage.getItem('realidade1') || '',
    competencia1: localStorage.getItem('competencia1') || '',
    single1: localStorage.getItem('single1') || '',
    single2: localStorage.getItem('single2') || '',
    single3: localStorage.getItem('single3') || '',
    double1: localStorage.getItem('double1') || '',
    double2: localStorage.getItem('double2') || '',
    exotic1: localStorage.getItem('exotic1') || '',
    exotic2: localStorage.getItem('exotic2') || '',
    exotic3: localStorage.getItem('exotic3') || '',
    exotic4: localStorage.getItem('exotic4') || '',
    Commendations: localStorage.getItem('Commendations') || '',
    Demerits: localStorage.getItem('Demerits') || '',
    'Additional Burnout': localStorage.getItem('Additional Burnout') || '',
    Attentiveness: localStorage.getItem('Attentiveness') || '',
    Duplicity: localStorage.getItem('Duplicity') || '',
    Dynamism: localStorage.getItem('Dynamism') || '',
    Empathy: localStorage.getItem('Empathy') || '',
    Persistence: localStorage.getItem('Persistence') || '',
    Presence: localStorage.getItem('Presence') || '',
    Professionalism: localStorage.getItem('Professionalism') || '',
    Subtlety: localStorage.getItem('Subtlety') || '',
    '1': localStorage.getItem('1') || '',
    '2': localStorage.getItem('2') || '',
    '3': localStorage.getItem('3') || '',
    '4': localStorage.getItem('4') || '',
    '5': localStorage.getItem('5') || '',
    '6': localStorage.getItem('6') || '',
    '7': localStorage.getItem('7') || '',
    '8': localStorage.getItem('8') || '',
    '9': localStorage.getItem('9') || '',
    '10': localStorage.getItem('10') || '',
    '11': localStorage.getItem('11') || '',
    '12': localStorage.getItem('12') || '',
    q1: localStorage.getItem('q1') || '',
    q2: localStorage.getItem('q2') || '',
    q3: localStorage.getItem('q3') || '',
    q4: localStorage.getItem('q4') || '',
    q5: localStorage.getItem('q5') || '',
    q6: localStorage.getItem('q6') || '',
    q7: localStorage.getItem('q7') || '',
    q8: localStorage.getItem('q8') || '',
    cracha1: localStorage.getItem('cracha1') || '',
    emergency1: localStorage.getItem('emergency1') || '',
    salary1: localStorage.getItem('salary1') || '',
    work1: localStorage.getItem('work1') || '',
  }
  const stringfied = JSON.stringify(dict)
  copiarParaClipboard(stringfied)
}

const copiarParaClipboard = async (texto: string) => {
  try {
    await navigator.clipboard.writeText(texto)
    alert(
      'As informações da sua ficha foram copiadas para o clipboard. Armazene a informação em um local seguro para estabelecer um backup. Quando quiser recuperar, basta colar essa informação ao clicar no botão Import',
    )
  } catch (error) {
    console.error('Erro ao copiar para o clipboard:', error)
  }
}

const coletar_info = () => {
  const info: string | null = prompt('Por favor cole aqui as informações de importação obtida:')
  implementarNovoSave(info)
}

const implementarNovoSave = (valor: string | null) => {
  if (!valor) {
    alert('nenhuma informação obtida')
  }

  const save = JSON.parse(valor)

  if (save['anomalyRightColomun1'] !== undefined) {
    localStorage.setItem('anomalyRightColomun1', save['anomalyRightColomun1'])
  }
  if (save['anomalyRightColomun2'] !== undefined) {
    localStorage.setItem('anomalyRightColomun2', save['anomalyRightColomun2'])
  }
  if (save['anomalyRightColomun3'] !== undefined) {
    localStorage.setItem('anomalyRightColomun3', save['anomalyRightColomun3'])
  }
  if (save['Character Name'] !== undefined) {
    localStorage.setItem('Character Name', save['Character Name'])
  }
  if (save['Pronouns'] !== undefined) {
    localStorage.setItem('Pronouns', save['Pronouns'])
  }
  if (save['Agency Title'] !== undefined) {
    localStorage.setItem('Agency Title', save['Agency Title'])
  }
  if (save['Agency Standing'] !== undefined) {
    localStorage.setItem('Agency Standing', save['Agency Standing'])
  }
  if (save['anomalia1'] !== undefined) {
    localStorage.setItem('anomalia1', save['anomalia1'])
  }
  if (save['realidade1'] !== undefined) {
    localStorage.setItem('realidade1', save['realidade1'])
  }
  if (save['competencia1'] !== undefined) {
    localStorage.setItem('competencia1', save['competencia1'])
  }
  if (save['single1'] !== undefined) {
    localStorage.setItem('single1', save['single1'])
  }
  if (save['single2'] !== undefined) {
    localStorage.setItem('single2', save['single2'])
  }
  if (save['single3'] !== undefined) {
    localStorage.setItem('single3', save['single3'])
  }
  if (save['double1'] !== undefined) {
    localStorage.setItem('double1', save['double1'])
  }
  if (save['double2'] !== undefined) {
    localStorage.setItem('double2', save['double2'])
  }
  if (save['exotic1'] !== undefined) {
    localStorage.setItem('exotic1', save['exotic1'])
  }
  if (save['exotic2'] !== undefined) {
    localStorage.setItem('exotic2', save['exotic2'])
  }
  if (save['exotic3'] !== undefined) {
    localStorage.setItem('exotic3', save['exotic3'])
  }
  if (save['exotic4'] !== undefined) {
    localStorage.setItem('exotic4', save['exotic4'])
  }
  if (save['Commendations'] !== undefined) {
    localStorage.setItem('Commendations', save['Commendations'])
  }
  if (save['Demerits'] !== undefined) {
    localStorage.setItem('Demerits', save['Demerits'])
  }
  if (save['Additional Burnout'] !== undefined) {
    localStorage.setItem('Additional Burnout', save['Additional Burnout'])
  }
  if (save['Attentiveness'] !== undefined) {
    localStorage.setItem('Attentiveness', save['Attentiveness'])
  }
  if (save['Duplicity'] !== undefined) {
    localStorage.setItem('Duplicity', save['Duplicity'])
  }
  if (save['Dynamism'] !== undefined) {
    localStorage.setItem('Dynamism', save['Dynamism'])
  }
  if (save['Empathy'] !== undefined) {
    localStorage.setItem('Empathy', save['Empathy'])
  }
  if (save['Persistence'] !== undefined) {
    localStorage.setItem('Persistence', save['Persistence'])
  }
  if (save['Presence'] !== undefined) {
    localStorage.setItem('Presence', save['Presence'])
  }
  if (save['Professionalism'] !== undefined) {
    localStorage.setItem('Professionalism', save['Professionalism'])
  }
  if (save['Subtlety'] !== undefined) {
    localStorage.setItem('Subtlety', save['Subtlety'])
  }
  if (save['1'] !== undefined) {
    localStorage.setItem('1', save['1'])
  }
  if (save['2'] !== undefined) {
    localStorage.setItem('2', save['2'])
  }
  if (save['3'] !== undefined) {
    localStorage.setItem('3', save['3'])
  }
  if (save['4'] !== undefined) {
    localStorage.setItem('4', save['4'])
  }
  if (save['5'] !== undefined) {
    localStorage.setItem('5', save['5'])
  }
  if (save['6'] !== undefined) {
    localStorage.setItem('6', save['6'])
  }
  if (save['7'] !== undefined) {
    localStorage.setItem('7', save['7'])
  }
  if (save['8'] !== undefined) {
    localStorage.setItem('8', save['8'])
  }
  if (save['9'] !== undefined) {
    localStorage.setItem('9', save['9'])
  }
  if (save['10'] !== undefined) {
    localStorage.setItem('10', save['10'])
  }
  if (save['11'] !== undefined) {
    localStorage.setItem('11', save['11'])
  }
  if (save['12'] !== undefined) {
    localStorage.setItem('12', save['12'])
  }
  if (save['q1'] !== undefined) {
    localStorage.setItem('q1', save['q1'])
  }
  if (save['q2'] !== undefined) {
    localStorage.setItem('q2', save['q2'])
  }
  if (save['q3'] !== undefined) {
    localStorage.setItem('q3', save['q3'])
  }
  if (save['q4'] !== undefined) {
    localStorage.setItem('q4', save['q4'])
  }
  if (save['q5'] !== undefined) {
    localStorage.setItem('q5', save['q5'])
  }
  if (save['q6'] !== undefined) {
    localStorage.setItem('q6', save['q6'])
  }
  if (save['q7'] !== undefined) {
    localStorage.setItem('q7', save['q7'])
  }
  if (save['q8'] !== undefined) {
    localStorage.setItem('q8', save['q8'])
  }
  if (save['cracha1'] !== undefined) {
    localStorage.setItem('cracha1', save['cracha1'])
  }
  if (save['emergency1'] !== undefined) {
    localStorage.setItem('emergency1', save['emergency1'])
  }
  if (save['salary1'] !== undefined) {
    localStorage.setItem('salary1', save['salary1'])
  }
  if (save['work1'] !== undefined) {
    localStorage.setItem('work1', save['work1'])
  }

  recarregarPagina()
}
</script>

<template>
  <div class="buttons_container">
    <div class="export_container">
      <a href="#" alt="Importar" @click.prevent="coletar_info()"
        ><img :src="importIMG" alt="Importar"
      /></a>
    </div>
    <div class="import_container">
      <a href="#" alt="Exportar" @click.prevent="gerarExport()"
        ><img :src="exportIMG" alt="Exportar"
      /></a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.buttons_container {
  display: flex;
  position: fixed;
  bottom: 30px;
  left: 50px;

  .export_container {
    margin-right: 15px;

    a {
      text-decoration: none;

      img {
        height: 50px;
        width: 50px;
      }
    }
  }

  .import_container {
    a {
      text-decoration: none;

      img {
        height: 50px;
        width: 50px;
      }
    }
  }
}
</style>
