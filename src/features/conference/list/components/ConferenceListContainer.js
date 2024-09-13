import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from './ConferenceFilters'
// import conferences from 'utils/mocks/conferences'
import { FakeText, IconButton } from '@totalsoft/rocket-ui'
import ConferenceList from './ConferenceList'
import { generateDefaultFilters } from 'utils/functions'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import ConferenceHeader from 'features/conference/ConferenceHeader'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries'
import { useEmail } from 'hooks/useEmail'
import { CHANGE_ATTENDANCE_STATUS_MUTATION } from 'features/conference/gql/mutations'

const ConferenceListContainer = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email] = useEmail()

  const handleAddClick = useCallback(() => {
    navigate('/conferences/new')
  }, [navigate])

  const [, setHeader] = useHeader()
  useEffect(() => () => setHeader(null), [setHeader])
  useEffect(() => {
    setHeader(
      <ConferenceHeader
        title={t('NavBar.Conferences')}
        actions={<IconButton type='add' key='addButton' title={t('General.Buttons.AddConference')} onClick={handleAddClick} />}
      />
    )
  }, [handleAddClick, setHeader, t])

  const [filters, setFilters] = useState(generateDefaultFilters())

  const [changeAttendanceStatus] = useMutation(CHANGE_ATTENDANCE_STATUS_MUTATION, {
    refetchQueries: [{ query: CONFERENCE_LIST_QUERY, variables: { filters, userEmail: email } }]
  })

  const handleChangeAttendanceStatus = useCallback(
    (conferenceId, statusId) => () => {
      const input = {
        attendeeEmail: email,
        conferenceId,
        statusId
      }
      changeAttendanceStatus({ variables: { input } })
    },
    [changeAttendanceStatus, email]
  )

  //const { data, loading } = { data: conferences, loading: false } // don't worry about it! it will make a lot more sense after GraphQL
  const { data, loading } = useQuery(CONFERENCE_LIST_QUERY, { variables: { filters, userEmail: email } })
  const handleApplyFilters = useCallback(filters => setFilters(filters), [])

  if (loading) {
    return <FakeText lines={10} />
  }

  return (
    <>
      <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <ConferenceList conferences={data?.conferenceList} onChangeAttendanceStatus={handleChangeAttendanceStatus} />
    </>
  )
}

export default ConferenceListContainer
