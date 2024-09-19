import React from 'react'
import { Navigate } from 'react-router-dom'
import CustomRoute from 'components/routing/CustomRoute'
import { Forbidden, NotFound } from '@totalsoft/rocket-ui'
import Welcome from 'features/welcome/Welcome'
import ConferenceListContainer from 'features/conference/list/components/ConferenceListContainer'
import ConferenceContainer from 'features/conference/edit/components/ConferenceContainer'
import ConferenceDetails from 'features/conference/conferencePage/ConferenceDetails'
import MeetingPage from 'features/conference/conferencePage/MeetingPage'

const routes = [
  { path: '/', element: <Navigate replace to='/welcome' /> },
  { path: '/conferences', element: <ConferenceListContainer /> },
  { path: '/conferences/:id', element: <ConferenceContainer /> },
  { path: '/meeting/:conferenceName', element: <MeetingPage /> },
  { path: '/conference/:id', element: <ConferenceDetails /> },
  { path: '/welcome', element: <CustomRoute isPrivate={false} component={Welcome} /> },
  { path: '/forbidden', element: <Forbidden /> },
  { path: '*', element: <NotFound title='PageNotFound' /> }
]

export const notLoggedInRoutes = [
  { path: '/welcome', element: <CustomRoute isPrivate={false} component={Welcome} /> },
  { path: '*', element: <Navigate replace to='/welcome' /> }
]

export default routes
