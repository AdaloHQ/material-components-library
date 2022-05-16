import React, { Component } from 'react'
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import ImageScrollViewWeb from './ImageScrollView.web.js'
import ImageScrollViewMobile from './ImageScrollView.js'
import ImageScrollViewPWA from './ImageScrollView.pwa.js'
import EmptyState from '../Shared/EmptyState'

class AvatarList extends Component {
  isMobileDevice = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return true
    } else {
      return false
    }
  }

  isPWA = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }

  getScrollView = () => {
    if (this.isMobileDevice()) {
      return ImageScrollViewMobile
    } else if (this.isPWA()) {
      return ImageScrollViewPWA
    } else {
      return ImageScrollViewWeb
    }
  }

  customFontsEnabled = () => {
    return this.props.textChild && this.props.textChild.styles
  }

  render() {
    const {
      imageList,
      imageSpacing,
      imageChild,
      _fonts,
      listEmptyState,
      openAccordion,
      getFlags,
    } = this.props
    const { hasUpdatedLoadingStates } = getFlags && getFlags() || {}

    const renderEmptyState =
      (imageList && !imageList[0]) ||
      (openAccordion === 'listEmptyState' && listEmptyState)

    if (renderEmptyState) {
      return <EmptyState {...listEmptyState}></EmptyState>
    }

    const {
      imageSize,
      imageRounding,
      borderColor,
      borderBool,
      borderSize,
      backgroundColor,
      cropMenu,
      background,
    } = imageChild

    if (
      !imageList ||
      typeof navigator.userAgent === undefined ||
      (!imageList[0] && !listEmptyState)
    ) {
      if (hasUpdatedLoadingStates) {
        return (
          <View style={{ height: imageSize, justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        )
      } else {
        return <View style={{ height: imageSize }}></View>
      }
    }

    const edit = this.props.editor
    const dummy = { textPos: null, textAlign: null, textColor: null }
    const imageElem = imageList && imageList[0]
    const { textPos, textAlign, textColor } = imageList
      ? imageElem.textChild
      : dummy
    const noCrop = cropMenu == 'center'
    if (edit) {
      imageList.push(imageElem)
      imageList.push(imageElem)
    }

    const imageItemStyle = {
      view: {
        paddingLeft: imageSpacing,
        paddingVertical: 3,
      },
      image: {
        width: noCrop ? imageSize - imageSize / 3.4 : imageSize,
        height: noCrop ? imageSize - imageSize / 3.4 : imageSize,
        borderRadius: noCrop
          ? null
          : imageRounding - borderSize >= 0
          ? imageRounding - borderSize
          : imageRounding,
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      text: {
        fontSize: ((imageSize - 30) / 170) * 6 + 10,
        paddingVertical: 4,
      },
      background: {
        width: borderBool ? imageSize + borderSize * 2 : imageSize,
        height: borderBool ? imageSize + borderSize * 2 : imageSize,
        borderRadius: imageRounding,
        backgroundColor: background ? backgroundColor : '#ffffff00',
        borderWidth: borderBool ? borderSize : null,
        borderColor: borderBool ? borderColor : null,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }

    if (this.customFontsEnabled()) {
      imageItemStyle.text = {
        ...imageItemStyle.text,
        ...this.props.textChild.styles.title,
      }
    } else {
      imageItemStyle.text.color = textColor ? textColor : '#424242'
      imageItemStyle.text.textAlign = textAlign ? textAlign : 'center'
      imageItemStyle.text.fontWeight = '600'
      imageItemStyle.text.fontFamily = _fonts ? _fonts.body : 'inherit'
    }

    const ScrollViewComponent = this.getScrollView()

    return (
      <View
        style={{
          justifyContent: 'center',
        }}
      >
        <ScrollViewComponent
          imageList={imageList}
          textPos={textPos}
          cropMenu={cropMenu}
          imageSize={imageSize}
          imageItemStyle={imageItemStyle}
          borderBool={borderBool}
          edit={edit}
        />
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

export default AvatarList
