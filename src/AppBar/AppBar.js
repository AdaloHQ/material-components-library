import React, { Component } from 'react'
import {
  Platform,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  ActivityIndicator,
} from 'react-native'
import DeviceInfo from 'react-native-device-info';
import { Toolbar } from '@protonapp/react-native-material-ui'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Blur from './blur'
import Gradient from './gradient'
import background from './backgroundPlaceholder.png'
import WrappedIconToggle from '../IconToggle/index.js'
import IconToggleEditor from '../Shared/IconToggleEditor'

import '../Shared/icons'

export default class AppBar extends Component {
  state = {
    loadingComponents: new Set(), // allows for multiple icons to have independent loading states
  }

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
    shadow: true,
    barType: 'solid',
    backgroundImage: {},
    translucentColor: '#fff',
    titleType: 'text',
    hasDynamicIslandOrNotch: DeviceInfo.hasDynamicIsland() || DeviceInfo.hasNotch()

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

  getBorderStyle(height, web) {
    let { borderWidth, borderColor, bottomBorder } = this.props
    if (bottomBorder) {
      if (web) {
        return {
          borderBottomWidth: borderWidth,
          borderBottomColor: borderColor,
        }
      }
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

  iconClickAction = (action, propName) => async () => {
    if (!action) {
      return
    }

    this.setState(state => {
      const updatedLoadingComponents = new Set(state.loadingComponents)
      updatedLoadingComponents.add(propName)

      return { loadingComponents: updatedLoadingComponents }
    })

    await action()

    this.setState(state => {
      const updatedLoadingComponents = new Set(state.loadingComponents)
      updatedLoadingComponents.delete(propName)

      return { loadingComponents: updatedLoadingComponents }
    })
  }

  renderIcon(propName) {
    const {
      [propName]: { icon, enabled, action, iconType },
      color,
      editor,
      getFlags,
    } = this.props

    const { loadingComponents } = this.state
    const { hasUpdatedLoadingStates } = (getFlags && getFlags()) || {}

    const onPressAction = hasUpdatedLoadingStates ? this.iconClickAction(action, propName) : action

    if (!enabled) {
      return null
    }

    let iconComponent

    if (iconType === 'toggle') {
      if (editor) {
        iconComponent = <IconToggleEditor {...this.props[propName]} />
      } else {
        iconComponent = <WrappedIconToggle {...this.props[propName]} />
      }
    } else if (loadingComponents.has(propName)) {
      iconComponent = <ActivityIndicator size="small" color={color} />
    } else {
      iconComponent = (
        <Icon
          name={icon}
          color={color}
          size={24}
          onPress={onPressAction}
        />
      )
    }

    return <View style={styles.icon}>{iconComponent}</View>
  }
  renderLogo() {
    let { title, editor } = this.props
    let { logoImage, logoSize } = title

    let imageStyles = [styles.imageContainer]
    imageStyles.push({ width: `50%`, height: `50%` })
    if (logoSize) {
      imageStyles.push({ width: `${logoSize}%`, height: `${logoSize}%` })
    }
    return (
      <Image
        resizeMode="contain"
        source={logoImage}
        style={imageStyles}
        pointerEvents="none"
      />
    )
  }

  renderTitle() {
    let { title, color, titleType, _fonts } = this.props

    let titleStyles = [styles.title, { color }]
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

    return (
      <Text style={titleStyles} numberOfLines={1}>
        {title.text}
      </Text>
    )
  }

  renderLeft() {
    return <View style={styles.leftWrapper}>{this.renderIcon('leftIcon')}</View>
  }
  renderCenter() {
    let { title, leftIcon, rightIcon1, rightIcon2 } = this.props
    let { align, titleType } = title

    let centerStyles = [styles.centerWrapper]
    let iconMargin = 72
    if (rightIcon1.enabled && rightIcon2.enabled) {
      iconMargin = 100
    } else if (
      !leftIcon.enabled &&
      !rightIcon1.enabled &&
      !rightIcon2.enabled
    ) {
      iconMargin = 12
    }
    if (!leftIcon.enabled) {
      centerStyles.push({ marginLeft: 12 })
    }
    centerStyles.push({ marginRight: iconMargin })
    if (align === 'center') {
      centerStyles.push({ marginLeft: iconMargin, alignItems: 'center' })
    }
    return (
      <View style={centerStyles}>
        {titleType === 'logo' ? this.renderLogo() : this.renderTitle()}
      </View>
    )
  }
  renderRight() {
    return (
      <View style={styles.rightWrapper}>
        {this.renderIcon('rightIcon1')}
        {this.renderIcon('rightIcon2')}
      </View>
    )
  }

  renderContent() {
    let { barType } = this.props
    return (
      <View style={styles.contentContainer}>
        {this.renderLeft()}
        {barType !== 'backgroundImage' && this.renderCenter()}
        {this.renderRight()}
      </View>
    )
  }

  renderBlur(containerStyles) {
    let { translucentColor, hasDynamicIslandOrNotch } = this.props
    
    const blurViewStyle = {};
    if (hasDynamicIslandOrNotch) {
      blurViewStyle.marginTop = -40
    }

    return (
      <Blur
        translucentColor={this.hexToRGBA(translucentColor, 0.5)}
        borderStyle={[this.getBorderStyle(0, false), this.getShadowStyle()]}
        borderStyleWeb={[this.getBorderStyle(0, true), this.getShadowStyle()]}
        containerStyles={containerStyles}
        blurViewStyle={blurViewStyle}
      >
        {this.renderContent()}
      </Blur>
    )
  }

  renderImageBackgroundToolbar() {
    let { backgroundImage, hasDynamicIslandOrNotch } = this.props

    let imageBackgroundStyles = styles.imageBackground;
    if (hasDynamicIslandOrNotch) {
      imageBackgroundStyles = { ...imageBackgroundStyles, marginTop: -40 }
    }

    const imageStyles = [
      imageBackgroundStyles,
      this.getBorderStyle(180, false),
      this.getShadowStyle(),
    ]

    return (
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={imageStyles}
        pointerEvents="none"
      >
        <Gradient>
          <View style={styles.imageContentContainer}>
            {this.renderContent()}
            <View style={styles.imageTitleContainer}>
              {this.renderCenter()}
            </View>
          </View>
        </Gradient>
      </ImageBackground>
    )
  }

  renderToolbar() {
    let { barType, translucentColor, backgroundColor, editor, hasDynamicIslandOrNotch } = this.props
    let containerStyles = {
      backgroundColor,
      height: 76,
      paddingTop: 20,
      justifyContent: 'space-between',
      ...this.getBorderStyle(76, false),
      ...this.getShadowStyle(),
    }

    if (!editor) {
      let marginTop = -30;
      if (hasDynamicIslandOrNotch) {
        marginTop = -40;
      }
      containerStyles = {
        ...containerStyles,
        height: 106,
        paddingTop: 50,
        marginTop,
        ...this.getBorderStyle(106, false),
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
const styles = StyleSheet.create({
  wrapper: {
    marginTop: -20,
  },
  imageBackground: {
    height: 180,
    width: '100%',
    paddingTop: 50,
    marginTop: -30,
    justifyContent: 'space-between',
  },
  contentContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContentContainer: {
    height: 130,
    width: '100%',
    justifyContent: 'space-between',
  },
  imageTitleContainer: {
    paddingBottom: 26,
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
    marginRight: 0,
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
