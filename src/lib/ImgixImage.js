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
    const alignedSource = Array.isArray(source) ? source[0] : source
    return (
      <Image
        {...props}
        source={applyImgixParameters(alignedSource, this.state.layout, imgixProps)}
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
