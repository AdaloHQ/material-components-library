import './runtimeConfig'
import React from 'react'
import { View } from 'react-native'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AppBarRuntime from '../src/AppBar/AppBar'
import ActionButton from '../src/ActionButton/ActionButton'
import Button from '../src/TextButton/TextButton'
import SimpleList from '../src/SimpleList'
import TabNavigator from '../src/TabNavigator'

import catPhoto from './cat.jpg'

import './baseStyles.css'

const wrapperStyles = {
  padding: 30,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}

const innerWrapperStyles = {
  width: 400,
  background: '#fff',
}

const generateListData = (line1, line2, leftType, rightType) => {
  let data = []

  for (let i = 0; i < 3; i += 1) {
    data.push({
      id: i,
      onPress: action(`Pressed item ${i}`),
      firstLine: {
        text: line1 || 'First line text',
      },
      secondLine: {
        enabled: !!line2,
        text: line2,
      },
      leftSection: {
        type: leftType,
        enabled: !!leftType,
        iconColor: '#aaa',
        icon: 'add',
        image: catPhoto,
      },
      rightSection: {
        type: rightType,
        enabled: !!rightType,
        icon: 'delete',
        iconColor: '#aaa',
        onPress: action(`Pressed item ${i} right action`),
      }
    })
  }

  return data
}

const ListWrapper = ({ children }) => (
  <View style={[wrapperStyles, { background: '#eee' }]}>
    <View style={innerWrapperStyles}>
      {children}
    </View>
  </View>
)

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
  .add('Centered', () => (
    <AppBarRuntime
      backgroundColor="#1E88E5"
      color="#fff"
      title={{
        align: 'center',
        text: 'Title Text',
        action: action('Pressed title')
      }}
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
  .add('Centered, single right icon', () => (
    <AppBarRuntime
      backgroundColor="#1E88E5"
      color="#fff"
      title={{
        align: 'center',
        text: 'Title Text',
        action: action('Pressed title')
      }}
      leftIcon={{
        icon: 'menu',
        enabled: true,
        action: action('Pressed left button')
      }}
      rightIcon2={{
        icon: 'search',
        enabled: true,
        action: action('Pressed right button 2')
      }}
    />
  ))
  .add('Centered, back only', () => (
    <AppBarRuntime
      backgroundColor="#1E88E5"
      color="#fff"
      title={{
        align: 'center',
        text: 'Longer Title Text',
        action: action('Pressed title')
      }}
      leftIcon={{
        icon: 'arrow-back',
        enabled: true,
        action: action('Pressed left button')
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

storiesOf('Simple List', module)
  .add('Simple, Single Line', () => (
    <ListWrapper>
      <SimpleList items={generateListData()} />
    </ListWrapper>
  ))
  .add('Simple, 2 line', () => (
    <ListWrapper>
      <SimpleList items={generateListData(null, 'Second line text')} />
    </ListWrapper>
  ))
  .add('With Icon', () => (
    <ListWrapper>
      <SimpleList
        items={generateListData(
          null,
          'Second line text',
          'icon',
        )}
      />
    </ListWrapper>
  ))
  .add('Icon, inset divider', () => (
    <ListWrapper>
      <SimpleList
        dividerType="inset"
        items={generateListData(
          null,
          'Second line text',
          'icon',
        )}
      />
    </ListWrapper>
  ))
  .add('With Avatar', () => (
    <ListWrapper>
      <SimpleList items={generateListData(null, null, 'avatar')} />
    </ListWrapper>
  ))
  .add('Avatar, 2 line', () => (
    <ListWrapper>
      <SimpleList
        items={generateListData(
          null,
          'Second line text',
          'avatar',
        )}
      />
    </ListWrapper>
  ))
  .add('Avatar, long text', () => (
    <ListWrapper>
      <SimpleList
        items={generateListData(
          'Super long title that should probably wrap to 2 lines in normal circumstances',
          'More, equally long subtitle that should probably also hit the end of the line.',
          'avatar',
        )}
      />
    </ListWrapper>
  ))
  .add('Avatar, full divider', () => (
    <ListWrapper>
      <SimpleList
        dividerType="full"
        items={generateListData(
          null,
          'Second line text',
          'avatar',
        )}
      />
    </ListWrapper>
  ))
  .add('Avatar, inset divider', () => (
    <ListWrapper>
      <SimpleList
        dividerType="inset"
        items={generateListData(
          null,
          'Second line text',
          'avatar',
        )}
      />
    </ListWrapper>
  ))
  .add('With Image', () => (
    <ListWrapper>
      <SimpleList items={generateListData(null, null, 'image')} />
    </ListWrapper>
  ))
  .add('Image, 2 line', () => (
    <ListWrapper>
      <SimpleList
        items={generateListData(
          null,
          'Second line text',
          'image',
        )}
      />
    </ListWrapper>
  ))
  .add('Image, inset divider', () => (
    <ListWrapper>
      <SimpleList
        dividerType="inset"
        items={generateListData(
          null,
          'Second line text',
          'image',
        )}
      />
    </ListWrapper>
  ))
  .add('Right Icon', () => (
    <ListWrapper>
      <SimpleList
        items={generateListData(
          null,
          'Second line text',
          'avatar',
          'icon',
        )}
      />
    </ListWrapper>
  ))

storiesOf('TabNavigator', module)
  .add('Default', () => (
    <TabNavigator />
  ))
  .add('5-tab', () => (
    <TabNavigator
      activeColor="#fff"
      inactiveColor="#abf"
      backgroundColor="#00f"
      tab0={{ icon: 'home', label: 'Home' }}
      tab1={{ icon: 'people', label: 'People', enabled: true }}
      tab2={{ icon: 'search', label: 'Search', enabled: true }}
      tab3={{ icon: 'account-circle', label: 'Profile', enabled: true }}
      tab4={{ icon: 'more-horiz', label: 'More', enabled: true }}
    />
  ))
  .add('No Labels', () => (
    <TabNavigator
      activeColor="#f00"
      inactiveColor="#aaf"
      tab0={{ icon: 'home' }}
      tab1={{ icon: 'people', enabled: true }}
      tab2={{ icon: 'search', enabled: true }}
      tab3={{ icon: 'account-circle', enabled: true }}
      tab4={{ icon: 'more-horiz', enabled: true }}
    />
  ))
  .add('Long Labels', () => (
    <TabNavigator
      activeColor="#00f"
      inactiveColor="#abf"
      backgroundColor="#fff"
      tab0={{ icon: 'home', label: 'Home sweet Home' }}
      tab1={{ icon: 'people', label: 'People in Your Network', enabled: true }}
      tab2={{ icon: 'search', label: 'Search People', enabled: true }}
      tab3={{ icon: 'account-circle', label: 'My Personal Profile', enabled: true }}
      tab4={{ icon: 'more-horiz', label: 'More', enabled: true }}
    />
  ))
