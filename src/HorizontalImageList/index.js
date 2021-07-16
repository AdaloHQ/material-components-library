import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native'
import ImageItem from './ImageItem.js'
import BottomBar from './BottomBar.js'
import placeholder from './holdplace.png'
import ImageScrollViewMobile from './ImageScrollView.js'
import ImageScrollViewWeb from './ImageScrollView.web.js'
import EmptyState from '../Shared/EmptyState'

class HorizontalImageList extends Component {
  isMobileDevice = () => {
    if (
      Platform.OS === 'ios' ||
      Platform.OS === 'android' ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true
    } else {
      return false
    }
  }
  getRGB = (str) => {
    var match = str.match(
      /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/
    )
    return match
      ? {
          red: match[1],
          green: match[2],
          blue: match[3],
        }
      : null
  }
  hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          red: parseInt(result[1], 16),
          green: parseInt(result[2], 16),
          blue: parseInt(result[3], 16),
        }
      : null
  }
  customFontsEnabled = () => {
    return (
      this.props.imageOverlay &&
      this.props.imageOverlay.styles &&
      this.props.bottomBarText &&
      this.props.bottomBarText.styles
    )
  }
  render() {
    const {
      imageList,
      imageSpacing,
      imageChild,
      editor,
      bottomBarStyle,
      bottomBarButtons,
      _fonts,
      listEmptyState,
      openAccordion,
    } = this.props

    if (!imageList || typeof navigator.userAgent === undefined) {
      return <View style={{ height: imageSize }}></View>
    }

    const renderEmptyState =
      (imageList && !imageList[0]) ||
      (openAccordion === 'listEmptyState' && listEmptyState)

    if (renderEmptyState) {
      return <EmptyState {...listEmptyState}></EmptyState>
    }

    const { imageSize, imageRounding, shape, shadow } = imageChild
    const {
      bbBackground,
      bbBackgroundColor,
      bbBorder,
      bbBorderColor,
      bbShadow,
    } = bottomBarStyle

    const dummy = {
      textColor: null,
      subtitlePosition: null,
      textPos: null,
      textSwitch: null,
      tlIcon: null,
      tlIcon: null,
      trIcon: null,
      brIcon: null,
      blIcon: null,
      tlIcon2: null,
      blIcon2: null,
      tl: null,
      tr: null,
      br: null,
      bl: null,
      tl2: null,
      bl2: null,
      tlIconColor: null,
      trIconColor: null,
      brIconColor: null,
      blIconColor: null,
      tlIconColor2: null,
      blIconColor2: null,
      tlIconActions: null,
      trIconActions: null,
      brIconActions: null,
      blIconActions: null,
      tlIconActions2: null,
      blIconActions2: null,
      backgroundColor: null,
      backgroundEffect: null,
      enabled: null,
    }
    const {
      textColor,
      subtitlePosition,
      textPos,
      textSwitch,
      tlIcon,
      trIcon,
      brIcon,
      blIcon,
      tlIcon2,
      blIcon2,
      tl,
      tr,
      br,
      bl,
      tl2,
      bl2,
      tlIconColor,
      trIconColor,
      brIconColor,
      blIconColor,
      tlIconColor2,
      blIconColor2,
      tlIconActions,
      trIconActions,
      brIconActions,
      blIconActions,
      tlIconActions2,
      blIconActions2,
      backgroundColor,
      backgroundEffect,
      subtitle,
      enabled,
    } = imageList ? imageList[0].imageOverlay : dummy

    const iconSwitches = imageList && [
      tl && enabled,
      tr && enabled,
      br && enabled,
      bl && enabled,
      tl2 && enabled,
      bl2 && enabled,
    ]
    const icons = imageList
      ? [tlIcon, trIcon, brIcon, blIcon, tlIcon2, blIcon2]
      : [null, null, null, null, null, null]
    const iconColors = imageList
      ? [
          tlIconColor,
          trIconColor,
          brIconColor,
          blIconColor,
          tlIconColor2,
          blIconColor2,
        ]
      : [null, null, null, null, null, null]

    const gradientProps = {
      textPos: textPos == 0 ? 'bottom' : 'top',
      backgroundEffect: backgroundEffect,
      gradientEnabled: enabled,
    }

    const iconText = (textPos == 0 && br) || (textPos == 1 && tr)

    const titleLimit = iconText
      ? ((imageSize - 150) / 175) * 11 + 18
      : ((imageSize - 150) / 175) * 11 + 21
    const bbTitleLimit = ((imageSize - 150) / 175) * 11 + 21
    const iconSize =
      ((imageSize - 150) / 175) * 20 + 15 < 24
        ? ((imageSize - 150) / 175) * 20 + 15
        : 24

    const backgroundColorBoolTop =
      backgroundEffect == 1 && textPos == 1 && enabled && textSwitch
    const backgroundColorBoolBottom =
      backgroundEffect == 1 && textPos == 0 && enabled && textSwitch

    const imageStyles = {
      view: {
        paddingLeft: imageSpacing,
        alignItems: 'center',
        borderRadius: imageRounding,
        paddingVertical: 15,
      },
      image: {
        width: imageSize,
        height:
          shape == 0
            ? imageSize
            : shape == 1
            ? imageSize * 1.5
            : (imageSize * 2) / 3,

        borderRadius: !bottomBarStyle.enabled ? imageRounding : 0,
        borderTopLeftRadius: imageRounding,
        borderTopRightRadius: imageRounding,
      },
      rounding: {
        borderTopLeftRadius: imageRounding,
        borderTopRightRadius: imageRounding,
      },
      titleContainer: {
        paddingVertical: 1,
      },
      title: {
        fontSize: ((imageSize - 150) / 175) * 6 + 12,
      },
      subtitle: {
        fontSize: ((imageSize - 150) / 175) * 6 + 10,
        paddingVertical: 1,
        height: subtitle == '' ? 0 : null,
      },
      text: {
        flexDirection: subtitlePosition,
        paddingVertical: ((imageSize - 150) / 175) * 6 + 12,
        width: iconText
          ? imageSize - (((imageSize - 150) / 175) * 6 + 10) * 2 - iconSize
          : imageSize - (((imageSize - 150) / 175) * 6 + 10) * 2,
      },
      top: {
        flexDirection: 'row',
        width: imageSize,
        justifyContent: 'space-between',
        paddingTop: ((imageSize - 150) / 175) * 6 + 10,
        alignItems: 'center',
        backgroundColor: backgroundColorBoolTop
          ? this.hexToRgb(backgroundColor)
            ? `rgba(${this.hexToRgb(backgroundColor).red}, ${
                this.hexToRgb(backgroundColor).green
              }, ${this.hexToRgb(backgroundColor).blue}, .7)`
            : this.getRGB(backgroundColor)
            ? `rgba(${this.getRGB(backgroundColor).red}, ${
                this.getRGB(backgroundColor).green
              }, ${this.getRGB(backgroundColor).blue}, .7)`
            : null
          : null,

        paddingHorizontal: ((imageSize - 150) / 175) * 6 + 10,
        paddingTop:
          !textSwitch || textPos == 0
            ? ((imageSize - 150) / 175) * 6 + 10
            : null,
        borderTopLeftRadius: imageRounding,
        borderTopRightRadius: imageRounding,
      },
      bottom: {
        flexDirection: 'row',
        width: imageSize,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom:
          !textSwitch || textPos == 1
            ? ((imageSize - 150) / 175) * 6 + 10
            : null,
        backgroundColor: backgroundColorBoolBottom
          ? this.hexToRgb(backgroundColor)
            ? `rgba(${this.hexToRgb(backgroundColor).red}, ${
                this.hexToRgb(backgroundColor).green
              }, ${this.hexToRgb(backgroundColor).blue}, .7)`
            : this.getRGB(backgroundColor)
            ? `rgba(${this.getRGB(backgroundColor).red}, ${
                this.getRGB(backgroundColor).green
              }, ${this.getRGB(backgroundColor).blue}, .7)`
            : null
          : null,

        paddingHorizontal: ((imageSize - 150) / 175) * 6 + 10,

        borderBottomLeftRadius: !bottomBarStyle.enabled ? imageRounding : 0,
        borderBottomRightRadius: !bottomBarStyle.enabled ? imageRounding : 0,
      },
      overlay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: !bottomBarStyle.enabled ? imageRounding : 0,
        borderTopLeftRadius: imageRounding,
        borderTopRightRadius: imageRounding,
      },
      container: {
        flex: 1,
        flexDirection: 'column',
        height:
          shape == 0
            ? imageSize
            : shape == 1
            ? imageSize * 1.5
            : (imageSize * 2) / 3,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      gradient: {
        flex: 1,
      },

      shadow: {
        borderRadius: imageRounding,
        shadowColor: '#000000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      topIcon: {
        container: {
          padding: 0,
          width: 24,
          height: 24,
        },
      },
    }
    const bbTextDummy = { bbSubtitlePos: null, bbTextColor: null }
    const { bbSubtitlePos, bbTextColor } = imageList
      ? imageList[0].bottomBarText
      : bbTextDummy

    const bbStyles = {
      BottomBar: {
        backgroundColor: bbBackground ? bbBackgroundColor : '#FFFFFF00',
        width: imageSize,
        borderBottomLeftRadius: imageRounding,
        borderBottomRightRadius: imageRounding,
        borderColor: bbBorder ? bbBorderColor : null,
        borderWidth: bbBorder ? 1 : null,
        padding: bbBorder
          ? ((imageSize - 150) / 175) * 6 + 9
          : ((imageSize - 150) / 175) * 6 + 10,
      },
      text: {
        flexDirection: bbSubtitlePos,
      },
      subtitle: {
        fontSize: ((imageSize - 150) / 175) * 6 + 10,
        paddingVertical: 1,
      },
      title: {
        fontSize: ((imageSize - 150) / 175) * 6 + 12,
      },
      titleContainer: {
        paddingVertical: 1,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: ((imageSize - 150) / 175) * 8 + 12,
      },
      styleless: {
        width: imageSize,
        padding: bbBorder
          ? ((imageSize - 150) / 175) * 6 + 9
          : ((imageSize - 150) / 175) * 6 + 10,
      },
    }

    //custom fonts additions

    if (this.customFontsEnabled()) {
      imageStyles.title = {
        ...imageStyles.title,
        ...this.props.imageOverlay.styles.title,
      }
      imageStyles.subtitle = {
        ...imageStyles.title,
        ...this.props.imageOverlay.styles.subtitle,
      }
      bbStyles.title = {
        ...bbStyles.title,
        ...this.props.bottomBarText.styles.bbTitle,
      }
      bbStyles.subtitle = {
        ...bbStyles.subtitle,
        ...this.props.bottomBarText.styles.bbSubtitle,
      }
    } else {
      imageStyles.title.color = enabled
        ? textColor
          ? textColor
          : '#fff'
        : '#FFFFFF00'
      imageStyles.title.fontWeight = '600'
      imageStyles.title.fontFamily = _fonts.body
      imageStyles.subtitle.fontFamily = _fonts.body
      bbStyles.title.fontFamily = _fonts.body
      bbStyles.subtitle.fontFamily = _fonts.body
      bbStyles.title.color = bbTextColor ? bbTextColor : '#424242'
      bbStyles.title.fontWeight = '600'
      imageStyles.subtitle.color = enabled
        ? textColor
          ? textColor
          : '#fff'
        : '#FFFFFF00'
      bbStyles.subtitle.color = bbTextColor ? bbTextColor : '#424242'
    }

    const imageScrollView = this.isMobileDevice() ? (
      <ImageScrollViewMobile
        imageList={imageList}
        imageStyles={imageStyles}
        bbShadow={bbShadow}
        bottomBarStyle={bottomBarStyle}
        titleLimit={titleLimit}
        bbTitleLimit={bbTitleLimit}
        imageRounding={imageRounding}
        shadow={shadow}
        textSwitch={textSwitch}
        icons={icons}
        iconSwitches={iconSwitches}
        textPos={textPos}
        iconColors={iconColors}
        imageSize={imageSize}
        bbStyles={bbStyles}
        gradientProps={gradientProps}
        iconSize={iconSize}
      ></ImageScrollViewMobile>
    ) : (
      <ImageScrollViewWeb
        imageList={imageList}
        imageStyles={imageStyles}
        bbShadow={bbShadow}
        bottomBarStyle={bottomBarStyle}
        titleLimit={titleLimit}
        bbTitleLimit={bbTitleLimit}
        imageRounding={imageRounding}
        shadow={shadow}
        textSwitch={textSwitch}
        icons={icons}
        iconSwitches={iconSwitches}
        textPos={textPos}
        iconColors={iconColors}
        imageSize={imageSize}
        bbStyles={bbStyles}
        gradientProps={gradientProps}
        editor={editor}
        iconSize={iconSize}
      ></ImageScrollViewWeb>
    )
    return (
      <View
        style={{
          justifyContent: 'center',
        }}
      >
        {imageScrollView}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HorizontalImageList
