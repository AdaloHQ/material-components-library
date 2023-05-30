import React, { Component } from 'react'
import { ImageBackground } from 'react-native'
import { applyImgixParameters } from './utils'

class ImgixImageBackground extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layout: null,
    }
  }

  render() {
    const { children, source, imgixProps = {}, ...props } = this.props
    return (
      <ImageBackground
        {...props}
        source={applyImgixParameters(source, this.state.layout, imgixProps)}
        onLayout={(e) => {
          if (!this.state.layout) {
            this.setState({ layout: e.nativeEvent.layout })
          }
        }}
      >
        {children}
      </ImageBackground>
    )
  }
}

export default ImgixImageBackground
