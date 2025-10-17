/**
 * Hook centralizado para las reglas de las actividades
 * Mantiene todas las reglas en un solo lugar para fácil mantenimiento
 */
export const useActivityRules = () => {
  const rules = [
    "⏱️ El tiempo comienza al iniciar la actividad y no se puede pausar",
    "🚫 No puedes salir de la actividad una vez iniciada",
    "🚫 No puedes cambiar de pestaña del navegador durante la actividad",
    "🚫 No puedes recargar la página durante la actividad",
    "⚠️ Si realizas alguna de estas acciones, perderás tu intento automáticamente",
  ];

  const shortRules = [
    "No puedes salir de la actividad",
    "No puedes cambiar de pestaña",
    "No puedes recargar la página",
    "Perderás tu intento si lo haces",
  ];

  return {
    rules,
    shortRules,
  };
};
