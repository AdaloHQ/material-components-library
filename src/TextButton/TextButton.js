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

const RAISED_BUTTON_TYPES = new Set(['contained', 'custom'])

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
    hovering: false,
  }

  getContainerStyles() {
    const defaults = this.props
    const {
      type = defaults.type,
      primaryColor = defaults.primaryColor,
      borderRadius = defaults.borderRadius,
      sizing = defaults.sizing,
      icon = defaults.icon,
      text = defaults.text,
      opacity = defaults.opacity,
      border = {},
      advancedShadow = {},
      hover = false,
    } = this.getButtonState()
    const { hovering } = this.state

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
      let backgroundColor = primaryColor
      if (hover && hovering) {
        backgroundColor = this.getHoverColor()
      }
      return {
        ...containerStyles,
        backgroundColor,
        borderRadius,
      }
    }

    if (type === 'custom') {
      const opacityValue = typeof opacity === 'number' ? opacity : 100
      const borderStyles =
        border?.borderStyle && border?.borderStyle !== 'none' ? border : {}

      let shadowStyles = {}

      if (advancedShadow?.enabled) {
        shadowStyles = {
          shadowColor: advancedShadow.color,
          shadowOffset: {
            width: advancedShadow.x ?? 0,
            height: advancedShadow.y ?? 0,
          },
          shadowOpacity: 1,
          shadowRadius: advancedShadow.size ?? 0,
        }
      }

      let backgroundColor = primaryColor
      if (hover && hovering) {
        backgroundColor = this.getHoverColor()
      }

      return {
        ...containerStyles,
        ...borderStyles,
        ...shadowStyles,
        backgroundColor,
        opacity: opacityValue / 100,
        borderRadius,
      }
    }

    if (type === 'outlined') {
      let baseColor = color(primaryColor)
      let saturation = baseColor.hsl().color[1]
      let alpha = saturation <= 10 ? 0.23 : 0.5
      let borderColor = baseColor.fade(1 - alpha).toString()
      const hoverColor = baseColor.fade(0.9).toString()

      return {
        ...containerStyles,
        borderColor,
        borderWidth: 1,
        borderRadius,
        backgroundColor: hover && hovering ? hoverColor : null,
      }
    }

    return containerStyles
  }

  getHoverColor() {
    const { primaryColor = defaults.primaryColor } = this.getButtonState()

    const baseColor = color(primaryColor)
    const light = baseColor.isLight()
    const augmentedColor = light
      ? baseColor.darken(0.2)
      : baseColor.lighten(0.2)

    return augmentedColor.toString()
  }

  getTextStyles() {
    const { _fonts, ...defaults } = this.props
    const { hovering } = this.state
    const {
      primaryColor = defaults.primaryColor,
      contrastColor = defaults.contrastColor,
      type = defaults.type,
      icon = defaults.icon,
      styles = defaults.styles,
      sizing = defaults.sizing,
      hover = false,
    } = this.getButtonState()

    const textStyles = { fontWeight: '600' }

    if (contrastColor && RAISED_BUTTON_TYPES.has(type)) {
      textStyles.color = contrastColor
    } else {
      if (hover && hovering && type === 'text') {
        textStyles.color = this.getHoverColor()
      } else {
        textStyles.color = primaryColor
      }
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
    const { type = this.props.type, shadow = true } = this.getButtonState()

    if (RAISED_BUTTON_TYPES.has(type) && shadow) {
      return { raised: true }
    }

    return {}
  }

  getButtonState() {
    const { additionalState1, additionalState2, openAccordion, editor } =
      this.props

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
    const { action } = this.getButtonState()

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
    const defaults = this.props
    const {
      icon = defaults.icon,
      action,
      text = defaults.text,
      upperCase = defaults.upperCase,
      container = defaults.container,
      sizing = defaults.sizing,
    } = this.getButtonState()
    const newButtonStyles = SIZE_PROPERTIES.has(sizing)
    const { hovering } = this.state

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

    const onMouseEnter = () => {
      this.setState({ hovering: true })
    }

    const onMouseLeave = () => {
      this.setState({ hovering: false })
    }

    return (
      <View onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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
