import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useOidcUser, useOidc } from '@axa-fr/react-oidc'

import { Tooltip } from '@mui/material'
import { PowerSettingsNew } from '@mui/icons-material'

import LanguageSelector from '../languageSelector/LanguageSelector'
import avatar_default from 'assets/img/default-avatar.png'
import {
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuList,
  StyledArrowDropDown,
  StyledArrowDropUp,
  StyledMenuItem,
  StyledNavLinkMenu,
  StyledSelector
} from './UserMenuStyle'
import UserMenuItem from './UserMenuItem'
import { root } from 'utils/auth/authConfig'
import { getOidcConfigName } from 'utils/functions'

import userMenuItems from 'constants/userMenuConfig'
import { useEmail } from 'hooks/useEmail'

function UserMenu({ drawerOpen, avatar, language, changeLanguage, withGradient }) {
  const [openAvatar, setOpenAvatar] = useState(false)
  const { t } = useTranslation()
  const location = useLocation()
  const { oidcUser } = useOidcUser(getOidcConfigName())
  const { logout } = useOidc(getOidcConfigName())

  const activeRoute = useCallback(routeName => location.pathname.indexOf(routeName) > -1, [location.pathname])

  const openCollapseAvatar = useCallback(
    e => {
      setOpenAvatar(!openAvatar)
      e.preventDefault()
    },
    [openAvatar]
  )

  const logoutAction = useCallback(
    e => {
      e.preventDefault()
      logout(root)
    },
    [logout]
  )

  const userName = oidcUser?.profile?.firstName
    ? `${oidcUser.profile.name} ${oidcUser.profile.lastName}`
    : oidcUser?.name
      ? oidcUser.name.split('@')[0]
      : 'User'

  const [email] = useEmail()
  const displayName = email || userName
  return (
    <List>
      <ListItem>
        <StyledNavLinkMenu to={'/'} withGradient={withGradient} onClick={openCollapseAvatar}>
          <ListItemIcon>
            <Avatar src={avatar ? avatar : avatar_default} alt='...' />
          </ListItemIcon>
          <ListItemText
            primary={displayName}
            secondary={openAvatar ? <StyledArrowDropUp drawerOpen={drawerOpen} /> : <StyledArrowDropDown drawerOpen={drawerOpen} />}
            disableTypography={true}
            drawerOpen={drawerOpen}
          />
        </StyledNavLinkMenu>
        <Collapse in={openAvatar} unmountOnExit>
          <MenuList>
            {userMenuItems.map((userMenu, key) => {
              return (
                <UserMenuItem key={key} userMenu={userMenu} drawerOpen={drawerOpen} activeRoute={activeRoute} withGradient={withGradient} />
              )
            })}
            {oidcUser && (
              <Tooltip disableHoverListener={drawerOpen} title={t('Tooltips.Logout')}>
                <StyledMenuItem>
                  <StyledNavLinkMenu to={'/'} withGradient={withGradient} onClick={logoutAction}>
                    <ListItemIcon>
                      <PowerSettingsNew />
                    </ListItemIcon>
                    <ListItemText primary={t('Tooltips.Logout')} disableTypography={true} drawerOpen={drawerOpen} />
                  </StyledNavLinkMenu>
                </StyledMenuItem>
              </Tooltip>
            )}
            <StyledSelector>
              <LanguageSelector language={language} changeLanguage={changeLanguage} drawerOpen={drawerOpen} />
            </StyledSelector>
          </MenuList>
        </Collapse>
      </ListItem>
    </List>
  )
}

UserMenu.propTypes = {
  avatar: PropTypes.string,
  drawerOpen: PropTypes.bool.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  withGradient: PropTypes.bool.isRequired
}

export default UserMenu
