'use strict';

const babel = require('babel-core');
const plugin = require('../');

test(`doesn't transform require.context property`, () => {
  const input = `
    const context = require.context;
  `;
  const {code} = babel.transform(input, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});

test(`transforms require.context() call`, () => {
  const input = `
    const context = require.context('components', true, /\\.html$/);
  `;
  const {code} = babel.transform(input, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});

test(`transforms require.context() result`, () => {
  const input = `
    var modules = requireAll(require.context("./spec", true, /^\\.\\/.*\\.js$/));
  `;
  const {code} = babel.transform(input, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});

test(`doesn't transform local require`, () => {
  const input = `
    function test(require) {
      const context = require.context('foo', false);
    }
  `;
  const {code} = babel.transform(input, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});