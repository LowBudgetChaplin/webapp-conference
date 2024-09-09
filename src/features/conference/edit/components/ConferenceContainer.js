import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import ConferenceHeader from 'features/conference/ConferenceHeader'
import Conference from './Conference'
import { types, categories, countries, counties, cities } from 'utils/mocks/dictionaries'
import { FakeText, IconButton } from '@totalsoft/rocket-ui'
import { initialConference, reducer } from '../conferenceState'
import { conference as serverConference } from 'utils/mocks/conference'
import { useParams } from 'react-router-dom'

const ConferenceContainer = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const isNew = id === 'new'
  const [, setHeader] = useHeader()
  const [conference, dispatch] = useReducer(reducer, initialConference)

  useEffect(() => () => setHeader(null), [setHeader])
  useEffect(() => {
    setHeader(<ConferenceHeader title={conference.name} actions={<IconButton type='save' title={t('General.Buttons.Save')} />} />)
  }, [conference.name, setHeader, t])

  useEffect(() => {
    if (!isNew) {
      dispatch({ type: 'resetData', payload: serverConference })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const { loading, data } = {
    loading: false,
    data: {
      typeList: types,
      categoryList: categories,
      countryList: countries,
      countyList: counties,
      cityList: cities
    }
  }

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
