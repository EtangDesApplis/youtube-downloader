import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MyForm from './MyForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Free download a Youtube clip</h2>
        <p>WARNING: Please repsect Intellectual Property right, and only use this service to obtain materials for usage wherever Internet is not accessible !</p>
        <MyForm handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))