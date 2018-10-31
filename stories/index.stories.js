import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AppBar from '../src/AppBar/editor'

import { Button, Welcome } from '@storybook/react/demo'

storiesOf('AppBar', module)
  .add('Basic', () => (
    <AppBar
      backgroundColor="#1E88E5"
      color="#fff"
      leftIcon={{ icon: 'menu', enabled: true }}
      title={{ text: 'Title Text' }}
      rightIcon1={{ icon: 'favorite', enabled: true }}
      rightIcon2={{ icon: 'search', enabled: true }}
    />
  ))
  .add('Empty', () => <AppBar />)
  .add('No Icons', () => (
    <AppBar
      backgroundColor="#1E88E5"
      color="#fff"
      title={{ text: 'Some Text' }}
    />
  ))
