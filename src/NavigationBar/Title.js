import React, { useState } from 'react'
import { View, Image, Text } from 'react-native'

import titlePlaceholder from './nav-title-image-placeholder.png'

export const Title = ({ titleOptions, variant, menuHeight }) => {
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
        <View
          style={{
            width: (200 * logoSize) / 100,
            height: (menuHeight * logoSize) / 100,
            justifyContent: 'center',
          }}
        >
          <Image
            source={logo || titlePlaceholder}
            style={{
              width: `100%`,
              height: `100%`,
              resizeMode: 'contain',
            }}
          />
        </View>
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

    if (useLogo) {
      return (
        <View
          style={{
            width: (200 * logoSize) / 100,
            height: (menuHeight * logoSize) / 100,
            justifyContent: 'center',
          }}
        >
          <Image
            source={logo || titlePlaceholder}
            style={{
              width: `100%`,
              height: `100%`,
              resizeMode: 'contain',
              justifyContent: alignment,
            }}
          />
        </View>
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
