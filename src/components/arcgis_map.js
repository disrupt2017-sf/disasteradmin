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
        baseMap: 'hybrid'
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
    setInterval(() => {
      axios.get('http://03220314.ngrok.io/hashgraphdata')
        .then(res => {
          if(Array.isArray(res.data)){
            this.setState({real_points: res.data})
          }
        })
    }, 5000);
  }

  render() {
    console.log('real points', this.state.real_points)
    const hospitalsList = [
        {
          latitude: 37.755634,
          longitude: -122.403748
        },
        {
          latitude: 37.773972,
          longitude: -122.431297
        },
        {
          latitude: 37.795478,
          longitude: -122.409183
        },
        {
          latitude: 37.764855,
          longitude: -122.390270
        },
        {
          latitude: 37.763089,
          longitude: -122.457814
        }
    ]

    const hospitals = hospitalsList.map((staticPoint) => {
      var style = {
          color: [76, 128, 255],
          outline: {
              color: [255, 100, 80],
              width: 4
          }
      }

      return (
        <Graphic key={'hospital' + staticPoint.latitude + staticPoint.longitude}>
          <Symbols.SimpleMarkerSymbol
              symbolProperties={style}
          />
          <Geometry.Point
              geometryProperties={{
                  latitude: staticPoint.latitude,
                  longitude: staticPoint.longitude
              }}
          />
        </Graphic>
      )
    })

    
    const points = this.state.real_points.map((point) => {
      // default
      var style = {
          color: [226, 119, 40],
          outline: {
              color: [255, 255, 255],
              width: 2
          }
      }

      switch(point.crisis) {
        case 'fire':
          style.color = [255, 165, 0]
          break;
        case 'flood':
          style.color = [65, 169, 76]
          break;
        case 'earthquake':
          style.color = [128, 0, 128]
          break;
        default:
          style.color = [16, 16, 16]
      }

      return (
        <Graphic key={point.phoneNumber + point.latitude + point.longitude}>
          <Symbols.SimpleMarkerSymbol
              symbolProperties={style}
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
            { hospitals }
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
