import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import ImageItem from './ImageItem.js'
import placeholder from './holdplace.png'
import ScrollContainer from 'react-indiana-drag-scroll'

class ImageScrollView extends Component {
  render() {
    const { imageList, style, editor, rightIcon } = this.props

    return (
      <ScrollContainer horizontal={true} vertical={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          {imageList &&
            imageList.map(
              ({ clickActions, text, image, rightIcon, chipStyles }, index) => (
                <View style={style.container} key={index}>
                  <ImageItem
                    style={style}
                    image={editor ? placeholder : image.image}
                    imageProps={image}
                    title={text.title}
                    clickActions={clickActions}
                    rightIcon={rightIcon}
                  />
                </View>
              )
            )}
        </View>
      </ScrollContainer>
    )
  }
}

export default ImageScrollView
