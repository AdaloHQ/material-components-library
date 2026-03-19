import React from 'react'
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg'

const Gradient = (props) => {
  const { textPos, backgroundEffect, enabled, rounding } = props

  const colors =
    backgroundEffect === 'gradient' && enabled
      ? textPos == 'top'
        ? ['rgba(0,0,0,.8)', 'rgba(0,0,0,.25)', 'rgba(255,255,255,0)']
        : ['rgba(255,255,255,0)', 'rgba(0,0,0,.25)', 'rgba(0,0,0,.8)']
      : ['rgba(255,255,255,0)', 'rgba(255,255,255,0)']

  return (
    <Svg
      style={{
        borderRadius: rounding,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      width="100%"
      height="100%"
    >
      <Defs>
        <LinearGradient id="imageListGrad" x1="0" y1="0" x2="0" y2="1">
          {colors.map((c, i) => (
            <Stop key={i} offset={`${(i / (colors.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#imageListGrad)" />
    </Svg>
  )
}

export default Gradient
