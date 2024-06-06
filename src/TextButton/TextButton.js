import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import color from 'color'
import { Button } from '@protonapp/react-native-material-ui'

import '../Shared/icons'

const iconSizes = [48, 32, 24, 20, 18, 16]
const spaceSizes = [16, 12, 8, 6, 4, 2]
// const spaceSizes = [18, 14, 10, 8, 6, 4]
const fontSizes = [32, 24, 18, 14, 12, 10]

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
    let { type, primaryColor, borderRadius, sizing, icon, text } = this.props
    const newButtonStyles = typeof sizing === 'number'

    const styles = newButtonStyles
      ? {
          paddingLeft: 2,
          paddingRight: 2,
          gap: icon && text ? spaceSizes[sizing] : 0,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0,
        }
      : {}

    if (type === 'contained') {
      return {
        ...styles,
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
        ...styles,
        borderColor,
        borderWidth: 1,
        borderRadius,
      }
    }

    return styles
  }

  getTextStyles() {
    let { primaryColor, contrastColor, type, icon, styles, sizing, _fonts } =
      this.props

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

    if (typeof sizing === 'number') {
      textStyles.fontSize = fontSizes[sizing]
      textStyles.marginLeft = 0
      textStyles.marginRight = 0
      textStyles.paddingLeft = 0
      textStyles.paddingRight = 0
    }

    return textStyles
  }

  getIconStyles() {
    const { sizing } = this.props

    if (typeof sizing === 'number') {
      return { fontSize: iconSizes[sizing] }
    }

    return {}
  }

  getAdditionalProps() {
    let { type, shadow = true } = this.props

    if (type === 'contained' && shadow) {
      return { raised: true }
    }

    return {}
  }

  submitAction = async () => {
    let { action } = this.props

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
    let { icon, action, text, upperCase, container, sizing } = this.props
    const newButtonStyles = typeof sizing === 'number'

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
