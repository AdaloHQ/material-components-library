import React, { Component } from 'react'
import { Image, View, Text, TouchableWithoutFeedback } from 'react-native'
import { applyImgixParameters } from '../lib/imgix'

class ImageItem extends Component {
  state = {
    layout: null,
  }

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
            <Image
              style={style.image}
              resizeMode={resize}
              source={applyImgixParameters(image, this.state.layout)}
              onLayout={(e) => {
                if (!this.state.layout) {
                  this.setState({ layout: e.nativeEvent.layout })
                }
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        {bottom && textEnabled && textItem}
      </View>
    )
  }
}

export default ImageItem
