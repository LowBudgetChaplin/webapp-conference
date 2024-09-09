import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import RoomIcon from '@mui/icons-material/Room'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { Grid } from '@mui/material'
import { Typography } from '@totalsoft/rocket-ui'

const ConferenceSubtitle = props => {
  const { speaker, location } = props
  const { t } = useTranslation()

  return (
    <Grid container item lg={12}>
      <Grid item lg={1}>
        <PermIdentityIcon />
      </Grid>
      <Grid item lg={11}>
        <Typography>{t('Conferences.Speaker')}</Typography>
        <Typography>{speaker?.name}</Typography>
      </Grid>
      <Grid item lg={1}>
        <RoomIcon />
      </Grid>
      <Grid item lg={11}>
        <Typography>{`${location?.city.name}, ${location?.county.name}, ${location?.country.name}`}</Typography>
      </Grid>
    </Grid>
  )
}

ConferenceSubtitle.propTypes = {
  speaker: PropTypes.object,
  location: PropTypes.object.isRequired
}

export default ConferenceSubtitle
