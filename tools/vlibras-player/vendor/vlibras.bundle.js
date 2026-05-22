var VLibrasBundle = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // shims/window.js
  var require_window = __commonJS({
    "shims/window.js"(exports, module) {
      module.exports = typeof window !== "undefined" ? window : globalThis;
    }
  });

  // node_modules/object-assign/index.js
  var require_object_assign = __commonJS({
    "node_modules/object-assign/index.js"(exports, module) {
      "use strict";
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports, module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // shims/empty.js
  var require_empty = __commonJS({
    "shims/empty.js"(exports, module) {
      module.exports = {};
    }
  });

  // node_modules/url-join/lib/url-join.js
  var require_url_join = __commonJS({
    "node_modules/url-join/lib/url-join.js"(exports, module) {
      (function(name, context, definition) {
        if (typeof module !== "undefined" && module.exports) module.exports = definition();
        else if (typeof define === "function" && define.amd) define(definition);
        else context[name] = definition();
      })("urljoin", exports, function() {
        function normalize(strArray) {
          var resultArray = [];
          if (strArray.length === 0) {
            return "";
          }
          if (typeof strArray[0] !== "string") {
            throw new TypeError("Url must be a string. Received " + strArray[0]);
          }
          if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
            var first = strArray.shift();
            strArray[0] = first + strArray[0];
          }
          if (strArray[0].match(/^file:\/\/\//)) {
            strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, "$1:///");
          } else {
            strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, "$1://");
          }
          for (var i = 0; i < strArray.length; i++) {
            var component = strArray[i];
            if (typeof component !== "string") {
              throw new TypeError("Url must be a string. Received " + component);
            }
            if (component === "") {
              continue;
            }
            if (i > 0) {
              component = component.replace(/^[\/]+/, "");
            }
            if (i < strArray.length - 1) {
              component = component.replace(/[\/]+$/, "");
            } else {
              component = component.replace(/[\/]+$/, "/");
            }
            resultArray.push(component);
          }
          var str = resultArray.join("/");
          str = str.replace(/\/(\?|&|#[^!])/g, "$1");
          var parts = str.split("?");
          str = parts.shift() + (parts.length > 0 ? "?" : "") + parts.join("&");
          return str;
        }
        return function() {
          var input;
          if (typeof arguments[0] === "object") {
            input = arguments[0];
          } else {
            input = [].slice.call(arguments);
          }
          return normalize(input);
        };
      });
    }
  });

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module.exports = EventEmitter;
      module.exports.once = once;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // player-src/config.js
  var require_config = __commonJS({
    "player-src/config.js"(exports) {
      exports.translatorUrl = "https://traducao2.vlibras.gov.br/translate";
      exports.dictionaryUrl = "https://dicionario2.vlibras.gov.br/2018.3.1/WEBGL/";
      exports.dictionaryStaticUrl = "https://dicionario2.vlibras.gov.br/static/BUNDLES/2018.3.1/WEBGL/";
    }
  });

  // player-src/PlayerManagerAdapter.js
  var require_PlayerManagerAdapter = __commonJS({
    "player-src/PlayerManagerAdapter.js"(exports, module) {
      var window2 = require_window();
      var inherits = require_inherits_browser();
      var EventEmitter = require_events().EventEmitter;
      var GAME_OBJECT = "PlayerManager";
      function PlayerManagerAdapter() {
        if (PlayerManagerAdapter.instance) return PlayerManagerAdapter.instance;
        this.subtitle = true;
        this.currentBaseUrl = "";
        this.on(
          "load",
          function() {
            this._send("initRandomAnimationsProcess");
          }.bind(this)
        );
        PlayerManagerAdapter.instance = this;
      }
      inherits(PlayerManagerAdapter, EventEmitter);
      PlayerManagerAdapter.prototype.setPlayerReference = function(player) {
        this.player = player;
      };
      PlayerManagerAdapter.prototype._send = function(method, params) {
        this.player.SendMessage(GAME_OBJECT, method, params);
      };
      PlayerManagerAdapter.prototype.play = function(glosa) {
        if (glosa) {
          this._send("playNow", glosa);
        } else {
          this._send("setPauseState", 0);
        }
      };
      PlayerManagerAdapter.prototype.setPersonalization = function(personalization) {
        this.player.SendMessage("CustomizationBridge", "setURL", personalization);
      };
      PlayerManagerAdapter.prototype.pause = function() {
        this._send("setPauseState", 1);
      };
      PlayerManagerAdapter.prototype.stop = function() {
        this._send("stopAll");
      };
      PlayerManagerAdapter.prototype.setSpeed = function(speed) {
        this._send("setSlider", speed);
      };
      PlayerManagerAdapter.prototype.toggleSubtitle = function() {
        this.subtitle = !this.subtitle;
        this._send("setSubtitlesState", toInt(this.subtitle));
      };
      PlayerManagerAdapter.prototype.playWellcome = function() {
        this._send("playWellcome");
      };
      PlayerManagerAdapter.prototype.changeAvatar = function(avatarName) {
        this._send("Change", avatarName);
      };
      PlayerManagerAdapter.prototype.setBaseUrl = function(url) {
        this._send("setBaseUrl", url);
        this.currentBaseUrl = url;
      };
      window2.onLoadPlayer = function() {
        PlayerManagerAdapter.instance.emit("load");
      };
      window2.updateProgress = function(progress) {
        PlayerManagerAdapter.instance.emit("progress", progress);
      };
      window2.onPlayingStateChange = function(isPlaying, isPaused, isPlayingIntervalAnimation, isLoading, isRepeatable) {
        PlayerManagerAdapter.instance.emit(
          "stateChange",
          toBoolean(isPlaying),
          toBoolean(isPaused),
          toBoolean(isLoading)
        );
      };
      window2.CounterGloss = function(counter, glosaLenght) {
        PlayerManagerAdapter.instance.emit("CounterGloss", counter, glosaLenght);
      };
      window2.GetAvatar = function(avatar) {
        PlayerManagerAdapter.instance.emit("GetAvatar", avatar);
      };
      window2.FinishWelcome = function(bool) {
        PlayerManagerAdapter.instance.emit("FinishWelcome", bool);
      };
      function toInt(boolean) {
        return !boolean ? 0 : 1;
      }
      function toBoolean(bool) {
        return bool != "False";
      }
      module.exports = PlayerManagerAdapter;
    }
  });

  // shims/superagent.js
  var require_superagent = __commonJS({
    "shims/superagent.js"(exports, module) {
      function post(url, body) {
        return {
          end(callback) {
            fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            }).then((resp) => resp.text().then((text) => callback(null, { text, ok: resp.ok }))).catch((err) => callback(err));
          }
        };
      }
      module.exports = { post };
      module.exports.post = post;
    }
  });

  // player-src/GlosaTranslator.js
  var require_GlosaTranslator = __commonJS({
    "player-src/GlosaTranslator.js"(exports, module) {
      var request = require_superagent();
      function GlosaTranslator(endpoint) {
        this.endpoint = endpoint;
      }
      GlosaTranslator.prototype.translate = function(text, domain, callback) {
        let time = 15;
        let hasTimeout = false;
        const size = text.split(" ").length;
        if (size > 50) time += size * 0.4 / 10;
        const timeout = setTimeout(() => {
          hasTimeout = true;
          callback(void 0, "timeout_error");
        }, time * 1e3);
        request.post(this.endpoint, { text, domain }).end(
          function(err, response) {
            if (hasTimeout) return;
            clearTimeout(timeout);
            if (err) callback(void 0, err);
            else callback(response.text);
          }
        );
      };
      module.exports = GlosaTranslator;
    }
  });

  // player-src/Player.js
  var require_Player = __commonJS({
    "player-src/Player.js"(exports, module) {
      var window2 = require_window();
      var assign = require_object_assign();
      var inherits = require_inherits_browser();
      var path = require_empty();
      var url = require_url_join();
      var EventEmitter = require_events().EventEmitter;
      var config = require_config();
      var PlayerManagerAdapter = require_PlayerManagerAdapter();
      var GlosaTranslator = require_GlosaTranslator();
      var globalGlosaLenght = "";
      var document = window2.document;
      var location = window2.location;
      var STATUSES = {
        idle: "idle",
        preparing: "preparing",
        playing: "playing"
      };
      function Player(options) {
        this.options = assign(
          {
            translator: config.translatorUrl,
            targetPath: "target"
          },
          options
        );
        this.playerManager = new PlayerManagerAdapter();
        this.translator = new GlosaTranslator(this.options.translator);
        this.translated = false;
        this.text = void 0;
        this.gloss = void 0;
        this.loaded = false;
        this.progress = null;
        this.gameContainer = null;
        this.player = null;
        this.status = STATUSES.idle;
        this.region = "BR";
        this.playerManager.on("load", () => {
          this.loaded = true;
          this.emit("load");
          this.playerManager.setBaseUrl(config.dictionaryUrl);
          if (this.options.onLoad) {
            this.options.onLoad();
          } else {
            this.play(null, { fromTranslation: true });
          }
        });
        this.playerManager.on("progress", (progress) => {
          this.emit("animation:progress", progress);
        });
        this.playerManager.on("stateChange", (isPlaying, isPaused, isLoading) => {
          if (isPaused) {
            this.emit("animation:pause");
          } else if (isPlaying && !isPaused) {
            this.emit("animation:play");
            this.changeStatus(STATUSES.playing);
          } else if (!isPlaying && !isLoading) {
            this.emit("animation:end");
            this.changeStatus(STATUSES.idle);
          }
        });
        this.playerManager.on("CounterGloss", (counter, glosaLenght) => {
          this.emit("response:glosa", counter, glosaLenght);
          globalGlosaLenght = glosaLenght;
        });
        this.playerManager.on("GetAvatar", (avatar) => {
          this.emit("GetAvatar", avatar);
        });
        this.playerManager.on("FinishWelcome", (bool) => {
          this.emit("stop:welcome", bool);
        });
      }
      inherits(Player, EventEmitter);
      Player.prototype.translate = function(text, { isEnabledStats = true } = {}) {
        this.emit("translate:start");
        if (this.loaded) {
          this.stop();
        }
        this.text = text;
        this.translator.translate(text, location.host, (gloss, error) => {
          if (error) {
            this.play(text.toUpperCase());
            this.emit(
              "error",
              error === "timeout_error" ? error : "translation_error"
            );
            return;
          }
          this.play(gloss, { fromTranslation: true, isEnabledStats });
          this.emit("translate:end");
        });
      };
      Player.prototype.play = function(glosa, { fromTranslation = false, isEnabledStats = true } = {}) {
        if (!isEnabledStats && isDefaultUrl.bind(this)()) {
          this.playerManager.setBaseUrl(config.dictionaryStaticUrl + this.region + "/");
        } else if (isEnabledStats && !isDefaultUrl.bind(this)()) {
          this.playerManager.setBaseUrl(config.dictionaryUrl + this.region + "/");
        }
        function isDefaultUrl() {
          return this.playerManager.currentBaseUrl === config.dictionaryUrl + this.region + "/";
        }
        this.translated = fromTranslation;
        this.gloss = glosa || this.gloss;
        if (this.gloss !== void 0 && this.loaded) {
          this.changeStatus(STATUSES.preparing);
          this.playerManager.play(this.gloss);
        }
      };
      Player.prototype.playWellcome = function() {
        this.playerManager.playWellcome();
        this.emit("start:welcome");
      };
      Player.prototype.continue = function() {
        this.playerManager.play();
      };
      Player.prototype.repeat = function() {
        this.play();
      };
      Player.prototype.pause = function() {
        this.playerManager.pause();
      };
      Player.prototype.stop = function() {
        this.playerManager.stop();
      };
      Player.prototype.setSpeed = function(speed) {
        this.playerManager.setSpeed(speed);
      };
      Player.prototype.setPersonalization = function(personalization) {
        this.playerManager.setPersonalization(personalization);
      };
      Player.prototype.changeAvatar = function(avatarName) {
        this.playerManager.changeAvatar(avatarName);
      };
      Player.prototype.toggleSubtitle = function() {
        this.playerManager.toggleSubtitle();
      };
      Player.prototype.setRegion = function(region) {
        this.region = region;
        this.playerManager.setBaseUrl(config.dictionaryUrl + region + "/");
      };
      Player.prototype.load = function(wrapper) {
        this.gameContainer = document.createElement("div");
        this.gameContainer.setAttribute("id", "gameContainer");
        this.gameContainer.classList.add("emscripten");
        if ("function" == typeof this.options.progress) {
          this.progress = new this.options.progress(wrapper);
        }
        wrapper.appendChild(this.gameContainer);
        this._initializeTarget();
      };
      Player.prototype._getTargetScript = function() {
        return url(this.options.targetPath, "UnityLoader.js");
      };
      Player.prototype._initializeTarget = function() {
        const targetSetup = url(this.options.targetPath, "playerweb.json");
        const targetScript = document.createElement("script");
        targetScript.src = this._getTargetScript();
        targetScript.onload = () => {
          this.player = UnityLoader.instantiate("gameContainer", targetSetup, {
            compatibilityCheck: (_, accept, deny) => {
              if (UnityLoader.SystemInfo.hasWebGL) {
                return accept();
              }
              this.onError("unsupported");
              alert("Seu navegador n\xE3o suporta WEBGL");
              console.error("Seu navegador n\xE3o suporta WEBGL");
              deny();
            }
          });
          this.playerManager.setPlayerReference(this.player);
        };
        document.body.appendChild(targetScript);
      };
      Player.prototype.changeStatus = function(status) {
        switch (status) {
          case STATUSES.idle:
            if (this.status === STATUSES.playing) {
              this.status = status;
              this.emit("gloss:end", globalGlosaLenght);
            }
            break;
          case STATUSES.preparing:
            this.status = status;
            break;
          case STATUSES.playing:
            if (this.status === STATUSES.preparing) {
              this.status = status;
              this.emit("gloss:start");
            }
            break;
        }
      };
      module.exports = Player;
    }
  });

  // player-src/index.js
  var require_index = __commonJS({
    "player-src/index.js"(exports, module) {
      var window2 = require_window();
      var Player = require_Player();
      var VLibras = {
        Player
      };
      window2.VLibras = VLibras;
      module.exports = VLibras;
    }
  });
  return require_index();
})();
/*! Bundled license information:

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)
*/
