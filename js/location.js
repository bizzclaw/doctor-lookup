let _locations = []

let _geoArgs = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout:	27000,
}

export class Location {

	static GetClientLocation(callback, fallback) {
		try {
			let geoPos = navigator.geolocation.watchPosition(function() {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;
				let locationStr = lat + ", " + lon
				callback(locationStr)
			}, fallback, _geoArgs);
		}
		catch (error) {
			callback(fallback)
		}
	}

	static Find(id) {
		return _locations[id];
	}

	static GetAll() {
		return _locations;
	}

	constructor(data) {
		this.data = data;
		_locations.push(this);
	}

	GetSearchLocation() {

	}
}
