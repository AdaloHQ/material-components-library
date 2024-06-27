import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import color from 'color'
import { Button } from '@protonapp/react-native-material-ui'

import '../Shared/icons'

const SIZE_PROPERTIES = new Map([
  ['gigantic', { icon: 48, space: 16, font: 32 }],
  ['extraLarge', { icon: 32, space: 12, font: 24 }],
  ['large', { icon: 24, space: 8, font: 18 }],
  ['medium', { icon: 20, space: 6, font: 14 }],
  ['small', { icon: 18, space: 4, font: 12 }],
  ['extraSmall', { icon: 16, space: 2, font: 10 }],
])

export default class WrappedTextButton extends Component {
  _isMounted = false

  static defaultProps = {
    primaryColor: '#6200ee',
    contrastColor: '#fff',
    text: '',
    type: 'text',
    borderRadius: 2,
  }
  state = {
    loading: false,
    backgroundColor: this.props.primaryColor,
  }

  getContainerStyles() {
    let { type, primaryColor, borderRadius, sizing, icon, text } =
      this.getButtonState()

    const containerStyles = SIZE_PROPERTIES.has(sizing)
      ? {
          paddingLeft: 2,
          paddingRight: 2,
          gap: icon && text ? SIZE_PROPERTIES.get(sizing).space : 0,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0,
        }
      : {}

    if (type === 'contained') {
      return {
        ...containerStyles,
        backgroundColor: primaryColor,
        borderRadius,
      }
    }

    if (type === 'outlined') {
      let baseColor = color(primaryColor)
      let saturation = baseColor.hsl().color[1]
      let alpha = saturation <= 10 ? 0.23 : 0.5
      let borderColor = baseColor.fade(1 - alpha).toString()

      return {
        ...containerStyles,
        borderColor,
        borderWidth: 1,
        borderRadius,
      }
    }

    return containerStyles
  }

  getTextStyles() {
    let { primaryColor, contrastColor, type, icon, styles, sizing, _fonts } =
      this.getButtonState()

    const textStyles = { fontWeight: '600' }

    if (contrastColor && type === 'contained') {
      textStyles.color = contrastColor
    } else {
      textStyles.color = primaryColor
    }
    //custom fonts
    if (styles) {
      textStyles.fontFamily = styles.text.fontFamily
      textStyles.fontWeight = styles.text.fontWeight
    } else if (_fonts) {
      textStyles.fontFamily = _fonts.body
    }

    if (icon) {
      textStyles.marginLeft = 8
    }

    if (SIZE_PROPERTIES.has(sizing)) {
      textStyles.fontSize = SIZE_PROPERTIES.get(sizing).font
      textStyles.marginLeft = 0
      textStyles.marginRight = 0
      textStyles.paddingLeft = 0
      textStyles.paddingRight = 0
    }

    return textStyles
  }

  getIconStyles() {
    const { sizing } = this.getButtonState()

    if (SIZE_PROPERTIES.has(sizing)) {
      return { fontSize: SIZE_PROPERTIES.get(sizing).icon }
    }

    return {}
  }

  getAdditionalProps() {
    let { type, shadow = true } = this.getButtonState()

    if (type === 'contained' && shadow) {
      return { raised: true }
    }

    return {}
  }

  getButtonState() {
    const { additionalState1, additionalState2, openAccordion, editor } = this.props

    if (editor) {
      if (openAccordion === 'additionalState1' && additionalState1?.enabled) {
        return additionalState1
      }
  
      if (openAccordion === 'additionalState2' && additionalState2?.enabled) {
        return additionalState2
      }
    } else {
      if (additionalState2?.enabled && additionalState2?.condition) {
        return additionalState2
      }

      if (additionalState1?.enabled && additionalState1?.condition) {
        return additionalState1
      }
    }

    return this.props
  }

  submitAction = async () => {
    let { action } = this.getButtonState()

    this.setState({ loading: true })

    await action()

    if (this._isMounted) {
      this.setState({ loading: false })
    }
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  renderSub() {
    let { icon, action, text, upperCase, container, sizing } = this.getButtonState()
    const newButtonStyles = SIZE_PROPERTIES.has(sizing)

    let containerStyles = this.getContainerStyles()
    let iconStyles = this.getTextStyles()
    let textStyles = { ...this.getTextStyles() }

    if (icon && !newButtonStyles) {
      textStyles.marginRight = 5
    }

    if (newButtonStyles) {
      iconStyles = { ...iconStyles, ...this.getIconStyles() }

      if (!text) {
        textStyles = {}
      }
    }

    if (upperCase) {
      if (newButtonStyles) {
        textStyles.letterSpacing = 0.6
      } else {
        textStyles.letterSpacing = 1
      }
    }

    return (
      <View>
        <View>
          <Button
            {...this.getAdditionalProps()}
            upperCase={!!upperCase}
            icon={this.state.loading ? '' : icon}
            onPress={action && this.submitAction}
            text={this.state.loading ? '' : text}
            style={{
              container: [
                containerStyles,
                container,
                { height: this.props._height },
              ],
              icon: iconStyles,
              text: [textStyles, styles.text],
            }}
            disabled={this.state.loading}
          />
        </View>
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color={textStyles.color} />
          </View>
        )}
      </View>
    )
  }

  render() {
    return this.renderSub()
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
