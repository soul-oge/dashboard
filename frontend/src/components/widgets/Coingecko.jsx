import React, { useEffect, useState } from "react";
import axios from "axios";

const Coingecko = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd", 
              ids: "bitcoin,ethereum,solana",
              order: "market_cap_desc",
              per_page: 3,
              page: 1,
              sparkline: false,
              price_change_percentage: "1h,24h,7d",
            },
          }
        );
        setCryptos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des cryptos :", error);
        setLoading(false);
      }
    };

    fetchCrypto();
    // const interval = setInterval(fetchCrypto, 12222222200000);
    // return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p> Chargement des cryptos ... </p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Crypto Prices</h2>
      <ul className="space-y-4">
        {cryptos.map((coin) => (
          <li key={coin.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8" />
              <span className="font-medium">{coin.name} ({coin.symbol.toUpperCase()})</span>
            </div>
            <div className="text-right">
              <p className="text-lg">${coin.current_price.toLocaleString()}</p>
              <p className={`text-sm ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Coingecko;
