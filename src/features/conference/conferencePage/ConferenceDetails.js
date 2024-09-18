import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Grid, Typography, Card, CardContent, Divider, Icon } from '@mui/material'
import PropTypes from 'prop-types'
import { AccessTime, LocationOn, CalendarToday, Person, Alarm } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import SunIcon from '@mui/icons-material/WbSunny'
import CloudIcon from '@mui/icons-material/Cloud'
import Rating from '@mui/material/Rating'
import { UPDATE_RATING_MUTATION } from '../gql/mutations'
import { CONFERENCE_QUERY } from '../gql/queries'

const ConferenceDetails = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const { data } = useQuery(CONFERENCE_QUERY, {
    variables: { id: parseInt(id, 10), isNew: false }
  })
  const [updateRating] = useMutation(UPDATE_RATING_MUTATION)
  const [weatherData, setWeatherData] = useState(null)
  const { conference } = data || {}
  const { name, startDate, endDate, location, speakers } = conference || {}
  const { city } = location || {}

  const [timeLeft, setTimeLeft] = useState('')
  const [isConferenceOver, setIsConferenceOver] = useState(false)

  const fetchData = async () => {
    if (!location || !location.name) return

    //process.env.WeatherAPI
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=e78e7e6c166fe48f5145ba410557cce1`
      )
      setWeatherData(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [location])

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!startDate) return 'No date available'
      const now = new Date()
      const eventDate = new Date(startDate)
      const timeDifference = eventDate - now
      if (timeDifference < 0) {
        setTimeLeft(t('Conference.Finished'))
        setIsConferenceOver(true)
        return
      }
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      setIsConferenceOver(false)
    }

    calculateTimeLeft()
    const intervalId = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(intervalId)
  }, [startDate, t])

  const handleRatingChange = useCallback(
    speakerId => (event, newValue) => {
      updateRating({
        variables: {
          speakerId,
          rating: newValue
        }
      })
    },
    [updateRating]
  )

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h4' align='center' style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, marginBottom: '20px' }}>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent style={{ height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h4' gutterBottom>
              {t('Conference.Weather')} {city?.name || 'Not Specified'}
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
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarToday style={{ marginRight: 8 }} /> {t('Conference.StartDate')}
                </Typography>
                <Typography variant='body2'>{new Date(startDate).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime style={{ marginRight: 8 }} /> {t('Conference.EndDate')}
                </Typography>
                <Typography variant='body2'>{new Date(endDate).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Divider style={{ margin: '16px 0' }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom style={{ display: 'flex', alignItems: 'center', fontFamily: 'monospace' }}>
                  <LocationOn style={{ marginRight: 8 }} /> {t('Conference.Location')}
                </Typography>
                <Typography variant='body2'>{city?.name || 'Not Specified'}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent style={{ minWidth: '400px' }}>
                {' '}
                <Typography variant='h6' gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
                  <Alarm style={{ marginRight: 8 }} /> {t('Conference.Countdown')}
                </Typography>
                <Typography variant='body2' style={{ fontFamily: 'monospace', fontSize: '1rem' }}>
                  {timeLeft}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Divider style={{ margin: '16px 0' }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
                  <Person style={{ marginRight: 8 }} /> {t('Conference.Speakers')}
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {speakers &&
                    speakers.map(speaker => (
                      <li
                        key={speaker.id}
                        style={{
                          borderBottom: '1px solid #ccc',
                          padding: '8px 0',
                          fontSize: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='body2'>{speaker.name}</Typography>
                        <Rating
                          name={`rating-${speaker.id}`}
                          value={speaker.rating || 0}
                          precision={0.5}
                          onChange={handleRatingChange(speaker.id)}
                          sx={{ color: 'gold', fontSize: '1.5rem' }}
                        />
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

ConferenceDetails.propTypes = {
  conference: PropTypes.object
}

export default ConferenceDetails
