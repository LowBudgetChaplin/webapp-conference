import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { Autocomplete, TextField } from '@totalsoft/rocket-ui'

const ConferenceLocation = props => {
  const { countries, counties, cities, location, dispatch } = props
  const { name, address, country, county, city, latitude, longitude } = location
  const { t } = useTranslation()

  const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value })

  return (
    <Grid item container lg={12} spacing={3}>
      <Grid item container lg={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField label={t('Location.Name')} fullWidth value={name} onChange={handleDispatch('locationName')} />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <TextField label={t('Location.Address')} fullWidth value={address} onChange={handleDispatch('address')} />
        </Grid>
      </Grid>
      <Grid item container lg={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Location.Country')}
            fullWidth
            isClearable
            isSearchable
            creatable
            options={countries}
            value={country}
            onChange={handleDispatch('country')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Location.County')}
            fullWidth
            isClearable
            isSearchable
            creatable
            options={counties}
            value={county}
            onChange={handleDispatch('county')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Location.City')}
            fullWidth
            isClearable
            isSearchable
            creatable
            options={cities}
            value={city}
            onChange={handleDispatch('city')}
          />
        </Grid>
      </Grid>
      <Grid item container lg={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField label={t('Location.Latitude')} fullWidth value={latitude} onChange={handleDispatch('latitude')} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField label={t('Location.Longitude')} fullWidth value={longitude} onChange={handleDispatch('longitude')} />
        </Grid>
      </Grid>
    </Grid>
  )
}

ConferenceLocation.propTypes = {
  countries: PropTypes.array.isRequired,
  counties: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default ConferenceLocation
