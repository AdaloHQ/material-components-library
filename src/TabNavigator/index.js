import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { BottomNavigation, ThemeContext, getTheme } from '@protonapp/react-native-material-ui'

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

  getTheme = () => {
    let { activeColor, inactiveColor } = this.props

    return getTheme({
      palette: {
        primaryColor: activeColor,
        secondaryTextColor: inactiveColor,
        primaryTextColor: '#f00',
      }
    })
  }

  render() {
    let { activeTab } = this.state
    let tabNames = ['tab0', 'tab1', 'tab2', 'tab3', 'tab4']
    let { backgroundColor } = this.props

    let enabledTabs = tabNames.filter(tabName => {
      let tab = this.props[tabName]
      return tabName === 'tab0' ? true : tab && tab.enabled
    })

    let tabs = {}

    enabledTabs.forEach(tabName => {
      tabs[tabName] = this.props[tabName]
    })

    return (
      <ThemeContext.Provider value={this.getTheme()}>
        <BottomNavigation active={activeTab} style={{
          container: { backgroundColor }
        }}>
          {enabledTabs.map(tabName => (
            <BottomNavigation.Action
              key={tabName}
              icon={tabs[tabName].icon}
              label={tabs[tabName].label}
              onPress={this.handleChangeTab(tabName)}
              style={{ container: styles.tabItem }}
            />
          ))}
        </BottomNavigation>
      </ThemeContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  tabItem: {
    minWidth: 60
  }
})
