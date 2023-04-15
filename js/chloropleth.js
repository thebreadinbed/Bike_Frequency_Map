//to comment out code: shift+alt+a
// assume your original GeoJSON dictionary is stored in a variable called "originalGeoJSON"
// convert geojson data to leaflet readable 
// create a new GeoJSON object with an empty "features" array

// chloropleth.js
import { geojsonData } from './data.js';


var newGeoJSON = {
  "type": "FeatureCollection",
  "features": []
};

// iterate through the original dictionary and create a new GeoJSON feature for each element
geojsonData.features.forEach(function(feature) {
  var newFeature = {
    "type": "Feature",
    "properties": feature.properties,
    "geometry": feature.geometry
  };
  geojsonData.features.push(newFeature);
});


const fs = require('fs');

// read the original GeoJSON file
const geojsonData = fs.readFileSync('originalGeoJSON.json');

// parse the GeoJSON data into a JavaScript object
const originalGeoJSON = JSON.parse(geojsonData);

// modify the GeoJSON object
originalGeoJSON.features[0].properties.name = 'New Name';

// log the modified GeoJSON object to the console
console.log(originalGeoJSON);



// add the new GeoJSON object to your Leaflet map
//L.geoJSON(newGeoJSON).addTo(map);


//steps to chloropleth map 
  
  // Initialize map
 // var map = L.map('map').setView([37.8, -122.4], 10);
  
  // Add linestrings to map
/*   var linestrings = L.geoJSON(data).addTo(map);
  
  // Define chloropleth color scheme
  function getColor(value) {
    return value > 7 ? 'red' :
           value > 3 ? 'orange' :
           'yellow';
  }
  
  // Apply chloropleth styling to linestrings
  linestrings.setStyle(function(feature) {
    return {
      color: getColor(feature.properties.value),
      weight: 5
    };
  });
   */