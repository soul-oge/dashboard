//  import React from "react";

import { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("CAD");
  const [convertedCurrency, setconvertedCurrency] = useState("");

  async function handleConversion() {
    const response = await fetch(
      `http://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    );

    const data = await response.json();
    setconvertedCurrency(data.rates[toCurrency]);
  }

  return (
    <div>
      <div className="max-w-lg mx-auto p-6 rounded-lg flex flex-col items-center bg-blue-500 text-center shadow-md">
        <h1 className="text-lg font-bold text-blue-100 mb-2" >Currency Convertor</h1>
        <div className="convertor-box ">
          <label className="text-2xl">Amount : </label>
          <input className="border-4"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
          {/* <label>From: </label> */}
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option>USD</option>
            <option>GBP</option>
            <option>CAD</option>
            <option>JPY</option>
            <option value=""></option>
            {/* <option>FCFA</option> */}
          </select>
          <div>
          <label>To : </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option>USD</option>
            <option>GBP</option>
            <option>CAD</option>
            <option>JPY</option>
            {/* <option>FCFA</option> */}
          </select>
          </div>
          <button onClick={handleConversion}  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">Conver</button>
          <h1>
            {amount}
            {" " + fromCurrency}={convertedCurrency}
            {" " + toCurrency}
          </h1>
          {/* <h2>{convertedCurrency}</h2> */}
        </div>
      </div>
      <div class="grid grid-flow-row auto-rows-max">
      </div>
    </div>
  );
}
