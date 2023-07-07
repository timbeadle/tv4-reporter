function pluralise(string_, number_) {
	if (number_ === 1) {
		return String(string_);
	}

	return string_ + 's';
}

function valueType(value) {
	const t = typeof value;
	if (t === 'object' && Object.prototype.toString.call(value) === '[object Array]') {
		return 'array';
	}

	return t;
}

module.exports = {
	pluralise,
	valueType
};
