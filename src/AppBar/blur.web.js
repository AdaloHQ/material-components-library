import './styles.css'
import { View } from 'react-native'
const Blur = (props) => {
  const { translucentColor, borderStyle } = props
  const style = {
    backgroundColor: translucentColor,
    height: 106,
    width: '100%',
    paddingTop: 50,
    marginTop: -30,
  }

  return (
    <>
      <div className="box blur" style={style}>
        {props.children}
      </div>
      <View style={borderStyle}></View>
    </>
  )
}

export default Blur
