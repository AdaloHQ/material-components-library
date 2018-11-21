import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { RippleFeedback } from '@protonapp/react-native-material-ui'

export default class SimpleList extends Component {
  static defaultProps = {
    items: []
  }

  render() {
    let { items, dividerType, dividerColor} = this.props

    return (
      <View style={styles.wrapper}>
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
    )
  }
}

class Row extends Component {
  static defaultProps = {
    dividerColor: '#e0e0e0',
  }

  handlePress = () => {
    console.log('PRESSED!')
  }

  getDividerInset() {
    let { dividerType, leftSection } = this.props

    if (dividerType !== 'inset') { return 0 }

    let baseInset = 16

    if (!leftSection || !leftSection.enabled) { return baseInset }

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
        <View style={styles.avatar} pointerEvents="none">
        </View>
      )
    }

    if (leftSection.type === 'image') {
      return (
        <View style={styles.image} pointerEvents="none">
        </View>
      )
    }
  }

  render() {
    let { leftSection, firstLine, secondLine } = this.props
    let hasDivider = this.hasDivider()

    return (
      <View style={styles.rowWrapper}>
        <RippleFeedback onPress={this.handlePress}>
          <View style={styles.row}>
            {this.renderLeftSection()}
            <View style={styles.main} pointerEvents="none">
              <FirstLine {...firstLine} />
              {(secondLine && secondLine.enabled)
                ? <SecondLine {...secondLine} />
                : null}
            </View>
            {hasDivider
              ? <View style={[styles.divider, this.getDividerStyles()]} />
              : null}
          </View>
        </RippleFeedback>
      </View>
    )
  }
}

class FirstLine extends Component {
  static defaultProps = {
    text: '',
    color: '#212121',
  }

  render() {
    let { text, color } = this.props
    let propStyles = { color: color }

    return (
      <Text style={[styles.firstLine, propStyles]}>
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
    let { text, color } = this.props
    let propStyles = { color: color }

    return (
      <Text style={[styles.secondLine, propStyles]}>
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
  row: {
    padding: 16,
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
    marginTop: -8,
    marginBottom: -8,
    backgroundColor: '#ccc',
  },
  image: {
    marginRight: 16,
    marginTop: -8,
    marginBottom: -8,
    height: 56,
    width: 56,
    backgroundColor: '#ccc',
  },
  main: {
    
  },
  firstLine: {
    lineHeight: 20,
    fontSize: 16,
  },
  secondLine: {
    lineHeight: 18,
    marginTop: 2,
    fontSize: 14,
  }
})
