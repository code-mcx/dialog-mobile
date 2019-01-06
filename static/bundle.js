/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./static/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js__ = __webpack_require__(1);


if (typeof window !== "undefined") {
  window.mcxDialog = __WEBPACK_IMPORTED_MODULE_0__index_js__["a" /* default */];
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_compatible__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_dialog_mobile_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_dialog_mobile_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_dialog_mobile_css__);




function addClass(e, c) {
  var newclass = e.className.split(" ");
  if (e.className === "") newclass = [];
  newclass.push(c);
  e.className = newclass.join(" ");
}

function extend(source, target) {
  for (var key in target) {
    source[key] = target[key];
  }
  return source;
}

function getFontSize() {
  var clientWidth = document.documentElement.clientWidth;
  if (clientWidth < 640) {
    return 16 * (clientWidth / 375) + "px";
  } else {
    return 16;
  }
}

var layer = {
  initOpen: function initOpen(dom, options) {
    dom.style.fontSize = getFontSize();

    var body = document.querySelector("body");
    var bg = document.createElement("div");
    addClass(bg, "dialog-mobile-bg");
    if (options.showBottom == true) {
      addClass(bg, "animation-bg-fadeIn");
    }

    if (options.bottom) {
      bg.addEventListener("click", function () {
        handleClose();
      });
    }

    body.appendChild(bg);
    body.appendChild(dom);

    var animationEndName = Object(__WEBPACK_IMPORTED_MODULE_0__utils_compatible__["a" /* getAnimationEndName */])(dom);
    function handleClose() {
      if (animationEndName) {
        layer.close([bg]);
        addClass(dom, options.closeAnimation);
        dom.addEventListener(animationEndName, function () {
          layer.close([dom]);
        });
      } else {
        layer.close([bg, dom]);
      }
    }

    // set button click event
    options.btns.forEach(function (btn, i) {
      if (i != 0 && i <= options.btns.length - 1) {
        if (!options.bottom) {
          btn.addEventListener("click", function () {
            handleClose();
            options.sureBtnClick();
          });
        } else {
          btn.addEventListener("click", function () {
            handleClose();
            options.btnClick(this.getAttribute("i"));
          });
        }
      } else {
        btn.addEventListener("click", handleClose);
      }
    });

    if (!options.bottom) {
      // set position
      dom.style.top = (document.documentElement.clientHeight - dom.offsetHeight) / 2 + "px";
      dom.style.left = (document.documentElement.clientWidth - dom.offsetWidth) / 2 + "px";
    }
  },
  close: function close(doms) {
    var body = document.querySelector("body");
    for (var i = 0; i < doms.length; i++) {
      body.removeChild(doms[i]);
    }
  }
};

