import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from 'react-native'

import placeholder from './holdplace.png'
import ImageScrollViewWeb from './ImageScrollView.web.js'
import ImageScrollViewMobile from './ImageScrollView.js'
import EmptyState from '../Shared/EmptyState'

class ChipList extends Component {
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
    return this.props.text && this.props.text.styles
  }

  render() {
    const {
      imageList,
      imageSpacing,
      editor,
      _fonts,
      listEmptyState,
      openAccordion,
    } = this.props

    if (
      !imageList ||
      typeof navigator.userAgent === undefined ||
      (!imageList[0] && !listEmptyState)
    ) {
      return <View style={{ height: 32 }}></View>
    }

    const renderEmptyState =
      (imageList && !imageList[0]) ||
      (openAccordion === 'listEmptyState' && listEmptyState)

    if (renderEmptyState) {
      return <EmptyState {...listEmptyState}></EmptyState>
    }

    const dummy = {
      chipSize: null,
      background: null,
      backgroundColor: null,
      border: null,
      borderColor: null,
      borderWidth: null,
      rounding: null,
      shadow: null,
    }
    const textDummy = {
      text: null,
      textColor: null,
    }
    const imageDummy = {
      imageRounding: null,
      enabled: null,
    }
    const iconDummy = {
      enabled: null,
    }

    const {
      chipSize,
      backgroundColor,
      border,
      borderColor,
      borderWidth,
      rounding,
      shadow,
    } = imageList ? imageList[0].chipStyles : dummy
    const { textColor } = imageList ? imageList[0].text : textDummy
    const iconEnabled =
      imageList && imageList[0].rightIcon
        ? imageList[0].rightIcon.enabled
        : iconDummy
    const { imageRounding, enabled } = imageList
      ? imageList[0].image
      : imageDummy

    const shadowStyle = {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    }

    const style = {
      image: {
        height: ((chipSize - 24) / 36) * 14 + 18,
        width: ((chipSize - 24) / 36) * 14 + 18,
        borderRadius: enabled ? imageRounding : 0,
      },
      background: {
        borderColor: border ? borderColor : null,
        backgroundColor: backgroundColor,
        borderWidth: border ? borderWidth : 0,
        borderRadius: rounding,
        minWidth: 60,
        height: border ? chipSize + borderWidth : chipSize,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      },
      chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: iconEnabled ? 4 : 0,
        paddingLeft: enabled ? 4 : ((chipSize - 24) / 36) * 10 + 10,
      },
      chipTouch: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: iconEnabled ? 0 : ((chipSize - 24) / 36) * 10 + 10,
      },
      container: {
        padding: imageSpacing / 2,
        paddingVertical: 10,
      },
      text: {
        fontSize: ((chipSize - 24) / 36) * 6 + 12,
        paddingLeft: enabled ? 8 : 0,
        paddingRight: iconEnabled ? 8 : 0,
      },
    }

    if (this.customFontsEnabled()) {
      style.text = { ...style.text, ...this.props.text.styles.title }
    } else {
      style.text.color = textColor ? textColor : '#212121'
      style.text.fontWeight = '600'
      style.text.fontFamily = _fonts.body
    }

    if (shadow) {
      style.background = { ...style.background, ...shadowStyle }
    }
    const imageScrollView = this.isMobileDevice() ? (
      <ImageScrollViewMobile imageList={imageList} style={style} />
    ) : (
      <ImageScrollViewWeb imageList={imageList} editor={editor} style={style} />
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

export default ChipList
