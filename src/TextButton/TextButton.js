import React, { Component } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import color from 'color'
import { Button } from '@protonapp/react-native-material-ui'

import '../Shared/icons'

export default class WrappedTextButton extends Component {
  static defaultProps = {
    primaryColor: '#6200ee',
    contrastColor: '#fff',
    text: 'Button',
    type: 'text',
  }

  getContainerStyles() {
    let { type, primaryColor } = this.props

    if (type === 'contained') {
      return { backgroundColor: primaryColor }
    }

    if (type === 'outlined') {
      let baseColor = color(primaryColor)
      let saturation = baseColor.hsl().color[1]
      let alpha = saturation <= 10 ? 0.23 : 0.5
      let borderColor = baseColor.fade(1 - alpha).toString()

      return { borderColor, borderWidth: 1 }
    }

    return {}
  }

  getTextStyles() {
    let { primaryColor, contrastColor, type } = this.props

    if (type === 'contained') {
      return { color: contrastColor }
    }

    return { color: primaryColor }
  }

  getAdditionalProps() {
    let { type } = this.props

    if (type === 'contained') {
      return { raised: true }
    }

    return {}
  }

  renderSub() {
    let { icon, action, text, upperCase } = this.props

    let containerStyles = this.getContainerStyles()

    let iconStyles = this.getTextStyles()
    let textStyles = { ...this.getTextStyles() }

    if (icon) {
      textStyles.marginRight = 5
    }

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
})