var mcxDialog = {
  alert: function alert(content, options) {
    var opts = {
      titleText: "",
      sureBtnText: "确定"
    };
    opts = extend(opts, options);
    var btn = document.createElement("div");
    btn.innerText = opts.sureBtnText;
    addClass(btn, "dialog-button");

    opts.btns = [btn];

    this.open(content, opts);
  },
  confirm: function confirm(content, options) {
    var opts = {
      titleText: "",
      cancelBtnText: "取消",
      sureBtnText: "确定",
      sureBtnClick: function sureBtnClick() {}
    };
    opts = extend(opts, options);

    var cancelBtn = document.createElement("div");
    cancelBtn.innerText = opts.cancelBtnText;
    addClass(cancelBtn, "dialog-cancel-button");

    var sureBtn = document.createElement("div");
    sureBtn.innerText = opts.sureBtnText;
    addClass(sureBtn, "dialog-sure-button");

    opts.btns = [cancelBtn, sureBtn];
    this.open(content, opts);
  },
  open: function open(content, options) {
    var dialog = document.createElement("div");
    var dialogContent = document.createElement("div");

    addClass(dialog, "dialog-mobile");
    addClass(dialog, "animation-zoom-in");
    addClass(dialogContent, "dialog-content");

    dialogContent.innerText = content;

    if (options.titleText) {
      var dialogTitle = document.createElement("div");
      addClass(dialogTitle, "dialog-title");
      dialogTitle.innerText = options.titleText;
      dialog.appendChild(dialogTitle);
    }

    dialog.appendChild(dialogContent);

    options.btns.forEach(function (btn, i) {
      dialog.appendChild(btn);
    });
    options.closeAnimation = "animation-zoom-out";

    layer.initOpen(dialog, options);
  },
  showBottom: function showBottom(options) {
    var opts = {
      title: "",
      cancelText: "取消",
      btn: ["删除"],
      btnColor: [],
      btnClick: function btnClick(index) {}
    };
    opts = extend(opts, options);
    opts.bottom = true;
    if (opts.btn.length == 1 && opts.btn[0] == "删除") {
      opts.btnColor = ["#EE2C2C"];
    }

    var bottomDialog = document.createElement("div");
    var title = document.createElement("div");
    var dialogItem = document.createElement("div");
    var cancelBtn = document.createElement("div");
    title.innerText = opts.title;
    cancelBtn.innerText = opts.cancelText;
    addClass(bottomDialog, "dialog-mobile-bottom");
    addClass(bottomDialog, "animation-bottom-in");
    addClass(title, "bottom-btn-title");
    addClass(dialogItem, "bottom-btn-item");
    addClass(cancelBtn, "dialog-cancel-btn");
    if (opts.title) {
      bottomDialog.appendChild(title);
    }
    bottomDialog.appendChild(dialogItem);
    bottomDialog.appendChild(cancelBtn);

    opts.btns = [];
    opts.btns.push(cancelBtn);
    opts.btn.forEach(function (b, i) {
      var btn = document.createElement("div");
      btn.innerText = opts.btn[i];
      btn.setAttribute("i", i + 1);
      addClass(btn, "dialog-item-btn");
      if (opts.btnColor[i]) btn.style.color = opts.btnColor[i];
      dialogItem.appendChild(btn);
      opts.btns.push(btn);
    });
    opts.closeAnimation = "animation-bottom-out";
    opts.showBottom = true;

    layer.initOpen(bottomDialog, opts);
  },
  toast: function toast(content, time) {
    time = time || 3;
    var toast = document.createElement("div");
    var toastContent = document.createElement("div");

    addClass(toast, "dialog-mobile-toast");
    addClass(toast, "animation-fade-in");
    addClass(toastContent, "toast-content");

    toastContent.innerText = content;

    toast.appendChild(toastContent);

    var body = document.querySelector("body");
    body.appendChild(toast);

    toast.style.fontSize = getFontSize();
    toast.style.left = (document.documentElement.clientWidth - toast.offsetWidth) / 2 + "px";

    setTimeout(function () {
      body.removeChild(toast);
    }, time * 1000);
  },

  loadElement: [],
  loading: function loading(options) {
    var opts = {
      src: "img",
      hint: ""
    };
    opts = extend(opts, options);

    var loadingBg = document.createElement("div");
    var loading = document.createElement("div");
    var img = document.createElement("img");

    addClass(loadingBg, "mobile-loading-bg");
    addClass(loading, "mobile-loading");
    addClass(loading, "animation-zoom-in");
    // img.src = opts.src + "/loading.gif";
    img.src = __webpack_require__(8);
    loading.appendChild(img);

    if (opts.hint) {
      var loadingContent = document.createElement("div");
      addClass(loadingContent, "loading-content");
      loadingContent.innerText = opts.hint;
      loading.appendChild(loadingContent);
    }

    var body = document.querySelector("body");
    body.appendChild(loadingBg);
    body.appendChild(loading);

    loading.style.fontSize = getFontSize();
    loading.style.left = (document.documentElement.clientWidth - loading.offsetWidth) / 2 + "px";
    loading.style.top = (document.documentElement.clientHeight - loading.offsetHeight) / 2 + "px";

    this.loadElement.push(loadingBg);
    this.loadElement.push(loading);
  },
  closeLoading: function closeLoading() {
    layer.close(this.loadElement);
    this.loadElement = [];
  }
};

// providing better operations in Vue
mcxDialog.install = function (Vue, options) {
  Vue.prototype.$mcxDialog = mcxDialog;
};

/* harmony default export */ __webpack_exports__["a"] = (mcxDialog);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getAnimationEndName; });
function getAnimationEndName(dom) {
  var cssAnimation = ["animation", "webkitAnimation"];
  var animationEnd = {
    "animation": "animationend",
    "webkitAnimation": "webkitAnimationEnd"
  };
  for (var i = 0; i < cssAnimation.length; i++) {
    if (dom.style[cssAnimation[i]] != undefined) {
      return animationEnd[cssAnimation[i]];
    }
  }
  return undefined;
}



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(4);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(6)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!./dialog-mobile.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!./dialog-mobile.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// imports


