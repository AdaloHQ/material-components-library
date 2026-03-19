import React from 'react'
import { View } from 'react-native'
import { getGradientStyle } from '../Shared/gradientStyle'

const Gradient = (props) => {
  const { overlay, textSwitch, textPos, height, width, gradientEnabled } = props

  const gradientCSS =
    !textSwitch || !gradientEnabled
      ? null
      : textPos == 'top'
      ? 'linear-gradient(to bottom, rgba(0,0,0,.8), rgba(255,255,255,0))'
      : 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,.8))'

  return (
    <View style={{ ...overlay, height, width, ...getGradientStyle(gradientCSS) }}>
      {props.children}
    </View>
  )
}

export default Gradient
