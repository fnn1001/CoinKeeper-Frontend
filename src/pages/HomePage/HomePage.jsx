// STYLES
import '../HomePage/HomePage.css'

// LOGO AND IMAGERY
import image1 from "../../images/budget.jpg"
import image2 from "../../images/dollars.jpg"
import image3 from "../../images/wallet.jpg"
import logo1 from "../../images/piechart-logo.png"
import logo2 from "../../images/dollar-logo.png"
import logo3 from "../../images/calculator-logo.png"



const HomePage = () => {

    return (
        <div>
            <div className='hero-section'>

                <div class="hero-background"> </div>
                    <div class="hero-content">
                        <h1 className='hero-header'> One coin at a time. </h1>
                        <p className='hero-subheader'> At CoinKeeper, we believe everyone deserves financial freedom. Master the art of money management, effortlessly track your expenses, and watch your savings grow. CoinKeeper — where smart budgeting meets financial freedom, one coin at a time.  </p>
                        <button id='landing-page-btn'> Get started for free</button>
                    </div>
            </div>

            <div className='sidekick-section'>

                <h3 className='sidekick-header'> Personal finance made easy </h3>
                <div className='sidekick-subitems'> 
                    <div className='single-item'> 
                        <img src={logo1} className="homepage-logo"/>
                        <h3> Track your expenses </h3>
                        <p> Add your recurring bills, your shopping sprees and more. </p>
                    </div>
                    <div className='single-item'> 
                        <img src={logo2} className="homepage-logo"/>
                        <h3> Analyze your cash flow </h3>
                        <p> Discover your money weaknesses and bet on your financial strenghts. </p>
                    </div>
                    <div className='single-item'> 
                        <img src={logo3} className="homepage-logo"/>
                        <h3> Prepare your investments </h3>
                        <p> Watch your favourite stocks, save for specific goals.</p>
                    </div>
                </div>
            </div>
            
            <div className='stats'>
                <ul> 
                    <li> 30% of Americans said they’re either struggling or in crisis with their personal finances.* </li>
                    <li> The average debt in America is $59,580 across mortgages, auto loans, student loans, and credit cards.* </li>
                    <li> The average debt per person keeps on increasing steadily over the years: in the fourth quarter of 2018, the average total debt per person was $50,090 compared to $55,480 in 2021 and $59,580 in 2022.*</li>
                    <li> Debt tends to peak somewhere around middle age. As a whole, this suggests that Americans tend to pay off debt going into retirement and tend to keep debt balances low in retirement, especially people over age 70. For those under age 30, the largest source of debt is mortgages.*</li>
                </ul>

                <div className='stats-call-to-action'> 
                    <p id="stats-conclusion"> Understanding and actively managing personal spending is crucial for maintaining financial well-being and preventing the onset of challenging debt situations. By cultivating awareness of expenditures, individuals can gain insights into their financial habits, identify areas for potential savings, and make informed decisions about budgetary allocations. This proactive approach empowers individuals to establish a sustainable and responsible financial framework, mitigating the risk of accumulating excessive debt. Furthermore, financial consciousness fosters a sense of control and allows for the creation of realistic savings and debt repayment plans. Ultimately, being mindful of one's spending habits contributes to long-term financial stability, enabling individuals to navigate economic uncertainties with greater confidence and resilience.</p>                
                    <h2> Start owning your budget now. Use CoinKeeper. </h2>
                    <button id='start-now-btn'> Start now </button>
                </div>
            </div>

                <div className="image-container">
                    <img src={image1} alt="Image 1" className="carousel-image" />
                    <img src={image2} alt="Image 2" className="carousel-image" />
                    <img src={image3} alt="Image 3" className="carousel-image" />
                </div>

                <p className='credits'>  This is a full stack project developed by Feras & Lea for Ironhack. </p>

                <footer>
                    2023 data obtained from <a href="https://www.ramseysolutions.com/budgeting/state-of-personal-finance"> Ramsay Solutions</a>.
                </footer>
        </div>
    )
}

export default HomePage