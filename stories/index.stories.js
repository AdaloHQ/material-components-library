import './runtimeConfig'
import React from 'react'
import { View } from 'react-native'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AppBarRuntime from '../src/AppBar/AppBar'
import ActionButton from '../src/ActionButton/ActionButton'
import Button from '../src/TextButton/TextButton'

import './baseStyles.css'

const wrapperStyles = {
  padding: 30,
  alignItems: 'center',
  justifyContent: 'center',
}

storiesOf('AppBar', module)
  .add('Basic', () => (
    <AppBarRuntime
      backgroundColor="#1E88E5"
      color="#fff"
      title={{ text: 'Title Text', action: action('Pressed title') }}
      leftIcon={{
        icon: 'menu',
        enabled: true,
        action: action('Pressed left button')
      }}
      rightIcon1={{
        icon: 'favorite',
        enabled: true,
        action: action('Pressed right button 1')
      }}
      rightIcon2={{
        icon: 'search',
        enabled: true,
        action: action('Pressed right button 2')
      }}
    />
  ))
  .add('Inverted', () => (
    <AppBarRuntime
      backgroundColor="#f1f1f1"
      color="#333"
      title={{ text: 'Title Text' }}
      leftIcon={{ icon: 'menu', enabled: true }}
      rightIcon1={{ icon: 'favorite', enabled: true }}
      rightIcon2={{ icon: 'search', enabled: true }}
    />
  ))
  .add('Empty', () => (
    <AppBarRuntime />
  ))

storiesOf('ActionButton', module)
  .add('Basic', () => (
    <ActionButton
      color="#fff"
      backgroundColor="#f00"
      icon="menu"
    />
  ))

storiesOf('Text Button', module)
  .add('Normal', () => (
    <View style={wrapperStyles}>
      <Button
        primaryColor="#f00"
        text="Hello World"
        action={action('Clicked!!')}
      />
    </View>
  ))
  .add('With Icon', () => (
    <View style={wrapperStyles}>
      <Button
        primaryColor="#f00"
        icon="add-box"
        text="Hello World"
        action={action('Clicked!!')}
      />
    </View>
  ))
  .add('Uppercase', () => (
    <View style={wrapperStyles}>
      <Button
        upperCase
        primaryColor="#f00"
        text="Hello World"
        action={action('Clicked!!')}
      />
    </View>
  ))

storiesOf('Outlined Button', module)
  .add('Normal', () => (
    <View style={wrapperStyles}>
      <Button
        upperCase
        icon="arrow-back"
        type="outlined"
        primaryColor="#f00"
        action={action('Clicked!!')}
      />
    </View>
  ))
  .add('Grey', () => (
    <View style={wrapperStyles}>
      <Button
        upperCase
        icon="arrow-back"
        type="outlined"
        primaryColor="#444"
        action={action('Clicked!!')}
      />
    </View>
  ))

storiesOf('Contained Button', module)
  .add('Normal', () => (
    <View style={wrapperStyles}>
      <Button
        type="contained"
        contrastColor="#fff"
        primaryColor="#f00"
        action={action('Clicked!!')}
      />
    </View>
  ))
  .add('With Icon', () => (
    <View style={wrapperStyles}>
      <Button
        type="contained"
        contrastColor="#fff"
        primaryColor="#f00"
        icon="add-box"
        action={action('Clicked!!')}
      />
    </View>
  ))
  .add('Uppercase', () => (
    <View style={wrapperStyles}>
      <Button
        upperCase
        type="contained"
        contrastColor="#fff"
        primaryColor="#f00"
        icon="add-box"
        action={action('Clicked!!')}
      />
    </View>
  ))
  .add('Contrast', () => (
    <View style={wrapperStyles}>
      <Button
        upperCase
        type="contained"
        contrastColor="#f00"
        primaryColor="#fff"
        icon="add-box"
        action={action('Clicked!!')}
      />
    </View>
  ))
