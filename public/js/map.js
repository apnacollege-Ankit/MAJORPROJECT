
    mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates,
    zoom: 2
});

// console.log(coordinates);
const marker = new mapboxgl.Marker({color: "red"})
.setLngLat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset: 25,})
    .setLngLat(e.lngLat)
    .setHTML(`<h4>${listing.title}</h4><p>Exact Location provided after booking</p>`))
    .setMaxWidth("300px")
    .addTo(map);