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
    const { source, imgixProps = {}, keys = '', ...props } = this.props

    console.error(keys, "MATLIBCOMP: applyImgixParameters: ", applyImgixParameters(source, this.state.layout, imgixProps))
    console.error(keys, "MATLIBCOMP: props: ", props)
    return (
      <Image
        {...props}
        source={applyImgixParameters(source, this.state.layout, imgixProps)}
        onLayout={(e) => {
          if (!this.state.layout) {
            console.error(keys, "MATLIBCOMP: nativeEvent.layout onLayout", e.nativeEvent)
            this.setState({ layout: e.nativeEvent.layout })
          }
        }}
        onLoad={e =>     console.error(keys, "MATLIBCOMP: onLoad: ",e)}
        onLoadEnd={e => {
          console.error(keys, 'MATLIBCOMP: onLoadEnd: ', e)
        }}
        onError={e => {
          console.error(keys, "MATLIBCOMP: error: ",e)
          console.error(keys, "MATLIBCOMP: error nativeEvent: ",e.nativeEvent)
          Object.keys(e).map(key => console.error(keys, `MATLIBCOMP: error ${key}: `, e[key]))
        }}
      />
    )
  }
}

export default ImgixImage
