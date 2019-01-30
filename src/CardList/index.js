import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { Card, Button, IconToggle } from '@protonapp/react-native-material-ui'

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
  hasActions() {
    let { button1, button2, icon1, icon2 } = this.props

    return (button1 && button1.enabled && button1.text) ||
      (button2 && button2.enabled && button2.text) ||
      (icon1 && icon1.enabled && icon1.icon) ||
      (icon2 && icon2.enabled && icon2.icon)
  }

  renderTitle() {
    let { title, subtitle } = this.props

    let titleText = title && title.text
    let subtitleText = subtitle && subtitle.enabled && subtitle.text

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

    let { image } = media
    let source = image ? { uri: image } : undefined
    let imageStyles = [{ paddingTop: '66.6667%' }]
    let wrapperStyles = [styles.mediaWrapper]

    if (media.position === 'top') {
      wrapperStyles.push(styles.topMedia)
    } else if (media.position === 'right') {
      wrapperStyles = [styles.rightMedia]
      imageStyles = [{ height: '100%', borderRadius: 2 }]
    } else {
      wrapperStyles.push(styles.middleMedia)
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

  renderMediaMiddle() {
    return (
      <View style={styles.cellInner}>
        {this.renderTitle()}
        {this.renderMedia()}
        {this.renderBody()}
      </View>
    )
  }

  renderMediaTop() {
    return (
      <View style={styles.cellInner}>
        {this.renderMedia()}
        {this.renderTitle()}
        {this.renderBody()}
      </View>
    )
  }

  renderMediaRight() {
    return (
      <View style={[styles.cellInner, styles.cellRightMedia]}>
        <View style={[styles.contentWrapper]}>
          {this.renderTitle()}
          {this.renderBody()}
        </View>
        {this.renderMedia()}
      </View>
    )
  }

  renderContent() {
    let { media } = this.props

    if (media && media.position === 'middle') {
      return this.renderMediaMiddle()
    } else if (media && media.position === 'right') {
      return this.renderMediaRight()
    }

    return this.renderMediaTop()
  }

  render() {
    let { onPress, width, media, button1, button2, icon1, icon2 } = this.props

    let wrapperStyles = { width }
    let mediaPosition = media && media.position

    return (
      <View style={wrapperStyles}>
        <WrappedCard
          onPress={onPress}
          style={{ container: styles.cell }}
        >
          <View>
            {this.renderContent()}
            <View style={styles.tapTarget} />
          </View>
          {(this.hasActions())
            ? <Actions
                button1={button1}
                button2={button2}
                icon1={icon1}
                icon2={icon2}
              />
            : null}
        </WrappedCard>
      </View>
    )
  }
}

class WrappedCard extends Component {
  render() {
    let { children, onPress, style } = this.props

    if (Platform.OS === 'ios') {
      return (
        <View style={styles.cellWrapper}>
          <Card {...this.props}>
            {children}
          </Card>
        </View>
      )
    }

    return (
      <Card {...this.props}>
        {children}
      </Card>
    )
  }
}

class Actions extends Component {
  renderButton(opts) {
    if (!opts || !opts.text || !opts.enabled) { return null }

    let { text, onPress, color, enabled} = opts

    return (
      <Button
        onPress={onPress}
        text={text}
        style={{
          container: styles.button,
          text: { color },
        }}
      />
    )
  }

  renderIcon(opts) {
    if (!opts || !opts.icon || !opts.enabled) { return null }

    let { icon, onPress, color, enabled } = opts

    return (
      <View style={styles.iconButtonWrapper}>
        <IconToggle
          name={icon}
          color={color}
          underlayColor={color}
          maxOpacity={0.3}
          size={24}
          onPress={onPress}
        />
      </View>
    )
  }

  render() {
    let { button1, button2, icon1, icon2 } = this.props

    return (
      <View style={styles.actionsWrapper}>
        <View style={styles.actionsWrapperSub}>
          {this.renderButton(button1)}
          {this.renderButton(button2)}
        </View>
        <View style={styles.actionsWrapperSub}>
          {this.renderIcon(icon1)}
          {this.renderIcon(icon2)}
        </View>
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
  cellWrapper: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    borderRadius: 2,
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
    letterSpacing: 0.5,
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
    paddingLeft: 8,
    paddingRight: 2,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionsWrapperSub: {
    flexDirection: 'row',
  },
  button: {
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 8,
  }
})
