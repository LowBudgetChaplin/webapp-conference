import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { Autocomplete, DateTime, TextField } from '@totalsoft/rocket-ui'

const ConferenceInfo = props => {
  const { types, categories, conference, dispatch } = props
  const { name, startDate, endDate, type, category } = conference
  const { t } = useTranslation()

  const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value })

  return (
    <Grid container spacing={3}>
      <Grid item container lg={9} spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField label={t('Conference.Name')} fullWidth value={name} onChange={handleDispatch('name')} />
        </Grid>
      </Grid>
      <Grid item container lg={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <DateTime label={t('Conference.StartDate')} showPicker='dateTime' value={startDate} onChange={handleDispatch('startDate')} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DateTime label={t('Conference.EndDate')} showPicker='dateTime' value={endDate} onChange={handleDispatch('endDate')} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Conference.Type')}
            fullWidth
            isClearable
            isSearchable
            creatable
            options={types}
            value={type}
            onChange={handleDispatch('type')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Conference.Category')}
            fullWidth
            isClearable
            isSearchable
            creatable
            options={categories}
            value={category}
            onChange={handleDispatch('category')}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

ConferenceInfo.propTypes = {
  types: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  conference: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default ConferenceInfo
