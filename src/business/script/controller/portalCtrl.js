let PortalCtrl = function($scope) {
  let vm = $scope;
  vm.name = 123123;
}

PortalCtrl.$inject = ['$scope'];

export default app => app.controller('PortalCtrl', PortalCtrl);