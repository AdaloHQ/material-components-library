import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, IconToggle } from '@protonapp/react-native-material-ui'

export default class WrappedIconToggle extends Component {
  render() {
    let { iconName, iconColor, onPress, iconSize } = this.props
    if (!iconSize) iconSize = 24

    const styles = {
      wrapper: {
        height: iconSize,
        width: iconSize,
        overflow: 'hidden',
      },
      buttonWrapper: {
        margin: -12,
        width: 2*iconSize,
        height: 2*iconSize,
      }
    }

    if (!onPress) {
      return (
        <View style={styles.wrapper}>
          <Icon
            name={iconName}
            color={iconColor}
            size={iconSize}
          />
        </View>
      )
    }

    return (
      <View style={styles.wrapper, styles.buttonWrapper}>
        <IconToggle
          name={iconName}
          color={iconColor}
          underlayColor={iconColor}
          maxOpacity={0.3}
          size={iconSize}
          onPress={onPress}
        />
      </View>
    )
  }
}
