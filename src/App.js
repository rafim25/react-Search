import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [cryptodata, setCryptoData] = useState([]);
  const [searchText, setSearchText] = useState('');

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }
  let timer;
  let called;
  function handleUserIntre() {
    called = true;
    if (called) {
      clearTimeout(timer);
      timer = setTimeout(callingApi, 2000);
    } else {
      timer = setTimeout(callingApi, 2000);
    }
  }

  function callingApi() {
    const append = searchText ? `&query=${searchText}` : '';
    fetch(
      `https://www.coinbase.com/api/v2/assets/search?base=INR&country=IN${append}`
    ).then((response) => {
      response.json().then((json) => {
        setCryptoData(json.data);
      });
    });
  }
  useEffect(() => {
    handleUserIntre();
  }, [searchText]);
  function renderRows() {
    const rows = cryptodata.map((item) => {
      const {
        name,
        symbol,
        percent_change: percent,
        latest_price: {
          amount: { amount: money },
        },
      } = item;

      return (
        <tr key={symbol}>
          <td>{name}</td>
          <td>{symbol}</td>
          <td>{percent}</td>
          <td>{money}</td>
        </tr>
      );
    });

    return rows;
  }

  return (
    <div>
      <lable>Please Enter Search Text </lable>
      <input type="text" value={searchText} onChange={handleSearchText} />
      <table>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Price Change</th>
        </tr>
        {renderRows()}
      </table>
    </div>
  );
}

//Name,Symbol,price,priceChange
