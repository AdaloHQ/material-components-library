import './runtimeConfig'
import React from 'react'
import { View } from 'react-native'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AppBarRuntime from '../src/AppBar/AppBar'
import ActionButton from '../src/ActionButton/ActionButton'
import TextButton from '../src/TextButton/TextButton'
import RaisedButton from '../src/TextButton/RaisedButton'

import { Button, Welcome } from '@storybook/react/demo'
import './baseStyles.css'

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

storiesOf('TextButton', module)
  .add('Normal', () => (
    <View style={{ padding: 30 }}>
      <TextButton
        color="#f00"
        text="Hello World"
        action={action('Clicked!!')}
      />
    </View>
  ))
  .add('With Icon', () => (
    <View style={{ padding: 30 }}>
      <TextButton
        color="#f00"
        icon="add-box"
        text="Hello World"
        action={action('Clicked!!')}
      />
    </View>
  ))
  .add('Uppercase', () => (
    <View style={{ padding: 30 }}>
      <TextButton
        upperCase
        color="#f00"
        text="Hello World"
        action={action('Clicked!!')}
      />
    </View>
  ))

storiesOf('RaisedButton', module)
  .add('Normal', () => (
    <View style={{ padding: 30 }}>
      <RaisedButton
        color="#fff"
        backgroundColor="#f00"
        action={action('Clicked!!')}
      />
    </View>
  ))
  .add('With Icon', () => (
    <View style={{ padding: 30 }}>
      <RaisedButton
        color="#fff"
        backgroundColor="#f00"
        icon="add-box"
        action={action('Clicked!!')}
      />
    </View>
  ))
  .add('Uppercase', () => (
    <View style={{ padding: 30 }}>
      <RaisedButton
        upperCase
        color="#fff"
        backgroundColor="#f00"
        icon="add-box"
        action={action('Clicked!!')}
      />
    </View>
  ))
