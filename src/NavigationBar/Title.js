import React from 'react'
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
  if (!enabled) {
    return <View />
  }

  if (variant === 'desktop') {
    const useLogo = universalLayout ? universalUseLogo : desktopUseLogo
    const logo = universalLayout ? universalLogoImage : desktopLogo
    const text = universalLayout ? universalText : desktopText
    const logoSize = universalLayout ? universalLogoSize : desktopLogoSize

    if (useLogo) {
      return (
        <Image
          source={logo || titlePlaceholder}
          style={{
            width: 100,
            height: 40,
            resizeMode: 'cover',
            borderRadius: 6,
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

    if (useLogo) {
      return (
        <Image
          source={logo || titlePlaceholder}
          style={{
            width: 100,
            height: 40,
            resizeMode: 'cover',
            justifyContent: mobileAlignment,
            borderRadius: 6,
          }}
        />
      )
    }
    return (
      <Text
        style={{
          fontSize: 16,
          ...styles[universalLayout ? 'universalText' : 'mobileText'],
          justifyContent: mobileAlignment,
        }}
      >
        {text}
      </Text>
    )
  }
}
