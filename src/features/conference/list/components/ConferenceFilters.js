import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Grid, TextField, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Button, Card, DateTime } from '@totalsoft/rocket-ui'
import { generateDefaultFilters } from 'utils/functions'

const ConferenceFilters = ({ filters, onApplyFilters, onSearch }) => {
  const { t } = useTranslation()

  const [startDate, setStartDate] = useState(filters.startDate)
  const [endDate, setEndDate] = useState(filters.endDate)
  const [search, setSearch] = useState('')

  const handleSearchChange = useCallback(
    e => {
      const value = e.target.value
      setSearch(value)
      onSearch(value)
    },
    [onSearch]
  )

  const handleApplyClick = useCallback(() => onApplyFilters({ startDate, endDate }), [onApplyFilters, startDate, endDate])
  const handleKeyPressed = useCallback(({ keyCode }) => keyCode === 13 && handleApplyClick(), [handleApplyClick])

  const handleResetClick = useCallback(() => {
    const defaultFilters = generateDefaultFilters()
    setStartDate(defaultFilters.startDate)
    setEndDate(defaultFilters.endDate)
    setSearch('')
    onApplyFilters(defaultFilters)
  }, [onApplyFilters])

  return (
    <>
      <Card>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} lg={3}>
            <DateTime
              label={t('Conferences.Filters.StartDate')}
              showPicker='dateTime'
              isClearable
              value={startDate}
              onChange={setStartDate}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <DateTime label={t('Conferences.Filters.EndDate')} showPicker='dateTime' isClearable value={endDate} onChange={setEndDate} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              placeholder={t('Conferences.SearchBar')}
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: '30px',
                  padding: '15px',
                  marginTop: '10px'
                }
              }}
            />
          </Grid>
        </Grid>
      </Card>
      <Button onClick={handleApplyClick} size={'small'} color={'primary'} right={true}>
        {t('General.Buttons.ApplyFilters')}
      </Button>
      <Button size={'small'} color={'primary'} onClick={handleResetClick} right={true}>
        {t('General.Buttons.ResetFilters')}
      </Button>
    </>
  )
}

ConferenceFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onApplyFilters: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default ConferenceFilters
