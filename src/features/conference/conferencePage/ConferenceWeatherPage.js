import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Icon } from '@mui/material'
import SunIcon from '@mui/icons-material/WbSunny'
import CloudIcon from '@mui/icons-material/Cloud'
import axios from 'axios'
import PropTypes from 'prop-types'

const ConferenceWeatherPage = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    if (!city || !city.name) return

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=e78e7e6c166fe48f5145ba410557cce1`
          //   ${process.env.REACT_APP_WEATHER_KEY}
        )
        setWeatherData(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [city])

  return (
    <Card>
      <CardContent style={{ height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h4' gutterBottom>
          Weather in {city?.name || 'Not Specified'}
        </Typography>
        {weatherData ? (
          <>
            <Icon sx={{ fontSize: '100px', marginBottom: '30px' }}>
              {weatherData.weather[0].main === 'Clear' ? (
                <SunIcon sx={{ color: 'gold', fontSize: 'inherit' }} />
              ) : (
                <CloudIcon sx={{ color: 'gray', fontSize: 'inherit' }} />
              )}
            </Icon>
            <Typography variant='h4' style={{ fontSize: '5rem' }}>
              {weatherData.main.temp}°C
            </Typography>
            <Typography variant='h6'>{weatherData.weather[0].description}</Typography>
          </>
        ) : (
          <Typography variant='body2'>Loading weather...</Typography>
        )}
      </CardContent>
    </Card>
  )
}

ConferenceWeatherPage.propTypes = {
  city: PropTypes.object
}

export default ConferenceWeatherPage
