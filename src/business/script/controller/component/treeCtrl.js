let TreeCtrl = function($scope) {
  let vm = $scope;
  vm.treeData = [
    {name: 'node1'},
    {name: 'node2'},
    {name: 'node3', children: [{name: 'node31'}, {name: 'node32'}]}
  ]
}

TreeCtrl.$inject = ['$scope'];

export default app => app.controller('TreeCtrl', TreeCtrl);