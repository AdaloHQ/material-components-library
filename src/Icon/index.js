import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, IconToggle } from '@protonapp/react-native-material-ui'

export default class WrappedIconToggle extends Component {
  render() {
    let { iconName, iconColor, onPress } = this.props

    if (!onPress) {
      return (
        <View style={styles.wrapper}>
          <Icon
            name={iconName}
            color={iconColor}
            size={24}
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
          size={24}
          onPress={onPress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  buttonWrapper: {
    margin: -12,
    width: 48,
    height: 48,
  }
})
