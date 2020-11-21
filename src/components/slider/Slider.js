import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SliderButton from './common/SliderButton'

import './assets/style.css'

class Slider extends Component {
    static propTypes = {
        slide: PropTypes.number,
        slides: PropTypes.array,
    };

    static defaultProps = {
        slide: 0,
        slides: undefined,
    };

    constructor(props) {
        super(props);
        this.state = {
            slide: props.slides ? props.slide : 0,
            min: props.slides ? 0 : undefined,
            max: props.slides && props.slides.length && props.slides.length -1 || 0 ,
        }
    }

    nextSlide = () => {
        this.setState({slide: (this.state.slide + 1)})
    }

    prevSlide = () => {
        this.setState({slide: (this.state.slide - 1)})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props.slide !== nextProps.slide) {
            this.setState({slide: nextProps.slide})
        }
    }


    render() {
        let {slides} = this.props;
        let {slide, min, max} = this.state;
        return (
            <div className="custom-slider">
                <div className='custom-slider-left-btn'>
                    <SliderButton side={'left'}
                                  disabled={slide === min}
                                  onClick={() => {
                                      this.prevSlide()
                                  }}
                    />
                </div>
                <div className="custom-slide">
                    {slides[slide]}
                </div>
                <div className="custom-slider-right-btn">
                    <SliderButton side={'right'}
                                  disabled={slide === max}
                                  onClick={() => {
                                      this.nextSlide()
                                  }}
                    />
                </div>
            </div>
        )
    }
}

export default Slider