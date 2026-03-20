import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Gradient = (props) => {
  return (
    <LinearGradient colors={['#FFFFFF00', 'rgba(0,0,0,.8)']}>
      {props.children}
    </LinearGradient>
  )
}

export default Gradient
