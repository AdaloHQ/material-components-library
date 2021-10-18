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
import chroma from 'chroma-js'

export default class SearchBarWrapper extends Component {
  constructor(props) {
    super(props)

    const { searchBar } = props

    const {
      borderColor,
      borderSize: blurBorderSize = 1,
      customStyles,
    } = searchBar || {}

    let blurBorderColor

    switch (customStyles) {
      case 'simple':
        blurBorderColor = '#E0E0E0'
        break
      case 'standard':
        blurBorderColor = '#BDBDBD'
        break
      default:
        blurBorderColor = borderColor || '#E0E0E0'
        break
    }

    this.state = {
      currentBorderColor: blurBorderColor,
      blurBorderColor,
      currentBorderSize: blurBorderSize,
      blurBorderSize,
      darken: chroma(blurBorderColor).get('hsl.l') > 0.5,
    }
  }
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
      placeholderText: searchBar.placeholderText
        ? searchBar.placeholderText
        : 'Search...',
      notFoundText: searchBar.notFoundText
        ? searchBar.notFoundText
        : 'No Results',
      icon: 'search',
      iconColor: '#9e9e9e',
      backgroundColor: '#F5F5F5',
      borderColor: '#E0E0E0',
      borderSize: 1,
      rounding: 20,
      placeholderTextColor: '#757575',
      styles: searchBar.styles,
      hasBorder: true,
      hasIcon: false,
    }

    const standardIcon = {
      enabled: searchBar.enabled,
      placeholderText: searchBar.placeholderText
        ? searchBar.placeholderText
        : 'Search...',
      notFoundText: searchBar.notFoundText
        ? searchBar.notFoundText
        : 'No Results',
      icon: 'search',
      iconColor: '#9e9e9e',
      backgroundColor: '#FFFFFF',
      borderColor: '#BDBDBD',
      borderSize: 1,
      rounding: 4,
      placeholderTextColor: '#757575',
      styles: searchBar.styles,
      hasBorder: true,
      hasIcon: true,
    }

    if (!searchBar.customStyles || searchBar.customStyles === 'simple') {
      searchBar = simpleGray
    } else if (searchBar.customStyles === 'standard') {
      searchBar = standardIcon
    }

    const {
      enabled,
      notFoundText = 'No Results',
      backgroundColor = '#F5F5F5',
      borderColor = '#E0E0E0',
      borderSize = 1,
      rounding = 20,
      icon = 'search',
      iconColor = '#9e9e9e',
      placeholderText = 'Search...',
      hasIcon = false,
      placeholderTextColor = '#757575',
      inputTextColor,
      hasBorder = true,
    } = searchBar

    const { styles: searchBarStyles } = searchBar

    const borderStyles = border ? { marginLeft: 16, marginRight: 16 } : {}

    const borderExistsStyles = hasBorder ? {} : { borderWidth: 0 }

    if (enabled) {
      return (
        <View style={[styles.totalWrapper]}>
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: backgroundColor,
                borderRadius: rounding,
                borderColor: this.state.currentBorderColor,
                borderWidth: this.state.currentBorderSize,
              },
              borderStyles,
              borderExistsStyles,
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
                style={[
                  styles.input,
                  { color: inputTextColor },
                  searchBarStyles.placeholderText,
                ]}
                fontSize={searchBarStyles.placeholderText.fontSize}
                placeholder={placeholderText}
                placeholderTextColor={placeholderTextColor}
                autoCapitalize="none"
                onBlur={() =>
                  this.setState({
                    ...this.state,
                    currentBorderColor: this.state.blurBorderColor,
                    currentBorderSize: this.state.blurBorderSize,
                  })
                }
                onFocus={() =>
                  this.setState({
                    ...this.state,
                    currentBorderColor: this.state.darken
                      ? chroma(this.state.blurBorderColor).darken()
                      : chroma(this.state.blurBorderColor).brighten(),
                    currentBorderSize:
                      this.state.blurBorderSize > 0
                        ? this.state.blurBorderSize + 1
                        : 0,
                  })
                }
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
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
      default: {},
    }),
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
