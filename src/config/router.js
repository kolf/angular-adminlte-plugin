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
    ;
  }]);
}