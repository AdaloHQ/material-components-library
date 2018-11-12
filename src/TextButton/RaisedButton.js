import React from 'react'
import TextButton from './TextButton'

export default class RaisedButton extends TextButton {
  getAdditionalProps() {
    return { raised: true }
  }

  getContainerStyles() {
    let { backgroundColor } = this.props

    return { backgroundColor }
  }
}
