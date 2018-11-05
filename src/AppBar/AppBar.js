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

    let containerStyles = {
      backgroundColor,
      height: 76,
      paddingTop: 20,
    }

    if (!editor) {
      containerStyles = {
        ...containerStyles,
        height: 106,
        paddingTop: 50,
        marginTop: -30,
      }
    }

    if (Platform.OS === 'web') {
      containerStyles.WebkitFontSmoothing = 'antialiased'
    }

    let titleStyles = { color }

    if (Platform.OS === 'ios') {
      titleStyles.fontFamily = 'System'
    } else if (Platform.OS === 'web') {
      titleStyles.fontFamily = 'inherit'
    }

    return (
      <Toolbar
        leftElement={this.getIcon('leftIcon')}
        centerElement={this.getTitleText()}
        rightElement={this.getRightIcons()}
        onRightElementPress={this.handleRightElementPress}
        onLeftElementPress={this.handleLeftElementPress}
        onPress={this.handleCenterElementPress}
        style={{
          container: containerStyles,
          titleText: titleStyles,
          leftElement: { color },
          rightElement: { color },
        }}
      />
    )
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <View
          style={styles.iosBar}
        >
          {this.renderSub()}
        </View>
      )
    }

    return this.renderSub()
  }
}

const styles = StyleSheet.create({
  iosBar: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
  }
})
