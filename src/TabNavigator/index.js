import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  BottomNavigation,
  ThemeContext,
  getTheme,
} from '@protonapp/react-native-material-ui'

const tabNames = ['tab0', 'tab1', 'tab2', 'tab3', 'tab4']

export default class TabNavigator extends Component {
  static defaultProps = {
    tab0: {
      label: 'Home',
      icon: 'home',
    },
  }

  handleChangeTab = tabName => async () => {
    const prop = this.props[tabName]
    const action = prop && prop.action

    if (action) {
      await action()
    }
  }

  getTheme = () => {
    let { activeColor, inactiveColor } = this.props

    return getTheme({
      palette: {
        primaryColor: activeColor,
        secondaryTextColor: inactiveColor,
        primaryTextColor: '#f00',
      },
    })
  }

  render() {
    let { backgroundColor, editor, activeTab, _fonts } = this.props

    let enabledTabs = tabNames.filter((tabName) => {
      let tab = this.props[tabName]
      return tabName === 'tab0' ? true : tab && tab.enabled
    })

    let tabs = {}

    enabledTabs.forEach((tabName) => {
      tabs[tabName] = this.props[tabName]
    })

    let wrapperStyles = editor ? styles.editorWrapper : styles.wrapper

    let defaultFontStyle = _fonts
      ? { fontFamily: _fonts.body, fontSize: 11 }
      : { fontSize: 11 }

    return (
      <ThemeContext.Provider value={this.getTheme()}>
        <BottomNavigation
          active={activeTab}
          style={{
            container: [wrapperStyles, { backgroundColor }],
            actionsContainer: styles.wrapperContainerStyles
          }}
        >
          {enabledTabs.map((tabName) => (
            <BottomNavigation.Action
              showLoadingState
              key={tabName}
              icon={tabs[tabName].icon}
              label={tabs[tabName].label}
              onPress={this.handleChangeTab(tabName)}
              style={{
                container: styles.tabItem,
                label: tabs[tabName].styles
                  ? tabs[tabName].styles.label
                  : defaultFontStyle,
              }}
            />
          ))}
        </BottomNavigation>
      </ThemeContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: -100,
    paddingBottom: 100,
    height: 156,
  },
  editorWrapper: {
    height: 56,
  },
  wrapperContainerStyles: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  tabItem: {
    minWidth: 60,
    paddingTop: 8,
  },
})
