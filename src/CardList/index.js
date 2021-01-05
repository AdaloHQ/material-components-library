import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import placeholder from './holdplace.png'
import { Card, Button, IconToggle } from '@protonapp/react-native-material-ui'

const SINGLE_COLUMN_LAYOUTS = {
  mediaRight: true,
}

export default class ImageList extends Component {
  static defaultProps = {
    items: [],
    columnCount: 1,
  }
  state = {
    fullWidth: null,
  }

  getColumnCount() {
    let { layout, columnCount } = this.props

    if (layout in SINGLE_COLUMN_LAYOUTS) {
      return 1
    }

    return columnCount
  }
  handleLayout = ({ nativeEvent }) => {
    const { width } = (nativeEvent && nativeEvent.layout) || {}
    const { fullWidth: prevWidth } = this.state

    if (width !== prevWidth) {
      this.setState({ fullWidth: width })
    }
  }
  getColumns() {
    let count = this.getColumnCount()
    let { items } = this.props
    let columns = []

    for (let i = 0; i < items.length; i += count) {
      for (let j = 0; j < count; j += 1) {
        let pos = i + j

        if (!columns[j]) {
          columns[j] = []
        }

        if (items[pos]) {
          columns[j].push(items[pos])
        }
      }
    }

    return columns
  }

  renderCell = (itm, layout, width, editor) => (
    <Cell {...itm} key={itm.id} layout={layout} width={width} editor={editor} />
  )

  renderMasonry() {
    let { items, layout, editor } = this.props

    let columns = this.getColumns()

    let wrap = [styles.wrapper]

    return (
      <View style={wrap}>
        {columns.map((column, i) => (
          <View key={i} style={styles.column}>
            {column.map((itm) => this.renderCell(itm, layout, editor))}
          </View>
        ))}
      </View>
    )
  }
  renderGrid() {
    let { items, layout, columnCount, editor } = this.props

    let { fullWidth } = this.state
    let width = fullWidth / columnCount - 8

    return (
      <View onLayout={this.handleLayout} style={styles.gridWrap}>
        {items.map((itm, i) => this.renderCell(itm, layout, width, editor))}
      </View>
    )
  }

  renderHeader() {
    let { listHeader } = this.props
    if (!listHeader || !listHeader.header || !listHeader.enabled) {
      return null
    }

    return <Text style={styles.header}>{listHeader.header}</Text>
  }

  render() {
    let { cardLayout } = this.props
    let wrap = [styles.wrap]

    if (cardLayout === 'grid') {
      return (
        <View style={wrap}>
          {this.renderHeader()}
          {this.renderGrid()}
        </View>
      )
    }
    return (
      <View style={wrap}>
        {this.renderHeader()}
        {this.renderMasonry()}
      </View>
    )
  }
}

class Cell extends Component {
  hasActions() {
    let { button1, button2, icon1, icon2 } = this.props

    return (
      (button1 && button1.enabled && button1.text) ||
      (button2 && button2.enabled && button2.text) ||
      (icon1 && icon1.enabled && icon1.icon) ||
      (icon2 && icon2.enabled && icon2.icon)
    )
  }

  renderTitle() {
    let { title, subtitle } = this.props

    let titleText = title && title.text
    let subtitleText = subtitle && subtitle.enabled && subtitle.text

    return (
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{titleText}</Text>
        {subtitleText ? (
          <Text style={styles.subtitle}>{subtitleText}</Text>
        ) : null}
      </View>
    )
  }

  renderMedia() {
    let { media, editor } = this.props

    if (!media || !media.enabled) {
      return null
    }

    let { image } = media

    let source = image

    if (editor) {
      source = placeholder
    }
    let percent =
      media.shape === 'square'
        ? '100%'
        : media.shape === 'portrait'
        ? '150%'
        : '66.6667%'
    let imageStyles = [{ paddingTop: percent }]
    let wrapperStyles = [styles.mediaWrapper]

    if (media.position === 'top') {
      wrapperStyles.push(styles.topMedia)
    } else if (media.position === 'right') {
      wrapperStyles = [styles.rightMedia]
      imageStyles = [{ height: percent, borderRadius: 2 }]
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
          style={[styles.image, imageStyles]}
        />
      </View>
    )
  }

