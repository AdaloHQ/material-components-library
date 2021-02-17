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
    <>
      <BlurView
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
        style={style}
      >
        {props.children}
      </BlurView>
      <View style={borderStyle}></View>
    </>
  )
}

export default Blur
