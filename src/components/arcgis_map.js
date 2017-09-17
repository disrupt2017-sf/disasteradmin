import React, { Component } from 'react';
import { Scene, Layers, Geometry, Graphic, Symbols } from 'react-arcgis';

class ArcgisScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapProperties: {
        baseMap: 'satellite'
      },
      viewProperties: {
        center: [-122.431297, 37.7749], // florida keys: [-80.447281, 25.086515]
        scale: 50000
      },
      symbolProperties: {
          color: [226, 119, 40],
          outline: {
              color: [255, 255, 255],
              width: 2
          }
      },
      points: [
          {
            lat: 37.7749,
            lng: -122.431297
          },
          {
            lat: 37.781975,
            lng: -122.449335
          },
          {
            lat: 37.778393,
            lng: -122.410646
          }
      ]
    }
  }



  render() {
    const points = this.state.points.map( (point) => {
      return (
        <Graphic key={point.lat + point.lng}>
          <Symbols.SimpleMarkerSymbol
              symbolProperties={this.state.symbolProperties}
          />
          <Geometry.Point
              geometryProperties={{
                  latitude: point.lat,
                  longitude: point.lng
              }}
          />
        </Graphic>
      )
    })

    return (
      <Scene
        style={{ width: '100vw', height: '100vh' }}
        mapProperties={this.state.mapProperties}
        viewProperties={this.state.viewProperties}
      >
        <Layers.GraphicsLayer>
          { points }
        </Layers.GraphicsLayer>
      </Scene>
    )
  }
}

export default ArcgisScene;
