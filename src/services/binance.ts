export const getTopSymbols = async () => {
  const response = await fetch("https://api.binance.com/api/v3/exchangeInfo");
  const data = await response.json();

  const favorites = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "AVAX", "DOT", "LINK", "MATIC"];

  return data.symbols
    .filter((s: any) => s.quoteAsset === "USDT" && favorites.includes(s.baseAsset))
    .map((s: any) => ({
      id: s.baseAsset,
      symbol: s.symbol,
      pairUsdc: `${s.baseAsset}USDC`,
    }));
};
