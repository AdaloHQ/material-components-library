import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

import WrappedTextButton from '../TextButton/TextButton.js'

export default class EmptyListWrapper extends Component {
  render() {
    let { listEmptyState, items, children } = this.props

    if (!listEmptyState) {
      return <>{children}</>
    }

    let {
      buttonType,
      buttonText,
      buttonIcon,
      buttonPrimaryColor,
      buttonContrastColor,
      buttonBorderRadius,
      buttonShadow,
      buttonUpperCase,
      buttonAction,
      buttonWidth,
    } = listEmptyState

    if (!items || items.length === 0) {
      return (
        <>
          <ImageHolder listEmptyState={listEmptyState} />
          {buttonType !== 'noButton' && (
            <WrappedTextButton
              type={buttonType}
              text={buttonText}
              icon={buttonIcon}
              primaryColor={buttonPrimaryColor}
              contrastColor={buttonContrastColor}
              borderRadius={buttonBorderRadius}
              shadow={buttonShadow}
              upperCase={buttonUpperCase}
              action={buttonAction}
              container={{
                width: buttonWidth,
                alignSelf: 'center',
              }}
            />
          )}
        </>
      )
    } else {
      return <>{children}</>
    }
  }
}

function ImageHolder(props) {
  let { listEmptyState } = props
  let realImageSource = !listEmptyState.imageSource
    ? require('./sqr-empty-state.png')
    : listEmptyState.imageSource
  if (!listEmptyState) {
    return <View></View>
  }
  let { emptyStateImage } = listEmptyState
  if (!emptyStateImage || emptyStateImage === 'noImage') {
    return (
      <>
        <TitleHolder listEmptyState={listEmptyState}></TitleHolder>
      </>
    )
  } else if (emptyStateImage === 'above') {
    return (
      <>
        <View style={styles.emptyList}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={realImageSource}
            pointerEvents="none"
          />
        </View>
        <TitleHolder listEmptyState={listEmptyState}></TitleHolder>
      </>
    )
  } else {
    return (
      <>
        <TitleHolder listEmptyState={listEmptyState}></TitleHolder>
        <View style={styles.emptyList}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={realImageSource}
            pointerEvents="none"
          />
        </View>
      </>
    )
  }
}

function TitleHolder(props) {
  let { listEmptyState } = props
  if (!listEmptyState) {
    return <View></View>
  }
  let {
    title,
    subtitle,
    textTitleDisplay,
    styles: emptyWrapperStyle,
  } = listEmptyState
  if (textTitleDisplay === 'noText') {
    return <></>
  } else if (textTitleDisplay === 'titleOnly') {
    return (
      <Text style={[styles.textStyle, emptyWrapperStyle.title]}>{title}</Text>
    )
  } else {
    return (
      <View>
        <Text style={[styles.textStyle, emptyWrapperStyle.title]}>{title}</Text>
        <Text style={[styles.textStyle, emptyWrapperStyle.subtitle]}>
          {subtitle}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  emptyList: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 30,
  },
  input: {
    flex: 0.95,
    height: 40,
    fontSize: 18,
  },
  icon: {
    justifyContent: 'center',
    flex: 0.05,
  },
  image: {
    width: null,
    height: 300,
    flex: 1,
  },
  textStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    padding: 8,
    color: 'gray',
  },
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
  },
})
