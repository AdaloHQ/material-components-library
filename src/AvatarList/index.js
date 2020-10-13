import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import ImageItem from './ImageItem.js'
import placeholder from './holdplace.png'
import ImageScrollViewWeb from './ImageScrollView.web.js'
import ImageScrollViewMobile from './ImageScrollView.js'

class AvatarList extends Component {
  isMobileDevice = () => {
    return (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1
    )
  }
  render() {
    const { imageList, imageSpacing, imageChild } = this.props
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
        textAlign: textAlign,
        color: textColor,
        fontSize: ((imageSize - 30) / 170) * 6 + 10,
        paddingVertical: 4,
        fontWeight: '600',
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
      center: {
        justifyContent: 'center',
        alignItems: 'center',
      },
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
