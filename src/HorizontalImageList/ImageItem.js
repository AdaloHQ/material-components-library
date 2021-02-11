import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Gradient from './gradient'
import { RippleFeedback, IconToggle } from '@protonapp/react-native-material-ui'

class ImageItem extends Component {
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
    const {
      style,
      image,
      subtitle,
      shadow,
      textSwitch,
      iconSwitches,
      icons,
      iconColors,
      textPosition,
      iconActions,
      iconSize,
      gradientProps,
      onPress,
    } = this.props

    const { textPos, backgroundEffect, gradientEnabled } = gradientProps
    return (
      <ImageBackground
        style={shadow ? [style.shadow, style.image] : style.image}
        imageStyle={style.image}
        source={image}
      >
        <View style={style.overlay}>
          <Gradient
            textPos={textPos}
            textSwitch={textSwitch}
            backgroundEffect={backgroundEffect}
            height={style.image.height}
            width={style.image.width}
            overlay={style.overlay}
            gradientEnabled={gradientEnabled}
          >
            <View style={style.container}>
              <View style={style.top}>
                {textPos == 'top' && textSwitch ? (
                  <View style={style.text}>
                    {this.renderTitle()}
                    <Text style={style.subtitle} numberOfLines={1}>
                      {subtitle}
                    </Text>
                  </View>
                ) : textSwitch ? (
                  <View>
                    <IconToggle
                      name={icons[0]}
                      color={iconSwitches[0] ? iconColors[0] : '#FFFFFF00'}
                      onPress={iconSwitches[0] ? iconActions[0] : null}
                      size={iconSize}
                      maxOpacity={0.0}
                      style={style.topIcon}
                    ></IconToggle>
                  </View>
                ) : (
                  <View>
                    <IconToggle
                      name={icons[4]}
                      color={iconSwitches[4] ? iconColors[4] : '#FFFFFF00'}
                      onPress={iconSwitches[4] ? iconActions[4] : null}
                      size={iconSize}
                      maxOpacity={0.0}
                      style={style.topIcon}
                    ></IconToggle>
                  </View>
                )}
                <View>
                  <IconToggle
                    name={icons[1]}
                    color={iconSwitches[1] ? iconColors[1] : '#FFFFFF00'}
                    onPress={iconSwitches[1] ? iconActions[1] : null}
                    size={iconSize}
                    maxOpacity={0.0}
                    style={style.topIcon}
                  ></IconToggle>
                </View>
              </View>
              <View style={style.bottom}>
                {textPos == 'bottom' && textSwitch ? (
                  <View style={style.text}>
                    {this.renderTitle()}
                    <Text style={style.subtitle} numberOfLines={1}>
                      {subtitle}
                    </Text>
                  </View>
                ) : textSwitch ? (
                  <IconToggle
                    name={icons[3]}
                    color={iconSwitches[3] ? iconColors[3] : '#FFFFFF00'}
                    onPress={iconSwitches[3] ? iconActions[3] : null}
                    size={iconSize}
                    maxOpacity={0.0}
                    style={style.topIcon}
                  ></IconToggle>
                ) : (
                  <IconToggle
                    name={icons[5]}
                    color={iconSwitches[5] ? iconColors[5] : '#FFFFFF00'}
                    onPress={iconSwitches[5] ? iconActions[5] : null}
                    size={iconSize}
                    maxOpacity={0.0}
                    style={style.topIcon}
                  ></IconToggle>
                )}
                <IconToggle
                  name={icons[2]}
                  color={iconSwitches[2] ? iconColors[2] : '#FFFFFF00'}
                  onPress={iconSwitches[2] ? iconActions[2] : null}
                  size={iconSize}
                  maxOpacity={0.0}
                  style={style.topIcon}
                ></IconToggle>
              </View>
            </View>
          </Gradient>
        </View>
      </ImageBackground>
    )
  }
}

export default ImageItem
