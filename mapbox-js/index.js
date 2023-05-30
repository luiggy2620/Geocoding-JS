let map = null;

const loadToken = () => {
	mapboxgl.accessToken =
		'pk.eyJ1IjoibHVpZ2d5MjYiLCJhIjoiY2xpM2syemNkMGM4eTNlcGY2cnFxMDhnZSJ9.k4JiFzpotgQuru0_jzvk3g';
};

const loadMap = () => {
	loadToken();
	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v12'
	});
	console.log(map);
	map.addControl(new mapboxgl.NavigationControl());

	addListenerToSearch();
};

const addListenerToSearch = () => {
	const input = document.getElementById('inputGeoCode');
	input.addEventListener('keydown', function (event) {
		event.keyCode === 13 && searchPlace();
	});
};

const searchPlace = () => {
	const input = document.getElementById('inputGeoCode');
	getGeocode(input.value, (coordinates) => {
		map.setCenter(coordinates);
		setMarker(coordinates);
		map.setZoom(10);
	});
};

const setMarker = (coordinates) => {
	new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
};

const getGeocode = (location, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		location
	)}.json?access_token=${mapboxgl.accessToken}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const coordinates = data.features[0].geometry.coordinates;
			callback(coordinates);
		})
		.catch((error) => {
			console.log(error);
		});
};


