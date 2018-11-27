import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { BottomNavigation } from '@protonapp/react-native-material-ui'

export default class TabNavigator extends Component {
  static defaultProps = {
    tab0: {
      label: 'Home',
      icon: 'home',
    }
  }

  state = {
    activeTab: 'tab0'
  }

  handleChangeTab = activeTab => () => {
    this.setState({ activeTab })
  }

  render() {
    let { activeTab } = this.state
    let tabNames = ['tab0', 'tab1', 'tab2', 'tab3', 'tab4']
    let { primaryColor, backgroundColor } = this.props

    let enabledTabs = tabNames.filter(tabName => {
      let tab = this.props[tabName]
      return tabName === 'tab0' ? true : tab && tab.enabled
    })

    let tabs = {}

    enabledTabs.forEach(tabName => {
      tabs[tabName] = this.props[tabName]
    })

    return (
      <BottomNavigation active={activeTab} style={{
        container: { backgroundColor }
      }}>
        {enabledTabs.map(tabName => (
          <BottomNavigation.Action
            key={tabName}
            icon={tabs[tabName].icon}
            label={tabs[tabName].label}
            onPress={this.handleChangeTab(tabName)}
            style={{
              active: {
                color: '#f00',
                fontSize: 30,
              },
              disabled: {
                color: '#00f',
                fontSize: 30,
              },
            }}
          />
        ))}
      </BottomNavigation>
    )
  }
}
