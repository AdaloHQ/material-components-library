import React, { useState } from 'react'
import { View, Platform } from 'react-native'

import { Button } from '@protonapp/react-native-material-ui'

export const MenuItems = ({
  activeMenuItem,
  menuItems,
  items,
  variant,
  setActiveMenuItem,
  centerStyles,
  menuHeight,
  closeMobileMenu,
}) => {
  const {
    iconOnLeft,
    activeIndicatorLine,
    lineSize,
    activeBackgroundFillColor,
    activeBackgroundFillRounding,
    menuItemsActiveColorFill,
    menuItemsActiveColorLine,
    menuItemsInactiveColor,
    menuItemsHoverColor,
  } = menuItems
  const menuItemsActiveColor = activeIndicatorLine
    ? menuItemsActiveColorLine
    : menuItemsActiveColorFill

  const transparent = '#ffffff00'

  const [hoverState, setHoverState] = useState(Array(5).fill(transparent))

  let menuItemsStyles = {
    flexDirection: 'row',
    marginLeft: menuItems.alignment === 'right' ? 'auto' : 0,
  }

  const buttonHeight = menuHeight - 20

  if (menuItems.alignment === 'center') {
    menuItemsStyles = {
      ...menuItemsStyles,
      ...centerStyles,
    }
  }

  if (variant !== 'desktop') {
    menuItemsStyles = {
      flexDirection: 'column',
      width: '100%',
      marginTop: 20,
      justifyContent: 'flex-start',
    }

    if (activeIndicatorLine) {
      menuItemsStyles.marginLeft = -23
    }
  }

  const renderItem = (item, index) => {
    const {
      enabled,
      icon,
      text,
      actions,
      styles: { text: makerStyles },
    } = item
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
        height: variant === 'desktop' ? 39 : 56,
        paddingLeft: variant !== 'desktop' ? 32 : 12,
        paddingRight: 12,
        maxWidth: 400,
        marginRight: 8,
      },
      text: {
        color: active ? menuItemsActiveColor : menuItemsInactiveColor,
        paddingTop: textPadding,
        paddingBottom: textPadding,
        fontSize: 14,
        fontWeight: '600',
        fontSize: makerStyles.fontSize,
        fontWeight: makerStyles.fontWeight,
        fontFamily: makerStyles.fontFamily,
      },
      icon: {
        color: active ? menuItemsActiveColor : menuItemsInactiveColor,
        fontSize: 20,
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
      styles.container.height = buttonHeight
      styles.text.paddingTop = 0
      styles.text.paddingBottom = 0
      if (active && variant === 'desktop') {
        styles.container.borderBottom = activeIndicatorBorderStyles
      } else if (active && variant !== 'desktop') {
        styles.container.borderLeftWidth = lineSize
        styles.container.borderColor = menuItemsActiveColor
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

      if (!activeIndicatorLine) {
        styles.icon = {
          ...styles.icon,
          backgroundColor: active ? activeBackgroundFillColor : transparent,
          borderRadius: activeBackgroundFillRounding * 2,
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 2,
          paddingBottom: 2,
          marginTop: 6,
        }
        styles.text.paddingTop = 0
      }
    }

    if (!activeIndicatorLine && !active) {
      if (iconOnLeft) {
        styles.container.backgroundColor = hoverState[index]
      } else {
        styles.icon.backgroundColor = hoverState[index]
      }
    }

    const buttonText = truncateString(text, 15)

    const MenuItem = (
      <Button
        key={index}
        icon={icon}
        text={buttonText || ''}
        onPress={() => {
          setActiveMenuItem(index)
          closeMobileMenu && closeMobileMenu()
          actions && actions()
        }}
        style={styles}
        upperCase={false}
      />
    )

    if (Platform.OS === 'web') {
      return (
        <View
          onMouseEnter={() => {
            hoverState[index] = menuItemsHoverColor
            setHoverState(
              hoverState.map((x, i) => (i === index ? menuItemsHoverColor : x))
            )
          }}
          onMouseLeave={() => {
            hoverState[index] = transparent
            setHoverState(
              hoverState.map((x, i) => (i === index ? transparent : x))
            )
          }}
        >
          {MenuItem}
        </View>
      )
    } else {
      return MenuItem
    }
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
