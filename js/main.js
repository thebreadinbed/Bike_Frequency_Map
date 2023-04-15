function initialize() {
	
	function loadMap(data){
		//create a basemap style. You can find other options at https://leaflet-extras.github.io/leaflet-providers/preview/
		
		var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			subdomains: 'abcd',
			minZoom: 0,
			maxZoom: 20,
			ext: 'png'
});
		// Create the map
		var mymap = L.map('mapdiv', {
			center: [45.50, -73.58],
			zoom: 13,
			maxZoom: 18,
			minZoom: 3,
			layers: Stamen_TonerLite
		});
		
		// Declare baseLayers and overlayLayers
		var baseLayers = {
			"Stamen_Toner": Stamen_TonerLite
			//,...
		};

		// function to change the format of geojson to make it leaflet readable 
		digestData(geojsonData);


		// Create GeoJSON layer and add to map
		var geojsonLayer = L.geoJson(geojsonData, {
			onEachFeature: function (feature, layer) {
				layer.bindPopup('ID_TRC: ' + feature.properties.ID_TRC + '<br> Number of trips: ' + feature.properties.num_trips);
			},
			style: function (feature) {
				// Get the frequency property from the feature properties
				var frequency = feature.properties.num_trips;
				
				// Calculate the line weight based on the frequency value
				var weight = frequency > 400 ? 6 : (frequency > 300 ? 5 : (frequency > 200 ? 4 : (frequency > 100 ? 2 : 1)));
;
				//var opacity = frequency/5;
				return {
				  color: '#ff7b25',
				  weight: weight,
				  //opacity:  opacity 
				};
			  }

			
		}).addTo(mymap);

		// Create a custom legend control
		var legend1 = L.control({ position: 'bottomright' });

		// Define the content of the legend and add a margin using CSS styles
		legend1.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'legend');
			div.style.padding = '15px'; // add a 10px padding to the legend container
			div.style.fontSize = '14px';
			div.style.width = '250px';
			div.style.height = '200px';
			div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
			// Define the legend HTML content
			div.innerHTML += '<div class="legend-title">Individual Bike Journey Registered by MTL Trajet, 2016</h4>';
			div.innerHTML += '<div class="legend-item"><div class="legend-line" style="border: 2px solid #ff7b25; "></div><div class="legend-label">1 - 100</div></div>';
			div.innerHTML += '<div class="legend-item"><div class="legend-line" style="border: 3px solid #ff7b25; "></div><div class="legend-label">100 - 200</div></div>';
			div.innerHTML += '<div class="legend-item"><div class="legend-line" style="border: 4px solid #ff7b25; "></div><div class="legend-label">200 - 300</div></div>';
			div.innerHTML += '<div class="legend-item"><div class="legend-line" style="border: 5px solid #ff7b25; "></div><div class="legend-label">More than 300</div></div>';
			return div;
		};

		// Create a custom legend control
		var legend2 = L.control({ position: 'topright' });

		// Define the content of the legend and add a margin using CSS styles
		legend2.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'legend');
			div.style.padding = '30px'; // add a 10px padding to the legend container
			div.style.fontSize = '14px';
			div.style.width = '300px';
			div.style.height = '300px';
			div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
			// Define the legend HTML content
			div.innerHTML += '<div class="legend-description">MTL Trajet is an application developed by Concordia University and updated by the City of Montreal to collect individual bike journey in the urban agglomeration of Montreal. Users were invited to download the application on their phone and record their bike journey. The data were collected in 2016 between the month of October and November. This map displays the frequency of bike users by road section.</h4>';
			return div;
		};

// Add the legend control to the map
	legend1.addTo(mymap);
	legend2.addTo(mymap);


		// Declare overlayLayers and add GeoJSON layer to it
		var overlayLayers = {
			"Trips": geojsonLayer
			//,...
		};

		// Declare layer control and add baseLayers and overlayLayers to it
		var layerControl = L.control.layers(baseLayers, overlayLayers);
		layerControl.addTo(mymap);
	};

	// Call the function which will create html table 
	loadMap();

}

//Code made available with the help of Carl Hewett, 2023 

// Returns coord array
function lineStringToArray(lineString)
{
	var returnedCoords = [];
	var splitLineString = lineString.split(',');

	for(var [index, stringPoint] of splitLineString.entries())
	{
		if(index == 0)
		{
			// First
			stringPoint = stringPoint.replace('LINESTRING (', '');
		}
		else if(index == splitLineString.length - 1)
		{
			// Last
			stringPoint = stringPoint.replace(')', '');
		}

		// Create array of 2 numbers (coord) from string
		var coord = [];
		var coordStringList = stringPoint.split(' ');
		for(var coordString of coordStringList)
		{
			if(coordString.length == 0)
			{
				continue;
			}

			coord.push(Number(coordString));
		}

		// Add to array
		returnedCoords.push(coord);
	}

	return returnedCoords;
}

//main part of the code reformating json
function digestData(data)
{
	for(var feature of data.features)
	{
		feature.geometry = {};
		feature.geometry.type = "LineString";
		feature.geometry.coordinates = lineStringToArray(feature.properties.geometry);
	}
}

window.onload = initialize;