const jsonpointer = require('jsonpointer.js');
const utils = require('./utils');

const strimLimit = 100;

// Utils

const valueStrim = (value, limit) => {
	limit = (typeof limit === 'undefined' ? strimLimit : limit);

	const t = utils.valueType(value);

	if (t === 'function') {
		return '[function]';
	}

	if (t === 'object' || t === 'array') {
		value = JSON.stringify(value);
		if (value.length > limit) {
			value = value.slice(0, limit - 3) + '…';
		}

		return value;
	}

	if (t === 'string') {
		if (value.length > limit) {
			return JSON.stringify(value.slice(0, limit - 4)) + '"…';
		}

		return JSON.stringify(value);
	}

	return String(value);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// eslint-disable-next-line max-params
const createTest = (schema, value, label, result, failOnMissing) => {
	const test = {
		schema,
		value,
		label,
		result,
		failOnMissing: Boolean(failOnMissing),
	};

	return test;
};

const props = [
	'schema',
	'value',
	'label',
	'result',
];

const checkTest = (target) => {
	return props.filter((prop) => {
		return typeof target[prop] === 'undefined';
	});
}

const isTest = (target) => {
	return (checkTest(target).length === 0);
};

const assertTest = (target) => {
	const missing = checkTest(target);

	if (missing.length > 0) {
		throw new Error('target is missing required properties: ' + missing.join());
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const getReporter = (out, style) => {

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	const tweakMessage = (string_) => {
		return style.warning(string_.charAt(0).toLowerCase() + string_.slice(1));
	};

	const tweakPath = (string_) => {
		return string_.replace(/\//g, style.accent('/'));
	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// best-effort
	function extractSchemaLabel(schema, limit) {
		limit = typeof limit === 'undefined' ? strimLimit : limit;
		let label = '';
		if (schema.id) {
			label = style.accent(schema.id);
		}

		if (schema.title) {
			label += style.accent(label ? ' (' + schema.title + ')' : style.accent(schema.title));
		}

		if (!label) {
			label = schema.description
				? style.accent('<no id>') + ' ' + valueStrim(schema.description, limit)
				: style.accent('<no id>') + ' ' + valueStrim(schema, limit);
		}

		return label;
	}

	// Best-effort
	function extractCTXLabel(test, limit) {
		limit = typeof limit === 'undefined' ? strimLimit : limit;
		let label;

		if (test.label) {
			label = style.accent(test.label);
		}

		if (!label) {
			label = style.accent('<no label>') + ' ' + valueStrim(test.value, limit);
		}

		return label;
	}

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	function reportResult(test, indent) {
		assertTest(test);

		if (test.result.valid) {
			if (test.failOnMissing && test.result.missing && test.result.missing.length > 0) {
				reportFailed(test, indent);
			}
			else {
				reportSuccess(test);
			}
		}
		else {
			reportFailed(test, indent);
		}

		reportMissing(test, indent);
	}

	function reportSuccess(test) {
		out.writeln(style.success('>> ') + 'success ' + extractCTXLabel(test));
		out.writeln(style.success('>> ') + extractSchemaLabel(test.schema));
	}

	function reportFailed(test, indent) {
		out.writeln(style.error('>> ') + 'failed ' + style.error(test.label));
		out.writeln(style.error('!= ') + extractSchemaLabel(test.schema));

		if (test.result.errors) {
			test.result.errors.forEach((err) => {
				reportError(test, err, indent, indent);
			});
		} else if (test.result.error) {
			reportError(test, test.result.error, indent, indent);
		}
	}

	function reportMissing(test, indent) {
		if (test.result.missing && test.result.missing.length > 0) {
			out.writeln('   ' + style.warning('missing ' + utils.pluralise('schema', test.result.missing.length) + ':') + ' ');
			test.result.missing.forEach((missing) => {
				out.writeln(indent + style.error(' - ') + valueStrim(missing));
			});
		}
	}

	// eslint-disable-next-line max-params
	const reportError = (test, error, indent, prefix, parentPath) => {
		assertTest(test);

		let { value } = test;
		if (typeof test.value === 'object') {
			value = jsonpointer.get(test.value, error.dataPath);
		}

		const schemaValue = jsonpointer.get(test.schema, error.schemaPath);

		indent = (typeof indent === 'undefined' ? '   ' : String(indent));
		prefix = (typeof prefix === 'undefined' ? '' : prefix);

		if (error.message) {
			out.writeln(prefix + tweakMessage(error.message));
		}
		else {
			out.writeln(prefix + style.error('<no message>'));
		}

		if (typeof schemaValue === 'undefined') {
			out.writeln(prefix + indent + tweakPath(error.schemaPath));
		} else {
			out.writeln(prefix + indent + valueStrim(schemaValue) + style.accent(' -> ') + tweakPath(error.schemaPath));
		}

		if ((typeof parentPath !== 'string' || parentPath !== error.dataPath)) {
			if (error.dataPath === '') {
				// (was) out.writeln(prefix + indent + out.error(' > ') + '<root>');
			} else {
				out.writeln(prefix + indent + style.error(' > ') + tweakPath(error.dataPath));
			}

			if (typeof value === 'undefined') {
				out.writeln(prefix + indent + style.error(' > ') + utils.valueType(value));
			}
			else {
				out.writeln(prefix + indent + style.error(' > ') + utils.valueType(value) + style.error(' -> ') + valueStrim(value));
			}
		}

		if (error.subErrors) {
			error.subErrors.forEach((sub) => {
				// Let's go deeper
				reportError(test, sub, indent, prefix + indent, error.dataPath);
			});
		}
	}

	function reportTotals(numberFailed, numberPassed) {
		const total = numberFailed + numberPassed;
		if (numberFailed > 0) {
			out.writeln(style.error('>> ') + 'tv4 ' + (numberPassed > 0 ? style.warning('validated ' + numberPassed) + ', ' : '') + style.error('failed ' + numberFailed) + ' of ' + style.error(total + ' ' + utils.pluralise('value', total)));
		} else if (total === 0) {
			// (was) out.writeln('');
			out.writeln(style.warning('>> ') + 'tv4 ' + style.warning('validated zero values'));
		} else {
			// (was) out.writeln('');
			out.writeln(style.success('>> ') + 'tv4 ' + style.success('validated ' + numberPassed) + ' of ' + style.success(total + ' ' + utils.pluralise('value', total)));
		}
	}

	function reportBulk(failed, passed, indent) {
		if (!passed) {
			passed = [];
		}

		indent = (typeof indent === 'undefined' ? '   ' : String(indent));

		// Got some failures: print log and fail the task
		if (failed.length > 0) {
			failed.forEach((test, i) => {
				assertTest(test);

				reportFailed(test, indent);

				if (i < failed.length - 1) {
					out.writeln('');
				}
			});
			out.writeln('');
		}

		reportTotals(failed.length, passed.length);
	}

	return {
		createTest,
		checkTest,
		isTest,
		assertTest,
		extractSchemaLabel,
		extractCTXLabel,
		reportResult,
		reportSuccess,
		reportFailed,
		reportError,
		reportMissing,
		reportBulk,
	};
}

module.exports = {
	getReporter
};
