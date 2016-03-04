import content from '../../../../README.md';

let PortalCtrl = function($scope, $timeout) {
  let vm = $scope;
  vm.mdContent = content;
  $timeout( () => {
    vm.mdContent = "haha";
  }, 10000);
}

PortalCtrl.$inject = ['$scope', '$timeout'];

export default app => app.controller('PortalCtrl', PortalCtrl);