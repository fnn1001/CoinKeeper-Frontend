import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Invest.css'; // Ensure this path is correct for your CSS file

const Invest = () => {
  const [userID, setUserID] = useState('');
  const [userInvestments, setUserInvestments] = useState([]);
  const [currency, setCurrency] = useState('bitcoin');
  const [purchaseDate, setPurchaseDate] = useState('2020-02-02');
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
      setUserInvestments(response.data);
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

      calculateProfitLoss(purchaseDateResponse.data, currentDateResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Error fetching data');
    }
  };

  const calculateProfitLoss = (purchaseData, currentData) => {
    if (
      purchaseData &&
      purchaseData.market_data &&
      purchaseData.market_data.current_price &&
      currentData &&
      currentData.market_data &&
      currentData.market_data.current_price
    ) {
      const purchasePrice = purchaseData.market_data.current_price.usd;
      const currentPrice = currentData.market_data.current_price.usd;

      if (!isNaN(parseFloat(purchaseAmount))) {
        const purchaseAmountFloat = parseFloat(purchaseAmount);
        const totalPurchasePrice = purchaseAmountFloat * purchasePrice;
        if (!isNaN(totalPurchasePrice) && !isNaN(currentPrice)) {
          const profitLoss = ((currentPrice - purchasePrice) / purchasePrice) * 100 * purchaseAmountFloat;

          setProfitLossPercentage(profitLoss.toFixed(2));

          setInvestmentMessage(
            `Your investment of $${totalPurchasePrice.toFixed(2)} has now turned into $${(
              purchaseAmountFloat * currentPrice
            ).toFixed(2)}`
          );
        } else {
          setProfitLossPercentage(null);
          setInvestmentMessage('');
        }
      } else {
        setProfitLossPercentage(null);
        setInvestmentMessage('');
      }
    } else {
      setProfitLossPercentage(null);
      setInvestmentMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/invest`, {
        userId: userID,
        currency,
        purchaseDate,
        purchaseAmount,
      });

      fetchUserInvestments(); // Refresh user investments after submission
    } catch (error) {
      console.error('Error saving investment:', error);
      setError('Error saving investment');
    }
  };

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
          <ul>
            {userInvestments.map((investment, index) => (
              <li key={index}>
                {investment.currency} - Amount: {investment.amount} - Purchase Date: {investment.purchaseDate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No investments to display.</p>
        )}
      </div>
    </div>
  );
};

export default Invest;
