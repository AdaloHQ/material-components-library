import React, { useState, useRef, useEffect } from 'react'
import {
  Platform,
  View,
  Image,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Title } from './Title'
import { MenuItems } from './MenuItems'
import { AdditionalNavigation } from './AdditionalNavigation'
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
  additionalNavigation,
  _fonts,
  editor,
  _width,
  openAccordion,
  _screenHeight,
  _screenWidth,
  _deviceType,
  ...props
}) => {
  const [activeMenuItem, setActiveMenuItem] = useState(
    menuItems.defaultActiveMenuItem
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true)
  const variant = _deviceType

  const overlayPosition = useRef(new Animated.Value(0)).current

  overlayPosition.addListener(({ value }) => {
    if (value < 0.1) {
      setMobileMenuOpen(true)
    } else if (value > 0.1 && mobileOpen && mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  })

  const openMobileMenu = () => {
    setMobileOpen(true)
    setMobileMenuOpen(false)
    Animated.timing(overlayPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const closeMobileMenu = () => {
    Animated.timing(overlayPosition, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setMobileOpen(false)
    })
  }

  const mobileOpenEditor =
    variant !== 'desktop' &&
    openAccordion &&
    openAccordion !== 'root' &&
    openAccordion !== 'title'

  if (!mobileOpen && editor && mobileOpenEditor) {
    setMobileOpen(true)
  }

  if (mobileOpen && editor && !mobileOpenEditor) {
    setMobileOpen(false)
  }

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
    const {
      enabled,
      image,
      rounding,
      mobileText,
      actions,
      styles,
      dividerColor,
    } = profileImage
    if (!enabled) {
      return <View />
    }

    if (variant === 'desktop') {
      return (
        <TouchableOpacity onPress={actions}>
          <Image
            source={image || titlePlaceholder}
            style={{
              width: 40,
              height: 40,
              borderRadius: rounding,
              resizeMode: 'cover',
              justifyContent: 'flex-end',
            }}
          />
        </TouchableOpacity>
      )
    }

    const mobileProfileImageStyles = {
      flexDirection: 'row',
      marginTop: 14,
      alignItems: 'center',
      marginBottom: 18,
    }

    const imageStyles = {
      width: 80,
      height: 80,
      borderRadius: rounding * 2,
      resizeMode: 'cover',
    }

    const textStyles = {
      fontSize: 24,
      fontWeight: '500',
      fontFamily: styles.mobileText.fontFamily,
      color: styles.mobileText.color,
      marginLeft: 18,
    }

    return (
      <View>
        <View style={mobileProfileImageStyles}>
          <TouchableOpacity onPress={actions}>
            <Image source={image || titlePlaceholder} style={imageStyles} />
          </TouchableOpacity>
          <Text style={textStyles} onPress={actions}>
            {mobileText}
          </Text>
        </View>
        <View
          style={{
            height: 1,
            borderBottom: '1px solid ' + dividerColor,
            marginLeft: -24,
            marginRight: -20,
          }}
        />
      </View>
    )
  }

  const renderNavBar = () => {
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

    let menuHeight = 76

    if (variant === 'desktop') menuHeight = 92
    else if (variant === 'tablet') menuHeight = 84
    containerStyles.height = menuHeight

    if (variant !== 'desktop' && !editor) {
      containerStyles = {
        ...containerStyles,
        height: menuHeight + 30,
        paddingTop: 62,
        marginTop: -30,
        ...getBorderStyle(),
      }
    }

    const mobileWebDesktopOffset = Platform.OS === 'web' ? 38 : 0

    if (mobileOpen && editor && mobileOpenEditor) {
      containerStyles = {
        ...containerStyles,
        height: _screenHeight,
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

    let mobileAlignment = title.universalLayout ? 'left' : title.mobileAlignment
    let mobileTitleStyles = {
      marginLeft: mobileAlignment === 'right' ? 'auto' : '',
      paddingRight: 12,
      flexDirection: 'row',
    }

    if (mobileAlignment === 'center') {
      mobileTitleStyles = {
        ...mobileTitleStyles,
        ...centerStyles,
      }
    }

    const fullPageStyles = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      height: _screenHeight,
      backgroundColor,
      transform: [
        {
          translateY: editor
            ? 0
            : overlayPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [_screenHeight * -1, 0],
              }),
        },
      ],
    }

    const overlayContainerStyles = {
      paddingTop: 38,
      marginLeft: 24,
      marginRight: 20,
      display: 'flex',
      flexDirection: 'column',
      height: _screenHeight - mobileWebDesktopOffset,
    }

    if (variant === 'desktop') {
      // render the title on the left, the menu items in the middle, and the profile image on the right
      return (
        <View style={containerStyles}>
          <View style={{ paddingRight: 26, justifyContent: 'flex-start' }}>
            <Title
              variant={variant}
              titleOptions={title}
              menuHeight={menuHeight}
            />
          </View>
          <MenuItems
            menuItems={menuItems}
            variant={variant}
            activeMenuItem={
              editor ? menuItems.defaultActiveMenuItem : activeMenuItem
            }
            setActiveMenuItem={editor ? () => {} : setActiveMenuItem}
            items={items}
            _fonts={_fonts}
            centerStyles={centerStyles}
            menuHeight={menuHeight}
          />
          {menuItems.alignment === 'right' ? (
            <View
              style={{
                marginRight: 16,
                marginLeft: 16,
                borderLeft: `2px solid ${borderColor}`,
                height: containerStyles.height - 40,
              }}
            />
          ) : (
            <View />
          )}
          <View
            style={{
              marginLeft: menuItems.alignment !== 'right' ? 'auto' : 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {
              <AdditionalNavigation
                {...additionalNavigation}
                variant={variant}
              />
            }
            {renderProfileImage()}
          </View>
        </View>
      )
    } else {
      return (
        <View>
          {mobileOpen ? (
            <Animated.View style={fullPageStyles}>
              <View style={overlayContainerStyles}>
                <View style={{ justifyContent: 'flex-start' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Icon
                      name="close"
                      color={menuItems.mobileMenuIconColor}
                      size={20}
                      onPress={() => closeMobileMenu()}
                    />
                  </View>
                  {renderProfileImage()}
                  <MenuItems
                    menuItems={menuItems}
                    variant={variant}
                    activeMenuItem={
                      editor ? menuItems.defaultActiveMenuItem : activeMenuItem
                    }
                    setActiveMenuItem={editor ? () => {} : setActiveMenuItem}
                    items={items}
                    _fonts={_fonts}
                    menuHeight={menuHeight}
                  />
                </View>
                <View
                  style={{
                    marginTop: 'auto',
                    alignItems: 'center',
                    marginLeft: -24,
                    marginRight: -20,
                  }}
                >
                  <AdditionalNavigation
                    {...additionalNavigation}
                    variant={variant}
                  />
                </View>
              </View>
            </Animated.View>
          ) : (
            <View />
          )}
          {mobileMenuOpen ? (
            <View style={containerStyles}>
              <View style={mobileTitleStyles}>
                <Title
                  variant={variant}
                  titleOptions={title}
                  menuHeight={menuHeight}
                />
              </View>
              <View
                style={{ marginLeft: mobileAlignment !== 'right' ? 'auto' : 0 }}
              >
                <Icon
                  name="menu"
                  color={menuItems.mobileMenuIconColor}
                  size={20}
                  onPress={() => openMobileMenu()}
                />
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
      )
    }
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
