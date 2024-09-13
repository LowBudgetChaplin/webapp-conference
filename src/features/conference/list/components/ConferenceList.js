import React from 'react'
import PropTypes from 'prop-types'
import ConferenceItem from './ConferenceItem'
import { Grid } from '@mui/material'

const ConferenceList = props => {
  const { conferences, onChangeAttendanceStatus } = props

  return (
    <Grid container spacing={2}>
      {conferences?.map(conference => (
        <Grid item xs={12} lg={4} key={conference.id}>
          <ConferenceItem conference={conference} onChangeAttendanceStatus={onChangeAttendanceStatus} />
        </Grid>
      ))}
    </Grid>
  )
}

ConferenceList.propTypes = {
  conferences: PropTypes.array,
  onChangeAttendanceStatus: PropTypes.func
}

export default ConferenceList
