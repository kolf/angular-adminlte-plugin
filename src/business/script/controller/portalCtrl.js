import content from '../../../../README.md';

let PortalCtrl = function($scope) {
  let vm = $scope;
  vm.mdContent = content;
  console.info(content);
}

PortalCtrl.$inject = ['$scope'];

export default app => app.controller('PortalCtrl', PortalCtrl);