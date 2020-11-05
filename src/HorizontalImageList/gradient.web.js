const Gradient = props => {
  const {
    textPos,
    backgroundEffect,
    overlay,
    textSwitch,
    height,
    width,
  } = props

  const style = {
    ...overlay,
    height: height,
    width: width,
    background: !textSwitch
      ? null
      : backgroundEffect
      ? null
      : textPos == 'top'
      ? `linear-gradient(rgba(0,0,0,.7),#FFFFFF00 ) `
      : `linear-gradient(#FFFFFF00 , rgba(0,0,0,.7))`,
  }

  return (
    <div className="box" style={style}>
      {props.children}
    </div>
  )
}

export default Gradient
