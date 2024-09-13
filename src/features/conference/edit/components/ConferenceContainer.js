import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import ConferenceHeader from 'features/conference/ConferenceHeader'
import Conference from './Conference'
import { FakeText, IconButton, useToast } from '@totalsoft/rocket-ui'
import { initialConference, reducer } from '../conferenceState'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { CONFERENCE_QUERY } from 'features/conference/gql/queries'
import { CHANGE_ATTENDANCE_STATUS_MUTATION, UPDATE_CONFERENCE } from 'features/conference/gql/mutations'
import { useEmail } from 'hooks/useEmail'

const ConferenceContainer = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const isNew = id === 'new'
  const [, setHeader] = useHeader()
  const navigate = useNavigate()
  const [conference, dispatch] = useReducer(reducer, initialConference)
  const addToast = useToast()
  const [email] = useEmail()

  const [saveConference] = useMutation(UPDATE_CONFERENCE, {
    onCompleted: data => {
      addToast(t('General.SavingSucceeded'), 'success')
      if (isNew) {
        navigate(`/conferences/${data?.saveConference?.id}`)
        return
      }
      data?.saveConference && dispatch({ type: 'resetData', payload: data?.saveConference })
    }
  })

  const handleSave = useCallback(() => {
    const { id, name, startDate, endDate, deletedSpeakers, location, speakers, type, category } = conference
    const { city, county, country, longitude, latitude, ...restLocation } = location
    const input = {
      id,
      name,
      startDate,
      endDate,
      organizerEmail: email,
      typeId: type?.id,
      categoryId: category?.id,
      location: {
        ...restLocation,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        cityId: city.id,
        countyId: county.id,
        countryId: country.id
      },
      speakers,
      deletedSpeakers
    }
    saveConference({ variables: { input } })
  }, [conference, saveConference, email])

  const { loading, data } = useQuery(CONFERENCE_QUERY, {
    variables: { id: parseInt(id) || -1, isNew },
    onCompleted: data => data?.conference && dispatch({ type: 'resetData', payload: data?.conference })
  })

  useEffect(() => () => setHeader(null), [setHeader])
  useEffect(() => {
    setHeader(
      <ConferenceHeader
        title={conference?.name}
        actions={
          <IconButton type='save' title={t('General.Buttons.Save')} sx={{ marginTop: '5px', marginRight: '3px' }} onClick={handleSave} />
        }
      />
    )
  }, [conference?.name, handleSave, setHeader, t])

  if (loading) {
    return <FakeText lines={10} />
  }

  return (
    <Conference
      conference={conference}
      dispatch={dispatch}
      types={data?.typeList}
      categories={data?.categoryList}
      countries={data?.countryList}
      counties={data?.countyList}
      cities={data?.cityList}
    />
  )
}

export default ConferenceContainer
