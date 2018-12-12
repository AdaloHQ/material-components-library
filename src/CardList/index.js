import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { Card, Button } from '@protonapp/react-native-material-ui'

const SINGLE_COLUMN_LAYOUTS = {
  mediaRight: true,
}

export default class ImageList extends Component {
  static defaultProps = {
    items: [],
    columnCount: 1,
  }

  getColumnCount() {
    let { layout, columnCount } = this.props

    if (layout in SINGLE_COLUMN_LAYOUTS) {
      return 1
    }

    return columnCount
  }

  render() {
    let { items, layout } = this.props
    let columnCount = this.getColumnCount()

    let width = `${100 / columnCount}%`

    return (
      <View style={styles.wrapper}>
        {items.map((itm, i) => (
          <Cell
            {...itm}
            key={itm.id}
            width={width}
            layout={layout}
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
    let { media, layout } = this.props

    if (!media || !media.enabled) {
      return null
    }

    let { image } = media
    let source = image ? { uri: image } : undefined
    let imageStyles = [{ paddingTop: '66.6667%' }]
    let wrapperStyles = [styles.mediaWrapper]

    if (layout === 'mediaTop') {
      wrapperStyles.push(styles.topMedia)
    } else if (layout === 'mediaMiddle') {
      wrapperStyles.push(styles.middleMedia)
    } else if (layout === 'mediaRight') {
      wrapperStyles = [styles.rightMedia]
      imageStyles = [{ height: '100%', borderRadius: 2 }]
    }

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

  renderMediaMiddle() {
    return (
      <View style={styles.cellInner}>
        {this.renderTitle()}
        {this.renderMedia()}
        {this.renderBody()}
        {this.renderActions()}
      </View>
    )
  }

  renderMediaTop() {
    return (
      <View style={styles.cellInner}>
        {this.renderMedia()}
        {this.renderTitle()}
        {this.renderBody()}
        {this.renderActions()}
      </View>
    )
  }

  renderMediaRight() {
    return (
      <View style={[styles.cellInner, styles.cellRightMedia]}>
        <View style={[styles.contentWrapper]}>
          {this.renderTitle()}
          {this.renderBody()}
          {this.renderActions()}
        </View>
        {this.renderMedia()}
      </View>
    )
  }

  renderContent() {
    let { layout } = this.props

    if (layout === 'mediaMiddle') {
      return this.renderMediaMiddle()
    } else if (layout === 'mediaRight') {
      return this.renderMediaRight()
    }

    return this.renderMediaTop()
  }

  render() {
    let { onPress, width, media, actions } = this.props

    let wrapperStyles = { width }
    let mediaPosition = media && media.position

    return (
      <View style={wrapperStyles}>
        <Card onPress={onPress} style={{ container: styles.cell }}>
          <View>
            {this.renderContent()}
            <View style={styles.tapTarget} />
          </View>
          {(actions && actions.enabled)
            ? <Actions {...actions} />
            : null}
        </Card>
      </View>
    )
  }
}

class Actions extends Component {
  renderButton(text, action) {
    let { color } = this.props

    if (!text) { return null }

    return (
      <Button
        onPress={action}
        text={text}
        style={{
          container: styles.button,
          text: { color },
        }}
      />
    )
  }

  render() {
    let {
      firstButtonText,
      secondButtonText,
      firstButtonAction,
      secondButtonAction,
    } = this.props

    if (!firstButtonText && !secondButtonText) {
      return null
    }

    return (
      <View style={styles.actionsWrapper}>
        {this.renderButton(firstButtonText, firstButtonAction)}
        {this.renderButton(secondButtonText, secondButtonAction)}
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
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 4,
    padding: 0,
  },
  cellInner: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 8,
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
    marginTop: 10,
    marginBottom: 9,
  },
  topMedia: {
    marginTop: -12,
    marginBottom: 16,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  cellRightMedia: {
    flexDirection: 'row',
  },
  rightMedia: {
    height: 80,
    width: 80,
    marginTop: 4,
    marginBottom: 8,
    marginLeft: 16,
  },
  contentWrapper: {
    flex: 1,
  },
  actionsWrapper: {
    padding: 8,
    flexDirection: 'row',
  },
  button: {
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 8,
  }
})
