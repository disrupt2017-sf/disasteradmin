import React, { Component } from 'react';
import './App.css';
import ArcgisScene from './components/arcgis_map'

class App extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Disaster Relief</h2>
        </div>
        <ArcgisScene />
      </div>
    );
  }
}

export default App;
