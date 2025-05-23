import React, { useState, useEffect } from "react";
import coldImage from "../../assets/images/cold.png";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({
    city: "Ha Noi",
    country: "Viet Nam",
    time: new Date().toLocaleString("vi"),
    temperature: 23,
    description: "Clouds",
    visibility: "1000 (m)",
    windSpeed: "4.14 (m/s)",
    humidity: "73 (%)",
  });
  const [searchValue, setSearchValue] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const updateTime = () => {
    setWeatherData((prev) => ({
      ...prev,
      time: new Date().toLocaleString("vi"),
    }));
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeWeatherUI = async () => {
    if (!searchValue.trim()) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=a61826b4d48fe76b9fe95e09cd8430d4`;
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData({
          city: data.name,
          country: data.sys.country,
          time: new Date().toLocaleString("vi"),
          temperature: (data.main.temp - 273.15).toFixed(),
          description: data.weather[0].main,
          visibility: `${data.visibility} (m)`,
          windSpeed: `${data.wind.speed} (m/s)`,
          humidity: `${data.main.humidity} (%)`,
        });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } catch (error) {
      setIsVisible(false);
    }
  };

  return (
    <div className="flex items-center rounded-lg shadow-md">
      <div className="w-full rounded-lg p-6 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${coldImage})` }}>
        <input type="text"
          className="search w-full p-3 border-none outline-none bg-white/30 rounded-[0_15px_0_15px] shadow-md transition-all duration-300 focus:bg-white/90 focus:rounded-[15px_0_15px_0]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && changeWeatherUI()} />
        <div className={`content text-center text-white mt-5 transition-all duration-400 ${isVisible ? "" : "invisible opacity-0"
          }`}>
          <h1 className="capital text-shadow text-2xl font-bold"
            style={{ textShadow: "2px 2px rgba(0, 0, 0, 0.7)" }}>
            <span className="city">{weatherData.city}</span>
            <span>,</span>
            <span className="country">{weatherData.country}</span>
          </h1>
          <div className="time mt-1 mb-5 text-sm">{weatherData.time}</div>
          <div className="temparature text-6xl font-semibold text-shadow-lg bg-white/40 shadow-lg rounded-xl mx-8 p-5"
            style={{ fontWeight: 600, textShadow: "4px 4px rgba(0, 0, 0, 0.7)", boxShadow: "4px 4px rgba(0, 0, 0, 0.7)" }}>
            <span className="value text-shadow-lg">{weatherData.temperature}</span>
            <sup>o</sup>C
          </div>
          <div className="short-desc text-4xl font-bold text-shadow mt-5 mb-10">
            {weatherData.description}
          </div>
          <div className="more-desc flex flex-row items-center justify-between">
            <div className="visibility flex flex-col items-center justify-center gap-5">
              <i className="fa-regular fa-eye fa-lg"></i>
              <span>{weatherData.visibility}</span>
            </div>
            <div className="speed flex flex-col items-center justify-center gap-5">
              <i className="fa-solid fa-wind fa-lg"></i>
              <span>{weatherData.windSpeed}</span>
            </div>
            <div className="humidity flex flex-col items-center justify-center gap-5">
              <i className="fa-solid fa-cloud-sun fa-lg"></i>
              <span>{weatherData.humidity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;