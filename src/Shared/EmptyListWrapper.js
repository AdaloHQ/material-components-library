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

    if (items.length == 0) {
      return (
        <>
          <ImageHolder listEmptyState={listEmptyState} />
            <WrappedTextButton
              type={listEmptyState.type}
              text={listEmptyState.text}
              icon={listEmptyState.icon}
              primaryColor={listEmptyState.primaryColor}
              contrastColor={listEmptyState.contrastColor}
              borderRadius={listEmptyState.borderRadius}
              shadow={listEmptyState.shadow}
              upperCase={listEmptyState.upperCase}
              action={listEmptyState.action}
              style={[styles.buttonContainer, {width: 150, alignSelf: 'center'}]}
            />
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
    console.log(listEmptyState.imageSource)
    if (!listEmptyState) {
      return <View>Loading...</View>
    }
    let emptyStateImage = listEmptyState.emptyStateImageStatus
    if (emptyStateImage == 'noImage') {
      return (
        <>
          <TitleHolder listEmptyState={listEmptyState}></TitleHolder>
        </>
      )
    } else if (emptyStateImage == 'above') {
      return (
        <>
          <View style={[styles.emptyList]}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={listEmptyState.imageSource}
              pointerEvents="none"
            />
          </View>
          <TitleHolder listEmptyState={listEmptyState}></TitleHolder>
        </>
      )
    } else {
      return (
        <>
          <View style={[styles.emptyList]}>
            <TitleHolder listEmptyState={listEmptyState}></TitleHolder>
            <Image
              style={styles.image}
              source={listEmptyState.source}
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
    width: 300,
    height: 300,
  },
  textStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
  },
})
