import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import { Icon } from '@protonapp/react-native-material-ui'
import { FAB } from 'react-native-paper'

import '../Shared/icons'

export default class WrappedActionButton extends Component {
  static defaultProps = {
    backgroundColor: '#6200ee',
    color: '#fff',
    borderRadius: 100,
  }

  state = {
    width: null,
    isLoading: false,
  }

  handleLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }) => {
    if (this.state.width !== width) {
      this.setState({ width })
    }
  }

  clickAction = async () => {
    const { action } = this.props

    if (!action) {
      return
    }

    this.setState({
      isLoading: true,
    })

    await action()

    this.setState({
      isLoading: false,
    })
  }

  renderSub() {
    const {
      text,
      icon,
      color,
      backgroundColor,
      action,
      _fonts,
      editor,
      _width,
      buttonType,
      resizeMethod,
      getFlags,
    } = this.props
    const { width, isLoading } = this.state
    const { hasUpdatedLoadingStates } = (getFlags && getFlags()) || {}
    const onPressAction = hasUpdatedLoadingStates ? this.clickAction : action

    const containerStyles = {
      backgroundColor,
      height: 56,
      flexDirection: 'row',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'stretch',
      borderRadius: 100,
    }

    let offset = 0

    if (!editor && buttonType === 'extended' && width) {
      switch (resizeMethod) {
        case 'left':
          offset = width - _width
          break
        case 'right':
          offset = 0
          break
        case 'center':
          offset = (width - _width) / 2
      }
    }

    const wrapperStyles = {
      alignItems: 'center',
      justifyContent: 'stretch',
      flexDirection: 'row',
      height: 56,
      minWidth: 56,
      right: offset,
    }

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      delete containerStyles.justifyContent
      delete wrapperStyles.justifyContent
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

    const breakless =
      text && buttonType === 'extended'
        ? text.replace(/(\r\n|\n|\r)/gm, '')
        : ''

    return (
      <View style={wrapperStyles}>
        <FAB
          style={containerStyles}
          theme={{ fonts: { medium: labelStyles } }}
          color={color}
          icon={({ size, color }) => (
            <Icon name={icon} style={{ color }} size={size}></Icon>
          )}
          onPress={onPressAction}
          label={breakless}
          small={false}
          animated={false}
          onLayout={this.handleLayout}
          loading={isLoading}
        ></FAB>
      </View>
    )
  }

  render() {
    return this.renderSub()
  }
}
