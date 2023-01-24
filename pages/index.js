import Head from 'next/head'
import axios from 'axios'
import { useState } from 'react'
import Lottie from "lottie-react"
import LoadingAnimation from '../public/loading.json'


export default function Home() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  
  const [feelsLike, setFeelsLike] = useState();
  const [temp, setTemp] = useState();
  const [gust, setGust] = useState(null);

  const [openResult, setOpenResult] = useState('none')

  var apiKey = "3185e01f5a0c36ccf41b0574a99258a4";
  var lang = "kr";
  var units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}&exclude={hourly,daily}`;
  

  const searchLocation = (event) => {
    if (event.key === "Enter"){
      axios.get(url)
        .then((response) =>{
          //clear the input text
          console.clear();
          setData(response.data)
          console.log(response.data)
          setWeather(response.data.weather)
          setTemp(response.data.main.temp)
          setFeelsLike(response.data.main.feels_like)
          setGust(response.data.wind_gust)
          setErrorMessage("")
        }).catch(err => {
          console.log(err)
          setErrorMessage("Please set another location")
          setData({})
          setWeather()
        })
        //once you hit enter, it clears the location input
        setLocation('')
        setOpenResult('block')
    }
  }


  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=VT323&display=swap" rel="stylesheet"></link>
      </Head>
      <div className='body'>
        <Lottie
            style={{width:100, height:100, marginBottom: -20}} 
            animationData={LoadingAnimation} 
            loop={true} 
        >
        </Lottie>
        <h1>How's the weather like?</h1>
          {errorMessage}
          <input 
            value={location}
            onChange={event => setLocation(event.target.value)}
            placeholder="Enter location"
            onKeyDown={searchLocation}
            type="text"
          />
        <div style={{display: `${openResult}`}}>

          <h3>
            {data.name} is 
            {
              weather && weather.map((w, index)=>{
                return(
                <span key={index} className='result'>
                  {w.main}/{w.description}
                </span>
                )
              })
            }
          </h3>
          <h3>Temperature: <span className='result'>{temp}°C</span></h3>
          <h3>Feels Like: <span className='result'>{feelsLike}°C</span></h3>
          <h3>Wind Gust: <span className='result'>{gust}m/s</span></h3>
        </div>
      </div>
    </>
  )
}
