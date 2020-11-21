import React, {Component} from 'react';
import PropTypes from 'prop-types'
import playImage from './../../asset/img/play-136x136.png';
import './asset/style.css'

class Video extends Component {
    static propTypes = {
        id: PropTypes.string,
        poster: PropTypes.string,
        url: PropTypes.string,
    };

    static defaultProps = {
        id: new Date(),
        poster: undefined,
        url: undefined,
    };

    constructor(props) {
        super(props);
        this.state={
            showPlay: true,
        }
    }

    render() {
        let {id, poster, url} = this.props;
        let {showPlay} = this.state;
        return (
            <div className="video-div">
                <video key={id}
                       ref={(e)=>this.video=e}
                       className={"video"}
                       controls
                       poster={showPlay ? poster :undefined}
                       preload="none"
                       src={url}
                >
                    <img style={{
                        height:'100%',
                        objectFit:'cover',
                    }} className='image-post'
                         src={poster}
                         alt=""/>
                </video>
                <button
                    className="video-play-btn"
                    style={{
                        display: showPlay ? 'block': 'none'
                    }}
                    onClick={()=>{
                        this.setState({showPlay: false} , ()=>{
                            this.video.play();
                        })
                    }}
                >
                <img
                     src={playImage}
                     />
                </button>
            </div>
        );
    }
}

export default Video;