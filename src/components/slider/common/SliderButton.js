import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './../assets/style.css'

class SliderButton extends Component {
  static propTypes = {
    side: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
  }

  static defaultProps = {
    side: 'right',
    onClick: ()=>{},
    disabled: false,
    className: 'slider-btn'
  }

  render () {
    let { side, onClick, disabled , className } = this.props

    let icon =  <div className="custom-slider-btn-label" style={{ display: disabled? "none" : 'flex' }}>
      {side === 'left'? <i className="fa fa-angle-left"/>: <i className="fa fa-angle-right"/>}
    </div>
    return (
        <button className={className}
                disabled={disabled}
                onClick={() => onClick()}
        >
          { icon }
        </button>
    )
  }
}

export default SliderButton