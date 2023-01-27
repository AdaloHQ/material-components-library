import React, { useState } from 'react'
import { Platform, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { DeviceBreakpoint } from '@adalo/constants'

import { Title } from './Title'
import { MenuItems } from './MenuItems'
import titlePlaceholder from './nav-title-image-placeholder.png'

const NavigationBar = ({
  backgroundColor,
  shadow,
  border,
  borderColor,
  borderWidth,
  title,
  menuItems,
  firstMenuItem,
  secondMenuItem,
  thirdMenuItem,
  fourthMenuItem,
  fifthMenuItem,
  profileImage,
  _fonts,
  editor,
  _width,
}) => {
  const [activeMenuItem, setActiveMenuItem] = useState(
    menuItems.defaultActiveMenuItem
  )

  const items = [
    firstMenuItem,
    secondMenuItem,
    thirdMenuItem,
    fourthMenuItem,
    fifthMenuItem,
  ]

  const getBorderStyle = () => {
    if (border) {
      return {
        borderBottomWidth: borderWidth,
        borderBottomColor: borderColor,
      }
    }
  }

  const renderProfileImage = () => {
    const { enabled, image, rounding, mobileText, actions } = profileImage
    if (!enabled) {
      return <View />
    }

    return (
      <Image
        source={image || titlePlaceholder}
        style={{
          width: 40,
          height: 40,
          borderRadius: rounding,
          resizeMode: 'cover',
          justifyContent: 'flex-end',
        }}
        onPress={actions}
      />
    )
  }

  const renderAdditionalItems = () => {
    return <View />
  }

  const renderNavBar = () => {
    let variant =
      _width > DeviceBreakpoint.TABLET_BREAKPOINT ? 'desktop' : 'mobile'

    let containerStyles = {
      backgroundColor,
      height: 76,
      paddingTop: 32,
      paddingRight: 20,
      paddingLeft: variant === 'desktop' ? 20 : 12,
      paddingBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      ...getBorderStyle(),
      ...getShadowStyle(shadow),
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

    // Logic for centering the title and menu items on mobile and desktop respectively
    const centerStyles = {
      position: 'absolute',
      display: 'inline-flex',
      justifyContent: 'center',
      left: 0,
      right: 0,
      margin: '0 auto',
    }

    let menuItemsStyles = {
      flexDirection: 'row',
      marginLeft: menuItems.alignment === 'right' ? 'auto' : '',
    }

    if (menuItems.alignment === 'center') {
      menuItemsStyles = {
        ...menuItemsStyles,
        ...centerStyles,
      }
    }

    let mobileAlignment = title.universalLayout ? 'left' : title.mobileAlignment
    let mobileTitleStyles = {
      marginLeft: mobileAlignment === 'right' ? 'auto' : '',
      paddingRight: '12px',
      flexDirection: 'row',
    }

    if (mobileAlignment === 'center') {
      mobileTitleStyles = {
        ...mobileTitleStyles,
        ...centerStyles,
      }
    }

    if (variant === 'desktop') {
      // render the title on the left, the menu items in the middle, and the profile image on the right
      return (
        <View style={containerStyles}>
          <View style={{ paddingRight: '26px', justifyContent: 'flex-start' }}>
            <Title variant={variant} titleOptions={title} />
          </View>
          <View style={menuItemsStyles}>
            <MenuItems
              menuItems={menuItems}
              variant={variant}
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
              items={items}
              _fonts={_fonts}
            ></MenuItems>
          </View>
          <View
            style={{
              marginLeft: menuItems.alignment !== 'right' ? 'auto' : '',
            }}
          >
            {renderProfileImage()}
            {renderAdditionalItems()}
          </View>
        </View>
      )
    } else if (variant === 'mobile') {
      return (
        <View style={containerStyles}>
          <View style={mobileTitleStyles}>
            <Title variant={variant} titleOptions={title} />
          </View>
          <View
            style={{ marginLeft: mobileAlignment !== 'right' ? 'auto' : '' }}
          >
            <Icon name="menu" color={menuItems.mobileMenuIconColor} size={20} />
          </View>
        </View>
      )
    }
    return <View />
  }

  return <View style={{ marginTop: -20 }}>{renderNavBar()}</View>
}

export default NavigationBar

const getShadowStyle = (shadow) => {
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
