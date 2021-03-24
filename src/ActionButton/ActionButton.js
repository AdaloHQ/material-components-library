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

  renderPaper() {
    let { text, icon, color, backgroundColor, action, _fonts } = this.props

    let containerStyles = {
      backgroundColor,
      height: 48,
      width: text ? null : 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
    }

    let labelStyles = {}
    if (this.props.styles && this.props.styles.text) {
      labelStyles = this.props.styles.text
    } else if (_fonts) {
      labelStyles = { fontFamily: _fonts.body }
    }
    return (
      <View style={styles.wrapper}>
        <FAB
          style={containerStyles}
          theme={{ fonts: { medium: labelStyles } }}
          color={color}
          icon={({ size, color }) => (
            <Icon name={icon} style={{ color }} size={size}></Icon>
          )}
          onPress={action}
          label={text ? text : null}
          small={false}
        ></FAB>
      </View>
    )
  }

  render() {
    return this.renderPaper()
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    minWidth: 56,
  },
})
