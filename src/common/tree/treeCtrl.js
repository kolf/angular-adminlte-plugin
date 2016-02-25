export default class Tree {
  constructor() {
    this.isTreeNode = true;
    this.getRoot = function () {
      var pointer = this;
      var parent = pointer.$parent;
      while (parent.isTreeNode) {
        pointer = parent;
        parent = parent.$parent;
      }

      return pointer;
    };

    this.state = function (node) {
      if (node.children && node.children.length > 0) {
        if (node.$collapsed) {
          return "fa fa-caret-right";
        } else {
          return "fa fa-caret-down";
        }
      } else {
        return "fa";
      }
    };

    this.type = function (node) {
      if (node.children && node.children.length > 0) {
        if (node.$collapsed) {
          return "fa fa-folder";
        } else {
          return "fa fa-folder-open";
        }
      } else {
        return "fa fa-leaf";
      }
    };

    this.select = function (node) {
      if (node != this.selectedNode) {
        var root = this.getRoot();
        if (root.selectedNode) {
          root.selectedNode.$selected = false;
        }
        node.$selected = true;

        root.selectedNode = node;

        var evt = {
          newNode: node,
          oldNode: this.selectedNode,
          treeId: root.treeId
        };

        root.$emit("sn.controls.tree:selectedNodeChanged", evt);
      }
    };

    this.itemClick = function (node) {
      this.select(node);
    };

    this.itemCheck = function (node) {
      this.$emit("sn.controls.tree:itemChecked", node, 'itemCheck');
    };

    this.$on("sn.controls.tree:itemChecked", function (e, item) {
      item && checkChildren(item);

      if (this.treeData) {
        this.treeData.forEach(function (node) {
          if (node.children) {
            var checkedLength = node.children.filter(function (it) {
              return it.checked;
            }).length;

            if (checkedLength == node.children.length) {
              node.checked = true;
            } else if (checkedLength == 0) {
              node.checked = false;
            } else {
              node.checked = null;
            }
          }
        });
      }
    });

    this.iconClick = function (node) {
      node.$collapsed = !node.$collapsed;

      var evt = {
        currentNode: node
      };
      var root = this.getRoot();
      root.$emit("sn.controls.tree:nodeIconClicked", evt);
    };
  }

  checkChildren(node) {
    if (node.children) {
      node.children.forEach(function (it) {
        it.checked = node.checked;
        Tree.checkChildren(it);
      });
    }
  }
}