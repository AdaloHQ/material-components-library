import React, { Component } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import color from 'color'
import { Button } from '@protonapp/react-native-material-ui'

import '../Shared/icons'

export default class WrappedTextButton extends Component {
  static defaultProps = {
    secondaryColor: '#6200ee',
    contrastColor: '#fff',
    text: 'Button',
    type: 'text',
  }

  getContainerStyles() {
    let { type, secondaryColor } = this.props

    if (type === 'contained') {
      return { backgroundColor: secondaryColor }
    }

    if (type === 'outlined') {
      let baseColor = color(secondaryColor)
      let saturation = baseColor.hsl().color[1]
      let alpha = saturation <= 10 ? 0.23 : 0.5
      let borderColor = baseColor.fade(1 - alpha).toString()

      return { borderColor, borderWidth: 1 }
    }

    return {}
  }

  getTextStyles() {
    let { secondaryColor, contrastColor, type } = this.props

    if (type === 'contained') {
      return { color: contrastColor }
    }

    return { color: secondaryColor }
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
