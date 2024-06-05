/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations)

mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWFtZW56c3MiLCJhIjoiY2x4MjVuMjNjMGp6dDJqb3J0aTVyd3NkMyJ9.bcWO0UJcJp7MBG5ejYyUHw';

var map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/light-v11'
});
