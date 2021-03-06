/*
 * Bootstrap colors
 */

var primaryColor = "#337ab7";
var successColor = "#5cb85c";
var infoColor = "#5bc0de";
var warningColor = "#f0ad4e";
var dangerColor = "#d9534f";

var primaryLtColor = "#2865a8";
var successLtColor = "#d7eecf";
var infoLtColor = "#d1e8f4";
var warningLtColor = "#fbf7dc";
var dangerLtColor = "#efd6d6";

/*
 * Application
 */

var app = angular.module('peekaboo', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'smart-table',
  'ngFlash',
  'ngAnimate',
  'angular-click-outside',
  'chart.js'
])

app.controller('SidebarController', function($scope, $rootScope) {
  $scope.state = false;
});

app.directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                  if(newVal)
                  {
                    element.addClass('show'); 
                    return;
                  }
                  element.removeClass('show');
            });
        }
    };
});  

/*
 * Routes
 */

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when("/", {templateUrl: "partials/dashboard.html", controller: "PageCtrl", activeTab: "dashboard"})

    .when("/network", {templateUrl: "partials/network/interfaces.html", controller: "PageCtrl", activeTab: "network", sideActiveTab: "interfaces"})
    .when("/network/general", {templateUrl: "partials/network/general.html", controller: "PageCtrl", activeTab: "network", sideActiveTab: "general"})
    .when("/network/interfaces", {templateUrl: "partials/network/interfaces.html", controller: "PageCtrl", activeTab: "network", sideActiveTab: "interfaces"})
    .when("/network/routes", {templateUrl: "partials/network/routes_linux.html", controller: "PageCtrl", activeTab: "network", sideActiveTab: "routes"})

    .when("/storage", {templateUrl: "partials/storage/filesystems.html", controller: "PageCtrl", activeTab: "storage", sideActiveTab: "filesystems"})
    .when("/storage/disks", {templateUrl: "partials/storage/disks.html", controller: "PageCtrl", activeTab: "storage", sideActiveTab: "disks"})
    .when("/storage/lvm/physvols", {templateUrl: "partials/storage/lvm/physvols.html", controller: "PageCtrl", activeTab: "storage", sideActiveTab: "lvm/physvols"})
    .when("/storage/lvm/logvols", {templateUrl: "partials/storage/lvm/logvols.html", controller: "PageCtrl", activeTab: "storage", sideActiveTab: "lvm/logvols"})
    .when("/storage/lvm/volgrps", {templateUrl: "partials/storage/lvm/volgrps.html", controller: "PageCtrl", activeTab: "storage", sideActiveTab: "lvm/volgrps"})
    .when("/storage/mounts", {templateUrl: "partials/storage/mounts.html", controller: "PageCtrl", activeTab: "storage", sideActiveTab: "mounts"})
    .when("/storage/filesystems", {templateUrl: "partials/storage/filesystems.html", controller: "PageCtrl", activeTab: "storage", sideActiveTab: "filesystems"})

    .when("/system", {templateUrl: "partials/system/memory.html", controller: "PageCtrl", activeTab: "system", sideActiveTab: "memory"})
    .when("/system/sysctl", {templateUrl: "partials/system/sysctl.html", controller: "PageCtrl", activeTab: "system", sideActiveTab: "sysctl"})
    .when("/system/memory", {templateUrl: "partials/system/memory.html", controller: "PageCtrl", activeTab: "system", sideActiveTab: "memory"})
    .when("/system/ipmi", {templateUrl: "partials/system/ipmi.html", controller: "PageCtrl", activeTab: "system", sideActiveTab: "ipmi"})
    .when("/system/ipmi/sensors", {templateUrl: "partials/system/ipmi/sensors.html", controller: "PageCtrl", activeTab: "system", sideActiveTab: "ipmi/sensors"})
    .when("/system/rpms", {templateUrl: "partials/system/rpms.html", controller: "PageCtrl", activeTab: "system", sideActiveTab: "rpms"})
    .when("/system/pcicards", {templateUrl: "partials/system/pcicards.html", controller: "PageCtrl", activeTab: "system", sideActiveTab: "pcicards"})
    .when("/system/kernel/config", {templateUrl: "partials/system/kernel/config.html", controller: "PageCtrl", activeTab: "system", sideActiveTab: "kernel/config"})
    .when("/system/kernel/modules", {templateUrl: "partials/system/kernel/modules.html", controller: "PageCtrl", activeTab: "system", sideActiveTab: "kernel/modules"})

    .when("/docker", {templateUrl: "partials/docker/containers.html", controller: "PageCtrl", activeTab: "docker", sideActiveTab: "containers"})
    .when("/docker/general", {templateUrl: "partials/docker/general.html", controller: "PageCtrl", activeTab: "docker", sideActiveTab: "general"})
    .when("/docker/images", {templateUrl: "partials/docker/images.html", controller: "PageCtrl", activeTab: "docker", sideActiveTab: "images"})
    .when("/docker/containers", {templateUrl: "partials/docker/containers.html", controller: "PageCtrl", activeTab: "docker", sideActiveTab: "containers"})

    .otherwise({ controller: 'PageCtrl', templateUrl: 'partials/404.html'});

}]);

