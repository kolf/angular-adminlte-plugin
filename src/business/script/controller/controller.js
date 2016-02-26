import ConsoleCtrl from './consoleCtrl';
import RootCtrl from './rootCtrl';
import PortalCtrl from './portalCtrl';
import TreeCtrl from './component/treeCtrl';

function injectCtrl(app, ...ctrlList){
  ctrlList.forEach(ctrl => ctrl(app));
}

export default app => {
  injectCtrl(app, ConsoleCtrl, RootCtrl, PortalCtrl, TreeCtrl);
}