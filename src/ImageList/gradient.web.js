const Gradient = (props) => {
  const { textPos, backgroundEffect, rounding, enabled } = props
  const style = {
    borderRadius: rounding,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background:
      backgroundEffect === 'gradient' && enabled
        ? textPos == 'top'
          ? `linear-gradient(rgba(0,0,0,.7),#FFFFFF00 ) `
          : `linear-gradient(#FFFFFF00 , rgba(0,0,0,.7))`
        : null,
  }

  return <div className="box" style={style}></div>
}

export default Gradient
