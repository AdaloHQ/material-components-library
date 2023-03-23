import React, { useState } from 'react'
import { View, Image, Text } from 'react-native'

import titlePlaceholder from './nav-title-image-placeholder.png'

export const Title = ({ titleOptions, variant }) => {
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

  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)

  if (!enabled) {
    return <View />
  }

  if (variant === 'desktop') {
    const useLogo = universalLayout ? universalUseLogo : desktopUseLogo
    const logo = universalLayout ? universalLogoImage : desktopLogo
    const text = universalLayout ? universalText : desktopText
    const logoSize = universalLayout ? universalLogoSize : desktopLogoSize

    Image.getSize(
      (logo && logo.uri) || logo || titlePlaceholder,
      (width, height) => {
        setImgWidth(width * (logoSize / 100))
        setImgHeight(height * (logoSize / 100))
      }
    )

    if (useLogo) {
      return (
        <Image
          source={logo || titlePlaceholder}
          style={{
            width: imgWidth,
            height: imgHeight,
            resizeMode: 'contain',
            borderRadius: 6,
            maxHeight: 54,
            maxWidth: 200,
          }}
        />
      )
    }
    return (
      <Text
        style={{
          fontSize: 16,
          ...styles[universalLayout ? 'universalText' : 'desktopText'],
        }}
      >
        {text}
      </Text>
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

    Image.getSize(
      (logo && logo.uri) || logo || titlePlaceholder,
      (width, height) => {
        setImgWidth(width * (logoSize / 100))
        setImgHeight(height * (logoSize / 100))
      }
    )

    if (useLogo) {
      return (
        <Image
          source={logo || titlePlaceholder}
          style={{
            width: imgWidth,
            height: imgHeight,
            resizeMode: 'contain',
            justifyContent: alignment,
            borderRadius: 6,
            maxHeight: 56,
            maxWidth: 200,
          }}
        />
      )
    }
    return (
      <Text
        style={{
          fontSize: 16,
          ...styles[universalLayout ? 'universalText' : 'mobileText'],
          justifyContent: alignment,
        }}
      >
        {text}
      </Text>
    )
  }
}
