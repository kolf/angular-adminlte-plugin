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
    .state('Console.Component.Modal', {
      url: '/component/modal',
      templateUrl: 'business/template/component/modal/modal.html',
      controller: 'ModalCtrl'
    })
    .state('Console.Component.Preview', {
      url: '/component/preview',
      templateUrl: 'business/template/component/preview.html',
      controller: 'PreviewCtrl'
    })
    .state('Console.Component.Echarts', {
      url: '/component/echarts',
      templateUrl: 'business/template/component/echarts.html',
      controller: 'EchartsCtrl'
    })
    .state('Console.Component.DateRangePicker', {
      url: '/component/date-range-picker',
      templateUrl: 'business/template/component/dateRangePicker.html',
      controller: 'DateRangePickerCtrl'
    })
    .state('Console.Component.InputMask', {
      url: '/component/input-mask',
      templateUrl: 'business/template/component/inputMask.html',
      controller: 'InputMaskCtrl'
    })
    .state('Console.Component.Select2', {
      url: '/component/select2',
      templateUrl: 'business/template/component/select2.html',
      controller: 'Select2Ctrl'
    })
    .state('Console.Component.OtherComponents', {
      url: '/component/other-components',
      templateUrl: 'business/template/component/otherComponents.html',
      controller: 'OtherComponentsCtrl'
    })
    .state('Console.Component.OtherServices', {
      url: '/component/other-services',
      templateUrl: 'business/template/component/otherServices.html',
      controller: 'OtherServicesCtrl'
    })
    ;
  }]);
}