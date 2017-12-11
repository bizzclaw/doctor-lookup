let _locations = [];

let _geoArgs = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout:	27000,
};

export class Location {

	static GetClientLocation(callback) {
		try {
			let geoPos = navigator.geolocation.watchPosition(function(position) {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;
				let locationStr = lat + "," + lon;
				callback(locationStr);
			});
		}
		catch (error) {
			callback(false);
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
		return this.data.lat + "," + this.data.lon;
	}
}

new Location("Portland", {
	lat: 45.523,
	lon: -122.676
});

new Location("San Francisco", {
	lat: 37.774,
	lon: -122.419
});
