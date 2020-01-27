function pluralise(str, num) {
	if (num === 1) {
		return String(str);
	}

	return str + 's';
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
	valueType,
};
