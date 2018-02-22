apiKey = 'pk.eyJ1IjoiZm9yYXBpa2V5cyIsImEiOiJjamRoanh2Mm0weDF2MnBucXA4azJwb3R0In0.9kKeQvjpAdGZ9en88Yo0og'

var myMap = L.map("map", {
  center: [0, 0],
  zoom: 2
});

// Add a tile layer to the map
L.tileLayer(
    "https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?" +
      "access_token=" + apiKey
  ).addTo(myMap);

// Function to determine marker size based on population
function colorer(magnitude) {
  switch (true) {
    case magnitude>5:
      return 'red';
      break;
    case magnitude>4:
      return 'orange';
      break;
    case magnitude>2:
      return 'yellow';
      break;

    default:
      return 'green';
      break;
  }
}

// An array containing all of the information needed to create city and state markers
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson', function(error,dat){
  console.log(error)
  dat.features.forEach(quake => {
    console.log(quake.geometry.coordinates.slice(0,2))
    var circ = L.circle(quake.geometry.coordinates.slice(0,2).reverse(), {
      radius: quake.properties.mag**2*5000, 
      weight:.5,
      color: colorer(quake.properties.mag)
    })
    circ.addTo(myMap)

  })

})

