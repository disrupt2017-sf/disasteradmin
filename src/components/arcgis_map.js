import React, { Component } from 'react';
import { Scene, Layers, Geometry, Graphic, Symbols } from 'react-arcgis';
import EsriLoader from 'esri-loader-react';
import { dojoRequire } from 'esri-loader';
import axios from 'axios';

class ArcgisScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      esriOptions: { url: 'https://js.arcgis.com/4.4/' },
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
      test_points: [
          {
            latitude: 47.2529,
            longitude: -122.4443
          },
          {
            latitude: 47.2529,
            longitude: -122.449335
          },
          {
            latitude: 37.778393,
            longitude: -122.410646
          }
      ],
      real_points: []
    }
  }

  componentDidMount() {
    axios.get('http://5920f809.ngrok.io/hashgraphdata')
      .then(res => {
        this.setState({real_points: res.data})
      })
  }

  render() {
    console.log('real points', this.state.real_points)
    const points = this.state.real_points.map((point) => {
      return (
        <Graphic key={point.latitude + point.longitude}>
          <Symbols.SimpleMarkerSymbol
              symbolProperties={this.state.symbolProperties}
          />
          <Geometry.Point
              geometryProperties={{
                  latitude: point.latitude,
                  longitude: point.longitude
              }}
          />
        </Graphic>
      )
    })

    return (
      <div>
        <Scene
          style={{ width: '100vw', height: '100vh' }}
          mapProperties={this.state.mapProperties}
          viewProperties={this.state.viewProperties}
        >
          <Layers.GraphicsLayer>
            { points }
          </Layers.GraphicsLayer>
          {/* <Layers.FeatureLayer
            layerProperties={{
              url: 'https://services6.arcgis.com/eIF8pWUENRGiMcYy/arcgis/rest/services/Hospitals/FeatureServer/0'
            }}
          /> */}
        </Scene>
      </div>

    )
  }
}

export default ArcgisScene;
