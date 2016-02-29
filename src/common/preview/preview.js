import angular from 'angular';
import previewTmpl from './preview.html';

export default app => {
  app.service("PreviewService", ["$document", "$http", "$compile", "$rootScope",
    function ($document, $http, $compile, $rootScope) {
      var container;
      if (!document.getElementById("previewContainer")) {
        container = angular.element("<div class='sn-preview-container'>");
        $document.find("body").append(container);
      } else {
        container = angular.element(document.getElementById("previewContainer"));
      }

      var mask = angular.element('<div class="modal-backdrop fade in"></div>');

      $document.on("click", function (evt) {
        var src = evt.srcElement ? evt.srcElement : evt.target;
        var modal = container[0].querySelector('.modal-dialog');
        if (modal && !modal.contains(src)) {
          hide();
        }
      });

      function hide() {
        container.html("");
        mask.remove();
      }

      function showImages(url) {
        var pop = angular.element(previewTmpl);
        // $document.find("body").append(mask);
        // mask.css("z-index", 1200);
        pop.css("display", "block");
        pop.addClass("in");

        var scope = angular.extend($rootScope.$new(), {
          url: url
        });
        scope.close = function () {
          hide();
        };

        $compile(pop)(scope);
        container.prepend(pop);
      }
      return {
        preview: function (url, type) {
          switch (type.trim().toLowerCase()) {
            case "jpg":
            case "jpeg":
            case "bmp":
            case "gif":
            case "png":
            case "tiff":
              {
                showImages(url);
                break;
              }
          }
        }
      };
    }]);
}