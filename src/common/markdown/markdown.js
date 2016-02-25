import marked from 'marked';

export default app => {
  app.directive("markdown", [function() {
    return {
      restrict: "AE",
      scope: {
        content: '=',
        option: '='
      },
      link: function(scope, element, attrs) {
        marked.setOptions(scope.option);
        scope.$watch('markdown', () => {
          // console.info(marked);
          element.html(marked(scope.content.toString()));
        });
      }
    };
  }])
}
