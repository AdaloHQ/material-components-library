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
    let { primaryColor, contrastColor, type, icon, styles, upperCase, _fonts } = this.props

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
      textStyles.marginRight = 5
    }

    if (upperCase) {
      textStyles.letterSpacing = 1
    }

    return textStyles
  }

  getIconStyles() {
    const { icon } = this.props;
    // Base icon styles are same as text styles
    const iconStyles = this.getTextStyles()
    // marginRight needs to be removed from base text styles for icons
    delete iconStyles.marginRight;

    if (!iconStyles.width && !iconStyles.minWidth) {
      // Set default icon size as min width
      iconStyles.minWidth = 24;
    }

    return iconStyles
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
    let { icon, action, text, upperCase } = this.props

    let containerStyles = this.getContainerStyles()
    let textStyles = this.getTextStyles()
    let iconStyles = this.getIconStyles()

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
              container: containerStyles,
              icon: iconStyles,
              text: [textStyles, styles.text],
            }}
            disabled={action ? this.state.loading : true}
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
