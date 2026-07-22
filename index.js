'use strict';

module.exports = (api) => {
  api.assertVersion('^7.0.0 || ^8.0.0');
  const t = api.types;

  const contextTemplate = api.template.smart(
    `(function () {
      function req() {}
      req.keys = function () { return []; }
      req.resolve = function () {};
      return req;
    }())`);

  return {
    name: 'transform-require-context',
    visitor: {
      MemberExpression(path) {
        const node = path.node;
        if (t.isCallExpression(path.parent) &&
          t.isIdentifier(node.object, { name: 'require' }) &&
          t.isIdentifier(node.property, { name: 'context' }) &&
          !path.scope.hasOwnBinding('require')) {
          path.parentPath.replaceWith(contextTemplate());
        }
      }
    }
  }
};