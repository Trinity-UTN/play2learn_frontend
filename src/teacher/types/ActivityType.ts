export interface Activity {
  id: number
  name: string
  type: string
  description: string
  difficulty: "Fácil" | "Medio" | "Difícil"
  duration: string
  subject: string
  icon: string
  color: string
  features: string[]
  isPopular?: boolean
  isNew?: boolean
}