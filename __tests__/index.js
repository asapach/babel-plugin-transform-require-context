'use strict';

const babel = require('babel-core');
const plugin = require('../');

test('should not transform require.context property', () => {
  const input = `
    const context = require.context;
  `;
  const {code} = babel.transform(input, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});

test('should transform require.context() call', () => {
  const input = `
    const context = require.context('components', true, /\\.html$/);
  `;
  const {code} = babel.transform(input, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});

test('should not transform local require', () => {
  const input = `
    function test(require) {
      const context = require.context('foo', false);
    }
  `;
  const {code} = babel.transform(input, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});