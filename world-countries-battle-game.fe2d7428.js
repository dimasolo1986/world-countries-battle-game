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
})({"8iCel":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 5000;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "ef2db2eefe2d7428";
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

},{}],"bJdmo":[function(require,module,exports,__globalThis) {
(function(factory) {
    // Packaging/modules magic dance
    var L;
    if (typeof define === 'function' && define.amd) // AMD
    define([
        'leaflet'
    ], factory);
    else if (typeof module.exports === 'object') {
        // Node/CommonJS
        L = require("31cc82103823e39e");
        module.exports = factory(L);
    } else {
        // Browser globals
        if (typeof window.L === 'undefined') throw new Error('Leaflet must be loaded first');
        factory(window.L);
    }
})(function(L) {
    L.Map.mergeOptions({
        contextmenuItems: []
    });
    L.Map.ContextMenu = L.Handler.extend({
        _touchstart: L.Browser.msPointer ? 'MSPointerDown' : L.Browser.pointer ? 'pointerdown' : 'touchstart',
        statics: {
            BASE_CLS: 'leaflet-contextmenu'
        },
        initialize: function(map) {
            L.Handler.prototype.initialize.call(this, map);
            this._items = [];
            this._visible = false;
            var container = this._container = L.DomUtil.create('div', L.Map.ContextMenu.BASE_CLS, map._container);
            container.style.zIndex = 10000;
            container.style.position = 'absolute';
            if (map.options.contextmenuWidth) container.style.width = map.options.contextmenuWidth + 'px';
            this._createItems();
            L.DomEvent.on(container, 'click', L.DomEvent.stop).on(container, 'mousedown', L.DomEvent.stop).on(container, 'dblclick', L.DomEvent.stop).on(container, 'contextmenu', L.DomEvent.stop);
        },
        addHooks: function() {
            var container = this._map.getContainer();
            L.DomEvent.on(container, 'mouseleave', this._hide, this).on(document, 'keydown', this._onKeyDown, this);
            if (L.Browser.touch) L.DomEvent.on(document, this._touchstart, this._hide, this);
            this._map.on({
                contextmenu: this._show,
                mousedown: this._hide,
                zoomstart: this._hide
            }, this);
        },
        removeHooks: function() {
            var container = this._map.getContainer();
            L.DomEvent.off(container, 'mouseleave', this._hide, this).off(document, 'keydown', this._onKeyDown, this);
            if (L.Browser.touch) L.DomEvent.off(document, this._touchstart, this._hide, this);
            this._map.off({
                contextmenu: this._show,
                mousedown: this._hide,
                zoomstart: this._hide
            }, this);
        },
        showAt: function(point, data) {
            if (point instanceof L.LatLng) point = this._map.latLngToContainerPoint(point);
            this._showAtPoint(point, data);
        },
        hide: function() {
            this._hide();
        },
        addItem: function(options) {
            return this.insertItem(options);
        },
        insertItem: function(options, index) {
            index = index !== undefined ? index : this._items.length;
            var item = this._createItem(this._container, options, index);
            this._items.push(item);
            this._sizeChanged = true;
            this._map.fire('contextmenu.additem', {
                contextmenu: this,
                el: item.el,
                index: index
            });
            return item.el;
        },
        removeItem: function(item) {
            var container = this._container;
            if (!isNaN(item)) item = container.children[item];
            if (item) {
                this._removeItem(L.Util.stamp(item));
                this._sizeChanged = true;
                this._map.fire('contextmenu.removeitem', {
                    contextmenu: this,
                    el: item
                });
                return item;
            }
            return null;
        },
        removeAllItems: function() {
            var items = this._container.children, item;
            while(items.length){
                item = items[0];
                this._removeItem(L.Util.stamp(item));
            }
            return items;
        },
        hideAllItems: function() {
            var item, i, l;
            for(i = 0, l = this._items.length; i < l; i++){
                item = this._items[i];
                item.el.style.display = 'none';
            }
        },
        showAllItems: function() {
            var item, i, l;
            for(i = 0, l = this._items.length; i < l; i++){
                item = this._items[i];
                item.el.style.display = '';
            }
        },
        setDisabled: function(item, disabled) {
            var container = this._container, itemCls = L.Map.ContextMenu.BASE_CLS + '-item';
            if (!isNaN(item)) item = container.children[item];
            if (item && L.DomUtil.hasClass(item, itemCls)) {
                if (disabled) {
                    L.DomUtil.addClass(item, itemCls + '-disabled');
                    this._map.fire('contextmenu.disableitem', {
                        contextmenu: this,
                        el: item
                    });
                } else {
                    L.DomUtil.removeClass(item, itemCls + '-disabled');
                    this._map.fire('contextmenu.enableitem', {
                        contextmenu: this,
                        el: item
                    });
                }
            }
        },
        isVisible: function() {
            return this._visible;
        },
        _createItems: function() {
            var itemOptions = this._map.options.contextmenuItems, item, i, l;
            for(i = 0, l = itemOptions.length; i < l; i++)this._items.push(this._createItem(this._container, itemOptions[i]));
        },
        _createItem: function(container, options, index) {
            if (options.separator || options === '-') return this._createSeparator(container, index);
            var itemCls = L.Map.ContextMenu.BASE_CLS + '-item', cls = options.disabled ? itemCls + ' ' + itemCls + '-disabled' : itemCls, el = this._insertElementAt('a', cls, container, index), callback = this._createEventHandler(el, options.callback, options.context, options.hideOnSelect), icon = this._getIcon(options), iconCls = this._getIconCls(options), html = '';
            if (icon) html = '<img class="' + L.Map.ContextMenu.BASE_CLS + '-icon" src="' + icon + '"/>';
            else if (iconCls) html = '<span class="' + L.Map.ContextMenu.BASE_CLS + '-icon ' + iconCls + '"></span>';
            el.innerHTML = html + options.text;
            el.href = '#';
            L.DomEvent.on(el, 'mouseover', this._onItemMouseOver, this).on(el, 'mouseout', this._onItemMouseOut, this).on(el, 'mousedown', L.DomEvent.stopPropagation).on(el, 'click', callback);
            if (L.Browser.touch) L.DomEvent.on(el, this._touchstart, L.DomEvent.stopPropagation);
            // Devices without a mouse fire "mouseover" on tap, but never “mouseout"
            if (!L.Browser.pointer) L.DomEvent.on(el, 'click', this._onItemMouseOut, this);
            return {
                id: L.Util.stamp(el),
                el: el,
                callback: callback
            };
        },
        _removeItem: function(id) {
            var item, el, i, l, callback;
            for(i = 0, l = this._items.length; i < l; i++){
                item = this._items[i];
                if (item.id === id) {
                    el = item.el;
                    callback = item.callback;
                    if (callback) {
                        L.DomEvent.off(el, 'mouseover', this._onItemMouseOver, this).off(el, 'mouseover', this._onItemMouseOut, this).off(el, 'mousedown', L.DomEvent.stopPropagation).off(el, 'click', callback);
                        if (L.Browser.touch) L.DomEvent.off(el, this._touchstart, L.DomEvent.stopPropagation);
                        if (!L.Browser.pointer) L.DomEvent.on(el, 'click', this._onItemMouseOut, this);
                    }
                    this._container.removeChild(el);
                    this._items.splice(i, 1);
                    return item;
                }
            }
            return null;
        },
        _createSeparator: function(container, index) {
            var el = this._insertElementAt('div', L.Map.ContextMenu.BASE_CLS + '-separator', container, index);
            return {
                id: L.Util.stamp(el),
                el: el
            };
        },
        _createEventHandler: function(el, func, context, hideOnSelect) {
            var me = this, map = this._map, disabledCls = L.Map.ContextMenu.BASE_CLS + '-item-disabled', hideOnSelect = hideOnSelect !== undefined ? hideOnSelect : true;
            return function(e) {
                if (L.DomUtil.hasClass(el, disabledCls)) return;
                var map = me._map, containerPoint = me._showLocation.containerPoint, layerPoint = map.containerPointToLayerPoint(containerPoint), latlng = map.layerPointToLatLng(layerPoint), relatedTarget = me._showLocation.relatedTarget, data = {
                    containerPoint: containerPoint,
                    layerPoint: layerPoint,
                    latlng: latlng,
                    relatedTarget: relatedTarget
                };
                if (hideOnSelect) me._hide();
                if (func) func.call(context || map, data);
                me._map.fire('contextmenu.select', {
                    contextmenu: me,
                    el: el
                });
            };
        },
        _insertElementAt: function(tagName, className, container, index) {
            var refEl, el = document.createElement(tagName);
            el.className = className;
            if (index !== undefined) refEl = container.children[index];
            if (refEl) container.insertBefore(el, refEl);
            else container.appendChild(el);
            return el;
        },
        _show: function(e) {
            this._showAtPoint(e.containerPoint, e);
        },
        _showAtPoint: function(pt, data) {
            if (this._items.length) {
                var map = this._map, event = L.extend(data || {}, {
                    contextmenu: this
                });
                this._showLocation = {
                    containerPoint: pt
                };
                if (data && data.relatedTarget) this._showLocation.relatedTarget = data.relatedTarget;
                this._setPosition(pt);
                if (!this._visible) {
                    this._container.style.display = 'block';
                    this._visible = true;
                }
                this._map.fire('contextmenu.show', event);
            }
        },
        _hide: function() {
            if (this._visible) {
                this._visible = false;
                this._container.style.display = 'none';
                this._map.fire('contextmenu.hide', {
                    contextmenu: this
                });
            }
        },
        _getIcon: function(options) {
            return L.Browser.retina && options.retinaIcon || options.icon;
        },
        _getIconCls: function(options) {
            return L.Browser.retina && options.retinaIconCls || options.iconCls;
        },
        _setPosition: function(pt) {
            var mapSize = this._map.getSize(), container = this._container, containerSize = this._getElementSize(container), anchor;
            if (this._map.options.contextmenuAnchor) {
                anchor = L.point(this._map.options.contextmenuAnchor);
                pt = pt.add(anchor);
            }
            container._leaflet_pos = pt;
            if (pt.x + containerSize.x > mapSize.x) {
                container.style.left = 'auto';
                container.style.right = Math.min(Math.max(mapSize.x - pt.x, 0), mapSize.x - containerSize.x - 1) + 'px';
            } else {
                container.style.left = Math.max(pt.x, 0) + 'px';
                container.style.right = 'auto';
            }
            if (pt.y + containerSize.y > mapSize.y) {
                container.style.top = 'auto';
                container.style.bottom = Math.min(Math.max(mapSize.y - pt.y, 0), mapSize.y - containerSize.y - 1) + 'px';
            } else {
                container.style.top = Math.max(pt.y, 0) + 'px';
                container.style.bottom = 'auto';
            }
        },
        _getElementSize: function(el) {
            var size = this._size, initialDisplay = el.style.display;
            if (!size || this._sizeChanged) {
                size = {};
                el.style.left = '-999999px';
                el.style.right = 'auto';
                el.style.display = 'block';
                size.x = el.offsetWidth;
                size.y = el.offsetHeight;
                el.style.left = 'auto';
                el.style.display = initialDisplay;
                this._sizeChanged = false;
            }
            return size;
        },
        _onKeyDown: function(e) {
            var key = e.keyCode;
            // If ESC pressed and context menu is visible hide it
            if (key === 27) this._hide();
        },
        _onItemMouseOver: function(e) {
            L.DomUtil.addClass(e.target || e.srcElement, 'over');
        },
        _onItemMouseOut: function(e) {
            L.DomUtil.removeClass(e.target || e.srcElement, 'over');
        }
    });
    L.Map.addInitHook('addHandler', 'contextmenu', L.Map.ContextMenu);
    L.Mixin.ContextMenu = {
        bindContextMenu: function(options) {
            L.setOptions(this, options);
            this._initContextMenu();
            return this;
        },
        unbindContextMenu: function() {
            this.off('contextmenu', this._showContextMenu, this);
            return this;
        },
        addContextMenuItem: function(item) {
            this.options.contextmenuItems.push(item);
        },
        removeContextMenuItemWithIndex: function(index) {
            var items = [];
            for(var i = 0; i < this.options.contextmenuItems.length; i++)if (this.options.contextmenuItems[i].index == index) items.push(i);
            var elem = items.pop();
            while(elem !== undefined){
                this.options.contextmenuItems.splice(elem, 1);
                elem = items.pop();
            }
        },
        replaceContextMenuItem: function(item) {
            this.removeContextMenuItemWithIndex(item.index);
            this.addContextMenuItem(item);
        },
        _initContextMenu: function() {
            this._items = [];
            this.on('contextmenu', this._showContextMenu, this);
        },
        _showContextMenu: function(e) {
            var itemOptions, data, pt, i, l;
            if (this._map.contextmenu) {
                data = L.extend({
                    relatedTarget: this
                }, e);
                pt = this._map.mouseEventToContainerPoint(e.originalEvent);
                if (!this.options.contextmenuInheritItems) this._map.contextmenu.hideAllItems();
                for(i = 0, l = this.options.contextmenuItems.length; i < l; i++){
                    itemOptions = this.options.contextmenuItems[i];
                    this._items.push(this._map.contextmenu.insertItem(itemOptions, itemOptions.index));
                }
                this._map.once('contextmenu.hide', this._hideContextMenu, this);
                this._map.contextmenu.showAt(pt, data);
            }
        },
        _hideContextMenu: function() {
            var i, l;
            for(i = 0, l = this._items.length; i < l; i++)this._map.contextmenu.removeItem(this._items[i]);
            this._items.length = 0;
            if (!this.options.contextmenuInheritItems) this._map.contextmenu.showAllItems();
        }
    };
    var classes = [
        L.Marker,
        L.Path
    ], defaultOptions = {
        contextmenu: false,
        contextmenuItems: [],
        contextmenuInheritItems: true
    }, cls, i, l;
    for(i = 0, l = classes.length; i < l; i++){
        cls = classes[i];
        // L.Class should probably provide an empty options hash, as it does not test
        // for it here and add if needed
        if (!cls.prototype.options) cls.prototype.options = defaultOptions;
        else cls.mergeOptions(defaultOptions);
        cls.addInitHook(function() {
            if (this.options.contextmenu) this._initContextMenu();
        });
        cls.include(L.Mixin.ContextMenu);
    }
    return L.Map.ContextMenu;
});

},{"31cc82103823e39e":"gzvEd"}]},["8iCel","bJdmo"], "bJdmo", "parcelRequireb2bd", {})

//# sourceMappingURL=world-countries-battle-game.fe2d7428.js.map
