import React from 'react'
import { View, Image, Text } from 'react-native'

import titlePlaceholder from './nav-title-image-placeholder.png'

export const Title = ({ titleOptions, variant }) => {
  const {
    enabled,
    universalLayout,
    universalUseLogo,
    universalLogoImage,
    universalText,
    mobileUseLogo,
    mobileText,
    mobileLogo,
    mobileAlignment,
    desktopUseLogo,
    desktopLogo,
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

    if (useLogo) {
      return (
        <Image
          source={logo || titlePlaceholder}
          style={{
            width: 100,
            height: 40,
            resizeMode: 'cover',
            borderRadius: '6px',
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

    if (useLogo) {
      return (
        <Image
          source={logo || titlePlaceholder}
          style={{
            width: 100,
            height: 40,
            resizeMode: 'cover',
            justifyContent: mobileAlignment,
            borderRadius: '6px',
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
