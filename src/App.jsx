import React, { useState } from "react";
// import { defineConfig } from "vite";
import axios  from "axios";
// import logo from './logo.svg'
import './App.css'
import { render } from "react-dom";

// const API_KEY = "50098fc9a24b002d1d05f2c6b2888260";



const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  
  const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
  
  const searchLocation = (event) => {
    if (event.key==='Enter') {
      axios.get(url).
      then((response)=>{
        setData(response.data);
        
        console.log(response.data)
      })
      setLocation('')
      
    }
  }
  return (
    <div className="app">
      <div className="search">
      <input
      // onClick={"this.value=''"}
      value={location} 
      type="text"
      placeholder="Enter Location"
      onKeyPress={searchLocation}
      onChange={(event) =>setLocation(event.target.value)} />
      
      </div>
       <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p></div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}&#8451;</h1>:null}
        </div>
        <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p>:null}
        </div>
        {data.name !== undefined &&
                <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}&#8451;</p>:null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity}%</p>:null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed.toFixed()}MPH</p>:null}
            <p>Wind Speed</p>
          </div>
        </div>
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
