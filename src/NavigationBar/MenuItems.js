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

    if (activeIndicatorLine) {
      menuItemsStyles.marginLeft = -23
    }
  }

  const renderItem = (item, index) => {
    const { enabled, icon, text, actions } = item
    if (!enabled) {
      return <View key={index} />
    }

    const active = activeMenuItem === index

    const textPadding = variant === 'desktop' ? 12 : 20
    const activeIndicatorBorderStyles = `${lineSize}px solid ${menuItemsActiveColor}`

    const styles = {
      container: {
        backgroundColor: '#ffffff00',
        borderRadius: activeBackgroundFillRounding * 2,
        justifyContent: variant === 'desktop' ? 'center' : 'flex-start',
        height: '',
        paddingLeft: variant === 'mobile' ? 32 : 12,
      },
      text: {
        color: active ? menuItemsActiveColor : menuItemsInactiveColor,
        fontFamily: _fonts.body,
        fontSize: 14,
        fontWeight: '600',
        paddingTop: textPadding,
        paddingBottom: textPadding,
      },
      icon: {
        color: active ? menuItemsActiveColor : menuItemsInactiveColor,
        size: 20,
      },
    }

    if (
      active &&
      !activeIndicatorLine &&
      (iconOnLeft || variant !== 'desktop')
    ) {
      styles.container.backgroundColor = activeBackgroundFillColor
    }
    if (activeIndicatorLine) {
      styles.container.borderRadius = 0
      if (active && variant === 'desktop') {
        styles.container.borderBottom = activeIndicatorBorderStyles
      } else if (active && variant !== 'desktop') {
        styles.container.borderLeft = activeIndicatorBorderStyles
      }

      if (variant === 'desktop') {
        styles.text.paddingTop = 20
        styles.text.paddingBottom = 20 - (active ? lineSize : 0)
      } else {
        styles.container.paddingLeft = 56 - (active ? lineSize : 0)
      }
    }

    if (!iconOnLeft && variant === 'desktop') {
      styles.container.flexDirection = 'column'
      styles.container.alignItems = 'center'
      styles.container.paddingRight = 18
      styles.container.paddingLeft = 18
      styles.text.paddingTop = 2
      styles.text.paddingBottom =
        8 - (active && activeIndicatorLine ? lineSize : 0)
      styles.icon.marginTop = 8
      styles.icon.marginRight = 0
      styles.text.fontSize = 12

      if (!activeIndicatorLine && active) {
        styles.icon = {
          ...styles.icon,
          backgroundColor: activeBackgroundFillColor,
          borderRadius: activeBackgroundFillRounding,
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 2,
          paddingBottom: 2,
          marginTop: 6,
        }
        styles.text.paddingTop = 0
      }
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
