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
  state = {
    fontSize: 18,
    color: '#CCCCCC',
    fontFamily: 'Oswald',
    fontWeight: 600,
  }

  debounce = (fn, time) => {
    let timeout

    return function () {
      const functionCall = () => fn.apply(this, arguments)

      clearTimeout(timeout)
      timeout = setTimeout(functionCall, time)
    }
  }

  _onChange(e) {
    let { searchBar } = this.props
    let placeholderStyle = searchBar.styles.placeholderText
    this.setState({
      fontSize: placeholderStyle.fontSize,
      color: placeholderStyle.color,
      fontFamily: placeholderStyle.fontFamily,
      fontWeight: placeholderStyle.fontWeight,
    })
  }

  render() {
    let { searchBar, onFilterElement, notFound, notFoundText, children } =
      this.props

    console.log(this.props)

    if (!searchBar) {
      return <>{children}</>
    }

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
            <View
              style={styles.input}
              fontSize={searchBar.styles.placeholderText.fontSize}
            >
              <TextInput
                style={[
                  styles.input,
                  {
                    fontSize: this.state.fontSize,
                    color: this.state.color,
                    fontFamily: this.state.fontFamily,
                    fontWeight: this.state.fontWeight,
                  },
                ]}
                fontSize={searchBar.styles.placeholderText.fontSize}
                placeholder={searchBar.placeholderText}
                onChange={(e) => {
                  this.debounce(onFilterElement(e.target.value), 300)
                }}
                onChangeText={this._onChange.bind(this)}
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
    fontSize: 18,
  },
  icon: {
    justifyContent: 'center',
    flex: 0.05,
  },
})
