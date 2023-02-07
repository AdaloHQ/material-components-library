import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import color from 'color'
import { Button } from '@protonapp/react-native-material-ui'

import '../Shared/icons'

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
    let { type, primaryColor, borderRadius } = this.props

    if (type === 'contained') {
      return { backgroundColor: primaryColor, borderRadius }
    }

    if (type === 'outlined') {
      let baseColor = color(primaryColor)
      let saturation = baseColor.hsl().color[1]
      let alpha = saturation <= 10 ? 0.23 : 0.5
      let borderColor = baseColor.fade(1 - alpha).toString()

      return { borderColor, borderWidth: 1, borderRadius }
    }

    return {}
  }

  getTextStyles() {
    let { primaryColor, contrastColor, type, icon, styles, _fonts } = this.props

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
    return textStyles
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
    let { icon, action, text, upperCase, container } = this.props

    let containerStyles = this.getContainerStyles()
    let iconStyles = this.getTextStyles()
    let textStyles = { ...this.getTextStyles() }

    if (icon) {
      textStyles.marginRight = 5
    }

    if (upperCase) {
      textStyles.letterSpacing = 1
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
              container: [containerStyles, container],
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
