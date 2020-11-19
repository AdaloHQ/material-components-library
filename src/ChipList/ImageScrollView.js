import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import ImageItem from './ImageItem.js'

class ImageScrollView extends Component {
  render() {
    const { imageList, style, rightIcon } = this.props

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          {imageList &&
            imageList.map(
              ({ clickActions, text, image, rightIcon, chipStyles }, index) => (
                <View style={style.container} key={index}>
                  <ImageItem
                    image={image.image}
                    style={style}
                    title={text.title}
                    imageProps={image}
                    clickActions={clickActions}
                    rightIcon={rightIcon}
                  />
                </View>
              )
            )}
        </View>
      </ScrollView>
    )
  }
}

export default ImageScrollView
