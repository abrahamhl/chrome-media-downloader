import { test } from 'node:test';
import assert from 'node:assert';
import { cleanTitle } from './utils.js';

test('cleanTitle returns Img_ with timestamp if prompt is missing', () => {
    const result = cleanTitle(null);
    assert.match(result, /^Img_\d+$/);
});

test('cleanTitle returns Img_ with timestamp if prompt is empty string', () => {
    const result = cleanTitle('');
    assert.match(result, /^Img_\d+$/);
});

test('cleanTitle returns Img_ with timestamp if prompt contains "Sin prompt"', () => {
    const result = cleanTitle('Esto es Sin prompt detectado');
    assert.match(result, /^Img_\d+$/);
});

test('cleanTitle limits to 5 words and appends random number', () => {
    const result = cleanTitle('This is a very long prompt that should be truncated');
    assert.match(result, /^This-is-a-very-long_\d+$/);
});

test('cleanTitle removes special characters', () => {
    const result = cleanTitle('Hello @World! 123');
    assert.match(result, /^Hello-World-123_\d+$/);
});
