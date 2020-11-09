import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native'
import ImageItem from './ImageItem.js'
import BottomBar from './BottomBar.js'
import placeholder from './holdplace.png'
import ScrollContainer from 'react-indiana-drag-scroll'

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
      editor,
    } = this.props
    return (
      <ScrollContainer horizontal={true} vertical={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
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
                <View style={imageStyles.view}>
                  <View
                    style={
                      bbShadow && bottomBarStyle.enabled
                        ? imageStyles.shadow
                        : null
                    }
                    key={index}
                  >
                    <TouchableWithoutFeedback onPress={clickActions}>
                      <View>
                        <View>
                          <ImageItem
                            image={editor ? placeholder : image}
                            style={imageStyles}
                            onPress={clickActions}
                            title={imageOverlay.title}
                            subtitle={imageOverlay.subtitle}
                            titleLimit={titleLimit}
                            imageRounding={imageRounding}
                            shadow={
                              shadow && (!bbShadow || !bottomBarStyle.enabled)
                            }
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
                        </View>
                        <BottomBar
                          style={bbStyles}
                          title={
                            bottomBarText.enabled ? bottomBarText.bbTitle : ''
                          }
                          subtitle={
                            bottomBarText.enabled
                              ? bottomBarText.bbSubtitle
                              : ''
                          }
                          titleLimit={bbTitleLimit}
                          styleSwitch={bottomBarStyle.enabled}
                          buttonProps={bottomBarButtons}
                          buttonSize={((imageSize - 150) / 175) * 20 + 12}
                        ></BottomBar>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              )
            )}
        </View>
      </ScrollContainer>
    )
  }
}
export default ImageScrollView
