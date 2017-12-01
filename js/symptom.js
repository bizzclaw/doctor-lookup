let _allSymptoms = [];

export class Symptom {

	static GetAll() {
		return _allSymptoms;
	}

	static Find(id) {
		return _allSymptoms[id];
	}

	constructor(langName, apiName) {
		this.name = langName;
		this.apiname = apiName;
		this.id = _allSymptoms.length + 1;
		_allSymptoms.push(this);
	}
}
