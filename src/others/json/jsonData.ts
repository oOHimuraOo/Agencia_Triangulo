import jsonData from './dados.json'

export interface Habilidade {
  Nome: string
  Texto: string
  Qualidade: string
  Sucesso: string
  Triforce: string
  Falha: string
  Pergunta: string
  'Resposta A': string
  'numeracao A': string
  'Resposta B': string
  'numeracao B': string
}

export interface anomalyData {
  [key: string]: {
    'Habilidade 1': Habilidade
    'Habilidade 2': Habilidade
    'Habilidade 3': Habilidade
  }
}

export interface possibilidadeAlternativa {
  a: string
  b: string
}

export interface primeDirective {
  name: string
  text: possibilidadeAlternativa
}

export interface sactionedBehavior {
  effect1: string
  effect2: string
  effect3: string
}

export interface innitialRequisition {
  name: string
  text: string
}

export interface respostaA {
  text: string
  quality: string
}

export interface respostaB {
  text: string
  quality: string
}

export interface respostaMult {
  a: respostaA
  b: respostaB
}

export interface selfAssessment {
  text: string
  question1: string
  respostas1: respostaMult
  question2: string
  resposta2: respostaMult
  question3: string
  resposta3: respostaMult
}

export interface competencyData {
  [key: string]: {
    Pg: string
    PrimeDirective: primeDirective
    SactionedBehaviors: sactionedBehavior
    InitialRequisition: innitialRequisition
    SelfAssessment: selfAssessment
  }
}

export interface realityTrigger {
  name: string
  text: string
  triggerName: string
}

export interface bornoutRelease {
  name: string
  text: string
}

export interface onboardingQuestions {
  a: string
  b: string
  c: string
}

export interface relatioshipMatrix {
  text: string
}

export interface realityData {
  [key: string]: {
    RealityTrigger: realityTrigger
    BournoutRelease: bornoutRelease
    OnboardingQuestions: onboardingQuestions
    RelationshipMatrix: relatioshipMatrix
    Page: string
  }
}

export interface agentData {
  [key: string]: {
    '1': string
    '2': string
    '3': string
    '4': string
    '5': string
    '6': string
    '7': string
    '8': string
  }
}

export interface agencyData {
  [key: string]: {
    '0': string
    '1': string
    '2': string
    '3': string
    '5': string
    '6': string
    '7': string
    '8': string
    '9': string
    '10+': string
  }
}

export default jsonData