  renderBody() {
    let { body } = this.props
    let { enabled, text } = body

    if (!enabled || !text) {
      return null
    }

    return <Text style={styles.body}>{text}</Text>
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
    let {
      onPress,
      media,
      button1,
      button2,
      icon1,
      icon2,
      width,
      cardStyles,
    } = this.props

    let mediaPosition = media && media.position

    let cell = [styles.cell, { width }]

    let {
      background,
      backgroundColor,
      border,
      borderColor,
      borderSize,
      rounding,
      shadow,
    } = cardStyles

    if (background) {
      cell.push({ backgroundColor: backgroundColor })
    }
    if (border) {
      cell.push({
        borderWidth: borderSize,
        borderColor: borderColor,
      })
    }
    cell.push({ borderRadius: rounding })

    if (shadow) {
      cell.push(styles.shadow)
    }

    if (button1 || button2) {
      cell.push({ paddingBottom: 6 })
    }

    return (
      <WrappedCard
        onPress={onPress}
        style={{ container: cell }}
        shadow={shadow}
      >
        <View>
          {this.renderContent()}
          <View style={styles.tapTarget} />
        </View>
        {this.hasActions() ? (
          <Actions
            button1={button1}
            button2={button2}
            icon1={icon1}
            icon2={icon2}
          />
        ) : null}
      </WrappedCard>
    )
  }
}

class WrappedCard extends Component {
  render() {
    let { children, onPress, style, shadow } = this.props

    if (Platform.OS === 'ios') {
      let shadowStyle = styles.shadow

      if (shadow) {
        shadowStyle = {
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.6,
          shadowRadius: 2,
        }
      }
      return (
        <View style={shadowStyle}>
          <Card onPress={onPress} style={style}>
            {children}
          </Card>
        </View>
      )
    }

    return (
      <Card onPress={onPress} style={style}>
        {children}
      </Card>
    )
  }
}

class Actions extends Component {
  renderButton(opts) {
    if (!opts || !opts.text || !opts.enabled) {
      return null
    }
    let { button1, button2, icon1, icon2 } = this.props

    let {
      text,
      onPress,
      color,
      background,
      backgroundColor,
      border,
      borderSize,
      borderColor,
      rounding,
    } = opts

    let buttonContainer = [styles.button]

    if (button1 && button2 && button1.enabled && button2.enabled) {
      buttonContainer.push({ marginRight: 8 })
    }

    if (background) {
      buttonContainer.push({ backgroundColor: backgroundColor })
    }
    if (border) {
      buttonContainer.push({
        borderWidth: borderSize,
        borderColor: borderColor,
      })
    }

    if (!background && !border) {
      buttonContainer.push({ paddingLeft: 0, paddingRight: 8 })
    }

    buttonContainer.push({ borderRadius: rounding })

    let buttonTextStyle = [{ color: color, paddingBottom: 2 }]

    if (Platform.OS === 'ios') {
      buttonTextStyle.push({ paddingBottom: 0 })
    }

    return (
      <Button
        onPress={onPress}
        text={text}
        style={{
          container: buttonContainer,
          text: buttonTextStyle,
        }}
      />
    )
  }

  renderIcon(opts) {
    if (!opts || !opts.icon || !opts.enabled) {
      return null
    }

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
  gridWrap: {
    margin: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrap: {},
  wrapper: {
    margin: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: null,
    height: null,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  cell: {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 4,
    padding: 0,
    backgroundColor: '#FFFFFF00',
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
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
    paddingLeft: 16,
    paddingRight: 12,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  actionsWrapperSub: {
    flexDirection: 'row',
  },
  button: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 34,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    paddingBottom: 8,
    paddingRight: 8,
  },
})
