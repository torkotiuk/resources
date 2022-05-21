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
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"sass/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\images\\fire-icon.svg":[["fire-icon.e6260cf7.svg","images/fire-icon.svg"],"images/fire-icon.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/slider.js":[function(require,module,exports) {
// $('.multiple-items').slick({
//   infinite: true,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   arrows: false,
//   autoplay: true,
//   autoplaySpeed: 4000,
// });
// single item
$('.multiple-items').slick({
  slidesToShow: 1,
  // slidesToScroll: 3,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  fade: true // cssEase: 'linear',
  // dots: true,

});
},{}],"js/a-slider-cleanJs.js":[function(require,module,exports) {
var track = document.querySelector('.carousel__track');
var slides = Array.from(track.children);
var nextButton = document.querySelector('.carousel__button--right');
var prevButton = document.querySelector('.carousel__button--left');
var dotsNav = document.querySelector('.carousel__nav');
var dots = Array.from(dotsNav.children);
var slideSize = slides[0].getBoundingClientRect();
var slideWidth = slideSize.width; // arrange slides one to another

var setSlidePosition = function setSlidePosition(slide, index) {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition); // move to the next slide

var moveToSlide = function moveToSlide(track, currentSlide, targetSlide) {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

var updateDots = function updateDots(currentDot, targetDot) {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

var hideOrShowArrows = function hideOrShowArrows(slides, prevButton, nextButton, targetIndex) {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
};

nextButton.addEventListener('click', function (e) {
  var currentSlide = track.querySelector('.current-slide');
  var nextSlide = currentSlide.nextElementSibling; // --- refactor to "moveToSlide" fn
  // const amountToMove = nextSlide.style.left;
  // move to the next slide
  // track.style.transform = 'translateX(-' + amountToMove + ')';
  // currentSlide.classList.remove('current-slide');
  // nextSlide.classList.add('current-slide');

  moveToSlide(track, currentSlide, nextSlide); // move dots

  var currentDot = dotsNav.querySelector('.current-slide');
  var nextDot = currentDot.nextElementSibling;
  updateDots(currentDot, nextDot); // showOrHide arrows

  var nextIndex = slides.findIndex(function (slide) {
    return slide === nextSlide;
  });
  hideOrShowArrows(slides, prevButton, nextButton, nextIndex);
});
prevButton.addEventListener('click', function (e) {
  var currentSlide = track.querySelector('.current-slide');
  var prevSlide = currentSlide.previousElementSibling;
  moveToSlide(track, currentSlide, prevSlide); // move dots

  var currentDot = dotsNav.querySelector('.current-slide');
  var prevDot = currentDot.previousElementSibling;
  updateDots(currentDot, prevDot); // showOrHide arrows

  var prevIndex = slides.findIndex(function (slide) {
    return slide === prevSlide;
  });
  hideOrShowArrows(slides, prevButton, nextButton, prevIndex);
}); // carousel__nav

dotsNav.addEventListener('click', function (e) {
  var targetDot = e.target.closest('button');
  if (!targetDot) return;
  var currentSlide = track.querySelector('.current-slide');
  var currentDot = dotsNav.querySelector('.current-slide');
  var targetIndex = dots.findIndex(function (dot) {
    return dot === targetDot;
  });
  var targetSlide = slides[targetIndex];
  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideOrShowArrows(slides, prevButton, nextButton, targetIndex);
});
},{}],"js/repeat_JS_module/lesson-1.js":[function(require,module,exports) {
// use Bracket pair colorizer for VSCode
// devdocs.io - guide from different techniques
// confirm (true, false); prompt (takes some data from input); alert
// ** use Number constructor
// use <<<< Number >>>> to change some value to number, Not ++ or smth. like that
// ** take the WHOLE NUMBER or only INTEGER NUMBER PART
// Number.parsInt(), Number.parsFloat(), Number.toFixed()
// let elemWidth = '50.25px';
// console.log(Number.parseInt(elemWidth));
// console.log(Number.parseFloat(elemWidth));
// ** cut necessary NUMBER SYMBOLS AFTER COMA
// let salary = 3750.253651;
// salary = Number(salary.toFixed(3));
// console.log(salary);
// ** make POWER for number
// Ex. 1
// console.log(Math.pow(2, 5));
// Ex. 2
// console.log(2 ** 5); - exponent operator
// const base = Number(prompt('Enter number: '));
// const power = Number(prompt('Enter power: '));
// console.log(`Number ${base} in power ${power}: `, base ** power);
// ** get RANDOM NUMBER from min to max
// ** Ex. 1
var min = 30;
var max = 50;
var randomNumber = Math.random() * (max - min) + min;
console.log("Random number from ".concat(min, " to ").concat(max, " and round it after ',': "), Math.round(randomNumber), "Full number is: ", randomNumber); //

var testElement = document.querySelector('.test-section__item');
testElement.innerHTML = Math.round(randomNumber); // ** Ex. 2
// const colors = ['pink', 'purple', 'tomato', 'orange', 'green'];
// const min = 0;
// const max = colors.length - 1;
// let randomIndex = Math.round(Math.random() * (max - min) + min);
// let randomColor = colors[randomIndex];
// const headerRef = document.querySelector('.header');
// headerRef.style.backgroundColor = randomColor;
// ** STRING ELEMENTS
// const brand = 'SaMSung';
// console.log(brand[2]);
// ** 6 falsy values in boolean transformation
// 0, NaN, null, undefined, '', false
// ** task - find number in some range of min and max
// alert('We are looking NUMBER < min and > max');
// const min = prompt('Enter number min: ');
// console.log(`Min: ${min}`);
// const max = prompt('Enter number max: ');
// console.log(`Max: ${max}`);
// let x = Number(prompt(`Enter some number`));
// if (x < min || x > max) {
//   console.log('Ok, number is in range before min or after max', x);
// } else {
//   console.log('Wrong, number is between min and max');
// }
},{}],"js/repeat_JS_module/interview-easy.js":[function(require,module,exports) {
a = 123;
b = 84; // console.log(([a, b] = [b, a]));
},{}],"js/repeat_JS_module/index.js":[function(require,module,exports) {
"use strict";

require("./lesson-1");

require("./interview-easy");
},{"./lesson-1":"js/repeat_JS_module/lesson-1.js","./interview-easy":"js/repeat_JS_module/interview-easy.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./sass/main.scss");

require("./js/slider");

require("./js/a-slider-cleanJs");

require("./js/repeat_JS_module");
},{"./sass/main.scss":"sass/main.scss","./js/slider":"js/slider.js","./js/a-slider-cleanJs":"js/a-slider-cleanJs.js","./js/repeat_JS_module":"js/repeat_JS_module/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53939" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map