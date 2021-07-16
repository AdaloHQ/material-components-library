import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from 'react-native'
import ImageItem from './ImageItem.js'
import placeholder from './holdplace.png'
import ImageScrollViewWeb from './ImageScrollView.web.js'
import ImageScrollViewMobile from './ImageScrollView.js'
import EmptyState from '../Shared/EmptyState'

class AvatarList extends Component {
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

    const imageScrollView = this.isMobileDevice() ? (
      <ImageScrollViewMobile
        imageList={imageList}
        textPos={textPos}
        cropMenu={cropMenu}
        imageSize={imageSize}
        imageItemStyle={imageItemStyle}
        borderBool={borderBool}
        edit={edit}
      />
    ) : (
      <ImageScrollViewWeb
        imageList={imageList}
        textPos={textPos}
        cropMenu={cropMenu}
        imageSize={imageSize}
        imageItemStyle={imageItemStyle}
        borderBool={borderBool}
        edit={edit}
      />
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

export default AvatarList
