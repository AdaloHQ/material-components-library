import React, { Component } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { ActionButton } from '@protonapp/react-native-material-ui'

import '../Shared/icons'

export default class WrappedActionButton extends Component {
  static defaultProps = {
    backgroundColor: '#6200ee',
    color: '#fff',
  }

  renderSub() {
    let { color, backgroundColor, icon, action } = this.props

    let containerStyles = {
      backgroundColor,
      position: 'relative',
      bottom: 'auto',
      right: 'auto',
    }

    if (Platform.OS === 'web') {
      containerStyles.WebkitFontSmoothing = 'antialiased'
    }

    let iconStyles = { color }

    return (
      <View style={styles.wrapper} pointerEvents="box-none">
        <ActionButton
          icon={icon}
          onPress={action}
          style={{
            container: containerStyles,
            icon: iconStyles,
          }}
        />
      </View>
    )
  }

  render() {
    return this.renderSub()
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: 76,
    height: 76,
    marginRight: -20,
    marginBottom: -20,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
