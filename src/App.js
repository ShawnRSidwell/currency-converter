import { useEffect, useState } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);

  const [converted, setConverted] = useState(0);

  useEffect(
    function () {
      async function convert() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
          );
          if (!res.ok) throw new Error("Unable to fetch converter.");
          const data = await res.json();
          if (data.error) throw new Error("Unable to parse data");
          setConverted(data.rates[toCurrency]);
        } catch (error) {
          alert(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (toCurrency === fromCurrency) return setConverted(amount);
      convert(amount);
    },
    [amount, fromCurrency, toCurrency]
  );

  return (
    <div>
      <input
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        type="text"
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? "Calculating....." : `${converted} ${toCurrency}`}</p>
    </div>
  );
}
