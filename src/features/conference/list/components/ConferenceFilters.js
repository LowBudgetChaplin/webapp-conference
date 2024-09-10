import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@mui/icons-material/Search'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Button, Card, DateTime } from '@totalsoft/rocket-ui'
import { generateDefaultFilters } from 'utils/functions'

const ConferenceFilters = props => {
  const { filters, onApplyFilters } = props
  const { t } = useTranslation()

  const [startDate, setStartDate] = useState(filters.startDate)
  const [endDate, setEndDate] = useState(filters.endDate)

  const handleApplyClick = useCallback(() => onApplyFilters({ startDate, endDate }), [onApplyFilters, endDate, startDate])
  const handleKeyPressed = useCallback(({ keyCode }) => keyCode === 13 && handleApplyClick(), [handleApplyClick])
  const handleResetClick = useCallback(() => {
    const defaultFilters = generateDefaultFilters()
    setStartDate(defaultFilters.startDate)
    setEndDate(defaultFilters.endDate)
  }, [])

  return (
    <>
      <Card icon={SearchIcon} iconColor='secondary'>
        <Grid container spacing={2} onKeyDown={handleKeyPressed}>
          <Grid item xs={12} lg={3}>
            <DateTime label={t('Conferences.Filters.StartDate')} showPicker='dateTime' isClearable value={startDate} onChange={setStartDate} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <DateTime label={t('Conferences.Filters.EndDate')} showPicker='dateTime' isClearable value={endDate} onChange={setEndDate} />
          </Grid>
        </Grid>
      </Card>
      <Button size={'small'} color={'primary'} right={true} onClick={handleResetClick}>
        {t('General.Buttons.ResetFilters')}
      </Button>
      <Button size={'small'} color={'primary'} right={true} onClick={handleApplyClick}>
        {t('General.Buttons.ApplyFilters')}
      </Button>
    </>
  )
}

ConferenceFilters.propTypes = {
  filters: PropTypes.object,
  onApplyFilters: PropTypes.func
}

export default ConferenceFilters
