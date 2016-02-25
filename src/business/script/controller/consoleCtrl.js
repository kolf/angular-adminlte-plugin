let ConsoleCtrl = function ($scope, $state) {
  let vm = $scope;
  let globals = {
    stateAndMenus: {}
  };
  vm.formData = {};
  vm.menus = [{
    name: '概览',
    state: 'Console.Portal',
    clazz: 'fa fa-dashboard',
    o: 0
  }, {
    name: '组件',
    clazz: 'fa fa-circle',
    o: 0
  }];
  init();
  console.info(vm.menus);

  function reCfgMenus(menus, parent, level) {
    menus.forEach(function (v) {
      var child = v.children;
      if (Array.isArray(child)) {
        reCfgMenus(child, v, level + 1);
      }
      v.parent = parent;
      v.level = level;
    });
  }
    
  //router state与菜单映射关系
  function bulidStateAndMenuInfo(menus, result) {
    result = result || {};
    menus.forEach(function (v) {
      //如出现重复state则  throw error
      if (result[v.state]) {
        throw new Error(v.state + ' state is already exists');
      }

      if (typeof v.state === 'string') {
        result[v.state] = v;
      }

      //关系
      if (Array.isArray(v.relation)) {
        v.relation.forEach(function (item) {
          result[item] = v;
        })
      }

      if (Array.isArray(v.children)) {
        bulidStateAndMenuInfo(v.children, result);
      }
    });
  }

  function selectedMenu(stateName) {
    var menu;
    vm.formData.selectedMenu1 = null;
    vm.formData.selectedMenu2 = null;
    vm.formData.selectedMenu3 = null;

    if (stateName) {
      menu = globals.stateAndMenus[stateName];
      while (menu) {
        vm.formData['selectedMenu' + menu.level] = menu;
        menu = menu.parent;
      }
    }
  }

  function locateMenu(state) {
    selectedMenu(state.name);
  }

  function init() {
    reCfgMenus(vm.menus, null, 1);
    bulidStateAndMenuInfo(vm.menus, globals.stateAndMenus);
    locateMenu($state.current);

    vm.now = new Date;
  }
}

ConsoleCtrl.$injector = ['$scope', '$state'];
export default app => app.controller('ConsoleCtrl', ConsoleCtrl);