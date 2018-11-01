import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import './icons'

export default class AppBar extends Component {
  static defaultProps = {
    title: {},
    leftIcon: {},
    rightIcon1: {},
    rightIcon2: {},
    backgroundColor: '#6200ee',
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

    return text
  }

  handleRightElementPress = ({ index }) => {
    let { rightIcon1, rightIcon2 } = this.props
    let firstIcon = this.getIcon('rightIcon1') || {}

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

  render() {
    let { color, backgroundColor } = this.props

    return (
      <Toolbar
        leftElement={this.getIcon('leftIcon')}
        centerElement={this.getTitleText()}
        rightElement={this.getRightIcons()}
        onRightElementPress={this.handleRightElementPress}
        onLeftElementPress={this.handleLeftElementPress}
        onPress={this.handleCenterElementPress}
        style={{
          container: { backgroundColor, height: 76, paddingTop: 20 },
          titleText: { color, fontFamily: 'inherit' },
        }}
        iconProps={{ color }}
      />
    )
  }
}
