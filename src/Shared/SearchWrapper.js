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
    const { searchBar, onFilterElement, notFound, children } = this.props

    const {
      notFoundText,
      backgroundColor,
      borderSize,
      rounding,
      icon,
      iconColor,
      placeholderText,
    } = searchBar

    const { styles: searchBarStyles } = searchBar
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
                backgroundColor: backgroundColor,
                borderWidth: borderSize,
                borderRadius: rounding,
              },
            ]}
          >
            <View style={styles.icon}>
              <Icon
                size={24}
                name={icon}
                styles={styles.icon}
                color={iconColor}
              />
            </View>
            <View
              style={styles.input}
              fontSize={searchBarStyles.placeholderText.fontSize}
            >
              <TextInput
                style={styles.input}
                fontSize={searchBarStyles.placeholderText.fontSize}
                placeholder={placeholderText}
                placeholderTextColor={searchBarStyles.placeholderText.color}
                onChange={(e) => {
                  this.debounce(onFilterElement(e.target.value), 300)
                }}
              />
            </View>
          </View>
          {notFound ? (
            <View style={([styles.input], { alignItems: 'center' })}>
              <Text style={searchBarStyles.notFoundText}>{notFoundText}</Text>
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
    marginTop: 12,
    paddingBottom: 0,
    marginBottom: 10,
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
    paddingRight: 18,
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
