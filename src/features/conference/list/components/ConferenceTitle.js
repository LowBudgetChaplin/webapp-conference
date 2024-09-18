import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { IconButton, Typography } from '@totalsoft/rocket-ui'
import { emptyString } from 'utils/constants'
import { useTranslation } from 'react-i18next'

const ConferenceTitle = props => {
  const { t } = useTranslation()
  const { title, onEdit, onDelete, id } = props

  // const seeConference = useCallback(() => navigate(`/conference/${id}`), [navigate, id])

  return (
    // <Card
    //   onClick={seeConference}
    //   sx={{
    //     cursor: 'pointer',
    //     '&:hover': {
    //       backgroundColor: 'rgba(0, 0, 0, 0.04)'
    //     }
    //   }}
    // >
    <Grid container justifyContent='flex-start' alignItems='center'>
      <Grid item xs={9} sm={9} lg={9} container justifyContent='flex-start'>
        <Typography variant='subtitle1'>{title || emptyString}</Typography>
      </Grid>
      <Grid item xs={3} sm={3} lg={3} container justifyContent='flex-end' spacing={1}>
        <Grid item>
          <IconButton type='edit' onClick={onEdit} title={t('Conferences.Edit')} size='tiny' />
        </Grid>
        <Grid item>
          <IconButton type='delete' onClick={onDelete(id)} title={t('Conferences.Delete')} size='tiny' />
        </Grid>
      </Grid>
    </Grid>
    // </Card>
  )
}

ConferenceTitle.propTypes = {
  title: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  id: PropTypes.number
}

export default ConferenceTitle
