import React, { Component } from 'react'
import { Platform, View, StyleSheet, Text, Animated } from 'react-native'
import { Icon } from '@protonapp/react-native-material-ui'
import { FAB } from 'react-native-paper'

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
      height: 56,
      flexDirection: 'row',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'stretch',
    }

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      delete containerStyles.justifyContent
    }

    let labelStyles = {}
    if (this.props.styles && this.props.styles.text) {
      labelStyles = {
        ...this.props.styles.text,
      }
    } else if (_fonts) {
      labelStyles = {
        fontFamily: _fonts.body,
      }
    }

    let breakless = text ? text.replace(/(\r\n|\n|\r)/gm, '') : null

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
          label={breakless ? breakless : null}
          small={false}
          animated={false}
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
    justifyContent: 'stretch',
    flexDirection: 'row',
    height: 56,
    minWidth: 56,
  },
})
