import controller from './treeCtrl';
import treeTpl from './tree.html';
import checkboxTreeTpl from './checkboxTree.html';

export default app => {
  app.directive('snTree', function ($compile) {
    return {
      restrict: "E",
      scope: {
        treeData: "="
      },
      controller: controller,
      link: function (scope, element, attr) {
        scope.treeId = attr["treeId"];

        if (!scope.$parent.$isTreeNode) {
          scope.treeTpl = attr["treeTpl"] === 'checkboxTreeTpl' ? checkboxTreeTpl : treeTpl;
        }

        element.html(scope.getRoot().treeTpl);

        $compile(element.contents())(scope);
      }
    };
  });
}