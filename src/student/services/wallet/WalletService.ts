import api from "../../../shared/utils/api";
import { urls } from "../urls";

const getLastTransactionsStudentApi = async () => {
  const response = await api.get(urls.LastTransactionsWallet);
  return response.data;
};
export const WalletService = {
  getLastTransactionsStudentApi,
};
