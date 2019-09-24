import './runtimeConfig'
import React from 'react'
import { View } from 'react-native'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AppBar from '../src/AppBar/AppBar'
import ActionButton from '../src/ActionButton/ActionButton'
import Button from '../src/TextButton/TextButton'
import SimpleList from '../src/SimpleList'
import TabNavigator from '../src/TabNavigator'
import ImageList from '../src/ImageList'
import CardList from '../src/CardList'
import IconToggle from '../src/IconToggle'
import Icon from '../src/Icon'

import { FormWrapper } from './helpers'
import catPhotoURI from './cat.jpg'

import './baseStyles.css'

const catPhoto = { uri: catPhotoURI }

const generateImageData = (count, title, iconPosition) => {
  let data = []

  for (let i = 0; i < count; i += 1) {
    data.push({
      id: i,
      onPress: action(`Pressed item ${i}`),
      image: catPhoto,
      iconButton: {
        enabled: !!iconPosition,
        icon: 'favorite',
        color: '#fff',
        position: iconPosition,
        onPress: action(`Pressed icon of item ${i}`),
      },
      title: {
        enabled: !!title,
        text: title,
      }
    })
  }

  return data
}

const generateCardData = (
  count,
  titleText,
  subtitleText,
  bodyText,
  mediaPosition,
  actions,
) => {

  let data = []

  for (let i = 0; i < count; i += 1) {
    let body = bodyText && bodyText.substring(
      0,
      Math.round(
        Math.random() * bodyText.length * 0.6 +
        bodyText.length * 0.4
      )
    )

    data.push({
      id: i,
      onPress: action(`Pressed item ${i}`),
      image: catPhoto,
      title: {
        text: titleText,
      },
      subtitle: {
        enabled: true,
        text: subtitleText,
      },
      body: {
        enabled: !!bodyText,
        text: body,
      },
      media: {
        enabled: !!mediaPosition,
        position: mediaPosition,
        image: catPhoto,
      },
      button1: actions && {
        enabled: true,
        text: 'Button 1',
        onPress: action(`Item ${i} button1`),
        color: '#f00',
      },
      button2: actions && {
        enabled: true,
        text: 'Button 2',
        onPress: action(`Item ${i} button2`),
        color: '#f00',
      },
      icon1: actions && {
        enabled: true,
        icon: 'favorite',
        onPress: action(`Item ${i} button1`),
        color: '#bbb',
      },
      icon2: actions && {
        enabled: true,
        icon: 'star',
        onPress: action(`Item ${i} button2`),
        color: '#bbb',
      },
    })
  }

  return data
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

const wrapperStyles = {
  padding: 30,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  minHeight: 'min-content',
}

const innerWrapperStyles = {
  width: 400,
  backgroundColor: '#fff',
}

const cardInnerWrapperStyles = {
  width: 400,
  backgroundColor: '#ddd',
}

const ListWrapper = ({ children, card }) => (
  <View style={[wrapperStyles, { backgroundColor: '#eee' }]}>
    <View style={card ? cardInnerWrapperStyles : innerWrapperStyles}>
      {children}
    </View>
  </View>
)

storiesOf('AppBar', module)
  .add('Basic', () => (
    <AppBar
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
    <AppBar
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
    <AppBar
      backgroundColor="#1E88E5"
      color="#fff"
      title={{
        align: 'center',
        text: 'Title Text',
        action: action('Pressed title')
      }}
      rightIcon2={{
        icon: 'search',
        enabled: true,
        action: action('Pressed right button 2')
      }}
    />
  ))
  .add('Centered, back only', () => (
    <AppBar
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
    <AppBar
      backgroundColor="#f1f1f1"
      color="#333"
      title={{ text: 'Title Text' }}
      leftIcon={{ icon: 'menu', enabled: true }}
      rightIcon1={{ icon: 'favorite', enabled: true }}
      rightIcon2={{ icon: 'search', enabled: true }}
    />
  ))
  .add('Empty', () => (
    <AppBar />
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
  .add('Long Text', () => (
    <View style={wrapperStyles}>
      <View style={{ width: 200 }}>
        <Button
          primaryColor="#f00"
          text="Hello World, this is a very long button"
          action={action('Clicked!!')}
        />
      </View>
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
      activeTab="tab1"
      tab0={{ icon: 'home', label: 'Home', action: action('tab0') }}
      tab1={{ icon: 'people', label: 'People', enabled: true, action: action('tab1') }}
      tab2={{ icon: 'search', label: 'Search', enabled: true, action: action('tab2') }}
      tab3={{ icon: 'account-circle', label: 'Profile', enabled: true, action: action('tab3') }}
      tab4={{ icon: 'more-horiz', label: 'More', enabled: true, action: action('tab4') }}
    />
  ))
  .add('No Labels', () => (
    <TabNavigator
      activeColor="#f00"
      inactiveColor="#aaf"
      activeTab="tab1"
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
      activeTab="tab1"
      tab0={{ icon: 'home', label: 'Home sweet Home' }}
      tab1={{ icon: 'people', label: 'People in Your Network', enabled: true }}
      tab2={{ icon: 'search', label: 'Search People', enabled: true }}
      tab3={{ icon: 'account-circle', label: 'My Personal Profile', enabled: true }}
      tab4={{ icon: 'more-horiz', label: 'More', enabled: true }}
    />
  ))

storiesOf('ImageList')
  .add('No Title', () => (
    <ListWrapper>
      <ImageList
        items={generateImageData(7, null, 'top')}
        columnCount={3}
      />
    </ListWrapper>
  ))
  .add('Short Title', () => (
    <ListWrapper>
      <ImageList
        items={generateImageData(7, 'Short Title', 'top')}
        columnCount={3}
      />
    </ListWrapper>
  ))
  .add('Longer Title', () => (
    <ListWrapper>
      <ImageList
        items={generateImageData(7, 'Longer title that will cut off')}
        columnCount={4}
      />
    </ListWrapper>
  ))
  .add('Icon in Title', () => (
    <ListWrapper>
      <ImageList
        items={generateImageData(7, 'Some long title text', 'bottom')}
        columnCount={3}
      />
    </ListWrapper>
  ))

storiesOf('CardList')
  .add('Basic', () => (
    <ListWrapper card>
      <CardList
        items={generateCardData(7, 'Card Item Title', 'Subtitle')}
        columnCount={2}
      />
    </ListWrapper>
  ))
  .add('Single Column', () => (
    <ListWrapper card>
      <CardList
        items={generateCardData(
          1,
          'Card Item Title',
          'Subtitle',
          'Lorem ipsum doler sit amit blah blah blah',
          'middle',
          true,
        )}
        columnCount={1}
      />
    </ListWrapper>
  ))
  .add('Just title', () => (
    <ListWrapper card>
      <CardList
        items={generateCardData(
          1,
          'Card Item Title',
        )}
        columnCount={2}
      />
    </ListWrapper>
  ))
  .add('No subtitle', () => (
    <ListWrapper card>
      <CardList
        items={generateCardData(
          1,
          'Card Item Title',
          null,
          'Lorem ipsum doler sit amit blah blah blah',
          'middle',
        )}
        columnCount={2}
      />
    </ListWrapper>
  ))
  .add('Top Image', () => (
    <ListWrapper card>
      <CardList
        items={generateCardData(
          4,
          'Card Item Title',
          'Subtitle',
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'top',
        )}
        columnCount={2}
      />
    </ListWrapper>
  ))
  .add('Media Right', () => (
    <ListWrapper card>
      <CardList
        items={generateCardData(
          2,
          'Card Item Title',
          'Subtitle',
          'Lorem ipsum doler sit amit blah blah blah',
          'right',
          true,
        )}
        columnCount={1}
      />
    </ListWrapper>
  ))

storiesOf('IconToggle')
  .add('basic checkbox', () => (
    <FormWrapper initialValue={false}>
      <IconToggle
        inactiveIcon="check-box-outline-blank"
        activeIcon="check-box"
        inactiveColor="#bbb"
        activeColor="#f00"
      />
    </FormWrapper>
  ))
  .add('star', () => (
    <FormWrapper initialValue={false}>
      <IconToggle
        inactiveIcon="star-border"
        activeIcon="star"
        inactiveColor="#bbb"
        activeColor="#fc0"
      />
    </FormWrapper>
  ))

storiesOf('Icon')
  .add('basic icon', () => (
    <Icon
      iconName="filter-drama"
      iconColor="#f00"
    />
  ))
  .add('with onPress', () => (
    <Icon
      iconName="filter-drama"
      iconColor="#32f"
      onPress={action('Clicked Icon')}
    />
  ))
