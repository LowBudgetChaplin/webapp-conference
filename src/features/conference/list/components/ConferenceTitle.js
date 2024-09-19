import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { IconButton, Typography } from '@totalsoft/rocket-ui'
import { emptyString } from 'utils/constants'
import { useTranslation } from 'react-i18next'
import VideocamIcon from '@mui/icons-material/Videocam'

const ConferenceTitle = props => {
  const { t } = useTranslation()
  const { title, onEdit, onDelete, id, onJoin } = props

  return (
    <Grid container justifyContent='flex-start' alignItems='center'>
      <Grid item xs={9} sm={9} lg={9} container justifyContent='flex-start'>
        <Typography variant='subtitle1'>{title || emptyString}</Typography>
      </Grid>
      <Grid item xs={3} sm={3} lg={3} container justifyContent='flex-end' spacing={1}>
        <IconButton
          onClick={onJoin}
          title={t('Conferences.Meeting')}
          size='tiny'
          item
          xs={3}
          sm={3}
          lg={3}
          sx={{
            cursor: 'pointer',
            marginTop: 1.5,
            '&:hover': {
              color: 'black',
              margin: '0 8px',
              alignItems: 'center',
              transform: 'scale(1.1)'
            },
            fontSize: 'medium'
          }}
        >
          <VideocamIcon fontSize='small' />
        </IconButton>
        <Grid item>
          <IconButton type='edit' onClick={onEdit} title={t('Conferences.Edit')} size='tiny' />
        </Grid>
        <Grid item>
          <IconButton type='delete' onClick={onDelete(id)} title={t('Conferences.Delete')} size='tiny' />
        </Grid>
      </Grid>
    </Grid>
  )
}

ConferenceTitle.propTypes = {
  title: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  id: PropTypes.number,
  onJoin: PropTypes.func
}

export default ConferenceTitle
