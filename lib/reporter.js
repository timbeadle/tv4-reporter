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

function getContext(schema, value, label, result, failOnMissing) {
	var ctx = {
		schema: schema,
		value: value,
		label: label,
		result: result,
		failOnMissing: !!failOnMissing
	};
	return ctx;
}

var props = [
	'schema',
	'value',
	'label',
	'result'
];

function checkContext(target) {
	var missing = [];
	for (var i = 0; i < props.length; i++) {
		if (typeof target[props[i]] === 'undefined') {
			missing.push(props[i]);
		}
	}
	return missing;
}

function isContext(target) {
	return (checkContext(target).length === 0);
}

function assertContext(target) {
	var missing = checkContext(target);
	if (missing.length > 0) {
		throw new Error('target is missing required properties: ' + missing.join());
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// best-effort
function extractSchemaLabel(out, schema, limit) {
	limit = typeof limit === 'undefined' ? strimLimit : limit;
	var label;
	if (schema.id) {
		label = schema.id;
	}
	if (schema.title) {
		label += (label ? ' (' + schema.title + ')' : schema.title);
	}
	if (!label && schema.description) {
		label = valueStrim(schema.description, limit);
	}
	if (!label) {
		label = out.accent('<no id>') + ' ' + valueStrim(schema, limit);
	}
	return label;
}
// best-effort
function extractCTXLabel(out, ctx, limit) {
	limit = typeof limit === 'undefined' ? strimLimit : limit;
	var label;
	if (ctx.label) {
		label = out.accent(ctx.label);
	}
	if (!label) {
		label = out.accent('<no label>') + ' ' + valueStrim(ctx.value, limit);
	}
	return label;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function reportResult(out, ctx, indent) {
	assertContext(ctx);

	if (ctx.result.valid) {
		if (ctx.failOnMissing && ctx.result.missing && ctx.result.missing.length > 0) {
			reportFailed(out, ctx, indent);
		}
		else {
			reportSuccess(out, ctx);
		}
	}
	else {
		reportFailed(out, ctx, indent);
	}
	reportMissing(out, ctx, indent);
}

function reportSuccess(out, ctx) {
	out.writeln(out.success('>> ') + 'success ' + extractCTXLabel(out, ctx));
	out.writeln(out.success('>> ') + extractSchemaLabel(out, ctx.schema));
}

function reportFailed(out, ctx, indent) {
	out.writeln(out.error('>> ') + 'failed ' + out.error(ctx.label));
	out.writeln(out.error('!= ') + extractSchemaLabel(out, ctx.schema));

	if (ctx.result.errors) {
		ctx.result.errors.some(function (err) {
			reportError(out, ctx, err, indent);
		});
	}
	else if (ctx.result.error) {
		reportError(out, ctx, ctx.result.error, indent);
	}
}

function reportMissing(out, ctx, indent) {
	if (ctx.result.missing && ctx.result.missing.length > 0) {
		out.writeln(out.warning('missing ' + pluralise('schema', ctx.result.missing.length) + ':') + ' ');
		ctx.result.missing.some(function (missing) {
			out.writeln(indent + missing);
		});
	}
}

function reportError(out, ctx, error, indent, prefix, parentPath) {
	assertContext(ctx);

	var value = ctx.value;
	if (typeof ctx.value === 'object') {
		value = jsonpointer.get(ctx.value, error.dataPath);
	}
	var schemaValue = jsonpointer.get(ctx.schema, error.schemaPath);

	indent = (typeof indent !== 'undefined' ? String(indent) : '   ');
	prefix = (typeof prefix !== 'undefined' ? prefix : '');

	out.writeln(prefix + out.warning(error.message));
	if (typeof schemaValue !== 'undefined') {
		out.writeln(prefix + indent + schemaValue + out.accent(' -> ') + tweakPath(out, error.schemaPath));
	}
	else {
		out.writeln(prefix + indent + tweakPath(out, error.schemaPath));
	}

	if ((typeof parentPath !== 'string' || parentPath !== error.dataPath)) {
		out.writeln(prefix + indent + out.error(' > ') + valueType(value) + out.error(' -> ') + valueStrim(value));
		if (error.dataPath !== '') {
			out.writeln(prefix + indent + out.error(' > ') + tweakPath(out, error.dataPath));
		}
		else {
			//out.writeln(prefix + indent + out.error(' > ') + '<root>');
		}
	}

	if (error.subErrors) {
		error.subErrors.some(function (sub) {
			// let's go deeper
			reportError(out, ctx, sub, indent, prefix + indent, error.dataPath);
		});
	}
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
		failed.some(function (ctx, i) {
			assertContext(ctx);

			reportFailed(out, ctx, indent);

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
		out.writeln(out.success('>> ') + 'tv4 ' + out.success('validated ' + passed.length) + ' of ' + out.success(total + ' ' + pluralise('value', total)) + '\n');
	}

	return out;
}

module.exports = {
	getContext: getContext,

	extractSchemaLabel: extractSchemaLabel,
	extractCTXLabel: extractCTXLabel,

	reportResult: reportResult,
	reportSuccess: reportSuccess,
	reportFailed: reportFailed,
	reportError: reportError,
	reportMissing: reportMissing,
	reportBulk: reportBulk
};
