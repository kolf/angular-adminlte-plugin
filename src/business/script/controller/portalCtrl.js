import content from '../../../../README.md';

let PortalCtrl = function($scope) {
  let vm = $scope;
  vm.mdContent = content;
}

PortalCtrl.$inject = ['$scope'];

export default app => app.controller('PortalCtrl', PortalCtrl);