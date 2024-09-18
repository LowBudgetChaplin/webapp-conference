import React from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Typography, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CONFERENCE_LIST_QUERY } from '../gql/queries'

const UserConferenceContainer = () => {
  const { t } = useTranslation()
  const userId = 1

  const { loading, error, data } = useQuery(CONFERENCE_LIST_QUERY, {
    variables: { userId }
  })

  if (loading) return <div>{t('Loading')}</div>
  if (error) return <div>{t('ErrorLoadingData')}</div>

  const joinedConferences = data.userConferences.filter(conference => conference.status === 'Joined')

  return (
    <Grid container spacing={3}>
      {joinedConferences.length > 0 ? (
        joinedConferences.map(conference => (
          <Grid item xs={12} md={6} key={conference.id}>
            <Card>
              <CardContent>
                <Typography variant='h6'>{conference.name}</Typography>
                <Typography variant='body2'>
                  {new Date(conference.startDate).toLocaleDateString()} - {new Date(conference.endDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant='body1'>{t('NoConferencesJoined')}</Typography>
      )}
    </Grid>
  )
}

export default UserConferenceContainer
