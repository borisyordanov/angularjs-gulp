'use strict';

(function () {
	'use strict';

	angular.module('MMApp', ['ui.router', 'MMApp.repos', 'MMApp.contributors']);

	angular.element(document).ready(function () {
		// angular.bootstrap(document, ['MMApp']);
	});
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.repos', []);
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.contributors', []);
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').component('mmApp', {
    bindings: {},
    controller: MmAppController,
    templateUrl: 'app/app.component.html'
  });

  /* @ngInject */
  function MmAppController($state, repoService) {
    var $ctrl = this;
    $ctrl.$onInit = function () {};
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').config(interceptorConfig).config(restApiConfig).config(routingConfig).run(appRun);

  /* @ngInject */
  function interceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }

  /* @ngInject */
  function restApiConfig(restApiServiceProvider) {
    restApiServiceProvider.setApiPrefix('https://api.github.com');
  }

  /* @ngInject */
  function routingConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/repos');

    $stateProvider.state('repos', {
      url: '/repos',
      template: '<mm-repos></mm-repos>'
    }).state('repos.contributors', {
      url: '/contributors',
      template: '<mm-contributors repo="$ctrl.activeRepo" on-close="$ctrl.closeRepoData()"></mm-contributors>'
    });
  }

  /* @ngInject */
  function appRun() {}
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').component('mmHeader', {
    bindings: {},
    controller: MmHeaderController,
    template: '\n        <header>\n          <mm-logo></mm-logo>\n        </header>\n      '
  });

  /* @ngInject */
  function MmHeaderController() {
    var $ctrl = this;

    $ctrl.$onInit = function () {};
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.repos').factory('RepoModel', RepoModel);

  /* @ngInject */
  function RepoModel() {
    function Repo(rawData) {
      this.id = rawData.id;
      this.name = rawData.name;
      this.full_name = rawData.full_name;
      this.owner = rawData.owner;
    }

    return Repo;
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.repos').service('repoService', repoService);

  /* @ngInject */
  function repoService(restApiService, RepoModel) {
    this.get = get;

    ////////////////
    function get(apiName, params, headers) {
      return restApiService.get(apiName, {
        params: params,
        headers: headers
      }).then(function (res) {
        return res.data.filter(function (repo) {
          return new RepoModel(repo);
        });
      }).catch(function (err) {
        console.error(err);
      });
    }
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.repos').component('mmRepos', {
    bindings: {},
    controller: MmReposController,
    templateUrl: 'app/repos/repos.component.html'
  });

  /* @ngInject */
  function MmReposController($state, repoService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.repos = [];
      $ctrl.activeRepo = null;

      repoService.get('/orgs/angular/repos').then(function (res) {
        $ctrl.repos = res;
      }).catch(function (err) {
        console.error(err);
      });
    };

    $ctrl.openRepoData = function (repo) {
      $ctrl.activeRepo = repo;

      $state.go('repos.contributors');
    };

    $ctrl.closeRepoData = function () {
      $ctrl.activeRepo = null;
    };
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').directive('mmBackgroundImage', mmBackgroundImage);

  /* @ngInject */
  function mmBackgroundImage() {
    var directive = {
      link: mmBackgroundImageLink,
      restrict: 'A'
    };
    return directive;

    function mmBackgroundImageLink(scope, element, attrs) {
      attrs.$observe('mmBackgroundImage', function (value) {
        if (value) {
          element.css({
            'background-image': 'url(' + value + ')'
          });
        } else {
          element.removeAttr('style');
        }
      });
    }
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').component('mmCloseButton', {
    bindings: {
      onButtonClick: '&'
    },
    controller: MmCloseButtonController,
    template: '\n        <button type="button" class="mm-close-button" ng-click="$ctrl.onButtonClick()">\n          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 612.006 612.006" style="enable-background:new 0 0 612.006 612.006;" xml:space="preserve">\n            <g><g><g><g>\n              <path d="M423.23,437.955c-3.769,0-7.53-1.438-10.41-4.311L178.371,199.177c-5.748-5.747-5.748-15.068,0-20.815      c5.753-5.753,15.068-5.753,20.815,0l234.45,234.46c5.753,5.753,5.753,15.075,0,20.815      C430.762,436.518,426.999,437.955,423.23,437.955z" fill="#D80027"/>\n              <path d="M188.781,437.955c-3.769,0-7.531-1.438-10.411-4.311c-5.748-5.747-5.748-15.069,0-20.816l234.449-234.466      c5.753-5.753,15.068-5.753,20.815,0c5.753,5.747,5.753,15.068,0,20.815l-234.45,234.467      C196.313,436.518,192.544,437.955,188.781,437.955z" fill="#D80027"/>\n            </g>\n              <path d="M306.038,612.006v-14.721l-0.023,14.721c-168.722,0-306-137.271-306.012-306C0.003,137.272,137.275,0,306.003,0     c168.729,0,306,137.272,306,306.006C612.003,474.74,474.743,612.006,306.038,612.006z M306.003,29.442     c-152.5,0-276.558,124.064-276.558,276.563c0.012,152.487,124.076,276.558,276.569,276.558h0.023     c152.47,0,276.521-124.059,276.521-276.558C582.561,153.506,458.496,29.442,306.003,29.442z" fill="#D80027"/>\n            </g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>\n          </svg>\n        </button>\n      '
  });

  /* @ngInject */
  function MmCloseButtonController() {
    var $ctrl = this;

    $ctrl.$onInit = onInit;
    ////////////////

    function onInit() {}
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').factory('httpInterceptor', httpInterceptor);

  /* @ngInject */
  function httpInterceptor($q, $document) {
    return {
      // optional method
      'request': function request(req) {
        // do something on success
        return req;
      },

      // optional method
      'requestError': function requestError(rejection) {
        // do something on error
        return $q.reject(rejection);
      },

      // optional method
      'response': function response(res) {
        // do something on success
        return res;
      },

      // optional method
      'responseError': function responseError(rejection) {
        // do something on error
        return $q.reject(rejection);
      }
    };
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').provider('restApiService', restApiService);

  /* @ngInject */
  function restApiService() {
    var _apiPrefix = '';

    //
    // Provider methods:
    //
    this.$get = providerMethods;

    /* @ngInject */
    function providerMethods($http) {
      return {
        get: function get(apiName, params, headers) {
          return $http.get(_apiPrefix + apiName, { params: params, headers: headers });
        }
      };
    }

    //
    // Config methods:
    //

    this.setApiPrefix = function (apiPrefix) {
      _apiPrefix = apiPrefix;
    };
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp', ['ui.router', 'MMApp.repos', 'MMApp.contributors']);

  angular.element(document).ready(function () {
    // angular.bootstrap(document, ['MMApp']);
  });
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.repos', []);
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.contributors', []);
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').component('mmApp', {
    bindings: {},
    controller: MmAppController,
    templateUrl: 'app/app.component.html'
  });

  /* @ngInject */
  function MmAppController($state, repoService) {
    var $ctrl = this;
    $ctrl.$onInit = function () {};
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').config(interceptorConfig).config(restApiConfig).config(routingConfig).run(appRun);

  /* @ngInject */
  function interceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }

  /* @ngInject */
  function restApiConfig(restApiServiceProvider) {
    restApiServiceProvider.setApiPrefix('https://api.github.com');
  }

  /* @ngInject */
  function routingConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/repos');

    $stateProvider.state('repos', {
      url: '/repos',
      template: '<mm-repos></mm-repos>'
    }).state('repos.contributors', {
      url: '/contributors',
      template: '<mm-contributors repo="$ctrl.activeRepo" on-close="$ctrl.closeRepoData()"></mm-contributors>'
    });
  }

  /* @ngInject */
  function appRun() {}
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').component('mmHeader', {
    bindings: {},
    controller: MmHeaderController,
    template: '\n        <header>\n          <mm-logo></mm-logo>\n        </header>\n      '
  });

  /* @ngInject */
  function MmHeaderController() {
    var $ctrl = this;

    $ctrl.$onInit = function () {};
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').directive('mmBackgroundImage', mmBackgroundImage);

  /* @ngInject */
  function mmBackgroundImage() {
    var directive = {
      link: mmBackgroundImageLink,
      restrict: 'A'
    };
    return directive;

    function mmBackgroundImageLink(scope, element, attrs) {
      attrs.$observe('mmBackgroundImage', function (value) {
        if (value) {
          element.css({
            'background-image': 'url(' + value + ')'
          });
        } else {
          element.removeAttr('style');
        }
      });
    }
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').component('mmCloseButton', {
    bindings: {
      onButtonClick: '&'
    },
    controller: MmCloseButtonController,
    template: '\n        <button type="button" class="mm-close-button" ng-click="$ctrl.onButtonClick()">\n          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 612.006 612.006" style="enable-background:new 0 0 612.006 612.006;" xml:space="preserve">\n            <g><g><g><g>\n              <path d="M423.23,437.955c-3.769,0-7.53-1.438-10.41-4.311L178.371,199.177c-5.748-5.747-5.748-15.068,0-20.815      c5.753-5.753,15.068-5.753,20.815,0l234.45,234.46c5.753,5.753,5.753,15.075,0,20.815      C430.762,436.518,426.999,437.955,423.23,437.955z" fill="#D80027"/>\n              <path d="M188.781,437.955c-3.769,0-7.531-1.438-10.411-4.311c-5.748-5.747-5.748-15.069,0-20.816l234.449-234.466      c5.753-5.753,15.068-5.753,20.815,0c5.753,5.747,5.753,15.068,0,20.815l-234.45,234.467      C196.313,436.518,192.544,437.955,188.781,437.955z" fill="#D80027"/>\n            </g>\n              <path d="M306.038,612.006v-14.721l-0.023,14.721c-168.722,0-306-137.271-306.012-306C0.003,137.272,137.275,0,306.003,0     c168.729,0,306,137.272,306,306.006C612.003,474.74,474.743,612.006,306.038,612.006z M306.003,29.442     c-152.5,0-276.558,124.064-276.558,276.563c0.012,152.487,124.076,276.558,276.569,276.558h0.023     c152.47,0,276.521-124.059,276.521-276.558C582.561,153.506,458.496,29.442,306.003,29.442z" fill="#D80027"/>\n            </g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>\n          </svg>\n        </button>\n      '
  });

  /* @ngInject */
  function MmCloseButtonController() {
    var $ctrl = this;

    $ctrl.$onInit = onInit;
    ////////////////

    function onInit() {}
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').factory('httpInterceptor', httpInterceptor);

  /* @ngInject */
  function httpInterceptor($q, $document) {
    return {
      // optional method
      'request': function request(req) {
        // do something on success
        return req;
      },

      // optional method
      'requestError': function requestError(rejection) {
        // do something on error
        return $q.reject(rejection);
      },

      // optional method
      'response': function response(res) {
        // do something on success
        return res;
      },

      // optional method
      'responseError': function responseError(rejection) {
        // do something on error
        return $q.reject(rejection);
      }
    };
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').provider('restApiService', restApiService);

  /* @ngInject */
  function restApiService() {
    var _apiPrefix = '';

    //
    // Provider methods:
    //
    this.$get = providerMethods;

    /* @ngInject */
    function providerMethods($http) {
      return {
        get: function get(apiName, params, headers) {
          return $http.get(_apiPrefix + apiName, { params: params, headers: headers });
        }
      };
    }

    //
    // Config methods:
    //

    this.setApiPrefix = function (apiPrefix) {
      _apiPrefix = apiPrefix;
    };
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.repos').factory('RepoModel', RepoModel);

  /* @ngInject */
  function RepoModel() {
    function Repo(rawData) {
      this.id = rawData.id;
      this.name = rawData.name;
      this.full_name = rawData.full_name;
      this.owner = rawData.owner;
    }

    return Repo;
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.repos').service('repoService', repoService);

  /* @ngInject */
  function repoService(restApiService, RepoModel) {
    this.get = get;

    ////////////////
    function get(apiName, params, headers) {
      return restApiService.get(apiName, {
        params: params,
        headers: headers
      }).then(function (res) {
        return res.data.filter(function (repo) {
          return new RepoModel(repo);
        });
      }).catch(function (err) {
        console.error(err);
      });
    }
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.repos').component('mmRepos', {
    bindings: {},
    controller: MmReposController,
    templateUrl: 'app/repos/repos.component.html'
  });

  /* @ngInject */
  function MmReposController($state, repoService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.repos = [];
      $ctrl.activeRepo = null;

      repoService.get('/orgs/angular/repos').then(function (res) {
        $ctrl.repos = res;
      }).catch(function (err) {
        console.error(err);
      });
    };

    $ctrl.openRepoData = function (repo) {
      $ctrl.activeRepo = repo;

      $state.go('repos.contributors');
    };

    $ctrl.closeRepoData = function () {
      $ctrl.activeRepo = null;
    };
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').component('mmLogo', {
    bindings: {},
    controller: MmLogoController,
    template: '\n        <svg aria-hidden="true" height="32" version="1.1" viewBox="0 0 16 16" width="32">\n          <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>\n        </svg>\n      '
  });

  /* @ngInject */
  function MmLogoController() {
    var $ctrl = this;

    $ctrl.$onInit = function () {};
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').factory('ContributorModel', ContributorModel);

  /* @ngInject */
  function ContributorModel() {
    function Contributor(rawData) {
      this.avatar_url = rawData.avatar_url;
    }

    return Contributor;
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').service('contributorService', contributorService);

  /* @ngInject */
  function contributorService(restApiService, ContributorModel) {
    this.get = get;

    ////////////////
    function get(apiName, params, headers) {
      return restApiService.get('/repos/' + apiName + '/contributors', { params: params, headers: headers }).then(function (res) {
        return res.data.filter(function (contributors) {
          return new ContributorModel(contributors);
        });
      }).catch(function (err) {
        console.error(err);
      });
    }
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.contributors').component('mmContributors', {
    bindings: {
      repo: '<',
      onClose: '&'
    },
    controller: MmContributorsController,
    templateUrl: 'app/repos/contributors/contributors.component.html'
  });

  /* @ngInject */
  function MmContributorsController($state, contributorService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.contributors = [];
    };

    $ctrl.$onChanges = function (obj) {
      if (obj.repo && $ctrl.repo) {
        contributorService.get($ctrl.repo.full_name).then(function (contributors) {
          $ctrl.contributors = contributors;
        }).catch(function (err) {
          console.error(err);
        });
      }
    };

    $ctrl.onSidebarClose = function () {
      $ctrl.onClose();
      $state.go('^');
    };
  }
})();
"use strict";
!function () {
  angular.module("MMApp", ["ui.router", "MMApp.repos", "MMApp.contributors"]), angular.element(document).ready(function () {});
}(), function () {
  angular.module("MMApp.repos", []);
}(), function () {
  angular.module("MMApp.contributors", []);
}(), function () {
  function n(n, t) {
    this.$onInit = function () {};
  }angular.module("MMApp").component("mmApp", { bindings: {}, controller: n, templateUrl: "app/app.component.html" });
}(), function () {
  function n(n) {
    n.interceptors.push("httpInterceptor");
  }function t(n) {
    n.setApiPrefix("https://api.github.com");
  }function o(n, t) {
    n.otherwise("/repos"), t.state("repos", { url: "/repos", template: "<mm-repos></mm-repos>" }).state("repos.contributors", { url: "/contributors", template: '<mm-contributors repo="$ctrl.activeRepo" on-close="$ctrl.closeRepoData()"></mm-contributors>' });
  }function e() {}angular.module("MMApp").config(n).config(t).config(o).run(e);
}(), function () {
  function n() {
    this.$onInit = function () {};
  }angular.module("MMApp").component("mmHeader", { bindings: {}, controller: n, template: "\n        <header>\n          <mm-logo></mm-logo>\n        </header>\n      " });
}(), function () {
  function n() {
    function n(n, t, o) {
      o.$observe("mmBackgroundImage", function (n) {
        n ? t.css({ "background-image": "url(" + n + ")" }) : t.removeAttr("style");
      });
    }return { link: n, restrict: "A" };
  }angular.module("MMApp").directive("mmBackgroundImage", n);
}(), function () {
  function n() {
    function n() {}this.$onInit = n;
  }angular.module("MMApp").component("mmCloseButton", { bindings: { onButtonClick: "&" }, controller: n, template: '\n        <button type="button" class="mm-close-button" ng-click="$ctrl.onButtonClick()">\n          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 612.006 612.006" style="enable-background:new 0 0 612.006 612.006;" xml:space="preserve">\n            <g><g><g><g>\n              <path d="M423.23,437.955c-3.769,0-7.53-1.438-10.41-4.311L178.371,199.177c-5.748-5.747-5.748-15.068,0-20.815      c5.753-5.753,15.068-5.753,20.815,0l234.45,234.46c5.753,5.753,5.753,15.075,0,20.815      C430.762,436.518,426.999,437.955,423.23,437.955z" fill="#D80027"/>\n              <path d="M188.781,437.955c-3.769,0-7.531-1.438-10.411-4.311c-5.748-5.747-5.748-15.069,0-20.816l234.449-234.466      c5.753-5.753,15.068-5.753,20.815,0c5.753,5.747,5.753,15.068,0,20.815l-234.45,234.467      C196.313,436.518,192.544,437.955,188.781,437.955z" fill="#D80027"/>\n            </g>\n              <path d="M306.038,612.006v-14.721l-0.023,14.721c-168.722,0-306-137.271-306.012-306C0.003,137.272,137.275,0,306.003,0     c168.729,0,306,137.272,306,306.006C612.003,474.74,474.743,612.006,306.038,612.006z M306.003,29.442     c-152.5,0-276.558,124.064-276.558,276.563c0.012,152.487,124.076,276.558,276.569,276.558h0.023     c152.47,0,276.521-124.059,276.521-276.558C582.561,153.506,458.496,29.442,306.003,29.442z" fill="#D80027"/>\n            </g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>\n          </svg>\n        </button>\n      ' });
}(), function () {
  function n(n, t) {
    return { request: function request(n) {
        return n;
      }, requestError: function requestError(t) {
        return n.reject(t);
      }, response: function response(n) {
        return n;
      }, responseError: function responseError(t) {
        return n.reject(t);
      } };
  }angular.module("MMApp").factory("httpInterceptor", n);
}(), function () {
  function n() {
    function n(n) {
      return { get: function get(o, e, r) {
          return n.get(t + o, { params: e, headers: r });
        } };
    }var t = "";this.$get = n, this.setApiPrefix = function (n) {
      t = n;
    };
  }angular.module("MMApp").provider("restApiService", n);
}(), function () {
  function n() {
    function n(n) {
      this.id = n.id, this.name = n.name, this.full_name = n.full_name, this.owner = n.owner;
    }return n;
  }angular.module("MMApp.repos").factory("RepoModel", n);
}(), function () {
  function n(n, t) {
    function o(o, e, r) {
      return n.get(o, { params: e, headers: r }).then(function (n) {
        return n.data.filter(function (n) {
          return new t(n);
        });
      }).catch(function (n) {
        console.error(n);
      });
    }this.get = o;
  }angular.module("MMApp.repos").service("repoService", n);
}(), function () {
  function n(n, t) {
    var o = this;o.$onInit = function () {
      o.repos = [], o.activeRepo = null, t.get("/orgs/angular/repos").then(function (n) {
        o.repos = n;
      }).catch(function (n) {
        console.error(n);
      });
    }, o.openRepoData = function (t) {
      o.activeRepo = t, n.go("repos.contributors");
    }, o.closeRepoData = function () {
      o.activeRepo = null;
    };
  }angular.module("MMApp.repos").component("mmRepos", { bindings: {}, controller: n, templateUrl: "app/repos/repos.component.html" });
}(), function () {
  function n() {
    this.$onInit = function () {};
  }angular.module("MMApp").component("mmLogo", { bindings: {}, controller: n, template: '\n        <svg aria-hidden="true" height="32" version="1.1" viewBox="0 0 16 16" width="32">\n          <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>\n        </svg>\n      ' });
}(), function () {
  function n() {
    function n(n) {
      this.avatar_url = n.avatar_url;
    }return n;
  }angular.module("MMApp").factory("ContributorModel", n);
}(), function () {
  function n(n, t) {
    function o(o, e, r) {
      return n.get("/repos/" + o + "/contributors", { params: e, headers: r }).then(function (n) {
        return n.data.filter(function (n) {
          return new t(n);
        });
      }).catch(function (n) {
        console.error(n);
      });
    }this.get = o;
  }angular.module("MMApp").service("contributorService", n);
}(), function () {
  function n(n, t) {
    var o = this;o.$onInit = function () {
      o.contributors = [];
    }, o.$onChanges = function (n) {
      n.repo && o.repo && t.get(o.repo.full_name).then(function (n) {
        o.contributors = n;
      }).catch(function (n) {
        console.error(n);
      });
    }, o.onSidebarClose = function () {
      o.onClose(), n.go("^");
    };
  }angular.module("MMApp.contributors").component("mmContributors", { bindings: { repo: "<", onClose: "&" }, controller: n, templateUrl: "app/repos/contributors/contributors.component.html" });
}();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').component('mmLogo', {
    bindings: {},
    controller: MmLogoController,
    template: '\n        <svg aria-hidden="true" height="32" version="1.1" viewBox="0 0 16 16" width="32">\n          <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>\n        </svg>\n      '
  });

  /* @ngInject */
  function MmLogoController() {
    var $ctrl = this;

    $ctrl.$onInit = function () {};
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').factory('ContributorModel', ContributorModel);

  /* @ngInject */
  function ContributorModel() {
    function Contributor(rawData) {
      this.avatar_url = rawData.avatar_url;
    }

    return Contributor;
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp').service('contributorService', contributorService);

  /* @ngInject */
  function contributorService(restApiService, ContributorModel) {
    this.get = get;

    ////////////////
    function get(apiName, params, headers) {
      return restApiService.get('/repos/' + apiName + '/contributors', { params: params, headers: headers }).then(function (res) {
        return res.data.filter(function (contributors) {
          return new ContributorModel(contributors);
        });
      }).catch(function (err) {
        console.error(err);
      });
    }
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('MMApp.contributors').component('mmContributors', {
    bindings: {
      repo: '<',
      onClose: '&'
    },
    controller: MmContributorsController,
    templateUrl: 'app/repos/contributors/contributors.component.html'
  });

  /* @ngInject */
  function MmContributorsController($state, contributorService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.contributors = [];
    };

    $ctrl.$onChanges = function (obj) {
      if (obj.repo && $ctrl.repo) {
        contributorService.get($ctrl.repo.full_name).then(function (contributors) {
          $ctrl.contributors = contributors;
        }).catch(function (err) {
          console.error(err);
        });
      }
    };

    $ctrl.onSidebarClose = function () {
      $ctrl.onClose();
      $state.go('^');
    };
  }
})();