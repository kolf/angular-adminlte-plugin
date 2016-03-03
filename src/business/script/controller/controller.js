import ConsoleCtrl from './consoleCtrl';
import RootCtrl from './rootCtrl';
import PortalCtrl from './portalCtrl';
import TreeCtrl from './component/treeCtrl';
import ModalCtrl from './component/modal/modalCtrl';
import DialogDemoCtrl from './component/modal/dialogDemoCtrl';
import EchartsCtrl from './component/echartsCtrl';
import DateRangePickerCtrl from './component/DateRangePickerCtrl';
import InputMaskCtrl from './component/InputMaskCtrl';
import Select2Ctrl from './component/Select2Ctrl';

function injectCtrl(app, ...ctrlList) {
  ctrlList.forEach(ctrl => ctrl(app));
}

export default app => {
  injectCtrl(app, ConsoleCtrl, RootCtrl, PortalCtrl, TreeCtrl, ModalCtrl, DialogDemoCtrl,
    EchartsCtrl, DateRangePickerCtrl, InputMaskCtrl, Select2Ctrl);
}