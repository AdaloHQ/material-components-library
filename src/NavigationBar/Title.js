import React, { useState } from 'react'
import { View, Image, Text } from 'react-native'

import titlePlaceholder from './nav-title-image-placeholder.png'

export const Title = ({ titleOptions, variant, menuHeight, editor }) => {
  const {
    enabled,
    universalLayout,
    universalUseLogo,
    universalLogoImage,
    universalLogoSize,
    universalText,
    mobileUseLogo,
    mobileText,
    mobileLogo,
    mobileLogoSize,
    mobileAlignment,
    desktopUseLogo,
    desktopLogo,
    desktopLogoSize,
    desktopText,
    styles,
  } = titleOptions

  if (!enabled) {
    return <View />
  }

  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)

  const maxHeight = menuHeight - (variant === 'desktop' ? 20 : 27)

  if (variant === 'desktop') {
    const useLogo = universalLayout ? universalUseLogo : desktopUseLogo
    const logo = universalLayout ? universalLogoImage : desktopLogo
    const text = universalLayout ? universalText : desktopText
    const logoSize = universalLayout ? universalLogoSize : desktopLogoSize

    if (imgWidth === 0 || editor) {
      Image.getSize(
        (logo && logo.uri) || logo || titlePlaceholder,
        (width, height) => {
          setImgWidth(width)
          setImgHeight(height)
        }
      )
    }

    const logoWidth = (200 * logoSize) / 100
    const logoHeight = (imgHeight * logoWidth) / imgWidth

    if (useLogo) {
      return (
        <View
          style={{
            width: (200 * logoSize) / 100,
            height: logoHeight,
            justifyContent: 'center',
            maxHeight,
          }}
        >
          <Image
            source={logo || titlePlaceholder}
            style={{
              width: `100%`,
              height: `100%`,
              maxWidth: logoWidth,
              maxHeight,
              resizeMode: 'cover',
            }}
          />
        </View>
      )
    }
    return (
      <View style={{ overflow: 'hidden', maxHeight, lineHeight: '1' }}>
        <Text
          style={{
            ...styles[universalLayout ? 'universalText' : 'desktopText'],
          }}
        >
          {text}
        </Text>
      </View>
    )
  } else {
    const useLogo = universalLayout ? universalUseLogo : mobileUseLogo
    const logo = universalLayout ? universalLogoImage : mobileLogo
    const text = universalLayout ? universalText : mobileText
    const logoSize = universalLayout ? universalLogoSize : mobileLogoSize

    let alignment = 'flex-start'
    if (mobileAlignment === 'center') {
      alignment = 'center'
    } else if (mobileAlignment === 'right') {
      alignment = 'flex-end'
    }

    if (imgWidth === 0 || editor) {
      Image.getSize(
        (logo && logo.uri) || logo || titlePlaceholder,
        (width, height) => {
          setImgWidth(width)
          setImgHeight(height)
        }
      )
    }

    const logoWidth = (200 * logoSize) / 100
    const logoHeight = (imgHeight * logoWidth) / imgWidth

    if (useLogo && logoHeight) {
      return (
        <View
          style={{
            width: logoWidth,
            height: logoHeight,
            justifyContent: 'center',
            maxHeight,
          }}
        >
          <Image
            source={logo || titlePlaceholder}
            style={{
              width: `100%`,
              height: `100%`,
              maxWidth: logoWidth,
              maxHeight,
              resizeMode: 'cover',
              justifyContent: alignment,
            }}
          />
        </View>
      )
    }
    return (
      <View style={{ overflow: 'hidden', maxHeight, lineHeight: '1' }}>
        <Text
          style={{
            ...styles[universalLayout ? 'universalText' : 'mobileText'],
            justifyContent: alignment,
          }}
        >
          {text}
        </Text>
      </View>
    )
  }
}
