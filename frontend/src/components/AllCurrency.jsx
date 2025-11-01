//  import React from "react";

import { useState } from "react";

export default function App() {
  //  

  async function handleConversion() {
    const response = await fetch(
      `http://api.frankfurter.app/latest`
    );

    const data = await response.json();
    console.log(data);
    
    // setconvertedCurrency(data.rates[toCurrency]);
  }

  handleConversion();

  
}
