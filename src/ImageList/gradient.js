import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Gradient = (props) => {
  const { textPos, backgroundEffect, enabled, rounding } = props

  return (
    <LinearGradient
      colors={
        backgroundEffect === 'gradient' && enabled
          ? textPos == 'top'
            ? ['rgba(0,0,0,.8)', '#FFFFFF00']
            : ['#FFFFFF00', 'rgba(0,0,0,.8)']
          : ['#FFFFFF00', '#FFFFFF00']
      }
      style={{
        borderRadius: rounding,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    ></LinearGradient>
  )
}

export default Gradient
