import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapQuestStaticMap from 'react-primitives-mapquest-static-map'
import { Map, WebMap, WebScene, Popup, Scene, Layers, Geometry, Graphic, Symbols } from 'react-arcgis';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapProperties: {
        baseMap: 'satellite'
      },
      viewProperties: {
        center: [-122.431297, 37.7749], // florida keys: [-80.447281, 25.086515]
        scale: 50000
      }
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Disaster Relief</h2>
        </div>
        <Scene
          style={{ width: '100vw', height: '100vh' }}
          mapProperties={this.state.mapProperties}
          viewProperties={this.state.viewProperties}
        >
          <Popup
              popupProperties={{
                  content: 'This is a random popup that I made.',
                  location: [-122.431297, 37.7749],
                  title: 'My Popup'
              }}
          />
          <Layers.GraphicsLayer>
            <Graphic>
                <Symbols.SimpleMarkerSymbol
                    symbolProperties={{
                        color: [226, 119, 40],
                        outline: {
                            color: [255, 255, 255],
                            width: 2
                        }
                    }}
                />
                <Geometry.Point
                    geometryProperties={{
                        latitude: 37.7749,
                        longitude: -122.431297
                    }}
                />
            </Graphic>
            <Graphic>
                <Symbols.SimpleMarkerSymbol
                    symbolProperties={{
                        color: [226, 119, 40],
                        outline: {
                            color: [255, 255, 255],
                            width: 2
                        }
                    }}
                />
                <Geometry.Point
                    geometryProperties={{
                        latitude: 37.781975,
                        longitude: -122.449335
                    }}
                />
            </Graphic>
          </Layers.GraphicsLayer>
        </Scene>

      </div>
    );
  }
}


export default App;
