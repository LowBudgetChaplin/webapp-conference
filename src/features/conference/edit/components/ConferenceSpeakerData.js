import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { IconButton, TextField } from '@totalsoft/rocket-ui'
import { Checkbox } from '@mui/material'
import { Td, TdCenteredButton, Tr } from 'components/common/dataDisplay/SuperResponsiveTableStyled'

const ConferenceSpeakerData = props => {
  const { speaker, dispatch, index } = props
  const { name, nationality, rating, isMainSpeaker } = speaker
  const { t } = useTranslation()

  const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value, index })
  const handleCheckboxDispatch = useCallback(
    (_event, checked) => dispatch({ type: 'isMainSpeaker', payload: checked, index }),
    [dispatch, index]
  )

  return (
    <Tr>
      <Td>
        <TextField fullWidth value={name} onChange={handleDispatch('speakerName')} />
      </Td>
      <Td>
        <TextField fullWidth value={nationality} onChange={handleDispatch('nationality')} />
      </Td>
      <Td>
        <TextField fullWidth isNumeric value={rating} onChange={handleDispatch('rating')} />
      </Td>
      <TdCenteredButton>
        <Checkbox color='secondary' size='small' checked={isMainSpeaker} onChange={handleCheckboxDispatch} />
      </TdCenteredButton>
      <Td>
        <IconButton type='delete' title={t('General.Buttons.DeleteSpeaker')} size='tiny' onClick={handleDispatch('deleteSpeaker')} />
      </Td>
    </Tr>
  )
}

ConferenceSpeakerData.propTypes = {
  speaker: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default ConferenceSpeakerData
