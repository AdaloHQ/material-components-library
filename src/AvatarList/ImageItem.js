import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import ImgixImage from '../lib/ImgixImage'

class ImageItem extends Component {
  render() {
    let {
      image,
      style,
      text,
      bottom,
      resize,
      maxLimit,
      onPress,
      textEnabled,
    } = this.props

    const textItem = text ? (
      <Text style={style.text}>
        {text.length > maxLimit
          ? text.substring(0, maxLimit - 3) + '...'
          : text}
      </Text>
    ) : null

    return (
      <View style={style.view}>
        {!bottom && textEnabled && textItem}
        <View style={style.background}>
          <TouchableWithoutFeedback onPress={onPress}>
            <ImgixImage style={style.image} resizeMode={resize} source={image} />
          </TouchableWithoutFeedback>
        </View>
        {bottom && textEnabled && textItem}
      </View>
    )
  }
}

export default ImageItem