/**
 * Controls all other Pages
 */

app.controller('PageCtrl', ['$scope', '$route', 'Flash', '$interval', '$timeout', function($scope, $route, Flash, $interval, $timeout) {
  console.log("Page Controller reporting for duty.");
  Flash.clear();
  $scope.activeTab = $route.current.activeTab;
  $scope.sideActiveTab = $route.current.sideActiveTab;
  $scope.logoImg = "peekaboo.svg"

  $interval(function() {
    $scope.logoImg = "peekaboo-open-hands.svg"

    $timeout(function() {
      $scope.logoImg = "peekaboo.svg"
    }, Math.random() * 4000 + 1000);

  }, Math.random() * 17000 + 3000);

} ]);

/*
 * Filters
 */

// joinBy
app.filter('joinBy', function () {
  return function (input,delimiter) {
    return (input || []).join(delimiter || ',');
  };
});

// replace
app.filter('replace', function () {
  return function (input,restr,newstr) {
    var re = new RegExp(restr, "g");
    return input.replace(re, newstr)
  };
});

app.directive('stRatio',function(){
        return {
          link:function(scope, element, attr){
            var ratio=+(attr.stRatio);
            
            element.css('width',ratio+'%');
            
          }
        };
    });

app.directive('chartStackedBar', function (ChartJsFactory) {
      return new ChartJsFactory('StackedBar');
    });

/*
 * Controllers
 */

