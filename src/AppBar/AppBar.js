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
  hexToRGBA(hex, transparency) {
    if (hex.length > 9) {
      return hex.split(',', 3).join(',') + `, ${transparency})`
    }
    let r = parseInt(hex.slice(1, 3), 16)
    let g = parseInt(hex.slice(3, 5), 16)
    let b = parseInt(hex.slice(5, 7), 16)
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + transparency + ')'
  }

  getPadding() {
    // if (Platform.OS === 'android') {
    //   return 35
    // }
    return 50
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
      if (Platform.OS === 'android') {
        return {}
      }
      if (Platform.OS === 'ios') {
        return {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3,
        }
      }
      return {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
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
      <Image
        resizeMode="contain"
        source={{ uri: source }}
        style={imageStyles}
        pointerEvents="none"
      />
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
        source={{ uri: source }}
        style={imageStyles}
        pointerEvents="none"
      >
        {this.renderContent()}
      </ImageBackground>
    )
  }

  renderBlur(containerStyles) {
    let { translucentColor } = this.props

    return (
      <Blur
        translucentColor={this.hexToRGBA(translucentColor, 0.5)}
        borderStyle={[this.getBorderStyle(0), this.getShadowStyle()]}
        containerStyles={containerStyles}
      >
        {this.renderContent()}
      </Blur>
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
    if (!editor) {
      containerStyles = {
        ...containerStyles,
        height: 106,
        paddingTop: 50,
        marginTop: -30,
        ...this.getBorderStyle(106),
      }
    }
    if (barType === 'translucent') {
      return this.renderBlur(containerStyles)
    }
    return <View style={containerStyles}>{this.renderContent()}</View>
  }

  render() {
    let { v2, barType } = this.props

    let wrapperStyles = v2 ? [styles.wrapper] : []

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
})
