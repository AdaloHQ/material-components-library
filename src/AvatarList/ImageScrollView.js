import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, Layout } from 'react-native'
import ImageItem from './ImageItem.js'
import placeholder from './holdplace.png'

class ImageScrollView extends Component {
  render() {
    const {
      imageList,
      textPos,
      cropMenu,
      imageSize,
      imageItemStyle,
      borderBool,
    } = this.props

    return (
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {imageList &&
            imageList.map(({ id, image, avatarClickActions, textChild }) => (
              <ImageItem
                key={id}
                image={image}
                style={imageItemStyle}
                text={textChild.title}
                bottom={textPos == 1}
                resize={cropMenu}
                maxLimit={((imageSize - 30) / 170) * 21 + 6}
                border={borderBool}
                onPress={avatarClickActions}
              />
            ))}
        </ScrollView>
      </View>
    )
  }
}

export default ImageScrollView
