import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { RippleFeedback, IconToggle } from '@protonapp/react-native-material-ui'

export default class SimpleList extends Component {
  static defaultProps = {
    items: [],
  }

  renderHeader() {
    let { listHeader } = this.props
    if (!listHeader || !listHeader.header || !listHeader.enabled) {
      return null
    }

    return <Text style={styles.header}>{listHeader.header}</Text>
  }

  render() {
    let { items, dividerType, dividerColor, background } = this.props

    let wrap = [styles.wrapper]
    if (background && background.enabled) {
      let {
        backgroundColor,
        border,
        borderSize,
        borderColor,
        rounding,
        shadow,
      } = background
      wrap.push({ backgroundColor: backgroundColor, borderRadius: rounding })
      if (border) {
        wrap.push({ borderWidth: borderSize, borderColor: borderColor })
      }
      if (shadow) {
        wrap.push({
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
      <>
        {this.renderHeader()}
        <View style={wrap}>
          {items.map((itm, i) => (
            <Row
              {...itm}
              key={itm.id}
              dividerType={dividerType}
              dividerColor={dividerColor}
              lastRow={i === items.length - 1}
            />
          ))}
        </View>
      </>
    )
  }
}

class Row extends Component {
  getDividerInset() {
    let { dividerType, leftSection } = this.props

    if (dividerType !== 'inset') {
      return 0
    }

    let baseInset = 16

    if (!leftSection || !leftSection.enabled) {
      return baseInset
    }

    if (leftSection.type === 'icon' || leftSection.type === 'avatar') {
      return baseInset * 2 + 40
    }

    if (leftSection.type === 'image') {
      return baseInset * 2 + 56
    }

    return 0
  }

  getDividerStyles() {
    let { dividerColor } = this.props

    return {
      left: this.getDividerInset(),
      backgroundColor: dividerColor,
    }
  }

  hasDivider() {
    let { dividerType, lastRow } = this.props

    if (!lastRow && dividerType && dividerType !== 'none') {
      return true
    }

    return false
  }

  renderLeftSection() {
    let { leftSection } = this.props

    if (!leftSection || !leftSection.enabled) {
      return null
    }

    let source = leftSection.image

    if (leftSection.type === 'icon') {
      return (
        <View style={styles.iconWrapper} pointerEvents="none">
          <Icon
            size={24}
            name={leftSection.icon}
            color={leftSection.iconColor}
          />
        </View>
      )
    }

    if (leftSection.type === 'avatar') {
      return (
        <Image
          resizeMode="cover"
          source={source}
          style={styles.avatar}
          pointerEvents="none"
        />
      )
    }

    if (leftSection.type === 'image') {
      return (
        <Image
          resizeMode="cover"
          source={source}
          style={styles.image}
          pointerEvents="none"
        />
      )
    }
  }

  renderRightSection() {
    let { rightSection } = this.props

    if (!rightSection || !rightSection.enabled) {
      return null
    }

    let iconStyles = { marginRight: -12 }

    if (rightSection.icon) {
      return (
        <IconToggle
          name={rightSection.icon}
          color={rightSection.iconColor}
          underlayColor={rightSection.iconColor}
          maxOpacity={0.3}
          size={24}
          onPress={rightSection.onPress}
          style={{ container: iconStyles }}
        />
      )
    }

    return null
  }

  renderContent() {
    let { leftSection, firstLine, secondLine } = this.props
    let hasDivider = this.hasDivider()
    console.log(firstLine)
    return (
      <View style={styles.row}>
        {this.renderLeftSection()}
        <View style={styles.main} pointerEvents="none">
          <FirstLine {...firstLine} />
          {secondLine && secondLine.enabled ? (
            <SecondLine {...secondLine} />
          ) : null}
        </View>
        {this.renderRightSection()}
        {hasDivider ? (
          <View style={[styles.divider, this.getDividerStyles()]} />
        ) : null}
      </View>
    )
  }

  render() {
    let { onPress } = this.props

    if (onPress) {
      return (
        <View style={styles.rowWrapper}>
          <RippleFeedback onPress={onPress}>
            {this.renderContent()}
          </RippleFeedback>
        </View>
      )
    }

    return <View style={styles.rowWrapper}>{this.renderContent()}</View>
  }
}

class FirstLine extends Component {
  static defaultProps = {
    text: '',
    color: '#212121',
  }

  render() {
    let { text, color, titleLineNum } = this.props
    let propStyles = { color: color }
    let titleLimit = 33
    if (titleLineNum == 2) {
      if (text.length > titleLimit) {
        const firstLine = text.substring(0, titleLimit + 1)
        const i = firstLine.lastIndexOf(' ')
        return (
          <View style={styles.titleContainer}>
            <Text style={[styles.firstLine, propStyles]}>
              {text.substring(0, i + 1)}
            </Text>
            <Text
              style={[styles.firstLine, propStyles]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {text.substring(i + 1)}
            </Text>
          </View>
        )
      } else {
        return (
          <View style={styles.titleContainer}>
            <Text style={[styles.firstLine, propStyles]}>{text}</Text>
          </View>
        )
      }
    }
    if (titleLineNum > 2) {
      return (
        <Text style={[styles.firstLine, propStyles]} ellipsizeMode="tail">
          {text}
        </Text>
      )
    }

    return (
      <Text
        style={[styles.firstLine, propStyles]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    )
  }
}

class SecondLine extends Component {
  static defaultProps = {
    text: '',
    color: '#757575',
  }

  render() {
    let { text, color, subtitleLineNum } = this.props
    let propStyles = { color: color }

    let titleLimit = 33
    if (subtitleLineNum == 2) {
      if (text.length > titleLimit) {
        const firstLine = text.substring(0, titleLimit + 1)
        const i = firstLine.lastIndexOf(' ')
        return (
          <View style={styles.titleContainer}>
            <Text style={[styles.firstLine, propStyles]}>
              {text.substring(0, i + 1)}
            </Text>
            <Text
              style={[styles.firstLine, propStyles]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {text.substring(i + 1)}
            </Text>
          </View>
        )
      } else {
        return (
          <View style={styles.titleContainer}>
            <Text style={[styles.firstLine, propStyles]}>{text}</Text>
          </View>
        )
      }
    }
    if (subtitleLineNum > 2) {
      return (
        <Text style={[styles.firstLine, propStyles]} ellipsizeMode="tail">
          {text}
        </Text>
      )
    }

    return (
      <Text
        style={[styles.firstLine, propStyles]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 1,
  },
  iconWrapper: {
    marginRight: 32,
    width: 24,
    height: 24,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 16,
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  avatar: {
    marginRight: 16,
    borderRadius: 20,
    height: 40,
    width: 40,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#ccc',
  },
  image: {
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    height: 56,
    width: 56,
    backgroundColor: '#ccc',
  },
  main: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  firstLine: {
    lineHeight: 20,
    fontSize: 16,
    maxWidth: '100%',
  },
  secondLine: {
    lineHeight: 18,
    marginTop: 2,
    fontSize: 14,
    maxWidth: '100%',
  },
  titleContainer: {},
})
