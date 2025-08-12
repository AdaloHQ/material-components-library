import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
} from 'react-native'
import ImageItem from './ImageItem.js'
import BottomBar from './BottomBar.js'
import placeholder from './holdplace.png'

class ImageScrollView extends Component {
  render() {
    const { children } = this.props

    return (
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', overflow: 'auto' }}>
          {children}
        </View>
      </ScrollView>
    )
  }
}
export default ImageScrollView
