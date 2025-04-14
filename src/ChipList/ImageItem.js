import React, { Component } from 'react'
import { View, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ImgixImage from '../lib/ImgixImage'

class ImageItem extends Component {
  render() {
    const {
      style,
      clickActions,
      image,
      title,
      rightIcon,
      imageProps,
    } = this.props
    const { icon, iconColor, iconAction } = rightIcon

    const textItem = title ? (
      <Text style={style.text}>
        {title.length > 20 ? title.substring(0, 17) + '...' : title}
      </Text>
    ) : null

    const iconItem =
      rightIcon && rightIcon.enabled ? (
        <Icon
          name={icon}
          color={iconColor}
          size={style.image.height}
          style={{ alignContent: 'center' }}
          onPress={iconAction}
        ></Icon>
      ) : null

    const imageItem = imageProps.enabled ? (
      <ImgixImage style={style.image} source={image}/>
    ) : null

    return (
      <View style={style.background}>
        <View style={style.chip}>
          <Pressable onPress={clickActions}>
            <View style={style.chipTouch}>
              {imageItem}
              {textItem}
            </View>
          </Pressable>
          {iconItem}
        </View>
      </View>
    )
  }
}

export default ImageItem
