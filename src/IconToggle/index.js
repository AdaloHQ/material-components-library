import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { IconToggle } from '@protonapp/react-native-material-ui'

export default (props) => {
  const {
    inactiveIcon,
    activeIcon,
    inactiveColor,
    activeColor,
    toggleSize = 24,
    clickActions,
    input: { value, onChange },
    activeActions,
    inactiveActions,
  } = props

  const [localChanges, setLocalChanges] = useState([])
  const [localValue, setLocalValue] = useState(value)

  const handlePress = async () => {
    if (typeof value !== 'undefined') {
      // Currently there's no error handling for when this onChange function errors out.
      // TODO: Handle when it doesn't properly update. To do this, you would make a setInterval
      // function to wait 2s (or something similar) and then check if the props did successfully change.
      const newValue = !localValue
      localChanges.push(newValue)
      setLocalChanges(localChanges)
      setLocalValue(newValue)
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
    console.log('value changed. new value:', value)
    if (typeof localValue === 'undefined' && typeof value !== 'undefined') {
      setLocalValue(value)
    }

    if (localChanges.length !== 0) {
      // There are local changes queued up.
      if (value === localChanges[0]) {
        localChanges.shift()
        if (localChanges.length !== 0 && localValue !== value) {
          setLocalValue(value)
        }
        setLocalChanges(localChanges)
      }
    }
  }, [value])

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

  let iconName = localValue ? activeIcon : inactiveIcon
  let iconColor = localValue ? activeColor : inactiveColor

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
