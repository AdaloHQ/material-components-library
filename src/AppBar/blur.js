import React from 'react'
import { BlurView } from "@react-native-community/blur";

const Blur = props => {
  const {
        translucentColor
    } = props

  const style = {
    backgroundColor = translucentColor,
    height: height,
    width: width,
  }

  return (
    <BlurView
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
        style = {style}
    >
      {props.children}
    </BlurView>
  )
}

export default Blur
