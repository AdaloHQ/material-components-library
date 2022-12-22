import React from 'react'
import { View } from 'react-native'

const BlurAndroid = (props) => {
  const { translucentColor, containerStyles } = props

  const style = {
    backgroundColor: translucentColor,
    height: 106,
    paddingTop: 50,
    marginTop: -30,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
  }

  const viewStyles = {
    ...containerStyles,
    backgroundColor: '#FFFFFF00',
  }

  return (
    <>
      <View style={viewStyles}>{props.children}</View>
    </>
  )
}

export default BlurAndroid
