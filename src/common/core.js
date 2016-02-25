export default app => {
  app.service('EventBus', () => {
    var eventMap = {};
    return {
      on: function (eventType, handler) {
        //multiple event listener
        if (!eventMap[eventType]) {
          eventMap[eventType] = [];
        }
        eventMap[eventType].push(handler);
      },

      off: function (eventType, handler) {
        for (var i = 0; i < eventMap[eventType].length; i++) {
          if (eventMap[eventType][i] === handler) {
            eventMap[eventType].splice(i, 1);
            break;
          }
        }
      },

      fire: function (event) {
        var eventType = event.type;
        if (eventMap[eventType]) {
          for (var i = 0; i < eventMap[eventType].length; i++) {
            eventMap[eventType][i](event);
          }
        }
      }
    };
  });

  app.service("LazyLoader", ["$q", function ($q) {
    var createdScripts = {}; //是否已创建script标签
    var pendingScripts = {}; //哪些处于加载过程中

    var loader = {
      load: function (url) {
        var deferred = $q.defer();

        if (!createdScripts[url]) {
          var script = document.createElement('script');
          script.src = encodeURI(url);

          script.onload = function () {
            if (pendingScripts[url]) {
              for (var i = 0; i < pendingScripts[url].length; i++) {
                pendingScripts[url][i].deferred && pendingScripts[url][i].deferred.resolve();
                pendingScripts[url][i].callback && pendingScripts[url][i].callback();
              }
              delete pendingScripts[url];
            }
          };

          createdScripts[url] = script;
          document.body.appendChild(script);

          if (!pendingScripts[url]) {
            pendingScripts[url] = [];
          }
          pendingScripts[url].push({
            deferred: deferred
          });
        } else if (pendingScripts[url]) {
          pendingScripts[url].push({
            deferred: deferred
          });
        } else {
          deferred.resolve();
        }

        return deferred.promise;
      },
      loadArr: function (arr) {
        var deferred = $q.defer();
        var counter = 0;

        function checkAll() {
          if (counter == arr.length) {
            deferred.resolve();
          }
        }

        for (var j = 0; j < arr.length; j++) {
          var url = arr[j];
          if (!createdScripts[url]) {
            var script = document.createElement('script');
            script.src = encodeURI(url);

            script.onload = function () {
              //这段是唯一需要关注pendingScripts的，因为你是顺带帮别人加载了代码，对你自己并无本质帮助
              if (pendingScripts[url]) {
                for (var i = 0; i < pendingScripts[url].length; i++) {
                  pendingScripts[url][i].deferred && pendingScripts[url][i].deferred.resolve();
                  pendingScripts[url][i].callback && pendingScripts[url][i].callback();
                }
                delete pendingScripts[url];
              }

              counter++;
              checkAll();
            };

            createdScripts[url] = script;
            document.body.appendChild(script);

            if (!pendingScripts[url]) {
              pendingScripts[url] = [];
            }
            pendingScripts[url].push({
              callback: checkAll
            });
          } else if (pendingScripts[url]) {
            //这里很麻烦啊，要是你想加载的js被别人顺带加载了，怎么办？
            pendingScripts[url].push({
              callback: checkAll
            });
          } else {
            checkAll();
          }
        }

        return deferred.promise;
      },
      loadQueue: function (arr) {
        var deferred = $q.defer();

        loadStep(0);

        function loadStep(index) {
          if (index == arr.length) {
            deferred.resolve();
          } else {
            loader.load(arr[index]).then(function () {
              loadStep(index + 1);
            });
          }
        }

        return deferred.promise;
      }
    };

    return loader;
  }]);

  app.service("LoginService", [function () {
    /* passport相关的东西 */
    var loginCallbackStack = [];
    var intervalVar;
    var currentLocation;

    var config = {
      base: "/dcs-web/",
      loginTheme: "dcs_pop"
    };

    function popupLoginContainer() {
      if (typeof intervalVar == 'undefined') {
        currentLocation = window.location.href;
        var src = ((typeof config.successCallbackUrl == 'undefined') ?
          (config.base + "popupLoginSuccess?") : config.successCallbackUrl) + "topLocation=" + encodeURIComponent(currentLocation) + "&loginTheme=" + config.loginTheme;

        document.getElementById('modalOverlay').style.display = 'block';
        document.getElementById('modalContainer').style.display = 'block';
        document.getElementById("iframeLogin").src = src;

        intervalVar = window.setInterval(checkMsgFromLoginIframe, 200);
      }
    }

    function resizeContainer(widthAndHeight) {
      //        document.getElementById("modalOverlay").style.display = "block";
      var value = widthAndHeight.split(",");
      var width = value[0];
      var height = value[1];
      var loginIframe = document.getElementById("iframeLogin");
      loginIframe.style.width = width + 'px';
      loginIframe.style.height = height + 'px';
      loginIframe.style.marginLeft = -width / 2 + 'px';
      loginIframe.style.marginTop = -height / 2 + 'px';
    }

    function closeContainer() {
      document.getElementById('modalOverlay').style.display = 'none';
      document.getElementById('modalContainer').style.display = 'none';
      document.getElementById("iframeLogin").src = '';
      window.location.href = (currentLocation.indexOf('#') == -1) ? currentLocation + "#unknown" : currentLocation;
      clearInterval(intervalVar);
      intervalVar = undefined;
    }

    function loginSuccess() {
      closeContainer();
      dequeue();
    }

    function popupClose() {
      closeContainer();
      reject();
    }

    function checkMsgFromLoginIframe() {
      var newHash = window.location.hash;
      if (newHash.length > 1) {
        var value = newHash.split('#');
        var params = value[1].split(':');
        switch (params[0]) {
          case 'resize':
            resizeContainer(params[1]);
            break;
          case 'close':
            closeContainer();
            break;
          case 'loginSuccess':
            loginSuccess();
            break;
          default:
            break;
        }
      }
    }

    function enqueue(resolve, reject) {
      loginCallbackStack.push({
        resolve: resolve,
        reject: reject
      });
    }

    function dequeue() {
      // 这里面还需要修改
      var callbacks = loginCallbackStack.pop() || {};
      if (callbacks.resolve) {
        callbacks.resolve();
      }
    }

    function reject() {
      var callbacks = loginCallbackStack.pop() || {};
      if (callbacks.reject) {
        callbacks.reject();
      }
    }

    return {
      checkMsgFromLoginIframe: checkMsgFromLoginIframe,
      closeContainer: closeContainer,
      loginSuccess: loginSuccess,
      resizeContainer: resizeContainer,
      popupLoginContainer: popupLoginContainer,
      enqueue: enqueue,
      config: config,
      //add hw 2015-06-30
      popupClose: popupClose
    };
  }]);

  app.service("HttpService", ["$http", "$q", "$document", "$location",
    "AlertService", "LoginService", "EventBus", "baseUrl", "ErrorHandle",
    function ($http, $q, $document, $location, AlertService, LoginService, EventBus, baseUrl, ErrorHandle) {
      var loginUrl = LoginService.config.base + 'authStatus?callback=JSON_CALLBACK&_t=' + (+new Date());

      function busy() {
        document.body.style.cssText = "cursor: progress !important";
      }

      function idle() {
        document.body.style.cssText = "";
      }

      function sendRequest(url, params, method) {
        var defer = $q.defer();
        busy();

        $http[method](url, params).success(function (result) {
          idle();

          ErrorHandle.handle(result)
            .then(function (data) {
              defer.resolve(data);
            }, function (data) {
              defer.reject(data);
            });

          /*defer.resolve(result);
  
          // errCode为500时出错统一处理
          if(!!result.errorCode && result.errorCode == '500'){
              AlertService.alert({
                  title: "服务端异常",
                  content: '系统出了点小问题，请稍后重试！'
              });
              defer.reject(result);
          }else{
              defer.resolve(result);
          }*/
        }).error(function (reason, status) {
          idle();

          var errorContent = reason;
          if (reason != undefined && reason.errorresponse != undefined) {
            errorContent = reason.errorresponse.errortext;
          }

          if (status) {
            AlertService.alert({
              title: "服务端异常",
              content: '系统出了点小问题，请稍后重试！'
              //content: errorContent
            });
          }
          defer.reject(reason);
        });

        return defer.promise;
      }

      return {
        "get": function (url, param, option) {
          var defer = $q.defer();

          if (option && option.unrestricted) {
            sendRequest(baseUrl + url, { params: param }, "get").then(
              function (result) {
                defer.resolve(result);
              }
              , function (data) {
                defer.reject(data);
              });
          } else {
            $http.jsonp(loginUrl)
              .success(function (data) {
                if (data.hasLogin) {
                  sendRequest(baseUrl + url, { params: param }, "get").then(
                    function (result) {
                      defer.resolve(result);
                    }, function (data) {
                      defer.reject(data);
                    }
                    );
                } else {
                  LoginService.popupLoginContainer();
                  LoginService.enqueue(function () {
                    sendRequest(baseUrl + url, { params: param }, "get").then(
                      function (result) {
                        defer.resolve(result);
                      }, function (data) {
                        defer.reject(data);
                      }
                      );
                  }, function () {
                    defer.reject('close');
                  });
                }
              });
          }

          /*sendRequest(baseUrl + url, {
              params: param
            }, "get")
            .then(function(result) {
              defer.resolve(result);
            }, function(data) {
              defer.reject(data);
            });*/
          return defer.promise;
        },
        "post": function (url, param, option) {
          var defer = $q.defer();

          if (option && option.unrestricted) {
            sendRequest(baseUrl + url, param, "post").then(
              function (result) {
                defer.resolve(result);
              }, function (data) {
                defer.reject(data);
              }
              );
          } else {
            $http.jsonp(loginUrl)
              .success(function (data) {
                if (data.hasLogin) {
                  sendRequest(baseUrl + url, param, "post").then(
                    function (result) {
                      defer.resolve(result);
                    }, function (data) {
                      defer.reject(data);
                    }
                    );
                } else {
                  LoginService.popupLoginContainer();
                  LoginService.enqueue(function () {
                    sendRequest(baseUrl + url, param, "post").then(
                      function (result) {
                        defer.resolve(result);
                      }, function (data) {
                        defer.reject(data);
                      }
                      );
                  }, function () {
                    defer.reject('close');
                  });
                }
              });
          }
          /*sendRequest(baseUrl + url, param, "post").then(
            function(result) {
              defer.resolve(result);
            },
            function(data) {
              defer.reject(data);
            }
          );*/
          return defer.promise;
        }
      };
    }
  ]);
}