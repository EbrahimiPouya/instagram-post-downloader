import React, {Component} from 'react';
import PropTypes from 'prop-types'

import './../App.css'

import Slider from "./slider/Slider";
import Video from './video/Video';
import reloadImage from './../asset/img/reload-136x136.png'

class PostImageSlider extends Component {
    static propTypes = {
        postId: PropTypes.string,
    }
    static defaultProps = {
        postId: 'CGRxGIsn7qm',
    }

    constructor(props) {
        super(props);
        this.mount = true;
        this.state = {
            isLoading: true,
            error: false,
        };
    }

    componentDidMount = () => {
        this.getImages()
    }

    getImages = () => {
        let {postId} = this.props;
        if (postId) {
            let avatar = "https://www.instagram.com/p/" + postId + "/?__a=1";
            // console.log( 'cookies' , Cookies.get('www.instagram.com'))
            let xhttp = new XMLHttpRequest();
            let that  = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    // document.getElementById("demo").innerHTML = this.responseText;
                    if (that.mount) {
                        let res = this.responseText;
                        let urls = [];
                        let postImageAddress;
                        let videoUrl ;
                        let type ;
                        if(res && res.data && res.data.graphql){
                            let graphql = res && res.data && res.data.graphql;
                            if(graphql.shortcode_media && graphql.shortcode_media.__typename=== "GraphSidecar" && graphql.shortcode_media.edge_sidecar_to_children){
                                type='slide';
                                let images = graphql.shortcode_media.edge_sidecar_to_children;
                                if(images && images.edges && images.edges.length){
                                    urls = images.edges.map((edge , index)=>{
                                        return {
                                            type: edge.node.__typename,
                                            display_url: edge.node.display_url,
                                            videoUrl: edge.node.video_url,
                                        } ;
                                    })
                                }
                            }
                            else if(graphql.shortcode_media && graphql.shortcode_media.__typename=== "GraphImage"){
                                type = 'image'
                                postImageAddress = graphql.shortcode_media && graphql.shortcode_media.display_url;
                            }else  if(graphql.shortcode_media && graphql.shortcode_media.__typename=== "GraphVideo"){
                                type = 'video';
                                postImageAddress = graphql.shortcode_media && graphql.shortcode_media.display_url;
                                videoUrl= graphql.shortcode_media && graphql.shortcode_media.video_url;
                            }
                            that.setState({isLoading: false, error: false, urls, postImageAddress , videoUrl , type})
                        }
                        else if(res && res.data && (!Array.isArray(res.data)) ){
                            that.setState({isLoading: false , error: true})
                        }
                    }
                }
                else{
                    if (that.mount)
                        that.setState({isLoading: false, error: true})
                }
            };

            xhttp.open("GET", avatar, true);
            // xhttp.setRequestHeader("cookie", 'ig_cb=1; ig_did=EC9EF1F1-869A-4795-B973-8E368D66D2EE; mid=X7Qa3wAEAAHxrW74qxwQYncFVGbm; rur=ATN; shbid=17772; shbts=1605639276.9409134; csrftoken=Mmh68FBtB5ARzRDlHTBs5C17hVKMkDVY; ds_user_id=8172308818; sessionid=8172308818%3ANHs7yTnprsPkNP%3A18; urlgen="{\\"178.32.236.92\\": 16276\\054 \\"188.211.36.118\\": 58224}:1kfKIb:IzJhsm3a_QS3fW75hWwHTvUF0d0');
            // xhttp.setRequestHeader("Host", 'www.instagram.com');
            // xhttp.withCredentials = true;
            xhttp.send();
        }
    }

    componentWillUnmount() {
        this.mount = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.postId !== this.props.postId)
            this.setState({loading: false}, () => {
                this.getImages()
            })
    }


    render() {
        let {isLoading, urls , error, type , postImageAddress , videoUrl} = this.state;
        if (isLoading) {
            return <div>loading...</div>
        }
        if (error) {
            return <div>
                <img className={"reload-post-media"}
                     src={reloadImage}
                     alt="not fount"
                />
            </div>
        }

        let result = <div/>
        switch (type) {
            case "slide":
                let data = [];
                data = urls.map((url, index) => {
                     return url.type==='GraphVideo'?
                        <Video key={index }
                               poster={url.display_url}
                               url={url.videoUrl}
                        />
                        :
                        <img style={{
                            height:'100%',
                            objectFit:'cover',
                        }} className='image-post'
                             src={url.display_url}
                             alt="not fount"/>
                })
                result =  <Slider slides={data} />
                break;
            case "image":
                result = <img style={{
                    textAlign: 'center',
                    backgroundColor: '#000',
                    width: '100%',
                    alignItems: 'center'
                }} className='image-post'
                              src={postImageAddress}
                              alt="not fount"/>
                break;
            case "video":
                result = <Video url={videoUrl} poster={postImageAddress} id={this.props.postId}/>
                break;
            default:
                result = <div>no type</div>
                break;
        }
        return (
            result
        )
    }
}

export default PostImageSlider;