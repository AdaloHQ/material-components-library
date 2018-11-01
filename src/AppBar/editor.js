import React, { Component } from 'react'
import './icons.css'

export default class MyCompnent extends Component {
  static defaultProps = {
    title: {},
    leftIcon: {},
    rightIcon1: {},
    rightIcon2: {},
    backgroundColor: '#6200ee',
    color: '#fff',
  }

  renderIcon(key) {
    let { [key]: { icon, enabled } } = this.props

    if (!enabled || !icon) { return null }

    return (
      <div style={{ ...styles.icon, ...styles[key] }}>
        <i class="material-icons">{icon}</i>
      </div>
    )
  }

  renderTitle() {
    let { title: { text } } = this.props

    return (
      <div style={styles.title}>
        {text}
      </div>
    )
  }

  render() {
    let { color, backgroundColor } = this.props
    let barStyles = { color, backgroundColor }

    return (
      <div style={{ ...styles.root, color, backgroundColor }}>
        {this.renderIcon('leftIcon')}
        {this.renderTitle()}
        {this.renderIcon('rightIcon1')}
        {this.renderIcon('rightIcon2')}
      </div>
    )
  }
}

const styles = {
  root: {
    background: '#6200ee',
    padding: 16,
    paddingTop: 36,
    height: 76,
    display: 'flex',
    flexDirection: 'row',
    color: '#fff',
    alignItems: 'center',
    boxSizing: 'border-box',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },
  icon: {
    display: 'flex',
    marginLeft: 24,
  },
  leftIcon: {
    marginRight: 32,
    marginLeft: 0,
  },
  title: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: 500,
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
}
