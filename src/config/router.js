export default app => {
  app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('Console', {
      // abstract: true,
      templateUrl: 'business/template/console.html',
      // template: '<div>123</div>',
      controller: 'ConsoleCtrl',
      url: '/'
    })
    ;
  }]);
}