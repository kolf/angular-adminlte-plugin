import angular from 'angular';
import core from './core';
import tree from './tree/tree';
import markdown from './markdown/markdown';
import dropdown from './dropdown/dropdown';
import modal from './modal/modal';
import preview from './preview/preview';
import echarts from './echarts/echarts';
import dateRangePicker from './dateRangePicker/dateRangePicker';

let app = angular.module("sn.common", []);

function injectService(app, ...serviceList) {
  serviceList.forEach(service => {
    service(app);
  });
}

injectService(app, core, tree, markdown, dropdown, modal, preview, echarts, dateRangePicker);

export default app;