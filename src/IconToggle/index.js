import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { IconToggle } from '@protonapp/react-native-material-ui'



export default class WrappedIconToggle extends Component {
  handlePress = async () => {
    let {
      clickActions,
      input: { value, onChange },
    } = this.props
    //await onChange(!value)

    let {
      activeActions,
      input: { value, onChange },
    } = this.props
    await onChange(value == true)
    if (activeActions) {
      await activeActions()
    }
    if (clickActions) {
      await clickActions()
    }

    let {
      inactiveActions,
      input: { value, onChange },
    } = this.props
    await onChange(value == false )
    if (inactiveActions) {
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
    const defaultProps = {
      toggleSize: 24
    }
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
