import React from 'react'

import { Button } from '@protonapp/react-native-material-ui'

export const MenuItems = ({
  activeMenuItem,
  menuItems,
  items,
  variant,
  setActiveMenuItem,
  _fonts,
}) => {
  const {
    iconOnLeft,
    activeIndicatorLine,
    lineSize,
    activeBackgroundFillColor,
    activeBackgroundFillRounding,
    menuItemsActiveColor,
    menuItemsInactiveColor,
    menuItemsHoverColor,
  } = menuItems

  return items.map((item, index) => {
    const { enabled, icon, text, actions } = item
    if (!enabled) {
      return <View key={index} />
    }

    const active = activeMenuItem === index
    const styles = {
      container: {
        backgroundColor: active ? activeBackgroundFillColor : '#ffffff00',
        borderRadius: activeBackgroundFillRounding,
      },
      text: {
        color: active ? menuItemsActiveColor : menuItemsInactiveColor,
        fontFamily: _fonts.body,
        fontSize: 14,
        fontWeight: '600',
      },
      icon: {
        color: active ? menuItemsActiveColor : menuItemsInactiveColor,
        size: 20,
      },
    }

    const buttonText = truncateString(text, 15)

    return (
      <Button
        key={index}
        icon={icon}
        text={buttonText || ''}
        onPress={() => {
          setActiveMenuItem(index)
          actions()
        }}
        style={styles}
        upperCase={false}
      />
    )
  })
}

// https://medium.com/@DylanAttal/truncate-a-string-in-javascript-41f33171d5a8
function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}
