import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { RippleFeedback, IconToggle } from '@protonapp/react-native-material-ui'
import Gradient from './gradient'
import SearchBarWrapper from '../Shared/SearchWrapper'
import WrappedIconToggle from '../IconToggle/index.js'
import EmptyState from '../Shared/EmptyState'
import ImgixImage from '../lib/ImgixImage'

export default class ImageList extends Component {
  static defaultProps = {
    columnCount: 1,
  }
  state = {
    fullWidth: null,
    currentQuery: '',
  }

  renderGrid(items) {
    let { columnCount, _width, editor } = this.props
    let { fullWidth } = this.state
    let width = (fullWidth || _width) / columnCount

    return (
      <View style={styles.wrapper}>
        {items.map((itm, i) => (
          <Cell
            {...itm}
            key={itm.id}
            width={width}
            _fonts={this.props._fonts}
            isEditor={editor}
          />
        ))}
      </View>
    )
  }

  getColumns(items) {
    let { columnCount } = this.props
    let columns = []

    for (let i = 0; i < items.length; i += columnCount) {
      for (let j = 0; j < columnCount; j += 1) {
        let pos = i + j

        if (!columns[j]) {
          columns[j] = []
        }

        if (items[pos]) {
          columns[j].push(items[pos])
        }
      }
    }

    return columns
  }

  renderMasonry(items) {
    let { columnCount, _width } = this.props
    let { fullWidth } = this.state

    let columns = this.getColumns(items)

    let width = (fullWidth || _width) / columnCount

    let wrap = [styles.wrapper]

    //wrap.push({ height: fullWidth })
    return (
      <View style={wrap}>
        {columns.map((column, i) => (
          <View key={i} style={styles.column}>
            {column.map((itm) => (
              <Cell
                {...itm}
                key={itm.id}
                width={width}
                _fonts={this.props._fonts}
              />
            ))}
          </View>
        ))}
      </View>
    )
  }

  handleLayout = ({ nativeEvent }) => {
    const { width } = (nativeEvent && nativeEvent.layout) || {}
    const { fullWidth: prevWidth } = this.state

    if (width !== prevWidth) {
      this.setState({ fullWidth: width })
    }
  }

  filterElement = (query) => {
    this.setState({ currentQuery: query.toLowerCase() })
  }

  renderHeader() {
    let { listHeader } = this.props
    const {
      styles: { header },
    } = listHeader
    if (!listHeader || !listHeader.enabled || !listHeader.header) {
      return null
    }

    const headerStyles = [
      {
        color: header.color ? header.color : '#fff',
        fontSize: header.fontSize ? header.fontSize : 24,
        fontWeight: header.fontWeight ? header.fontWeight : '600',
        textAlign: header.textAlign ? header.textAlign : 'left',
      },
    ]

    if (header.fontFamily) {
      headerStyles.push({ fontFamily: header.fontFamily })
    }

    return (
      <Text style={headerStyles} numberOfLines={1}>
        {listHeader.header}
      </Text>
    )
  }

  filterItems(items) {
    let { currentQuery } = this.state
    return items.filter((itm) => {
      if (!currentQuery) {
        return true
      }
      if (
        itm.title &&
        itm.title.text &&
        itm.title.text.toLowerCase().indexOf(currentQuery) >= 0
      ) {
        return true
      } else if (
        itm.subtitle &&
        itm.subtitle.text &&
        itm.subtitle.text.toLowerCase().indexOf(currentQuery) >= 0
      ) {
        return true
      }
    })
  }

