import {expect} from 'chai';
import {describe, it} from 'mocha';
import * as utils from '../lib/utils.js';

describe('utils', () => {
	describe('pluralise', () => {
		it('is a function', () => {
			expect(utils.pluralise).to.be.an.instanceOf(Function);
		});

		it('pluralises a word when number > 1', () => {
			const result = utils.pluralise('pig', 2);
			expect(result).to.equal('pigs');
		});

		it('keeps a word singular when number == 1', () => {
			const result = utils.pluralise('pig', 1);
			expect(result).to.equal('pig');
		});
	});

	describe('valueType', () => {
		it('correctly identifies an array', () => {
			const result = utils.valueType([]);
			expect(result).to.equal('array');
		});

		it('correctly identifies an object', () => {
			const result = utils.valueType({});
			expect(result).to.equal('object');
		});

		it('correctly identifies a string', () => {
			const result = utils.valueType('');
			expect(result).to.equal('string');
		});

		it('correctly identifies a number', () => {
			const result = utils.valueType(1);
			expect(result).to.equal('number');
		});
	});
});
