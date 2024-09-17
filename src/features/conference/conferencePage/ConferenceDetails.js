import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Grid, Typography, Card, CardContent, CardMedia, Divider } from '@mui/material'
import PropTypes from 'prop-types'
import { CONFERENCE_QUERY } from '../gql/queries'
import { AccessTime, LocationOn, CalendarToday, Person, Alarm } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

const ConferenceDetails = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const { data } = useQuery(CONFERENCE_QUERY, {
    variables: { id: parseInt(id, 10), isNew: false }
  })

  const { conference } = data || {}
  const { name, startDate, endDate, location, speakers, image } = conference || {}

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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h4' align='center' style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, marginBottom: '20px' }}>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardMedia
            component='img'
            image={image || 'https://via.placeholder.com/400'} // Placeholder image if conference image is not available
            alt='Conference'
            style={{ height: 400, objectFit: 'cover' }}
          />
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
                <Typography variant='h6' gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn style={{ marginRight: 8 }} /> {t('Conference.Location')}
                </Typography>
                <Typography variant='body2'>{location?.name || 'Not Specified'}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
                  <Alarm style={{ marginRight: 8 }} /> {t('Conference.Countdown')}
                </Typography>
                <Typography variant='body2' style={{ fontFamily: 'monospace', fontSize: '1.25rem' }}>
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
                      <li key={speaker.id} style={{ borderBottom: '1px solid #ccc', padding: '8px 0', fontSize: '0.875rem' }}>
                        <Typography variant='body2'>{speaker.name}</Typography>
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
