import { PixelRatio, Platform } from 'react-native'

export const applyImgixParameters = (source, layout) => {
  if (!layout) {
    return null
  }

  const uri = typeof source === 'object' ? source.uri : source

  if (typeof uri !== 'string' || !uri.includes('imgix.net')) {
    return source
  }

  const path = uri.split(/[?#]/)[0]
  const params = {
    ...(layout.width && { w: layout.width }),
    ...(layout.height && { h: layout.height }),
    ...(layout.fit && { fit: layout.fit }),
    dpr: PixelRatio.get(),
    ...(Platform.OS === 'web' && { auto: 'format,compress' }),
    ...(Platform.OS !== 'web' && { auto: 'compress' }),
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
