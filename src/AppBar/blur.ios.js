import React from 'react'
import { View } from 'react-native'
import { BlurView } from '@react-native-community/blur'

const Blur = (props) => {
  const { translucentColor, borderStyle } = props

  const style = {
    backgroundColor: translucentColor,
    height: 106,
    paddingTop: 50,
    marginTop: -30,
  }

  return (
    <View style={borderStyle[1]}>
      <BlurView
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
        style={style}
      >
        {props.children}
      </BlurView>
      <View style={borderStyle[0]}></View>
    </View>
  )
}

export default Blur
