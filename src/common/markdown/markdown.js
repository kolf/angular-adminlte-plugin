import './markdown.css';
import marked from 'marked';

export default app => {
  app.directive("markdown", [function () {
    return {
      restrict: "AE",
      scope: {
        content: '=',
        option: '='
      },
      link: function (scope, element, attrs) {
        marked.setOptions(scope.option);
        if (scope.content) {
          scope.$watch('content', () => {
            // console.info(marked);
            element.html(marked((scope.content || '').toString()));
          });
        } else {
          element.html(marked(element.html().replace(/&gt;/g, '>')));
        }
      }
    };
  }])
}
