import React from 'react'
import { View } from 'react-native'
import { BlurView } from '@react-native-community/blur'

const BlurAndroid = (props) => {
  const { translucentColor, containerStyles, blurViewStyle = {} } = props

  const style = {
    backgroundColor: translucentColor,
    height: 106,
    paddingTop: 50,
    marginTop: -30,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    ...blurViewStyle
  }

  const viewStyles = {
    ...containerStyles,
    backgroundColor: '#FFFFFF00',
  }

  return (
    <>
      <BlurView
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
        style={style}
      ></BlurView>
      <View style={viewStyles}>{props.children}</View>
    </>
  )
}

export default BlurAndroid
