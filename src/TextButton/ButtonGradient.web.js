import React from 'react'

const ButtonGradient = ({ backgroundGradient, borderRadius }) => {
  if (!backgroundGradient?.enabled) return null

  const { type, startColor, endColor, angle = 180 } = backgroundGradient
  if (!startColor || !endColor) return null

  const gradientCSS =
    type === 'radial'
      ? `radial-gradient(circle, ${startColor}, ${endColor})`
      : `linear-gradient(${angle}deg, ${startColor}, ${endColor})`

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: gradientCSS,
        borderRadius: borderRadius || 0,
        overflow: 'hidden',
      }}
    />
  )
}

export default ButtonGradient
