import React from 'react'
import { StyleSheet } from 'react-native'
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  RadialGradient as SvgRadialGradient,
  Stop,
  Rect,
} from 'react-native-svg'

const angleToPoints = (angleDeg) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  const x = Math.cos(rad)
  const y = Math.sin(rad)

  return {
    start: { x: 0.5 - x / 2, y: 0.5 - y / 2 },
    end: { x: 0.5 + x / 2, y: 0.5 + y / 2 },
  }
}

const ButtonGradient = ({ backgroundGradient, borderRadius, componentId }) => {
  if (!backgroundGradient?.enabled) return null

  const { type, startColor, endColor, angle = 180 } = backgroundGradient
  if (!startColor || !endColor) return null

  const gradientId = `btn-gradient-${componentId || 'default'}`
  const containerStyle = [
    styles.container,
    { borderRadius: borderRadius || 0, overflow: 'hidden' },
  ]

  if (type === 'radial') {
    return (
      <Svg style={containerStyle} width="100%" height="100%">
        <Defs>
          <SvgRadialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={startColor} />
            <Stop offset="100%" stopColor={endColor} />
          </SvgRadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${gradientId})`} />
      </Svg>
    )
  }

  const points = angleToPoints(angle)

  return (
    <Svg style={containerStyle} width="100%" height="100%">
      <Defs>
        <SvgLinearGradient
          id={gradientId}
          x1={points.start.x}
          y1={points.start.y}
          x2={points.end.x}
          y2={points.end.y}
        >
          <Stop offset="0%" stopColor={startColor} />
          <Stop offset="100%" stopColor={endColor} />
        </SvgLinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${gradientId})`} />
    </Svg>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default ButtonGradient
