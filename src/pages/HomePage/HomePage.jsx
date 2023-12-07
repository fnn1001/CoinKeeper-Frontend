// STYLES
import '../HomePage/HomePage.css'

// LOGO AND IMAGERY
import image1 from "../../images/budget.jpg"
import image2 from "../../images/dollars.jpg"
import image3 from "../../images/dollar-bills.png"
import image4 from "../../images/app-finance-tracking.jpg"

import logo1 from "../../images/piechart-logo.png"
import logo2 from "../../images/dollar-logo.png"
import logo3 from "../../images/calculator-logo.png"
import proto from "../../images/mobile-proto.png"

// DEPENDENCIES
import React, {useContext}from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const { isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        if (!isLoggedIn) {
            navigate('/signup');
        }
        else {
            navigate('/budgets');
        }

    }
    const handleStartNowClick = () => {
        if (!isLoggedIn) {
            navigate('/signup');
        }
        else {
            navigate('/invest');


    };
}


    return (
        <div className="page">
            <div className='hero-section'>

                <div class="hero-background"> </div>
                    <div class="hero-content">
                        <h1 className='hero-header'> One coin at a time. </h1>
                        <p className='hero-subheader'> At CoinKeeper, we believe everyone deserves financial freedom. Master the art of money management, effortlessly track your expenses, and watch your savings grow. CoinKeeper — where smart budgeting meets financial freedom, one coin at a time.  </p>
                        <Link to="/signup">
                        <button id='landing-page-btn' onClick={handleGetStartedClick}>Get started for free</button>
                        </Link>
                    </div>
                    <img src={proto} alt="mobile prototype" id="mobile-proto"/>

            </div>

            <div className='sidekick-section'>

                <h1 className='sidekick-header'> Personal finance made easy </h1>
                <div className='sidekick-subitems'> 
                    <div className='single-item'> 
                        <img src={logo1} className="homepage-logo"/>
                        <h3> Track your expenses </h3>
                        <p className="features"> Add your recurring bills, your shopping sprees and more. </p>
                    </div>
                    <div className='single-item'> 
                        <img src={logo2} className="homepage-logo"/>
                        <h3> Analyze your cash flow </h3>
                        <p className="features"> Discover your money weaknesses and bet on your financial strenghts. </p>
                    </div>
                    <div className='single-item'> 
                        <img src={logo3} className="homepage-logo"/>
                        <h3> Prepare your investments </h3>
                        <p className="features">  Watch your favourite stocks, save for specific goals.</p>
                    </div>
                </div>
            </div>

            <img src={image3} id="break-image" alt="dollar bills"/>
            
            <div className='stats'>
                <h3> Did you know? </h3>
                <ul> 
                    <li> 30% of Americans said they’re either struggling or in crisis with their personal finances.* </li>
                    <li> The average debt per person keeps on increasing steadily over the years: in the fourth quarter of 2018, the average total debt per person was $50,090 compared to $55,480 in 2021 and $59,580 in 2022.*</li>
                </ul>

                <div className='stats-call-to-action'> 
                    <h2> Start owning your budget now. Use CoinKeeper. </h2>
                    <Link to="/signup">
                    <button id='start-now-btn' onClick={handleStartNowClick}>Start now</button>
                    </Link>
                </div>
            </div>

                <div className="image-container">
                    <img src={image1} alt="Image 1" className="carousel-image" />
                    <img src={image2} alt="Image 2" className="carousel-image" />
                    <img src={image4} alt="Image 3" className="carousel-image" />
                </div>

                <p className='credits'>  This is a full stack project developed by Feras & Lea for Ironhack. </p>

                <footer>
                    2023 data obtained from <a href="https://www.ramseysolutions.com/budgeting/state-of-personal-finance"> Ramsay Solutions</a>.
                </footer>
        </div>
    )
}

export default HomePage