  render() {
    let {
      items,
      searchBar,
      listEmptyState,
      openAccordion,
      columnCount,
      _height,
      getFlags,
    } = this.props

    const { hasUpdatedLoadingStates } = (getFlags && getFlags()) || {}

    let layout = 'grid' //items[0] ? items[0].imageStyles.layout : 'grid'

    if (!items) {
      if (hasUpdatedLoadingStates) {
        // TODO (michael-adalo): flag is now set to ON for all environments,
        // we could remove the check and default to the logic below
        const height = columnCount === 2 ? _height / 2 : _height

        return (
          <View
            style={{ height, justifyContent: 'center' }}
            onLayout={this.handleLayout}
          >
            <ActivityIndicator color="#999999" />
          </View>
        )
      } else {
        return <View></View>
      }
    }

    const newItems = this.filterItems(items)

    const notFound = newItems.length === 0

    const extraStyle = {
      marginLeft: 2,
      marginRight: 2,
    }

    const renderEmptyState =
      listEmptyState &&
      ((items && !items[0]) || openAccordion === 'listEmptyState')
    if (renderEmptyState) {
      return <EmptyState {...listEmptyState}></EmptyState>
    }

    if (layout === 'masonry') {
      return (
        <>
          <View onLayout={this.handleLayout}>
            <SearchBarWrapper
              searchBar={searchBar}
              onFilterElement={this.filterElement}
              notFound={notFound}
              extraStyle={extraStyle}
            >
              {this.renderHeader()}
              {this.renderMasonry(newItems)}
            </SearchBarWrapper>
          </View>
        </>
      )
    } else {
      return (
        <>
          <View onLayout={this.handleLayout}>
            <SearchBarWrapper
              searchBar={searchBar}
              onFilterElement={this.filterElement}
              notFound={notFound}
              extraStyle={extraStyle}
            >
              {this.renderHeader()}
              {this.renderGrid(newItems)}
            </SearchBarWrapper>
          </View>
        </>
      )
    }
  }
}

