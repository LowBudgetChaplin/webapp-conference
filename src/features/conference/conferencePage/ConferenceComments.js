import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'

const ConferenceComments = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6'>speakerName</Typography>
            <Typography variant='body2'>text test</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ConferenceComments
