
const Blur = props => {
    const {
      translucentColor,
    } = props
  
    const style = {
       backgroundColor: hexToRGBA(translucentColor, 0.5)
    }

    return (
      <div className="box" style={style}>
          {props.children}
      </div>
    )
  }
  
  export default Blur


  function hexToRGBA(hex, transparency) {
    let r = parseInt(hex.slice(1,3), 16)
    let g = parseInt(hex.slice(3,5), 16)
    let b = parseInt(hex.slice(5,7), 16)
    return ("rgba("+r+", "+g+", "+b+", "+transparency+")")
  }