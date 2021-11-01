import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import ImageItem from './ImageItem.js'
import placeholder from './holdplace.png'
import ScrollContainer from 'react-indiana-drag-scroll'

class ImageScrollView extends Component {
  render() {
    const { children } = this.props

    return (
      <ScrollContainer horizontal={true} vertical={false}>
        {children}
      </ScrollContainer>
    )
  }
}

export default ImageScrollView
