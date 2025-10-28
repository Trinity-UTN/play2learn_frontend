import type { IconType } from "react-icons";
import {
  FaCoins,
  FaExchangeAlt,
  FaBalanceScale,
  FaLock,
  FaChartLine,
  FaWallet,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaUniversity,
  FaLandmark,
  FaFileInvoiceDollar,
  FaChartPie,
  FaChartBar,
  FaChartArea,
  FaArrowUp,
  FaArrowDown,
  FaGavel,
  FaBrain,
  FaRegSmileBeam,
} from "react-icons/fa";

export interface FinancialConcept {
  id: string;
  title: string;
  icon: IconType;
  color: string;
  difficulty: "Básico" | "Intermedio" | "Avanzado";
  categoria:
    | "Dinero y sus funciones"
    | "Poder adquisitivo e inflación"
    | "Presupuesto personal o familiar"
    | "Deuda y sus tipos"
    | "Interés compuesto y valor del dinero en el tiempo"
    | "Instituciones financieras"
    | "Inversión"
    | "Políticas macroeconómicas relevantes"
    | "Aspectos legales e impositivos"
    | "Educación financiera conductual";
  description: string;
  detailedExplanation: string;
  examples: string[];
  practicalTips: string[];
  relatedConcepts: string[];
  bibliografia: string[];
}

