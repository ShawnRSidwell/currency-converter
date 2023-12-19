import { useEffect, useState } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");

  const [output, setOutput] = useState(0);

  useEffect(
    function () {
      async function fetchConverter() {
        if (toCurrency === fromCurrency) return;
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json();
        setOutput(data.rates[toCurrency]);
      }

      fetchConverter(amount);
    },
    [amount, fromCurrency, toCurrency]
  );

  return (
    <div>
      <input
        onChange={(e) => setAmount(Number(e.target.value).toFixed(2))}
        type="text"
      />
      <select onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={(e) => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
