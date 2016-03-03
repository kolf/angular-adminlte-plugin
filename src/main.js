import "../node_modules/admin-lte/bootstrap/css/bootstrap.css";
import "../node_modules/admin-lte/dist/css/AdminLTE.css";
import "../node_modules/admin-lte/dist/css/skins/_all-skins.css";
import "../node_modules/font-awesome/css/font-awesome.css";
import "./business/style/basic-style.css";

import angular from "angular";

import snCommon from "./common/snCommon";

import appConfiguration from './config/config';
import appRouter from './config/router';
import appControler from './business/script/controller/controller';

let app = angular.module('app', ['ui.router', 'ngSanitize', snCommon.name]);

Mock.mockjax(app);

appConfiguration(app);
appRouter(app);
appControler(app);

app.run(['$state', '$rootScope',
  function ($state, $rootScope) {
  }
]);

export default app;
