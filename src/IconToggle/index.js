import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { IconToggle } from '@protonapp/react-native-material-ui'

export default class WrappedIconToggle extends Component {
  handlePress = async () => {
    let {
      clickActions,
      input: { value, onChange },
    } = this.props
    await onChange(!value)
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
    } = this.props

    let iconName = value ? activeIcon : inactiveIcon
    let iconColor = value ? activeColor : inactiveColor

    return (
      <View style={styles.buttonWrapper}>
        <IconToggle
          name={iconName}
          color={iconColor}
          underlayColor={activeColor}
          maxOpacity={0.3}
          size={24}
          onPress={this.handlePress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    margin: -12,
    width: 48,
    height: 48,
    overflow: 'hidden',
  },
})
