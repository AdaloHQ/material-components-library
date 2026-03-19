import React from 'react'
import { View } from 'react-native'
import { getGradientStyle } from '../Shared/gradientStyle'

const Gradient = (props) => {
  const { textPos, backgroundEffect, enabled, rounding } = props

  const gradientCSS =
    backgroundEffect === 'gradient' && enabled
      ? textPos == 'top'
        ? 'linear-gradient(to bottom, rgba(0,0,0,.8), rgba(0,0,0,.25), rgba(255,255,255,0))'
        : 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,.25), rgba(0,0,0,.8))'
      : null

  return (
    <View
      style={{
        borderRadius: rounding,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...getGradientStyle(gradientCSS),
      }}
    />
  )
}

export default Gradient
