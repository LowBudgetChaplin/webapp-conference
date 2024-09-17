import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import EventIcon from '@mui/icons-material/Event'
import InfoIcon from '@mui/icons-material/Info'

const menuItems = [
  { icon: <HomeIcon />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome' },
  { icon: <EventIcon />, text: 'NavBar.Conferences', path: '/conferences', name: 'Conferences' },
  { icon: <InfoIcon />, text: 'NavBar.UserConference', path: '/userConferences', name: 'Conference' }
]

export default menuItems
