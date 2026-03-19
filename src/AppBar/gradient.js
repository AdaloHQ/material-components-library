import React from 'react'
import { View } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg'

const Gradient = (props) => {
  return (
    <View style={{ position: 'relative' }}>
      <Svg
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        width="100%"
        height="100%"
      >
        <Defs>
          <LinearGradient id="appBarGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <Stop offset="100%" stopColor="rgba(0,0,0,.8)" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#appBarGrad)" />
      </Svg>
      {props.children}
    </View>
  )
}

export default Gradient