// CPU
app.controller('cpuController', [ '$scope', '$resource', 'Flash',  function($scope, $resource, Flash) {
  var resource = $resource('/api/system/cpu');

  resource.get().$promise.then(function(value) {
    $scope.cpu = value;
//    console.log (value); 
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/system/cpu?refresh=true');

    resource.get().$promise.then(function(value) {
      $scope.cpu = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

/*
app.directive('chartStackedBar', function (ChartJsFactory) { 
  return new ChartJsFactory('StackedBar'); 
});
*/

// Memory
app.controller('memoryController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/system/memory');

  resource.get().$promise.then(function(value) {
    $scope.memory = value;

    $scope.memory.usedGB = $scope.memory.totalGB - $scope.memory.availableGB
    $scope.labels = ["Free (GB)", "Buffers (GB)", "Cached (GB)", "Used (GB)"];
    $scope.data = [ $scope.memory.freeGB.toFixed(2), $scope.memory.buffersGB.toFixed(2), $scope.memory.cachedGB.toFixed(2), $scope.memory.usedGB.toFixed(2) ];
    $scope.colours = [ successColor, primaryColor, warningColor, dangerColor ]

/*
    $scope.labels2 = [ 'Memory', 'Available', 'Capacity' ];
    $scope.type2 = 'StackedBar';

    $scope.data2 = [
      [ $scope.memory.usedGB.toFixed(2), 0, 0],
      [ $scope.memory.cachedGB.toFixed(2), 0, 0 ],
      [ $scope.memory.buffersGB.toFixed(2), 0, 0 ],
      [ 0, $scope.memory.usedGB.toFixed(2), $scope.memory.capacityUsedGB.toFixed(2) ],
      [ $scope.memory.freeGB.toFixed(2), $scope.memory.availableGB.toFixed(2), $scope.memory.capacityFreeGB.toFixed(2) ],
    ];

    $scope.colours2 = [ dangerColor, warningColor, primaryColor, dangerColor, successColor ]

    $scope.options2 = {
      barShowStroke: false,
      scaleShowGridLines: false,
      tooltipHideZero: true,
   }
*/

//    console.log (value); 
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/system/memory?refresh=true');

    resource.get().$promise.then(function(value) {
      $scope.memory = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// System
app.controller('systemController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/system');

  resource.get().$promise.then(function(value) {
    $scope.system = value;
//    console.log (value); 
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/system?refresh=true');

    resource.get().$promise.then(function(value) {
      $scope.system = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// OS
app.controller('osController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/system/os');

  resource.get().$promise.then(function(value) {
    $scope.os = value;
//    console.log (value); 
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/system/os?refresh=true');

    resource.get().$promise.then(function(value) {
      $scope.os = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Interfaces
app.controller('interfacesController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/network/interfaces');

  var toggle = {
    name: true,
    mtu: true,
    ipAddr: true,
    hwAddr: true,
    flags: true,
    speedMbs: true,
    duplex: true,
    linkDetected: true,
    swName: true,
    swPortId: true
  }

  $scope.toggle = toggle
  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.interfaces = value;
//    console.log (value); 
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/network/interfaces?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.interfaces = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Routes
app.controller('routesController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/network/routes');

  var toggle = {
    destination: true,
    gateway: true,
    genmask: true,
    flags: true,
    mss: true,
    window: true,
    irtt: true,
    interface: true,
  }

  $scope.toggle = toggle
  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.routes = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/network/routes?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.routes = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Disks
app.controller('disksController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/storage/disks');

  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.disks = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/storage/disks?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.disks = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Mounts
app.controller('mountsController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/storage/mounts');

  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.mounts = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/storage/mounts?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.mounts = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// LVM Physical Volumes
app.controller('physVolsController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/storage/lvm/physvols');

  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.physVols = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/storage/lvm/physvols?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.physVols = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// LVM Logical Volumes
app.controller('logVolsController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/storage/lvm/logvols');

  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.logVols = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/storage/lvm/logvols?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.logVols = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// LVM Volume Groups
app.controller('volGrpsController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/storage/lvm/volgrps');

  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.volGrps = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/storage/lvm/volgrps?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.volGrps = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Filesystems
app.controller('filesystemsController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/storage/filesystems');

  $scope.rowLimit = 10

  $scope.colours = [{
    fillColor: successColor,
    strokeColor: successColor,
    highlightFill: successColor,
    highlightStroke: successColor
  },
  {
    fillColor: warningColor,
    strokeColor: warningColor,
    highlightFill: warningColor,
    highlightStroke: warningColor
  }];

  $scope.options = {
  }

  resource.query().$promise.then(function(value) {
    $scope.filesystems = value;
//    console.log (value);

    $scope.labels = new Array()
    $scope.data = new Array()
    $scope.data[0] = new Array()
    $scope.data[1] = new Array()

    for (i = 0, len = $scope.filesystems.length; i < len; i++) {
      $scope.labels.push($scope.filesystems[i].filesystem)
      $scope.data[0].push($scope.filesystems[i].availableGB.toFixed(2))
      $scope.data[1].push($scope.filesystems[i].usedGB.toFixed(2))
    }

  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/storage/filesystems?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.filesystems = value;
//      console.log (value);

      $scope.labels = new Array()
      $scope.data = new Array()
      $scope.data[0] = new Array()
      $scope.data[1] = new Array()

      for (i = 0, len = $scope.filesystems.length; i < len; i++) {
        $scope.labels.push($scope.filesystems[i].filesystem)
        $scope.data[0].push($scope.filesystems[i].availableGB)
        $scope.data[1].push($scope.filesystems[i].usedGB)
      }

    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Sysctls
app.controller('sysctlsController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/system/sysctls');

  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.sysctls = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/system/sysctls?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.sysctls = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Docker
app.controller('dockerController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/docker');

  resource.get().$promise.then(function(value) {
    $scope.docker = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/docker?refresh=true');

    resource.get().$promise.then(function(value) {
      $scope.docker = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Images
app.controller('imagesController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/docker/images');

  var toggle = {
    id: true,
    repo: true,
    tag: true,
    created: true,
    virtSize: true,
  }

  $scope.toggle = toggle
  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.images = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/docker/images?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.images = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Containers
app.controller('containersController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/docker/containers');

  var toggle = {
    id: true,
    image: true,
    status: true,
    runningFor: true,
    ports: true
  }

  $scope.toggle = toggle
  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.containers = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/docker/containers?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.containers = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);






// IPMI
app.controller('ipmiController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/system/ipmi');

  resource.get().$promise.then(function(value) {
    $scope.ipmi = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/system/ipmi?refresh=true');

    resource.get().$promise.then(function(value) {
      $scope.ipmi = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Kernel Config
app.controller('kernelCfgController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/system/kernel/config');

  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.kernelCfgs = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/system/kernel/config?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.kernelCfgs = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// RPMs
app.controller('rpmsController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/system/rpms');

  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.rpms = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/system/rpms?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.rpms = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// PCICards
app.controller('pciCardsController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/system/pcicards');

  var toggle = {
    slot: true,
    class: true,
    vendor: true,
    device: true,
  }

  $scope.toggle = toggle
  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.pciCards = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/system/pcicards?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.pciCards = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Network
app.controller('networkController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/network');

  resource.get().$promise.then(function(value) {
    $scope.network = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/network?refresh=true');

    resource.get().$promise.then(function(value) {
      $scope.network = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// Modules
app.controller('modulesController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/system/kernel/modules');

  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.modules = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/system/kernel/modules?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.modules = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);

// IPMI Sensors
app.controller('sensorsController', [ '$scope', '$resource', 'Flash', function($scope, $resource, Flash) {
  var resource = $resource('/api/system/ipmi/sensors');

  $scope.rowLimit = 10

  resource.query().$promise.then(function(value) {
    $scope.sensors = value;
//    console.log (value);
  }, function(err) {
    var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
    var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
  });

  $scope.refresh = function() {
    var resource = $resource('/api/system/ipmi/sensors?refresh=true');

    resource.query().$promise.then(function(value) {
      $scope.sensors = value;
//      console.log (value);
    }, function(err) {
      var msg = "<strong>Failed to request URL</strong>: " + err.config.url + " <strong>error</strong>: " + err.data;
      var id = Flash.create('danger', msg, 10000, {class: 'custom-class', id: 'custom-id'}, true);
    });
  }

} ]);
