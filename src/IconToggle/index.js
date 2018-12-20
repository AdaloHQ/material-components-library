import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { IconToggle } from '@protonapp/react-native-material-ui'

export default class WrappedIconToggle extends Component {
  handlePress = () => {
    let { value, onChange } = this.props

    onChange(!value)
  }

  render() {
    let {
      value,
      inactiveIcon,
      activeIcon,
      inactiveColor,
      activeColor,
    } = this.props

    let iconName = value ? activeIcon : inactiveIcon
    let iconColor = value ? activeColor : inactiveColor

    return (
      <IconToggle
        name={iconName}
        color={iconColor}
        underlayColor={activeColor}
        maxOpacity={0.3}
        size={24}
        onPress={this.handlePress}
      />
    )
  }
}

