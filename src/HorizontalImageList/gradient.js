import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native'

const Gradient = props => {
  const { overlay, textSwitch, textPos, height, width, gradientEnabled } = props

  const style = {
    ...overlay,
    height: height,
    width: width,
  }

  return (
    <LinearGradient
      colors={
        !textSwitch || !gradientEnabled
          ? ['#FFFFFF00', '#FFFFFF00']
          : textPos == 'top'
          ? ['rgba(0,0,0,.8)', '#FFFFFF00']
          : ['#FFFFFF00', 'rgba(0,0,0,.8)']
      }
      style={style}
    >
      {props.children}
    </LinearGradient>
  )
}

export default Gradient
