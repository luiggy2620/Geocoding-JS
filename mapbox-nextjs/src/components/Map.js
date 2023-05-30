import mapboxgl, { Map } from 'mapbox-gl';
import Head from 'next/head';
import { useEffect, useState } from 'react';

let map = null;

const MapGraphic = () => {
	const [placeName, setPlaceName] = useState('');
	const [coordinates, setCoordinates] = useState([]);

	useEffect(() => {
		mapboxgl.accessToken =
			'pk.eyJ1IjoibHVpZ2d5MjYiLCJhIjoiY2xpM2syemNkMGM4eTNlcGY2cnFxMDhnZSJ9.k4JiFzpotgQuru0_jzvk3g';
		map = new Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v12',
			zoom: 0
		});
		map.addControl(new mapboxgl.NavigationControl());
	}, []);

	const search = () => {
		getGeocode(placeName);
	};

	const getGeocode = (location) => {
		const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
			location
		)}.json?access_token=${mapboxgl.accessToken}`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCoordinates(data.features[0].geometry.coordinates);
				const geoJSONUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${data.features[0].geometry.coordinates.join(
					';'
				)}?access_token=${mapboxgl.accessToken}`;

				fetch(geoJSONUrl)
					.then((response) => response.json())
					.then((geoJSONData) => {
						setGeoJSONData(geoJSONData);
						console.log(geoJSONData);
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (coordinates.length > 0) {
			map.setCenter(coordinates);
			map.setZoom(6);
			new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
		}
	}, [coordinates]);

	return (
		<>
			<Head>
				<link
					href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
					rel="stylesheet"
				/>
			</Head>
			<div id="map"></div>
			<div className="searcher">
				<input
					type="text"
					placeholder="Search"
					onChange={(event) => setPlaceName(event.target.value)}
					onKeyDown={(event) => event.keyCode === 13 && search()}
				/>
				<button onClick={search}>Search</button>
			</div>
		</>
	);
};

export default MapGraphic;