// module
exports.push([module.i, ".dialog-mobile-bg {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 10000;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: rgba(0, 0, 0, 0.7);\r\n  -webkit-transform: translate3d(0, 0, 0);\r\n  transform: translate3d(0, 0, 0);\r\n}\r\n/* Alert Confirm */\r\n.dialog-mobile {\r\n  position: fixed;\r\n  top: 50%;\r\n  left: 0;\r\n  z-index: 10001;\r\n  width: 20em;\r\n  border-radius: 5px;\r\n  background-color: #FFFFFF;\r\n  -webkit-transform: translate3d(0, 0, 0);\r\n  transform: translate3d(0, 0, 0);\r\n}\r\n.dialog-mobile .dialog-content {\r\n  padding: 2.5em 1em;\r\n  text-align: center;\r\n  color: #333333;\r\n  border-radius: 5px 5px 0 0;\r\n  word-break: break-word;\r\n  position: relative;\r\n}\r\n.dialog-mobile .dialog-title {\r\n  padding: 0.8em 1em 0.5em;\r\n  text-align: center;\r\n  color: #333333;\r\n  font-weight: bold;\r\n  border-radius: 5px 5px 0 0;\r\n}\r\n.dialog-mobile .dialog-title + .dialog-content  {\r\n  padding: 1.5em 1em 2em;\r\n}\r\n.dialog-mobile .dialog-content:after\r\n{\r\n  content: \"\";\r\n  position: absolute;\r\n  z-index: 10002;\r\n  bottom: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 1px;\r\n  background-color: #CCCCCC;\r\n  -webkit-transform: scaleY(.5);\r\n  transform: scaleY(.5);\r\n}\r\n.dialog-mobile .dialog-button {\r\n  height: 3em;\r\n  line-height: 3em;\r\n  text-align: center;\r\n  border-radius: 0 0 5px 5px;\r\n  color: #000000;\r\n  background: #EEEEEE;\r\n}\r\n.dialog-mobile .dialog-sure-button,\r\n.dialog-mobile .dialog-cancel-button {\r\n  float: left;\r\n  height: 3em;\r\n  width: 50%;\r\n  line-height: 3em;\r\n  text-align: center;\r\n  background: #EEEEEE;\r\n}\r\n.dialog-mobile .dialog-sure-button {\r\n  color: #1C86EE;\r\n  border-radius: 0 0 5px 0;\r\n  position: relative;\r\n}\r\n.dialog-mobile .dialog-sure-button:after {\r\n  content: \"\";\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 1px;\r\n  height: 100%;\r\n  background-color: #CCCCCC;\r\n  -webkit-transform: scaleX(.5);\r\n  transform: scaleX(.5);\r\n}\r\n.dialog-mobile .dialog-cancel-button {\r\n  color: #000000;\r\n  border-radius: 0 0 0 5px;\r\n}\r\n/* Bottom Dialog */\r\n.dialog-mobile-bottom {\r\n  position: fixed;\r\n  left: 0;\r\n  bottom: 0;\r\n  z-index: 10001;\r\n  width: 100%;\r\n  color: #333333;\r\n  background-color: #EEEEEE;\r\n}\r\n.dialog-mobile-bottom .bottom-btn-title {\r\n  background: #FFFFFF;\r\n  padding: 0.5em 0;\r\n  text-align: center;\r\n  margin-bottom: 0.1em;\r\n  font-weight: bold;\r\n}\r\n.dialog-mobile-bottom .bottom-btn-item {\r\n  text-align: center;\r\n}\r\n.bottom-btn-item .dialog-item-btn {\r\n  background: #FFFFFF;\r\n  padding: 0.5em 0;\r\n  border-bottom: 1px solid #EEEEEE;\r\n}\r\n.bottom-btn-item .dialog-item-btn:last-child {\r\n  border-bottom: none;\r\n}\r\n.dialog-mobile-bottom .dialog-cancel-btn {\r\n  margin-top: 0.6em;\r\n  text-align: center;\r\n  background: #FFFFFF;\r\n  padding: 0.5em 0;\r\n}\r\n/* Toast */\r\n.dialog-mobile-toast {\r\n  position: fixed;\r\n  bottom: 5em;\r\n}\r\n.dialog-mobile-toast .toast-content {\r\n  padding: 0.5em 1em;\r\n  color: #FFFFFF;\r\n  border-radius: 2px;\r\n  background-color: #333333;\r\n}\r\n/* Loading */\r\n.mobile-loading-bg {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 10000;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: rgba(0, 0, 0, 0.3);\r\n  -webkit-transform: translate3d(0, 0, 0);\r\n  transform: translate3d(0, 0, 0);\r\n}  \r\n.mobile-loading {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 10001;\r\n  min-width: 2em;\r\n  min-height: 2em;\r\n  padding: 0.8em 1.6em;\r\n  text-align: center;\r\n  border-radius: 2px;\r\n  color: #FFFFF0;\r\n  background-color: #0A0A0A;\r\n  -webkit-transform: translate3d(0, 0, 0);\r\n  transform: translate3d(0, 0, 0);\r\n}\r\n/* Animation */\r\n.animation-zoom-in, .animation-zoom-out,\r\n.animation-bottom-in, .animation-bottom-out,\r\n.animation-bg-fadeIn {\r\n  -webkit-animation-duration: 0.3s;\r\n  -webkit-animation-fill-mode: both;\r\n  animation-duration: 0.3s;\r\n  animation-fill-mode: both;\r\n}\r\n.animation-fade-in, .animation-fade-out {\r\n  -webkit-animation-duration: 1s;\r\n  -webkit-animation-timing-function: ease-out;\r\n  -webkit-animation-fill-mode: both;\r\n  animation-duration: 1s;\r\n  animation-timing-function: ease-out;\r\n  animation-fill-mode: both;\r\n}\r\n.animation-zoom-in {\r\n  -webkit-animation-name: zoomIn;\r\n  animation-name: zoomIn;\r\n}\r\n.animation-zoom-out {\r\n  -webkit-animation-name: zoomOut;\r\n  animation-name: zoomOut;\r\n}\r\n.animation-fade-in {\r\n  -webkit-animation-name: fadeIn;\r\n  animation-name: fadeIn;\r\n}\r\n.animation-fade-out {\r\n  -webkit-animation-name: fadeOut;\r\n  animation-name: fadeOut;\r\n}\r\n.animation-bottom-in {\r\n  -webkit-animation-name: bottomIn;\r\n  animation-name: bottomIn;\r\n}\r\n.animation-bottom-out {\r\n  -webkit-animation-name: bottomOut;\r\n  animation-name: bottomOut;\r\n}\r\n.animation-bg-fadeIn {\r\n  -webkit-animation-name: fadeIn;\r\n  animation-name: fadeIn;\r\n}\r\n\r\n@-webkit-keyframes zoomIn {\r\n  from {\r\n\t  opacity: 0;\r\n\t  -webkit-transform: scale(0, 0);\r\n  }\r\n  to {\r\n\t  opacity: 1;\r\n\t  -webkit-transform: scale(1, 1);\r\n  }\r\n}\r\n@-webkit-keyframes zoomOut {\r\n  from {\r\n\t  opacity: 1;\r\n\t  -webkit-transform: scale(1, 1);\r\n  }\r\n  90% {\r\n\t  -webkit-transform: scale(0.3, 0.3);\r\n  }\r\n  to {\r\n\t  opacity: 0;\r\n\t  -webkit-transform: scale(0, 0);\r\n  }\r\n}\r\n@keyframes zoomIn {\r\n  from {\r\n\t  opacity: 0;\r\n\t  transform: scale(0, 0);\r\n  }\r\n  to {\r\n\t  opacity: 1;\r\n\t  transform: scale(1, 1);\r\n  }\r\n}\r\n@keyframes zoomOut {\r\n  from {\r\n\t  opacity: 1;\r\n\t  transform: scale(1, 1);\r\n  }\r\n  90% {\r\n\t  transform: scale(0.3, 0.3);\r\n  }\r\n  to {\r\n\t  opacity: 0;\r\n\t  transform: scale(0, 0);\r\n  }\r\n}\r\n@-webkit-keyframes fadeIn {\r\n  from {\r\n\t  opacity: 0;\r\n  }\r\n  to {\r\n\t  opacity: 1;\r\n  }\r\n}\r\n@-webkit-keyframes fadeOut {\r\n  from {\r\n\t  opacity: 1;\r\n  }\r\n  30% {\r\n\t  opacity: 0.3;\r\n  }\r\n  to {\r\n\t  opacity: 0;\r\n  }\r\n}\r\n@keyframes fadeIn {\r\n  from {\r\n\t  opacity: 0;\r\n  }\r\n  to {\r\n\t  opacity: 1;\r\n  }\r\n}\r\n@keyframes fadeOut {\r\n  from {\r\n\t  opacity: 1;\r\n  }\r\n  30% {\r\n\t  opacity: 0.3;\r\n  }\r\n  to {\r\n\t  opacity: 0;\r\n  }\r\n}\r\n@-webkit-keyframes bottomIn {\r\n  from {\r\n\t  bottom: -1000px;\r\n  }\r\n  to {\r\n\t  bottom: 0;\r\n  }\r\n}\r\n@-webkit-keyframes bottomOut {\r\n  from {\r\n\t  bottom: 0;\r\n  }\r\n  to {\r\n    bottom: -1000px;\r\n  }\r\n}\r\n@keyframes bottomIn {\r\n  from {\r\n\t  bottom: -1000px;\r\n  }\r\n  to {\r\n\t  bottom: 0;\r\n  }\r\n}\r\n@keyframes bottomOut {\r\n  from {\r\n\t  bottom: 0;\r\n  }\r\n  to {\r\n\t  bottom: -1000px;\r\n  }\r\n}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1e64774e560028d1a949e65289f20265.gif";

/***/ })
/******/ ]);