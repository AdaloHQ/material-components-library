import React from 'react'
import { View } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg'

const Gradient = props => {
  const { overlay, textSwitch, textPos, height, width, gradientEnabled } = props

  const style = {
    ...overlay,
    height: height,
    width: width,
  }

  const colors =
    !textSwitch || !gradientEnabled
      ? ['rgba(255,255,255,0)', 'rgba(255,255,255,0)']
      : textPos == 'top'
      ? ['rgba(0,0,0,.8)', 'rgba(255,255,255,0)']
      : ['rgba(255,255,255,0)', 'rgba(0,0,0,.8)']

  return (
    <View style={style}>
      <Svg
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        width="100%"
        height="100%"
      >
        <Defs>
          <LinearGradient id="horizImgGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={colors[0]} />
            <Stop offset="100%" stopColor={colors[1]} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#horizImgGrad)" />
      </Svg>
      {props.children}
    </View>
  )
}

export default Gradient
