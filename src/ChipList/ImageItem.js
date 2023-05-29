import React, { Component } from 'react'
import { Image, View, Text, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { applyImgixParameters } from '../lib/imgix'

class ImageItem extends Component {
  state = {
    layout: null,
  }

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
      <Image
        style={style.image}
        source={applyImgixParameters(image, this.state.layout)}
        onLayout={(e) => {
          if (!this.state.layout) {
            this.setState({ layout: e.nativeEvent.layout })
          }
        }}
      />
    ) : null

    return (
      <View style={style.background}>
        <View style={style.chip}>
          <TouchableWithoutFeedback onPress={clickActions}>
            <View style={style.chipTouch}>
              {imageItem}
              {textItem}
            </View>
          </TouchableWithoutFeedback>
          {iconItem}
        </View>
      </View>
    )
  }
}

export default ImageItem
