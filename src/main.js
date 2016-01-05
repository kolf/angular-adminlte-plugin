require("../node_modules/admin-lte/bootstrap/css/bootstrap.css");
require("../node_modules/admin-lte/dist/css/AdminLTE.css");
require("../node_modules/admin-lte/dist/css/skins/_all-skins.css");
require("../node_modules/font-awesome/css/font-awesome.css");
require("./style.css");

require("../node_modules/ui-router/release/angular-ui-router");

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

module.exports = app;
