import ConsoleCtrl from './consoleCtrl';
import RootCtrl from './rootCtrl';

function injectCtrl(app, ...ctrlList){
  ctrlList.forEach(item => {app.controller(item.name, item); 
  console.log(item.name)});
}

export default app => {
  injectCtrl(app, ConsoleCtrl, RootCtrl);
}