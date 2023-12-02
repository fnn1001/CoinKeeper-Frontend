import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Invest.css'; // Ensure this path is correct for your CSS file

const Invest = () => {
  const [userID, setUserID] = useState('');
  const [userInvestments, setUserInvestments] = useState([]);
  const [currency, setCurrency] = useState('bitcoin');
  const [purchaseDate, setPurchaseDate] = useState('2022-02-22');
  const [purchaseAmount, setPurchaseAmount] = useState('1');
  const [profitLossPercentage, setProfitLossPercentage] = useState(null);
  const [investmentMessage, setInvestmentMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserID = async () => {
      const userIdString = localStorage.getItem('userInfo');
      if (userIdString) {
        const userIdObject = JSON.parse(userIdString);
        setUserID(userIdObject._id);
      }
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    if (userID) {
      fetchUserInvestments();
    }
  }, [userID]);

  useEffect(() => {
    if (currency && purchaseDate) {
      fetchData();
    }
  }, [currency, purchaseDate]);


  const fetchUserInvestments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/invest/user/${userID}`);
      const investmentsWithCurrentPrice = await Promise.all(response.data.map(async (investment) => {
        const currentDateResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${investment.Coin}`);
        console.log("Price now:", currentDateResponse.data.market_data.current_price.usd);
        return {
          ...investment,
          priceNow: currentDateResponse.data.market_data.current_price.usd,
        };
      }));

      setUserInvestments(investmentsWithCurrentPrice);
    } catch (error) {
      console.error('Error fetching user investments:', error);
      setError(error.message || 'Error fetching user investments');
    }
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  const fetchData = async () => {
    try {
      const formattedDate = formatDate(purchaseDate);

      const purchaseDateResponse = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${currency}/history?date=${formattedDate}`
      );

      const currentDateResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${currency}`);

      const profitLossData = calculateProfitLoss(purchaseDateResponse.data, currentDateResponse.data);

      if (profitLossData && profitLossData.purchasePrice !== undefined) {
        return profitLossData.purchasePrice;
      } else {
        throw new Error("Unable to fetch purchase price");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Error fetching data');
      return null;
    }
  };





  const calculateProfitLoss = (purchaseData, currentData) => {
    if (purchaseData && currentData &&
      purchaseData.market_data && purchaseData.market_data.current_price &&
      currentData.market_data && currentData.market_data.current_price) {
      const purchasePrice = purchaseData.market_data.current_price.usd;
      const currentPrice = currentData.market_data.current_price.usd;
      const purchaseAmountFloat = parseFloat(purchaseAmount);

      if (!isNaN(purchaseAmountFloat)) {
        const totalPurchasePrice = purchaseAmountFloat * purchasePrice;
        const profitLoss = ((currentPrice - purchasePrice) / purchasePrice) * 100 * purchaseAmountFloat;

        setProfitLossPercentage(profitLoss.toFixed(2));
        setInvestmentMessage(`Your investment of $${totalPurchasePrice.toFixed(2)} has now turned into $${(purchaseAmountFloat * currentPrice).toFixed(2)}`);

        return { purchasePrice };
      } else {
        setProfitLossPercentage(null);
        setInvestmentMessage('');
        return { purchasePrice: null };
      }
    } else {
      setProfitLossPercentage(null);
      setInvestmentMessage('');
      return { purchasePrice: null };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const purchasePriceData = await fetchData();

    if (purchasePriceData !== null) {
      const payload = {
        userId: userID,
        Coin: currency,
        date: purchaseDate,
        amount: Number(purchaseAmount),
        purchasePrice: Number(purchasePriceData)
      };

      console.log("Sending payload:", payload); // Log the payload

      try {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/invest`, payload);
        fetchUserInvestments(); // Refresh user investments after submission
      } catch (error) {
        console.error('Error saving investment:', error);
        setError('Error saving investment');
      }
    } else {
      console.error('Error: Unable to fetch purchase price');
      setError('Error: Unable to fetch purchase price');
    }
  };



  console.log("userInvestments:", userInvestments); // Log user investments

  const formatedDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const profitorloss = (profitLossPercentage) => {
    if (profitLossPercentage > 0) {
      return <span style={{ color: 'green' }}>{profitLossPercentage}%</span>;
    } else if (profitLossPercentage < 0) {
      return <span style={{ color: 'red' }}>{profitLossPercentage}%</span>;
    } else {
      return <span>{profitLossPercentage}%</span>;
    }
  }


  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="currency" className="form-label">Select Currency:</label>
              <select id="currency" className="form-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="litecoin">Litecoin (LTC)</option>
                <option value="ripple">Ripple (XRP)</option>
                <option value="dogecoin">Dogecoin (DOGE)</option>
                <option value="cardano">Cardano (ADA)</option>
                <option value="polkadot">Polkadot (DOT)</option>
                <option value="chainlink">Chainlink (LINK)</option>
                <option value="stellar">Stellar (XLM)</option>
                <option value="uniswap">Uniswap (UNI)</option>
                <option value="cosmos">Cosmos (ATOM)</option>
                <option value="aave">Aave (AAVE)</option>
                <option value="solana">Solana (SOL)</option>
                <option value="monero">Monero (XMR)</option>
                <option value="eos">EOS (EOS)</option>
                <option value="nem">NEM (XEM)</option>

                {/* Add more cryptocurrencies as needed */}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="purchaseDate" className="form-label">Purchase Date:</label>
              <input type="date" className="form-control" id="purchaseDate" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="purchaseAmount" className="form-label">Purchase Amount:</label>
              <input type="number" className="form-control" id="purchaseAmount" value={purchaseAmount} onChange={(e) => setPurchaseAmount(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary">Add Investment</button>
          </form>

          {investmentMessage && (
            <div className="mt-3 alert alert-success" style={{ backgroundColor: '#d4edda', borderRadius: '5px', color: '#155724' }}>
              <h4 className="alert-heading">Investment Update:</h4>
              <p>{investmentMessage}</p>
            </div>
          )}
        </div>
      </div>

      <div className="user-investments mt-4">
        <h2>Your Investments</h2>
        {userInvestments.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Purchase Date</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Purchase Price</th>
                <th>Current Price</th>
                <th>Profit/Loss %</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {userInvestments.map((investment, index) => (
                <tr key={index}>
                  <td>{formatedDate(investment.date)}</td>
                  <td>{investment.Coin.charAt(0).toUpperCase() + investment.Coin.slice(1)}</td>
                  <td>{investment.amount}</td>
                  <td>${investment.purchasePrice.toFixed(2)}</td>
                  <td>${investment.priceNow}</td>
                  <td>{(((investment.priceNow - investment.purchasePrice) / investment.purchasePrice) * 100).toFixed(0)}%</td>
                  <td>${(investment.amount * investment.priceNow).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
          : (
            <p>No investments to display.</p>
          )}
      </div>
      <div>
        <h1 style={{ fontSize: '3rem' }}>Total Balance:</h1>
        <p style={{ fontSize: '3rem' }}>${userInvestments.reduce((total, investment) => total + investment.amount * investment.priceNow, 0).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Invest;
