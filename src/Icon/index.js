import React, { Component } from 'react'
import { View, ActivityIndicator, Platform } from 'react-native'
import { Icon, IconToggle } from '@protonapp/react-native-material-ui'

import '../Shared/iconLoader'

export default class WrappedIconToggle extends Component {
  state = {
    isLoading: false,
  }

  clickAction = async () => {
    const { onPress } = this.props

    if (!onPress) {
      return
    }

    this.setState({
      isLoading: true,
    })

    await onPress()

    this.setState({
      isLoading: false,
    })
  }



  render() {
    const { iconName, iconColor, onPress, iconSize = 24, getFlags } = this.props
    const { isLoading } = this.state

    const styles = {
      wrapper: {
        height: iconSize,
        width: iconSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }

    if (!onPress) {
      return (
        <View style={styles.wrapper}>
          <Icon
            name={iconName}
            color={iconColor}
            size={iconSize}
            key={`iconToggle.${iconSize}`}
          />
        </View>
      )
    }

    const onPressAction = this.clickAction

    if (isLoading) {
      let spinnerSize = 'small'

      if (iconSize > 40) {
        spinnerSize = 'large'
      }

      // a number is a valid size value for Android devices
      if (Platform.OS === 'android') {
        spinnerSize = iconSize
      }

      return (
        <View style={styles.wrapper}>
          <ActivityIndicator size={spinnerSize} color={iconColor} />
        </View>
      )
    }

    return (
      <View style={styles.wrapper}>
        <IconToggle
          name={iconName}
          color={iconColor}
          underlayColor={iconColor}
          maxOpacity={0.3}
          size={iconSize}
          onPress={onPressAction}
          key={`iconToggle.${iconSize}`}
        />
      </View>
    )
  }
}
