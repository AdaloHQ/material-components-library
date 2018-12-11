import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { Card } from '@protonapp/react-native-material-ui'

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
    let { titleText, subtitleText } = this.props

    return (
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          {titleText}
        </Text>
        {subtitleText
          ? <Text style={styles.subtitle}>
            {subtitleText}
            </Text>
          : null}
      </View>
    )
  }

  renderMedia() {
    let { media } = this.props

    if (!media || !media.enabled) {
      return null
    }

    let { image, position } = media
    let source = image ? { uri: image } : undefined
    let imageStyles = [{ paddingTop: '66.6667%' }]
    let wrapperStyles = [styles.mediaWrapper]

    wrapperStyles.push(position === 'top' ? 
      styles.topMedia : styles.middleMedia)

    if (!source) {
      imageStyles.push({ backgroundColor: '#ccc' })
    }

    return (
      <View style={wrapperStyles}>
        <Image
          resizeMode="cover"
          source={source}
          style={imageStyles}
        />
      </View>
    )
  }

  renderBody() {
    let { body } = this.props
    let { enabled, text } = body

    if (!enabled || !text) { return null }

    return (
      <Text style={styles.body}>
        {text}
      </Text>
    )
  }

  renderActions() {
    return null
  }

  render() {
    let { onPress, width, media } = this.props

    let wrapperStyles = { width }
    let mediaPosition = media && media.position

    return (
      <View style={wrapperStyles}>
        <Card
          onPress={onPress}
          style={{ container: styles.cell }}
        >
          {mediaPosition === 'top'
            ? <React.Fragment>
                {this.renderMedia()}
                {this.renderTitle()}
              </React.Fragment>
            : <React.Fragment>
                {this.renderTitle()}
                {this.renderMedia()}
              </React.Fragment>}
          {this.renderBody()}
          {this.renderActions()}
          <View style={styles.tapTarget} />
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 8,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 4,
  },
  tapTarget: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.15,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.1,
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: 3,
    marginBottom: 6,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: '0.5',
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: 6,
    lineHeight: 21,
    marginBottom: 6,
  },
  mediaWrapper: {
    marginLeft: -16,
    marginRight: -16,
    overflow: 'hidden',
  },
  middleMedia: {
    marginTop: 6,
    marginBottom: 9,
  },
  topMedia: {
    marginTop: -12,
    marginBottom: 16,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  }
})
