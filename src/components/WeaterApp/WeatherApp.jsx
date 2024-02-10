import './WeaterApp.css';
import search_icon from '../Assets/search.png';
// import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
// import drizzle_icon from '../Assets/drizzle.png';
// import rain_icon from '../Assets/rain.png';
// import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';


const WeatherApp = () => {

    // let api_key = 'f8cf14c8ed38868411e911ca04ecf0e1';

    const search = () => {
        const element = document.getElementsByClassName('suty__input');
        if (element[0].value === '') {
            return 0;
        }
        
    }


  return (
    <div className='container'>
          <div className="top__bar">
              <input type="text" className="city__input" placeholder='Search' />
              <div className="search__icon">
                  <img src={search_icon} alt="search icon" onClick={()=>{search()}} />
              </div>
          </div>
          <div className="weather__img">
              <img src={ cloud_icon} alt=" cloud icon" />
          </div>
          <div className="weater__temp">24c
          </div>
          <div className="weater__location">London</div>
          <div className="data__container">
              <div className="element">
                  <img src={humidity_icon} alt="humidity icon" className="icon" />
                  <div className="data">
                      <div className="humidity__percent">64%</div>
                      <div className="text">Humidity</div>
                  </div>
              </div>

                <div className="element">
                  <img src={wind_icon} alt="wind icon" className="icon" />
                  <div className="data">
                      <div className="humidity__percent">18 km/h</div>
                      <div className="text">Wind Speed</div>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default WeatherApp;
