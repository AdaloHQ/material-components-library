import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

export default class SearchBarWrapper extends Component {
  debounce = (fn, time) => {
    let timeout

    return function () {
      const functionCall = () => fn.apply(this, arguments)

      clearTimeout(timeout)
      timeout = setTimeout(functionCall, time)
    }
  }

  render() {
    let { searchBar, onFilterElement, notFound, notFoundText, children } =
      this.props

    if (searchBar.enabled) {
      return (
        <>
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: searchBar.backgroundColor,
                borderWidth: searchBar.borderSize,
                borderRadius: searchBar.rounding,
              },
            ]}
          >
            <View style={([styles.icon], {})}>
              <Icon
                size={24}
                name={searchBar.icon}
                styles={styles.icon}
                color={searchBar.iconColor}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.input}
                placeholder={searchBar.placeholderText}
                onChange={(e) => {
                  this.debounce(onFilterElement(e.target.value), 300)
                }}
              />
            </View>
          </View>
          {notFound ? (
            <View style={([styles.input], { alignItems: 'center' })}>
              {notFoundText}
            </View>
          ) : (
            children
          )}
        </>
      )
    } else {
      return <>{children}</>
    }
  }
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    height: 50,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  input: {
    flex: 0.95,
    height: 40,
    font: '18px',
  },
  icon: {
    justifyContent: 'center',
    flex: 0.05,
  },
})
