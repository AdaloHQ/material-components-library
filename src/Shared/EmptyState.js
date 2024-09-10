import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import WrappedTextButton from '../TextButton/TextButton.js'

const getButtonMargin = (buttonType, textTitleDisplay, emptyStateImageStatus) => {
  if (buttonType === 'noButton') {
    return 0
  }

  if (textTitleDisplay === 'noText' && emptyStateImageStatus === 'noImage') {
    return 0
  }

  return 32
}

const getImageSource = imageSource => {
  if (!imageSource) {
    return require('./sqr-empty-state.png')
  }

  if (typeof imageSource === 'object' && typeof imageSource.value === 'object') {
    return imageSource.value
  }

  return imageSource
}

export default class EmptyListWrapper extends Component {
  static defaultProps = {
    buttonType: 'noButton',
    buttonText: 'Button',
    buttonIcon: 'add',
    buttonBorderRadius: 4,
    buttonShadow: true,
    buttonUpperCase: true,
    textTitleDisplay: 'titleOnly',
    title: 'No List Items',
    subtitle: 'Subtitle',
    imageWidth: 170,
    imageHeight: 170,
    imageRounding: 100, //This is percentage of the max
  }

  render() {
    let {
      buttonType = 'noButton',
      buttonText = 'Button',
      buttonIcon = 'add',
      buttonPrimaryColor,
      buttonContrastColor,
      buttonBorderRadius = 3,
      buttonShadow = true,
      buttonUpperCase = true,
      buttonAction,
      styles: emptyListStyles,
      textTitleDisplay,
      emptyStateImageStatus,
    } = this.props

    emptyListStyles.text = emptyListStyles.buttonText

    const buttonStyles =
      buttonShadow && buttonType !== 'text' && buttonType !== 'outlined'
        ? {
            flexDirection: 'row',
            shadowRadius: 3,
            elevation: 3,
            shadowOpacity: 0.2,
            borderRadius: buttonBorderRadius,
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }
        : {}

    const buttonMargin = {
      marginTop: getButtonMargin(buttonType, textTitleDisplay, emptyStateImageStatus),
    }

    const wrapperStyles = emptyStateImageStatus === 'noImage' ? {} : styles.wrapper

    return (
      <View style={wrapperStyles}>
        <ImageHolder {...this.props} />
        {buttonType && buttonType !== 'noButton' && (
          <View style={{ alignItems: 'center' }}>
            <View style={[buttonStyles, buttonMargin]}>
              <WrappedTextButton
                type={buttonType}
                text={buttonText}
                icon={buttonIcon}
                primaryColor={buttonPrimaryColor}
                contrastColor={buttonContrastColor}
                borderRadius={buttonBorderRadius}
                shadow={buttonShadow}
                upperCase={buttonUpperCase}
                action={buttonAction}
                styles={emptyListStyles}
                container={{
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>
        )}
      </View>
    )
  }
}

function ImageHolder(props) {
  let {
    imageSource,
    emptyStateImageStatus,
    textTitleDisplay,
    imageWidth,
    imageHeight,
    imageRounding,
  } = props
  let realImageSource = getImageSource(imageSource)

  const imageWrapperSize = { width: imageWidth, height: imageHeight }

  if (!emptyStateImageStatus || emptyStateImageStatus === 'noImage') {
    return (
      <>
        <TitleHolder {...props}></TitleHolder>
      </>
    )
  } else if (emptyStateImageStatus === 'above') {
    const imageMargin = { marginBottom: textTitleDisplay !== 'noText' ? 32 : 0 }
    return (
      <>
        <View style={styles.emptyList}>
          <View style={[imageWrapperSize, imageMargin]}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={realImageSource}
              pointerEvents="none"
            />
          </View>
        </View>
        <TitleHolder {...props}></TitleHolder>
      </>
    )
  } else {
    const imageMargin = { marginTop: textTitleDisplay !== 'noText' ? 32 : 0 }

    return (
      <>
        <TitleHolder {...props}></TitleHolder>
        <View style={styles.emptyList}>
          <View style={[imageWrapperSize, imageMargin]}>
            <Image
              style={styles.image}
              source={realImageSource}
              pointerEvents="none"
            />
          </View>
        </View>
      </>
    )
  }
}

function TitleHolder(props) {
  let {
    title = 'No List Items',
    subtitle = 'Subtitle',
    textTitleDisplay = 'noText',
    styles: { title: titleStyle, subtitle: subtitleStyle },
  } = props

  if (!textTitleDisplay || textTitleDisplay === 'noText') {
    return <></>
  } else if (textTitleDisplay === 'titleOnly') {
    return (
      <View style={{ marginHorizontal: 32 }}>
        <Text style={[styles.textStyle, titleStyle]}>{title}</Text>
      </View>
    )
  } else {
    return (
      <View style={{ marginHorizontal: 32 }}>
        <Text style={[styles.textStyle, titleStyle]}>{title}</Text>
        <Text style={[styles.textStyle, subtitleStyle]}>{subtitle}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  emptyList: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 32,
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
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'contain',
  },
  textStyle: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  wrapper: {
    marginVertical: 18,
  },
})
