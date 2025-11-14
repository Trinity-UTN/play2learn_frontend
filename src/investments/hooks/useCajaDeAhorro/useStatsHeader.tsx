import { FaCoins, FaChartLine, FaWallet } from "react-icons/fa";
import formatPrice from "../../../shared/utils/formatPrice";
import type { CajaDeAhorroStats } from "../../types/cajaAhorro.type";

type Props = {
  statsView: CajaDeAhorroStats;
};

export const useStatsHeader = ({ statsView }: Props) => {
  const stats = [
    {
      icon: <FaCoins />,
      label: "Total Invertido",
      value: formatPrice(statsView.totalInvested),
      gradient: "linear-gradient(135deg, #22c55e, #15803d)",
      delay: 0.1,
    },
    {
      icon: <FaChartLine />,
      label: "Interés Acumulado",
      value: formatPrice(statsView.totalReward),
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      delay: 0.2,
    },
    {
      icon: <FaWallet />,
      label: "Cajas Activas",
      value: statsView.quantityInProgress,
      gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
      delay: 0.3,
    },
  ];
  return {
    stats,
  };
};
