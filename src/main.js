import "../node_modules/admin-lte/bootstrap/css/bootstrap.css";
import "../node_modules/admin-lte/dist/css/AdminLTE.css";
import "../node_modules/admin-lte/dist/css/skins/_all-skins.css";
import "../node_modules/font-awesome/css/font-awesome.css";
import "./style.css";

import "../node_modules/ui-router/release/angular-ui-router";

var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/portal');
    $stateProvider.state('Portal', {
      url: '/portal',
      template: '<div>portal</div>'
      // controller: require('./script/controllers/basicCtrl')
    });
  }
]);

app.run(['$state', '$rootScope', 
  function($state, $rootScope){
    // require('script/controllers/rootCtrl');
  }
]);

export default app;
