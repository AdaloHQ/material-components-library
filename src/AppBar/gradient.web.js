const Gradient = (props) => {
  const style = {
    background: `linear-gradient(#FFFFFF00, rgba(0,0,0,.7))`,
  }

  return (
    <div className="box" style={style}>
      {props.children}
    </div>
  )
}

export default Gradient
