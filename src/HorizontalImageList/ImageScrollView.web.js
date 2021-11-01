import React, { Component } from 'react'
import { View } from 'react-native'
import ScrollContainer from 'react-indiana-drag-scroll'

class ImageScrollView extends Component {
  render() {
    const { children } = this.props
    return (
      <ScrollContainer horizontal={true} vertical={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          {children}
        </View>
      </ScrollContainer>
    )
  }
}
export default ImageScrollView
