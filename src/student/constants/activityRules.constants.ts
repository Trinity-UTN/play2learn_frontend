export const DEFAULT_ACTIVITY_RULES: string[] = [
  "⏱️ El tiempo comienza al iniciar la actividad y no se puede pausar",
  "🚫 No puedes salir de la actividad una vez iniciada",
  "🚫 No puedes cambiar de pestaña del navegador durante la actividad",
  "🚫 No puedes recargar la página durante la actividad",
  "⚠️ Si realizas alguna de estas acciones, perderás tu intento automáticamente",
];

export const ACTIVITY_RULES: Record<string, string[]> = {
  // Si algun dia ponemos reglas únicas por actividad
  // "No Ludica": [
  //   "⏱️ El tiempo comienza al iniciar la actividad",
  //   "📌 Debes completar la consigna dentro del tiempo establecido",
  //   "💾 Tu respuesta se enviará al finalizar el intento",
  //   "⚠️ Solo tienes un intento disponible",
  // ],
};
