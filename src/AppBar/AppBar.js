import React, { Component } from 'react'
import { ToolBar } from 'react-native-material-ui'

export default class AppBar extends Component {
  render() {
    let { color, backgroundColor } = this.props

    return (
      <ToolBar
        leftElement="menu"
        centerElement="Hello?"
        rightElement={["favorite", "search"]}
        style={{
          container: { backgroundColor },
          titleText: { color },
        }}
        iconProps={{ color }}
      />
    )
  }
}
