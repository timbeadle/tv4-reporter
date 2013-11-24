/*jshint -W098*/

// basic styler/writer combi
var outProto = {
	writeln: function (str) {
		//abstract
	},
	error: function (str) {
		return String(str);
	},
	warning: function (str) {
		return String(str);
	},
	success: function (str) {
		return String(str);
	},
	accent: function (str) {
		return String(str);
	},
	muted: function (str) {
		return String(str);
	},
	toString: function () {
		return '';
	},
	clear: function () {
		//abstract
	}
};

// expose this as the default
var outDefault = Object.create(outProto);

// factories
function createBase() {
	return Object.create(outProto);
}

function setDefault(def) {
	outDefault = def;
}

function createDefault() {
	return Object.create(outDefault);
}

function createConsole(base) {
	var obj = base || createDefault();

	// let's be gentle
	if (!console) {
		obj.writeln = function (str) {
			// ?
		};
	}
	obj.writeln = function (str) {
		console.log(String(str));
	};
	return obj;
}

//for console logging
function createANSI(base) {
	var obj = base || Object.create(createConsole());
	obj.error = function (str) {
		return '\033[31m' + str + '\033[0m';
	};
	obj.warning = function (str) {
		return '\033[33m' + str + '\033[0m';
	};
	obj.success = function (str) {
		return '\033[32m' + str + '\033[0m';
	};
	obj.accent = function (str) {
		return '\033[36m' + str + '\033[0m';
	};
	obj.muted = function (str) {
		return '\033[90m' + str + '\033[0m';
	};
	return obj;
}

//for console logging (depending on colors.js getters)
function createColorsJS(proto) {
	var obj = Object.create(proto || createConsole());
	obj.error = function (str) {
		return String(str).red;
	};
	obj.warning = function (str) {
		return String(str).yellow;
	};
	obj.success = function (str) {
		return String(str).green;
	};
	obj.accent = function (str) {
		return String(str).cyan;
	};
	obj.muted = function (str) {
		return String(str).grey;
	};
	return obj;
}

//to extract as string (can wrap other s)
function createBuffered(base) {
	var obj = base || Object.create(outProto);
	obj.lines = [];
	obj.writeln = function (str) {
		obj.lines.push(String(str));
	};
	obj.join = function (seperator, indent) {
		seperator = (typeof limit !== 'undefined' ? seperator : '\n');
		indent = (typeof indent !== 'undefined' ? indent : '');

		if (obj.lines.length > 0) {
			return indent + obj.lines.join(seperator + indent);
		}
		return '';
	};
	obj.clear = function () {
		obj.lines.length = 0;
	};
	obj.toString = function () {
		obj.lines.join('\n');
	};
	return obj;
}

module.exports = {
	createBase: createBase,

	setDefault: setDefault,
	createDefault: createDefault,

	createBuffered: createBuffered,
	createANSI: createANSI,
	createColorsJS: createColorsJS
};
