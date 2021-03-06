const vows = require('vows');
const assert = require('assert');
const chroma = require('../../src').default;

vows
	.describe('Some tests for chroma.valid')

	.addBatch({
		'valid color': {
			topic: chroma.valid('red'),
			'is true'(topic) { return assert(topic); },
		},
		'invalid color': {
			topic: chroma.valid('bread'),
			'is false'(topic) { return assert(!topic); },
		},
	})
	.export(module);
