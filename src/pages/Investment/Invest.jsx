import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Investment/Invest.css"

const Invest = () => {
  const [currency, setCurrency] = useState('bitcoin');
  const [purchaseDate, setPurchaseDate] = useState('2020-02-02');
  const [purchaseAmount, setPurchaseAmount] = useState('1');
  const [profitLossPercentage, setProfitLossPercentage] = useState(null);
  const [investmentMessage, setInvestmentMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currency, purchaseDate]);

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const fetchData = async () => {
    try {
      // Format the date before making the API request
      const formattedDate = formatDate(purchaseDate);

      // Fetching data for the purchase date
      const purchaseDateResponse = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${currency}/history?date=${formattedDate}`
      );

      console.log('Purchase Date API Response:', purchaseDateResponse.data);

      // Fetching data for the current date
      const currentDateResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${currency}`);

      console.log('Current Date API Response:', currentDateResponse.data);

      // Calculating profit/loss
      calculateProfitLoss(purchaseDateResponse.data, currentDateResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Error fetching data');
    }
  };

  const calculateProfitLoss = (purchaseData, currentData) => {
    try {
      console.log('Calculating profit/loss...');
      console.log('Currency:', currency);
      console.log('Purchase Date:', purchaseDate);
      console.log('Purchase Amount:', purchaseAmount);

      // Check if the necessary data is available in the API responses
      if (
        purchaseData &&
        purchaseData.market_data &&
        purchaseData.market_data.current_price &&
        currentData &&
        currentData.market_data &&
        currentData.market_data.current_price
      ) {
        // Extracting relevant data from the API responses
        const purchasePrice = purchaseData.market_data.current_price.usd;
        const currentPrice = currentData.market_data.current_price.usd;

        console.log('Purchase Price on Purchase Date:', purchasePrice);
        console.log('Current Selling Price:', currentPrice);

        if (!isNaN(parseFloat(purchaseAmount))) {
          const purchaseAmountFloat = parseFloat(purchaseAmount);
          const totalPurchasePrice = purchaseAmountFloat * purchasePrice;

          console.log('Total Purchase Price:', totalPurchasePrice.toFixed(0));

          if (!isNaN(totalPurchasePrice) && !isNaN(currentPrice)) {
            const profitLoss = ((currentPrice - totalPurchasePrice) / totalPurchasePrice) * 100;
            console.log('Profit/Loss Percentage:', profitLoss.toFixed(0));

            setProfitLossPercentage(profitLoss.toFixed(0));

            // Set the investment message
            setInvestmentMessage(`Your investment of $${totalPurchasePrice.toFixed(0)} has now turned into $${(purchaseAmountFloat * currentPrice).toFixed(0)}`);
          } else {
            console.log('Invalid purchase or current price.');
            setProfitLossPercentage(null);
            setInvestmentMessage('');
          }
        } else {
          console.log('Invalid purchase amount.');
          setProfitLossPercentage(null);
          setInvestmentMessage('');
        }
      } else {
        console.log('Data structure from API is not as expected.');
        setProfitLossPercentage(null);
        setInvestmentMessage('');
      }
    } catch (error) {
      console.error('Error calculating profit/loss:', error);
      setError('Error calculating profit/loss');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="currency" className="form-label">Select Currency:</label>
            <select
              id="currency"
              className="form-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="bitcoin">Bitcoin (BTC)</option>
              <option value="ethereum">Ethereum (ETH)</option>
              {/* Add more cryptocurrencies as needed */}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="purchaseDate" className="form-label">Purchase Date:</label>
            <input
              type="date"
              className="form-control"
              id="purchaseDate"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="purchaseAmount" className="form-label">Purchase Amount:</label>
            <input
              type="number"
              className="form-control"
              id="purchaseAmount"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
            />
          </div>
          <button id="calculate-button" onClick={fetchData}>
            Calculate Profit/Loss
          </button>

          {investmentMessage && (
            <div className="mt-3" style={{ backgroundColor: '#d4edda', padding: '10px', borderRadius: '5px', color: '#155724' }}>
              <h4>Investment Update:</h4>
              <p>{investmentMessage} </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invest;
