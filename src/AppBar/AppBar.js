import React, { Component } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { Toolbar } from '@protonapp/react-native-material-ui'

import '../Shared/icons'

export default class AppBar extends Component {
  static defaultProps = {
    title: {},
    leftIcon: {},
    rightIcon1: {},
    rightIcon2: {},
    backgroundColor: 'blue',
    color: '#fff',
  }

  getIcon(propName) {
    let { [propName]: { icon, enabled } } = this.props

    return enabled ? icon : null
  }

  getRightIcons() {
    let icons = [this.getIcon('rightIcon1'), this.getIcon('rightIcon2')]

    return icons.filter(i => i)
  }

  getTitleText() {
    let { title: { text } } = this.props

    return text.replace(/[\r\n]/g, ' ').trim()
  }

  getCentered() {
    let { title: { align } } = this.props

    return align === 'center'
  }

  handleRightElementPress = ({ index }) => {
    let { rightIcon1, rightIcon2 } = this.props
    let firstIcon = this.getIcon('rightIcon1')

    if (firstIcon && index === 0) {
      rightIcon1.action && rightIcon1.action()
    } else {
      rightIcon2.action && rightIcon2.action()
    }
  }

  handleLeftElementPress = () => {
    let { leftIcon: { action } } = this.props

    action && action()
  }

  handleCenterElementPress = () => {
    let { title: { action } } = this.props

    action && action()
  }

  renderSub() {
    let { color, backgroundColor, editor } = this.props
    let centered = this.getCentered()

    let containerStyles = {
      backgroundColor,
      height: 76,
      paddingTop: 20,
      justifyContent: 'space-between',
    }

    if (!editor) {
      containerStyles = {
        ...containerStyles,
        height: 106,
        paddingTop: 50,
        marginTop: -30,
      }
    }

    let titleStyles = { color }

    if (Platform.OS === 'ios') {
      titleStyles.fontFamily = 'System'
    } else if (Platform.OS === 'web') {
      titleStyles.fontFamily = 'inherit'
    }

    let titleContainerStyles = {}

    let rightIcons = this.getRightIcons()
    let leftIcon = this.getIcon('leftIcon')

    if (centered) {
      let leftPad = leftIcon ? 64 : 16
      let rightPad = rightIcons.length * 48 + 16
      let padding = Math.max(leftPad, rightPad)

      if (!leftIcon) {
        containerStyles.justifyContent = 'flex-end'
      }

      titleContainerStyles = {
        position: 'absolute',
        marginLeft: 0,
        left: padding,
        right: padding,
        bottom: 16,
      }

      titleStyles.textAlign = 'center'
    }

    return (
      <Toolbar
        leftElement={leftIcon}
        centerElement={this.getTitleText()}
        rightElement={rightIcons}
        onRightElementPress={this.handleRightElementPress}
        onLeftElementPress={this.handleLeftElementPress}
        onPress={this.handleCenterElementPress}
        style={{
          container: containerStyles,
          titleText: titleStyles,
          centerElementContainer: titleContainerStyles,
          leftElement: { color },
          rightElement: { color },
        }}
      />
    )
  }

  render() {
    let { v2 } = this.props
    let wrapperStyles = v2 ? [styles.wrapper] : []

    if (Platform.OS === 'ios') {
      wrapperStyles.push(styles.iosBar)
    }

    return (
      <View style={wrapperStyles}>
        {this.renderSub()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: -20,
  },
  iosBar: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  }
})
