import React, {Component} from 'react';
import './App.css';
import PostImageSlider from "./components/PostDownloader";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPost: false,
            postUrl: undefined,
        }
    }

    render() {

        return (
            <div className="App">
                <h1>instagram public page post viewer</h1>
                {
                    this.state.showPost ?
                        <PostImageSlider postId={this.state.postUrl}/>
                        :
                        <div><input type={'text'} onClick={(e)=>{
                            this.setState({postUrl: e.target.value})
                        }}/>
                        <button onClick={() => {
                            this.setState({showPost: true})
                        }}>search
                        </button>
                    </div>
                }
            </div>
        );
    }
}

export default App;
