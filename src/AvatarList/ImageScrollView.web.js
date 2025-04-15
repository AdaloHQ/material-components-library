import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import ImageItem from './ImageItem.js'
import placeholder from './holdplace.png'
import ScrollContainer from 'react-indiana-drag-scroll'

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
        <ScrollContainer horizontal={true} vertical={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            {imageList &&
              !edit &&
              imageList.map(
                ({ image, avatarClickActions, textChild }, index) => (
                  <ImageItem
                    key={index}
                    image={image}
                    style={imageItemStyle}
                    text={textChild.title}
                    textEnabled={textChild.enabled}
                    bottom={textPos === 1}
                    resize={cropMenu}
                    maxLimit={((imageSize - 30) / 170) * 21 + 6}
                    border={borderBool}
                    onPress={avatarClickActions}
                  />
                )
              )}
          </View>
        </ScrollContainer>

        <ScrollContainer horizontal={true} vertical={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            {imageList &&
              edit &&
              imageList.map(({ textChild }, index) => (
                <ImageItem
                  key={index}
                  image={placeholder}
                  style={imageItemStyle}
                  text={textChild.title}
                  textEnabled={textChild.enabled}
                  bottom={textPos === 1}
                  resize={cropMenu}
                  maxLimit={((imageSize - 30) / 170) * 21 + 6}
                  border={borderBool}
                />
              ))}
          </View>
        </ScrollContainer>
      </View>
    )
  }
}

export default ImageScrollView
