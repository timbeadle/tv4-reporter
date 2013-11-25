/*jshint -W098*/
/*jshint -W003*/

var jsonpointer = require('jsonpointer.js');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var strimLimit = 100;

// utils
function pluralise(str, num) {
	if (num === 1) {
		return String(str);
	}
	return str + 's';
}

function valueType(value) {
	var t = typeof value;
	if (t === 'object' && Object.prototype.toString.call(value) === '[object Array]') {
		return 'array';
	}
	return t;
}

function valueStrim(value, limit) {
	limit = (typeof limit !== 'undefined' ? limit : strimLimit);

	var t = valueType(value);
	if (t === 'function') {
		return '[function]';
	}
	if (t === 'object' || t === 'array') {
		//return Object.prototype.toString.call(value);
		value = JSON.stringify(value);
		if (value.length > limit) {
			value = value.substr(0, limit - 3) + '...';
		}
		return value;
	}
	if (t === 'string') {
		if (value.length > limit) {
			return JSON.stringify(value.substr(0, limit - 4)) + '"...';
		}
		return JSON.stringify(value);
	}
	return String(value);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function createTest(schema, value, label, result, failOnMissing) {
	var test = {
		schema: schema,
		value: value,
		label: label,
		result: result,
		failOnMissing: !!failOnMissing
	};
	return test;
}

var props = [
	'schema',
	'value',
	'label',
	'result'
];

function checkTest(target) {
	var missing = [];
	for (var i = 0; i < props.length; i++) {
		if (typeof target[props[i]] === 'undefined') {
			missing.push(props[i]);
		}
	}
	return missing;
}

function isTest(target) {
	return (checkTest(target).length === 0);
}

function assertTest(target) {
	var missing = checkTest(target);
	if (missing.length > 0) {
		throw new Error('target is missing required properties: ' + missing.join());
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// best-effort
function extractSchemaLabel(out, schema, limit) {
	limit = typeof limit === 'undefined' ? strimLimit : limit;
	var label = '';
	if (schema.id) {
		label = out.accent(schema.id);
	}
	if (schema.title) {
		label += out.accent(label ? ' (' + schema.title + ')' : out.accent(schema.title));
	}

	if (!label && schema.description) {
		label = out.accent('<no id>') + ' ' + valueStrim(schema.description, limit);
	}
	if (!label) {
		label = out.accent('<no id>') + ' ' + valueStrim(schema, limit);
	}
	return label;
}
// best-effort
function extractCTXLabel(out, test, limit) {
	limit = typeof limit === 'undefined' ? strimLimit : limit;
	var label;
	if (test.label) {
		label = out.accent(test.label);
	}
	if (!label) {
		label = out.accent('<no label>') + ' ' + valueStrim(test.value, limit);
	}
	return label;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function reportResult(out, test, indent) {
	assertTest(test);

	if (test.result.valid) {
		if (test.failOnMissing && test.result.missing && test.result.missing.length > 0) {
			reportFailed(out, test, indent);
		}
		else {
			reportSuccess(out, test);
		}
	}
	else {
		reportFailed(out, test, indent);
	}
	reportMissing(out, test, indent);
}

function reportSuccess(out, test) {
	out.writeln(out.success('>> ') + 'success ' + extractCTXLabel(out, test));
	out.writeln(out.success('>> ') + extractSchemaLabel(out, test.schema));
}

function reportFailed(out, test, indent) {
	out.writeln(out.error('>> ') + 'failed ' + out.error(test.label));
	out.writeln(out.error('!= ') + extractSchemaLabel(out, test.schema));

	if (test.result.errors) {
		test.result.errors.some(function (err) {
			reportError(out, test, err, indent, indent);
		});
	}
	else if (test.result.error) {
		reportError(out, test, test.result.error, indent, indent);
	}
}

function reportMissing(out, test, indent) {
	if (test.result.missing && test.result.missing.length > 0) {
		out.writeln(out.warning('missing ' + pluralise('schema', test.result.missing.length) + ':') + ' ');
		test.result.missing.some(function (missing) {
			out.writeln(indent + missing);
		});
	}
}

function reportError(out, test, error, indent, prefix, parentPath) {
	assertTest(test);

	var value = test.value;
	if (typeof test.value === 'object') {
		value = jsonpointer.get(test.value, error.dataPath);
	}
	var schemaValue = jsonpointer.get(test.schema, error.schemaPath);

	indent = (typeof indent !== 'undefined' ? String(indent) : '   ');
	prefix = (typeof prefix !== 'undefined' ? prefix : '');

	if (error.message) {
		out.writeln(prefix + tweakMessage(out, error.message));
	}
	else {
		out.writeln(prefix + out.error('<no message>'));
	}

	if (typeof schemaValue !== 'undefined') {
		out.writeln(prefix + indent + schemaValue + out.accent(' -> ') + tweakPath(out, error.schemaPath));
	}
	else {
		out.writeln(prefix + indent + tweakPath(out, error.schemaPath));
	}

	if ((typeof parentPath !== 'string' || parentPath !== error.dataPath)) {
		if (error.dataPath !== '') {
			out.writeln(prefix + indent + out.error(' > ') + tweakPath(out, error.dataPath));
		}
		else {
			//out.writeln(prefix + indent + out.error(' > ') + '<root>');
		}
		out.writeln(prefix + indent + out.error(' > ') + valueType(value) + out.error(' -> ') + valueStrim(value));
	}

	if (error.subErrors) {
		error.subErrors.some(function (sub) {
			// let's go deeper
			reportError(out, test, sub, indent, prefix + indent, error.dataPath);
		});
	}
}

function tweakMessage(out, str) {
	return out.warning(str.charAt(0).toLowerCase() + str.substr(1));
}

function tweakPath(out, str) {
	return str.replace(/\//g, out.accent('/'));
}

function reportBulk(out, failed, passed, indent) {
	if (!passed) {
		passed = [];
	}
	indent = (typeof indent !== 'undefined' ? String(indent) : '   ');

	var total = failed.length + passed.length;

	//got some failures: print log and fail the task
	if (failed.length > 0) {
		failed.some(function (test, i) {
			assertTest(test);

			reportFailed(out, test, indent);

			if (i < failed.length - 1) {
				out.writeln('');
			}
		});

		out.writeln('');
		out.writeln(out.error('>> ') + 'tv4 ' + (passed.length > 0 ? out.warning('validated ' + passed.length) + ', ' : '') + out.error('failed ' + failed.length) + ' of ' + out.error(total + ' ' + pluralise('value', total)));
	}
	else if (total === 0) {
		//out.writeln('');
		out.writeln(out.warning('>> ') + 'tv4 ' + out.warning('validated zero values'));
	}
	else {
		//out.writeln('');
		out.writeln(out.success('>> ') + 'tv4 ' + out.success('validated ' + passed.length) + ' of ' + out.success(total + ' ' + pluralise('value', total)));
	}

	return out;
}

module.exports = {
	createTest: createTest,
	checkTest: checkTest,
	isTest: isTest,
	assertTest: assertTest,

	extractSchemaLabel: extractSchemaLabel,
	extractCTXLabel: extractCTXLabel,

	reportResult: reportResult,
	reportSuccess: reportSuccess,
	reportFailed: reportFailed,
	reportError: reportError,
	reportMissing: reportMissing,
	reportBulk: reportBulk
};
