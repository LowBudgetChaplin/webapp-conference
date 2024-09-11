import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import ConferenceHeader from 'features/conference/ConferenceHeader'
import Conference from './Conference'
import { FakeText, IconButton } from '@totalsoft/rocket-ui'
import { initialConference, reducer } from '../conferenceState'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { CONFERENCE_QUERY } from 'features/conference/gql/queries'

const ConferenceContainer = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const isNew = id === 'new'
  const [, setHeader] = useHeader()
  const [conference, dispatch] = useReducer(reducer, initialConference)

  const { loading, data } = useQuery(CONFERENCE_QUERY, {
    variables: { id: parseInt(id) || -1, isNew },
    onCompleted: data => data?.conference && dispatch({ type: 'resetData', payload: data?.conference })
  })

  useEffect(() => () => setHeader(null), [setHeader])
  useEffect(() => {
    setHeader(
      <ConferenceHeader
        title={conference.name}
        actions={<IconButton type='save' title={t('General.Buttons.Save')} sx={{ marginTop: '5px', marginRight: '3px' }} />}
      />
    )
  }, [conference.name, setHeader, t])

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
