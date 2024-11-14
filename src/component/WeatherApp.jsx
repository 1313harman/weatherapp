import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; 
import { ClipLoader } from 'react-spinners'; 

const api = {
  key: '86984c0d9f1d42af945100931241009',
  base: 'http://api.weatherapi.com/v1/',
};

function WeatherApp() {
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [isShowmore,setShowMore] = useState(false)

  const handleSearch = () => {
    setLoading(true);
    fetch(`${api.base}current.json?key=${api.key}&q=${search}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(true);
          setIsSearch(false);
        } else {
          console.log(result)
          setWeather(result);
          setIsSearch(true);
          setError(false);
        }
        setLoading(false); // Stop loading after response
      })
      .catch((e) => {
        console.log('Error fetching API data', e);
        setIsSearch(false);
        setError(true);
        setLoading(false); // Stop loading after error
      });
  };
  const handleShowMore= () =>{
    setShowMore(true)
    setShowLess(false)
  }
  const handleShowLess= () =>{
    setShowMore(false)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white">
      <div className="w-full max-w-md p-1">
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md text-gray-700 placeholder-gray-500"
            placeholder="Search for city..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition duration-300"
          >
            <FaSearch />
          </button>
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="my-4">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}

      {/* Weather Data Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-5 mt-6 text-gray-700">
        {error ? (
          <div className="text-center text-red-500">
            <h1 className="text-2xl font-bold">City Not Found</h1>
            <p>Please try a different city name</p>
          </div>
        ) : isSearch && !loading ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900">
              {weather.location.name}, {weather.location.region}, {weather.location.country}
            </h2>
            <div className="flex justify-between mt-4">
              <div className="text-left">
                <p className="text-xl">
                  Temperature: {weather.current.temp_c}°C
                </p>
                <p className="text-xl">
                  Temperature: {weather.current.temp_f}°F
                </p>
                <p className="text-xl">
                  Humidity: {weather.current.humidity}
                </p>
                <button onClick={isShowmore ? handleShowLess:handleShowMore} className='text-blue-800 underline text-sm'> {isShowmore ? "Show Less" :"Show More"}</button>
                {isShowmore ? (
                  <>
                    <p className="text-xl">
                      Wind Direction: {weather.current.wind_dir}
                    </p>
                    <p className="text-xl">
                      Wind Speed: {weather.current.wind_kph} kph
                    </p>
                    <p className="text-xl">
                      Wind Chill: {weather.current.windchill_c} 
                    </p>
                  </>
                ) : (
                      !isShowmore === true && (
                          <>
                            
                          </>
                      )
                    )}
              </div>
              <div>
                <img
                  src={weather.current.condition.icon}
                  className="w-20 h-20"
                />
                <p>{weather.current.condition.text}</p>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-xl text-gray-400 text-center">Enter a city to get weather data.</h1>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
