import React, { Component } from 'react'
import { ScrollView } from 'react-native'

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
