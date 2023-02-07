import React from 'react'
import { View } from 'react-native'

import { Button } from '@protonapp/react-native-material-ui'

export const MenuItems = ({
  activeMenuItem,
  menuItems,
  items,
  variant,
  setActiveMenuItem,
  _fonts,
  centerStyles,
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

  let menuItemsStyles = {
    flexDirection: 'row',
    marginLeft: menuItems.alignment === 'right' ? 'auto' : '',
  }

  if (menuItems.alignment === 'center') {
    menuItemsStyles = {
      ...menuItemsStyles,
      ...centerStyles,
    }
  }

  if (variant === 'mobile') {
    menuItemsStyles = {
      flexDirection: 'column',
      width: '100%',
      marginTop: 20,
      justifyContent: 'flex-start',
      height: '100%',
    }
  }

  const renderItem = (item, index) => {
    const { enabled, icon, text, actions } = item
    if (!enabled) {
      return <View key={index} />
    }

    const active = activeMenuItem === index
    const styles = {
      container: {
        backgroundColor: active ? activeBackgroundFillColor : '#ffffff00',
        borderRadius: activeBackgroundFillRounding,
        justifyContent: variant === 'desktop' ? 'center' : 'flex-start',
        borderRadius: 40,
        height: '',
        paddingLeft: 32,
      },
      text: {
        color: active ? menuItemsActiveColor : menuItemsInactiveColor,
        fontFamily: _fonts.body,
        fontSize: 14,
        fontWeight: '600',
        paddingTop: variant === 'desktop' ? 12 : 20,
        paddingBottom: variant === 'desktop' ? 12 : 20,
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
          actions && actions()
        }}
        style={styles}
        upperCase={false}
      />
    )
  }

  return <View style={menuItemsStyles}>{items.map(renderItem)}</View>
}

// https://medium.com/@DylanAttal/truncate-a-string-in-javascript-41f33171d5a8
function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}
