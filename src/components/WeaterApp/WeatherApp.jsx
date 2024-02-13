import './WeaterApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import sun_bgc from '../Assets/sunny.gif';
import snow_bgc from '../Assets/snow.gif';
import rain_bgc from '../Assets/rain.gif';
import cloud_bgc from '../Assets/cloud.gif';
import drizzle_bgc from '../Assets/drizzle.gif';


const WeatherApp = () => {

    let api_key = 'f8cf14c8ed38868411e911ca04ecf0e1';
    let geo_key = 'AIzaSyCzKnN1VGPeknC0Qs6Fpt0Ie-nQ4P-_6Z8';
    const [wicon, setWicon] = useState(cloud_icon);
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

             if (result.weather[0].icon === '01d' || result.weather[0].icon === '01n') {
                 setWicon(clear_icon);
                 setBackground(sun_bgc);
        } else if (result.weather[0].icon === '02d' || result.weather[0].icon === '02n') {
                 setWicon(cloud_icon);
                 setBackground(cloud_bgc);
        } else if (result.weather[0].icon === '03d' || result.weather[0].icon === '03n') {
                 setWicon(drizzle_icon);
                 setBackground(drizzle_bgc);
        } else if (result.weather[0].icon === '04d' || result.weather[0].icon === '04n') {
                 setWicon(drizzle_icon);
                 setBackground(drizzle_bgc);
        } else if (result.weather[0].icon === '09d' || result.weather[0].icon === '09n') {
                 setWicon(rain_icon);
                 setBackground(rain_bgc);
        } else if (result.weather[0].icon === '10d' || result.weather[0].icon === '10n') {
                 setWicon(rain_icon);
                 setBackground(rain_bgc);
        } else if (result.weather[0].icon === '13d' || result.weather[0].icon === '13n') {
                 setWicon(snow_icon);
                 setBackground(snow_bgc);
        } else {
                 setWicon(clear_icon);
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
                <div className='container' style={{background:`center / cover no-repeat url(${background})`, }}>
                    <form className="top__bar" onSubmit={(e) => {
                        e.preventDefault();
                        search(e);
}} >
 
              <input type="text" className="city__input" value={city} placeholder='Search' onChange={handleChange} />
              <button type='submit' className="search__icon">
                  <img src={search_icon} alt="search icon" />
              </button>
              
          </form>
          <div className="weather__img">
              <img src={wicon} alt=" cloud icon" />
          </div>
          <div className="weather__temp">{Math.floor(weather.main.temp)} °c
          </div>
                    <div className="weather__location">{weather.name}</div>
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
