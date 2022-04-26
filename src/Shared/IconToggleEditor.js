import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { IconToggle } from '@protonapp/react-native-material-ui'
import '../Shared/iconLoader'

export default (props) => {
  const { activeColor, toggleSize = 24 } = props

  let { inactiveIcon, inactiveColor } = props

  if (!inactiveIcon) {
    inactiveIcon = 'check-box-outline-blank'
  }

  if (!inactiveColor) {
    inactiveColor = '#bbb'
  }

  const styles = {
    wrapper: {
      height: toggleSize,
      width: toggleSize,
      overflow: 'hidden',
    },
    buttonWrapper: {
      margin: -12,
      width: 2 * toggleSize,
      height: 2 * toggleSize,
      overflow: 'hidden',
    },
  }

  const iconName = inactiveIcon
  const iconColor = inactiveColor

  return (
    <View style={(styles.wrapper, styles.buttonWrapper)}>
      <IconToggle
        name={iconName}
        color={iconColor}
        underlayColor={activeColor}
        maxOpacity={0.3}
        size={toggleSize}
        key={`iconToggle.${toggleSize}`}
      />
    </View>
  )
}
