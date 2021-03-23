import React, { Component } from 'react'
import Color from 'color'
import { Platform, View, StyleSheet, Text, Animated } from 'react-native'
import {
  ActionButton,
  Icon,
  RippleFeedback,
} from '@protonapp/react-native-material-ui'
import { TouchableRipple, FAB, Title } from 'react-native-paper'

import '../Shared/icons'

export default class WrappedActionButton extends Component {
  static defaultProps = {
    backgroundColor: '#6200ee',
    color: '#fff',
  }

  darkenOrLighten(color, ratio = 0.5) {
    const c = Color(color)
    return c.luminosity() > 0.5 ? c.darken(ratio) : c.lighten(ratio)
  }

  renderChenco() {
    let { backgroundColor, action } = this.props

    let buttonStyles = {
      backgroundColor: backgroundColor,
      position: 'relative',
      bottom: 'auto',
      right: 'auto',
      borderRadius: 24,
      height: 48,
      minWidth: 48,
      alignItems: 'center',
    }

    return (
      <View style={{ position: 'absolute' }}>
        <View style={buttonStyles}>
          <TouchableRipple
            style={{ height: 48, borderRadius: 24 }}
            rippleColor={this.darkenOrLighten(backgroundColor).toString()}
            onPress={action}
            delayPressIn={20}
          >
            {this.renderExtendedFAB()}
          </TouchableRipple>
        </View>
      </View>
    )
  }
  renderExtendedFAB() {
    let { text, icon, color } = this.props

    return (
      <View style={styles.extendedWrapper}>
        <Icon
          style={styles.icon}
          name={icon}
          style={{ color }}
          size={24}
        ></Icon>
        <Text>{text}</Text>
      </View>
    )
  }
  renderPaper() {
    let { text, icon, color, backgroundColor, action, _fonts } = this.props
    console.log('props: ', this.props)

    let containerStyles = {
      backgroundColor,
      //position: 'relative',
      //bottom: 'auto',
      //right: 'auto',
      height: 48,
      //width: '100%',
      width: text ? null : 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
    }

    let labelStyles = {}
    if (this.props.styles && this.props.styles.text) {
      console.log(this.props.styles.text)
      labelStyles = this.props.styles.text
    }

    return (
      <FAB
        style={containerStyles}
        theme={{ fonts: { medium: labelStyles } }}
        color={color}
        icon={icon}
        onPress={action}
        label={text ? text : null}
        small={false}
      ></FAB>
    )
  }

  renderSub() {
    let { color, backgroundColor, icon, action } = this.props

    let containerStyles = {
      backgroundColor,
      position: 'relative',
      bottom: 'auto',
      right: 'auto',
      height: 48,
      width: '100%',
      minWidth: 48,
    }

    let iconStyles = { color }

    return (
      <View style={styles.wrapper} pointerEvents="box-none">
        <ActionButton
          icon={this.renderExtendedFAB()}
          onPress={action}
          style={{
            container: containerStyles,
            icon: iconStyles,
            positionContainer: { flex: 1, width: 300 },
          }}
        />
      </View>
    )
  }

  render() {
    return this.renderPaper()
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 68,
    marginRight: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extendedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  fab: {},
  icon: { padding: 12 },
})

const chencoStyles = StyleSheet.create({
  wrapper: {},
  contentWrapper: {},
})
