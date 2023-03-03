import React from 'react'

import { View, TouchableOpacity } from 'react-native'
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
  ...props
}) => {
  if (!enabled) {
    return <View />
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
        onPress={iconActions}
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
            flex: 1,
          },
          text: {
            color: styles.buttonText.color,
            fontFamily: styles.buttonText.fontFamily,
          },
        }}
        onPress={buttonActions}
      />
    )
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 18,
        borderTopColor: dividerColor,
        borderTopWidth: 1,
        width: '100%',
        paddingLeft: 50,
        paddingRight: 50,
      }}
    >
      {additionalNavigationType === 'iconButton' && renderIcon()}
      {renderButton()}
    </View>
  )
}
