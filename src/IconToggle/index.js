import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { IconToggle } from '@protonapp/react-native-material-ui'

export default class WrappedIconToggle extends Component {
  handlePress = async () => {
    let {
      clickActions,
      input: { value, onChange },
      activeActions,
      inactiveActions,
    } = this.props
    await onChange(!value)
    if (activeActions && !value) {
      await activeActions()
    }
    if (inactiveActions && value) {
      await inactiveActions()
    }
    if (clickActions) {
      await clickActions()
    }
  }

  render() {
    let {
      input: { value },
      inactiveIcon,
      activeIcon,
      inactiveColor,
      activeColor,
      toggleSize
    } = this.props
    if (!toggleSize) toggleSize = 24
    const styles = {
      wrapper: {
        height: toggleSize,
        width: toggleSize,
        overflow: 'hidden',
      },
      buttonWrapper: {
        margin: -12,
        width: 2*toggleSize,
        height: 2*toggleSize,
        overflow: 'hidden',
      }
    }

    let iconName = value ? activeIcon : inactiveIcon
    let iconColor = value ? activeColor : inactiveColor

    return (
      <View style={styles.wrapper, styles.buttonWrapper}>
        <IconToggle
          name={iconName}
          color={iconColor}
          underlayColor={activeColor}
          maxOpacity={0.3}
          size={toggleSize}
          onPress={this.handlePress}
          key={`iconToggle.${toggleSize}`}
        />
      </View>
    )
  }
}
