import React, {Component} from 'react';
import Wait from './Wait';
import conf from './conf.json';
import kofi from './ko-fi.png';

const OutputZone = props => {

  if (props.state.status ===0){
    //fresh session
    return <br />
  }else if (props.state.status ===1){
    //awaiting response from back-end since POST request
    return <Wait />
  }else if (props.state.status ===2){
    return (
      <div>
          <p>If you appreciate this App, you could buy me a coffee here : 
            <a href="https://ko-fi.com/nguyen31"><img src={kofi} alt="Ko-fi link" height="40"/></a>
          </p>
      </div>
    );
  }else{
    return <p>Error</p>
  }
}

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {url: 'https://www.youtube.com/watch?v=Hi7Rx3En7-k',
                      format: 'mkv',
                      status: 0,
                      response: 1};
        this.handleURL = this.handleURL.bind(this);
        this.handleFormat = this.handleFormat.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleURL(event) { 
      this.setState({url: event.target.value});  
    }

    handleFormat(event) { 
      this.setState({format: event.target.value});  
    }
    //
    handleSubmit(event) {
        console.log(this.state.texfile);
        //set to awating status
        this.setState({ status: 1 }) //hourglass

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          //body: JSON.stringify({ title: 'React POST Request Example' })
          body: JSON.stringify({ url: this.state.url, format: this.state.format })
        };

        fetch(conf.backend,requestOptions)
          .then(response => response.json())
          //wait til the reponse from back end
          .then(data => {
            //print out reponse to debug
            console.log(data)
            this.setState({ response: data })
            //fetch to download now
            if (this.state.response.Status === 'OK'){
              fetch(conf.backend+this.state.response.Output)
                .then(response => {
                  response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = this.state.response.Output.split("/").pop();
                    a.click();
                  });
                });
              //sent coffee
              this.setState({ status: 2 })
            }else{
              this.setState({ status: 3 })
            }
          });

        event.preventDefault();
    }
    
    render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                URL:
                <input type="text" value={this.state.url} onChange={this.handleURL} />
              </label>
              <label>
                Output format:      
                <div className="radio">
                  <label>
                    <input type="radio" value="mkv" checked={this.state.format==='mkv'} onChange={this.handleFormat} />
                    mkv
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" value="mp3" checked={this.state.format==='mp3'} onChange={this.handleFormat} />
                    mp3
                  </label>
                </div>
              </label>
              <input type="submit" value="Download" />
            </form>
            <OutputZone state={this.state} />
          </div>
        );
    }
}

export default MyForm;