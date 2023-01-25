import { View } from 'react-native'
import './styles.css'

const Blur = (props) => {
  const { translucentColor, borderStyle, blurViewStyle } = props
  const style = {
    backgroundColor: translucentColor,
    height: 106,
    width: '100%',
    paddingTop: 50,
    marginTop: -30,
    ...blurViewStyle,
  }

  return (
    <View style={borderStyle[1]}>
      <div className="box blur" style={style}>
        {props.children}
      </div>
      <View style={[borderStyle[0]]}></View>
    </View>
  )
}

export default Blur
