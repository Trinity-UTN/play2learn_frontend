/** ---------------------------
   * Helpers
   ----------------------------*/
export const withLoading = async <T>(
  callback: () => Promise<T>,
  setLoading: (data: boolean) => void
): Promise<T> => {
  setLoading(true);
  try {
    return await callback();
  } finally {
    setLoading(false);
  }
};
