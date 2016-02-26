export default app => {
  app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/portal');
    $stateProvider
    .state('Console', {
      abstract: true,
      templateUrl: 'business/template/console.html',
      controller: 'ConsoleCtrl',
    })
    .state('Console.Portal', {
      url: '/portal',
      templateUrl: 'business/template/portal.html',
      controller: 'PortalCtrl'
    })
    .state('Console.Component', {
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('Console.Component.Tree', {
      url: '/component/tree',
      templateUrl: 'business/template/component/tree.html',
      controller: 'TreeCtrl'
    })
    ;
  }]);
}