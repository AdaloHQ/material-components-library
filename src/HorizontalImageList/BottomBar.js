import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button } from '@protonapp/react-native-material-ui'
import WrappedIconToggle from '../IconToggle/index.js'
import IconToggleEditor from '../Shared/IconToggleEditor'

class BottomBar extends Component {
  renderTitle() {
    const { style, title, titleLimit } = this.props
    if (title.length > titleLimit) {
      const firstLine = title.substring(0, titleLimit + 1)
      const i = firstLine.lastIndexOf(' ')
      return (
        <View style={style.titleContainer}>
          <Text style={style.title}>{title.substring(0, i + 1)}</Text>
          <Text style={style.title} numberOfLines={1}>
            {title.substring(i + 1)}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={style.titleContainer}>
          <Text style={style.title}>{title}</Text>
        </View>
      )
    }
  }
  render() {
    const { style, subtitle, styleSwitch, buttonProps, buttonSize, editor } =
      this.props
    const {
      leftButton,
      rightButton,
      buttonTextL,
      buttonTextR,
      buttonTextColorL,
      buttonTextColorR,
      buttonBackgroundL,
      buttonBackgroundR,
      buttonBackgroundColorL,
      buttonBackgroundColorR,
      buttonBorderL,
      buttonBorderR,
      buttonBorderColorL,
      buttonBorderColorR,
      buttonBorderWidthL,
      buttonBorderWidthR,
      buttonRoundingL,
      buttonRoundingR,
      buttonTypeL,
      buttonTypeR,
      buttonActionL,
      buttonActionR,
      iconColorL,
      iconColorR,
      iconL,
      iconR,
      enabled,
      styles,
      inputL,
      activeIconL,
      activeColorL,
      inactiveIconL,
      inactiveColorL,
      activeActionsL,
      inactiveActionsL,
      inputR,
      activeIconR,
      activeColorR,
      inactiveIconR,
      inactiveColorR,
      activeActionsR,
      inactiveActionsR,
    } = buttonProps

    const buttons = {
      leftButton: {
        container: {
          height: ((buttonSize - 12) / 20) * 12 + 20,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          backgroundColor: buttonBackgroundL ? buttonBackgroundColorL : null,
          borderWidth: buttonBorderL ? buttonBorderWidthL : 0,
          borderColor: buttonBorderL ? buttonBorderColorL : null,
          borderRadius: buttonRoundingL,
          alignContent: 'stretch',
          alignSelf: 'stretch',
        },
        text: {
          fontSize: ((buttonSize - 12) / 20) * 4 + 12,
          color: buttonTextColorL,
          fontWeight: '600',
          alignContent: 'stretch',
        },
      },
      rightButton: {
        container: {
          height: ((buttonSize - 12) / 20) * 12 + 20,
          justifyContent: 'center',
          padding: 0,
          backgroundColor: buttonBackgroundR ? buttonBackgroundColorR : null,
          borderWidth: buttonBorderR ? buttonBorderWidthR : 0,
          borderColor: buttonBorderR ? buttonBorderColorR : null,
          borderRadius: buttonRoundingR,
        },
        text: {
          fontSize: ((buttonSize - 12) / 20) * 4 + 12,
        },
      },
      off: {
        container: { backgroundColor: '#ee0011', padding: 4, height: 32 },
      },
      rightIcon: {
        color: iconColorR,
      },
    }
    //custom fonts
    if (styles) {
      buttons.rightButton.text = {
        ...buttons.rightButton.text,
        ...styles.buttonTextR,
      }
      buttons.leftButton.text = {
        ...buttons.leftButton.text,
        ...styles.buttonTextL,
      }
    } else {
      buttons.rightButton.text.color = buttonTextColorR
        ? buttonTextColorR
        : '#fff'
      buttons.rightButton.text.fontWeight = '600'
      buttons.leftButton.text.color = buttonTextColorL
        ? buttonTextColorL
        : '#fff'
      buttons.leftButton.text.fontWeight = '600'
    }

    return (
      <View style={styleSwitch ? style.BottomBar : style.styleless}>
        <View style={style.text}>
          {this.renderTitle()}
          <Text style={style.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
        {enabled ? (
          <View
            style={
              (leftButton || rightButton) && buttonProps.enabled
                ? style.buttonContainer
                : { width: 0, height: 0 }
            }
          >
            {buttonTypeL === 'button' ? (
              <Button
                style={leftButton ? buttons.leftButton : buttons.off}
                upperCase={false}
                text={leftButton ? buttonTextL : ''}
                onPress={buttonActionL}
              ></Button>
            ) : buttonTypeL === 'toggle' && leftButton ? (
              editor ? (
                <IconToggleEditor
                  activeIcon={activeIconL}
                  inactiveIcon={inactiveIconL}
                  activeColor={activeColorL}
                  inactiveColor={inactiveColorL}
                  activeActions={activeActionsL}
                  inactiveActions={inactiveActionsL}
                />
              ) : (
                <WrappedIconToggle
                  input={inputL}
                  activeIcon={activeIconL}
                  inactiveIcon={inactiveIconL}
                  activeColor={activeColorL}
                  inactiveColor={inactiveColorL}
                  activeActions={activeActionsL}
                  inactiveActions={inactiveActionsL}
                />
              )
            ) : (
              <Icon
                name={iconL}
                style={leftButton ? { color: iconColorL } : buttons.off}
                size={buttonSize}
                onPress={buttonActionL}
              ></Icon>
            )}
            {buttonTypeR === 'button' ? (
              <Button
                style={rightButton ? buttons.rightButton : buttons.off}
                upperCase={false}
                text={rightButton ? buttonTextR : ''}
                onPress={buttonActionR}
              ></Button>
            ) : buttonTypeR === 'toggle' && rightButton ? (
              editor ? (
                <IconToggleEditor
                  activeIcon={activeIconR}
                  inactiveIcon={inactiveIconR}
                  activeColor={activeColorR}
                  inactiveColor={inactiveColorR}
                  activeActions={activeActionsR}
                  inactiveActions={inactiveActionsR}
                />
              ) : (
                <WrappedIconToggle
                  input={inputR}
                  activeIcon={activeIconR}
                  inactiveIcon={inactiveIconR}
                  activeColor={activeColorR}
                  inactiveColor={inactiveColorR}
                  activeActions={activeActionsR}
                  inactiveActions={inactiveActionsR}
                />
              )
            ) : (
              <Icon
                name={iconR}
                style={rightButton ? buttons.rightIcon : buttons.off}
                size={buttonSize}
                onPress={buttonActionR}
              ></Icon>
            )}
          </View>
        ) : (
          <View></View>
        )}
      </View>
    )
  }
}

export default BottomBar
