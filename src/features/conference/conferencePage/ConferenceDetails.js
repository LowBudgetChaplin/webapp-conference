import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Grid, Typography, Card, CardContent, Divider, Rating } from '@mui/material'
import { AccessTime, LocationOn, CalendarToday, Person, Alarm } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Button } from '@totalsoft/rocket-ui'
import { CONFERENCE_QUERY } from '../gql/queries'
import { UPDATE_CONFERENCE } from '../gql/mutations'
import ConferenceWeatherPage from './ConferenceWeatherPage'

const ConferenceDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data } = useQuery(CONFERENCE_QUERY, {
    variables: { id: parseInt(id, 10), isNew: false }
  })
  const [updateConference] = useMutation(UPDATE_CONFERENCE)
  const { conference } = data || {}
  const { name, startDate, endDate, location, speakers } = conference || {}
  const { city } = location || {}

  const [timeLeft, setTimeLeft] = useState('')
  const [isConferenceOver, setIsConferenceOver] = useState(false)

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
    speakerId => async (event, newValue) => {
      try {
        const updatedSpeakers = speakers.map(speaker => ({
          ...speaker,
          rating: speaker.id === speakerId ? newValue : speaker.rating
        }))
        console.log('ORICE', conference, updatedSpeakers)

        const newConference = {
          ...conference,
          typeId: conference.type.id,
          categoryId: conference.category.id,
          location: {
            ...conference.location,
            cityId: conference.location.city.id,
            countyId: conference.location.county.id,
            countryId: conference.location.country.id
          },
          speakers: updatedSpeakers
        }
        delete newConference.category
        delete newConference.type
        delete newConference.location.city
        delete newConference.location.county
        delete newConference.location.country
        await updateConference({
          variables: {
            input: newConference
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    [updateConference, conference, speakers]
  )

  const goBackHandle = useCallback(() => navigate(`/conferences`), [navigate])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h4' align='center' style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, marginBottom: '20px' }}>
          {name}
        </Typography>

        <Button
          onClick={goBackHandle}
          sx={{
            position: 'fixed',
            right: 20,
            zIndex: 9999,
            padding: '8px',
            width: '60px',
            height: '40px',
            borderRadius: '10%',
            backgroundColor: 'darkGray',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'orange'
            }
          }}
        >
          Go Back
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <ConferenceWeatherPage city={city} />
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
                          value={speaker.rating || 0}
                          precision={0.5}
                          onChange={handleRatingChange(speaker.id)}
                          sx={{ color: 'gold', fontSize: '3rem' }}
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

export default ConferenceDetails
