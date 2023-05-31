import { PixelRatio, Platform } from 'react-native'

export const applyImgixParameters = (source, layout, imgixProps = {}) => {
  if (!layout) {
    return null
  }

  const uri = typeof source === 'object' ? source.uri : source

  if (typeof uri !== 'string' || !uri.includes('imgix.net')) {
    return source
  }

  const path = uri.split(/[?#]/)[0]
  const params = {
    w: layout.width,
    h: layout.height,
    dpr: PixelRatio.get(),
    auto: Platform.OS === 'web' ? 'format,compress' : 'compress',
    ...(typeof imgixProps === 'object' && { ...imgixProps }),
  }
  const queryParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')

  if (typeof source === 'object') {
    return {
      ...source,
      uri: `${path}?${queryParams}`
    }
  }

  return `${path}?${queryParams}`
}
