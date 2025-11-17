import { useNavigate } from "react-router-dom";
import type { ActionsResponse } from "../../types/actions.type";
import { getRiskConfig } from "../../utils/actions.utils";

export const useActionData = (action: ActionsResponse) => {
  const navigate = useNavigate();
  const riskConfig = getRiskConfig(action.riskLevel);
  const purchased = action.quantityBought;
  const priceChange = action.currentPrice - action.initialPrice;
  const priceChangePercent = (
    (priceChange / action.initialPrice) *
    100
  ).toFixed(2);

  const isPositive = priceChange >= 0;
  const availabilityPercent =
    (action.availableAmount / action.totalAmount) * 100;

  const soldPercent = (action.soldAmount / action.totalAmount) * 100;

  const stats = [
    { label: "Total Acciones", value: action.totalAmount },
    { label: "Disponibles", value: action.availableAmount },
    { label: "Vendidas", value: action.soldAmount },
    { label: "Precio Inicial", value: action.initialPrice },
  ];

  const handleDetails = () => {
    navigate(`/dashboard/student/actions/details/${action.id}`);
  };

  return {
    riskConfig,
    priceChangePercent,
    priceChange,
    isPositive,
    availabilityPercent,
    stats,
    purchased,
    soldPercent,
    handleDetails,
  };
};
