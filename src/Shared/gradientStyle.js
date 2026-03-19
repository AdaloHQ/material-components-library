import { Platform } from 'react-native'

export const getGradientStyle = (gradientCSS) => {
  if (!gradientCSS) return {}

  return Platform.select({
    web: { backgroundImage: gradientCSS },
    default: { experimental_backgroundImage: gradientCSS },
  })
}
