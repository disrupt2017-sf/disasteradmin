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
  componentDidMount() {
    // console.log('component MOUNTED')
    // axios.get('http://5920f809.ngrok.io/hashgraphdata')
    //   .then(res => {
    //     console.log('the response is', res);
    //     // console.log('JSON parsed', JSON.parse(JSON.stringify(res.data.body)) )
    //   })
  }
  createMap = () => {
    console.log('CREATE MAP');

    dojoRequire([
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/FeatureLayer',
      'esri/geometry/Point',
      'esri/Graphic',
      'esri/layers/support/Field',
      'esri/renderers/SimpleRenderer',
      'esri/symbols/SimpleMarkerSymbol'], (Map, MapView, FeatureLayer, Point, Graphic, Field, SimpleRenderer, SimpleMarkerSymbol) => {

        let map = new Map({basemap: 'dark-gray'})

        // create points
        var graphics = [
          {
             geometry: new Point({
               longitude: -122.431297,
               latitude: 37.7749
             }),
             attributes: {
               ObjectID: 1,
               Description: "KATL",
               Title: Date.now()
             },
          },
          {
             geometry: new Point({
               longitude: -122.449335,
               latitude: 37.781975
             }),
             attributes: {
               ObjectID: 2,
               Description: "KATL",
               Title: Date.now()
             },
          }
        ]

        // popup template
        var template = { // autocasts as new PopupTemplate()
          title: "{Title}",
          content: [{
            type: "fields",
            fieldInfos: [{
              fieldName: "Description"
            }, {
              fieldName: "Title"
            }]
          }]
        };

        // fields
        var fields = [
         new Field({
           name: "ObjectID",
           alias: "ObjectID",
           type: "oid"
         }), new Field({
           name: "Description",
           alias: "Description",
           type: "string"
         }), new Field ({
           name: "Title",
           alias: "Title",
           type: "string"
         })
        ];

        // renderer
        var renderer = new SimpleRenderer({
          symbol: new SimpleMarkerSymbol({
            size: 6,
            color: "black",
            outline: {
              width: 0.5,
              color: "white"
            }
          })
        });

        // initialize feature layer
        var lyr = new FeatureLayer({
           fields: fields,
           objectIdField: "ObjectID",
           geometryType: "point",
           spatialReference: { wkid: 4326 },
           source: graphics,  //  an array of graphics with geometry and attributes
                           // popupTemplate and symbol are not required in each graphic
                           // since those are handled with the popupTemplate and
                           // renderer properties of the layer
            popupTemplate: template,
            renderer: renderer  // UniqueValueRenderer based on `type` attribute
         });

        // Add Feature Layer to the map
        map.add(lyr);

        // render map view
        new MapView({
          container: this.mapContainer,
          map: map,
          center: [-122.449335, 47.2529],
          zoom: 8
        });

    })
  }

  render() {

    return (
      <div>
        <EsriLoader options={this.state.esriOptions} ready={this.createMap}/>
        <div ref={node => this.mapContainer = node} className='map-view'>
        </div>
      </div>

    )
  }
}

export default ArcgisScene;
