import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

import WrappedTextButton from '../TextButton/TextButton.js'

export default class EmptyListWrapper extends Component {
  render() {
    let { listEmptyState, items, children } = this.props

    if (!listEmptyState) {
      return <View>Loading...</View>
    }

    let {
      type,
      text,
      icon,
      primaryColor,
      contrastColor,
      borderRadius,
      shadow,
      upperCase,
      action,
      buttonWidth,
    } = listEmptyState

    if (!items || items.length === 0) {
      return (
        <>
          <ImageHolder listEmptyState={listEmptyState} />
          {type !== 'noButton' && (
            <WrappedTextButton
              type={type}
              text={text}
              icon={icon}
              primaryColor={primaryColor}
              contrastColor={contrastColor}
              borderRadius={borderRadius}
              shadow={shadow}
              upperCase={upperCase}
              action={action}
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

class ImageHolder extends Component {
  render() {
    let { listEmptyState } = this.props
    let realImageSource = !listEmptyState.imageSource
      ? require('./sqr-empty-state.png')
      : listEmptyState.imageSource
    if (!listEmptyState) {
      return <View>Loading...</View>
    }
    let { emptyStateImage } = listEmptyState

    if (emptyStateImage == 'noImage') {
      return (
        <>
          <TitleHolder listEmptyState={listEmptyState}></TitleHolder>
        </>
      )
    } else if (emptyStateImage == 'above') {
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
}

class TitleHolder extends Component {
  render() {
    let { listEmptyState } = this.props
    if (!listEmptyState) {
      return <View>Loading...</View>
    }
    let titleDisplay = listEmptyState.textTitleDisplay
    if (titleDisplay == 'noText') {
      return <></>
    } else if (titleDisplay == 'titleOnly') {
      return (
        <Text style={[styles.textStyle, listEmptyState.styles.title]}>
          {listEmptyState.title}
        </Text>
      )
    } else {
      return (
        <View>
          <Text style={[styles.textStyle, listEmptyState.styles.title]}>
            {listEmptyState.title}
          </Text>
          <Text style={[styles.textStyle, listEmptyState.styles.subtitle]}>
            {listEmptyState.subtitle}
          </Text>
        </View>
      )
    }
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
