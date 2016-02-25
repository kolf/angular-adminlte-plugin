import angular from 'angular';
import core from './core';
import tree from './tree/tree';
import markdown from './markdown/markdown';
import dropdown from './dropdown/dropdown';

let app = angular.module("sn.common", []);

function injectService(app, ...serviceList) {
  serviceList.forEach(service => {
    service(app);
  });
}

injectService(app, core, tree, markdown, dropdown);

export default app;