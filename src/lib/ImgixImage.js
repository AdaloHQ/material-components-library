import React, { Component } from 'react'
import { Image } from 'react-native'
import { applyImgixParameters } from './utils'

class ImgixImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layout: null,
    }
  }

  render() {
    const { source, imgixProps = {}, ...props } = this.props
    return (
      <Image
        {...props}
        source={applyImgixParameters(source, this.state.layout, imgixProps)}
        onLayout={(e) => {
          if (!this.state.layout) {
            this.setState({ layout: e.nativeEvent.layout })
          }
        }}
      />
    )
  }
}

export default ImgixImage
