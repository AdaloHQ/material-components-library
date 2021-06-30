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

    if (!searchBar) {
      return <>{children}</>
    }

    if (searchBar.enabled) {
      return (
        <View style={styles.totalWrapper}>
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
            <View
              style={styles.input}
              fontSize={searchBar.styles.placeholderText.fontSize}
            >
              <TextInput
                style={[styles.input]}
                fontSize={searchBar.styles.placeholderText.fontSize}
                placeholder={searchBar.placeholderText}
                placeholderTextColor={searchBar.styles.placeholderText.color}
                onChange={(e) => {
                  this.debounce(onFilterElement(e.target.value), 300)
                }}
              />
            </View>
          </View>
          {notFound ? (
            <View style={([styles.input], { alignItems: 'center' })}>
              <Text style={searchBar.styles.notFoundText}>{notFoundText}</Text>
            </View>
          ) : (
            children
          )}
        </View>
      )
    } else {
      return <>{children}</>
    }
  }
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    height: 42,
    paddingTop: 0,
    marginTop: 22,
    paddingBottom: 0,
    marginBottom: 12,
    paddingLeft: 2,
    paddingRight: 2,
    marginLeft: 15,
    marginRight: 15,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  input: {
    flex: 0.95,
    height: 40,
    fontSize: 18,
  },
  icon: {
    justifyContent: 'center',
    flex: 0.05,
    paddingLeft: 6,
  },
  totalWrapper: {
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
})
