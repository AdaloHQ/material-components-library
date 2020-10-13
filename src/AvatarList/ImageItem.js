import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'

class ImageItem extends Component {
  render() {
    let { image, style, text, bottom, resize, maxLimit, onPress } = this.props

    const textItem = text ? (
      <Text style={style.text}>
        {text.length > maxLimit
          ? text.substring(0, maxLimit - 3) + '...'
          : text}
      </Text>
    ) : null

    return (
      <View style={style.view}>
        {!bottom && textItem}
        <View style={style.center}>
          <View style={style.background} onStartShouldSetResponder={onPress}>
            <Image style={style.image} resizeMode={resize} source={image} />
          </View>
        </View>
        {bottom && textItem}
      </View>
    )
  }
}

export default ImageItem
