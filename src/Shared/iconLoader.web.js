// Generate required css
import iconFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf'
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: MaterialIcons;
}`

// Create stylesheet
const style = document.createElement('style')
style.type = 'text/css'
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles
} else {
  style.appendChild(document.createTextNode(iconFontStyles))
}

// Inject stylesheet
document.head.appendChild(style)
