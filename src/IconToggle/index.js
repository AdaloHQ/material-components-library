import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { IconToggle } from '@protonapp/react-native-material-ui'

export default (props) => {
  const {
    activeIcon,
    activeColor,
    toggleSize = 24,
    clickActions,
    input: { value, onChange },
    activeActions,
    inactiveActions,
  } = props

  let { inactiveIcon, inactiveColor } = props

  if (!inactiveIcon) {
    inactiveIcon = 'check-box-outline-blank'
  }

  if (!inactiveColor) {
    inactiveColor = '#bbb'
  }

  const [localChanges, setLocalChanges] = useState([])
  const localValue =
    localChanges.length !== 0 ? localChanges[localChanges.length - 1] : value

  const handlePress = async () => {
    if (onChange) {
      // Currently there's no error handling for when this onChange function errors out.
      // TODO: Handle when it doesn't properly update. To do this, you would make a setInterval
      // function to wait 2s (or something similar) and then check if the props did successfully change.
      const newValue = !localValue
      localChanges.push(newValue)
      setLocalChanges(localChanges)
      await onChange(newValue)
      if (activeActions && newValue) {
        await activeActions()
      }
      if (inactiveActions && !newValue) {
        await inactiveActions()
      }
      if (clickActions) {
        await clickActions()
      }
    }
  }

  useEffect(() => {
    if (localChanges.length !== 0) {
      // There are local changes queued up.
      if (!!value === localChanges[0]) {
        localChanges.shift()
        setLocalChanges(localChanges)
      }
    }
  }, [value])

  const styles = {
    wrapper: {
      height: toggleSize,
      width: toggleSize,
    },
    buttonWrapper: {
      margin: -12,
      width: 2 * toggleSize,
      height: 2 * toggleSize,
    },
  }

  const iconName = localValue ? activeIcon : inactiveIcon
  const iconColor = localValue ? activeColor : inactiveColor

  return (
    <View style={(styles.wrapper, styles.buttonWrapper)}>
      <IconToggle
        name={iconName}
        color={iconColor}
        underlayColor={activeColor}
        maxOpacity={0.3}
        size={toggleSize}
        onPress={handlePress}
        key={`iconToggle.${toggleSize}`}
      />
    </View>
  )
}
