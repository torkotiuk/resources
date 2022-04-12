// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"file-examples/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\fonts\\Muli\\Muli-Light.eot":[["..\\Muli-Light.22595b80.eot","fonts/Muli/Muli-Light.eot"],"fonts/Muli/Muli-Light.eot"],"./..\\fonts\\Muli\\Muli-Light.woff2":[["..\\Muli-Light.dd3aa33e.woff2","fonts/Muli/Muli-Light.woff2"],"fonts/Muli/Muli-Light.woff2"],"./..\\fonts\\Muli\\Muli-Light.woff":[["..\\Muli-Light.96705638.woff","fonts/Muli/Muli-Light.woff"],"fonts/Muli/Muli-Light.woff"],"./..\\fonts\\Muli\\Muli-Light.ttf":[["..\\Muli-Light.15b836e3.ttf","fonts/Muli/Muli-Light.ttf"],"fonts/Muli/Muli-Light.ttf"],"./..\\fonts\\Muli\\Muli-Light.svg":[["..\\Muli-Light.b9d5eda3.svg","fonts/Muli/Muli-Light.svg"],"fonts/Muli/Muli-Light.svg"],"./..\\fonts\\Muli\\Muli-Regular.eot":[["..\\Muli-Regular.513849a9.eot","fonts/Muli/Muli-Regular.eot"],"fonts/Muli/Muli-Regular.eot"],"./..\\fonts\\Muli\\Muli-Regular.woff2":[["..\\Muli-Regular.65f6944b.woff2","fonts/Muli/Muli-Regular.woff2"],"fonts/Muli/Muli-Regular.woff2"],"./..\\fonts\\Muli\\Muli-Regular.woff":[["..\\Muli-Regular.c00baaa9.woff","fonts/Muli/Muli-Regular.woff"],"fonts/Muli/Muli-Regular.woff"],"./..\\fonts\\Muli\\Muli-Regular.ttf":[["..\\Muli-Regular.ecfa5d2a.ttf","fonts/Muli/Muli-Regular.ttf"],"fonts/Muli/Muli-Regular.ttf"],"./..\\fonts\\Muli\\Muli-Regular.svg":[["..\\Muli-Regular.3a3221af.svg","fonts/Muli/Muli-Regular.svg"],"fonts/Muli/Muli-Regular.svg"],"./..\\fonts\\Muli\\Muli-Bold.eot":[["..\\Muli-Bold.f0904dd2.eot","fonts/Muli/Muli-Bold.eot"],"fonts/Muli/Muli-Bold.eot"],"./..\\fonts\\Muli\\Muli-Bold.woff2":[["..\\Muli-Bold.a6359dbc.woff2","fonts/Muli/Muli-Bold.woff2"],"fonts/Muli/Muli-Bold.woff2"],"./..\\fonts\\Muli\\Muli-Bold.woff":[["..\\Muli-Bold.0062b291.woff","fonts/Muli/Muli-Bold.woff"],"fonts/Muli/Muli-Bold.woff"],"./..\\fonts\\Muli\\Muli-Bold.ttf":[["..\\Muli-Bold.f370f8b0.ttf","fonts/Muli/Muli-Bold.ttf"],"fonts/Muli/Muli-Bold.ttf"],"./..\\fonts\\Muli\\Muli-Bold.svg":[["..\\Muli-Bold.66b42fe4.svg","fonts/Muli/Muli-Bold.svg"],"fonts/Muli/Muli-Bold.svg"],"./..\\images\\trafalgar-header.svg":[["..\\trafalgar-header.0df63d49.svg","images/trafalgar-header.svg"],"images/trafalgar-header.svg"],"./..\\images\\service1.svg":[["..\\service1.b238bc65.svg","images/service1.svg"],"images/service1.svg"],"./..\\images\\service2.svg":[["..\\service2.009be57e.svg","images/service2.svg"],"images/service2.svg"],"./..\\images\\service3.svg":[["..\\service3.57902047.svg","images/service3.svg"],"images/service3.svg"],"./..\\images\\service4.svg":[["..\\service4.eff96b61.svg","images/service4.svg"],"images/service4.svg"],"./..\\images\\service5.svg":[["..\\service5.eb73082d.svg","images/service5.svg"],"images/service5.svg"],"./..\\images\\service6.svg":[["..\\service6.8f54679b.svg","images/service6.svg"],"images/service6.svg"],"./..\\images\\trafalgar-illustration1.svg":[["..\\trafalgar-illustration1.22710a67.svg","images/trafalgar-illustration1.svg"],"images/trafalgar-illustration1.svg"],"./..\\images\\trafalgar-illustration2.svg":[["..\\trafalgar-illustration2.7b450b7a.svg","images/trafalgar-illustration2.svg"],"images/trafalgar-illustration2.svg"],"./..\\images\\bg-article.svg":[["..\\bg-article.e854fb37.svg","images/bg-article.svg"],"images/bg-article.svg"],"./..\\images\\review\\dots-bg-blue.png":[["..\\dots-bg-blue.2ee9ebdd.png","images/review/dots-bg-blue.png"],"images/review/dots-bg-blue.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52594" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/file-examples/style.js.map