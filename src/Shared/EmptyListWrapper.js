import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

export default class EmptyListWrapper extends Component {
  render() {
    let { listEmptyState, items, children } = this.props

    console.log(this.props)

    if (items.length == 0) {
      return <>
      <ImageHolder listEmptyState={listEmptyState}></ImageHolder></>
    } else {
      return <>{children}</>
    }
  }
}

class ImageHolder extends Component {
  render() {
    let { listEmptyState } = this.props
    let emptyStateImage = listEmptyState.emptyStateImageStatus
    if (emptyStateImage == 'noImage') {
      return <>{children}</>
    } else if (emptyStateImage == 'above') {
      return (
        <>
          <View style={[styles.emptyList]}>
            <Text>Image Holder</Text>
          </View>
          <Title listEmptyState={listEmptyState}></Title>
        </>
      )
    } else {
      return (
        <>
          <Title listEmptyState={listEmptyState}></Title>
          <View style={[styles.emptyList]}>
            <Text>Image Holder</Text>
          </View>
        </>
      )
    }
  }
}

class Title extends Component {
  render() {
    let { listEmptyState } = this.props
    let titleDisplay = listEmptyState.textTitleDisplay
    if (titleDisplay == 'noText') {
      return <></>
    } else if (titleDisplay == 'titleOnly') {
      return <Text>{listEmptyState.title}</Text>
    } else {
      return (
        <View>
          <Text>{listEmptyState.title}</Text>
          <Text>{listEmptyState.subtitle}</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  emptyList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  input: {
    flex: 0.95,
    height: 40,
    font: '18px',
  },
  icon: {
    justifyContent: 'center',
    flex: 0.05,
  },
})
