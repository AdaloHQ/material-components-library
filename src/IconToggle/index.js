import React from 'react'
import { View, StyleSheet } from 'react-native'
import { IconToggle as ProtonIconToggle } from '@protonapp/react-native-material-ui'
import '../Shared/iconLoader'

class IconToggle extends React.Component {
  state = {
    localChanges: [],
  }

  componentDidUpdate(prevProps, prevState) {
    const { input } = this.props

    if (prevProps.input.value !== input.value) {
      this.handleLocalValue()
    }
  }

  getLocalValue = () => {
    const { localChanges } = this.state
    const { input } = this.props

    return localChanges.length !== 0
      ? localChanges[localChanges.length - 1]
      : input.value
  }

  handleLocalValue = () => {
    let { localChanges } = this.state
    const { input } = this.props

    if (localChanges.length !== 0) {
      if (!!input.value !== localChanges[0]) {
        // remove first item from array
        localChanges.shift()

        this.setState((state) => ({
          ...state,
          localChanges,
        }))
      }
    }
  }

  handlePress = async () => {
    const { activeActions, clickActions, inactiveActions, input } = this.props

    if (input.onChange) {
      const value = !this.getLocalValue()

      // update state with new value
      this.setState((state) => ({
        ...state,
        localChanges: [...state.localChanges, value],
      }))

      await input.onChange(value)

      if (typeof activeActions === 'function' && value) {
        await activeActions().catch((err) => {
          console.error('active actions failed', err)
        })
      }

      if (typeof inactiveActions === 'function' && !value) {
        await inactiveActions().catch((err) => {
          console.error('inactive actions failed', err)
        })
      }

      if (typeof clickActions === 'function') {
        await clickActions().catch((err) => {
          console.error('click actions failed', err)
        })
      }
    }
  }

  render() {
    const {
      activeColor,
      activeIcon,
      inactiveIcon = 'check-box-outline-blank',
      inactiveColor = '#bbbbbb',
      toggleSize = 24,
    } = this.props

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

    const localValue = this.getLocalValue()

    const iconName = localValue ? activeIcon : inactiveIcon
    const iconColor = localValue ? activeColor : inactiveColor

    return (
      <View style={[styles.wrapper, styles.buttonWrapper]}>
        <ProtonIconToggle
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

export default IconToggle
