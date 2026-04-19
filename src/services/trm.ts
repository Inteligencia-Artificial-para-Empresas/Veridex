export const getLatestTRM = async (): Promise<number> => {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();

    return data.rates.COP;
  } catch (error) {
    console.error("Error obteniendo la TRM:", error);
    return 4000;
  }
};
