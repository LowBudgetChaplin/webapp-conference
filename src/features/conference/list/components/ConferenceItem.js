import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import ConferenceSubtitle from './ConferenceSubtitle'
import ConferenceContent from './ConferenceContent'
import { Card } from '@totalsoft/rocket-ui'
import ConferenceTitle from './ConferenceTitle'
import { useEmail } from 'hooks/useEmail'
import { useNavigate } from 'react-router-dom'

const ConferenceItem = props => {
  const { conference } = props
  const navigate = useNavigate()
  const [email] = useEmail()
  const { name, organizerEmail, speakers, location, id } = conference
  const speaker = speakers.find(speaker => speaker.isMainSpeaker)

  const handleEdit = useCallback(() => navigate(`/conferences/${id}`), [navigate, id])

  const title = email.toUpperCase() === organizerEmail.toUpperCase() ? <ConferenceTitle title={name} onEdit={handleEdit} /> : name

  return (
    <Card title={title} subheader={<ConferenceSubtitle speaker={speaker} location={location} />}>
      <ConferenceContent conference={conference} />
    </Card>
  )
}

ConferenceItem.propTypes = {
  conference: PropTypes.object.isRequired
}

export default ConferenceItem
