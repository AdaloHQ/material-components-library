import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { RippleFeedback, IconToggle } from '@protonapp/react-native-material-ui'

export default class ImageList extends Component {
  static defaultProps = {
    items: [],
    columnCount: 1,
  }

  render() {
    let { items, columnCount } = this.props

    let width = `${100 / columnCount}%`

    return (
      <View style={styles.wrapper}>
        {items.map((itm, i) => (
          <Cell
            {...itm}
            key={itm.id}
            width={width}
          />
        ))}
      </View>
    )
  }
}

class Cell extends Component {
  renderTitle() {
    let { title } = this.props

    if (!title || !title.enabled || !title.text) {
      return null
    }

    return (
      <View style={styles.titleWrapper}>
        <Text style={styles.title} numberOfLines={1}>
          {title.text}
        </Text>
      </View>
    )
  }

  renderContent() {
    let { title, image } = this.props
    let source = image ? { uri: image } : undefined

    let imageStyles = [styles.image]

    if (!source) {
      imageStyles.push({ backgroundColor: '#ccc' })
    }

    return (
      <View style={styles.cellSub}>
        <Image
          resizeMode="cover"
          source={source}
          style={imageStyles}
          pointerEvents="none"
        />
        {this.renderTitle()}
        <View style={styles.tapTarget} />
      </View>
    )
  }

  render() {
    let { onPress, width } = this.props

    let wrapperStyles = [styles.cell, { width }]

    if (onPress) {
      return (
        <View style={wrapperStyles}>
          <RippleFeedback onPress={onPress} color="#fff">
            {this.renderContent()}
          </RippleFeedback>
        </View>
      )
    }

    return (
      <View style={wrapperStyles}>
        {this.renderContent()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    margin: -2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    padding: 2,
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    paddingTop: '100%',
  },
  titleWrapper: {
    height: 32,
    paddingLeft: 16,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  title: {
    fontSize: 12,
    color: '#fff',
  },
  tapTarget: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
})
