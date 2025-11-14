import { FaCoins, FaChartLine, FaWallet } from "react-icons/fa";
import formatPrice from "../../../shared/utils/formatPrice";

type Props = {
  totalSaved: number;
  totalInterest: number;
  activeCajas: number;
};

export const useStatsHeader = ({
  activeCajas,
  totalInterest,
  totalSaved,
}: Props) => {
  const stats = [
    {
      icon: <FaCoins />,
      label: "Total Ahorrado",
      value: formatPrice(totalSaved),
      gradient: "linear-gradient(135deg, #22c55e, #15803d)",
      delay: 0.1,
    },
    {
      icon: <FaChartLine />,
      label: "Interés Acumulado",
      value: formatPrice(totalInterest),
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      delay: 0.2,
    },
    {
      icon: <FaWallet />,
      label: "Cajas Activas",
      value: activeCajas,
      gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
      delay: 0.3,
    },
  ];
  return {
    stats,
  };
};
