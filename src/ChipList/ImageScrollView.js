import React, { Component } from 'react'
import { ScrollView } from 'react-native'

class ImageScrollView extends Component {
  render() {
    const { children } = this.props

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    )
  }
}

export default ImageScrollView
