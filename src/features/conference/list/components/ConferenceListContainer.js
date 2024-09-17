import React, { useCallback, useEffect, useState, useMemo } from 'react'
import ConferenceFilters from './ConferenceFilters'
import { FakeText, IconButton, useToast } from '@totalsoft/rocket-ui'
import ConferenceList from './ConferenceList'
import { generateDefaultFilters } from 'utils/functions'
import { useTranslation } from 'react-i18next'
import { useHeader } from 'providers/AreasProvider'
import ConferenceHeader from 'features/conference/ConferenceHeader'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries'
import { useEmail } from 'hooks/useEmail'
import { CHANGE_ATTENDANCE_STATUS_MUTATION, DELETE_CONFERENCE } from 'features/conference/gql/mutations'

const ConferenceListContainer = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email] = useEmail()
  const addToast = useToast()
  const [, setHeader] = useHeader()

  const handleAddClick = useCallback(() => {
    navigate('/conferences/new')
  }, [navigate])

  useEffect(() => () => setHeader(null), [setHeader])

  useEffect(() => {
    setHeader(
      <ConferenceHeader
        title={t('NavBar.Conferences')}
        actions={
          <IconButton
            type='add'
            key='addButton'
            title={t('General.Buttons.AddConference')}
            sx={{ marginTop: '5px', marginRight: '3px' }}
            onClick={handleAddClick}
          />
        }
      />
    )
  }, [handleAddClick, setHeader, t])

  const [filters, setFilters] = useState(generateDefaultFilters())
  const [search, setSearch] = useState('')

  const { data, loading } = useQuery(CONFERENCE_LIST_QUERY, {
    variables: { filters, userEmail: email },
    fetchPolicy: 'cache-and-network'
  })

  const [changeAttendanceStatus] = useMutation(CHANGE_ATTENDANCE_STATUS_MUTATION, {
    refetchQueries: [{ query: CONFERENCE_LIST_QUERY, variables: { filters, userEmail: email } }]
  })

  const [deleteConference] = useMutation(DELETE_CONFERENCE, {
    onCompleted: () => addToast(t('General.DeletingSucceeded'), 'success'),
    refetchQueries: [{ query: CONFERENCE_LIST_QUERY, variables: { filters, userEmail: email } }]
  })

  const handleDelete = useCallback(
    id => () => {
      deleteConference({ variables: { id } })
    },
    [deleteConference]
  )

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

  const handleApplyFilters = useCallback(newFilters => {
    setFilters(newFilters)
  }, [])

  const handleSearch = useCallback(info => {
    setSearch(info)
  }, [])

  const filteredConferences = useMemo(() => {
    if (!data?.conferenceList) return []
    return data.conferenceList.filter(conference => conference.name.toLowerCase().includes(search.toLowerCase()))
  }, [data?.conferenceList, search])

  if (loading && !data) {
    return <FakeText lines={10} />
  }

  return (
    <>
      <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} onSearch={handleSearch} />
      <ConferenceList conferences={filteredConferences} onChangeAttendanceStatus={handleChangeAttendanceStatus} onDelete={handleDelete} />
    </>
  )
}

export default ConferenceListContainer
