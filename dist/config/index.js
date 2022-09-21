(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/moment/moment.js
  var require_moment = __commonJS({
    "node_modules/moment/moment.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.moment = factory();
      })(exports, function() {
        "use strict";
        var hookCallback;
        function hooks() {
          return hookCallback.apply(null, arguments);
        }
        function setHookCallback(callback) {
          hookCallback = callback;
        }
        function isArray(input) {
          return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
        }
        function isObject(input) {
          return input != null && Object.prototype.toString.call(input) === "[object Object]";
        }
        function hasOwnProp(a, b) {
          return Object.prototype.hasOwnProperty.call(a, b);
        }
        function isObjectEmpty(obj) {
          if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
          } else {
            var k;
            for (k in obj) {
              if (hasOwnProp(obj, k)) {
                return false;
              }
            }
            return true;
          }
        }
        function isUndefined(input) {
          return input === void 0;
        }
        function isNumber(input) {
          return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
        }
        function isDate(input) {
          return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
        }
        function map(arr, fn) {
          var res = [], i;
          for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
          }
          return res;
        }
        function extend(a, b) {
          for (var i in b) {
            if (hasOwnProp(b, i)) {
              a[i] = b[i];
            }
          }
          if (hasOwnProp(b, "toString")) {
            a.toString = b.toString;
          }
          if (hasOwnProp(b, "valueOf")) {
            a.valueOf = b.valueOf;
          }
          return a;
        }
        function createUTC(input, format2, locale2, strict) {
          return createLocalOrUTC(input, format2, locale2, strict, true).utc();
        }
        function defaultParsingFlags() {
          return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false
          };
        }
        function getParsingFlags(m) {
          if (m._pf == null) {
            m._pf = defaultParsingFlags();
          }
          return m._pf;
        }
        var some;
        if (Array.prototype.some) {
          some = Array.prototype.some;
        } else {
          some = function(fun) {
            var t = Object(this), len = t.length >>> 0, i;
            for (i = 0; i < len; i++) {
              if (i in t && fun.call(this, t[i], i, t)) {
                return true;
              }
            }
            return false;
          };
        }
        function isValid(m) {
          if (m._isValid == null) {
            var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i) {
              return i != null;
            }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
            if (m._strict) {
              isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
            }
            if (Object.isFrozen == null || !Object.isFrozen(m)) {
              m._isValid = isNowValid;
            } else {
              return isNowValid;
            }
          }
          return m._isValid;
        }
        function createInvalid(flags) {
          var m = createUTC(NaN);
          if (flags != null) {
            extend(getParsingFlags(m), flags);
          } else {
            getParsingFlags(m).userInvalidated = true;
          }
          return m;
        }
        var momentProperties = hooks.momentProperties = [], updateInProgress = false;
        function copyConfig(to2, from2) {
          var i, prop, val;
          if (!isUndefined(from2._isAMomentObject)) {
            to2._isAMomentObject = from2._isAMomentObject;
          }
          if (!isUndefined(from2._i)) {
            to2._i = from2._i;
          }
          if (!isUndefined(from2._f)) {
            to2._f = from2._f;
          }
          if (!isUndefined(from2._l)) {
            to2._l = from2._l;
          }
          if (!isUndefined(from2._strict)) {
            to2._strict = from2._strict;
          }
          if (!isUndefined(from2._tzm)) {
            to2._tzm = from2._tzm;
          }
          if (!isUndefined(from2._isUTC)) {
            to2._isUTC = from2._isUTC;
          }
          if (!isUndefined(from2._offset)) {
            to2._offset = from2._offset;
          }
          if (!isUndefined(from2._pf)) {
            to2._pf = getParsingFlags(from2);
          }
          if (!isUndefined(from2._locale)) {
            to2._locale = from2._locale;
          }
          if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
              prop = momentProperties[i];
              val = from2[prop];
              if (!isUndefined(val)) {
                to2[prop] = val;
              }
            }
          }
          return to2;
        }
        function Moment(config) {
          copyConfig(this, config);
          this._d = new Date(config._d != null ? config._d.getTime() : NaN);
          if (!this.isValid()) {
            this._d = new Date(NaN);
          }
          if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
          }
        }
        function isMoment(obj) {
          return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
        }
        function warn(msg) {
          if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
            console.warn("Deprecation warning: " + msg);
          }
        }
        function deprecate(msg, fn) {
          var firstTime = true;
          return extend(function() {
            if (hooks.deprecationHandler != null) {
              hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
              var args = [], arg, i, key;
              for (i = 0; i < arguments.length; i++) {
                arg = "";
                if (typeof arguments[i] === "object") {
                  arg += "\n[" + i + "] ";
                  for (key in arguments[0]) {
                    if (hasOwnProp(arguments[0], key)) {
                      arg += key + ": " + arguments[0][key] + ", ";
                    }
                  }
                  arg = arg.slice(0, -2);
                } else {
                  arg = arguments[i];
                }
                args.push(arg);
              }
              warn(msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack);
              firstTime = false;
            }
            return fn.apply(this, arguments);
          }, fn);
        }
        var deprecations = {};
        function deprecateSimple(name, msg) {
          if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
          }
          if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
          }
        }
        hooks.suppressDeprecationWarnings = false;
        hooks.deprecationHandler = null;
        function isFunction(input) {
          return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
        }
        function set(config) {
          var prop, i;
          for (i in config) {
            if (hasOwnProp(config, i)) {
              prop = config[i];
              if (isFunction(prop)) {
                this[i] = prop;
              } else {
                this["_" + i] = prop;
              }
            }
          }
          this._config = config;
          this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
        }
        function mergeConfigs(parentConfig, childConfig) {
          var res = extend({}, parentConfig), prop;
          for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
              if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
              } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
              } else {
                delete res[prop];
              }
            }
          }
          for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
              res[prop] = extend({}, res[prop]);
            }
          }
          return res;
        }
        function Locale(config) {
          if (config != null) {
            this.set(config);
          }
        }
        var keys;
        if (Object.keys) {
          keys = Object.keys;
        } else {
          keys = function(obj) {
            var i, res = [];
            for (i in obj) {
              if (hasOwnProp(obj, i)) {
                res.push(i);
              }
            }
            return res;
          };
        }
        var defaultCalendar = {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L"
        };
        function calendar(key, mom, now2) {
          var output = this._calendar[key] || this._calendar["sameElse"];
          return isFunction(output) ? output.call(mom, now2) : output;
        }
        function zeroFill(number, targetLength, forceSign) {
          var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
          return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
        }
        var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
        function addFormatToken(token2, padded, ordinal2, callback) {
          var func = callback;
          if (typeof callback === "string") {
            func = function() {
              return this[callback]();
            };
          }
          if (token2) {
            formatTokenFunctions[token2] = func;
          }
          if (padded) {
            formatTokenFunctions[padded[0]] = function() {
              return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
          }
          if (ordinal2) {
            formatTokenFunctions[ordinal2] = function() {
              return this.localeData().ordinal(func.apply(this, arguments), token2);
            };
          }
        }
        function removeFormattingTokens(input) {
          if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
          }
          return input.replace(/\\/g, "");
        }
        function makeFormatFunction(format2) {
          var array = format2.match(formattingTokens), i, length;
          for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
              array[i] = formatTokenFunctions[array[i]];
            } else {
              array[i] = removeFormattingTokens(array[i]);
            }
          }
          return function(mom) {
            var output = "", i2;
            for (i2 = 0; i2 < length; i2++) {
              output += isFunction(array[i2]) ? array[i2].call(mom, format2) : array[i2];
            }
            return output;
          };
        }
        function formatMoment(m, format2) {
          if (!m.isValid()) {
            return m.localeData().invalidDate();
          }
          format2 = expandFormat(format2, m.localeData());
          formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
          return formatFunctions[format2](m);
        }
        function expandFormat(format2, locale2) {
          var i = 5;
          function replaceLongDateFormatTokens(input) {
            return locale2.longDateFormat(input) || input;
          }
          localFormattingTokens.lastIndex = 0;
          while (i >= 0 && localFormattingTokens.test(format2)) {
            format2 = format2.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
          }
          return format2;
        }
        var defaultLongDateFormat = {
          LTS: "h:mm:ss A",
          LT: "h:mm A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A"
        };
        function longDateFormat(key) {
          var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
          if (format2 || !formatUpper) {
            return format2;
          }
          this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
            if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
              return tok.slice(1);
            }
            return tok;
          }).join("");
          return this._longDateFormat[key];
        }
        var defaultInvalidDate = "Invalid date";
        function invalidDate() {
          return this._invalidDate;
        }
        var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
        function ordinal(number) {
          return this._ordinal.replace("%d", number);
        }
        var defaultRelativeTime = {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          w: "a week",
          ww: "%d weeks",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        };
        function relativeTime(number, withoutSuffix, string, isFuture) {
          var output = this._relativeTime[string];
          return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
        }
        function pastFuture(diff2, output) {
          var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
          return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
        }
        var aliases = {};
        function addUnitAlias(unit, shorthand) {
          var lowerCase = unit.toLowerCase();
          aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
        }
        function normalizeUnits(units) {
          return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
        }
        function normalizeObjectUnits(inputObject) {
          var normalizedInput = {}, normalizedProp, prop;
          for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
              normalizedProp = normalizeUnits(prop);
              if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
              }
            }
          }
          return normalizedInput;
        }
        var priorities = {};
        function addUnitPriority(unit, priority) {
          priorities[unit] = priority;
        }
        function getPrioritizedUnits(unitsObj) {
          var units = [], u;
          for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
              units.push({ unit: u, priority: priorities[u] });
            }
          }
          units.sort(function(a, b) {
            return a.priority - b.priority;
          });
          return units;
        }
        function isLeapYear(year) {
          return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        }
        function absFloor(number) {
          if (number < 0) {
            return Math.ceil(number) || 0;
          } else {
            return Math.floor(number);
          }
        }
        function toInt(argumentForCoercion) {
          var coercedNumber = +argumentForCoercion, value = 0;
          if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
          }
          return value;
        }
        function makeGetSet(unit, keepTime) {
          return function(value) {
            if (value != null) {
              set$1(this, unit, value);
              hooks.updateOffset(this, keepTime);
              return this;
            } else {
              return get(this, unit);
            }
          };
        }
        function get(mom, unit) {
          return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
        }
        function set$1(mom, unit, value) {
          if (mom.isValid() && !isNaN(value)) {
            if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
              value = toInt(value);
              mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value, mom.month(), daysInMonth(value, mom.month()));
            } else {
              mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
            }
          }
        }
        function stringGet(units) {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
            return this[units]();
          }
          return this;
        }
        function stringSet(units, value) {
          if (typeof units === "object") {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units), i;
            for (i = 0; i < prioritized.length; i++) {
              this[prioritized[i].unit](units[prioritized[i].unit]);
            }
          } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
              return this[units](value);
            }
          }
          return this;
        }
        var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
        regexes = {};
        function addRegexToken(token2, regex, strictRegex) {
          regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
            return isStrict && strictRegex ? strictRegex : regex;
          };
        }
        function getParseRegexForToken(token2, config) {
          if (!hasOwnProp(regexes, token2)) {
            return new RegExp(unescapeFormat(token2));
          }
          return regexes[token2](config._strict, config._locale);
        }
        function unescapeFormat(s) {
          return regexEscape(s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
          }));
        }
        function regexEscape(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        var tokens = {};
        function addParseToken(token2, callback) {
          var i, func = callback;
          if (typeof token2 === "string") {
            token2 = [token2];
          }
          if (isNumber(callback)) {
            func = function(input, array) {
              array[callback] = toInt(input);
            };
          }
          for (i = 0; i < token2.length; i++) {
            tokens[token2[i]] = func;
          }
        }
        function addWeekParseToken(token2, callback) {
          addParseToken(token2, function(input, array, config, token3) {
            config._w = config._w || {};
            callback(input, config._w, config, token3);
          });
        }
        function addTimeToArrayFromToken(token2, input, config) {
          if (input != null && hasOwnProp(tokens, token2)) {
            tokens[token2](input, config._a, config, token2);
          }
        }
        var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
        function mod(n, x) {
          return (n % x + x) % x;
        }
        var indexOf;
        if (Array.prototype.indexOf) {
          indexOf = Array.prototype.indexOf;
        } else {
          indexOf = function(o) {
            var i;
            for (i = 0; i < this.length; ++i) {
              if (this[i] === o) {
                return i;
              }
            }
            return -1;
          };
        }
        function daysInMonth(year, month) {
          if (isNaN(year) || isNaN(month)) {
            return NaN;
          }
          var modMonth = mod(month, 12);
          year += (month - modMonth) / 12;
          return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
        }
        addFormatToken("M", ["MM", 2], "Mo", function() {
          return this.month() + 1;
        });
        addFormatToken("MMM", 0, 0, function(format2) {
          return this.localeData().monthsShort(this, format2);
        });
        addFormatToken("MMMM", 0, 0, function(format2) {
          return this.localeData().months(this, format2);
        });
        addUnitAlias("month", "M");
        addUnitPriority("month", 8);
        addRegexToken("M", match1to2);
        addRegexToken("MM", match1to2, match2);
        addRegexToken("MMM", function(isStrict, locale2) {
          return locale2.monthsShortRegex(isStrict);
        });
        addRegexToken("MMMM", function(isStrict, locale2) {
          return locale2.monthsRegex(isStrict);
        });
        addParseToken(["M", "MM"], function(input, array) {
          array[MONTH] = toInt(input) - 1;
        });
        addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
          var month = config._locale.monthsParse(input, token2, config._strict);
          if (month != null) {
            array[MONTH] = month;
          } else {
            getParsingFlags(config).invalidMonth = input;
          }
        });
        var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
        function localeMonths(m, format2) {
          if (!m) {
            return isArray(this._months) ? this._months : this._months["standalone"];
          }
          return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
        }
        function localeMonthsShort(m, format2) {
          if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
          }
          return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
        }
        function handleStrictParse(monthName, format2, strict) {
          var i, ii, mom, llc = monthName.toLocaleLowerCase();
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
              mom = createUTC([2e3, i]);
              this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase();
              this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format2 === "MMM") {
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format2 === "MMM") {
              ii = indexOf.call(this._shortMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeMonthsParse(monthName, format2, strict) {
          var i, mom, regex;
          if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format2, strict);
          }
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
          }
          for (i = 0; i < 12; i++) {
            mom = createUTC([2e3, i]);
            if (strict && !this._longMonthsParse[i]) {
              this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
              this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i");
            }
            if (!strict && !this._monthsParse[i]) {
              regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
              this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
              return i;
            } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
              return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
              return i;
            }
          }
        }
        function setMonth(mom, value) {
          var dayOfMonth;
          if (!mom.isValid()) {
            return mom;
          }
          if (typeof value === "string") {
            if (/^\d+$/.test(value)) {
              value = toInt(value);
            } else {
              value = mom.localeData().monthsParse(value);
              if (!isNumber(value)) {
                return mom;
              }
            }
          }
          dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
          mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
          return mom;
        }
        function getSetMonth(value) {
          if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
          } else {
            return get(this, "Month");
          }
        }
        function getDaysInMonth() {
          return daysInMonth(this.year(), this.month());
        }
        function monthsShortRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsShortStrictRegex;
            } else {
              return this._monthsShortRegex;
            }
          } else {
            if (!hasOwnProp(this, "_monthsShortRegex")) {
              this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
          }
        }
        function monthsRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsStrictRegex;
            } else {
              return this._monthsRegex;
            }
          } else {
            if (!hasOwnProp(this, "_monthsRegex")) {
              this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
          }
        }
        function computeMonthsParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
          for (i = 0; i < 12; i++) {
            mom = createUTC([2e3, i]);
            shortPieces.push(this.monthsShort(mom, ""));
            longPieces.push(this.months(mom, ""));
            mixedPieces.push(this.months(mom, ""));
            mixedPieces.push(this.monthsShort(mom, ""));
          }
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
          }
          for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
          }
          this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._monthsShortRegex = this._monthsRegex;
          this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
          this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
        }
        addFormatToken("Y", 0, 0, function() {
          var y = this.year();
          return y <= 9999 ? zeroFill(y, 4) : "+" + y;
        });
        addFormatToken(0, ["YY", 2], 0, function() {
          return this.year() % 100;
        });
        addFormatToken(0, ["YYYY", 4], 0, "year");
        addFormatToken(0, ["YYYYY", 5], 0, "year");
        addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
        addUnitAlias("year", "y");
        addUnitPriority("year", 1);
        addRegexToken("Y", matchSigned);
        addRegexToken("YY", match1to2, match2);
        addRegexToken("YYYY", match1to4, match4);
        addRegexToken("YYYYY", match1to6, match6);
        addRegexToken("YYYYYY", match1to6, match6);
        addParseToken(["YYYYY", "YYYYYY"], YEAR);
        addParseToken("YYYY", function(input, array) {
          array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
        });
        addParseToken("YY", function(input, array) {
          array[YEAR] = hooks.parseTwoDigitYear(input);
        });
        addParseToken("Y", function(input, array) {
          array[YEAR] = parseInt(input, 10);
        });
        function daysInYear(year) {
          return isLeapYear(year) ? 366 : 365;
        }
        hooks.parseTwoDigitYear = function(input) {
          return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
        };
        var getSetYear = makeGetSet("FullYear", true);
        function getIsLeapYear() {
          return isLeapYear(this.year());
        }
        function createDate(y, m, d, h, M, s, ms) {
          var date;
          if (y < 100 && y >= 0) {
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
              date.setFullYear(y);
            }
          } else {
            date = new Date(y, m, d, h, M, s, ms);
          }
          return date;
        }
        function createUTCDate(y) {
          var date, args;
          if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
              date.setUTCFullYear(y);
            }
          } else {
            date = new Date(Date.UTC.apply(null, arguments));
          }
          return date;
        }
        function firstWeekOffset(year, dow, doy) {
          var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
          return -fwdlw + fwd - 1;
        }
        function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
          var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
          if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
          } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
          } else {
            resYear = year;
            resDayOfYear = dayOfYear;
          }
          return {
            year: resYear,
            dayOfYear: resDayOfYear
          };
        }
        function weekOfYear(mom, dow, doy) {
          var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
          if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
          } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
          } else {
            resYear = mom.year();
            resWeek = week;
          }
          return {
            week: resWeek,
            year: resYear
          };
        }
        function weeksInYear(year, dow, doy) {
          var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
          return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
        }
        addFormatToken("w", ["ww", 2], "wo", "week");
        addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
        addUnitAlias("week", "w");
        addUnitAlias("isoWeek", "W");
        addUnitPriority("week", 5);
        addUnitPriority("isoWeek", 5);
        addRegexToken("w", match1to2);
        addRegexToken("ww", match1to2, match2);
        addRegexToken("W", match1to2);
        addRegexToken("WW", match1to2, match2);
        addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token2) {
          week[token2.substr(0, 1)] = toInt(input);
        });
        function localeWeek(mom) {
          return weekOfYear(mom, this._week.dow, this._week.doy).week;
        }
        var defaultLocaleWeek = {
          dow: 0,
          doy: 6
        };
        function localeFirstDayOfWeek() {
          return this._week.dow;
        }
        function localeFirstDayOfYear() {
          return this._week.doy;
        }
        function getSetWeek(input) {
          var week = this.localeData().week(this);
          return input == null ? week : this.add((input - week) * 7, "d");
        }
        function getSetISOWeek(input) {
          var week = weekOfYear(this, 1, 4).week;
          return input == null ? week : this.add((input - week) * 7, "d");
        }
        addFormatToken("d", 0, "do", "day");
        addFormatToken("dd", 0, 0, function(format2) {
          return this.localeData().weekdaysMin(this, format2);
        });
        addFormatToken("ddd", 0, 0, function(format2) {
          return this.localeData().weekdaysShort(this, format2);
        });
        addFormatToken("dddd", 0, 0, function(format2) {
          return this.localeData().weekdays(this, format2);
        });
        addFormatToken("e", 0, 0, "weekday");
        addFormatToken("E", 0, 0, "isoWeekday");
        addUnitAlias("day", "d");
        addUnitAlias("weekday", "e");
        addUnitAlias("isoWeekday", "E");
        addUnitPriority("day", 11);
        addUnitPriority("weekday", 11);
        addUnitPriority("isoWeekday", 11);
        addRegexToken("d", match1to2);
        addRegexToken("e", match1to2);
        addRegexToken("E", match1to2);
        addRegexToken("dd", function(isStrict, locale2) {
          return locale2.weekdaysMinRegex(isStrict);
        });
        addRegexToken("ddd", function(isStrict, locale2) {
          return locale2.weekdaysShortRegex(isStrict);
        });
        addRegexToken("dddd", function(isStrict, locale2) {
          return locale2.weekdaysRegex(isStrict);
        });
        addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
          var weekday = config._locale.weekdaysParse(input, token2, config._strict);
          if (weekday != null) {
            week.d = weekday;
          } else {
            getParsingFlags(config).invalidWeekday = input;
          }
        });
        addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
          week[token2] = toInt(input);
        });
        function parseWeekday(input, locale2) {
          if (typeof input !== "string") {
            return input;
          }
          if (!isNaN(input)) {
            return parseInt(input, 10);
          }
          input = locale2.weekdaysParse(input);
          if (typeof input === "number") {
            return input;
          }
          return null;
        }
        function parseIsoWeekday(input, locale2) {
          if (typeof input === "string") {
            return locale2.weekdaysParse(input) % 7 || 7;
          }
          return isNaN(input) ? null : input;
        }
        function shiftWeekdays(ws, n) {
          return ws.slice(n, 7).concat(ws.slice(0, n));
        }
        var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
        function localeWeekdays(m, format2) {
          var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
          return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
        }
        function localeWeekdaysShort(m) {
          return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
        }
        function localeWeekdaysMin(m) {
          return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
        }
        function handleStrictParse$1(weekdayName, format2, strict) {
          var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];
            for (i = 0; i < 7; ++i) {
              mom = createUTC([2e3, 1]).day(i);
              this._minWeekdaysParse[i] = this.weekdaysMin(mom, "").toLocaleLowerCase();
              this._shortWeekdaysParse[i] = this.weekdaysShort(mom, "").toLocaleLowerCase();
              this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format2 === "dddd") {
              ii = indexOf.call(this._weekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format2 === "ddd") {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format2 === "dddd") {
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format2 === "ddd") {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeWeekdaysParse(weekdayName, format2, strict) {
          var i, mom, regex;
          if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format2, strict);
          }
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
          }
          for (i = 0; i < 7; i++) {
            mom = createUTC([2e3, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
              this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(mom, "").replace(".", "\\.?") + "$", "i");
              this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$", "i");
              this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$", "i");
            }
            if (!this._weekdaysParse[i]) {
              regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
              this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
              return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
              return i;
            }
          }
        }
        function getSetDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
          if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, "d");
          } else {
            return day;
          }
        }
        function getSetLocaleDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
          return input == null ? weekday : this.add(input - weekday, "d");
        }
        function getSetISODayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
          } else {
            return this.day() || 7;
          }
        }
        function weekdaysRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysStrictRegex;
            } else {
              return this._weekdaysRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
          }
        }
        function weekdaysShortRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysShortStrictRegex;
            } else {
              return this._weekdaysShortRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysShortRegex")) {
              this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
          }
        }
        function weekdaysMinRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysMinStrictRegex;
            } else {
              return this._weekdaysMinRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysMinRegex")) {
              this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
          }
        }
        function computeWeekdaysParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
          for (i = 0; i < 7; i++) {
            mom = createUTC([2e3, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ""));
            shortp = regexEscape(this.weekdaysShort(mom, ""));
            longp = regexEscape(this.weekdays(mom, ""));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
          }
          minPieces.sort(cmpLenRev);
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._weekdaysShortRegex = this._weekdaysRegex;
          this._weekdaysMinRegex = this._weekdaysRegex;
          this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
          this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
          this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join("|") + ")", "i");
        }
        function hFormat() {
          return this.hours() % 12 || 12;
        }
        function kFormat() {
          return this.hours() || 24;
        }
        addFormatToken("H", ["HH", 2], 0, "hour");
        addFormatToken("h", ["hh", 2], 0, hFormat);
        addFormatToken("k", ["kk", 2], 0, kFormat);
        addFormatToken("hmm", 0, 0, function() {
          return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
        });
        addFormatToken("hmmss", 0, 0, function() {
          return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
        });
        addFormatToken("Hmm", 0, 0, function() {
          return "" + this.hours() + zeroFill(this.minutes(), 2);
        });
        addFormatToken("Hmmss", 0, 0, function() {
          return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
        });
        function meridiem(token2, lowercase) {
          addFormatToken(token2, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
          });
        }
        meridiem("a", true);
        meridiem("A", false);
        addUnitAlias("hour", "h");
        addUnitPriority("hour", 13);
        function matchMeridiem(isStrict, locale2) {
          return locale2._meridiemParse;
        }
        addRegexToken("a", matchMeridiem);
        addRegexToken("A", matchMeridiem);
        addRegexToken("H", match1to2);
        addRegexToken("h", match1to2);
        addRegexToken("k", match1to2);
        addRegexToken("HH", match1to2, match2);
        addRegexToken("hh", match1to2, match2);
        addRegexToken("kk", match1to2, match2);
        addRegexToken("hmm", match3to4);
        addRegexToken("hmmss", match5to6);
        addRegexToken("Hmm", match3to4);
        addRegexToken("Hmmss", match5to6);
        addParseToken(["H", "HH"], HOUR);
        addParseToken(["k", "kk"], function(input, array, config) {
          var kInput = toInt(input);
          array[HOUR] = kInput === 24 ? 0 : kInput;
        });
        addParseToken(["a", "A"], function(input, array, config) {
          config._isPm = config._locale.isPM(input);
          config._meridiem = input;
        });
        addParseToken(["h", "hh"], function(input, array, config) {
          array[HOUR] = toInt(input);
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("hmm", function(input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("hmmss", function(input, array, config) {
          var pos1 = input.length - 4, pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("Hmm", function(input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
        });
        addParseToken("Hmmss", function(input, array, config) {
          var pos1 = input.length - 4, pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
        });
        function localeIsPM(input) {
          return (input + "").toLowerCase().charAt(0) === "p";
        }
        var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
        function localeMeridiem(hours2, minutes2, isLower) {
          if (hours2 > 11) {
            return isLower ? "pm" : "PM";
          } else {
            return isLower ? "am" : "AM";
          }
        }
        var baseConfig = {
          calendar: defaultCalendar,
          longDateFormat: defaultLongDateFormat,
          invalidDate: defaultInvalidDate,
          ordinal: defaultOrdinal,
          dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
          relativeTime: defaultRelativeTime,
          months: defaultLocaleMonths,
          monthsShort: defaultLocaleMonthsShort,
          week: defaultLocaleWeek,
          weekdays: defaultLocaleWeekdays,
          weekdaysMin: defaultLocaleWeekdaysMin,
          weekdaysShort: defaultLocaleWeekdaysShort,
          meridiemParse: defaultLocaleMeridiemParse
        };
        var locales = {}, localeFamilies = {}, globalLocale;
        function commonPrefix(arr1, arr2) {
          var i, minl = Math.min(arr1.length, arr2.length);
          for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
              return i;
            }
          }
          return minl;
        }
        function normalizeLocale(key) {
          return key ? key.toLowerCase().replace("_", "-") : key;
        }
        function chooseLocale(names) {
          var i = 0, j, next, locale2, split;
          while (i < names.length) {
            split = normalizeLocale(names[i]).split("-");
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split("-") : null;
            while (j > 0) {
              locale2 = loadLocale(split.slice(0, j).join("-"));
              if (locale2) {
                return locale2;
              }
              if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
                break;
              }
              j--;
            }
            i++;
          }
          return globalLocale;
        }
        function loadLocale(name) {
          var oldLocale = null, aliasedRequire;
          if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports) {
            try {
              oldLocale = globalLocale._abbr;
              aliasedRequire = __require;
              aliasedRequire("./locale/" + name);
              getSetGlobalLocale(oldLocale);
            } catch (e) {
              locales[name] = null;
            }
          }
          return locales[name];
        }
        function getSetGlobalLocale(key, values) {
          var data;
          if (key) {
            if (isUndefined(values)) {
              data = getLocale(key);
            } else {
              data = defineLocale(key, values);
            }
            if (data) {
              globalLocale = data;
            } else {
              if (typeof console !== "undefined" && console.warn) {
                console.warn("Locale " + key + " not found. Did you forget to load it?");
              }
            }
          }
          return globalLocale._abbr;
        }
        function defineLocale(name, config) {
          if (config !== null) {
            var locale2, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
              deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
              parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
              if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
              } else {
                locale2 = loadLocale(config.parentLocale);
                if (locale2 != null) {
                  parentConfig = locale2._config;
                } else {
                  if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                  }
                  localeFamilies[config.parentLocale].push({
                    name,
                    config
                  });
                  return null;
                }
              }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));
            if (localeFamilies[name]) {
              localeFamilies[name].forEach(function(x) {
                defineLocale(x.name, x.config);
              });
            }
            getSetGlobalLocale(name);
            return locales[name];
          } else {
            delete locales[name];
            return null;
          }
        }
        function updateLocale(name, config) {
          if (config != null) {
            var locale2, tmpLocale, parentConfig = baseConfig;
            if (locales[name] != null && locales[name].parentLocale != null) {
              locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
              tmpLocale = loadLocale(name);
              if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
              }
              config = mergeConfigs(parentConfig, config);
              if (tmpLocale == null) {
                config.abbr = name;
              }
              locale2 = new Locale(config);
              locale2.parentLocale = locales[name];
              locales[name] = locale2;
            }
            getSetGlobalLocale(name);
          } else {
            if (locales[name] != null) {
              if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
                if (name === getSetGlobalLocale()) {
                  getSetGlobalLocale(name);
                }
              } else if (locales[name] != null) {
                delete locales[name];
              }
            }
          }
          return locales[name];
        }
        function getLocale(key) {
          var locale2;
          if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
          }
          if (!key) {
            return globalLocale;
          }
          if (!isArray(key)) {
            locale2 = loadLocale(key);
            if (locale2) {
              return locale2;
            }
            key = [key];
          }
          return chooseLocale(key);
        }
        function listLocales() {
          return keys(locales);
        }
        function checkOverflow(m) {
          var overflow, a = m._a;
          if (a && getParsingFlags(m).overflow === -2) {
            overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
              overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
              overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
              overflow = WEEKDAY;
            }
            getParsingFlags(m).overflow = overflow;
          }
          return m;
        }
        var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
          ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
          ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
          ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
          ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
          ["YYYY-DDD", /\d{4}-\d{3}/],
          ["YYYY-MM", /\d{4}-\d\d/, false],
          ["YYYYYYMMDD", /[+-]\d{10}/],
          ["YYYYMMDD", /\d{8}/],
          ["GGGG[W]WWE", /\d{4}W\d{3}/],
          ["GGGG[W]WW", /\d{4}W\d{2}/, false],
          ["YYYYDDD", /\d{7}/],
          ["YYYYMM", /\d{6}/, false],
          ["YYYY", /\d{4}/, false]
        ], isoTimes = [
          ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
          ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
          ["HH:mm:ss", /\d\d:\d\d:\d\d/],
          ["HH:mm", /\d\d:\d\d/],
          ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
          ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
          ["HHmmss", /\d\d\d\d\d\d/],
          ["HHmm", /\d\d\d\d/],
          ["HH", /\d\d/]
        ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
          UT: 0,
          GMT: 0,
          EDT: -4 * 60,
          EST: -5 * 60,
          CDT: -5 * 60,
          CST: -6 * 60,
          MDT: -6 * 60,
          MST: -7 * 60,
          PDT: -7 * 60,
          PST: -8 * 60
        };
        function configFromISO(config) {
          var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat;
          if (match) {
            getParsingFlags(config).iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
              if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
              }
            }
            if (dateFormat == null) {
              config._isValid = false;
              return;
            }
            if (match[3]) {
              for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                  timeFormat = (match[2] || " ") + isoTimes[i][0];
                  break;
                }
              }
              if (timeFormat == null) {
                config._isValid = false;
                return;
              }
            }
            if (!allowTime && timeFormat != null) {
              config._isValid = false;
              return;
            }
            if (match[4]) {
              if (tzRegex.exec(match[4])) {
                tzFormat = "Z";
              } else {
                config._isValid = false;
                return;
              }
            }
            config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
            configFromStringAndFormat(config);
          } else {
            config._isValid = false;
          }
        }
        function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
          var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
          ];
          if (secondStr) {
            result.push(parseInt(secondStr, 10));
          }
          return result;
        }
        function untruncateYear(yearStr) {
          var year = parseInt(yearStr, 10);
          if (year <= 49) {
            return 2e3 + year;
          } else if (year <= 999) {
            return 1900 + year;
          }
          return year;
        }
        function preprocessRFC2822(s) {
          return s.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        }
        function checkWeekday(weekdayStr, parsedInput, config) {
          if (weekdayStr) {
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
              getParsingFlags(config).weekdayMismatch = true;
              config._isValid = false;
              return false;
            }
          }
          return true;
        }
        function calculateOffset(obsOffset, militaryOffset, numOffset) {
          if (obsOffset) {
            return obsOffsets[obsOffset];
          } else if (militaryOffset) {
            return 0;
          } else {
            var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
          }
        }
        function configFromRFC2822(config) {
          var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
          if (match) {
            parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
              return;
            }
            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);
            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
            getParsingFlags(config).rfc2822 = true;
          } else {
            config._isValid = false;
          }
        }
        function configFromString(config) {
          var matched = aspNetJsonRegex.exec(config._i);
          if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
          }
          configFromISO(config);
          if (config._isValid === false) {
            delete config._isValid;
          } else {
            return;
          }
          configFromRFC2822(config);
          if (config._isValid === false) {
            delete config._isValid;
          } else {
            return;
          }
          if (config._strict) {
            config._isValid = false;
          } else {
            hooks.createFromInputFallback(config);
          }
        }
        hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(config) {
          config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
        });
        function defaults(a, b, c) {
          if (a != null) {
            return a;
          }
          if (b != null) {
            return b;
          }
          return c;
        }
        function currentDateArray(config) {
          var nowValue = new Date(hooks.now());
          if (config._useUTC) {
            return [
              nowValue.getUTCFullYear(),
              nowValue.getUTCMonth(),
              nowValue.getUTCDate()
            ];
          }
          return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
        }
        function configFromArray(config) {
          var i, date, input = [], currentDate, expectedWeekday, yearToUse;
          if (config._d) {
            return;
          }
          currentDate = currentDateArray(config);
          if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
          }
          if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
              getParsingFlags(config)._overflowDayOfYear = true;
            }
            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
          }
          for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
          }
          for (; i < 7; i++) {
            config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
          }
          if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
          }
          config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
          expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
          if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          }
          if (config._nextDay) {
            config._a[HOUR] = 24;
          }
          if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
          }
        }
        function dayOfYearFromWeekInfo(config) {
          var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
          w = config._w;
          if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
              weekdayOverflow = true;
            }
          } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            curWeek = weekOfYear(createLocal(), dow, doy);
            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
            week = defaults(w.w, curWeek.week);
            if (w.d != null) {
              weekday = w.d;
              if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
              }
            } else if (w.e != null) {
              weekday = w.e + dow;
              if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
              }
            } else {
              weekday = dow;
            }
          }
          if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
          } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
          } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
          }
        }
        hooks.ISO_8601 = function() {
        };
        hooks.RFC_2822 = function() {
        };
        function configFromStringAndFormat(config) {
          if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
          }
          if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
          }
          config._a = [];
          getParsingFlags(config).empty = true;
          var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era;
          tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
          for (i = 0; i < tokens2.length; i++) {
            token2 = tokens2[i];
            parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
            if (parsedInput) {
              skipped = string.substr(0, string.indexOf(parsedInput));
              if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
              }
              string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
              totalParsedInputLength += parsedInput.length;
            }
            if (formatTokenFunctions[token2]) {
              if (parsedInput) {
                getParsingFlags(config).empty = false;
              } else {
                getParsingFlags(config).unusedTokens.push(token2);
              }
              addTimeToArrayFromToken(token2, parsedInput, config);
            } else if (config._strict && !parsedInput) {
              getParsingFlags(config).unusedTokens.push(token2);
            }
          }
          getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
          if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
          }
          if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = void 0;
          }
          getParsingFlags(config).parsedDateParts = config._a.slice(0);
          getParsingFlags(config).meridiem = config._meridiem;
          config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
          era = getParsingFlags(config).era;
          if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
          }
          configFromArray(config);
          checkOverflow(config);
        }
        function meridiemFixWrap(locale2, hour, meridiem2) {
          var isPm;
          if (meridiem2 == null) {
            return hour;
          }
          if (locale2.meridiemHour != null) {
            return locale2.meridiemHour(hour, meridiem2);
          } else if (locale2.isPM != null) {
            isPm = locale2.isPM(meridiem2);
            if (isPm && hour < 12) {
              hour += 12;
            }
            if (!isPm && hour === 12) {
              hour = 0;
            }
            return hour;
          } else {
            return hour;
          }
        }
        function configFromStringAndArray(config) {
          var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false;
          if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
          }
          for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
              tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);
            if (isValid(tempConfig)) {
              validFormatFound = true;
            }
            currentScore += getParsingFlags(tempConfig).charsLeftOver;
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
            getParsingFlags(tempConfig).score = currentScore;
            if (!bestFormatIsValid) {
              if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
                if (validFormatFound) {
                  bestFormatIsValid = true;
                }
              }
            } else {
              if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
              }
            }
          }
          extend(config, bestMoment || tempConfig);
        }
        function configFromObject(config) {
          if (config._d) {
            return;
          }
          var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
          config._a = map([i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond], function(obj) {
            return obj && parseInt(obj, 10);
          });
          configFromArray(config);
        }
        function createFromConfig(config) {
          var res = new Moment(checkOverflow(prepareConfig(config)));
          if (res._nextDay) {
            res.add(1, "d");
            res._nextDay = void 0;
          }
          return res;
        }
        function prepareConfig(config) {
          var input = config._i, format2 = config._f;
          config._locale = config._locale || getLocale(config._l);
          if (input === null || format2 === void 0 && input === "") {
            return createInvalid({ nullInput: true });
          }
          if (typeof input === "string") {
            config._i = input = config._locale.preparse(input);
          }
          if (isMoment(input)) {
            return new Moment(checkOverflow(input));
          } else if (isDate(input)) {
            config._d = input;
          } else if (isArray(format2)) {
            configFromStringAndArray(config);
          } else if (format2) {
            configFromStringAndFormat(config);
          } else {
            configFromInput(config);
          }
          if (!isValid(config)) {
            config._d = null;
          }
          return config;
        }
        function configFromInput(config) {
          var input = config._i;
          if (isUndefined(input)) {
            config._d = new Date(hooks.now());
          } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
          } else if (typeof input === "string") {
            configFromString(config);
          } else if (isArray(input)) {
            config._a = map(input.slice(0), function(obj) {
              return parseInt(obj, 10);
            });
            configFromArray(config);
          } else if (isObject(input)) {
            configFromObject(config);
          } else if (isNumber(input)) {
            config._d = new Date(input);
          } else {
            hooks.createFromInputFallback(config);
          }
        }
        function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
          var c = {};
          if (format2 === true || format2 === false) {
            strict = format2;
            format2 = void 0;
          }
          if (locale2 === true || locale2 === false) {
            strict = locale2;
            locale2 = void 0;
          }
          if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
            input = void 0;
          }
          c._isAMomentObject = true;
          c._useUTC = c._isUTC = isUTC;
          c._l = locale2;
          c._i = input;
          c._f = format2;
          c._strict = strict;
          return createFromConfig(c);
        }
        function createLocal(input, format2, locale2, strict) {
          return createLocalOrUTC(input, format2, locale2, strict, false);
        }
        var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
          } else {
            return createInvalid();
          }
        }), prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
          } else {
            return createInvalid();
          }
        });
        function pickBy(fn, moments) {
          var res, i;
          if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
          }
          if (!moments.length) {
            return createLocal();
          }
          res = moments[0];
          for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
              res = moments[i];
            }
          }
          return res;
        }
        function min() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isBefore", args);
        }
        function max() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isAfter", args);
        }
        var now = function() {
          return Date.now ? Date.now() : +new Date();
        };
        var ordering = [
          "year",
          "quarter",
          "month",
          "week",
          "day",
          "hour",
          "minute",
          "second",
          "millisecond"
        ];
        function isDurationValid(m) {
          var key, unitHasDecimal = false, i;
          for (key in m) {
            if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
              return false;
            }
          }
          for (i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
              if (unitHasDecimal) {
                return false;
              }
              if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
              }
            }
          }
          return true;
        }
        function isValid$1() {
          return this._isValid;
        }
        function createInvalid$1() {
          return createDuration(NaN);
        }
        function Duration(duration) {
          var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
          this._isValid = isDurationValid(normalizedInput);
          this._milliseconds = +milliseconds2 + seconds2 * 1e3 + minutes2 * 6e4 + hours2 * 1e3 * 60 * 60;
          this._days = +days2 + weeks2 * 7;
          this._months = +months2 + quarters * 3 + years2 * 12;
          this._data = {};
          this._locale = getLocale();
          this._bubble();
        }
        function isDuration(obj) {
          return obj instanceof Duration;
        }
        function absRound(number) {
          if (number < 0) {
            return Math.round(-1 * number) * -1;
          } else {
            return Math.round(number);
          }
        }
        function compareArrays(array1, array2, dontConvert) {
          var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
          for (i = 0; i < len; i++) {
            if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
              diffs++;
            }
          }
          return diffs + lengthDiff;
        }
        function offset(token2, separator) {
          addFormatToken(token2, 0, 0, function() {
            var offset2 = this.utcOffset(), sign2 = "+";
            if (offset2 < 0) {
              offset2 = -offset2;
              sign2 = "-";
            }
            return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
          });
        }
        offset("Z", ":");
        offset("ZZ", "");
        addRegexToken("Z", matchShortOffset);
        addRegexToken("ZZ", matchShortOffset);
        addParseToken(["Z", "ZZ"], function(input, array, config) {
          config._useUTC = true;
          config._tzm = offsetFromString(matchShortOffset, input);
        });
        var chunkOffset = /([\+\-]|\d\d)/gi;
        function offsetFromString(matcher, string) {
          var matches = (string || "").match(matcher), chunk, parts, minutes2;
          if (matches === null) {
            return null;
          }
          chunk = matches[matches.length - 1] || [];
          parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
          minutes2 = +(parts[1] * 60) + toInt(parts[2]);
          return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
        }
        function cloneWithOffset(input, model) {
          var res, diff2;
          if (model._isUTC) {
            res = model.clone();
            diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            res._d.setTime(res._d.valueOf() + diff2);
            hooks.updateOffset(res, false);
            return res;
          } else {
            return createLocal(input).local();
          }
        }
        function getDateOffset(m) {
          return -Math.round(m._d.getTimezoneOffset());
        }
        hooks.updateOffset = function() {
        };
        function getSetOffset(input, keepLocalTime, keepMinutes) {
          var offset2 = this._offset || 0, localAdjust;
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          if (input != null) {
            if (typeof input === "string") {
              input = offsetFromString(matchShortOffset, input);
              if (input === null) {
                return this;
              }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
              input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
              localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
              this.add(localAdjust, "m");
            }
            if (offset2 !== input) {
              if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset2, "m"), 1, false);
              } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
              }
            }
            return this;
          } else {
            return this._isUTC ? offset2 : getDateOffset(this);
          }
        }
        function getSetZone(input, keepLocalTime) {
          if (input != null) {
            if (typeof input !== "string") {
              input = -input;
            }
            this.utcOffset(input, keepLocalTime);
            return this;
          } else {
            return -this.utcOffset();
          }
        }
        function setOffsetToUTC(keepLocalTime) {
          return this.utcOffset(0, keepLocalTime);
        }
        function setOffsetToLocal(keepLocalTime) {
          if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;
            if (keepLocalTime) {
              this.subtract(getDateOffset(this), "m");
            }
          }
          return this;
        }
        function setOffsetToParsedOffset() {
          if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
          } else if (typeof this._i === "string") {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
              this.utcOffset(tZone);
            } else {
              this.utcOffset(0, true);
            }
          }
          return this;
        }
        function hasAlignedHourOffset(input) {
          if (!this.isValid()) {
            return false;
          }
          input = input ? createLocal(input).utcOffset() : 0;
          return (this.utcOffset() - input) % 60 === 0;
        }
        function isDaylightSavingTime() {
          return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
        }
        function isDaylightSavingTimeShifted() {
          if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
          }
          var c = {}, other;
          copyConfig(c, this);
          c = prepareConfig(c);
          if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
          } else {
            this._isDSTShifted = false;
          }
          return this._isDSTShifted;
        }
        function isLocal() {
          return this.isValid() ? !this._isUTC : false;
        }
        function isUtcOffset() {
          return this.isValid() ? this._isUTC : false;
        }
        function isUtc() {
          return this.isValid() ? this._isUTC && this._offset === 0 : false;
        }
        var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
        function createDuration(input, key) {
          var duration = input, match = null, sign2, ret, diffRes;
          if (isDuration(input)) {
            duration = {
              ms: input._milliseconds,
              d: input._days,
              M: input._months
            };
          } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
              duration[key] = +input;
            } else {
              duration.milliseconds = +input;
            }
          } else if (match = aspNetRegex.exec(input)) {
            sign2 = match[1] === "-" ? -1 : 1;
            duration = {
              y: 0,
              d: toInt(match[DATE]) * sign2,
              h: toInt(match[HOUR]) * sign2,
              m: toInt(match[MINUTE]) * sign2,
              s: toInt(match[SECOND]) * sign2,
              ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
            };
          } else if (match = isoRegex.exec(input)) {
            sign2 = match[1] === "-" ? -1 : 1;
            duration = {
              y: parseIso(match[2], sign2),
              M: parseIso(match[3], sign2),
              w: parseIso(match[4], sign2),
              d: parseIso(match[5], sign2),
              h: parseIso(match[6], sign2),
              m: parseIso(match[7], sign2),
              s: parseIso(match[8], sign2)
            };
          } else if (duration == null) {
            duration = {};
          } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
          }
          ret = new Duration(duration);
          if (isDuration(input) && hasOwnProp(input, "_locale")) {
            ret._locale = input._locale;
          }
          if (isDuration(input) && hasOwnProp(input, "_isValid")) {
            ret._isValid = input._isValid;
          }
          return ret;
        }
        createDuration.fn = Duration.prototype;
        createDuration.invalid = createInvalid$1;
        function parseIso(inp, sign2) {
          var res = inp && parseFloat(inp.replace(",", "."));
          return (isNaN(res) ? 0 : res) * sign2;
        }
        function positiveMomentsDifference(base, other) {
          var res = {};
          res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
          if (base.clone().add(res.months, "M").isAfter(other)) {
            --res.months;
          }
          res.milliseconds = +other - +base.clone().add(res.months, "M");
          return res;
        }
        function momentsDifference(base, other) {
          var res;
          if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
          }
          other = cloneWithOffset(other, base);
          if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
          } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
          }
          return res;
        }
        function createAdder(direction, name) {
          return function(val, period) {
            var dur, tmp;
            if (period !== null && !isNaN(+period)) {
              deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
              tmp = val;
              val = period;
              period = tmp;
            }
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
          };
        }
        function addSubtract(mom, duration, isAdding, updateOffset) {
          var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
          if (!mom.isValid()) {
            return;
          }
          updateOffset = updateOffset == null ? true : updateOffset;
          if (months2) {
            setMonth(mom, get(mom, "Month") + months2 * isAdding);
          }
          if (days2) {
            set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
          }
          if (milliseconds2) {
            mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
          }
          if (updateOffset) {
            hooks.updateOffset(mom, days2 || months2);
          }
        }
        var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
        function isString(input) {
          return typeof input === "string" || input instanceof String;
        }
        function isMomentInput(input) {
          return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
        }
        function isMomentInputObject(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            "years",
            "year",
            "y",
            "months",
            "month",
            "M",
            "days",
            "day",
            "d",
            "dates",
            "date",
            "D",
            "hours",
            "hour",
            "h",
            "minutes",
            "minute",
            "m",
            "seconds",
            "second",
            "s",
            "milliseconds",
            "millisecond",
            "ms"
          ], i, property;
          for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
          }
          return objectTest && propertyTest;
        }
        function isNumberOrStringArray(input) {
          var arrayTest = isArray(input), dataTypeTest = false;
          if (arrayTest) {
            dataTypeTest = input.filter(function(item) {
              return !isNumber(item) && isString(input);
            }).length === 0;
          }
          return arrayTest && dataTypeTest;
        }
        function isCalendarSpec(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            "sameDay",
            "nextDay",
            "lastDay",
            "nextWeek",
            "lastWeek",
            "sameElse"
          ], i, property;
          for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
          }
          return objectTest && propertyTest;
        }
        function getCalendarFormat(myMoment, now2) {
          var diff2 = myMoment.diff(now2, "days", true);
          return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
        }
        function calendar$1(time, formats) {
          if (arguments.length === 1) {
            if (!arguments[0]) {
              time = void 0;
              formats = void 0;
            } else if (isMomentInput(arguments[0])) {
              time = arguments[0];
              formats = void 0;
            } else if (isCalendarSpec(arguments[0])) {
              formats = arguments[0];
              time = void 0;
            }
          }
          var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
          return this.format(output || this.localeData().calendar(format2, this, createLocal(now2)));
        }
        function clone() {
          return new Moment(this);
        }
        function isAfter(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() > localInput.valueOf();
          } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
          }
        }
        function isBefore(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() < localInput.valueOf();
          } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
          }
        }
        function isBetween(from2, to2, units, inclusivity) {
          var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
          if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
          }
          inclusivity = inclusivity || "()";
          return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
        }
        function isSame(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input), inputMs;
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() === localInput.valueOf();
          } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
          }
        }
        function isSameOrAfter(input, units) {
          return this.isSame(input, units) || this.isAfter(input, units);
        }
        function isSameOrBefore(input, units) {
          return this.isSame(input, units) || this.isBefore(input, units);
        }
        function diff(input, units, asFloat) {
          var that, zoneDelta, output;
          if (!this.isValid()) {
            return NaN;
          }
          that = cloneWithOffset(input, this);
          if (!that.isValid()) {
            return NaN;
          }
          zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
          units = normalizeUnits(units);
          switch (units) {
            case "year":
              output = monthDiff(this, that) / 12;
              break;
            case "month":
              output = monthDiff(this, that);
              break;
            case "quarter":
              output = monthDiff(this, that) / 3;
              break;
            case "second":
              output = (this - that) / 1e3;
              break;
            case "minute":
              output = (this - that) / 6e4;
              break;
            case "hour":
              output = (this - that) / 36e5;
              break;
            case "day":
              output = (this - that - zoneDelta) / 864e5;
              break;
            case "week":
              output = (this - that - zoneDelta) / 6048e5;
              break;
            default:
              output = this - that;
          }
          return asFloat ? output : absFloor(output);
        }
        function monthDiff(a, b) {
          if (a.date() < b.date()) {
            return -monthDiff(b, a);
          }
          var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
          if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
            adjust = (b - anchor) / (anchor - anchor2);
          } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
            adjust = (b - anchor) / (anchor2 - anchor);
          }
          return -(wholeMonthDiff + adjust) || 0;
        }
        hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        function toString() {
          return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        }
        function toISOString(keepOffset) {
          if (!this.isValid()) {
            return null;
          }
          var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
          if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ");
          }
          if (isFunction(Date.prototype.toISOString)) {
            if (utc) {
              return this.toDate().toISOString();
            } else {
              return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
            }
          }
          return formatMoment(m, utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
        }
        function inspect() {
          if (!this.isValid()) {
            return "moment.invalid(/* " + this._i + " */)";
          }
          var func = "moment", zone = "", prefix, year, datetime, suffix;
          if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
            zone = "Z";
          }
          prefix = "[" + func + '("]';
          year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
          datetime = "-MM-DD[T]HH:mm:ss.SSS";
          suffix = zone + '[")]';
          return this.format(prefix + year + datetime + suffix);
        }
        function format(inputString) {
          if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
          }
          var output = formatMoment(this, inputString);
          return this.localeData().postformat(output);
        }
        function from(time, withoutSuffix) {
          if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function fromNow(withoutSuffix) {
          return this.from(createLocal(), withoutSuffix);
        }
        function to(time, withoutSuffix) {
          if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function toNow(withoutSuffix) {
          return this.to(createLocal(), withoutSuffix);
        }
        function locale(key) {
          var newLocaleData;
          if (key === void 0) {
            return this._locale._abbr;
          } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
              this._locale = newLocaleData;
            }
            return this;
          }
        }
        var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
          if (key === void 0) {
            return this.localeData();
          } else {
            return this.locale(key);
          }
        });
        function localeData() {
          return this._locale;
        }
        var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
        function mod$1(dividend, divisor) {
          return (dividend % divisor + divisor) % divisor;
        }
        function localStartOfDate(y, m, d) {
          if (y < 100 && y >= 0) {
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
            return new Date(y, m, d).valueOf();
          }
        }
        function utcStartOfDate(y, m, d) {
          if (y < 100 && y >= 0) {
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
            return Date.UTC(y, m, d);
          }
        }
        function startOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === void 0 || units === "millisecond" || !this.isValid()) {
            return this;
          }
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
          switch (units) {
            case "year":
              time = startOfDate(this.year(), 0, 1);
              break;
            case "quarter":
              time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
              break;
            case "month":
              time = startOfDate(this.year(), this.month(), 1);
              break;
            case "week":
              time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
              break;
            case "isoWeek":
              time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
              break;
            case "day":
            case "date":
              time = startOfDate(this.year(), this.month(), this.date());
              break;
            case "hour":
              time = this._d.valueOf();
              time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
              break;
            case "minute":
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_MINUTE);
              break;
            case "second":
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_SECOND);
              break;
          }
          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
        }
        function endOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (units === void 0 || units === "millisecond" || !this.isValid()) {
            return this;
          }
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
          switch (units) {
            case "year":
              time = startOfDate(this.year() + 1, 0, 1) - 1;
              break;
            case "quarter":
              time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
              break;
            case "month":
              time = startOfDate(this.year(), this.month() + 1, 1) - 1;
              break;
            case "week":
              time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
              break;
            case "isoWeek":
              time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
              break;
            case "day":
            case "date":
              time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
              break;
            case "hour":
              time = this._d.valueOf();
              time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
              break;
            case "minute":
              time = this._d.valueOf();
              time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
              break;
            case "second":
              time = this._d.valueOf();
              time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
              break;
          }
          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
        }
        function valueOf() {
          return this._d.valueOf() - (this._offset || 0) * 6e4;
        }
        function unix() {
          return Math.floor(this.valueOf() / 1e3);
        }
        function toDate() {
          return new Date(this.valueOf());
        }
        function toArray() {
          var m = this;
          return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond()
          ];
        }
        function toObject() {
          var m = this;
          return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
          };
        }
        function toJSON() {
          return this.isValid() ? this.toISOString() : null;
        }
        function isValid$2() {
          return isValid(this);
        }
        function parsingFlags() {
          return extend({}, getParsingFlags(this));
        }
        function invalidAt() {
          return getParsingFlags(this).overflow;
        }
        function creationData() {
          return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
          };
        }
        addFormatToken("N", 0, 0, "eraAbbr");
        addFormatToken("NN", 0, 0, "eraAbbr");
        addFormatToken("NNN", 0, 0, "eraAbbr");
        addFormatToken("NNNN", 0, 0, "eraName");
        addFormatToken("NNNNN", 0, 0, "eraNarrow");
        addFormatToken("y", ["y", 1], "yo", "eraYear");
        addFormatToken("y", ["yy", 2], 0, "eraYear");
        addFormatToken("y", ["yyy", 3], 0, "eraYear");
        addFormatToken("y", ["yyyy", 4], 0, "eraYear");
        addRegexToken("N", matchEraAbbr);
        addRegexToken("NN", matchEraAbbr);
        addRegexToken("NNN", matchEraAbbr);
        addRegexToken("NNNN", matchEraName);
        addRegexToken("NNNNN", matchEraNarrow);
        addParseToken(["N", "NN", "NNN", "NNNN", "NNNNN"], function(input, array, config, token2) {
          var era = config._locale.erasParse(input, token2, config._strict);
          if (era) {
            getParsingFlags(config).era = era;
          } else {
            getParsingFlags(config).invalidEra = input;
          }
        });
        addRegexToken("y", matchUnsigned);
        addRegexToken("yy", matchUnsigned);
        addRegexToken("yyy", matchUnsigned);
        addRegexToken("yyyy", matchUnsigned);
        addRegexToken("yo", matchEraYearOrdinal);
        addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
        addParseToken(["yo"], function(input, array, config, token2) {
          var match;
          if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
          }
          if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
          } else {
            array[YEAR] = parseInt(input, 10);
          }
        });
        function localeEras(m, format2) {
          var i, l, date, eras = this._eras || getLocale("en")._eras;
          for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
              case "string":
                date = hooks(eras[i].since).startOf("day");
                eras[i].since = date.valueOf();
                break;
            }
            switch (typeof eras[i].until) {
              case "undefined":
                eras[i].until = Infinity;
                break;
              case "string":
                date = hooks(eras[i].until).startOf("day").valueOf();
                eras[i].until = date.valueOf();
                break;
            }
          }
          return eras;
        }
        function localeErasParse(eraName, format2, strict) {
          var i, l, eras = this.eras(), name, abbr, narrow;
          eraName = eraName.toUpperCase();
          for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();
            if (strict) {
              switch (format2) {
                case "N":
                case "NN":
                case "NNN":
                  if (abbr === eraName) {
                    return eras[i];
                  }
                  break;
                case "NNNN":
                  if (name === eraName) {
                    return eras[i];
                  }
                  break;
                case "NNNNN":
                  if (narrow === eraName) {
                    return eras[i];
                  }
                  break;
              }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
              return eras[i];
            }
          }
        }
        function localeErasConvertYear(era, year) {
          var dir = era.since <= era.until ? 1 : -1;
          if (year === void 0) {
            return hooks(era.since).year();
          } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
          }
        }
        function getEraName() {
          var i, l, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].name;
            }
          }
          return "";
        }
        function getEraNarrow() {
          var i, l, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].narrow;
            }
          }
          return "";
        }
        function getEraAbbr() {
          var i, l, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].abbr;
            }
          }
          return "";
        }
        function getEraYear() {
          var i, l, dir, val, eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? 1 : -1;
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
              return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
            }
          }
          return this.year();
        }
        function erasNameRegex(isStrict) {
          if (!hasOwnProp(this, "_erasNameRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasNameRegex : this._erasRegex;
        }
        function erasAbbrRegex(isStrict) {
          if (!hasOwnProp(this, "_erasAbbrRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasAbbrRegex : this._erasRegex;
        }
        function erasNarrowRegex(isStrict) {
          if (!hasOwnProp(this, "_erasNarrowRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasNarrowRegex : this._erasRegex;
        }
        function matchEraAbbr(isStrict, locale2) {
          return locale2.erasAbbrRegex(isStrict);
        }
        function matchEraName(isStrict, locale2) {
          return locale2.erasNameRegex(isStrict);
        }
        function matchEraNarrow(isStrict, locale2) {
          return locale2.erasNarrowRegex(isStrict);
        }
        function matchEraYearOrdinal(isStrict, locale2) {
          return locale2._eraYearOrdinalRegex || matchUnsigned;
        }
        function computeErasParse() {
          var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, eras = this.eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));
            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
          }
          this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
          this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
          this._erasNarrowRegex = new RegExp("^(" + narrowPieces.join("|") + ")", "i");
        }
        addFormatToken(0, ["gg", 2], 0, function() {
          return this.weekYear() % 100;
        });
        addFormatToken(0, ["GG", 2], 0, function() {
          return this.isoWeekYear() % 100;
        });
        function addWeekYearFormatToken(token2, getter) {
          addFormatToken(0, [token2, token2.length], 0, getter);
        }
        addWeekYearFormatToken("gggg", "weekYear");
        addWeekYearFormatToken("ggggg", "weekYear");
        addWeekYearFormatToken("GGGG", "isoWeekYear");
        addWeekYearFormatToken("GGGGG", "isoWeekYear");
        addUnitAlias("weekYear", "gg");
        addUnitAlias("isoWeekYear", "GG");
        addUnitPriority("weekYear", 1);
        addUnitPriority("isoWeekYear", 1);
        addRegexToken("G", matchSigned);
        addRegexToken("g", matchSigned);
        addRegexToken("GG", match1to2, match2);
        addRegexToken("gg", match1to2, match2);
        addRegexToken("GGGG", match1to4, match4);
        addRegexToken("gggg", match1to4, match4);
        addRegexToken("GGGGG", match1to6, match6);
        addRegexToken("ggggg", match1to6, match6);
        addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token2) {
          week[token2.substr(0, 2)] = toInt(input);
        });
        addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
          week[token2] = hooks.parseTwoDigitYear(input);
        });
        function getSetWeekYear(input) {
          return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
        }
        function getSetISOWeekYear(input) {
          return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
        }
        function getISOWeeksInYear() {
          return weeksInYear(this.year(), 1, 4);
        }
        function getISOWeeksInISOWeekYear() {
          return weeksInYear(this.isoWeekYear(), 1, 4);
        }
        function getWeeksInYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        }
        function getWeeksInWeekYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
        }
        function getSetWeekYearHelper(input, week, weekday, dow, doy) {
          var weeksTarget;
          if (input == null) {
            return weekOfYear(this, dow, doy).year;
          } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
              week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
          }
        }
        function setWeekAll(weekYear, week, weekday, dow, doy) {
          var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
          this.year(date.getUTCFullYear());
          this.month(date.getUTCMonth());
          this.date(date.getUTCDate());
          return this;
        }
        addFormatToken("Q", 0, "Qo", "quarter");
        addUnitAlias("quarter", "Q");
        addUnitPriority("quarter", 7);
        addRegexToken("Q", match1);
        addParseToken("Q", function(input, array) {
          array[MONTH] = (toInt(input) - 1) * 3;
        });
        function getSetQuarter(input) {
          return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        }
        addFormatToken("D", ["DD", 2], "Do", "date");
        addUnitAlias("date", "D");
        addUnitPriority("date", 9);
        addRegexToken("D", match1to2);
        addRegexToken("DD", match1to2, match2);
        addRegexToken("Do", function(isStrict, locale2) {
          return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
        });
        addParseToken(["D", "DD"], DATE);
        addParseToken("Do", function(input, array) {
          array[DATE] = toInt(input.match(match1to2)[0]);
        });
        var getSetDayOfMonth = makeGetSet("Date", true);
        addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
        addUnitAlias("dayOfYear", "DDD");
        addUnitPriority("dayOfYear", 4);
        addRegexToken("DDD", match1to3);
        addRegexToken("DDDD", match3);
        addParseToken(["DDD", "DDDD"], function(input, array, config) {
          config._dayOfYear = toInt(input);
        });
        function getSetDayOfYear(input) {
          var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
          return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
        }
        addFormatToken("m", ["mm", 2], 0, "minute");
        addUnitAlias("minute", "m");
        addUnitPriority("minute", 14);
        addRegexToken("m", match1to2);
        addRegexToken("mm", match1to2, match2);
        addParseToken(["m", "mm"], MINUTE);
        var getSetMinute = makeGetSet("Minutes", false);
        addFormatToken("s", ["ss", 2], 0, "second");
        addUnitAlias("second", "s");
        addUnitPriority("second", 15);
        addRegexToken("s", match1to2);
        addRegexToken("ss", match1to2, match2);
        addParseToken(["s", "ss"], SECOND);
        var getSetSecond = makeGetSet("Seconds", false);
        addFormatToken("S", 0, 0, function() {
          return ~~(this.millisecond() / 100);
        });
        addFormatToken(0, ["SS", 2], 0, function() {
          return ~~(this.millisecond() / 10);
        });
        addFormatToken(0, ["SSS", 3], 0, "millisecond");
        addFormatToken(0, ["SSSS", 4], 0, function() {
          return this.millisecond() * 10;
        });
        addFormatToken(0, ["SSSSS", 5], 0, function() {
          return this.millisecond() * 100;
        });
        addFormatToken(0, ["SSSSSS", 6], 0, function() {
          return this.millisecond() * 1e3;
        });
        addFormatToken(0, ["SSSSSSS", 7], 0, function() {
          return this.millisecond() * 1e4;
        });
        addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
          return this.millisecond() * 1e5;
        });
        addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
          return this.millisecond() * 1e6;
        });
        addUnitAlias("millisecond", "ms");
        addUnitPriority("millisecond", 16);
        addRegexToken("S", match1to3, match1);
        addRegexToken("SS", match1to3, match2);
        addRegexToken("SSS", match1to3, match3);
        var token, getSetMillisecond;
        for (token = "SSSS"; token.length <= 9; token += "S") {
          addRegexToken(token, matchUnsigned);
        }
        function parseMs(input, array) {
          array[MILLISECOND] = toInt(("0." + input) * 1e3);
        }
        for (token = "S"; token.length <= 9; token += "S") {
          addParseToken(token, parseMs);
        }
        getSetMillisecond = makeGetSet("Milliseconds", false);
        addFormatToken("z", 0, 0, "zoneAbbr");
        addFormatToken("zz", 0, 0, "zoneName");
        function getZoneAbbr() {
          return this._isUTC ? "UTC" : "";
        }
        function getZoneName() {
          return this._isUTC ? "Coordinated Universal Time" : "";
        }
        var proto = Moment.prototype;
        proto.add = add;
        proto.calendar = calendar$1;
        proto.clone = clone;
        proto.diff = diff;
        proto.endOf = endOf;
        proto.format = format;
        proto.from = from;
        proto.fromNow = fromNow;
        proto.to = to;
        proto.toNow = toNow;
        proto.get = stringGet;
        proto.invalidAt = invalidAt;
        proto.isAfter = isAfter;
        proto.isBefore = isBefore;
        proto.isBetween = isBetween;
        proto.isSame = isSame;
        proto.isSameOrAfter = isSameOrAfter;
        proto.isSameOrBefore = isSameOrBefore;
        proto.isValid = isValid$2;
        proto.lang = lang;
        proto.locale = locale;
        proto.localeData = localeData;
        proto.max = prototypeMax;
        proto.min = prototypeMin;
        proto.parsingFlags = parsingFlags;
        proto.set = stringSet;
        proto.startOf = startOf;
        proto.subtract = subtract;
        proto.toArray = toArray;
        proto.toObject = toObject;
        proto.toDate = toDate;
        proto.toISOString = toISOString;
        proto.inspect = inspect;
        if (typeof Symbol !== "undefined" && Symbol.for != null) {
          proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
            return "Moment<" + this.format() + ">";
          };
        }
        proto.toJSON = toJSON;
        proto.toString = toString;
        proto.unix = unix;
        proto.valueOf = valueOf;
        proto.creationData = creationData;
        proto.eraName = getEraName;
        proto.eraNarrow = getEraNarrow;
        proto.eraAbbr = getEraAbbr;
        proto.eraYear = getEraYear;
        proto.year = getSetYear;
        proto.isLeapYear = getIsLeapYear;
        proto.weekYear = getSetWeekYear;
        proto.isoWeekYear = getSetISOWeekYear;
        proto.quarter = proto.quarters = getSetQuarter;
        proto.month = getSetMonth;
        proto.daysInMonth = getDaysInMonth;
        proto.week = proto.weeks = getSetWeek;
        proto.isoWeek = proto.isoWeeks = getSetISOWeek;
        proto.weeksInYear = getWeeksInYear;
        proto.weeksInWeekYear = getWeeksInWeekYear;
        proto.isoWeeksInYear = getISOWeeksInYear;
        proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
        proto.date = getSetDayOfMonth;
        proto.day = proto.days = getSetDayOfWeek;
        proto.weekday = getSetLocaleDayOfWeek;
        proto.isoWeekday = getSetISODayOfWeek;
        proto.dayOfYear = getSetDayOfYear;
        proto.hour = proto.hours = getSetHour;
        proto.minute = proto.minutes = getSetMinute;
        proto.second = proto.seconds = getSetSecond;
        proto.millisecond = proto.milliseconds = getSetMillisecond;
        proto.utcOffset = getSetOffset;
        proto.utc = setOffsetToUTC;
        proto.local = setOffsetToLocal;
        proto.parseZone = setOffsetToParsedOffset;
        proto.hasAlignedHourOffset = hasAlignedHourOffset;
        proto.isDST = isDaylightSavingTime;
        proto.isLocal = isLocal;
        proto.isUtcOffset = isUtcOffset;
        proto.isUtc = isUtc;
        proto.isUTC = isUtc;
        proto.zoneAbbr = getZoneAbbr;
        proto.zoneName = getZoneName;
        proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth);
        proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth);
        proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear);
        proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone);
        proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);
        function createUnix(input) {
          return createLocal(input * 1e3);
        }
        function createInZone() {
          return createLocal.apply(null, arguments).parseZone();
        }
        function preParsePostFormat(string) {
          return string;
        }
        var proto$1 = Locale.prototype;
        proto$1.calendar = calendar;
        proto$1.longDateFormat = longDateFormat;
        proto$1.invalidDate = invalidDate;
        proto$1.ordinal = ordinal;
        proto$1.preparse = preParsePostFormat;
        proto$1.postformat = preParsePostFormat;
        proto$1.relativeTime = relativeTime;
        proto$1.pastFuture = pastFuture;
        proto$1.set = set;
        proto$1.eras = localeEras;
        proto$1.erasParse = localeErasParse;
        proto$1.erasConvertYear = localeErasConvertYear;
        proto$1.erasAbbrRegex = erasAbbrRegex;
        proto$1.erasNameRegex = erasNameRegex;
        proto$1.erasNarrowRegex = erasNarrowRegex;
        proto$1.months = localeMonths;
        proto$1.monthsShort = localeMonthsShort;
        proto$1.monthsParse = localeMonthsParse;
        proto$1.monthsRegex = monthsRegex;
        proto$1.monthsShortRegex = monthsShortRegex;
        proto$1.week = localeWeek;
        proto$1.firstDayOfYear = localeFirstDayOfYear;
        proto$1.firstDayOfWeek = localeFirstDayOfWeek;
        proto$1.weekdays = localeWeekdays;
        proto$1.weekdaysMin = localeWeekdaysMin;
        proto$1.weekdaysShort = localeWeekdaysShort;
        proto$1.weekdaysParse = localeWeekdaysParse;
        proto$1.weekdaysRegex = weekdaysRegex;
        proto$1.weekdaysShortRegex = weekdaysShortRegex;
        proto$1.weekdaysMinRegex = weekdaysMinRegex;
        proto$1.isPM = localeIsPM;
        proto$1.meridiem = localeMeridiem;
        function get$1(format2, index, field, setter) {
          var locale2 = getLocale(), utc = createUTC().set(setter, index);
          return locale2[field](utc, format2);
        }
        function listMonthsImpl(format2, index, field) {
          if (isNumber(format2)) {
            index = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
          if (index != null) {
            return get$1(format2, index, field, "month");
          }
          var i, out = [];
          for (i = 0; i < 12; i++) {
            out[i] = get$1(format2, i, field, "month");
          }
          return out;
        }
        function listWeekdaysImpl(localeSorted, format2, index, field) {
          if (typeof localeSorted === "boolean") {
            if (isNumber(format2)) {
              index = format2;
              format2 = void 0;
            }
            format2 = format2 || "";
          } else {
            format2 = localeSorted;
            index = format2;
            localeSorted = false;
            if (isNumber(format2)) {
              index = format2;
              format2 = void 0;
            }
            format2 = format2 || "";
          }
          var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
          if (index != null) {
            return get$1(format2, (index + shift) % 7, field, "day");
          }
          for (i = 0; i < 7; i++) {
            out[i] = get$1(format2, (i + shift) % 7, field, "day");
          }
          return out;
        }
        function listMonths(format2, index) {
          return listMonthsImpl(format2, index, "months");
        }
        function listMonthsShort(format2, index) {
          return listMonthsImpl(format2, index, "monthsShort");
        }
        function listWeekdays(localeSorted, format2, index) {
          return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
        }
        function listWeekdaysShort(localeSorted, format2, index) {
          return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
        }
        function listWeekdaysMin(localeSorted, format2, index) {
          return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
        }
        getSetGlobalLocale("en", {
          eras: [
            {
              since: "0001-01-01",
              until: Infinity,
              offset: 1,
              name: "Anno Domini",
              narrow: "AD",
              abbr: "AD"
            },
            {
              since: "0000-12-31",
              until: -Infinity,
              offset: 1,
              name: "Before Christ",
              narrow: "BC",
              abbr: "BC"
            }
          ],
          dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
          ordinal: function(number) {
            var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
            return number + output;
          }
        });
        hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale);
        hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
        var mathAbs = Math.abs;
        function abs() {
          var data = this._data;
          this._milliseconds = mathAbs(this._milliseconds);
          this._days = mathAbs(this._days);
          this._months = mathAbs(this._months);
          data.milliseconds = mathAbs(data.milliseconds);
          data.seconds = mathAbs(data.seconds);
          data.minutes = mathAbs(data.minutes);
          data.hours = mathAbs(data.hours);
          data.months = mathAbs(data.months);
          data.years = mathAbs(data.years);
          return this;
        }
        function addSubtract$1(duration, input, value, direction) {
          var other = createDuration(input, value);
          duration._milliseconds += direction * other._milliseconds;
          duration._days += direction * other._days;
          duration._months += direction * other._months;
          return duration._bubble();
        }
        function add$1(input, value) {
          return addSubtract$1(this, input, value, 1);
        }
        function subtract$1(input, value) {
          return addSubtract$1(this, input, value, -1);
        }
        function absCeil(number) {
          if (number < 0) {
            return Math.floor(number);
          } else {
            return Math.ceil(number);
          }
        }
        function bubble() {
          var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
          if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
            milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
            days2 = 0;
            months2 = 0;
          }
          data.milliseconds = milliseconds2 % 1e3;
          seconds2 = absFloor(milliseconds2 / 1e3);
          data.seconds = seconds2 % 60;
          minutes2 = absFloor(seconds2 / 60);
          data.minutes = minutes2 % 60;
          hours2 = absFloor(minutes2 / 60);
          data.hours = hours2 % 24;
          days2 += absFloor(hours2 / 24);
          monthsFromDays = absFloor(daysToMonths(days2));
          months2 += monthsFromDays;
          days2 -= absCeil(monthsToDays(monthsFromDays));
          years2 = absFloor(months2 / 12);
          months2 %= 12;
          data.days = days2;
          data.months = months2;
          data.years = years2;
          return this;
        }
        function daysToMonths(days2) {
          return days2 * 4800 / 146097;
        }
        function monthsToDays(months2) {
          return months2 * 146097 / 4800;
        }
        function as(units) {
          if (!this.isValid()) {
            return NaN;
          }
          var days2, months2, milliseconds2 = this._milliseconds;
          units = normalizeUnits(units);
          if (units === "month" || units === "quarter" || units === "year") {
            days2 = this._days + milliseconds2 / 864e5;
            months2 = this._months + daysToMonths(days2);
            switch (units) {
              case "month":
                return months2;
              case "quarter":
                return months2 / 3;
              case "year":
                return months2 / 12;
            }
          } else {
            days2 = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
              case "week":
                return days2 / 7 + milliseconds2 / 6048e5;
              case "day":
                return days2 + milliseconds2 / 864e5;
              case "hour":
                return days2 * 24 + milliseconds2 / 36e5;
              case "minute":
                return days2 * 1440 + milliseconds2 / 6e4;
              case "second":
                return days2 * 86400 + milliseconds2 / 1e3;
              case "millisecond":
                return Math.floor(days2 * 864e5) + milliseconds2;
              default:
                throw new Error("Unknown unit " + units);
            }
          }
        }
        function valueOf$1() {
          if (!this.isValid()) {
            return NaN;
          }
          return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
        }
        function makeAs(alias) {
          return function() {
            return this.as(alias);
          };
        }
        var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
        function clone$1() {
          return createDuration(this);
        }
        function get$2(units) {
          units = normalizeUnits(units);
          return this.isValid() ? this[units + "s"]() : NaN;
        }
        function makeGetter(name) {
          return function() {
            return this.isValid() ? this._data[name] : NaN;
          };
        }
        var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
        function weeks() {
          return absFloor(this.days() / 7);
        }
        var round = Math.round, thresholds = {
          ss: 44,
          s: 45,
          m: 45,
          h: 22,
          d: 26,
          w: null,
          M: 11
        };
        function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
          return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
        }
        function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
          var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
          if (thresholds2.w != null) {
            a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
          }
          a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
          a[2] = withoutSuffix;
          a[3] = +posNegDuration > 0;
          a[4] = locale2;
          return substituteTimeAgo.apply(null, a);
        }
        function getSetRelativeTimeRounding(roundingFunction) {
          if (roundingFunction === void 0) {
            return round;
          }
          if (typeof roundingFunction === "function") {
            round = roundingFunction;
            return true;
          }
          return false;
        }
        function getSetRelativeTimeThreshold(threshold, limit) {
          if (thresholds[threshold] === void 0) {
            return false;
          }
          if (limit === void 0) {
            return thresholds[threshold];
          }
          thresholds[threshold] = limit;
          if (threshold === "s") {
            thresholds.ss = limit - 1;
          }
          return true;
        }
        function humanize(argWithSuffix, argThresholds) {
          if (!this.isValid()) {
            return this.localeData().invalidDate();
          }
          var withSuffix = false, th = thresholds, locale2, output;
          if (typeof argWithSuffix === "object") {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
          }
          if (typeof argWithSuffix === "boolean") {
            withSuffix = argWithSuffix;
          }
          if (typeof argThresholds === "object") {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
              th.ss = argThresholds.s - 1;
            }
          }
          locale2 = this.localeData();
          output = relativeTime$1(this, !withSuffix, th, locale2);
          if (withSuffix) {
            output = locale2.pastFuture(+this, output);
          }
          return locale2.postformat(output);
        }
        var abs$1 = Math.abs;
        function sign(x) {
          return (x > 0) - (x < 0) || +x;
        }
        function toISOString$1() {
          if (!this.isValid()) {
            return this.localeData().invalidDate();
          }
          var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
          if (!total) {
            return "P0D";
          }
          minutes2 = absFloor(seconds2 / 60);
          hours2 = absFloor(minutes2 / 60);
          seconds2 %= 60;
          minutes2 %= 60;
          years2 = absFloor(months2 / 12);
          months2 %= 12;
          s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
          totalSign = total < 0 ? "-" : "";
          ymSign = sign(this._months) !== sign(total) ? "-" : "";
          daysSign = sign(this._days) !== sign(total) ? "-" : "";
          hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
          return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
        }
        var proto$2 = Duration.prototype;
        proto$2.isValid = isValid$1;
        proto$2.abs = abs;
        proto$2.add = add$1;
        proto$2.subtract = subtract$1;
        proto$2.as = as;
        proto$2.asMilliseconds = asMilliseconds;
        proto$2.asSeconds = asSeconds;
        proto$2.asMinutes = asMinutes;
        proto$2.asHours = asHours;
        proto$2.asDays = asDays;
        proto$2.asWeeks = asWeeks;
        proto$2.asMonths = asMonths;
        proto$2.asQuarters = asQuarters;
        proto$2.asYears = asYears;
        proto$2.valueOf = valueOf$1;
        proto$2._bubble = bubble;
        proto$2.clone = clone$1;
        proto$2.get = get$2;
        proto$2.milliseconds = milliseconds;
        proto$2.seconds = seconds;
        proto$2.minutes = minutes;
        proto$2.hours = hours;
        proto$2.days = days;
        proto$2.weeks = weeks;
        proto$2.months = months;
        proto$2.years = years;
        proto$2.humanize = humanize;
        proto$2.toISOString = toISOString$1;
        proto$2.toString = toISOString$1;
        proto$2.toJSON = toISOString$1;
        proto$2.locale = locale;
        proto$2.localeData = localeData;
        proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1);
        proto$2.lang = lang;
        addFormatToken("X", 0, 0, "unix");
        addFormatToken("x", 0, 0, "valueOf");
        addRegexToken("x", matchSigned);
        addRegexToken("X", matchTimestamp);
        addParseToken("X", function(input, array, config) {
          config._d = new Date(parseFloat(input) * 1e3);
        });
        addParseToken("x", function(input, array, config) {
          config._d = new Date(toInt(input));
        });
        hooks.version = "2.29.1";
        setHookCallback(createLocal);
        hooks.fn = proto;
        hooks.min = min;
        hooks.max = max;
        hooks.now = now;
        hooks.utc = createUTC;
        hooks.unix = createUnix;
        hooks.months = listMonths;
        hooks.isDate = isDate;
        hooks.locale = getSetGlobalLocale;
        hooks.invalid = createInvalid;
        hooks.duration = createDuration;
        hooks.isMoment = isMoment;
        hooks.weekdays = listWeekdays;
        hooks.parseZone = createInZone;
        hooks.localeData = getLocale;
        hooks.isDuration = isDuration;
        hooks.monthsShort = listMonthsShort;
        hooks.weekdaysMin = listWeekdaysMin;
        hooks.defineLocale = defineLocale;
        hooks.updateLocale = updateLocale;
        hooks.locales = listLocales;
        hooks.weekdaysShort = listWeekdaysShort;
        hooks.normalizeUnits = normalizeUnits;
        hooks.relativeTimeRounding = getSetRelativeTimeRounding;
        hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
        hooks.calendarFormat = getCalendarFormat;
        hooks.prototype = proto;
        hooks.HTML5_FMT = {
          DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
          DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
          DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
          DATE: "YYYY-MM-DD",
          TIME: "HH:mm",
          TIME_SECONDS: "HH:mm:ss",
          TIME_MS: "HH:mm:ss.SSS",
          WEEK: "GGGG-[W]WW",
          MONTH: "YYYY-MM"
        };
        return hooks;
      });
    }
  });

  // src/store/data/tokens/mainnet/bsc.json
  var require_bsc = __commonJS({
    "src/store/data/tokens/mainnet/bsc.json"(exports, module) {
      module.exports = [
        {
          name: "OpenSwap",
          symbol: "OSWAP",
          address: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
          decimals: 18,
          isCommon: true
        },
        {
          name: "PancakeSwap Token",
          symbol: "CAKE",
          address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
          decimals: 18
        },
        {
          name: "Cardano Token",
          symbol: "ADA",
          address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
          decimals: 18
        },
        {
          name: "AdEx Network",
          symbol: "ADX",
          address: "0x6bfF4Fb161347ad7de4A625AE5aa3A1CA7077819",
          decimals: 18
        },
        {
          name: "My Neigbor Alice",
          symbol: "ALICE",
          address: "0xAC51066d7bEC65Dc4589368da368b212745d63E8",
          decimals: 6
        },
        {
          name: "AlpaToken",
          symbol: "ALPA",
          address: "0xc5E6689C9c8B02be7C49912Ef19e79cF24977f03",
          decimals: 18
        },
        {
          name: "Alpaca",
          symbol: "ALPACA",
          address: "0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F",
          decimals: 18
        },
        {
          name: "AlphaToken",
          symbol: "ALPHA",
          address: "0xa1faa113cbE53436Df28FF0aEe54275c13B40975",
          decimals: 18
        },
        {
          name: "Ampleforth",
          symbol: "AMPL",
          address: "0xDB021b1B247fe2F1fa57e0A87C748Cc1E321F07F",
          decimals: 9
        },
        {
          name: "Ankr",
          symbol: "ANKR",
          address: "0xf307910A4c7bbc79691fD374889b36d8531B08e3",
          decimals: 18
        },
        {
          name: "anyMTLX",
          symbol: "anyMTLX",
          address: "0x5921DEE8556c4593EeFCFad3CA5e2f618606483b",
          decimals: 18
        },
        {
          name: "APYSwap",
          symbol: "APYS",
          address: "0x37dfACfaeDA801437Ff648A1559d73f4C40aAcb7",
          decimals: 18
        },
        {
          name: "ARPA",
          symbol: "ARPA",
          address: "0x6F769E65c14Ebd1f68817F5f1DcDb61Cfa2D6f7e",
          decimals: 18
        },
        {
          name: "ARIVA",
          symbol: "ARV",
          address: "0x6679eB24F59dFe111864AEc72B443d1Da666B360",
          decimals: 8
        },
        {
          name: "AS Roma",
          symbol: "ASR",
          address: "0x80D5f92C2c8C682070C95495313dDB680B267320",
          decimals: 2
        },
        {
          name: "Automata",
          symbol: "ATA",
          address: "0xA2120b9e674d3fC3875f415A7DF52e382F141225",
          decimals: 18
        },
        {
          name: "Atletico de Madrid",
          symbol: "ATM",
          address: "0x25E9d05365c867E59C1904E7463Af9F312296f9E",
          decimals: 2
        },
        {
          name: "Cosmos Token",
          symbol: "ATOM",
          address: "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
          decimals: 18
        },
        {
          name: "AUTOv2",
          symbol: "AUTO",
          address: "0xa184088a740c695E156F91f5cC086a06bb78b827",
          decimals: 18
        },
        {
          name: "Axie Infinity Shard",
          symbol: "AXS",
          address: "0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0",
          decimals: 18
        },
        {
          name: "BabyCake",
          symbol: "BABYCAKE",
          address: "0xdB8D30b74bf098aF214e862C90E647bbB1fcC58c",
          decimals: 18
        },
        {
          name: "Bakery Token",
          symbol: "BAKE",
          address: "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5",
          decimals: 18
        },
        {
          name: "AllianceBlock",
          symbol: "bALBT",
          address: "0x72fAa679E1008Ad8382959FF48E392042A8b06f7",
          decimals: 18
        },
        {
          name: "BAND Protocol Token",
          symbol: "BAND",
          address: "0xAD6cAEb32CD2c308980a548bD0Bc5AA4306c6c18",
          decimals: 18
        },
        {
          name: "Basic Attention Token",
          symbol: "BAT",
          address: "0x101d82428437127bF1608F699CD651e6Abf9766E",
          decimals: 18
        },
        {
          name: "bBADGER",
          symbol: "bBADGER",
          address: "0x1F7216fdB338247512Ec99715587bb97BBf96eae",
          decimals: 18
        },
        {
          name: "Conflux",
          symbol: "bCFX",
          address: "0x045c4324039dA91c52C55DF5D785385Aab073DcF",
          decimals: 18
        },
        {
          name: "Bitcoin Cash Token",
          symbol: "BCH",
          address: "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
          decimals: 18
        },
        {
          name: "bDIGG",
          symbol: "bDIGG",
          address: "0x5986D5c77c65e5801a5cAa4fAE80089f870A71dA",
          decimals: 18
        },
        {
          name: "bDollar",
          symbol: "BDO",
          address: "0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454",
          decimals: 18
        },
        {
          name: "Bella Protocol",
          symbol: "BEL",
          address: "0x8443f091997f06a61670B735ED92734F5628692F",
          decimals: 18
        },
        {
          name: "Belt",
          symbol: "BELT",
          address: "0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f",
          decimals: 18
        },
        {
          name: "Beta Finance",
          symbol: "BETA",
          address: "0xBe1a001FE942f96Eea22bA08783140B9Dcc09D28",
          decimals: 18
        },
        {
          name: "Beacon ETH",
          symbol: "BETH",
          address: "0x250632378E573c6Be1AC2f97Fcdf00515d0Aa91B",
          decimals: 18
        },
        {
          name: "b.earnfi",
          symbol: "BFI",
          address: "0x81859801b01764D4f0Fa5E64729f5a6C3b91435b",
          decimals: 18
        },
        {
          name: "Beefy.finance",
          symbol: "BIFI",
          address: "0xCa3F508B8e4Dd382eE878A314789373D80A5190A",
          decimals: 18
        },
        {
          name: "BLINk",
          symbol: "BLK",
          address: "0x63870A18B6e42b01Ef1Ad8A2302ef50B7132054F",
          decimals: 6
        },
        {
          name: "Binamon",
          symbol: "BMON",
          address: "0x08ba0619b1e7A582E0BCe5BBE9843322C954C340",
          decimals: 18
        },
        {
          name: "Multiplier",
          symbol: "bMXX",
          address: "0x4131b87F74415190425ccD873048C708F8005823",
          decimals: 18
        },
        {
          name: "Bondly",
          symbol: "BONDLY",
          address: "0x5D0158A5c3ddF47d4Ea4517d8DB0D76aA2e87563",
          decimals: 18
        },
        {
          name: "OPEN Governance Token",
          symbol: "bOPEN",
          address: "0xF35262a9d427F96d2437379eF090db986eaE5d42",
          decimals: 18
        },
        {
          name: "BoringDAO",
          symbol: "BORING",
          address: "0xffEecbf8D7267757c2dc3d13D730E97E15BfdF7F",
          decimals: 18
        },
        {
          name: "BunnyPark",
          symbol: "BP",
          address: "0xACB8f52DC63BB752a51186D1c55868ADbFfEe9C1",
          decimals: 18
        },
        {
          name: "ROOBEE",
          symbol: "bROOBEE",
          address: "0xE64F5Cb844946C1F102Bd25bBD87a5aB4aE89Fbe",
          decimals: 18
        },
        {
          name: "Berry",
          symbol: "BRY",
          address: "0xf859Bf77cBe8699013d6Dbc7C2b926Aaf307F830",
          decimals: 18
        },
        {
          name: "BSC Ecosystem Defi blue chips",
          symbol: "BSCDEFI",
          address: "0x40E46dE174dfB776BB89E04dF1C47d8a66855EB3",
          decimals: 18
        },
        {
          name: "BSCPad",
          symbol: "BSCPAD",
          address: "0x5A3010d4d8D3B5fB49f8B6E57FB9E48063f16700",
          decimals: 18
        },
        {
          name: "BSCEX",
          symbol: "BSCX",
          address: "0x5Ac52EE5b2a633895292Ff6d8A89bB9190451587",
          decimals: 18
        },
        {
          name: "Binance Pegged Bitcoin",
          symbol: "BTCB",
          address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
          decimals: 18
        },
        {
          name: "Standard BTC Hashrate Token",
          symbol: "BTCST",
          address: "0x78650B139471520656b9E7aA7A5e9276814a38e9",
          decimals: 17
        },
        {
          name: "Bittrue",
          symbol: "BTR",
          address: "0x5a16E8cE8cA316407c6E6307095dc9540a8D62B3",
          decimals: 18
        },
        {
          name: "Bittorrent",
          symbol: "BTT",
          address: "0x8595F9dA7b868b1822194fAEd312235E43007b49",
          decimals: 18
        },
        {
          name: "Bunny Token",
          symbol: "BUNNY",
          address: "0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51",
          decimals: 18
        },
        {
          name: "Burger Swap",
          symbol: "BURGER",
          address: "0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f",
          decimals: 18
        },
        {
          name: "Binance Pegged BUSD",
          symbol: "BUSD",
          address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
          decimals: 18,
          isCommon: true
        },
        {
          name: "BUX",
          symbol: "BUX",
          address: "0x211FfbE424b90e25a15531ca322adF1559779E45",
          decimals: 18
        },
        {
          name: "Coin98",
          symbol: "C98",
          address: "0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6",
          decimals: 18
        },
        {
          name: "CanYaCoin",
          symbol: "CAN",
          address: "0x007EA5C0Ea75a8DF45D288a4debdD5bb633F9e56",
          decimals: 18
        },
        {
          name: "CryptoArt.ai",
          symbol: "CART",
          address: "0x5C8C8D560048F34E5f7f8ad71f2f81a89DBd273e",
          decimals: 18
        },
        {
          name: "ChainGuardians",
          symbol: "CGG",
          address: "0x1613957159E9B0ac6c80e824F7Eea748a32a0AE2",
          decimals: 18
        },
        {
          name: "Tranchess",
          symbol: "CHESS",
          address: "0x20de22029ab63cf9A7Cf5fEB2b737Ca1eE4c82A6",
          decimals: 18
        },
        {
          name: "Chromia",
          symbol: "CHR",
          address: "0xf9CeC8d50f6c8ad3Fb6dcCEC577e05aA32B224FE",
          decimals: 6
        },
        {
          name: "Compound Finance",
          symbol: "COMP",
          address: "0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8",
          decimals: 18
        },
        {
          name: "Contentos",
          symbol: "COS",
          address: "0x96Dd399F9c3AFda1F194182F71600F1B65946501",
          decimals: 18
        },
        {
          name: "Cream",
          symbol: "CREAM",
          address: "0xd4CB328A82bDf5f03eB737f37Fa6B370aef3e888",
          decimals: 18
        },
        {
          name: "CertiK Token",
          symbol: "CTK",
          address: "0xA8c2B8eec3d368C0253ad3dae65a5F2BBB89c929",
          decimals: 6
        },
        {
          name: "Concentrated Voting Power",
          symbol: "CVP",
          address: "0x5Ec3AdBDae549Dce842e24480Eb2434769e22B2E",
          decimals: 18
        },
        {
          name: "Cyclone",
          symbol: "CYC",
          address: "0x810EE35443639348aDbbC467b33310d2AB43c168",
          decimals: 18
        },
        {
          name: "Binance Pegged DAI",
          symbol: "DAI",
          address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
          decimals: 18,
          isCommon: true
        },
        {
          name: "Dego.Finance",
          symbol: "DEGO",
          address: "0x3FdA9383A84C05eC8f7630Fe10AdF1fAC13241CC",
          decimals: 18
        },
        {
          name: "Deri",
          symbol: "DERI",
          address: "0xe60eaf5A997DFAe83739e035b005A33AfdCc6df5",
          decimals: 18
        },
        {
          name: "DeXe",
          symbol: "DEXE",
          address: "0x039cB485212f996A9DBb85A9a75d898F94d38dA6",
          decimals: 18
        },
        {
          name: "DefiDollar DAO",
          symbol: "DFD",
          address: "0x9899a98b222fCb2f3dbee7dF45d943093a4ff9ff",
          decimals: 18
        },
        {
          name: "DFuture",
          symbol: "DFT",
          address: "0x42712dF5009c20fee340B245b510c0395896cF6e",
          decimals: 18
        },
        {
          name: "Decentral Games",
          symbol: "DG",
          address: "0x9Fdc3ae5c814b79dcA2556564047C5e7e5449C19",
          decimals: 18
        },
        {
          name: "Ditto",
          symbol: "DITTO",
          address: "0x233d91A0713155003fc4DcE0AFa871b508B3B715",
          decimals: 9
        },
        {
          name: "Dodo",
          symbol: "DODO",
          address: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
          decimals: 18
        },
        {
          name: "Dogecoin",
          symbol: "DOGE",
          address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
          decimals: 8
        },
        {
          name: "Dopple Finance",
          symbol: "DOP",
          address: "0x844FA82f1E54824655470970F7004Dd90546bB28",
          decimals: 18
        },
        {
          name: "Polkadot Token",
          symbol: "DOT",
          address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
          decimals: 18
        },
        {
          name: "Dusk",
          symbol: "DUSK",
          address: "0xB2BD0749DBE21f623d9BABa856D3B0f0e1BFEc9C",
          decimals: 18
        },
        {
          name: "Dvision Network",
          symbol: "DVI",
          address: "0x758FB037A375F17c7e195CC634D77dA4F554255B",
          decimals: 18
        },
        {
          name: "Elrond",
          symbol: "EGLD",
          address: "0xbF7c81FFF98BbE61B40Ed186e4AfD6DDd01337fe",
          decimals: 18
        },
        {
          name: "EOS Token",
          symbol: "EOS",
          address: "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6",
          decimals: 18
        },
        {
          name: "Ellipsis",
          symbol: "EPS",
          address: "0xA7f552078dcC247C2684336020c03648500C6d9F",
          decimals: 18
        },
        {
          name: "Binance Pegged ETH",
          symbol: "ETH",
          address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
          decimals: 18
        },
        {
          name: "Easy V2",
          symbol: "EZ",
          address: "0x5512014efa6Cd57764Fa743756F7a6Ce3358cC83",
          decimals: 18
        },
        {
          name: "Filecoin",
          symbol: "FIL",
          address: "0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153",
          decimals: 18
        },
        {
          name: "Refinable",
          symbol: "FINE",
          address: "0x4e6415a5727ea08aAE4580057187923aeC331227",
          decimals: 18
        },
        {
          name: "ForTube",
          symbol: "FOR",
          address: "0x658A109C5900BC6d2357c87549B651670E5b0539",
          decimals: 18
        },
        {
          name: "Formation Finance",
          symbol: "FORM",
          address: "0x25A528af62e56512A19ce8c3cAB427807c28CC19",
          decimals: 18
        },
        {
          name: "fry.world",
          symbol: "FRIES",
          address: "0x393B312C01048b3ed2720bF1B090084C09e408A1",
          decimals: 18
        },
        {
          name: "Frontier Token",
          symbol: "FRONT",
          address: "0x928e55daB735aa8260AF3cEDadA18B5f70C72f1b",
          decimals: 18
        },
        {
          name: "Fuel",
          symbol: "FUEL",
          address: "0x2090c8295769791ab7A3CF1CC6e0AA19F35e441A",
          decimals: 18
        },
        {
          name: "GreenTrust",
          symbol: "GNT",
          address: "0xF750A26EB0aCf95556e8529E72eD530f3b60f348",
          decimals: 18
        },
        {
          name: "Gourmet Galaxy",
          symbol: "GUM",
          address: "0xc53708664b99DF348dd27C3Ac0759d2DA9c40462",
          decimals: 18
        },
        {
          name: "Hacken",
          symbol: "HAI",
          address: "0xaA9E582e5751d703F85912903bacADdFed26484C",
          decimals: 8
        },
        {
          name: "Hakka Finance",
          symbol: "HAKKA",
          address: "0x1D1eb8E8293222e1a29d2C0E4cE6C0Acfd89AaaC",
          decimals: 18
        },
        {
          name: "HARD",
          symbol: "HARD",
          address: "0xf79037F6f6bE66832DE4E7516be52826BC3cBcc4",
          decimals: 6
        },
        {
          name: "Helmet.insure",
          symbol: "Helmet",
          address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
          decimals: 18
        },
        {
          name: "MetaHero",
          symbol: "HERO",
          address: "0xD40bEDb44C081D2935eebA6eF5a3c8A31A1bBE13",
          decimals: 18
        },
        {
          name: "StepHero",
          symbol: "HERO",
          address: "0xE8176d414560cFE1Bf82Fd73B986823B89E4F545",
          decimals: 18
        },
        {
          name: "Hedget",
          symbol: "HGET",
          address: "0xC7d8D35EBA58a0935ff2D5a33Df105DD9f071731",
          decimals: 6
        },
        {
          name: "Hoo",
          symbol: "HOO",
          address: "0xE1d1F66215998786110Ba0102ef558b22224C016",
          decimals: 8
        },
        {
          name: "Hot Cross Token",
          symbol: "HOTCROSS",
          address: "0x4FA7163E153419E0E1064e418dd7A99314Ed27b6",
          decimals: 18
        },
        {
          name: "Hotbit",
          symbol: "HTB",
          address: "0x4e840AADD28DA189B9906674B4Afcb77C128d9ea",
          decimals: 18
        },
        {
          name: "HYFI",
          symbol: "HYFI",
          address: "0x9a319b959e33369C5eaA494a770117eE3e585318",
          decimals: 18
        },
        {
          name: "Horizon Protocol",
          symbol: "HZN",
          address: "0xC0eFf7749b125444953ef89682201Fb8c6A917CD",
          decimals: 18
        },
        {
          name: "Impossible Finance",
          symbol: "IF",
          address: "0xB0e1fc65C1a741b4662B813eB787d369b8614Af1",
          decimals: 18
        },
        {
          name: "Injective Protocol",
          symbol: "INJ",
          address: "0xa2B726B1145A4773F68593CF171187d8EBe4d495",
          decimals: 18
        },
        {
          name: "IoTeX",
          symbol: "IOTX",
          address: "0x9678E42ceBEb63F23197D726B29b1CB20d0064E5",
          decimals: 18
        },
        {
          name: "Itam",
          symbol: "ITAM",
          address: "0x04C747b40Be4D535fC83D09939fb0f626F32800B",
          decimals: 18
        },
        {
          name: "Juggernaut Finance",
          symbol: "JGN",
          address: "0xC13B7a43223BB9Bf4B69BD68Ab20ca1B79d81C75",
          decimals: 18
        },
        {
          name: "Juventus",
          symbol: "JUV",
          address: "0xC40C9A843E1c6D01b7578284a9028854f6683b1B",
          decimals: 2
        },
        {
          name: "Kalmar",
          symbol: "KALM",
          address: "0x4BA0057f784858a48fe351445C672FF2a3d43515",
          decimals: 18
        },
        {
          name: "KAVA",
          symbol: "KAVA",
          address: "0x5F88AB06e8dfe89DF127B2430Bba4Af600866035",
          decimals: 6
        },
        {
          name: "Kattana",
          symbol: "KTN",
          address: "0xDAe6c2A48BFAA66b43815c5548b10800919c993E",
          decimals: 18
        },
        {
          name: "Qian Governance Token",
          symbol: "KUN",
          address: "0x1A2fb0Af670D0234c2857FaD35b789F8Cb725584",
          decimals: 18
        },
        {
          name: "FC Lazio Fan Token",
          symbol: "LAZIO",
          address: "0x77d547256A2cD95F32F67aE0313E450Ac200648d",
          decimals: 8
        },
        {
          name: "Lien",
          symbol: "LIEN",
          address: "0x5d684ADaf3FcFe9CFb5ceDe3abf02F0Cdd1012E3",
          decimals: 8
        },
        {
          name: "Lightning",
          symbol: "LIGHT",
          address: "0x037838b556d9c9d654148a284682C55bB5f56eF4",
          decimals: 18
        },
        {
          name: "Linear Finance",
          symbol: "LINA",
          address: "0x762539b45A1dCcE3D36d080F74d1AED37844b878",
          decimals: 18
        },
        {
          name: "ChainLink Token",
          symbol: "LINK",
          address: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
          decimals: 18
        },
        {
          name: "Litentry",
          symbol: "LIT",
          address: "0xb59490aB09A0f526Cc7305822aC65f2Ab12f9723",
          decimals: 18
        },
        {
          name: "Lympo Market Token",
          symbol: "LMT",
          address: "0x9617857E191354dbEA0b714d78Bc59e57C411087",
          decimals: 18
        },
        {
          name: "Litecoin Token",
          symbol: "LTC",
          address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
          decimals: 18
        },
        {
          name: "LTO Network",
          symbol: "LTO",
          address: "0x857B222Fc79e1cBBf8Ca5f78CB133d1b7CF34BBd",
          decimals: 18
        },
        {
          name: "lUSD",
          symbol: "lUSD",
          address: "0x23e8a70534308a4AAF76fb8C32ec13d17a3BD89e",
          decimals: 18
        },
        {
          name: "Mirror AMZN Token",
          symbol: "mAMZN",
          address: "0x3947B992DC0147D2D89dF0392213781b04B25075",
          decimals: 18
        },
        {
          name: "Unmarshal",
          symbol: "MARSH",
          address: "0x2FA5dAF6Fe0708fBD63b1A7D1592577284f52256",
          decimals: 18
        },
        {
          name: "Mask Network",
          symbol: "MASK",
          address: "0x2eD9a5C8C13b93955103B9a7C167B67Ef4d568a3",
          decimals: 18
        },
        {
          name: "Math",
          symbol: "MATH",
          address: "0xF218184Af829Cf2b0019F8E6F0b2423498a36983",
          decimals: 18
        },
        {
          name: "Mobox",
          symbol: "MBOX",
          address: "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377",
          decimals: 18
        },
        {
          name: "MCDEX",
          symbol: "MCB",
          address: "0x5fE80d2CD054645b9419657d3d10d26391780A7B",
          decimals: 18
        },
        {
          name: "Mirror COIN",
          symbol: "mCOIN",
          address: "0x49022089e78a8D46Ec87A3AF86a1Db6c189aFA6f",
          decimals: 18
        },
        {
          name: "MacaronSwap",
          symbol: "MCRN",
          address: "0xacb2d47827C9813AE26De80965845D80935afd0B",
          decimals: 18
        },
        {
          name: "Mirror GOOGL Token",
          symbol: "mGOOGL",
          address: "0x62D71B23bF15218C7d2D7E48DBbD9e9c650B173f",
          decimals: 18
        },
        {
          name: "Mirror Finance",
          symbol: "MIR",
          address: "0x5B6DcF557E2aBE2323c48445E8CC948910d8c2c9",
          decimals: 18
        },
        {
          name: "Mix",
          symbol: "MIX",
          address: "0xB67754f5b4C704A24d2db68e661b2875a4dDD197",
          decimals: 18
        },
        {
          name: "Mirror NFLX Token",
          symbol: "mNFLX",
          address: "0xa04F060077D90Fe2647B61e4dA4aD1F97d6649dc",
          decimals: 18
        },
        {
          name: "Meter",
          symbol: "MTRG",
          address: "0xBd2949F67DcdC549c6Ebe98696449Fa79D988A9F",
          decimals: 18
        },
        {
          name: "Mirror TSLA Token",
          symbol: "mTSLA",
          address: "0xF215A127A196e3988C09d052e16BcFD365Cd7AA3",
          decimals: 18
        },
        {
          name: "MX Token",
          symbol: "MX",
          address: "0x9F882567A62a5560d147d64871776EeA72Df41D3",
          decimals: 18
        },
        {
          name: "NAOS Finance",
          symbol: "NAOS",
          address: "0x758d08864fB6cCE3062667225ca10b8F00496cc2",
          decimals: 18
        },
        {
          name: "NAR Token",
          symbol: "NAR",
          address: "0xA1303E6199b319a891b79685F0537D289af1FC83",
          decimals: 18
        },
        {
          name: "APENFT",
          symbol: "NFT",
          address: "0x1fC9004eC7E5722891f5f38baE7678efCB11d34D",
          decimals: 6
        },
        {
          name: "Nerve Finance",
          symbol: "NRV",
          address: "0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096",
          decimals: 18
        },
        {
          name: "Nuls",
          symbol: "NULS",
          address: "0x8CD6e29d3686d24d3C2018CEe54621eA0f89313B",
          decimals: 8
        },
        {
          name: "NerveNetwork",
          symbol: "NVT",
          address: "0xf0E406c49C63AbF358030A299C0E00118C4C6BA5",
          decimals: 8
        },
        {
          name: "Nyanswop Token",
          symbol: "NYA",
          address: "0xbFa0841F7a90c4CE6643f651756EE340991F99D5",
          decimals: 18
        },
        {
          name: "O3 Swap",
          symbol: "O3",
          address: "0xEe9801669C6138E84bD50dEB500827b776777d28",
          decimals: 18
        },
        {
          name: "Oddz",
          symbol: "ODDZ",
          address: "0xCD40F2670CF58720b694968698A5514e924F742d",
          decimals: 18
        },
        {
          name: "OG",
          symbol: "OG",
          address: "0xf05E45aD22150677a017Fbd94b84fBB63dc9b44c",
          decimals: 2
        },
        {
          name: "Oin Finance",
          symbol: "OIN",
          address: "0x658E64FFcF40D240A43D52CA9342140316Ae44fA",
          decimals: 8
        },
        {
          name: "Harmony One",
          symbol: "ONE",
          address: "0x03fF0ff224f904be3118461335064bB48Df47938",
          decimals: 18
        },
        {
          name: "BigOne Token",
          symbol: "ONE",
          address: "0x04BAf95Fd4C52fd09a56D840bAEe0AB8D7357bf0",
          decimals: 18
        },
        {
          name: "Ontology Token",
          symbol: "ONT",
          address: "0xFd7B3A77848f1C2D67E05E54d78d174a0C850335",
          decimals: 18
        },
        {
          name: "The Orbs Network",
          symbol: "ORBS",
          address: "0xeBd49b26169e1b52c04cFd19FCf289405dF55F80",
          decimals: 18
        },
        {
          name: "pBTC",
          symbol: "pBTC",
          address: "0xeD28A457A5A76596ac48d87C0f577020F6Ea1c4C",
          decimals: 18
        },
        {
          name: "PolyCrowns",
          symbol: "pCWS",
          address: "0xbcf39F0EDDa668C58371E519AF37CA705f2bFcbd",
          decimals: 18
        },
        {
          name: "Perlin X",
          symbol: "PERL",
          address: "0x0F9E4D49f25de22c2202aF916B681FBB3790497B",
          decimals: 18
        },
        {
          name: "Phala Network",
          symbol: "PHA",
          address: "0x0112e557d400474717056C4e6D40eDD846F38351",
          decimals: 18
        },
        {
          name: "Polkamon",
          symbol: "PMON",
          address: "0x1796ae0b0fa4862485106a0de9b654eFE301D0b2",
          decimals: 18
        },
        {
          name: "PNT",
          symbol: "PNT",
          address: "0xdaacB0Ab6Fb34d24E8a67BfA14BF4D95D4C7aF92",
          decimals: 18
        },
        {
          name: "pTokens OPEN",
          symbol: "pOPEN",
          address: "0xaBaE871B7E3b67aEeC6B46AE9FE1A91660AadAC5",
          decimals: 18
        },
        {
          name: "Moonpot",
          symbol: "POTS",
          address: "0x3Fcca8648651E5b974DD6d3e50F61567779772A8",
          decimals: 18
        },
        {
          name: "Prometeus",
          symbol: "PROM",
          address: "0xaF53d56ff99f1322515E54FdDE93FF8b3b7DAFd5",
          decimals: 18
        },
        {
          name: "Prosper",
          symbol: "PROS",
          address: "0xEd8c8Aa8299C10f067496BB66f8cC7Fb338A3405",
          decimals: 18
        },
        {
          name: "Paris Saint-Germain",
          symbol: "PSG",
          address: "0xBc5609612b7C44BEf426De600B5fd1379DB2EcF1",
          decimals: 2
        },
        {
          name: "Qubit Token",
          symbol: "QBT",
          address: "0x17B7163cf1Dbd286E262ddc68b553D899B93f526",
          decimals: 18
        },
        {
          name: "QuarkChain Token",
          symbol: "QKC",
          address: "0xA1434F1FC3F437fa33F7a781E041961C0205B5Da",
          decimals: 18
        },
        {
          name: "QIAN second generation dollar",
          symbol: "QSD",
          address: "0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2",
          decimals: 18
        },
        {
          name: "QUSD Stablecoin",
          symbol: "QUSD",
          address: "0xb8C540d00dd0Bf76ea12E4B4B95eFC90804f924E",
          decimals: 18
        },
        {
          name: "Rabbit Finance",
          symbol: "RABBIT",
          address: "0x95a1199EBA84ac5f19546519e287d43D2F0E1b41",
          decimals: 18
        },
        {
          name: "Ramp DEFI",
          symbol: "RAMP",
          address: "0x8519EA49c997f50cefFa444d240fB655e89248Aa",
          decimals: 18
        },
        {
          name: "Reef",
          symbol: "REEF",
          address: "0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e",
          decimals: 18
        },
        {
          name: "renBTC",
          symbol: "renBTC",
          address: "0xfCe146bF3146100cfe5dB4129cf6C82b0eF4Ad8c",
          decimals: 8
        },
        {
          name: "renDOGE",
          symbol: "renDOGE",
          address: "0xc3fEd6eB39178A541D274e6Fc748d48f0Ca01CC3",
          decimals: 8
        },
        {
          name: "renZEC",
          symbol: "renZEC",
          address: "0x695FD30aF473F2960e81Dc9bA7cB67679d35EDb7",
          decimals: 8
        },
        {
          name: "REVV",
          symbol: "REVV",
          address: "0x833F307aC507D47309fD8CDD1F835BeF8D702a93",
          decimals: 18
        },
        {
          name: "RFOX",
          symbol: "RFOX",
          address: "0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5",
          decimals: 18
        },
        {
          name: "Rangers Protocol",
          symbol: "RPG",
          address: "0xc2098a8938119A52B1F7661893c0153A6CB116d5",
          decimals: 18
        },
        {
          name: "rUSD",
          symbol: "rUSD",
          address: "0x07663837218A003e66310a01596af4bf4e44623D",
          decimals: 18
        },
        {
          name: "SafeMoon",
          symbol: "SAFEMOON",
          address: "0x8076C74C5e3F5852037F31Ff0093Eeb8c8ADd8D3",
          decimals: 9
        },
        {
          name: "bDollar Share",
          symbol: "sBDO",
          address: "0x0d9319565be7f53CeFE84Ad201Be3f40feAE2740",
          decimals: 18
        },
        {
          name: "SafePal Token",
          symbol: "SFP",
          address: "0xD41FDb03Ba84762dD66a0af1a6C8540FF1ba5dfb",
          decimals: 18
        },
        {
          name: "Seedify",
          symbol: "SFUND",
          address: "0x477bC8d23c634C154061869478bce96BE6045D12",
          decimals: 18
        },
        {
          name: "CryptoBlades Skill Token",
          symbol: "SKILL",
          address: "0x154A9F9cbd3449AD22FDaE23044319D6eF2a1Fab",
          decimals: 18
        },
        {
          name: "SPARTAN PROTOCOL TOKEN",
          symbol: "SPARTA",
          address: "0x3910db0600eA925F63C36DdB1351aB6E2c6eb102",
          decimals: 18
        },
        {
          name: "Splintershards",
          symbol: "SPS",
          address: "0x1633b7157e7638C4d6593436111Bf125Ee74703F",
          decimals: 18
        },
        {
          name: "StableXSwap",
          symbol: "STAX",
          address: "0x0Da6Ed8B13214Ff28e9Ca979Dd37439e8a88F6c4",
          decimals: 18
        },
        {
          name: "Sushi",
          symbol: "SUSHI",
          address: "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4",
          decimals: 18
        },
        {
          name: "Suterusu",
          symbol: "SUTER",
          address: "0x4CfbBdfBd5BF0814472fF35C72717Bd095ADa055",
          decimals: 18
        },
        {
          name: "Swampy",
          symbol: "SWAMP",
          address: "0xc5A49b4CBe004b6FD55B30Ba1dE6AC360FF9765d",
          decimals: 18
        },
        {
          name: "SWGToken",
          symbol: "SWG",
          address: "0xe792f64C582698b8572AAF765bDC426AC3aEfb6B",
          decimals: 18
        },
        {
          name: "Swingby",
          symbol: "SWINGBY",
          address: "0x71DE20e0C4616E7fcBfDD3f875d568492cBE4739",
          decimals: 18
        },
        {
          name: "Switcheo",
          symbol: "SWTH",
          address: "0x250b211EE44459dAd5Cd3bCa803dD6a7EcB5d46C",
          decimals: 8
        },
        {
          name: "Swipe",
          symbol: "SXP",
          address: "0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A",
          decimals: 18
        },
        {
          name: "Tau Bitcoin",
          symbol: "tBTC",
          address: "0x2cD1075682b0FCCaADd0Ca629e138E64015Ba11c",
          decimals: 9
        },
        {
          name: "Tau DOGE",
          symbol: "tDOGE",
          address: "0xe550a593d09FBC8DCD557b5C88Cea6946A8b404A",
          decimals: 8
        },
        {
          name: "Tenet",
          symbol: "TEN",
          address: "0xdFF8cb622790b7F92686c722b02CaB55592f152C",
          decimals: 18
        },
        {
          name: "TitanSwap",
          symbol: "TITAN",
          address: "0xe898EDc43920F357A93083F1d4460437dE6dAeC2",
          decimals: 18
        },
        {
          name: "TokoCrypto",
          symbol: "TKO",
          address: "0x9f589e3eabe42ebC94A44727b3f3531C0c877809",
          decimals: 18
        },
        {
          name: "Alien Worlds",
          symbol: "TLM",
          address: "0x2222227E22102Fe3322098e4CBfE18cFebD57c95",
          decimals: 4
        },
        {
          name: "Telos",
          symbol: "TLOS",
          address: "0xb6C53431608E626AC81a9776ac3e999c5556717c",
          decimals: 18
        },
        {
          name: "TokenPocket",
          symbol: "TPT",
          address: "0xECa41281c24451168a37211F0bc2b8645AF45092",
          decimals: 4
        },
        {
          name: "Unitrade",
          symbol: "TRADE",
          address: "0x7af173F350D916358AF3e218Bdf2178494Beb748",
          decimals: 18
        },
        {
          name: "Tron",
          symbol: "TRX",
          address: "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B",
          decimals: 18
        },
        {
          name: "True USD",
          symbol: "TUSD",
          address: "0x14016E85a25aeb13065688cAFB43044C2ef86784",
          decimals: 18
        },
        {
          name: "Trust Wallet",
          symbol: "TWT",
          address: "0x4B0F1812e5Df2A09796481Ff14017e6005508003",
          decimals: 18
        },
        {
          name: "Tixl",
          symbol: "TXL",
          address: "0x1FFD0b47127fdd4097E54521C9E2c7f0D66AafC5",
          decimals: 18
        },
        {
          name: "UpBots",
          symbol: "UBXT",
          address: "0xBbEB90cFb6FAFa1F69AA130B7341089AbeEF5811",
          decimals: 18
        },
        {
          name: "Unifi Token",
          symbol: "UNFI",
          address: "0x728C5baC3C3e370E372Fc4671f9ef6916b814d8B",
          decimals: 18
        },
        {
          name: "Uniswap",
          symbol: "UNI",
          address: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
          decimals: 18
        },
        {
          name: "Binance Pegged USD Coin",
          symbol: "USDC",
          address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
          decimals: 18
        },
        {
          name: "Binance Pegged USDT",
          symbol: "USDT",
          address: "0x55d398326f99059fF775485246999027B3197955",
          decimals: 18,
          isCommon: true
        },
        {
          name: "USDX",
          symbol: "USDX",
          address: "0x1203355742e76875154C0D13eB81DCD7711dC7d9",
          decimals: 6
        },
        {
          name: "UST Token",
          symbol: "UST",
          address: "0x23396cF899Ca06c4472205fC903bDB4de249D6fC",
          decimals: 18
        },
        {
          name: "VAI Stablecoin",
          symbol: "VAI",
          address: "0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7",
          decimals: 18
        },
        {
          name: "Venus Reward Token",
          symbol: "VRT",
          address: "0x5F84ce30DC3cF7909101C69086c50De191895883",
          decimals: 18
        },
        {
          name: "Yieldwatch",
          symbol: "WATCH",
          address: "0x7A9f28EB62C791422Aa23CeAE1dA9C847cBeC9b0",
          decimals: 18
        },
        {
          name: "Wault",
          symbol: "WAULTx",
          address: "0xB64E638E60D154B43f660a6BF8fD8a3b249a6a21",
          decimals: 18
        },
        {
          name: "WBNB Token",
          symbol: "WBNB",
          address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          decimals: 18,
          isCommon: true,
          isWETH: true
        },
        {
          name: "BitWell Token",
          symbol: "WELL",
          address: "0xf07a32Eb035b786898c00bB1C64d8c6F8E7a46D5",
          decimals: 18
        },
        {
          name: "WaultSwap",
          symbol: "WEX",
          address: "0xa9c41A46a6B3531d28d5c32F6633dd2fF05dFB90",
          decimals: 18
        },
        {
          name: "WINk",
          symbol: "WIN",
          address: "0xaeF0d72a118ce24feE3cD1d43d383897D05B4e99",
          decimals: 18
        },
        {
          name: "Wrapped MASS",
          symbol: "WMASS",
          address: "0x7e396BfC8a2f84748701167c2d622F041A1D7a17",
          decimals: 8
        },
        {
          name: "Wootrade",
          symbol: "WOO",
          address: "0x4691937a7508860F876c9c0a2a617E7d9E945D4B",
          decimals: 18
        },
        {
          name: "Wall Street Games",
          symbol: "WSG",
          address: "0xA58950F05FeA2277d2608748412bf9F802eA4901",
          decimals: 18
        },
        {
          name: "Soteria",
          symbol: "wSOTE",
          address: "0x541E619858737031A1244A5d0Cd47E5ef480342c",
          decimals: 18
        },
        {
          name: "Xcademy",
          symbol: "XCAD",
          address: "0x431e0cD023a32532BF3969CddFc002c00E98429d",
          decimals: 18
        },
        {
          name: "Exeedme",
          symbol: "XED",
          address: "0x5621b5A3f4a8008c4CCDd1b942B121c8B1944F1f",
          decimals: 18
        },
        {
          name: "XEND",
          symbol: "XEND",
          address: "0x4a080377f83D669D7bB83B3184a8A5E61B500608",
          decimals: 18
        },
        {
          name: "xMARK",
          symbol: "xMARK",
          address: "0x26A5dFab467d4f58fB266648CAe769503CEC9580",
          decimals: 9
        },
        {
          name: "XRP Token",
          symbol: "XRP",
          address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
          decimals: 18
        },
        {
          name: "Tezos Token",
          symbol: "XTZ",
          address: "0x16939ef78684453bfDFb47825F8a5F714f12623a",
          decimals: 18
        },
        {
          name: "Venus Token",
          symbol: "XVS",
          address: "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",
          decimals: 18
        },
        {
          name: "yearn.finance",
          symbol: "YFI",
          address: "0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e",
          decimals: 18
        },
        {
          name: "YFII.finance Token",
          symbol: "YFII",
          address: "0x7F70642d88cf1C4a3a7abb072B53B929b653edA5",
          decimals: 18
        },
        {
          name: "Zcash Token",
          symbol: "ZEC",
          address: "0x1Ba42e5193dfA8B03D15dd1B86a3113bbBEF8Eeb",
          decimals: 18
        },
        {
          name: "ZeroSwapToken",
          symbol: "ZEE",
          address: "0x44754455564474A89358B2C2265883DF993b12F0",
          decimals: 18
        },
        {
          name: "Zilliqa",
          symbol: "ZIL",
          address: "0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787",
          decimals: 12
        },
        {
          name: "openANX Token",
          symbol: "OAX",
          address: "0x31720B2276Df3b3B757B55845d17Eea184d4fc8f",
          decimals: 18
        },
        {
          name: "Impossible Decentralized Incubator Access Token",
          symbol: "IDIA",
          address: "0x0b15Ddf19D47E6a86A56148fb4aFFFc6929BcB89",
          decimals: 18
        },
        {
          name: "Biswap",
          symbol: "BSW",
          address: "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1",
          decimals: 18
        },
        {
          name: "OpenSwap Booster - IDIA Series #1",
          symbol: "bqIDIA1",
          address: "0x46c5BC0656301c3DFb8EF8fc44CfBF89ef121348",
          decimals: 18
        }
      ];
    }
  });

  // src/store/data/tokens/mainnet/ethereum.json
  var require_ethereum = __commonJS({
    "src/store/data/tokens/mainnet/ethereum.json"(exports, module) {
      module.exports = [
        {
          address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
          name: "Aave",
          symbol: "AAVE",
          decimals: 18
        },
        {
          address: "0xfF20817765cB7f73d4bde2e66e067E58D11095C2",
          name: "Amp",
          symbol: "AMP",
          decimals: 18
        },
        {
          name: "Aragon Network Token",
          address: "0x960b236A07cf122663c4303350609A66A7B288C0",
          symbol: "ANT",
          decimals: 18
        },
        {
          name: "Balancer",
          address: "0xba100000625a3754423978a60c9317c58a424e3D",
          symbol: "BAL",
          decimals: 18
        },
        {
          address: "0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55",
          name: "Band Protocol",
          symbol: "BAND",
          decimals: 18
        },
        {
          name: "Bancor Network Token",
          address: "0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C",
          symbol: "BNT",
          decimals: 18
        },
        {
          name: "Compound",
          address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
          symbol: "COMP",
          decimals: 18
        },
        {
          name: "Curve DAO Token",
          address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
          symbol: "CRV",
          decimals: 18
        },
        {
          address: "0x41e5560054824eA6B0732E656E3Ad64E20e94E45",
          name: "Civic",
          symbol: "CVC",
          decimals: 8
        },
        {
          name: "Dai Stablecoin",
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          symbol: "DAI",
          decimals: 18,
          isCommon: true
        },
        {
          address: "0x0AbdAce70D3790235af448C88547603b945604ea",
          name: "district0x",
          symbol: "DNT",
          decimals: 18
        },
        {
          name: "Gnosis Token",
          address: "0x6810e776880C02933D47DB1b9fc05908e5386b96",
          symbol: "GNO",
          decimals: 18
        },
        {
          address: "0xc944E90C64B2c07662A292be6244BDf05Cda44a7",
          name: "The Graph",
          symbol: "GRT",
          decimals: 18
        },
        {
          address: "0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC",
          name: "Keep Network",
          symbol: "KEEP",
          decimals: 18
        },
        {
          name: "Kyber Network Crystal",
          address: "0xdd974D5C2e2928deA5F71b9825b8b646686BD200",
          symbol: "KNC",
          decimals: 18
        },
        {
          name: "ChainLink Token",
          address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
          symbol: "LINK",
          decimals: 18
        },
        {
          name: "Loom Network",
          address: "0xA4e8C3Ec456107eA67d3075bF9e3DF3A75823DB0",
          symbol: "LOOM",
          decimals: 18
        },
        {
          name: "LoopringCoin V2",
          address: "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
          symbol: "LRC",
          decimals: 18
        },
        {
          address: "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942",
          name: "Decentraland",
          symbol: "MANA",
          decimals: 18
        },
        {
          name: "Maker",
          address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
          symbol: "MKR",
          decimals: 18
        },
        {
          address: "0xec67005c4E498Ec7f55E092bd1d35cbC47C91892",
          name: "Melon",
          symbol: "MLN",
          decimals: 18
        },
        {
          name: "Numeraire",
          address: "0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671",
          symbol: "NMR",
          decimals: 18
        },
        {
          address: "0x4fE83213D56308330EC302a8BD641f1d0113A4Cc",
          name: "NuCypher",
          symbol: "NU",
          decimals: 18
        },
        {
          name: "Orchid",
          address: "0x4575f41308EC1483f3d399aa9a2826d74Da13Deb",
          symbol: "OXT",
          decimals: 18
        },
        {
          name: "Republic Token",
          address: "0x408e41876cCCDC0F92210600ef50372656052a38",
          symbol: "REN",
          decimals: 18
        },
        {
          name: "Reputation Augur v1",
          address: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
          symbol: "REP",
          decimals: 18
        },
        {
          name: "Reputation Augur v2",
          address: "0x221657776846890989a759BA2973e427DfF5C9bB",
          symbol: "REPv2",
          decimals: 18
        },
        {
          name: "Synthetix Network Token",
          address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
          symbol: "SNX",
          decimals: 18
        },
        {
          name: "Storj Token",
          address: "0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC",
          symbol: "STORJ",
          decimals: 8
        },
        {
          address: "0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa",
          name: "tBTC",
          symbol: "TBTC",
          decimals: 18
        },
        {
          name: "UMA Voting Token v1",
          address: "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828",
          symbol: "UMA",
          decimals: 18
        },
        {
          name: "Uniswap",
          address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
          symbol: "UNI",
          decimals: 18
        },
        {
          name: "USDCoin",
          address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          symbol: "USDC",
          decimals: 6,
          isCommon: true
        },
        {
          name: "Tether USD",
          address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          symbol: "USDT",
          decimals: 6,
          isCommon: true
        },
        {
          name: "Wrapped BTC",
          address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
          symbol: "WBTC",
          decimals: 8,
          isCommon: true
        },
        {
          address: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
          name: "yearn finance",
          symbol: "YFI",
          decimals: 18
        },
        {
          name: "0x Protocol Token",
          address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
          symbol: "ZRX",
          decimals: 18
        },
        {
          name: "openANX Token",
          address: "0x701C244b988a513c945973dEFA05de933b23Fe1D",
          symbol: "OAX",
          decimals: 18
        },
        {
          name: "Wrapped Ether",
          symbol: "WETH",
          address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          decimals: 18,
          isCommon: true,
          isWETH: true
        }
      ];
    }
  });

  // src/store/data/tokens/mainnet/polygon.json
  var require_polygon = __commonJS({
    "src/store/data/tokens/mainnet/polygon.json"(exports, module) {
      module.exports = [
        {
          address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
          name: "Wrapped Matic",
          symbol: "WMATIC",
          decimals: 18,
          isCommon: true,
          isWETH: true
        },
        { address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", name: "Wrapped Ether", symbol: "WETH", decimals: 18 },
        { address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", name: "USD Coin (PoS)", symbol: "USDC", decimals: 6, isCommon: true },
        { address: "0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683", name: "SAND", symbol: "SAND", decimals: 18 },
        { address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", name: "(PoS) Tether USD", symbol: "USDT", decimals: 6 },
        { address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", name: "(PoS) Wrapped BTC", symbol: "WBTC", decimals: 8 },
        { address: "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1", name: "miMATIC", symbol: "miMATIC", decimals: 18 },
        {
          address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
          name: "(PoS) Dai Stablecoin",
          symbol: "DAI",
          decimals: 18,
          isCommon: true
        },
        { address: "0x831753DD7087CaC61aB5644b308642cc1c33Dc13", name: "Quickswap", symbol: "QUICK", decimals: 18 },
        { address: "0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32", name: "Telcoin (PoS)", symbol: "TEL", decimals: 2 },
        { address: "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7", name: "Aavegotchi GHST Token (PoS)", symbol: "GHST", decimals: 18 },
        { address: "0x580A84C73811E1839F75d86d75d88cCa0c241fF4", name: "Qi Dao", symbol: "QI", decimals: 18 },
        { address: "0xE5417Af564e4bFDA1c483642db72007871397896", name: "Gains Network", symbol: "GNS", decimals: 18 },
        { address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B", name: "Aave (PoS)", symbol: "AAVE", decimals: 18, isCommon: true },
        { address: "0xc6C855AD634dCDAd23e64DA71Ba85b8C51E5aD7c", name: "Decentral Games ICE", symbol: "ICE", decimals: 18 },
        { address: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", name: "ChainLink Token", symbol: "LINK", decimals: 18 },
        { address: "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b", name: "Avalanche Token", symbol: "AVAX", decimals: 18 },
        { address: "0xB85517b87BF64942adf3A0B9E4c71E4Bc5Caa4e5", name: "Fantom Token", symbol: "FTM", decimals: 18 },
        { address: "0x229b1b6C23ff8953D663C4cBB519717e323a0a84", name: "BLOK", symbol: "BLOK", decimals: 18 }
      ];
    }
  });

  // src/store/data/tokens/mainnet/avalanche.json
  var require_avalanche = __commonJS({
    "src/store/data/tokens/mainnet/avalanche.json"(exports, module) {
      module.exports = [
        {
          address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
          name: "Wrapped AVAX",
          symbol: "WAVAX",
          decimals: 18,
          isCommon: true,
          isWETH: true
        },
        { address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664", name: "USD Coin", symbol: "USDC.e", decimals: 6, isCommon: true },
        {
          address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
          name: "Wrapped Ether",
          symbol: "WETH.e",
          decimals: 18,
          isCommon: true
        },
        { address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118", name: "Tether USD", symbol: "USDT.e", decimals: 6, isCommon: true },
        { address: "0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5", name: "BENQI", symbol: "QI", decimals: 18 },
        { address: "0x60781C2586D68229fde47564546784ab3fACA982", name: "Pangolin", symbol: "PNG", decimals: 18 },
        {
          address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
          name: "Dai Stablecoin",
          symbol: "DAI.e",
          decimals: 18,
          isCommon: true
        },
        { address: "0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4", name: "Avalaunch", symbol: "XAVA", decimals: 18 },
        { address: "0x130966628846BFd36ff31a822705796e8cb8C18D", name: "Magic Internet Money", symbol: "MIM", decimals: 18 },
        { address: "0x50b7545627a5162F82A992c33b87aDc75187B218", name: "Wrapped BTC", symbol: "WBTC.e", decimals: 8 },
        { address: "0x5947BB275c521040051D82396192181b413227A3", name: "Chainlink Token", symbol: "LINK.e", decimals: 18 },
        { address: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64", name: "Frax", symbol: "FRAX", decimals: 18 },
        { address: "0x4f60a160D8C2DDdaAfe16FCC57566dB84D674BD6", name: "Jewels", symbol: "JEWEL", decimals: 18 },
        { address: "0x59414b3089ce2AF0010e7523Dea7E2b35d776ec7", name: "Yak Token", symbol: "YAK", decimals: 18 },
        { address: "0x214DB107654fF987AD859F34125307783fC8e387", name: "Frax Share", symbol: "FXS", decimals: 18 },
        { address: "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB", name: "TrueUSD", symbol: "TUSD", decimals: 18 },
        { address: "0xCE1bFFBD5374Dac86a2893119683F4911a2F7814", name: "Spell Token", symbol: "SPELL", decimals: 18 },
        { address: "0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c", name: "PenguinToken", symbol: "PEFI", decimals: 18 },
        { address: "0x346A59146b9b4a77100D369a3d18E8007A9F46a6", name: "AVAI", symbol: "AVAI", decimals: 18 },
        { address: "0x321E7092a180BB43555132ec53AaA65a5bF84251", name: "Governance OHM", symbol: "gOHM", decimals: 18 },
        { address: "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd", name: "JoeToken", symbol: "JOE", decimals: 18 },
        { address: "0xdef1fac7Bf08f173D286BbBDcBeeADe695129840", name: "Cerby Token", symbol: "CERBY", decimals: 18 },
        { address: "0x63682bDC5f875e9bF69E201550658492C9763F89", name: "Betswap.gg", symbol: "BSGG", decimals: 18 },
        { address: "0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33", name: "JoeBar", symbol: "xJOE", decimals: 18 },
        { address: "0xe0Ce60AF0850bF54072635e66E79Df17082A1109", name: "Ice Token", symbol: "ICE", decimals: 18 },
        { address: "0x3Ee97d514BBef95a2f110e6B9b73824719030f7a", name: "Staked Spell Token", symbol: "sSPELL", decimals: 18 },
        { address: "0xCDEB5641dC5BF05845317B00643A713CCC3b22e6", name: "Huobi", symbol: "HT", decimals: 18 },
        { address: "0xA56B1b9f4e5A1A1e0868F5Fd4352ce7CdF0C2A4F", name: "Matic", symbol: "MATIC", decimals: 18 },
        { address: "0xF873633DF9D5cDd62BB1f402499CC470a72A02D7", name: "MoonRiver", symbol: "MOVR", decimals: 18 },
        { address: "0xA384Bc7Cdc0A93e686da9E7B8C0807cD040F4E0b", name: "WOWSwap", symbol: "WOW", decimals: 18 },
        { address: "0x0da67235dD5787D67955420C84ca1cEcd4E5Bb3b", name: "Wrapped Memo", symbol: "wMEMO", decimals: 18 },
        { address: "0xb54f16fB19478766A268F172C9480f8da1a7c9C3", name: "Time", symbol: "TIME", decimals: 18 },
        { address: "0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76", name: "SushiToken", symbol: "SUSHI", decimals: 18 },
        { address: "0x63a72806098Bd3D9520cC43356dD78afe5D386D9", name: "Aave Token", symbol: "AAVE", decimals: 18 }
      ];
    }
  });

  // src/store/data/tokens/mainnet/fantom.json
  var require_fantom = __commonJS({
    "src/store/data/tokens/mainnet/fantom.json"(exports, module) {
      module.exports = [
        {
          address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
          name: "Wrapped Fantom",
          symbol: "WFTM",
          decimals: 18,
          isCommon: true,
          isWETH: true
        },
        { address: "0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7", name: "TOMB", symbol: "TOMB", decimals: 18 },
        { address: "0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37", name: "TSHARE", symbol: "TSHARE", decimals: 18 },
        { address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75", name: "USD Coin", symbol: "USDC", decimals: 6, isCommon: true },
        { address: "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE", name: "SpookyToken", symbol: "BOO", decimals: 18 },
        { address: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E", name: "Dai Stablecoin", symbol: "DAI", decimals: 18 },
        { address: "0x74b23882a30290451A17c44f4F05243b6b58C76d", name: "Ethereum", symbol: "ETH", decimals: 18 },
        { address: "0x321162Cd933E2Be498Cd2267a90534A804051b11", name: "Bitcoin", symbol: "BTC", decimals: 8 },
        { address: "0x049d68029688eAbF473097a2fC38ef61633A3C7A", name: "Frapped USDT", symbol: "fUSDT", decimals: 6 },
        { address: "0x82f0B8B456c1A451378467398982d4834b6829c1", name: "Magic Internet Money", symbol: "MIM", decimals: 18 },
        { address: "0xe0654C8e6fd4D733349ac7E09f6f23DA256bF475", name: "Scream", symbol: "SCREAM", decimals: 18 },
        { address: "0x5602df4A94eB6C680190ACCFA2A475621E0ddBdc", name: "Spartacus", symbol: "SPA", decimals: 9 },
        { address: "0xd8321AA83Fb0a4ECd6348D4577431310A6E0814d", name: "Geist.Finance Protocol Token", symbol: "GEIST", decimals: 18 },
        { address: "0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454", name: "Binance", symbol: "BNB", decimals: 18 },
        { address: "0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0", name: "Hector", symbol: "HEC", decimals: 9 },
        { address: "0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8", name: "ChainLink", symbol: "LINK", decimals: 18 },
        { address: "0x9879aBDea01a879644185341F7aF7d8343556B7a", name: "TrueUSD", symbol: "TUSD", decimals: 18 },
        { address: "0xfB98B335551a418cD0737375a2ea0ded62Ea213b", name: "miMATIC", symbol: "miMATIC", decimals: 18 },
        { address: "0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC", name: "Sushi", symbol: "SUSHI", decimals: 18 },
        { address: "0xdDcb3fFD12750B45d32E084887fdf1aABAb34239", name: "Anyswap", symbol: "ANY", decimals: 18 },
        { address: "0x511D35c52a3C244E7b8bd92c0C297755FbD89212", name: "Avalanche", symbol: "AVAX", decimals: 18 },
        { address: "0x468003B688943977e6130F4F68F23aad939a1040", name: "Spell Token", symbol: "SPELL", decimals: 18 },
        { address: "0x5Cc61A78F164885776AA610fb0FE1257df78E59B", name: "SpiritSwap Token", symbol: "SPIRIT", decimals: 18 },
        { address: "0x10b620b2dbAC4Faa7D7FFD71Da486f5D44cd86f9", name: "Liquid Driver", symbol: "LQDR", decimals: 18 },
        { address: "0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355", name: "Frax", symbol: "FRAX", decimals: 18 }
      ];
    }
  });

  // src/store/data/tokens/mainnet/cronos.json
  var require_cronos = __commonJS({
    "src/store/data/tokens/mainnet/cronos.json"(exports, module) {
      module.exports = [
        {
          address: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
          name: "WCRO",
          symbol: "WCRO",
          decimals: 18,
          isCommon: true,
          isWETH: true
        },
        {
          address: "0xe44Fd7fCb2b1581822D0c862B68222998a0c299a",
          name: "WETH",
          symbol: "WCRO",
          decimals: 18,
          isCommon: true
        },
        {
          address: "0x062E66477Faf219F25D27dCED647BF57C3107d52",
          name: "WBTC",
          symbol: "WBTC",
          decimals: 8,
          isCommon: true
        },
        {
          address: "0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",
          name: "USDC",
          symbol: "USDC",
          decimals: 6,
          isCommon: true
        },
        {
          address: "0x66e428c3f67a68878562e79A0234c1F83c208770",
          name: "USDT",
          symbol: "USDT",
          decimals: 6,
          isCommon: true
        },
        {
          address: "0xF2001B145b43032AAF5Ee2884e456CCd805F677D",
          name: "DAI",
          symbol: "DAI",
          decimals: 18,
          isCommon: true
        }
      ];
    }
  });

  // src/store/data/tokens/testnet/kovan.json
  var require_kovan = __commonJS({
    "src/store/data/tokens/testnet/kovan.json"(exports, module) {
      module.exports = [
        {
          name: "Wrapped ETH",
          address: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
          symbol: "WETH",
          decimals: 18,
          isCommon: true,
          isWETH: true
        },
        {
          name: "USDC",
          address: "0xe7EB1b3f0b7f287a93c34A313552974669C425B6",
          symbol: "USDC",
          decimals: 6,
          isCommon: true
        },
        {
          name: "USDT",
          address: "0xDcdAFd9461c2df544F6E2165481E8174e45fEbD8",
          symbol: "USDT",
          decimals: 6,
          isCommon: true,
          isVaultToken: true
        },
        {
          name: "DAI",
          address: "0x25b061e0fcBB2Fbe38A5e669957eFF3DFE03d28f",
          symbol: "DAI",
          decimals: 18
        },
        {
          name: "openANX Token",
          address: "0xbe01a8e3F1E3841ccbf6eeEB09215A3a3bdBe336",
          symbol: "OAX",
          decimals: 18
        },
        {
          name: "CAKE",
          address: "0x5f33463E584D7D2Caa50b597984F0C4512A79aaf",
          symbol: "CAKE",
          decimals: 18
        },
        {
          name: "Uniswap",
          symbol: "UNI",
          address: "0xB409C977546d60BFBcd235Bb6cDfB71b1364e509",
          decimals: 18
        },
        {
          name: "OpenSwap",
          address: "0x28A6a9079fA8e041179cD13F4652af2B315b6fd8",
          symbol: "OSWAP",
          decimals: 18
        }
      ];
    }
  });

  // src/store/data/tokens/testnet/bsc-testnet.json
  var require_bsc_testnet = __commonJS({
    "src/store/data/tokens/testnet/bsc-testnet.json"(exports, module) {
      module.exports = [
        {
          name: "Wrapped BNB",
          address: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
          symbol: "WBNB",
          decimals: 18,
          isCommon: true,
          isWETH: true
        },
        {
          name: "USDT",
          address: "0x29386B60e0A9A1a30e1488ADA47256577ca2C385",
          symbol: "USDT",
          decimals: 6,
          isCommon: true
        },
        {
          name: "BUSD Token",
          symbol: "BUSD",
          address: "0xDe9334C157968320f26e449331D6544b89bbD00F",
          decimals: 18,
          isCommon: true
        },
        {
          name: "USDC",
          address: "0x3fEA4Fa8fBEAc2eEa431b49243560dE48eFCA2a1",
          symbol: "USDC",
          decimals: 6
        },
        {
          name: "DAI",
          address: "0xB78DAa2F1A2de8270a5641f052FaFC4b2b3ea3B1",
          symbol: "DAI",
          decimals: 18
        },
        {
          name: "openANX Token",
          address: "0x8677048f3eD472610514bA6EF6Ec2f03b550eBdB",
          symbol: "OAX",
          decimals: 18
        },
        {
          name: "CAKE",
          address: "0xEF899e45461F4614655AEe012ec69ae12F97F81e",
          symbol: "CAKE",
          decimals: 18
        },
        {
          name: "BakeryToken",
          address: "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5",
          symbol: "BAKE",
          decimals: 18
        },
        {
          name: "Polkadot Token",
          symbol: "DOT",
          address: "0x6679b8031519fA81fE681a93e98cdddA5aafa95b",
          decimals: 18
        },
        {
          name: "Impossible Finance",
          symbol: "IF",
          address: "0x3245fD889abe511A7d57643905368F8Ec8fd4A92",
          decimals: 18
        },
        {
          name: "Coin98",
          symbol: "C98",
          address: "0x5EB137B421AE7Be6Ce26C3dE7c828c475C9a69b1",
          decimals: 18
        },
        {
          name: "Impossible Decentralized Incubator Access Token",
          symbol: "IDIA",
          address: "0x52423B7F0769d0365EbdD79342ce167eB9C29AE2",
          decimals: 18
        },
        {
          name: "OpenSwap",
          address: "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
          symbol: "OSWAP",
          decimals: 18,
          isCommon: true
        },
        {
          name: "mOpenSwap",
          address: "0xC2C76387eB1cd15f2f55D2463b5AAd6fca062EB1",
          symbol: "mOSWAP",
          decimals: 18
        },
        {
          name: "Project",
          address: "0x100c8C9eFCb56A253d5A82059647A2adEFDC984A",
          symbol: "PRO",
          decimals: 18
        },
        {
          name: "mProject",
          address: "0x05039f76eB9Dcb6aB49b4D5860980e32f976e17b",
          symbol: "mPRO",
          decimals: 18
        },
        {
          name: "mIDIA",
          address: "0x18CE3F88De23DC2A72f3aDDeB048caa01059E9f3",
          symbol: "mIDIA",
          decimals: 18
        },
        {
          name: "Testing",
          address: "0xc9E10b2a33631c1F9b185Df07198591d507CcE20",
          symbol: "TS",
          decimals: 18
        },
        {
          name: "tokenT",
          address: "0xb79aA5c1730Ad78dD958f05fD87022aeF3e50721",
          symbol: "TT",
          decimals: 18
        },
        {
          name: "JetSwap Token",
          address: "0x8839903E0D698e5976C39E34bDED66F7B9a1b8c9",
          symbol: "WINGS",
          decimals: 18
        }
      ];
    }
  });

  // src/store/data/tokens/testnet/fuji.json
  var require_fuji = __commonJS({
    "src/store/data/tokens/testnet/fuji.json"(exports, module) {
      module.exports = [
        {
          name: "Wrapped AVAX",
          address: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
          symbol: "WAVAX",
          decimals: 18,
          isCommon: true,
          isWETH: true
        },
        {
          name: "Pangolin",
          address: "0x6d0A79756774c7cbac6Ce5c5e3b0f40b0ccCcB20",
          symbol: "PNG",
          decimals: 18
        },
        {
          name: "OpenSwap",
          address: "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
          symbol: "OSWAP",
          decimals: 18,
          isCommon: true
        },
        {
          name: "Tether USD",
          address: "0xb9C31Ea1D475c25E58a1bE1a46221db55E5A7C6e",
          symbol: "USDT.e",
          decimals: 6
        },
        {
          name: "HakuSwap Token",
          address: "0x2093f387FA92d3963A4Bc8Fd8E4f88cD82c0d14A",
          symbol: "HAKU",
          decimals: 18
        },
        {
          name: "Snowball",
          address: "0xF319e2f610462F846d6e93F51CdC862EEFF2a554",
          symbol: "SNOB",
          decimals: 18
        },
        {
          name: "TEDDY",
          address: "0x7B635b81920F2C9B7a217DD898BeC9F6D309470D",
          symbol: "TEDDY",
          decimals: 18
        },
        {
          name: "AxialToken",
          address: "0x57b8a194230ef402584130B1eD31d2C4682d7a71",
          symbol: "AXIAL",
          decimals: 18
        }
      ];
    }
  });

  // src/store/data/tokens/testnet/mumbai.json
  var require_mumbai = __commonJS({
    "src/store/data/tokens/testnet/mumbai.json"(exports, module) {
      module.exports = [
        {
          name: "USDT",
          address: "0xEB9262129682Df3FD34A8C001c1AE3B75a6Bf193",
          symbol: "USDT",
          decimals: 18
        },
        {
          name: "OpenSwap",
          address: "0xA9d603421e2777b8BEa685272611A01fF3bc6523",
          symbol: "OSWAP",
          decimals: 18,
          isCommon: true
        },
        {
          address: "0xDe0399014ED809e0E5976D391013dEd315c6B778",
          name: "Wrapped Matic",
          symbol: "WMATIC",
          decimals: 18,
          isCommon: true,
          isWETH: true
        }
      ];
    }
  });

  // src/store/data/tokens/testnet/fantom-testnet.json
  var require_fantom_testnet = __commonJS({
    "src/store/data/tokens/testnet/fantom-testnet.json"(exports, module) {
      module.exports = [
        {
          address: "0xf1277d1Ed8AD466beddF92ef448A132661956621",
          decimals: 18,
          name: "Wrapped Fantom",
          symbol: "WFTM",
          isWETH: true
        },
        {
          name: "OpenSwap",
          address: "0xDe0399014ED809e0E5976D391013dEd315c6B778",
          symbol: "OSWAP",
          decimals: 18,
          isCommon: true
        }
      ];
    }
  });

  // src/store/data/tokens/testnet/amino.json
  var require_amino = __commonJS({
    "src/store/data/tokens/testnet/amino.json"(exports, module) {
      module.exports = [
        {
          name: "USDT",
          address: "0x28A6a9079fA8e041179cD13F4652af2B315b6fd8",
          symbol: "USDT",
          decimals: 18
        },
        {
          name: "CAKE",
          address: "0x8dc927D1c259A2EdA099712eAFB57509aD4164b7",
          symbol: "CAKE",
          decimals: 18
        },
        {
          name: "BUSD",
          address: "0x5d3e849B757afD8500b0F514933eEb55a92EB757",
          symbol: "BUSD",
          decimals: 18
        },
        {
          name: "Wrapped ACT",
          address: "0xBB04C4927A05Cf7d3e329E6333658D48A9313356",
          symbol: "WACT",
          decimals: 18,
          isCommon: true,
          isWETH: true
        }
      ];
    }
  });

  // src/store/data/tokens/testnet/aminoX-testnet.json
  var require_aminoX_testnet = __commonJS({
    "src/store/data/tokens/testnet/aminoX-testnet.json"(exports, module) {
      module.exports = [
        {
          name: "OpenSwap",
          address: "0xA0AF68AB35fa4618b57C1A7CFc07A8caa0cBf07E",
          symbol: "OSWAP",
          decimals: 18,
          isCommon: true
        },
        {
          name: "Tether USD",
          address: "0xFFfffffF8d2EE523a2206206994597c13D831EC7",
          symbol: "USDT",
          decimals: 6,
          isCommon: true
        },
        {
          name: "DAI Stablecoin",
          address: "0xFFFffffFE89094c44da98B954eEDEac495271D0f",
          symbol: "DAI",
          decimals: 18,
          isCommon: true
        },
        {
          name: "Wrapped ACT",
          address: "0xCb5e100fdF7d24f25865fa85673D9bD6Bb4674ab",
          symbol: "WACT",
          decimals: 18,
          isCommon: true,
          isWETH: true
        }
      ];
    }
  });

  // src/store/data/tokens/testnet/cronos-testnet.json
  var require_cronos_testnet = __commonJS({
    "src/store/data/tokens/testnet/cronos-testnet.json"(exports, module) {
      module.exports = [
        {
          address: "0x6a3173618859C7cd40fAF6921b5E9eB6A76f1fD4",
          name: "Wrapped CRO",
          symbol: "WCRO",
          decimals: 18,
          isCommon: true,
          isWETH: true
        },
        {
          name: "WETH",
          address: "0x796135E94527c38433e9c42f4Cd91ca931E5e6A6",
          symbol: "WETH",
          decimals: 18,
          isCommon: true
        },
        {
          name: "WBTC",
          address: "0xEE200f25d7B1B9518AC944fd60b113d39bee209c",
          symbol: "WBTC",
          decimals: 8,
          isCommon: true
        },
        {
          name: "USDC",
          address: "0x25f0965F285F03d6F6B3B21c8EC3367412Fd0ef6",
          symbol: "USDC",
          decimals: 6,
          isCommon: true
        },
        {
          name: "USDT",
          address: "0xa144617Afd9205AF1ceDE3Cc671da1a409A82c5a",
          symbol: "USDT",
          decimals: 6,
          isCommon: true
        },
        {
          name: "DAI",
          address: "0x8662A8111daEC7570a1bDF3dbd3E163d41563904",
          symbol: "DAI",
          decimals: 18,
          isCommon: true
        },
        {
          name: "OSWAP",
          address: "0xA09d20Bac0A83b0d1454a2B3BA7A39D55ca00628",
          symbol: "OSWAP",
          decimals: 18,
          isCommon: true
        }
      ];
    }
  });

  // packages/vesting-sdk/lib/contracts/@openzeppelin/contracts/token/ERC721/ERC721.json.js
  var require_ERC721_json = __commonJS({
    "packages/vesting-sdk/lib/contracts/@openzeppelin/contracts/token/ERC721/ERC721.json.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = {
        "abi": [
          { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" },
          { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b5060405162001a9038038062001a90833981016040819052620000349162000127565b600062000042838262000220565b50600162000051828262000220565b505050620002ec565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008257600080fd5b81516001600160401b03808211156200009f576200009f6200005a565b604051601f8301601f19908116603f01168101908282118183101715620000ca57620000ca6200005a565b81604052838152602092508683858801011115620000e757600080fd5b600091505b838210156200010b5785820183015181830184015290820190620000ec565b838211156200011d5760008385830101525b9695505050505050565b600080604083850312156200013b57600080fd5b82516001600160401b03808211156200015357600080fd5b620001618683870162000070565b935060208501519150808211156200017857600080fd5b50620001878582860162000070565b9150509250929050565b600181811c90821680620001a657607f821691505b602082108103620001c757634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200021b57600081815260208120601f850160051c81016020861015620001f65750805b601f850160051c820191505b81811015620002175782815560010162000202565b5050505b505050565b81516001600160401b038111156200023c576200023c6200005a565b62000254816200024d845462000191565b84620001cd565b602080601f8311600181146200028c5760008415620002735750858301515b600019600386901b1c1916600185901b17855562000217565b600085815260208120601f198616915b82811015620002bd578886015182559484019460019091019084016200029c565b5085821015620002dc5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61179480620002fc6000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101d0578063b88d4fde146101e3578063c87b56dd146101f6578063e985e9c51461020957600080fd5b80636352211e1461019457806370a08231146101a757806395d89b41146101c857600080fd5b8063095ea7b3116100bd578063095ea7b31461015957806323b872dd1461016e57806342842e0e1461018157600080fd5b806301ffc9a7146100e457806306fdde031461010c578063081812fc14610121575b600080fd5b6100f76100f2366004611259565b610252565b60405190151581526020015b60405180910390f35b610114610337565b60405161010391906112ec565b61013461012f3660046112ff565b6103c9565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610103565b61016c610167366004611341565b6103fd565b005b61016c61017c36600461136b565b61058e565b61016c61018f36600461136b565b61062f565b6101346101a23660046112ff565b61064a565b6101ba6101b53660046113a7565b6106d6565b604051908152602001610103565b6101146107a4565b61016c6101de3660046113c2565b6107b3565b61016c6101f136600461142d565b6107c2565b6101146102043660046112ff565b61086a565b6100f7610217366004611527565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205460ff1690565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd0000000000000000000000000000000000000000000000000000000014806102e557507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061033157507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6060600080546103469061155a565b80601f01602080910402602001604051908101604052809291908181526020018280546103729061155a565b80156103bf5780601f10610394576101008083540402835291602001916103bf565b820191906000526020600020905b8154815290600101906020018083116103a257829003601f168201915b5050505050905090565b60006103d4826108de565b5060009081526004602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60006104088261064a565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036104ca576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff821614806104f357506104f38133610217565b61057f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016104c1565b610589838361096c565b505050565b6105983382610a0c565b610624576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f76656400000000000000000000000000000000000060648201526084016104c1565b610589838383610acc565b610589838383604051806020016040528060008152506107c2565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1680610331576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016104c1565b600073ffffffffffffffffffffffffffffffffffffffff821661077b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e6572000000000000000000000000000000000000000000000060648201526084016104c1565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b6060600180546103469061155a565b6107be338383610d33565b5050565b6107cc3383610a0c565b610858576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f76656400000000000000000000000000000000000060648201526084016104c1565b61086484848484610e60565b50505050565b6060610875826108de565b600061088c60408051602081019091526000815290565b905060008151116108ac57604051806020016040528060008152506108d7565b806108b684610f03565b6040516020016108c79291906115ad565b6040516020818303038152906040525b9392505050565b60008181526002602052604090205473ffffffffffffffffffffffffffffffffffffffff16610969576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016104c1565b50565b600081815260046020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff841690811790915581906109c68261064a565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610a188361064a565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610a86575073ffffffffffffffffffffffffffffffffffffffff80821660009081526005602090815260408083209388168352929052205460ff165b80610ac457508373ffffffffffffffffffffffffffffffffffffffff16610aac846103c9565b73ffffffffffffffffffffffffffffffffffffffff16145b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff16610aec8261064a565b73ffffffffffffffffffffffffffffffffffffffff1614610b8f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e657200000000000000000000000000000000000000000000000000000060648201526084016104c1565b73ffffffffffffffffffffffffffffffffffffffff8216610c31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016104c1565b610c3c60008261096c565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600360205260408120805460019290610c7290849061160b565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600360205260408120805460019290610cad908490611622565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610dc8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016104c1565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526005602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610e6b848484610acc565b610e7784848484611038565b610864576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016104c1565b606081600003610f4657505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115610f705780610f5a8161163a565b9150610f699050600a836116a1565b9150610f4a565b60008167ffffffffffffffff811115610f8b57610f8b6113fe565b6040519080825280601f01601f191660200182016040528015610fb5576020820181803683370190505b5090505b8415610ac457610fca60018361160b565b9150610fd7600a866116b5565b610fe2906030611622565b60f81b818381518110610ff757610ff76116c9565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350611031600a866116a1565b9450610fb9565b600073ffffffffffffffffffffffffffffffffffffffff84163b15611220576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a02906110af9033908990889088906004016116f8565b6020604051808303816000875af1925050508015611108575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261110591810190611741565b60015b6111d5573d808015611136576040519150601f19603f3d011682016040523d82523d6000602084013e61113b565b606091505b5080516000036111cd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016104c1565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050610ac4565b506001949350505050565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461096957600080fd5b60006020828403121561126b57600080fd5b81356108d78161122b565b60005b83811015611291578181015183820152602001611279565b838111156108645750506000910152565b600081518084526112ba816020860160208601611276565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006108d760208301846112a2565b60006020828403121561131157600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461133c57600080fd5b919050565b6000806040838503121561135457600080fd5b61135d83611318565b946020939093013593505050565b60008060006060848603121561138057600080fd5b61138984611318565b925061139760208501611318565b9150604084013590509250925092565b6000602082840312156113b957600080fd5b6108d782611318565b600080604083850312156113d557600080fd5b6113de83611318565b9150602083013580151581146113f357600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806000806080858703121561144357600080fd5b61144c85611318565b935061145a60208601611318565b925060408501359150606085013567ffffffffffffffff8082111561147e57600080fd5b818701915087601f83011261149257600080fd5b8135818111156114a4576114a46113fe565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156114ea576114ea6113fe565b816040528281528a602084870101111561150357600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561153a57600080fd5b61154383611318565b915061155160208401611318565b90509250929050565b600181811c9082168061156e57607f821691505b6020821081036115a7577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b600083516115bf818460208801611276565b8351908301906115d3818360208801611276565b01949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008282101561161d5761161d6115dc565b500390565b60008219821115611635576116356115dc565b500190565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361166b5761166b6115dc565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000826116b0576116b0611672565b500490565b6000826116c4576116c4611672565b500690565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600073ffffffffffffffffffffffffffffffffffffffff80871683528086166020840152508360408301526080606083015261173760808301846112a2565b9695505050505050565b60006020828403121561175357600080fd5b81516108d78161122b56fea2646970667358221220e7e04c874040f7e432ac5c36fbe72c18b59f02bf921a723b30dff26dde7e3db564736f6c634300080f0033"
      };
    }
  });

  // packages/vesting-sdk/lib/contracts/@openzeppelin/contracts/token/ERC721/ERC721.js
  var require_ERC721 = __commonJS({
    "packages/vesting-sdk/lib/contracts/@openzeppelin/contracts/token/ERC721/ERC721.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ERC721 = void 0;
      var eth_wallet_1 = __require("@ijstech/eth-wallet");
      var ERC721_json_1 = __importDefault(require_ERC721_json());
      var ERC721 = class extends eth_wallet_1.Contract {
        constructor(wallet, address) {
          super(wallet, address, ERC721_json_1.default.abi, ERC721_json_1.default.bytecode);
          this.assign();
        }
        deploy(params) {
          return this.__deploy([params.name, params.symbol]);
        }
        parseApprovalEvent(receipt) {
          return this.parseEvents(receipt, "Approval").map((e) => this.decodeApprovalEvent(e));
        }
        decodeApprovalEvent(event) {
          let result = event.data;
          return {
            owner: result.owner,
            approved: result.approved,
            tokenId: new eth_wallet_1.BigNumber(result.tokenId),
            _event: event
          };
        }
        parseApprovalForAllEvent(receipt) {
          return this.parseEvents(receipt, "ApprovalForAll").map((e) => this.decodeApprovalForAllEvent(e));
        }
        decodeApprovalForAllEvent(event) {
          let result = event.data;
          return {
            owner: result.owner,
            operator: result.operator,
            approved: result.approved,
            _event: event
          };
        }
        parseTransferEvent(receipt) {
          return this.parseEvents(receipt, "Transfer").map((e) => this.decodeTransferEvent(e));
        }
        decodeTransferEvent(event) {
          let result = event.data;
          return {
            from: result.from,
            to: result.to,
            tokenId: new eth_wallet_1.BigNumber(result.tokenId),
            _event: event
          };
        }
        assign() {
          let balanceOf_call = async (owner) => {
            let result = await this.call("balanceOf", [owner]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.balanceOf = balanceOf_call;
          let getApproved_call = async (tokenId) => {
            let result = await this.call("getApproved", [eth_wallet_1.Utils.toString(tokenId)]);
            return result;
          };
          this.getApproved = getApproved_call;
          let isApprovedForAllParams = (params) => [params.owner, params.operator];
          let isApprovedForAll_call = async (params) => {
            let result = await this.call("isApprovedForAll", isApprovedForAllParams(params));
            return result;
          };
          this.isApprovedForAll = isApprovedForAll_call;
          let name_call = async () => {
            let result = await this.call("name");
            return result;
          };
          this.name = name_call;
          let ownerOf_call = async (tokenId) => {
            let result = await this.call("ownerOf", [eth_wallet_1.Utils.toString(tokenId)]);
            return result;
          };
          this.ownerOf = ownerOf_call;
          let supportsInterface_call = async (interfaceId) => {
            let result = await this.call("supportsInterface", [interfaceId]);
            return result;
          };
          this.supportsInterface = supportsInterface_call;
          let symbol_call = async () => {
            let result = await this.call("symbol");
            return result;
          };
          this.symbol = symbol_call;
          let tokenURI_call = async (tokenId) => {
            let result = await this.call("tokenURI", [eth_wallet_1.Utils.toString(tokenId)]);
            return result;
          };
          this.tokenURI = tokenURI_call;
          let approveParams = (params) => [params.to, eth_wallet_1.Utils.toString(params.tokenId)];
          let approve_send = async (params) => {
            let result = await this.send("approve", approveParams(params));
            return result;
          };
          let approve_call = async (params) => {
            let result = await this.call("approve", approveParams(params));
            return;
          };
          this.approve = Object.assign(approve_send, {
            call: approve_call
          });
          let safeTransferFromParams = (params) => [params.from, params.to, eth_wallet_1.Utils.toString(params.tokenId)];
          let safeTransferFrom_send = async (params) => {
            let result = await this.send("safeTransferFrom", safeTransferFromParams(params));
            return result;
          };
          let safeTransferFrom_call = async (params) => {
            let result = await this.call("safeTransferFrom", safeTransferFromParams(params));
            return;
          };
          this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
            call: safeTransferFrom_call
          });
          let safeTransferFrom_1Params = (params) => [params.from, params.to, eth_wallet_1.Utils.toString(params.tokenId), eth_wallet_1.Utils.stringToBytes(params.data)];
          let safeTransferFrom_1_send = async (params) => {
            let result = await this.send("safeTransferFrom", safeTransferFromParams(params));
            return result;
          };
          let safeTransferFrom_1_call = async (params) => {
            let result = await this.call("safeTransferFrom", safeTransferFromParams(params));
            return;
          };
          this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
            call: safeTransferFrom_1_call
          });
          let setApprovalForAllParams = (params) => [params.operator, params.approved];
          let setApprovalForAll_send = async (params) => {
            let result = await this.send("setApprovalForAll", setApprovalForAllParams(params));
            return result;
          };
          let setApprovalForAll_call = async (params) => {
            let result = await this.call("setApprovalForAll", setApprovalForAllParams(params));
            return;
          };
          this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
            call: setApprovalForAll_call
          });
          let transferFromParams = (params) => [params.from, params.to, eth_wallet_1.Utils.toString(params.tokenId)];
          let transferFrom_send = async (params) => {
            let result = await this.send("transferFrom", transferFromParams(params));
            return result;
          };
          let transferFrom_call = async (params) => {
            let result = await this.call("transferFrom", transferFromParams(params));
            return;
          };
          this.transferFrom = Object.assign(transferFrom_send, {
            call: transferFrom_call
          });
        }
      };
      exports.ERC721 = ERC721;
    }
  });

  // packages/vesting-sdk/lib/contracts/Authorization.json.js
  var require_Authorization_json = __commonJS({
    "packages/vesting-sdk/lib/contracts/Authorization.json.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = {
        "abi": [
          { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
          { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
          { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "608060405234801561001057600080fd5b50600080546001600160a01b031916331790556104e6806100326000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80639c52a7f11161005b5780639c52a7f11461010b578063a2f55ae51461011e578063d4ee1d9014610131578063f2fde38b1461015157600080fd5b80633fd8cc4e1461008257806360536172146100bc5780638da5cb5b146100c6575b600080fd5b6100a5610090366004610473565b60026020526000908152604090205460ff1681565b60405160ff90911681526020015b60405180910390f35b6100c4610164565b005b6000546100e69073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100b3565b6100c4610119366004610473565b610292565b6100c461012c366004610473565b610339565b6001546100e69073ffffffffffffffffffffffffffffffffffffffff1681565b6100c461015f366004610473565b6103dc565b60015473ffffffffffffffffffffffffffffffffffffffff16331461020f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e0000000000000000000000000000000000000000000000606482015260840160405180910390fd5b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102b657600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b60005473ffffffffffffffffffffffffffffffffffffffff16331461035d57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf5910161032e565b60005473ffffffffffffffffffffffffffffffffffffffff16331461040057600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b9060200161032e565b60006020828403121561048557600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146104a957600080fd5b939250505056fea2646970667358221220204dfa718d2d1509da75a054da35a6893fbad4ff68b8ea7f6cd08014cb27d22564736f6c634300080f0033"
      };
    }
  });

  // packages/vesting-sdk/lib/contracts/Authorization.js
  var require_Authorization = __commonJS({
    "packages/vesting-sdk/lib/contracts/Authorization.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Authorization = void 0;
      var eth_wallet_1 = __require("@ijstech/eth-wallet");
      var Authorization_json_1 = __importDefault(require_Authorization_json());
      var Authorization = class extends eth_wallet_1.Contract {
        constructor(wallet, address) {
          super(wallet, address, Authorization_json_1.default.abi, Authorization_json_1.default.bytecode);
          this.assign();
        }
        deploy() {
          return this.__deploy();
        }
        parseAuthorizeEvent(receipt) {
          return this.parseEvents(receipt, "Authorize").map((e) => this.decodeAuthorizeEvent(e));
        }
        decodeAuthorizeEvent(event) {
          let result = event.data;
          return {
            user: result.user,
            _event: event
          };
        }
        parseDeauthorizeEvent(receipt) {
          return this.parseEvents(receipt, "Deauthorize").map((e) => this.decodeDeauthorizeEvent(e));
        }
        decodeDeauthorizeEvent(event) {
          let result = event.data;
          return {
            user: result.user,
            _event: event
          };
        }
        parseStartOwnershipTransferEvent(receipt) {
          return this.parseEvents(receipt, "StartOwnershipTransfer").map((e) => this.decodeStartOwnershipTransferEvent(e));
        }
        decodeStartOwnershipTransferEvent(event) {
          let result = event.data;
          return {
            user: result.user,
            _event: event
          };
        }
        parseTransferOwnershipEvent(receipt) {
          return this.parseEvents(receipt, "TransferOwnership").map((e) => this.decodeTransferOwnershipEvent(e));
        }
        decodeTransferOwnershipEvent(event) {
          let result = event.data;
          return {
            user: result.user,
            _event: event
          };
        }
        assign() {
          let isPermitted_call = async (param1) => {
            let result = await this.call("isPermitted", [param1]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.isPermitted = isPermitted_call;
          let newOwner_call = async () => {
            let result = await this.call("newOwner");
            return result;
          };
          this.newOwner = newOwner_call;
          let owner_call = async () => {
            let result = await this.call("owner");
            return result;
          };
          this.owner = owner_call;
          let deny_send = async (user) => {
            let result = await this.send("deny", [user]);
            return result;
          };
          let deny_call = async (user) => {
            let result = await this.call("deny", [user]);
            return;
          };
          this.deny = Object.assign(deny_send, {
            call: deny_call
          });
          let permit_send = async (user) => {
            let result = await this.send("permit", [user]);
            return result;
          };
          let permit_call = async (user) => {
            let result = await this.call("permit", [user]);
            return;
          };
          this.permit = Object.assign(permit_send, {
            call: permit_call
          });
          let takeOwnership_send = async () => {
            let result = await this.send("takeOwnership");
            return result;
          };
          let takeOwnership_call = async () => {
            let result = await this.call("takeOwnership");
            return;
          };
          this.takeOwnership = Object.assign(takeOwnership_send, {
            call: takeOwnership_call
          });
          let transferOwnership_send = async (newOwner) => {
            let result = await this.send("transferOwnership", [newOwner]);
            return result;
          };
          let transferOwnership_call = async (newOwner) => {
            let result = await this.call("transferOwnership", [newOwner]);
            return;
          };
          this.transferOwnership = Object.assign(transferOwnership_send, {
            call: transferOwnership_call
          });
        }
      };
      exports.Authorization = Authorization;
    }
  });

  // packages/vesting-sdk/lib/contracts/ValidVestingVault.json.js
  var require_ValidVestingVault_json = __commonJS({
    "packages/vesting-sdk/lib/contracts/ValidVestingVault.json.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = {
        "abi": [
          { "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Authorize", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "nftId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalClaimed", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalAmount", "type": "uint256" }], "name": "Claim", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "vestingId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "startDate", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "endDate", "type": "uint256" }], "name": "CreateVesting", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "Deauthorize", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "Lock", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "nftId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }], "name": "Mint", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "NewCampaign", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "StartOwnershipTransfer", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }], "name": "TransferOwnership", "type": "event" },
          { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "dataUri", "type": "string" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "UpdateCampaign", "type": "event" },
          { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "campaignClaimed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "campaignIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "campaignInfo", "outputs": [{ "internalType": "string", "name": "dataUri", "type": "string" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "bool", "name": "ownerFrozen", "type": "bool" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "campaignLocked", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "campaignLocks", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }], "name": "campaignLocksLength", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }], "name": "claimMultiple", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "deny", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "startDate", "type": "uint256" }, { "internalType": "uint256", "name": "endDate", "type": "uint256" }], "name": "directLock", "outputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "nftId", "type": "uint256" }], "name": "getInfo", "outputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "uint256", "name": "vestingId", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "unclaimedFunds", "type": "uint256" }, { "internalType": "uint256", "name": "claimedAmount", "type": "uint256" }, { "internalType": "uint256", "name": "totalAmount", "type": "uint256" }, { "internalType": "uint256", "name": "startDate", "type": "uint256" }, { "internalType": "uint256", "name": "endDate", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "isLockIdVerified", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isPermitted", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "locks", "outputs": [{ "internalType": "enum ValidVestingVault.LockType", "name": "lockType", "type": "uint8" }, { "internalType": "uint256", "name": "vestingId", "type": "uint256" }, { "internalType": "string", "name": "dataUri", "type": "string" }, { "internalType": "bytes32", "name": "root", "type": "bytes32" }, { "internalType": "uint64", "name": "dateCreated", "type": "uint64" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "locksLength", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "vestingId", "type": "uint256" }], "name": "maximumAllowedClaimedFunds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes32", "name": "merkleRoot", "type": "bytes32" }, { "internalType": "string", "name": "dataUri", "type": "string" }], "name": "merkleLock", "outputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "bool", "name": "ownerFrozen", "type": "bool" }, { "internalType": "string", "name": "dataUri", "type": "string" }], "name": "newCampaign", "outputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [], "name": "newOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "nftIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "nftVestingId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "owner_", "type": "address" }], "name": "setOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "takeOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "string", "name": "dataUri", "type": "string" }], "name": "updateCampaign", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }], "name": "verifyDirectLock", "outputs": [{ "internalType": "uint256", "name": "nftId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "lockId", "type": "uint256" }, { "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "startDate", "type": "uint256" }, { "internalType": "uint256", "name": "endDate", "type": "uint256" }, { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }], "name": "verifyMerkleLock", "outputs": [{ "internalType": "uint256", "name": "nftId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "vestingClaimedAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [], "name": "vestingIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "vestingInfo", "outputs": [{ "internalType": "uint256", "name": "campaignId", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "startDate", "type": "uint256" }, { "internalType": "uint256", "name": "endDate", "type": "uint256" }, { "internalType": "enum ValidVestingVault.VestingStatus", "name": "status", "type": "uint8" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawFund", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
        ],
        "bytecode": "60806040523480156200001157600080fd5b506040516200562638038062005626833981016040819052620000349162000150565b600080546001600160a01b031916331790558181600362000056838262000249565b50600462000065828262000249565b5050601080546001600160a01b031916331790555062000315915050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620000ab57600080fd5b81516001600160401b0380821115620000c857620000c862000083565b604051601f8301601f19908116603f01168101908282118183101715620000f357620000f362000083565b816040528381526020925086838588010111156200011057600080fd5b600091505b8382101562000134578582018301518183018401529082019062000115565b83821115620001465760008385830101525b9695505050505050565b600080604083850312156200016457600080fd5b82516001600160401b03808211156200017c57600080fd5b6200018a8683870162000099565b93506020850151915080821115620001a157600080fd5b50620001b08582860162000099565b9150509250929050565b600181811c90821680620001cf57607f821691505b602082108103620001f057634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200024457600081815260208120601f850160051c810160208610156200021f5750805b601f850160051c820191505b8181101562000240578281556001016200022b565b5050505b505050565b81516001600160401b0381111562000265576200026562000083565b6200027d81620002768454620001ba565b84620001f6565b602080601f831160018114620002b557600084156200029c5750858301515b600019600386901b1c1916600185901b17855562000240565b600085815260208120601f198616915b82811015620002e657888601518255948401946001909101908401620002c5565b5085821015620003055787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61530180620003256000396000f3fe608060405234801561001057600080fd5b50600436106103365760003560e01c80636352211e116101b2578063ae205176116100f9578063e5bc504a116100a2578063f148550f1161007c578063f148550f1461084a578063f2fde38b1461085d578063f4dadc6114610870578063f7c8d2211461089457600080fd5b8063e5bc504a146107db578063e9217bd1146107ee578063e985e9c51461080157600080fd5b8063c45a0155116100d3578063c45a015514610788578063c87b56dd146107a8578063d4ee1d90146107bb57600080fd5b8063ae20517614610733578063b88d4fde14610753578063bb2238ec1461076657600080fd5b80639051cce91161015b5780639c52a7f1116101355780639c52a7f1146106fa578063a22cb4651461070d578063a2f55ae51461072057600080fd5b80639051cce9146106cc578063958ddc98146106df57806395d89b41146106f257600080fd5b80637c4556c11161018c5780637c4556c1146106835780638101f2bd1461068c5780638da5cb5b146106ac57600080fd5b80636352211e146105ee57806366ffcf5f1461060157806370a082311461067057600080fd5b806323b872dd116102815780634a0e835b1161022a578063511aed9911610204578063511aed99146105a75780635757afc5146105b05780635bfc5a6e146105de57806360536172146105e657600080fd5b80634a0e835b146105615780634ca14703146105815780634f6ccce71461059457600080fd5b8063379607f51161025b578063379607f5146105065780633fd8cc4e1461051957806342842e0e1461054e57600080fd5b806323b872dd146104d757806329014d2a146104ea5780632f745c59146104f357600080fd5b806312f308fa116102e357806318160ddd116102bd57806318160ddd1461044c5780631a3cd59a146104545780631c86fa90146104c457600080fd5b806312f308fa1461040657806313af403514610419578063141a93291461042c57600080fd5b8063089fd09d11610314578063089fd09d146103b0578063095ea7b3146103d15780630b651d2f146103e657600080fd5b806301ffc9a71461033b57806306fdde0314610363578063081812fc14610378575b600080fd5b61034e6103493660046145a6565b6108a7565b60405190151581526020015b60405180910390f35b61036b610903565b60405161035a9190614639565b61038b61038636600461464c565b610995565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161035a565b6103c36103be366004614687565b6109c9565b60405190815260200161035a565b6103e46103df3660046146cf565b610c63565b005b6103c36103f436600461464c565b60196020526000908152604090205481565b6103c36104143660046146fb565b610def565b6103e46104273660046147a1565b611106565b6103c361043a36600461464c565b60186020526000908152604090205481565b600b546103c3565b61046761046236600461464c565b6111ce565b60408051998a5260208a019890985273ffffffffffffffffffffffffffffffffffffffff96871697890197909752949093166060870152608086019190915260a085015260c084015260e08301526101008201526101200161035a565b6103c36104d2366004614807565b611302565b6103e46104e5366004614868565b6115fd565b6103c3600d5481565b6103c36105013660046146cf565b61169e565b6103e461051436600461464c565b61176d565b61053c6105273660046147a1565b60026020526000908152604090205460ff1681565b60405160ff909116815260200161035a565b6103e461055c366004614868565b611779565b6103c361056f36600461464c565b60126020526000908152604090205481565b6103e461058f3660046148a9565b611794565b6103c36105a236600461464c565b61190d565b6103c3600e5481565b61034e6105be3660046146cf565b601360209081526000928352604080842090915290825290205460ff1681565b6011546103c3565b6103e46119cb565b61038b6105fc36600461464c565b611af5565b61065e61060f36600461464c565b601660205260009081526040902080546001820154600283015460038401546004850154600590950154939473ffffffffffffffffffffffffffffffffffffffff909316939192909160ff1686565b60405161035a9695949392919061495b565b6103c361067e3660046147a1565b611b81565b6103c3600f5481565b6103c361069a36600461464c565b60176020526000908152604090205481565b60005461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b6103e46106da366004614a2c565b611c4f565b6103c36106ed36600461464c565b611c90565b61036b611db9565b6103e46107083660046147a1565b611dc8565b6103e461071b366004614ae0565b611e6f565b6103e461072e3660046147a1565b611e7e565b6103c361074136600461464c565b60009081526014602052604090205490565b6103e4610761366004614b19565b611f21565b61077961077436600461464c565b611fc9565b60405161035a93929190614bfb565b60105461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b61036b6107b636600461464c565b6120a1565b60015461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b6103c36107e9366004614c3b565b612115565b6103c36107fc366004614c5d565b612146565b61034e61080f366004614cc2565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260086020908152604080832093909416825291909152205460ff1690565b6103c361085836600461464c565b612387565b6103e461086b3660046147a1565b6126ae565b61088361087e36600461464c565b612745565b60405161035a959493929190614cf0565b6103e46108a23660046146cf565b61281f565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f780e9d630000000000000000000000000000000000000000000000000000000014806108fd57506108fd82612864565b92915050565b60606003805461091290614d3a565b80601f016020809104026020016040519081016040528092919081815260200182805461093e90614d3a565b801561098b5780601f106109605761010080835404028352916020019161098b565b820191906000526020600020905b81548152906001019060200180831161096e57829003601f168201915b5050505050905090565b60006109a082612947565b5060009081526007602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b3360009081526002602052604081205460ff16600114610a70576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60008681526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff16610aa38133876129d2565b94506000610ab48888888888612b29565b6011805460008b815260146020908152604080832080546001808201835591855283852001859055815160a0810183528481528084018890528251938401835284845291820192909252606081018390524267ffffffffffffffff1660808201528454808301865594909252815160059094027f31ecc21a745e3968a04e9570e4425bc18fa8019c68028196b546d1669c200c680180549398509495509093929183917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00909116908381811115610b8d57610b8d6148f5565b02179055506020820151600182015560408201516002820190610bb09082614ddb565b5060608201516003820155608090910151600490910180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff90921691909117905560008881526018602052604081208054889290610c1a908490614f24565b90915550506040518681523390899085907f114cc376d25215fb3215218ecf58c7fd5434f680efa149f1ef0b5ce3e7ca06fc9060200160405180910390a4505095945050505050565b6000610c6e82611af5565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610d2b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610a67565b3373ffffffffffffffffffffffffffffffffffffffff82161480610d545750610d54813361080f565b610de0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610a67565b610dea8383612d5e565b505050565b6000600160118981548110610e0657610e06614f3c565b600091825260209091206005909102015460ff166001811115610e2b57610e2b6148f5565b14610e92576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e76616c6964206c6f636b20747970650000000000000000000000000000006044820152606401610a67565b610f5e83838080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050601180549092508c91508110610ede57610ede614f3c565b6000918252602091829020600360059092020101546040517fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003360601b1692810192909252603482018b9052605482018a905260748201899052609482018890529060b40160405160208183030381529060405280519060200120612e39565b610fc4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f6d65726b6c652070726f6f66206661696c6564000000000000000000000000006044820152606401610a67565b3360009081526013602090815260408083208b845290915290205460ff1615611049576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f6d65726b6c65496420616c7265616479207665726966696564000000000000006044820152606401610a67565b60006110588833898989612b29565b600f8054935090915060019060006110708386614f24565b9091555050600082815260176020908152604080832084905533808452601383528184208d855290925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905551909184918b917f8334f87aeaf76e52b061d93ee968e51fdd3ad53ca04e80271249227997aab3a091a46110fa3383612e4f565b50979650505050505050565b60105473ffffffffffffffffffffffffffffffffffffffff163314611187576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4e6f742066726f6d20666163746f7279000000000000000000000000000000006044820152606401610a67565b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60008060008060008060008060006111e58a611af5565b60008b81526017602090815260408083205480845260168352818420825160c0810184528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169582019590955260028201549381019390935260038101546060840152600481015460808401526005810154919d50949b5092939092909160a084019160ff1690811115611279576112796148f5565b600181111561128a5761128a6148f5565b9052508051600081815260156020526040902060010154909b5073ffffffffffffffffffffffffffffffffffffffff16975090506112c789612e69565b9550601260008a8152602001908152602001600020549450806040015193508060600151925080608001519150509193959799909294969850565b3360009081526002602052604081205460ff166001146113a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8161140b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b5060118054600087815260146020908152604080832080546001808201835591855283852001859055815160a081018352908152808301939093528051601f870183900483028101830182528681529394939083019187908790819084018382808284376000920182905250938552505050602080830189905267ffffffffffffffff4216604090930192909252835460018181018655948252919020825160059092020180549293909283917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff009091169083818111156114ee576114ee6148f5565b021790555060208201516001820155604082015160028201906115119082614ddb565b5060608201516003820155608090910151600490910180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff90921691909117905560008681526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff166115908133886129d2565b9550856018600089815260200190815260200160002060008282546115b59190614f24565b90915550506040518681523390889084907f114cc376d25215fb3215218ecf58c7fd5434f680efa149f1ef0b5ce3e7ca06fc9060200160405180910390a45095945050505050565b6116073382612e8b565b611693576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f7665640000000000000000000000000000000000006064820152608401610a67565b610dea838383612f4a565b60006116a983611b81565b8210611737576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e64730000000000000000000000000000000000000000006064820152608401610a67565b5073ffffffffffffffffffffffffffffffffffffffff919091166000908152600960209081526040808320938352929052205490565b611776816130b6565b50565b610dea83838360405180602001604052806000815250611f21565b3360009081526002602052604090205460ff16600114611836576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8061189d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b60008381526015602052604090206118b6828483614f6b565b503373ffffffffffffffffffffffffffffffffffffffff16837f827c032fe6cd1eed9fd542005e6a56d0c5e80bc6e38171ab664069244da148198484604051611900929190615085565b60405180910390a3505050565b6000611918600b5490565b82106119a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e647300000000000000000000000000000000000000006064820152608401610a67565b600b82815481106119b9576119b9614f3c565b90600052602060002001549050919050565b60015473ffffffffffffffffffffffffffffffffffffffff163314611a72576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b60008181526005602052604081205473ffffffffffffffffffffffffffffffffffffffff16806108fd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610a67565b600073ffffffffffffffffffffffffffffffffffffffff8216611c26576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e657200000000000000000000000000000000000000000000006064820152608401610a67565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526006602052604090205490565b805160005b81811015610dea57611c7e838281518110611c7157611c71614f3c565b60200260200101516130b6565b80611c88816150d2565b915050611c54565b6000818152601660209081526040808320815160c0810183528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169482019490945260028201549281019290925260038101546060830152600481015460808301526005810154849360a084019160ff1690811115611d0f57611d0f6148f5565b6001811115611d2057611d206148f5565b8152505090508060600151421015611d3b5750600092915050565b8060600151816080015103611d54576040015192915050565b80608001514210611d69576040015192915050565b6000816060015142611d7b919061510a565b9050600082606001518360800151611d93919061510a565b905080828460400151611da69190615121565b611db0919061518d565b95945050505050565b60606004805461091290614d3a565b60005473ffffffffffffffffffffffffffffffffffffffff163314611dec57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b611e7a338383613399565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff163314611ea257600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf59101611e64565b611f2b3383612e8b565b611fb7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f7665640000000000000000000000000000000000006064820152608401610a67565b611fc3848484846134be565b50505050565b601560205260009081526040902080548190611fe490614d3a565b80601f016020809104026020016040519081016040528092919081815260200182805461201090614d3a565b801561205d5780601f106120325761010080835404028352916020019161205d565b820191906000526020600020905b81548152906001019060200180831161204057829003601f168201915b5050506001909301549192505073ffffffffffffffffffffffffffffffffffffffff81169060ff740100000000000000000000000000000000000000009091041683565b60606120ac82612947565b60006120c360408051602081019091526000815290565b905060008151116120e3576040518060200160405280600081525061210e565b806120ed84613561565b6040516020016120fe9291906151a1565b6040516020818303038152906040525b9392505050565b6014602052816000526040600020818154811061213157600080fd5b90600052602060002001600091509150505481565b3360009081526002602052604081205460ff166001146121e8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8161224f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b600d6000815461225e906150d2565b91829055506040805160806020601f87018190040282018101909252606081018581529293509182918690869081908501838280828437600092018290525093855250505073ffffffffffffffffffffffffffffffffffffffff88166020808401919091528715156040938401528482526015905220815181906122e29082614ddb565b50602082015160019091018054604093840151151574010000000000000000000000000000000000000000027fffffffffffffffffffffff00000000000000000000000000000000000000000090911673ffffffffffffffffffffffffffffffffffffffff9093169290921791909117905551339082907fec43c2ba7667c935356219eb87401926de2a65b331b1867aeb9b05626677f53b90600090a3949350505050565b6000806011838154811061239d5761239d614f3c565b600091825260209091206005909102015460ff1660018111156123c2576123c26148f5565b14612429576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e76616c6964206c6f636b20747970650000000000000000000000000000006044820152606401610a67565b33600090815260136020908152604080832085845290915290205460ff16156124ae576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f76657374696e67496420616c72656164792076657269666965640000000000006044820152606401610a67565b6000601183815481106124c3576124c3614f3c565b60009182526020808320600592830201600190810154808552601683526040808620815160c081018352815481528185015473ffffffffffffffffffffffffffffffffffffffff169581019590955260028101549185019190915260038101546060850152600481015460808501529384015490955091929160a084019160ff90911690811115612556576125566148f5565b6001811115612567576125676148f5565b815250509050806020015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612606576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f526563697069656e74206e6f74206d61746368000000000000000000000000006044820152606401610a67565b600f80549350600190600061261b8387614f24565b90915550506000838152601760209081526040808320859055338084526013835281842088855290925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905583519051919286927f8334f87aeaf76e52b061d93ee968e51fdd3ad53ca04e80271249227997aab3a09190a46126a73384612e4f565b5050919050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146126d257600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b90602001611e64565b6011818154811061275557600080fd5b600091825260209091206005909102018054600182015460028301805460ff909316945090929161278590614d3a565b80601f01602080910402602001604051908101604052809291908181526020018280546127b190614d3a565b80156127fe5780601f106127d3576101008083540402835291602001916127fe565b820191906000526020600020905b8154815290600101906020018083116127e157829003601f168201915b50505050600383015460049093015491929167ffffffffffffffff16905085565b60005473ffffffffffffffffffffffffffffffffffffffff16331461284357600080fd5b611e7a73ffffffffffffffffffffffffffffffffffffffff83163383613696565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd0000000000000000000000000000000000000000000000000000000014806128f757507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806108fd57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146108fd565b60008181526005602052604090205473ffffffffffffffffffffffffffffffffffffffff16611776576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610a67565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015612a3f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a6391906151d0565b9050612a8773ffffffffffffffffffffffffffffffffffffffff851684308561376a565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8616906370a0823190602401602060405180830381865afa158015612af3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b1791906151d0565b612b21919061510a565b949350505050565b600081831115612bbb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f537461727420646174652063616e6e6f74206265206c61746572207468616e2060448201527f656e6420646174650000000000000000000000000000000000000000000000006064820152608401610a67565b600e60008154612bca906150d2565b91905081905590506040518060c001604052808781526020018673ffffffffffffffffffffffffffffffffffffffff16815260200185815260200184815260200183815260200160006001811115612c2457612c246148f5565b90526000828152601660209081526040918290208351815590830151600180830180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff90931692909217909155918301516002820155606083015160038201556080830151600482015560a08301516005820180549293919290917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00909116908381811115612cec57612cec6148f5565b02179055505060408051838152602081018790529081018590526060810184905273ffffffffffffffffffffffffffffffffffffffff8716915087907f82debb28bd576b13304dd9103c74c7b554c1de8e996c8576dc43dbfca4a1bd0f9060800160405180910390a395945050505050565b60008181526017602090815260408083205480845260169092529091205473ffffffffffffffffffffffffffffffffffffffff84161580612dc9575060008181526015602052604090206001015474010000000000000000000000000000000000000000900460ff16155b612e2f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f546f6b656e206f776e65722069732066726f7a656e21000000000000000000006044820152606401610a67565b611fc384846137c8565b600082612e468584613868565b14949350505050565b611e7a8282604051806020016040528060008152506138b5565b600081815260126020526040812054612e8183611c90565b6108fd919061510a565b600080612e9783611af5565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480612f05575073ffffffffffffffffffffffffffffffffffffffff80821660009081526008602090815260408083209388168352929052205460ff165b80612b2157508373ffffffffffffffffffffffffffffffffffffffff16612f2b84610995565b73ffffffffffffffffffffffffffffffffffffffff1614949350505050565b60008181526017602090815260408083205480845260169092529091205473ffffffffffffffffffffffffffffffffffffffff80861690851603613010576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f43616e6e6f74207472616e7366657220746f207468652073616d65206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610a67565b60008181526015602052604090206001015474010000000000000000000000000000000000000000900460ff16156130a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f546f6b656e206f776e65722069732066726f7a656e21000000000000000000006044820152606401610a67565b6130af858585613958565b5050505050565b600081815260176020526040902054336130cf83611af5565b73ffffffffffffffffffffffffffffffffffffffff1614613172576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603760248201527f43616e6e6f7420636c61696d2829206f6e206120746f6b656e2062656c6f6e6760448201527f696e6720746f20616e6f746865722061646472657373210000000000000000006064820152608401610a67565b600061317d82611c90565b600083815260126020526040902054909150810361319a57505050565b6000828152601260205260408120546131b3908361510a565b600084815260126020908152604080832086905560168252808320815160c0810183528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169482019490945260028201549281019290925260038101546060830152600481015460808301526005810154949550929390929160a084019160ff1690811115613242576132426148f5565b6001811115613253576132536148f5565b905250905060008160a001516001811115613270576132706148f5565b146132d7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f496e6163746976652076657374696e67000000000000000000000000000000006044820152606401610a67565b600084815260126020526040908190205482820151915187927fa21b52191f39061227a0dd21f4fc770a4a74c59b7c026fb7e3c5ba8e303d21eb9261332f928792909283526020830191909152604082015260600190565b60405180910390a2805160009081526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff1661336c813385613696565b81516000908152601960205260408120805485929061338c908490614f24565b9091555050505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361342e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610a67565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526008602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319101611900565b6134c9848484612f4a565b6134d584848484613bca565b611fc3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b6060816000036135a457505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156135ce57806135b8816150d2565b91506135c79050600a8361518d565b91506135a8565b60008167ffffffffffffffff8111156135e9576135e96149ae565b6040519080825280601f01601f191660200182016040528015613613576020820181803683370190505b5090505b8415612b215761362860018361510a565b9150613635600a866151e9565b613640906030614f24565b60f81b81838151811061365557613655614f3c565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535061368f600a8661518d565b9450613617565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052610dea9084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152613dbd565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052611fc39085907f23b872dd00000000000000000000000000000000000000000000000000000000906084016136e8565b600081815260076020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8416908117909155819061382282611af5565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600081815b84518110156138ad576138998286838151811061388c5761388c614f3c565b6020026020010151613ec9565b9150806138a5816150d2565b91505061386d565b509392505050565b6138bf8383613ef5565b6138cc6000848484613bca565b610dea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b8273ffffffffffffffffffffffffffffffffffffffff1661397882611af5565b73ffffffffffffffffffffffffffffffffffffffff1614613a1b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e65720000000000000000000000000000000000000000000000000000006064820152608401610a67565b73ffffffffffffffffffffffffffffffffffffffff8216613abd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610a67565b613ac88383836140c3565b613ad3600082612d5e565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600660205260408120805460019290613b0990849061510a565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600660205260408120805460019290613b44908490614f24565b909155505060008181526005602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600073ffffffffffffffffffffffffffffffffffffffff84163b15613db2576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290613c419033908990889088906004016151fd565b6020604051808303816000875af1925050508015613c9a575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252613c9791810190615246565b60015b613d67573d808015613cc8576040519150601f19603f3d011682016040523d82523d6000602084013e613ccd565b606091505b508051600003613d5f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050612b21565b506001949350505050565b6000613e1f826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166141c99092919063ffffffff16565b805190915015610dea5780806020019051810190613e3d9190615263565b610dea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610a67565b6000818310613ee557600082815260208490526040902061210e565b5060009182526020526040902090565b73ffffffffffffffffffffffffffffffffffffffff8216613f72576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610a67565b60008181526005602052604090205473ffffffffffffffffffffffffffffffffffffffff1615613ffe576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610a67565b61400a600083836140c3565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600660205260408120805460019290614040908490614f24565b909155505060008181526005602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b73ffffffffffffffffffffffffffffffffffffffff831661412b5761412681600b80546000838152600c60205260408120829055600182018355919091527f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db90155565b614168565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146141685761416883826141d8565b73ffffffffffffffffffffffffffffffffffffffff821661418c57610dea8161428f565b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614610dea57610dea828261433e565b6060612b21848460008561438f565b600060016141e584611b81565b6141ef919061510a565b6000838152600a602052604090205490915080821461424f5773ffffffffffffffffffffffffffffffffffffffff841660009081526009602090815260408083208584528252808320548484528184208190558352600a90915290208190555b506000918252600a6020908152604080842084905573ffffffffffffffffffffffffffffffffffffffff9094168352600981528383209183525290812055565b600b546000906142a19060019061510a565b6000838152600c6020526040812054600b80549394509092849081106142c9576142c9614f3c565b9060005260206000200154905080600b83815481106142ea576142ea614f3c565b6000918252602080832090910192909255828152600c9091526040808220849055858252812055600b80548061432257614322615280565b6001900381819060005260206000200160009055905550505050565b600061434983611b81565b73ffffffffffffffffffffffffffffffffffffffff90931660009081526009602090815260408083208684528252808320859055938252600a9052919091209190915550565b606082471015614421576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610a67565b73ffffffffffffffffffffffffffffffffffffffff85163b61449f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610a67565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516144c891906152af565b60006040518083038185875af1925050503d8060008114614505576040519150601f19603f3d011682016040523d82523d6000602084013e61450a565b606091505b509150915061451a828286614525565b979650505050505050565b6060831561453457508161210e565b8251156145445782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a679190614639565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461177657600080fd5b6000602082840312156145b857600080fd5b813561210e81614578565b60005b838110156145de5781810151838201526020016145c6565b83811115611fc35750506000910152565b600081518084526146078160208601602086016145c3565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061210e60208301846145ef565b60006020828403121561465e57600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff8116811461177657600080fd5b600080600080600060a0868803121561469f57600080fd5b8535945060208601356146b181614665565b94979496505050506040830135926060810135926080909101359150565b600080604083850312156146e257600080fd5b82356146ed81614665565b946020939093013593505050565b600080600080600080600060c0888a03121561471657600080fd5b873596506020880135955060408801359450606088013593506080880135925060a088013567ffffffffffffffff8082111561475157600080fd5b818a0191508a601f83011261476557600080fd5b81358181111561477457600080fd5b8b60208260051b850101111561478957600080fd5b60208301945080935050505092959891949750929550565b6000602082840312156147b357600080fd5b813561210e81614665565b60008083601f8401126147d057600080fd5b50813567ffffffffffffffff8111156147e857600080fd5b60208301915083602082850101111561480057600080fd5b9250929050565b60008060008060006080868803121561481f57600080fd5b853594506020860135935060408601359250606086013567ffffffffffffffff81111561484b57600080fd5b614857888289016147be565b969995985093965092949392505050565b60008060006060848603121561487d57600080fd5b833561488881614665565b9250602084013561489881614665565b929592945050506040919091013590565b6000806000604084860312156148be57600080fd5b83359250602084013567ffffffffffffffff8111156148dc57600080fd5b6148e8868287016147be565b9497909650939450505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110611776577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060c08201905087825273ffffffffffffffffffffffffffffffffffffffff8716602083015285604083015284606083015283608083015261499d83614924565b8260a0830152979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715614a2457614a246149ae565b604052919050565b60006020808385031215614a3f57600080fd5b823567ffffffffffffffff80821115614a5757600080fd5b818501915085601f830112614a6b57600080fd5b813581811115614a7d57614a7d6149ae565b8060051b9150614a8e8483016149dd565b8181529183018401918481019088841115614aa857600080fd5b938501935b83851015614ac657843582529385019390850190614aad565b98975050505050505050565b801515811461177657600080fd5b60008060408385031215614af357600080fd5b8235614afe81614665565b91506020830135614b0e81614ad2565b809150509250929050565b60008060008060808587031215614b2f57600080fd5b8435614b3a81614665565b9350602085810135614b4b81614665565b935060408601359250606086013567ffffffffffffffff80821115614b6f57600080fd5b818801915088601f830112614b8357600080fd5b813581811115614b9557614b956149ae565b614bc5847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016149dd565b91508082528984828501011115614bdb57600080fd5b808484018584013760008482840101525080935050505092959194509250565b606081526000614c0e60608301866145ef565b73ffffffffffffffffffffffffffffffffffffffff94909416602083015250901515604090910152919050565b60008060408385031215614c4e57600080fd5b50508035926020909101359150565b60008060008060608587031215614c7357600080fd5b8435614c7e81614665565b93506020850135614c8e81614ad2565b9250604085013567ffffffffffffffff811115614caa57600080fd5b614cb6878288016147be565b95989497509550505050565b60008060408385031215614cd557600080fd5b8235614ce081614665565b91506020830135614b0e81614665565b614cf986614924565b85815284602082015260a060408201526000614d1860a08301866145ef565b905083606083015267ffffffffffffffff831660808301529695505050505050565b600181811c90821680614d4e57607f821691505b602082108103614d87577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b601f821115610dea57600081815260208120601f850160051c81016020861015614db45750805b601f850160051c820191505b81811015614dd357828155600101614dc0565b505050505050565b815167ffffffffffffffff811115614df557614df56149ae565b614e0981614e038454614d3a565b84614d8d565b602080601f831160018114614e5c5760008415614e265750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555614dd3565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b82811015614ea957888601518255948401946001909101908401614e8a565b5085821015614ee557878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008219821115614f3757614f37614ef5565b500190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b67ffffffffffffffff831115614f8357614f836149ae565b614f9783614f918354614d3a565b83614d8d565b6000601f841160018114614fe95760008515614fb35750838201355b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600387901b1c1916600186901b1783556130af565b6000838152602090207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0861690835b828110156150385786850135825560209485019460019092019101615018565b5086821015615073577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88860031b161c19848701351681555b505060018560011b0183555050505050565b60208152816020820152818360408301376000818301604090810191909152601f9092017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0160101919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361510357615103614ef5565b5060010190565b60008282101561511c5761511c614ef5565b500390565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561515957615159614ef5565b500290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60008261519c5761519c61515e565b500490565b600083516151b38184602088016145c3565b8351908301906151c78183602088016145c3565b01949350505050565b6000602082840312156151e257600080fd5b5051919050565b6000826151f8576151f861515e565b500690565b600073ffffffffffffffffffffffffffffffffffffffff80871683528086166020840152508360408301526080606083015261523c60808301846145ef565b9695505050505050565b60006020828403121561525857600080fd5b815161210e81614578565b60006020828403121561527557600080fd5b815161210e81614ad2565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b600082516152c18184602087016145c3565b919091019291505056fea2646970667358221220c75228f6738897c83ad44edcca58555726708e1798e01724df10c8c5c904cd1f64736f6c634300080f0033"
      };
    }
  });

  // packages/vesting-sdk/lib/contracts/ValidVestingVault.js
  var require_ValidVestingVault = __commonJS({
    "packages/vesting-sdk/lib/contracts/ValidVestingVault.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ValidVestingVault = void 0;
      var eth_wallet_1 = __require("@ijstech/eth-wallet");
      var ValidVestingVault_json_1 = __importDefault(require_ValidVestingVault_json());
      var ValidVestingVault = class extends eth_wallet_1.Contract {
        constructor(wallet, address) {
          super(wallet, address, ValidVestingVault_json_1.default.abi, ValidVestingVault_json_1.default.bytecode);
          this.assign();
        }
        deploy(params) {
          return this.__deploy([params.name, params.symbol]);
        }
        parseApprovalEvent(receipt) {
          return this.parseEvents(receipt, "Approval").map((e) => this.decodeApprovalEvent(e));
        }
        decodeApprovalEvent(event) {
          let result = event.data;
          return {
            owner: result.owner,
            approved: result.approved,
            tokenId: new eth_wallet_1.BigNumber(result.tokenId),
            _event: event
          };
        }
        parseApprovalForAllEvent(receipt) {
          return this.parseEvents(receipt, "ApprovalForAll").map((e) => this.decodeApprovalForAllEvent(e));
        }
        decodeApprovalForAllEvent(event) {
          let result = event.data;
          return {
            owner: result.owner,
            operator: result.operator,
            approved: result.approved,
            _event: event
          };
        }
        parseAuthorizeEvent(receipt) {
          return this.parseEvents(receipt, "Authorize").map((e) => this.decodeAuthorizeEvent(e));
        }
        decodeAuthorizeEvent(event) {
          let result = event.data;
          return {
            user: result.user,
            _event: event
          };
        }
        parseClaimEvent(receipt) {
          return this.parseEvents(receipt, "Claim").map((e) => this.decodeClaimEvent(e));
        }
        decodeClaimEvent(event) {
          let result = event.data;
          return {
            nftId: new eth_wallet_1.BigNumber(result.nftId),
            amount: new eth_wallet_1.BigNumber(result.amount),
            totalClaimed: new eth_wallet_1.BigNumber(result.totalClaimed),
            totalAmount: new eth_wallet_1.BigNumber(result.totalAmount),
            _event: event
          };
        }
        parseCreateVestingEvent(receipt) {
          return this.parseEvents(receipt, "CreateVesting").map((e) => this.decodeCreateVestingEvent(e));
        }
        decodeCreateVestingEvent(event) {
          let result = event.data;
          return {
            campaignId: new eth_wallet_1.BigNumber(result.campaignId),
            vestingId: new eth_wallet_1.BigNumber(result.vestingId),
            recipient: result.recipient,
            amount: new eth_wallet_1.BigNumber(result.amount),
            startDate: new eth_wallet_1.BigNumber(result.startDate),
            endDate: new eth_wallet_1.BigNumber(result.endDate),
            _event: event
          };
        }
        parseDeauthorizeEvent(receipt) {
          return this.parseEvents(receipt, "Deauthorize").map((e) => this.decodeDeauthorizeEvent(e));
        }
        decodeDeauthorizeEvent(event) {
          let result = event.data;
          return {
            user: result.user,
            _event: event
          };
        }
        parseLockEvent(receipt) {
          return this.parseEvents(receipt, "Lock").map((e) => this.decodeLockEvent(e));
        }
        decodeLockEvent(event) {
          let result = event.data;
          return {
            lockId: new eth_wallet_1.BigNumber(result.lockId),
            campaignId: new eth_wallet_1.BigNumber(result.campaignId),
            amount: new eth_wallet_1.BigNumber(result.amount),
            sender: result.sender,
            _event: event
          };
        }
        parseMintEvent(receipt) {
          return this.parseEvents(receipt, "Mint").map((e) => this.decodeMintEvent(e));
        }
        decodeMintEvent(event) {
          let result = event.data;
          return {
            campaignId: new eth_wallet_1.BigNumber(result.campaignId),
            nftId: new eth_wallet_1.BigNumber(result.nftId),
            recipient: result.recipient,
            _event: event
          };
        }
        parseNewCampaignEvent(receipt) {
          return this.parseEvents(receipt, "NewCampaign").map((e) => this.decodeNewCampaignEvent(e));
        }
        decodeNewCampaignEvent(event) {
          let result = event.data;
          return {
            campaignId: new eth_wallet_1.BigNumber(result.campaignId),
            sender: result.sender,
            _event: event
          };
        }
        parseStartOwnershipTransferEvent(receipt) {
          return this.parseEvents(receipt, "StartOwnershipTransfer").map((e) => this.decodeStartOwnershipTransferEvent(e));
        }
        decodeStartOwnershipTransferEvent(event) {
          let result = event.data;
          return {
            user: result.user,
            _event: event
          };
        }
        parseTransferEvent(receipt) {
          return this.parseEvents(receipt, "Transfer").map((e) => this.decodeTransferEvent(e));
        }
        decodeTransferEvent(event) {
          let result = event.data;
          return {
            from: result.from,
            to: result.to,
            tokenId: new eth_wallet_1.BigNumber(result.tokenId),
            _event: event
          };
        }
        parseTransferOwnershipEvent(receipt) {
          return this.parseEvents(receipt, "TransferOwnership").map((e) => this.decodeTransferOwnershipEvent(e));
        }
        decodeTransferOwnershipEvent(event) {
          let result = event.data;
          return {
            user: result.user,
            _event: event
          };
        }
        parseUpdateCampaignEvent(receipt) {
          return this.parseEvents(receipt, "UpdateCampaign").map((e) => this.decodeUpdateCampaignEvent(e));
        }
        decodeUpdateCampaignEvent(event) {
          let result = event.data;
          return {
            campaignId: new eth_wallet_1.BigNumber(result.campaignId),
            dataUri: result.dataUri,
            sender: result.sender,
            _event: event
          };
        }
        assign() {
          let balanceOf_call = async (owner) => {
            let result = await this.call("balanceOf", [owner]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.balanceOf = balanceOf_call;
          let campaignClaimed_call = async (param1) => {
            let result = await this.call("campaignClaimed", [eth_wallet_1.Utils.toString(param1)]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.campaignClaimed = campaignClaimed_call;
          let campaignIdCount_call = async () => {
            let result = await this.call("campaignIdCount");
            return new eth_wallet_1.BigNumber(result);
          };
          this.campaignIdCount = campaignIdCount_call;
          let campaignInfo_call = async (param1) => {
            let result = await this.call("campaignInfo", [eth_wallet_1.Utils.toString(param1)]);
            return {
              dataUri: result.dataUri,
              token: result.token,
              ownerFrozen: result.ownerFrozen
            };
          };
          this.campaignInfo = campaignInfo_call;
          let campaignLocked_call = async (param1) => {
            let result = await this.call("campaignLocked", [eth_wallet_1.Utils.toString(param1)]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.campaignLocked = campaignLocked_call;
          let campaignLocksParams = (params) => [eth_wallet_1.Utils.toString(params.param1), eth_wallet_1.Utils.toString(params.param2)];
          let campaignLocks_call = async (params) => {
            let result = await this.call("campaignLocks", campaignLocksParams(params));
            return new eth_wallet_1.BigNumber(result);
          };
          this.campaignLocks = campaignLocks_call;
          let campaignLocksLength_call = async (campaignId) => {
            let result = await this.call("campaignLocksLength", [eth_wallet_1.Utils.toString(campaignId)]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.campaignLocksLength = campaignLocksLength_call;
          let factory_call = async () => {
            let result = await this.call("factory");
            return result;
          };
          this.factory = factory_call;
          let getApproved_call = async (tokenId) => {
            let result = await this.call("getApproved", [eth_wallet_1.Utils.toString(tokenId)]);
            return result;
          };
          this.getApproved = getApproved_call;
          let getInfo_call = async (nftId) => {
            let result = await this.call("getInfo", [eth_wallet_1.Utils.toString(nftId)]);
            return {
              campaignId: new eth_wallet_1.BigNumber(result.campaignId),
              vestingId: new eth_wallet_1.BigNumber(result.vestingId),
              recipient: result.recipient,
              token: result.token,
              unclaimedFunds: new eth_wallet_1.BigNumber(result.unclaimedFunds),
              claimedAmount: new eth_wallet_1.BigNumber(result.claimedAmount),
              totalAmount: new eth_wallet_1.BigNumber(result.totalAmount),
              startDate: new eth_wallet_1.BigNumber(result.startDate),
              endDate: new eth_wallet_1.BigNumber(result.endDate)
            };
          };
          this.getInfo = getInfo_call;
          let isApprovedForAllParams = (params) => [params.owner, params.operator];
          let isApprovedForAll_call = async (params) => {
            let result = await this.call("isApprovedForAll", isApprovedForAllParams(params));
            return result;
          };
          this.isApprovedForAll = isApprovedForAll_call;
          let isLockIdVerifiedParams = (params) => [params.param1, eth_wallet_1.Utils.toString(params.param2)];
          let isLockIdVerified_call = async (params) => {
            let result = await this.call("isLockIdVerified", isLockIdVerifiedParams(params));
            return result;
          };
          this.isLockIdVerified = isLockIdVerified_call;
          let isPermitted_call = async (param1) => {
            let result = await this.call("isPermitted", [param1]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.isPermitted = isPermitted_call;
          let locks_call = async (param1) => {
            let result = await this.call("locks", [eth_wallet_1.Utils.toString(param1)]);
            return {
              lockType: new eth_wallet_1.BigNumber(result.lockType),
              vestingId: new eth_wallet_1.BigNumber(result.vestingId),
              dataUri: result.dataUri,
              root: result.root,
              dateCreated: new eth_wallet_1.BigNumber(result.dateCreated)
            };
          };
          this.locks = locks_call;
          let locksLength_call = async () => {
            let result = await this.call("locksLength");
            return new eth_wallet_1.BigNumber(result);
          };
          this.locksLength = locksLength_call;
          let maximumAllowedClaimedFunds_call = async (vestingId) => {
            let result = await this.call("maximumAllowedClaimedFunds", [eth_wallet_1.Utils.toString(vestingId)]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.maximumAllowedClaimedFunds = maximumAllowedClaimedFunds_call;
          let name_call = async () => {
            let result = await this.call("name");
            return result;
          };
          this.name = name_call;
          let newOwner_call = async () => {
            let result = await this.call("newOwner");
            return result;
          };
          this.newOwner = newOwner_call;
          let nftIdCount_call = async () => {
            let result = await this.call("nftIdCount");
            return new eth_wallet_1.BigNumber(result);
          };
          this.nftIdCount = nftIdCount_call;
          let nftVestingId_call = async (param1) => {
            let result = await this.call("nftVestingId", [eth_wallet_1.Utils.toString(param1)]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.nftVestingId = nftVestingId_call;
          let owner_call = async () => {
            let result = await this.call("owner");
            return result;
          };
          this.owner = owner_call;
          let ownerOf_call = async (tokenId) => {
            let result = await this.call("ownerOf", [eth_wallet_1.Utils.toString(tokenId)]);
            return result;
          };
          this.ownerOf = ownerOf_call;
          let supportsInterface_call = async (interfaceId) => {
            let result = await this.call("supportsInterface", [interfaceId]);
            return result;
          };
          this.supportsInterface = supportsInterface_call;
          let symbol_call = async () => {
            let result = await this.call("symbol");
            return result;
          };
          this.symbol = symbol_call;
          let tokenByIndex_call = async (index) => {
            let result = await this.call("tokenByIndex", [eth_wallet_1.Utils.toString(index)]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.tokenByIndex = tokenByIndex_call;
          let tokenOfOwnerByIndexParams = (params) => [params.owner, eth_wallet_1.Utils.toString(params.index)];
          let tokenOfOwnerByIndex_call = async (params) => {
            let result = await this.call("tokenOfOwnerByIndex", tokenOfOwnerByIndexParams(params));
            return new eth_wallet_1.BigNumber(result);
          };
          this.tokenOfOwnerByIndex = tokenOfOwnerByIndex_call;
          let tokenURI_call = async (tokenId) => {
            let result = await this.call("tokenURI", [eth_wallet_1.Utils.toString(tokenId)]);
            return result;
          };
          this.tokenURI = tokenURI_call;
          let totalSupply_call = async () => {
            let result = await this.call("totalSupply");
            return new eth_wallet_1.BigNumber(result);
          };
          this.totalSupply = totalSupply_call;
          let vestingClaimedAmount_call = async (param1) => {
            let result = await this.call("vestingClaimedAmount", [eth_wallet_1.Utils.toString(param1)]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.vestingClaimedAmount = vestingClaimedAmount_call;
          let vestingIdCount_call = async () => {
            let result = await this.call("vestingIdCount");
            return new eth_wallet_1.BigNumber(result);
          };
          this.vestingIdCount = vestingIdCount_call;
          let vestingInfo_call = async (param1) => {
            let result = await this.call("vestingInfo", [eth_wallet_1.Utils.toString(param1)]);
            return {
              campaignId: new eth_wallet_1.BigNumber(result.campaignId),
              recipient: result.recipient,
              amount: new eth_wallet_1.BigNumber(result.amount),
              startDate: new eth_wallet_1.BigNumber(result.startDate),
              endDate: new eth_wallet_1.BigNumber(result.endDate),
              status: new eth_wallet_1.BigNumber(result.status)
            };
          };
          this.vestingInfo = vestingInfo_call;
          let approveParams = (params) => [params.to, eth_wallet_1.Utils.toString(params.tokenId)];
          let approve_send = async (params) => {
            let result = await this.send("approve", approveParams(params));
            return result;
          };
          let approve_call = async (params) => {
            let result = await this.call("approve", approveParams(params));
            return;
          };
          this.approve = Object.assign(approve_send, {
            call: approve_call
          });
          let claim_send = async (id) => {
            let result = await this.send("claim", [eth_wallet_1.Utils.toString(id)]);
            return result;
          };
          let claim_call = async (id) => {
            let result = await this.call("claim", [eth_wallet_1.Utils.toString(id)]);
            return;
          };
          this.claim = Object.assign(claim_send, {
            call: claim_call
          });
          let claimMultiple_send = async (ids) => {
            let result = await this.send("claimMultiple", [eth_wallet_1.Utils.toString(ids)]);
            return result;
          };
          let claimMultiple_call = async (ids) => {
            let result = await this.call("claimMultiple", [eth_wallet_1.Utils.toString(ids)]);
            return;
          };
          this.claimMultiple = Object.assign(claimMultiple_send, {
            call: claimMultiple_call
          });
          let deny_send = async (user) => {
            let result = await this.send("deny", [user]);
            return result;
          };
          let deny_call = async (user) => {
            let result = await this.call("deny", [user]);
            return;
          };
          this.deny = Object.assign(deny_send, {
            call: deny_call
          });
          let directLockParams = (params) => [eth_wallet_1.Utils.toString(params.campaignId), params.recipient, eth_wallet_1.Utils.toString(params.amount), eth_wallet_1.Utils.toString(params.startDate), eth_wallet_1.Utils.toString(params.endDate)];
          let directLock_send = async (params) => {
            let result = await this.send("directLock", directLockParams(params));
            return result;
          };
          let directLock_call = async (params) => {
            let result = await this.call("directLock", directLockParams(params));
            return new eth_wallet_1.BigNumber(result);
          };
          this.directLock = Object.assign(directLock_send, {
            call: directLock_call
          });
          let merkleLockParams = (params) => [eth_wallet_1.Utils.toString(params.campaignId), eth_wallet_1.Utils.toString(params.amount), eth_wallet_1.Utils.stringToBytes32(params.merkleRoot), params.dataUri];
          let merkleLock_send = async (params) => {
            let result = await this.send("merkleLock", merkleLockParams(params));
            return result;
          };
          let merkleLock_call = async (params) => {
            let result = await this.call("merkleLock", merkleLockParams(params));
            return new eth_wallet_1.BigNumber(result);
          };
          this.merkleLock = Object.assign(merkleLock_send, {
            call: merkleLock_call
          });
          let newCampaignParams = (params) => [params.token, params.ownerFrozen, params.dataUri];
          let newCampaign_send = async (params) => {
            let result = await this.send("newCampaign", newCampaignParams(params));
            return result;
          };
          let newCampaign_call = async (params) => {
            let result = await this.call("newCampaign", newCampaignParams(params));
            return new eth_wallet_1.BigNumber(result);
          };
          this.newCampaign = Object.assign(newCampaign_send, {
            call: newCampaign_call
          });
          let permit_send = async (user) => {
            let result = await this.send("permit", [user]);
            return result;
          };
          let permit_call = async (user) => {
            let result = await this.call("permit", [user]);
            return;
          };
          this.permit = Object.assign(permit_send, {
            call: permit_call
          });
          let safeTransferFromParams = (params) => [params.from, params.to, eth_wallet_1.Utils.toString(params.tokenId)];
          let safeTransferFrom_send = async (params) => {
            let result = await this.send("safeTransferFrom", safeTransferFromParams(params));
            return result;
          };
          let safeTransferFrom_call = async (params) => {
            let result = await this.call("safeTransferFrom", safeTransferFromParams(params));
            return;
          };
          this.safeTransferFrom = Object.assign(safeTransferFrom_send, {
            call: safeTransferFrom_call
          });
          let safeTransferFrom_1Params = (params) => [params.from, params.to, eth_wallet_1.Utils.toString(params.tokenId), eth_wallet_1.Utils.stringToBytes(params.data)];
          let safeTransferFrom_1_send = async (params) => {
            let result = await this.send("safeTransferFrom", safeTransferFromParams(params));
            return result;
          };
          let safeTransferFrom_1_call = async (params) => {
            let result = await this.call("safeTransferFrom", safeTransferFromParams(params));
            return;
          };
          this.safeTransferFrom_1 = Object.assign(safeTransferFrom_1_send, {
            call: safeTransferFrom_1_call
          });
          let setApprovalForAllParams = (params) => [params.operator, params.approved];
          let setApprovalForAll_send = async (params) => {
            let result = await this.send("setApprovalForAll", setApprovalForAllParams(params));
            return result;
          };
          let setApprovalForAll_call = async (params) => {
            let result = await this.call("setApprovalForAll", setApprovalForAllParams(params));
            return;
          };
          this.setApprovalForAll = Object.assign(setApprovalForAll_send, {
            call: setApprovalForAll_call
          });
          let setOwner_send = async (owner) => {
            let result = await this.send("setOwner", [owner]);
            return result;
          };
          let setOwner_call = async (owner) => {
            let result = await this.call("setOwner", [owner]);
            return;
          };
          this.setOwner = Object.assign(setOwner_send, {
            call: setOwner_call
          });
          let takeOwnership_send = async () => {
            let result = await this.send("takeOwnership");
            return result;
          };
          let takeOwnership_call = async () => {
            let result = await this.call("takeOwnership");
            return;
          };
          this.takeOwnership = Object.assign(takeOwnership_send, {
            call: takeOwnership_call
          });
          let transferFromParams = (params) => [params.from, params.to, eth_wallet_1.Utils.toString(params.tokenId)];
          let transferFrom_send = async (params) => {
            let result = await this.send("transferFrom", transferFromParams(params));
            return result;
          };
          let transferFrom_call = async (params) => {
            let result = await this.call("transferFrom", transferFromParams(params));
            return;
          };
          this.transferFrom = Object.assign(transferFrom_send, {
            call: transferFrom_call
          });
          let transferOwnership_send = async (newOwner) => {
            let result = await this.send("transferOwnership", [newOwner]);
            return result;
          };
          let transferOwnership_call = async (newOwner) => {
            let result = await this.call("transferOwnership", [newOwner]);
            return;
          };
          this.transferOwnership = Object.assign(transferOwnership_send, {
            call: transferOwnership_call
          });
          let updateCampaignParams = (params) => [eth_wallet_1.Utils.toString(params.campaignId), params.dataUri];
          let updateCampaign_send = async (params) => {
            let result = await this.send("updateCampaign", updateCampaignParams(params));
            return result;
          };
          let updateCampaign_call = async (params) => {
            let result = await this.call("updateCampaign", updateCampaignParams(params));
            return;
          };
          this.updateCampaign = Object.assign(updateCampaign_send, {
            call: updateCampaign_call
          });
          let verifyDirectLock_send = async (lockId) => {
            let result = await this.send("verifyDirectLock", [eth_wallet_1.Utils.toString(lockId)]);
            return result;
          };
          let verifyDirectLock_call = async (lockId) => {
            let result = await this.call("verifyDirectLock", [eth_wallet_1.Utils.toString(lockId)]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.verifyDirectLock = Object.assign(verifyDirectLock_send, {
            call: verifyDirectLock_call
          });
          let verifyMerkleLockParams = (params) => [eth_wallet_1.Utils.toString(params.lockId), eth_wallet_1.Utils.toString(params.campaignId), eth_wallet_1.Utils.toString(params.amount), eth_wallet_1.Utils.toString(params.startDate), eth_wallet_1.Utils.toString(params.endDate), eth_wallet_1.Utils.stringToBytes32(params.proof)];
          let verifyMerkleLock_send = async (params) => {
            let result = await this.send("verifyMerkleLock", verifyMerkleLockParams(params));
            return result;
          };
          let verifyMerkleLock_call = async (params) => {
            let result = await this.call("verifyMerkleLock", verifyMerkleLockParams(params));
            return new eth_wallet_1.BigNumber(result);
          };
          this.verifyMerkleLock = Object.assign(verifyMerkleLock_send, {
            call: verifyMerkleLock_call
          });
          let withdrawFundParams = (params) => [params.token, eth_wallet_1.Utils.toString(params.amount)];
          let withdrawFund_send = async (params) => {
            let result = await this.send("withdrawFund", withdrawFundParams(params));
            return result;
          };
          let withdrawFund_call = async (params) => {
            let result = await this.call("withdrawFund", withdrawFundParams(params));
            return;
          };
          this.withdrawFund = Object.assign(withdrawFund_send, {
            call: withdrawFund_call
          });
        }
      };
      exports.ValidVestingVault = ValidVestingVault;
    }
  });

  // packages/vesting-sdk/lib/contracts/ValidVestingVaultFactory.json.js
  var require_ValidVestingVaultFactory_json = __commonJS({
    "packages/vesting-sdk/lib/contracts/ValidVestingVaultFactory.json.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = {
        "abi": [
          { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
          { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "profileId", "type": "uint256" }, { "indexed": false, "internalType": "address[]", "name": "admins", "type": "address[]" }], "name": "NewProfile", "type": "event" },
          { "inputs": [{ "internalType": "address[]", "name": "admins", "type": "address[]" }], "name": "newProfile", "outputs": [{ "internalType": "uint256", "name": "profileId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" },
          { "inputs": [], "name": "profileIdCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
          { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "profileVestingVault", "outputs": [{ "internalType": "contract ValidVestingVault", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }
        ],
        "bytecode": "608060405234801561001057600080fd5b50615b99806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063525ee3fa146100465780639ac3f2e814610062578063d21b127b146100bd575b600080fd5b61004f60005481565b6040519081526020015b60405180910390f35b610098610070366004610373565b60016020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610059565b61004f6100cb36600461038c565b600080600081546100db90610401565b919050819055905060006040516100f190610366565b604080825260139082018190527f56616c69642056657374696e67205661756c740000000000000000000000000060608301526080602083018190528201527f56616c69642d56657374696e672d5661756c740000000000000000000000000060a082015260c001604051809103906000f080158015610175573d6000803e3d6000fd5b50905060005b83811015610257578173ffffffffffffffffffffffffffffffffffffffff1663a2f55ae58686848181106101b1576101b1610460565b90506020020160208101906101c691906104b8565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b16815273ffffffffffffffffffffffffffffffffffffffff9091166004820152602401600060405180830381600087803b15801561022c57600080fd5b505af1158015610240573d6000803e3d6000fd5b50505050808061024f90610401565b91505061017b565b506040517f13af403500000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff8216906313af403590602401600060405180830381600087803b1580156102bf57600080fd5b505af11580156102d3573d6000803e3d6000fd5b5050506000838152600160205260409081902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8516179055517f7ba1d39c20b2d92d216600ca5318570e4a6c147f058fdb8c2cb03851997159ea9150610357908490879087906104da565b60405180910390a15092915050565b6156268061053e83390190565b60006020828403121561038557600080fd5b5035919050565b6000806020838503121561039f57600080fd5b823567ffffffffffffffff808211156103b757600080fd5b818501915085601f8301126103cb57600080fd5b8135818111156103da57600080fd5b8660208260051b85010111156103ef57600080fd5b60209290920196919550909350505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610459577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b803573ffffffffffffffffffffffffffffffffffffffff811681146104b357600080fd5b919050565b6000602082840312156104ca57600080fd5b6104d38261048f565b9392505050565b83815260406020808301829052908201839052600090849060608401835b868110156105315773ffffffffffffffffffffffffffffffffffffffff61051e8561048f565b16825292820192908201906001016104f8565b5097965050505050505056fe60806040523480156200001157600080fd5b506040516200562638038062005626833981016040819052620000349162000150565b600080546001600160a01b031916331790558181600362000056838262000249565b50600462000065828262000249565b5050601080546001600160a01b031916331790555062000315915050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620000ab57600080fd5b81516001600160401b0380821115620000c857620000c862000083565b604051601f8301601f19908116603f01168101908282118183101715620000f357620000f362000083565b816040528381526020925086838588010111156200011057600080fd5b600091505b8382101562000134578582018301518183018401529082019062000115565b83821115620001465760008385830101525b9695505050505050565b600080604083850312156200016457600080fd5b82516001600160401b03808211156200017c57600080fd5b6200018a8683870162000099565b93506020850151915080821115620001a157600080fd5b50620001b08582860162000099565b9150509250929050565b600181811c90821680620001cf57607f821691505b602082108103620001f057634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200024457600081815260208120601f850160051c810160208610156200021f5750805b601f850160051c820191505b8181101562000240578281556001016200022b565b5050505b505050565b81516001600160401b0381111562000265576200026562000083565b6200027d81620002768454620001ba565b84620001f6565b602080601f831160018114620002b557600084156200029c5750858301515b600019600386901b1c1916600185901b17855562000240565b600085815260208120601f198616915b82811015620002e657888601518255948401946001909101908401620002c5565b5085821015620003055787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61530180620003256000396000f3fe608060405234801561001057600080fd5b50600436106103365760003560e01c80636352211e116101b2578063ae205176116100f9578063e5bc504a116100a2578063f148550f1161007c578063f148550f1461084a578063f2fde38b1461085d578063f4dadc6114610870578063f7c8d2211461089457600080fd5b8063e5bc504a146107db578063e9217bd1146107ee578063e985e9c51461080157600080fd5b8063c45a0155116100d3578063c45a015514610788578063c87b56dd146107a8578063d4ee1d90146107bb57600080fd5b8063ae20517614610733578063b88d4fde14610753578063bb2238ec1461076657600080fd5b80639051cce91161015b5780639c52a7f1116101355780639c52a7f1146106fa578063a22cb4651461070d578063a2f55ae51461072057600080fd5b80639051cce9146106cc578063958ddc98146106df57806395d89b41146106f257600080fd5b80637c4556c11161018c5780637c4556c1146106835780638101f2bd1461068c5780638da5cb5b146106ac57600080fd5b80636352211e146105ee57806366ffcf5f1461060157806370a082311461067057600080fd5b806323b872dd116102815780634a0e835b1161022a578063511aed9911610204578063511aed99146105a75780635757afc5146105b05780635bfc5a6e146105de57806360536172146105e657600080fd5b80634a0e835b146105615780634ca14703146105815780634f6ccce71461059457600080fd5b8063379607f51161025b578063379607f5146105065780633fd8cc4e1461051957806342842e0e1461054e57600080fd5b806323b872dd146104d757806329014d2a146104ea5780632f745c59146104f357600080fd5b806312f308fa116102e357806318160ddd116102bd57806318160ddd1461044c5780631a3cd59a146104545780631c86fa90146104c457600080fd5b806312f308fa1461040657806313af403514610419578063141a93291461042c57600080fd5b8063089fd09d11610314578063089fd09d146103b0578063095ea7b3146103d15780630b651d2f146103e657600080fd5b806301ffc9a71461033b57806306fdde0314610363578063081812fc14610378575b600080fd5b61034e6103493660046145a6565b6108a7565b60405190151581526020015b60405180910390f35b61036b610903565b60405161035a9190614639565b61038b61038636600461464c565b610995565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161035a565b6103c36103be366004614687565b6109c9565b60405190815260200161035a565b6103e46103df3660046146cf565b610c63565b005b6103c36103f436600461464c565b60196020526000908152604090205481565b6103c36104143660046146fb565b610def565b6103e46104273660046147a1565b611106565b6103c361043a36600461464c565b60186020526000908152604090205481565b600b546103c3565b61046761046236600461464c565b6111ce565b60408051998a5260208a019890985273ffffffffffffffffffffffffffffffffffffffff96871697890197909752949093166060870152608086019190915260a085015260c084015260e08301526101008201526101200161035a565b6103c36104d2366004614807565b611302565b6103e46104e5366004614868565b6115fd565b6103c3600d5481565b6103c36105013660046146cf565b61169e565b6103e461051436600461464c565b61176d565b61053c6105273660046147a1565b60026020526000908152604090205460ff1681565b60405160ff909116815260200161035a565b6103e461055c366004614868565b611779565b6103c361056f36600461464c565b60126020526000908152604090205481565b6103e461058f3660046148a9565b611794565b6103c36105a236600461464c565b61190d565b6103c3600e5481565b61034e6105be3660046146cf565b601360209081526000928352604080842090915290825290205460ff1681565b6011546103c3565b6103e46119cb565b61038b6105fc36600461464c565b611af5565b61065e61060f36600461464c565b601660205260009081526040902080546001820154600283015460038401546004850154600590950154939473ffffffffffffffffffffffffffffffffffffffff909316939192909160ff1686565b60405161035a9695949392919061495b565b6103c361067e3660046147a1565b611b81565b6103c3600f5481565b6103c361069a36600461464c565b60176020526000908152604090205481565b60005461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b6103e46106da366004614a2c565b611c4f565b6103c36106ed36600461464c565b611c90565b61036b611db9565b6103e46107083660046147a1565b611dc8565b6103e461071b366004614ae0565b611e6f565b6103e461072e3660046147a1565b611e7e565b6103c361074136600461464c565b60009081526014602052604090205490565b6103e4610761366004614b19565b611f21565b61077961077436600461464c565b611fc9565b60405161035a93929190614bfb565b60105461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b61036b6107b636600461464c565b6120a1565b60015461038b9073ffffffffffffffffffffffffffffffffffffffff1681565b6103c36107e9366004614c3b565b612115565b6103c36107fc366004614c5d565b612146565b61034e61080f366004614cc2565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260086020908152604080832093909416825291909152205460ff1690565b6103c361085836600461464c565b612387565b6103e461086b3660046147a1565b6126ae565b61088361087e36600461464c565b612745565b60405161035a959493929190614cf0565b6103e46108a23660046146cf565b61281f565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f780e9d630000000000000000000000000000000000000000000000000000000014806108fd57506108fd82612864565b92915050565b60606003805461091290614d3a565b80601f016020809104026020016040519081016040528092919081815260200182805461093e90614d3a565b801561098b5780601f106109605761010080835404028352916020019161098b565b820191906000526020600020905b81548152906001019060200180831161096e57829003601f168201915b5050505050905090565b60006109a082612947565b5060009081526007602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b3360009081526002602052604081205460ff16600114610a70576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60008681526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff16610aa38133876129d2565b94506000610ab48888888888612b29565b6011805460008b815260146020908152604080832080546001808201835591855283852001859055815160a0810183528481528084018890528251938401835284845291820192909252606081018390524267ffffffffffffffff1660808201528454808301865594909252815160059094027f31ecc21a745e3968a04e9570e4425bc18fa8019c68028196b546d1669c200c680180549398509495509093929183917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00909116908381811115610b8d57610b8d6148f5565b02179055506020820151600182015560408201516002820190610bb09082614ddb565b5060608201516003820155608090910151600490910180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff90921691909117905560008881526018602052604081208054889290610c1a908490614f24565b90915550506040518681523390899085907f114cc376d25215fb3215218ecf58c7fd5434f680efa149f1ef0b5ce3e7ca06fc9060200160405180910390a4505095945050505050565b6000610c6e82611af5565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610d2b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610a67565b3373ffffffffffffffffffffffffffffffffffffffff82161480610d545750610d54813361080f565b610de0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610a67565b610dea8383612d5e565b505050565b6000600160118981548110610e0657610e06614f3c565b600091825260209091206005909102015460ff166001811115610e2b57610e2b6148f5565b14610e92576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e76616c6964206c6f636b20747970650000000000000000000000000000006044820152606401610a67565b610f5e83838080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050601180549092508c91508110610ede57610ede614f3c565b6000918252602091829020600360059092020101546040517fffffffffffffffffffffffffffffffffffffffff0000000000000000000000003360601b1692810192909252603482018b9052605482018a905260748201899052609482018890529060b40160405160208183030381529060405280519060200120612e39565b610fc4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f6d65726b6c652070726f6f66206661696c6564000000000000000000000000006044820152606401610a67565b3360009081526013602090815260408083208b845290915290205460ff1615611049576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f6d65726b6c65496420616c7265616479207665726966696564000000000000006044820152606401610a67565b60006110588833898989612b29565b600f8054935090915060019060006110708386614f24565b9091555050600082815260176020908152604080832084905533808452601383528184208d855290925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905551909184918b917f8334f87aeaf76e52b061d93ee968e51fdd3ad53ca04e80271249227997aab3a091a46110fa3383612e4f565b50979650505050505050565b60105473ffffffffffffffffffffffffffffffffffffffff163314611187576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4e6f742066726f6d20666163746f7279000000000000000000000000000000006044820152606401610a67565b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60008060008060008060008060006111e58a611af5565b60008b81526017602090815260408083205480845260168352818420825160c0810184528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169582019590955260028201549381019390935260038101546060840152600481015460808401526005810154919d50949b5092939092909160a084019160ff1690811115611279576112796148f5565b600181111561128a5761128a6148f5565b9052508051600081815260156020526040902060010154909b5073ffffffffffffffffffffffffffffffffffffffff16975090506112c789612e69565b9550601260008a8152602001908152602001600020549450806040015193508060600151925080608001519150509193959799909294969850565b3360009081526002602052604081205460ff166001146113a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8161140b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b5060118054600087815260146020908152604080832080546001808201835591855283852001859055815160a081018352908152808301939093528051601f870183900483028101830182528681529394939083019187908790819084018382808284376000920182905250938552505050602080830189905267ffffffffffffffff4216604090930192909252835460018181018655948252919020825160059092020180549293909283917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff009091169083818111156114ee576114ee6148f5565b021790555060208201516001820155604082015160028201906115119082614ddb565b5060608201516003820155608090910151600490910180547fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000001667ffffffffffffffff90921691909117905560008681526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff166115908133886129d2565b9550856018600089815260200190815260200160002060008282546115b59190614f24565b90915550506040518681523390889084907f114cc376d25215fb3215218ecf58c7fd5434f680efa149f1ef0b5ce3e7ca06fc9060200160405180910390a45095945050505050565b6116073382612e8b565b611693576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f7665640000000000000000000000000000000000006064820152608401610a67565b610dea838383612f4a565b60006116a983611b81565b8210611737576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e64730000000000000000000000000000000000000000006064820152608401610a67565b5073ffffffffffffffffffffffffffffffffffffffff919091166000908152600960209081526040808320938352929052205490565b611776816130b6565b50565b610dea83838360405180602001604052806000815250611f21565b3360009081526002602052604090205460ff16600114611836576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8061189d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b60008381526015602052604090206118b6828483614f6b565b503373ffffffffffffffffffffffffffffffffffffffff16837f827c032fe6cd1eed9fd542005e6a56d0c5e80bc6e38171ab664069244da148198484604051611900929190615085565b60405180910390a3505050565b6000611918600b5490565b82106119a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e647300000000000000000000000000000000000000006064820152608401610a67565b600b82815481106119b9576119b9614f3c565b90600052602060002001549050919050565b60015473ffffffffffffffffffffffffffffffffffffffff163314611a72576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b600180546000805473ffffffffffffffffffffffffffffffffffffffff83167fffffffffffffffffffffffff000000000000000000000000000000000000000091821681179092559091169091556040519081527fcfaaa26691e16e66e73290fc725eee1a6b4e0e693a1640484937aac25ffb55a49060200160405180910390a1565b60008181526005602052604081205473ffffffffffffffffffffffffffffffffffffffff16806108fd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610a67565b600073ffffffffffffffffffffffffffffffffffffffff8216611c26576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e657200000000000000000000000000000000000000000000006064820152608401610a67565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526006602052604090205490565b805160005b81811015610dea57611c7e838281518110611c7157611c71614f3c565b60200260200101516130b6565b80611c88816150d2565b915050611c54565b6000818152601660209081526040808320815160c0810183528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169482019490945260028201549281019290925260038101546060830152600481015460808301526005810154849360a084019160ff1690811115611d0f57611d0f6148f5565b6001811115611d2057611d206148f5565b8152505090508060600151421015611d3b5750600092915050565b8060600151816080015103611d54576040015192915050565b80608001514210611d69576040015192915050565b6000816060015142611d7b919061510a565b9050600082606001518360800151611d93919061510a565b905080828460400151611da69190615121565b611db0919061518d565b95945050505050565b60606004805461091290614d3a565b60005473ffffffffffffffffffffffffffffffffffffffff163314611dec57600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527f79ede3839cd7a7d8bd77e97e5c890565fe4f76cdbbeaa364646e28a8695a788491015b60405180910390a150565b611e7a338383613399565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff163314611ea257600080fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526002602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f6d81a01b39982517ba331aeb4f387b0f9cc32334b65bb9a343a077973cf7adf59101611e64565b611f2b3383612e8b565b611fb7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201527f72206e6f7220617070726f7665640000000000000000000000000000000000006064820152608401610a67565b611fc3848484846134be565b50505050565b601560205260009081526040902080548190611fe490614d3a565b80601f016020809104026020016040519081016040528092919081815260200182805461201090614d3a565b801561205d5780601f106120325761010080835404028352916020019161205d565b820191906000526020600020905b81548152906001019060200180831161204057829003601f168201915b5050506001909301549192505073ffffffffffffffffffffffffffffffffffffffff81169060ff740100000000000000000000000000000000000000009091041683565b60606120ac82612947565b60006120c360408051602081019091526000815290565b905060008151116120e3576040518060200160405280600081525061210e565b806120ed84613561565b6040516020016120fe9291906151a1565b6040516020818303038152906040525b9392505050565b6014602052816000526040600020818154811061213157600080fd5b90600052602060002001600091509150505481565b3360009081526002602052604081205460ff166001146121e8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f416374696f6e20706572666f726d656420627920756e617574686f72697a656460448201527f20616464726573732e00000000000000000000000000000000000000000000006064820152608401610a67565b8161224f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f646174615572692063616e6e6f7420626520656d7074790000000000000000006044820152606401610a67565b600d6000815461225e906150d2565b91829055506040805160806020601f87018190040282018101909252606081018581529293509182918690869081908501838280828437600092018290525093855250505073ffffffffffffffffffffffffffffffffffffffff88166020808401919091528715156040938401528482526015905220815181906122e29082614ddb565b50602082015160019091018054604093840151151574010000000000000000000000000000000000000000027fffffffffffffffffffffff00000000000000000000000000000000000000000090911673ffffffffffffffffffffffffffffffffffffffff9093169290921791909117905551339082907fec43c2ba7667c935356219eb87401926de2a65b331b1867aeb9b05626677f53b90600090a3949350505050565b6000806011838154811061239d5761239d614f3c565b600091825260209091206005909102015460ff1660018111156123c2576123c26148f5565b14612429576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f496e76616c6964206c6f636b20747970650000000000000000000000000000006044820152606401610a67565b33600090815260136020908152604080832085845290915290205460ff16156124ae576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f76657374696e67496420616c72656164792076657269666965640000000000006044820152606401610a67565b6000601183815481106124c3576124c3614f3c565b60009182526020808320600592830201600190810154808552601683526040808620815160c081018352815481528185015473ffffffffffffffffffffffffffffffffffffffff169581019590955260028101549185019190915260038101546060850152600481015460808501529384015490955091929160a084019160ff90911690811115612556576125566148f5565b6001811115612567576125676148f5565b815250509050806020015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612606576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f526563697069656e74206e6f74206d61746368000000000000000000000000006044820152606401610a67565b600f80549350600190600061261b8387614f24565b90915550506000838152601760209081526040808320859055338084526013835281842088855290925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905583519051919286927f8334f87aeaf76e52b061d93ee968e51fdd3ad53ca04e80271249227997aab3a09190a46126a73384612e4f565b5050919050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146126d257600080fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f686a7ab184e6928ddedba810af7b443d6baa40bf32c4787ccd72c5b4b28cae1b90602001611e64565b6011818154811061275557600080fd5b600091825260209091206005909102018054600182015460028301805460ff909316945090929161278590614d3a565b80601f01602080910402602001604051908101604052809291908181526020018280546127b190614d3a565b80156127fe5780601f106127d3576101008083540402835291602001916127fe565b820191906000526020600020905b8154815290600101906020018083116127e157829003601f168201915b50505050600383015460049093015491929167ffffffffffffffff16905085565b60005473ffffffffffffffffffffffffffffffffffffffff16331461284357600080fd5b611e7a73ffffffffffffffffffffffffffffffffffffffff83163383613696565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd0000000000000000000000000000000000000000000000000000000014806128f757507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806108fd57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146108fd565b60008181526005602052604090205473ffffffffffffffffffffffffffffffffffffffff16611776576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e20494400000000000000006044820152606401610a67565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015612a3f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a6391906151d0565b9050612a8773ffffffffffffffffffffffffffffffffffffffff851684308561376a565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819073ffffffffffffffffffffffffffffffffffffffff8616906370a0823190602401602060405180830381865afa158015612af3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b1791906151d0565b612b21919061510a565b949350505050565b600081831115612bbb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f537461727420646174652063616e6e6f74206265206c61746572207468616e2060448201527f656e6420646174650000000000000000000000000000000000000000000000006064820152608401610a67565b600e60008154612bca906150d2565b91905081905590506040518060c001604052808781526020018673ffffffffffffffffffffffffffffffffffffffff16815260200185815260200184815260200183815260200160006001811115612c2457612c246148f5565b90526000828152601660209081526040918290208351815590830151600180830180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff90931692909217909155918301516002820155606083015160038201556080830151600482015560a08301516005820180549293919290917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00909116908381811115612cec57612cec6148f5565b02179055505060408051838152602081018790529081018590526060810184905273ffffffffffffffffffffffffffffffffffffffff8716915087907f82debb28bd576b13304dd9103c74c7b554c1de8e996c8576dc43dbfca4a1bd0f9060800160405180910390a395945050505050565b60008181526017602090815260408083205480845260169092529091205473ffffffffffffffffffffffffffffffffffffffff84161580612dc9575060008181526015602052604090206001015474010000000000000000000000000000000000000000900460ff16155b612e2f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f546f6b656e206f776e65722069732066726f7a656e21000000000000000000006044820152606401610a67565b611fc384846137c8565b600082612e468584613868565b14949350505050565b611e7a8282604051806020016040528060008152506138b5565b600081815260126020526040812054612e8183611c90565b6108fd919061510a565b600080612e9783611af5565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480612f05575073ffffffffffffffffffffffffffffffffffffffff80821660009081526008602090815260408083209388168352929052205460ff165b80612b2157508373ffffffffffffffffffffffffffffffffffffffff16612f2b84610995565b73ffffffffffffffffffffffffffffffffffffffff1614949350505050565b60008181526017602090815260408083205480845260169092529091205473ffffffffffffffffffffffffffffffffffffffff80861690851603613010576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f43616e6e6f74207472616e7366657220746f207468652073616d65206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610a67565b60008181526015602052604090206001015474010000000000000000000000000000000000000000900460ff16156130a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f546f6b656e206f776e65722069732066726f7a656e21000000000000000000006044820152606401610a67565b6130af858585613958565b5050505050565b600081815260176020526040902054336130cf83611af5565b73ffffffffffffffffffffffffffffffffffffffff1614613172576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603760248201527f43616e6e6f7420636c61696d2829206f6e206120746f6b656e2062656c6f6e6760448201527f696e6720746f20616e6f746865722061646472657373210000000000000000006064820152608401610a67565b600061317d82611c90565b600083815260126020526040902054909150810361319a57505050565b6000828152601260205260408120546131b3908361510a565b600084815260126020908152604080832086905560168252808320815160c0810183528154815260018083015473ffffffffffffffffffffffffffffffffffffffff169482019490945260028201549281019290925260038101546060830152600481015460808301526005810154949550929390929160a084019160ff1690811115613242576132426148f5565b6001811115613253576132536148f5565b905250905060008160a001516001811115613270576132706148f5565b146132d7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f496e6163746976652076657374696e67000000000000000000000000000000006044820152606401610a67565b600084815260126020526040908190205482820151915187927fa21b52191f39061227a0dd21f4fc770a4a74c59b7c026fb7e3c5ba8e303d21eb9261332f928792909283526020830191909152604082015260600190565b60405180910390a2805160009081526015602052604090206001015473ffffffffffffffffffffffffffffffffffffffff1661336c813385613696565b81516000908152601960205260408120805485929061338c908490614f24565b9091555050505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361342e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610a67565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526008602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319101611900565b6134c9848484612f4a565b6134d584848484613bca565b611fc3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b6060816000036135a457505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156135ce57806135b8816150d2565b91506135c79050600a8361518d565b91506135a8565b60008167ffffffffffffffff8111156135e9576135e96149ae565b6040519080825280601f01601f191660200182016040528015613613576020820181803683370190505b5090505b8415612b215761362860018361510a565b9150613635600a866151e9565b613640906030614f24565b60f81b81838151811061365557613655614f3c565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535061368f600a8661518d565b9450613617565b60405173ffffffffffffffffffffffffffffffffffffffff8316602482015260448101829052610dea9084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152613dbd565b60405173ffffffffffffffffffffffffffffffffffffffff80851660248301528316604482015260648101829052611fc39085907f23b872dd00000000000000000000000000000000000000000000000000000000906084016136e8565b600081815260076020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8416908117909155819061382282611af5565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600081815b84518110156138ad576138998286838151811061388c5761388c614f3c565b6020026020010151613ec9565b9150806138a5816150d2565b91505061386d565b509392505050565b6138bf8383613ef5565b6138cc6000848484613bca565b610dea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b8273ffffffffffffffffffffffffffffffffffffffff1661397882611af5565b73ffffffffffffffffffffffffffffffffffffffff1614613a1b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e65720000000000000000000000000000000000000000000000000000006064820152608401610a67565b73ffffffffffffffffffffffffffffffffffffffff8216613abd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610a67565b613ac88383836140c3565b613ad3600082612d5e565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600660205260408120805460019290613b0990849061510a565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600660205260408120805460019290613b44908490614f24565b909155505060008181526005602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600073ffffffffffffffffffffffffffffffffffffffff84163b15613db2576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290613c419033908990889088906004016151fd565b6020604051808303816000875af1925050508015613c9a575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252613c9791810190615246565b60015b613d67573d808015613cc8576040519150601f19603f3d011682016040523d82523d6000602084013e613ccd565b606091505b508051600003613d5f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e74657200000000000000000000000000006064820152608401610a67565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050612b21565b506001949350505050565b6000613e1f826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166141c99092919063ffffffff16565b805190915015610dea5780806020019051810190613e3d9190615263565b610dea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152608401610a67565b6000818310613ee557600082815260208490526040902061210e565b5060009182526020526040902090565b73ffffffffffffffffffffffffffffffffffffffff8216613f72576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610a67565b60008181526005602052604090205473ffffffffffffffffffffffffffffffffffffffff1615613ffe576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610a67565b61400a600083836140c3565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600660205260408120805460019290614040908490614f24565b909155505060008181526005602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b73ffffffffffffffffffffffffffffffffffffffff831661412b5761412681600b80546000838152600c60205260408120829055600182018355919091527f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db90155565b614168565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146141685761416883826141d8565b73ffffffffffffffffffffffffffffffffffffffff821661418c57610dea8161428f565b8273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614610dea57610dea828261433e565b6060612b21848460008561438f565b600060016141e584611b81565b6141ef919061510a565b6000838152600a602052604090205490915080821461424f5773ffffffffffffffffffffffffffffffffffffffff841660009081526009602090815260408083208584528252808320548484528184208190558352600a90915290208190555b506000918252600a6020908152604080842084905573ffffffffffffffffffffffffffffffffffffffff9094168352600981528383209183525290812055565b600b546000906142a19060019061510a565b6000838152600c6020526040812054600b80549394509092849081106142c9576142c9614f3c565b9060005260206000200154905080600b83815481106142ea576142ea614f3c565b6000918252602080832090910192909255828152600c9091526040808220849055858252812055600b80548061432257614322615280565b6001900381819060005260206000200160009055905550505050565b600061434983611b81565b73ffffffffffffffffffffffffffffffffffffffff90931660009081526009602090815260408083208684528252808320859055938252600a9052919091209190915550565b606082471015614421576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c00000000000000000000000000000000000000000000000000006064820152608401610a67565b73ffffffffffffffffffffffffffffffffffffffff85163b61449f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610a67565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516144c891906152af565b60006040518083038185875af1925050503d8060008114614505576040519150601f19603f3d011682016040523d82523d6000602084013e61450a565b606091505b509150915061451a828286614525565b979650505050505050565b6060831561453457508161210e565b8251156145445782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a679190614639565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461177657600080fd5b6000602082840312156145b857600080fd5b813561210e81614578565b60005b838110156145de5781810151838201526020016145c6565b83811115611fc35750506000910152565b600081518084526146078160208601602086016145c3565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061210e60208301846145ef565b60006020828403121561465e57600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff8116811461177657600080fd5b600080600080600060a0868803121561469f57600080fd5b8535945060208601356146b181614665565b94979496505050506040830135926060810135926080909101359150565b600080604083850312156146e257600080fd5b82356146ed81614665565b946020939093013593505050565b600080600080600080600060c0888a03121561471657600080fd5b873596506020880135955060408801359450606088013593506080880135925060a088013567ffffffffffffffff8082111561475157600080fd5b818a0191508a601f83011261476557600080fd5b81358181111561477457600080fd5b8b60208260051b850101111561478957600080fd5b60208301945080935050505092959891949750929550565b6000602082840312156147b357600080fd5b813561210e81614665565b60008083601f8401126147d057600080fd5b50813567ffffffffffffffff8111156147e857600080fd5b60208301915083602082850101111561480057600080fd5b9250929050565b60008060008060006080868803121561481f57600080fd5b853594506020860135935060408601359250606086013567ffffffffffffffff81111561484b57600080fd5b614857888289016147be565b969995985093965092949392505050565b60008060006060848603121561487d57600080fd5b833561488881614665565b9250602084013561489881614665565b929592945050506040919091013590565b6000806000604084860312156148be57600080fd5b83359250602084013567ffffffffffffffff8111156148dc57600080fd5b6148e8868287016147be565b9497909650939450505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110611776577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060c08201905087825273ffffffffffffffffffffffffffffffffffffffff8716602083015285604083015284606083015283608083015261499d83614924565b8260a0830152979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715614a2457614a246149ae565b604052919050565b60006020808385031215614a3f57600080fd5b823567ffffffffffffffff80821115614a5757600080fd5b818501915085601f830112614a6b57600080fd5b813581811115614a7d57614a7d6149ae565b8060051b9150614a8e8483016149dd565b8181529183018401918481019088841115614aa857600080fd5b938501935b83851015614ac657843582529385019390850190614aad565b98975050505050505050565b801515811461177657600080fd5b60008060408385031215614af357600080fd5b8235614afe81614665565b91506020830135614b0e81614ad2565b809150509250929050565b60008060008060808587031215614b2f57600080fd5b8435614b3a81614665565b9350602085810135614b4b81614665565b935060408601359250606086013567ffffffffffffffff80821115614b6f57600080fd5b818801915088601f830112614b8357600080fd5b813581811115614b9557614b956149ae565b614bc5847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016149dd565b91508082528984828501011115614bdb57600080fd5b808484018584013760008482840101525080935050505092959194509250565b606081526000614c0e60608301866145ef565b73ffffffffffffffffffffffffffffffffffffffff94909416602083015250901515604090910152919050565b60008060408385031215614c4e57600080fd5b50508035926020909101359150565b60008060008060608587031215614c7357600080fd5b8435614c7e81614665565b93506020850135614c8e81614ad2565b9250604085013567ffffffffffffffff811115614caa57600080fd5b614cb6878288016147be565b95989497509550505050565b60008060408385031215614cd557600080fd5b8235614ce081614665565b91506020830135614b0e81614665565b614cf986614924565b85815284602082015260a060408201526000614d1860a08301866145ef565b905083606083015267ffffffffffffffff831660808301529695505050505050565b600181811c90821680614d4e57607f821691505b602082108103614d87577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b601f821115610dea57600081815260208120601f850160051c81016020861015614db45750805b601f850160051c820191505b81811015614dd357828155600101614dc0565b505050505050565b815167ffffffffffffffff811115614df557614df56149ae565b614e0981614e038454614d3a565b84614d8d565b602080601f831160018114614e5c5760008415614e265750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555614dd3565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b82811015614ea957888601518255948401946001909101908401614e8a565b5085821015614ee557878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008219821115614f3757614f37614ef5565b500190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b67ffffffffffffffff831115614f8357614f836149ae565b614f9783614f918354614d3a565b83614d8d565b6000601f841160018114614fe95760008515614fb35750838201355b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600387901b1c1916600186901b1783556130af565b6000838152602090207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0861690835b828110156150385786850135825560209485019460019092019101615018565b5086821015615073577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88860031b161c19848701351681555b505060018560011b0183555050505050565b60208152816020820152818360408301376000818301604090810191909152601f9092017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0160101919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361510357615103614ef5565b5060010190565b60008282101561511c5761511c614ef5565b500390565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561515957615159614ef5565b500290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60008261519c5761519c61515e565b500490565b600083516151b38184602088016145c3565b8351908301906151c78183602088016145c3565b01949350505050565b6000602082840312156151e257600080fd5b5051919050565b6000826151f8576151f861515e565b500690565b600073ffffffffffffffffffffffffffffffffffffffff80871683528086166020840152508360408301526080606083015261523c60808301846145ef565b9695505050505050565b60006020828403121561525857600080fd5b815161210e81614578565b60006020828403121561527557600080fd5b815161210e81614ad2565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b600082516152c18184602087016145c3565b919091019291505056fea2646970667358221220c75228f6738897c83ad44edcca58555726708e1798e01724df10c8c5c904cd1f64736f6c634300080f0033a2646970667358221220fc216deb7e4642e159312b5186985be1ccdf0eeb5e57884d6a87745e0061bb3964736f6c634300080f0033"
      };
    }
  });

  // packages/vesting-sdk/lib/contracts/ValidVestingVaultFactory.js
  var require_ValidVestingVaultFactory = __commonJS({
    "packages/vesting-sdk/lib/contracts/ValidVestingVaultFactory.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ValidVestingVaultFactory = void 0;
      var eth_wallet_1 = __require("@ijstech/eth-wallet");
      var ValidVestingVaultFactory_json_1 = __importDefault(require_ValidVestingVaultFactory_json());
      var ValidVestingVaultFactory = class extends eth_wallet_1.Contract {
        constructor(wallet, address) {
          super(wallet, address, ValidVestingVaultFactory_json_1.default.abi, ValidVestingVaultFactory_json_1.default.bytecode);
          this.assign();
        }
        deploy() {
          return this.__deploy();
        }
        parseNewProfileEvent(receipt) {
          return this.parseEvents(receipt, "NewProfile").map((e) => this.decodeNewProfileEvent(e));
        }
        decodeNewProfileEvent(event) {
          let result = event.data;
          return {
            profileId: new eth_wallet_1.BigNumber(result.profileId),
            admins: result.admins,
            _event: event
          };
        }
        assign() {
          let profileIdCount_call = async () => {
            let result = await this.call("profileIdCount");
            return new eth_wallet_1.BigNumber(result);
          };
          this.profileIdCount = profileIdCount_call;
          let profileVestingVault_call = async (param1) => {
            let result = await this.call("profileVestingVault", [eth_wallet_1.Utils.toString(param1)]);
            return result;
          };
          this.profileVestingVault = profileVestingVault_call;
          let newProfile_send = async (admins) => {
            let result = await this.send("newProfile", [admins]);
            return result;
          };
          let newProfile_call = async (admins) => {
            let result = await this.call("newProfile", [admins]);
            return new eth_wallet_1.BigNumber(result);
          };
          this.newProfile = Object.assign(newProfile_send, {
            call: newProfile_call
          });
        }
      };
      exports.ValidVestingVaultFactory = ValidVestingVaultFactory;
    }
  });

  // packages/vesting-sdk/lib/contracts/index.js
  var require_contracts = __commonJS({
    "packages/vesting-sdk/lib/contracts/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ValidVestingVaultFactory = exports.ValidVestingVault = exports.Authorization = exports.ERC721 = void 0;
      var ERC721_1 = require_ERC721();
      Object.defineProperty(exports, "ERC721", { enumerable: true, get: function() {
        return ERC721_1.ERC721;
      } });
      var Authorization_1 = require_Authorization();
      Object.defineProperty(exports, "Authorization", { enumerable: true, get: function() {
        return Authorization_1.Authorization;
      } });
      var ValidVestingVault_1 = require_ValidVestingVault();
      Object.defineProperty(exports, "ValidVestingVault", { enumerable: true, get: function() {
        return ValidVestingVault_1.ValidVestingVault;
      } });
      var ValidVestingVaultFactory_1 = require_ValidVestingVaultFactory();
      Object.defineProperty(exports, "ValidVestingVaultFactory", { enumerable: true, get: function() {
        return ValidVestingVaultFactory_1.ValidVestingVaultFactory;
      } });
    }
  });

  // packages/vesting-sdk/lib/common.js
  var require_common = __commonJS({
    "packages/vesting-sdk/lib/common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getCampaignInfoList = exports.getCampaignInfo = exports.LockType = exports.VestingTreeABI = void 0;
      var contracts_1 = require_contracts();
      exports.VestingTreeABI = [
        {
          type: "uint256",
          name: "campaignId"
        },
        {
          type: "uint256",
          name: "amount"
        },
        {
          type: "uint256",
          name: "startDate"
        },
        {
          type: "uint256",
          name: "endDate"
        }
      ];
      var LockType;
      (function(LockType2) {
        LockType2[LockType2["Direct"] = 0] = "Direct";
        LockType2[LockType2["Merkle"] = 1] = "Merkle";
      })(LockType = exports.LockType || (exports.LockType = {}));
      async function getCampaignInfo(wallet, contractAddress, campaignId) {
        let vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
        let info = await vesting.campaignInfo(campaignId);
        let campaignInfo = Object.assign(Object.assign({}, info), { id: campaignId });
        return campaignInfo;
      }
      exports.getCampaignInfo = getCampaignInfo;
      async function getCampaignInfoList(wallet, contractAddress) {
        let vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
        let campaignInfoList = [];
        let campaignIdCount = await vesting.campaignIdCount();
        for (let i = 1; i <= campaignIdCount.toNumber(); i++) {
          let info = await vesting.campaignInfo(i);
          let campaignInfo = Object.assign(Object.assign({}, info), { id: i });
          campaignInfoList.push(campaignInfo);
        }
        return campaignInfoList;
      }
      exports.getCampaignInfoList = getCampaignInfoList;
    }
  });

  // packages/vesting-sdk/lib/locker.js
  var require_locker = __commonJS({
    "packages/vesting-sdk/lib/locker.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getMyLocks = exports.doDirectLock = exports.doMerkleLock = void 0;
      var eth_wallet_1 = __require("@ijstech/eth-wallet");
      var common_1 = require_common();
      var contracts_1 = require_contracts();
      async function doMerkleLock(wallet, contractAddress, campaignId, lockRecords, dataUri) {
        let treeData = lockRecords.map((item) => {
          return {
            campaignId,
            account: item.account,
            amount: item.amount,
            startDate: item.startDate,
            endDate: item.endDate
          };
        });
        let totalAmount = lockRecords.reduce((prev, item) => new eth_wallet_1.BigNumber(prev).plus(item.amount), new eth_wallet_1.BigNumber(0));
        const vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
        let tree = eth_wallet_1.Utils.generateWhitelistTree(wallet, treeData, common_1.VestingTreeABI);
        let receipt = await vesting.merkleLock({
          campaignId,
          amount: totalAmount,
          merkleRoot: tree.root,
          dataUri
        });
        return receipt;
      }
      exports.doMerkleLock = doMerkleLock;
      async function doDirectLock(wallet, contractAddress, campaignId, lockRecord) {
        const vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
        let receipt = await vesting.directLock({
          campaignId,
          recipient: lockRecord.account,
          amount: new eth_wallet_1.BigNumber(lockRecord.amount),
          startDate: lockRecord.startDate,
          endDate: lockRecord.endDate
        });
        return receipt;
      }
      exports.doDirectLock = doDirectLock;
      async function getMyLocks(wallet, contractAddress, campaignId) {
        const vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
        let locks = [];
        let campaignLocksLength = await vesting.campaignLocksLength(campaignId);
        for (let i = 0; i < campaignLocksLength.toNumber(); i++) {
          let lockId = await vesting.campaignLocks({
            param1: campaignId,
            param2: i
          });
          let lock = await vesting.locks(lockId);
          let lockInfo = {
            id: lockId.toNumber(),
            lockType: lock.lockType.toNumber(),
            dataUri: lock.dataUri,
            root: lock.root,
            vestingId: lock.vestingId.toNumber(),
            dateCreated: lock.dateCreated.toNumber()
          };
          locks.push(lockInfo);
        }
        return locks;
      }
      exports.getMyLocks = getMyLocks;
    }
  });

  // packages/vesting-sdk/lib/claimant.js
  var require_claimant = __commonJS({
    "packages/vesting-sdk/lib/claimant.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.doClaimAll = exports.doClaim = exports.getMyClaims = exports.getUnverifiedLockInfoMap = exports.getUnverifiedLockInfo = exports.doVerifyDirectLock = exports.doVerifyMerkleLock = void 0;
      var eth_wallet_1 = __require("@ijstech/eth-wallet");
      var common_1 = require_common();
      var contracts_1 = require_contracts();
      async function doVerifyMerkleLock(wallet, contractAddress, lockId, vestingData) {
        const vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
        const merkleInfo = await vesting.locks(lockId);
        let proof = eth_wallet_1.Utils.getWhitelistTreeProof(wallet, merkleInfo.root, vestingData, common_1.VestingTreeABI);
        let vestingItem = vestingData.find((v) => v.account == wallet.address);
        if (!vestingItem)
          return null;
        let receipt = await vesting.verifyMerkleLock({
          lockId,
          amount: new eth_wallet_1.BigNumber(vestingItem.amount),
          startDate: vestingItem.startDate,
          endDate: vestingItem.endDate,
          campaignId: vestingItem.campaignId,
          proof
        });
        return receipt;
      }
      exports.doVerifyMerkleLock = doVerifyMerkleLock;
      async function doVerifyDirectLock(wallet, contractAddress, vestingId) {
        const vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
        let receipt = await vesting.verifyDirectLock(vestingId);
        return receipt;
      }
      exports.doVerifyDirectLock = doVerifyDirectLock;
      async function getUnverifiedLockInfo(wallet, contractAddress, campaignId) {
        let unverifiedLockInfoList = [];
        let vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
        let locksLength = await vesting.campaignLocksLength(campaignId);
        for (let j = 0; j < locksLength.toNumber(); j++) {
          let lockId = await vesting.campaignLocks({
            param1: campaignId,
            param2: j
          });
          let lockInfoItem = await vesting.locks(lockId);
          let isLockIdVerified = await vesting.isLockIdVerified({
            param1: wallet.address,
            param2: lockId
          });
          if (!isLockIdVerified) {
            let lockInfo = {
              id: lockId.toNumber(),
              lockType: lockInfoItem.lockType.toNumber(),
              dataUri: lockInfoItem.dataUri,
              root: lockInfoItem.root,
              vestingId: lockInfoItem.vestingId.toNumber(),
              dateCreated: lockInfoItem.dateCreated.toNumber()
            };
            unverifiedLockInfoList.push(lockInfo);
          }
        }
        return unverifiedLockInfoList;
      }
      exports.getUnverifiedLockInfo = getUnverifiedLockInfo;
      async function getUnverifiedLockInfoMap(wallet, contractAddress, campaignIds) {
        let unverifiedLockInfoMap = {};
        for (let i = 0; i < campaignIds.length; i++) {
          let campaignId = campaignIds[i];
          unverifiedLockInfoMap[campaignId] = unverifiedLockInfoMap[campaignId] || [];
          let lockInfo = await getUnverifiedLockInfo(wallet, contractAddress, campaignId);
          unverifiedLockInfoMap[campaignId] = lockInfo;
        }
        return unverifiedLockInfoMap;
      }
      exports.getUnverifiedLockInfoMap = getUnverifiedLockInfoMap;
      async function getMyClaims(wallet, contractAddress, campaignId) {
        let claimsArr = [];
        try {
          let vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
          let nftCount = await vesting.balanceOf(wallet.address);
          for (let i = 0; i < nftCount.toNumber(); i++) {
            let nftId = await vesting.tokenOfOwnerByIndex({
              owner: wallet.address,
              index: i
            });
            let info = await vesting.getInfo(nftId);
            if (campaignId && info.campaignId.toNumber() != campaignId)
              continue;
            let vestingId = info.vestingId;
            let maxClaimedFunds = await vesting.maximumAllowedClaimedFunds(vestingId);
            let claimed = await vesting.vestingClaimedAmount(vestingId);
            let claimable = new eth_wallet_1.BigNumber(maxClaimedFunds).minus(claimed).toFixed();
            let locked = new eth_wallet_1.BigNumber(info.totalAmount).minus(claimed).toFixed();
            let vestingStart = info.startDate.toNumber();
            let vestingEnd = info.endDate.toNumber();
            let claimInfo = {
              campaignId: info.campaignId.toNumber(),
              tokenId: nftId.toNumber(),
              vestingId: vestingId.toNumber(),
              claimed: claimed.toFixed(),
              claimable,
              locked,
              vestingStart,
              vestingEnd
            };
            claimsArr.push(claimInfo);
          }
        } catch (err) {
          console.log("err", err);
        }
        return claimsArr;
      }
      exports.getMyClaims = getMyClaims;
      async function doClaim(wallet, contractAddress, id) {
        if (!contractAddress)
          return;
        let vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
        let receipt = await vesting.claim(id);
        return receipt;
      }
      exports.doClaim = doClaim;
      async function doClaimAll(wallet, contractAddress, ids) {
        if (!contractAddress)
          return;
        let vesting = new contracts_1.ValidVestingVault(wallet, contractAddress);
        let receipt = await vesting.claimMultiple(ids);
        return receipt;
      }
      exports.doClaimAll = doClaimAll;
    }
  });

  // packages/vesting-sdk/lib/index.js
  var require_lib = __commonJS({
    "packages/vesting-sdk/lib/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Claimant = exports.Locker = exports.getCampaignInfoList = exports.LockType = exports.VestingTreeABI = exports.Contracts = void 0;
      exports.Contracts = __importStar(require_contracts());
      var common_1 = require_common();
      Object.defineProperty(exports, "VestingTreeABI", { enumerable: true, get: function() {
        return common_1.VestingTreeABI;
      } });
      Object.defineProperty(exports, "LockType", { enumerable: true, get: function() {
        return common_1.LockType;
      } });
      Object.defineProperty(exports, "getCampaignInfoList", { enumerable: true, get: function() {
        return common_1.getCampaignInfoList;
      } });
      exports.Locker = __importStar(require_locker());
      exports.Claimant = __importStar(require_claimant());
    }
  });

  // src/scconfig.json
  var require_scconfig = __commonJS({
    "src/scconfig.json"(exports, module) {
      module.exports = {
        name: "@vesting/main",
        version: "0.1.0",
        main: "{root}/main/index.js",
        env: "mainnet",
        init: "{root}/config/index.js",
        routes: [
          {
            url: "#/claims",
            module: "{root}/claims/index.js",
            default: true
          },
          {
            url: "#/claims/:campaignId",
            module: "{root}/claimDetail/index.js"
          },
          {
            url: "#/locks",
            module: "{root}/locks/index.js"
          },
          {
            url: "#/locks/:campaignId",
            module: "{root}/lockDetail/index.js"
          },
          {
            url: "#/newCampaign",
            module: "{root}/newCampaign/index.js"
          },
          {
            url: "#/locks/:campaignId/addLock",
            module: "{root}/newLock/index.js"
          },
          {
            url: "#/config",
            module: "{root}/config/index.js"
          },
          {
            url: "#/admin",
            module: "{root}/admin/index.js"
          }
        ],
        dependencies: {
          moment: "{LIB}/lib/moment/2.29.1/moment.js",
          "@ijstech/eth-wallet-web3modal": "{LIB}/lib/eth-wallet-web3modal/index.js",
          "@scom/sdks": "{root}/sdks/index.js",
          "@vesting/assets": "{root}/assets/index.js",
          "@vesting/global": "{root}/global/index.js",
          "@vesting/store": "{root}/store/index.js",
          "@vesting/common": "{root}/common/index.js"
        },
        menuItems: [
          {
            to: "#/claims",
            text: "Claims",
            img: "img/menu/Swap-Icon.svg"
          },
          {
            to: "#/locks",
            text: "Locks",
            img: "img/menu/Swap-Icon.svg"
          }
        ],
        params: {
          secureComputeInfo: {
            link: "#/",
            img: "img/sc-logo.svg"
          },
          footerPagesInfo: [],
          socialMediaInfo: [],
          projectInfo: [
            {
              caption: "@ 2022 IJS Technologies"
            },
            {
              caption: "Privacy Policy",
              link: "#/"
            }
          ]
        },
        defaultChainId: 43113,
        infuraId: "adc596bf88b648e2a8902bc9093930c5",
        networkList: [
          {
            name: "BSC Testnet",
            chainId: 97,
            img: "img/network/bscMainnet.svg",
            rpc: "https://data-seed-prebsc-2-s2.binance.org:8545/",
            explorerName: "BSCScan",
            explorerTxUrl: "https://testnet.bscscan.com/tx/",
            explorerAddressUrl: "https://testnet.bscscan.com/address/"
          },
          {
            name: "Avalanche FUJI C-Chain",
            chainId: 43113,
            img: "img/network/avax.svg",
            rpc: "https://api.avax-test.network/ext/bc/C/rpc",
            explorerName: "SnowTrace",
            explorerTxUrl: "https://testnet.snowtrace.io/tx/",
            explorerAddressUrl: "https://testnet.snowtrace.io/address/"
          }
        ],
        header: {
          sloganUrl: "img/banner.svg",
          breadcrumb: {
            supportedUrl: [
              "#/claims/:campaignId",
              "#/locks/:campaignId",
              "#/locks/:campaignId/addLock"
            ]
          },
          padding: { top: 16, bottom: 16, left: 15, right: 15 }
        },
        contractInfo: {
          "97": {
            vaultFactory: {
              address: "0x0F4AcB7f01a74a9cbe807ec6Ee707b5731fbF1bC"
            }
          },
          "43113": {
            vaultFactory: {
              address: "0x6Cc5b54e29b690AF42E096843B35c8a1C6A6Bd7d"
            }
          }
        }
      };
    }
  });

  // src/config/index.tsx
  var import_components4 = __toModule(__require("@ijstech/components"));

  // src/store/index.ts
  var import_eth_wallet5 = __toModule(__require("@ijstech/eth-wallet"));

  // src/global/utils/common.ts
  var import_eth_wallet = __toModule(__require("@ijstech/eth-wallet"));
  var registerSendTxEvents = (sendTxEventHandlers) => {
    const wallet = import_eth_wallet.Wallet.getInstance();
    wallet.registerSendTxEvents({
      transactionHash: (error, receipt) => {
        if (sendTxEventHandlers.transactionHash) {
          sendTxEventHandlers.transactionHash(error, receipt);
        }
      },
      confirmation: (receipt) => {
        if (sendTxEventHandlers.confirmation) {
          sendTxEventHandlers.confirmation(receipt);
        }
      }
    });
  };

  // src/global/utils/helper.ts
  var import_eth_wallet2 = __toModule(__require("@ijstech/eth-wallet"));
  var import_moment = __toModule(require_moment());

  // src/global/utils/error.ts
  async function parseContractError(oMessage, tokens) {
    const staticMessageMap = {
      "MetaMask Tx Signature: User denied transaction signature.": "User denied transaction signature",
      "execution reverted: not from admin": "Not from admin",
      "execution reverted: not from owner": "Not from owner",
      "execution reverted: not from new owner": "Not from new owner",
      "execution reverted: already a admin": "Already a admin",
      "execution reverted: Action performed by unauthorized address.": "Action performed by unauthorized address",
      "execution reverted: project not exist": "Project not exist",
      "execution reverted: already validated": "Already validated",
      "execution reverted: not under auditing": "Not under auditing",
      "execution reverted: invalid packageVersionId": "Invalid packageVersionId",
      "execution reverted: Audit passed version cannot be voided": "Audit passed version cannot be voided",
      "execution reverted: already voided": "Already voided",
      "execution reverted: not in progress": "Not in progress",
      "execution reverted: invalid packageId": "Invalid packageId",
      "execution reverted: not passed": "Not passed",
      "execution reverted: projectId/versionIdx not match": "ProjectId/VersionIdx not match",
      "execution reverted: projectId/packageId not match": "ProjectId/PackageId not match"
    };
    let s = staticMessageMap[oMessage];
    if (s) {
      return s;
    }
    return "";
  }

  // src/global/index.ts
  var EventId;
  (function(EventId2) {
    EventId2["Paid"] = "Paid";
    EventId2["ConnectWallet"] = "connectWallet";
    EventId2["IsWalletConnected"] = "isWalletConnected";
    EventId2["IsWalletDisconnected"] = "IsWalletDisconnected";
    EventId2["chainChanged"] = "chainChanged";
    EventId2["ShowResult"] = "showResult";
    EventId2["SetResultMessage"] = "setResultMessage";
    EventId2["ShowMainLayout"] = "showMainLayout";
    EventId2["ActiveTreeNode"] = "activeTreeNode";
    EventId2["GoToFile"] = "goToFile";
    EventId2["ShowConfirmationModal"] = "showConfirmationModal";
    EventId2["SetConfirmationMessage"] = "setConfirmationMessage";
    EventId2["ConfirmAction"] = "confirmAction";
    EventId2["ShowActionModal"] = "showActionModal";
    EventId2["SetActionModalData"] = "setActionModalData";
    EventId2["FetchProjectData"] = "fetchProjectData";
    EventId2["FetchPackageData"] = "fetchPackageData";
    EventId2["EmitNewToken"] = "emitNewToken";
  })(EventId || (EventId = {}));

  // src/store/data/tokens/index.ts
  var Tokens_BSC = require_bsc();
  var Tokens_Ethereuem = require_ethereum();
  var Tokens_Polygon = require_polygon();
  var Tokens_Avalanche = require_avalanche();
  var Tokens_Fantom = require_fantom();
  var Tokens_Cronos = require_cronos();
  var Tokens_Kovan = require_kovan();
  var Tokens_BSC_Testnet = require_bsc_testnet();
  var Tokens_Fuji = require_fuji();
  var Tokens_Mumbai = require_mumbai();
  var Tokens_Fantom_Testnet = require_fantom_testnet();
  var Tokens_Amino = require_amino();
  var Tokens_AminoXTestnet = require_aminoX_testnet();
  var Tokens_Cronos_Testnet = require_cronos_testnet();
  var DefaultERC20Tokens = {
    1: Tokens_Ethereuem,
    25: Tokens_Cronos,
    42: Tokens_Kovan,
    56: Tokens_BSC,
    97: Tokens_BSC_Testnet,
    137: Tokens_Polygon,
    338: Tokens_Cronos_Testnet,
    31337: Tokens_Amino,
    80001: Tokens_Mumbai,
    43113: Tokens_Fuji,
    43114: Tokens_Avalanche,
    250: Tokens_Fantom,
    4002: Tokens_Fantom_Testnet,
    13370: Tokens_AminoXTestnet
  };
  var ChainNativeTokenByChainId = {
    1: { address: void 0, decimals: 18, symbol: "ETH", name: "ETH", isNative: true },
    25: { address: void 0, decimals: 18, symbol: "CRO", name: "CRO", isNative: true },
    42: { address: void 0, decimals: 18, symbol: "ETH", name: "ETH", isNative: true },
    56: { address: void 0, decimals: 18, symbol: "BNB", name: "BNB", isNative: true },
    97: { address: void 0, decimals: 18, symbol: "BNB", name: "BNB", isNative: true },
    137: { address: void 0, decimals: 18, symbol: "MATIC", name: "MATIC", isNative: true },
    338: { address: void 0, decimals: 18, symbol: "TCRO", name: "TCRO", isNative: true },
    31337: { address: void 0, decimals: 18, symbol: "ACT", name: "ACT", isNative: true },
    80001: { address: void 0, decimals: 18, symbol: "MATIC", name: "MATIC", isNative: true },
    43114: { address: void 0, decimals: 18, symbol: "AVAX", name: "AVAX", isNative: true },
    43113: { address: void 0, decimals: 18, symbol: "AVAX", name: "AVAX", isNative: true },
    250: { address: void 0, decimals: 18, symbol: "FTM", name: "FTM", isNative: true },
    4002: { address: void 0, decimals: 18, symbol: "FTM", name: "FTM", isNative: true },
    13370: { address: void 0, decimals: 18, symbol: "ACT", name: "ACT", isNative: true }
  };
  var WETHByChainId = Object.keys(DefaultERC20Tokens).reduce((result, key) => {
    result[key] = DefaultERC20Tokens[Number(key)].find((v) => v.isWETH);
    return result;
  }, {});
  var DefaultTokens = Object.keys(ChainNativeTokenByChainId).reduce((result, key) => {
    result[key] = [...DefaultERC20Tokens[Number(key)], ChainNativeTokenByChainId[Number(key)]];
    return result;
  }, {});

  // src/store/wallet.ts
  var import_components = __toModule(__require("@ijstech/components"));

  // src/store/walletList.ts
  var import_eth_wallet3 = __toModule(__require("@ijstech/eth-wallet"));
  var walletList = [
    {
      name: import_eth_wallet3.WalletPlugin.MetaMask,
      displayName: "MetaMask",
      iconFile: "metamask.png"
    },
    {
      name: import_eth_wallet3.WalletPlugin.ONTOWallet,
      displayName: "ONTO Wallet",
      iconFile: "ONTOWallet.jpg"
    },
    {
      name: import_eth_wallet3.WalletPlugin.Coin98,
      displayName: "Coin98 Wallet",
      iconFile: "Coin98.svg"
    },
    {
      name: import_eth_wallet3.WalletPlugin.TrustWallet,
      displayName: "Trust Wallet",
      iconFile: "trustwallet.svg"
    },
    {
      name: import_eth_wallet3.WalletPlugin.BinanceChainWallet,
      displayName: "Binance Chain Wallet",
      iconFile: "binance-chain-wallet.svg"
    },
    {
      name: import_eth_wallet3.WalletPlugin.WalletConnect,
      displayName: "WalletConnect",
      iconFile: "walletconnect.svg"
    }
  ];

  // src/store/wallet.ts
  var import_eth_wallet4 = __toModule(__require("@ijstech/eth-wallet"));
  function isWalletConnected() {
    const wallet = import_eth_wallet4.Wallet.getInstance();
    return wallet.isConnected;
  }

  // src/store/index.ts
  var import_vesting_sdk = __toModule(require_lib());

  // src/assets/index.ts
  var import_components2 = __toModule(__require("@ijstech/components"));
  var moduleDir = import_components2.application.currentModuleDir;
  function fullPath(path) {
    return `${moduleDir}/${path}`;
  }
  var assets_default = {
    icons: {
      logo: `${moduleDir}/img/sc-logo.svg`,
      logoMobile: `${moduleDir}/img/sc-logo-mobile.svg`,
      validocs: `${moduleDir}/img/validocs.svg`
    },
    fullPath
  };

  // src/store/index.ts
  var state = {
    currentChainId: 0,
    tokenBalances: {},
    tokenMap: {},
    userTokens: {},
    contractInfoByChain: {},
    domainModuleInfoByChain: {},
    infuraId: "",
    networkMap: {},
    defaultChainId: 0
  };
  var setDataFromSCConfig = (options) => {
    if (options.contractInfo) {
      setContractInfo(options.contractInfo);
    }
    if (options.infuraId) {
      setInfuraId(options.infuraId);
    }
    if (options.networkList) {
      setNetworkList(options.networkList, options.infuraId);
    }
    if (options.defaultChainId) {
      setDefaultChainId(options.defaultChainId);
    }
    if (options.domainModuleInfo) {
      setDomainModuleInfo(options.domainModuleInfo);
    }
  };
  var setDefaultChainId = (chainId) => {
    state.defaultChainId = chainId;
  };
  var setInfuraId = (infuraId) => {
    state.infuraId = infuraId;
  };
  var setNetworkList = (networkList, infuraId) => {
    state.networkMap = {};
    for (let network of networkList) {
      if (infuraId && network.rpc) {
        network.rpc = network.rpc.replace(/{InfuraId}/g, infuraId);
      }
      state.networkMap[network.chainId] = network;
    }
  };
  var getNetworkInfo = (chainId) => {
    return state.networkMap[chainId];
  };
  var getNetworkExplorerName = (chainId) => {
    if (getNetworkInfo(chainId)) {
      return getNetworkInfo(chainId).explorerName;
    }
    return "Unknown";
  };
  var setContractInfo = (data) => {
    state.contractInfoByChain = data;
  };
  var getContractInfo = (chainId) => {
    return state.contractInfoByChain[chainId];
  };
  var setDomainModuleInfo = (data) => {
    state.domainModuleInfoByChain = data;
  };
  var getVaultFactoryAddress = () => {
    let wallet = import_eth_wallet5.Wallet.getInstance();
    let chainId = wallet.chainId;
    let contractInfo = getContractInfo(chainId);
    if (!contractInfo)
      return null;
    let factoryAddress = contractInfo.vaultFactory.address;
    return factoryAddress;
  };
  function getChainId() {
    return import_eth_wallet5.Wallet.getInstance().chainId;
  }
  var viewOnExplorerByTxHash = (chainId, txHash) => {
    let network = getNetworkInfo(chainId);
    if (network && network.explorerTxUrl) {
      let url = `${network.explorerTxUrl}${txHash}`;
      window.open(url);
    }
  };

  // src/config/index.tsx
  var import_eth_wallet7 = __toModule(__require("@ijstech/eth-wallet"));

  // src/config/API.ts
  var import_eth_wallet6 = __toModule(__require("@ijstech/eth-wallet"));
  var import_vesting_sdk2 = __toModule(require_lib());
  var newProfile = async () => {
    let wallet = import_eth_wallet6.Wallet.getInstance();
    let factoryAddress = getVaultFactoryAddress();
    if (!factoryAddress)
      return null;
    let factory = new import_vesting_sdk2.Contracts.ValidVestingVaultFactory(wallet, factoryAddress);
    let receipt = await factory.newProfile([wallet.address]);
    return receipt;
  };
  var getNewProfileId = (receipt) => {
    let wallet = import_eth_wallet6.Wallet.getInstance();
    let factoryAddress = getVaultFactoryAddress();
    if (!factoryAddress)
      return null;
    let factory = new import_vesting_sdk2.Contracts.ValidVestingVaultFactory(wallet, factoryAddress);
    let event = factory.parseNewProfileEvent(receipt)[0];
    return event.profileId.toNumber();
  };

  // src/config/index.css.ts
  var import_components3 = __toModule(__require("@ijstech/components"));
  var Theme = import_components3.Styles.Theme.ThemeVars;
  var index_css_default = import_components3.Styles.style({
    background: Theme.background.paper,
    $nest: {
      ".ml-0-7-5": {
        marginLeft: ".75rem"
      },
      ".os-modal": {
        borderRadius: 20,
        boxSizing: "border-box",
        fontSize: ".875rem",
        fontWeight: 400,
        $nest: {
          "i-icon": {
            display: "inline-block"
          },
          "> div > div": {
            backgroundColor: "#252a48",
            height: "calc(100% - 200px)",
            borderRadius: 15,
            lineHeight: 1.5,
            wordWrap: "break-word",
            padding: 0,
            minHeight: 400,
            width: 360
          },
          ".i-modal_header": {
            color: Theme.colors.secondary.main,
            borderRadius: "20px 20px 0 0",
            background: "unset",
            padding: "16px 24px",
            fontWeight: 500,
            fontSize: "1rem"
          },
          ".i-modal_content": {
            padding: "0 1.25rem"
          },
          ".list-view": {
            $nest: {
              ".list-item:hover": {
                $nest: {
                  "> *": {
                    opacity: 1
                  }
                }
              },
              ".list-item:not(:first-child)": {
                marginTop: ".5rem"
              },
              ".list-item": {
                backgroundColor: Theme.background.default,
                position: "relative",
                borderRadius: 10,
                cursor: "pointer",
                border: "none",
                transition: "all .3s ease-in",
                overflow: "unset",
                $nest: {
                  "&.disabled-network-selection": {
                    cursor: "default",
                    $nest: {
                      "&:hover > *": {
                        opacity: "0.5 !important"
                      }
                    }
                  },
                  "> *": {
                    opacity: 0.5
                  }
                }
              },
              ".list-item i-image": {
                height: "auto"
              },
              ".list-item.is-actived": {
                $nest: {
                  "> *": {
                    opacity: 1
                  },
                  "&:after": {
                    content: "''",
                    top: "50%",
                    left: 9,
                    position: "absolute",
                    background: "#20bf55",
                    borderRadius: "50%",
                    width: 10,
                    height: 10,
                    transform: "translate3d(-50%,-50%,0)"
                  },
                  ".custom-label": {
                    paddingLeft: ".75rem"
                  }
                }
              }
            }
          },
          ".networks": {
            color: "#f05e61",
            marginTop: "1.5rem",
            height: "calc(100% - 160px)",
            overflowY: "auto",
            width: "100% !important",
            $nest: {
              ".list-item": {
                padding: ".65rem .5rem"
              }
            }
          }
        }
      }
    }
  });

  // src/config/index.tsx
  var Theme2 = import_components4.Styles.Theme.ThemeVars;
  var TextAlignCenter = import_components4.Styles.style({
    textAlign: "center"
  });
  var Config = class extends import_components4.Module {
    constructor(parent, options) {
      super(parent, options);
      this.onWalletConnect = async (connected) => {
        let chainId = getChainId();
        if (connected && !chainId) {
          this.onChainChange();
        } else {
          this.onSetupPage(connected);
        }
      };
      this.onChainChange = () => {
        this.onSetupPage(true);
      };
      this.$eventBus = import_components4.application.EventBus;
      let scconfig = require_scconfig();
      if (scconfig) {
        setDataFromSCConfig(scconfig);
      }
      this.registerEvents();
    }
    registerEvents() {
      this.$eventBus.register(this, EventId.IsWalletConnected, this.onWalletConnect);
      this.$eventBus.register(this, EventId.chainChanged, this.onChainChange);
      this.$eventBus.register(this, EventId.IsWalletDisconnected, this.onWalletConnect);
    }
    async init() {
      this.classList.add(index_css_default);
      super.init();
      this.onSetupPage(isWalletConnected());
    }
    async buildLink(txHash) {
      if (txHash) {
        const chainId = await import_eth_wallet7.Wallet.getInstance().chainId;
        viewOnExplorerByTxHash(chainId, txHash);
      }
    }
    closeResultModal() {
      this.resultModal.visible = false;
    }
    async extractErrorMsg(message) {
      var _a;
      if (message.status !== "error")
        return message.content;
      if (message.content && message.content.includes("Internal JSON-RPC error.")) {
        message.content = JSON.parse(message.content.replace("Internal JSON-RPC error.\n", "")).message;
      }
      let errorMsg = await parseContractError((_a = message.content) != null ? _a : "", message.obj);
      return errorMsg;
    }
    openTxRejectedModal(message) {
      this.resultModal.onOpen = async (target) => {
        this.pnlResultModalMain.clearInnerHTML();
        const mainSection = await import_components4.VStack.create({
          horizontalAlignment: "center"
        });
        const icon = await import_components4.Icon.create({
          name: "exclamation-triangle",
          height: 50,
          fill: Theme2.colors.primary.main,
          margin: { bottom: "1.875rem" }
        }, mainSection);
        icon.classList.add("inline-block");
        mainSection.appendChild(icon);
        const label = await import_components4.Label.create({
          caption: "Transaction Rejected.",
          margin: { bottom: "1.875rem" },
          font: { size: "1.125rem", color: Theme2.colors.warning.light }
        }, mainSection);
        mainSection.appendChild(label);
        const errMsgBlock = await import_components4.VStack.create({
          margin: { top: "1rem" }
        }, mainSection);
        errMsgBlock.id = "errMsgBlock";
        const caption = await this.extractErrorMsg(message);
        const contentLabel = await import_components4.Label.create({
          caption,
          margin: { bottom: "1rem" }
        }, errMsgBlock);
        errMsgBlock.appendChild(contentLabel);
        mainSection.appendChild(errMsgBlock);
        const button = await import_components4.Button.create({
          width: "100%",
          caption: "Cancel",
          margin: { top: "1rem" },
          padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "2rem" },
          background: { color: Theme2.colors.primary.main }
        }, mainSection);
        button.onClick = () => this.closeResultModal();
        mainSection.appendChild(button);
        this.pnlResultModalMain.appendChild(mainSection);
      };
      this.resultModal.visible = true;
    }
    async addTxHashContentBlock(parent, txHash) {
      const chainId = await import_eth_wallet7.Wallet.getInstance().chainId;
      const explorerName = getNetworkExplorerName(chainId);
      const section = await import_components4.VStack.create({}, parent);
      const label1 = await import_components4.Label.create({
        caption: txHash.substring(0, 33),
        margin: { bottom: "1rem" }
      }, section);
      section.appendChild(label1);
      const label2 = await import_components4.Label.create({
        caption: txHash.substring(33, txHash.length),
        margin: { bottom: "1rem" }
      }, section);
      section.appendChild(label2);
      const link = await import_components4.Label.create({
        caption: `View on ${explorerName}`,
        margin: { top: "1rem" },
        font: { color: "#FD4A4C" },
        display: "inline-block"
      }, section);
      link.onClick = this.buildLink.bind(this, txHash);
      link.classList.add("red-link", "block");
      section.appendChild(link);
      parent.appendChild(section);
    }
    async openTxSubmittedModal(txHash) {
      this.resultModal.onOpen = async (target) => {
        this.pnlResultModalMain.clearInnerHTML();
        const mainSection = await import_components4.VStack.create({
          horizontalAlignment: "center"
        });
        mainSection.id = "warningSection";
        const loading = /* @__PURE__ */ this.$render("i-panel", {
          height: 100
        }, /* @__PURE__ */ this.$render("i-vstack", {
          id: "loadingElm",
          class: "i-loading-overlay",
          height: "100%",
          background: { color: "transparent" }
        }, /* @__PURE__ */ this.$render("i-vstack", {
          class: "i-loading-spinner",
          horizontalAlignment: "center",
          verticalAlignment: "center"
        }, /* @__PURE__ */ this.$render("i-icon", {
          class: "i-loading-spinner_icon",
          image: { url: assets_default.fullPath("img/loading.svg"), width: 24, height: 24 }
        }), /* @__PURE__ */ this.$render("i-label", {
          font: { color: "#FD4A4C" },
          class: "i-loading-spinner_text"
        }))));
        mainSection.appendChild(loading);
        const section = await import_components4.Panel.create({
          margin: { bottom: 20 }
        }, mainSection);
        const label = await import_components4.Label.create({
          caption: "Transaction submitted and your profile is being created",
          display: "block",
          margin: { bottom: "1rem" },
          font: { size: "1.125rem", color: Theme2.colors.warning.light }
        });
        section.appendChild(label);
        if (txHash) {
          await this.addTxHashContentBlock(section, txHash);
        }
        mainSection.appendChild(section);
        this.pnlResultModalMain.appendChild(mainSection);
      };
      this.resultModal.visible = true;
    }
    async openTxConfirmedModal(profileId, txHash) {
      const title = `New Profile ID ${profileId} Created`;
      this.resultModal.onOpen = async (target) => {
        this.pnlResultModalMain.clearInnerHTML();
        const mainSection = await import_components4.VStack.create({
          horizontalAlignment: "center"
        });
        const icon = await import_components4.Icon.create({
          name: "check-circle",
          height: 50,
          fill: Theme2.colors.primary.main,
          margin: { bottom: "1.875rem" }
        }, mainSection);
        icon.classList.add("inline-block");
        mainSection.appendChild(icon);
        const label = await import_components4.Label.create({
          caption: title,
          margin: { bottom: "1.875rem" },
          font: { size: "1.125rem", color: Theme2.colors.warning.light }
        }, mainSection);
        mainSection.appendChild(label);
        const contentSection = await import_components4.VStack.create({}, mainSection);
        contentSection.id = "contentSection";
        mainSection.appendChild(contentSection);
        const contentLabel = await import_components4.Label.create({
          caption: ""
        });
        contentSection.appendChild(contentLabel);
        if (txHash) {
          await this.addTxHashContentBlock(contentSection, txHash);
        }
        const button = await import_components4.Button.create({
          width: "100%",
          caption: "Close",
          margin: { top: "1rem" },
          padding: { top: "1rem", bottom: "1rem", left: "1rem", right: "2rem" },
          background: { color: Theme2.colors.primary.main }
        }, mainSection);
        button.onClick = () => this.closeResultModal();
        mainSection.appendChild(button);
        this.pnlResultModalMain.appendChild(mainSection);
      };
      this.resultModal.visible = true;
    }
    async onSetupPage(isWalletConnected2) {
      if (isWalletConnected2) {
        let factory = await getVaultFactoryAddress();
        if (factory) {
          this.pnlErrorMsg.visible = false;
          this.pnlMain.visible = true;
        } else {
          this.lbErrorMsg.caption = "No Vault Factory is found on this chain";
          this.pnlErrorMsg.visible = true;
          this.pnlMain.visible = false;
        }
      } else {
        this.lbErrorMsg.caption = "Please connect your wallet";
        this.pnlErrorMsg.visible = true;
        this.pnlMain.visible = false;
      }
    }
    async clickConfirm() {
      const txHashCallback = (err, receipt2) => {
        if (err) {
          this.openTxRejectedModal({
            status: "error",
            content: err.message
          });
        } else if (receipt2) {
          this.btnConfirm.rightIcon.visible = true;
          this.btnConfirm.caption = "Confirming";
          this.openTxSubmittedModal(receipt2);
        }
      };
      const confirmationCallback = (receipt2) => {
        this.btnConfirm.rightIcon.visible = false;
        this.btnConfirm.caption = "Confirm";
        let profileId = getNewProfileId(receipt2);
        if (profileId != null) {
          console.log("profileId", profileId);
          this.$eventBus.dispatch("txConfirmed", {
            profileId
          });
          this.openTxConfirmedModal(profileId, receipt2.transactionHash);
        }
      };
      registerSendTxEvents({
        transactionHash: txHashCallback,
        confirmation: confirmationCallback
      });
      let receipt = await newProfile();
    }
    render() {
      return /* @__PURE__ */ this.$render("i-panel", {
        height: "100%",
        width: "100%",
        background: Theme2.background.modal
      }, /* @__PURE__ */ this.$render("i-vstack", {
        id: "pnlMain",
        margin: { left: "1.5rem", right: "1.5rem", top: "1rem", bottom: "1rem" },
        gap: "1rem"
      }, /* @__PURE__ */ this.$render("i-hstack", {
        id: "stackFirstStep",
        padding: { left: "1.5rem", right: "1.5rem", top: "1rem", bottom: "1rem" },
        border: { radius: 30 },
        horizontalAlignment: "space-between",
        background: "#000000"
      }, /* @__PURE__ */ this.$render("i-hstack", {
        verticalAlignment: "center",
        gap: 15
      }, /* @__PURE__ */ this.$render("i-label", {
        caption: "STEP 1",
        font: { size: "20px", name: "Montserrat SemiBold", color: Theme2.colors.primary.main }
      }), /* @__PURE__ */ this.$render("i-label", {
        caption: "Click Confirm to Create a Profile",
        font: { size: "20px", name: "Montserrat SemiBold" }
      })), /* @__PURE__ */ this.$render("i-button", {
        id: "btnConfirm",
        caption: "Confirm",
        width: "200px",
        height: "50",
        onClick: this.clickConfirm,
        rightIcon: { spin: true, visible: false },
        background: Theme2.background.main,
        border: { radius: 12, width: 2, style: "solid", color: "#FFB82F" }
      }))), /* @__PURE__ */ this.$render("i-vstack", {
        id: "pnlErrorMsg",
        visible: false,
        horizontalAlignment: "center",
        verticalAlignment: "center",
        width: "100%",
        height: "100%"
      }, /* @__PURE__ */ this.$render("i-label", {
        id: "lbErrorMsg"
      })), /* @__PURE__ */ this.$render("i-modal", {
        id: "resultModal",
        class: TextAlignCenter,
        maxWidth: "500px",
        closeIcon: { name: "times" }
      }, /* @__PURE__ */ this.$render("i-panel", {
        id: "pnlResultModalMain",
        class: "i-modal_content"
      })));
    }
  };
  Config = __decorateClass([
    import_components4.customModule
  ], Config);
})();
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! moment.js
//! momentjs.com
//! version : 2.29.1
