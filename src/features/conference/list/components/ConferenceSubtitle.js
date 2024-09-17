import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import RoomIcon from '@mui/icons-material/Room'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { Grid, Card, CardContent } from '@mui/material'
import { Typography } from '@totalsoft/rocket-ui'
import { useNavigate } from 'react-router-dom'

const ConferenceSubtitle = props => {
  const { speaker, location, conference } = props
  const { id } = conference
  const { t } = useTranslation()
  const navigate = useNavigate()

  const seeConference = useCallback(() => {
    navigate(`/conference/${id}`)
  }, [navigate, id])

  return (
    <Card
      onClick={seeConference}
      sx={{
        cursor: 'pointer',
        boxShadow: 'none',
        borderRadius: '4px',
        backgroundColor: '#fff',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)'
        }
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems='center'>
              <Grid item>
                <PermIdentityIcon />
              </Grid>
              <Grid item>
                <Typography variant='body1'>{t('Conferences.Speaker')}</Typography>
                <Typography variant='body2'>{speaker?.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems='center'>
              <Grid item>
                <RoomIcon />
              </Grid>
              <Grid item>
                <Typography variant='body1'>{t('Conferences.Location')}</Typography>
                <Typography variant='body2'>{`${location?.city.name}, ${location?.county.name}, ${location?.country.name}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

ConferenceSubtitle.propTypes = {
  speaker: PropTypes.object,
  location: PropTypes.object.isRequired,
  conference: PropTypes.object
}

export default ConferenceSubtitle
