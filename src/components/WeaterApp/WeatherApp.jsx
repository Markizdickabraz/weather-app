import './WeaterApp.css';
import search_icon from '../Assets/search.png';
// import clear_icon from '../Assets/clear.png';
// import cloud_icon from '../Assets/cloud.png';
// import drizzle_icon from '../Assets/drizzle.png';
// import rain_icon from '../Assets/rain.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import sun_bgc from '../Assets/sunny.gif';
import snow_bgc from '../Assets/snow.gif';
import cloud_bgc from '../Assets/cloud.gif';
import drizzle_bgc from '../Assets/drizzle.gif';
// import clear_moon from '../Assets/clear-moon.png';
// import cloud_moon from '../Assets/cloud-moon.png';
import day_drizzle from '../Assets/day-drizzle.gif';
import day_rain from '../Assets/day-rain.gif';
// import lightning_day from '../Assets/l-day.png';
// import lightning_moon from '../Assets/l-night.png';
import lightning_bgc from '../Assets/lig.gif';
import mist_bgc from '../Assets/mist.gif';
import night_clear_bgc from '../Assets/night-clear.gif';
import night_cloud_bgc from '../Assets/night-cloud.gif';
import night_rain_bgc from '../Assets/night-rain.gif';
// import rain_moon from '../Assets/rain-moon.png';
// import snow_day from '../Assets/s-day.png';
// import snow_night from '../Assets/s-night.png';

const WeatherApp = () => {

    let api_key = 'f8cf14c8ed38868411e911ca04ecf0e1';
    let geo_key = 'AIzaSyCzKnN1VGPeknC0Qs6Fpt0Ie-nQ4P-_6Z8';
    // const [wicon, setWicon] = useState(cloud_icon);
    const [weather, setWeather] = useState([]);
    const [background, setBackground] = useState(sun_bgc);
    const [city, setCity] = useState('');
    const [locationCity, setLocationCity] = useState('');

    const handleChange = (e) => {
        setCity(e.target.value);
    };
    
    const fetchCoordinate = async () => {
            navigator.geolocation.getCurrentPosition(async(position) => {
            const { latitude, longitude } = position.coords;
                try {
                    const fetchCityResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${geo_key}`);
                    const fetchCityData = await fetchCityResponse.json();
                    const city = await fetchCityData.results[0].address_components.find(
                    (component) => component.types.includes("locality")
                    ).long_name;
                    setLocationCity(city);
                    setCity(city);
                } catch (error) {
                    toast.error(error);
                }
             });
    };
    
    const fetchWeather = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            let result = await response.json();
            setWeather(result);
            const weatherIcon = result.weather[0].icon;

            if (weatherIcon === '01d') {
                // setWicon(clear_icon);
                setBackground(sun_bgc);
            } else if (weatherIcon === '01n') {
                // setWicon(clear_moon);
                setBackground(night_clear_bgc);
            } else if (weatherIcon === '02d') {
                // setWicon(cloud_icon);
                setBackground(cloud_bgc);
            } else if (weatherIcon === '02n') {
                // setWicon(cloud_moon);
                setBackground(night_cloud_bgc);
            } else if (weatherIcon === '03d') {
                // setWicon(cloud_icon);
                setBackground(cloud_bgc);
            } else if (weatherIcon === '03n') {
                // setWicon(cloud_moon);
                setBackground(night_cloud_bgc);
            } else if (weatherIcon === '04d') {
                // setWicon(drizzle_icon);
                setBackground(day_drizzle);
            } else if (weatherIcon === '04n') {
                // setWicon(rain_moon);
                setBackground(drizzle_bgc);
            } else if (weatherIcon === '09d') {
                // setWicon(rain_icon);
                setBackground(day_rain);
            } else if (weatherIcon === '09n') { 
                //  setWicon(rain_moon);
                setBackground(night_rain_bgc);
            } else if (weatherIcon === '10d') {
                // setWicon(rain_icon);
                setBackground(day_rain);
            } else if (weatherIcon === '10n') { 
                //  setWicon(rain_moon);
                setBackground(night_rain_bgc);
            } else if (weatherIcon === '11d') {
                // setWicon(lightning_day);
                setBackground(lightning_bgc);
            } else if (weatherIcon === '11n') { 
                //  setWicon(lightning_moon);
                setBackground(lightning_bgc);
            } else if (weatherIcon === '13d') {
                // setWicon(snow_day);
                setBackground(snow_bgc);
            } else if (weatherIcon === '13n') { 
                //  setWicon(snow_night);
                setBackground(snow_bgc);
            } else if (weatherIcon === '50d') {
                // setWicon(clear_icon);
                setBackground(mist_bgc);
            } else if (weatherIcon === '50n') { 
                //  setWicon(clear_moon);
                setBackground(mist_bgc);
            } else {
                //  setWicon(clear_icon);
                 setBackground(sun_bgc);
            }
        } catch (error) {
            if (error.message === 'Nothing to geocode') {
                toast.error('Nothing to geocode');
            }

            toast.error(error.message);
        }
    };
    
 useEffect(() => {
    const fetchData = async () => {
        await fetchCoordinate();
    };
     fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
    if (city) {
        fetchWeather(city);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [locationCity]);
    
    const search = async (city) => {
        fetchWeather(city);
};
    
    return (
        <>
            {weather.length === 0 ? <div className='container' style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                <RotatingLines
                                    visible={true}
                                    height="96"
                                    width="96"
                                    color="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    ariaLabel="rotating-lines-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
        />
        </div> :
                <div className='container' style={{background:`linear-gradient(
        180deg,
        rgba(47, 48, 58, 0.4) 0%,
        rgba(47, 48, 58, 0) 100%
      ),center / cover no-repeat url(${background})`, }}>
                    <form className="top__bar" onSubmit={(e) => {
                        e.preventDefault();
                        search(e);
}} >
 
              <input type="text" className="city__input" value={city} placeholder='Search' onChange={handleChange} />
              <button type='submit' className="search__icon">
                  <img src={search_icon} alt="search icon" />
              </button>
              
          </form>
          {/* <div className="weather__img">
              <img src={wicon} alt=" cloud icon" />
                    </div> */}
                    <div className="weather__location">{weather.name}</div>
          <div className="weather__temp">{Math.floor(weather.main.temp)} °c
          </div>
                    <h3 className='weather__title'>{weather.weather[0].main}</h3>
          <div className="data__container">
              <div className="element">
                  <img src={humidity_icon} alt="humidity icon" className="icon" />
                  <div className="data">
                      <div className="humidity__percent">{weather.main.humidity} %</div>
                      <div className="text">Humidity</div>
                  </div>
              </div>

                <div className="element">
                  <img src={wind_icon} alt="wind icon" className="icon" />
                  <div className="data">
                      <div className="wind__rate">{Math.floor(weather.wind.speed)} km/h</div>
                      <div className="text">Wind Speed</div>
                  </div>
              </div>
          </div>
            </div>
            }
            </>
  )
}

export default WeatherApp;
