import { PixelRatio, Platform } from 'react-native'

const isObject = (object) => {
  return typeof object === 'object' && object !== null && !Array.isArray(object)
}

export const applyImgixParameters = (source, layout, imgixProps = {}) => {
  if (!layout) {
    return null
  }

  const uri = isObject(source) ? source.uri : source

  if (typeof uri !== 'string' || !uri.includes('imgix.net')) {
    return source
  }

  const [path, query] = uri.split(/[?#]/)

  const givenParams = query && query.split('&')
  const queryValues = {}

  if (givenParams) {
    for (const param of givenParams) {
      if (param) {
        const [key, value] = param.split('=')
        queryValues[key] = value
      }
    }
  }

  const params = {
    w: layout.width,
    h: layout.height,
    dpr: Math.max(PixelRatio.get(), 2),
    auto: Platform.OS === 'web' ? 'format,compress' : 'compress',
    ...(typeof imgixProps === 'object' && { ...imgixProps }),
    ...queryValues,
  }
  const queryParams = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')

  if (typeof source === 'object') {
    return {
      ...source,
      uri: `${path}?${queryParams}`,
    }
  }

  return `${path}?${queryParams}`
}
