mapboxgl.accessToken = 'pk.eyJ1IjoiZGFjb3N0YTAwNzM2IiwiYSI6ImNrNHg5Nmt1ZDA0cm0zZ3BjZ2M5cmkwaXIifQ.eHZs6yM55NUUvCDDt0p0jw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [-71.157895, 42.707741]
});

// Fetch sotres from API
async function getStores() {
  const data = await (await fetch('/api/v1/stores')).json();
  const stores = data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [store.location.coordinates[0], store.location.coordinates[1]]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    }
  });

  loadMap(stores);
}

// Load map with points
function loadMap(stores) {
  map.on('load', function () {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
        }
      },
      'layout': {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getStores();