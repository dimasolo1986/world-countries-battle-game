// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"qTXMn":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 5000;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "5be7389de438c7cc";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"cCMpN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadMain", ()=>loadMain);
parcelHelpers.export(exports, "resetFinishedGame", ()=>resetFinishedGame);
var _modelJs = require("./model.js");
var _languageSelectViewJs = require("./views/languageSelectView.js");
var _languageSelectViewJsDefault = parcelHelpers.interopDefault(_languageSelectViewJs);
var _aboutViewJs = require("./views/aboutView.js");
var _aboutViewJsDefault = parcelHelpers.interopDefault(_aboutViewJs);
var _mainViewJs = require("./views/mainView.js");
var _mainViewJsDefault = parcelHelpers.interopDefault(_mainViewJs);
var _uaJs = require("./localization/ua.js");
var _gameViewJs = require("./views/gameView.js");
var _gameViewJsDefault = parcelHelpers.interopDefault(_gameViewJs);
var _donateAuthorViewJs = require("./views/donateAuthorView.js");
var _donateAuthorViewJsDefault = parcelHelpers.interopDefault(_donateAuthorViewJs);
var _gameRulesViewJs = require("./views/gameRulesView.js");
var _gameRulesViewJsDefault = parcelHelpers.interopDefault(_gameRulesViewJs);
var _gameRoomViewJs = require("./views/gameRoomView.js");
var _gameRoomViewJsDefault = parcelHelpers.interopDefault(_gameRoomViewJs);
const init = function() {
    (0, _languageSelectViewJsDefault.default).init();
    translateAllElements();
    (0, _languageSelectViewJsDefault.default).addHandlerSelect(languageSelectHandler);
    (0, _aboutViewJsDefault.default).addReturnToMainHandlerClick((0, _mainViewJsDefault.default), (0, _donateAuthorViewJsDefault.default), (0, _gameRulesViewJsDefault.default), (0, _gameRoomViewJsDefault.default));
    (0, _aboutViewJsDefault.default).addGameRulesHandlerClick();
    (0, _donateAuthorViewJsDefault.default).addReturnBackHandlerClick((0, _mainViewJsDefault.default), (0, _aboutViewJsDefault.default), (0, _gameRulesViewJsDefault.default), (0, _gameRoomViewJsDefault.default));
    (0, _gameRoomViewJsDefault.default).addReturnBackHandlerClick((0, _mainViewJsDefault.default), (0, _aboutViewJsDefault.default), (0, _gameRulesViewJsDefault.default), (0, _donateAuthorViewJsDefault.default));
    (0, _gameRoomViewJsDefault.default).addGameRoomCreateListenerHandlerClick();
    (0, _gameRoomViewJsDefault.default).addGameRoomDeleteListenerHandlerClick();
    (0, _gameRoomViewJsDefault.default).addGameRoomCopyLinkHandlerClick();
    (0, _gameRoomViewJsDefault.default).addShareLinkHandlerClick();
    (0, _gameRoomViewJsDefault.default).addOnlyIndependentCountriesListener();
    (0, _gameRoomViewJsDefault.default).addHintsTypeSelectListener();
    (0, _gameRoomViewJsDefault.default).addHitTimeSelectListener();
    (0, _gameRoomViewJsDefault.default).addBonusCountriesSelectListener();
    (0, _gameRoomViewJsDefault.default).addStartGameHandlerClick((0, _aboutViewJsDefault.default), (0, _gameViewJsDefault.default), (0, _donateAuthorViewJsDefault.default), (0, _gameRulesViewJsDefault.default), (0, _mainViewJsDefault.default));
    (0, _donateAuthorViewJsDefault.default).addShareWebSiteHandlerClick();
    (0, _gameRulesViewJsDefault.default).addReturnToMainHandlerClick((0, _mainViewJsDefault.default), (0, _donateAuthorViewJsDefault.default), (0, _aboutViewJsDefault.default), (0, _gameRoomViewJsDefault.default));
    (0, _mainViewJsDefault.default).addAboutHandlerClick((0, _aboutViewJsDefault.default), (0, _gameViewJsDefault.default), (0, _donateAuthorViewJsDefault.default), (0, _gameRulesViewJsDefault.default), (0, _gameRoomViewJsDefault.default));
    (0, _mainViewJsDefault.default).addStartGameHandlerClick((0, _aboutViewJsDefault.default), (0, _gameViewJsDefault.default), (0, _donateAuthorViewJsDefault.default), (0, _gameRulesViewJsDefault.default), (0, _gameRoomViewJsDefault.default));
    (0, _mainViewJsDefault.default).addGameModeChangeHandler((0, _gameRoomViewJsDefault.default));
    (0, _mainViewJsDefault.default).addOnlyIndependentCountriesListener();
    (0, _mainViewJsDefault.default).addHintsTypeListener();
    (0, _mainViewJsDefault.default).addHitTimeListener();
    (0, _mainViewJsDefault.default).addBonusCountriesListener();
    (0, _mainViewJsDefault.default).addGameRoomListenerHandler((0, _aboutViewJsDefault.default), (0, _gameViewJsDefault.default), (0, _donateAuthorViewJsDefault.default), (0, _gameRulesViewJsDefault.default), (0, _gameRoomViewJsDefault.default));
    (0, _mainViewJsDefault.default).addSupportProjectHandlerClick((0, _aboutViewJsDefault.default), (0, _gameViewJsDefault.default), (0, _donateAuthorViewJsDefault.default), (0, _gameRulesViewJsDefault.default), (0, _gameRoomViewJsDefault.default));
    (0, _mainViewJsDefault.default).addGameRulesHandlerClick((0, _aboutViewJsDefault.default), (0, _gameViewJsDefault.default), (0, _donateAuthorViewJsDefault.default), (0, _gameRulesViewJsDefault.default), (0, _gameRoomViewJsDefault.default));
    saveCurrentLanguageHandler();
    loadWindow();
    window.addEventListener("beforeunload", function(event) {
        const rawParams = window.location.search;
        const cleanedParams = rawParams.replace(/[\u200B-\u200D\uFEFF]/g, "");
        const urlParams = new URLSearchParams(cleanedParams);
        const roomId = urlParams.get("gameRoom");
        if (!roomId) cleanFirebase(true);
        const firebase = (0, _gameRoomViewJsDefault.default).getFirebase();
        if (firebase && firebase.app && (0, _gameViewJsDefault.default)._game) firebase.sendMessage(JSON.stringify({
            type: "finish"
        }));
    });
    document.addEventListener("DOMContentLoaded", function() {
        function getShareWebSiteContent() {
            return {
                title: `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Alliance Guesser Game"]}`,
                text: `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["World Country Alliances Guesser Game"]} - ${document.querySelector(".about-project-description").textContent}`,
                url: "https://www.countriesguesser.com"
            };
        }
        const rawParams = window.location.search;
        const cleanedParams = rawParams.replace(/[\u200B-\u200D\uFEFF]/g, "");
        const urlParams = new URLSearchParams(cleanedParams);
        const roomId = urlParams.get("gameRoom");
        const gameMode = sessionStorage.getItem("game-mode");
        const gameModeCheckSlider = document.getElementById("gameMode");
        const gameRoomContainer = document.getElementById("create-game-room-container");
        if (gameMode && gameMode === "1" && !roomId) {
            gameModeCheckSlider.value = gameMode;
            gameRoomContainer.classList.remove("not-displayed");
        } else if (roomId) gameModeCheckSlider.value = "1";
        else {
            gameModeCheckSlider.value = "0";
            gameRoomContainer.classList.add("not-displayed");
        }
        const gameLogo = document.getElementById("game-logo");
        const gameLogoHeader = document.getElementById("game-logo-header");
        gameLogo.addEventListener("click", function() {
            sessionStorage.setItem("currentWindow", "main");
            loadWindow();
        });
        gameLogoHeader.addEventListener("click", function() {
            sessionStorage.setItem("currentWindow", "main");
            loadWindow();
        });
        document.addEventListener("hide.bs.modal", function() {
            if (document.activeElement) document.activeElement.blur();
        });
        const shareWebSiteButton = document.getElementById("shareWebSite");
        if (shareWebSiteButton) shareWebSiteButton.addEventListener("click", function() {
            if (navigator.share) navigator.share(getShareWebSiteContent()).then(function() {
                if (window.gtag) gtag("event", "share_website");
            }).catch(function() {});
        });
        const shareWebSiteDonate = document.querySelector(".share-donate");
        if (shareWebSiteDonate) shareWebSiteDonate.addEventListener("click", function() {
            if (navigator.share) navigator.share(getShareWebSiteContent()).then(function() {
                if (window.gtag) gtag("event", "share_website");
            }).catch(function() {});
        });
        const shareGameResults = document.querySelector("#shareGameResults");
        if (shareGameResults) shareGameResults.addEventListener("click", function() {
            if (navigator.share) navigator.share(getShareWebSiteContent()).then(function() {
                if (window.gtag) gtag("event", "share_website");
            }).catch(function() {});
        });
    });
};
const loadWindow = function() {
    const savedWindow = sessionStorage.getItem("currentWindow");
    if (savedWindow) switch(savedWindow){
        case "main":
            loadMain();
            break;
        case "about-project":
            loadAboutProject();
            break;
        case "donate-author":
            loadDonateAuthor();
            break;
        case "game-rules":
            loadGameRules();
            break;
        case "game-room":
            loadGameRoom();
            break;
        default:
            loadMain(savedWindow);
            break;
    }
    else loadMain();
};
const loadMain = function() {
    (0, _aboutViewJsDefault.default).hideAboutProject();
    (0, _mainViewJsDefault.default).showMain();
    (0, _gameViewJsDefault.default).hideGame();
    sessionStorage.setItem("currentWindow", "main");
    (0, _donateAuthorViewJsDefault.default).hideDonateProject();
    (0, _gameRulesViewJsDefault.default).hideGameRulesProject();
    (0, _gameRoomViewJsDefault.default).hideGameRoomProject();
};
const resetFinishedGame = function() {
    (0, _gameViewJsDefault.default).disposeGame();
};
const loadAboutProject = function() {
    (0, _mainViewJsDefault.default).hideMain();
    (0, _gameViewJsDefault.default).hideGame();
    (0, _aboutViewJsDefault.default).showAboutProjectInfo();
    sessionStorage.setItem("currentWindow", "about-project");
    (0, _donateAuthorViewJsDefault.default).hideDonateProject();
    (0, _gameRulesViewJsDefault.default).hideGameRulesProject();
    (0, _gameRoomViewJsDefault.default).hideGameRoomProject();
};
const translateAllElements = function() {
    (0, _aboutViewJsDefault.default).translateElements();
    (0, _mainViewJsDefault.default).translateElements();
    (0, _donateAuthorViewJsDefault.default).translateElements();
    (0, _gameRulesViewJsDefault.default).translateElements();
    (0, _gameRoomViewJsDefault.default).translateElements();
};
const loadGameRoom = function() {
    (0, _mainViewJsDefault.default).hideMain();
    (0, _aboutViewJsDefault.default).hideAboutProject();
    (0, _gameViewJsDefault.default).hideGame();
    (0, _donateAuthorViewJsDefault.default).hideDonateProject();
    (0, _gameRulesViewJsDefault.default).hideGameRulesProject();
    (0, _gameRoomViewJsDefault.default).showGameRoomProject();
    sessionStorage.setItem("currentWindow", "game-room");
};
const loadGameRules = function() {
    (0, _mainViewJsDefault.default).hideMain();
    (0, _aboutViewJsDefault.default).hideAboutProject();
    (0, _gameViewJsDefault.default).hideGame();
    (0, _donateAuthorViewJsDefault.default).hideDonateProject();
    (0, _gameRulesViewJsDefault.default).showGameRulesProject();
    (0, _gameRoomViewJsDefault.default).hideGameRoomProject();
    sessionStorage.setItem("currentWindow", "game-rules");
};
const loadDonateAuthor = function() {
    (0, _mainViewJsDefault.default).hideMain();
    (0, _gameViewJsDefault.default).hideGame();
    (0, _gameRulesViewJsDefault.default).hideGameRulesProject();
    (0, _aboutViewJsDefault.default).hideAboutProject();
    (0, _gameRoomViewJsDefault.default).hideGameRoomProject();
    (0, _donateAuthorViewJsDefault.default).showDonateProject();
    sessionStorage.setItem("currentWindow", "donate-author");
};
const languageSelectHandler = function(language) {
    saveLanguage(language);
    _modelJs.worldCountries.language = language;
    _modelJs.loadAllCountries();
    translateAllElements();
};
const saveLanguage = function(language) {
    localStorage.setItem("language", language);
};
const cleanFirebase = function(closeChannel = false) {
    (0, _gameRoomViewJsDefault.default).cleanFirebase(closeChannel);
};
const saveCurrentLanguageHandler = function() {
    window.addEventListener("beforeunload", function() {
        const currentLanguage = document.querySelector("#language-selector").value;
        saveLanguage(currentLanguage);
    });
};
init();

},{"./model.js":"6YxfE","./views/languageSelectView.js":"YFNrm","./views/aboutView.js":"6p5eU","./views/mainView.js":"1REwb","./localization/ua.js":"3eDg2","./views/gameView.js":"gRLA5","./views/donateAuthorView.js":"hEmLG","./views/gameRulesView.js":"7IcDc","./views/gameRoomView.js":"bKoNN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"YFNrm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class languageSelectView {
    _languageElement = document.querySelector("#language-selector");
    init() {
        const language = localStorage.getItem("language");
        if (language) this._languageElement.value = language;
        else this._languageElement.value = "en";
    }
    addHandlerSelect(handler) {
        this._languageElement.addEventListener("change", function() {
            handler(this.value);
        });
    }
}
exports.default = new languageSelectView();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6p5eU":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _uaJs = require("../localization/ua.js");
var _helpersJs = require("../helpers.js");
var _modelJs = require("../model.js");
class aboutView {
    _parentElement = document.querySelector("#about");
    _aboutReturnToMain = document.querySelector(".return-about");
    _aboutUkraineHelpDescription = document.querySelector(".about-ukraine-help-description");
    _aboutUkraineHelpLink = document.querySelector(".about-ukraine-help-link");
    _aboutProjectName = document.querySelector(".about-project-name");
    _aboutProjectDescription = document.querySelector(".about-project-description");
    _aboutDeveloper = document.querySelector(".about-developer");
    _aboutDeveloperLink = document.querySelector(".about-developer-link");
    _aboutDeveloperEmailDescription = document.querySelector(".about-developer-email-description");
    _aboutDeveloperDonateDescription = document.querySelector(".about-developer-donate-author-description");
    _aboutMapLibrary = document.querySelector(".about-map-library");
    _aboutWorldCountriesQuiz = document.querySelector(".about-world-countries-quiz");
    _aboutWorldCountriesQuizLink = document.querySelector(".about-world-countries-quiz-link");
    _facebookPage = document.querySelector(".about-countries-guesser-facebook-page");
    _facebookPageShare = document.querySelector(".about-countries-guesser-facebook-page-share");
    _gameModalRulesLabel = document.getElementById("gameModalRulesLabel");
    _gameModalRulesContent = document.getElementById("gameRulesContent");
    _gameModalRulesCloseButton = document.getElementById("gameRulesCloseButton");
    _aboutGameRulesLink = document.querySelector(".about-game-rules");
    _returnToMainListenerAdded = false;
    _gameRulesListenerAdded = false;
    returnToMain(mainView, donateAuthorView, gameRulesView, gameRoomView) {
        this.hideAboutProject();
        donateAuthorView.hideDonateProject();
        gameRulesView.hideGameRulesProject();
        gameRoomView.hideGameRoomProject();
        mainView.showMain();
        sessionStorage.setItem("currentWindow", "main");
    }
    showGameRules() {
        this._gameModalRulesLabel.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Rules"];
        this._gameModalRulesCloseButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Close"];
        this._gameModalRulesContent.innerHTML = document.getElementById("game-rules-project-container").innerHTML;
        document.getElementById("game-rules-friend-link").classList.add("not-displayed");
        (0, _helpersJs.showGameRulesWindow)();
    }
    addGameRulesHandlerClick() {
        if (!this._gameRulesListenerAdded) {
            this._aboutGameRulesLink.addEventListener("click", this.showGameRules.bind(this));
            this._gameRulesListenerAdded = true;
        }
    }
    addReturnToMainHandlerClick(mainView, donateAuthorView, gameRulesView, gameRoomView) {
        if (!this._returnToMainListenerAdded) {
            this._aboutReturnToMain.addEventListener("click", this.returnToMain.bind(this, mainView, donateAuthorView, gameRulesView, gameRoomView));
            this._returnToMainListenerAdded = true;
        }
    }
    showAboutProjectInfo() {
        this.showAboutProject();
    }
    showAboutProject() {
        this._parentElement.classList.remove("not-displayed");
    }
    hideAboutProject() {
        this._parentElement.classList.add("not-displayed");
    }
    translateElements() {
        this._aboutReturnToMain.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["BACK"]}`;
        this._aboutUkraineHelpDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["You can support Ukraine in the fight against Russia's military aggression:"]}`;
        this._aboutUkraineHelpLink.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Come Back Alive"]}`;
        this._aboutProjectName.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["World Country Alliances Guesser Game"]}`;
        this._aboutProjectDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["geographic online strategy game that helps to study the geography of the countries of the world, neighboring countries, flags and parts of the world in a game format. Choose eight different alliances of countries on the map, as    well as four trap-countries for your opponent. The computer or your friend (depends on the selected game mode) will also choose the appropriate number of alliances of countries and trap-countries. The attempts to guess the countries take place in turn. The one who guesses the opponent's country gets an extra try. The one who guesses all the alliances of the opponent's countries first wins. Follow the messages at the top of the screen after the game starts."]}`;
        this._aboutDeveloper.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Project was created by Software Developer from Ukraine -"]}`;
        this._aboutDeveloperLink.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Dima Solovei"]}`;
        this._aboutDeveloperEmailDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["You can reach me by e-mail:"]}`;
        this._aboutDeveloperDonateDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Support Project"]}`;
        this._facebookPage.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Facebook Page"]}`;
        this._facebookPageShare.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["On Facebook Page you can share your impressions about the game or the results of your games"]}`;
        this._aboutMapLibrary.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Used Map Library:"]}`;
        this._aboutWorldCountriesQuiz.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Do you like Geography and Countries of the World? Visit"]}`;
        this._aboutWorldCountriesQuizLink.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["World Countries And Quizzes"]}`;
        this._aboutGameRulesLink.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Rules"]}`;
    }
}
exports.default = new aboutView();

},{"../localization/ua.js":"3eDg2","../helpers.js":"j4etx","../model.js":"6YxfE","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1REwb":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _uaJs = require("../localization/ua.js");
var _modelJs = require("../model.js");
class mainView {
    _parentElement = document.querySelector(".main-container");
    _aboutButton = document.querySelector("#about-button");
    _startButton = document.querySelector("#start-button");
    _playAgainButton = document.querySelector("#gameResultPlayButton");
    _startButtonText = document.querySelector("#startButtonText");
    _shareWebSite = document.querySelector("#shareWebSite");
    _supportProjectButton = document.querySelector("#support-project-button");
    _createGameRoomContainer = document.querySelector("#create-game-room-container");
    _onlyIndependentCountriesSelect = document.querySelector("#only-independent-countries-select");
    _hintsTypeSelect = document.querySelector("#hint-types-select");
    _hitTimeSelect = document.querySelector("#time-select");
    _bonusCountriesSelect = document.querySelector("#bonus-countries-select");
    _createGameRoomButton = document.querySelector("#create-game-room-button");
    _opponentLabel = document.querySelector("#opponent-label");
    _opponentLabelComputer = document.querySelector("#opponent-label-computer");
    _opponentLabelFriend = document.querySelector("#opponent-label-friend");
    _gameRoomIdLabel = document.querySelector("#game-room-heading-text");
    _opponentConnectionLabel = document.querySelector("#opponent-connection-main-page-text");
    _gameModeSlider = document.querySelector("#gameMode");
    _gameRulesButton = document.querySelector("#game-rules-button");
    _gameConfigurationHeader = document.querySelector("#game-configuration-header");
    _header = document.querySelector("header");
    _footer = document.querySelector("footer");
    _aboutButtonListenerAdded = false;
    _startButtonListenerAdded = false;
    _supportProjectListenerAdded = false;
    _gameRulesListenerAdded = false;
    _gameModeChangeListenerAdded = false;
    _gameRoomListenerAdded = false;
    _onlyIndependentCountriesListenerAdded = false;
    _hintsTypeListenerAdded = false;
    _hitTimeListenerAdded = false;
    _bonusCountriesSelectListenerAdded = false;
    async startGame(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
        const rawParams = window.location.search;
        const cleanedParams = rawParams.replace(/[\u200B-\u200D\uFEFF]/g, "");
        const urlParams = new URLSearchParams(cleanedParams);
        const gameRoomId = urlParams.get("gameRoom");
        const firebase = gameRoomView.getFirebase();
        if (!gameRoomId && !firebase.gameRoomId && this._gameModeSlider.value !== "0") {
            alert((0, _uaJs.localization)[_modelJs.worldCountries.language]["You have selected the game mode with a friend. First, create a game room. Click the 'Create Game Room' button."]);
            return;
        }
        document.querySelector("#startButtonText").classList.add("not-displayed");
        document.querySelector("#startLoaderSpinner").classList.remove("not-displayed");
        this._startButton.disabled = true;
        aboutView.hideAboutProject();
        donateAuthorView.hideDonateProject();
        gameRulesView.hideGameRulesProject();
        gameRoomView.hideGameRoomProject();
        gameView.initGameView(firebase);
        await new Promise((resolve)=>setTimeout(resolve, 250));
        this.hideMain();
        this._header.classList.add("not-displayed");
        this._footer.style.display = "none";
        document.querySelector("#startLoaderSpinner").classList.add("not-displayed");
        document.querySelector("#startButtonText").classList.remove("not-displayed");
        gameView.showGame();
        if (window.gtag) gtag("event", "game_select_countries_view");
    }
    aboutProject(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
        this.hideMain();
        aboutView.showAboutProject();
        donateAuthorView.hideDonateProject();
        gameRulesView.hideGameRulesProject();
        gameView.hideGame();
        gameRoomView.hideGameRoomProject();
        sessionStorage.setItem("currentWindow", "about-project");
        if (window.gtag) gtag("event", "about_project_view");
    }
    supportProject(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
        this.hideMain();
        aboutView.hideAboutProject();
        donateAuthorView.showDonateProject();
        gameRulesView.hideGameRulesProject();
        gameRoomView.hideGameRoomProject();
        gameView.hideGame();
        sessionStorage.setItem("currentWindow", "donate-author");
        if (window.gtag) gtag("event", "donate_project_view");
    }
    gameRules(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
        this.hideMain();
        aboutView.hideAboutProject();
        donateAuthorView.hideDonateProject();
        gameView.hideGame();
        gameRulesView.showGameRulesProject();
        gameRoomView.hideGameRoomProject();
        sessionStorage.setItem("currentWindow", "game-rules");
        if (window.gtag) gtag("event", "game_rules_view");
    }
    gameRoom(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
        aboutView.hideAboutProject();
        donateAuthorView.hideDonateProject();
        gameView.hideGame();
        gameRulesView.hideGameRulesProject();
        this.hideMain();
        gameRoomView.showGameRoomProject();
        sessionStorage.setItem("currentWindow", "game-room");
        if (window.gtag) gtag("event", "game_room_view");
    }
    addOnlyIndependentCountriesListener() {
        if (!this._onlyIndependentCountriesListenerAdded) {
            this._onlyIndependentCountriesSelect.addEventListener("change", ()=>{
                document.getElementById("only-independent-countries-game-room-select").value = this._onlyIndependentCountriesSelect.value;
            });
            this._onlyIndependentCountriesListenerAdded = true;
        }
    }
    addHintsTypeListener() {
        if (!this._hintsTypeListenerAdded) {
            this._hintsTypeSelect.addEventListener("change", ()=>{
                document.getElementById("hint-types-game-room-select").value = this._hintsTypeSelect.value;
            });
            this._hintsTypeListenerAdded = true;
        }
    }
    addBonusCountriesListener() {
        if (!this._bonusCountriesSelectListenerAdded) {
            this._bonusCountriesSelect.addEventListener("change", ()=>{
                document.getElementById("bonus-countries-game-room-select").value = this._bonusCountriesSelect.value;
            });
            this._bonusCountriesSelectListenerAdded = true;
        }
    }
    addHitTimeListener() {
        if (!this._hitTimeListenerAdded) {
            this._hitTimeSelect.addEventListener("change", ()=>{
                document.getElementById("time-select-game-room").value = this._hitTimeSelect.value;
            });
            this._hitTimeListenerAdded = true;
        }
    }
    addGameRoomListenerHandler(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
        if (!this._gameRoomListenerAdded) {
            this._createGameRoomButton.addEventListener("click", this.gameRoom.bind(this, aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView));
            this._gameRoomListenerAdded = true;
        }
    }
    addGameModeChangeHandler(gameRoomView) {
        if (!this._gameModeChangeListenerAdded) {
            this._gameModeSlider.addEventListener("input", (event)=>{
                sessionStorage.setItem("game-mode", event.target.value);
                if (event.target.value === "0") {
                    this._createGameRoomContainer.classList.add("not-displayed");
                    this._gameModeSlider.style.background = "#d0d0d0";
                    gameRoomView.deleteGameRoom();
                } else {
                    this._createGameRoomContainer.classList.remove("not-displayed");
                    this._gameModeSlider.style.background = "#6495ed";
                }
            });
            this._gameModeChangeListenerAdded = true;
        }
    }
    async addStartGameHandlerClick(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
        const rawParams = window.location.search;
        const cleanedParams = rawParams.replace(/[\u200B-\u200D\uFEFF]/g, "");
        const urlParams = new URLSearchParams(cleanedParams);
        const gameRoomId = urlParams.get("gameRoom");
        const firebase = gameRoomView.getFirebase();
        if (gameRoomId) {
            await firebase.initializeApplication();
            firebase.getApplicationDatabase();
            await firebase.createConnection();
            firebase.setIsHost(false);
            await firebase.joinGameRoom(gameRoomId);
            firebase.setGameRoomId(gameRoomId);
        }
        if (!this._startButtonListenerAdded) {
            this._startButton.addEventListener("click", this.startGame.bind(this, aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView));
            this._playAgainButton.addEventListener("click", this.startGame.bind(this, aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView));
            this._startButtonListenerAdded = true;
        }
    }
    addSupportProjectHandlerClick(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
        if (!this._supportProjectListenerAdded) {
            this._supportProjectButton.addEventListener("click", this.supportProject.bind(this, aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView));
            this._supportProjectListenerAdded = true;
        }
    }
    addGameRulesHandlerClick(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
        if (!this._gameRulesListenerAdded) {
            this._gameRulesButton.addEventListener("click", this.gameRules.bind(this, aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView));
            this._gameRulesListenerAdded = true;
        }
    }
    addAboutHandlerClick(aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView) {
        if (!this._aboutButtonListenerAdded) {
            this._aboutButton.addEventListener("click", this.aboutProject.bind(this, aboutView, gameView, donateAuthorView, gameRulesView, gameRoomView));
            this._aboutButtonListenerAdded = true;
        }
    }
    showMain() {
        this._parentElement.classList.remove("not-displayed");
        this._parentElement.classList.add("d-grid");
        this._header.classList.remove("not-displayed");
        this._footer.style.display = "flex";
        this._startButton.disabled = false;
    }
    hideMain() {
        this._parentElement.classList.add("not-displayed");
        this._parentElement.classList.remove("d-grid");
    }
    translateElements() {
        this._gameConfigurationHeader.textContent = `\u{2699}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Configuration"]} \u{2699}\u{FE0F}`;
        this._onlyIndependentCountriesSelect.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Countries"];
        const onlyIndependentOptions = Array.from(this._onlyIndependentCountriesSelect.options);
        onlyIndependentOptions.forEach((option)=>{
            option.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language][option.value];
        });
        this._hitTimeSelect.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Time per Guess, seconds"];
        this._bonusCountriesSelect.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Bonus Countries"];
        this._hintsTypeSelect.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Hints"];
        const hintTypeOptions = Array.from(this._hintsTypeSelect.options);
        hintTypeOptions.forEach((option)=>{
            option.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language][option.value];
        });
        this._gameRulesButton.textContent = `\u{1F4DD} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Rules"]}`;
        this._supportProjectButton.textContent = `\u{1F517} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Support Project"]}`;
        this._startButtonText.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["START"]}`;
        this._aboutButton.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["About Project"]}`;
        this._opponentLabel.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent"]}`;
        this._opponentLabelComputer.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Computer"]}`;
        this._opponentLabelFriend.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Friend"]}`;
        this._gameRoomIdLabel.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Room ID:"]}`;
        this._opponentConnectionLabel.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language][this._opponentConnectionLabel.dataset.connection]}`;
        this._createGameRoomButton.textContent = `\u{1F3AE} ${(0, _uaJs.localization)[_modelJs.worldCountries.language][this._createGameRoomButton.dataset.text]}`;
        this._shareWebSite.firstElementChild.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Share"]}`;
    }
}
exports.default = new mainView();

},{"../localization/ua.js":"3eDg2","../model.js":"6YxfE","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"gRLA5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("../config.js");
var _gameConfigJs = require("../gameConfig.js");
var _gameJs = require("../game.js");
var _playerJs = require("../player.js");
var _playMapJs = require("../playMap.js");
var _helpersJs = require("../helpers.js");
var _modelJs = require("../model.js");
var _uaJs = require("../localization/ua.js");
class gameView {
    _parentElement = document.querySelector("#countriesBattleGamePlay");
    _gameMessageField = document.querySelector(".countries-battle-game-message");
    _gameModalCountriesSelectionHeader = document.getElementById("gameCountryAllianceInitialSelectionLabel");
    _gameModalCountriesSelectionContent = document.getElementById("gameCountryAllianceInitialSelectionCountries");
    _gameModalCountriesSelectionContentTips = document.getElementById("gameCountryAllianceInitialSelectionTips");
    _gameModalCountriesSelectionRandomButton = document.getElementById("gameCountryAllianceInitialSelectionRandomButton");
    _gameModalCountriesSelectionRandomButtonText = document.getElementById("gameCountryAllianceInitialSelectionRandomButtonText");
    _gameModalCountriesSelectionUserButton = document.getElementById("gameCountryAllianceInitialSelectionUserButton");
    _gameCountryAllianceInitialSelectionTutorialButton = document.getElementById("gameCountryAllianceInitialSelectionTutorialButton");
    _gameCountryAllianceInitialSelectionRulesButton = document.getElementById("gameCountryAllianceInitialSelectionRulesButton");
    _gameCountryAllianceInitialSelectionBackButton = document.getElementById("gameCountryAllianceInitialSelectionBack");
    _videoTutorialButtonListenerAdded = false;
    _gameRulesListenerAdded = false;
    _backButtonListenerAdded = false;
    _randomButtonListenerAdded = false;
    _gameConfiguration;
    _playMap;
    _playerOne;
    _playerTwo;
    _game;
    _firebase;
    initGameView(firebase) {
        this._gameConfiguration = new (0, _gameConfigJs.GameConfig)("default");
        this._playMap = new (0, _playMapJs.PlayMap)("playMap", this._gameConfiguration, "player-one-selected-countries-container", "player-one-countries-number", "player-two-selected-countries-container", "player-two-countries-number", "Your Map", (0, _configJs.GEOGRAPHICAL_CENTER));
        this._playerOne = new (0, _playerJs.Player)(this._playMap, "player-one-selected-countries-container", "player-one-countries-number", this._gameConfiguration, "userPlayer");
        this._playerTwo = new (0, _playerJs.Player)(this._playMap, "player-two-selected-countries-container", "player-two-countries-number", this._gameConfiguration, this._gameConfiguration.gameMode === "computer" ? "computerPlayer" : "friendPlayer");
        this._playerOne.setOpponentPlayer(this._playerTwo);
        this._playerTwo.setOpponentPlayer(this._playerOne);
        this._game = new (0, _gameJs.Game)(this._playerOne, this._playerTwo, this._playMap, this._gameConfiguration.gameMode === "computer" ? undefined : firebase, this._gameConfiguration);
        this._firebase = firebase;
        firebase.setGame(this._game);
        this._playMap.setGame(this._game);
        this._playMap.setPlayerOne(this._playerOne);
        this._playMap.setPlayerTwo(this._playerTwo);
        this._playerOne.setGame(this._game);
        this._playerTwo.setGame(this._game);
        this._playerOne.initData();
        this._playerTwo.initData();
        this._playerOne.requestSelectedCountriesFromOpponent();
    }
    showGame() {
        this._parentElement.classList.remove("not-displayed");
        this.showInitialCountriesSelectionWindow();
        this._playMap.map.invalidateSize();
    }
    showInitialCountriesSelectionWindow() {
        this._gameModalCountriesSelectionHeader.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Countries Selection"];
        this._gameModalCountriesSelectionContent.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["To play the game, choose eight different alliances of countries on the map and four trap-countries for your opponent. Follow the instructions at the top of the screen. To read the rules of the game, click the Rules button. We wish you a great game and a victory!"] + " \uD83C\uDFC6";
        this._gameModalCountriesSelectionContentTips.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Tips: after guessing your opponent's country, continue guessing neighboring countries until you guess the entire alliance of countries."];
        this._gameModalCountriesSelectionUserButton.textContent = "\uD83D\uDDFA\uFE0F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose Countries On Map"];
        this._gameModalCountriesSelectionRandomButtonText.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Random Countries Selection"];
        this._gameCountryAllianceInitialSelectionTutorialButton.textContent = "\uD83C\uDF93 " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Alliances Selection \u2014 Video Tutorial"];
        this._gameCountryAllianceInitialSelectionBackButton.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["BACK TO MAIN PAGE"];
        this._gameCountryAllianceInitialSelectionRulesButton.textContent = "\uD83D\uDCDD " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Rules"];
        const videoTutorial = document.getElementById("countryAllianceSelectionVideoTutorial");
        videoTutorial.classList.add("not-displayed");
        const modal = document.getElementById("gameCountryAllianceInitialSelectionModal");
        modal.addEventListener("hidden.bs.modal", ()=>{
            const video = document.getElementById("countryAllianceSelectionVideo");
            video.pause();
            video.currentTime = 0;
        }, {
            once: true
        });
        if (!this._backButtonListenerAdded) {
            this._gameCountryAllianceInitialSelectionBackButton.addEventListener("click", (function() {
                this._game.finishGame(false);
            }).bind(this));
            this._backButtonListenerAdded = true;
        }
        if (!this._gameRulesListenerAdded) {
            this._gameCountryAllianceInitialSelectionRulesButton.addEventListener("click", (function() {
                const video = document.getElementById("countryAllianceSelectionVideo");
                video.pause();
                video.currentTime = 0;
                videoTutorial.classList.add("not-displayed");
                this._game.showGameRules();
                if (window.gtag) gtag("event", "game_rules_view");
            }).bind(this));
            this._gameRulesListenerAdded = true;
        }
        if (!this._videoTutorialButtonListenerAdded) {
            this._gameCountryAllianceInitialSelectionTutorialButton.addEventListener("click", (function() {
                videoTutorial.classList.toggle("not-displayed");
                if (window.gtag) gtag("event", "game_countries_selection_video_tutorial");
            }).bind(this));
            this._videoTutorialButtonListenerAdded = true;
        }
        if (!this._randomButtonListenerAdded) {
            this._gameModalCountriesSelectionRandomButton.addEventListener("click", (async function() {
                const spinner = document.getElementById("randomCountrySelectionLoaderSpinner");
                document.getElementById("gameCountryAllianceInitialSelectionRandomEmoji").classList.add("not-displayed");
                spinner.style.display = "inline-block";
                this._playMap.reandomCountriesSelection();
                await new Promise((resolve)=>setTimeout(resolve, 300));
                spinner.style.display = "none";
                (0, _helpersJs.hideModalWindow)("gameCountryAllianceInitialSelectionModal");
                document.getElementById("gameCountryAllianceInitialSelectionRandomEmoji").classList.remove("not-displayed");
            }).bind(this));
            this._randomButtonListenerAdded = true;
        }
        (0, _helpersJs.showModalWindow)("gameCountryAllianceInitialSelectionModal");
    }
    hideGame() {
        this._parentElement.classList.add("not-displayed");
    }
    disposeGame() {
        this._firebase.cleanGame();
        this._firebase = null;
        this._gameConfiguration = null;
        this._game = null;
        this._playMap = null;
        this._playerOne = null;
        this._playerTwo = null;
    }
}
exports.default = new gameView();

},{"../config.js":"kBqbe","../gameConfig.js":"7LzZP","../game.js":"babqo","../player.js":"4m8EG","../playMap.js":"jEXSO","../helpers.js":"j4etx","../model.js":"6YxfE","../localization/ua.js":"3eDg2","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7LzZP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GameConfig", ()=>GameConfig);
class GameConfig {
    type = "default";
    constructor(type){
        this.type = type;
        if (type === "default") {
            this.countriesUnionsHtml = `<div class="countries-unions"><div style="margin-bottom: 3px;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country1">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country2">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country3">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country4">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country5">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country6">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country7">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
               <tr style="margin:0px">
                <td style="padding:2px;" class="country8">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            </div>
            <div style="margin-bottom: 3px;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country9">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country10">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country11">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country12">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country13">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
               <tr style="margin:0px">
                <td style="padding:2px;" class="country14">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            </div>
            <div style="margin-bottom: 3px;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country15">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country16">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country17">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country18">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            </div>
            <div style="margin-bottom: 2px;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country19">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px;" class="country20">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            </div>
             <div style="margin-bottom: 3px; padding-top:3px; border-top: 1px dotted black;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px; background-color:orange;" class="country21">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px; background-color:orange;" class="country22">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            </div>
             <div style="margin-bottom: 3px;"><div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px; background-color:orange;" class="country23">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            <div style="display:inline-flex; align-items:center"> <table>
              <tr style="margin:0px">
                <td style="padding:2px; background-color:orange;" class="country24">
                  <span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>
                </td>
              </tr>
            </table></div>
            </div></div>
            `;
            this.countriesTrapNumber = 4;
            this.countriesNumber = 20;
            this.countryUnionsNumber = 8;
            this.maxCountriesNumberInUnion = 4;
            this.hintsType = document.getElementById("hint-types-select").value;
            this.onlyIndependentCountries = document.getElementById("only-independent-countries-select").value === "Independent Countries" ? true : false;
            this.hitTime = +document.getElementById("time-select").value;
            this.bonusCountries = +document.getElementById("bonus-countries-select").value;
            this.gameMode = document.getElementById("gameMode").value === "0" ? "computer" : "user";
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"babqo":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Game", ()=>Game);
var _uaJs = require("./localization/ua.js");
var _controllerJs = require("./controller.js");
var _helpersJs = require("./helpers.js");
var _modelJs = require("./model.js");
class Game {
    finished = false;
    started = false;
    isOpponentPlayerReady = true;
    isPlayerReady = true;
    bonusCountries;
    superBonusCountry;
    secondSuperBonusCountry;
    gameModalResultLabel = document.getElementById("gameModalResultLabel");
    gameModalRulesLabel = document.getElementById("gameModalRulesLabel");
    gameModalRulesContent = document.getElementById("gameRulesContent");
    gameModalRulesCloseButton = document.getElementById("gameRulesCloseButton");
    gameModalPlayAgainButton = document.getElementById("gameResultPlayButton");
    guessCountriesMessageField;
    gameModalHeading = document.getElementById("gameResultHeading");
    gameResultScore = document.getElementById("gameResultScore");
    gameModalHeadingGuessed = document.getElementById("gameResultHeadingGuesedCountries");
    gameModalResultGuessedCountries = document.getElementById("gameResultGuessing");
    gameModalResultCloseButton = document.getElementById("gameResultCloseButton");
    gameModalResultShareButton = document.getElementById("shareGameResults");
    constructor(playerOne, playerTwo, playMap, firebase, gameConfiguration){
        this.guessCountriesMessageField = document.querySelector("#countries-battle-game-message");
        this.bonusCountries = [];
        this.superBonusCountry = null;
        this.secondSuperBonusCountry = null;
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.playMap = playMap;
        this.firebase = firebase;
        this.gameConfiguration = gameConfiguration;
    }
    getRandomBonusCountries(allCountries, excludedSet, count = this.gameConfiguration.bonusCountries) {
        if (count === 0) return [];
        const bonusCountries = [];
        for (const code of allCountries)if (!excludedSet.has(code) && code !== "RU") bonusCountries.push(code);
        bonusCountries.sort(()=>Math.random() - 0.5);
        this.bonusCountries = bonusCountries.slice(0, count);
        this.superBonusCountry = this.bonusCountries[0];
        this.secondSuperBonusCountry = this.bonusCountries[1];
    }
    showGameRules() {
        this.gameModalRulesLabel.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Rules"];
        this.gameModalRulesCloseButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Close"];
        this.gameModalRulesContent.innerHTML = document.getElementById("game-rules-project-container").innerHTML;
        const rawParams = window.location.search;
        const cleanedParams = rawParams.replace(/[\u200B-\u200D\uFEFF]/g, "");
        const urlParams = new URLSearchParams(cleanedParams);
        const gameRoomId = urlParams.get("gameRoom");
        if (this.gameConfiguration.gameMode === "user" && !gameRoomId) {
            document.getElementById("game-rules-friend-link-label").textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Link For Friend"] + ":";
            document.getElementById("game-rules-friend-link-input").value = document.getElementById("roomIdInput").value;
            document.getElementById("game-rules-friend-link").classList.remove("not-displayed");
        } else document.getElementById("game-rules-friend-link").classList.add("not-displayed");
        (0, _helpersJs.showGameRulesWindow)();
    }
    showGameResult(playerOneWon, deleteGameRoom = false) {
        this.gameModalResultGuessedCountries.innerHTML = "";
        this.playerOne.enableMapInteraction();
        this.gameModalResultLabel.textContent = "\uD83D\uDCDD " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Result"];
        this.gameModalResultCloseButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Close"];
        this.gameModalPlayAgainButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Play Again"];
        this.gameModalResultShareButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Share"];
        if (playerOneWon) {
            this.guessCountriesMessageField.textContent = "\uD83D\uDC4F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Congratulations! You won the game!"];
            this.gameResultScore.textContent = "\uD83C\uDFC5 " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Score"] + ": " + this.playerOne.score + " " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Points"];
            this.gameModalHeading.textContent = "\uD83D\uDC4F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Congratulations! You won the game!"];
            this.gameModalHeading.style.color = "#10b981";
            this.gameModalHeadingGuessed.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["You guessed all the opponent's countries:"];
            const index = Math.floor(this.playerTwo.selectedCountryCodes.size / 2) + this.playerTwo.selectedCountryCodes.size % 2;
            let countryIndex = 0;
            const userCountriesContainer = document.createElement("table");
            userCountriesContainer.style.border = "none";
            userCountriesContainer.style.tableLayout = "fixed";
            userCountriesContainer.style.width = "100%";
            const selectedCountryCodesArray = Array.from(this.playerTwo.selectedCountryCodes);
            for(let i = 0; i < index; i++){
                const countriesTemplate = this.playerTwo.selectedCountryCodes.size !== countryIndex + 1 ? `<tr style="display: table-row;"><td style="border:none; display:table-cell;"><div style="display:flex;"><img src="${this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryFlag}" alt="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryName]}" title="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryName]}" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/>
                              ${this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryCoatOfArms ? `<img src="${this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryCoatOfArms}" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">` : `<span style="vertical-align: text-bottom;">\u{1F6E1}\u{FE0F}</span>`}
                              </div></td> <td style="border:none;display:table-cell;"><span style="margin-right: 10px; vertical-align: sub;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryName]}</span></td><td style="border:none;display:table-cell;"><div style="display:flex;"><img src="${this.playerTwo.countries[selectedCountryCodesArray[countryIndex + 1]].countryFlag}" alt="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerTwo.countries[selectedCountryCodesArray[countryIndex + 1]].countryName]}" title="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerTwo.countries[selectedCountryCodesArray[countryIndex + 1]].countryName]}" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/>
                               ${this.playerTwo.countries[selectedCountryCodesArray[countryIndex + 1]].countryCoatOfArms ? `<img src="${this.playerTwo.countries[selectedCountryCodesArray[countryIndex + 1]].countryCoatOfArms}" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">` : `<span style="vertical-align: text-bottom;">\u{1F6E1}\u{FE0F}</span>`}
                              </div></td> <td style="border:none;display:table-cell;"><span style="vertical-align: sub;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerTwo.countries[selectedCountryCodesArray[countryIndex + 1]].countryName]}</span></td></tr>` : `<tr style="display: table-row;"><td style="border:none;display:table-cell;"><div style="display:flex;"><img src="${this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryFlag}" alt="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryName]}" title="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryName]}" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/>
                               ${this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryCoatOfArms ? `<img src="${this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryCoatOfArms}" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">` : `<span style="vertical-align: text-bottom;">\u{1F6E1}\u{FE0F}</span>`}
                              </div></td><td style="border:none;display:table-cell;"> <span style="vertical-align: sub;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerTwo.countries[selectedCountryCodesArray[countryIndex]].countryName]}</span></td></tr>`;
                userCountriesContainer.insertAdjacentHTML("beforeend", countriesTemplate);
                countryIndex = countryIndex + 2;
            }
            this.gameModalResultGuessedCountries.appendChild(userCountriesContainer);
        } else {
            this.guessCountriesMessageField.textContent = "\uD83D\uDC94 " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Sorry, You lost the game..."];
            this.gameResultScore.textContent = "\uD83C\uDFC5 " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Score"] + ": " + this.playerOne.score + " " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Points"];
            if (this.playerOne.score < 0) this.gameResultScore.style.color = "red";
            else this.gameResultScore.style.color = "#10b981";
            this.gameModalHeading.textContent = "\uD83D\uDC94 " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Sorry, You lost the game..."];
            this.gameModalHeading.style.color = "red";
            if (this.playerTwo.playerType === "friendPlayer") this.gameModalHeadingGuessed.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent guessed all your countries:"];
            else this.gameModalHeadingGuessed.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Computer guessed all your countries:"];
            const index = Math.floor(this.playerOne.selectedCountryCodes.size / 2) + this.playerOne.selectedCountryCodes.size % 2;
            let countryIndex = 0;
            const userCountriesContainer = document.createElement("table");
            userCountriesContainer.style.border = "none";
            const selectedCountryCodesArray = Array.from(this.playerOne.selectedCountryCodes);
            for(let i = 0; i < index; i++){
                const countriesTemplate = this.playerOne.selectedCountryCodes.size !== countryIndex + 1 ? `<tr style="display: table-row;"><td style="border:none;display:table-cell;"><div style="display:flex;"><img src="${this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryFlag}" alt="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryName]}" title="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryName]}" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/> 
                               ${this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryCoatOfArms ? `<img src="${this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryCoatOfArms}" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">` : `<span style="vertical-align: text-bottom;">\u{1F6E1}\u{FE0F}</span>`}
                              </div></td><td style="border:none;display:table-cell;"><span style="margin-right: 10px; vertical-align: sub;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryName]}</span></td><td style="border:none;display:table-cell;"><div style="display:flex;"><img src="${this.playerOne.countries[selectedCountryCodesArray[countryIndex + 1]].countryFlag}" alt="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerOne.countries[selectedCountryCodesArray[countryIndex + 1]].countryName]}" title="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerOne.countries[selectedCountryCodesArray[countryIndex + 1]].countryName]}" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/>
                               ${this.playerOne.countries[selectedCountryCodesArray[countryIndex + 1]].countryCoatOfArms ? `<img src="${this.playerOne.countries[selectedCountryCodesArray[countryIndex + 1]].countryCoatOfArms}" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">` : `<span style="vertical-align: text-bottom;">\u{1F6E1}\u{FE0F}</span>`}
                              </div></td> <td style="border:none;display:table-cell;"><span style="vertical-align: sub;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerOne.countries[selectedCountryCodesArray[countryIndex + 1]].countryName]}</span></td></tr>` : `<tr style="display: table-row;"><td style="border:none;display:table-cell;"><div style="display:flex;"><img src="${this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryFlag}" alt="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryName]}" title="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryName]}" style="height:15px; width:20px; border-radius:2px; box-shadow: 0 1px 1px #00000080,
                              inset 0 1px 1px #0000001f; vertical-align:baseline;"/>
                               ${this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryCoatOfArms ? `<img src="${this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryCoatOfArms}" style="margin-left: 5px; width:15px; height:15px; vertical-align: baseline;">` : `<span style="vertical-align: text-bottom;">\u{1F6E1}\u{FE0F}</span>`}
                              </div></td> <td style="border:none;display:table-cell;"> <span style="vertical-align: sub;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.playerOne.countries[selectedCountryCodesArray[countryIndex]].countryName]}</span></td></tr>`;
                userCountriesContainer.insertAdjacentHTML("beforeend", countriesTemplate);
                countryIndex = countryIndex + 2;
            }
            this.gameModalResultGuessedCountries.appendChild(userCountriesContainer);
        }
        this.playMap.exitFullScreen();
        (0, _helpersJs.showGameResultWindow)();
        this.playMap.finishGameHandler(false, deleteGameRoom);
    }
    finishGame(deleteGameRoom) {
        if (this.playMap) this.playMap.exitFullScreen();
        if (this.gameConfiguration.gameMode === "user") {
            this.playerOne.sendFinishGameToOpponent();
            if (window.gtag) gtag("event", "game_friend_end");
        } else if (window.gtag) gtag("event", "game_computer_end");
        this.playerOne.cleanPlayerResources(deleteGameRoom);
        this.playerTwo.cleanPlayerResources(deleteGameRoom);
        if (this.playMap) this.playMap.destroyMap();
        this.playerOne = null;
        this.playerTwo = null;
        this.playMap = null;
        this.finished = true;
        this.started = false;
        this.firebase = null;
        this.gameConfiguration = null;
        this.bonusCountries = null;
        this.superBonusCountry = null;
        this.secondSuperBonusCountry = null;
        (0, _helpersJs.hideModalWindow)("gameCountryAllianceInitialSelectionModal");
        (0, _controllerJs.loadMain)();
        (0, _controllerJs.resetFinishedGame)();
    }
    playHit(addCountryBoundariesAndMarkers = true) {
        if (this.gameConfiguration.gameMode === "user" && (!this.isPlayerReady || !this.isOpponentPlayerReady)) return;
        if (this.playerOne.playerAttemptToGuess) this.playerOne.playerHit(addCountryBoundariesAndMarkers);
        else this.playerTwo.playerHit(addCountryBoundariesAndMarkers);
    }
    startGame() {
        if (this.gameConfiguration.gameMode === "user" && (this.firebase.opponentConnectionState === "disconnected" || this.firebase.opponentConnectionState === "failed" || this.firebase.opponentConnectionState === "connecting")) {
            alert((0, _uaJs.localization)[_modelJs.worldCountries.language]["Connection with your opponent has failed. Try your attempt later."]);
            return;
        }
        if (this.gameConfiguration.gameMode === "user" && this.playerOne.playerConfigured && !this.playerTwo.playerConfigured) {
            this.playerOne.gameMessageField.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent has not yet selected countries. Wait for the message to start the game."];
            return;
        }
        this.playMap.initStartPlayMapView();
        this.playMap.cleanMap();
        this.playerOne.addAllCountryBoundariesAndMarkersInitial();
        this.playerTwo.addUserClickCountriesPlayHandler();
        this.started = true;
        if (window.gtag) {
            if (this.gameConfiguration.gameMode === "user") gtag("event", "game_friend_start");
            else gtag("event", "game_computer_start");
        }
        this.playerOne.sendStartGameToOpponent();
        if (this.gameConfiguration.gameMode === "user" && this.firebase && !this.firebase.isHost) {
            this.playerTwo.playerHit();
            return;
        }
        this.playerOne.playerHit();
    }
    opponentConnectionHandler(connectionState) {
        if (this.playerOne) this.playerOne.opponentConnectionHandler(connectionState);
    }
    requestSelectedCountriesFromOpponent() {
        if (this.firebase && this.firebase.opponentConnectionState === "connected") {
            const requestCountriesJson = JSON.stringify({
                type: "reqCountries"
            });
            this.firebase.sendMessage(requestCountriesJson);
        }
    }
    sendChatMessage(message) {
        if (this.firebase && this.firebase.opponentConnectionState === "connected") {
            const chatMessageJson = JSON.stringify({
                type: "chat",
                value: message
            });
            this.firebase.sendChatMessage(chatMessageJson);
            return true;
        } else return false;
    }
    opponentMessagesHandler(message) {
        if (this.playerOne) this.playerOne.opponentMessagesHandler(message);
    }
}

},{"./localization/ua.js":"3eDg2","./controller.js":"cCMpN","./helpers.js":"j4etx","./model.js":"6YxfE","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4m8EG":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Player", ()=>Player);
var _uaJs = require("./localization/ua.js");
var _configJs = require("./config.js");
var _countriesBoundsJs = require("./data/countriesBounds.js");
var _helpersJs = require("./helpers.js");
var _modelJs = require("./model.js");
class Player {
    hitTimeoutIds = [];
    hitIntervalIds = [];
    playerMap;
    playMap;
    opponentPlayer;
    gameConfiguration;
    playerType;
    game;
    gameMessageField;
    countriesNumberField;
    playButton;
    playerCountriesNumberField;
    playerSelectedCountriesContainer;
    playerSelectedCountriesContainerId;
    countryBoundariesAndMarkersFeatureGroup;
    lastGuessedCountryNames = [];
    usedHintsCount = 0;
    trapCountryHitted = 0;
    trapCountryHittedCode;
    highlightCountryCodes = [];
    score = 0;
    opponentPlayerConfigAcknowledged = false;
    opponentPlayerStartAcknowledged = false;
    playerAttemptToGuess = false;
    playerAlreadyHitting = false;
    playerWonGame = false;
    playerConfigured = false;
    selectedCountryCodes = new Set();
    selectedCountryTrapCodes = new Set();
    selectedCountryNeighboursCodes = new Set();
    countries = {};
    countriesCodeMapping = {};
    countryBoundariesStyles = {};
    countryMarkersStyles = {};
    hints = {};
    countryUnions = [];
    countryCodes = [];
    countriesToGuessNext = [];
    countriesToGuess = [];
    alreadyGuessedCountryCodes = [];
    hintTypes = new Set();
    openUserHintSelectionWindow = false;
    constructor(playerMap, playerSelectedCountriesContainerId, playerCountriesNumberContainerId, gameConfiguration, playerType = "userPlayer"){
        this.playerMap = playerMap.map;
        this.playMap = playerMap;
        this.gameConfiguration = gameConfiguration;
        this.playerType = playerType;
        if (playerType === "userPlayer") this.playerAttemptToGuess = true;
        this.gameMessageField = document.querySelector("#countries-battle-game-message");
        this.playerSelectedCountriesContainerId = playerSelectedCountriesContainerId;
        this.playerCountriesNumberField = document.getElementById(playerCountriesNumberContainerId);
        this.playerSelectedCountriesContainer = document.getElementById(playerSelectedCountriesContainerId);
        this.countriesNumberField = document.getElementById("countries-number-field");
        this.playButton = document.querySelector(".guess-country-game-play");
    }
    clearAllTimeouts(player) {
        player.hitTimeoutIds.forEach((id)=>{
            clearTimeout(id);
        });
        player.hitTimeoutIds.length = 0;
    }
    clearAllIntervals(player) {
        player.hitIntervalIds.forEach((id)=>{
            clearInterval(id);
        });
        player.hitIntervalIds.length = 0;
    }
    cleanPlayerResources(deleteGameRoom) {
        if (deleteGameRoom) {
            (0, _helpersJs.resetGameRoomContainer)();
            sessionStorage.removeItem("game-room");
            if (this.game.firebase) this.game.firebase.cleanupResources(false);
        }
        if (this.hitTimeoutIds && this.hitTimeoutIds.length != 0) this.clearAllTimeouts(this);
        if (this.hitIntervalIds && this.hitIntervalIds.length != 0) this.clearAllIntervals(this);
        this.hitTimeoutIds = [];
        this.hitIntervalIds = [];
        this.playMap.countryBoundariesAndMarkersLayer.boundaries = null;
        this.playMap.countryBoundariesAndMarkersLayer.markers = null;
        this.playMap = null;
        this.playerMap = null;
        this.opponentPlayer = null;
        this.gameConfiguration = null;
        this.playerType = null;
        this.game = null;
        this.gameMessageField = null;
        this.countriesNumberField = null;
        this.playButton = null;
        this.playerCountriesNumberField = null;
        this.playerSelectedCountriesContainer = null;
        this.playerSelectedCountriesContainerId = null;
        this.selectedCountryCodes = null;
        this.selectedCountryTrapCodes = null;
        this.selectedCountryNeighboursCodes = null;
        this.countries = null;
        this.lastGuessedCountryNames = [];
        this.countriesCodeMapping = null;
        this.countryBoundariesStyles = null;
        this.countryMarkersStyles = null;
        this.hints = null;
        this.usedHintsCount = null;
        this.score = null;
        this.trapCountryHitted = null;
        this.trapCountryHittedCode = null;
        this.highlightCountryCodes = [];
        this.playerAttemptToGuess = null;
        this.openUserHintSelectionWindow = null;
        this.opponentPlayerConfigAcknowledged = null;
        this.opponentPlayerStartAcknowledged = null;
        this.countryBoundariesAndMarkersFeatureGroup = null;
        this.playerConfigured = null;
        this.playerWonGame = null;
        this.playerAlreadyHitting = null;
        this.countryUnions = null;
        this.countryCodes = null;
        this.countriesToGuessNext = null;
        this.countriesToGuess = null;
        this.alreadyGuessedCountryCodes = null;
        this.hintTypes = null;
        this.outlineMapHandler = null;
        document.getElementById("countryOutlineMap").innerHTML = "";
    }
    initData() {
        this.hitTimeoutIds = [];
        this.hitIntervalIds = [];
        this.playMap.initSelectionCountriesMapView();
        this.selectedCountryCodes = new Set();
        this.selectedCountryTrapCodes = new Set();
        this.selectedCountryNeighboursCodes = new Set();
        this.countries = {};
        this.countriesCodeMapping = {};
        this.countryBoundariesStyles = {};
        this.countryMarkersStyles = {};
        this.hints = {};
        this.score = 0;
        this.usedHintsCount = 0;
        this.trapCountryHitted = 0;
        this.trapCountryHittedCode = null;
        this.highlightCountryCodes = [];
        if (this.playerType === "userPlayer") this.playerAttemptToGuess = true;
        else this.playerAttemptToGuess = false;
        this.openUserHintSelectionWindow = false;
        this.opponentPlayerConfigAcknowledged = false;
        this.opponentPlayerStartAcknowledged = false;
        this.playerConfigured = false;
        this.playerWonGame = false;
        this.playerAlreadyHitting = false;
        this.lastGuessedCountryNames = [];
        this.countryBoundariesAndMarkersFeatureGroup = L.featureGroup();
        if (this.gameConfiguration.hintsType === "All Hints" || this.gameConfiguration.hintsType === "Choose Hints") this.hintTypes = new Set([
            "country",
            "capital",
            "region",
            "subregion",
            "flag",
            "emblem",
            "boundary",
            "photo"
        ]);
        else if (this.gameConfiguration.hintsType === "Text Hints") this.hintTypes = new Set([
            "country",
            "capital",
            "region",
            "subregion"
        ]);
        else this.hintTypes = new Set([
            "flag",
            "emblem",
            "boundary",
            "photo"
        ]);
        this.countryUnions = [
            new Array(4),
            new Array(4),
            new Array(3),
            new Array(3),
            new Array(2),
            new Array(2),
            new Array(1),
            new Array(1)
        ];
        this.countryCodes = [];
        this.countriesToGuessNext = [];
        this.countriesToGuess = [];
        this.alreadyGuessedCountryCodes = [];
        let worldCountries = [];
        if (this.gameConfiguration.onlyIndependentCountries) worldCountries = _modelJs.worldCountries.countries.filter((country)=>country.independent);
        else worldCountries = _modelJs.worldCountries.countries;
        worldCountries.forEach((country)=>{
            if (this.playerType === "userPlayer") {
                const countryGeo = (0, _helpersJs.getCountryGeo)(country.cca2);
                const countryTooltip = this.createCountryTooltip(country);
                const countryBoundary = this.createCountryBoundary(countryGeo, country.cca2, countryTooltip);
                const countryPopup = this.createCountryPopup(country);
                const countryMarker = this.createCountryMarker(country, countryBoundary, countryTooltip, countryPopup, 15, 15);
                this.addMouseOverStyleEventToCountryBoundary(countryBoundary, countryMarker, {
                    weight: 1,
                    fillOpacity: 0.5,
                    opacity: 1,
                    className: country.cca2
                });
                this.addMouseOutStyleEventToCountryBoundary(countryBoundary, countryMarker, {
                    weight: 0,
                    fillOpacity: 0.1,
                    opacity: 0,
                    className: country.cca2
                });
                this.playMap.countryBoundariesAndMarkersLayer.boundaries[country.cca2] = countryBoundary;
                this.playMap.countryBoundariesAndMarkersLayer.markers[country.cca2] = countryMarker;
            }
            this.countriesCodeMapping[country.cca3] = country.cca2;
            this.countryCodes.push(country.cca2);
            this.countries[country.cca2] = {
                countryName: country.name.common,
                countryWikiLandscapeCategoryName: country?.wikiLandscapeCategoryName,
                countryCapital: country.capital?.[0],
                countryRegion: country.region,
                countrySubregion: country?.subregion,
                countryFlag: country.flags.png,
                countryCoatOfArms: country.coatOfArms?.png,
                countryIndependent: country.independent,
                cca2: country.cca2,
                cca3: country.cca3,
                latlng: country.latlng,
                capitalLatLng: country.capitalInfo.latlng,
                countryBorders: country.borders ? country.borders : []
            };
        });
        if (this.gameConfiguration.gameMode === "user" && this.game && this.game.firebase && this.game.firebase.opponentConnectionState) this.game.opponentConnectionHandler(this.game.firebase.opponentConnectionState);
        this.addCountryBoundariesAndMarkers(this.gameConfiguration.maxCountriesNumberInUnion);
        this.selectedCountryTrapCodes.forEach((countryCode)=>{
            this.selectedCountryCodes.delete(countryCode);
        });
        if (this.playerType === "computerPlayer") this.selectRandomCountries();
        this.setMessageInnerHtmlField(`<span style="font-size: 0.8rem;">\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first alliance from four countries on map or click"] + " \uD83C\uDFB2"}</span>`);
    }
    addCountryBoundaryBlinking(countryCode) {
        const countryBoundary = document.querySelector(`.${countryCode}`);
        if (countryBoundary) countryBoundary.classList.add("blinking");
    }
    removeCountryBoundaryBlinking(countryCode) {
        const countryBoundary = document.querySelector(`.${countryCode}`);
        if (countryBoundary) countryBoundary.classList.remove("blinking");
    }
    getRandomHintType() {
        let randomHintIndex = (0, _helpersJs.getRandomInt)(0, this.hintTypes.size - 1);
        let hintType = Array.from(this.hintTypes)[randomHintIndex];
        this.hintTypes.delete(hintType);
        return hintType;
    }
    addUserSelectedHint() {
        const selectedCountryCodes = [];
        let notGuessedCountries = this.opponentPlayer.countryUnions.filter((countryUnion)=>countryUnion.every((item)=>!Object.values(item)[0].guessed)).flatMap((countryUnion)=>countryUnion.map((item)=>Object.keys(item)[0])).filter((countryCode)=>!(countryCode in this.hints));
        if (notGuessedCountries.length !== 0) selectedCountryCodes.push(...notGuessedCountries);
        else {
            notGuessedCountries = this.opponentPlayer.countryUnions.filter((countryUnion)=>countryUnion.some((item)=>!Object.values(item)[0].guessed)).flatMap((countryUnion)=>countryUnion.filter((item)=>!Object.values(item)[0].guessed).map((item)=>Object.keys(item)[0])).filter((countryCode)=>!(countryCode in this.hints));
            selectedCountryCodes.push(...notGuessedCountries);
        }
        if (selectedCountryCodes.length === 0) return;
        const userHintTypeSelect = document.getElementById("user-hint-types-select");
        const userHintPlayButton = document.getElementById("gameUserHintSelectionPlayButton");
        const userHintHeader = document.getElementById("gameUserHintSelectionLabel");
        userHintPlayButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Play"];
        userHintHeader.textContent = "\uD83D\uDCA1 " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Hint Selection"] + " \uD83D\uDCA1";
        const userHintTextContainer = document.getElementById("gameUserHintSelectionText");
        const trapCountryHitted = this.countries[this.trapCountryHittedCode];
        userHintTextContainer.innerHTML = `${this.opponentPlayer.playerType === "computerPlayer" ? `<div>${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Computer has fallen into a trap-country"]}${`<img src="${trapCountryHitted.countryFlag}" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${trapCountryHitted.countryCoatOfArms ? `<img src="${trapCountryHitted.countryCoatOfArms}" style="margin-left:5px; width:15px; height:15px; vertical-align: sub;">` : ""} <span style="margin-left:5px;color: darkblue;font-weight:bold;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][trapCountryHitted.countryName]}</span>`}</div>` : `<div>${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent has fallen into a trap-country"]}${`<img src="${trapCountryHitted.countryFlag}" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${trapCountryHitted.countryCoatOfArms ? `<img src="${trapCountryHitted.countryCoatOfArms}" style="margin-left:5px; width:15px; height:15px; vertical-align: sub;">` : ""} <span style="margin-left:5px;color: darkblue;font-weight:bold;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][trapCountryHitted.countryName]}</span>`}</div>`}
    <div>${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose a hint from the list below"]}:</div>`;
        userHintTypeSelect.innerHTML = "";
        if (this.hintTypes.has("country")) {
            const countryNameOption = new Option((0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Name"], "country");
            userHintTypeSelect.add(countryNameOption);
        }
        if (this.hintTypes.has("flag")) {
            const countryFlagOption = new Option((0, _uaJs.localization)[_modelJs.worldCountries.language]["Flag"], "flag");
            userHintTypeSelect.add(countryFlagOption);
        }
        if (this.hintTypes.has("region")) {
            const countryRegionOption = new Option((0, _uaJs.localization)[_modelJs.worldCountries.language]["Region"], "region");
            userHintTypeSelect.add(countryRegionOption);
        }
        if (this.hintTypes.has("boundary")) {
            const countryBoundaryOption = new Option((0, _uaJs.localization)[_modelJs.worldCountries.language]["Outline"], "boundary");
            userHintTypeSelect.add(countryBoundaryOption);
        }
        const hasCapital = selectedCountryCodes.filter((countryCode)=>{
            return this.opponentPlayer.countries[countryCode].countryCapital !== undefined;
        });
        if (hasCapital.length > 0 && this.hintTypes.has("capital")) {
            const countryCapitalOption = new Option((0, _uaJs.localization)[_modelJs.worldCountries.language]["Capital"], "capital");
            userHintTypeSelect.add(countryCapitalOption);
        }
        const hasSubregion = selectedCountryCodes.filter((countryCode)=>{
            return this.opponentPlayer.countries[countryCode].countrySubregion !== undefined;
        });
        if (hasSubregion.length > 0 && this.hintTypes.has("subregion")) {
            const countrySubregionOption = new Option((0, _uaJs.localization)[_modelJs.worldCountries.language]["Subregion"], "subregion");
            userHintTypeSelect.add(countrySubregionOption);
        }
        const hasCoatOfArms = selectedCountryCodes.filter((countryCode)=>{
            return this.opponentPlayer.countries[countryCode].countryCoatOfArms !== undefined;
        });
        if (hasCoatOfArms.length > 0 && this.hintTypes.has("emblem")) {
            const countryCoatOfArmsOption = new Option((0, _uaJs.localization)[_modelJs.worldCountries.language]["CoatOfArms"], "emblem");
            userHintTypeSelect.add(countryCoatOfArmsOption);
        }
        const hasCountryPhoto = selectedCountryCodes.filter((countryCode)=>{
            return this.opponentPlayer.countries[countryCode].countryWikiLandscapeCategoryName !== undefined;
        });
        if (hasCountryPhoto.length > 0 && this.hintTypes.has("photo")) {
            const countryPhotoOption = new Option((0, _uaJs.localization)[_modelJs.worldCountries.language]["CountryPhoto"], "photo");
            userHintTypeSelect.add(countryPhotoOption);
        }
        userHintPlayButton.addEventListener("click", (async function() {
            const selectedHintType = userHintTypeSelect.value;
            let randomCountryIndex = (0, _helpersJs.getRandomInt)(0, selectedCountryCodes.length - 1);
            let countryCode = selectedCountryCodes[randomCountryIndex];
            const country = this.opponentPlayer.countries[countryCode];
            if (selectedHintType === "country") this.hints[countryCode] = {
                Country: country.countryName
            };
            else if (selectedHintType === "flag") this.hints[countryCode] = {
                Flag: country.countryFlag
            };
            else if (selectedHintType === "region") this.hints[countryCode] = {
                Region: country.countryRegion
            };
            else if (selectedHintType === "boundary") this.hints[countryCode] = {
                Outline: country.countryName
            };
            else if (selectedHintType === "capital") {
                const randomCountryCapitalIndex = (0, _helpersJs.getRandomInt)(0, hasCapital.length - 1);
                const countryCapitalCode = hasCapital[randomCountryCapitalIndex];
                const countryCapital = this.opponentPlayer.countries[countryCapitalCode];
                this.hints[countryCapitalCode] = {
                    Capital: countryCapital.countryCapital
                };
            } else if (selectedHintType === "subregion") {
                const randomCountrySubregionIndex = (0, _helpersJs.getRandomInt)(0, hasSubregion.length - 1);
                const countrySubregionCode = hasSubregion[randomCountrySubregionIndex];
                const countrySubregion = this.opponentPlayer.countries[countrySubregionCode];
                this.hints[countrySubregionCode] = {
                    Subregion: countrySubregion.countrySubregion
                };
            } else if (selectedHintType === "emblem") {
                const randomCountryCoatOfArmsIndex = (0, _helpersJs.getRandomInt)(0, hasCoatOfArms.length - 1);
                const countryCoatOfArmsCode = hasCoatOfArms[randomCountryCoatOfArmsIndex];
                const countryCoatOfArms = this.opponentPlayer.countries[countryCoatOfArmsCode];
                this.hints[countryCoatOfArmsCode] = {
                    CoatOfArms: countryCoatOfArms.countryCoatOfArms
                };
            } else if (selectedHintType === "photo") {
                const randomCountryPhotoIndex = (0, _helpersJs.getRandomInt)(0, hasCountryPhoto.length - 1);
                const countryPhotoCode = hasCountryPhoto[randomCountryPhotoIndex];
                const countryPhoto = this.opponentPlayer.countries[countryPhotoCode];
                const countryPhotoUrl = await (0, _helpersJs.getCountryPhoto)(countryPhoto);
                if (countryPhotoUrl === null) this.hints[countryPhotoCode] = {
                    Flag: countryPhoto.countryFlag
                };
                else this.hints[countryPhotoCode] = {
                    CountryPhoto: countryPhotoUrl
                };
            }
            this.hintTypes.delete(selectedHintType);
            this.addHintsToHintPanel();
            (0, _helpersJs.hideModalWindow)("gameUserHintSelectionModal");
            this.setHitTimeout();
        }).bind(this), {
            once: true
        });
        (0, _helpersJs.showModalWindow)("gameUserHintSelectionModal");
    }
    async addHint(trapCountryCode, addCountryImage, hintType) {
        const selectedCountryCodes = [];
        let notGuessedCountries = this.opponentPlayer.countryUnions.filter((countryUnion)=>countryUnion.every((item)=>!Object.values(item)[0].guessed)).flatMap((countryUnion)=>countryUnion.map((item)=>Object.keys(item)[0])).filter((countryCode)=>!(countryCode in this.hints));
        if (notGuessedCountries.length !== 0) selectedCountryCodes.push(...notGuessedCountries);
        else {
            notGuessedCountries = this.opponentPlayer.countryUnions.filter((countryUnion)=>countryUnion.some((item)=>!Object.values(item)[0].guessed)).flatMap((countryUnion)=>countryUnion.filter((item)=>!Object.values(item)[0].guessed).map((item)=>Object.keys(item)[0])).filter((countryCode)=>!(countryCode in this.hints));
            selectedCountryCodes.push(...notGuessedCountries);
        }
        if (selectedCountryCodes.length === 0) return;
        let randomCountryIndex = (0, _helpersJs.getRandomInt)(0, selectedCountryCodes.length - 1);
        let countryCode = selectedCountryCodes[randomCountryIndex];
        const country = this.opponentPlayer.countries[countryCode];
        if (hintType === "capital") {
            const hasCapital = selectedCountryCodes.some((countryCode)=>{
                return this.opponentPlayer.countries[countryCode].countryCapital !== undefined;
            });
            const countryCapital = country.countryCapital;
            while(!countryCapital && hasCapital)this.addHint(trapCountryCode, addCountryImage, hintType);
            if (countryCapital) this.hints[countryCode] = {
                Capital: countryCapital
            };
            else this.hints[countryCode] = {
                Country: country.countryName
            };
        } else if (hintType === "country") this.hints[countryCode] = {
            Country: country.countryName
        };
        else if (hintType === "boundary") this.hints[countryCode] = {
            Outline: country.countryName
        };
        else if (hintType === "flag") this.hints[countryCode] = {
            Flag: country.countryFlag
        };
        else if (hintType === "region") this.hints[countryCode] = {
            Region: country.countryRegion
        };
        else if (hintType === "photo") {
            const countryPhotoUrl = await (0, _helpersJs.getCountryPhoto)(country);
            if (countryPhotoUrl && this.playerType !== "computerPlayer") this.hints[countryCode] = {
                CountryPhoto: countryPhotoUrl
            };
            else if (countryPhotoUrl === null) this.hints[countryCode] = {
                Flag: country.countryFlag
            };
            else this.hints[countryCode] = {
                Flag: country.countryFlag
            };
        } else if (hintType === "subregion") {
            const hasSubregion = selectedCountryCodes.some((countryCode)=>{
                return this.opponentPlayer.countries[countryCode].countrySubregion !== undefined;
            });
            const countrySubregion = country.countrySubregion;
            while(!countrySubregion && hasSubregion)this.addHint(trapCountryCode, addCountryImage, hintType);
            if (countrySubregion) this.hints[countryCode] = {
                Subregion: countrySubregion
            };
            else this.hints[countryCode] = {
                Region: country.countryRegion
            };
        } else {
            const hasCoatOfArms = selectedCountryCodes.some((countryCode)=>{
                return this.opponentPlayer.countries[countryCode].countryCoatOfArms !== undefined;
            });
            const countryCoatOfArms = country.countryCoatOfArms;
            while(!countryCoatOfArms && hasCoatOfArms)this.addHint(trapCountryCode, addCountryImage, hintType);
            if (countryCoatOfArms) this.hints[countryCode] = {
                CoatOfArms: countryCoatOfArms
            };
            else this.hints[countryCode] = {
                Flag: country.countryFlag
            };
        }
        this.addSelectedCountryToCountryPanel(this.playerSelectedCountriesContainerId, trapCountryCode, Array.from(this.selectedCountryTrapCodes).indexOf(trapCountryCode) + 21, addCountryImage);
    }
    isHintUsed(countryCode) {
        if (countryCode in this.hints) {
            delete this.hints[countryCode];
            return true;
        }
        const country = this.countries[countryCode];
        for (const [hintCountryCode, hintObject] of Object.entries(this.hints)){
            const hintValue = Object.values(hintObject)[0];
            if (country.countryRegion === hintValue || country.countrySubregion === hintValue) {
                delete this.hints[hintCountryCode];
                return true;
            }
        }
        return false;
    }
    removeHint(countryCode) {
        delete this.hints[countryCode];
    }
    isCountryUnionGuessed(countryUnionIndex) {
        const countryUnion = this.countryUnions[countryUnionIndex];
        return !countryUnion.some((country)=>!Object.values(country)[0].guessed);
    }
    getCountryUnionIndex(countryCode) {
        let countryUnionIndexToReturn = undefined;
        this.countryUnions.forEach((countryUnion, countryUnionIndex)=>{
            if (countryUnionIndexToReturn) return;
            countryUnion.forEach((country)=>{
                if (countryCode in country) {
                    country[countryCode].guessed = true;
                    countryUnionIndexToReturn = countryUnionIndex;
                    return;
                }
            });
        });
        return countryUnionIndexToReturn;
    }
    openCountryPopup(countryPopup) {
        if (countryPopup) countryPopup.openOn(this.playerMap);
    }
    closeCountryPopup(countryPopup) {
        if (countryPopup) {
            countryPopup.close();
            this.playerMap.removeLayer(countryPopup);
        }
    }
    createCountryUnionMessageHtml(countryUnionIndex) {
        const countryUnion = this.countryUnions[countryUnionIndex];
        const countryUnionTable = document.createElement("table");
        const countryUnionRow = document.createElement("tr");
        countryUnionRow.style.marginBottom = "0px";
        countryUnionTable.appendChild(countryUnionRow);
        countryUnion.forEach((countryObject)=>{
            const countryCode = Object.keys(countryObject)[0];
            const country = this.countries[countryCode];
            countryUnionRow.insertAdjacentHTML("beforeend", `<td style="border: none;">
                  <img
                    src="${country.countryFlag}"
                    width="15px"
                    height="10px"
                    style="
                    border-radius: 2px;
                      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.5),
                        0 2px 2px 0 rgba(0, 0, 0, 0.12) inset;
                    "
                    alt="Country Flag"
                  />
                </td>`);
        });
        return countryUnionTable;
    }
    setMessageInnerHtmlField(message) {
        this.gameMessageField.innerHTML = "";
        this.gameMessageField.innerHTML = message;
    }
    addHintsToHintPanel() {
        const hintsPanel = document.getElementById("hints-panel");
        const hintBtn = document.getElementById("hints-link");
        const hintsLength = Object.keys(this.hints).length;
        if (hintsLength === 0) {
            if (hintBtn) hintBtn.remove();
            if (hintsPanel) hintsPanel.classList.add("not-displayed");
            return;
        }
        const hintsNumber = hintBtn ? +hintBtn.dataset.hints : 0;
        if (hintsNumber && hintsNumber === hintsLength) {
            hintBtn.classList.remove("not-displayed");
            return;
        }
        if (hintBtn) hintBtn.remove();
        if (hintsPanel) hintsPanel.classList.add("not-displayed");
        let hintType;
        const hintsPanelContent = document.getElementById("hints-panel-content");
        hintsPanelContent.innerHTML = "";
        Object.keys(this.hints).forEach((countryCode)=>{
            const hintObject = this.hints[countryCode];
            const hintHeader = Object.keys(hintObject)[0];
            hintType = hintHeader;
            const hintValue = Object.values(hintObject)[0];
            if (hintHeader === "CoatOfArms") {
                const coatOfArmsImage = document.getElementById("country-coat-of-arms");
                const coatOfArmsWindowHeader = document.getElementById("coatOfArmsModalLabel");
                coatOfArmsWindowHeader.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Coat Of Arms"];
                const coatOfArmsCloseButton = document.getElementById("coatOfArmsModalCloseButton");
                coatOfArmsCloseButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Close"];
                if (coatOfArmsImage) coatOfArmsImage.src = hintValue;
                const linkContainer = document.createElement("div");
                const coatOfArmsLink = document.createElement("button");
                coatOfArmsLink.id = "coat-of-arms-link";
                coatOfArmsLink.classList.add("btn", "btn-info", "btn-sm");
                coatOfArmsLink.style.fontSize = "0.65rem";
                coatOfArmsLink.style.width = "100%";
                coatOfArmsLink.style.marginBottom = "3px";
                coatOfArmsLink.style.border = "1px dotted grey";
                coatOfArmsLink.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language][hintHeader];
                coatOfArmsLink.addEventListener("click", (function() {
                    (0, _helpersJs.showCountryCoatOfArmsFlagWindow)("coatOfArmsModal", this.gameConfiguration.hitTime !== 0 ? true : false);
                }).bind(this));
                linkContainer.appendChild(coatOfArmsLink);
                hintsPanelContent.insertAdjacentElement("afterbegin", linkContainer);
            } else if (hintHeader === "Flag") {
                const flagImage = document.getElementById("country-flag");
                const flagWindowHeader = document.getElementById("flagModalLabel");
                flagWindowHeader.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Flag"];
                const flagCloseButton = document.getElementById("flagModalCloseButton");
                flagCloseButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Close"];
                if (flagImage) {
                    flagImage.src = hintValue;
                    flagImage.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                    flagImage.style.borderRadius = "5px";
                }
                const linkContainer = document.createElement("div");
                const flagLink = document.createElement("button");
                flagLink.id = "flag-link";
                flagLink.classList.add("btn", "btn-warning", "btn-sm");
                flagLink.style.fontSize = "0.65rem";
                flagLink.style.width = "100%";
                flagLink.style.marginBottom = "3px";
                flagLink.style.border = "1px dotted grey";
                flagLink.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language][hintHeader];
                flagLink.addEventListener("click", (function() {
                    (0, _helpersJs.showCountryCoatOfArmsFlagWindow)("flagModal", this.gameConfiguration.hitTime !== 0 ? true : false);
                }).bind(this));
                linkContainer.appendChild(flagLink);
                hintsPanelContent.insertAdjacentElement("afterbegin", linkContainer);
            } else if (hintHeader === "Outline") {
                const countryOutlineWindowHeader = document.getElementById("countryOutlineLabel");
                countryOutlineWindowHeader.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Country's Outline On Map"];
                const countryOutlineCloseButton = document.getElementById("countryOutlineCloseButton");
                countryOutlineCloseButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Close"];
                const linkContainer = document.createElement("div");
                const countryOutlineLink = document.createElement("button");
                countryOutlineLink.id = "country-outline-link";
                countryOutlineLink.classList.add("btn", "btn-success", "btn-sm");
                countryOutlineLink.style.fontSize = "0.65rem";
                countryOutlineLink.style.width = "100%";
                countryOutlineLink.style.marginBottom = "3px";
                countryOutlineLink.style.border = "1px dotted grey";
                countryOutlineLink.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language][hintHeader];
                const outlineModal = document.getElementById("countryOutlineModal");
                if (this.outlineMapHandler) outlineModal.removeEventListener("shown.bs.modal", this.outlineMapHandler);
                this.outlineMapHandler = this.createOutlineMap.bind(this, hintValue, countryCode);
                outlineModal.addEventListener("shown.bs.modal", this.outlineMapHandler, {
                    once: true
                });
                countryOutlineLink.addEventListener("click", (function() {
                    (0, _helpersJs.showCountryCoatOfArmsFlagWindow)("countryOutlineModal", this.gameConfiguration.hitTime !== 0 ? true : false);
                }).bind(this));
                linkContainer.appendChild(countryOutlineLink);
                hintsPanelContent.insertAdjacentElement("afterbegin", linkContainer);
            } else if (hintHeader === "CountryPhoto") {
                const countryPhoto = document.getElementById("country-photo");
                const fullScreenButton = document.getElementById("countryPhotoFullScreenButton");
                const countryPhotoWindowHeader = document.getElementById("countryPhotoLabel");
                countryPhotoWindowHeader.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Landscape Of Country"];
                const countryPhotoCloseButton = document.getElementById("countryPhotoCloseButton");
                countryPhotoCloseButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Close"];
                fullScreenButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Full Screen"];
                if (countryPhoto) {
                    countryPhoto.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Click to toggle full screen"];
                    countryPhoto.src = hintValue;
                    countryPhoto.style.width = "100%";
                    countryPhoto.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                    countryPhoto.style.borderRadius = "5px";
                }
                const linkContainer = document.createElement("div");
                const countryPhotoLink = document.createElement("button");
                countryPhotoLink.id = "country-photo-link";
                countryPhotoLink.classList.add("btn", "btn-secondary", "btn-sm");
                countryPhotoLink.style.fontSize = "0.65rem";
                countryPhotoLink.style.width = "100%";
                countryPhotoLink.style.marginBottom = "3px";
                countryPhotoLink.style.border = "1px dotted grey";
                countryPhotoLink.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language][hintHeader];
                countryPhoto.addEventListener("click", (function() {
                    this.playMap.exitFullScreen().then(()=>{
                        this.toggleCountryPhotoFullScreen("country-photo-container");
                    });
                }).bind(this));
                fullScreenButton.addEventListener("click", (function() {
                    this.playMap.exitFullScreen().then(()=>{
                        this.toggleCountryPhotoFullScreen("country-photo-container");
                    });
                }).bind(this));
                countryPhotoLink.addEventListener("click", (function() {
                    (0, _helpersJs.showCountryCoatOfArmsFlagWindow)("countryPhotoModal", this.gameConfiguration.hitTime !== 0 ? true : false);
                }).bind(this));
                linkContainer.appendChild(countryPhotoLink);
                hintsPanelContent.insertAdjacentElement("afterbegin", linkContainer);
            } else {
                let hint = "";
                if (hintHeader === "Capital") hint = (0, _uaJs.localization)[_modelJs.worldCountries.language]["capitals"][hintValue];
                else if (hintHeader === "Country") hint = (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][hintValue];
                else hint = (0, _uaJs.localization)[_modelJs.worldCountries.language][hintValue];
                const hintHtml = `<div style="font-size:0.7rem;"><span style="font-weight:bold;">${(0, _uaJs.localization)[_modelJs.worldCountries.language][hintHeader]}:</span>&nbsp;${hint}</div>`;
                hintsPanelContent.insertAdjacentHTML("beforeend", hintHtml);
            }
        });
        const hideHintsPanelContainer = document.createElement("div");
        const hideHintsPanelButton = document.createElement("button");
        hideHintsPanelButton.classList.add("btn", "btn-sm", "btn-primary");
        hideHintsPanelContainer.style.borderTop = "1px dashed black";
        hideHintsPanelButton.id = "hints-hide-button";
        hideHintsPanelButton.style.textAlign = "center";
        hideHintsPanelButton.style.fontSize = "0.65rem";
        hideHintsPanelButton.style.width = "100%";
        hideHintsPanelButton.style.marginTop = "2px";
        hideHintsPanelButton.style.border = "1px dotted grey";
        hideHintsPanelButton.style.cursor = "pointer";
        hideHintsPanelButton.style.fontWeight = "bold";
        hideHintsPanelButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Hide"];
        hideHintsPanelContainer.appendChild(hideHintsPanelButton);
        hideHintsPanelButton.addEventListener("click", (function() {
            hideHintsPanelButton.remove();
            hideHintsPanelContainer.remove();
            this.addHintsToHintPanel();
        }).bind(this), {
            once: true
        });
        hintsPanelContent.insertAdjacentElement("beforeend", hideHintsPanelContainer);
        L.Control.HintsButton = L.Control.extend({
            context: this,
            onAdd: function(map) {
                const hintsButton = L.DomUtil.create("button");
                hintsButton.classList.add("btn", "btn-sm");
                hintsButton.id = "hints-link";
                hintsButton.style.opacity = "0.8";
                hintsButton.style.fontSize = "0.65rem";
                hintsButton.style.marginTop = "10px";
                hintsButton.style.padding = "0.25rem";
                hintsButton.style.maxWidth = "220px";
                hintsButton.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                hintsButton.dataset.hints = `${hintsLength}`;
                if (hintsLength === 1) {
                    if (hintType && hintType === "CoatOfArms") hintsButton.classList.add("btn-info");
                    else if (hintType && hintType === "Flag") hintsButton.classList.add("btn-warning");
                    else if (hintType && hintType === "Outline") hintsButton.classList.add("btn-success");
                    else if (hintType && hintType === "CountryPhoto") hintsButton.classList.add("btn-secondary");
                    else hintsButton.classList.add("btn-primary");
                    hintsButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["View Hint"];
                } else {
                    hintsButton.classList.add("btn-primary");
                    hintsButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["View Hints"];
                }
                hintsButton.addEventListener("click", (function viewHint() {
                    if (hintType && hintsLength === 1) {
                        if (hintType === "CoatOfArms") (0, _helpersJs.showCountryCoatOfArmsFlagWindow)("coatOfArmsModal", this.gameConfiguration.hitTime !== 0 ? true : false);
                        else if (hintType === "Flag") (0, _helpersJs.showCountryCoatOfArmsFlagWindow)("flagModal", this.gameConfiguration.hitTime !== 0 ? true : false);
                        else if (hintType === "Outline") (0, _helpersJs.showCountryCoatOfArmsFlagWindow)("countryOutlineModal", this.gameConfiguration.hitTime !== 0 ? true : false);
                        else if (hintType === "CountryPhoto") (0, _helpersJs.showCountryCoatOfArmsFlagWindow)("countryPhotoModal", this.gameConfiguration.hitTime !== 0 ? true : false);
                        else {
                            if (button) button.remove();
                            hintsPanel.classList.remove("not-displayed");
                            return;
                        }
                        hintsButton.addEventListener("click", viewHint.bind(this), {
                            once: true
                        });
                    } else {
                        if (button) button.remove();
                        hintsPanel.classList.remove("not-displayed");
                    }
                }).bind(this.context), {
                    once: true
                });
                return hintsButton;
            },
            onRemove: function() {}
        });
        L.control.hintsbutton = function(opts) {
            return new L.Control.HintsButton(opts);
        };
        const button = L.control.hintsbutton({
            position: "topcenter"
        }).addTo(this.playerMap);
    }
    toggleCountryPhotoFullScreen(elementId) {
        const countryPhotoContainer = document.getElementById(elementId);
        const fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        if (fullscreenElement !== countryPhotoContainer) {
            if (countryPhotoContainer.requestFullscreen) countryPhotoContainer.requestFullscreen();
            else if (countryPhotoContainer.mozRequestFullScreen) countryPhotoContainer.mozRequestFullScreen();
            else if (countryPhotoContainer.webkitRequestFullscreen) countryPhotoContainer.webkitRequestFullscreen();
            else if (countryPhotoContainer.msRequestFullscreen) countryPhotoContainer.msRequestFullscreen();
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        }
    }
    createOutlineMap(hintValue, countryCode) {
        const countryBound = (0, _countriesBoundsJs.COUNTRY_BOUNDS).find((bound)=>hintValue === bound.name);
        const country = this.countries[countryCode];
        document.getElementById("countryOutlineMap").innerHTML = `<div
        id="outlineMap"
        style="
         background-color: #99d9f2;
          width: 300px;
          height: 225px;
          position: relative;
          border-radius: 5px;
          box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 5px, rgba(0, 0, 0, 0.12) 0px 2px 10px inset;
          border: 1px solid black;
        "
      ></div>`;
        const map = L.map("outlineMap", {
            attributionControl: false,
            zoomControl: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            touchZoom: false,
            keyboard: false,
            dragging: false
        });
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}").addTo(map);
        const countryGeo = (0, _helpersJs.getCountryGeo)(countryCode);
        L.geoJson(countryGeo, {
            style: {
                weight: 2,
                fillOpacity: 0.4,
                color: "#3388ff",
                fillColor: "#3388ff",
                opacity: 1
            }
        }).addTo(map);
        if (countryBound) map.fitBounds(countryBound.bounds, {
            animate: false
        });
        else map.setView(country.latlng ? country.latlng : country.capitalLatLng, 4.5, {
            animate: false
        });
        map.invalidateSize();
        const outlineModal = document.getElementById("countryOutlineModal");
        outlineModal.addEventListener("hidden.bs.modal", ()=>{
            map.remove();
        }, {
            once: true
        });
        this.outlineMapHandler = this.createOutlineMap.bind(this, hintValue, countryCode);
        outlineModal.addEventListener("shown.bs.modal", this.outlineMapHandler, {
            once: true
        });
    }
    isCountriesContainHint(hint) {
        return this.countryCodes.some((countryCode)=>{
            const country = this.countries[countryCode];
            return country.countryCapital === hint || country.countryRegion === hint || country.countrySubregion === hint || country.countryCoatOfArms === hint || country.countryFlag === hint || country.countryName === hint;
        });
    }
    selectComputerRandomCountryByHint(hint) {
        const countries = Object.values(this.countries).filter((country)=>{
            return (country.countryCapital === hint || country.countryRegion === hint || country.countrySubregion === hint || country.countryCoatOfArms === hint || country.countryFlag === hint || country.countryName === hint) && !this.alreadyGuessedCountryCodes.includes(country.cca2) && this.countryCodes.includes(country.cca2);
        });
        if (countries.length === 1) return countries[0].cca2;
        else {
            const countryIndex = (0, _helpersJs.getRandomInt)(0, countries.length - 1);
            return countries[countryIndex].cca2;
        }
    }
    enableMapInteraction() {
        document.getElementById("playMap").style.cursor = "grab";
        const countryBoundaries = document.querySelector(".leaflet-overlay-pane");
        countryBoundaries.style.pointerEvents = "auto";
        countryBoundaries.removeAttribute("inert");
        const markers = document.querySelector(".leaflet-marker-pane");
        markers.style.pointerEvents = "auto";
        markers.removeAttribute("inert");
        if (this.playerMap) {
            this.playerMap.dragging.enable();
            this.playerMap.doubleClickZoom.enable();
            this.playerMap.scrollWheelZoom.enable();
            this.playerMap.boxZoom.enable();
            this.playerMap.keyboard.enable();
            if (this.playerMap.tap) this.playerMap.tap.enable();
        }
    }
    disableMapInteraction() {
        document.getElementById("playMap").style.cursor = "default";
        const countryBoundaries = document.querySelector(".leaflet-overlay-pane");
        countryBoundaries.style.pointerEvents = "none";
        countryBoundaries.setAttribute("inert", "");
        const markers = document.querySelector(".leaflet-marker-pane");
        markers.style.pointerEvents = "none";
        markers.setAttribute("inert", "");
        if (this.playerMap) {
            this.playerMap.dragging.disable();
            this.playerMap.doubleClickZoom.disable();
            this.playerMap.scrollWheelZoom.disable();
            this.playerMap.boxZoom.disable();
            this.playerMap.keyboard.disable();
            if (this.playerMap.tap) this.playerMap.tap.disable();
        }
    }
    deleteCountryNeighbourBorders(player, country, selectedCodes, countriesNumberField) {
        const countryBorderCodes = country.countryBorders.map((countryBorder)=>{
            return player.countriesCodeMapping[countryBorder];
        }).filter((countryCode)=>countryCode !== undefined && player.countryCodes.includes(countryCode));
        countryBorderCodes.forEach((countryBorderCode)=>{
            if (!selectedCodes.has(countryBorderCode)) {
                const countryBoundary = player.playMap.countryBoundariesAndMarkersLayer.boundaries[countryBorderCode];
                const countryMarker = player.playMap.countryBoundariesAndMarkersLayer.markers[countryBorderCode];
                player.countryBoundariesStyles[countryBorderCode] = {
                    weight: 0,
                    fillOpacity: 0,
                    className: countryBorderCode,
                    opacity: 0
                };
                countryBoundary.setStyle(player.countryBoundariesStyles[countryBorderCode]);
                if (player.playerType !== "userPlayer") {
                    countryBoundary.off();
                    countryBoundary.unbindTooltip();
                    countryMarker.off();
                    countryMarker.unbindTooltip();
                    const countryBoundaryElements = document.getElementsByClassName(`${countryBorderCode}`);
                    if (countryBoundaryElements) {
                        const countryBoundaryElement = countryBoundaryElements[0];
                        countryBoundaryElement.style.pointerEvents = "none";
                    }
                }
                player.countryMarkersStyles[countryBorderCode] = {
                    opacity: 0
                };
                countryMarker.setOpacity(0);
                const countryIndexToDelete = player.countryCodes.indexOf(countryBorderCode);
                if (countryIndexToDelete >= 0) player.countryCodes.splice(countryIndexToDelete, 1);
                if (countriesNumberField) countriesNumberField.textContent = player.countryCodes.length;
            }
        });
    }
    async playerHit(addCountryBoundariesAndMarkers = true) {
        this.disableMapInteraction();
        if (addCountryBoundariesAndMarkers) this.opponentPlayer.addAllCountryBoundariesAndMarkers();
        if (this.playerType === "userPlayer" && this.gameConfiguration.hintsType !== "No Hints") this.addHintsToHintPanel();
        if (this.playerType === "computerPlayer") {
            let countryIndex = undefined;
            let countryCode = undefined;
            try {
                (0, _helpersJs.hideModalWindow)("flagModal");
                (0, _helpersJs.hideModalWindow)("coatOfArmsModal");
                (0, _helpersJs.hideModalWindow)("countryOutlineModal");
                (0, _helpersJs.hideModalWindow)("countryPhotoModal");
                document.getElementById("timer-field-container").style.display = "none";
                this.playMap.hideMapElement("hints-link");
                this.playMap.hideMapElement("hints-panel");
                this.playMap.hideMapElement("available-countries-panel");
                this.playMap.setMapFiledLabel("Your Map");
                this.opponentPlayer.openUserHintSelectionWindow = false;
                this.countriesNumberField.textContent = this.opponentPlayer.countryCodes.length;
                this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Computer is guessing your country..."]}`;
                await this.sleep(700);
                if (this.countriesToGuess.length !== 0) {
                    countryIndex = (0, _helpersJs.getRandomInt)(0, this.countriesToGuess.length - 1);
                    countryCode = this.countriesToGuess[countryIndex];
                    this.countriesToGuess.splice(countryIndex, 1);
                    const countryToDeleteIndex = this.opponentPlayer.countryCodes.indexOf(countryCode);
                    if (countryToDeleteIndex >= 0) this.opponentPlayer.countryCodes.splice(countryToDeleteIndex, 1);
                    this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
                } else if (this.countriesToGuessNext.length !== 0) {
                    countryIndex = (0, _helpersJs.getRandomInt)(0, this.countriesToGuessNext.length - 1);
                    countryCode = this.countriesToGuessNext[countryIndex];
                    this.countriesToGuessNext.splice(countryIndex, 1);
                    const countryToDeleteIndex = this.opponentPlayer.countryCodes.indexOf(countryCode);
                    if (countryToDeleteIndex >= 0) this.opponentPlayer.countryCodes.splice(countryToDeleteIndex, 1);
                    this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
                } else if (Object.keys(this.hints).length !== 0) {
                    const countryCodeKey = Object.keys(this.hints)[0];
                    const hintObject = this.hints[countryCodeKey];
                    const hint = Object.values(hintObject)[0];
                    if (this.opponentPlayer.isCountriesContainHint(hint)) {
                        countryCode = this.opponentPlayer.selectComputerRandomCountryByHint(hint);
                        this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
                        countryIndex = this.opponentPlayer.countryCodes.indexOf(countryCode);
                        this.opponentPlayer.countryCodes.splice(countryIndex, 1);
                    } else {
                        this.removeHint(countryCode);
                        this.usedHintsCount = this.usedHintsCount + 1;
                        countryIndex = (0, _helpersJs.getRandomInt)(0, this.opponentPlayer.countryCodes.length - 1);
                        countryCode = this.opponentPlayer.countryCodes[countryIndex];
                        this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
                        this.opponentPlayer.countryCodes.splice(countryIndex, 1);
                    }
                } else {
                    countryIndex = (0, _helpersJs.getRandomInt)(0, this.opponentPlayer.countryCodes.length - 1);
                    countryCode = this.opponentPlayer.countryCodes[countryIndex];
                    this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
                    this.opponentPlayer.countryCodes.splice(countryIndex, 1);
                }
                this.countriesNumberField.textContent = this.opponentPlayer.countryCodes.length;
                const country = this.countries[countryCode];
                const countryBoundary = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
                const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
                const countryPopup = countryMarker.getPopup();
                this.opponentPlayer.countryMarkersStyles[countryCode] = {
                    opacity: 0
                };
                countryMarker.setOpacity(0);
                const countryBound = (0, _countriesBoundsJs.COUNTRY_BOUNDS).find((bound)=>country.countryName === bound.name);
                this.opponentPlayer.openCountryPopup(countryPopup);
                const countryCoordinates = country.latlng ? country.latlng : country.capitalLatLng;
                if (countryBound) this.opponentPlayer.playerMap.fitBounds(countryBound.bounds, {
                    animate: false
                });
                else this.opponentPlayer.playerMap.setView(countryCoordinates, 4.5, {
                    animate: false
                });
                if (this.opponentPlayer.selectedCountryTrapCodes.has(countryCode)) try {
                    addCountryBoundariesAndMarkers = true;
                    this.setMessageInnerHtmlField(`<span>\u{26A0}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Computer has fallen into a trap-country"]}</span> <img src="${country.countryFlag}" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}.</span> ${this.gameConfiguration.hintsType !== "No Hints" ? `<span style="margin-left:5px;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["The opponent gets a hint"]}</span>` : ""}`);
                    if (this.gameConfiguration.hintsType === "Choose Hints") {
                        this.opponentPlayer.openUserHintSelectionWindow = true;
                        this.opponentPlayer.trapCountryHittedCode = countryCode;
                    }
                    this.opponentPlayer.trapCountryHitted = this.opponentPlayer.trapCountryHitted + 1;
                    if (this.opponentPlayer.trapCountryHitted === 1) this.score = this.score - 10;
                    else if (this.opponentPlayer.trapCountryHitted === 2) this.score = this.score - 20;
                    else if (this.opponentPlayer.trapCountryHitted === 3) this.score = this.score - 30;
                    else this.score = this.score - 50;
                    const scoreElement = document.getElementById("player-two-score-field");
                    scoreElement.textContent = `\u{1F3C5} ${this.score}`;
                    if (this.score < 0) scoreElement.style.color = "red";
                    else scoreElement.style.color = "green";
                    if (this.gameConfiguration.hintsType !== "No Hints" && this.gameConfiguration.hintsType !== "Choose Hints") {
                        const hintType = this.opponentPlayer.getRandomHintType();
                        this.opponentPlayer.addHint(countryCode, false, hintType);
                    } else this.opponentPlayer.addSelectedCountryToCountryPanel(this.opponentPlayer.playerSelectedCountriesContainerId, countryCode, Array.from(this.opponentPlayer.selectedCountryTrapCodes).indexOf(countryCode) + 21, false);
                    this.opponentPlayer.addCountryBoundaryBlinking(countryCode);
                    this.opponentPlayer.setElementStyle(countryBoundary, {
                        weight: 1,
                        color: "orange",
                        fillColor: "orange",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    });
                    this.playerAttemptToGuess = false;
                    this.opponentPlayer.playerAttemptToGuess = true;
                    await this.sleep(2500);
                    this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
                    this.opponentPlayer.closeCountryPopup(countryPopup);
                    this.opponentPlayer.countryBoundariesStyles[countryCode] = {
                        weight: 0,
                        color: "orange",
                        fillColor: "orange",
                        fillOpacity: 0,
                        opacity: 0,
                        className: countryCode
                    };
                    this.deleteCountryNeighbourBorders(this.opponentPlayer, country, this.opponentPlayer.selectedCountryTrapCodes, this.countriesNumberField);
                    this.opponentPlayer.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                } catch (err) {
                    if (countryCode) {
                        this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
                        this.opponentPlayer.closeCountryPopup(countryPopup);
                        this.opponentPlayer.countryBoundariesStyles[countryCode] = {
                            weight: 0,
                            color: "orange",
                            fillColor: "orange",
                            fillOpacity: 0,
                            opacity: 0,
                            className: countryCode
                        };
                        this.deleteCountryNeighbourBorders(this.opponentPlayer, country, this.opponentPlayer.selectedCountryTrapCodes, this.countriesNumberField);
                    }
                    this.playerAttemptToGuess = false;
                    this.opponentPlayer.playerAttemptToGuess = true;
                    this.opponentPlayer.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                }
                else if (this.game && this.game.bonusCountries.includes(countryCode)) try {
                    addCountryBoundariesAndMarkers = false;
                    this.playerAttemptToGuess = true;
                    this.opponentPlayer.playerAttemptToGuess = false;
                    const countryBoundaryComputer = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
                    const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
                    const countryToDeleteIndex = this.countryCodes.indexOf(countryCode);
                    if (countryToDeleteIndex >= 0) this.countryCodes.splice(countryToDeleteIndex, 1);
                    this.alreadyGuessedCountryCodes.push(countryCode);
                    if (countryMarker) {
                        this.countryMarkersStyles[countryCode] = {
                            opacity: 0
                        };
                        countryMarker.setOpacity(0);
                    }
                    if (countryBoundaryComputer) {
                        countryBoundaryComputer.unbindTooltip();
                        countryBoundaryComputer.off();
                        this.setElementStyle(countryBoundaryComputer, {
                            weight: 1,
                            color: "purple",
                            fillColor: "purple",
                            fillOpacity: 0.5,
                            opacity: 0.8,
                            className: countryCode
                        });
                        this.countryBoundariesStyles[countryCode] = {
                            weight: 1,
                            color: "purple",
                            fillColor: "purple",
                            fillOpacity: 0.5,
                            opacity: 0.8,
                            className: countryCode
                        };
                    }
                    this.deleteCountryNeighbourBorders(this.opponentPlayer, country, new Set([
                        ...this.opponentPlayer.selectedCountryCodes,
                        ...this.opponentPlayer.selectedCountryTrapCodes
                    ]), this.countriesNumberField);
                    this.deleteCountryNeighbourBorders(this, country, new Set([
                        ...this.selectedCountryCodes,
                        ...this.selectedCountryTrapCodes
                    ]));
                    this.opponentPlayer.addCountryBoundaryBlinking(countryCode);
                    this.opponentPlayer.setElementStyle(countryBoundary, {
                        weight: 1,
                        color: "purple",
                        fillColor: "purple",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    });
                    this.opponentPlayer.countryBoundariesStyles[countryCode] = {
                        weight: 1,
                        color: "purple",
                        fillColor: "purple",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    };
                    this.score = this.score + 10;
                    const scoreElement = document.getElementById("player-two-score-field");
                    scoreElement.textContent = `\u{1F3C5} ${this.score}`;
                    if (this.score < 0) scoreElement.style.color = "red";
                    else scoreElement.style.color = "green";
                    const superBonus = (this.game.superBonusCountry || this.game.secondSuperBonusCountry) && (this.game.superBonusCountry === countryCode || this.game.secondSuperBonusCountry === countryCode);
                    this.setMessageInnerHtmlField(`<span style="font-size: 0.75rem;">\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Computer has fallen into a bonus-country"]}</span> <img src="${country.countryFlag}" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;font-size: 0.75rem;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}.</span> <span style="margin-left:5px;font-size: 0.75rem;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Additional attempt to guess and"]}</span><span style="
          font-size: 0.75rem;
                    margin-left: 3px;
                    color: white;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 2px;
                    padding-right: 2px;
                    font-weight: bolder;
                  ">+10&nbsp;${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Points"]}</span>`);
                    if (superBonus) {
                        const countryUnion = this.opponentPlayer.countryUnions.find((countryUnion)=>countryUnion.find((item)=>!Object.values(item)[0].guessed && !this.countriesToGuess.includes(Object.keys(item)[0])) != undefined);
                        if (countryUnion) {
                            if (this.game.superBonusCountry && this.game.superBonusCountry === countryCode) countryUnion.forEach((item)=>{
                                const guessed = Object.values(item)[0].guessed;
                                const countryCode = Object.keys(item)[0];
                                if (!guessed && !this.countriesToGuess.includes(countryCode)) this.countriesToGuess.push(countryCode);
                            });
                            if (this.game.secondSuperBonusCountry && this.game.secondSuperBonusCountry === countryCode) {
                                const selectedCountryCode = Object.keys(countryUnion.find((item)=>!Object.values(item)[0].guessed))[0];
                                if (!this.countriesToGuess.includes(selectedCountryCode)) this.countriesToGuess.push(selectedCountryCode);
                            }
                        }
                    }
                    await this.sleep(1500);
                    this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
                    this.opponentPlayer.closeCountryPopup(countryPopup);
                    this.opponentPlayer.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                } catch (err) {
                    if (countryCode) {
                        this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
                        this.opponentPlayer.closeCountryPopup(countryPopup);
                    }
                    this.playerAttemptToGuess = true;
                    this.opponentPlayer.playerAttemptToGuess = false;
                    this.opponentPlayer.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                }
                else if (this.opponentPlayer.selectedCountryCodes.has(countryCode)) try {
                    addCountryBoundariesAndMarkers = false;
                    this.playerAttemptToGuess = true;
                    this.opponentPlayer.playerAttemptToGuess = false;
                    if (this.isHintUsed(countryCode)) this.usedHintsCount = this.usedHintsCount + 1;
                    this.opponentPlayer.addCountryBoundaryBlinking(countryCode);
                    this.opponentPlayer.setElementStyle(countryBoundary, {
                        weight: 1,
                        color: "red",
                        fillColor: "red",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    });
                    this.opponentPlayer.countryBoundariesStyles[countryCode] = {
                        weight: 1,
                        color: "red",
                        fillColor: "red",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    };
                    this.opponentPlayer.addSelectedCountryToCountryPanel(this.opponentPlayer.playerSelectedCountriesContainerId, countryCode, Array.from(this.opponentPlayer.selectedCountryCodes).indexOf(countryCode) + 1, false);
                    const countryUnionIndex = this.opponentPlayer.getCountryUnionIndex(countryCode);
                    const isCountryUnionGuessed = this.opponentPlayer.isCountryUnionGuessed(countryUnionIndex);
                    if (isCountryUnionGuessed) {
                        this.opponentPlayer.playerCountriesNumberField.textContent = +this.opponentPlayer.playerCountriesNumberField.textContent - 1;
                        this.countriesToGuessNext = [];
                        const countryUnion = this.opponentPlayer.countryUnions[countryUnionIndex];
                        if (countryUnion.length === 4) this.score = this.score + 15;
                        else if (countryUnion.length === 3) this.score = this.score + 25;
                        else if (countryUnion.length === 2) this.score = this.score + 35;
                        else if (countryUnion.length === 1) this.score = this.score + 50;
                        const scoreElement = document.getElementById("player-two-score-field");
                        scoreElement.textContent = `\u{1F3C5} ${this.score}`;
                        if (this.score < 0) scoreElement.style.color = "red";
                        else scoreElement.style.color = "green";
                        countryUnion.forEach((countryObject)=>{
                            const countryCode = Object.keys(countryObject)[0];
                            const country = this.opponentPlayer.countries[countryCode];
                            this.deleteCountryNeighbourBorders(this.opponentPlayer, country, this.opponentPlayer.selectedCountryCodes, this.countriesNumberField);
                        });
                        const countryUnionHtml = this.opponentPlayer.createCountryUnionMessageHtml(countryUnionIndex);
                        this.setMessageInnerHtmlField(`<span style="margin-right:5px;">\u{26A0}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Computer guessed"]}</span><div style="display: inline-block;">${countryUnionHtml.outerHTML}</div><span style="margin-left:5px;">${countryUnion.length === 1 ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName] : (0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Alliance"]}</span>`);
                        await this.sleep(1500);
                        this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
                        this.opponentPlayer.closeCountryPopup(countryPopup);
                        this.opponentPlayer.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                            animate: false
                        });
                    } else {
                        const countriesToGuessNext = country.countryBorders.map((countryBorder)=>{
                            return this.countriesCodeMapping[countryBorder];
                        }).filter((countryCode)=>countryCode !== undefined);
                        countriesToGuessNext.forEach((country)=>{
                            if (!this.countriesToGuessNext.includes(country) && !this.opponentPlayer.alreadyGuessedCountryCodes.includes(country) && this.opponentPlayer.countryCodes.includes(country)) this.countriesToGuessNext.push(country);
                        });
                        this.setMessageInnerHtmlField(`<span>\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Computer guessed"]}</span> <img src="${country.countryFlag}" style="margin-left:3px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${country.countryCoatOfArms ? `<img src="${country.countryCoatOfArms}" style="margin-left:3px; width:15px; height:15px; vertical-align: sub;"></img>` : ""}<span style="margin-left:3px;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}</span>`);
                        await this.sleep(1000);
                        this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
                        this.opponentPlayer.closeCountryPopup(countryPopup);
                    }
                } catch (err) {
                    if (countryCode) {
                        this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
                        this.opponentPlayer.closeCountryPopup(countryPopup);
                    }
                    this.playerAttemptToGuess = true;
                    this.opponentPlayer.playerAttemptToGuess = false;
                }
                else try {
                    addCountryBoundariesAndMarkers = true;
                    this.opponentPlayer.setElementStyle(countryBoundary, {
                        weight: 1,
                        color: "grey",
                        fillColor: "grey",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    });
                    this.gameMessageField.textContent = `\u{26D4} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Computer failed to guess your country!"]}`;
                    this.playerAttemptToGuess = false;
                    this.opponentPlayer.playerAttemptToGuess = true;
                    await this.sleep(1000);
                    this.opponentPlayer.closeCountryPopup(countryPopup);
                    this.opponentPlayer.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                    this.opponentPlayer.countryBoundariesStyles[countryCode] = {
                        weight: 0,
                        color: "grey",
                        fillColor: "grey",
                        fillOpacity: 0,
                        opacity: 0,
                        className: countryCode
                    };
                    if (this.countryBoundariesStyles[countryCode].opacity === 0) {
                        this.opponentPlayer.playerMap.removeLayer(countryBoundary);
                        delete this.countryBoundariesAndMarkersLayer.boundaries[countryCode];
                        delete this.countryBoundariesAndMarkersLayer.markers[countryCode];
                    }
                } catch (err) {
                    if (countryCode) {
                        this.opponentPlayer.closeCountryPopup(countryPopup);
                        this.opponentPlayer.countryBoundariesStyles[countryCode] = {
                            weight: 0,
                            color: "grey",
                            fillColor: "grey",
                            fillOpacity: 0,
                            opacity: 0,
                            className: countryCode
                        };
                    }
                    this.opponentPlayer.setElementStyle(countryBoundary, {
                        weight: 0,
                        color: "grey",
                        fillColor: "grey",
                        fillOpacity: 0,
                        opacity: 0,
                        className: countryCode
                    });
                    this.playerAttemptToGuess = false;
                    this.opponentPlayer.playerAttemptToGuess = true;
                    this.opponentPlayer.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                }
                if (+this.opponentPlayer.playerCountriesNumberField.textContent === 0) {
                    this.score += +this.playerCountriesNumberField.textContent * 10;
                    this.playerWonGame = true;
                    this.game.finished = true;
                    this.game.showGameResult(false, false);
                    return;
                }
            } catch (err) {
                this.playerAttemptToGuess = false;
                this.opponentPlayer.playerAttemptToGuess = true;
                if (countryCode) this.opponentPlayer.removeCountryBoundaryBlinking(countryCode);
            }
        } else if (this.playerType === "userPlayer") {
            try {
                if (this.opponentPlayer.countryCodes.length <= 5) this.opponentPlayer.addAvailableCountriesPanel();
                this.playMap.setMapFiledLabel(this.gameConfiguration.gameMode === "user" ? "Opponent Map" : "Computer Map");
                this.countriesNumberField.textContent = this.opponentPlayer.countryCodes.length;
                if (this.opponentPlayer.lastGuessedCountryNames.length !== 0) {
                    const countryBounds = [];
                    this.opponentPlayer.lastGuessedCountryNames.forEach((countryName)=>{
                        const countryBound = (0, _countriesBoundsJs.COUNTRY_BOUNDS).find((bound)=>countryName === bound.name);
                        if (countryBound) countryBounds.push(...countryBound.bounds);
                    });
                    if (countryBounds.length !== 0) this.opponentPlayer.playerMap.fitBounds(countryBounds, {
                        animate: false
                    });
                } else if (this.opponentPlayer.lastGuessedCountryNames.length === 0 && this.opponentPlayer.highlightCountryCodes.length !== 0) {
                    const countryBounds = [];
                    this.opponentPlayer.highlightCountryCodes.forEach((highlightCountryCode)=>{
                        const country = this.opponentPlayer.countries[highlightCountryCode];
                        const countryBound = (0, _countriesBoundsJs.COUNTRY_BOUNDS).find((bound)=>country.countryName === bound.name);
                        if (countryBound) countryBounds.push(...countryBound.bounds);
                    });
                    if (countryBounds.length !== 0) this.playerMap.fitBounds(countryBounds, {
                        animate: false
                    });
                    else this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                }
                this.gameMessageField.textContent = `\u{26A0}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Your attempt to guess opponent's country"]}`;
                this.opponentPlayer.enableMapInteraction();
                if (!this.openUserHintSelectionWindow) this.setHitTimeout();
                if (this.gameConfiguration.hintsType === "Choose Hints" && this.openUserHintSelectionWindow) {
                    this.addUserSelectedHint();
                    this.openUserHintSelectionWindow = false;
                }
            } catch (err) {
                this.opponentPlayer.enableMapInteraction();
                this.openUserHintSelectionWindow = false;
            }
            this.game.isOpponentPlayerReady = false;
            this.game.isPlayerReady = false;
            return;
        } else {
            this.playMap.hideMapElement("hints-link");
            this.playMap.hideMapElement("hints-panel");
            document.getElementById("timer-field-container").style.display = "none";
            this.playMap.setMapFiledLabel("Your Map");
            this.countriesNumberField.textContent = this.opponentPlayer.countryCodes.length;
            this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent is guessing your country..."]}`;
            this.game.isOpponentPlayerReady = false;
            this.game.isPlayerReady = false;
            return;
        }
        this.game.playHit(addCountryBoundariesAndMarkers);
    }
    hitTimeout(time = this.gameConfiguration.hitTime) {
        const timerField = document.getElementById("timer-field");
        timerField.textContent = `${time}`;
        timerField.style.color = "green";
        document.getElementById("timer-field-container").style.display = "inline-block";
        if (this.hitIntervalIds && this.hitIntervalIds.length != 0) this.clearAllIntervals(this);
        if (this.hitTimeoutIds && this.hitTimeoutIds.length != 0) this.clearAllTimeouts(this);
        const hitIntervalId = setInterval(()=>{
            const modalTimerField = document.getElementById("modalTimer");
            let timer = +timerField.textContent;
            timer = timer - 1;
            if (timer >= 0) {
                if (timer <= 10) {
                    timerField.style.color = "red";
                    if (modalTimerField) modalTimerField.style.color = "red";
                } else {
                    timerField.style.color = "green";
                    if (modalTimerField) modalTimerField.style.color = "green";
                }
                timerField.textContent = timer;
                if (modalTimerField) modalTimerField.textContent = timer;
            }
        }, 1000);
        this.hitIntervalIds.push(hitIntervalId);
        const hitTimeoutId = setTimeout(async ()=>{
            this.opponentPlayer.disableMapInteraction();
            if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();
            }
            (0, _helpersJs.hideModalWindow)("flagModal");
            (0, _helpersJs.hideModalWindow)("coatOfArmsModal");
            (0, _helpersJs.hideModalWindow)("countryOutlineModal");
            (0, _helpersJs.hideModalWindow)("countryPhotoModal");
            this.gameMessageField.textContent = `\u{26A0}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Time is up! The attempt to guess the country passes to your opponent"]}`;
            this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                animate: false
            });
            this.playerAttemptToGuess = false;
            this.opponentPlayer.playerAttemptToGuess = true;
            await this.sleep(1500);
            if (this.gameConfiguration.gameMode === "user") {
                this.sendMoveToOpponent("timeout");
                this.game.isPlayerReady = true;
                this.sendMoveAckToOpponent();
            }
            this.game.playHit();
        }, time * 1000);
        this.hitTimeoutIds.push(hitTimeoutId);
    }
    setHitTimeout(time = this.gameConfiguration.hitTime) {
        if (this.gameConfiguration.hitTime === 0) return;
        if (this.gameConfiguration && this.gameConfiguration.gameMode === "user" && this.opponentPlayerStartAcknowledged && this.playerAttemptToGuess) this.hitTimeout(time);
        else if (this.gameConfiguration && this.gameConfiguration.gameMode === "computer" && this.playerAttemptToGuess) this.hitTimeout(time);
    }
    addAvailableCountriesPanel() {
        const setViewCountry = function(country) {
            const countryBound = (0, _countriesBoundsJs.COUNTRY_BOUNDS).find((bound)=>country.countryName === bound.name);
            if (countryBound) this.playerMap.fitBounds(countryBound.bounds, {
                animate: false
            });
            else this.playerMap.setView(country.latlng ? country.latlng : country.capitalLatLng, 4.5, {
                animate: false
            });
        };
        const availableCountriesPanel = document.getElementById("available-countries-panel");
        const availableCountriesPanelContent = document.getElementById("available-countries-panel-content");
        if (availableCountriesPanelContent) {
            availableCountriesPanelContent.innerHTML = "";
            this.countryCodes.forEach((countryCode)=>{
                const country = this.countries[countryCode];
                const container = document.createElement("div");
                container.style.cursor = "pointer";
                const locationIcon = document.createElement("span");
                locationIcon.textContent = "\uD83D\uDCCD";
                locationIcon.style.width = "10px";
                locationIcon.style.height = "10px";
                locationIcon.style.marginRight = "5px";
                const countryImg = document.createElement("img");
                countryImg.src = country.countryFlag;
                countryImg.style = "width:9px; height:9px; border-radius:50%; border:1px solid black; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; margin-right:5px;display:inline-block;";
                const countryName = document.createElement("span");
                countryName.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName];
                countryName.style = "font-size:0.7rem;";
                container.addEventListener("click", setViewCountry.bind(this, country));
                container.appendChild(locationIcon);
                container.appendChild(countryImg);
                container.appendChild(countryName);
                availableCountriesPanelContent.appendChild(container);
            });
        }
        if (availableCountriesPanel) availableCountriesPanel.classList.remove("not-displayed");
    }
    sleep(ms, timeout = ms + 5000) {
        return new Promise((resolve, reject)=>{
            const sleepId = setTimeout(()=>{
                clearTimeout(timeoutId);
                resolve();
            }, ms);
            const timeoutId = setTimeout(()=>{
                clearTimeout(sleepId);
                reject(new Error("Sleep timeout exceeded"));
            }, timeout);
        });
    }
    async addUserClickCountriesPlay(countryCode, countryBoundary, countryMarker, addCountryBoundariesAndMarkers = true) {
        try {
            if (this.playerAlreadyHitting) return;
            this.playerAlreadyHitting = true;
            this.openUserHintSelectionWindow = false;
            this.clearOpponentPlayerTimeout();
            if (this.gameConfiguration.gameMode === "user" && (this.game.firebase.opponentConnectionState === "disconnected" || this.game.firebase.opponentConnectionState === "failed" || this.game.firebase.opponentConnectionState === "connecting")) {
                alert("\u26A0\uFE0F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Connection with your opponent has failed. Try your attempt later."]);
                this.playerAlreadyHitting = false;
                return;
            }
            if (this.gameConfiguration.gameMode === "user" && !this.opponentPlayer.opponentPlayerStartAcknowledged) {
                this.gameMessageField.textContent = "\u26A0\uFE0F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent has not yet started game. Wait for the message to start."];
                this.playerAlreadyHitting = false;
                return;
            }
            this.disableMapInteraction();
            if (this.gameConfiguration.gameMode === "user") this.sendMoveToOpponent(countryCode);
            this.alreadyGuessedCountryCodes.push(countryCode);
            const country = this.countries[countryCode];
            const countryIndexToDelete = this.countryCodes.indexOf(countryCode);
            this.countryCodes.splice(countryIndexToDelete, 1);
            if (this.countryCodes.length <= 5) this.addAvailableCountriesPanel();
            const countryPopup = countryMarker.getPopup();
            countryBoundary.unbindTooltip();
            countryMarker.unbindTooltip();
            countryMarker.off();
            countryBoundary.off();
            const countryBoundaryElements = document.getElementsByClassName(`${countryCode}`);
            if (countryBoundaryElements) {
                const countryBoundaryElement = countryBoundaryElements[0];
                countryBoundaryElement.style.pointerEvents = "none";
            }
            this.countryMarkersStyles[countryCode] = {
                opacity: 0
            };
            countryMarker.setOpacity(0);
            this.countriesNumberField.textContent = this.countryCodes.length;
            this.openCountryPopup(countryPopup);
            if (this.selectedCountryTrapCodes.has(countryCode)) try {
                addCountryBoundariesAndMarkers = true;
                this.setMessageInnerHtmlField(`<span>\u{26D4} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["You have fallen into a trap-country"]}</span> <img src="${country.countryFlag}" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}.</span> ${this.gameConfiguration.hintsType !== "No Hints" ? `<span style="margin-left:5px;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["The opponent gets a hint"]}</span>` : ""}`);
                if (this.gameConfiguration.gameMode === "user") {
                    if (this.gameConfiguration.hintsType === "Choose Hints") {
                        this.openUserHintSelectionWindow = true;
                        this.trapCountryHittedCode = countryCode;
                    }
                    this.trapCountryHitted = this.trapCountryHitted + 1;
                    this.addSelectedCountryToCountryPanel(this.playerSelectedCountriesContainerId, countryCode, Array.from(this.selectedCountryTrapCodes).indexOf(countryCode) + 21, true);
                } else {
                    this.trapCountryHitted = this.trapCountryHitted + 1;
                    if (this.gameConfiguration.hintsType !== "No Hints") {
                        const hintType = this.getRandomHintType();
                        this.addHint(countryCode, true, hintType);
                    } else this.addSelectedCountryToCountryPanel(this.playerSelectedCountriesContainerId, countryCode, Array.from(this.selectedCountryTrapCodes).indexOf(countryCode) + 21, true);
                }
                let points = 0;
                if (this.trapCountryHitted === 1) {
                    this.opponentPlayer.score = this.opponentPlayer.score - 10;
                    points = 10;
                } else if (this.trapCountryHitted === 2) {
                    this.opponentPlayer.score = this.opponentPlayer.score - 20;
                    points = 20;
                } else if (this.trapCountryHitted === 3) {
                    this.opponentPlayer.score = this.opponentPlayer.score - 30;
                    points = 30;
                } else {
                    this.opponentPlayer.score = this.opponentPlayer.score - 50;
                    points = 50;
                }
                const scoreElement = document.getElementById("player-one-score-field");
                scoreElement.textContent = `\u{1F3C5} ${this.opponentPlayer.score}`;
                if (this.opponentPlayer.score < 0) scoreElement.style.color = "red";
                else scoreElement.style.color = "green";
                this.addCountryBoundaryBlinking(countryCode);
                this.setElementStyle(countryBoundary, {
                    weight: 1,
                    color: "orange",
                    fillColor: "orange",
                    fillOpacity: 0.5,
                    opacity: 0.8,
                    className: countryCode
                });
                this.countryBoundariesStyles[countryCode] = {
                    weight: 1,
                    color: "orange",
                    fillColor: "orange",
                    fillOpacity: 0.5,
                    opacity: 0.8,
                    className: countryCode
                };
                document.getElementById("guessed-country-alliance-panel-content").innerHTML = `<div>\u{26A0}\u{FE0F}<span style="
                    color: white;
                    font-size: 0.75rem;
                    padding-left: 3px;
                    padding-right: 3px;
                    font-weight: bolder;
                  ">- ${points} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Points"]}</span></div>`;
                const guessedCountryAlliance1 = document.getElementById("guessed-country-alliance-panel");
                const guessedCountryAllianceHeader1 = document.getElementById("guessed-country-alliance-header");
                guessedCountryAllianceHeader1.classList.add("not-displayed");
                guessedCountryAlliance1.style.backgroundColor = "red";
                guessedCountryAlliance1.classList.remove("not-displayed");
                this.deleteCountryNeighbourBorders(this, country, this.selectedCountryTrapCodes, this.countriesNumberField);
                this.playerAttemptToGuess = true;
                this.opponentPlayer.playerAttemptToGuess = false;
                await this.sleep(2500);
                this.removeCountryBoundaryBlinking(countryCode);
                guessedCountryAlliance1.classList.add("not-displayed");
                guessedCountryAlliance1.style.backgroundColor = "white";
                guessedCountryAllianceHeader1.classList.remove("not-displayed");
                this.closeCountryPopup(countryPopup);
                this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                    animate: false
                });
            } catch (err) {
                if (countryCode) {
                    this.removeCountryBoundaryBlinking(countryCode);
                    this.closeCountryPopup(countryPopup);
                }
                if (guessedCountryAlliance) {
                    guessedCountryAlliance.classList.add("not-displayed");
                    guessedCountryAlliance.style.backgroundColor = "white";
                }
                if (guessedCountryAllianceHeader) guessedCountryAllianceHeader.classList.remove("not-displayed");
                this.playerAttemptToGuess = true;
                this.opponentPlayer.playerAttemptToGuess = false;
                this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                    animate: false
                });
            }
            else if (this.game && this.game.bonusCountries.includes(countryCode)) try {
                addCountryBoundariesAndMarkers = false;
                this.playerAttemptToGuess = false;
                this.opponentPlayer.playerAttemptToGuess = true;
                const countryBoundaryUser = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
                const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
                const countryToDeleteIndex = this.opponentPlayer.countryCodes.indexOf(countryCode);
                if (countryToDeleteIndex >= 0) this.opponentPlayer.countryCodes.splice(countryToDeleteIndex, 1);
                this.opponentPlayer.alreadyGuessedCountryCodes.push(countryCode);
                if (countryMarker) {
                    this.opponentPlayer.countryMarkersStyles[countryCode] = {
                        opacity: 0
                    };
                    countryMarker.setOpacity(0);
                }
                if (countryBoundaryUser) {
                    countryBoundaryUser.unbindTooltip();
                    countryBoundaryUser.off();
                    this.opponentPlayer.setElementStyle(countryBoundaryUser, {
                        weight: 1,
                        color: "purple",
                        fillColor: "purple",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    });
                    this.opponentPlayer.countryBoundariesStyles[countryCode] = {
                        weight: 1,
                        color: "purple",
                        fillColor: "purple",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    };
                }
                this.addCountryBoundaryBlinking(countryCode);
                this.deleteCountryNeighbourBorders(this, country, new Set([
                    ...this.selectedCountryTrapCodes,
                    ...this.selectedCountryCodes
                ]), this.countriesNumberField);
                this.deleteCountryNeighbourBorders(this.opponentPlayer, country, new Set([
                    ...this.opponentPlayer.selectedCountryTrapCodes,
                    ...this.opponentPlayer.selectedCountryCodes
                ]));
                this.setElementStyle(countryBoundary, {
                    weight: 1,
                    color: "purple",
                    fillColor: "purple",
                    fillOpacity: 0.5,
                    opacity: 0.8,
                    className: countryCode
                });
                this.countryBoundariesStyles[countryCode] = {
                    weight: 1,
                    color: "purple",
                    fillColor: "purple",
                    fillOpacity: 0.5,
                    opacity: 0.8,
                    className: countryCode
                };
                this.opponentPlayer.score = this.opponentPlayer.score + 10;
                const scoreElement = document.getElementById("player-one-score-field");
                scoreElement.textContent = `\u{1F3C5} ${this.opponentPlayer.score}`;
                if (this.opponentPlayer.score < 0) scoreElement.style.color = "red";
                else scoreElement.style.color = "green";
                const superBonus = (this.game.superBonusCountry || this.game.secondSuperBonusCountry) && (this.game.superBonusCountry === countryCode || this.game.secondSuperBonusCountry === countryCode);
                const superBonusFirst = this.game.superBonusCountry && this.game.superBonusCountry === countryCode;
                const superBonusSecond = this.game.secondSuperBonusCountry && this.game.secondSuperBonusCountry === countryCode;
                this.setMessageInnerHtmlField(`<span>${superBonus ? "\uD83D\uDC8E" : "\uD83C\uDF81"} ${superBonus ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["You have fallen into a super bonus-country"] : (0, _uaJs.localization)[_modelJs.worldCountries.language]["You have fallen into a bonus-country"]}</span> <img src="${country.countryFlag}" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}.</span> <span style="margin-left:5px;">${superBonus && superBonusFirst ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent's countries highlighted on map"] : superBonus && superBonusSecond ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent's country highlighted on map"] : (0, _uaJs.localization)[_modelJs.worldCountries.language]["Additional attempt to guess and"]}</span><span style="
                    margin-left: 3px;
                    color: white;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 2px;
                    padding-right: 2px;
                    font-weight: bolder;
                  ">+10&nbsp;${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Points"]}</span>`);
                document.getElementById("guessed-country-alliance-panel-content").innerHTML = `<div>${superBonus ? "\uD83D\uDC8E" : "\uD83C\uDF81"}<span style="
                    color: white;
                    font-size: 0.75rem;
                    padding-left: 3px;
                    padding-right: 3px;
                    font-weight: bolder;
                  ">+ 10 ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Points"]}</span></div>`;
                const guessedCountryAlliance1 = document.getElementById("guessed-country-alliance-panel");
                const guessedCountryAllianceHeader1 = document.getElementById("guessed-country-alliance-header");
                guessedCountryAllianceHeader1.classList.add("not-displayed");
                guessedCountryAlliance1.style.backgroundColor = "green";
                guessedCountryAlliance1.classList.remove("not-displayed");
                if (this.playerMap) {
                    document.getElementById("gameCountryAllianceGuessedLabel").textContent = "\uD83D\uDC4F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Congratulations!"];
                    document.getElementById("gameCountryAllianceGuessedCountries").innerHTML = `<span style="color: darkblue; font-weight:bold;">${superBonus ? "\uD83D\uDC8E" : "\uD83C\uDF81"} ${superBonus ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["You have fallen into a super bonus-country"] : (0, _uaJs.localization)[_modelJs.worldCountries.language]["You have fallen into a bonus-country"]}</span> <img src="${country.countryFlag}" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${country.countryCoatOfArms ? `<img src="${country.countryCoatOfArms}" style="margin-left:5px; width:15px; height:15px; vertical-align: sub;">` : ""} <span style="margin-left:5px;color: darkblue;font-weight:bold;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}</span> <div style="color: darkblue;font-weight:bold;">${superBonus && superBonusFirst ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent's country alliance highlighted on map"] : superBonus && superBonusSecond ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent's country highlighted on map"] : (0, _uaJs.localization)[_modelJs.worldCountries.language]["Additional attempt to guess country"]}</div><div style="margin-top:5px;"><span style="
                    color: white;
                    font-size: 1rem;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 2px;
                    padding-right: 2px;
                    font-weight: bolder;
                  ">+10&nbsp;${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Points"]}</span></div>`;
                    const closeButton = document.getElementById("gameCountryAllianceGuessedCloseButton");
                    closeButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Close"];
                    closeButton.addEventListener("click", (0, _helpersJs.hideGameCountryAllianceGuessedWindow), {
                        once: true
                    });
                    (0, _helpersJs.showGameCountryAllianceGuessedWindow)();
                    const modal = document.getElementById("gameCountryAllianceGuessedModal");
                    modal.removeEventListener("shown.bs.modal", this.clearOpponentPlayerTimeout);
                    modal.removeEventListener("hidden.bs.modal", this.setOpponentHitTimeout);
                    modal.addEventListener("shown.bs.modal", this.clearOpponentPlayerTimeout.bind(this));
                    modal.addEventListener("hidden.bs.modal", this.setOpponentHitTimeout.bind(this));
                    setTimeout((0, _helpersJs.hideGameCountryAllianceGuessedWindow), 10000);
                }
                if (superBonus) {
                    const countryUnion = this.countryUnions.find((countryUnion)=>countryUnion.find((item)=>!Object.values(item)[0].guessed && !this.highlightCountryCodes.includes(Object.keys(item)[0])) != undefined);
                    if (countryUnion) {
                        if (this.game.superBonusCountry && this.game.superBonusCountry === countryCode) countryUnion.forEach((item)=>{
                            const guessed = Object.values(item)[0].guessed;
                            const countryCode = Object.keys(item)[0];
                            if (!guessed && !this.highlightCountryCodes.includes(countryCode)) this.highlightCountryCodes.push(countryCode);
                        });
                        if (this.game.secondSuperBonusCountry && this.game.secondSuperBonusCountry === countryCode) {
                            const selectedCountryCode = Object.keys(countryUnion.find((item)=>!Object.values(item)[0].guessed))[0];
                            if (!this.highlightCountryCodes.includes(selectedCountryCode)) this.highlightCountryCodes.push(selectedCountryCode);
                        }
                        this.highlightCountryCodes.forEach((highlightCountryCode)=>{
                            const countryBoundary = this.playMap.countryBoundariesAndMarkersLayer.boundaries[highlightCountryCode];
                            const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[highlightCountryCode];
                            if (countryBoundary) {
                                const tooltip = countryBoundary.getTooltip();
                                countryBoundary.off("mouseout");
                                countryBoundary.off("mouseover");
                                countryMarker.off("mouseout");
                                countryMarker.off("mouseover");
                                this.setElementStyle(countryBoundary, {
                                    weight: 1,
                                    fillOpacity: 0.5,
                                    color: "#3388ff",
                                    fillColor: "#3388ff",
                                    className: highlightCountryCode,
                                    opacity: 1
                                });
                                countryMarker.on("mouseover", function(event) {
                                    countryBoundary.setStyle({
                                        weight: 1,
                                        fillOpacity: 0.75,
                                        opacity: 1,
                                        className: highlightCountryCode
                                    });
                                    L.DomEvent.stopPropagation(event);
                                    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) marker.fire("click");
                                });
                                countryMarker.on("mouseout", function(event) {
                                    countryBoundary.setStyle({
                                        weight: 1,
                                        fillOpacity: 0.5,
                                        opacity: 1,
                                        className: highlightCountryCode
                                    });
                                    L.DomEvent.stopPropagation(event);
                                });
                                this.addMouseOverStyleEventToCountryBoundary(countryBoundary, countryMarker, {
                                    weight: 1,
                                    fillOpacity: 0.75,
                                    opacity: 1,
                                    className: highlightCountryCode
                                });
                                this.addMouseOutStyleEventToCountryBoundary(countryBoundary, countryMarker, {
                                    weight: 1,
                                    fillOpacity: 0.5,
                                    opacity: 1,
                                    className: highlightCountryCode
                                }, 0.75);
                                countryBoundary.unbindTooltip();
                                countryMarker.unbindTooltip();
                                countryBoundary.bindTooltip(tooltip);
                                countryMarker.bindTooltip(tooltip);
                            }
                        });
                    }
                }
                await this.sleep(1500);
                this.removeCountryBoundaryBlinking(countryCode);
                guessedCountryAlliance1.classList.add("not-displayed");
                guessedCountryAlliance1.style.backgroundColor = "white";
                guessedCountryAllianceHeader1.classList.remove("not-displayed");
                this.closeCountryPopup(countryPopup);
                if (this.highlightCountryCodes.length > 0) {
                    const countryBounds = [];
                    this.highlightCountryCodes.forEach((highlightCountryCode)=>{
                        const country = this.countries[highlightCountryCode];
                        const countryBound = (0, _countriesBoundsJs.COUNTRY_BOUNDS).find((bound)=>country.countryName === bound.name);
                        if (countryBound) countryBounds.push(...countryBound.bounds);
                    });
                    if (countryBounds.length !== 0) this.playerMap.fitBounds(countryBounds, {
                        animate: false
                    });
                    else this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                } else this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                    animate: false
                });
            } catch (err) {
                if (countryCode) {
                    this.removeCountryBoundaryBlinking(countryCode);
                    this.closeCountryPopup(countryPopup);
                }
                this.playerAttemptToGuess = false;
                this.opponentPlayer.playerAttemptToGuess = true;
                this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                    animate: false
                });
            }
            else if (this.selectedCountryCodes.has(countryCode)) try {
                if (this.highlightCountryCodes && this.highlightCountryCodes.includes(countryCode)) {
                    const index = this.highlightCountryCodes.indexOf(countryCode);
                    this.highlightCountryCodes.splice(index, 1);
                }
                addCountryBoundariesAndMarkers = false;
                this.playerAttemptToGuess = false;
                this.opponentPlayer.playerAttemptToGuess = true;
                if (this.opponentPlayer.isHintUsed(countryCode)) this.opponentPlayer.usedHintsCount = this.opponentPlayer.usedHintsCount + 1;
                this.addCountryBoundaryBlinking(countryCode);
                this.setElementStyle(countryBoundary, {
                    weight: 1,
                    color: "green",
                    fillColor: "green",
                    fillOpacity: 0.5,
                    opacity: 0.8,
                    className: countryCode
                });
                this.countryBoundariesStyles[countryCode] = {
                    weight: 1,
                    color: "green",
                    fillColor: "green",
                    fillOpacity: 0.5,
                    opacity: 0.8,
                    className: countryCode
                };
                const countryUnionIndex = this.getCountryUnionIndex(countryCode);
                const isCountryUnionGuessed = this.isCountryUnionGuessed(countryUnionIndex);
                if (isCountryUnionGuessed) {
                    this.playerCountriesNumberField.textContent = +this.playerCountriesNumberField.textContent - 1;
                    const countryUnion = this.countryUnions[countryUnionIndex];
                    let points = 0;
                    if (countryUnion.length === 4) {
                        this.opponentPlayer.score = this.opponentPlayer.score + 15;
                        points = 15;
                    } else if (countryUnion.length === 3) {
                        this.opponentPlayer.score = this.opponentPlayer.score + 25;
                        points = 25;
                    } else if (countryUnion.length === 2) {
                        this.opponentPlayer.score = this.opponentPlayer.score + 35;
                        points = 35;
                    } else if (countryUnion.length === 1) {
                        this.opponentPlayer.score = this.opponentPlayer.score + 50;
                        points = 50;
                    }
                    const scoreElement = document.getElementById("player-one-score-field");
                    scoreElement.textContent = `\u{1F3C5} ${this.opponentPlayer.score}`;
                    if (this.opponentPlayer.score < 0) scoreElement.style.color = "red";
                    else scoreElement.style.color = "green";
                    const countryUnionString = countryUnion.map((countryObject)=>`<span>${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][this.countries[Object.keys(countryObject)[0]].countryName]}</span>` + `${this.countries[Object.keys(countryObject)[0]].countryCoatOfArms ? `<img src="${this.countries[Object.keys(countryObject)[0]].countryCoatOfArms}" style="width:16px; height:16px; margin-left:3px; margin-right:3px; vertical-align: sub;"></img>` : ""}`).join('<span style="margin-right: 3px;">&times;</span>');
                    countryUnion.forEach((countryObject)=>{
                        const countryCode = Object.keys(countryObject)[0];
                        this.setElementStyle(this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode], {
                            weight: 1,
                            color: "red",
                            fillColor: "red",
                            fillOpacity: 0.5,
                            opacity: 0.8,
                            className: countryCode
                        });
                        this.countryBoundariesStyles[countryCode] = {
                            weight: 1,
                            color: "red",
                            fillColor: "red",
                            fillOpacity: 0.5,
                            opacity: 0.8,
                            className: countryCode
                        };
                        this.addSelectedCountryToCountryPanel(this.playerSelectedCountriesContainerId, countryCode, Array.from(this.selectedCountryCodes).indexOf(countryCode) + 1);
                        const country = this.countries[countryCode];
                        const countryGuessedIndex = this.lastGuessedCountryNames.indexOf(country.countryName);
                        if (countryGuessedIndex >= 0) this.lastGuessedCountryNames.splice(countryGuessedIndex, 1);
                        this.deleteCountryNeighbourBorders(this, country, this.selectedCountryCodes, this.countriesNumberField);
                    });
                    const countryUnionHtml = this.createCountryUnionMessageHtml(countryUnionIndex);
                    this.setMessageInnerHtmlField(`<span style="margin-right:5px;">\u{26A0}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["You guessed"]}</span><div style="display: inline-block;">${countryUnionHtml.outerHTML}</div><span style="margin-left:5px;">${countryUnion.length === 1 ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName] : (0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Alliance"]}</span>`);
                    document.getElementById("guessed-country-alliance-panel-content").innerHTML = `<div>\u{1F3C5}<span style="
                    color: white;
                    font-size: 0.75rem;
                    padding-left: 3px;
                    padding-right: 3px;
                    font-weight: bolder;
                  ">+ ${points} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Points"]}</span></div>`;
                    const guessedCountryAlliance1 = document.getElementById("guessed-country-alliance-panel");
                    const guessedCountryAllianceHeader1 = document.getElementById("guessed-country-alliance-header");
                    guessedCountryAllianceHeader1.classList.add("not-displayed");
                    guessedCountryAlliance1.style.backgroundColor = "green";
                    guessedCountryAlliance1.classList.remove("not-displayed");
                    if (this.playerMap) {
                        document.getElementById("gameCountryAllianceGuessedLabel").textContent = "\uD83D\uDC4F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Congratulations!"];
                        document.getElementById("gameCountryAllianceGuessedCountries").innerHTML = `<span style="font-weight:bold; color:darkblue;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["You guessed"]}</span><div style="display: inline-block; margin-left:5px;">${countryUnionHtml.outerHTML}</div><span style="margin-left:5px; color: darkblue; font-weight:bold;">${countryUnion.length === 1 ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["Country"] : (0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Alliance"]}</span><div style="color: darkblue; font-weight:bold;font-size: 0.8rem;">${countryUnionString}</div><div style="margin-top:5px;"><span style="
                    color: white;
                    font-size: 1rem;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 3px;
                    padding-right: 3px;
                    font-weight: bolder;
                  ">+${points} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Points"]}</span></div>`;
                        const closeButton = document.getElementById("gameCountryAllianceGuessedCloseButton");
                        closeButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Close"];
                        closeButton.addEventListener("click", (0, _helpersJs.hideGameCountryAllianceGuessedWindow), {
                            once: true
                        });
                        (0, _helpersJs.showGameCountryAllianceGuessedWindow)();
                        const modal = document.getElementById("gameCountryAllianceGuessedModal");
                        modal.removeEventListener("shown.bs.modal", this.clearOpponentPlayerTimeout);
                        modal.removeEventListener("hidden.bs.modal", this.setOpponentHitTimeout);
                        modal.addEventListener("shown.bs.modal", this.clearOpponentPlayerTimeout.bind(this));
                        modal.addEventListener("hidden.bs.modal", this.setOpponentHitTimeout.bind(this));
                        setTimeout((0, _helpersJs.hideGameCountryAllianceGuessedWindow), 10000);
                    }
                    await this.sleep(1500);
                    this.removeCountryBoundaryBlinking(countryCode);
                    guessedCountryAlliance1.classList.add("not-displayed");
                    guessedCountryAlliance1.style.backgroundColor = "white";
                    guessedCountryAllianceHeader1.classList.remove("not-displayed");
                    this.closeCountryPopup(countryPopup);
                    this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                } else {
                    this.setMessageInnerHtmlField(`<span>\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["You guessed"]}</span> <img src="${country.countryFlag}" style="margin-left:3px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${country.countryCoatOfArms ? `<img src="${country.countryCoatOfArms}" style="margin-left:3px; width:15px; height:15px; vertical-align: sub;"></img>` : ""} <span style="margin-left:3px;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}</span>`);
                    this.lastGuessedCountryNames.push(country.countryName);
                    await this.sleep(1000);
                    this.removeCountryBoundaryBlinking(countryCode);
                    this.closeCountryPopup(countryPopup);
                }
            } catch (err) {
                this.playerAttemptToGuess = false;
                this.opponentPlayer.playerAttemptToGuess = true;
                if (countryCode) {
                    this.removeCountryBoundaryBlinking(countryCode);
                    this.closeCountryPopup(countryPopup);
                }
            }
            else try {
                addCountryBoundariesAndMarkers = true;
                this.setElementStyle(countryBoundary, {
                    weight: 1,
                    color: "grey",
                    fillColor: "grey",
                    fillOpacity: 0.5,
                    opacity: 0.8,
                    className: countryCode
                });
                this.gameMessageField.textContent = `\u{26D4} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Failed attempt to guess country!"]}`;
                this.playerAttemptToGuess = true;
                this.opponentPlayer.playerAttemptToGuess = false;
                await this.sleep(1000);
                this.closeCountryPopup(countryPopup);
                this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                    animate: false
                });
                this.countryBoundariesStyles[countryCode] = {
                    weight: 0,
                    color: "grey",
                    fillColor: "grey",
                    fillOpacity: 0,
                    opacity: 0,
                    className: countryCode
                };
                if (this.opponentPlayer.countryBoundariesStyles[countryCode].opacity === 0) {
                    this.playerMap.removeLayer(countryBoundary);
                    delete this.countryBoundariesAndMarkersLayer.boundaries[countryCode];
                    delete this.countryBoundariesAndMarkersLayer.markers[countryCode];
                }
            } catch (err) {
                if (countryCode) {
                    this.closeCountryPopup(countryPopup);
                    this.countryBoundariesStyles[countryCode] = {
                        weight: 0,
                        color: "grey",
                        fillColor: "grey",
                        fillOpacity: 0,
                        opacity: 0,
                        className: countryCode
                    };
                }
                this.playerAttemptToGuess = true;
                this.opponentPlayer.playerAttemptToGuess = false;
                this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                    animate: false
                });
            }
        } catch (err) {
            this.playerAlreadyHitting = false;
            this.playerAttemptToGuess = true;
            this.opponentPlayer.playerAttemptToGuess = false;
            if (countryCode) this.removeCountryBoundaryBlinking(countryCode);
        }
        if (+this.playerCountriesNumberField.textContent === 0) {
            if (this.gameConfiguration.gameMode === "user") this.sendEndGameToOpponent();
            (0, _helpersJs.hideGameCountryAllianceGuessedWindow)();
            this.opponentPlayer.score += +this.opponentPlayer.playerCountriesNumberField.textContent * 10;
            this.opponentPlayer.playerWonGame = true;
            this.game.finished = true;
            this.game.showGameResult(true, false);
            return;
        }
        if (this.gameConfiguration.gameMode === "user") {
            this.sendMoveAckToOpponent();
            this.game.isPlayerReady = true;
        }
        this.playerAlreadyHitting = false;
        this.game.playHit(addCountryBoundariesAndMarkers);
    }
    clearOpponentPlayerTimeout() {
        if (this.opponentPlayer && this.opponentPlayer.hitTimeoutIds && this.opponentPlayer.hitTimeoutIds.length != 0) this.clearAllTimeouts(this.opponentPlayer);
        if (this.opponentPlayer && this.opponentPlayer.hitIntervalIds && this.opponentPlayer.hitIntervalIds.length != 0) this.clearAllIntervals(this.opponentPlayer);
    }
    setOpponentHitTimeout() {
        if (this.opponentPlayer) this.opponentPlayer.setHitTimeout();
    }
    addUserClickCountriesPlayHandler() {
        if (this.playerConfigured) Object.entries(this.playMap.countryBoundariesAndMarkersLayer.boundaries).forEach(([countryCode, countryBoundary])=>{
            const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
            countryMarker.off("click");
            countryMarker.on("click", (function(ev) {
                L.DomEvent.stopPropagation(ev);
                this.addUserClickCountriesPlay(countryCode, countryBoundary, countryMarker);
            }).bind(this));
            countryBoundary.off("click");
            countryBoundary.on("click", (function(ev) {
                L.DomEvent.stopPropagation(ev);
                this.addUserClickCountriesPlay(countryCode, countryBoundary, countryMarker);
            }).bind(this));
        });
    }
    selectRandomCountryUnion(countriesCodeList, numberOfCountries) {
        const visited = new Set();
        const countryUnionCountries = [];
        const countries = this.countries;
        const countriesCodeMapping = this.countriesCodeMapping;
        const selectedCountryCodes = this.selectedCountryCodes;
        const selectedCountryNeighboursCodes = this.selectedCountryNeighboursCodes;
        function dfs(country) {
            if (visited.has(country) || visited.size >= numberOfCountries || selectedCountryCodes.has(country) || selectedCountryNeighboursCodes.has(country)) return;
            visited.add(country);
            countryUnionCountries.push(country);
            let neighbors = countries[country].countryBorders.map((countryBorderCode)=>{
                const countryCodeCc2 = countriesCodeMapping[countryBorderCode];
                if (countryCodeCc2) return countryCodeCc2;
            }).filter((code)=>code !== undefined);
            neighbors.sort(()=>Math.random() - 0.5);
            neighbors.forEach(dfs);
        }
        let randomCountryIndex = (0, _helpersJs.getRandomInt)(0, countriesCodeList.length - 1);
        let countryCode = countriesCodeList[randomCountryIndex];
        while(!this.isEnoughCountryNeighbours(countryCode, numberOfCountries)){
            randomCountryIndex = (0, _helpersJs.getRandomInt)(0, countriesCodeList.length - 1);
            countryCode = countriesCodeList[randomCountryIndex];
        }
        dfs(countryCode);
        const result = countryUnionCountries.slice(0, numberOfCountries);
        if (result.includes("RU")) return this.selectRandomCountryUnion(countriesCodeList, numberOfCountries);
        return result;
    }
    fillComputerPlayerSelectedCountries(countryUnion, countriesCodeList, trapCountry = false) {
        countryUnion.forEach((country)=>{
            if (!this.selectedCountryCodes.has(country) && !trapCountry) this.selectedCountryCodes.add(country);
            if (trapCountry) this.selectedCountryTrapCodes.add(country);
            const countryIndexToDelete = countriesCodeList.indexOf(country);
            if (countryIndexToDelete >= 0) countriesCodeList.splice(countryIndexToDelete, 1);
            const countryBordersCodes = this.countries[country].countryBorders.map((countryBorder)=>{
                return this.countriesCodeMapping[countryBorder];
            }).filter((countryBorder)=>countryBorder !== undefined);
            countryBordersCodes.forEach((countryBorder)=>{
                if (!this.selectedCountryNeighboursCodes.has(countryBorder) && !this.selectedCountryCodes.has(countryBorder)) this.selectedCountryNeighboursCodes.add(countryBorder);
                const countryBorderIndex = countriesCodeList.indexOf(countryBorder);
                if (countryBorderIndex >= 0) countriesCodeList.splice(countryBorderIndex, 1);
            });
        });
    }
    randomCountrySelection() {
        this.cleanSelection();
        this.selectRandomCountries();
        Array.from(this.selectedCountryCodes).forEach((countryCode, index)=>{
            this.addSelectedCountryToCountryPanel(this.playerSelectedCountriesContainerId, countryCode, index + 1);
        });
        Array.from(this.selectedCountryTrapCodes).forEach((countryCode, index)=>{
            this.addSelectedCountryToCountryPanel(this.playerSelectedCountriesContainerId, countryCode, index + 21);
        });
        this.showSelectedCountries();
        this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
            animate: false
        });
        this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Press 'Play' to start game!"]}`;
        this.playerConfigured = true;
        if (this.gameConfiguration.gameMode === "user") this.sendCountriesConfigurationToOpponent();
        else if (this.game) this.game.getRandomBonusCountries(this.countryCodes, new Set([
            ...this.selectedCountryCodes,
            ...this.selectedCountryNeighboursCodes,
            ...this.selectedCountryTrapCodes,
            ...this.opponentPlayer.selectedCountryCodes,
            ...this.opponentPlayer.selectedCountryNeighboursCodes,
            ...this.opponentPlayer.selectedCountryTrapCodes
        ]));
        this.playButton.disabled = false;
    }
    selectRandomCountries() {
        const countriesCodeList = Object.values(this.countriesCodeMapping);
        if (this.gameConfiguration.type === "default") {
            const firstFourCountryUnion = this.selectRandomCountryUnion(countriesCodeList, 4);
            this.fillComputerPlayerSelectedCountries(firstFourCountryUnion, countriesCodeList);
            let countryUnion = this.countryUnions[0];
            firstFourCountryUnion.forEach((countryCode, index)=>{
                this.addCountryToCountryUnion(countryUnion, index, countryCode);
            });
            const secondFourCountryUnion = this.selectRandomCountryUnion(countriesCodeList, 4);
            this.fillComputerPlayerSelectedCountries(secondFourCountryUnion, countriesCodeList);
            countryUnion = this.countryUnions[1];
            secondFourCountryUnion.forEach((countryCode, index)=>{
                this.addCountryToCountryUnion(countryUnion, index, countryCode);
            });
            const firstThreeCountryUnion = this.selectRandomCountryUnion(countriesCodeList, 3);
            this.fillComputerPlayerSelectedCountries(firstThreeCountryUnion, countriesCodeList);
            countryUnion = this.countryUnions[2];
            firstThreeCountryUnion.forEach((countryCode, index)=>{
                this.addCountryToCountryUnion(countryUnion, index, countryCode);
            });
            const secondThreeCountryUnion = this.selectRandomCountryUnion(countriesCodeList, 3);
            this.fillComputerPlayerSelectedCountries(secondThreeCountryUnion, countriesCodeList);
            countryUnion = this.countryUnions[3];
            secondThreeCountryUnion.forEach((countryCode, index)=>{
                this.addCountryToCountryUnion(countryUnion, index, countryCode);
            });
            const firstTwoCountryUnion = this.selectRandomCountryUnion(countriesCodeList, 2);
            this.fillComputerPlayerSelectedCountries(firstTwoCountryUnion, countriesCodeList);
            countryUnion = this.countryUnions[4];
            firstTwoCountryUnion.forEach((countryCode, index)=>{
                this.addCountryToCountryUnion(countryUnion, index, countryCode);
            });
            const secondTwoCountryUnion = this.selectRandomCountryUnion(countriesCodeList, 2);
            this.fillComputerPlayerSelectedCountries(secondTwoCountryUnion, countriesCodeList);
            countryUnion = this.countryUnions[5];
            secondTwoCountryUnion.forEach((countryCode, index)=>{
                this.addCountryToCountryUnion(countryUnion, index, countryCode);
            });
            const firstOneCountryUnion = this.selectRandomCountryUnion(countriesCodeList, 1);
            this.fillComputerPlayerSelectedCountries(firstOneCountryUnion, countriesCodeList);
            countryUnion = this.countryUnions[6];
            firstOneCountryUnion.forEach((countryCode, index)=>{
                this.addCountryToCountryUnion(countryUnion, index, countryCode);
            });
            const secondOneCountryUnion = this.selectRandomCountryUnion(countriesCodeList, 1);
            this.fillComputerPlayerSelectedCountries(secondOneCountryUnion, countriesCodeList);
            countryUnion = this.countryUnions[7];
            secondOneCountryUnion.forEach((countryCode, index)=>{
                this.addCountryToCountryUnion(countryUnion, index, countryCode);
            });
            const firstTrapCountry = this.selectRandomCountryUnion(countriesCodeList, 1);
            this.fillComputerPlayerSelectedCountries(firstTrapCountry, countriesCodeList, true);
            const secondTrapCountry = this.selectRandomCountryUnion(countriesCodeList, 1);
            this.fillComputerPlayerSelectedCountries(secondTrapCountry, countriesCodeList, true);
            const thirdTrapCountry = this.selectRandomCountryUnion(countriesCodeList, 1);
            this.fillComputerPlayerSelectedCountries(thirdTrapCountry, countriesCodeList, true);
            const fourthTrapCountry = this.selectRandomCountryUnion(countriesCodeList, 1);
            this.fillComputerPlayerSelectedCountries(fourthTrapCountry, countriesCodeList, true);
            this.selectedCountryCodes.forEach((countryCode)=>{
                if (this.selectedCountryNeighboursCodes.has(countryCode)) this.selectedCountryNeighboursCodes.delete(countryCode);
            });
            this.playerCountriesNumberField.textContent = this.countryUnions.length;
        }
        this.playerConfigured = true;
    }
    initCountryBoundaryAndMarker(countryCode, countryBoundary, countryMarker) {
        countryBoundary.off();
        countryMarker.off();
        countryBoundary.setStyle({
            weight: 0,
            fillOpacity: 0.1,
            color: "#3388ff",
            fillColor: "#3388ff",
            className: countryCode,
            opacity: 0.5
        });
        countryMarker.on("mouseover", function(event) {
            countryBoundary.setStyle({
                weight: 1,
                fillOpacity: 0.5,
                opacity: 1,
                className: countryCode
            });
            L.DomEvent.stopPropagation(event);
            if ("ontouchstart" in window || navigator.maxTouchPoints > 0) countryMarker.fire("click");
        });
        countryMarker.on("mouseout", function(event) {
            countryBoundary.setStyle({
                weight: 0,
                fillOpacity: 0.1,
                opacity: 0,
                className: countryCode
            });
            L.DomEvent.stopPropagation(event);
        });
        this.addMouseOverStyleEventToCountryBoundary(countryBoundary, countryMarker, {
            weight: 1,
            fillOpacity: 0.5,
            opacity: 1,
            className: countryCode
        });
        this.addMouseOutStyleEventToCountryBoundary(countryBoundary, countryMarker, {
            weight: 0,
            fillOpacity: 0.1,
            opacity: 0,
            className: countryCode
        });
        countryBoundary.once("click", (ev)=>{
            L.DomEvent.stopPropagation(ev);
            this.addUserPlayerInitialCountrySelectionHandler(countryCode, countryBoundary, countryMarker);
        });
        countryMarker.once("click", (ev)=>{
            L.DomEvent.stopPropagation(ev);
            this.addUserPlayerInitialCountrySelectionHandler(countryCode, countryBoundary, countryMarker);
        });
        if (!this.playerMap.hasLayer(countryMarker)) this.playerMap.addLayer(countryMarker);
        countryMarker._icon.classList.remove("box-shadow-marker-icon-hover");
    }
    undoCountryUnionSelection() {
        if (this.selectedCountryTrapCodes.size > 0) {
            const countryCodes = [
                ...this.selectedCountryCodes
            ].slice(0, -1);
            let borderCodes = [];
            countryCodes.forEach((code)=>{
                const country = this.countries[code];
                borderCodes.push(...country.countryBorders.map((countryBorderCode)=>{
                    const countryCodeCc2 = this.countriesCodeMapping[countryBorderCode];
                    if (countryCodeCc2) return countryCodeCc2;
                }).filter((code)=>code !== undefined));
            });
            const countryTrapCode = Array.from(this.selectedCountryTrapCodes).at(-1);
            const userSelectedCountriesPanel = document.getElementById(this.playerSelectedCountriesContainerId);
            if (this.selectedCountryTrapCodes.size === 1) {
                this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first trap country"]}`;
                const countryElement = userSelectedCountriesPanel.querySelector(`.country${this.selectedCountryTrapCodes.size + 20}`);
                countryElement.innerHTML = `<span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>`;
            } else if (this.selectedCountryTrapCodes.size === 2) {
                this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the second trap country"]}`;
                const countryElement = userSelectedCountriesPanel.querySelector(`.country${this.selectedCountryTrapCodes.size + 20}`);
                countryElement.innerHTML = `<span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>`;
            } else if (this.selectedCountryTrapCodes.size === 3) {
                this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the third trap country"]}`;
                const countryElement = userSelectedCountriesPanel.querySelector(`.country${this.selectedCountryTrapCodes.size + 20}`);
                countryElement.innerHTML = `<span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>`;
            }
            this.selectedCountryCodes.delete(countryTrapCode);
            this.selectedCountryTrapCodes.delete(countryTrapCode);
            const countryBoundary = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryTrapCode];
            const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryTrapCode];
            const country = this.countries[countryTrapCode];
            this.initCountryBoundaryAndMarker(countryTrapCode, countryBoundary, countryMarker);
            const countryBorderCodes = country.countryBorders.map((countryBorderCode)=>{
                const countryCodeCc2 = this.countriesCodeMapping[countryBorderCode];
                if (countryCodeCc2) return countryCodeCc2;
            }).filter((code)=>code !== undefined);
            countryBorderCodes.forEach((countryBorderCode)=>{
                if (!borderCodes.includes(countryBorderCode)) {
                    this.selectedCountryNeighboursCodes.delete(countryBorderCode);
                    const countryBoundary = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryBorderCode];
                    const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryBorderCode];
                    this.initCountryBoundaryAndMarker(countryBorderCode, countryBoundary, countryMarker);
                }
            });
            this.playMap.setSelectedCountryFiledHtml("");
            return;
        }
        const lastSelectedCountryUnionIndex = (0, _helpersJs.findLastIndex)(this.countryUnions, (array)=>array.some((item)=>item !== undefined));
        if (lastSelectedCountryUnionIndex === -1 || lastSelectedCountryUnionIndex === 0) {
            this.setMessageInnerHtmlField(`<span style="font-size: 0.8rem;">\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first alliance from four countries on map or click"] + " \uD83C\uDFB2"}</span>`);
            this.playMap.initSelectionCountriesMapView();
            this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                animate: false
            });
        } else if (lastSelectedCountryUnionIndex === 1) this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the second alliance from four countries"]}`;
        else if (lastSelectedCountryUnionIndex === 2) this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first alliance from three countries"]}`;
        else if (lastSelectedCountryUnionIndex === 3) this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the second alliance from three countries"]}`;
        else if (lastSelectedCountryUnionIndex === 4) this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first alliance from two countries"]}`;
        else if (lastSelectedCountryUnionIndex === 5) this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the second alliance from two countries"]}`;
        else if (lastSelectedCountryUnionIndex === 6) this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first alliance from one country"]}`;
        else if (lastSelectedCountryUnionIndex === 7) this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the second alliance from one country"]}`;
        const userSelectedCountriesPanel = document.getElementById(this.playerSelectedCountriesContainerId);
        const lastSelectedCountryUnion = lastSelectedCountryUnionIndex !== -1 ? this.countryUnions[lastSelectedCountryUnionIndex] : undefined;
        if (lastSelectedCountryUnion) {
            const length = lastSelectedCountryUnion.length;
            const countryCodes = lastSelectedCountryUnion.map((countryObject)=>{
                return Object.keys(countryObject)[0];
            });
            const codes = Array.from(this.selectedCountryCodes).filter((code)=>!countryCodes.includes(code));
            let borderCodes = [];
            codes.forEach((code)=>{
                const country = this.countries[code];
                borderCodes.push(...country.countryBorders.map((countryBorderCode)=>{
                    const countryCodeCc2 = this.countriesCodeMapping[countryBorderCode];
                    if (countryCodeCc2) return countryCodeCc2;
                }).filter((code)=>code !== undefined));
            });
            countryCodes.forEach((countryCode)=>{
                const countryCodeIndex = Array.from(this.selectedCountryCodes).indexOf(countryCode);
                const countryElement = userSelectedCountriesPanel.querySelector(`.country${countryCodeIndex + 1}`);
                countryElement.innerHTML = `<span style="color:grey; border:solid 1px grey; border-radius:50%; display:inline-block; height:11px; width:11px;"></span>`;
                const countryBoundary = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
                const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
                const country = this.countries[countryCode];
                this.initCountryBoundaryAndMarker(countryCode, countryBoundary, countryMarker);
                const countryBorderCodes = country.countryBorders.map((countryBorderCode)=>{
                    const countryCodeCc2 = this.countriesCodeMapping[countryBorderCode];
                    if (countryCodeCc2) return countryCodeCc2;
                }).filter((code)=>code !== undefined);
                countryBorderCodes.forEach((countryBorderCode)=>{
                    if (!borderCodes.includes(countryBorderCode)) {
                        this.selectedCountryNeighboursCodes.delete(countryBorderCode);
                        const countryBoundary = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryBorderCode];
                        const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryBorderCode];
                        this.initCountryBoundaryAndMarker(countryBorderCode, countryBoundary, countryMarker);
                    }
                });
            });
            countryCodes.forEach((countryCode)=>{
                this.selectedCountryCodes.delete(countryCode);
            });
            if (Array.from(lastSelectedCountryUnion).some((item)=>item === undefined || item === null)) Object.entries(this.playMap.countryBoundariesAndMarkersLayer.boundaries).forEach(([countryCode, countryBoundary])=>{
                const isEnoughNeighbours = this.isEnoughCountryNeighboursByCountryUnionIndex(lastSelectedCountryUnionIndex, countryCode);
                const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
                if (!this.playerMap.hasLayer(countryMarker) && !this.selectedCountryNeighboursCodes.has(countryCode) && isEnoughNeighbours) this.playerMap.addLayer(countryMarker);
                if (!this.playerMap.hasLayer(countryBoundary) && isEnoughNeighbours) this.playerMap.addLayer(countryBoundary);
            });
            else {
                Object.entries(this.playMap.countryBoundariesAndMarkersLayer.boundaries).forEach(([countryCode, countryBoundary])=>{
                    const isEnoughNeighbours = this.isEnoughCountryNeighboursByCountryUnionIndex(lastSelectedCountryUnionIndex, countryCode);
                    const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
                    if (this.playerMap.hasLayer(countryBoundary) && !isEnoughNeighbours && !this.selectedCountryCodes.has(countryCode) && !this.selectedCountryNeighboursCodes.has(countryCode)) this.playerMap.removeLayer(countryBoundary);
                    if (this.playerMap.hasLayer(countryMarker) && !isEnoughNeighbours && !this.selectedCountryCodes.has(countryCode) && !this.selectedCountryNeighboursCodes.has(countryCode)) this.playerMap.removeLayer(countryMarker);
                });
                this.playerCountriesNumberField.textContent = +this.playerCountriesNumberField.textContent - 1;
            }
            this.playMap.setSelectedCountryFiledHtml("");
            this.countryUnions[lastSelectedCountryUnionIndex] = new Array(length);
        }
    }
    isEnoughCountryNeighboursByCountryUnionIndex(countryUnionIndex, countryCode) {
        let isEnoughNeighbours = false;
        if (countryUnionIndex === 0) isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 4);
        else if (countryUnionIndex === 1) isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 4);
        else if (countryUnionIndex === 2) isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 3);
        else if (countryUnionIndex === 3) isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 3);
        else if (countryUnionIndex === 4) isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 2);
        else if (countryUnionIndex === 5) isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 2);
        else if (countryUnionIndex === 6) isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 1);
        else isEnoughNeighbours = this.isEnoughCountryNeighbours(countryCode, 1);
        return isEnoughNeighbours;
    }
    cleanSelection() {
        Object.entries(this.playMap.countryBoundariesAndMarkersLayer.boundaries).forEach(([countryCode, countryBoundary])=>{
            const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
            if (countryMarker) countryMarker.off();
            countryBoundary.off();
            this.playerMap.removeLayer(countryBoundary);
            delete this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
            this.playerMap.removeLayer(countryMarker);
            delete this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
        });
        this.initData();
        this.playerCountriesNumberField.textContent = "0";
        const countriesUnionsContainer = this.playerSelectedCountriesContainer.querySelector(".countries-unions");
        countriesUnionsContainer.remove();
        this.playerCountriesNumberField.insertAdjacentHTML("afterend", this.gameConfiguration.countriesUnionsHtml);
        this.setMessageInnerHtmlField(`<span style="font-size: 0.8rem;">\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first alliance from four countries on map or click"] + " \uD83C\uDFB2"}</span>`);
        this.playMap.setSelectedCountryFiledHtml("");
        if (this.gameConfiguration.gameMode === "user") this.sendCleanCountriesSelectionToOpponent();
        if (this.game) {
            this.game.bonusCountries = [];
            this.game.superBonusCountry = null;
            this.game.secondSuperBonusCountry = null;
        }
        this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
            animate: false
        });
    }
    isEnoughCountryNeighbours(countryCode, minNeighboursNumber) {
        if (minNeighboursNumber === 1) return true;
        const selectedCountryCodes = this.selectedCountryCodes;
        const selectedCountryNeighboursCodes = this.selectedCountryNeighboursCodes;
        const countries = this.countries;
        const countriesCodeMapping = this.countriesCodeMapping;
        const visited = new Set();
        function dfs(countryCode) {
            if (visited.has(countryCode) || selectedCountryCodes.has(countryCode) || selectedCountryNeighboursCodes.has(countryCode) || visited.size >= minNeighboursNumber) return;
            visited.add(countryCode);
            let neighbors = countries[countryCode].countryBorders.map((countryBorderCode)=>{
                const countryCodeCc2 = countriesCodeMapping[countryBorderCode];
                if (countryCodeCc2) return countryCodeCc2;
            }).filter((code)=>code !== undefined);
            neighbors.forEach(dfs);
        }
        dfs(countryCode);
        return visited.size >= minNeighboursNumber;
    }
    addCountryBoundaryAndMarker(countryCode, countryBoundary, minNeighboursNumber) {
        const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
        if (this.playerType === "userPlayer") {
            countryBoundary.off("click");
            countryBoundary.once("click", (ev)=>{
                L.DomEvent.stopPropagation(ev);
                this.addUserPlayerInitialCountrySelectionHandler(countryCode, countryBoundary, countryMarker);
            });
            countryMarker.off("click");
            countryMarker.once("click", (ev)=>{
                L.DomEvent.stopPropagation(ev);
                this.addUserPlayerInitialCountrySelectionHandler(countryCode, countryBoundary, countryMarker);
            });
            if (this.isEnoughCountryNeighbours(countryCode, minNeighboursNumber)) {
                this.playerMap.addLayer(countryBoundary);
                this.playerMap.addLayer(countryMarker);
            }
        }
    }
    setElementStyle(element, styleObject) {
        element.setStyle(styleObject);
    }
    removeCountryBoundariesAndMarkersExceptAlreadySelected() {
        Object.entries(this.playMap.countryBoundariesAndMarkersLayer.boundaries).forEach(([countryCode, countryBoundary])=>{
            if (!this.selectedCountryCodes.has(countryCode) && !this.selectedCountryNeighboursCodes.has(countryCode)) {
                this.playerMap.removeLayer(countryBoundary);
                this.playerMap.removeLayer(this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode]);
            }
        });
    }
    addNeighbourCountriesByCountryCode(countryCode) {
        const countryBorderCodes = this.countries[countryCode].countryBorders;
        countryBorderCodes.forEach((countryBorderCode)=>{
            const countryCodeCc2 = this.countriesCodeMapping[countryBorderCode];
            if (countryCodeCc2) {
                if (!this.selectedCountryNeighboursCodes.has(countryCodeCc2)) this.playerMap.addLayer(this.playMap.countryBoundariesAndMarkersLayer.markers[countryCodeCc2]);
                this.selectedCountryNeighboursCodes.add(countryCodeCc2);
                this.playerMap.addLayer(this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCodeCc2]);
            }
        });
    }
    finishCountriesUnionSelection() {
        this.selectedCountryNeighboursCodes.forEach((countryCode)=>{
            if (!this.selectedCountryCodes.has(countryCode)) {
                const countryBoundary = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
                const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
                this.setElementStyle(countryBoundary, {
                    weight: 1,
                    color: "grey",
                    fillColor: "grey",
                    fillOpacity: 0.3,
                    opacity: 0.6,
                    className: countryCode
                });
                countryBoundary.off();
                countryMarker.off();
                this.playerMap.removeLayer(countryMarker);
            }
        });
    }
    addSelectedCountryToCountryPanel(countryPanelId, countryCode, countryIndex, addCountryImage = true) {
        const country = this.countries[countryCode];
        const userSelectedCountriesPanel = document.querySelector(`#${countryPanelId}`);
        const countryElement = userSelectedCountriesPanel.querySelector(`.country${countryIndex.toString()}`);
        countryElement.innerHTML = addCountryImage ? `<img id="${country.cca2}" src="${country.countryFlag}" alt="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}" title="${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}" style="width:11px; height:11px;border:solid 1px grey; border-radius:50%; display:inline-block;vertical-align:baseline; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f;">` : `<span style="width:11px; height:11px;background-color:red; border: 2px grey solid;border-radius:50%; display:inline-block;vertical-align:baseline;"></span>`;
    }
    addUserPlayerInitialCountrySelection(countryCode, countryBoundary, countryBoundaryFillColor) {
        this.setElementStyle(countryBoundary, {
            weight: 1,
            color: countryBoundaryFillColor,
            fillColor: countryBoundaryFillColor,
            fillOpacity: 0.5,
            opacity: 0.8,
            className: countryCode
        });
        countryBoundary.off();
        countryBoundary.closeTooltip();
        this.addSelectedCountryToCountryPanel(this.playerSelectedCountriesContainerId, countryCode, this.selectedCountryCodes.size);
        this.removeCountryBoundariesAndMarkersExceptAlreadySelected();
    }
    addCountryToCountryUnion(countryUnionArray, countryIndex, countryCode) {
        const countryObject = {};
        countryObject[countryCode] = {
            guessed: false
        };
        countryUnionArray[countryIndex] = countryObject;
    }
    setSelectedCountryFiledHtml(country) {
        this.playMap.setSelectedCountryFiledHtml(`<img src="${country.countryFlag}" style="margin-left:2px; width:18px; height:13px; border-radius:2px; box-shadow: 0 2px 5px #00000080, inset 0 2px 10px #0000001f; vertical-align: sub;"> <span style="margin-left:2px;color:${country.countryName !== "Russia" ? "darkblue" : "red"}">${country.countryName !== "Russia" ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName] : (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName] + " - " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["War Aggressor"]}</span>`);
    }
    addUserPlayerInitialCountrySelectionHandler(countryCode, countryBoundary) {
        document.getElementById("random-user-countries-selection").style.display = "none";
        const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
        const country = this.countries[countryCode];
        countryMarker.off();
        countryBoundary.off();
        if (this.playerConfigured) {
            this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Press 'Play' to start game!"]}`;
            return;
        }
        const cleanSection = document.getElementById("clean-user-countries-selection");
        cleanSection.style.display = "none";
        const undoButton = document.getElementById("undo-user-countries-selection");
        undoButton.style.display = "flex";
        countryMarker._icon.classList.add("box-shadow-marker-icon-hover");
        this.selectedCountryCodes.add(countryCode);
        if (this.gameConfiguration.type === "default") {
            if (this.selectedCountryCodes.size >= 1 && this.selectedCountryCodes.size <= 4) {
                this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first alliance from four countries"]}`;
                this.setSelectedCountryFiledHtml(country);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "green");
                const countryUnion = this.countryUnions[0];
                this.addCountryToCountryUnion(countryUnion, this.selectedCountryCodes.size - 1, countryCode);
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 4) {
                    this.playerCountriesNumberField.textContent = +this.playerCountriesNumberField.textContent + 1;
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(4);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the second alliance from four countries"]}`;
                }
            }
            if (this.selectedCountryCodes.size >= 5 && this.selectedCountryCodes.size <= 8) {
                this.setSelectedCountryFiledHtml(country);
                const countryUnion = this.countryUnions[1];
                this.addCountryToCountryUnion(countryUnion, this.selectedCountryCodes.size - 5, countryCode);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "green");
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 8) {
                    this.playerCountriesNumberField.textContent = +this.playerCountriesNumberField.textContent + 1;
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(3);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first alliance from three countries"]}`;
                }
            }
            if (this.selectedCountryCodes.size >= 9 && this.selectedCountryCodes.size <= 11) {
                this.setSelectedCountryFiledHtml(country);
                const countryUnion = this.countryUnions[2];
                this.addCountryToCountryUnion(countryUnion, this.selectedCountryCodes.size - 9, countryCode);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "green");
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 11) {
                    this.playerCountriesNumberField.textContent = +this.playerCountriesNumberField.textContent + 1;
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(3);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the second alliance from three countries"]}`;
                }
            }
            if (this.selectedCountryCodes.size >= 12 && this.selectedCountryCodes.size <= 14) {
                this.setSelectedCountryFiledHtml(country);
                const countryUnion = this.countryUnions[3];
                this.addCountryToCountryUnion(countryUnion, this.selectedCountryCodes.size - 12, countryCode);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "green");
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 14) {
                    this.playerCountriesNumberField.textContent = +this.playerCountriesNumberField.textContent + 1;
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(2);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first alliance from two countries"]}`;
                }
            }
            if (this.selectedCountryCodes.size >= 15 && this.selectedCountryCodes.size <= 16) {
                this.setSelectedCountryFiledHtml(country);
                const countryUnion = this.countryUnions[4];
                this.addCountryToCountryUnion(countryUnion, this.selectedCountryCodes.size - 15, countryCode);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "green");
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 16) {
                    this.playerCountriesNumberField.textContent = +this.playerCountriesNumberField.textContent + 1;
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(2);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the second alliance from two countries"]}`;
                }
            }
            if (this.selectedCountryCodes.size >= 17 && this.selectedCountryCodes.size <= 18) {
                this.setSelectedCountryFiledHtml(country);
                const countryUnion = this.countryUnions[5];
                this.addCountryToCountryUnion(countryUnion, this.selectedCountryCodes.size - 17, countryCode);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "green");
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 18) {
                    this.playerCountriesNumberField.textContent = +this.playerCountriesNumberField.textContent + 1;
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(1);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first alliance from one country"]}`;
                }
            }
            if (this.selectedCountryCodes.size === 19) {
                this.setSelectedCountryFiledHtml(country);
                const countryUnion = this.countryUnions[6];
                this.addCountryToCountryUnion(countryUnion, this.selectedCountryCodes.size - 19, countryCode);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "green");
                this.playerCountriesNumberField.textContent = +this.playerCountriesNumberField.textContent + 1;
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 19) {
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(1);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the second alliance from one country"]}`;
                }
            }
            if (this.selectedCountryCodes.size === 20) {
                this.setSelectedCountryFiledHtml(country);
                const countryUnion = this.countryUnions[7];
                this.addCountryToCountryUnion(countryUnion, this.selectedCountryCodes.size - 20, countryCode);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "green");
                this.playerCountriesNumberField.textContent = +this.playerCountriesNumberField.textContent + 1;
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 20) {
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(1);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the first trap country"]}`;
                }
            }
            if (this.selectedCountryCodes.size === 21) {
                this.setSelectedCountryFiledHtml(country);
                this.selectedCountryTrapCodes.add(countryCode);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "orange");
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 21) {
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(1);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the second trap country"]}`;
                }
            }
            if (this.selectedCountryCodes.size === 22) {
                this.setSelectedCountryFiledHtml(country);
                this.selectedCountryTrapCodes.add(countryCode);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "orange");
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 22) {
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(1);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the third trap country"]}`;
                }
            }
            if (this.selectedCountryCodes.size === 23) {
                this.setSelectedCountryFiledHtml(country);
                this.selectedCountryTrapCodes.add(countryCode);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "orange");
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 23) {
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(1);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose the fourth trap country"]}`;
                }
            }
            if (this.selectedCountryCodes.size === 24) {
                this.setSelectedCountryFiledHtml(country);
                this.selectedCountryTrapCodes.add(countryCode);
                this.addUserPlayerInitialCountrySelection(countryCode, countryBoundary, "orange");
                this.addNeighbourCountriesByCountryCode(countryCode);
                if (this.selectedCountryCodes.size === 24) {
                    this.finishCountriesUnionSelection();
                    this.addCountryBoundariesAndMarkers(1);
                    this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Press 'Play' to start game!"]}`;
                    undoButton.style.display = "none";
                    cleanSection.style.display = "flex";
                    this.selectedCountryTrapCodes.forEach((trapCountryCode)=>{
                        if (this.selectedCountryCodes.has(trapCountryCode)) this.selectedCountryCodes.delete(trapCountryCode);
                    });
                    this.selectedCountryCodes.forEach((countryCode)=>{
                        if (this.selectedCountryNeighboursCodes.has(countryCode)) this.selectedCountryNeighboursCodes.delete(countryCode);
                    });
                    this.showSelectedCountries();
                    this.selectedCountryNeighboursCodes.forEach((countryCode)=>{
                        const countryBoundary = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
                        this.setElementStyle(countryBoundary, {
                            weight: 0,
                            fillOpacity: 0.1,
                            color: "#3388ff",
                            fillColor: "#3388ff",
                            className: countryCode,
                            opacity: 0.5
                        });
                    });
                    if (this.gameConfiguration.gameMode === "user") this.sendCountriesConfigurationToOpponent();
                    else if (this.game) this.game.getRandomBonusCountries(this.countryCodes, new Set([
                        ...this.selectedCountryCodes,
                        ...this.selectedCountryNeighboursCodes,
                        ...this.selectedCountryTrapCodes,
                        ...this.opponentPlayer.selectedCountryCodes,
                        ...this.opponentPlayer.selectedCountryNeighboursCodes,
                        ...this.opponentPlayer.selectedCountryTrapCodes
                    ]));
                    this.playButton.disabled = false;
                    this.playerConfigured = true;
                    this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                }
            }
        }
    }
    addCountryBoundariesAndMarkers(minNeighboursNumber) {
        if (this.playerType === "userPlayer") Object.entries(this.playMap.countryBoundariesAndMarkersLayer.boundaries).forEach(([countryCode, countryBoundary])=>{
            if (!this.selectedCountryCodes.has(countryCode) && !this.selectedCountryNeighboursCodes.has(countryCode)) this.addCountryBoundaryAndMarker(countryCode, countryBoundary, minNeighboursNumber);
        });
    }
    addMouseOverStyleEventToCountryBoundary(countryBoundary, countryMarker, styleObject) {
        countryBoundary.once("mouseover", function(event) {
            if ("ontouchstart" in window || navigator.maxTouchPoints > 0) countryBoundary.fire("click");
            else {
                L.DomEvent.stopPropagation(event);
                countryBoundary.setStyle(styleObject);
                countryMarker._icon.classList.add("box-shadow-marker-icon-hover");
            }
        });
    }
    addMouseOutStyleEventToCountryBoundary(countryBoundary, countryMarker, styleObject, fillOpacity = 0.5) {
        if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) countryBoundary.on("mouseout", function(event) {
            L.DomEvent.stopPropagation(event);
            countryBoundary.setStyle(styleObject);
            countryMarker._icon.classList.remove("box-shadow-marker-icon-hover");
            countryBoundary.once("mouseover", function(event) {
                if ("ontouchstart" in window || navigator.maxTouchPoints > 0) countryBoundary.fire("click");
                else {
                    L.DomEvent.stopPropagation(event);
                    countryBoundary.setStyle({
                        weight: 1,
                        fillOpacity: fillOpacity,
                        opacity: 1,
                        className: styleObject.className
                    });
                    countryMarker._icon.classList.add("box-shadow-marker-icon-hover");
                }
            });
        });
    }
    createCountryMarkerIcon(country, width, height) {
        return L.icon({
            iconUrl: `${country.flags.png}`,
            iconSize: [
                width,
                height
            ]
        });
    }
    createCountryMarker(country, countryBoundary, countryTooltip, countryPopup, width, height) {
        const marker1 = L.marker(country.latlng ? country.latlng : country.capitalInfo.latlng, {
            icon: this.createCountryMarkerIcon(country, width, height),
            zIndexOffset: 10000,
            riseOnHover: true,
            alt: (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.name.common],
            className: country.cca2
        }).bindPopup(countryPopup).bindTooltip(countryTooltip);
        marker1.dataId = country.cca2;
        marker1.on("mouseover", function(event) {
            countryBoundary.setStyle({
                weight: 1,
                fillOpacity: 0.5,
                opacity: 1,
                className: country.cca2
            });
            L.DomEvent.stopPropagation(event);
            if ("ontouchstart" in window || navigator.maxTouchPoints > 0) marker1.fire("click");
        });
        marker1.on("mouseout", function(event) {
            countryBoundary.setStyle({
                weight: 0,
                fillOpacity: 0.1,
                opacity: 0,
                className: country.cca2
            });
            L.DomEvent.stopPropagation(event);
        });
        return marker1;
    }
    createCountryBoundary(countryGeo, countryCode, countryTooltip) {
        const countryBoundary = L.geoJson(countryGeo, {
            bubblingMouseEvents: false,
            style: {
                weight: 0,
                fillOpacity: 0.1,
                color: "#3388ff",
                fillColor: "#3388ff",
                className: countryCode,
                opacity: 0.5
            }
        }).bindTooltip(countryTooltip);
        return countryBoundary;
    }
    createCountryPopup(country) {
        const countryCoatOfArms = country.coatOfArms && country.coatOfArms.png ? country.coatOfArms.png : null;
        const countryPopup = L.popup({
            closeOnClick: false,
            closeButton: false,
            autoPanPadding: [
                50,
                50
            ]
        }).setLatLng(country.latlng ? country.latlng : country.capitalInfo.latlng).setContent(`<img src="${country.flags.png}" fetchpriority="high" loading="eager" style="width:21px; height:16px; box-shadow: 0 1px 1px #00000080,
                                inset 0 1px 1px #0000001f; border-radius: 2px; vertical-align: sub;">
                                  ${countryCoatOfArms ? `<img src="${countryCoatOfArms}" fetchpriority="high" loading="eager" style="width:16px; height:16px; margin-left:2px; vertical-align: sub;">` : ""}
                                <span style="font-weight:bold; font-size:0.8rem; margin-left:2px;color:${country.name.common !== "Russia" ? "darkblue" : "red"}">${country.name.common !== "Russia" ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.name.common] : (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.name.common] + " - " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["War Aggressor"]}</span>`);
        return countryPopup;
    }
    createCountryTooltip(country) {
        const countryCoatOfArms = country.coatOfArms && country.coatOfArms.png ? country.coatOfArms.png : null;
        const countryTooltip = L.tooltip(country.latlng ? country.latlng : country.capitalInfo.latlng).setContent(`<img src="${country.flags.png}" fetchpriority="high" loading="eager" style="width:21px; height:16px; box-shadow: 0 1px 1px #00000080,
                                inset 0 1px 1px #0000001f; border-radius: 2px; vertical-align: sub;">
                                ${countryCoatOfArms ? `<img src="${countryCoatOfArms}" fetchpriority="high" loading="eager" style="width:16px; height:16px; margin-left:2px; vertical-align: sub;">` : ""}
                                <span style="font-weight:bold; font-size:0.8rem; margin-left:2px;color:${country.name.common !== "Russia" ? "darkblue" : "red"}">${country.name.common !== "Russia" ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.name.common] : (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.name.common] + " - " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["War Aggressor"]}</span>`);
        countryTooltip.options.sticky = true;
        return countryTooltip;
    }
    setGame(gameInstance) {
        this.game = gameInstance;
    }
    setOpponentPlayer(opponentPlayer) {
        this.opponentPlayer = opponentPlayer;
    }
    removeAllCountryBoundaries() {
        Object.entries(this.playMap.countryBoundariesAndMarkersLayer.boundaries).forEach(([countryCode, countryBoundary])=>{
            this.playerMap.removeLayer(countryBoundary);
        });
    }
    removeAllCountryMarkers() {
        Object.entries(this.playMap.countryBoundariesAndMarkersLayer.markers).forEach(([countryCode, countryMarker])=>{
            this.playerMap.removeLayer(countryMarker);
        });
    }
    addAllCountryBoundariesAndMarkersInitial() {
        this.playerMap.removeLayer(this.countryBoundariesAndMarkersFeatureGroup);
        this.countryBoundariesAndMarkersFeatureGroup.clearLayers();
        this.playerMap.removeLayer(this.opponentPlayer.countryBoundariesAndMarkersFeatureGroup);
        this.opponentPlayer.countryBoundariesAndMarkersFeatureGroup.clearLayers();
        Object.entries(this.playMap.countryBoundariesAndMarkersLayer.boundaries).forEach(([countryCode, layer])=>{
            const tooltip = layer.getTooltip();
            const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
            countryMarker.off();
            layer.off();
            this.addMouseOverStyleEventToCountryBoundary(layer, countryMarker, {
                weight: 1,
                fillOpacity: 0.5,
                opacity: 1,
                className: countryCode
            });
            this.addMouseOutStyleEventToCountryBoundary(layer, countryMarker, {
                weight: 0,
                fillOpacity: 0.1,
                opacity: 0,
                className: countryCode
            });
            layer.setStyle({
                weight: 0,
                fillOpacity: 0.1,
                color: "#3388ff",
                fillColor: "#3388ff",
                className: countryCode,
                opacity: 0.5
            });
            countryMarker.on("mouseover", function(event) {
                layer.setStyle({
                    weight: 1,
                    fillOpacity: 0.5,
                    opacity: 1,
                    className: countryCode
                });
                L.DomEvent.stopPropagation(event);
                if ("ontouchstart" in window || navigator.maxTouchPoints > 0) marker.fire("click");
            });
            countryMarker.on("mouseout", function(event) {
                layer.setStyle({
                    weight: 0,
                    fillOpacity: 0.1,
                    opacity: 0,
                    className: countryCode
                });
                L.DomEvent.stopPropagation(event);
            });
            layer.unbindTooltip();
            countryMarker.unbindTooltip();
            layer.bindTooltip(tooltip);
            countryMarker.bindTooltip(tooltip);
            this.countryBoundariesAndMarkersFeatureGroup.addLayer(layer);
        });
        Object.values(this.playMap.countryBoundariesAndMarkersLayer.markers).forEach((layer)=>this.countryBoundariesAndMarkersFeatureGroup.addLayer(layer));
        this.playerMap.addLayer(this.countryBoundariesAndMarkersFeatureGroup);
    }
    addAllCountryBoundariesAndMarkers() {
        Object.entries(this.playMap.countryBoundariesAndMarkersLayer.boundaries).forEach(([countryCode, countryBoundary])=>{
            const style = this.countryBoundariesStyles[countryCode];
            if (style) countryBoundary.setStyle(style);
            else this.setElementStyle(countryBoundary, {
                weight: 0,
                fillOpacity: 0.1,
                color: "#3388ff",
                fillColor: "#3388ff",
                className: countryCode,
                opacity: 0.5
            });
            if (this.highlightCountryCodes.includes(countryCode)) this.setElementStyle(countryBoundary, {
                weight: 1,
                fillOpacity: 0.5,
                color: "#3388ff",
                fillColor: "#3388ff",
                className: countryCode,
                opacity: 1
            });
            const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
            if (countryMarker) {
                const markerStyle = this.countryMarkersStyles[countryCode];
                countryMarker._icon.classList.remove("box-shadow-marker-icon-hover");
                if (markerStyle && markerStyle.opacity === 0) {
                    countryMarker.setOpacity(markerStyle.opacity);
                    if (countryMarker.getElement()) countryMarker.getElement().style.pointerEvents = "none";
                } else {
                    countryMarker.setOpacity(1);
                    if (countryMarker.getElement()) countryMarker.getElement().style.pointerEvents = "auto";
                }
            }
        });
    }
    showSelectedCountries() {
        this.playMap.cleanMap();
        Object.entries(this.playMap.countryBoundariesAndMarkersLayer.markers).forEach(([countryCode, countryMarker])=>{
            countryMarker.off();
            if (this.selectedCountryCodes.has(countryCode) || this.selectedCountryTrapCodes.has(countryCode)) this.countryBoundariesAndMarkersFeatureGroup.addLayer(countryMarker);
        });
        this.selectedCountryCodes.forEach((countryCode)=>{
            const countryBoundary = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
            countryBoundary.off();
            this.setElementStyle(countryBoundary, {
                weight: 1,
                color: "green",
                fillColor: "green",
                fillOpacity: 0.5,
                opacity: 0.8,
                className: countryCode
            });
            this.countryBoundariesStyles[countryCode] = {
                weight: 1,
                color: "green",
                fillColor: "green",
                fillOpacity: 0.5,
                opacity: 0.8,
                className: countryCode
            };
            this.countryBoundariesAndMarkersFeatureGroup.addLayer(countryBoundary);
        });
        this.selectedCountryTrapCodes.forEach((countryCode)=>{
            const countryBoundary = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
            countryBoundary.off();
            this.setElementStyle(countryBoundary, {
                weight: 1,
                color: "orange",
                fillColor: "orange",
                fillOpacity: 0.5,
                opacity: 0.8,
                className: countryCode
            });
            this.countryBoundariesStyles[countryCode] = {
                weight: 1,
                color: "orange",
                fillColor: "orange",
                fillOpacity: 0.5,
                opacity: 0.8,
                className: countryCode
            };
            this.countryBoundariesAndMarkersFeatureGroup.addLayer(countryBoundary);
        });
        this.playerMap.addLayer(this.countryBoundariesAndMarkersFeatureGroup);
    }
    sendCleanCountriesSelectionToOpponent() {
        if (this.game.firebase && this.game.firebase.opponentConnectionState === "connected") {
            const cleanCountriesJson = JSON.stringify({
                type: "clean"
            });
            this.game.firebase.sendMessage(cleanCountriesJson);
        }
    }
    requestSelectedCountriesFromOpponent() {
        if (this.game.firebase && this.game.firebase.opponentConnectionState === "connected") {
            const requestCountriesJson = JSON.stringify({
                type: "reqCountries"
            });
            this.game.firebase.sendMessage(requestCountriesJson);
        }
    }
    sendStartGameToOpponent() {
        if (this.game.firebase && this.game.firebase.opponentConnectionState === "connected") {
            let bonusCountries = [];
            if (this.game.firebase.isHost) {
                this.game.getRandomBonusCountries(this.countryCodes, new Set([
                    ...this.selectedCountryCodes,
                    ...this.selectedCountryNeighboursCodes,
                    ...this.selectedCountryTrapCodes,
                    ...this.opponentPlayer.selectedCountryCodes,
                    ...this.opponentPlayer.selectedCountryNeighboursCodes,
                    ...this.opponentPlayer.selectedCountryTrapCodes
                ]));
                bonusCountries = this.game.bonusCountries;
            }
            const startJson = JSON.stringify({
                type: "start",
                bonusCountries: bonusCountries,
                superBonusCountry: this.game.superBonusCountry,
                secondSuperBonusCountry: this.game.secondSuperBonusCountry
            });
            this.game.firebase.sendMessage(startJson);
        }
    }
    sendFinishGameToOpponent() {
        if (this.game.firebase && this.game.firebase.opponentConnectionState === "connected") {
            const finishJson = JSON.stringify({
                type: "finish"
            });
            this.game.firebase.sendMessage(finishJson);
        }
    }
    sendEndGameToOpponent() {
        if (this.game.firebase && this.game.firebase.opponentConnectionState === "connected") {
            const endJson = JSON.stringify({
                type: "end"
            });
            this.game.firebase.endGame();
            this.game.firebase.sendMessage(endJson);
        }
    }
    sendCountriesConfigurationToOpponent() {
        if (this.game.firebase && this.game.firebase.opponentConnectionState === "connected") {
            const countriesConfigJson = JSON.stringify({
                type: "conf",
                countries: [
                    ...this.selectedCountryCodes
                ],
                trapCountries: [
                    ...this.selectedCountryTrapCodes
                ],
                neighbors: [
                    ...this.selectedCountryNeighboursCodes
                ],
                countryUnions: this.countryUnions
            });
            this.game.firebase.sendMessage(countriesConfigJson);
        }
    }
    sendMoveToOpponent(countryCode) {
        if (this.game.firebase && this.game.firebase.opponentConnectionState === "connected") {
            const moveJson = JSON.stringify({
                type: "move",
                value: countryCode
            });
            this.game.firebase.sendMessage(moveJson);
        }
    }
    sendMoveAckToOpponent() {
        if (this.game.firebase && this.game.firebase.opponentConnectionState === "connected") {
            const moveAckJson = JSON.stringify({
                type: "moveAck"
            });
            this.game.firebase.sendMessage(moveAckJson);
        }
    }
    opponentMessagesHandler(message) {
        const messageObject = JSON.parse(message);
        if (messageObject.type === "clean") {
            this.opponentPlayer.selectedCountryCodes = new Set();
            this.opponentPlayer.selectedCountryTrapCodes = new Set();
            this.opponentPlayer.countryUnions = [
                new Array(4),
                new Array(4),
                new Array(3),
                new Array(3),
                new Array(2),
                new Array(2),
                new Array(1),
                new Array(1)
            ];
            this.opponentPlayer.playerConfigured = false;
            document.getElementById("player-two-countries-number").textContent = "0";
            if (this.game) {
                this.game.superBonusCountry = null;
                this.game.secondSuperBonusCountry = null;
                this.game.bonusCountries = [];
            }
        } else if (messageObject.type === "reqCountries") {
            this.sendCountriesConfigurationToOpponent();
            const input = document.getElementById("chat-message-from-opponent");
            if (input) input.value = "\uD83E\uDDD3: " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent entered the game room to read your messages"];
        } else if (messageObject.type === "conf") {
            if (messageObject.countries.length === this.gameConfiguration.countriesNumber && messageObject.trapCountries.length === this.gameConfiguration.countriesTrapNumber) {
                this.opponentPlayer.selectedCountryCodes = new Set(messageObject.countries);
                this.opponentPlayer.selectedCountryTrapCodes = new Set(messageObject.trapCountries);
                this.opponentPlayer.selectedCountryNeighboursCodes = new Set(messageObject.neighbors);
                this.opponentPlayer.countryUnions = messageObject.countryUnions;
                this.opponentPlayer.playerConfigured = true;
                document.getElementById("player-two-countries-number").textContent = this.gameConfiguration.countryUnionsNumber;
                this.game.firebase.sendMessage(JSON.stringify({
                    type: "ack",
                    value: "conf"
                }));
                if (this.gameConfiguration.gameMode === "user" && this.playerConfigured && this.opponentPlayer.playerConfigured) this.gameMessageField.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent selected countries. Press 'Play' to start game!"]}`;
            }
        } else if (messageObject.type === "move") {
            const countryCode = messageObject.value;
            this.handleOpponentHit(countryCode);
        } else if (messageObject.type === "ack") {
            const value = messageObject.value;
            if (value === "conf") this.opponentPlayerConfigAcknowledged = true;
        } else if (messageObject.type === "start") {
            this.opponentPlayerStartAcknowledged = true;
            if (messageObject.bonusCountries.length !== 0) {
                this.game.bonusCountries = messageObject.bonusCountries;
                this.game.superBonusCountry = messageObject.superBonusCountry;
                this.game.secondSuperBonusCountry = messageObject.secondSuperBonusCountry;
            }
            if (this.playerConfigured && this.opponentPlayer.playerConfigured) {
                const cleanSection = document.getElementById("clean-user-countries-selection");
                cleanSection.style.display = "none";
                const randomSection = document.getElementById("random-user-countries-selection");
                randomSection.style.display = "none";
            }
            if (this.gameMessageField.textContent.endsWith((0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent has not yet started game. Wait for the message to start."])) this.gameMessageField.textContent = `\u{26A0}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Your attempt to guess opponent's country"]}`;
        } else if (messageObject.type === "finish") {
            alert("\u26A0\uFE0F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Sorry... Opponent left the game."]);
            if (this.game) this.game.finishGame(false);
        } else if (messageObject.type === "end") {
            this.score += +this.playerCountriesNumberField.textContent * 10;
            this.playerWonGame = false;
            this.game.finished = true;
            this.game.showGameResult(false, false);
        } else if (messageObject.type === "deleteGameRoom") {
            alert("\u26A0\uFE0F " + this.game.firebase.gameRoomId + ` - ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Game room does not exist. Perhaps the opponent deleted it or left the game"]}`);
            if (this.game) this.game.finishGame(false);
        } else if (messageObject.type === "moveAck") {
            this.game.isOpponentPlayerReady = true;
            this.game.playHit();
        } else if (messageObject.type === "chat") {
            const message = messageObject.value;
            const input = document.getElementById("chat-message-from-opponent");
            if (input) input.value = "\uD83E\uDDD3: " + message;
            const chat = document.getElementById("chat-container");
            if (chat.classList.contains("not-displayed")) {
                chat.classList.remove("not-displayed");
                const chatButtonLeftArrow = document.getElementById("chat-button-left-arrow");
                chatButtonLeftArrow.textContent = "\u2B07";
                const chatButtonRightArrow = document.getElementById("chat-button-right-arrow");
                chatButtonRightArrow.textContent = "\u2B07";
            }
        } else if (messageObject.type === "notReady") {
            const input = document.getElementById("chat-message-from-opponent");
            if (input) input.value = "\uD83E\uDDD3: " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent has not yet entered the game room to read your messages. Try sending a message later"];
        }
    }
    async handleOpponentHit(countryCode, addCountryBoundariesAndMarkers = true) {
        if (countryCode === "timeout") {
            this.playerAttemptToGuess = true;
            this.opponentPlayer.playerAttemptToGuess = false;
            this.sendMoveAckToOpponent();
            this.game.isPlayerReady = true;
            this.game.playHit();
        } else {
            try {
                this.openUserHintSelectionWindow = false;
                this.alreadyGuessedCountryCodes.push(countryCode);
                const country = this.countries[countryCode];
                const countryBoundary = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
                const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
                const countryPopup = countryMarker.getPopup();
                countryMarker.setOpacity(0);
                this.countryMarkersStyles[countryCode] = {
                    opacity: 0
                };
                const countryToDeleteIndex = this.countryCodes.indexOf(countryCode);
                if (countryToDeleteIndex >= 0) this.countryCodes.splice(countryToDeleteIndex, 1);
                this.countriesNumberField.textContent = this.countryCodes.length;
                const countryBound = (0, _countriesBoundsJs.COUNTRY_BOUNDS).find((bound)=>country.countryName === bound.name);
                this.openCountryPopup(countryPopup);
                const countryCoordinates = country.latlng ? country.latlng : country.capitalLatLng;
                if (countryBound) this.playerMap.fitBounds(countryBound.bounds, {
                    animate: false
                });
                else this.playerMap.setView(countryCoordinates, 4.5, {
                    animate: false
                });
                if (this.selectedCountryTrapCodes.has(countryCode)) try {
                    addCountryBoundariesAndMarkers = true;
                    this.setMessageInnerHtmlField(`<span>\u{26A0}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent has fallen into a trap-country"]}</span> <img src="${country.countryFlag}" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}.</span> ${this.gameConfiguration.hintsType !== "No Hints" ? `<span style="margin-left:5px;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["The opponent gets a hint"]}</span>` : ""}`);
                    this.trapCountryHitted = this.trapCountryHitted + 1;
                    if (this.trapCountryHitted === 1) this.opponentPlayer.score = this.opponentPlayer.score - 10;
                    else if (this.trapCountryHitted === 2) this.opponentPlayer.score = this.opponentPlayer.score - 20;
                    else if (this.trapCountryHitted === 3) this.opponentPlayer.score = this.opponentPlayer.score - 30;
                    else this.opponentPlayer.score = this.opponentPlayer.score - 50;
                    const scoreElement = document.getElementById("player-two-score-field");
                    scoreElement.textContent = `\u{1F3C5} ${this.opponentPlayer.score}`;
                    if (this.opponentPlayer.score < 0) scoreElement.style.color = "red";
                    else scoreElement.style.color = "green";
                    if (this.gameConfiguration.hintsType === "Choose Hints") {
                        this.openUserHintSelectionWindow = true;
                        this.trapCountryHittedCode = countryCode;
                    }
                    if (this.gameConfiguration.hintsType !== "No Hints" && this.gameConfiguration.hintsType !== "Choose Hints") {
                        const hintType = this.getRandomHintType();
                        this.addHint(countryCode, false, hintType);
                    } else this.addSelectedCountryToCountryPanel(this.playerSelectedCountriesContainerId, countryCode, Array.from(this.selectedCountryTrapCodes).indexOf(countryCode) + 21, false);
                    this.addCountryBoundaryBlinking(countryCode);
                    this.setElementStyle(countryBoundary, {
                        weight: 1,
                        color: "orange",
                        fillColor: "orange",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    });
                    this.playerAttemptToGuess = true;
                    this.opponentPlayer.playerAttemptToGuess = false;
                    await this.sleep(2500);
                    this.removeCountryBoundaryBlinking(countryCode);
                    this.closeCountryPopup(countryPopup);
                    this.countryBoundariesStyles[countryCode] = {
                        weight: 0,
                        color: "orange",
                        fillColor: "orange",
                        fillOpacity: 0,
                        opacity: 0,
                        className: countryCode
                    };
                    this.deleteCountryNeighbourBorders(this, country, this.selectedCountryTrapCodes, this.countriesNumberField);
                    this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                } catch (err) {
                    this.playerAttemptToGuess = true;
                    this.opponentPlayer.playerAttemptToGuess = false;
                    if (countryCode) {
                        this.removeCountryBoundaryBlinking(countryCode);
                        this.closeCountryPopup(countryPopup);
                        this.countryBoundariesStyles[countryCode] = {
                            weight: 0,
                            color: "orange",
                            fillColor: "orange",
                            fillOpacity: 0,
                            opacity: 0,
                            className: countryCode
                        };
                        this.deleteCountryNeighbourBorders(this, country, this.selectedCountryTrapCodes, this.countriesNumberField);
                    }
                    this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                }
                else if (this.game && this.game.bonusCountries.includes(countryCode)) try {
                    addCountryBoundariesAndMarkers = false;
                    this.playerAttemptToGuess = false;
                    this.opponentPlayer.playerAttemptToGuess = true;
                    const countryBoundaryOpponent = this.playMap.countryBoundariesAndMarkersLayer.boundaries[countryCode];
                    const countryMarker = this.playMap.countryBoundariesAndMarkersLayer.markers[countryCode];
                    const countryToDeleteIndex = this.opponentPlayer.countryCodes.indexOf(countryCode);
                    if (countryToDeleteIndex >= 0) this.opponentPlayer.countryCodes.splice(countryToDeleteIndex, 1);
                    if (countryMarker) {
                        countryMarker.setOpacity(0);
                        this.opponentPlayer.countryMarkersStyles[countryCode] = {
                            opacity: 0
                        };
                    }
                    if (countryBoundaryOpponent) {
                        countryBoundaryOpponent.unbindTooltip();
                        countryBoundaryOpponent.off();
                        this.opponentPlayer.setElementStyle(countryBoundaryOpponent, {
                            weight: 1,
                            color: "purple",
                            fillColor: "purple",
                            fillOpacity: 0.5,
                            opacity: 0.8,
                            className: countryCode
                        });
                        this.opponentPlayer.countryBoundariesStyles[countryCode] = {
                            weight: 1,
                            color: "purple",
                            fillColor: "purple",
                            fillOpacity: 0.5,
                            opacity: 0.8,
                            className: countryCode
                        };
                    }
                    this.addCountryBoundaryBlinking(countryCode);
                    this.deleteCountryNeighbourBorders(this, country, new Set([
                        ...this.selectedCountryCodes,
                        ...this.selectedCountryTrapCodes
                    ]), this.countriesNumberField);
                    this.deleteCountryNeighbourBorders(this.opponentPlayer, country, new Set([
                        ...this.opponentPlayer.selectedCountryCodes,
                        ...this.opponentPlayer.selectedCountryTrapCodes
                    ]));
                    this.setElementStyle(countryBoundary, {
                        weight: 1,
                        color: "purple",
                        fillColor: "purple",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    });
                    this.countryBoundariesStyles[countryCode] = {
                        weight: 1,
                        color: "purple",
                        fillColor: "purple",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    };
                    this.opponentPlayer.score = this.opponentPlayer.score + 10;
                    const scoreElement = document.getElementById("player-two-score-field");
                    scoreElement.textContent = `\u{1F3C5} ${this.opponentPlayer.score}`;
                    if (this.opponentPlayer.score < 0) scoreElement.style.color = "red";
                    else scoreElement.style.color = "green";
                    this.setMessageInnerHtmlField(`<span style="font-size: 0.7rem;">\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent has fallen into a bonus-country"]}</span> <img src="${country.countryFlag}" style="margin-left:5px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> <span style="margin-left:5px;font-size: 0.7rem;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}.</span> <span style="margin-left:5px; font-size: 0.7rem;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["He gets additional attempt to guess and"]}</span><span style="
        font-size: 0.7rem;
                    margin-left: 3px;
                    color: white;
                    border-radius: 2px;
                    background-color: green;
                    padding-left: 2px;
                    padding-right: 2px;
                    font-weight: bolder;
                  ">+10&nbsp;${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Points"]}</span>`);
                    await this.sleep(1500);
                    this.removeCountryBoundaryBlinking(countryCode);
                    this.closeCountryPopup(countryPopup);
                    this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                } catch (err) {
                    this.playerAttemptToGuess = false;
                    this.opponentPlayer.playerAttemptToGuess = true;
                    if (countryCode) {
                        this.removeCountryBoundaryBlinking(countryCode);
                        this.closeCountryPopup(countryPopup);
                    }
                    this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                }
                else if (this.selectedCountryCodes.has(countryCode)) try {
                    addCountryBoundariesAndMarkers = false;
                    this.playerAttemptToGuess = false;
                    this.opponentPlayer.playerAttemptToGuess = true;
                    if (this.opponentPlayer.isHintUsed(countryCode)) this.opponentPlayer.usedHintsCount = this.opponentPlayer.usedHintsCount + 1;
                    this.addCountryBoundaryBlinking(countryCode);
                    this.setElementStyle(countryBoundary, {
                        weight: 1,
                        color: "red",
                        fillColor: "red",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    });
                    this.countryBoundariesStyles[countryCode] = {
                        weight: 1,
                        color: "red",
                        fillColor: "red",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    };
                    this.addSelectedCountryToCountryPanel(this.playerSelectedCountriesContainerId, countryCode, Array.from(this.selectedCountryCodes).indexOf(countryCode) + 1, false);
                    const countryUnionIndex = this.getCountryUnionIndex(countryCode);
                    const isCountryUnionGuessed = this.isCountryUnionGuessed(countryUnionIndex);
                    if (isCountryUnionGuessed) {
                        this.playerCountriesNumberField.textContent = +this.playerCountriesNumberField.textContent - 1;
                        const countryUnion = this.countryUnions[countryUnionIndex];
                        if (countryUnion.length === 4) this.opponentPlayer.score = this.opponentPlayer.score + 15;
                        else if (countryUnion.length === 3) this.opponentPlayer.score = this.opponentPlayer.score + 25;
                        else if (countryUnion.length === 2) this.opponentPlayer.score = this.opponentPlayer.score + 35;
                        else if (countryUnion.length === 1) this.opponentPlayer.score = this.opponentPlayer.score + 50;
                        const scoreElement = document.getElementById("player-two-score-field");
                        scoreElement.textContent = `\u{1F3C5} ${this.opponentPlayer.score}`;
                        if (this.opponentPlayer.score < 0) scoreElement.style.color = "red";
                        else scoreElement.style.color = "green";
                        countryUnion.forEach((countryObject)=>{
                            const countryCode = Object.keys(countryObject)[0];
                            const country = this.countries[countryCode];
                            this.deleteCountryNeighbourBorders(this, country, this.selectedCountryCodes, this.countriesNumberField);
                        });
                        const countryUnionHtml = this.createCountryUnionMessageHtml(countryUnionIndex);
                        this.setMessageInnerHtmlField(`<span style="margin-right:5px;">\u{26A0}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent guessed"]}</span><div style="display: inline-block;">${countryUnionHtml.outerHTML}</div><span style="margin-left:5px;">${countryUnion.length === 1 ? (0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName] : (0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Alliance"]}</span>`);
                        await this.sleep(1500);
                        this.removeCountryBoundaryBlinking(countryCode);
                        this.closeCountryPopup(countryPopup);
                        this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                            animate: false
                        });
                    } else {
                        this.setMessageInnerHtmlField(`<span>\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent guessed"]}</span> <img src="${country.countryFlag}" style="margin-left:3px; width:20px; height:15px; border-radius:2px; box-shadow: 0 1px 1px #00000080, inset 0 1px 1px #0000001f; vertical-align: sub;"> ${country.countryCoatOfArms ? `<img src="${country.countryCoatOfArms}" style="margin-left:3px; width:15px; height:15px; vertical-align: sub;"></img>` : ""} <span style="margin-left:3px;">${(0, _uaJs.localization)[_modelJs.worldCountries.language]["countries"][country.countryName]}</span>`);
                        await this.sleep(1000);
                        this.removeCountryBoundaryBlinking(countryCode);
                        this.closeCountryPopup(countryPopup);
                    }
                } catch (err) {
                    this.playerAttemptToGuess = false;
                    this.opponentPlayer.playerAttemptToGuess = true;
                    if (countryCode) {
                        this.removeCountryBoundaryBlinking(countryCode);
                        this.closeCountryPopup(countryPopup);
                    }
                }
                else try {
                    addCountryBoundariesAndMarkers = true;
                    this.setElementStyle(countryBoundary, {
                        weight: 1,
                        color: "grey",
                        fillColor: "grey",
                        fillOpacity: 0.5,
                        opacity: 0.8,
                        className: countryCode
                    });
                    this.gameMessageField.textContent = `\u{26D4} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent failed to guess your country!"]}`;
                    this.playerAttemptToGuess = true;
                    this.opponentPlayer.playerAttemptToGuess = false;
                    await this.sleep(1000);
                    this.closeCountryPopup(countryPopup);
                    this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                    this.countryBoundariesStyles[countryCode] = {
                        weight: 0,
                        color: "grey",
                        fillColor: "grey",
                        fillOpacity: 0,
                        opacity: 0,
                        className: countryCode
                    };
                    if (this.opponentPlayer.countryBoundariesStyles[countryCode].opacity === 0) {
                        this.playerMap.removeLayer(countryBoundary);
                        delete this.countryBoundariesAndMarkersLayer.boundaries[countryCode];
                        delete this.countryBoundariesAndMarkersLayer.markers[countryCode];
                    }
                } catch (err) {
                    if (countryCode) {
                        this.closeCountryPopup(countryPopup);
                        this.countryBoundariesStyles[countryCode] = {
                            weight: 0,
                            color: "grey",
                            fillColor: "grey",
                            fillOpacity: 0,
                            opacity: 0,
                            className: countryCode
                        };
                    }
                    this.playerAttemptToGuess = true;
                    this.opponentPlayer.playerAttemptToGuess = false;
                    this.playerMap.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                        animate: false
                    });
                }
                if (+this.playerCountriesNumberField.textContent === 0) {
                    this.opponentPlayer.score += +this.opponentPlayer.playerCountriesNumberField.textContent * 10;
                    this.playerWonGame = false;
                    this.game.finished = true;
                    this.game.showGameResult(false, false);
                    return;
                }
            } catch (err) {
                this.playerAttemptToGuess = true;
                this.opponentPlayer.playerAttemptToGuess = false;
                if (countryCode) this.removeCountryBoundaryBlinking(countryCode);
            }
            this.sendMoveAckToOpponent();
            this.game.isPlayerReady = true;
            this.game.playHit(addCountryBoundariesAndMarkers);
        }
    }
    opponentConnectionHandler(connectionState) {
        const opponentConnectionText = document.getElementById("opponent-connection-text");
        const opponentConnectionIndicator = document.getElementById("opponent-connection-indicator");
        if (connectionState === "connected") {
            opponentConnectionIndicator.style.backgroundColor = "green";
            opponentConnectionText.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent is online"];
            opponentConnectionText.style.color = "green";
        } else if (connectionState === "connecting") {
            opponentConnectionIndicator.style.backgroundColor = "yellow";
            opponentConnectionText.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent is connecting"];
            opponentConnectionText.style.color = "green";
        } else if (connectionState === "disconnected") {
            opponentConnectionIndicator.style.backgroundColor = "red";
            opponentConnectionText.style.color = "red";
            opponentConnectionText.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent is not online"];
            setTimeout(()=>{
                if (this.game && this.game.firebase && this.game.firebase.opponentConnectionState !== "connected") {
                    alert("\u26A0\uFE0F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Sorry... Connection with your opponent has failed. Game is ended."]);
                    if (this.game) this.game.finishGame(false);
                }
            }, 60000);
        } else if (connectionState === "failed") {
            opponentConnectionIndicator.style.backgroundColor = "red";
            opponentConnectionText.style.color = "red";
            opponentConnectionText.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Connection is failed"];
            setTimeout(()=>{
                if (this.game && this.game.firebase && this.game.firebase.opponentConnectionState !== "connected") {
                    alert("\u26A0\uFE0F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Sorry... Connection with your opponent has failed. Game is ended."]);
                    if (this.game) this.game.finishGame(false);
                }
            }, 60000);
        } else if (connectionState === "closed") {
            opponentConnectionIndicator.style.backgroundColor = "red";
            opponentConnectionText.style.color = "red";
            opponentConnectionText.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Connection is closed"];
            alert("\u26A0\uFE0F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Sorry... Opponent left the game."]);
            if (this.game) this.game.finishGame(false);
        }
    }
}

},{"./localization/ua.js":"3eDg2","./config.js":"kBqbe","./data/countriesBounds.js":"i4mXD","./helpers.js":"j4etx","./model.js":"6YxfE","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"i4mXD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "COUNTRY_BOUNDS", ()=>COUNTRY_BOUNDS);
const COUNTRY_BOUNDS = [
    {
        name: "Afghanistan",
        bounds: [
            [
                40.235711996974764,
                85.43312337625073
            ],
            [
                25.73739672815709,
                53.45794808050555
            ]
        ]
    },
    {
        name: "Aland Islands",
        bounds: [
            [
                60.77798193061365,
                23.455572148620707
            ],
            [
                59.24346163921284,
                17.803106328308207
            ]
        ]
    },
    {
        name: "Algeria",
        bounds: [
            [
                41.55224442431824,
                38.45150706347819
            ],
            [
                10.953358101005627,
                -25.49884352801222
            ]
        ]
    },
    {
        name: "Albania",
        bounds: [
            [
                42.85634407820806,
                25.784490873813255
            ],
            [
                38.95515731966928,
                16.27821438252338
            ]
        ]
    },
    {
        name: "American Samoa",
        bounds: [
            [
                -13.59896491383381,
                -168.7407813524334
            ],
            [
                -14.850413683425183,
                -171.11735047525588
            ]
        ]
    },
    {
        name: "American Samoa",
        bounds: [
            [
                -13.59896491383381,
                -168.7407813524334
            ],
            [
                -14.850413683425183,
                -171.11735047525588
            ]
        ]
    },
    {
        name: "Andorra",
        bounds: [
            [
                42.71995845603439,
                2.172425858195988
            ],
            [
                42.31987598826778,
                1.1732016302039439
            ]
        ]
    },
    {
        name: "Angola",
        bounds: [
            [
                -2.5118944284594087,
                41.01676375229274
            ],
            [
                -22.562845565531692,
                2.9916577871332932
            ]
        ]
    },
    {
        name: "Anguilla",
        bounds: [
            [
                18.41312548690833,
                -62.69556250854693
            ],
            [
                18.048558452234197,
                -63.40212073608599
            ]
        ]
    },
    {
        name: "Antarctica",
        bounds: [
            [
                -3.2011603704478913,
                219.02320977629438
            ],
            [
                -86.49152774980183,
                -142.73460272370562
            ]
        ]
    },
    {
        name: "Antigua and Barbuda",
        bounds: [
            [
                17.863344365096786,
                -60.31908786109276
            ],
            [
                16.63036237049022,
                -62.695656983915214
            ]
        ]
    },
    {
        name: "Argentina",
        bounds: [
            [
                -18.467810537400474,
                -3.150033223049745
            ],
            [
                -60.87167110534516,
                -110.70127435625481
            ]
        ]
    },
    {
        name: "Armenia",
        bounds: [
            [
                41.5164105863584,
                49.839051579183106
            ],
            [
                38.18361902055463,
                41.84525775524679
            ]
        ]
    },
    {
        name: "Aruba",
        bounds: [
            [
                12.69685923284983,
                -69.46587697380352
            ],
            [
                12.251176493345794,
                -70.3061210451567
            ]
        ]
    },
    {
        name: "Australia",
        bounds: [
            [
                -1.2359244922073649,
                196.58409312122367
            ],
            [
                -51.114830878409066,
                89.03285198801859
            ]
        ]
    },
    {
        name: "Austria",
        bounds: [
            [
                49.69643856952195,
                21.27983542527168
            ],
            [
                44.74116365407161,
                7.835930283621067
            ]
        ]
    },
    {
        name: "Azerbaijan",
        bounds: [
            [
                42.74077932396007,
                55.32753878294553
            ],
            [
                37.14683805260418,
                41.88363364129492
            ]
        ]
    },
    {
        name: "Bahamas",
        bounds: [
            [
                29.7269729185063,
                -63.54391846742219
            ],
            [
                18.542936130217072,
                -86.15378174867219
            ]
        ]
    },
    {
        name: "Bahrain",
        bounds: [
            [
                26.571379908878242,
                52.33057762684567
            ],
            [
                25.190077158231052,
                49.5043447166894
            ]
        ]
    },
    {
        name: "Bangladesh",
        bounds: [
            [
                27.032555629250734,
                100.39598263294275
            ],
            [
                19.049025284491417,
                84.40839498507012
            ]
        ]
    },
    {
        name: "Barbados",
        bounds: [
            [
                13.370573386237817,
                -59.046488425422446
            ],
            [
                12.926081829941353,
                -59.8867324967756
            ]
        ]
    },
    {
        name: "Belarus",
        bounds: [
            [
                57.743620604509694,
                44.06493336318604
            ],
            [
                49.075268032934225,
                17.177123079884787
            ]
        ]
    },
    {
        name: "Belgium",
        bounds: [
            [
                52.27615921545846,
                10.10700522491097
            ],
            [
                49.00277498441031,
                0.600728733621101
            ]
        ]
    },
    {
        name: "Belize",
        bounds: [
            [
                20.045807671866132,
                -82.05692390563688
            ],
            [
                14.179389296923619,
                -93.36185554626188
            ]
        ]
    },
    {
        name: "Benin",
        bounds: [
            [
                12.561360654455425,
                9.795293929410992
            ],
            [
                5.352067378913413,
                -3.648611212239659
            ]
        ]
    },
    {
        name: "Bermuda",
        bounds: [
            [
                32.42888132810281,
                -64.47067407785036
            ],
            [
                32.19950314648928,
                -64.97028619184638
            ]
        ]
    },
    {
        name: "Bhutan",
        bounds: [
            [
                29.258087600236802,
                95.21489913664881
            ],
            [
                25.401333396506114,
                87.22110531271254
            ]
        ]
    },
    {
        name: "Bolivia",
        bounds: [
            [
                -9.017814732689338,
                -45.66827318757876
            ],
            [
                -25.53572359856337,
                -77.64344848332397
            ]
        ]
    },
    {
        name: "Bosnia and Herzegovina",
        bounds: [
            [
                46.08853083389011,
                24.346080292387402
            ],
            [
                41.66476862248043,
                13.041148651762402
            ]
        ]
    },
    {
        name: "Botswana",
        bounds: [
            [
                -17.39254177891397,
                37.15490775485401
            ],
            [
                -28.671276444723546,
                14.545044473604005
            ]
        ]
    },
    {
        name: "Bouvet Island",
        bounds: [
            [
                -54.35137377362897,
                3.655260254129052
            ],
            [
                -54.50925203652445,
                3.1556481401330494
            ]
        ]
    },
    {
        name: "Brazil",
        bounds: [
            [
                12.768004402272767,
                8.448352876860682
            ],
            [
                -41.39512509014306,
                -99.10288825634439
            ]
        ]
    },
    {
        name: "British Indian Ocean Territory",
        bounds: [
            [
                -4.784286259347158,
                75.00896313156073
            ],
            [
                -7.835991718080951,
                69.35649731124823
            ]
        ]
    },
    {
        name: "British Virgin Islands",
        bounds: [
            [
                18.819154403606653,
                -63.827611265595436
            ],
            [
                18.207032778437927,
                -65.01589582700664
            ]
        ]
    },
    {
        name: "Brunei",
        bounds: [
            [
                5.2029678997076205,
                116.37813646720458
            ],
            [
                3.672277315798009,
                113.55190355704833
            ]
        ]
    },
    {
        name: "Bulgaria",
        bounds: [
            [
                45.28622827226154,
                33.48210671441843
            ],
            [
                39.91563834831263,
                20.03820157276778
            ]
        ]
    },
    {
        name: "Burkina Faso",
        bounds: [
            [
                17.055211378723254,
                9.552829055340446
            ],
            [
                6.967083438832901,
                -9.459723927239253
            ]
        ]
    },
    {
        name: "Burundi",
        bounds: [
            [
                -2.021035670763204,
                33.39828271904388
            ],
            [
                -5.08544330732846,
                27.745816898731373
            ]
        ]
    },
    {
        name: "Cambodia",
        bounds: [
            [
                16.9653643269167,
                114.7211902701526
            ],
            [
                8.502282197296914,
                98.73360262227999
            ]
        ]
    },
    {
        name: "Cameroon",
        bounds: [
            [
                14.769656552078237,
                31.365209539687527
            ],
            [
                -2.4336481537138654,
                -0.6099657560576977
            ]
        ]
    },
    {
        name: "Canada",
        bounds: [
            [
                81.51561157625869,
                26.328408433686413
            ],
            [
                30.619856471868513,
                -188.77407383272373
            ]
        ]
    },
    {
        name: "Cape Verde",
        bounds: [
            [
                21.58725683244138,
                -11.731942566914794
            ],
            [
                11.706108095967286,
                -30.744495549494513
            ]
        ]
    },
    {
        name: "Caribbean Netherlands",
        bounds: [
            [
                12.33867825841532,
                -67.852952469998
            ],
            [
                11.96344357253135,
                -68.55951069753705
            ]
        ]
    },
    {
        name: "Cayman Islands",
        bounds: [
            [
                19.492504830298977,
                -80.84498057400269
            ],
            [
                19.130267113272648,
                -81.55153880154177
            ]
        ]
    },
    {
        name: "Central African Republic",
        bounds: [
            [
                13.35102102257573,
                36.905124917141876
            ],
            [
                -1.1331083208115642,
                10.017314633840659
            ]
        ]
    },
    {
        name: "Chad",
        bounds: [
            [
                25.3248531067653,
                46.18504323341358
            ],
            [
                1.6265176311128668,
                0.9653166709135786
            ]
        ]
    },
    {
        name: "Chile",
        bounds: [
            [
                -11.097324673072684,
                -5.34681833470781
            ],
            [
                -56.93666010686501,
                -112.8980594679129
            ]
        ]
    },
    {
        name: "China",
        bounds: [
            [
                57.891305362722015,
                180.70740299354773
            ],
            [
                1.8849585198774093,
                52.80670181056696
            ]
        ]
    },
    {
        name: "Christmas Island",
        bounds: [
            [
                -10.341450137053704,
                106.00182216935833
            ],
            [
                -10.658810174465854,
                105.40767988865272
            ]
        ]
    },
    {
        name: "Cocos (Keeling) Islands",
        bounds: [
            [
                -11.518353521931122,
                97.7028146586938
            ],
            [
                -12.767866129946144,
                96.2896982036157
            ]
        ]
    },
    {
        name: "Colombia",
        bounds: [
            [
                13.113785081341913,
                -50.33171209601989
            ],
            [
                -7.406465098978532,
                -88.35681806117933
            ]
        ]
    },
    {
        name: "Comoros",
        bounds: [
            [
                -10.994450710181123,
                46.366369130679224
            ],
            [
                -13.117724853057073,
                42.36947221871109
            ]
        ]
    },
    {
        name: "Cook Islands",
        bounds: [
            [
                -21.14504147144748,
                -159.5647622784185
            ],
            [
                -21.323928750827903,
                -159.91804139218803
            ]
        ]
    },
    {
        name: "Costa Rica",
        bounds: [
            [
                12.130669767261384,
                -78.44259642185597
            ],
            [
                7.0402967797261935,
                -87.94887291314582
            ]
        ]
    },
    {
        name: "Croatia",
        bounds: [
            [
                46.96148590787369,
                24.50697988837923
            ],
            [
                41.74451218107359,
                11.06307474672862
            ]
        ]
    },
    {
        name: "Cuba",
        bounds: [
            [
                25.26095653173032,
                -69.99816062514634
            ],
            [
                17.173238838379717,
                -85.98574827301894
            ]
        ]
    },
    {
        name: "Cura\xe7ao",
        bounds: [
            [
                12.523720833421416,
                -68.08640415912913
            ],
            [
                11.773248593430411,
                -69.49952061420727
            ]
        ]
    },
    {
        name: "Cyprus",
        bounds: [
            [
                35.895750827683834,
                35.64175132175705
            ],
            [
                34.117412350180864,
                31.644854409788877
            ]
        ]
    },
    {
        name: "Czechia",
        bounds: [
            [
                51.82821068439807,
                23.540308076644816
            ],
            [
                47.08597320212331,
                10.096402934994165
            ]
        ]
    },
    {
        name: "Denmark",
        bounds: [
            [
                57.917809055779166,
                18.87564755858455
            ],
            [
                53.824915199089574,
                5.431742416933899
            ]
        ]
    },
    {
        name: "Djibouti",
        bounds: [
            [
                13.14889944336265,
                46.12596698004518
            ],
            [
                10.14180277095085,
                40.473501159732685
            ]
        ]
    },
    {
        name: "Dominica",
        bounds: [
            [
                15.820877522823588,
                -60.3424961787141
            ],
            [
                14.94066589693733,
                -62.022984321420395
            ]
        ]
    },
    {
        name: "Dominican Republic",
        bounds: [
            [
                21.061978630815666,
                -64.82529585156247
            ],
            [
                16.16975077455803,
                -74.33157234285234
            ]
        ]
    },
    {
        name: "DR Congo",
        bounds: [
            [
                8.363770393029498,
                50.0975993190736
            ],
            [
                -15.961253534026955,
                4.877872756573588
            ]
        ]
    },
    {
        name: "Ecuador",
        bounds: [
            [
                1.9768226919643976,
                -68.95660701991888
            ],
            [
                -6.692704047230177,
                -84.94419466779148
            ]
        ]
    },
    {
        name: "Egypt",
        bounds: [
            [
                33.63713724312376,
                49.85246507654098
            ],
            [
                18.07662913551673,
                17.87728978079577
            ]
        ]
    },
    {
        name: "El Salvador",
        bounds: [
            [
                15.125275821432819,
                -85.46285107989173
            ],
            [
                12.141494007530014,
                -91.11531690020425
            ]
        ]
    },
    {
        name: "Equatorial Guinea",
        bounds: [
            [
                4.457448260361504,
                15.899348707141126
            ],
            [
                -0.70227640608457,
                6.393072215851255
            ]
        ]
    },
    {
        name: "Eritrea",
        bounds: [
            [
                18.54887849227916,
                49.07749634420063
            ],
            [
                10.143054328507084,
                33.08990869632802
            ]
        ]
    },
    {
        name: "Estonia",
        bounds: [
            [
                60.841336296856994,
                35.002083590044656
            ],
            [
                56.321330748391944,
                19.014495942172076
            ]
        ]
    },
    {
        name: "Eswatini",
        bounds: [
            [
                -25.289300947403664,
                35.068119197654234
            ],
            [
                -28.03309670070616,
                29.415653377341734
            ]
        ]
    },
    {
        name: "Ethiopia",
        bounds: [
            [
                15.936788116982745,
                59.51610549642669
            ],
            [
                -1.223937273810004,
                27.540930200681487
            ]
        ]
    },
    {
        name: "Falkland Islands",
        bounds: [
            [
                -50.78857450392835,
                -56.17309570312501
            ],
            [
                -52.68970242806751,
                -61.82556152343751
            ]
        ]
    },
    {
        name: "Faroe Islands",
        bounds: [
            [
                62.58073624873267,
                -3.499394580615483
            ],
            [
                61.13267166836969,
                -9.151860400927983
            ]
        ]
    },
    {
        name: "Federated States of Micronesia",
        bounds: [
            [
                7.280729064032173,
                159.06266329323813
            ],
            [
                6.518624617792029,
                157.64954683816
            ]
        ]
    },
    {
        name: "Fiji",
        bounds: [
            [
                -15.750491999494164,
                183.02217657710642
            ],
            [
                -19.88372635960431,
                175.02838275317015
            ]
        ]
    },
    {
        name: "Finland",
        bounds: [
            [
                70.88157989080175,
                64.36797141994562
            ],
            [
                55.67799281161542,
                0.4176208284552186
            ]
        ]
    },
    {
        name: "France",
        bounds: [
            [
                51.803950084264244,
                20.831486258577705
            ],
            [
                39.759759651394454,
                -11.143689037167523
            ]
        ]
    },
    {
        name: "French Guiana",
        bounds: [
            [
                7.196438895422459,
                -44.89435331173565
            ],
            [
                -0.08791050591414161,
                -58.338258453386295
            ]
        ]
    },
    {
        name: "French Polynesia",
        bounds: [
            [
                -14.084270215502617,
                -139.14011957047904
            ],
            [
                -18.964238999842696,
                -152.6338430791892
            ]
        ]
    },
    {
        name: "French Southern and Antarctic Lands",
        bounds: [
            [
                -48.500569497850904,
                72.32248889752044
            ],
            [
                -50.18272003231694,
                67.56935065187555
            ]
        ]
    },
    {
        name: "Gabon",
        bounds: [
            [
                4.079710235331059,
                22.708277254169673
            ],
            [
                -6.232998336268066,
                3.695724271589969
            ]
        ]
    },
    {
        name: "Gambia",
        bounds: [
            [
                14.806793686568348,
                -12.19540064437979
            ],
            [
                11.819009694366056,
                -17.84786646469229
            ]
        ]
    },
    {
        name: "Georgia",
        bounds: [
            [
                45.43778711741519,
                53.31987616307013
            ],
            [
                39.015390743976404,
                37.33228851519754
            ]
        ]
    },
    {
        name: "Germany",
        bounds: [
            [
                55.08564230348123,
                26.636611930273332
            ],
            [
                45.8259154918694,
                -0.25119835302794824
            ]
        ]
    },
    {
        name: "Ghana",
        bounds: [
            [
                11.142273896557805,
                6.972792708452512
            ],
            [
                3.906798807463494,
                -6.4711124331980985
            ]
        ]
    },
    {
        name: "Gibraltar",
        bounds: [
            [
                36.25015148828307,
                -5.0556547625387305
            ],
            [
                36.0309666956381,
                -5.555266876534753
            ]
        ]
    },
    {
        name: "Greece",
        bounds: [
            [
                43.937996375314796,
                39.88437252165706
            ],
            [
                32.50544453989937,
                12.996562238355803
            ]
        ]
    },
    {
        name: "Greenland",
        bounds: [
            [
                84.96520014843098,
                113.60159118354674
            ],
            [
                37.137413885293,
                -142.19981118241486
            ]
        ]
    },
    {
        name: "Grenada",
        bounds: [
            [
                12.66967523748109,
                -60.57430665606438
            ],
            [
                11.777463734772022,
                -62.254794798770696
            ]
        ]
    },
    {
        name: "Guadeloupe",
        bounds: [
            [
                17.32518021515939,
                -59.0368398545737
            ],
            [
                15.241112494331135,
                -63.03373676654186
            ]
        ]
    },
    {
        name: "Guam",
        bounds: [
            [
                14.141945259816133,
                146.51631260108996
            ],
            [
                12.648421346052254,
                143.69007969093371
            ]
        ]
    },
    {
        name: "Guatemala",
        bounds: [
            [
                18.22947572712052,
                -83.47448402840583
            ],
            [
                12.307930288128821,
                -94.77941566903084
            ]
        ]
    },
    {
        name: "Guernsey",
        bounds: [
            [
                49.58000216263489,
                -2.1354988857837225
            ],
            [
                49.33049421760786,
                -2.842057113322785
            ]
        ]
    },
    {
        name: "Guinea",
        bounds: [
            [
                14.852809648944962,
                0.14870715461655418
            ],
            [
                4.688281248256222,
                -18.863845827963146
            ]
        ]
    },
    {
        name: "Guinea-Bissau",
        bounds: [
            [
                13.336258015916524,
                -11.821410040718565
            ],
            [
                10.33121577097867,
                -17.473875861031065
            ]
        ]
    },
    {
        name: "Guyana",
        bounds: [
            [
                9.65420958497375,
                -47.3738917315089
            ],
            [
                -0.6282588581676655,
                -66.38644471408861
            ]
        ]
    },
    {
        name: "Haiti",
        bounds: [
            [
                20.27775740345799,
                -69.31832625926002
            ],
            [
                17.371713139273428,
                -74.97079207957252
            ]
        ]
    },
    {
        name: "Heard Island and McDonald Islands",
        bounds: [
            [
                -52.833051427375395,
                74.52294695633364
            ],
            [
                -53.38108642484867,
                72.84245881362729
            ]
        ]
    },
    {
        name: "Honduras",
        bounds: [
            [
                17.31955147860656,
                -79.75011167766502
            ],
            [
                11.372723962627324,
                -91.05504331829
            ]
        ]
    },
    {
        name: "Hong Kong",
        bounds: [
            [
                22.700953158553276,
                115.09791374252296
            ],
            [
                21.85619305978958,
                113.41742559981667
            ]
        ]
    },
    {
        name: "Hungary",
        bounds: [
            [
                49.2381516911065,
                27.316102964948506
            ],
            [
                44.23810059554331,
                13.872197823297856
            ]
        ]
    },
    {
        name: "Iceland",
        bounds: [
            [
                67.33161108239145,
                -5.250888418120213
            ],
            [
                62.104145995393374,
                -27.860751699370216
            ]
        ]
    },
    {
        name: "India",
        bounds: [
            [
                36.08372888112761,
                117.3149960740974
            ],
            [
                3.992689475439189,
                53.364645482606974
            ]
        ]
    },
    {
        name: "Indonesia",
        bounds: [
            [
                16.154738518375968,
                163.521072002566
            ],
            [
                -24.188545308752033,
                87.47086007224712
            ]
        ]
    },
    {
        name: "Iran",
        bounds: [
            [
                41.54163450100968,
                80.15478402864521
            ],
            [
                20.715211137388632,
                34.93505746614522
            ]
        ]
    },
    {
        name: "Iraq",
        bounds: [
            [
                38.60080789459179,
                59.586692849906804
            ],
            [
                26.318976347462762,
                32.698882566605505
            ]
        ]
    },
    {
        name: "Ireland",
        bounds: [
            [
                56.06385869107345,
                3.8068658927803916
            ],
            [
                49.85600846775295,
                -15.205687089799326
            ]
        ]
    },
    {
        name: "Isle of Man",
        bounds: [
            [
                54.66431984166117,
                -2.7961147996593514
            ],
            [
                53.766591783916546,
                -5.6223477098156005
            ]
        ]
    },
    {
        name: "Israel",
        bounds: [
            [
                33.56006678174556,
                41.967894415718604
            ],
            [
                28.29508796511149,
                30.662962775093607
            ]
        ]
    },
    {
        name: "Italy",
        bounds: [
            [
                49.256632937079246,
                35.327786646242934
            ],
            [
                33.92692952723548,
                -2.6973193189164917
            ]
        ]
    },
    {
        name: "Ivory Coast",
        bounds: [
            [
                12.392771680823373,
                5.95013640555826
            ],
            [
                2.161542928263836,
                -13.062416577021441
            ]
        ]
    },
    {
        name: "Jamaica",
        bounds: [
            [
                19.601252763107105,
                -73.98215775927271
            ],
            [
                16.683614687749095,
                -79.63462357958521
            ]
        ]
    },
    {
        name: "Japan",
        bounds: [
            [
                46.46082032193429,
                169.25731912876844
            ],
            [
                22.755581854237885,
                115.48169856216595
            ]
        ]
    },
    {
        name: "Jersey",
        bounds: [
            [
                49.35376851429594,
                -1.7077216254401155
            ],
            [
                49.10310790769738,
                -2.414279852979178
            ]
        ]
    },
    {
        name: "Jordan",
        bounds: [
            [
                33.97971589968769,
                44.69197390582624
            ],
            [
                27.71487948064167,
                31.248068764175635
            ]
        ]
    },
    {
        name: "Kazakhstan",
        bounds: [
            [
                57.658693072058924,
                104.8237398321639
            ],
            [
                33.99875342562928,
                40.87338924067344
            ]
        ]
    },
    {
        name: "Kenya",
        bounds: [
            [
                5.726145419445545,
                51.239608134809586
            ],
            [
                -6.532812420014281,
                28.62974485355958
            ]
        ]
    },
    {
        name: "Kiribati",
        bounds: [
            [
                3.875908404334149,
                180.37359564535927
            ],
            [
                -2.261901746118979,
                169.06866400473433
            ]
        ]
    },
    {
        name: "Kosovo",
        bounds: [
            [
                43.548690490271866,
                24.230270178755156
            ],
            [
                41.28208217869823,
                18.577804358442656
            ]
        ]
    },
    {
        name: "Kuwait",
        bounds: [
            [
                30.581170801440777,
                50.89395154808849
            ],
            [
                27.90219522903655,
                45.24148572777599
            ]
        ]
    },
    {
        name: "Kyrgyzstan",
        bounds: [
            [
                44.04747920588798,
                84.20688177885226
            ],
            [
                37.47811900157494,
                68.21929413097969
            ]
        ]
    },
    {
        name: "Laos",
        bounds: [
            [
                23.1614904382679,
                117.97190304283
            ],
            [
                11.45947905574038,
                95.36203976158
            ]
        ]
    },
    {
        name: "Latvia",
        bounds: [
            [
                58.781566262063954,
                32.29388811689348
            ],
            [
                54.785357135735964,
                18.849982975242867
            ]
        ]
    },
    {
        name: "Lebanon",
        bounds: [
            [
                34.994065446558174,
                39.303380713487876
            ],
            [
                32.44031267529433,
                33.65091489317537
            ]
        ]
    },
    {
        name: "Lesotho",
        bounds: [
            [
                -27.935078222248276,
                33.105757696454994
            ],
            [
                -31.701616869686422,
                25.111963872518686
            ]
        ]
    },
    {
        name: "Liberia",
        bounds: [
            [
                9.167398523872603,
                -2.571213530466405
            ],
            [
                3.063946819475606,
                -13.876145171091407
            ]
        ]
    },
    {
        name: "Libya",
        bounds: [
            [
                36.70298761519616,
                45.17397369308682
            ],
            [
                14.774072064824441,
                -0.045752869413187014
            ]
        ]
    },
    {
        name: "Liechtenstein",
        bounds: [
            [
                47.422380517598356,
                10.242167910582271
            ],
            [
                46.98380946480311,
                9.053883349171008
            ]
        ]
    },
    {
        name: "Lithuania",
        bounds: [
            [
                58.3158029961296,
                35.0137899866579
            ],
            [
                52.462515780586855,
                16.001237004078195
            ]
        ]
    },
    {
        name: "Luxembourg",
        bounds: [
            [
                50.39924969684674,
                8.595789400663111
            ],
            [
                48.99492524001617,
                4.598892488694975
            ]
        ]
    },
    {
        name: "Macau",
        bounds: [
            [
                22.26992992347492,
                113.85540318823269
            ],
            [
                22.018537909808426,
                113.3557910742367
            ]
        ]
    },
    {
        name: "Madagascar",
        bounds: [
            [
                -7.928233788611283,
                74.88275556907364
            ],
            [
                -30.901842643549,
                29.66302900657363
            ]
        ]
    },
    {
        name: "Malawi",
        bounds: [
            [
                -7.5365306278513495,
                48.58166394696861
            ],
            [
                -19.45601132631308,
                25.971800665718607
            ]
        ]
    },
    {
        name: "Malaysia",
        bounds: [
            [
                11.530943719912377,
                128.38083237457337
            ],
            [
                -5.751119677323809,
                96.40565707882816
            ]
        ]
    },
    {
        name: "Maldives",
        bounds: [
            [
                3.815258834653405,
                74.34091107679386
            ],
            [
                2.7313974624626227,
                72.34246262080978
            ]
        ]
    },
    {
        name: "Mali",
        bounds: [
            [
                27.098976733329465,
                22.279077888045606
            ],
            [
                3.6019526777565476,
                -22.940648674454398
            ]
        ]
    },
    {
        name: "Malta",
        bounds: [
            [
                36.167291224653304,
                15.102693908822221
            ],
            [
                35.644426920520964,
                13.914409347410956
            ]
        ]
    },
    {
        name: "Marshall Islands",
        bounds: [
            [
                11.50244880471744,
                175.81415916981433
            ],
            [
                5.430991474102532,
                164.50922752918936
            ]
        ]
    },
    {
        name: "Martinique",
        bounds: [
            [
                15.586504463867556,
                -58.95936205810077
            ],
            [
                13.820539728955575,
                -62.32033834351344
            ]
        ]
    },
    {
        name: "Mauritania",
        bounds: [
            [
                29.727018409181056,
                15.994343124013229
            ],
            [
                6.578213813951657,
                -29.22538343848678
            ]
        ]
    },
    {
        name: "Mauritius",
        bounds: [
            [
                -19.606409010487067,
                59.32037804448246
            ],
            [
                -21.04609432531015,
                56.4941451343262
            ]
        ]
    },
    {
        name: "Mayotte",
        bounds: [
            [
                -12.599849015763343,
                45.75668850884582
            ],
            [
                -13.12904622738301,
                44.757464280853775
            ]
        ]
    },
    {
        name: "Mexico",
        bounds: [
            [
                37.62591722841959,
                -64.15684711642704
            ],
            [
                5.912880162276826,
                -128.10719770791746
            ]
        ]
    },
    {
        name: "Moldova",
        bounds: [
            [
                49.2040031784626,
                36.48810214487903
            ],
            [
                44.20063036719638,
                23.044197003228422
            ]
        ]
    },
    {
        name: "Monaco",
        bounds: [
            [
                43.84111953767378,
                7.700718984384195
            ],
            [
                43.64503873452331,
                7.201106870388193
            ]
        ]
    },
    {
        name: "Mongolia",
        bounds: [
            [
                57.22384354058113,
                142.61068434543466
            ],
            [
                33.32621854333397,
                78.66033375394427
            ]
        ]
    },
    {
        name: "Montenegro",
        bounds: [
            [
                43.72341337763198,
                22.58774118131821
            ],
            [
                41.4632481857212,
                16.93527536100571
            ]
        ]
    },
    {
        name: "Montserrat",
        bounds: [
            [
                16.91495056123275,
                -61.76790887522087
            ],
            [
                16.547365698857888,
                -62.474467102759924
            ]
        ]
    },
    {
        name: "Morocco",
        bounds: [
            [
                39.40445035811873,
                19.426461180346
            ],
            [
                18.06502655112514,
                -25.793265382154008
            ]
        ]
    },
    {
        name: "Mozambique",
        bounds: [
            [
                -7.753654951308355,
                62.88403425970801
            ],
            [
                -30.750512449231465,
                17.664307697208006
            ]
        ]
    },
    {
        name: "Myanmar",
        bounds: [
            [
                31.489097754796532,
                129.22467739810114
            ],
            [
                3.989003700523385,
                75.44905683149864
            ]
        ]
    },
    {
        name: "Namibia",
        bounds: [
            [
                -11.952324417402052,
                44.60286965609761
            ],
            [
                -34.34257101539213,
                -0.6168569064023944
            ]
        ]
    },
    {
        name: "Nauru",
        bounds: [
            [
                -0.3866816950340649,
                167.23475913480553
            ],
            [
                -0.6580823781972339,
                166.7351470208095
            ]
        ]
    },
    {
        name: "Nepal",
        bounds: [
            [
                32.9536208960176,
                97.93262705185599
            ],
            [
                22.08591901076429,
                75.32276377060597
            ]
        ]
    },
    {
        name: "Netherlands",
        bounds: [
            [
                53.885344747720794,
                12.250068979470173
            ],
            [
                50.10695389109573,
                0.9451373388451724
            ]
        ]
    },
    {
        name: "New Caledonia",
        bounds: [
            [
                -18.94432664980877,
                171.3902401644466
            ],
            [
                -23.75238094566311,
                161.88396367315673
            ]
        ]
    },
    {
        name: "New Zealand",
        bounds: [
            [
                -33.65150833880308,
                196.11204521096082
            ],
            [
                -49.03986430129124,
                158.08693924580137
            ]
        ]
    },
    {
        name: "Nicaragua",
        bounds: [
            [
                15.580944114767698,
                -78.22301918465581
            ],
            [
                9.590156199990945,
                -89.52795082528081
            ]
        ]
    },
    {
        name: "Niger",
        bounds: [
            [
                27.25469943107283,
                35.37443942748721
            ],
            [
                3.7766377161333655,
                -9.845287135012796
            ]
        ]
    },
    {
        name: "Nigeria",
        bounds: [
            [
                18.72772309955744,
                30.117265607940027
            ],
            [
                -1.5863917668641443,
                -7.907840357219414
            ]
        ]
    },
    {
        name: "Niue",
        bounds: [
            [
                -18.83178292078124,
                -169.35858069757523
            ],
            [
                -19.26324884573691,
                -170.19882476892832
            ]
        ]
    },
    {
        name: "Norfolk Island",
        bounds: [
            [
                -28.927473082827866,
                168.26602326537585
            ],
            [
                -29.164749308758534,
                167.76641115137983
            ]
        ]
    },
    {
        name: "North Korea",
        bounds: [
            [
                44.27700882830121,
                140.20829521512223
            ],
            [
                34.83222813943448,
                117.59843193387223
            ]
        ]
    },
    {
        name: "North Macedonia",
        bounds: [
            [
                43.05675132643478,
                26.626817728406124
            ],
            [
                39.80191314676494,
                18.633023904469812
            ]
        ]
    },
    {
        name: "Northern Mariana Islands",
        bounds: [
            [
                15.54107822773372,
                146.7088248665505
            ],
            [
                14.659692205174066,
                145.02833672384415
            ]
        ]
    },
    {
        name: "Norway",
        bounds: [
            [
                71.93021681968486,
                61.30690381511503
            ],
            [
                53.78235230358965,
                -14.743308115203815
            ]
        ]
    },
    {
        name: "Oman",
        bounds: [
            [
                27.414348499364124,
                72.05085692883262
            ],
            [
                13.782941422822082,
                45.16304664553131
            ]
        ]
    },
    {
        name: "Pakistan",
        bounds: [
            [
                38.61772998893347,
                96.63443277619278
            ],
            [
                17.099843686923244,
                51.41470621369279
            ]
        ]
    },
    {
        name: "Palau",
        bounds: [
            [
                7.751236310487176,
                135.23029423058617
            ],
            [
                7.111130937913254,
                134.04200966917497
            ]
        ]
    },
    {
        name: "Palestine",
        bounds: [
            [
                32.71042305622742,
                37.49859686989133
            ],
            [
                30.864948174343695,
                33.50169995792319
            ]
        ]
    },
    {
        name: "Panama",
        bounds: [
            [
                11.961505351622792,
                -72.26545930244812
            ],
            [
                4.740588468816261,
                -85.70936444409877
            ]
        ]
    },
    {
        name: "Papua New Guinea",
        bounds: [
            [
                0.17395803600610915,
                163.088234908144
            ],
            [
                -14.282477794812944,
                136.20042462484275
            ]
        ]
    },
    {
        name: "Paraguay",
        bounds: [
            [
                -16.524724222384986,
                -41.771365103407945
            ],
            [
                -29.906827914726378,
                -68.65917538670921
            ]
        ]
    },
    {
        name: "Peru",
        bounds: [
            [
                1.9334100681867208,
                -46.93568596154522
            ],
            [
                -22.065108150503562,
                -92.15541252404523
            ]
        ]
    },
    {
        name: "Philippines",
        bounds: [
            [
                21.570597378491556,
                143.307938628763
            ],
            [
                1.441850867357909,
                105.28283266360356
            ]
        ]
    },
    {
        name: "Pitcairn Island",
        bounds: [
            [
                -24.962255058768555,
                -129.83240366672013
            ],
            [
                -25.168990517995645,
                -130.25252570239672
            ]
        ]
    },
    {
        name: "Poland",
        bounds: [
            [
                56.97092930032688,
                38.17209240877295
            ],
            [
                46.2500889474411,
                6.196917113027745
            ]
        ]
    },
    {
        name: "Portugal",
        bounds: [
            [
                43.248264115888354,
                3.9734436817200134
            ],
            [
                35.26589735915101,
                -15.039109300859728
            ]
        ]
    },
    {
        name: "Puerto Rico",
        bounds: [
            [
                19.590908927584287,
                -63.05622953167989
            ],
            [
                16.673096816293604,
                -68.70869535199239
            ]
        ]
    },
    {
        name: "Qatar",
        bounds: [
            [
                26.544507724856185,
                54.541474753789245
            ],
            [
                23.76544064567983,
                48.889008933476745
            ]
        ]
    },
    {
        name: "Republic of the Congo",
        bounds: [
            [
                5.859799967962504,
                30.76563203429789
            ],
            [
                -8.702989079789589,
                3.877821750996629
            ]
        ]
    },
    {
        name: "R\xe9union",
        bounds: [
            [
                -19.683985649478302,
                58.89752005261421
            ],
            [
                -22.548089434234868,
                53.24505423230171
            ]
        ]
    },
    {
        name: "Romania",
        bounds: [
            [
                49.400981282318135,
                36.8795325813535
            ],
            [
                42.21615162186186,
                17.86697959877376
            ]
        ]
    },
    {
        name: "Russia",
        bounds: [
            [
                82.65976492076982,
                253.54565033988433
            ],
            [
                18.098773250067016,
                -2.2557520260773356
            ]
        ]
    },
    {
        name: "Rwanda",
        bounds: [
            [
                -0.5821966168613373,
                33.288424775068215
            ],
            [
                -3.6504132208677107,
                27.63595895475571
            ]
        ]
    },
    {
        name: "Saint Barth\xe9lemy",
        bounds: [
            [
                18.698276558101774,
                -62.72052150622126
            ],
            [
                17.334312301438743,
                -62.93707973376032
            ]
        ]
    },
    {
        name: "Saint Helena, Ascension and Tristan da Cunha",
        bounds: [
            [
                -15.767803586995718,
                -5.296119707560228
            ],
            [
                -16.136856469945656,
                -6.002677935099291
            ]
        ]
    },
    {
        name: "Saint Kitts and Nevis",
        bounds: [
            [
                17.56752922345202,
                -62.04340847131538
            ],
            [
                16.95106917367011,
                -63.231693032726625
            ]
        ]
    },
    {
        name: "Saint Lucia",
        bounds: [
            [
                14.697808877907592,
                -59.27133185758466
            ],
            [
                13.207817440205535,
                -62.09756476774092
            ]
        ]
    },
    {
        name: "Saint Martin (island)",
        bounds: [
            [
                18.253480475537533,
                -62.62552666822791
            ],
            [
                17.888579923286816,
                -63.33208489576698
            ]
        ]
    },
    {
        name: "Saint Pierre and Miquelon",
        bounds: [
            [
                47.21681897056397,
                -55.309054048597574
            ],
            [
                46.593113774448646,
                -56.989542191303904
            ]
        ]
    },
    {
        name: "Saint Vincent and the Grenadines",
        bounds: [
            [
                13.418352206344098,
                -60.775017024673225
            ],
            [
                13.044707730329591,
                -61.48157525221229
            ]
        ]
    },
    {
        name: "Saint Vincent and the Grenadines",
        bounds: [
            [
                13.603263812662975,
                -59.52947053896454
            ],
            [
                12.10645199652326,
                -62.35570344912079
            ]
        ]
    },
    {
        name: "Samoa",
        bounds: [
            [
                -12.53258019279676,
                -169.24194763570566
            ],
            [
                -15.040090662765644,
                -173.99508588135052
            ]
        ]
    },
    {
        name: "San Marino",
        bounds: [
            [
                44.07525546411763,
                12.874580143295534
            ],
            [
                43.798855799539794,
                12.168021915756471
            ]
        ]
    },
    {
        name: "S\xe3o Tom\xe9 and Pr\xedncipe",
        bounds: [
            [
                2.6807159339980124,
                11.01055655203089
            ],
            [
                -0.9699321334187363,
                4.288603981205564
            ]
        ]
    },
    {
        name: "Saudi Arabia",
        bounds: [
            [
                33.944337739947265,
                70.53128720221441
            ],
            [
                11.48117971957896,
                25.311560639714408
            ]
        ]
    },
    {
        name: "Senegal",
        bounds: [
            [
                18.430436384381895,
                -4.866604453411548
            ],
            [
                10.020093917670009,
                -20.854192101284152
            ]
        ]
    },
    {
        name: "Serbia",
        bounds: [
            [
                46.585216688930856,
                28.72674002004667
            ],
            [
                41.333290892179285,
                15.282834878396054
            ]
        ]
    },
    {
        name: "Seychelles",
        bounds: [
            [
                -4.176597315264594,
                56.43131933612158
            ],
            [
                -4.941832107005007,
                55.01820288104346
            ]
        ]
    },
    {
        name: "Sierra Leone",
        bounds: [
            [
                11.393937004200671,
                -5.283986171628277
            ],
            [
                5.320763938682537,
                -16.58891781225328
            ]
        ]
    },
    {
        name: "Singapore",
        bounds: [
            [
                1.8736125903168703,
                105.04397131691034
            ],
            [
                0.788272861538908,
                103.04552286092625
            ]
        ]
    },
    {
        name: "Sint Maarten",
        bounds: [
            [
                18.221521454680833,
                -62.634450168805856
            ],
            [
                17.85655447751335,
                -63.34100839634492
            ]
        ]
    },
    {
        name: "Slovakia",
        bounds: [
            [
                50.73327779870186,
                27.446833557600534
            ],
            [
                45.88064964475211,
                14.002928415949922
            ]
        ]
    },
    {
        name: "Slovenia",
        bounds: [
            [
                47.47127718296424,
                19.580650940014866
            ],
            [
                44.453708101822926,
                11.586857116078559
            ]
        ]
    },
    {
        name: "Solomon Islands",
        bounds: [
            [
                -4.115848506575792,
                171.96318329202606
            ],
            [
                -14.29715924643018,
                152.95063030944632
            ]
        ]
    },
    {
        name: "Somalia",
        bounds: [
            [
                19.272335563335755,
                74.0053722213548
            ],
            [
                -4.913014432504112,
                28.78564565885479
            ]
        ]
    },
    {
        name: "South Africa",
        bounds: [
            [
                -17.015218355193248,
                50.843360220266405
            ],
            [
                -38.54853414473818,
                5.623633657766405
            ]
        ]
    },
    {
        name: "South Georgia",
        bounds: [
            [
                -53.292087301927374,
                -31.97120506416025
            ],
            [
                -55.809701494535204,
                -39.96499888809654
            ]
        ]
    },
    {
        name: "South Korea",
        bounds: [
            [
                39.389000719896934,
                137.15689545912963
            ],
            [
                32.36042628380125,
                121.16930781125706
            ]
        ]
    },
    {
        name: "South Sudan",
        bounds: [
            [
                14.237083599641828,
                46.755557277642346
            ],
            [
                -0.22079506336734872,
                19.867746994341044
            ]
        ]
    },
    {
        name: "Spain",
        bounds: [
            [
                46.18499704652863,
                15.144898792303076
            ],
            [
                32.85733451347782,
                -16.830276503442132
            ]
        ]
    },
    {
        name: "Sri Lanka",
        bounds: [
            [
                10.975422124425748,
                89.06149548852073
            ],
            [
                3.737168193374856,
                75.6175903468701
            ]
        ]
    },
    {
        name: "Sudan",
        bounds: [
            [
                25.760744361454126,
                57.34709567748721
            ],
            [
                2.10936980118565,
                12.127369114987207
            ]
        ]
    },
    {
        name: "Suriname",
        bounds: [
            [
                7.918076089801197,
                -46.19533908033874
            ],
            [
                -0.7417695425402538,
                -62.182926728211356
            ]
        ]
    },
    {
        name: "Svalbard and Jan Mayen",
        bounds: [
            [
                80.24576618515411,
                22.169930666020052
            ],
            [
                76.54289223655026,
                6.77613684208378
            ]
        ]
    },
    {
        name: "Sweden",
        bounds: [
            [
                69.20697116445685,
                56.78667334187658
            ],
            [
                52.81069558883782,
                -7.163677249613834
            ]
        ]
    },
    {
        name: "Switzerland",
        bounds: [
            [
                48.947615023341044,
                16.72005050278286
            ],
            [
                43.919368099468116,
                3.2761453611322104
            ]
        ]
    },
    {
        name: "Syria",
        bounds: [
            [
                37.895984628379296,
                47.383604518413
            ],
            [
                30.73136963165741,
                31.396016870540418
            ]
        ]
    },
    {
        name: "Taiwan",
        bounds: [
            [
                26.214779010135906,
                127.23299336845182
            ],
            [
                20.58156351804086,
                115.92806172782682
            ]
        ]
    },
    {
        name: "Tajikistan",
        bounds: [
            [
                42.21677963290141,
                82.03744541066139
            ],
            [
                34.111214067352144,
                63.02489242808165
            ]
        ]
    },
    {
        name: "Tanzania",
        bounds: [
            [
                1.4797826696334484,
                54.42076995221067
            ],
            [
                -15.69055718448691,
                22.44559465646547
            ]
        ]
    },
    {
        name: "Thailand",
        bounds: [
            [
                24.84799141041763,
                127.8809163059264
            ],
            [
                1.1001367445637529,
                82.66118974342639
            ]
        ]
    },
    {
        name: "Timor-Leste",
        bounds: [
            [
                -6.785484353898618,
                130.40637475988973
            ],
            [
                -11.074391573347672,
                122.41258093595343
            ]
        ]
    },
    {
        name: "Togo",
        bounds: [
            [
                11.859060078071828,
                8.95974623205577
            ],
            [
                4.636239555930684,
                -4.484158909594862
            ]
        ]
    },
    {
        name: "Tokelau",
        bounds: [
            [
                -7.848883921262885,
                -169.60176264663954
            ],
            [
                -9.993782289701352,
                -173.59865955860772
            ]
        ]
    },
    {
        name: "Tonga",
        bounds: [
            [
                -18.46283305790457,
                -170.75650288280826
            ],
            [
                -21.88977487889093,
                -177.4784554536336
            ]
        ]
    },
    {
        name: "Trinidad and Tobago",
        bounds: [
            [
                12.237997628778519,
                -57.79377480162203
            ],
            [
                9.221378766333673,
                -63.44624062193453
            ]
        ]
    },
    {
        name: "Tunisia",
        bounds: [
            [
                39.61414082709761,
                26.296515205372774
            ],
            [
                27.483568075789623,
                -0.5912950779284866
            ]
        ]
    },
    {
        name: "Turkey",
        bounds: [
            [
                45.7124445371563,
                58.01704092025214
            ],
            [
                29.464205431150813,
                19.9919349550927
            ]
        ]
    },
    {
        name: "Turkmenistan",
        bounds: [
            [
                46.07328476718001,
                82.33429381845316
            ],
            [
                29.91459272441933,
                44.309187853293714
            ]
        ]
    },
    {
        name: "Turks and Caicos Islands",
        bounds: [
            [
                22.284090853635817,
                -70.05985715131983
            ],
            [
                20.856323213562444,
                -72.88609006147608
            ]
        ]
    },
    {
        name: "Tuvalu",
        bounds: [
            [
                -6.473440016788603,
                181.74648458631665
            ],
            [
                -9.513911354586913,
                176.09401876600415
            ]
        ]
    },
    {
        name: "Uganda",
        bounds: [
            [
                4.969514325319418,
                41.883888945552776
            ],
            [
                -3.706845426153684,
                25.896301297680193
            ]
        ]
    },
    {
        name: "Ukraine",
        bounds: [
            [
                53.46412303206615,
                50.165650928072196
            ],
            [
                41.83069332073193,
                18.190475632326986
            ]
        ]
    },
    {
        name: "United Arab Emirates",
        bounds: [
            [
                27.402680938655003,
                62.121395507008494
            ],
            [
                20.739698744803057,
                48.67749036535783
            ]
        ]
    },
    {
        name: "United Kingdom",
        bounds: [
            [
                59.57416639690424,
                19.660790043714393
            ],
            [
                47.39026913107613,
                -18.36431592144503
            ]
        ]
    },
    {
        name: "United States",
        bounds: [
            [
                71.7981706808904,
                -6.1401036008240375
            ],
            [
                6.654305394042844,
                -187.01900985082406
            ]
        ]
    },
    {
        name: "United States Minor Outlying Islands",
        bounds: [
            [
                19.380142110754488,
                166.84936523437503
            ],
            [
                19.198998818178847,
                166.49608612060547
            ]
        ]
    },
    {
        name: "United States Virgin Islands",
        bounds: [
            [
                18.637677625065404,
                -64.11514225286142
            ],
            [
                18.024908707636804,
                -65.30342681427263
            ]
        ]
    },
    {
        name: "Uruguay",
        bounds: [
            [
                -28.57605283255687,
                -44.510112609407045
            ],
            [
                -37.23246597097939,
                -63.52266559198677
            ]
        ]
    },
    {
        name: "Uzbekistan",
        bounds: [
            [
                48.674435344378104,
                88.65213792614064
            ],
            [
                33.187926115465196,
                50.627031960981206
            ]
        ]
    },
    {
        name: "Vanuatu",
        bounds: [
            [
                -13.0259723059127,
                174.14429422574085
            ],
            [
                -18.92707862536022,
                162.83936258511582
            ]
        ]
    },
    {
        name: "Vatican City",
        bounds: [
            [
                42.039096316025734,
                12.869088758324468
            ],
            [
                41.75338757345396,
                12.162530530785403
            ]
        ]
    },
    {
        name: "Venezuela",
        bounds: [
            [
                19.931942812820864,
                -38.19007062843917
            ],
            [
                -4.215047627205268,
                -83.40979719093919
            ]
        ]
    },
    {
        name: "Vietnam",
        bounds: [
            [
                26.864238621131463,
                134.29915223705603
            ],
            [
                3.3390260231116144,
                89.07942567455602
            ]
        ]
    },
    {
        name: "Wallis and Futuna",
        bounds: [
            [
                -13.07261808608667,
                -175.68691411562114
            ],
            [
                -13.516842878183212,
                -176.5271581869743
            ]
        ]
    },
    {
        name: "Western Sahara",
        bounds: [
            [
                29.075386625344628,
                0.5714954371082027
            ],
            [
                17.83238679653074,
                -22.038367844141803
            ]
        ]
    },
    {
        name: "Yemen",
        bounds: [
            [
                24.728909753516533,
                70.47096588838323
            ],
            [
                4.871604726970614,
                32.4458599232238
            ]
        ]
    },
    {
        name: "Zambia",
        bounds: [
            [
                -5.318333712607944,
                47.95919362547366
            ],
            [
                -22.125072070229944,
                15.984018329728457
            ]
        ]
    },
    {
        name: "Zimbabwe",
        bounds: [
            [
                -12.224030580066533,
                46.365155388832356
            ],
            [
                -25.98501171479055,
                19.477345105531054
            ]
        ]
    }
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jEXSO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PlayMap", ()=>PlayMap);
var _uaJs = require("./localization/ua.js");
var _configJs = require("./config.js");
var _modelJs = require("./model.js");
class PlayMap {
    map;
    mapId;
    gameConfiguration;
    game;
    playerOne;
    playerTwo;
    countriesNumber;
    countryBoundariesAndMarkersLayer;
    constructor(mapId, gameConfiguration, playerOneSelectedCountriesContainerId, playerOneSelectedCountriesNumber, playerTwoSelectedCountriesContainerId, playerTwoSelectedCountriesNumber, playerMapLabel, latLon, defaultZoomLevel = 2.4){
        this.countryBoundariesAndMarkersLayer = {
            boundaries: {},
            markers: {}
        };
        this.mapId = mapId;
        this.gameConfiguration = gameConfiguration;
        if (this.gameConfiguration.onlyIndependentCountries) this.countriesNumber = _modelJs.worldCountries.countries.filter((country)=>country.independent).length;
        else this.countriesNumber = _modelJs.worldCountries.countries.length;
        this.createMap(mapId, playerOneSelectedCountriesContainerId, playerOneSelectedCountriesNumber, playerTwoSelectedCountriesContainerId, playerTwoSelectedCountriesNumber, playerMapLabel, latLon, defaultZoomLevel);
    }
    createMap(mapId, playerOneSelectedCountriesContainerId, playerOneSelectedCountriesNumber, playerTwoSelectedCountriesContainerId, playerTwoSelectedCountriesNumber, playerMapLabel, latLon, defaultZoomLevel = 2.4) {
        document.getElementById(this.mapId).innerHTML = `<div
        id="map"
        style="
          background-color: #99d9f2;
          width: 100vw;
          height: 100vh;
          position: fixed;
        "
      ></div>`;
        function centerMap(e) {
            this.map.panTo(e.latlng);
        }
        function zoomIn() {
            this.map.zoomIn();
        }
        function zoomOut() {
            this.map.zoomOut();
        }
        function reset() {
            this.map.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
                animate: false
            });
        }
        function gameRules() {
            this.gameRulesFunction();
        }
        const streetLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}");
        const natGeoWorldMap = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}");
        const openStreetMap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png");
        const worldTopoMap = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}");
        const physicalMap = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}");
        const siteliteLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}");
        const baseMaps = {
            WorldStreetMap: streetLayer,
            NatGeoWorldMap: natGeoWorldMap,
            OpenStreetMap: openStreetMap,
            WorldTopoMap: worldTopoMap,
            PhysicalMap: physicalMap,
            Satellite: siteliteLayer
        };
        this.map = L.map("map", {
            attributionControl: false,
            contextmenu: true,
            layers: [
                streetLayer
            ],
            contextmenuItems: [
                {
                    text: "\uD83D\uDCCD " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Center Map Here"],
                    callback: centerMap,
                    context: this
                },
                "-",
                {
                    text: "\u2795 " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Zoom In"],
                    callback: zoomIn,
                    context: this
                },
                {
                    text: "\u2796 " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Zoom Out"],
                    callback: zoomOut,
                    context: this
                },
                {
                    text: "\uD83D\uDD0D " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Reset"],
                    callback: reset,
                    context: this
                },
                "-",
                {
                    text: "\uD83D\uDCDD " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Rules"],
                    callback: gameRules,
                    context: this
                }
            ],
            minZoom: defaultZoomLevel,
            zoomSnap: 0.25,
            worldCopyJump: true,
            zoomAnimation: true,
            zoomAnimationThreshold: 2,
            fullscreenControl: true,
            fullscreenControlOptions: {
                position: "topleft",
                title: "Full Screen",
                titleCancel: "Exit Fullscreen Mode",
                forceSeparateButton: false,
                forcePseudoFullscreen: false,
                addFullScreen: true,
                zoomResetFunction: reset.bind(this)
            },
            maxBounds: [
                [
                    85.1217211716937,
                    270.48437500000003
                ],
                [
                    -86.37146534864254,
                    -250.27343750000003
                ]
            ]
        }).fitWorld().setView(latLon, defaultZoomLevel);
        L.control.layers(baseMaps).setPosition("topleft").addTo(this.map);
        L.Control.playerOneScoreField = L.Control.extend({
            onAdd: function(map) {
                const playerOneScoreField = L.DomUtil.create("div");
                playerOneScoreField.id = "player-one-score-field";
                playerOneScoreField.style.backgroundColor = "white";
                playerOneScoreField.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                playerOneScoreField.style.paddingRight = "3px";
                playerOneScoreField.style.width = "50px";
                playerOneScoreField.classList.add("text-center");
                playerOneScoreField.style.paddingLeft = "3px";
                playerOneScoreField.style.paddingTop = "2px";
                playerOneScoreField.style.paddingBottom = "2px";
                playerOneScoreField.style.fontSize = "0.7rem";
                playerOneScoreField.style.opacity = "0.7";
                playerOneScoreField.style.borderRadius = "2px";
                playerOneScoreField.style.fontWeight = "bolder";
                playerOneScoreField.style.marginTop = "5px";
                playerOneScoreField.style.color = "green";
                playerOneScoreField.textContent = "\uD83C\uDFC5 0";
                playerOneScoreField.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Score"];
                return playerOneScoreField;
            },
            onRemove: function(map) {}
        });
        L.control.playeronescorefield = function(opts) {
            return new L.Control.playerOneScoreField(opts);
        };
        L.control.playeronescorefield({
            position: "topleft"
        }).addTo(this.map);
        L.Control.PlayerOneCountriesField = L.Control.extend({
            gameConfiguration: this.gameConfiguration,
            cleanFunction: this.cleanSelection.bind(this),
            undoFunction: this.undoLastSelection.bind(this),
            randomFunction: this.reandomCountriesSelection.bind(this),
            onAdd: function(map) {
                const container = L.DomUtil.create("div");
                container.id = playerOneSelectedCountriesContainerId;
                container.classList.add("text-center");
                container.style.width = "50px";
                container.style.backgroundColor = "white";
                container.style.opacity = "0.7";
                container.style.borderRadius = "2px";
                container.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                const userIconContainer = L.DomUtil.create("span");
                userIconContainer.textContent = "\uD83E\uDDD1";
                const userCountriesNumber = L.DomUtil.create("span");
                userCountriesNumber.style.marginLeft = "5px";
                userCountriesNumber.id = playerOneSelectedCountriesNumber;
                userCountriesNumber.style.fontWeight = "bolder";
                userCountriesNumber.style.color = "darkblue";
                userCountriesNumber.textContent = "0";
                container.appendChild(userIconContainer);
                container.appendChild(userCountriesNumber);
                const random = L.DomUtil.create("div");
                random.style.height = "23px";
                random.style.display = "flex";
                random.style.justifyContent = "center";
                random.style.alignItems = "center";
                random.style.cursor = "pointer";
                random.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Random Countries Selection"];
                random.id = "random-user-countries-selection";
                random.style.borderTop = "1px dotted black";
                random.textContent = "\uD83C\uDFB2";
                random.addEventListener("click", this.randomFunction);
                const undo = L.DomUtil.create("div");
                undo.style.height = "23px";
                undo.style.display = "flex";
                undo.style.justifyContent = "center";
                undo.style.alignItems = "center";
                undo.style.cursor = "pointer";
                undo.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Undo Last Country Alliance Selection"];
                undo.id = "undo-user-countries-selection";
                undo.style.borderTop = "1px dotted black";
                undo.textContent = "\u21A9\uFE0F";
                undo.style.display = "none";
                undo.addEventListener("click", this.undoFunction);
                const clean = L.DomUtil.create("div");
                clean.style.height = "23px";
                clean.style.display = "flex";
                clean.style.justifyContent = "center";
                clean.style.alignItems = "center";
                clean.style.cursor = "pointer";
                clean.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Clean"];
                clean.id = "clean-user-countries-selection";
                clean.style.borderTop = "1px dotted black";
                clean.textContent = "\uD83D\uDDD1\uFE0F";
                clean.addEventListener("click", this.cleanFunction);
                container.insertAdjacentHTML("beforeend", this.gameConfiguration.countriesUnionsHtml);
                container.appendChild(random);
                container.appendChild(undo);
                container.appendChild(clean);
                return container;
            },
            onRemove: function(map) {}
        });
        L.control.playerOneCountriesField = function(opts) {
            return new L.Control.PlayerOneCountriesField(opts);
        };
        L.control.playerOneCountriesField({
            position: "topleft"
        }).addTo(this.map);
        L.Control.MessageField = L.Control.extend({
            onAdd: function(map) {
                const messageField = L.DomUtil.create("div");
                messageField.id = "countries-battle-game-message";
                messageField.classList.add("text-center");
                messageField.style.backgroundColor = "white";
                messageField.style.border = "rgba(0, 0, 0, 0.2) 0px solid";
                messageField.style.opacity = "0.9";
                messageField.style.fontWeight = "bolder";
                messageField.style.fontSize = "0.85rem";
                messageField.style.padding = "3px";
                messageField.style.width = "100%";
                messageField.style.marginTop = "0px";
                messageField.style.overflow = "auto";
                messageField.style.fontFamily = "Cambria, Cochin, Georgia, Times,Times New Roman, serif";
                messageField.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                messageField.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose one alliance from four countries"];
                return messageField;
            },
            onRemove: function(map) {}
        });
        L.control.messagefield = function(opts) {
            return new L.Control.MessageField(opts);
        };
        L.control.messagefield({
            position: "topcenter"
        }).addTo(this.map);
        if (this.gameConfiguration.gameMode === "user") {
            L.Control.OpponentConnectionField = L.Control.extend({
                onAdd: function(map) {
                    const opponentConnectionField = L.DomUtil.create("div");
                    opponentConnectionField.id = "opponent-connection-field";
                    opponentConnectionField.style.backgroundColor = "white";
                    opponentConnectionField.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                    opponentConnectionField.style.paddingRight = "3px";
                    opponentConnectionField.style.paddingLeft = "3px";
                    opponentConnectionField.style.fontSize = "0.5rem";
                    opponentConnectionField.style.opacity = "0.7";
                    opponentConnectionField.style.borderRadius = "2px";
                    opponentConnectionField.style.fontWeight = "bolder";
                    opponentConnectionField.style.marginTop = "10px";
                    const opponentConnectionIndicator = L.DomUtil.create("span");
                    opponentConnectionIndicator.id = "opponent-connection-indicator";
                    opponentConnectionIndicator.style.borderRadius = "50%";
                    opponentConnectionIndicator.style.border = "1px solid grey";
                    opponentConnectionIndicator.style.marginRight = "3px";
                    opponentConnectionIndicator.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                    opponentConnectionIndicator.style.width = "7px";
                    opponentConnectionIndicator.style.height = "7px";
                    opponentConnectionIndicator.style.verticalAlign = "middle";
                    opponentConnectionIndicator.style.display = "inline-block";
                    opponentConnectionIndicator.style.backgroundColor = "red";
                    const opponentConnectionText = L.DomUtil.create("span");
                    opponentConnectionText.id = "opponent-connection-text";
                    opponentConnectionText.style.color = "red";
                    opponentConnectionText.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent is not online"];
                    opponentConnectionField.appendChild(opponentConnectionIndicator);
                    opponentConnectionField.appendChild(opponentConnectionText);
                    return opponentConnectionField;
                },
                onRemove: function(map) {}
            });
            L.control.opponentconnectionfield = function(opts) {
                return new L.Control.OpponentConnectionField(opts);
            };
            L.control.opponentconnectionfield({
                position: "topcenter"
            }).addTo(this.map);
            L.Control.Chat = L.Control.extend({
                chatButtonFunction: this.chatButtonHandler.bind(this),
                chatMessage: this.sendChatMessage.bind(this),
                onAdd: function(map) {
                    const chat = L.DomUtil.create("div");
                    chat.id = "chat";
                    chat.style.width = "100%";
                    chat.style.marginBottom = "0px";
                    chat.classList.add("text-center");
                    const chatButton = L.DomUtil.create("div");
                    chatButton.id = "chat-button";
                    chatButton.style.backgroundColor = "white";
                    chatButton.style.color = "darkblue";
                    chatButton.style.cursor = "pointer";
                    chatButton.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                    chatButton.style.fontSize = "0.75rem";
                    chatButton.style.opacity = "0.7";
                    chatButton.style.width = "25%";
                    chatButton.style.fontWeight = "bolder";
                    chatButton.style.marginBottom = "0px";
                    chatButton.style.display = "inline-block";
                    chatButton.style.borderTopLeftRadius = "5px";
                    chatButton.style.borderTopRightRadius = "5px";
                    chatButton.classList.add("text-center");
                    const chatButtonLeftArrow = L.DomUtil.create("span");
                    chatButtonLeftArrow.id = "chat-button-left-arrow";
                    chatButtonLeftArrow.textContent = "\u2B06";
                    chatButtonLeftArrow.style.marginRight = "10px";
                    const chatButtonText = L.DomUtil.create("span");
                    chatButtonText.id = "chat-button-text";
                    chatButtonText.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["CHAT"];
                    const chatButtonRightArrow = L.DomUtil.create("span");
                    chatButtonRightArrow.id = "chat-button-right-arrow";
                    chatButtonRightArrow.textContent = "\u2B06";
                    chatButtonRightArrow.style.marginLeft = "10px";
                    const chatContainer = L.DomUtil.create("div");
                    chatContainer.id = "chat-container";
                    chatContainer.classList.add("not-displayed");
                    chatContainer.style.backgroundColor = "white";
                    chatContainer.style.color = "darkblue";
                    chatContainer.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                    chatContainer.style.fontSize = "0.7rem";
                    chatContainer.style.opacity = "0.7";
                    chatContainer.style.width = "100%";
                    chatContainer.style.fontWeight = "bolder";
                    chatContainer.style.marginBottom = "0px";
                    const chatMessageFromOpponent = L.DomUtil.create("input");
                    chatMessageFromOpponent.id = "chat-message-from-opponent";
                    chatMessageFromOpponent.readOnly = true;
                    chatMessageFromOpponent.placeholder = "\uD83E\uDDD3 " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Message From Opponent"];
                    chatMessageFromOpponent.ariaReadonly = true;
                    chatMessageFromOpponent.style.width = "100%";
                    chatMessageFromOpponent.style.border = "0px";
                    chatMessageFromOpponent.style.borderTop = "1px dotted black";
                    chatMessageFromOpponent.style.overflowX = "hidden";
                    const chatMessageToOpponentContainer = L.DomUtil.create("div");
                    chatMessageToOpponentContainer.style.display = "flex";
                    const chatMessageToOpponent = L.DomUtil.create("input");
                    chatMessageToOpponent.id = "chat-message-to-opponent";
                    chatMessageToOpponent.type = "text";
                    chatMessageToOpponent.placeholder = "\u2709\uFE0F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Type Your Message Here... (max. length 300 characters)"];
                    chatMessageToOpponent.style.width = "90%";
                    chatMessageToOpponent.style.border = "0px";
                    chatMessageToOpponent.style.borderTop = "1px solid black";
                    chatMessageToOpponent.style.borderRight = "1px solid black";
                    chatMessageToOpponent.maxLength = 300;
                    chatMessageToOpponent.style.overflowX = "hidden";
                    const chatMessageToOpponentButton = L.DomUtil.create("input");
                    chatMessageToOpponentButton.type = "button";
                    chatMessageToOpponentButton.id = "chat-message-to-opponent-button";
                    chatMessageToOpponentButton.value = `\u{1F4E9}`;
                    chatMessageToOpponentButton.style.width = "10%";
                    chatMessageToOpponentButton.style.backgroundColor = "white";
                    chatMessageToOpponentButton.style.border = "0px";
                    chatMessageToOpponentButton.style.borderTop = "1px solid black";
                    chatMessageToOpponentButton.style.boxShadow = "rgba(0, 0, 0, 0.5) 0px 1px 5px, rgba(0, 0, 0, 0.12) 0px 1px 5px inset";
                    chatMessageToOpponentButton.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Send Message"];
                    chatMessageToOpponentButton.addEventListener("click", this.chatMessage);
                    chatMessageToOpponentButton.addEventListener("mouseover", ()=>{
                        chatMessageToOpponentButton.style.backgroundColor = "#25cff2";
                    });
                    chatMessageToOpponentButton.addEventListener("mouseout", ()=>{
                        chatMessageToOpponentButton.style.backgroundColor = "white";
                    });
                    chatMessageToOpponent.addEventListener("keydown", (e)=>{
                        if (e.key === "Enter") {
                            e.preventDefault();
                            this.chatMessage();
                        }
                    });
                    chatMessageToOpponentContainer.appendChild(chatMessageToOpponent);
                    chatMessageToOpponentContainer.appendChild(chatMessageToOpponentButton);
                    chat.appendChild(chatButton);
                    chat.appendChild(chatContainer);
                    chatContainer.appendChild(chatMessageFromOpponent);
                    chatContainer.appendChild(chatMessageToOpponentContainer);
                    chatButton.appendChild(chatButtonLeftArrow);
                    chatButton.appendChild(chatButtonText);
                    chatButton.appendChild(chatButtonRightArrow);
                    chatButton.addEventListener("click", this.chatButtonFunction);
                    return chat;
                },
                onRemove: function(map) {}
            });
            L.control.chat = function(opts) {
                return new L.Control.Chat(opts);
            };
            L.control.chat({
                position: "bottomcenter"
            }).addTo(this.map);
        }
        L.Control.MapField = L.Control.extend({
            onAdd: function(map) {
                const container = L.DomUtil.create("div");
                container.style.marginTop = "15px";
                container.style.opacity = "0.7";
                container.style.borderRadius = "2px";
                container.style.backgroundColor = "white";
                const timerFieldContainer = L.DomUtil.create("div");
                timerFieldContainer.id = "timer-field-container";
                timerFieldContainer.style.display = "inline-block";
                timerFieldContainer.style.borderLeft = "1px dotted grey";
                timerFieldContainer.style.display = "none";
                const timerFieldTimer = L.DomUtil.create("span");
                timerFieldTimer.textContent = "\u23F1\uFE0F";
                const timerField = L.DomUtil.create("span");
                timerField.id = "timer-field";
                timerField.style.fontSize = "0.6rem";
                timerField.style.fontWeight = "bolder";
                timerField.style.color = "green";
                timerField.textContent = "60";
                timerField.style.verticalAlign = "middle";
                timerField.style.paddingRight = "2px";
                timerFieldContainer.appendChild(timerFieldTimer);
                timerFieldContainer.appendChild(timerField);
                const mapFiled = L.DomUtil.create("div");
                mapFiled.id = "map-field";
                mapFiled.style.display = "inline-block";
                container.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                mapFiled.style.paddingRight = "2px";
                mapFiled.style.paddingLeft = "2px";
                mapFiled.style.fontSize = "0.6rem";
                mapFiled.style.fontWeight = "bolder";
                mapFiled.style.color = "darkblue";
                mapFiled.textContent = "\uD83D\uDDFA\uFE0F " + (0, _uaJs.localization)[_modelJs.worldCountries.language][playerMapLabel];
                container.appendChild(mapFiled);
                container.appendChild(timerFieldContainer);
                return container;
            },
            onRemove: function(map) {}
        });
        L.control.mapfield = function(opts) {
            return new L.Control.MapField(opts);
        };
        L.control.mapfield({
            position: "topcenter"
        }).addTo(this.map);
        L.Control.SelectedCountryField = L.Control.extend({
            onAdd: function(map) {
                const selectedCountryField = L.DomUtil.create("div");
                selectedCountryField.id = "selected-country-field";
                selectedCountryField.style.backgroundColor = "white";
                selectedCountryField.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                selectedCountryField.style.paddingRight = "3px";
                selectedCountryField.style.paddingLeft = "3px";
                selectedCountryField.style.paddingTop = "2px";
                selectedCountryField.style.paddingBottom = "2px";
                selectedCountryField.style.fontSize = "0.5rem";
                selectedCountryField.style.opacity = "0.7";
                selectedCountryField.style.borderRadius = "2px";
                selectedCountryField.style.fontWeight = "bolder";
                selectedCountryField.style.marginTop = "10px";
                selectedCountryField.style.color = "darkblue";
                selectedCountryField.innerHTML = "";
                return selectedCountryField;
            },
            onRemove: function(map) {}
        });
        L.control.selectedcountryfield = function(opts) {
            return new L.Control.SelectedCountryField(opts);
        };
        L.control.selectedcountryfield({
            position: "topcenter"
        }).addTo(this.map);
        L.Control.CountriesField = L.Control.extend({
            onAdd: function(map) {
                const countriesField = L.DomUtil.create("div");
                countriesField.id = "countries-field";
                countriesField.style.backgroundColor = "white";
                countriesField.style.color = "darkblue";
                countriesField.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                countriesField.style.paddingRight = "3px";
                countriesField.style.paddingLeft = "3px";
                countriesField.style.opacity = "0.7";
                countriesField.style.borderRadius = "2px";
                countriesField.style.fontWeight = "bolder";
                countriesField.style.fontSize = "0.5rem";
                countriesField.style.marginTop = "50px";
                countriesField.textContent = "\uD83C\uDF0D " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Available Countries:"] + " ";
                const countriesNumberField = L.DomUtil.create("span");
                countriesNumberField.id = "countries-number-field";
                countriesField.appendChild(countriesNumberField);
                return countriesField;
            },
            onRemove: function(map) {}
        });
        L.control.countriesfield = function(opts) {
            return new L.Control.CountriesField(opts);
        };
        L.control.countriesfield({
            position: "topright"
        }).addTo(this.map);
        L.Control.PlayButton = L.Control.extend({
            playFunction: this.playGameHandler.bind(this),
            onAdd: function(map) {
                const playButton = L.DomUtil.create("button");
                playButton.classList.add("btn");
                playButton.classList.add("btn-sm");
                playButton.classList.add("btn-danger");
                playButton.classList.add("guess-country-game-play");
                playButton.classList.add("rounded-pill");
                playButton.style.marginTop = "12px";
                playButton.style.marginBottom = "6px";
                playButton.style.paddinTop = "0.35rem";
                playButton.style.paddinBottom = "0.35rem";
                playButton.style.fontSize = "0.75rem";
                playButton.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                playButton.disabled = true;
                playButton.textContent = "\uD83D\uDD79\uFE0F " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Play"];
                playButton.addEventListener("click", this.playFunction);
                return playButton;
            },
            onRemove: function(map) {}
        });
        L.control.playbutton = function(opts) {
            return new L.Control.PlayButton(opts);
        };
        L.control.playbutton({
            position: "topright"
        }).addTo(this.map);
        L.Control.FinishButton = L.Control.extend({
            finishFunction: this.finishGameHandler.bind(this, true, false),
            onAdd: function(map) {
                const finishButton = L.DomUtil.create("button");
                finishButton.classList.add("btn");
                finishButton.classList.add("btn-sm");
                finishButton.classList.add("btn-primary");
                finishButton.classList.add("guess-country-game-finish");
                finishButton.classList.add("rounded-pill");
                finishButton.style.marginTop = "8px";
                finishButton.style.fontSize = "0.75rem";
                finishButton.style.marginBottom = "7px";
                finishButton.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                finishButton.style.paddinTop = "0.35rem";
                finishButton.style.paddinBottom = "0.35rem";
                finishButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Finish"];
                finishButton.addEventListener("click", this.finishFunction);
                return finishButton;
            },
            onRemove: function(map) {}
        });
        L.control.finishbutton = function(opts) {
            return new L.Control.FinishButton(opts);
        };
        L.control.finishbutton({
            position: "topright"
        }).addTo(this.map);
        L.Control.GameRulesButton = L.Control.extend({
            gameRulesFunction: this.gameRulesFunction.bind(this),
            onAdd: function(map) {
                const gameRulesButton = L.DomUtil.create("button");
                gameRulesButton.classList.add("btn");
                gameRulesButton.classList.add("btn-sm");
                gameRulesButton.classList.add("btn-secondary");
                gameRulesButton.classList.add("guess-country-game-rules");
                gameRulesButton.classList.add("rounded-pill");
                gameRulesButton.style.marginTop = "9px";
                gameRulesButton.style.fontSize = "0.75rem";
                gameRulesButton.style.marginBottom = "7px";
                gameRulesButton.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                gameRulesButton.style.paddinTop = "0.35rem";
                gameRulesButton.style.paddinBottom = "0.35rem";
                gameRulesButton.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Rules"];
                gameRulesButton.addEventListener("click", this.gameRulesFunction);
                return gameRulesButton;
            },
            onRemove: function(map) {}
        });
        L.control.gamerulesbutton = function(opts) {
            return new L.Control.GameRulesButton(opts);
        };
        L.control.gamerulesbutton({
            position: "topright"
        }).addTo(this.map);
        L.Control.AvailableCountriesPanel = L.Control.extend({
            onAdd: function(map) {
                const availableCountriesPanel = L.DomUtil.create("div");
                availableCountriesPanel.id = "available-countries-panel";
                availableCountriesPanel.classList.add("not-displayed");
                availableCountriesPanel.style.backgroundColor = "white";
                availableCountriesPanel.style.opacity = "0.7";
                availableCountriesPanel.style.borderRadius = "2px";
                availableCountriesPanel.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                availableCountriesPanel.style.marginTop = "5px";
                availableCountriesPanel.style.padding = "3px";
                availableCountriesPanel.style.width = "fit-content";
                availableCountriesPanel.style.overflow = "hidden";
                availableCountriesPanel.style.marginTop = "10px";
                const availableCountriesHeader = `<div class="text-center"><span style="font-size:0.7rem; font-weight:bold;">\u{1F30D} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Available Countries:"]}</span></div>`;
                availableCountriesPanel.insertAdjacentHTML("beforeend", availableCountriesHeader);
                const availableCountriesPanelContent = L.DomUtil.create("div");
                availableCountriesPanelContent.id = "available-countries-panel-content";
                availableCountriesPanel.appendChild(availableCountriesPanelContent);
                return availableCountriesPanel;
            },
            onRemove: function(map) {}
        });
        L.control.availablecountriespanel = function(opts) {
            return new L.Control.AvailableCountriesPanel(opts);
        };
        L.control.availablecountriespanel({
            position: "topcenter"
        }).addTo(this.map);
        L.Control.HintsPanel = L.Control.extend({
            onAdd: function(map) {
                const hintsPanel = L.DomUtil.create("div");
                hintsPanel.id = "hints-panel";
                hintsPanel.classList.add("not-displayed");
                hintsPanel.style.backgroundColor = "white";
                hintsPanel.style.opacity = "0.7";
                hintsPanel.style.width = "fit-content";
                hintsPanel.style.maxWidth = "220px";
                hintsPanel.style.minWidth = "100px";
                hintsPanel.style.borderRadius = "2px";
                hintsPanel.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                hintsPanel.style.marginTop = "10px";
                hintsPanel.style.padding = "3px";
                hintsPanel.style.overflow = "hidden";
                hintsPanel.style.fontSize = "0.7rem;";
                const hintsPanelsHeader = `<div class="text-center" style="border-bottom:1px dashed black; margin-bottom:2px;"><span style="font-size:0.75rem;font-weight:bold;">\u{1F4A1} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Hints:"]}</span></div>`;
                hintsPanel.insertAdjacentHTML("beforeend", hintsPanelsHeader);
                const hintsPanelContent = L.DomUtil.create("div");
                hintsPanelContent.id = "hints-panel-content";
                hintsPanel.appendChild(hintsPanelContent);
                return hintsPanel;
            },
            onRemove: function(map) {}
        });
        L.control.hintspanel = function(opts) {
            return new L.Control.HintsPanel(opts);
        };
        L.control.hintspanel({
            position: "topcenter"
        }).addTo(this.map);
        L.Control.GuessedCountryAlliancePanel = L.Control.extend({
            onAdd: function(map) {
                const guessedCountryAlliancePanel = L.DomUtil.create("div");
                guessedCountryAlliancePanel.id = "guessed-country-alliance-panel";
                guessedCountryAlliancePanel.classList.add("not-displayed");
                guessedCountryAlliancePanel.style.backgroundColor = "white";
                guessedCountryAlliancePanel.style.opacity = "0.9";
                guessedCountryAlliancePanel.style.width = "fit-content";
                guessedCountryAlliancePanel.style.borderRadius = "2px";
                guessedCountryAlliancePanel.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                guessedCountryAlliancePanel.style.marginTop = "10px";
                guessedCountryAlliancePanel.style.padding = "5px";
                guessedCountryAlliancePanel.style.overflow = "hidden";
                guessedCountryAlliancePanel.style.fontSize = "0.7rem;";
                const guessedCountryAlliancePanelHeader = `<div id="guessed-country-alliance-header" class="text-center"><span style="font-size:0.75rem;font-weight:bold;color:green;">\u{1F44F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Congratulations!"]}</span></div>`;
                guessedCountryAlliancePanel.insertAdjacentHTML("beforeend", guessedCountryAlliancePanelHeader);
                const guessedCountryAlliancePanelContent = L.DomUtil.create("div");
                guessedCountryAlliancePanelContent.classList.add("text-center");
                guessedCountryAlliancePanelContent.id = "guessed-country-alliance-panel-content";
                guessedCountryAlliancePanel.appendChild(guessedCountryAlliancePanelContent);
                return guessedCountryAlliancePanel;
            },
            onRemove: function(map) {}
        });
        L.control.guessedcountryalliancepanel = function(opts) {
            return new L.Control.GuessedCountryAlliancePanel(opts);
        };
        L.control.guessedcountryalliancepanel({
            position: "topcenter"
        }).addTo(this.map);
        L.Control.playerTwoScoreField = L.Control.extend({
            onAdd: function(map) {
                const playerTwoScoreField = L.DomUtil.create("div");
                playerTwoScoreField.id = "player-two-score-field";
                playerTwoScoreField.style.backgroundColor = "white";
                playerTwoScoreField.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                playerTwoScoreField.style.paddingRight = "3px";
                playerTwoScoreField.style.width = "50px";
                playerTwoScoreField.classList.add("text-center");
                playerTwoScoreField.style.paddingLeft = "3px";
                playerTwoScoreField.style.paddingTop = "2px";
                playerTwoScoreField.style.paddingBottom = "2px";
                playerTwoScoreField.style.fontSize = "0.7rem";
                playerTwoScoreField.style.opacity = "0.7";
                playerTwoScoreField.style.borderRadius = "2px";
                playerTwoScoreField.style.fontWeight = "bolder";
                playerTwoScoreField.style.marginTop = "11px";
                playerTwoScoreField.style.color = "green";
                playerTwoScoreField.textContent = "\uD83C\uDFC5 0";
                playerTwoScoreField.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Score"];
                return playerTwoScoreField;
            },
            onRemove: function(map) {}
        });
        L.control.playertwoscorefield = function(opts) {
            return new L.Control.playerTwoScoreField(opts);
        };
        L.control.playertwoscorefield({
            position: "topright"
        }).addTo(this.map);
        L.Control.PlayerTwoCountriesField = L.Control.extend({
            gameConfiguration: this.gameConfiguration,
            onAdd: function(map) {
                const container = L.DomUtil.create("div");
                container.id = playerTwoSelectedCountriesContainerId;
                container.classList.add("text-center");
                container.style.width = "50px";
                container.style.marginTop = "5px";
                container.style.backgroundColor = "white";
                container.style.opacity = "0.7";
                container.style.borderRadius = "2px";
                container.style.boxShadow = "0 2px 5px #00000080, inset 0 2px 10px #0000001f";
                const userIconContainer = L.DomUtil.create("span");
                if (this.gameConfiguration.gameMode === "computer") userIconContainer.textContent = "\uD83E\uDD16";
                else userIconContainer.textContent = "\uD83D\uDC68\uD83C\uDFFB\u200D\uD83E\uDDB0";
                const userCountriesNumber = L.DomUtil.create("span");
                userCountriesNumber.style.marginLeft = "5px";
                userCountriesNumber.id = playerTwoSelectedCountriesNumber;
                userCountriesNumber.style.fontWeight = "bolder";
                userCountriesNumber.style.color = "darkblue";
                userCountriesNumber.textContent = "0";
                container.appendChild(userIconContainer);
                container.appendChild(userCountriesNumber);
                container.insertAdjacentHTML("beforeend", this.gameConfiguration.countriesUnionsHtml);
                return container;
            },
            onRemove: function(map) {}
        });
        L.control.playerTwoCountriesField = function(opts) {
            return new L.Control.PlayerTwoCountriesField(opts);
        };
        L.control.playerTwoCountriesField({
            position: "topright"
        }).addTo(this.map);
        this.map.fitBounds((0, _configJs.WORLD_MAP_BOUNDS), {
            animate: false
        });
    }
    setGame(gameInstanse) {
        this.game = gameInstanse;
    }
    setPlayerOne(playerOneInstance) {
        this.playerOne = playerOneInstance;
    }
    setPlayerTwo(playerTwoInstance) {
        this.playerTwo = playerTwoInstance;
    }
    cleanMap() {
        this.map.eachLayer((function(layer) {
            if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.GeoJSON || layer instanceof L.LayerGroup || layer instanceof L.FeatureGroup) this.map.removeLayer(layer);
        }).bind(this));
    }
    destroyMap() {
        if (this.map) {
            this.map.off();
            this.map.remove();
        }
        const mapElement = document.getElementById(this.mapId);
        if (mapElement) mapElement.innerHTML = `<div
        id="map"
        style="
          background-color: #99d9f2;
          width: 100vw;
          height: 100vh;
          position: fixed;
        "
      ></div>`;
        this.map = null;
        this.mapId = null;
        this.gameConfiguration = null;
        this.game = null;
        this.playerOne = null;
        this.playerTwo = null;
        this.countriesNumber = null;
        this.countryBoundariesAndMarkersLayer = null;
    }
    cleanSelection() {
        this.playerOne.cleanSelection();
        const randomSection = document.getElementById("random-user-countries-selection");
        randomSection.style.display = "flex";
    }
    undoLastSelection() {
        this.playerOne.undoCountryUnionSelection();
    }
    reandomCountriesSelection() {
        this.playerOne.randomCountrySelection();
        const randomSection = document.getElementById("random-user-countries-selection");
        randomSection.style.display = "none";
        const cleanSection = document.getElementById("clean-user-countries-selection");
        cleanSection.style.display = "flex";
        if (window.gtag) gtag("event", "game_random_countries_selection");
    }
    exitFullScreen() {
        if (this.map && this.map._isFullscreen) return this.map.fullscreenControl._screenfull.exit().then(()=>this.map.invalidateSize()).catch(()=>{});
        return Promise.resolve();
    }
    gameRulesFunction() {
        if (this.game && this.game.started) {
            const gameRulesModal = document.getElementById("gameRulesModal");
            gameRulesModal.addEventListener("shown.bs.modal", this.clearPlayerTimeout.bind(this), {
                once: true
            });
            gameRulesModal.addEventListener("hidden.bs.modal", this.setPlayerTimeout.bind(this), {
                once: true
            });
        }
        this.game.showGameRules();
    }
    setPlayerTimeout() {
        const timerField = document.getElementById("timer-field");
        if (timerField) this.playerOne.setHitTimeout(+timerField.textContent);
    }
    clearPlayerTimeout() {
        if (this.playerOne.hitTimeoutIds && this.playerOne.hitTimeoutIds.length != 0) this.playerOne.clearAllTimeouts(this.playerOne);
        if (this.playerOne.hitIntervalIds && this.playerOne.hitIntervalIds.length != 0) this.playerOne.clearAllIntervals(this.playerOne);
    }
    sendChatMessage() {
        const messageInput = document.getElementById("chat-message-to-opponent");
        let sent = false;
        if (messageInput && messageInput.value !== "") sent = this.game.sendChatMessage(messageInput.value);
        if (!sent && messageInput.value !== "") document.getElementById("chat-message-from-opponent").value = "\uD83E\uDDD3: " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Opponent has not yet entered the game room to read your messages. Try sending a message later"];
        messageInput.value = "";
        messageInput.focus();
    }
    chatButtonHandler() {
        const chat = document.getElementById("chat-container");
        const inputField = document.getElementById("chat-message-to-opponent");
        const chatButtonLeftArrow = document.getElementById("chat-button-left-arrow");
        if (chatButtonLeftArrow.textContent === "\u2B06") chatButtonLeftArrow.textContent = "\u2B07";
        else chatButtonLeftArrow.textContent = "\u2B06";
        const chatButtonRightArrow = document.getElementById("chat-button-right-arrow");
        if (chatButtonRightArrow.textContent === "\u2B06") chatButtonRightArrow.textContent = "\u2B07";
        else chatButtonRightArrow.textContent = "\u2B06";
        chat.classList.toggle("not-displayed");
        inputField.focus();
    }
    finishGameHandler(useConfirm, deleteGameRoom) {
        if (useConfirm) {
            this.clearPlayerTimeout();
            const confirmExit = confirm("\u2753 " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Are you sure you want to leave this game?"]);
            if (confirmExit) this.game.finishGame(deleteGameRoom);
            else if (this.game && this.game.started) this.setPlayerTimeout();
        } else this.game.finishGame(deleteGameRoom);
    }
    setSelectedCountryFiledHtml(content) {
        const selectedCountryField = document.getElementById("selected-country-field");
        selectedCountryField.innerHTML = "";
        selectedCountryField.innerHTML = content;
    }
    setMapFiledLabel(label) {
        document.getElementById("map-field").textContent = "\uD83D\uDDFA\uFE0F " + (0, _uaJs.localization)[_modelJs.worldCountries.language][label];
    }
    showMapElement(elementId) {
        document.getElementById(elementId).classList.remove("not-displayed");
    }
    hideMapElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) element.classList.add("not-displayed");
    }
    initSelectionCountriesMapView() {
        document.querySelector(".guess-country-game-play").disabled = true;
        const cleanSection = document.getElementById("clean-user-countries-selection");
        cleanSection.style.display = "none";
        const randomSection = document.getElementById("random-user-countries-selection");
        randomSection.style.display = "flex";
        const undoSelection = document.getElementById("undo-user-countries-selection");
        undoSelection.style.display = "none";
        document.getElementById("countries-number-field").textContent = this.countriesNumber;
        document.getElementById("hints-panel").classList.add("not-displayed");
        document.getElementById("selected-country-field").classList.remove("not-displayed");
        document.getElementById("available-countries-panel").classList.add("not-displayed");
    }
    initStartPlayMapView() {
        document.querySelector(".guess-country-game-play").disabled = true;
        const cleanSection = document.getElementById("clean-user-countries-selection");
        cleanSection.style.display = "none";
        const randomSection = document.getElementById("random-user-countries-selection");
        randomSection.style.display = "none";
        const undoSelection = document.getElementById("undo-user-countries-selection");
        undoSelection.style.display = "none";
        document.getElementById("countries-number-field").textContent = this.countriesNumber;
        document.getElementById("hints-panel").classList.add("not-displayed");
        document.getElementById("available-countries-panel").classList.add("not-displayed");
        document.getElementById("selected-country-field").classList.add("not-displayed");
    }
    playGameHandler() {
        this.game.startGame();
    }
}

},{"./localization/ua.js":"3eDg2","./config.js":"kBqbe","./model.js":"6YxfE","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hEmLG":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _uaJs = require("../localization/ua.js");
var _modelJs = require("../model.js");
class donateAuthorView {
    _parentElement = document.querySelector("#donate-author-page");
    _donateAuthorQRCode = document.querySelector("#donate-qr-code");
    _donateHeading = document.querySelector(".donate-link");
    _donateText = document.querySelector(".donate-text");
    _donateShareWebSite = document.querySelector(".share-donate");
    _donateQrCodeText = document.querySelector("#donate-qr-code-text");
    _donateReturnBack = document.querySelector(".return-donate");
    _returnBackListenerAdded = false;
    _shareWebSiteListenerAdded = false;
    _makeDonateListenerAdded = false;
    returnBack(mainView, aboutView, gameRulesView, gameRoomView) {
        this.hideDonateProject();
        mainView.showMain();
        aboutView.hideAboutProject();
        gameRoomView.hideGameRoomProject();
        gameRulesView.hideGameRulesProject();
        sessionStorage.setItem("currentWindow", "main");
    }
    addShareWebSiteHandlerClick() {
        if (!this._shareWebSiteListenerAdded) this._donateShareWebSite.addEventListener("click", function() {
            if (navigator.share) navigator.share({
                title: `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Alliance Guesser Game"]}`,
                text: `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["World Country Alliances Guesser Game"]} - ${document.querySelector(".about-project-description").textContent}`,
                url: "https://www.countriesguesser.com"
            }).then(function() {
                if (window.gtag) gtag("event", "share_website");
            }).catch(function() {});
        });
    }
    addReturnBackHandlerClick(mainView, aboutView, gameRulesView, gameRoomView) {
        if (!this._returnBackListenerAdded) {
            this._donateReturnBack.addEventListener("click", this.returnBack.bind(this, mainView, aboutView, gameRulesView, gameRoomView));
            this._returnBackListenerAdded = true;
        }
    }
    showDonateInfo() {
        this.showDonateProject();
    }
    showDonateProject() {
        this._parentElement.classList.remove("not-displayed");
    }
    hideDonateProject() {
        this._parentElement.classList.add("not-displayed");
    }
    translateElements() {
        this._donateReturnBack.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["BACK"]}`;
        this._donateHeading.textContent = `\u{1FA99} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Make Donate"]}`;
        this._donateShareWebSite.textContent = `\u{1F517} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Share"]}`;
        this._donateText.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["If you like this project, you can share it with your friends or support it financially (money is spent on the development of educational projects and support for Ukraine's right to exist on the world map). Thank you!"]}`;
        this._donateQrCodeText.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["QR Code"]}`;
    }
}
exports.default = new donateAuthorView();

},{"../localization/ua.js":"3eDg2","../model.js":"6YxfE","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7IcDc":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _uaJs = require("../localization/ua.js");
var _modelJs = require("../model.js");
class gameRulesView {
    _parentElement = document.querySelector("#game-rules");
    _gameRulesReturnBack = document.querySelector(".return-game-rules");
    _gameRulesHeading = document.querySelector(".game-rules-project-name");
    _gameRulesProjectDescription = document.querySelector(".game-rules-project-description");
    _gameRulesNameHeading = document.querySelector(".game-rules-name-heading");
    _gameRulesFourCountriesAllianceDescription = document.querySelector(".game-rules-four-countries-alliance-description");
    _gameRulesThreeCountriesAllianceDescription = document.querySelector(".game-rules-three-countries-alliance-description");
    _gameRulesTwoCountriesAllianceDescription = document.querySelector(".game-rules-two-countries-alliance-description");
    _gameRulesOneCountriesAllianceDescription = document.querySelector(".game-rules-one-countries-alliance-description");
    _gameRulesThreeTrapCountriesDescription = document.querySelector(".game-rules-three-trap-countries-description");
    _gameRulesTrapCountriesRules = document.querySelector(".game-rules-trap-countries-rules");
    _gameRulesImportant = document.querySelector(".game-rules-important");
    _gameRulesImportantDescription = document.querySelector(".game-rules-important-description");
    _gameRulesRandomCountriesSelectionDescription = document.querySelector(".game-rules-random-country-selection-description");
    _gameRulesUndoCountriesSelectionDescription = document.querySelector(".game-rules-undo-country-selection-description");
    _gameRulesClearCountriesSelectionDescription = document.querySelector(".game-rules-clear-country-selection-description");
    _gameRulesBonusCountriesDescription = document.querySelector(".game-rules-bonus-countries-rules");
    _gameRulesTipsCountriesDescription = document.querySelector(".game-rules-tips-countries-rules");
    _gameVideos = document.querySelector(".game-rules-videos");
    _gameRulesCountryAllianceSelectionVideoTitle = document.querySelector(".game-rules-country-alliance-selection-video-tutorial");
    _gameRulesCountryAllianceGameplayVideoTitle = document.querySelector(".game-rules-country-alliance-gameplay-video-tutorial");
    _gameRulesWithFriendHeader = document.querySelector(".game-rules-with-friend-heading");
    _gameRulesWithFriendDescription = document.querySelector(".game-rules-with-friend-description");
    _gameRulesScoreHeading = document.querySelector(".game-rules-score-heading");
    _gameRulesScoreDescription = document.querySelector(".game-rules-score-description");
    _returnToMainListenerAdded = false;
    returnToMain(mainView, donateAuthorView, aboutView, gameRoomView) {
        this.hideGameRulesProject();
        donateAuthorView.hideDonateProject();
        aboutView.hideAboutProject();
        gameRoomView.hideGameRoomProject();
        mainView.showMain();
        sessionStorage.setItem("currentWindow", "main");
    }
    addReturnToMainHandlerClick(mainView, donateAuthorView, aboutView, gameRoomView) {
        if (!this._returnToMainListenerAdded) {
            this._gameRulesReturnBack.addEventListener("click", this.returnToMain.bind(this, mainView, donateAuthorView, aboutView, gameRoomView));
            this._returnToMainListenerAdded = true;
        }
    }
    showGameRulesProjectInfo() {
        this.showGameRulesProject();
    }
    showGameRulesProject() {
        this._parentElement.classList.remove("not-displayed");
    }
    hideGameRulesProject() {
        this._parentElement.classList.add("not-displayed");
    }
    translateElements() {
        this._gameRulesReturnBack.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["BACK"]}`;
        this._gameRulesHeading.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["World Country Alliances Guesser Game"]}`;
        this._gameRulesProjectDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["geographic online strategy game that helps to study the geography of the countries of the world, neighboring countries, flags and parts of the world in a game format. Choose eight different alliances of countries on the map, as    well as four trap-countries for your opponent. The computer or your friend (depends on the selected game mode) will also choose the appropriate number of alliances of countries and trap-countries. The attempts to guess the countries take place in turn. The one who guesses the opponent's country gets an extra try. The one who guesses all the alliances of the opponent's countries first wins. Follow the messages at the top of the screen after the game starts."]}`;
        this._gameRulesRandomCountriesSelectionDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["To select alliances of countries randomly, click"]}`;
        this._gameRulesUndoCountriesSelectionDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["To clear the last selected country alliance, click"]}`;
        this._gameRulesClearCountriesSelectionDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["To clear selected country alliances, click"]}`;
        this._gameRulesNameHeading.textContent = `\u{1F4DD} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Rules"]}`;
        this._gameRulesFourCountriesAllianceDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose two alliances of countries that include four countries on the world map."]}`;
        this._gameRulesThreeCountriesAllianceDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose two alliances of countries that include three countries on the world map."]}`;
        this._gameRulesTwoCountriesAllianceDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose two alliances of countries that include two countries on the world map."]}`;
        this._gameRulesOneCountriesAllianceDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose two alliances of countries that include one country on the world map."]}`;
        this._gameRulesThreeTrapCountriesDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Choose four trap countries for the opponent on the world map."]}`;
        this._gameRulesTrapCountriesRules.textContent = `\u{26A0}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["When entering an opponent's trap country, he receives one of eight clues about the location of one of your countries: 1. Name of the country; 2. Capital of the country; 3. Region (Europe, America, Asia, Africa, Oceania) in which one of your countries is located; 4. Subregion (Central Europe, North America, etc.) in which one of your countries is located; 5. Coat Of Arms Image; 6. Flag Image; 7. Country's Outline On Map; 8. Photo From Country. You can configure to receive only text clues (country name, country capital, region, subregion) or visual clues (country coat of arms, country flag, country's outline on map, photo from country) or choose the hints yourself during the game."]}`;
        this._gameRulesImportant.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Important!"]}`;
        this._gameRulesImportantDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Countries in the same alliance of countries must be united by borders. Alliances of countries must be separated from each other by at least one country's borders. An island country can only be used as an alliance with one country or as a trap country. If the player does not make an attempt to guess the opponent's country within one minute (can be changed), the turn passes to the opponent."]}`;
        this._gameRulesBonusCountriesDescription.textContent = `\u{1F381} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["The computer will also randomly select five bonus countries (can be changed), when hit, players get an extra attempt to guess the opponent's country and 10 extra points. Some of these bonus countries have an extra nice secret surprise."]}`;
        this._gameRulesTipsCountriesDescription.textContent = `\u{1F4A1} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Tips: after guessing your opponent's country, continue guessing neighboring countries until you guess the entire alliance of countries."]}`;
        this._gameRulesWithFriendHeader.textContent = `\u{1F9D3} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Play With A Friend Mode"]}`;
        this._gameRulesWithFriendDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["To play with your friend, you need to select the game mode with a friend on the main page, create a game room and a link to the game for your friend and send it to him. Follow the connection status of your friend at the top of the screen after starting the game. There is also the possibility of communicating with your friend via chat at the bottom of the screen: you can greet him, wish him a good game or give yourself hints about your countries and alliances of countries (chat may be hidden by the bottom browser bar, so open it full screen or hide this bar)."]}`;
        this._gameRulesScoreHeading.textContent = `\u{1F3C5} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Score"]}`;
        this._gameRulesScoreDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["If a player guesses an alliance of countries that contains four countries, he gets 15 points, three countries - 25 points, two countries - 35 points, one country - 50 points. When falling into an opponent's trap country, the player loses 10 points the first time, 20 points the second time, 30 points the third time and 50 points the fourth time. At the end of the game, the player gets an additional 10 points for each alliance of countries that was not guessed by the opponent."]}`;
        this._gameVideos.textContent = `\u{1F4FC} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["VIDEOS:"]}`;
        this._gameRulesCountryAllianceSelectionVideoTitle.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Alliances Selection \u2014 Video Tutorial"]}`;
        this._gameRulesCountryAllianceGameplayVideoTitle.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Alliance Guesser Gameplay"]}`;
    }
}
exports.default = new gameRulesView();

},{"../localization/ua.js":"3eDg2","../model.js":"6YxfE","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bKoNN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _uaJs = require("../localization/ua.js");
var _modelJs = require("../model.js");
var _helpersJs = require("../helpers.js");
var _firebaseJs = require("../firebase.js");
class gameRoomView {
    _parentElement = document.querySelector("#create-game-room-page");
    _firebase;
    constructor(){
        this._firebase = new (0, _firebaseJs.Firebase)();
    }
    _gameRoomCreateButton = document.querySelector(".create-game-room");
    _gameRoomDeleteButton = document.querySelector(".delete-game-room");
    _gameRoomInputLink = document.querySelector("#roomIdInput");
    _gameLinkForFriendLabel = document.querySelector("#game-link-for-friend-label");
    _gameRoomGameConfigurationHeader = document.querySelector("#game-configuration-header-game-room");
    _gameRoomOnlyIndependentCountriesSelect = document.querySelector("#only-independent-countries-game-room-select");
    _gameRoomHintsTypeSelect = document.querySelector("#hint-types-game-room-select");
    _gameRoomHitTimeSelect = document.querySelector("#time-select-game-room");
    _gameRoomBonusCountriesSelect = document.querySelector("#bonus-countries-game-room-select");
    _gameRoomInstructionHeader = document.querySelector("#game-room-instruction-header");
    _gameRoomInstructionText = document.querySelector("#game-room-instruction-text");
    _gameRoomCopyLink = document.querySelector(".copy-to-clipboard-link");
    _gameRoomCopyToClipboardLabel = document.querySelector("#copy-to-clipboard-label");
    _gameShareLink = document.querySelector(".share-game-room");
    _gameRoomReturnBack = document.querySelector(".return-game-room");
    _gameRoomImportantHeader = document.querySelector(".game-room-important");
    _gameRoomImportantDescription = document.querySelector(".game-room-important-description");
    _startButton = document.querySelector("#start-button-game-room");
    _startButtonText = document.querySelector("#startButtonTextGameRoom");
    _returnBackListenerAdded = false;
    _startButtonListenerAdded = false;
    _gameRoomCreateListenerAdded = false;
    _gameRoomDeleteListenerAdded = false;
    _gameRoomCopyLinkListenerAdded = false;
    _gameRoomShareLinkListenerAdded = false;
    _onlyIndependentCountriesListenerAdded = false;
    _gameRoomHitTimeSelectListenerAdded = false;
    _gameRoomHintsTypeSelectListenerAdded = false;
    _gameRoomBonusCountriesListenerAdded = false;
    addHitTimeSelectListener() {
        if (!this._gameRoomHitTimeSelectListenerAdded) {
            this._gameRoomHitTimeSelect.addEventListener("change", ()=>{
                document.getElementById("time-select").value = this._gameRoomHitTimeSelect.value;
            });
            this._gameRoomHitTimeSelectListenerAdded = true;
        }
    }
    addBonusCountriesSelectListener() {
        if (!this._gameRoomBonusCountriesListenerAdded) {
            this._gameRoomBonusCountriesSelect.addEventListener("change", ()=>{
                document.getElementById("bonus-countries-select").value = this._gameRoomBonusCountriesSelect.value;
            });
            this._gameRoomBonusCountriesListenerAdded = true;
        }
    }
    addHintsTypeSelectListener() {
        if (!this._gameRoomHintsTypeSelectListenerAdded) {
            this._gameRoomHintsTypeSelect.addEventListener("change", ()=>{
                document.getElementById("hint-types-select").value = this._gameRoomHintsTypeSelect.value;
            });
            this._gameRoomHintsTypeSelectListenerAdded = true;
        }
    }
    addOnlyIndependentCountriesListener() {
        if (!this._onlyIndependentCountriesListenerAdded) {
            this._gameRoomOnlyIndependentCountriesSelect.addEventListener("change", ()=>{
                document.getElementById("only-independent-countries-select").value = this._gameRoomOnlyIndependentCountriesSelect.value;
            });
            this._onlyIndependentCountriesListenerAdded = true;
        }
    }
    returnBack(mainView, aboutView, gameRulesView, donateAuthorView) {
        this._gameRoomCopyToClipboardLabel.textContent = " ";
        this.hideGameRoomProject();
        mainView.showMain();
        donateAuthorView.hideDonateProject();
        aboutView.hideAboutProject();
        gameRulesView.hideGameRulesProject();
        sessionStorage.setItem("currentWindow", "main");
    }
    async createGameRoom() {
        const spinner = document.getElementById("gameRoomLoaderSpinner");
        spinner.classList.remove("not-displayed");
        const gameRoomId = (0, _helpersJs.generateRoomId)();
        const bonusCountriesSelect = document.getElementById("bonus-countries-select");
        const hitTimeSelect = document.getElementById("time-select");
        const onlyIndependentCountriesSelect = document.getElementById("only-independent-countries-select");
        const hintsTypeSelect = document.getElementById("hint-types-select");
        let urlHintType;
        if (hintsTypeSelect.value === "All Hints") urlHintType = "all";
        else if (hintsTypeSelect.value === "Text Hints") urlHintType = "text";
        else if (hintsTypeSelect.value === "Visual Hints") urlHintType = "visual";
        else if (hintsTypeSelect.value === "Choose Hints") urlHintType = "select";
        else if (hintsTypeSelect.value === "No Hints") urlHintType = "none";
        hitTimeSelect.disabled = true;
        hitTimeSelect.style.pointerEvents = "none";
        onlyIndependentCountriesSelect.disabled = true;
        onlyIndependentCountriesSelect.style.pointerEvents = "none";
        hintsTypeSelect.disabled = true;
        hintsTypeSelect.style.pointerEvents = "none";
        bonusCountriesSelect.disabled = true;
        bonusCountriesSelect.style.pointerEvents = "none";
        this._gameRoomOnlyIndependentCountriesSelect.disabled = true;
        this._gameRoomOnlyIndependentCountriesSelect.style.pointerEvents = "none";
        this._gameRoomHitTimeSelect.disabled = true;
        this._gameRoomHitTimeSelect.style.pointerEvents = "none";
        this._gameRoomHintsTypeSelect.disabled = true;
        this._gameRoomHintsTypeSelect.style.pointerEvents = "none";
        this._gameRoomBonusCountriesSelect.disabled = true;
        this._gameRoomBonusCountriesSelect.style.pointerEvents = "none";
        const gameUrl = window.location.origin + `?gameRoom=${gameRoomId}&allCountries=${onlyIndependentCountriesSelect.value === "Independent Countries" ? false : true}&hints=${urlHintType}&time=${hitTimeSelect.value}&bonus=${bonusCountriesSelect.value}`;
        try {
            await this._firebase.initializeApplication();
            this._firebase.getApplicationDatabase();
            await this._firebase.createConnection();
            this._firebase.setIsHost(true);
            await this._firebase.createGameRoom(gameRoomId);
            this._firebase.setGameRoomId(gameRoomId);
            this._startButton.disabled = false;
        } catch (err) {
            this._gameRoomInputLink.value = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Failed to create game room with ID:"] + ` ${gameRoomId}`;
            spinner.classList.add("not-displayed");
            return;
        }
        this._gameRoomInputLink.value = gameUrl;
        sessionStorage.setItem("game-room", gameRoomId);
        this._gameRoomCopyToClipboardLabel.textContent = " ";
        this._gameRoomCreateButton.disabled = true;
        spinner.classList.add("not-displayed");
        this._gameRoomDeleteButton.disabled = false;
        this._gameRoomCopyLink.disabled = false;
        this._gameShareLink.disabled = false;
        const createGameRoomButton = document.querySelector("#create-game-room-button");
        createGameRoomButton.dataset.text = "Open Game Room";
        createGameRoomButton.textContent = "\uD83C\uDFAE " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Open Game Room"];
        const gameRoomHeadingContainer = document.querySelector("#game-room-heading-container");
        gameRoomHeadingContainer.classList.remove("not-displayed");
        document.querySelector("#game-room-heading-id").textContent = gameRoomId;
    }
    async deleteGameRoom() {
        this._gameRoomInputLink.value = "";
        this._gameRoomCopyToClipboardLabel.textContent = " ";
        this._gameRoomCreateButton.disabled = false;
        this._gameRoomDeleteButton.disabled = true;
        this._gameRoomCopyLink.disabled = true;
        this._gameShareLink.disabled = true;
        const bonusCountriesSelect = document.getElementById("bonus-countries-select");
        const hitTimeSelect = document.getElementById("time-select");
        const onlyIndependentCountriesSelect = document.getElementById("only-independent-countries-select");
        const hintsTypeSelect = document.getElementById("hint-types-select");
        hintsTypeSelect.disabled = false;
        hintsTypeSelect.style.pointerEvents = "auto";
        hitTimeSelect.disabled = false;
        hitTimeSelect.style.pointerEvents = "auto";
        bonusCountriesSelect.disabled = false;
        bonusCountriesSelect.style.pointerEvents = "auto";
        onlyIndependentCountriesSelect.disabled = false;
        onlyIndependentCountriesSelect.style.pointerEvents = "auto";
        this._gameRoomOnlyIndependentCountriesSelect.disabled = false;
        this._gameRoomOnlyIndependentCountriesSelect.style.pointerEvents = "auto";
        this._gameRoomHitTimeSelect.disabled = false;
        this._gameRoomHitTimeSelect.style.pointerEvents = "auto";
        this._gameRoomHintsTypeSelect.disabled = false;
        this._gameRoomHintsTypeSelect.style.pointerEvents = "auto";
        this._gameRoomBonusCountriesSelect.disabled = false;
        this._gameRoomBonusCountriesSelect.style.pointerEvents = "auto";
        const gameRoomId = sessionStorage.getItem("game-room");
        if (gameRoomId) try {
            await this._firebase.initializeApplication();
            this._firebase.getApplicationDatabase();
            await this._firebase.createConnection();
            await this._firebase.deleteGameRoom(gameRoomId);
            this._firebase.sendMessage(JSON.stringify({
                type: "deleteGameRoom"
            }));
            await this._firebase.cleanupResources(true);
            this._gameRoomCopyToClipboardLabel.style.color = "red";
            this._gameRoomCopyToClipboardLabel.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Room Deleted:"] + ` ${gameRoomId}`;
        } catch (err) {
            this._gameRoomCopyToClipboardLabel.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Failed to delete game room with ID:"] + ` ${gameRoomId}`;
            this._gameRoomCopyToClipboardLabel.style.color = "red";
            return;
        }
        sessionStorage.removeItem("game-room");
        this._startButton.disabled = true;
        const createGameRoomButton = document.querySelector("#create-game-room-button");
        createGameRoomButton.textContent = "\uD83C\uDFAE " + (0, _uaJs.localization)[_modelJs.worldCountries.language]["Create Game Room"];
        const gameRoomHeadingContainer = document.querySelector("#game-room-heading-container");
        gameRoomHeadingContainer.classList.add("not-displayed");
        document.querySelector("#game-room-heading-id").textContent = "";
    }
    copyLink() {
        this.copyText(this._gameRoomInputLink.value);
    }
    async copyText(text) {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                this._gameRoomCopyToClipboardLabel.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Link Copied"];
                this._gameRoomCopyToClipboardLabel.style.color = "green";
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";
                textarea.style.left = "-9999px";
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                this._gameRoomCopyToClipboardLabel.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Link Copied"];
            }
        } catch (err) {
            this._gameRoomCopyToClipboardLabel.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Copy Error"];
            this._gameRoomCopyToClipboardLabel.style.color = "red";
        }
    }
    addGameRoomCopyLinkHandlerClick() {
        if (!this._gameRoomCopyLinkListenerAdded) {
            this._gameRoomCopyLink.addEventListener("click", this.copyLink.bind(this));
            this._gameRoomCopyLinkListenerAdded = true;
        }
    }
    addGameRoomCreateListenerHandlerClick() {
        if (!this._gameRoomCreateListenerAdded) {
            this._gameRoomCreateButton.addEventListener("click", this.createGameRoom.bind(this));
            this._gameRoomCreateListenerAdded = true;
        }
    }
    addGameRoomDeleteListenerHandlerClick() {
        if (!this._gameRoomDeleteListenerAdded) {
            this._gameRoomDeleteButton.addEventListener("click", this.deleteGameRoom.bind(this));
            this._gameRoomDeleteListenerAdded = true;
        }
    }
    addShareLinkHandlerClick() {
        if (!this._gameRoomShareLinkListenerAdded) {
            this._gameShareLink.addEventListener("click", (function() {
                if (navigator.share) navigator.share({
                    title: `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Country Alliance Guesser Game"]}`,
                    text: `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["World Country Alliances Guesser Game"]} - ${document.querySelector(".about-project-description").textContent}`,
                    url: this._gameRoomInputLink.value
                }).then(function() {}).catch(function() {});
            }).bind(this));
            this._gameRoomShareLinkListenerAdded = true;
        }
    }
    async startGame(aboutView, gameView, donateAuthorView, gameRulesView, mainView) {
        if (!this._firebase.gameRoomId) {
            alert((0, _uaJs.localization)[_modelJs.worldCountries.language]["You have selected the game mode with a friend. First, create a game room. Click the 'Create Game Room' button."]);
            return;
        }
        document.querySelector("#startButtonTextGameRoom").classList.add("not-displayed");
        document.querySelector("#startLoaderSpinnerGameRoom").classList.remove("not-displayed");
        this._startButton.disabled = true;
        mainView.hideMain();
        aboutView.hideAboutProject();
        donateAuthorView.hideDonateProject();
        gameRulesView.hideGameRulesProject();
        gameView.initGameView(this._firebase);
        await new Promise((resolve)=>setTimeout(resolve, 500));
        this.hideGameRoomProject();
        document.querySelector("header").classList.add("not-displayed");
        document.querySelector("footer").style.display = "none";
        document.querySelector("#startLoaderSpinnerGameRoom").classList.add("not-displayed");
        document.querySelector("#startButtonTextGameRoom").classList.remove("not-displayed");
        gameView.showGame();
    }
    addStartGameHandlerClick(aboutView, gameView, donateAuthorView, gameRulesView, mainView) {
        if (!this._startButtonListenerAdded) {
            this._startButton.addEventListener("click", this.startGame.bind(this, aboutView, gameView, donateAuthorView, gameRulesView, mainView));
            this._startButtonListenerAdded = true;
        }
    }
    addReturnBackHandlerClick(mainView, aboutView, gameRulesView, donateAuthorView) {
        if (!this._returnBackListenerAdded) {
            this._gameRoomReturnBack.addEventListener("click", this.returnBack.bind(this, mainView, aboutView, gameRulesView, donateAuthorView));
            this._returnBackListenerAdded = true;
        }
    }
    showGameRoomInfo() {
        this.showGameRoomProject();
    }
    showGameRoomProject() {
        if (this._firebase.gameRoomId) this._startButton.disabled = false;
        else this._startButton.disabled = true;
        this._parentElement.classList.remove("not-displayed");
    }
    hideGameRoomProject() {
        if (this._firebase.gameRoomId) this._startButton.disabled = false;
        else this._startButton.disabled = true;
        this._parentElement.classList.add("not-displayed");
    }
    getFirebase() {
        return this._firebase;
    }
    cleanFirebase(closeChannel) {
        if (this._firebase) this._firebase.cleanupResources(closeChannel);
    }
    translateElements() {
        this._gameRoomReturnBack.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["BACK TO MAIN PAGE"]}`;
        this._gameRoomCreateButton.textContent = `\u{1F3AE} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Create Game Room"]}`;
        this._gameRoomDeleteButton.textContent = `\u{1F5D1}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Delete Game Room"]}`;
        this._gameRoomInputLink.placeholder = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Click 'Create Game Room' to generate game link"]}`;
        this._gameLinkForFriendLabel.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Link For Friend"]}`;
        this._gameRoomCopyLink.textContent = `\u{1F4CB} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Copy Link"]}`;
        this._gameShareLink.textContent = `\u{1F517} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Share Link With Friend"]}`;
        this._gameRoomGameConfigurationHeader.textContent = `\u{2699}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Game Configuration"]} \u{2699}\u{FE0F}`;
        this._gameRoomOnlyIndependentCountriesSelect.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Countries"];
        const onlyIndependentOptions = Array.from(this._gameRoomOnlyIndependentCountriesSelect.options);
        onlyIndependentOptions.forEach((option)=>{
            option.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language][option.value];
        });
        this._gameRoomHitTimeSelect.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Time per Guess, seconds"];
        this._gameRoomBonusCountriesSelect.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Bonus Countries"];
        this._gameRoomHintsTypeSelect.title = (0, _uaJs.localization)[_modelJs.worldCountries.language]["Hints"];
        const hintTypesOptions = Array.from(this._gameRoomHintsTypeSelect.options);
        hintTypesOptions.forEach((option)=>{
            option.textContent = (0, _uaJs.localization)[_modelJs.worldCountries.language][option.value];
        });
        this._gameRoomInstructionHeader.textContent = `\u{1F4DC} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Instructions."]}`;
        this._startButtonText.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["START"]}`;
        this._gameRoomInstructionText.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["To play with your friend, you need: 1. Choose the desired game configuration, whether you want to guess countries and alliances of countries from all over the world or only independent ones, receive all or only text clues (country name, country capital, region, subregion) or visual clues (country coat of arms, country flag, country's outline on map, photo from country) or choose the hints yourself during the game, time (in seconds) to try to guess the opponent's country, number of bonus countries. You can do this on this page or on the main page (after creating a game room, you will not be able to change this setting). 2. Create a game room and a link to the game for your friend by clicking the 'Create Game Room' button. 3. Copy the game link by clicking the 'Copy Link' button and send it to your friend or share the game link by clicking the 'Share Link With Friend' button. 4. After completing a game or several games, you can delete the game room by clicking the 'Delete Game Room' button (after deleting the game room, your friend will no longer be able to use the game link to play with you)."]}`;
        this._gameRoomImportantHeader.textContent = `\u{2139}\u{FE0F} ${(0, _uaJs.localization)[_modelJs.worldCountries.language]["Important!"]}`;
        this._gameRoomImportantDescription.textContent = `${(0, _uaJs.localization)[_modelJs.worldCountries.language]["If your browser blocks or disables WebRTC (real-time communication for the web), you will not be able to play with your friend. Try a different browser."]}`;
    }
}
exports.default = new gameRoomView();

},{"../localization/ua.js":"3eDg2","../model.js":"6YxfE","../helpers.js":"j4etx","../firebase.js":"24zHi","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["qTXMn","cCMpN"], "cCMpN", "parcelRequireb2bd", {})

//# sourceMappingURL=world-countries-battle-game.e438c7cc.js.map
