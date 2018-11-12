import React, { Component } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { Button } from '@protonapp/react-native-material-ui'

import '../Shared/icons'

export default class WrappedTextButton extends Component {
  static defaultProps = {
    backgroundColor: '#6200ee',
    color: '#fff',
    text: 'Button',
  }

  getContainerStyles() {
    return {}
  }

  getTextStyles() {
    let { color } = this.props

    return { color }
  }

  getAdditionalProps() {
    return {}
  }

  renderSub() {
    let { color, backgroundColor, icon, action, text, upperCase } = this.props

    let containerStyles = this.getContainerStyles()

    if (Platform.OS === 'web') {
      containerStyles.WebkitFontSmoothing = 'antialiased'
    }

    let iconStyles = this.getTextStyles()
    let textStyles = { ...this.getTextStyles(), marginRight: 5 }

    return (
        <Button
          {...this.getAdditionalProps()}
          upperCase={!!upperCase}
          icon={icon}
          onPress={action}
          text={text}
          style={{
            container: containerStyles,
            icon: iconStyles,
            text: textStyles,
          }}
        />
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
