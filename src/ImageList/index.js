import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { RippleFeedback, IconToggle } from '@protonapp/react-native-material-ui'
import Gradient from './gradient'

export default class ImageList extends Component {
  static defaultProps = {
    items: [],
    columnCount: 1,
  }
  state = {
    fullWidth: null,
  }

  renderGrid() {
    let { items, columnCount } = this.props
    let { fullWidth } = this.state
    let width = fullWidth / columnCount

    return (
      <View style={styles.wrapper}>
        {items.map((itm, i) => (
          <Cell {...itm} key={itm.id} width={width} />
        ))}
      </View>
    )
  }

  getColumns() {
    let { items, columnCount } = this.props
    let columns = []

    for (let i = 0; i < items.length; i += columnCount) {
      for (let j = 0; j < columnCount; j += 1) {
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

  renderMasonry() {
    let { columnCount } = this.props
    let { fullWidth } = this.state
    let columns = this.getColumns()

    let width = fullWidth / columnCount

    let wrap = [styles.wrapper]

    //wrap.push({ height: fullWidth })
    return (
      <View style={wrap}>
        {columns.map((column, i) => (
          <View key={i} style={styles.column}>
            {column.map((itm) => (
              <Cell {...itm} key={itm.id} width={width} />
            ))}
          </View>
        ))}
      </View>
    )
  }

  handleLayout = ({ nativeEvent }) => {
    const { width } = (nativeEvent && nativeEvent.layout) || {}
    const { fullWidth: prevWidth } = this.state

    if (width !== prevWidth) {
      this.setState({ fullWidth: width })
    }
  }

  renderHeader() {
    let { listHeader } = this.props

    if (!listHeader || !listHeader.enabled || !listHeader.header) {
      return null
    }
    return (
      <Text style={styles.header} numberOfLines={1}>
        {listHeader.header}
      </Text>
    )
  }

  render() {
    let { items } = this.props

    let layout = 'grid' //items[0] ? items[0].imageStyles.layout : 'grid'

    if (layout === 'masonry') {
      return (
        <View onLayout={this.handleLayout}>
          {this.renderHeader()}
          {this.renderMasonry()}
        </View>
      )
    } else {
      return <View onLayout={this.handleLayout}>{this.renderGrid()}</View>
    }
  }
}

class Cell extends Component {
  hasIcon = () => {
    let { iconButton } = this.props

    return iconButton && iconButton.icon && iconButton.enabled
  }

  renderIcon() {
    let { iconButton } = this.props

    if (!this.hasIcon()) {
      return null
    }

    let wrapperStyles = [styles.buttonWrapper]

    if (iconButton.position === 'bottom') {
      wrapperStyles.push(styles.buttonBottom)
    }

    return (
      <View style={wrapperStyles}>
        <IconToggle
          name={iconButton.icon}
          color={iconButton.color}
          underlayColor={iconButton.color}
          maxOpacity={0.3}
          size={24}
          onPress={iconButton.onPress}
        />
      </View>
    )
  }

  renderSubtitle() {
    let { title } = this.props
    let subtitleStyles = {
      fontSize: 10,
      color: title.textColor,
    }

    if (!title.subtitle) {
      return null
    }

    return (
      <Text style={subtitleStyles} numberOfLines={1} ellipsizeMode={'tail'}>
        {title.subtitle}
      </Text>
    )
  }

  renderBar() {
    let { title, imageStyles, iconButton } = this.props

    if (!title || !title.enabled || !title.text) {
      return null
    }

    let wrapperStyles = [styles.barWrapper]

    if (title.textPosition === 'top') {
      wrapperStyles.push({
        top: 0,
        bottom: null,
        borderTopRightRadius: imageStyles.rounding,
        borderTopLeftRadius: imageStyles.rounding,
      })
    }
    if (title.textPosition === 'bottom' || !title.textPosition) {
      wrapperStyles.push({
        top: null,
        bottom: 0,
        borderBottomRightRadius: imageStyles ? imageStyles.rounding : 0,
        borderBottomLeftRadius: imageStyles ? imageStyles.rounding : 0,
      })
    }

    if (title.backgroundEffect === 'gradient') {
      wrapperStyles.push({ backgroundColor: '#FFFFFF00' })
    }
    if (title.backgroundEffect === 'solid' || !title.backgroundEffect) {
      if (title.backgroundColor) {
        wrapperStyles.push({ backgroundColor: title.backgroundColor })
      } else {
        wrapperStyles.push({ backgroundColor: 'rgba(0, 0, 0, 0.6)' })
      }
    }

    if (this.hasIcon() && iconButton.position === title.textPosition) {
      wrapperStyles.push(styles.titleWrapperExpanded)
    }

    let titleStyles = {
      fontSize: 12,
      fontWeight: '600',
      color: title.textColor ? title.textColor : '#FFFFFF',
    }

    return (
      <View style={wrapperStyles}>
        <View style={styles.textWrapper}>
          {title.subtitlePosition === 'above' ? this.renderSubtitle() : null}
          <Text style={titleStyles} numberOfLines={1}>
            {title.text}
          </Text>
          {title.subtitlePosition === 'below' ? this.renderSubtitle() : null}
        </View>
      </View>
    )
  }

  renderContent() {
    let { title, imageStyles, image, width } = this.props
    let source = image

    let imageStyling = [styles.image]
    let shadowStyle = [styles.cellSub]

    if (!source) {
      imageStyling.push({ backgroundColor: '#ccc' })
    }

    if (imageStyles) {
      if (imageStyles.rounding) {
        imageStyling.push({ borderRadius: imageStyles.rounding })
      }

      if (imageStyles.shape === 'portrait' && imageStyles.layout === 'grid') {
        imageStyling.push({ height: width * 1.5 })
      } else if (
        imageStyles.shape === 'landscape' &&
        imageStyles.layout === 'grid'
      ) {
        imageStyling.push({ height: Math.round((width * 2) / 3) })
      } else {
        imageStyling.push({ height: width })
      }

      if (imageStyles.shadow) {
        shadowStyle.push({
          borderRadius: imageStyles.rounding ? imageStyles.rounding : 0,
          shadowColor: '#000000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        })
      }
    }

    return (
      <View>
        <View style={shadowStyle}>
          <Image
            resizeMode="cover"
            source={source}
            style={imageStyling}
            pointerEvents="none"
          />
        </View>
        <Gradient
          textPos={title.textPosition}
          backgroundEffect={title.backgroundEffect}
          rounding={imageStyles ? imageStyles.rounding : 0}
          enabled={title.enabled}
        />
        {this.renderBar()}
        <View style={styles.tapTarget} />
      </View>
    )
  }

  render() {
    let { onPress, width, imageStyles, title } = this.props

    let wrapperStyles = [styles.cell, { width }]
    if (onPress) {
      return (
        <View style={wrapperStyles}>
          <RippleFeedback onPress={onPress} color="#fff">
            {this.renderContent()}
          </RippleFeedback>
          {this.renderIcon()}
        </View>
      )
    }

    return (
      <View style={wrapperStyles}>
        {this.renderContent()}
        {this.renderIcon()}
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
  header: {
    fontSize: 24,
    fontWeight: '600',
  },
  cell: {
    padding: 2,
    width: '100%',
    aspectRatio: 1,
  },
  cellSub: {},
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    paddingTop: '100%',
  },
  barWrapper: {
    paddingLeft: 16,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  textWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 4,
    width: '100%',
  },
  titleWrapperExpanded: {
    height: 48,
    paddingRight: 48,
  },
  tapTarget: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  buttonWrapper: {
    position: 'absolute',
    right: 3,
    top: 3,
    width: 48,
    height: 48,
  },
  buttonBottom: {
    top: null,
    bottom: 2,
    right: 2,
  },
})
