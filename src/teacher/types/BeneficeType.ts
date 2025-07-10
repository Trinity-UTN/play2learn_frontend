export interface Benefit {
  id: number
  name: string
  description: string
  cost: number
  category: "Evaluaciones" | "Trabajos" | "Asistencia" | "Extras"
  status: "Activo" | "Inactivo"
  icon: string
  color: string
  duration?: string
  restrictions?: string[]
  usageCount: number
  maxUsage?: number
  isLimited?: boolean
  isPremium?: boolean
}