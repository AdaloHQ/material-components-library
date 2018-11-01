import './runtimeConfig'
import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AppBarEditor from '../src/AppBar/editor'
import AppBarRuntime from '../src/AppBar/AppBar'

import { Button, Welcome } from '@storybook/react/demo'
import './baseStyles.css'

storiesOf('AppBar (editor)', module)
  .add('Basic', () => (
    <AppBarEditor
      backgroundColor="#1E88E5"
      color="#fff"
      leftIcon={{ icon: 'menu', enabled: true }}
      title={{ text: 'Title Text' }}
      rightIcon1={{ icon: 'favorite', enabled: true }}
      rightIcon2={{ icon: 'search', enabled: true }}
    />
  ))
  .add('Inverted', () => (
    <AppBarEditor
      backgroundColor="#f1f1f1"
      color="#333"
      leftIcon={{ icon: 'menu', enabled: true }}
      title={{ text: 'Title Text' }}
      rightIcon1={{ icon: 'favorite', enabled: true }}
      rightIcon2={{ icon: 'search', enabled: true }}
    />
  ))
  .add('Empty', () => <AppBarEditor />)
  .add('No Icons', () => (
    <AppBarEditor
      backgroundColor="#1E88E5"
      color="#fff"
      title={{ text: 'Some Text' }}
    />
  ))

storiesOf('AppBar (runtime)', module)
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
