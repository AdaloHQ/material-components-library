import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'

export class FormWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.initialValue
    }
  }

  handleChange = value => {
    this.setState({ value })

    action('CHANGED VALUE')(value)
  }

  render() {
    let { children } = this.props
    let { value } = this.state

    return React.cloneElement(
      children,
      { value, onChange: this.handleChange }
    )
  }
}