class Cell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shapeWidth: null,
    }
  }

  hasIcon = () => {
    let { iconButton } = this.props

    return iconButton && iconButton.icon && iconButton.enabled
  }

  renderIcon() {
    let { iconButton } = this.props

    if (!this.hasIcon()) {
      return null
    }

    let wrapperStyles = [styles.buttonWrapper]

    if (iconButton.position === 'bottom') {
      wrapperStyles.push(styles.buttonBottom)
    }

    return <View style={wrapperStyles}>{this.renderIconType()}</View>
  }
  renderIconType() {
    let { iconButton } = this.props

    if (iconButton.iconType === 'toggle') {
      return (
        <View style={{ padding: 12 }}>
          <WrappedIconToggle {...iconButton} />
        </View>
      )
    }
    return (
      <IconToggle
        name={iconButton.icon}
        color={iconButton.color}
        underlayColor={iconButton.color}
        maxOpacity={0.3}
        size={24}
        onPress={iconButton.onPress}
      />
    )
  }

  renderSubtitle() {
    let { title, _fonts } = this.props

    let subtitleStyles = [
      {
        fontSize: 10,
        color: title.textColor ? title.textColor : '#fff',
      },
    ]

    if (title.styles) {
      subtitleStyles.push(title.styles.subtitle)
    } else if (_fonts) {
      subtitleStyles.push({ fontFamily: _fonts.body })
    }

    if (!title.subtitle) {
      return null
    }

    return (
      <Text style={subtitleStyles} numberOfLines={1} ellipsizeMode={'tail'}>
        {title.subtitle}
      </Text>
    )
  }

  renderBar() {
    let { title, imageStyles, iconButton, _fonts } = this.props

    if (!title || !title.enabled || (!title.text && !title.subtitle)) {
      return null
    }

    let wrapperStyles = [styles.barWrapper]

    if (title.textPosition === 'top') {
      wrapperStyles.push({
        top: 0,
        bottom: null,
        borderTopRightRadius: imageStyles.rounding,
        borderTopLeftRadius: imageStyles.rounding,
      })
    }
    if (title.textPosition === 'bottom' || !title.textPosition) {
      wrapperStyles.push({
        top: null,
        bottom: 0,
        borderBottomRightRadius: imageStyles ? imageStyles.rounding : 0,
        borderBottomLeftRadius: imageStyles ? imageStyles.rounding : 0,
      })
    }

    if (title.backgroundEffect === 'gradient') {
      wrapperStyles.push({ backgroundColor: '#FFFFFF00' })
    }
    if (title.backgroundEffect === 'solid' || !title.backgroundEffect) {
      if (title.backgroundColor) {
        wrapperStyles.push({ backgroundColor: title.backgroundColor })
      } else {
        wrapperStyles.push({ backgroundColor: 'rgba(0, 0, 0, 0.6)' })
      }
    }

    let barPosition = title.textPosition ? title.textPosition : 'bottom'

    if (this.hasIcon() && iconButton.position === barPosition) {
      wrapperStyles.push(styles.titleWrapperExpanded)
    }

    let titleStyles = [
      {
        fontSize: 12,
        fontWeight: '600',
        color: title.textColor ? title.textColor : '#FFFFFF',
      },
    ]

    if (title.styles) {
      titleStyles.push(title.styles.text)
    } else if (_fonts) {
      titleStyles.push({ fontFamily: _fonts.body })
    }
    return (
      <View style={wrapperStyles}>
        <View style={styles.textWrapper}>
          {title.subtitlePosition === 'above' ? this.renderSubtitle() : null}
          <Text style={titleStyles} numberOfLines={1}>
            {title.text}
          </Text>
          {title.subtitlePosition === 'below' ? this.renderSubtitle() : null}
        </View>
      </View>
    )
  }

  renderContent() {
    let { title, imageStyles, image, width, isEditor } = this.props
    let source = image

    let imageStyling = [styles.image]
    let shadowStyle = [styles.cellSub]

    if (!source) {
      imageStyling.push({ backgroundColor: '#ccc' })
    }
    let shapeWidth = width

    if (imageStyles) {
      if (imageStyles.rounding) {
        imageStyling.push({ borderRadius: imageStyles.rounding })
      }

      if (imageStyles.shape === 'portrait') {
        shapeWidth = width * 1.5
      } else if (imageStyles.shape === 'landscape') {
        shapeWidth = Math.round((width * 2) / 3)
      }

      if (imageStyles.shadow) {
        shadowStyle.push({
          borderRadius: imageStyles.rounding ? imageStyles.rounding : 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 3,
        })
      }
    }

    imageStyling.push({ height: shapeWidth })

    // layout will re-flow multiple times, allow width if none set yet or allow a larger width
    if (!this.state.shapeWidth || shapeWidth > this.state.shapeWidth) {
      this.setState({ shapeWidth })

      if (!isEditor) {
        // Need to return at least one child, can't return null
        return <React.Fragment/>
      }
    }

    return (
      <View>
        <View style={shadowStyle}>
          <ImgixImage
            resizeMode="cover"
            source={source}
            imgixProps={{
              w: this.state.shapeWidth,
              h: this.state.shapeWidth,
            }}
            style={imageStyling}
            pointerEvents="none"
          />
        </View>
        <Gradient
          textPos={title.textPosition}
          backgroundEffect={title.backgroundEffect}
          rounding={imageStyles ? imageStyles.rounding : 0}
          enabled={title.enabled}
        />
        {this.renderBar()}
        <View style={styles.tapTarget} />
      </View>
    )
  }

  render() {
    let { onPress, width, imageStyles, title } = this.props

    let wrapperStyles = [styles.cell, { width }]
    if (onPress) {
      return (
        <View style={wrapperStyles}>
          <RippleFeedback onPress={onPress} color="#fff">
            {this.renderContent()}
          </RippleFeedback>
          {this.renderIcon()}
        </View>
      )
    }

    return (
      <View style={wrapperStyles}>
        {this.renderContent()}
        {this.renderIcon()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    margin: -2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 2,
  },
  cell: {
    padding: 2,
    width: '100%',
  },
  cellSub: {},
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  image: {
    width: '100%',
  },
  barWrapper: {
    paddingLeft: 16,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  textWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  titleWrapperExpanded: {
    height: 48,
    paddingRight: 48,
  },
  tapTarget: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  buttonWrapper: {
    position: 'absolute',
    right: 3,
    top: 3,
    width: 48,
    height: 48,
  },
  buttonBottom: {
    top: null,
    bottom: 2,
    right: 2,
  },
})
