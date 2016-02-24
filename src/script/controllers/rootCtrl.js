import * as app from 'main';
/*var RootController = function(){

};
var $inject = [];
RootController.$inject = $inject;*/
app.controller('RootController', [function(){
  var a = [1,2,3];
  a.forEach(item => console.info(item+1));
}]);
