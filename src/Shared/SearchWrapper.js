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
    let { searchBar, onFilterElement, notFound, border, children, extraStyle } =
      this.props

    if (!searchBar) {
      return <>{children}</>
    }

    const simpleGray = {
      enabled: searchBar.enabled,
      placeholderText: 'Search...',
      notFoundText: 'No Results',
      icon: 'search',
      iconColor: '#9e9e9e',
      backgroundColor: '#F5F5F5',
      borderColor: '#E0E0E0',
      borderSize: 1,
      rounding: 20,
      placeholderTextColor: '#757575',
      styles: {
        placeholderText: {
          fontSize: 16,
        },
        notFoundText: {
          fontWeight: '600',
          color: '#9e9e9e',
          fontSize: 16,
        },
      },
      hasBorder: false,
      hasIcon: false,
    }

    const standardIcon = {
      enabled: searchBar.enabled,
      placeholderText: 'Search...',
      notFoundText: 'No Results',
      icon: 'search',
      iconColor: '#9e9e9e',
      backgroundColor: '#FFFFFF',
      borderColor: '#BDBDBD',
      borderSize: 1,
      rounding: 4,
      placeholderTextColor: '#757575',
      styles: {
        placeholderText: {
          fontSize: 16,
        },
        notFoundText: {
          fontWeight: '600',
          color: '#9e9e9e',
          fontSize: 16,
        },
      },
      hasBorder: false,
      hasIcon: true,
    }

    if (!searchBar.customStyles || searchBar.customStyles === 'simple') {
      searchBar = simpleGray
    } else if (searchBar.customStyles === 'standard') {
      searchBar = standardIcon
    }

    const {
      enabled,
      notFoundText,
      backgroundColor,
      borderColor,
      borderSize,
      rounding,
      icon,
      iconColor,
      placeholderText,
      hasIcon,
      placeholderTextColor,
      inputTextColor,
    } = searchBar

    const { styles: searchBarStyles } = searchBar

    const borderStyles = border ? { marginLeft: 16, marginRight: 16 } : {}

    if (enabled) {
      return (
        <View style={[styles.totalWrapper]}>
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: backgroundColor,
                borderRadius: rounding,
                borderColor: borderColor,
                borderWidth: borderSize,
              },
              borderStyles,
              extraStyle,
            ]}
          >
            <View style={styles.icon}>
              {hasIcon && <Icon size={20} name={icon} color={iconColor} />}
            </View>
            <View
              style={styles.input}
              fontSize={searchBarStyles.placeholderText.fontSize}
            >
              <TextInput
                style={[styles.input, { color: inputTextColor }]}
                fontSize={searchBarStyles.placeholderText.fontSize}
                placeholder={placeholderText}
                placeholderTextColor={placeholderTextColor}
                autoCapitalize="none"
                onChangeText={(text) => {
                  this.debounce(onFilterElement(text), 300)
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
    height: 40,
    marginTop: 0,
    paddingBottom: 0,
    marginBottom: 24,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontWeight: 'normal',
  },
  icon: {
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  totalWrapper: {
    paddingTop: 14,
  },
})
