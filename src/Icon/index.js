import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from '@protonapp/react-native-material-ui'

export default class WrappedIcon extends Component {
  render() {
    let { iconName, iconColor } = this.props

    return (
        <Icon
          name={iconName}
          color={iconColor}
          size={24}
        />
    )
  }
}

