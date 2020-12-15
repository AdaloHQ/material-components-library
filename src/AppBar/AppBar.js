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

    if (!text || typeof text !== 'string') { return undefined }

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
import React, { Component } from 'react'
import { Platform, View, StyleSheet, Image, ImageBackground } from 'react-native'
import { Toolbar } from '@protonapp/react-native-material-ui'

import Blur from './blur'


import '../Shared/icons'

export default class AppBar extends Component {
  static defaultProps = {
    title: {},
    leftIcon: {},
    rightIcon1: {},
    rightIcon2: {},
    backgroundColor: 'blue',
    color: '#fff',
    bottomBorder: false,
    borderColor: '#fff',
    borderWidth: 1,
    shadow: false,
    barType: "solid",
    backgroundImage: {},
    translucentColor: '#fff',
    titleType: "text"
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

    if (!text || typeof text !== 'string') { return undefined }

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
    let { color, backgroundColor, backgroundImage, barType, translucentColor, editor} = this.props
    let centered = this.getCentered()

    let containerStyles = {
      paddingTop: 20,
      justifyContent: 'space-between',
    }
    console.log((backgroundImage.binding))
    if(barType == "solid") {
      containerStyles = {
        height: 76,
        backgroundColor,
        ...containerStyles
      }
    }

    if (barType == "translucent") {
      containerStyles = {
        height: 76,
        backgroundColor: 'rgba(50,50,50,0)',
        ...containerStyles
      }
      
    }

    if (barType == "backgroundImage") {
      containerStyles = {
        height: 150,
        paddingBottom: 74,
        ...containerStyles
      }
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

    if (!backgroundImage.binding) {
      console.log("no image")
      containerStyles = {
        backgroundColor: '#eaeaea',
        ...containerStyles
      }
    }
    else {
      containerStyles = {
        backgroundColor: 'rgba(10,10,10,0)',
        ...containerStyles
      }
    }

    
    let {title} = this.props
    let titleType = title.titleType

    let titleCenterElement = ""
    if (titleType === "text") {
      titleCenterElement = this.getTitleText()
    }
    else if (titleType === "logo") {
      titleCenterElement = this.renderLogo()
    }

    if (barType = 'translucent') {
      console.log("set to translucent")
      return (
        <Blur
          translucentColor={translucentColor}>
          <Toolbar
              leftElement={leftIcon}
              centerElement={titleCenterElement}
              rightElement={rightIcons}
              onRightElementPress={this.handleRightElementPress}
              onLeftElementPress={this.handleLeftElementPress}
              onPress={this.handleCenterElementPress}
              style={{
                container: containerStyles,
                titleText: titleStyles,
                centerElementContainer: titleContainerStyles,
                leftElement: { color },
                rightElement: { color }
              }}
            >
          </Toolbar>
        </Blur>

      )
    }

    return (
      <Toolbar
          leftElement={leftIcon}
          centerElement={titleCenterElement}
          rightElement={rightIcons}
          onRightElementPress={this.handleRightElementPress}
          onLeftElementPress={this.handleLeftElementPress}
          onPress={this.handleCenterElementPress}
          style={{
            container: containerStyles,
            titleText: titleStyles,
            centerElementContainer: titleContainerStyles,
            leftElement: { color },
            rightElement: { color }
          }}
        />
    )  
  }

  renderLogo() {
    let {title} = this.props
    let source = title.logoImage.binding
    let imageStyles = [styles.logoImage]

    return (
      <View>
        <Image resizeMode="stretch" source = {{uri: source}} style={imageStyles} pointerEvents="none"/>
      </View>
    )
  }

  renderBackground() {
    let {barType, backgroundImage} = this.props
    if (barType != "backgroundImage") {
      return (this.renderSub())
    }
    let source = backgroundImage.binding
    let imageStyles = [styles.image]
      return (
        <ImageBackground
            resizeMode="cover"
            source={source}
            style={imageStyles}
            pointerEvents="none">
            {this.renderSub()}
        </ImageBackground>
      )
  }
  

  render() {
    let { v2, borderWidth, borderColor, backgroundImage, translucentColor } = this.props
    let bord = this.props.bottomBorder

    let wrapperStyles = v2 ? [styles.wrapper] : []
    let { shadow } = this.props.shadow

    if (Platform.OS === 'ios') {
      wrapperStyles.push(styles.iosBar)
    }

    if (shadow) {
      wrapperStyles.push(styles.hasShadow)
    }
    else {
      wrapperStyles.push(styles.noShadow)
    }

    if(bord) {
      wrapperStyles.push(StyleSheet.create({border: {borderBottomWidth: borderWidth+"px", borderBottomColor: borderColor}}).border)
    }
    
    return (
      <View style={wrapperStyles}>
        {this.renderBackground()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: -20
  },
  iosBar: {
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  image: {
    flex: 1,
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0
  },
  logoImage : {
    height: 35,
    width: '90%',
    flex: 1
  },
  noShadow: {
    elevation: 0
  },
  hasShadow: {
    elevation: 5
  }
})
