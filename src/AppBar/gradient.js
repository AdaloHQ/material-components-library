import React from 'react'
import { View } from 'react-native'
import { getGradientStyle } from '../Shared/gradientStyle'

const gradientCSS = 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,.8))'

const Gradient = (props) => {
  return (
    <View style={getGradientStyle(gradientCSS)}>
      {props.children}
    </View>
  )
}

export default Gradient
