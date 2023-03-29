import React from 'react'

import { View, TouchableOpacity, Platform } from 'react-native'
import { Button, Icon } from '@protonapp/react-native-material-ui'

export const AdditionalNavigation = ({
  enabled,
  additionalNavigationType,
  iconColor,
  iconBorderColor,
  iconBackgroundColor,
  icon,
  iconHoverText,
  iconActions,
  buttonBorderColor,
  buttonBackgroundColor,
  buttonText,
  buttonActions,
  rounding,
  dividerColor,
  styles,
  variant,
  closeMobileMenu,
  ...props
}) => {
  if (!enabled) {
    return <View />
  }

  const containerStyles =
    variant === 'desktop'
      ? {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 16,
        }
      : {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 18,
          borderTopColor: dividerColor,
          borderTopWidth: 1,
          width: '100%',
          paddingLeft: 50,
          paddingRight: 50,
          paddingBottom: 24,
        }

  if (Platform.OS === 'ios') {
    containerStyles.paddingBottom += 20
  }

  const renderIcon = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: iconBackgroundColor,
          borderRadius: rounding,
          padding: 4,
          borderColor: iconBorderColor,
          borderWidth: 1,
          marginRight: 16,
        }}
        onPress={() => {
          closeMobileMenu && closeMobileMenu()
          iconActions && iconActions()
        }}
      >
        <Icon name={icon} color={iconColor} size={28} />
      </TouchableOpacity>
    )
  }

  const renderButton = () => {
    return (
      <Button
        text={buttonText}
        style={{
          container: {
            backgroundColor: buttonBackgroundColor,
            borderColor: buttonBorderColor,
            borderRadius: rounding,
            borderWidth: 1,
            padding: 10,
            flex: variant !== 'desktop' && 1,
          },
          text: {
            color: styles.buttonText.color,
            fontFamily: styles.buttonText.fontFamily,
            fontSize: styles.buttonText.fontSize,
            fontWeight: styles.buttonText.fontWeight,
          },
        }}
        onPress={() => {
          closeMobileMenu && closeMobileMenu()
          buttonActions && buttonActions()
        }}
      />
    )
  }

  return (
    <View style={containerStyles}>
      {additionalNavigationType === 'iconButton' && renderIcon()}
      {renderButton()}
    </View>
  )
}
