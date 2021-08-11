import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native'
import ImageItem from './ImageItem.js'
import BottomBar from './BottomBar.js'
import placeholder from './holdplace.png'

class ImageScrollView extends Component {
  render() {
    const {
      imageList,
      imageStyles,
      bbShadow,
      bottomBarStyle,
      titleLimit,
      bbTitleLimit,
      imageRounding,
      shadow,
      textSwitch,
      iconSwitches,
      icons,
      textPos,
      iconColors,
      imageSize,
      bbStyles,
      gradientProps,
      iconSize,
    } = this.props

    return (
      <FlatList
        data={imageList}
        horizontal
        renderItem={({
          image,
          clickActions,
          imageOverlay,
          bottomBarText,
          bottomBarButtons,
        }) => (
          <TouchableWithoutFeedback onPress={clickActions}>
            <View
              style={
                bbShadow && bottomBarStyle.enabled
                  ? [imageStyles.view, imageStyles.shadow]
                  : imageStyles.view
              }
            >
              <ImageItem
                image={image}
                style={imageStyles}
                onPress={clickActions}
                title={imageOverlay.title}
                subtitle={imageOverlay.subtitle}
                titleLimit={titleLimit}
                imageRounding={imageRounding}
                shadow={shadow && !bbShadow}
                textSwitch={textSwitch}
                iconSwitches={iconSwitches}
                icons={icons}
                textPosition={textPos}
                iconColors={iconColors}
                iconActions={[
                  imageOverlay.tlIconActions,
                  imageOverlay.trIconActions,
                  imageOverlay.brIconActions,
                  imageOverlay.blIconActions,
                  imageOverlay.tlIconActions2,
                  imageOverlay.blIconActions2,
                ]}
                iconSize={iconSize}
                gradientProps={gradientProps}
              />
              <BottomBar
                style={bbStyles}
                title={bottomBarText.enabled ? bottomBarText.bbTitle : ''}
                subtitle={bottomBarText.enabled ? bottomBarText.bbSubtitle : ''}
                titleLimit={bbTitleLimit}
                styleSwitch={bottomBarStyle.enabled}
                buttonProps={bottomBarButtons}
                buttonSize={((imageSize - 150) / 175) * 20 + 12}
              ></BottomBar>
            </View>
          </TouchableWithoutFeedback>
        )}
      ></FlatList>
    )

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {imageList &&
          imageList.map(
            (
              {
                image,
                clickActions,
                imageOverlay,
                bottomBarText,
                bottomBarButtons,
              },
              index
            ) => (
              <TouchableWithoutFeedback onPress={clickActions} key={index}>
                <View
                  style={
                    bbShadow && bottomBarStyle.enabled
                      ? [imageStyles.view, imageStyles.shadow]
                      : imageStyles.view
                  }
                >
                  <ImageItem
                    image={image}
                    style={imageStyles}
                    onPress={clickActions}
                    title={imageOverlay.title}
                    subtitle={imageOverlay.subtitle}
                    titleLimit={titleLimit}
                    imageRounding={imageRounding}
                    shadow={shadow && !bbShadow}
                    textSwitch={textSwitch}
                    iconSwitches={iconSwitches}
                    icons={icons}
                    textPosition={textPos}
                    iconColors={iconColors}
                    iconActions={[
                      imageOverlay.tlIconActions,
                      imageOverlay.trIconActions,
                      imageOverlay.brIconActions,
                      imageOverlay.blIconActions,
                      imageOverlay.tlIconActions2,
                      imageOverlay.blIconActions2,
                    ]}
                    iconSize={iconSize}
                    gradientProps={gradientProps}
                  />
                  <BottomBar
                    style={bbStyles}
                    title={bottomBarText.enabled ? bottomBarText.bbTitle : ''}
                    subtitle={
                      bottomBarText.enabled ? bottomBarText.bbSubtitle : ''
                    }
                    titleLimit={bbTitleLimit}
                    styleSwitch={bottomBarStyle.enabled}
                    buttonProps={bottomBarButtons}
                    buttonSize={((imageSize - 150) / 175) * 20 + 12}
                  ></BottomBar>
                </View>
              </TouchableWithoutFeedback>
            )
          )}
      </ScrollView>
    )
  }
}
export default ImageScrollView
