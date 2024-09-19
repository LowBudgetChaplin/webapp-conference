import React from 'react'
import { useParams } from 'react-router-dom'

const MeetingPage = () => {
  const { conferenceName } = useParams()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <h1>Meeting for {conferenceName}</h1>
      <iframe
        allow='camera; microphone; autoplay; fullscreen; display-capture'
        src={`https://serbancorodescu.daily.co/72e3XopomfPhyuzJXexs`}
        style={{ width: '100%', height: '100vh', border: 'none' }}
        title='Meeting'
      />
    </div>
  )
}

export default MeetingPage
