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
      edit,
    } = this.props

    return (
      <View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', overflow: 'auto' }}>
            {imageList &&
              imageList.map(({ id, image, avatarClickActions, textChild }) => (
                <ImageItem
                  key={id}
                  image={edit ? placeholder : image}
                  style={imageItemStyle}
                  text={textChild.title}
                  textEnabled={textChild.enabled}
                  bottom={textPos === 1}
                  resize={cropMenu}
                  maxLimit={((imageSize - 30) / 170) * 21 + 6}
                  border={borderBool}
                  onPress={avatarClickActions}
                />
              ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default ImageScrollView