export const financialConcepts: FinancialConcept[] = [
  // 1 - Dinero y sus funciones
  {
    id: "dinero",
    title: "Qué es el dinero y sus funciones",
    icon: FaCoins,
    color: "#0EA5E9",
    difficulty: "Básico",
    categoria: "Dinero y sus funciones",
    description:
      "Instrumento que facilita los intercambios al actuar como medio de intercambio, unidad de cuenta y reserva de valor.",
    detailedExplanation:
      "El dinero surge para resolver las limitaciones del trueque: estandariza el intercambio, permite medir valores y almacenar poder adquisitivo. Sus funciones (medio de intercambio, unidad de cuenta y reserva de valor) explican por qué la sociedad lo utiliza como referente para precios, contratos y ahorro.",
    examples: [
      "Pagar bienes y servicios con billetes o transferencias.",
      "Registrar el precio de un producto en la moneda local.",
      "Ahorrar para una compra futura sin perder la medida de valor.",
    ],
    practicalTips: [
      "Pensá el dinero como una herramienta: manejalo según objetivos (liquidez, seguridad, rendimiento).",
      "Usá la unidad de cuenta para comparar precios y tomar decisiones informadas.",
    ],
    relatedConcepts: ["medio-intercambio", "unidad-cuenta", "reserva-valor"],
    bibliografia: [
      "McConnell, C. R., Brue, S. L., & Flynn, S. M. (2021). Economics: Principles, Problems, and Policies. McGraw-Hill. Cap. 13.",
    ],
  },
  {
    id: "medio-intercambio",
    title: "Medio de intercambio",
    icon: FaExchangeAlt,
    color: "#0EA5E9",
    difficulty: "Básico",
    categoria: "Dinero y sus funciones",
    description:
      "Función del dinero que facilita la compraventa sin necesidad de trueque directo.",
    detailedExplanation:
      "Como medio de intercambio, el dinero elimina la doble coincidencia de necesidades del trueque: cualquier agente acepta la moneda por su valor reconocido, agilizando transacciones y reduciendo costos de negociación.",
    examples: [
      "Pagar un café con efectivo o tarjeta.",
      "Vender un artículo y recibir transferencia bancaria como pago.",
    ],
    practicalTips: [
      "Mantené medios de pago alternativos (efectivo + digital) para mayor flexibilidad.",
    ],
    relatedConcepts: ["dinero", "unidad-cuenta"],
    bibliografia: ["McConnell et al., 2021, Cap. 13."],
  },
  {
    id: "unidad-cuenta",
    title: "Unidad de cuenta",
    icon: FaBalanceScale,
    color: "#0EA5E9",
    difficulty: "Básico",
    categoria: "Dinero y sus funciones",
    description:
      "Función del dinero que permite medir y comparar el valor de bienes y servicios.",
    detailedExplanation:
      "La unidad de cuenta estandariza precios y facilita la contabilidad. Sin una unidad común sería muy difícil comparar costos o llevar registros coherentes de ingresos y gastos.",
    examples: [
      "Comparar el precio de distintos modelos de celular en la misma moneda.",
      "Registrar salarios y facturas usando una moneda estándar.",
    ],
    practicalTips: [
      "Llevá tus registros (gastos/ingresos) siempre en la misma unidad.",
    ],
    relatedConcepts: ["dinero", "medio-intercambio"],
    bibliografia: ["McConnell et al., 2021, Cap. 13."],
  },
  {
    id: "reserva-valor",
    title: "Reserva de valor",
    icon: FaLock,
    color: "#0EA5E9",
    difficulty: "Básico",
    categoria: "Dinero y sus funciones",
    description:
      "Capacidad del dinero para mantener su poder adquisitivo en el tiempo.",
    detailedExplanation:
      "Si el dinero conserva su valor, permite posponer consumo y planificar. Sin reserva de valor estable (por ejemplo, alta inflación), ahorrar en efectivo puede implicar pérdida de poder de compra.",
    examples: [
      "Guardar ahorros en una cuenta que preserve poder adquisitivo.",
      "Invertir para protegerse ante la inflación.",
    ],
    practicalTips: [
      "No acumulés efectivo sin estrategia: considerá instrumentos que rindan algo.",
      "Combiná liquidez y activos que protejan contra la inflación.",
    ],
    relatedConcepts: ["inflacion", "ahorro"],
    bibliografia: ["McConnell et al., 2021, Cap. 13."],
  },

  // 2 - Poder adquisitivo e inflación
  {
    id: "poder-adquisitivo",
    title: "Poder adquisitivo",
    icon: FaWallet,
    color: "#F59E0B",
    difficulty: "Básico",
    categoria: "Poder adquisitivo e inflación",
    description:
      "Cantidad de bienes y servicios que se pueden comprar con una unidad monetaria.",
    detailedExplanation:
      "El poder adquisitivo depende del nivel de precios: si los precios suben (inflación) una misma cantidad de dinero compra menos bienes. Mantener o mejorar el poder adquisitivo requiere estrategias de ahorro/inversión que superen la inflación.",
    examples: [
      "Con $1.000 hoy podés comprar menos que hace 5 años si hubo inflación.",
    ],
    practicalTips: [
      "Incluí en tus planes inversiones que al menos superen la inflación esperada.",
    ],
    relatedConcepts: ["inflacion", "valor-temporal-dinero"],
    bibliografia: [
      "Komlos, J. (2023). Foundations of Real-World Economics. Cap. 7.",
    ],
  },
  {
    id: "inflacion",
    title: "Inflación",
    icon: FaArrowUp,
    color: "#F59E0B",
    difficulty: "Intermedio",
    categoria: "Poder adquisitivo e inflación",
    description:
      "Aumento sostenido y generalizado de los precios que reduce el valor real del dinero.",
    detailedExplanation:
      "La inflación erosiona el poder adquisitivo: la misma cantidad de dinero compra menos con el tiempo. Los bancos centrales intentan controlarla mediante políticas monetarias, y los agentes económicos ajustan salarios, precios y decisiones de inversión.",
    examples: [
      "Incremento general de precios en alimentos, transporte y servicios.",
    ],
    practicalTips: [
      "Considerá instrumentos indexados o que rindan por encima de la inflación.",
    ],
    relatedConcepts: ["poder-adquisitivo", "valor-temporal-dinero"],
    bibliografia: [
      "Komlos, J. (2023). Foundations of Real-World Economics. Cap. 7.",
    ],
  },
  {
    id: "erosion-tiempo",
    title: "Erosión del dinero en el tiempo",
    icon: FaChartLine,
    color: "#F59E0B",
    difficulty: "Intermedio",
    categoria: "Poder adquisitivo e inflación",
    description:
      "Pérdida de valor real del dinero con el paso del tiempo por inflación y oportunidades perdidas.",
    detailedExplanation:
      "El dinero que no genera rendimiento puede perder valor real por inflación y por el costo de oportunidad de no invertir. Por eso la planificación y el interés compuesto son herramientas clave para preservar y aumentar riqueza.",
    examples: [
      "Mantener efectivo sin interés mientras los precios suben.",
      "Perder el rendimiento compuesto por no invertir a tiempo.",
    ],
    practicalTips: [
      "Comenzá a invertir temprano para aprovechar el interés compuesto.",
    ],
    relatedConcepts: ["interes-compuesto", "valor-temporal-dinero"],
    bibliografia: ["Sowell, T. (2015). Basic Economics. Cap. 10."],
  },

  // 3 - Presupuesto personal o familiar (5)
  {
    id: "ingresos",
    title: "Ingresos",
    icon: FaHandHoldingUsd,
    color: "#16A34A",
    difficulty: "Básico",
    categoria: "Presupuesto personal o familiar",
    description:
      "Entradas de dinero periódicas o esporádicas que recibe una persona o familia.",
    detailedExplanation:
      "Los ingresos pueden provenir de salarios, rentas, intereses o actividades comerciales. Ser claro sobre la composición y periodicidad de ingresos es la base para construir un presupuesto realista.",
    examples: [
      "Salario mensual, honorarios por trabajos freelance, renta de una propiedad.",
    ],
    practicalTips: [
      "Registrá todas las fuentes de ingreso y revisalas periódicamente.",
      "Diferenciá ingresos recurrentes de extraordinarios para planificación.",
    ],
    relatedConcepts: ["presupuesto-personal", "ahorro"],
    bibliografia: ["Wargo, D. (2023). Economics for Life. Cap. 2."],
  },
  {
    id: "gastos-fijos",
    title: "Gastos fijos",
    icon: FaFileInvoiceDollar,
    color: "#16A34A",
    difficulty: "Básico",
    categoria: "Presupuesto personal o familiar",
    description:
      "Pagos recurrentes y predecibles como alquiler, servicios o seguros.",
    detailedExplanation:
      "Los gastos fijos son la parte estable del presupuesto: conocerlos permite calcular el piso de gastos mensuales y cuánto se puede destinar a ahorro o deuda.",
    examples: [
      "Alquiler, cuota de servicios, seguro del auto, planes de suscripción.",
    ],
    practicalTips: [
      "Automatizá los pagos esenciales para evitar moras.",
      "Revisá anual o semestralmente cada fijo para buscar optimizaciones.",
    ],
    relatedConcepts: ["presupuesto-personal", "gastos-variables"],
    bibliografia: ["Wargo, 2023, Cap. 2."],
  },
  {
    id: "gastos-variables",
    title: "Gastos variables",
    icon: FaChartArea,
    color: "#16A34A",
    difficulty: "Básico",
    categoria: "Presupuesto personal o familiar",
    description:
      "Gastos que cambian según decisiones o circunstancias: ocio, transporte, alimentos.",
    detailedExplanation:
      "A diferencia de los fijos, los variables pueden ajustarse en el corto plazo para mejorar la salud financiera. Identificarlos permite recortar o redirigir gasto hacia objetivos.",
    examples: [
      "Comidas fuera, compras no planificadas, combustible según uso.",
    ],
    practicalTips: [
      "Asigná topes claros para categorías variables y monitorealos semanalmente.",
    ],
    relatedConcepts: ["gastos-fijos", "presupuesto-personal"],
    bibliografia: ["Wargo, 2023, Cap. 2."],
  },
  {
    id: "ahorro",
    title: "Ahorro",
    icon: FaPiggyBank,
    color: "#16A34A",
    difficulty: "Básico",
    categoria: "Presupuesto personal o familiar",
    description: "Porción de ingresos que se reserva para metas o imprevistos.",
    detailedExplanation:
      "El ahorro sistemático permite alcanzar objetivos y cubrir emergencias. Debe formarse con disciplina y priorización dentro del presupuesto.",
    examples: [
      "Guardar 10% del salario cada mes en una cuenta destinada a un objetivo.",
    ],
    practicalTips: [
      "Automatizá transferencias a una cuenta de ahorro al cobrar.",
      "Definí metas (corto/mediano/largo plazo) y asigná montos concretos.",
    ],
    relatedConcepts: ["fondo-emergencia", "presupuesto-personal"],
    bibliografia: ["Wargo, 2023, Cap. 3."],
  },
  {
    id: "fondo-emergencia",
    title: "Fondo de emergencia",
    icon: FaWallet,
    color: "#16A34A",
    difficulty: "Básico",
    categoria: "Presupuesto personal o familiar",
    description:
      "Ahorro destinado exclusivamente a cubrir imprevistos y evitar endeudamiento.",
    detailedExplanation:
      "Un fondo de emergencia protege contra shocks (pérdida de empleo, salud, reparaciones). Su tamaño recomendado suele ser de 3–6 meses de gastos fijos, según perfil y estabilidad laboral.",
    examples: [
      "Cuenta con dinero para cubrir 3 meses de gastos en caso de desempleo.",
    ],
    practicalTips: [
      "No uses el fondo para gastos no urgentes; mantenlo líquido y separado.",
    ],
    relatedConcepts: ["ahorro", "presupuesto-personal"],
    bibliografia: ["Wargo, 2023, Cap. 3."],
  },

  // 4 - Deuda y sus tipos (6)
  {
    id: "deuda-buena",
    title: "Deuda buena",
    icon: FaHandHoldingUsd,
    color: "#DC2626",
    difficulty: "Intermedio",
    categoria: "Deuda y sus tipos",
    description:
      "Deuda utilizada para financiar activos que generan ingresos o aumentan el patrimonio.",
    detailedExplanation:
      "La deuda buena se aplica en inversión productiva: educación que mejora ingresos, una vivienda que se valoriza o un préstamo para expandir un negocio con retorno positivo.",
    examples: [
      "Crédito estudiantil (si mejora perspectivas de ingreso), préstamo hipotecario para residencia.",
    ],
    practicalTips: [
      "Analizá tasa vs retorno esperado antes de tomar deuda para invertir.",
    ],
    relatedConcepts: ["deuda-mala", "interes"],
    bibliografia: ["Wargo, 2023, Cap. 4."],
  },
  {
    id: "deuda-mala",
    title: "Deuda mala",
    icon: FaArrowDown,
    color: "#DC2626",
    difficulty: "Intermedio",
    categoria: "Deuda y sus tipos",
    description:
      "Deuda que financia consumo sin retorno económico y suele tener alto costo.",
    detailedExplanation:
      "La deuda mala es aquella contraída para consumir hoy sin generar valor futuro, como compras impulsivas o consumos financiados con altas tasas que deterioran la salud financiera.",
    examples: [
      "Comprar gadgets con tarjeta y pagar solo cuotas mínimas con alto interés.",
    ],
    practicalTips: [
      "Evitá financiar consumo corriente con deuda; priorizá pago de deudas caras.",
    ],
    relatedConcepts: ["deuda-buena", "tarjeta-credito"],
    bibliografia: ["Wargo, 2023, Cap. 4."],
  },
  {
    id: "tarjeta-credito",
    title: "Tarjeta de crédito",
    icon: FaFileInvoiceDollar,
    color: "#DC2626",
    difficulty: "Básico",
    categoria: "Deuda y sus tipos",
    description:
      "Instrumento de pago que permite comprar ahora y pagar después; genera intereses si no se cancela a término.",
    detailedExplanation:
      "La tarjeta es útil para gestión de cash flow y protección en compras, pero su costo puede ser alto si se pagan intereses. Usada bien, aporta beneficios; mal usada, puede llevar a sobreendeudamiento.",
    examples: [
      "Comprar online y financiar en cuotas con o sin interés según la oferta.",
    ],
    practicalTips: [
      "Pagá el total siempre que puedas; si usás cuotas, entendé la tasa efectiva.",
      "Usá recompensas solo si no incrementan el costo real.",
    ],
    relatedConcepts: ["deuda-mala", "score-crediticio", "interes"],
    bibliografia: ["Wargo, 2023, Cap. 4."],
  },
  {
    id: "score-crediticio",
    title: "Score crediticio",
    icon: FaChartBar,
    color: "#DC2626",
    difficulty: "Intermedio",
    categoria: "Deuda y sus tipos",
    description:
      "Puntaje que refleja tu historial de pago y comportamiento frente a compromisos financieros.",
    detailedExplanation:
      "El score resume historial crediticio: puntualidad en pagos, nivel de endeudamiento y antigüedad de cuentas. Afecta la capacidad de acceder a crédito y las condiciones (tasas, plazos).",
    examples: [
      "Historial con pagos a tiempo => mejor score => mejores tasas ofertadas.",
    ],
    practicalTips: [
      "Mantené pagos a tiempo y endeudamiento razonable para mejorar score.",
    ],
    relatedConcepts: ["tarjeta-credito", "refinanciacion"],
    bibliografia: ["McConnell et al., 2021, Cap. 35."],
  },
  {
    id: "amortizacion",
    title: "Amortización",
    icon: FaChartArea,
    color: "#DC2626",
    difficulty: "Intermedio",
    categoria: "Deuda y sus tipos",
    description:
      "Proceso de pago gradual de una deuda, distribuyendo capital e intereses en cuotas.",
    detailedExplanation:
      "Las tablas de amortización muestran cuánto del pago mensual es interés y cuánto capital. Entender la amortización ayuda a planificar pagos anticipados y comparar ofertas.",
    examples: [
      "Crédito hipotecario con cuota fija mensual que reduce capital a lo largo del tiempo.",
    ],
    practicalTips: [
      "Solicitá la tabla de amortización antes de firmar y evaluá impacto de pagos extra.",
    ],
    relatedConcepts: ["interes", "refinanciacion"],
    bibliografia: ["Wargo, 2023, Cap. 4."],
  },
  {
    id: "riesgo-crediticio",
    title: "Riesgo crediticio",
    icon: FaChartPie,
    color: "#DC2626",
    difficulty: "Intermedio",
    categoria: "Deuda y sus tipos",
    description:
      "Probabilidad de incumplimiento en el pago de deudas por parte del prestatario.",
    detailedExplanation:
      "Evaluar riesgo crediticio es clave para entidades que prestan y para quienes toman deuda: afecta tasas, garantías requeridas y montos aprobados.",
    examples: [
      "Persona con ingresos inestables tiene mayor riesgo y puede pagar tasas más altas.",
    ],
    practicalTips: [
      "Antes de tomar deuda, analizá tu capacidad de pago en distintos escenarios.",
    ],
    relatedConcepts: ["score-crediticio", "deuda-buena"],
    bibliografia: ["McConnell et al., 2021, Cap. 35."],
  },

  // 5 - Interés compuesto y valor del dinero en el tiempo (4)
  {
    id: "interes-simple",
    title: "Interés simple",
    icon: FaArrowDown,
    color: "#7C3AED",
    difficulty: "Básico",
    categoria: "Interés compuesto y valor del dinero en el tiempo",
    description:
      "Interés calculado únicamente sobre el capital inicial; crecimiento lineal.",
    detailedExplanation:
      "El interés simple no capitaliza; cada periodo se calcula sobre el capital original. Es más fácil de entender, pero menos poderoso para generar riqueza que el interés compuesto.",
    examples: [
      "Préstamo de $1000 al 5% anual => 50$ anuales en interés (siempre sobre 1000$).",
    ],
    practicalTips: [
      "Sos consciente si una oferta usa interés simple; comparar con ofertas capitalizadas.",
    ],
    relatedConcepts: ["interes-compuesto", "valor-temporal-dinero"],
    bibliografia: ["Sowell, 2015, Cap. 10."],
  },
  {
    id: "interes-compuesto",
    title: "Interés compuesto",
    icon: FaArrowUp,
    color: "#7C3AED",
    difficulty: "Intermedio",
    categoria: "Interés compuesto y valor del dinero en el tiempo",
    description:
      "Interés que se calcula sobre el capital más los intereses ya generados; efecto acelerador.",
    detailedExplanation:
      "El interés compuesto produce crecimiento exponencial: los intereses ganan intereses. Es la fuerza principal detrás del crecimiento de largo plazo en inversiones y es clave para planificar el ahorro.",
    examples: [
      "Invertir $1.000 al 5% compuesto anual => al año 1.050$, al año 2 ~1.102,50$.",
    ],
    practicalTips: [
      "Empezá a invertir temprano: compounding trabaja mejor con tiempo.",
    ],
    relatedConcepts: ["valor-temporal-dinero", "erosion-tiempo"],
    bibliografia: ["Wargo, 2023, Cap. 5.", "Sowell, 2015, Cap. 10."],
  },
  {
    id: "valor-temporal-dinero",
    title: "Valor temporal del dinero",
    icon: FaChartLine,
    color: "#7C3AED",
    difficulty: "Intermedio",
    categoria: "Interés compuesto y valor del dinero en el tiempo",
    description:
      "Principio que indica que una suma hoy vale más que la misma suma en el futuro.",
    detailedExplanation:
      "Una suma disponible hoy puede invertirse para generar rendimientos; además, la inflación erosiona valor. Por eso se descuentan flujos futuros para compararlos en términos presentes.",
    examples: [
      "Comparar recibir $100 hoy vs $110 en 1 año; depende de la tasa de descuento.",
    ],
    practicalTips: [
      "Usá tasas de descuento realistas para evaluar proyectos o inversiones personales.",
    ],
    relatedConcepts: ["interes-compuesto", "tasa-descuento"],
    bibliografia: ["Komlos, 2023, Cap. 8."],
  },
  {
    id: "tasa-descuento",
    title: "Tasa de descuento",
    icon: FaChartBar,
    color: "#7C3AED",
    difficulty: "Avanzado",
    categoria: "Interés compuesto y valor del dinero en el tiempo",
    description:
      "Tasa usada para convertir flujos futuros en su valor presente.",
    detailedExplanation:
      "La tasa refleja la preferencia temporal y el riesgo. Elegirla correctamente es clave para valuaciones, comparaciones entre alternativas y decisiones de inversión.",
    examples: [
      "Usar 8% anual para traer a presente los flujos esperados de un proyecto.",
    ],
    practicalTips: [
      "Aumentá la tasa cuando el proyecto tenga más incertidumbre.",
    ],
    relatedConcepts: ["valor-temporal-dinero", "interes-compuesto"],
    bibliografia: ["Komlos, 2023, Cap. 8."],
  },

  // 6 - Instituciones financieras (3)
  {
    id: "bancos",
    title: "Bancos",
    icon: FaUniversity,
    color: "#0F172A",
    difficulty: "Básico",
    categoria: "Instituciones financieras",
    description:
      "Entidades que intermedian entre ahorristas y prestatarios: administran depósitos y otorgan créditos.",
    detailedExplanation:
      "Los bancos facilitan la circulación del dinero, gestionan pagos, ofrecen productos de ahorro e inversión y evalúan riesgo crediticio. Son regulados y supervisados para garantizar estabilidad financiera.",
    examples: ["Cuentas corrientes, depósitos a plazo, préstamos personales."],
    practicalTips: [
      "Compará condiciones (tasas, comisiones) entre entidades antes de elegir productos.",
    ],
    relatedConcepts: [
      "cooperativas-de-credito",
      "servicios-financieros-basicos",
    ],
    bibliografia: ["McConnell et al., 2021, Cap. 34."],
  },
  {
    id: "cooperativas-de-credito",
    title: "Cooperativas de crédito",
    icon: FaLandmark,
    color: "#0F172A",
    difficulty: "Básico",
    categoria: "Instituciones financieras",
    description:
      "Entidades financieras sin fines de lucro que prestan servicios a sus miembros con condiciones más cooperativas.",
    detailedExplanation:
      "Las cooperativas suelen ofrecer tasas más favorables para socios, promueven inclusión financiera y se centran en el beneficio de sus miembros en lugar de maximizar utilidades.",
    examples: [
      "Cuentas y microcréditos con condiciones preferenciales para asociados.",
    ],
    practicalTips: [
      "Evaluá requisitos y servicios: en algunos casos conviene por tasas y atención personalizada.",
    ],
    relatedConcepts: ["bancos"],
    bibliografia: ["Wargo, 2023, Cap. 6."],
  },
  {
    id: "servicios-financieros-basicos",
    title: "Servicios financieros básicos",
    icon: FaChartPie,
    color: "#0F172A",
    difficulty: "Básico",
    categoria: "Instituciones financieras",
    description:
      "Conjunto de servicios que facilitan la participación en la economía formal: cuentas, transferencias, créditos y seguros.",
    detailedExplanation:
      "Estos servicios permiten pagos eficientes, ahorro, acceso a crédito y protección ante riesgos. La accesibilidad y transparencia en condiciones son esenciales para inclusión financiera.",
    examples: [
      "Cuenta bancaria, tarjeta de débito, transferencias, microseguros.",
    ],
    practicalTips: [
      "Usá servicios básicos para construir historial y mejorar acceso a productos más complejos.",
    ],
    relatedConcepts: ["bancos", "cooperativas-de-credito"],
    bibliografia: ["McConnell et al., 2021, Cap. 34."],
  },

  // 7 - Inversión (6)
  {
    id: "depositos-bonos",
    title: "Depósitos y bonos",
    icon: FaCoins,
    color: "#059669",
    difficulty: "Básico",
    categoria: "Inversión",
    description:
      "Instrumentos de renta fija: depósitos bancarios y bonos que pagan intereses predecibles.",
    detailedExplanation:
      "Son opciones conservadoras para inversores que buscan previsibilidad. Los bonos pueden ser emitidos por gobiernos o empresas y ofrecen rendimientos según plazo y riesgo del emisor.",
    examples: ["Plazo fijo bancario, bono soberano a 2 años."],
    practicalTips: [
      "Considerá liquidez y riesgo del emisor antes de invertir.",
    ],
    relatedConcepts: ["plazo-fijo", "fondos-mutuales"],
    bibliografia: ["Wargo, 2023, Cap. 5."],
  },
  {
    id: "acciones",
    title: "Acciones",
    icon: FaChartLine,
    color: "#059669",
    difficulty: "Intermedio",
    categoria: "Inversión",
    description:
      "Participaciones en el capital de una empresa que pueden generar dividendos y apreciación de precio.",
    detailedExplanation:
      "Invertir en acciones implica asumir mayor volatilidad y riesgo, pero con potencial de mayores rendimientos en el largo plazo. Requiere entender la empresa y el mercado.",
    examples: ["Comprar acciones de una compañía que proyecta crecimiento."],
    practicalTips: [
      "Diversificá y analizá métricas clave (P/E, crecimiento, deuda).",
    ],
    relatedConcepts: ["fondos-mutuales", "diversificacion"],
    bibliografia: ["Sowell, 2015, Cap. 11."],
  },
  {
    id: "fondos-mutuales",
    title: "Fondos comunes de inversión (FCI)",
    icon: FaChartArea,
    color: "#059669",
    difficulty: "Básico",
    categoria: "Inversión",
    description:
      "Vehículos que agrupan dinero de varios inversores para diversificar y profesionalizar la gestión.",
    detailedExplanation:
      "Los FCI permiten acceder a carteras diversificadas administradas por gestores profesionales. Hay fondos de renta fija, variable, mixtos y de mercado monetario según perfil de riesgo.",
    examples: [
      "Un fondo que combina bonos y acciones para balancear riesgo y retorno.",
    ],
    practicalTips: [
      "Analizá comisiones y horizonte de inversión antes de entrar.",
    ],
    relatedConcepts: ["acciones", "diversificacion"],
    bibliografia: ["Wargo, 2023, Cap. 5."],
  },
  {
    id: "diversificacion",
    title: "Diversificación",
    icon: FaChartPie,
    color: "#059669",
    difficulty: "Intermedio",
    categoria: "Inversión",
    description:
      "Estrategia que reparte inversiones para reducir el riesgo total del portafolio.",
    detailedExplanation:
      "No poner todos los huevos en la misma canasta reduce la probabilidad de pérdidas catastróficas: combinar activos, geografías y sectores suaviza la volatilidad.",
    examples: [
      "Tener bonos, acciones y efectivo en diferentes industrias y países.",
    ],
    practicalTips: [
      "Diversificá también por horizonte temporal: activos líquidos vs ilíquidos.",
    ],
    relatedConcepts: ["fondos-mutuales", "acciones", "depositos-bonos"],
    bibliografia: ["Komlos, 2023, Cap. 9."],
  },
  {
    id: "liquidez-activos",
    title: "Liquidez de activos",
    icon: FaWallet,
    color: "#059669",
    difficulty: "Básico",
    categoria: "Inversión",
    description:
      "Facilidad con la que un activo puede convertirse en efectivo sin perder valor.",
    detailedExplanation:
      "Activos como efectivo o depósitos a la vista son muy líquidos; bienes inmuebles o algunos bonos pueden tardar en venderse. La liquidez afecta la capacidad de responder a emergencias o aprovechar oportunidades.",
    examples: [
      "Vender acciones en un mercado activo vs vender una propiedad que puede tardar meses.",
    ],
    practicalTips: [
      "Mantené una parte líquida para emergencias y mantén iliquidez con propósito (rendimiento).",
    ],
    relatedConcepts: ["depositos-bonos", "fondo-emergencia"],
    bibliografia: ["Wargo, 2023, Cap. 5."],
  },
  {
    id: "criptomonedas",
    title: "Criptomonedas",
    icon: FaChartArea,
    color: "#059669",
    difficulty: "Avanzado",
    categoria: "Inversión",
    description:
      "Activos digitales descentralizados negociados en mercados digitales, con alta volatilidad.",
    detailedExplanation:
      "Las criptomonedas ofrecen oportunidades de retorno y riesgos particulares (volatilidad, regulación, seguridad). Son instrumentos especulativos que requieren conocimiento y tolerancia al riesgo.",
    examples: ["Bitcoin, Ethereum y tokens con casos de uso específicos."],
    practicalTips: [
      "Si invertís, hacelo con capital que estés dispuesto a perder y diversificá.",
    ],
    relatedConcepts: ["acciones", "diversificacion"],
    bibliografia: [
      "Sowell, 2015 (contexto de riesgo), Komlos, 2023 (mercados modernos).",
    ],
  },

  // 8 - Políticas macroeconómicas relevantes (3)
  {
    id: "politica-fiscal",
    title: "Política fiscal",
    icon: FaGavel,
    color: "#F97316",
    difficulty: "Intermedio",
    categoria: "Políticas macroeconómicas relevantes",
    description:
      "Uso del gasto público y los impuestos para influir en la actividad económica y el empleo.",
    detailedExplanation:
      "La política fiscal afecta demanda agregada a través de gasto e impuestos. Puede estimular la economía (gasto público) o enfriar el crecimiento (austeridad). Sus efectos dependen de la situación macro y del tiempo de implementación.",
    examples: ["Aumentar inversión pública para impulsar empleo en recesión."],
    practicalTips: [
      "Entendé cómo cambios en impuestos o subsidios pueden impactar precios y empleo.",
    ],
    relatedConcepts: ["politica-monetaria", "impuestos-ingresos"],
    bibliografia: ["Komlos, 2023, Cap. 9."],
  },
  {
    id: "politica-monetaria",
    title: "Política monetaria",
    icon: FaUniversity,
    color: "#F97316",
    difficulty: "Intermedio",
    categoria: "Políticas macroeconómicas relevantes",
    description:
      "Acciones del banco central sobre oferta monetaria y tasas para controlar inflación y estabilidad.",
    detailedExplanation:
      "La política monetaria usa herramientas (tasas, operaciones de mercado abierto) para influir en crédito, gasto e inflación. Sus decisiones impactan mortalmente en tasas de interés y costo del crédito.",
    examples: [
      "Subir tasas para frenar inflación; bajar tasas para estimular inversión.",
    ],
    practicalTips: [
      "Cuando las tasas suben, los costos de crédito aumentan y los activos de renta fija rinden más.",
    ],
    relatedConcepts: ["bancos-centrales", "inflacion"],
    bibliografia: ["McConnell et al., 2021, Cap. 14."],
  },
  {
    id: "bancos-centrales",
    title: "Bancos centrales",
    icon: FaLandmark,
    color: "#F97316",
    difficulty: "Intermedio",
    categoria: "Políticas macroeconómicas relevantes",
    description:
      "Instituciones encargadas de emitir moneda, regular la oferta y mantener estabilidad de precios.",
    detailedExplanation:
      "El banco central define objetivos de inflación, regula el sistema financiero y actúa como prestamista de última instancia. Sus decisiones afectan directamente el poder adquisitivo y el costo del dinero.",
    examples: [
      "Decisión de la autoridad monetaria de modificar la tasa de referencia.",
    ],
    practicalTips: [
      "SeguÍ comunicados del banco central para anticipar movimientos en tasas y mercados.",
    ],
    relatedConcepts: ["politica-monetaria", "inflacion"],
    bibliografia: ["McConnell et al., 2021, Cap. 15."],
  },

  // 9 - Aspectos legales e impositivos (3)
  {
    id: "impuestos-ingresos",
    title: "Impuestos sobre ingresos",
    icon: FaFileInvoiceDollar,
    color: "#EF4444",
    difficulty: "Básico",
    categoria: "Aspectos legales e impositivos",
    description:
      "Tributos que gravan las ganancias de personas y empresas, habitualmente con estructura progresiva.",
    detailedExplanation:
      "Los impuestos sobre la renta financian servicios públicos y redistribuyen renta. Su diseño (tasas, deducciones) afecta incentivos laborales y de inversión.",
    examples: ["Gravar salarios y utilidades con escalas progresivas."],
    practicalTips: [
      "Planificá legalmente para optimizar carga fiscal (deducciones autorizadas).",
    ],
    relatedConcepts: ["impuestos-consumo", "regulaciones-financieras"],
    bibliografia: ["McConnell et al., 2021, Cap. 20."],
  },
  {
    id: "impuestos-consumo",
    title: "Impuestos al consumo (IVA)",
    icon: FaFileInvoiceDollar,
    color: "#EF4444",
    difficulty: "Básico",
    categoria: "Aspectos legales e impositivos",
    description:
      "Tributos aplicados sobre la compra de bienes y servicios, usualmente indirectos.",
    detailedExplanation:
      "El IVA grava el consumo y es recaudado por empresas que actúan como agentes de retención. Afecta precios finales y tiene efectos distributivos distintos al impuesto sobre la renta.",
    examples: ["IVA aplicado a productos y servicios en el punto de venta."],
    practicalTips: [
      "Entendé qué bienes/servicios están exentos o con tasa reducida en tu jurisdicción.",
    ],
    relatedConcepts: ["impuestos-ingresos", "retencion"],
    bibliografia: ["Komlos, 2023, Cap. 9."],
  },
  {
    id: "regulaciones-financieras",
    title: "Regulaciones financieras",
    icon: FaGavel,
    color: "#EF4444",
    difficulty: "Intermedio",
    categoria: "Aspectos legales e impositivos",
    description:
      "Normas que buscan transparencia, estabilidad y protección al consumidor en el sistema financiero.",
    detailedExplanation:
      "Las regulaciones establecen requisitos de capital, controles contra lavado, protección de datos y disposición para evitar crisis sistémicas. Comprenderlas ayuda a evaluar riesgo regulatorio en inversiones y negocios.",
    examples: [
      "Requerimientos de capital para bancos, límites a prácticas abusivas de crédito.",
    ],
    practicalTips: [
      "Mantenete actualizado sobre cambios regulatorios que afecten tus inversiones o negocio.",
    ],
    relatedConcepts: ["bancos", "impuestos-ingresos"],
    bibliografia: ["Wargo, 2023, Cap. 7.", "McConnell et al., 2021, Cap. 34."],
  },

  // 10 - Educación financiera conductual (2)
  {
    id: "sesgos-cognitivos",
    title: "Sesgos cognitivos",
    icon: FaBrain,
    color: "#6366F1",
    difficulty: "Intermedio",
    categoria: "Educación financiera conductual",
    description:
      "Errores sistemáticos en el juicio que afectan la toma de decisiones financieras.",
    detailedExplanation:
      "Sesgos como la aversión a la pérdida, exceso de confianza o anclaje influyen en decisiones de inversión y consumo. Conocerlos ayuda a diseñar estrategias que minimicen decisiones irracionales.",
    examples: [
      "Vender en pánico tras una caída de mercado (aversión a la pérdida).",
    ],
    practicalTips: [
      "Usá reglas automáticas (aportes sistemáticos) para mitigar sesgos.",
    ],
    relatedConcepts: [
      "decisiones-irracionales",
      "mentalidad-habitos-financieros",
    ],
    bibliografia: ["Komlos, 2023, Cap. 2."],
  },
  {
    id: "mentalidad-habitos-financieros",
    title: "Mentalidad y hábitos financieros",
    icon: FaRegSmileBeam,
    color: "#6366F1",
    difficulty: "Básico",
    categoria: "Educación financiera conductual",
    description:
      "Disciplina, paciencia y hábitos que sostienen la salud financiera a largo plazo.",
    detailedExplanation:
      "Más allá del conocimiento técnico, la constancia en hábitos (ahorro, presupuesto, revisar inversiones) y la mentalidad adecuada son determinantes para el bienestar financiero.",
    examples: [
      "Ahorrar mensualmente de forma automática en vez de depender de la voluntad del momento.",
    ],
    practicalTips: [
      "Creá rutinas simples: revisar presupuesto semanal y metas mensuales.",
    ],
    relatedConcepts: ["ahorro", "fondo-emergencia"],
    bibliografia: ["Wargo, 2023, Cap. 1.", "Komlos, 2023, Cap. 2."],
  },
];

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case "Básico":
      return "#10B981";
    case "Intermedio":
      return "#F59E0B";
    case "Avanzado":
      return "#EF4444";
    default:
      return "#6B7280";
  }
};

export const getConceptById = (id: string): FinancialConcept | undefined => {
  return financialConcepts.find((concept) => concept.id === id);
};

export const getConceptsByDifficulty = (
  difficulty: string
): FinancialConcept[] => {
  return financialConcepts.filter(
    (concept) => concept.difficulty === difficulty
  );
};
