import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import MenuItem from './MenuItem'
import CollapsibleMenuItem from './CollapsibleMenuItem'
import { List } from './MenuStyle'
import menuItems from 'constants/menuConfig'

function Menu({ drawerOpen, withGradient }) {
  const location = useLocation()
  const activeRoute = useCallback(routeName => location.pathname.indexOf(routeName) > -1, [location.pathname])

  return (
    <nav>
      <List>
        {menuItems.map((menu, key) => {
          const menuItemProps = { menu, drawerOpen, activeRoute, withGradient }
          return menu.children ? (
            <CollapsibleMenuItem key={key} {...menuItemProps} />
          ) : (
            <MenuItem key={key} {...menuItemProps} />
          )
        })}
      </List>
    </nav>
  )
}

Menu.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  withGradient: PropTypes.bool.isRequired
}

export default Menu
