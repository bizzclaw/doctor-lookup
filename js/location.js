let _locations = [];

let _geoArgs = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout:	27000,
};

export class Location {

	static GetClientLocation(fallback, callback) {
		try {
			let geoPos = navigator.geolocation.watchPosition(function() {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;
				let locationStr = lat + ", " + lon;
				callback(locationStr);
			}, fallback, _geoArgs);
		}
		catch (error) {
			callback(fallback);
		}
	}

	static Find(id) {
		return _locations[id];
	}

	static GetAll() {
		return _locations;
	}

	constructor(langName, data) {
		this.name = langName;
		this.data = data;
		this.id = _locations.length + 1;
		_locations.push(this);
	}

	GetSearchLocation() {
		return this.data.lon + ", " + this.data.lan;
	}
}

new Location("Portland", {
	lon: 45.5231,
	lat: 122.6765
});
