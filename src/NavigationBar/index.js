import React, { useState } from 'react'
import {
  Platform,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button } from '@protonapp/react-native-material-ui'
import { DeviceBreakpoint } from '@adalo/constants'

import placeholder from './holdplace.png'

const NavigationBar = ({
  backgroundColor,
  shadow,
  border,
  borderColor,
  borderWidth,
  title,
  editor,
  menuItems,
  firstMenuItem,
  secondMenuItem,
  thirdMenuItem,
  fourthMenuItem,
  fifthMenuItem,
  _fonts,
}) => {
  const [activeMenuItem, setActiveMenuItem] = useState(
    menuItems.defaultActiveMenuItem
  )

  const getShadowStyle = () => {
    if (shadow) {
      if (Platform.OS === 'android') {
        return {
          elevation: 4,
        }
      }
      if (Platform.OS === 'ios') {
        return {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3,
        }
      }
      return {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      }
    }
    return {}
  }

  const getBorderStyle = () => {
    if (border) {
      return {
        borderBottomWidth: borderWidth,
        borderBottomColor: borderColor,
      }
    }
  }

  const renderTitle = (variant) => {
    const {
      enabled,
      universalLayout,
      universalUseLogo,
      universalLogoImage,
      universalTitleText,
      mobileUseLogo,
      mobileTitleText,
      mobileLogo,
      mobileAlignment,
      desktopUseLogo,
      desktopLogo,
      desktopText,
      styles,
    } = title
    if (!enabled) {
      return <View />
    }

    if (variant === 'desktop') {
      const useLogo = universalLayout ? universalUseLogo : desktopUseLogo
      const logo = universalLayout ? universalLogoImage : desktopLogo
      const text = universalLayout ? universalTitleText : desktopText

      if (useLogo) {
        return (
          <Image
            source={logo || placeholder}
            style={{
              width: 210,
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
            ...styles[universalLayout ? 'universalTitleText' : 'desktopText'],
          }}
        >
          {text}
        </Text>
      )
    } else {
      const useLogo = universalLayout ? universalUseLogo : mobileUseLogo
      const logo = universalLayout ? universalLogoImage : mobileLogo
      const text = universalLayout ? universalTitleText : mobileTitleText

      if (useLogo) {
        return (
          <Image
            source={logo || placeholder}
            style={{
              width: 210,
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
            ...styles[universalLayout ? 'universalTitleText' : 'mobileText'],
          }}
        >
          {text}
        </Text>
      )
    }
  }

  const renderMenuItems = () => {
    const items = [
      firstMenuItem,
      secondMenuItem,
      thirdMenuItem,
      fourthMenuItem,
      fifthMenuItem,
    ]
    const {
      alignment,
      iconOnLeft,
      activeIndicatorLine,
      lineSize,
      activeBackgroundFillColor,
      activeBackgroundFillRounding,
      menuItemsActiveColor,
      menuItemsInactiveColor,
      menuItemsHoverColor,
    } = menuItems

    return items.map((item, index) => {
      const { enabled, icon, text, actions } = item
      if (!enabled) {
        return <View key={index} />
      }

      const active = activeMenuItem === index
      const styles = {
        container: {
          backgroundColor: active ? activeBackgroundFillColor : '#ffffff00',
          borderRadius: activeBackgroundFillRounding,
        },
        text: {
          color: active ? menuItemsActiveColor : menuItemsInactiveColor,
          fontFamily: _fonts.body,
          fontSize: 14,
          fontWeight: '600',
        },
        icon: {
          color: active ? menuItemsActiveColor : menuItemsInactiveColor,
          size: 20,
        },
      }

      return (
        <Button
          key={index}
          icon={icon}
          text={text || ''}
          onPress={() => {
            setActiveMenuItem(index)
            actions()
          }}
          style={styles}
        />
      )
    })
  }

  const renderNavBar = () => {
    const windowWidth = Dimensions.get('window').width

    let containerStyles = {
      backgroundColor,
      height: 76,
      paddingTop: 32,
      paddingRight: 20,
      paddingLeft: 20,
      paddingBottom: 12,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      ...getBorderStyle(),
      ...getShadowStyle(),
    }
    if (!editor) {
      containerStyles = {
        ...containerStyles,
        height: 106,
        paddingTop: 50,
        marginTop: -30,
        ...getBorderStyle(),
      }
    }

    if (windowWidth > DeviceBreakpoint.TABLET_BREAKPOINT || editor) {
      return (
        <View style={containerStyles}>
          {renderTitle('desktop')}
          <View style={styles.menuItemsDesktop}>{renderMenuItems()}</View>
        </View>
      )
    } else {
      return (
        <View sytle={containerStyles}>
          <Text>Mobile</Text>
        </View>
      )
    }
  }

  return <View style={styles.wrapper}>{renderNavBar()}</View>
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: -20,
  },
  menuItemsDesktop: {
    flexDirection: 'row',
    paddingLeft: '26px',
  },
})

export default NavigationBar
