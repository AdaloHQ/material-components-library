import React, { Component } from 'react'
import {
  Platform,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
} from 'react-native'
import { Toolbar } from '@protonapp/react-native-material-ui'
import Icon from 'react-native-vector-icons/MaterialIcons'
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
    barType: 'solid',
    backgroundImage: {},
    translucentColor: '#fff',
    titleType: 'text',
  }

  getIcon(propName) {
    let {
      [propName]: { icon, enabled },
    } = this.props

    return enabled ? icon : null
  }

  getRightIcons() {
    let icons = [this.getIcon('rightIcon1'), this.getIcon('rightIcon2')]
    console.log(icons)
    return icons.filter((i) => i)
  }

  getTitleText() {
    let {
      title: { text },
    } = this.props

    if (!text || typeof text !== 'string') {
      return undefined
    }

    return text.replace(/[\r\n]/g, ' ').trim()
  }

  getCentered() {
    let {
      title: { align },
    } = this.props

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
    let {
      leftIcon: { action },
    } = this.props

    action && action()
  }

  handleCenterElementPress = () => {
    let {
      title: { action },
    } = this.props

    action && action()
  }

  renderSub() {
    let {
      color,
      backgroundColor,
      backgroundImage,
      barType,
      translucentColor,
      editor,
    } = this.props
    let centered = this.getCentered()

    let containerStyles = {
      paddingTop: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
    }
    if (barType === 'solid') {
      containerStyles = {
        height: 76,
        backgroundColor,
        ...containerStyles,
      }
    }

    if (barType === 'translucent') {
      containerStyles = {
        height: 76,
        backgroundColor: 'rgba(50,50,50,0)',
        ...containerStyles,
      }
    }

    if (barType === 'backgroundImage') {
      containerStyles = {
        height: 150,
        paddingBottom: 74,
        ...containerStyles,
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
      console.log('no image')
      containerStyles = {
        backgroundColor: '#eaeaea',
        ...containerStyles,
      }
    } else {
      containerStyles = {
        backgroundColor: 'rgba(10,10,10,0)',
        ...containerStyles,
      }
    }

    let { title } = this.props
    let titleType = title.titleType

    let titleCenterElement = this.getTitleText()
    if (titleType === 'logo') {
      titleCenterElement = this.renderLogo()
    }

    if (barType === 'translucent') {
      console.log('set to translucent')
      return (
        <Blur translucentColor={translucentColor}>
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
              rightElement: { color },
            }}
          ></Toolbar>
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
          rightElement: { color },
        }}
      />
    )
  }

  renderBackground() {
    let { barType, backgroundImage } = this.props
    if (barType != 'backgroundImage') {
      return this.renderSub()
    }
    let source = backgroundImage.binding
    let imageStyles = [styles.image]
    return (
      <ImageBackground
        resizeMode="contain"
        source={source}
        style={imageStyles}
        pointerEvents="none"
      >
        {this.renderSub()}
      </ImageBackground>
    )
  }

  getBorderStyle(height) {
    let { borderWidth, borderColor, bottomBorder } = this.props
    if (bottomBorder) {
      return {
        height: height + borderWidth,
        borderBottomWidth: borderWidth,
        borderBottomColor: borderColor,
      }
    }

    return {}
  }

  getShadowStyle() {
    let { shadow } = this.props

    if (shadow) {
      return {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
      }
    }
    return {}
  }

  renderIcon(propName) {
    let {
      [propName]: { icon, enabled, action },
      color,
    } = this.props

    return enabled ? (
      <View style={newStyles.icon}>
        <Icon name={icon} color={color} size={24} onPress={action}></Icon>
      </View>
    ) : null
  }
  renderLogo() {
    let { title, editor } = this.props
    let { logoImage, logoSize } = title
    let source = editor ? (logoImage ? logoImage.binding : null) : logoImage
    let imageStyles = [newStyles.imageContainer]
    console.log(source)
    imageStyles.push({ width: `${logoSize}%`, height: `${logoSize}%` })
    return (
      <View style={imageStyles}>
        <Image
          resizeMode="contain"
          source={source}
          style={newStyles.logoImage}
          pointerEvents="none"
        />
      </View>
    )
  }

  renderTitle() {
    let { title, color, titleType, _fonts } = this.props

    let titleStyles = [newStyles.title, { color }]
    // if (Platform.OS === 'ios') {
    //   titleStyles.push({ fontFamily: 'System' })
    // } else if (Platform.OS === 'web') {
    //   titleStyles.push({ fontFamily: 'inherit' })
    // }

    if (title.styles) {
      titleStyles.push(title.styles.text)
    } else if (_fonts) {
      titleStyles.push({ fontFamily: _fonts.heading })
    }

    return <Text style={titleStyles}>{title.text}</Text>
  }

  renderLeft() {
    return (
      <View style={newStyles.leftWrapper}>{this.renderIcon('leftIcon')}</View>
    )
  }

  renderCenter() {
    let { title } = this.props
    let { align, titleType } = title
    let centerStyles = [newStyles.centerWrapper]

    if (align === 'center') {
      centerStyles.push({ marginLeft: 100, alignItems: 'center' })
    }
    return (
      <View style={centerStyles}>
        {titleType === 'logo' ? this.renderLogo() : this.renderTitle()}
      </View>
    )
  }

  renderRight() {
    return (
      <View style={newStyles.rightWrapper}>
        {this.renderIcon('rightIcon1')}
        {this.renderIcon('rightIcon2')}
      </View>
    )
  }
  renderContent() {
    return (
      <View style={newStyles.contentContainer}>
        {this.renderLeft()}
        {this.renderCenter()}
        {this.renderRight()}
      </View>
    )
  }

  renderImageBackgroundToolbar() {
    let { backgroundImage, editor } = this.props
    let source = editor ? backgroundImage.binding : backgroundImage
    let imageStyles = [
      newStyles.imageBackground,
      this.getBorderStyle(180),
      this.getShadowStyle(),
    ]

    return (
      <ImageBackground
        resizeMode="cover"
        source={source}
        style={imageStyles}
        pointerEvents="none"
      >
        {this.renderContent()}
      </ImageBackground>
    )
  }

  renderToolbar() {
    let { barType, translucentColor, backgroundColor, editor } = this.props
    let containerStyles = {
      backgroundColor,
      height: 76,
      paddingTop: 20,
      justifyContent: 'space-between',
      ...this.getBorderStyle(76),
      ...this.getShadowStyle(),
    }
    if (barType === 'translucent') {
      return (
        <>
          <Blur translucentColor={translucentColor}>
            {this.renderContent()}
          </Blur>
          <View style={[this.getBorderStyle(0), this.getShadowStyle()]}></View>
        </>
      )
    }
    if (!editor) {
      containerStyles = {
        ...containerStyles,
        height: 106,
        paddingTop: 50,
        marginTop: -30,
      }
    }
    return <View style={containerStyles}>{this.renderContent()}</View>
  }

  render() {
    let { v2, barType } = this.props

    let wrapperStyles = v2 ? [styles.wrapper] : []

    if (Platform.OS === 'ios') {
      console.log('ios')
      wrapperStyles.push(styles.iosBar)
    }

    console.log('yeet')

    return (
      <View style={wrapperStyles}>
        {barType === 'backgroundImage'
          ? this.renderImageBackgroundToolbar()
          : this.renderToolbar()}
      </View>
    )
  }
}
const newStyles = StyleSheet.create({
  imageBackground: {
    height: 180,
    width: '100%',
    paddingTop: 50,
    marginTop: -30,
  },
  contentContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    paddingLeft: 4,
  },
  centerWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginRight: 100,
    marginLeft: 72,
    justifyContent: 'center',
  },
  rightWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    paddingRight: 4,
  },
  icon: {
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  logoImage: {
    flex: 1,
  },
  imageContainer: {
    width: '40%',
    height: '40%',
    maxWidth: 150,
  },
})
const styles = StyleSheet.create({
  wrapper: {
    marginTop: -20,
  },
  iosBar: {
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  image: {
    flex: 1,
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center',
  },
  logoImage: {
    height: 35,
    width: '90%',
    flex: 1,
  },
  noShadow: {
    elevation: 0,
    shadowColor: '#FFFFFF00',
    boxShadow: 0,
  },
})
