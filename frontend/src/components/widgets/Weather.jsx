import React, { useEffect, useState, useRef } from 'react'
import search_icon from '../../assets/search.png'
import humidity_icon from '../../assets/humidity.png'
import wind_icon from '../../assets/wind.png'

const Weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false)

    const search = async (city) => {
        if(city === "") {
            alert ("Enter City Name !");
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const res = await fetch(url);
            const data = await res.json()

            if(!res.ok) {
                alert(data.message);
                return;
            }

            console.log(data);
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: iconUrl
            })
        } catch (error) {
            setWeatherData(false);
            console.log(error)
        }
    }

    useEffect(()=> {
        search("Abidjan");
    }, [])

  return (
    <div className='place-self-center p-[40px] rounded-b-md flex flex-col items-center bg-blue-500'>
       <div className='flex items-center gap-[12px]'>
            <input ref={inputRef} className='h-[50px] border-none outline-none rounded-[40px] pl-[25px] bg-[#ebfffc] text-lg' type="text" placeholder='Search' />
            <img className='w-[50px] bg-[#ebfffc] p-[15px] rounded-[50%] cursor-pointer' onClick={()=>search(inputRef.current.value)} src={search_icon} alt=""  />
       </div>
       {weatherData?<>
        <img className='w-[150px] my-[30px] mx-0' src={weatherData.icon} alt="" />

       <p className='text-white text-[80px]'>{weatherData.temperature}°c</p>
       <p className='text-white text-[40px]'>{weatherData.location}</p>

       <div className='grid grid-cols-2 gap-4 w-[100%] mt-[40px] text-white justify-between'>
            <div className='flex items-start gap-[12px] text-[22px]'>
                <img className='w-[50px] mt-[10px]' src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span className='block text-[16px]'>Humidity</span>
                </div>
            </div>

            <div className='flex items-start gap-[12px] text-[22px]'>
                <img className='w-[62px] mt-[10px]' src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span className='block text-[16px]'>Wind Speed</span>
                </div>
            </div>
       </div>
       </>:<></>}
    </div>
  )
}

export default Weather
