#!/usr/bin/env node
import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../praxis-ba/node_modules/zod/v3/helpers/util.js
var util, objectUtil, ZodParsedType, getParsedType;
var init_util = __esm({
  "../praxis-ba/node_modules/zod/v3/helpers/util.js"() {
    (function(util2) {
      util2.assertEqual = (_) => {
      };
      function assertIs(_arg) {
      }
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
      function joinValues(array, separator = " | ") {
        return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util || (util = {}));
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
          // second overwrites first
        };
      };
    })(objectUtil || (objectUtil = {}));
    ZodParsedType = util.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    getParsedType = (data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return ZodParsedType.undefined;
        case "string":
          return ZodParsedType.string;
        case "number":
          return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
          return ZodParsedType.boolean;
        case "function":
          return ZodParsedType.function;
        case "bigint":
          return ZodParsedType.bigint;
        case "symbol":
          return ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return ZodParsedType.array;
          }
          if (data === null) {
            return ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return ZodParsedType.date;
          }
          return ZodParsedType.object;
        default:
          return ZodParsedType.unknown;
      }
    };
  }
});

// ../praxis-ba/node_modules/zod/v3/ZodError.js
var ZodIssueCode, quotelessJson, ZodError;
var init_ZodError = __esm({
  "../praxis-ba/node_modules/zod/v3/ZodError.js"() {
    init_util();
    ZodIssueCode = util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    quotelessJson = (obj) => {
      const json2 = JSON.stringify(obj, null, 2);
      return json2.replace(/"([^"]+)":/g, "$1:");
    };
    ZodError = class _ZodError extends Error {
      get errors() {
        return this.issues;
      }
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
          for (const issue of error.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      static assert(value) {
        if (!(value instanceof _ZodError)) {
          throw new Error(`Not a ZodError: ${value}`);
        }
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            const firstEl = sub.path[0];
            fieldErrors[firstEl] = fieldErrors[firstEl] || [];
            fieldErrors[firstEl].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    ZodError.create = (issues) => {
      const error = new ZodError(issues);
      return error;
    };
  }
});

// ../praxis-ba/node_modules/zod/v3/locales/en.js
var errorMap, en_default;
var init_en = __esm({
  "../praxis-ba/node_modules/zod/v3/locales/en.js"() {
    init_ZodError();
    init_util();
    errorMap = (issue, _ctx) => {
      let message2;
      switch (issue.code) {
        case ZodIssueCode.invalid_type:
          if (issue.received === ZodParsedType.undefined) {
            message2 = "Required";
          } else {
            message2 = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodIssueCode.invalid_literal:
          message2 = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
          break;
        case ZodIssueCode.unrecognized_keys:
          message2 = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodIssueCode.invalid_union:
          message2 = `Invalid input`;
          break;
        case ZodIssueCode.invalid_union_discriminator:
          message2 = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
          break;
        case ZodIssueCode.invalid_enum_value:
          message2 = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodIssueCode.invalid_arguments:
          message2 = `Invalid function arguments`;
          break;
        case ZodIssueCode.invalid_return_type:
          message2 = `Invalid function return type`;
          break;
        case ZodIssueCode.invalid_date:
          message2 = `Invalid date`;
          break;
        case ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("includes" in issue.validation) {
              message2 = `Invalid input: must include "${issue.validation.includes}"`;
              if (typeof issue.validation.position === "number") {
                message2 = `${message2} at one or more positions greater than or equal to ${issue.validation.position}`;
              }
            } else if ("startsWith" in issue.validation) {
              message2 = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message2 = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message2 = `Invalid ${issue.validation}`;
          } else {
            message2 = "Invalid";
          }
          break;
        case ZodIssueCode.too_small:
          if (issue.type === "array")
            message2 = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message2 = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message2 = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "bigint")
            message2 = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message2 = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
          else
            message2 = "Invalid input";
          break;
        case ZodIssueCode.too_big:
          if (issue.type === "array")
            message2 = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message2 = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message2 = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "bigint")
            message2 = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message2 = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
          else
            message2 = "Invalid input";
          break;
        case ZodIssueCode.custom:
          message2 = `Invalid input`;
          break;
        case ZodIssueCode.invalid_intersection_types:
          message2 = `Intersection results could not be merged`;
          break;
        case ZodIssueCode.not_multiple_of:
          message2 = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodIssueCode.not_finite:
          message2 = "Number must be finite";
          break;
        default:
          message2 = _ctx.defaultError;
          util.assertNever(issue);
      }
      return { message: message2 };
    };
    en_default = errorMap;
  }
});

// ../praxis-ba/node_modules/zod/v3/errors.js
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var overrideErrorMap;
var init_errors = __esm({
  "../praxis-ba/node_modules/zod/v3/errors.js"() {
    init_en();
    overrideErrorMap = en_default;
  }
});

// ../praxis-ba/node_modules/zod/v3/helpers/parseUtil.js
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var makeIssue, EMPTY_PATH, ParseStatus, INVALID, DIRTY, OK, isAborted, isDirty, isValid, isAsync;
var init_parseUtil = __esm({
  "../praxis-ba/node_modules/zod/v3/helpers/parseUtil.js"() {
    init_errors();
    init_en();
    makeIssue = (params) => {
      const { data, path, errorMaps, issueData } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      if (issueData.message !== void 0) {
        return {
          ...issueData,
          path: fullPath,
          message: issueData.message
        };
      }
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: errorMessage
      };
    };
    EMPTY_PATH = [];
    ParseStatus = class _ParseStatus {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
          if (s.status === "aborted")
            return INVALID;
          if (s.status === "dirty")
            status.dirty();
          arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value
          });
        }
        return _ParseStatus.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key, value } = pair;
          if (key.status === "aborted")
            return INVALID;
          if (value.status === "aborted")
            return INVALID;
          if (key.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
            finalObject[key.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    INVALID = Object.freeze({
      status: "aborted"
    });
    DIRTY = (value) => ({ status: "dirty", value });
    OK = (value) => ({ status: "valid", value });
    isAborted = (x) => x.status === "aborted";
    isDirty = (x) => x.status === "dirty";
    isValid = (x) => x.status === "valid";
    isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
  }
});

// ../praxis-ba/node_modules/zod/v3/helpers/typeAliases.js
var init_typeAliases = __esm({
  "../praxis-ba/node_modules/zod/v3/helpers/typeAliases.js"() {
  }
});

// ../praxis-ba/node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
var init_errorUtil = __esm({
  "../praxis-ba/node_modules/zod/v3/helpers/errorUtil.js"() {
    (function(errorUtil2) {
      errorUtil2.errToObj = (message2) => typeof message2 === "string" ? { message: message2 } : message2 || {};
      errorUtil2.toString = (message2) => typeof message2 === "string" ? message2 : message2?.message;
    })(errorUtil || (errorUtil = {}));
  }
});

// ../praxis-ba/node_modules/zod/v3/types.js
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message: message2 } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message2 ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message2 ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message2 ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var ParseInputLazyPath, handleResult, ZodType, cuidRegex, cuid2Regex, ulidRegex, uuidRegex, nanoidRegex, jwtRegex, durationRegex, emailRegex, _emojiRegex, emojiRegex, ipv4Regex, ipv4CidrRegex, ipv6Regex, ipv6CidrRegex, base64Regex, base64urlRegex, dateRegexSource, dateRegex, ZodString, ZodNumber, ZodBigInt, ZodBoolean, ZodDate, ZodSymbol, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodArray, ZodObject, ZodUnion, getDiscriminator, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodFunction, ZodLazy, ZodLiteral, ZodEnum, ZodNativeEnum, ZodPromise, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodCatch, ZodNaN, BRAND, ZodBranded, ZodPipeline, ZodReadonly, late, ZodFirstPartyTypeKind, instanceOfType, stringType, numberType, nanType, bigIntType, booleanType, dateType, symbolType, undefinedType, nullType, anyType, unknownType, neverType, voidType, arrayType, objectType, strictObjectType, unionType, discriminatedUnionType, intersectionType, tupleType, recordType, mapType, setType, functionType, lazyType, literalType, enumType, nativeEnumType, promiseType, effectsType, optionalType, nullableType, preprocessType, pipelineType, ostring, onumber, oboolean, coerce, NEVER;
var init_types = __esm({
  "../praxis-ba/node_modules/zod/v3/types.js"() {
    init_ZodError();
    init_errors();
    init_errorUtil();
    init_parseUtil();
    init_util();
    ParseInputLazyPath = class {
      constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
      }
      get path() {
        if (!this._cachedPath.length) {
          if (Array.isArray(this._key)) {
            this._cachedPath.push(...this._path, ...this._key);
          } else {
            this._cachedPath.push(...this._path, this._key);
          }
        }
        return this._cachedPath;
      }
    };
    handleResult = (ctx, result) => {
      if (isValid(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        return {
          success: false,
          get error() {
            if (this._error)
              return this._error;
            const error = new ZodError(ctx.common.issues);
            this._error = error;
            return this._error;
          }
        };
      }
    };
    ZodType = class {
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return getParsedType(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        const ctx = {
          common: {
            issues: [],
            async: params?.async ?? false,
            contextualErrorMap: params?.errorMap
          },
          path: params?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
      }
      "~validate"(data) {
        const ctx = {
          common: {
            issues: [],
            async: !!this["~standard"].async
          },
          path: [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        if (!this["~standard"].async) {
          try {
            const result = this._parseSync({ data, path: [], parent: ctx });
            return isValid(result) ? {
              value: result.value
            } : {
              issues: ctx.common.issues
            };
          } catch (err) {
            if (err?.message?.toLowerCase()?.includes("encountered")) {
              this["~standard"].async = true;
            }
            ctx.common = {
              issues: [],
              async: true
            };
          }
        }
        return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        });
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params?.errorMap,
            async: true
          },
          path: params?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
      }
      refine(check, message2) {
        const getIssueProperties = (val) => {
          if (typeof message2 === "string" || typeof message2 === "undefined") {
            return { message: message2 };
          } else if (typeof message2 === "function") {
            return message2(val);
          } else {
            return message2;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = () => ctx.addIssue({
            code: ZodIssueCode.custom,
            ...getIssueProperties(val)
          });
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this["~standard"] = {
          version: 1,
          vendor: "zod",
          validate: (data) => this["~validate"](data)
        };
      }
      optional() {
        return ZodOptional.create(this, this._def);
      }
      nullable() {
        return ZodNullable.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray.create(this);
      }
      promise() {
        return ZodPromise.create(this, this._def);
      }
      or(option) {
        return ZodUnion.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects({
          ...processCreateParams(this._def),
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
          ...processCreateParams(this._def),
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        });
      }
      brand() {
        return new ZodBranded({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this,
          ...processCreateParams(this._def)
        });
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
          ...processCreateParams(this._def),
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      readonly() {
        return ZodReadonly.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    cuidRegex = /^c[^\s-]{8,}$/i;
    cuid2Regex = /^[0-9a-z]+$/;
    ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
    uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
    nanoidRegex = /^[a-z0-9_-]{21}$/i;
    jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
    durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
    emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
    ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
    base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
    dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
    dateRegex = new RegExp(`^${dateRegexSource}$`);
    ZodString = class _ZodString extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.string,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "email",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "emoji") {
            if (!emojiRegex) {
              emojiRegex = new RegExp(_emojiRegex, "u");
            }
            if (!emojiRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "emoji",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "uuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "nanoid") {
            if (!nanoidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "nanoid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid2") {
            if (!cuid2Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid2",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ulid") {
            if (!ulidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ulid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "url",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "regex",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "includes") {
            if (!input.data.includes(check.value, check.position)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { includes: check.value, position: check.position },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "toLowerCase") {
            input.data = input.data.toLowerCase();
          } else if (check.kind === "toUpperCase") {
            input.data = input.data.toUpperCase();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { startsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { endsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "date") {
            const regex = dateRegex;
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "date",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "time") {
            const regex = timeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "time",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "duration") {
            if (!durationRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "duration",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ip") {
            if (!isValidIP(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ip",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "jwt") {
            if (!isValidJWT(input.data, check.alg)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "jwt",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cidr") {
            if (!isValidCidr(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cidr",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64") {
            if (!base64Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "base64",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64url") {
            if (!base64urlRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "base64url",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _regex(regex, validation, message2) {
        return this.refinement((data) => regex.test(data), {
          validation,
          code: ZodIssueCode.invalid_string,
          ...errorUtil.errToObj(message2)
        });
      }
      _addCheck(check) {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      email(message2) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message2) });
      }
      url(message2) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message2) });
      }
      emoji(message2) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message2) });
      }
      uuid(message2) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message2) });
      }
      nanoid(message2) {
        return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message2) });
      }
      cuid(message2) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message2) });
      }
      cuid2(message2) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message2) });
      }
      ulid(message2) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message2) });
      }
      base64(message2) {
        return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message2) });
      }
      base64url(message2) {
        return this._addCheck({
          kind: "base64url",
          ...errorUtil.errToObj(message2)
        });
      }
      jwt(options2) {
        return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options2) });
      }
      ip(options2) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options2) });
      }
      cidr(options2) {
        return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options2) });
      }
      datetime(options2) {
        if (typeof options2 === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            local: false,
            message: options2
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof options2?.precision === "undefined" ? null : options2?.precision,
          offset: options2?.offset ?? false,
          local: options2?.local ?? false,
          ...errorUtil.errToObj(options2?.message)
        });
      }
      date(message2) {
        return this._addCheck({ kind: "date", message: message2 });
      }
      time(options2) {
        if (typeof options2 === "string") {
          return this._addCheck({
            kind: "time",
            precision: null,
            message: options2
          });
        }
        return this._addCheck({
          kind: "time",
          precision: typeof options2?.precision === "undefined" ? null : options2?.precision,
          ...errorUtil.errToObj(options2?.message)
        });
      }
      duration(message2) {
        return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message2) });
      }
      regex(regex, message2) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil.errToObj(message2)
        });
      }
      includes(value, options2) {
        return this._addCheck({
          kind: "includes",
          value,
          position: options2?.position,
          ...errorUtil.errToObj(options2?.message)
        });
      }
      startsWith(value, message2) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil.errToObj(message2)
        });
      }
      endsWith(value, message2) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil.errToObj(message2)
        });
      }
      min(minLength, message2) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil.errToObj(message2)
        });
      }
      max(maxLength, message2) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil.errToObj(message2)
        });
      }
      length(len, message2) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil.errToObj(message2)
        });
      }
      /**
       * Equivalent to `.min(1)`
       */
      nonempty(message2) {
        return this.min(1, errorUtil.errToObj(message2));
      }
      trim() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      toLowerCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }]
        });
      }
      toUpperCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toUpperCase" }]
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
      }
      get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
      }
      get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
      }
      get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
      }
      get isCIDR() {
        return !!this._def.checks.find((ch) => ch.kind === "cidr");
      }
      get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
      }
      get isBase64url() {
        return !!this._def.checks.find((ch) => ch.kind === "base64url");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodString.create = (params) => {
      return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params)
      });
    };
    ZodNumber = class _ZodNumber extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.number,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message2) {
        return this.setLimit("min", value, true, errorUtil.toString(message2));
      }
      gt(value, message2) {
        return this.setLimit("min", value, false, errorUtil.toString(message2));
      }
      lte(value, message2) {
        return this.setLimit("max", value, true, errorUtil.toString(message2));
      }
      lt(value, message2) {
        return this.setLimit("max", value, false, errorUtil.toString(message2));
      }
      setLimit(kind, value, inclusive, message2) {
        return new _ZodNumber({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message2)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodNumber({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      int(message2) {
        return this._addCheck({
          kind: "int",
          message: errorUtil.toString(message2)
        });
      }
      positive(message2) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message2)
        });
      }
      negative(message2) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message2)
        });
      }
      nonpositive(message2) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message2)
        });
      }
      nonnegative(message2) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message2)
        });
      }
      multipleOf(value, message2) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message2)
        });
      }
      finite(message2) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil.toString(message2)
        });
      }
      safe(message2) {
        return this._addCheck({
          kind: "min",
          inclusive: true,
          value: Number.MIN_SAFE_INTEGER,
          message: errorUtil.toString(message2)
        })._addCheck({
          kind: "max",
          inclusive: true,
          value: Number.MAX_SAFE_INTEGER,
          message: errorUtil.toString(message2)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
      }
      get isFinite() {
        let max = null;
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    };
    ZodNumber.create = (params) => {
      return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: params?.coerce || false,
        ...processCreateParams(params)
      });
    };
    ZodBigInt = class _ZodBigInt extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
      }
      _parse(input) {
        if (this._def.coerce) {
          try {
            input.data = BigInt(input.data);
          } catch {
            return this._getInvalidInput(input);
          }
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
          return this._getInvalidInput(input);
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                type: "bigint",
                minimum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                type: "bigint",
                maximum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (input.data % check.value !== BigInt(0)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _getInvalidInput(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.bigint,
          received: ctx.parsedType
        });
        return INVALID;
      }
      gte(value, message2) {
        return this.setLimit("min", value, true, errorUtil.toString(message2));
      }
      gt(value, message2) {
        return this.setLimit("min", value, false, errorUtil.toString(message2));
      }
      lte(value, message2) {
        return this.setLimit("max", value, true, errorUtil.toString(message2));
      }
      lt(value, message2) {
        return this.setLimit("max", value, false, errorUtil.toString(message2));
      }
      setLimit(kind, value, inclusive, message2) {
        return new _ZodBigInt({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message2)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodBigInt({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      positive(message2) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message2)
        });
      }
      negative(message2) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message2)
        });
      }
      nonpositive(message2) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message2)
        });
      }
      nonnegative(message2) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message2)
        });
      }
      multipleOf(value, message2) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message2)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodBigInt.create = (params) => {
      return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params)
      });
    };
    ZodBoolean = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodBoolean.create = (params) => {
      return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: params?.coerce || false,
        ...processCreateParams(params)
      });
    };
    ZodDate = class _ZodDate extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.date,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        if (Number.isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_date
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new _ZodDate({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      min(minDate, message2) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil.toString(message2)
        });
      }
      max(maxDate, message2) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil.toString(message2)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    ZodDate.create = (params) => {
      return new ZodDate({
        checks: [],
        coerce: params?.coerce || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
      });
    };
    ZodSymbol = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodSymbol.create = (params) => {
      return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
      });
    };
    ZodUndefined = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodUndefined.create = (params) => {
      return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
      });
    };
    ZodNull = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.null,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodNull.create = (params) => {
      return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
      });
    };
    ZodAny = class extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodAny.create = (params) => {
      return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
      });
    };
    ZodUnknown = class extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodUnknown.create = (params) => {
      return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
      });
    };
    ZodNever = class extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.never,
          received: ctx.parsedType
        });
        return INVALID;
      }
    };
    ZodNever.create = (params) => {
      return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
      });
    };
    ZodVoid = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.void,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodVoid.create = (params) => {
      return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
      });
    };
    ZodArray = class _ZodArray extends ZodType {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            addIssueToContext(ctx, {
              code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
          })).then((result2) => {
            return ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message2) {
        return new _ZodArray({
          ...this._def,
          minLength: { value: minLength, message: errorUtil.toString(message2) }
        });
      }
      max(maxLength, message2) {
        return new _ZodArray({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil.toString(message2) }
        });
      }
      length(len, message2) {
        return new _ZodArray({
          ...this._def,
          exactLength: { value: len, message: errorUtil.toString(message2) }
        });
      }
      nonempty(message2) {
        return this.min(1, message2);
      }
    };
    ZodArray.create = (schema, params) => {
      return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
      });
    };
    ZodObject = class _ZodObject extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        this._cached = { shape, keys };
        return this._cached;
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key in ctx.data) {
            if (!shapeKeys.includes(key)) {
              extraKeys.push(key);
            }
          }
        }
        const pairs = [];
        for (const key of shapeKeys) {
          const keyValidator = shape[key];
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key },
                value: { status: "valid", value: ctx.data[key] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip") {
          } else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key of extraKeys) {
            const value = ctx.data[key];
            pairs.push({
              key: { status: "valid", value: key },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key)
                //, ctx.child(key), value, getParsedType(value)
              ),
              alwaysSet: key in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              syncPairs.push({
                key,
                value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message2) {
        errorUtil.errToObj;
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strict",
          ...message2 !== void 0 ? {
            errorMap: (issue, ctx) => {
              const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: errorUtil.errToObj(message2).message ?? defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      // const AugmentFactory =
      //   <Def extends ZodObjectDef>(def: Def) =>
      //   <Augmentation extends ZodRawShape>(
      //     augmentation: Augmentation
      //   ): ZodObject<
      //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
      //     Def["unknownKeys"],
      //     Def["catchall"]
      //   > => {
      //     return new ZodObject({
      //       ...def,
      //       shape: () => ({
      //         ...def.shape(),
      //         ...augmentation,
      //       }),
      //     }) as any;
      //   };
      extend(augmentation) {
        return new _ZodObject({
          ...this._def,
          shape: () => ({
            ...this._def.shape(),
            ...augmentation
          })
        });
      }
      /**
       * Prior to zod@1.0.12 there was a bug in the
       * inferred type of merged objects. Please
       * upgrade if you are experiencing issues.
       */
      merge(merging) {
        const merged = new _ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => ({
            ...this._def.shape(),
            ...merging._def.shape()
          }),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      // merge<
      //   Incoming extends AnyZodObject,
      //   Augmentation extends Incoming["shape"],
      //   NewOutput extends {
      //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
      //       ? Augmentation[k]["_output"]
      //       : k extends keyof Output
      //       ? Output[k]
      //       : never;
      //   },
      //   NewInput extends {
      //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
      //       ? Augmentation[k]["_input"]
      //       : k extends keyof Input
      //       ? Input[k]
      //       : never;
      //   }
      // >(
      //   merging: Incoming
      // ): ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"],
      //   NewOutput,
      //   NewInput
      // > {
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      setKey(key, schema) {
        return this.augment({ [key]: schema });
      }
      // merge<Incoming extends AnyZodObject>(
      //   merging: Incoming
      // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
      // ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"]
      // > {
      //   // const mergedShape = objectUtil.mergeShapes(
      //   //   this._def.shape(),
      //   //   merging._def.shape()
      //   // );
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      catchall(index) {
        return new _ZodObject({
          ...this._def,
          catchall: index
        });
      }
      pick(mask) {
        const shape = {};
        for (const key of util.objectKeys(mask)) {
          if (mask[key] && this.shape[key]) {
            shape[key] = this.shape[key];
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        for (const key of util.objectKeys(this.shape)) {
          if (!mask[key]) {
            shape[key] = this.shape[key];
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      /**
       * @deprecated
       */
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        for (const key of util.objectKeys(this.shape)) {
          const fieldSchema = this.shape[key];
          if (mask && !mask[key]) {
            newShape[key] = fieldSchema;
          } else {
            newShape[key] = fieldSchema.optional();
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        for (const key of util.objectKeys(this.shape)) {
          if (mask && !mask[key]) {
            newShape[key] = this.shape[key];
          } else {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key] = newField;
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum(util.objectKeys(this.shape));
      }
    };
    ZodObject.create = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options2 = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options2.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options2) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError(issues2));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    ZodUnion.create = (types, params) => {
      return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
      });
    };
    getDiscriminator = (type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return util.objectValues(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else if (type instanceof ZodOptional) {
        return [void 0, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
      } else {
        return [];
      }
    };
    ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      /**
       * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
       * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
       * have a different value for each object in the union.
       * @param discriminator the name of the discriminator property
       * @param types an array of object schemas
       * @param params
       */
      static create(discriminator, options2, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options2) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues.length) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new _ZodDiscriminatedUnion({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options: options2,
          optionsMap,
          ...processCreateParams(params)
        });
      }
    };
    ZodIntersection = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if (isAborted(parsedLeft) || isAborted(parsedRight)) {
            return INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_intersection_types
            });
            return INVALID;
          }
          if (isDirty(parsedLeft) || isDirty(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
      });
    };
    ZodTuple = class _ZodTuple extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema)
            return null;
          return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return ParseStatus.mergeArray(status, results);
          });
        } else {
          return ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new _ZodTuple({
          ...this._def,
          rest
        });
      }
    };
    ZodTuple.create = (schemas2, params) => {
      if (!Array.isArray(schemas2)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple({
        items: schemas2,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
      });
    };
    ZodRecord = class _ZodRecord extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (ctx.common.async) {
          return ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new _ZodRecord({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(third)
          });
        }
        return new _ZodRecord({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(second)
        });
      }
    };
    ZodMap = class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.map,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key = pair.key;
            const value = pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
      });
    };
    ZodSet = class _ZodSet extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.set,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message2) {
        return new _ZodSet({
          ...this._def,
          minSize: { value: minSize, message: errorUtil.toString(message2) }
        });
      }
      max(maxSize, message2) {
        return new _ZodSet({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil.toString(message2) }
        });
      }
      size(size, message2) {
        return this.min(size, message2).max(size, message2);
      }
      nonempty(message2) {
        return this.min(1, message2);
      }
    };
    ZodSet.create = (valueType, params) => {
      return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
      });
    };
    ZodFunction = class _ZodFunction extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.function,
            received: ctx.parsedType
          });
          return INVALID;
        }
        function makeArgsIssue(args, error) {
          return makeIssue({
            data: args,
            path: ctx.path,
            errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_arguments,
              argumentsError: error
            }
          });
        }
        function makeReturnsIssue(returns, error) {
          return makeIssue({
            data: returns,
            path: ctx.path,
            errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_return_type,
              returnTypeError: error
            }
          });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          const me = this;
          return OK(async function(...args) {
            const error = new ZodError([]);
            const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
              error.addIssue(makeArgsIssue(args, e));
              throw error;
            });
            const result = await Reflect.apply(fn, this, parsedArgs);
            const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error.addIssue(makeReturnsIssue(result, e));
              throw error;
            });
            return parsedReturns;
          });
        } else {
          const me = this;
          return OK(function(...args) {
            const parsedArgs = me._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = Reflect.apply(fn, this, parsedArgs.data);
            const parsedReturns = me._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new _ZodFunction({
          ...this._def,
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
      }
      returns(returnType) {
        return new _ZodFunction({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new _ZodFunction({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction,
          ...processCreateParams(params)
        });
      }
    };
    ZodLazy = class extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    ZodLazy.create = (getter, params) => {
      return new ZodLazy({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
      });
    };
    ZodLiteral = class extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
      });
    };
    ZodEnum = class _ZodEnum extends ZodType {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (!this._cache) {
          this._cache = new Set(this._def.values);
        }
        if (!this._cache.has(input.data)) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values, newDef = this._def) {
        return _ZodEnum.create(values, {
          ...this._def,
          ...newDef
        });
      }
      exclude(values, newDef = this._def) {
        return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
          ...this._def,
          ...newDef
        });
      }
    };
    ZodEnum.create = createZodEnum;
    ZodNativeEnum = class extends ZodType {
      _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (!this._cache) {
          this._cache = new Set(util.getValidEnumValues(this._def.values));
        }
        if (!this._cache.has(input.data)) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
      });
    };
    ZodPromise = class extends ZodType {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.promise,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    ZodPromise.create = (schema, params) => {
      return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
      });
    };
    ZodEffects = class extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
          addIssue: (arg) => {
            addIssueToContext(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(processed).then(async (processed2) => {
              if (status.value === "aborted")
                return INVALID;
              const result = await this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
              if (result.status === "aborted")
                return INVALID;
              if (result.status === "dirty")
                return DIRTY(result.value);
              if (status.value === "dirty")
                return DIRTY(result.value);
              return result;
            });
          } else {
            if (status.value === "aborted")
              return INVALID;
            const result = this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
            if (result.status === "aborted")
              return INVALID;
            if (result.status === "dirty")
              return DIRTY(result.value);
            if (status.value === "dirty")
              return DIRTY(result.value);
            return result;
          }
        }
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!isValid(base))
              return INVALID;
            const result = effect.transform(base.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
              if (!isValid(base))
                return INVALID;
              return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
                status: status.value,
                value: result
              }));
            });
          }
        }
        util.assertNever(effect);
      }
    };
    ZodEffects.create = (schema, effect, params) => {
      return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params)
      });
    };
    ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
      });
    };
    ZodOptional = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
          return OK(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodOptional.create = (type, params) => {
      return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
      });
    };
    ZodNullable = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
          return OK(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodNullable.create = (type, params) => {
      return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
      });
    };
    ZodDefault = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    ZodDefault.create = (type, params) => {
      return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    ZodCatch = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const newCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          }
        };
        const result = this._def.innerType._parse({
          data: newCtx.data,
          path: newCtx.path,
          parent: {
            ...newCtx
          }
        });
        if (isAsync(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue({
                get error() {
                  return new ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    };
    ZodCatch.create = (type, params) => {
      return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params)
      });
    };
    ZodNaN = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.nan,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    ZodNaN.create = (params) => {
      return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
      });
    };
    BRAND = Symbol("zod_brand");
    ZodBranded = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    ZodPipeline = class _ZodPipeline extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return DIRTY(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          };
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new _ZodPipeline({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    };
    ZodReadonly = class extends ZodType {
      _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
          if (isValid(data)) {
            data.value = Object.freeze(data.value);
          }
          return data;
        };
        return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodReadonly.create = (type, params) => {
      return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params)
      });
    };
    late = {
      object: ZodObject.lazycreate
    };
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
      ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
    })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
    instanceOfType = (cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => custom((data) => data instanceof cls, params);
    stringType = ZodString.create;
    numberType = ZodNumber.create;
    nanType = ZodNaN.create;
    bigIntType = ZodBigInt.create;
    booleanType = ZodBoolean.create;
    dateType = ZodDate.create;
    symbolType = ZodSymbol.create;
    undefinedType = ZodUndefined.create;
    nullType = ZodNull.create;
    anyType = ZodAny.create;
    unknownType = ZodUnknown.create;
    neverType = ZodNever.create;
    voidType = ZodVoid.create;
    arrayType = ZodArray.create;
    objectType = ZodObject.create;
    strictObjectType = ZodObject.strictCreate;
    unionType = ZodUnion.create;
    discriminatedUnionType = ZodDiscriminatedUnion.create;
    intersectionType = ZodIntersection.create;
    tupleType = ZodTuple.create;
    recordType = ZodRecord.create;
    mapType = ZodMap.create;
    setType = ZodSet.create;
    functionType = ZodFunction.create;
    lazyType = ZodLazy.create;
    literalType = ZodLiteral.create;
    enumType = ZodEnum.create;
    nativeEnumType = ZodNativeEnum.create;
    promiseType = ZodPromise.create;
    effectsType = ZodEffects.create;
    optionalType = ZodOptional.create;
    nullableType = ZodNullable.create;
    preprocessType = ZodEffects.createWithPreprocess;
    pipelineType = ZodPipeline.create;
    ostring = () => stringType().optional();
    onumber = () => numberType().optional();
    oboolean = () => booleanType().optional();
    coerce = {
      string: (arg) => ZodString.create({ ...arg, coerce: true }),
      number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
      boolean: (arg) => ZodBoolean.create({
        ...arg,
        coerce: true
      }),
      bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
      date: (arg) => ZodDate.create({ ...arg, coerce: true })
    };
    NEVER = INVALID;
  }
});

// ../praxis-ba/node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});
var init_external = __esm({
  "../praxis-ba/node_modules/zod/v3/external.js"() {
    init_errors();
    init_parseUtil();
    init_typeAliases();
    init_util();
    init_types();
    init_ZodError();
  }
});

// ../praxis-ba/node_modules/zod/index.js
var init_zod = __esm({
  "../praxis-ba/node_modules/zod/index.js"() {
    init_external();
    init_external();
  }
});

// ../praxis-ba/node_modules/yaml/dist/nodes/identity.js
var require_identity = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/nodes/identity.js"(exports2) {
    "use strict";
    var ALIAS = Symbol.for("yaml.alias");
    var DOC = Symbol.for("yaml.document");
    var MAP = Symbol.for("yaml.map");
    var PAIR = Symbol.for("yaml.pair");
    var SCALAR = Symbol.for("yaml.scalar");
    var SEQ = Symbol.for("yaml.seq");
    var NODE_TYPE = Symbol.for("yaml.node.type");
    var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
    var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
    var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
    var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
    var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
    var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
    function isCollection(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case MAP:
          case SEQ:
            return true;
        }
      return false;
    }
    function isNode(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case ALIAS:
          case MAP:
          case SCALAR:
          case SEQ:
            return true;
        }
      return false;
    }
    var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
    exports2.ALIAS = ALIAS;
    exports2.DOC = DOC;
    exports2.MAP = MAP;
    exports2.NODE_TYPE = NODE_TYPE;
    exports2.PAIR = PAIR;
    exports2.SCALAR = SCALAR;
    exports2.SEQ = SEQ;
    exports2.hasAnchor = hasAnchor;
    exports2.isAlias = isAlias;
    exports2.isCollection = isCollection;
    exports2.isDocument = isDocument;
    exports2.isMap = isMap;
    exports2.isNode = isNode;
    exports2.isPair = isPair;
    exports2.isScalar = isScalar;
    exports2.isSeq = isSeq;
  }
});

// ../praxis-ba/node_modules/yaml/dist/visit.js
var require_visit = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/visit.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var BREAK = Symbol("break visit");
    var SKIP = Symbol("skip children");
    var REMOVE = Symbol("remove node");
    function visit(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        visit_(null, node, visitor_, Object.freeze([]));
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    function visit_(key, node, visitor, path) {
      const ctrl = callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visit_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = visit_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = visit_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = visit_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    async function visitAsync(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
    }
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP;
    visitAsync.REMOVE = REMOVE;
    async function visitAsync_(key, node, visitor, path) {
      const ctrl = await callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visitAsync_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = await visitAsync_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = await visitAsync_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = await visitAsync_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    function initVisitor(visitor) {
      if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node
        }, visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value
        }, visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection
        }, visitor);
      }
      return visitor;
    }
    function callVisitor(key, node, visitor, path) {
      if (typeof visitor === "function")
        return visitor(key, node, path);
      if (identity.isMap(node))
        return visitor.Map?.(key, node, path);
      if (identity.isSeq(node))
        return visitor.Seq?.(key, node, path);
      if (identity.isPair(node))
        return visitor.Pair?.(key, node, path);
      if (identity.isScalar(node))
        return visitor.Scalar?.(key, node, path);
      if (identity.isAlias(node))
        return visitor.Alias?.(key, node, path);
      return void 0;
    }
    function replaceNode(key, path, node) {
      const parent = path[path.length - 1];
      if (identity.isCollection(parent)) {
        parent.items[key] = node;
      } else if (identity.isPair(parent)) {
        if (key === "key")
          parent.key = node;
        else
          parent.value = node;
      } else if (identity.isDocument(parent)) {
        parent.contents = node;
      } else {
        const pt = identity.isAlias(parent) ? "alias" : "scalar";
        throw new Error(`Cannot replace node with ${pt} parent`);
      }
    }
    exports2.visit = visit;
    exports2.visitAsync = visitAsync;
  }
});

// ../praxis-ba/node_modules/yaml/dist/doc/directives.js
var require_directives = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/doc/directives.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    var escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
    var Directives = class _Directives {
      constructor(yaml2, tags) {
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, _Directives.defaultYaml, yaml2);
        this.tags = Object.assign({}, _Directives.defaultTags, tags);
      }
      clone() {
        const copy = new _Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
      }
      /**
       * During parsing, get a Directives instance for the current document and
       * update the stream state according to the current version's spec.
       */
      atDocument() {
        const res = new _Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
          case "1.1":
            this.atNextDocument = true;
            break;
          case "1.2":
            this.atNextDocument = false;
            this.yaml = {
              explicit: _Directives.defaultYaml.explicit,
              version: "1.2"
            };
            this.tags = Object.assign({}, _Directives.defaultTags);
            break;
        }
        return res;
      }
      /**
       * @param onError - May be called even if the action was successful
       * @returns `true` on success
       */
      add(line, onError) {
        if (this.atNextDocument) {
          this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
          this.tags = Object.assign({}, _Directives.defaultTags);
          this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name = parts.shift();
        switch (name) {
          case "%TAG": {
            if (parts.length !== 2) {
              onError(0, "%TAG directive should contain exactly two parts");
              if (parts.length < 2)
                return false;
            }
            const [handle, prefix] = parts;
            this.tags[handle] = prefix;
            return true;
          }
          case "%YAML": {
            this.yaml.explicit = true;
            if (parts.length !== 1) {
              onError(0, "%YAML directive should contain exactly one part");
              return false;
            }
            const [version] = parts;
            if (version === "1.1" || version === "1.2") {
              this.yaml.version = version;
              return true;
            } else {
              const isValid3 = /^\d+\.\d+$/.test(version);
              onError(6, `Unsupported YAML version ${version}`, isValid3);
              return false;
            }
          }
          default:
            onError(0, `Unknown directive ${name}`, true);
            return false;
        }
      }
      /**
       * Resolves a tag, matching handles to those defined in %TAG directives.
       *
       * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
       *   `'!local'` tag, or `null` if unresolvable.
       */
      tagName(source, onError) {
        if (source === "!")
          return "!";
        if (source[0] !== "!") {
          onError(`Not a valid tag: ${source}`);
          return null;
        }
        if (source[1] === "<") {
          const verbatim = source.slice(2, -1);
          if (verbatim === "!" || verbatim === "!!") {
            onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
            return null;
          }
          if (source[source.length - 1] !== ">")
            onError("Verbatim tags must end with a >");
          return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
        if (!suffix)
          onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix) {
          try {
            return prefix + decodeURIComponent(suffix);
          } catch (error) {
            onError(String(error));
            return null;
          }
        }
        if (handle === "!")
          return source;
        onError(`Could not resolve tag: ${source}`);
        return null;
      }
      /**
       * Given a fully resolved tag, returns its printable string form,
       * taking into account current tag prefixes and defaults.
       */
      tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
          if (tag.startsWith(prefix))
            return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === "!" ? tag : `!<${tag}>`;
      }
      toString(doc) {
        const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && identity.isNode(doc.contents)) {
          const tags = {};
          visit.visit(doc.contents, (_key, node) => {
            if (identity.isNode(node) && node.tag)
              tags[node.tag] = true;
          });
          tagNames = Object.keys(tags);
        } else
          tagNames = [];
        for (const [handle, prefix] of tagEntries) {
          if (handle === "!!" && prefix === "tag:yaml.org,2002:")
            continue;
          if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
            lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join("\n");
      }
    };
    Directives.defaultYaml = { explicit: false, version: "1.2" };
    Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
    exports2.Directives = Directives;
  }
});

// ../praxis-ba/node_modules/yaml/dist/doc/anchors.js
var require_anchors = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/doc/anchors.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    function anchorIsValid(anchor) {
      if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
      }
      return true;
    }
    function anchorNames(root) {
      const anchors = /* @__PURE__ */ new Set();
      visit.visit(root, {
        Value(_key, node) {
          if (node.anchor)
            anchors.add(node.anchor);
        }
      });
      return anchors;
    }
    function findNewAnchor(prefix, exclude) {
      for (let i = 1; true; ++i) {
        const name = `${prefix}${i}`;
        if (!exclude.has(name))
          return name;
      }
    }
    function createNodeAnchors(doc, prefix) {
      const aliasObjects = [];
      const sourceObjects = /* @__PURE__ */ new Map();
      let prevAnchors = null;
      return {
        onAnchor: (source) => {
          aliasObjects.push(source);
          prevAnchors ?? (prevAnchors = anchorNames(doc));
          const anchor = findNewAnchor(prefix, prevAnchors);
          prevAnchors.add(anchor);
          return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
          for (const source of aliasObjects) {
            const ref = sourceObjects.get(source);
            if (typeof ref === "object" && ref.anchor && (identity.isScalar(ref.node) || identity.isCollection(ref.node))) {
              ref.node.anchor = ref.anchor;
            } else {
              const error = new Error("Failed to resolve repeated object (this should not happen)");
              error.source = source;
              throw error;
            }
          }
        },
        sourceObjects
      };
    }
    exports2.anchorIsValid = anchorIsValid;
    exports2.anchorNames = anchorNames;
    exports2.createNodeAnchors = createNodeAnchors;
    exports2.findNewAnchor = findNewAnchor;
  }
});

// ../praxis-ba/node_modules/yaml/dist/doc/applyReviver.js
var require_applyReviver = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/doc/applyReviver.js"(exports2) {
    "use strict";
    function applyReviver(reviver, obj, key, val) {
      if (val && typeof val === "object") {
        if (Array.isArray(val)) {
          for (let i = 0, len = val.length; i < len; ++i) {
            const v0 = val[i];
            const v1 = applyReviver(reviver, val, String(i), v0);
            if (v1 === void 0)
              delete val[i];
            else if (v1 !== v0)
              val[i] = v1;
          }
        } else if (val instanceof Map) {
          for (const k of Array.from(val.keys())) {
            const v0 = val.get(k);
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              val.delete(k);
            else if (v1 !== v0)
              val.set(k, v1);
          }
        } else if (val instanceof Set) {
          for (const v0 of Array.from(val)) {
            const v1 = applyReviver(reviver, val, v0, v0);
            if (v1 === void 0)
              val.delete(v0);
            else if (v1 !== v0) {
              val.delete(v0);
              val.add(v1);
            }
          }
        } else {
          for (const [k, v0] of Object.entries(val)) {
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              delete val[k];
            else if (v1 !== v0)
              val[k] = v1;
          }
        }
      }
      return reviver.call(obj, key, val);
    }
    exports2.applyReviver = applyReviver;
  }
});

// ../praxis-ba/node_modules/yaml/dist/nodes/toJS.js
var require_toJS = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/nodes/toJS.js"(exports2) {
    "use strict";
    var identity = require_identity();
    function toJS(value, arg, ctx) {
      if (Array.isArray(value))
        return value.map((v, i) => toJS(v, String(i), ctx));
      if (value && typeof value.toJSON === "function") {
        if (!ctx || !identity.hasAnchor(value))
          return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: void 0 };
        ctx.anchors.set(value, data);
        ctx.onCreate = (res2) => {
          data.res = res2;
          delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if (typeof value === "bigint" && !ctx?.keep)
        return Number(value);
      return value;
    }
    exports2.toJS = toJS;
  }
});

// ../praxis-ba/node_modules/yaml/dist/nodes/Node.js
var require_Node = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/nodes/Node.js"(exports2) {
    "use strict";
    var applyReviver = require_applyReviver();
    var identity = require_identity();
    var toJS = require_toJS();
    var NodeBase = class {
      constructor(type) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: type });
      }
      /** Create a copy of this node.  */
      clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** A plain JavaScript representation of this node. */
      toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!identity.isDocument(doc))
          throw new TypeError("A document argument is required");
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc,
          keep: true,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this, "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
    };
    exports2.NodeBase = NodeBase;
  }
});

// ../praxis-ba/node_modules/yaml/dist/nodes/Alias.js
var require_Alias = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/nodes/Alias.js"(exports2) {
    "use strict";
    var anchors = require_anchors();
    var visit = require_visit();
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var Alias = class extends Node.NodeBase {
      constructor(source) {
        super(identity.ALIAS);
        this.source = source;
        Object.defineProperty(this, "tag", {
          set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
      }
      /**
       * Resolve the value of this alias within `doc`, finding the last
       * instance of the `source` anchor before this node.
       */
      resolve(doc, ctx) {
        if (ctx?.maxAliasCount === 0)
          throw new ReferenceError("Alias resolution is disabled");
        let nodes;
        if (ctx?.aliasResolveCache) {
          nodes = ctx.aliasResolveCache;
        } else {
          nodes = [];
          visit.visit(doc, {
            Node: (_key, node) => {
              if (identity.isAlias(node) || identity.hasAnchor(node))
                nodes.push(node);
            }
          });
          if (ctx)
            ctx.aliasResolveCache = nodes;
        }
        let found = void 0;
        for (const node of nodes) {
          if (node === this)
            break;
          if (node.anchor === this.source)
            found = node;
        }
        if (found && ctx) {
          const { anchors: anchors2, doc: doc2, maxAliasCount } = ctx;
          let data = anchors2.get(found);
          if (!data) {
            toJS.toJS(found, null, ctx);
            data = anchors2.get(found);
          }
          if (data?.res === void 0) {
            const msg = "This should not happen: Alias anchor was not resolved?";
            throw new ReferenceError(msg);
          }
          if (maxAliasCount >= 0) {
            data.count += 1;
            if (data.aliasCount === 0)
              data.aliasCount = getAliasCount(doc2, found, anchors2);
            if (data.count * data.aliasCount > maxAliasCount) {
              const msg = "Excessive alias count indicates a resource exhaustion attack";
              throw new ReferenceError(msg);
            }
          }
        }
        return found;
      }
      toJSON(_arg, ctx) {
        if (!ctx)
          return { source: this.source };
        const source = this.resolve(ctx.doc, ctx);
        if (!source) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new ReferenceError(msg);
        }
        return ctx.anchors.get(source).res;
      }
      toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
          anchors.anchorIsValid(this.source);
          if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new Error(msg);
          }
          if (ctx.implicitKey)
            return `${src} `;
        }
        return src;
      }
    };
    function getAliasCount(doc, node, anchors2) {
      if (identity.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors2 && source && anchors2.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
      } else if (identity.isCollection(node)) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(doc, item, anchors2);
          if (c > count)
            count = c;
        }
        return count;
      } else if (identity.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors2);
        const vc = getAliasCount(doc, node.value, anchors2);
        return Math.max(kc, vc);
      }
      return 1;
    }
    exports2.Alias = Alias;
  }
});

// ../praxis-ba/node_modules/yaml/dist/nodes/Scalar.js
var require_Scalar = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/nodes/Scalar.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
    var Scalar = class extends Node.NodeBase {
      constructor(value) {
        super(identity.SCALAR);
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS.toJS(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
    exports2.Scalar = Scalar;
    exports2.isScalarValue = isScalarValue;
  }
});

// ../praxis-ba/node_modules/yaml/dist/doc/createNode.js
var require_createNode = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/doc/createNode.js"(exports2) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var defaultTagPrefix = "tag:yaml.org,2002:";
    function findTagObject(value, tagName, tags) {
      if (tagName) {
        const match = tags.filter((t) => t.tag === tagName);
        const tagObj = match.find((t) => !t.format) ?? match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags.find((t) => t.identify?.(value) && !t.format);
    }
    function createNode(value, tagName, ctx) {
      if (identity.isDocument(value))
        value = value.contents;
      if (identity.isNode(value))
        return value;
      if (identity.isPair(value)) {
        const map = ctx.schema[identity.MAP].createNode?.(ctx.schema, null, ctx);
        map.items.push(value);
        return map;
      }
      if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
        value = value.valueOf();
      }
      const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
      let ref = void 0;
      if (aliasDuplicateObjects && value && typeof value === "object") {
        ref = sourceObjects.get(value);
        if (ref) {
          ref.anchor ?? (ref.anchor = onAnchor(value));
          return new Alias.Alias(ref.anchor);
        } else {
          ref = { anchor: null, node: null };
          sourceObjects.set(value, ref);
        }
      }
      if (tagName?.startsWith("!!"))
        tagName = defaultTagPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (value && typeof value.toJSON === "function") {
          value = value.toJSON();
        }
        if (!value || typeof value !== "object") {
          const node2 = new Scalar.Scalar(value);
          if (ref)
            ref.node = node2;
          return node2;
        }
        tagObj = value instanceof Map ? schema[identity.MAP] : Symbol.iterator in Object(value) ? schema[identity.SEQ] : schema[identity.MAP];
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar.Scalar(value);
      if (tagName)
        node.tag = tagName;
      else if (!tagObj.default)
        node.tag = tagObj.tag;
      if (ref)
        ref.node = node;
      return node;
    }
    exports2.createNode = createNode;
  }
});

// ../praxis-ba/node_modules/yaml/dist/nodes/Collection.js
var require_Collection = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/nodes/Collection.js"(exports2) {
    "use strict";
    var createNode = require_createNode();
    var identity = require_identity();
    var Node = require_Node();
    function collectionFromPath(schema, path, value) {
      let v = value;
      for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          v = /* @__PURE__ */ new Map([[k, v]]);
        }
      }
      return createNode.createNode(v, void 0, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
          throw new Error("This should not happen, please report a bug.");
        },
        schema,
        sourceObjects: /* @__PURE__ */ new Map()
      });
    }
    var isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
    var Collection = class extends Node.NodeBase {
      constructor(type, schema) {
        super(type);
        Object.defineProperty(this, "schema", {
          value: schema,
          configurable: true,
          enumerable: false,
          writable: true
        });
      }
      /**
       * Create a copy of this collection.
       *
       * @param schema - If defined, overwrites the original's schema
       */
      clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
          copy.schema = schema;
        copy.items = copy.items.map((it) => identity.isNode(it) || identity.isPair(it) ? it.clone(schema) : it);
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /**
       * Adds a value to the collection. For `!!map` and `!!omap` the value must
       * be a Pair instance or a `{ key, value }` object, which may not have a key
       * that already exists in the map.
       */
      addIn(path, value) {
        if (isEmptyPath(path))
          this.add(value);
        else {
          const [key, ...rest] = path;
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.addIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      /**
       * Removes a value from the collection.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (identity.isCollection(node))
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && identity.isScalar(node) ? node.value : node;
        else
          return identity.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues(allowScalar) {
        return this.items.every((node) => {
          if (!identity.isPair(node))
            return false;
          const n = node.value;
          return n == null || allowScalar && identity.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       */
      hasIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return identity.isCollection(node) ? node.hasIn(rest) : false;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        const [key, ...rest] = path;
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
    };
    exports2.Collection = Collection;
    exports2.collectionFromPath = collectionFromPath;
    exports2.isEmptyPath = isEmptyPath;
  }
});

// ../praxis-ba/node_modules/yaml/dist/stringify/stringifyComment.js
var require_stringifyComment = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/stringify/stringifyComment.js"(exports2) {
    "use strict";
    var stringifyComment = (str2) => str2.replace(/^(?!$)(?: $)?/gm, "#");
    function indentComment(comment, indent) {
      if (/^\n+$/.test(comment))
        return comment.substring(1);
      return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
    }
    var lineComment = (str2, indent, comment) => str2.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str2.endsWith(" ") ? "" : " ") + comment;
    exports2.indentComment = indentComment;
    exports2.lineComment = lineComment;
    exports2.stringifyComment = stringifyComment;
  }
});

// ../praxis-ba/node_modules/yaml/dist/stringify/foldFlowLines.js
var require_foldFlowLines = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/stringify/foldFlowLines.js"(exports2) {
    "use strict";
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
      if (!lineWidth || lineWidth < 0)
        return text;
      if (lineWidth < minContentWidth)
        minContentWidth = 0;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text.length <= endStep)
        return text;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i, indent.length);
        if (i !== -1)
          end = i + endStep;
      }
      for (let ch; ch = text[i += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i;
          switch (text[i + 1]) {
            case "x":
              i += 3;
              break;
            case "u":
              i += 5;
              break;
            case "U":
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i = consumeMoreIndentedLines(text, i, indent.length);
          end = i + indent.length + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text[i + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split = i;
          }
          if (i >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text[i += 1];
                overflow = true;
              }
              const j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j])
                return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text;
      if (onFold)
        onFold();
      let res = text.slice(0, folds[0]);
      for (let i2 = 0; i2 < folds.length; ++i2) {
        const fold = folds[i2];
        const end2 = folds[i2 + 1] || text.length;
        if (fold === 0)
          res = `
${indent}${text.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text[fold]}\\`;
          res += `
${indent}${text.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    function consumeMoreIndentedLines(text, i, indent) {
      let end = i;
      let start = i + 1;
      let ch = text[start];
      while (ch === " " || ch === "	") {
        if (i < start + indent) {
          ch = text[++i];
        } else {
          do {
            ch = text[++i];
          } while (ch && ch !== "\n");
          end = i;
          start = i + 1;
          ch = text[start];
        }
      }
      return end;
    }
    exports2.FOLD_BLOCK = FOLD_BLOCK;
    exports2.FOLD_FLOW = FOLD_FLOW;
    exports2.FOLD_QUOTED = FOLD_QUOTED;
    exports2.foldFlowLines = foldFlowLines;
  }
});

// ../praxis-ba/node_modules/yaml/dist/stringify/stringifyString.js
var require_stringifyString = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/stringify/stringifyString.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var foldFlowLines = require_foldFlowLines();
    var getFoldOptions = (ctx, isBlock) => ({
      indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
      lineWidth: ctx.options.lineWidth,
      minContentWidth: ctx.options.minContentWidth
    });
    var containsDocumentMarker = (str2) => /^(%|---|\.\.\.)/m.test(str2);
    function lineLengthOverLimit(str2, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str2.length;
      if (strLen <= limit)
        return false;
      for (let i = 0, start = 0; i < strLen; ++i) {
        if (str2[i] === "\n") {
          if (i - start > limit)
            return true;
          start = i + 1;
          if (strLen - start <= limit)
            return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      const json2 = JSON.stringify(value);
      if (ctx.options.doubleQuotedAsJSON)
        return json2;
      const { implicitKey } = ctx;
      const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      let str2 = "";
      let start = 0;
      for (let i = 0, ch = json2[i]; ch; ch = json2[++i]) {
        if (ch === " " && json2[i + 1] === "\\" && json2[i + 2] === "n") {
          str2 += json2.slice(start, i) + "\\ ";
          i += 1;
          start = i;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json2[i + 1]) {
            case "u":
              {
                str2 += json2.slice(start, i);
                const code2 = json2.substr(i + 2, 4);
                switch (code2) {
                  case "0000":
                    str2 += "\\0";
                    break;
                  case "0007":
                    str2 += "\\a";
                    break;
                  case "000b":
                    str2 += "\\v";
                    break;
                  case "001b":
                    str2 += "\\e";
                    break;
                  case "0085":
                    str2 += "\\N";
                    break;
                  case "00a0":
                    str2 += "\\_";
                    break;
                  case "2028":
                    str2 += "\\L";
                    break;
                  case "2029":
                    str2 += "\\P";
                    break;
                  default:
                    if (code2.substr(0, 2) === "00")
                      str2 += "\\x" + code2.substr(2);
                    else
                      str2 += json2.substr(i, 6);
                }
                i += 5;
                start = i + 1;
              }
              break;
            case "n":
              if (implicitKey || json2[i + 2] === '"' || json2.length < minMultiLineLength) {
                i += 1;
              } else {
                str2 += json2.slice(start, i) + "\n\n";
                while (json2[i + 2] === "\\" && json2[i + 3] === "n" && json2[i + 4] !== '"') {
                  str2 += "\n";
                  i += 2;
                }
                str2 += indent;
                if (json2[i + 2] === " ")
                  str2 += "\\";
                i += 1;
                start = i + 1;
              }
              break;
            default:
              i += 1;
          }
      }
      str2 = start ? str2 + json2.slice(start) : json2;
      return implicitKey ? str2 : foldFlowLines.foldFlowLines(str2, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
        return doubleQuotedString(value, ctx);
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function quotedString(value, ctx) {
      const { singleQuote } = ctx.options;
      let qs;
      if (singleQuote === false)
        qs = doubleQuotedString;
      else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
          qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
          qs = doubleQuotedString;
        else
          qs = singleQuote ? singleQuotedString : doubleQuotedString;
      }
      return qs(value, ctx);
    }
    var blockEndNewlines;
    try {
      blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
    } catch {
      blockEndNewlines = /\n+(?!\n|$)/g;
    }
    function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
      const { blockQuote, commentString, lineWidth } = ctx.options;
      if (!blockQuote || /\n[\t ]+$/.test(value)) {
        return quotedString(value, ctx);
      }
      const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
      if (!value)
        return literal ? "|\n" : ">\n";
      let chomp;
      let endStart;
      for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== "\n" && ch !== "	" && ch !== " ")
          break;
      }
      let end = value.substring(endStart);
      const endNlPos = end.indexOf("\n");
      if (endNlPos === -1) {
        chomp = "-";
      } else if (value === end || endNlPos !== end.length - 1) {
        chomp = "+";
        if (onChompKeep)
          onChompKeep();
      } else {
        chomp = "";
      }
      if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === "\n")
          end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, `$&${indent}`);
      }
      let startWithSpace = false;
      let startEnd;
      let startNlPos = -1;
      for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === " ")
          startWithSpace = true;
        else if (ch === "\n")
          startNlPos = startEnd;
        else
          break;
      }
      let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
      if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent}`);
      }
      const indentSize = indent ? "2" : "1";
      let header = (startWithSpace ? indentSize : "") + chomp;
      if (comment) {
        header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
        if (onComment)
          onComment();
      }
      if (!literal) {
        const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
        let literalFallback = false;
        const foldOptions = getFoldOptions(ctx, true);
        if (blockQuote !== "folded" && type !== Scalar.Scalar.BLOCK_FOLDED) {
          foldOptions.onOverflow = () => {
            literalFallback = true;
          };
        }
        const body = foldFlowLines.foldFlowLines(`${start}${foldedValue}${end}`, indent, foldFlowLines.FOLD_BLOCK, foldOptions);
        if (!literalFallback)
          return `>${header}
${indent}${body}`;
      }
      value = value.replace(/\n+/g, `$&${indent}`);
      return `|${header}
${indent}${start}${value}${end}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const { type, value } = item;
      const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
      if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
        return quotedString(value, ctx);
      }
      if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value.includes("\n")) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (containsDocumentMarker(value)) {
        if (indent === "") {
          ctx.forceBlockIndent = true;
          return blockString(item, ctx, onComment, onChompKeep);
        } else if (implicitKey && indent === indentStep) {
          return quotedString(value, ctx);
        }
      }
      const str2 = value.replace(/\n+/g, `$&
${indent}`);
      if (actualString) {
        const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str2);
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || compat?.some(test))
          return quotedString(value, ctx);
      }
      return implicitKey ? str2 : foldFlowLines.foldFlowLines(str2, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const { implicitKey, inFlow } = ctx;
      const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
      let { type } = item;
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
          type = Scalar.Scalar.QUOTE_DOUBLE;
      }
      const _stringify = (_type) => {
        switch (_type) {
          case Scalar.Scalar.BLOCK_FOLDED:
          case Scalar.Scalar.BLOCK_LITERAL:
            return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
          case Scalar.Scalar.QUOTE_DOUBLE:
            return doubleQuotedString(ss.value, ctx);
          case Scalar.Scalar.QUOTE_SINGLE:
            return singleQuotedString(ss.value, ctx);
          case Scalar.Scalar.PLAIN:
            return plainString(ss, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      let res = _stringify(type);
      if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t = implicitKey && defaultKeyType || defaultStringType;
        res = _stringify(t);
        if (res === null)
          throw new Error(`Unsupported default string type ${t}`);
      }
      return res;
    }
    exports2.stringifyString = stringifyString;
  }
});

// ../praxis-ba/node_modules/yaml/dist/stringify/stringify.js
var require_stringify = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/stringify/stringify.js"(exports2) {
    "use strict";
    var anchors = require_anchors();
    var identity = require_identity();
    var stringifyComment = require_stringifyComment();
    var stringifyString = require_stringifyString();
    function createStringifyContext(doc, options2) {
      const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trailingComma: false,
        trueStr: "true",
        verifyAliasOrder: true
      }, doc.schema.toStringOptions, options2);
      let inFlow;
      switch (opt.collectionStyle) {
        case "block":
          inFlow = false;
          break;
        case "flow":
          inFlow = true;
          break;
        default:
          inFlow = null;
      }
      return {
        anchors: /* @__PURE__ */ new Set(),
        doc,
        flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
        indent: "",
        indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
        inFlow,
        options: opt
      };
    }
    function getTagObject(tags, item) {
      if (item.tag) {
        const match = tags.filter((t) => t.tag === item.tag);
        if (match.length > 0)
          return match.find((t) => t.format === item.format) ?? match[0];
      }
      let tagObj = void 0;
      let obj;
      if (identity.isScalar(item)) {
        obj = item.value;
        let match = tags.filter((t) => t.identify?.(obj));
        if (match.length > 1) {
          const testMatch = match.filter((t) => t.test);
          if (testMatch.length > 0)
            match = testMatch;
        }
        tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
      } else {
        obj = item;
        tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
      }
      if (!tagObj) {
        const name = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
        throw new Error(`Tag not resolved for ${name} value`);
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
      if (!doc.directives)
        return "";
      const props = [];
      const anchor = (identity.isScalar(node) || identity.isCollection(node)) && node.anchor;
      if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push(`&${anchor}`);
      }
      const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
      if (tag)
        props.push(doc.directives.tagString(tag));
      return props.join(" ");
    }
    function stringify2(item, ctx, onComment, onChompKeep) {
      if (identity.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
      if (identity.isAlias(item)) {
        if (ctx.doc.directives)
          return item.toString(ctx);
        if (ctx.resolvedAliases?.has(item)) {
          throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        } else {
          if (ctx.resolvedAliases)
            ctx.resolvedAliases.add(item);
          else
            ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
          item = item.resolve(ctx.doc);
        }
      }
      let tagObj = void 0;
      const node = identity.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
      tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
      const props = stringifyProps(node, tagObj, ctx);
      if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
      const str2 = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
      if (!props)
        return str2;
      return identity.isScalar(node) || str2[0] === "{" || str2[0] === "[" ? `${props} ${str2}` : `${props}
${ctx.indent}${str2}`;
    }
    exports2.createStringifyContext = createStringifyContext;
    exports2.stringify = stringify2;
  }
});

// ../praxis-ba/node_modules/yaml/dist/stringify/stringifyPair.js
var require_stringifyPair = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/stringify/stringifyPair.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var stringify2 = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
      const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
      let keyComment = identity.isNode(key) && key.comment || null;
      if (simpleKeys) {
        if (keyComment) {
          throw new Error("With simple keys, key nodes cannot have comments");
        }
        if (identity.isCollection(key) || !identity.isNode(key) && typeof key === "object") {
          const msg = "With simple keys, collection cannot be used as a key value";
          throw new Error(msg);
        }
      }
      let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity.isCollection(key) || (identity.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : typeof key === "object"));
      ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
      });
      let keyCommentDone = false;
      let chompKeep = false;
      let str2 = stringify2.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
      if (!explicitKey && !ctx.inFlow && str2.length > 1024) {
        if (simpleKeys)
          throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        explicitKey = true;
      }
      if (ctx.inFlow) {
        if (allNullValues || value == null) {
          if (keyCommentDone && onComment)
            onComment();
          return str2 === "" ? "?" : explicitKey ? `? ${str2}` : str2;
        }
      } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
        str2 = `? ${str2}`;
        if (keyComment && !keyCommentDone) {
          str2 += stringifyComment.lineComment(str2, ctx.indent, commentString(keyComment));
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str2;
      }
      if (keyCommentDone)
        keyComment = null;
      if (explicitKey) {
        if (keyComment)
          str2 += stringifyComment.lineComment(str2, ctx.indent, commentString(keyComment));
        str2 = `? ${str2}
${indent}:`;
      } else {
        str2 = `${str2}:`;
        if (keyComment)
          str2 += stringifyComment.lineComment(str2, ctx.indent, commentString(keyComment));
      }
      let vsb, vcb, valueComment;
      if (identity.isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
      } else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && typeof value === "object")
          value = doc.createNode(value);
      }
      ctx.implicitKey = false;
      if (!explicitKey && !keyComment && identity.isScalar(value))
        ctx.indentAtStart = str2.length + 1;
      chompKeep = false;
      if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity.isSeq(value) && !value.flow && !value.tag && !value.anchor) {
        ctx.indent = ctx.indent.substring(2);
      }
      let valueCommentDone = false;
      const valueStr = stringify2.stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
      let ws = " ";
      if (keyComment || vsb || vcb) {
        ws = vsb ? "\n" : "";
        if (vcb) {
          const cs = commentString(vcb);
          ws += `
${stringifyComment.indentComment(cs, ctx.indent)}`;
        }
        if (valueStr === "" && !ctx.inFlow) {
          if (ws === "\n" && valueComment)
            ws = "\n\n";
        } else {
          ws += `
${ctx.indent}`;
        }
      } else if (!explicitKey && identity.isCollection(value)) {
        const vs0 = valueStr[0];
        const nl0 = valueStr.indexOf("\n");
        const hasNewline = nl0 !== -1;
        const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
        if (hasNewline || !flow) {
          let hasPropsLine = false;
          if (hasNewline && (vs0 === "&" || vs0 === "!")) {
            let sp0 = valueStr.indexOf(" ");
            if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
              sp0 = valueStr.indexOf(" ", sp0 + 1);
            }
            if (sp0 === -1 || nl0 < sp0)
              hasPropsLine = true;
          }
          if (!hasPropsLine)
            ws = `
${ctx.indent}`;
        }
      } else if (valueStr === "" || valueStr[0] === "\n") {
        ws = "";
      }
      str2 += ws + valueStr;
      if (ctx.inFlow) {
        if (valueCommentDone && onComment)
          onComment();
      } else if (valueComment && !valueCommentDone) {
        str2 += stringifyComment.lineComment(str2, ctx.indent, commentString(valueComment));
      } else if (chompKeep && onChompKeep) {
        onChompKeep();
      }
      return str2;
    }
    exports2.stringifyPair = stringifyPair;
  }
});

// ../praxis-ba/node_modules/yaml/dist/log.js
var require_log = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/log.js"(exports2) {
    "use strict";
    var node_process = __require("process");
    function debug(logLevel, ...messages) {
      if (logLevel === "debug")
        console.log(...messages);
    }
    function warn(logLevel, warning) {
      if (logLevel === "debug" || logLevel === "warn") {
        if (typeof node_process.emitWarning === "function")
          node_process.emitWarning(warning);
        else
          console.warn(warning);
      }
    }
    exports2.debug = debug;
    exports2.warn = warn;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/merge.js
var require_merge = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/merge.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var MERGE_KEY = "<<";
    var merge = {
      identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
      default: "key",
      tag: "tag:yaml.org,2002:merge",
      test: /^<<$/,
      resolve: () => Object.assign(new Scalar.Scalar(Symbol(MERGE_KEY)), {
        addToJSMap: addMergeToJSMap
      }),
      stringify: () => MERGE_KEY
    };
    var isMergeKey = (ctx, key) => (merge.identify(key) || identity.isScalar(key) && (!key.type || key.type === Scalar.Scalar.PLAIN) && merge.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default);
    function addMergeToJSMap(ctx, map, value) {
      const source = resolveAliasValue(ctx, value);
      if (identity.isSeq(source))
        for (const it of source.items)
          mergeValue(ctx, map, it);
      else if (Array.isArray(source))
        for (const it of source)
          mergeValue(ctx, map, it);
      else
        mergeValue(ctx, map, source);
    }
    function mergeValue(ctx, map, value) {
      const source = resolveAliasValue(ctx, value);
      if (!identity.isMap(source))
        throw new Error("Merge sources must be maps or map aliases");
      const srcMap = source.toJSON(null, ctx, Map);
      for (const [key, value2] of srcMap) {
        if (map instanceof Map) {
          if (!map.has(key))
            map.set(key, value2);
        } else if (map instanceof Set) {
          map.add(key);
        } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
          Object.defineProperty(map, key, {
            value: value2,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      return map;
    }
    function resolveAliasValue(ctx, value) {
      return ctx && identity.isAlias(value) ? value.resolve(ctx.doc, ctx) : value;
    }
    exports2.addMergeToJSMap = addMergeToJSMap;
    exports2.isMergeKey = isMergeKey;
    exports2.merge = merge;
  }
});

// ../praxis-ba/node_modules/yaml/dist/nodes/addPairToJSMap.js
var require_addPairToJSMap = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/nodes/addPairToJSMap.js"(exports2) {
    "use strict";
    var log = require_log();
    var merge = require_merge();
    var stringify2 = require_stringify();
    var identity = require_identity();
    var toJS = require_toJS();
    function addPairToJSMap(ctx, map, { key, value }) {
      if (identity.isNode(key) && key.addToJSMap)
        key.addToJSMap(ctx, map, value);
      else if (merge.isMergeKey(ctx, key))
        merge.addMergeToJSMap(ctx, map, value);
      else {
        const jsKey = toJS.toJS(key, "", ctx);
        if (map instanceof Map) {
          map.set(jsKey, toJS.toJS(value, jsKey, ctx));
        } else if (map instanceof Set) {
          map.add(jsKey);
        } else {
          const stringKey = stringifyKey(key, jsKey, ctx);
          const jsValue = toJS.toJS(value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value: jsValue,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = jsValue;
        }
      }
      return map;
    }
    function stringifyKey(key, jsKey, ctx) {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (identity.isNode(key) && ctx?.doc) {
        const strCtx = stringify2.createStringifyContext(ctx.doc, {});
        strCtx.anchors = /* @__PURE__ */ new Set();
        for (const node of ctx.anchors.keys())
          strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
          let jsonStr = JSON.stringify(strKey);
          if (jsonStr.length > 40)
            jsonStr = jsonStr.substring(0, 36) + '..."';
          log.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
          ctx.mapKeyWarned = true;
        }
        return strKey;
      }
      return JSON.stringify(jsKey);
    }
    exports2.addPairToJSMap = addPairToJSMap;
  }
});

// ../praxis-ba/node_modules/yaml/dist/nodes/Pair.js
var require_Pair = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/nodes/Pair.js"(exports2) {
    "use strict";
    var createNode = require_createNode();
    var stringifyPair = require_stringifyPair();
    var addPairToJSMap = require_addPairToJSMap();
    var identity = require_identity();
    function createPair(key, value, ctx) {
      const k = createNode.createNode(key, void 0, ctx);
      const v = createNode.createNode(value, void 0, ctx);
      return new Pair(k, v);
    }
    var Pair = class _Pair {
      constructor(key, value = null) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.PAIR });
        this.key = key;
        this.value = value;
      }
      clone(schema) {
        let { key, value } = this;
        if (identity.isNode(key))
          key = key.clone(schema);
        if (identity.isNode(value))
          value = value.clone(schema);
        return new _Pair(key, value);
      }
      toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        return addPairToJSMap.addPairToJSMap(ctx, pair, this);
      }
      toString(ctx, onComment, onChompKeep) {
        return ctx?.doc ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
      }
    };
    exports2.Pair = Pair;
    exports2.createPair = createPair;
  }
});

// ../praxis-ba/node_modules/yaml/dist/stringify/stringifyCollection.js
var require_stringifyCollection = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/stringify/stringifyCollection.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var stringify2 = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyCollection(collection, ctx, options2) {
      const flow = ctx.inFlow ?? collection.flow;
      const stringify3 = flow ? stringifyFlowCollection : stringifyBlockCollection;
      return stringify3(collection, ctx, options2);
    }
    function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
      const { indent, options: { commentString } } = ctx;
      const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
      let chompKeep = false;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment2 = null;
        if (identity.isNode(item)) {
          if (!chompKeep && item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
          if (item.comment)
            comment2 = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (!chompKeep && ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
          }
        }
        chompKeep = false;
        let str3 = stringify2.stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
        if (comment2)
          str3 += stringifyComment.lineComment(str3, itemIndent, commentString(comment2));
        if (chompKeep && comment2)
          chompKeep = false;
        lines.push(blockItemPrefix + str3);
      }
      let str2;
      if (lines.length === 0) {
        str2 = flowChars.start + flowChars.end;
      } else {
        str2 = lines[0];
        for (let i = 1; i < lines.length; ++i) {
          const line = lines[i];
          str2 += line ? `
${indent}${line}` : "\n";
        }
      }
      if (comment) {
        str2 += "\n" + stringifyComment.indentComment(commentString(comment), indent);
        if (onComment)
          onComment();
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str2;
    }
    function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
      const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
      itemIndent += indentStep;
      const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
      });
      let reqNewline = false;
      let linesAtValue = 0;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (identity.isNode(item)) {
          if (item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, false);
          if (item.comment)
            comment = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, false);
            if (ik.comment)
              reqNewline = true;
          }
          const iv = identity.isNode(item.value) ? item.value : null;
          if (iv) {
            if (iv.comment)
              comment = iv.comment;
            if (iv.commentBefore)
              reqNewline = true;
          } else if (item.value == null && ik?.comment) {
            comment = ik.comment;
          }
        }
        if (comment)
          reqNewline = true;
        let str2 = stringify2.stringify(item, itemCtx, () => comment = null);
        reqNewline || (reqNewline = lines.length > linesAtValue || str2.includes("\n"));
        if (i < items.length - 1) {
          str2 += ",";
        } else if (ctx.options.trailingComma) {
          if (ctx.options.lineWidth > 0) {
            reqNewline || (reqNewline = lines.reduce((sum, line) => sum + line.length + 2, 2) + (str2.length + 2) > ctx.options.lineWidth);
          }
          if (reqNewline) {
            str2 += ",";
          }
        }
        if (comment)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment));
        lines.push(str2);
        linesAtValue = lines.length;
      }
      const { start, end } = flowChars;
      if (lines.length === 0) {
        return start + end;
      } else {
        if (!reqNewline) {
          const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
          reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
        }
        if (reqNewline) {
          let str2 = start;
          for (const line of lines)
            str2 += line ? `
${indentStep}${indent}${line}` : "\n";
          return `${str2}
${indent}${end}`;
        } else {
          return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
        }
      }
    }
    function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
      if (comment && chompKeep)
        comment = comment.replace(/^\n+/, "");
      if (comment) {
        const ic = stringifyComment.indentComment(commentString(comment), indent);
        lines.push(ic.trimStart());
      }
    }
    exports2.stringifyCollection = stringifyCollection;
  }
});

// ../praxis-ba/node_modules/yaml/dist/nodes/YAMLMap.js
var require_YAMLMap = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/nodes/YAMLMap.js"(exports2) {
    "use strict";
    var stringifyCollection = require_stringifyCollection();
    var addPairToJSMap = require_addPairToJSMap();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    function findPair(items, key) {
      const k = identity.isScalar(key) ? key.value : key;
      for (const it of items) {
        if (identity.isPair(it)) {
          if (it.key === key || it.key === k)
            return it;
          if (identity.isScalar(it.key) && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:map";
      }
      constructor(schema) {
        super(identity.MAP, schema);
        this.items = [];
      }
      /**
       * A generic collection parsing method that can be extended
       * to other node classes that inherit from YAMLMap
       */
      static from(schema, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map = new this(schema);
        const add = (key, value) => {
          if (typeof replacer === "function")
            value = replacer.call(obj, key, value);
          else if (Array.isArray(replacer) && !replacer.includes(key))
            return;
          if (value !== void 0 || keepUndefined)
            map.items.push(Pair.createPair(key, value, ctx));
        };
        if (obj instanceof Map) {
          for (const [key, value] of obj)
            add(key, value);
        } else if (obj && typeof obj === "object") {
          for (const key of Object.keys(obj))
            add(key, obj[key]);
        }
        if (typeof schema.sortMapEntries === "function") {
          map.items.sort(schema.sortMapEntries);
        }
        return map;
      }
      /**
       * Adds a value to the collection.
       *
       * @param overwrite - If not set `true`, using a key that is already in the
       *   collection will throw. Otherwise, overwrites the previous value.
       */
      add(pair, overwrite) {
        let _pair;
        if (identity.isPair(pair))
          _pair = pair;
        else if (!pair || typeof pair !== "object" || !("key" in pair)) {
          _pair = new Pair.Pair(pair, pair?.value);
        } else
          _pair = new Pair.Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
          if (!overwrite)
            throw new Error(`Key ${_pair.key} already set`);
          if (identity.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
            prev.value.value = _pair.value;
          else
            prev.value = _pair.value;
        } else if (sortEntries) {
          const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
          if (i === -1)
            this.items.push(_pair);
          else
            this.items.splice(i, 0, _pair);
        } else {
          this.items.push(_pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it?.value;
        return (!keepScalar && identity.isScalar(node) ? node.value : node) ?? void 0;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair.Pair(key, value), true);
      }
      /**
       * @param ctx - Conversion context, originally set in Document#toJS()
       * @param {Class} Type - If set, forces the returned collection type
       * @returns Instance of Type, Map, or Object
       */
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!identity.isPair(item))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
          ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "",
          flowChars: { start: "{", end: "}" },
          itemIndent: ctx.indent || "",
          onChompKeep,
          onComment
        });
      }
    };
    exports2.YAMLMap = YAMLMap;
    exports2.findPair = findPair;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/common/map.js
var require_map = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/common/map.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var YAMLMap = require_YAMLMap();
    var map = {
      collection: "map",
      default: true,
      nodeClass: YAMLMap.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve(map2, onError) {
        if (!identity.isMap(map2))
          onError("Expected a mapping for this tag");
        return map2;
      },
      createNode: (schema, obj, ctx) => YAMLMap.YAMLMap.from(schema, obj, ctx)
    };
    exports2.map = map;
  }
});

// ../praxis-ba/node_modules/yaml/dist/nodes/YAMLSeq.js
var require_YAMLSeq = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/nodes/YAMLSeq.js"(exports2) {
    "use strict";
    var createNode = require_createNode();
    var stringifyCollection = require_stringifyCollection();
    var Collection = require_Collection();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var YAMLSeq = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:seq";
      }
      constructor(schema) {
        super(identity.SEQ, schema);
        this.items = [];
      }
      add(value) {
        this.items.push(value);
      }
      /**
       * Removes a value from the collection.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       *
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && identity.isScalar(it) ? it.value : it;
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       */
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       *
       * If `key` does not contain a representation of an integer, this will throw.
       * It may be wrapped in a `Scalar`.
       */
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (identity.isScalar(prev) && Scalar.isScalarValue(value))
          prev.value = value;
        else
          this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx?.onCreate)
          ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
          seq.push(toJS.toJS(item, String(i++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "- ",
          flowChars: { start: "[", end: "]" },
          itemIndent: (ctx.indent || "") + "  ",
          onChompKeep,
          onComment
        });
      }
      static from(schema, obj, ctx) {
        const { replacer } = ctx;
        const seq = new this(schema);
        if (obj && Symbol.iterator in Object(obj)) {
          let i = 0;
          for (let it of obj) {
            if (typeof replacer === "function") {
              const key = obj instanceof Set ? it : String(i++);
              it = replacer.call(obj, key, it);
            }
            seq.items.push(createNode.createNode(it, void 0, ctx));
          }
        }
        return seq;
      }
    };
    function asItemIndex(key) {
      let idx = identity.isScalar(key) ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    exports2.YAMLSeq = YAMLSeq;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/common/seq.js
var require_seq = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/common/seq.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var YAMLSeq = require_YAMLSeq();
    var seq = {
      collection: "seq",
      default: true,
      nodeClass: YAMLSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve(seq2, onError) {
        if (!identity.isSeq(seq2))
          onError("Expected a sequence for this tag");
        return seq2;
      },
      createNode: (schema, obj, ctx) => YAMLSeq.YAMLSeq.from(schema, obj, ctx)
    };
    exports2.seq = seq;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/common/string.js
var require_string = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/common/string.js"(exports2) {
    "use strict";
    var stringifyString = require_stringifyString();
    var string = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str2) => str2,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
    exports2.string = string;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/common/null.js
var require_null = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/common/null.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var nullTag = {
      identify: (value) => value == null,
      createNode: () => new Scalar.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new Scalar.Scalar(null),
      stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
    };
    exports2.nullTag = nullTag;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/core/bool.js
var require_bool = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/core/bool.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var boolTag = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str2) => new Scalar.Scalar(str2[0] === "t" || str2[0] === "T"),
      stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
          const sv = source[0] === "t" || source[0] === "T";
          if (value === sv)
            return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
    exports2.boolTag = boolTag;
  }
});

// ../praxis-ba/node_modules/yaml/dist/stringify/stringifyNumber.js
var require_stringifyNumber = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/stringify/stringifyNumber.js"(exports2) {
    "use strict";
    function stringifyNumber({ format, minFractionDigits, tag, value }) {
      if (typeof value === "bigint")
        return String(value);
      const num = typeof value === "number" ? value : Number(value);
      if (!isFinite(num))
        return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
      let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^-?\d/.test(n) && !n.includes("e")) {
        let i = n.indexOf(".");
        if (i < 0) {
          i = n.length;
          n += ".";
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
          n += "0";
      }
      return n;
    }
    exports2.stringifyNumber = stringifyNumber;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/core/float.js
var require_float = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/core/float.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str2) => str2.slice(-3).toLowerCase() === "nan" ? NaN : str2[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str2) => parseFloat(str2),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(str2) {
        const node = new Scalar.Scalar(parseFloat(str2));
        const dot = str2.indexOf(".");
        if (dot !== -1 && str2[str2.length - 1] === "0")
          node.minFractionDigits = str2.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports2.float = float;
    exports2.floatExp = floatExp;
    exports2.floatNaN = floatNaN;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/core/int.js
var require_int = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/core/int.js"(exports2) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    var intResolve = (str2, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str2) : parseInt(str2.substring(offset), radix);
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value) && value >= 0)
        return prefix + value.toString(radix);
      return stringifyNumber.stringifyNumber(node);
    }
    var intOct = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: (str2, _onError, opt) => intResolve(str2, 2, 8, opt),
      stringify: (node) => intStringify(node, 8, "0o")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str2, _onError, opt) => intResolve(str2, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (str2, _onError, opt) => intResolve(str2, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports2.int = int;
    exports2.intHex = intHex;
    exports2.intOct = intOct;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/core/schema.js
var require_schema = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/core/schema.js"(exports2) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.boolTag,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float
    ];
    exports2.schema = schema;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/json/schema.js
var require_schema2 = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/json/schema.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var map = require_map();
    var seq = require_seq();
    function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    }
    var stringifyJSON = ({ value }) => JSON.stringify(value);
    var jsonScalars = [
      {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: (str2) => str2,
        stringify: stringifyJSON
      },
      {
        identify: (value) => value == null,
        createNode: () => new Scalar.Scalar(null),
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true$|^false$/,
        resolve: (str2) => str2 === "true",
        stringify: stringifyJSON
      },
      {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str2, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str2) : parseInt(str2, 10),
        stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
      },
      {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str2) => parseFloat(str2),
        stringify: stringifyJSON
      }
    ];
    var jsonError = {
      default: true,
      tag: "",
      test: /^/,
      resolve(str2, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str2)}`);
        return str2;
      }
    };
    var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
    exports2.schema = schema;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/binary.js
var require_binary = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/binary.js"(exports2) {
    "use strict";
    var node_buffer = __require("buffer");
    var Scalar = require_Scalar();
    var stringifyString = require_stringifyString();
    var binary = {
      identify: (value) => value instanceof Uint8Array,
      // Buffer inherits from Uint8Array
      default: false,
      tag: "tag:yaml.org,2002:binary",
      /**
       * Returns a Buffer in node and an Uint8Array in browsers
       *
       * To use the resulting buffer as an image, you'll want to do something like:
       *
       *   const blob = new Blob([buffer], { type: 'image/jpeg' })
       *   document.querySelector('#photo').src = URL.createObjectURL(blob)
       */
      resolve(src, onError) {
        if (typeof node_buffer.Buffer === "function") {
          return node_buffer.Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str2 = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str2.length);
          for (let i = 0; i < str2.length; ++i)
            buffer[i] = str2.charCodeAt(i);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        if (!value)
          return "";
        const buf = value;
        let str2;
        if (typeof node_buffer.Buffer === "function") {
          str2 = buf instanceof node_buffer.Buffer ? buf.toString("base64") : node_buffer.Buffer.from(buf.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s = "";
          for (let i = 0; i < buf.length; ++i)
            s += String.fromCharCode(buf[i]);
          str2 = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        type ?? (type = Scalar.Scalar.BLOCK_LITERAL);
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
          const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          const n = Math.ceil(str2.length / lineWidth);
          const lines = new Array(n);
          for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
            lines[i] = str2.substr(o, lineWidth);
          }
          str2 = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString.stringifyString({ comment, type, value: str2 }, ctx, onComment, onChompKeep);
      }
    };
    exports2.binary = binary;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/pairs.js
var require_pairs = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/pairs.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLSeq = require_YAMLSeq();
    function resolvePairs(seq, onError) {
      if (identity.isSeq(seq)) {
        for (let i = 0; i < seq.items.length; ++i) {
          let item = seq.items[i];
          if (identity.isPair(item))
            continue;
          else if (identity.isMap(item)) {
            if (item.items.length > 1)
              onError("Each pair must have its own sequence indicator");
            const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
            if (item.commentBefore)
              pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
            if (item.comment) {
              const cn = pair.value ?? pair.key;
              cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
            }
            item = pair;
          }
          seq.items[i] = identity.isPair(item) ? item : new Pair.Pair(item);
        }
      } else
        onError("Expected a sequence for this tag");
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const { replacer } = ctx;
      const pairs2 = new YAMLSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      let i = 0;
      if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
          if (typeof replacer === "function")
            it = replacer.call(iterable, String(i++), it);
          let key, value;
          if (Array.isArray(it)) {
            if (it.length === 2) {
              key = it[0];
              value = it[1];
            } else
              throw new TypeError(`Expected [key, value] tuple: ${it}`);
          } else if (it && it instanceof Object) {
            const keys = Object.keys(it);
            if (keys.length === 1) {
              key = keys[0];
              value = it[key];
            } else {
              throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
            }
          } else {
            key = it;
          }
          pairs2.items.push(Pair.createPair(key, value, ctx));
        }
      return pairs2;
    }
    var pairs = {
      collection: "seq",
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
    exports2.createPairs = createPairs;
    exports2.pairs = pairs;
    exports2.resolvePairs = resolvePairs;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/omap.js
var require_omap = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/omap.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var toJS = require_toJS();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var pairs = require_pairs();
    var YAMLOMap = class _YAMLOMap extends YAMLSeq.YAMLSeq {
      constructor() {
        super();
        this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
        this.tag = _YAMLOMap.tag;
      }
      /**
       * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
       * but TypeScript won't allow widening the signature of a child method.
       */
      toJSON(_, ctx) {
        if (!ctx)
          return super.toJSON(_);
        const map = /* @__PURE__ */ new Map();
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (identity.isPair(pair)) {
            key = toJS.toJS(pair.key, "", ctx);
            value = toJS.toJS(pair.value, key, ctx);
          } else {
            key = toJS.toJS(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value);
        }
        return map;
      }
      static from(schema, iterable, ctx) {
        const pairs$1 = pairs.createPairs(schema, iterable, ctx);
        const omap2 = new this();
        omap2.items = pairs$1.items;
        return omap2;
      }
    };
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    var omap = {
      collection: "seq",
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve(seq, onError) {
        const pairs$1 = pairs.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
          if (identity.isScalar(key)) {
            if (seenKeys.includes(key.value)) {
              onError(`Ordered maps must not include duplicate keys: ${key.value}`);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
      },
      createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
    };
    exports2.YAMLOMap = YAMLOMap;
    exports2.omap = omap;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/bool.js
var require_bool2 = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/bool.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    function boolStringify({ value, source }, ctx) {
      const boolObj = value ? trueTag : falseTag;
      if (source && boolObj.test.test(source))
        return source;
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
    var trueTag = {
      identify: (value) => value === true,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new Scalar.Scalar(true),
      stringify: boolStringify
    };
    var falseTag = {
      identify: (value) => value === false,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
      resolve: () => new Scalar.Scalar(false),
      stringify: boolStringify
    };
    exports2.falseTag = falseTag;
    exports2.trueTag = trueTag;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/float.js
var require_float2 = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/float.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str2) => str2.slice(-3).toLowerCase() === "nan" ? NaN : str2[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str2) => parseFloat(str2.replace(/_/g, "")),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(str2) {
        const node = new Scalar.Scalar(parseFloat(str2.replace(/_/g, "")));
        const dot = str2.indexOf(".");
        if (dot !== -1) {
          const f = str2.substring(dot + 1).replace(/_/g, "");
          if (f[f.length - 1] === "0")
            node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports2.float = float;
    exports2.floatExp = floatExp;
    exports2.floatNaN = floatNaN;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/int.js
var require_int2 = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/int.js"(exports2) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    function intResolve(str2, offset, radix, { intAsBigInt }) {
      const sign = str2[0];
      if (sign === "-" || sign === "+")
        offset += 1;
      str2 = str2.substring(offset).replace(/_/g, "");
      if (intAsBigInt) {
        switch (radix) {
          case 2:
            str2 = `0b${str2}`;
            break;
          case 8:
            str2 = `0o${str2}`;
            break;
          case 16:
            str2 = `0x${str2}`;
            break;
        }
        const n2 = BigInt(str2);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str2, radix);
      return sign === "-" ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value)) {
        const str2 = value.toString(radix);
        return value < 0 ? "-" + prefix + str2.substr(1) : prefix + str2;
      }
      return stringifyNumber.stringifyNumber(node);
    }
    var intBin = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (str2, _onError, opt) => intResolve(str2, 2, 2, opt),
      stringify: (node) => intStringify(node, 2, "0b")
    };
    var intOct = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: (str2, _onError, opt) => intResolve(str2, 1, 8, opt),
      stringify: (node) => intStringify(node, 8, "0")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (str2, _onError, opt) => intResolve(str2, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (str2, _onError, opt) => intResolve(str2, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports2.int = int;
    exports2.intBin = intBin;
    exports2.intHex = intHex;
    exports2.intOct = intOct;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/set.js
var require_set = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/set.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSet = class _YAMLSet extends YAMLMap.YAMLMap {
      constructor(schema) {
        super(schema);
        this.tag = _YAMLSet.tag;
      }
      add(key) {
        let pair;
        if (identity.isPair(key))
          pair = key;
        else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
          pair = new Pair.Pair(key.key, null);
        else
          pair = new Pair.Pair(key, null);
        const prev = YAMLMap.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      /**
       * If `keepPair` is `true`, returns the Pair matching `key`.
       * Otherwise, returns the value of that Pair's key.
       */
      get(key, keepPair) {
        const pair = YAMLMap.findPair(this.items, key);
        return !keepPair && identity.isPair(pair) ? identity.isScalar(pair.key) ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = YAMLMap.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new Pair.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues(true))
          return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
      static from(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set2 = new this(schema);
        if (iterable && Symbol.iterator in Object(iterable))
          for (let value of iterable) {
            if (typeof replacer === "function")
              value = replacer.call(iterable, value, value);
            set2.items.push(Pair.createPair(value, null, ctx));
          }
        return set2;
      }
    };
    YAMLSet.tag = "tag:yaml.org,2002:set";
    var set = {
      collection: "map",
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
      resolve(map, onError) {
        if (identity.isMap(map)) {
          if (map.hasAllNullValues(true))
            return Object.assign(new YAMLSet(), map);
          else
            onError("Set items must all have null values");
        } else
          onError("Expected a mapping for this tag");
        return map;
      }
    };
    exports2.YAMLSet = YAMLSet;
    exports2.set = set;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js
var require_timestamp = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js"(exports2) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    function parseSexagesimal(str2, asBigInt) {
      const sign = str2[0];
      const parts = sign === "-" || sign === "+" ? str2.substring(1) : str2;
      const num = (n) => asBigInt ? BigInt(n) : Number(n);
      const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
      return sign === "-" ? num(-1) * res : res;
    }
    function stringifySexagesimal(node) {
      let { value } = node;
      let num = (n) => n;
      if (typeof value === "bigint")
        num = (n) => BigInt(n);
      else if (isNaN(value) || !isFinite(value))
        return stringifyNumber.stringifyNumber(node);
      let sign = "";
      if (value < 0) {
        sign = "-";
        value *= num(-1);
      }
      const _60 = num(60);
      const parts = [value % _60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60);
        if (value >= 60) {
          value = (value - parts[0]) / _60;
          parts.unshift(value);
        }
      }
      return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
    }
    var intTime = {
      identify: (value) => typeof value === "bigint" || Number.isInteger(value),
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (str2, _onError, { intAsBigInt }) => parseSexagesimal(str2, intAsBigInt),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (str2) => parseSexagesimal(str2, false),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
      // may be omitted altogether, resulting in a date format. In such a case, the time part is
      // assumed to be 00:00:00Z (start of day, UTC).
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve(str2) {
        const match = str2.match(timestamp.test);
        if (!match)
          throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz, false);
          if (Math.abs(d) < 30)
            d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
    };
    exports2.floatTime = floatTime;
    exports2.intTime = intTime;
    exports2.timestamp = timestamp;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/schema.js
var require_schema3 = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/yaml-1.1/schema.js"(exports2) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var binary = require_binary();
    var bool = require_bool2();
    var float = require_float2();
    var int = require_int2();
    var merge = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var set = require_set();
    var timestamp = require_timestamp();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.trueTag,
      bool.falseTag,
      int.intBin,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float,
      binary.binary,
      merge.merge,
      omap.omap,
      pairs.pairs,
      set.set,
      timestamp.intTime,
      timestamp.floatTime,
      timestamp.timestamp
    ];
    exports2.schema = schema;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/tags.js
var require_tags = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/tags.js"(exports2) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = require_schema();
    var schema$1 = require_schema2();
    var binary = require_binary();
    var merge = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var schema$2 = require_schema3();
    var set = require_set();
    var timestamp = require_timestamp();
    var schemas2 = /* @__PURE__ */ new Map([
      ["core", schema.schema],
      ["failsafe", [map.map, seq.seq, string.string]],
      ["json", schema$1.schema],
      ["yaml11", schema$2.schema],
      ["yaml-1.1", schema$2.schema]
    ]);
    var tagsByName = {
      binary: binary.binary,
      bool: bool.boolTag,
      float: float.float,
      floatExp: float.floatExp,
      floatNaN: float.floatNaN,
      floatTime: timestamp.floatTime,
      int: int.int,
      intHex: int.intHex,
      intOct: int.intOct,
      intTime: timestamp.intTime,
      map: map.map,
      merge: merge.merge,
      null: _null.nullTag,
      omap: omap.omap,
      pairs: pairs.pairs,
      seq: seq.seq,
      set: set.set,
      timestamp: timestamp.timestamp
    };
    var coreKnownTags = {
      "tag:yaml.org,2002:binary": binary.binary,
      "tag:yaml.org,2002:merge": merge.merge,
      "tag:yaml.org,2002:omap": omap.omap,
      "tag:yaml.org,2002:pairs": pairs.pairs,
      "tag:yaml.org,2002:set": set.set,
      "tag:yaml.org,2002:timestamp": timestamp.timestamp
    };
    function getTags(customTags, schemaName, addMergeTag) {
      const schemaTags = schemas2.get(schemaName);
      if (schemaTags && !customTags) {
        return addMergeTag && !schemaTags.includes(merge.merge) ? schemaTags.concat(merge.merge) : schemaTags.slice();
      }
      let tags = schemaTags;
      if (!tags) {
        if (Array.isArray(customTags))
          tags = [];
        else {
          const keys = Array.from(schemas2.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags = tags.concat(tag);
      } else if (typeof customTags === "function") {
        tags = customTags(tags.slice());
      }
      if (addMergeTag)
        tags = tags.concat(merge.merge);
      return tags.reduce((tags2, tag) => {
        const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
        if (!tagObj) {
          const tagName = JSON.stringify(tag);
          const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
        }
        if (!tags2.includes(tagObj))
          tags2.push(tagObj);
        return tags2;
      }, []);
    }
    exports2.coreKnownTags = coreKnownTags;
    exports2.getTags = getTags;
  }
});

// ../praxis-ba/node_modules/yaml/dist/schema/Schema.js
var require_Schema = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/schema/Schema.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var map = require_map();
    var seq = require_seq();
    var string = require_string();
    var tags = require_tags();
    var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    var Schema = class _Schema {
      constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
        this.name = typeof schema === "string" && schema || "core";
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name, merge);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, identity.MAP, { value: map.map });
        Object.defineProperty(this, identity.SCALAR, { value: string.string });
        Object.defineProperty(this, identity.SEQ, { value: seq.seq });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      clone() {
        const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
      }
    };
    exports2.Schema = Schema;
  }
});

// ../praxis-ba/node_modules/yaml/dist/stringify/stringifyDocument.js
var require_stringifyDocument = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/stringify/stringifyDocument.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var stringify2 = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyDocument(doc, options2) {
      const lines = [];
      let hasDirectives = options2.directives === true;
      if (options2.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
          lines.push(dir);
          hasDirectives = true;
        } else if (doc.directives.docStart)
          hasDirectives = true;
      }
      if (hasDirectives)
        lines.push("---");
      const ctx = stringify2.createStringifyContext(doc, options2);
      const { commentString } = ctx.options;
      if (doc.commentBefore) {
        if (lines.length !== 1)
          lines.unshift("");
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ""));
      }
      let chompKeep = false;
      let contentComment = null;
      if (doc.contents) {
        if (identity.isNode(doc.contents)) {
          if (doc.contents.spaceBefore && hasDirectives)
            lines.push("");
          if (doc.contents.commentBefore) {
            const cs = commentString(doc.contents.commentBefore);
            lines.push(stringifyComment.indentComment(cs, ""));
          }
          ctx.forceBlockIndent = !!doc.comment;
          contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
        let body = stringify2.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
        if (contentComment)
          body += stringifyComment.lineComment(body, "", commentString(contentComment));
        if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
          lines[lines.length - 1] = `--- ${body}`;
        } else
          lines.push(body);
      } else {
        lines.push(stringify2.stringify(doc.contents, ctx));
      }
      if (doc.directives?.docEnd) {
        if (doc.comment) {
          const cs = commentString(doc.comment);
          if (cs.includes("\n")) {
            lines.push("...");
            lines.push(stringifyComment.indentComment(cs, ""));
          } else {
            lines.push(`... ${cs}`);
          }
        } else {
          lines.push("...");
        }
      } else {
        let dc = doc.comment;
        if (dc && chompKeep)
          dc = dc.replace(/^\n+/, "");
        if (dc) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
            lines.push("");
          lines.push(stringifyComment.indentComment(commentString(dc), ""));
        }
      }
      return lines.join("\n") + "\n";
    }
    exports2.stringifyDocument = stringifyDocument;
  }
});

// ../praxis-ba/node_modules/yaml/dist/doc/Document.js
var require_Document = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/doc/Document.js"(exports2) {
    "use strict";
    var Alias = require_Alias();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var toJS = require_toJS();
    var Schema = require_Schema();
    var stringifyDocument = require_stringifyDocument();
    var anchors = require_anchors();
    var applyReviver = require_applyReviver();
    var createNode = require_createNode();
    var directives = require_directives();
    var Document = class _Document {
      constructor(value, replacer, options2) {
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.DOC });
        let _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options2 === void 0 && replacer) {
          options2 = replacer;
          replacer = void 0;
        }
        const opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          stringKeys: false,
          uniqueKeys: true,
          version: "1.2"
        }, options2);
        this.options = opt;
        let { version } = opt;
        if (options2?._directives) {
          this.directives = options2._directives.atDocument();
          if (this.directives.yaml.explicit)
            version = this.directives.yaml.version;
        } else
          this.directives = new directives.Directives({ version });
        this.setSchema(version, options2);
        this.contents = value === void 0 ? null : this.createNode(value, _replacer, options2);
      }
      /**
       * Create a deep copy of this Document and its contents.
       *
       * Custom Node values that inherit from `Object` still refer to their original instances.
       */
      clone() {
        const copy = Object.create(_Document.prototype, {
          [identity.NODE_TYPE]: { value: identity.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
          copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = identity.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** Adds a value to the document. */
      add(value) {
        if (assertCollection(this.contents))
          this.contents.add(value);
      }
      /** Adds a value to the document. */
      addIn(path, value) {
        if (assertCollection(this.contents))
          this.contents.addIn(path, value);
      }
      /**
       * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
       *
       * If `node` already has an anchor, `name` is ignored.
       * Otherwise, the `node.anchor` value will be set to `name`,
       * or if an anchor with that name is already present in the document,
       * `name` will be used as a prefix for a new unique anchor.
       * If `name` is undefined, the generated anchor will use 'a' as a prefix.
       */
      createAlias(node, name) {
        if (!node.anchor) {
          const prev = anchors.anchorNames(this);
          node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          !name || prev.has(name) ? anchors.findNewAnchor(name || "a", prev) : name;
        }
        return new Alias.Alias(node.anchor);
      }
      createNode(value, replacer, options2) {
        let _replacer = void 0;
        if (typeof replacer === "function") {
          value = replacer.call({ "": value }, "", value);
          _replacer = replacer;
        } else if (Array.isArray(replacer)) {
          const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
          const asStr = replacer.filter(keyToStr).map(String);
          if (asStr.length > 0)
            replacer = replacer.concat(asStr);
          _replacer = replacer;
        } else if (options2 === void 0 && replacer) {
          options2 = replacer;
          replacer = void 0;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options2 ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(
          this,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          anchorPrefix || "a"
        );
        const ctx = {
          aliasDuplicateObjects: aliasDuplicateObjects ?? true,
          keepUndefined: keepUndefined ?? false,
          onAnchor,
          onTagObj,
          replacer: _replacer,
          schema: this.schema,
          sourceObjects
        };
        const node = createNode.createNode(value, tag, ctx);
        if (flow && identity.isCollection(node))
          node.flow = true;
        setAnchors();
        return node;
      }
      /**
       * Convert a key and a value into a `Pair` using the current schema,
       * recursively wrapping all values as `Scalar` or `Collection` nodes.
       */
      createPair(key, value, options2 = {}) {
        const k = this.createNode(key, null, options2);
        const v = this.createNode(value, null, options2);
        return new Pair.Pair(k, v);
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        if (Collection.isEmptyPath(path)) {
          if (this.contents == null)
            return false;
          this.contents = null;
          return true;
        }
        return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      get(key, keepScalar) {
        return identity.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
      }
      /**
       * Returns item at `path`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        if (Collection.isEmptyPath(path))
          return !keepScalar && identity.isScalar(this.contents) ? this.contents.value : this.contents;
        return identity.isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
      }
      /**
       * Checks if the document includes a value with the key `key`.
       */
      has(key) {
        return identity.isCollection(this.contents) ? this.contents.has(key) : false;
      }
      /**
       * Checks if the document includes a value at `path`.
       */
      hasIn(path) {
        if (Collection.isEmptyPath(path))
          return this.contents !== void 0;
        return identity.isCollection(this.contents) ? this.contents.hasIn(path) : false;
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      set(key, value) {
        if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, [key], value);
        } else if (assertCollection(this.contents)) {
          this.contents.set(key, value);
        }
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        if (Collection.isEmptyPath(path)) {
          this.contents = value;
        } else if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, Array.from(path), value);
        } else if (assertCollection(this.contents)) {
          this.contents.setIn(path, value);
        }
      }
      /**
       * Change the YAML version and schema used by the document.
       * A `null` version disables support for directives, explicit tags, anchors, and aliases.
       * It also requires the `schema` option to be given as a `Schema` instance value.
       *
       * Overrides all previously set schema options.
       */
      setSchema(version, options2 = {}) {
        if (typeof version === "number")
          version = String(version);
        let opt;
        switch (version) {
          case "1.1":
            if (this.directives)
              this.directives.yaml.version = "1.1";
            else
              this.directives = new directives.Directives({ version: "1.1" });
            opt = { resolveKnownTags: false, schema: "yaml-1.1" };
            break;
          case "1.2":
          case "next":
            if (this.directives)
              this.directives.yaml.version = version;
            else
              this.directives = new directives.Directives({ version });
            opt = { resolveKnownTags: true, schema: "core" };
            break;
          case null:
            if (this.directives)
              delete this.directives;
            opt = null;
            break;
          default: {
            const sv = JSON.stringify(version);
            throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
          }
        }
        if (options2.schema instanceof Object)
          this.schema = options2.schema;
        else if (opt)
          this.schema = new Schema.Schema(Object.assign(opt, options2));
        else
          throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
      }
      // json & jsonArg are only used from toJSON()
      toJS({ json: json2, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc: this,
          keep: !json2,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
      /**
       * A JSON representation of the document `contents`.
       *
       * @param jsonArg Used by `JSON.stringify` to indicate the array index or
       *   property name.
       */
      toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
      }
      /** A YAML representation of the document. */
      toString(options2 = {}) {
        if (this.errors.length > 0)
          throw new Error("Document with errors cannot be stringified");
        if ("indent" in options2 && (!Number.isInteger(options2.indent) || Number(options2.indent) <= 0)) {
          const s = JSON.stringify(options2.indent);
          throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument.stringifyDocument(this, options2);
      }
    };
    function assertCollection(contents) {
      if (identity.isCollection(contents))
        return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    exports2.Document = Document;
  }
});

// ../praxis-ba/node_modules/yaml/dist/errors.js
var require_errors = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/errors.js"(exports2) {
    "use strict";
    var YAMLError = class extends Error {
      constructor(name, pos, code2, message2) {
        super();
        this.name = name;
        this.code = code2;
        this.message = message2;
        this.pos = pos;
      }
    };
    var YAMLParseError = class extends YAMLError {
      constructor(pos, code2, message2) {
        super("YAMLParseError", pos, code2, message2);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(pos, code2, message2) {
        super("YAMLWarning", pos, code2, message2);
      }
    };
    var prettifyError = (src, lc) => (error) => {
      if (error.pos[0] === -1)
        return;
      error.linePos = error.pos.map((pos) => lc.linePos(pos));
      const { line, col } = error.linePos[0];
      error.message += ` at line ${line}, column ${col}`;
      let ci = col - 1;
      let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
      if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = "\u2026" + lineStr.substring(trimStart);
        ci -= trimStart - 1;
      }
      if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + "\u2026";
      if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
          prev = prev.substring(0, 79) + "\u2026\n";
        lineStr = prev + lineStr;
      }
      if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end?.line === line && end.col > col) {
          count = Math.max(1, Math.min(end.col - col, 80 - ci));
        }
        const pointer = " ".repeat(ci) + "^".repeat(count);
        error.message += `:

${lineStr}
${pointer}
`;
      }
    };
    exports2.YAMLError = YAMLError;
    exports2.YAMLParseError = YAMLParseError;
    exports2.YAMLWarning = YAMLWarning;
    exports2.prettifyError = prettifyError;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/resolve-props.js
var require_resolve_props = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/resolve-props.js"(exports2) {
    "use strict";
    function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
      let spaceBefore = false;
      let atNewline = startOnNewline;
      let hasSpace = startOnNewline;
      let comment = "";
      let commentSep = "";
      let hasNewline = false;
      let reqSpace = false;
      let tab = null;
      let anchor = null;
      let tag = null;
      let newlineAfterProp = null;
      let comma = null;
      let found = null;
      let start = null;
      for (const token of tokens) {
        if (reqSpace) {
          if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
            onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
          reqSpace = false;
        }
        if (tab) {
          if (atNewline && token.type !== "comment" && token.type !== "newline") {
            onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
          }
          tab = null;
        }
        switch (token.type) {
          case "space":
            if (!flow && (indicator !== "doc-start" || next?.type !== "flow-collection") && token.source.includes("	")) {
              tab = token;
            }
            hasSpace = true;
            break;
          case "comment": {
            if (!hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = token.source.substring(1) || " ";
            if (!comment)
              comment = cb;
            else
              comment += commentSep + cb;
            commentSep = "";
            atNewline = false;
            break;
          }
          case "newline":
            if (atNewline) {
              if (comment)
                comment += token.source;
              else if (!found || indicator !== "seq-item-ind")
                spaceBefore = true;
            } else
              commentSep += token.source;
            atNewline = true;
            hasNewline = true;
            if (anchor || tag)
              newlineAfterProp = token;
            hasSpace = true;
            break;
          case "anchor":
            if (anchor)
              onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
            if (token.source.endsWith(":"))
              onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
            anchor = token;
            start ?? (start = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          case "tag": {
            if (tag)
              onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
            tag = token;
            start ?? (start = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          }
          case indicator:
            if (anchor || tag)
              onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
            if (found)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
            found = token;
            atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
            hasSpace = false;
            break;
          case "comma":
            if (flow) {
              if (comma)
                onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
              comma = token;
              atNewline = false;
              hasSpace = false;
              break;
            }
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
            atNewline = false;
            hasSpace = false;
        }
      }
      const last = tokens[tokens.length - 1];
      const end = last ? last.offset + last.source.length : offset;
      if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
        onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      }
      if (tab && (atNewline && tab.indent <= parentIndent || next?.type === "block-map" || next?.type === "block-seq"))
        onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
      return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        anchor,
        tag,
        newlineAfterProp,
        end,
        start: start ?? end
      };
    }
    exports2.resolveProps = resolveProps;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/util-contains-newline.js
var require_util_contains_newline = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/util-contains-newline.js"(exports2) {
    "use strict";
    function containsNewline(key) {
      if (!key)
        return null;
      switch (key.type) {
        case "alias":
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          if (key.source.includes("\n"))
            return true;
          if (key.end) {
            for (const st of key.end)
              if (st.type === "newline")
                return true;
          }
          return false;
        case "flow-collection":
          for (const it of key.items) {
            for (const st of it.start)
              if (st.type === "newline")
                return true;
            if (it.sep) {
              for (const st of it.sep)
                if (st.type === "newline")
                  return true;
            }
            if (containsNewline(it.key) || containsNewline(it.value))
              return true;
          }
          return false;
        default:
          return true;
      }
    }
    exports2.containsNewline = containsNewline;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/util-flow-indent-check.js
var require_util_flow_indent_check = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/util-flow-indent-check.js"(exports2) {
    "use strict";
    var utilContainsNewline = require_util_contains_newline();
    function flowIndentCheck(indent, fc, onError) {
      if (fc?.type === "flow-collection") {
        const end = fc.end[0];
        if (end.indent === indent && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) {
          const msg = "Flow end indicator should be more indented than parent";
          onError(end, "BAD_INDENT", msg, true);
        }
      }
    }
    exports2.flowIndentCheck = flowIndentCheck;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/util-map-includes.js
var require_util_map_includes = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/util-map-includes.js"(exports2) {
    "use strict";
    var identity = require_identity();
    function mapIncludes(ctx, items, search) {
      const { uniqueKeys } = ctx.options;
      if (uniqueKeys === false)
        return false;
      const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || identity.isScalar(a) && identity.isScalar(b) && a.value === b.value;
      return items.some((pair) => isEqual(pair.key, search));
    }
    exports2.mapIncludes = mapIncludes;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/resolve-block-map.js
var require_resolve_block_map = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/resolve-block-map.js"(exports2) {
    "use strict";
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    var utilMapIncludes = require_util_map_includes();
    var startColMsg = "All mapping items must start at the same column";
    function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLMap.YAMLMap;
      const map = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bm.offset;
      let commentEnd = null;
      for (const collItem of bm.items) {
        const { start, key, sep: sep5, value } = collItem;
        const keyProps = resolveProps.resolveProps(start, {
          indicator: "explicit-key-ind",
          next: key ?? sep5?.[0],
          offset,
          onError,
          parentIndent: bm.indent,
          startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
          if (key) {
            if (key.type === "block-seq")
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
            else if ("indent" in key && key.indent !== bm.indent)
              onError(offset, "BAD_INDENT", startColMsg);
          }
          if (!keyProps.anchor && !keyProps.tag && !sep5) {
            commentEnd = keyProps.end;
            if (keyProps.comment) {
              if (map.comment)
                map.comment += "\n" + keyProps.comment;
              else
                map.comment = keyProps.comment;
            }
            continue;
          }
          if (keyProps.newlineAfterProp || utilContainsNewline.containsNewline(key)) {
            onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
          }
        } else if (keyProps.found?.indent !== bm.indent) {
          onError(offset, "BAD_INDENT", startColMsg);
        }
        ctx.atKey = true;
        const keyStart = keyProps.end;
        const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
        ctx.atKey = false;
        if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        const valueProps = resolveProps.resolveProps(sep5 ?? [], {
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          parentIndent: bm.indent,
          startOnNewline: !key || key.type === "block-scalar"
        });
        offset = valueProps.end;
        if (valueProps.found) {
          if (implicitKey) {
            if (value?.type === "block-map" && !valueProps.hasNewline)
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
            if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
              onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep5, null, valueProps, onError);
          if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
          offset = valueNode.range[2];
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        } else {
          if (implicitKey)
            onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
          if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        }
      }
      if (commentEnd && commentEnd < offset)
        onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
      map.range = [bm.offset, offset, commentEnd ?? offset];
      return map;
    }
    exports2.resolveBlockMap = resolveBlockMap;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/resolve-block-seq.js
var require_resolve_block_seq = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/resolve-block-seq.js"(exports2) {
    "use strict";
    var YAMLSeq = require_YAMLSeq();
    var resolveProps = require_resolve_props();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLSeq.YAMLSeq;
      const seq = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = bs.offset;
      let commentEnd = null;
      for (const { start, value } of bs.items) {
        const props = resolveProps.resolveProps(start, {
          indicator: "seq-item-ind",
          next: value,
          offset,
          onError,
          parentIndent: bs.indent,
          startOnNewline: true
        });
        if (!props.found) {
          if (props.anchor || props.tag || value) {
            if (value?.type === "block-seq")
              onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
            else
              onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
          } else {
            commentEnd = props.end;
            if (props.comment)
              seq.comment = props.comment;
            continue;
          }
        }
        const node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
      }
      seq.range = [bs.offset, offset, commentEnd ?? offset];
      return seq;
    }
    exports2.resolveBlockSeq = resolveBlockSeq;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/resolve-end.js
var require_resolve_end = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/resolve-end.js"(exports2) {
    "use strict";
    function resolveEnd(end, offset, reqSpace, onError) {
      let comment = "";
      if (end) {
        let hasSpace = false;
        let sep5 = "";
        for (const token of end) {
          const { source, type } = token;
          switch (type) {
            case "space":
              hasSpace = true;
              break;
            case "comment": {
              if (reqSpace && !hasSpace)
                onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
              const cb = source.substring(1) || " ";
              if (!comment)
                comment = cb;
              else
                comment += sep5 + cb;
              sep5 = "";
              break;
            }
            case "newline":
              if (comment)
                sep5 += source;
              hasSpace = true;
              break;
            default:
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
          }
          offset += source.length;
        }
      }
      return { comment, offset };
    }
    exports2.resolveEnd = resolveEnd;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/resolve-flow-collection.js
var require_resolve_flow_collection = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/resolve-flow-collection.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilMapIncludes = require_util_map_includes();
    var blockMsg = "Block collections are not allowed within flow collections";
    var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
    function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
      const isMap = fc.start.source === "{";
      const fcName = isMap ? "flow map" : "flow sequence";
      const NodeClass = tag?.nodeClass ?? (isMap ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq);
      const coll = new NodeClass(ctx.schema);
      coll.flow = true;
      const atRoot = ctx.atRoot;
      if (atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = fc.offset + fc.start.source.length;
      for (let i = 0; i < fc.items.length; ++i) {
        const collItem = fc.items[i];
        const { start, key, sep: sep5, value } = collItem;
        const props = resolveProps.resolveProps(start, {
          flow: fcName,
          indicator: "explicit-key-ind",
          next: key ?? sep5?.[0],
          offset,
          onError,
          parentIndent: fc.indent,
          startOnNewline: false
        });
        if (!props.found) {
          if (!props.anchor && !props.tag && !sep5 && !value) {
            if (i === 0 && props.comma)
              onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
            else if (i < fc.items.length - 1)
              onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
            if (props.comment) {
              if (coll.comment)
                coll.comment += "\n" + props.comment;
              else
                coll.comment = props.comment;
            }
            offset = props.end;
            continue;
          }
          if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
            onError(
              key,
              // checked by containsNewline()
              "MULTILINE_IMPLICIT_KEY",
              "Implicit keys of flow sequence pairs need to be on a single line"
            );
        }
        if (i === 0) {
          if (props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        } else {
          if (!props.comma)
            onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
          if (props.comment) {
            let prevItemComment = "";
            loop: for (const st of start) {
              switch (st.type) {
                case "comma":
                case "space":
                  break;
                case "comment":
                  prevItemComment = st.source.substring(1);
                  break loop;
                default:
                  break loop;
              }
            }
            if (prevItemComment) {
              let prev = coll.items[coll.items.length - 1];
              if (identity.isPair(prev))
                prev = prev.value ?? prev.key;
              if (prev.comment)
                prev.comment += "\n" + prevItemComment;
              else
                prev.comment = prevItemComment;
              props.comment = props.comment.substring(prevItemComment.length + 1);
            }
          }
        }
        if (!isMap && !sep5 && !props.found) {
          const valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep5, null, props, onError);
          coll.items.push(valueNode);
          offset = valueNode.range[2];
          if (isBlock(value))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else {
          ctx.atKey = true;
          const keyStart = props.end;
          const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
          if (isBlock(key))
            onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
          ctx.atKey = false;
          const valueProps = resolveProps.resolveProps(sep5 ?? [], {
            flow: fcName,
            indicator: "map-value-ind",
            next: value,
            offset: keyNode.range[2],
            onError,
            parentIndent: fc.indent,
            startOnNewline: false
          });
          if (valueProps.found) {
            if (!isMap && !props.found && ctx.options.strict) {
              if (sep5)
                for (const st of sep5) {
                  if (st === valueProps.found)
                    break;
                  if (st.type === "newline") {
                    onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                    break;
                  }
                }
              if (props.start < valueProps.found.offset - 1024)
                onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
            }
          } else if (value) {
            if ("source" in value && value.source?.[0] === ":")
              onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
            else
              onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep5, null, valueProps, onError) : null;
          if (valueNode) {
            if (isBlock(value))
              onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
          } else if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          if (isMap) {
            const map = coll;
            if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
              onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
            map.items.push(pair);
          } else {
            const map = new YAMLMap.YAMLMap(ctx.schema);
            map.flow = true;
            map.items.push(pair);
            const endRange = (valueNode ?? keyNode).range;
            map.range = [keyNode.range[0], endRange[1], endRange[2]];
            coll.items.push(map);
          }
          offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
      }
      const expectedEnd = isMap ? "}" : "]";
      const [ce, ...ee] = fc.end;
      let cePos = offset;
      if (ce?.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
      else {
        const name = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
        if (ce && ce.source.length !== 1)
          ee.unshift(ce);
      }
      if (ee.length > 0) {
        const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
          if (coll.comment)
            coll.comment += "\n" + end.comment;
          else
            coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
      } else {
        coll.range = [fc.offset, cePos, cePos];
      }
      return coll;
    }
    exports2.resolveFlowCollection = resolveFlowCollection;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/compose-collection.js
var require_compose_collection = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/compose-collection.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveBlockMap = require_resolve_block_map();
    var resolveBlockSeq = require_resolve_block_seq();
    var resolveFlowCollection = require_resolve_flow_collection();
    function resolveCollection(CN, ctx, token, onError, tagName, tag) {
      const coll = token.type === "block-map" ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
      const Coll = coll.constructor;
      if (tagName === "!" || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
      }
      if (tagName)
        coll.tag = tagName;
      return coll;
    }
    function composeCollection(CN, ctx, token, props, onError) {
      const tagToken = props.tag;
      const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
      if (token.type === "block-seq") {
        const { anchor, newlineAfterProp: nl } = props;
        const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
        if (lastProp && (!nl || nl.offset < lastProp.offset)) {
          const message2 = "Missing newline after block sequence props";
          onError(lastProp, "MISSING_CHAR", message2);
        }
      }
      const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
      if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq") {
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
      let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
      if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt?.collection === expType) {
          ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
          tag = kt;
        } else {
          if (kt) {
            onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
          } else {
            onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
          }
          return resolveCollection(CN, ctx, token, onError, tagName);
        }
      }
      const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
      const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
      const node = identity.isNode(res) ? res : new Scalar.Scalar(res);
      node.range = coll.range;
      node.tag = tagName;
      if (tag?.format)
        node.format = tag.format;
      return node;
    }
    exports2.composeCollection = composeCollection;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/resolve-block-scalar.js
var require_resolve_block_scalar = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/resolve-block-scalar.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    function resolveBlockScalar(ctx, scalar, onError) {
      const start = scalar.offset;
      const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
      if (!header)
        return { value: "", type: null, comment: "", range: [start, start, start] };
      const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
      const lines = scalar.source ? splitLines(scalar.source) : [];
      let chompStart = lines.length;
      for (let i = lines.length - 1; i >= 0; --i) {
        const content = lines[i][1];
        if (content === "" || content === "\r")
          chompStart = i;
        else
          break;
      }
      if (chompStart === 0) {
        const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
        let end2 = start + header.length;
        if (scalar.source)
          end2 += scalar.source.length;
        return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
      }
      let trimIndent = scalar.indent + header.indent;
      let offset = scalar.offset + header.length;
      let contentStart = 0;
      for (let i = 0; i < chompStart; ++i) {
        const [indent, content] = lines[i];
        if (content === "" || content === "\r") {
          if (header.indent === 0 && indent.length > trimIndent)
            trimIndent = indent.length;
        } else {
          if (indent.length < trimIndent) {
            const message2 = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            onError(offset + indent.length, "MISSING_CHAR", message2);
          }
          if (header.indent === 0)
            trimIndent = indent.length;
          contentStart = i;
          if (trimIndent === 0 && !ctx.atRoot) {
            const message2 = "Block scalar values in collections must be indented";
            onError(offset, "BAD_INDENT", message2);
          }
          break;
        }
        offset += indent.length + content.length + 1;
      }
      for (let i = lines.length - 1; i >= chompStart; --i) {
        if (lines[i][0].length > trimIndent)
          chompStart = i + 1;
      }
      let value = "";
      let sep5 = "";
      let prevMoreIndented = false;
      for (let i = 0; i < contentStart; ++i)
        value += lines[i][0].slice(trimIndent) + "\n";
      for (let i = contentStart; i < chompStart; ++i) {
        let [indent, content] = lines[i];
        offset += indent.length + content.length + 1;
        const crlf = content[content.length - 1] === "\r";
        if (crlf)
          content = content.slice(0, -1);
        if (content && indent.length < trimIndent) {
          const src = header.indent ? "explicit indentation indicator" : "first line";
          const message2 = `Block scalar lines must not be less indented than their ${src}`;
          onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message2);
          indent = "";
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
          value += sep5 + indent.slice(trimIndent) + content;
          sep5 = "\n";
        } else if (indent.length > trimIndent || content[0] === "	") {
          if (sep5 === " ")
            sep5 = "\n";
          else if (!prevMoreIndented && sep5 === "\n")
            sep5 = "\n\n";
          value += sep5 + indent.slice(trimIndent) + content;
          sep5 = "\n";
          prevMoreIndented = true;
        } else if (content === "") {
          if (sep5 === "\n")
            value += "\n";
          else
            sep5 = "\n";
        } else {
          value += sep5 + content;
          sep5 = " ";
          prevMoreIndented = false;
        }
      }
      switch (header.chomp) {
        case "-":
          break;
        case "+":
          for (let i = chompStart; i < lines.length; ++i)
            value += "\n" + lines[i][0].slice(trimIndent);
          if (value[value.length - 1] !== "\n")
            value += "\n";
          break;
        default:
          value += "\n";
      }
      const end = start + header.length + scalar.source.length;
      return { value, type, comment: header.comment, range: [start, end, end] };
    }
    function parseBlockScalarHeader({ offset, props }, strict, onError) {
      if (props[0].type !== "block-scalar-header") {
        onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
        return null;
      }
      const { source } = props[0];
      const mode = source[0];
      let indent = 0;
      let chomp = "";
      let error = -1;
      for (let i = 1; i < source.length; ++i) {
        const ch = source[i];
        if (!chomp && (ch === "-" || ch === "+"))
          chomp = ch;
        else {
          const n = Number(ch);
          if (!indent && n)
            indent = n;
          else if (error === -1)
            error = offset + i;
        }
      }
      if (error !== -1)
        onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
      let hasSpace = false;
      let comment = "";
      let length = source.length;
      for (let i = 1; i < props.length; ++i) {
        const token = props[i];
        switch (token.type) {
          case "space":
            hasSpace = true;
          case "newline":
            length += token.source.length;
            break;
          case "comment":
            if (strict && !hasSpace) {
              const message2 = "Comments must be separated from other tokens by white space characters";
              onError(token, "MISSING_CHAR", message2);
            }
            length += token.source.length;
            comment = token.source.substring(1);
            break;
          case "error":
            onError(token, "UNEXPECTED_TOKEN", token.message);
            length += token.source.length;
            break;
          default: {
            const message2 = `Unexpected token in block scalar header: ${token.type}`;
            onError(token, "UNEXPECTED_TOKEN", message2);
            const ts = token.source;
            if (ts && typeof ts === "string")
              length += ts.length;
          }
        }
      }
      return { mode, indent, chomp, comment, length };
    }
    function splitLines(source) {
      const split = source.split(/\n( *)/);
      const first = split[0];
      const m = first.match(/^( *)/);
      const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
      const lines = [line0];
      for (let i = 1; i < split.length; i += 2)
        lines.push([split[i], split[i + 1]]);
      return lines;
    }
    exports2.resolveBlockScalar = resolveBlockScalar;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/resolve-flow-scalar.js
var require_resolve_flow_scalar = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/resolve-flow-scalar.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var resolveEnd = require_resolve_end();
    function resolveFlowScalar(scalar, strict, onError) {
      const { offset, type, source, end } = scalar;
      let _type;
      let value;
      const _onError = (rel, code2, msg) => onError(offset + rel, code2, msg);
      switch (type) {
        case "scalar":
          _type = Scalar.Scalar.PLAIN;
          value = plainValue(source, _onError);
          break;
        case "single-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_SINGLE;
          value = singleQuotedValue(source, _onError);
          break;
        case "double-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_DOUBLE;
          value = doubleQuotedValue(source, _onError);
          break;
        default:
          onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
          return {
            value: "",
            type: null,
            comment: "",
            range: [offset, offset + source.length, offset + source.length]
          };
      }
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
      return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
      };
    }
    function plainValue(source, onError) {
      let badChar = "";
      switch (source[0]) {
        case "	":
          badChar = "a tab character";
          break;
        case ",":
          badChar = "flow indicator character ,";
          break;
        case "%":
          badChar = "directive indicator character %";
          break;
        case "|":
        case ">": {
          badChar = `block scalar indicator ${source[0]}`;
          break;
        }
        case "@":
        case "`": {
          badChar = `reserved character ${source[0]}`;
          break;
        }
      }
      if (badChar)
        onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
      return unfoldLines(source);
    }
    function singleQuotedValue(source, onError) {
      if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
      return unfoldLines(source.slice(1, -1)).replace(/''/g, "'");
    }
    function unfoldLines(source) {
      const line = /(.*?)\r?\n/sy;
      let match = line.exec(source);
      if (!match)
        return source;
      let trimEnd, trimBoth;
      try {
        trimEnd = new RegExp("(?<![ 	])[ 	]+$");
        trimBoth = new RegExp("^[ 	]+|(?<![ 	])[ 	]+$", "g");
      } catch {
        trimEnd = /[ \t]+$/;
        trimBoth = /^[ \t]+|[ \t]+$/g;
      }
      let res = match[1].replace(trimEnd, "");
      let sep5 = " ";
      let pos = line.lastIndex;
      while (match = line.exec(source)) {
        const lm = match[1].replace(trimBoth, "");
        if (lm === "") {
          if (sep5 === "\n")
            res += sep5;
          else
            sep5 = "\n";
        } else {
          res += sep5 + lm;
          sep5 = " ";
        }
        pos = line.lastIndex;
      }
      const last = /[ \t]*(.*)/sy;
      last.lastIndex = pos;
      match = last.exec(source);
      return res + sep5 + (match?.[1] ?? "");
    }
    function doubleQuotedValue(source, onError) {
      let res = "";
      for (let i = 1; i < source.length - 1; ++i) {
        const ch = source[i];
        if (ch === "\r" && source[i + 1] === "\n")
          continue;
        if (ch === "\n") {
          const { fold, offset } = foldNewline(source, i);
          res += fold;
          i = offset;
        } else if (ch === "\\") {
          let next = source[++i];
          const cc = escapeCodes[next];
          if (cc)
            res += cc;
          else if (next === "\n") {
            next = source[i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "\r" && source[i + 1] === "\n") {
            next = source[++i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "x" || next === "u" || next === "U") {
            const length = next === "x" ? 2 : next === "u" ? 4 : 8;
            res += parseCharCode(source, i + 1, length, onError);
            i += length;
          } else {
            const raw = source.substr(i - 1, 2);
            onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
            res += raw;
          }
        } else if (ch === " " || ch === "	") {
          const wsStart = i;
          let next = source[i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
          if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
            res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        } else {
          res += ch;
        }
      }
      if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
      return res;
    }
    function foldNewline(source, offset) {
      let fold = "";
      let ch = source[offset + 1];
      while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[offset + 2] !== "\n")
          break;
        if (ch === "\n")
          fold += "\n";
        offset += 1;
        ch = source[offset + 1];
      }
      if (!fold)
        fold = " ";
      return { fold, offset };
    }
    var escapeCodes = {
      "0": "\0",
      // null character
      a: "\x07",
      // bell character
      b: "\b",
      // backspace
      e: "\x1B",
      // escape character
      f: "\f",
      // form feed
      n: "\n",
      // line feed
      r: "\r",
      // carriage return
      t: "	",
      // horizontal tab
      v: "\v",
      // vertical tab
      N: "\x85",
      // Unicode next line
      _: "\xA0",
      // Unicode non-breaking space
      L: "\u2028",
      // Unicode line separator
      P: "\u2029",
      // Unicode paragraph separator
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
    function parseCharCode(source, offset, length, onError) {
      const cc = source.substr(offset, length);
      const ok2 = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
      const code2 = ok2 ? parseInt(cc, 16) : NaN;
      try {
        return String.fromCodePoint(code2);
      } catch {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        return raw;
      }
    }
    exports2.resolveFlowScalar = resolveFlowScalar;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/compose-scalar.js
var require_compose_scalar = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/compose-scalar.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    function composeScalar(ctx, token, tagToken, onError) {
      const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(ctx, token, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
      const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
      let tag;
      if (ctx.options.stringKeys && ctx.atKey) {
        tag = ctx.schema[identity.SCALAR];
      } else if (tagName)
        tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
      else if (token.type === "scalar")
        tag = findScalarTagByTest(ctx, value, token, onError);
      else
        tag = ctx.schema[identity.SCALAR];
      let scalar;
      try {
        const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
        scalar = identity.isScalar(res) ? res : new Scalar.Scalar(res);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
        scalar = new Scalar.Scalar(value);
      }
      scalar.range = range;
      scalar.source = value;
      if (type)
        scalar.type = type;
      if (tagName)
        scalar.tag = tagName;
      if (tag.format)
        scalar.format = tag.format;
      if (comment)
        scalar.comment = comment;
      return scalar;
    }
    function findScalarTagByName(schema, value, tagName, tagToken, onError) {
      if (tagName === "!")
        return schema[identity.SCALAR];
      const matchWithTest = [];
      for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
          if (tag.default && tag.test)
            matchWithTest.push(tag);
          else
            return tag;
        }
      }
      for (const tag of matchWithTest)
        if (tag.test?.test(value))
          return tag;
      const kt = schema.knownTags[tagName];
      if (kt && !kt.collection) {
        schema.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
        return kt;
      }
      onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
      return schema[identity.SCALAR];
    }
    function findScalarTagByTest({ atKey, directives, schema }, value, token, onError) {
      const tag = schema.tags.find((tag2) => (tag2.default === true || atKey && tag2.default === "key") && tag2.test?.test(value)) || schema[identity.SCALAR];
      if (schema.compat) {
        const compat = schema.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema[identity.SCALAR];
        if (tag.tag !== compat.tag) {
          const ts = directives.tagString(tag.tag);
          const cs = directives.tagString(compat.tag);
          const msg = `Value may be parsed as either ${ts} or ${cs}`;
          onError(token, "TAG_RESOLVE_FAILED", msg, true);
        }
      }
      return tag;
    }
    exports2.composeScalar = composeScalar;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/util-empty-scalar-position.js
var require_util_empty_scalar_position = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/util-empty-scalar-position.js"(exports2) {
    "use strict";
    function emptyScalarPosition(offset, before, pos) {
      if (before) {
        pos ?? (pos = before.length);
        for (let i = pos - 1; i >= 0; --i) {
          let st = before[i];
          switch (st.type) {
            case "space":
            case "comment":
            case "newline":
              offset -= st.source.length;
              continue;
          }
          st = before[++i];
          while (st?.type === "space") {
            offset += st.source.length;
            st = before[++i];
          }
          break;
        }
      }
      return offset;
    }
    exports2.emptyScalarPosition = emptyScalarPosition;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/compose-node.js
var require_compose_node = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/compose-node.js"(exports2) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var composeCollection = require_compose_collection();
    var composeScalar = require_compose_scalar();
    var resolveEnd = require_resolve_end();
    var utilEmptyScalarPosition = require_util_empty_scalar_position();
    var CN = { composeNode, composeEmptyNode };
    function composeNode(ctx, token, props, onError) {
      const atKey = ctx.atKey;
      const { spaceBefore, comment, anchor, tag } = props;
      let node;
      let isSrcToken = true;
      switch (token.type) {
        case "alias":
          node = composeAlias(ctx, token, onError);
          if (anchor || tag)
            onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
          break;
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "block-scalar":
          node = composeScalar.composeScalar(ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        case "block-map":
        case "block-seq":
        case "flow-collection":
          try {
            node = composeCollection.composeCollection(CN, ctx, token, props, onError);
            if (anchor)
              node.anchor = anchor.source.substring(1);
          } catch (error) {
            const message2 = error instanceof Error ? error.message : String(error);
            onError(token, "RESOURCE_EXHAUSTION", message2);
          }
          break;
        default: {
          const message2 = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
          onError(token, "UNEXPECTED_TOKEN", message2);
          isSrcToken = false;
        }
      }
      node ?? (node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError));
      if (anchor && node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      if (atKey && ctx.options.stringKeys && (!identity.isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
        const msg = "With stringKeys, all keys must be strings";
        onError(tag ?? token, "NON_STRING_KEY", msg);
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        if (token.type === "scalar" && token.source === "")
          node.comment = comment;
        else
          node.commentBefore = comment;
      }
      if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
      return node;
    }
    function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
      const token = {
        type: "scalar",
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ""
      };
      const node = composeScalar.composeScalar(ctx, token, tag, onError);
      if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === "")
          onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        node.comment = comment;
        node.range[2] = end;
      }
      return node;
    }
    function composeAlias({ options: options2 }, { offset, source, end }, onError) {
      const alias = new Alias.Alias(source.substring(1));
      if (alias.source === "")
        onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
      if (alias.source.endsWith(":"))
        onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, options2.strict, onError);
      alias.range = [offset, valueEnd, re.offset];
      if (re.comment)
        alias.comment = re.comment;
      return alias;
    }
    exports2.composeEmptyNode = composeEmptyNode;
    exports2.composeNode = composeNode;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/compose-doc.js
var require_compose_doc = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/compose-doc.js"(exports2) {
    "use strict";
    var Document = require_Document();
    var composeNode = require_compose_node();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    function composeDoc(options2, directives, { offset, start, value, end }, onError) {
      const opts = Object.assign({ _directives: directives }, options2);
      const doc = new Document.Document(void 0, opts);
      const ctx = {
        atKey: false,
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
      };
      const props = resolveProps.resolveProps(start, {
        indicator: "doc-start",
        next: value ?? end?.[0],
        offset,
        onError,
        parentIndent: 0,
        startOnNewline: true
      });
      if (props.found) {
        doc.directives.docStart = true;
        if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
          onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
      }
      doc.contents = value ? composeNode.composeNode(ctx, value, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
      const contentEnd = doc.contents.range[2];
      const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
      if (re.comment)
        doc.comment = re.comment;
      doc.range = [offset, contentEnd, re.offset];
      return doc;
    }
    exports2.composeDoc = composeDoc;
  }
});

// ../praxis-ba/node_modules/yaml/dist/compose/composer.js
var require_composer = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/compose/composer.js"(exports2) {
    "use strict";
    var node_process = __require("process");
    var directives = require_directives();
    var Document = require_Document();
    var errors = require_errors();
    var identity = require_identity();
    var composeDoc = require_compose_doc();
    var resolveEnd = require_resolve_end();
    function getErrorPos(src) {
      if (typeof src === "number")
        return [src, src + 1];
      if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
      const { offset, source } = src;
      return [offset, offset + (typeof source === "string" ? source.length : 1)];
    }
    function parsePrelude(prelude) {
      let comment = "";
      let atComment = false;
      let afterEmptyLine = false;
      for (let i = 0; i < prelude.length; ++i) {
        const source = prelude[i];
        switch (source[0]) {
          case "#":
            comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
            atComment = true;
            afterEmptyLine = false;
            break;
          case "%":
            if (prelude[i + 1]?.[0] !== "#")
              i += 1;
            atComment = false;
            break;
          default:
            if (!atComment)
              afterEmptyLine = true;
            atComment = false;
        }
      }
      return { comment, afterEmptyLine };
    }
    var Composer = class {
      constructor(options2 = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code2, message2, warning) => {
          const pos = getErrorPos(source);
          if (warning)
            this.warnings.push(new errors.YAMLWarning(pos, code2, message2));
          else
            this.errors.push(new errors.YAMLParseError(pos, code2, message2));
        };
        this.directives = new directives.Directives({ version: options2.version || "1.2" });
        this.options = options2;
      }
      decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        if (comment) {
          const dc = doc.contents;
          if (afterDoc) {
            doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
          } else if (afterEmptyLine || doc.directives.docStart || !dc) {
            doc.commentBefore = comment;
          } else if (identity.isCollection(dc) && !dc.flow && dc.items.length > 0) {
            let it = dc.items[0];
            if (identity.isPair(it))
              it = it.key;
            const cb = it.commentBefore;
            it.commentBefore = cb ? `${comment}
${cb}` : comment;
          } else {
            const cb = dc.commentBefore;
            dc.commentBefore = cb ? `${comment}
${cb}` : comment;
          }
        }
        if (afterDoc) {
          for (let i = 0; i < this.errors.length; ++i)
            doc.errors.push(this.errors[i]);
          for (let i = 0; i < this.warnings.length; ++i)
            doc.warnings.push(this.warnings[i]);
        } else {
          doc.errors = this.errors;
          doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
      }
      /**
       * Current stream status information.
       *
       * Mostly useful at the end of input for an empty stream.
       */
      streamInfo() {
        return {
          comment: parsePrelude(this.prelude).comment,
          directives: this.directives,
          errors: this.errors,
          warnings: this.warnings
        };
      }
      /**
       * Compose tokens into documents.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
          yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
      }
      /** Advance the composer by one CST token. */
      *next(token) {
        if (node_process.env.LOG_STREAM)
          console.dir(token, { depth: null });
        switch (token.type) {
          case "directive":
            this.directives.add(token.source, (offset, message2, warning) => {
              const pos = getErrorPos(token);
              pos[0] += offset;
              this.onError(pos, "BAD_DIRECTIVE", message2, warning);
            });
            this.prelude.push(token.source);
            this.atDirectives = true;
            break;
          case "document": {
            const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
            if (this.atDirectives && !doc.directives.docStart)
              this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
            this.decorate(doc, false);
            if (this.doc)
              yield this.doc;
            this.doc = doc;
            this.atDirectives = false;
            break;
          }
          case "byte-order-mark":
          case "space":
            break;
          case "comment":
          case "newline":
            this.prelude.push(token.source);
            break;
          case "error": {
            const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
            const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
            if (this.atDirectives || !this.doc)
              this.errors.push(error);
            else
              this.doc.errors.push(error);
            break;
          }
          case "doc-end": {
            if (!this.doc) {
              const msg = "Unexpected doc-end without preceding document";
              this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
              break;
            }
            this.doc.directives.docEnd = true;
            const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
            this.decorate(this.doc, true);
            if (end.comment) {
              const dc = this.doc.comment;
              this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
            }
            this.doc.range[2] = end.offset;
            break;
          }
          default:
            this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
        }
      }
      /**
       * Call at end of input to yield any remaining document.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
          this.decorate(this.doc, true);
          yield this.doc;
          this.doc = null;
        } else if (forceDoc) {
          const opts = Object.assign({ _directives: this.directives }, this.options);
          const doc = new Document.Document(void 0, opts);
          if (this.atDirectives)
            this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
          doc.range = [0, endOffset, endOffset];
          this.decorate(doc, false);
          yield doc;
        }
      }
    };
    exports2.Composer = Composer;
  }
});

// ../praxis-ba/node_modules/yaml/dist/parse/cst-scalar.js
var require_cst_scalar = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/parse/cst-scalar.js"(exports2) {
    "use strict";
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    var errors = require_errors();
    var stringifyString = require_stringifyString();
    function resolveAsScalar(token, strict = true, onError) {
      if (token) {
        const _onError = (pos, code2, message2) => {
          const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
          if (onError)
            onError(offset, code2, message2);
          else
            throw new errors.YAMLParseError([offset, offset + 1], code2, message2);
        };
        switch (token.type) {
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
          case "block-scalar":
            return resolveBlockScalar.resolveBlockScalar({ options: { strict } }, token, _onError);
        }
      }
      return null;
    }
    function createScalarToken(value, context) {
      const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey,
        indent: indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      const end = context.end ?? [
        { type: "newline", offset: -1, indent, source: "\n" }
      ];
      switch (source[0]) {
        case "|":
        case ">": {
          const he = source.indexOf("\n");
          const head = source.substring(0, he);
          const body = source.substring(he + 1) + "\n";
          const props = [
            { type: "block-scalar-header", offset, indent, source: head }
          ];
          if (!addEndtoBlockProps(props, end))
            props.push({ type: "newline", offset: -1, indent, source: "\n" });
          return { type: "block-scalar", offset, indent, props, source: body };
        }
        case '"':
          return { type: "double-quoted-scalar", offset, indent, source, end };
        case "'":
          return { type: "single-quoted-scalar", offset, indent, source, end };
        default:
          return { type: "scalar", offset, indent, source, end };
      }
    }
    function setScalarValue(token, value, context = {}) {
      let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
      let indent = "indent" in token ? token.indent : null;
      if (afterKey && typeof indent === "number")
        indent += 2;
      if (!type)
        switch (token.type) {
          case "single-quoted-scalar":
            type = "QUOTE_SINGLE";
            break;
          case "double-quoted-scalar":
            type = "QUOTE_DOUBLE";
            break;
          case "block-scalar": {
            const header = token.props[0];
            if (header.type !== "block-scalar-header")
              throw new Error("Invalid block scalar header");
            type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
            break;
          }
          default:
            type = "PLAIN";
        }
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      switch (source[0]) {
        case "|":
        case ">":
          setBlockScalarValue(token, source);
          break;
        case '"':
          setFlowScalarValue(token, source, "double-quoted-scalar");
          break;
        case "'":
          setFlowScalarValue(token, source, "single-quoted-scalar");
          break;
        default:
          setFlowScalarValue(token, source, "scalar");
      }
    }
    function setBlockScalarValue(token, source) {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body = source.substring(he + 1) + "\n";
      if (token.type === "block-scalar") {
        const header = token.props[0];
        if (header.type !== "block-scalar-header")
          throw new Error("Invalid block scalar header");
        header.source = head;
        token.source = body;
      } else {
        const { offset } = token;
        const indent = "indent" in token ? token.indent : -1;
        const props = [
          { type: "block-scalar-header", offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
          props.push({ type: "newline", offset: -1, indent, source: "\n" });
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset")
            delete token[key];
        Object.assign(token, { type: "block-scalar", indent, props, source: body });
      }
    }
    function addEndtoBlockProps(props, end) {
      if (end)
        for (const st of end)
          switch (st.type) {
            case "space":
            case "comment":
              props.push(st);
              break;
            case "newline":
              props.push(st);
              return true;
          }
      return false;
    }
    function setFlowScalarValue(token, source, type) {
      switch (token.type) {
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          token.type = type;
          token.source = source;
          break;
        case "block-scalar": {
          const end = token.props.slice(1);
          let oa = source.length;
          if (token.props[0].type === "block-scalar-header")
            oa -= token.props[0].source.length;
          for (const tok of end)
            tok.offset += oa;
          delete token.props;
          Object.assign(token, { type, source, end });
          break;
        }
        case "block-map":
        case "block-seq": {
          const offset = token.offset + source.length;
          const nl = { type: "newline", offset, indent: token.indent, source: "\n" };
          delete token.items;
          Object.assign(token, { type, source, end: [nl] });
          break;
        }
        default: {
          const indent = "indent" in token ? token.indent : -1;
          const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
          for (const key of Object.keys(token))
            if (key !== "type" && key !== "offset")
              delete token[key];
          Object.assign(token, { type, indent, source, end });
        }
      }
    }
    exports2.createScalarToken = createScalarToken;
    exports2.resolveAsScalar = resolveAsScalar;
    exports2.setScalarValue = setScalarValue;
  }
});

// ../praxis-ba/node_modules/yaml/dist/parse/cst-stringify.js
var require_cst_stringify = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/parse/cst-stringify.js"(exports2) {
    "use strict";
    var stringify2 = (cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
    function stringifyToken(token) {
      switch (token.type) {
        case "block-scalar": {
          let res = "";
          for (const tok of token.props)
            res += stringifyToken(tok);
          return res + token.source;
        }
        case "block-map":
        case "block-seq": {
          let res = "";
          for (const item of token.items)
            res += stringifyItem(item);
          return res;
        }
        case "flow-collection": {
          let res = token.start.source;
          for (const item of token.items)
            res += stringifyItem(item);
          for (const st of token.end)
            res += st.source;
          return res;
        }
        case "document": {
          let res = stringifyItem(token);
          if (token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
        default: {
          let res = token.source;
          if ("end" in token && token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
      }
    }
    function stringifyItem({ start, key, sep: sep5, value }) {
      let res = "";
      for (const st of start)
        res += st.source;
      if (key)
        res += stringifyToken(key);
      if (sep5)
        for (const st of sep5)
          res += st.source;
      if (value)
        res += stringifyToken(value);
      return res;
    }
    exports2.stringify = stringify2;
  }
});

// ../praxis-ba/node_modules/yaml/dist/parse/cst-visit.js
var require_cst_visit = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/parse/cst-visit.js"(exports2) {
    "use strict";
    var BREAK = Symbol("break visit");
    var SKIP = Symbol("skip children");
    var REMOVE = Symbol("remove item");
    function visit(cst, visitor) {
      if ("type" in cst && cst.type === "document")
        cst = { start: cst.start, value: cst.value };
      _visit(Object.freeze([]), cst, visitor);
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    visit.itemAtPath = (cst, path) => {
      let item = cst;
      for (const [field, index] of path) {
        const tok = item?.[field];
        if (tok && "items" in tok) {
          item = tok.items[index];
        } else
          return void 0;
      }
      return item;
    };
    visit.parentCollection = (cst, path) => {
      const parent = visit.itemAtPath(cst, path.slice(0, -1));
      const field = path[path.length - 1][0];
      const coll = parent?.[field];
      if (coll && "items" in coll)
        return coll;
      throw new Error("Parent collection not found");
    };
    function _visit(path, item, visitor) {
      let ctrl = visitor(item, path);
      if (typeof ctrl === "symbol")
        return ctrl;
      for (const field of ["key", "value"]) {
        const token = item[field];
        if (token && "items" in token) {
          for (let i = 0; i < token.items.length; ++i) {
            const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              token.items.splice(i, 1);
              i -= 1;
            }
          }
          if (typeof ctrl === "function" && field === "key")
            ctrl = ctrl(item, path);
        }
      }
      return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
    }
    exports2.visit = visit;
  }
});

// ../praxis-ba/node_modules/yaml/dist/parse/cst.js
var require_cst = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/parse/cst.js"(exports2) {
    "use strict";
    var cstScalar = require_cst_scalar();
    var cstStringify = require_cst_stringify();
    var cstVisit = require_cst_visit();
    var BOM = "\uFEFF";
    var DOCUMENT = "";
    var FLOW_END = "";
    var SCALAR = "";
    var isCollection = (token) => !!token && "items" in token;
    var isScalar = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
    function prettyToken(token) {
      switch (token) {
        case BOM:
          return "<BOM>";
        case DOCUMENT:
          return "<DOC>";
        case FLOW_END:
          return "<FLOW_END>";
        case SCALAR:
          return "<SCALAR>";
        default:
          return JSON.stringify(token);
      }
    }
    function tokenType(source) {
      switch (source) {
        case BOM:
          return "byte-order-mark";
        case DOCUMENT:
          return "doc-mode";
        case FLOW_END:
          return "flow-error-end";
        case SCALAR:
          return "scalar";
        case "---":
          return "doc-start";
        case "...":
          return "doc-end";
        case "":
        case "\n":
        case "\r\n":
          return "newline";
        case "-":
          return "seq-item-ind";
        case "?":
          return "explicit-key-ind";
        case ":":
          return "map-value-ind";
        case "{":
          return "flow-map-start";
        case "}":
          return "flow-map-end";
        case "[":
          return "flow-seq-start";
        case "]":
          return "flow-seq-end";
        case ",":
          return "comma";
      }
      switch (source[0]) {
        case " ":
        case "	":
          return "space";
        case "#":
          return "comment";
        case "%":
          return "directive-line";
        case "*":
          return "alias";
        case "&":
          return "anchor";
        case "!":
          return "tag";
        case "'":
          return "single-quoted-scalar";
        case '"':
          return "double-quoted-scalar";
        case "|":
        case ">":
          return "block-scalar-header";
      }
      return null;
    }
    exports2.createScalarToken = cstScalar.createScalarToken;
    exports2.resolveAsScalar = cstScalar.resolveAsScalar;
    exports2.setScalarValue = cstScalar.setScalarValue;
    exports2.stringify = cstStringify.stringify;
    exports2.visit = cstVisit.visit;
    exports2.BOM = BOM;
    exports2.DOCUMENT = DOCUMENT;
    exports2.FLOW_END = FLOW_END;
    exports2.SCALAR = SCALAR;
    exports2.isCollection = isCollection;
    exports2.isScalar = isScalar;
    exports2.prettyToken = prettyToken;
    exports2.tokenType = tokenType;
  }
});

// ../praxis-ba/node_modules/yaml/dist/parse/lexer.js
var require_lexer = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/parse/lexer.js"(exports2) {
    "use strict";
    var cst = require_cst();
    function isEmpty(ch) {
      switch (ch) {
        case void 0:
        case " ":
        case "\n":
        case "\r":
        case "	":
          return true;
        default:
          return false;
      }
    }
    var hexDigits = new Set("0123456789ABCDEFabcdef");
    var tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
    var flowIndicatorChars = new Set(",[]{}");
    var invalidAnchorChars = new Set(" ,[]{}\n\r	");
    var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
    var Lexer = class {
      constructor() {
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      /**
       * Generate YAML tokens from the `source` string. If `incomplete`,
       * a part of the last line may be left as a buffer for the next call.
       *
       * @returns A generator of lexical tokens
       */
      *lex(source, incomplete = false) {
        if (source) {
          if (typeof source !== "string")
            throw TypeError("source is not a string");
          this.buffer = this.buffer ? this.buffer + source : source;
          this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? "stream";
        while (next && (incomplete || this.hasChars(1)))
          next = yield* this.parseNext(next);
      }
      atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === " " || ch === "	")
          ch = this.buffer[++i];
        if (!ch || ch === "#" || ch === "\n")
          return true;
        if (ch === "\r")
          return this.buffer[i + 1] === "\n";
        return false;
      }
      charAt(n) {
        return this.buffer[this.pos + n];
      }
      continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
          let indent = 0;
          while (ch === " ")
            ch = this.buffer[++indent + offset];
          if (ch === "\r") {
            const next = this.buffer[indent + offset + 1];
            if (next === "\n" || !next && !this.atEnd)
              return offset + indent + 1;
          }
          return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
        }
        if (ch === "-" || ch === ".") {
          const dt = this.buffer.substr(offset, 3);
          if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
            return -1;
        }
        return offset;
      }
      getLine() {
        let end = this.lineEndPos;
        if (typeof end !== "number" || end !== -1 && end < this.pos) {
          end = this.buffer.indexOf("\n", this.pos);
          this.lineEndPos = end;
        }
        if (end === -1)
          return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === "\r")
          end -= 1;
        return this.buffer.substring(this.pos, end);
      }
      hasChars(n) {
        return this.pos + n <= this.buffer.length;
      }
      setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
      }
      peek(n) {
        return this.buffer.substr(this.pos, n);
      }
      *parseNext(next) {
        switch (next) {
          case "stream":
            return yield* this.parseStream();
          case "line-start":
            return yield* this.parseLineStart();
          case "block-start":
            return yield* this.parseBlockStart();
          case "doc":
            return yield* this.parseDocument();
          case "flow":
            return yield* this.parseFlowCollection();
          case "quoted-scalar":
            return yield* this.parseQuotedScalar();
          case "block-scalar":
            return yield* this.parseBlockScalar();
          case "plain-scalar":
            return yield* this.parsePlainScalar();
        }
      }
      *parseStream() {
        let line = this.getLine();
        if (line === null)
          return this.setNext("stream");
        if (line[0] === cst.BOM) {
          yield* this.pushCount(1);
          line = line.substring(1);
        }
        if (line[0] === "%") {
          let dirEnd = line.length;
          let cs = line.indexOf("#");
          while (cs !== -1) {
            const ch = line[cs - 1];
            if (ch === " " || ch === "	") {
              dirEnd = cs - 1;
              break;
            } else {
              cs = line.indexOf("#", cs + 1);
            }
          }
          while (true) {
            const ch = line[dirEnd - 1];
            if (ch === " " || ch === "	")
              dirEnd -= 1;
            else
              break;
          }
          const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
          yield* this.pushCount(line.length - n);
          this.pushNewline();
          return "stream";
        }
        if (this.atLineEnd()) {
          const sp = yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - sp);
          yield* this.pushNewline();
          return "stream";
        }
        yield cst.DOCUMENT;
        return yield* this.parseLineStart();
      }
      *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
          return this.setNext("line-start");
        if (ch === "-" || ch === ".") {
          if (!this.atEnd && !this.hasChars(4))
            return this.setNext("line-start");
          const s = this.peek(3);
          if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            this.indentValue = 0;
            this.indentNext = 0;
            return s === "---" ? "doc" : "stream";
          }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
          this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
      }
      *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
          return this.setNext("block-start");
        if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
          const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
          this.indentNext = this.indentValue + 1;
          this.indentValue += n;
          return "block-start";
        }
        return "doc";
      }
      *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
          return this.setNext("doc");
        let n = yield* this.pushIndicators();
        switch (line[n]) {
          case "#":
            yield* this.pushCount(line.length - n);
          case void 0:
            yield* this.pushNewline();
            return yield* this.parseLineStart();
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel = 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            return "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "doc";
          case '"':
          case "'":
            return yield* this.parseQuotedScalar();
          case "|":
          case ">":
            n += yield* this.parseBlockScalarHeader();
            n += yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - n);
            yield* this.pushNewline();
            return yield* this.parseBlockScalar();
          default:
            return yield* this.parsePlainScalar();
        }
      }
      *parseFlowCollection() {
        let nl, sp;
        let indent = -1;
        do {
          nl = yield* this.pushNewline();
          if (nl > 0) {
            sp = yield* this.pushSpaces(false);
            this.indentValue = indent = sp;
          } else {
            sp = 0;
          }
          sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
          return this.setNext("flow");
        if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
          const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
          if (!atFlowEndMarker) {
            this.flowLevel = 0;
            yield cst.FLOW_END;
            return yield* this.parseLineStart();
          }
        }
        let n = 0;
        while (line[n] === ",") {
          n += yield* this.pushCount(1);
          n += yield* this.pushSpaces(true);
          this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
          case void 0:
            return "flow";
          case "#":
            yield* this.pushCount(line.length - n);
            return "flow";
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel += 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            this.flowKey = true;
            this.flowLevel -= 1;
            return this.flowLevel ? "flow" : "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "flow";
          case '"':
          case "'":
            this.flowKey = true;
            return yield* this.parseQuotedScalar();
          case ":": {
            const next = this.charAt(1);
            if (this.flowKey || isEmpty(next) || next === ",") {
              this.flowKey = false;
              yield* this.pushCount(1);
              yield* this.pushSpaces(true);
              return "flow";
            }
          }
          default:
            this.flowKey = false;
            return yield* this.parsePlainScalar();
        }
      }
      *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
          while (end !== -1 && this.buffer[end + 1] === "'")
            end = this.buffer.indexOf("'", end + 2);
        } else {
          while (end !== -1) {
            let n = 0;
            while (this.buffer[end - 1 - n] === "\\")
              n += 1;
            if (n % 2 === 0)
              break;
            end = this.buffer.indexOf('"', end + 1);
          }
        }
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf("\n", this.pos);
        if (nl !== -1) {
          while (nl !== -1) {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = qb.indexOf("\n", cs);
          }
          if (nl !== -1) {
            end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
          }
        }
        if (end === -1) {
          if (!this.atEnd)
            return this.setNext("quoted-scalar");
          end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? "flow" : "doc";
      }
      *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
          const ch = this.buffer[++i];
          if (ch === "+")
            this.blockScalarKeep = true;
          else if (ch > "0" && ch <= "9")
            this.blockScalarIndent = Number(ch) - 1;
          else if (ch !== "-")
            break;
        }
        return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
      }
      *parseBlockScalar() {
        let nl = this.pos - 1;
        let indent = 0;
        let ch;
        loop: for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
          switch (ch) {
            case " ":
              indent += 1;
              break;
            case "\n":
              nl = i2;
              indent = 0;
              break;
            case "\r": {
              const next = this.buffer[i2 + 1];
              if (!next && !this.atEnd)
                return this.setNext("block-scalar");
              if (next === "\n")
                break;
            }
            default:
              break loop;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("block-scalar");
        if (indent >= this.indentNext) {
          if (this.blockScalarIndent === -1)
            this.indentNext = indent;
          else {
            this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
          }
          do {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = this.buffer.indexOf("\n", cs);
          } while (nl !== -1);
          if (nl === -1) {
            if (!this.atEnd)
              return this.setNext("block-scalar");
            nl = this.buffer.length;
          }
        }
        let i = nl + 1;
        ch = this.buffer[i];
        while (ch === " ")
          ch = this.buffer[++i];
        if (ch === "	") {
          while (ch === "	" || ch === " " || ch === "\r" || ch === "\n")
            ch = this.buffer[++i];
          nl = i - 1;
        } else if (!this.blockScalarKeep) {
          do {
            let i2 = nl - 1;
            let ch2 = this.buffer[i2];
            if (ch2 === "\r")
              ch2 = this.buffer[--i2];
            const lastChar = i2;
            while (ch2 === " ")
              ch2 = this.buffer[--i2];
            if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent > lastChar)
              nl = i2;
            else
              break;
          } while (true);
        }
        yield cst.SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
      }
      *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while (ch = this.buffer[++i]) {
          if (ch === ":") {
            const next = this.buffer[i + 1];
            if (isEmpty(next) || inFlow && flowIndicatorChars.has(next))
              break;
            end = i;
          } else if (isEmpty(ch)) {
            let next = this.buffer[i + 1];
            if (ch === "\r") {
              if (next === "\n") {
                i += 1;
                ch = "\n";
                next = this.buffer[i + 1];
              } else
                end = i;
            }
            if (next === "#" || inFlow && flowIndicatorChars.has(next))
              break;
            if (ch === "\n") {
              const cs = this.continueScalar(i + 1);
              if (cs === -1)
                break;
              i = Math.max(i, cs - 2);
            }
          } else {
            if (inFlow && flowIndicatorChars.has(ch))
              break;
            end = i;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("plain-scalar");
        yield cst.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? "flow" : "doc";
      }
      *pushCount(n) {
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos += n;
          return n;
        }
        return 0;
      }
      *pushToIndex(i, allowEmpty) {
        const s = this.buffer.slice(this.pos, i);
        if (s) {
          yield s;
          this.pos += s.length;
          return s.length;
        } else if (allowEmpty)
          yield "";
        return 0;
      }
      *pushIndicators() {
        let n = 0;
        loop: while (true) {
          switch (this.charAt(0)) {
            case "!":
              n += yield* this.pushTag();
              n += yield* this.pushSpaces(true);
              continue loop;
            case "&":
              n += yield* this.pushUntil(isNotAnchorChar);
              n += yield* this.pushSpaces(true);
              continue loop;
            case "-":
            case "?":
            case ":": {
              const inFlow = this.flowLevel > 0;
              const ch1 = this.charAt(1);
              if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
                if (!inFlow)
                  this.indentNext = this.indentValue + 1;
                else if (this.flowKey)
                  this.flowKey = false;
                n += yield* this.pushCount(1);
                n += yield* this.pushSpaces(true);
                continue loop;
              }
            }
          }
          break loop;
        }
        return n;
      }
      *pushTag() {
        if (this.charAt(1) === "<") {
          let i = this.pos + 2;
          let ch = this.buffer[i];
          while (!isEmpty(ch) && ch !== ">")
            ch = this.buffer[++i];
          return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
        } else {
          let i = this.pos + 1;
          let ch = this.buffer[i];
          while (ch) {
            if (tagChars.has(ch))
              ch = this.buffer[++i];
            else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
              ch = this.buffer[i += 3];
            } else
              break;
          }
          return yield* this.pushToIndex(i, false);
        }
      }
      *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === "\n")
          return yield* this.pushCount(1);
        else if (ch === "\r" && this.charAt(1) === "\n")
          return yield* this.pushCount(2);
        else
          return 0;
      }
      *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
          ch = this.buffer[++i];
        } while (ch === " " || allowTabs && ch === "	");
        const n = i - this.pos;
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos = i;
        }
        return n;
      }
      *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch))
          ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
      }
    };
    exports2.Lexer = Lexer;
  }
});

// ../praxis-ba/node_modules/yaml/dist/parse/line-counter.js
var require_line_counter = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/parse/line-counter.js"(exports2) {
    "use strict";
    var LineCounter = class {
      constructor() {
        this.lineStarts = [];
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        this.linePos = (offset) => {
          let low = 0;
          let high = this.lineStarts.length;
          while (low < high) {
            const mid = low + high >> 1;
            if (this.lineStarts[mid] < offset)
              low = mid + 1;
            else
              high = mid;
          }
          if (this.lineStarts[low] === offset)
            return { line: low + 1, col: 1 };
          if (low === 0)
            return { line: 0, col: offset };
          const start = this.lineStarts[low - 1];
          return { line: low, col: offset - start + 1 };
        };
      }
    };
    exports2.LineCounter = LineCounter;
  }
});

// ../praxis-ba/node_modules/yaml/dist/parse/parser.js
var require_parser = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/parse/parser.js"(exports2) {
    "use strict";
    var node_process = __require("process");
    var cst = require_cst();
    var lexer = require_lexer();
    function includesToken(list, type) {
      for (let i = 0; i < list.length; ++i)
        if (list[i].type === type)
          return true;
      return false;
    }
    function findNonEmptyIndex(list) {
      for (let i = 0; i < list.length; ++i) {
        switch (list[i].type) {
          case "space":
          case "comment":
          case "newline":
            break;
          default:
            return i;
        }
      }
      return -1;
    }
    function isFlowToken(token) {
      switch (token?.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "flow-collection":
          return true;
        default:
          return false;
      }
    }
    function getPrevProps(parent) {
      switch (parent.type) {
        case "document":
          return parent.start;
        case "block-map": {
          const it = parent.items[parent.items.length - 1];
          return it.sep ?? it.start;
        }
        case "block-seq":
          return parent.items[parent.items.length - 1].start;
        default:
          return [];
      }
    }
    function getFirstKeyStartProps(prev) {
      if (prev.length === 0)
        return [];
      let i = prev.length;
      loop: while (--i >= 0) {
        switch (prev[i].type) {
          case "doc-start":
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
          case "newline":
            break loop;
        }
      }
      while (prev[++i]?.type === "space") {
      }
      return prev.splice(i, prev.length);
    }
    function arrayPushArray(target, source) {
      if (source.length < 1e5)
        Array.prototype.push.apply(target, source);
      else
        for (let i = 0; i < source.length; ++i)
          target.push(source[i]);
    }
    function fixFlowSeqItems(fc) {
      if (fc.start.type === "flow-seq-start") {
        for (const it of fc.items) {
          if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
            if (it.key)
              it.value = it.key;
            delete it.key;
            if (isFlowToken(it.value)) {
              if (it.value.end)
                arrayPushArray(it.value.end, it.sep);
              else
                it.value.end = it.sep;
            } else
              arrayPushArray(it.start, it.sep);
            delete it.sep;
          }
        }
      }
    }
    var Parser = class {
      /**
       * @param onNewLine - If defined, called separately with the start position of
       *   each new line (in `parse()`, including the start of input).
       */
      constructor(onNewLine) {
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
      }
      /**
       * Parse `source` as a YAML stream.
       * If `incomplete`, a part of the last line may be left as a buffer for the next call.
       *
       * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
       *
       * @returns A generator of tokens representing each directive, document, and other structure.
       */
      *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
          this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
          yield* this.next(lexeme);
        if (!incomplete)
          yield* this.end();
      }
      /**
       * Advance the parser by the `source` of one lexical token.
       */
      *next(source) {
        this.source = source;
        if (node_process.env.LOG_TOKENS)
          console.log("|", cst.prettyToken(source));
        if (this.atScalar) {
          this.atScalar = false;
          yield* this.step();
          this.offset += source.length;
          return;
        }
        const type = cst.tokenType(source);
        if (!type) {
          const message2 = `Not a YAML token: ${source}`;
          yield* this.pop({ type: "error", offset: this.offset, message: message2, source });
          this.offset += source.length;
        } else if (type === "scalar") {
          this.atNewLine = false;
          this.atScalar = true;
          this.type = "scalar";
        } else {
          this.type = type;
          yield* this.step();
          switch (type) {
            case "newline":
              this.atNewLine = true;
              this.indent = 0;
              if (this.onNewLine)
                this.onNewLine(this.offset + source.length);
              break;
            case "space":
              if (this.atNewLine && source[0] === " ")
                this.indent += source.length;
              break;
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
              if (this.atNewLine)
                this.indent += source.length;
              break;
            case "doc-mode":
            case "flow-error-end":
              return;
            default:
              this.atNewLine = false;
          }
          this.offset += source.length;
        }
      }
      /** Call at end of input to push out any remaining constructions */
      *end() {
        while (this.stack.length > 0)
          yield* this.pop();
      }
      get sourceToken() {
        const st = {
          type: this.type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
        return st;
      }
      *step() {
        const top = this.peek(1);
        if (this.type === "doc-end" && top?.type !== "doc-end") {
          while (this.stack.length > 0)
            yield* this.pop();
          this.stack.push({
            type: "doc-end",
            offset: this.offset,
            source: this.source
          });
          return;
        }
        if (!top)
          return yield* this.stream();
        switch (top.type) {
          case "document":
            return yield* this.document(top);
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return yield* this.scalar(top);
          case "block-scalar":
            return yield* this.blockScalar(top);
          case "block-map":
            return yield* this.blockMap(top);
          case "block-seq":
            return yield* this.blockSequence(top);
          case "flow-collection":
            return yield* this.flowCollection(top);
          case "doc-end":
            return yield* this.documentEnd(top);
        }
        yield* this.pop();
      }
      peek(n) {
        return this.stack[this.stack.length - n];
      }
      *pop(error) {
        const token = error ?? this.stack.pop();
        if (!token) {
          const message2 = "Tried to pop an empty stack";
          yield { type: "error", offset: this.offset, source: "", message: message2 };
        } else if (this.stack.length === 0) {
          yield token;
        } else {
          const top = this.peek(1);
          if (token.type === "block-scalar") {
            token.indent = "indent" in top ? top.indent : 0;
          } else if (token.type === "flow-collection" && top.type === "document") {
            token.indent = 0;
          }
          if (token.type === "flow-collection")
            fixFlowSeqItems(token);
          switch (top.type) {
            case "document":
              top.value = token;
              break;
            case "block-scalar":
              top.props.push(token);
              break;
            case "block-map": {
              const it = top.items[top.items.length - 1];
              if (it.value) {
                top.items.push({ start: [], key: token, sep: [] });
                this.onKeyLine = true;
                return;
              } else if (it.sep) {
                it.value = token;
              } else {
                Object.assign(it, { key: token, sep: [] });
                this.onKeyLine = !it.explicitKey;
                return;
              }
              break;
            }
            case "block-seq": {
              const it = top.items[top.items.length - 1];
              if (it.value)
                top.items.push({ start: [], value: token });
              else
                it.value = token;
              break;
            }
            case "flow-collection": {
              const it = top.items[top.items.length - 1];
              if (!it || it.value)
                top.items.push({ start: [], key: token, sep: [] });
              else if (it.sep)
                it.value = token;
              else
                Object.assign(it, { key: token, sep: [] });
              return;
            }
            default:
              yield* this.pop();
              yield* this.pop(token);
          }
          if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
            const last = token.items[token.items.length - 1];
            if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
              if (top.type === "document")
                top.end = last.start;
              else
                top.items.push({ start: last.start });
              token.items.splice(-1, 1);
            }
          }
        }
      }
      *stream() {
        switch (this.type) {
          case "directive-line":
            yield { type: "directive", offset: this.offset, source: this.source };
            return;
          case "byte-order-mark":
          case "space":
          case "comment":
          case "newline":
            yield this.sourceToken;
            return;
          case "doc-mode":
          case "doc-start": {
            const doc = {
              type: "document",
              offset: this.offset,
              start: []
            };
            if (this.type === "doc-start")
              doc.start.push(this.sourceToken);
            this.stack.push(doc);
            return;
          }
        }
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML stream`,
          source: this.source
        };
      }
      *document(doc) {
        if (doc.value)
          return yield* this.lineEnd(doc);
        switch (this.type) {
          case "doc-start": {
            if (findNonEmptyIndex(doc.start) !== -1) {
              yield* this.pop();
              yield* this.step();
            } else
              doc.start.push(this.sourceToken);
            return;
          }
          case "anchor":
          case "tag":
          case "space":
          case "comment":
          case "newline":
            doc.start.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
          this.stack.push(bv);
        else {
          yield {
            type: "error",
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source
          };
        }
      }
      *scalar(scalar) {
        if (this.type === "map-value-ind") {
          const prev = getPrevProps(this.peek(2));
          const start = getFirstKeyStartProps(prev);
          let sep5;
          if (scalar.end) {
            sep5 = scalar.end;
            sep5.push(this.sourceToken);
            delete scalar.end;
          } else
            sep5 = [this.sourceToken];
          const map = {
            type: "block-map",
            offset: scalar.offset,
            indent: scalar.indent,
            items: [{ start, key: scalar, sep: sep5 }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map;
        } else
          yield* this.lineEnd(scalar);
      }
      *blockScalar(scalar) {
        switch (this.type) {
          case "space":
          case "comment":
          case "newline":
            scalar.props.push(this.sourceToken);
            return;
          case "scalar":
            scalar.source = this.source;
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) {
              let nl = this.source.indexOf("\n") + 1;
              while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf("\n", nl) + 1;
              }
            }
            yield* this.pop();
            break;
          default:
            yield* this.pop();
            yield* this.step();
        }
      }
      *blockMap(map) {
        const it = map.items[map.items.length - 1];
        switch (this.type) {
          case "newline":
            this.onKeyLine = false;
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "space":
          case "comment":
            if (it.value) {
              map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              if (this.atIndentedComment(it.start, map.indent)) {
                const prev = map.items[map.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  arrayPushArray(end, it.start);
                  end.push(this.sourceToken);
                  map.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
        }
        if (this.indent >= map.indent) {
          const atMapIndent = !this.onKeyLine && this.indent === map.indent;
          const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
          let start = [];
          if (atNextItem && it.sep && !it.value) {
            const nl = [];
            for (let i = 0; i < it.sep.length; ++i) {
              const st = it.sep[i];
              switch (st.type) {
                case "newline":
                  nl.push(i);
                  break;
                case "space":
                  break;
                case "comment":
                  if (st.indent > map.indent)
                    nl.length = 0;
                  break;
                default:
                  nl.length = 0;
              }
            }
            if (nl.length >= 2)
              start = it.sep.splice(nl[1]);
          }
          switch (this.type) {
            case "anchor":
            case "tag":
              if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
                this.onKeyLine = true;
              } else if (it.sep) {
                it.sep.push(this.sourceToken);
              } else {
                it.start.push(this.sourceToken);
              }
              return;
            case "explicit-key-ind":
              if (!it.sep && !it.explicitKey) {
                it.start.push(this.sourceToken);
                it.explicitKey = true;
              } else if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start, explicitKey: true });
              } else {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [this.sourceToken], explicitKey: true }]
                });
              }
              this.onKeyLine = true;
              return;
            case "map-value-ind":
              if (it.explicitKey) {
                if (!it.sep) {
                  if (includesToken(it.start, "newline")) {
                    Object.assign(it, { key: null, sep: [this.sourceToken] });
                  } else {
                    const start2 = getFirstKeyStartProps(it.start);
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                    });
                  }
                } else if (it.value) {
                  map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                  });
                } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                  const start2 = getFirstKeyStartProps(it.start);
                  const key = it.key;
                  const sep5 = it.sep;
                  sep5.push(this.sourceToken);
                  delete it.key;
                  delete it.sep;
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key, sep: sep5 }]
                  });
                } else if (start.length > 0) {
                  it.sep = it.sep.concat(start, this.sourceToken);
                } else {
                  it.sep.push(this.sourceToken);
                }
              } else {
                if (!it.sep) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else if (it.value || atNextItem) {
                  map.items.push({ start, key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [], key: null, sep: [this.sourceToken] }]
                  });
                } else {
                  it.sep.push(this.sourceToken);
                }
              }
              this.onKeyLine = true;
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (atNextItem || it.value) {
                map.items.push({ start, key: fs, sep: [] });
                this.onKeyLine = true;
              } else if (it.sep) {
                this.stack.push(fs);
              } else {
                Object.assign(it, { key: fs, sep: [] });
                this.onKeyLine = true;
              }
              return;
            }
            default: {
              const bv = this.startBlockValue(map);
              if (bv) {
                if (bv.type === "block-seq") {
                  if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                    yield* this.pop({
                      type: "error",
                      offset: this.offset,
                      message: "Unexpected block-seq-ind on same line with key",
                      source: this.source
                    });
                    return;
                  }
                } else if (atMapIndent) {
                  map.items.push({ start });
                }
                this.stack.push(bv);
                return;
              }
            }
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *blockSequence(seq) {
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
          case "newline":
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                seq.items.push({ start: [this.sourceToken] });
            } else
              it.start.push(this.sourceToken);
            return;
          case "space":
          case "comment":
            if (it.value)
              seq.items.push({ start: [this.sourceToken] });
            else {
              if (this.atIndentedComment(it.start, seq.indent)) {
                const prev = seq.items[seq.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  arrayPushArray(end, it.start);
                  end.push(this.sourceToken);
                  seq.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
          case "anchor":
          case "tag":
            if (it.value || this.indent <= seq.indent)
              break;
            it.start.push(this.sourceToken);
            return;
          case "seq-item-ind":
            if (this.indent !== seq.indent)
              break;
            if (it.value || includesToken(it.start, "seq-item-ind"))
              seq.items.push({ start: [this.sourceToken] });
            else
              it.start.push(this.sourceToken);
            return;
        }
        if (this.indent > seq.indent) {
          const bv = this.startBlockValue(seq);
          if (bv) {
            this.stack.push(bv);
            return;
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === "flow-error-end") {
          let top;
          do {
            yield* this.pop();
            top = this.peek(1);
          } while (top?.type === "flow-collection");
        } else if (fc.end.length === 0) {
          switch (this.type) {
            case "comma":
            case "explicit-key-ind":
              if (!it || it.sep)
                fc.items.push({ start: [this.sourceToken] });
              else
                it.start.push(this.sourceToken);
              return;
            case "map-value-ind":
              if (!it || it.value)
                fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              return;
            case "space":
            case "comment":
            case "newline":
            case "anchor":
            case "tag":
              if (!it || it.value)
                fc.items.push({ start: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                it.start.push(this.sourceToken);
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (!it || it.value)
                fc.items.push({ start: [], key: fs, sep: [] });
              else if (it.sep)
                this.stack.push(fs);
              else
                Object.assign(it, { key: fs, sep: [] });
              return;
            }
            case "flow-map-end":
            case "flow-seq-end":
              fc.end.push(this.sourceToken);
              return;
          }
          const bv = this.startBlockValue(fc);
          if (bv)
            this.stack.push(bv);
          else {
            yield* this.pop();
            yield* this.step();
          }
        } else {
          const parent = this.peek(2);
          if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
            yield* this.pop();
            yield* this.step();
          } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            fixFlowSeqItems(fc);
            const sep5 = fc.end.splice(1, fc.end.length);
            sep5.push(this.sourceToken);
            const map = {
              type: "block-map",
              offset: fc.offset,
              indent: fc.indent,
              items: [{ start, key: fc, sep: sep5 }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
          } else {
            yield* this.lineEnd(fc);
          }
        }
      }
      flowScalar(type) {
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        return {
          type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
      }
      startBlockValue(parent) {
        switch (this.type) {
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return this.flowScalar(this.type);
          case "block-scalar-header":
            return {
              type: "block-scalar",
              offset: this.offset,
              indent: this.indent,
              props: [this.sourceToken],
              source: ""
            };
          case "flow-map-start":
          case "flow-seq-start":
            return {
              type: "flow-collection",
              offset: this.offset,
              indent: this.indent,
              start: this.sourceToken,
              items: [],
              end: []
            };
          case "seq-item-ind":
            return {
              type: "block-seq",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken] }]
            };
          case "explicit-key-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            start.push(this.sourceToken);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, explicitKey: true }]
            };
          }
          case "map-value-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, key: null, sep: [this.sourceToken] }]
            };
          }
        }
        return null;
      }
      atIndentedComment(start, indent) {
        if (this.type !== "comment")
          return false;
        if (this.indent <= indent)
          return false;
        return start.every((st) => st.type === "newline" || st.type === "space");
      }
      *documentEnd(docEnd) {
        if (this.type !== "doc-mode") {
          if (docEnd.end)
            docEnd.end.push(this.sourceToken);
          else
            docEnd.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
        }
      }
      *lineEnd(token) {
        switch (this.type) {
          case "comma":
          case "doc-start":
          case "doc-end":
          case "flow-seq-end":
          case "flow-map-end":
          case "map-value-ind":
            yield* this.pop();
            yield* this.step();
            break;
          case "newline":
            this.onKeyLine = false;
          case "space":
          case "comment":
          default:
            if (token.end)
              token.end.push(this.sourceToken);
            else
              token.end = [this.sourceToken];
            if (this.type === "newline")
              yield* this.pop();
        }
      }
    };
    exports2.Parser = Parser;
  }
});

// ../praxis-ba/node_modules/yaml/dist/public-api.js
var require_public_api = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/public-api.js"(exports2) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var errors = require_errors();
    var log = require_log();
    var identity = require_identity();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    function parseOptions(options2) {
      const prettyErrors = options2.prettyErrors !== false;
      const lineCounter$1 = options2.lineCounter || prettyErrors && new lineCounter.LineCounter() || null;
      return { lineCounter: lineCounter$1, prettyErrors };
    }
    function parseAllDocuments(source, options2 = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options2);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options2);
      const docs = Array.from(composer$1.compose(parser$1.parse(source)));
      if (prettyErrors && lineCounter2)
        for (const doc of docs) {
          doc.errors.forEach(errors.prettifyError(source, lineCounter2));
          doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
        }
      if (docs.length > 0)
        return docs;
      return Object.assign([], { empty: true }, composer$1.streamInfo());
    }
    function parseDocument(source, options2 = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options2);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options2);
      let doc = null;
      for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
          doc = _doc;
        else if (doc.options.logLevel !== "silent") {
          doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
          break;
        }
      }
      if (prettyErrors && lineCounter2) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter2));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
      }
      return doc;
    }
    function parse2(src, reviver, options2) {
      let _reviver = void 0;
      if (typeof reviver === "function") {
        _reviver = reviver;
      } else if (options2 === void 0 && reviver && typeof reviver === "object") {
        options2 = reviver;
      }
      const doc = parseDocument(src, options2);
      if (!doc)
        return null;
      doc.warnings.forEach((warning) => log.warn(doc.options.logLevel, warning));
      if (doc.errors.length > 0) {
        if (doc.options.logLevel !== "silent")
          throw doc.errors[0];
        else
          doc.errors = [];
      }
      return doc.toJS(Object.assign({ reviver: _reviver }, options2));
    }
    function stringify2(value, replacer, options2) {
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options2 === void 0 && replacer) {
        options2 = replacer;
      }
      if (typeof options2 === "string")
        options2 = options2.length;
      if (typeof options2 === "number") {
        const indent = Math.round(options2);
        options2 = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
      }
      if (value === void 0) {
        const { keepUndefined } = options2 ?? replacer ?? {};
        if (!keepUndefined)
          return void 0;
      }
      if (identity.isDocument(value) && !_replacer)
        return value.toString(options2);
      return new Document.Document(value, _replacer, options2).toString(options2);
    }
    exports2.parse = parse2;
    exports2.parseAllDocuments = parseAllDocuments;
    exports2.parseDocument = parseDocument;
    exports2.stringify = stringify2;
  }
});

// ../praxis-ba/node_modules/yaml/dist/index.js
var require_dist = __commonJS({
  "../praxis-ba/node_modules/yaml/dist/index.js"(exports2) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var Schema = require_Schema();
    var errors = require_errors();
    var Alias = require_Alias();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var cst = require_cst();
    var lexer = require_lexer();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    var publicApi = require_public_api();
    var visit = require_visit();
    exports2.Composer = composer.Composer;
    exports2.Document = Document.Document;
    exports2.Schema = Schema.Schema;
    exports2.YAMLError = errors.YAMLError;
    exports2.YAMLParseError = errors.YAMLParseError;
    exports2.YAMLWarning = errors.YAMLWarning;
    exports2.Alias = Alias.Alias;
    exports2.isAlias = identity.isAlias;
    exports2.isCollection = identity.isCollection;
    exports2.isDocument = identity.isDocument;
    exports2.isMap = identity.isMap;
    exports2.isNode = identity.isNode;
    exports2.isPair = identity.isPair;
    exports2.isScalar = identity.isScalar;
    exports2.isSeq = identity.isSeq;
    exports2.Pair = Pair.Pair;
    exports2.Scalar = Scalar.Scalar;
    exports2.YAMLMap = YAMLMap.YAMLMap;
    exports2.YAMLSeq = YAMLSeq.YAMLSeq;
    exports2.CST = cst;
    exports2.Lexer = lexer.Lexer;
    exports2.LineCounter = lineCounter.LineCounter;
    exports2.Parser = parser.Parser;
    exports2.parse = publicApi.parse;
    exports2.parseAllDocuments = publicApi.parseAllDocuments;
    exports2.parseDocument = publicApi.parseDocument;
    exports2.stringify = publicApi.stringify;
    exports2.visit = visit.visit;
    exports2.visitAsync = visit.visitAsync;
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/ac.js
function parseAcBlock(body) {
  const lines = body.split("\n").map((line) => line.replace(/\r$/, ""));
  const headingIndex = lines.findIndex((line) => SECTION_HEADING.test(line));
  if (headingIndex === -1)
    return { acs: [], warnings: [] };
  const acs = [];
  const warnings = [];
  const seenIds = /* @__PURE__ */ new Set();
  let error;
  let current;
  for (let i = headingIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (NEXT_HEADING.test(line))
      break;
    const acMatch = AC_BULLET.exec(line);
    if (acMatch) {
      const acId = Number(acMatch[1]);
      const text = acMatch[2];
      if (seenIds.has(acId)) {
        error = error ?? `duplicate AC id: AC-${acId}`;
      }
      seenIds.add(acId);
      current = { acId, text };
      acs.push(current);
      continue;
    }
    const continuationMatch = CONTINUATION.exec(line);
    if (continuationMatch && current) {
      current.text = `${current.text} ${continuationMatch[1]}`;
      continue;
    }
    const bulletMatch = TOP_LEVEL_BULLET.exec(line);
    if (bulletMatch) {
      warnings.push(`non-AC bullet in Acceptance Criteria section: "${line}"`);
      current = void 0;
      continue;
    }
  }
  return error === void 0 ? { acs, warnings } : { acs, warnings, error };
}
function isVerifiableAc(text) {
  const t = text.toLowerCase();
  const hasGiven = /\bgiven\b/.test(t) || t.includes("\u0434\u0430\u043D\u043E");
  const hasWhen = /\bwhen\b/.test(t) || t.includes("\u043A\u043E\u0433\u0434\u0430");
  const hasThen = /\bthen\b/.test(t) || t.includes("\u0442\u043E\u0433\u0434\u0430");
  return hasGiven && hasWhen && hasThen;
}
function unverifiableAcIds(acs) {
  return acs.filter((ac) => !isVerifiableAc(ac.text)).map((ac) => ac.acId);
}
var SECTION_HEADING, NEXT_HEADING, AC_BULLET, TOP_LEVEL_BULLET, CONTINUATION;
var init_ac = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/ac.js"() {
    "use strict";
    SECTION_HEADING = /^##\s+Acceptance Criteria\s*$/;
    NEXT_HEADING = /^## /;
    AC_BULLET = /^- AC-(\d+): (.+)$/;
    TOP_LEVEL_BULLET = /^- (.+)$/;
    CONTINUATION = /^ {2,}(.+)$/;
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/schema.js
function validateFrontmatter(type, fm) {
  const result = schemas[type].safeParse(fm);
  if (result.success)
    return { ok: true, data: result.data };
  const issues = result.error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
    return `${path}: ${issue.message}`;
  });
  return { ok: false, issues };
}
var EPIC_ID, FR_ID, NFR_ID, CATALOG_NFR_ID, BR_ID, CR_ID, WP_ID, BUG_ID, GOAL_ID, BASELINE_ID, DATE_KEY, isRequirementId, STATUS_VALUES, statusSchema, visionSchema, frSchema, nfrSchema, brSchema, goalSchema, crImpactSchema, crSchema, wpSchema, bugSchema, epicSchema, schemas, countersSchema, configSchema, baselineManifestSchema, pendingMarkerSchema, verifyEvidenceSchema;
var init_schema = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/schema.js"() {
    "use strict";
    init_zod();
    EPIC_ID = /^E\d+$/;
    FR_ID = /^E\d+-FR\d+$/;
    NFR_ID = /^E\d+-NFR\d+$/;
    CATALOG_NFR_ID = /^[A-Z][A-Z0-9]{1,9}-NFR-\d{3}$/;
    BR_ID = /^E\d+-BR\d+$/;
    CR_ID = /^CR-\d{3}$/;
    WP_ID = /^WP-\d{8}-\d{3}$/;
    BUG_ID = /^BUG-\d{3}$/;
    GOAL_ID = /^G\d+$/;
    BASELINE_ID = /^BL-\d{8}(-\d+)?$/;
    DATE_KEY = /^\d{8}$/;
    isRequirementId = (v) => FR_ID.test(v) || NFR_ID.test(v) || BR_ID.test(v);
    STATUS_VALUES = ["draft", "active", "batched", "baselined", "superseded", "retired"];
    statusSchema = external_exports.enum(STATUS_VALUES);
    visionSchema = external_exports.object({
      type: external_exports.literal("vision"),
      status: external_exports.enum(["draft", "confirmed"]),
      confirmed_at: external_exports.string().optional(),
      confirmed_by: external_exports.string().optional()
    });
    frSchema = external_exports.object({
      id: external_exports.string().regex(FR_ID),
      type: external_exports.literal("fr"),
      epic: external_exports.string().regex(EPIC_ID),
      status: statusSchema,
      version: external_exports.number().int().min(1),
      traces_to: external_exports.array(external_exports.string().regex(CR_ID)),
      enforces: external_exports.array(external_exports.string().regex(BR_ID)),
      // Canon NFR nodes (E#-NFR#) and/or project-catalogue ids (KEY-NFR-NNN).
      references_nfr: external_exports.array(external_exports.union([external_exports.string().regex(NFR_ID), external_exports.string().regex(CATALOG_NFR_ID)])),
      related: external_exports.array(external_exports.string()),
      // Optional goals layer (WBS 1.11): FR↔goal link; absent means unlinked.
      goal_ids: external_exports.array(external_exports.string().regex(GOAL_ID)).optional(),
      baseline: external_exports.string().regex(BASELINE_ID).optional(),
      supersedes: external_exports.string().regex(FR_ID).optional(),
      superseded_by: external_exports.string().regex(FR_ID).optional(),
      provenance: external_exports.literal("migrated").optional()
    });
    nfrSchema = external_exports.object({
      id: external_exports.string().regex(NFR_ID),
      type: external_exports.literal("nfr"),
      epic: external_exports.string().regex(EPIC_ID),
      status: statusSchema,
      version: external_exports.number().int().min(1),
      traces_to: external_exports.array(external_exports.string().regex(CR_ID)),
      verified_by: external_exports.array(external_exports.string()),
      related: external_exports.array(external_exports.string()),
      goal_ids: external_exports.array(external_exports.string().regex(GOAL_ID)).optional(),
      baseline: external_exports.string().regex(BASELINE_ID).optional(),
      supersedes: external_exports.string().regex(NFR_ID).optional(),
      superseded_by: external_exports.string().regex(NFR_ID).optional(),
      provenance: external_exports.literal("migrated").optional()
    });
    brSchema = external_exports.object({
      id: external_exports.string().regex(BR_ID),
      type: external_exports.literal("br"),
      epic: external_exports.string().regex(EPIC_ID),
      kind: external_exports.enum(["structural", "operative"]),
      enforcement: external_exports.enum(["advisory", "hard"]),
      status: statusSchema,
      version: external_exports.number().int().min(1),
      goal_ids: external_exports.array(external_exports.string().regex(GOAL_ID)).optional(),
      baseline: external_exports.string().regex(BASELINE_ID).optional(),
      supersedes: external_exports.string().regex(BR_ID).optional(),
      superseded_by: external_exports.string().regex(BR_ID).optional(),
      provenance: external_exports.literal("migrated").optional()
    });
    goalSchema = external_exports.object({
      id: external_exports.string().regex(GOAL_ID),
      type: external_exports.literal("goal"),
      title: external_exports.string().min(1),
      status: external_exports.enum(["draft", "active", "achieved", "retired"])
    });
    crImpactSchema = external_exports.union([
      external_exports.object({ amends: external_exports.string().refine(isRequirementId, { message: "must be a FR/NFR/BR id" }) }).strict(),
      external_exports.object({
        spawns: external_exports.enum(["fr", "nfr", "br"]),
        epic: external_exports.string().regex(EPIC_ID),
        realized: external_exports.string().refine(isRequirementId, { message: "must be a FR/NFR/BR id" }).optional()
      }).strict()
    ]);
    crSchema = external_exports.object({
      id: external_exports.string().regex(CR_ID),
      type: external_exports.literal("cr"),
      status: external_exports.enum(["captured", "confirmed", "resolved"]),
      // v3: the old free-text entry_point is now a closed enum — 'vision' (new
      // product surface) or 'requirement' (amends/spawns off the existing
      // canon). The retired third level ('solution'/'epic'/'feature', v1-v2 CLI
      // free text) no longer validates — see migrate-v3 (Task 9) for the
      // backfill path that maps old advisory strings onto this enum or falls
      // back to `provenance: backfilled` when no confident mapping exists.
      entry_point: external_exports.enum(["vision", "requirement"]).optional(),
      entry_point_confirmed: external_exports.boolean().optional(),
      impacts: external_exports.array(crImpactSchema).optional(),
      // Set only by the v2→v3 migration/backfill map (Task 10) for CRs whose
      // impact set could not be reconstructed with confidence from history —
      // never written by any live CLI verb.
      provenance: external_exports.literal("backfilled").optional(),
      spawned_from_bug: external_exports.string().regex(BUG_ID).optional()
    });
    wpSchema = external_exports.object({
      id: external_exports.string().regex(WP_ID),
      type: external_exports.literal("wp"),
      role: external_exports.enum(["developer", "qa"]),
      status: external_exports.enum(["draft", "ready", "plan-approved", "accepted", "abandoned"]),
      plan: external_exports.string().optional()
    }).strict();
    bugSchema = external_exports.object({
      id: external_exports.string().regex(BUG_ID),
      type: external_exports.literal("bug"),
      status: external_exports.enum(["open", "fixed", "wontfix", "duplicate"]),
      severity: external_exports.string().min(1),
      affects: external_exports.array(external_exports.string().min(1)),
      reported: external_exports.string(),
      reporter: external_exports.string(),
      spawned_cr: external_exports.string().regex(CR_ID).optional()
    });
    epicSchema = external_exports.object({
      id: external_exports.string().regex(EPIC_ID),
      type: external_exports.literal("epic"),
      title: external_exports.string().min(1),
      status: external_exports.string().min(1)
    });
    schemas = {
      vision: visionSchema,
      fr: frSchema,
      nfr: nfrSchema,
      br: brSchema,
      cr: crSchema,
      wp: wpSchema,
      bug: bugSchema,
      epic: epicSchema,
      goal: goalSchema
    };
    countersSchema = external_exports.object({
      product: external_exports.object({
        epic: external_exports.number().int().nonnegative(),
        cr: external_exports.number().int().nonnegative(),
        wp: external_exports.number().int().nonnegative(),
        bug: external_exports.number().int().nonnegative(),
        baselineSeq: external_exports.record(external_exports.string().regex(DATE_KEY), external_exports.number().int().nonnegative())
      }),
      epics: external_exports.record(external_exports.string().regex(EPIC_ID), external_exports.object({
        fr: external_exports.number().int().nonnegative(),
        nfr: external_exports.number().int().nonnegative(),
        br: external_exports.number().int().nonnegative()
      })),
      retired: external_exports.array(external_exports.string().refine(isRequirementId, { message: "must be a FR/NFR/BR id" }))
    });
    configSchema = external_exports.object({
      canon_roots: external_exports.array(external_exports.string().min(1)),
      link_root: external_exports.string().min(1).optional()
    });
    baselineManifestSchema = external_exports.object({
      id: external_exports.string().regex(BASELINE_ID),
      date: external_exports.string().regex(DATE_KEY),
      wp_ids: external_exports.array(external_exports.string().regex(WP_ID)),
      triggered_by: external_exports.string().regex(WP_ID),
      // `.min(1)`: a baseline with zero delivered items is invalid — accept never
      // freezes "nothing" (the accept transaction throws before writing a marker
      // if the delivered set is empty). This is the last-line guard that turns a
      // would-be empty/garbage baseline into a hard validation error rather than a
      // silently-committed no-content snapshot.
      items: external_exports.array(external_exports.object({
        id: external_exports.string().refine(isRequirementId, { message: "must be a FR/NFR/BR id" }),
        version: external_exports.number().int().min(1),
        content_hash: external_exports.string().min(1)
      })).min(1),
      accepted_by: external_exports.string(),
      verify_evidence_ref: external_exports.string()
    });
    pendingMarkerSchema = external_exports.object({
      wpId: external_exports.string().regex(WP_ID),
      baselineId: external_exports.string().regex(BASELINE_ID),
      deliveredIds: external_exports.array(external_exports.string().refine(isRequirementId, { message: "must be a FR/NFR/BR id" })).min(1),
      date: external_exports.string().regex(DATE_KEY),
      headCommit: external_exports.string(),
      verifyEvidenceRef: external_exports.string()
    });
    verifyEvidenceSchema = external_exports.object({
      wpId: external_exports.string().regex(WP_ID),
      commit: external_exports.string(),
      testRunHashes: external_exports.array(external_exports.string()),
      suites: external_exports.array(external_exports.string()),
      producedAt: external_exports.string(),
      producedBy: external_exports.string(),
      toolVersion: external_exports.string()
    });
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/body-refs.js
function stripLeadingFrontmatter(raw) {
  const candidate = raw.trimStart();
  if (!candidate.startsWith("---"))
    return raw;
  const match = candidate.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (!match)
    return raw;
  return candidate.slice(match[0].length);
}
function bodyHasLeadingFrontmatterFence(body) {
  return /^\s*---\r?\n/.test(body);
}
function stripAllLeadingFrontmatter(raw) {
  let body = raw;
  for (let i = 0; i < 8 && bodyHasLeadingFrontmatterFence(body); i++) {
    const next = stripLeadingFrontmatter(body);
    if (next === body)
      break;
    body = next;
  }
  return body;
}
function extractNfrMentions(text) {
  const canon = /* @__PURE__ */ new Set();
  const catalog = /* @__PURE__ */ new Set();
  for (const m of text.matchAll(CANON_NFR_RE)) {
    if (m[1])
      canon.add(m[1]);
  }
  for (const m of text.matchAll(CATALOG_NFR_RE)) {
    if (m[1] && !NFR_ID.test(m[1]))
      catalog.add(m[1]);
  }
  return {
    canon: [...canon].sort(),
    catalog: [...catalog].sort()
  };
}
function mergeReferencesNfr(existing, body) {
  const { canon, catalog } = extractNfrMentions(body);
  const set = /* @__PURE__ */ new Set([...existing ?? [], ...canon, ...catalog]);
  return [...set].sort();
}
var CATALOG_NFR_RE, CANON_NFR_RE;
var init_body_refs = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/body-refs.js"() {
    "use strict";
    init_schema();
    CATALOG_NFR_RE = /\b([A-Z][A-Z0-9]{1,9}-NFR-\d{3})\b/g;
    CANON_NFR_RE = /\b(E\d+-NFR\d+)\b/g;
  }
});

// ../praxis-ba/node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "../praxis-ba/node_modules/kind-of/index.js"(exports2, module2) {
    var toString = Object.prototype.toString;
    module2.exports = function kindOf2(val) {
      if (val === void 0) return "undefined";
      if (val === null) return "null";
      var type = typeof val;
      if (type === "boolean") return "boolean";
      if (type === "string") return "string";
      if (type === "number") return "number";
      if (type === "symbol") return "symbol";
      if (type === "function") {
        return isGeneratorFn(val) ? "generatorfunction" : "function";
      }
      if (isArray(val)) return "array";
      if (isBuffer(val)) return "buffer";
      if (isArguments(val)) return "arguments";
      if (isDate(val)) return "date";
      if (isError(val)) return "error";
      if (isRegexp(val)) return "regexp";
      switch (ctorName(val)) {
        case "Symbol":
          return "symbol";
        case "Promise":
          return "promise";
        case "WeakMap":
          return "weakmap";
        case "WeakSet":
          return "weakset";
        case "Map":
          return "map";
        case "Set":
          return "set";
        case "Int8Array":
          return "int8array";
        case "Uint8Array":
          return "uint8array";
        case "Uint8ClampedArray":
          return "uint8clampedarray";
        case "Int16Array":
          return "int16array";
        case "Uint16Array":
          return "uint16array";
        case "Int32Array":
          return "int32array";
        case "Uint32Array":
          return "uint32array";
        case "Float32Array":
          return "float32array";
        case "Float64Array":
          return "float64array";
      }
      if (isGeneratorObj(val)) {
        return "generator";
      }
      type = toString.call(val);
      switch (type) {
        case "[object Object]":
          return "object";
        case "[object Map Iterator]":
          return "mapiterator";
        case "[object Set Iterator]":
          return "setiterator";
        case "[object String Iterator]":
          return "stringiterator";
        case "[object Array Iterator]":
          return "arrayiterator";
      }
      return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    function ctorName(val) {
      return typeof val.constructor === "function" ? val.constructor.name : null;
    }
    function isArray(val) {
      if (Array.isArray) return Array.isArray(val);
      return val instanceof Array;
    }
    function isError(val) {
      return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
    }
    function isDate(val) {
      if (val instanceof Date) return true;
      return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
    }
    function isRegexp(val) {
      if (val instanceof RegExp) return true;
      return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
    }
    function isGeneratorFn(name, val) {
      return ctorName(name) === "GeneratorFunction";
    }
    function isGeneratorObj(val) {
      return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
    }
    function isArguments(val) {
      try {
        if (typeof val.length === "number" && typeof val.callee === "function") {
          return true;
        }
      } catch (err) {
        if (err.message.indexOf("callee") !== -1) {
          return true;
        }
      }
      return false;
    }
    function isBuffer(val) {
      if (val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// ../praxis-ba/node_modules/is-extendable/index.js
var require_is_extendable = __commonJS({
  "../praxis-ba/node_modules/is-extendable/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isExtendable(val) {
      return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
    };
  }
});

// ../praxis-ba/node_modules/extend-shallow/index.js
var require_extend_shallow = __commonJS({
  "../praxis-ba/node_modules/extend-shallow/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_is_extendable();
    module2.exports = function extend(o) {
      if (!isObject(o)) {
        o = {};
      }
      var len = arguments.length;
      for (var i = 1; i < len; i++) {
        var obj = arguments[i];
        if (isObject(obj)) {
          assign(o, obj);
        }
      }
      return o;
    };
    function assign(a, b) {
      for (var key in b) {
        if (hasOwn(b, key)) {
          a[key] = b[key];
        }
      }
    }
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  }
});

// ../praxis-ba/node_modules/section-matter/index.js
var require_section_matter = __commonJS({
  "../praxis-ba/node_modules/section-matter/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var extend = require_extend_shallow();
    module2.exports = function(input, options2) {
      if (typeof options2 === "function") {
        options2 = { parse: options2 };
      }
      var file = toObject(input);
      var defaults = { section_delimiter: "---", parse: identity };
      var opts = extend({}, defaults, options2);
      var delim = opts.section_delimiter;
      var lines = file.content.split(/\r?\n/);
      var sections = null;
      var section2 = createSection();
      var content = [];
      var stack = [];
      function initSections(val) {
        file.content = val;
        sections = [];
        content = [];
      }
      function closeSection(val) {
        if (stack.length) {
          section2.key = getKey(stack[0], delim);
          section2.content = val;
          opts.parse(section2, sections);
          sections.push(section2);
          section2 = createSection();
          content = [];
          stack = [];
        }
      }
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var len = stack.length;
        var ln = line.trim();
        if (isDelimiter(ln, delim)) {
          if (ln.length === 3 && i !== 0) {
            if (len === 0 || len === 2) {
              content.push(line);
              continue;
            }
            stack.push(ln);
            section2.data = content.join("\n");
            content = [];
            continue;
          }
          if (sections === null) {
            initSections(content.join("\n"));
          }
          if (len === 2) {
            closeSection(content.join("\n"));
          }
          stack.push(ln);
          continue;
        }
        content.push(line);
      }
      if (sections === null) {
        initSections(content.join("\n"));
      } else {
        closeSection(content.join("\n"));
      }
      file.sections = sections;
      return file;
    };
    function isDelimiter(line, delim) {
      if (line.slice(0, delim.length) !== delim) {
        return false;
      }
      if (line.charAt(delim.length + 1) === delim.slice(-1)) {
        return false;
      }
      return true;
    }
    function toObject(input) {
      if (typeOf(input) !== "object") {
        input = { content: input };
      }
      if (typeof input.content !== "string" && !isBuffer(input.content)) {
        throw new TypeError("expected a buffer or string");
      }
      input.content = input.content.toString();
      input.sections = [];
      return input;
    }
    function getKey(val, delim) {
      return val ? val.slice(delim.length).trim() : "";
    }
    function createSection() {
      return { key: "", data: "", content: "" };
    }
    function identity(val) {
      return val;
    }
    function isBuffer(val) {
      if (val && val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/common.js
var require_common = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/common.js"(exports2, module2) {
    "use strict";
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence)) return sequence;
      else if (isNothing(sequence)) return [];
      return [sequence];
    }
    function extend(target, source) {
      var index, length, key, sourceKeys;
      if (source) {
        sourceKeys = Object.keys(source);
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
          key = sourceKeys[index];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      var result = "", cycle;
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    module2.exports.isNothing = isNothing;
    module2.exports.isObject = isObject;
    module2.exports.toArray = toArray;
    module2.exports.repeat = repeat;
    module2.exports.isNegativeZero = isNegativeZero;
    module2.exports.extend = extend;
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/exception.js
var require_exception = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/exception.js"(exports2, module2) {
    "use strict";
    function YAMLException(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
    YAMLException.prototype.toString = function toString(compact) {
      var result = this.name + ": ";
      result += this.reason || "(unknown reason)";
      if (!compact && this.mark) {
        result += " " + this.mark.toString();
      }
      return result;
    };
    module2.exports = YAMLException;
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/mark.js
var require_mark = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/mark.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    function Mark(name, buffer, position, line, column) {
      this.name = name;
      this.buffer = buffer;
      this.position = position;
      this.line = line;
      this.column = column;
    }
    Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
      var head, start, tail, end, snippet;
      if (!this.buffer) return null;
      indent = indent || 4;
      maxLength = maxLength || 75;
      head = "";
      start = this.position;
      while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
          head = " ... ";
          start += 5;
          break;
        }
      }
      tail = "";
      end = this.position;
      while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
          tail = " ... ";
          end -= 5;
          break;
        }
      }
      snippet = this.buffer.slice(start, end);
      return common.repeat(" ", indent) + head + snippet + tail + "\n" + common.repeat(" ", indent + this.position - start + head.length) + "^";
    };
    Mark.prototype.toString = function toString(compact) {
      var snippet, where = "";
      if (this.name) {
        where += 'in "' + this.name + '" ';
      }
      where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
      if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
          where += ":\n" + snippet;
        }
      }
      return where;
    };
    module2.exports = Mark;
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type.js
var require_type = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type.js"(exports2, module2) {
    "use strict";
    var YAMLException = require_exception();
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases"
    ];
    var YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    function compileStyleAliases(map) {
      var result = {};
      if (map !== null) {
        Object.keys(map).forEach(function(style) {
          map[style].forEach(function(alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type(tag, options2) {
      options2 = options2 || {};
      Object.keys(options2).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });
      this.tag = tag;
      this.kind = options2["kind"] || null;
      this.resolve = options2["resolve"] || function() {
        return true;
      };
      this.construct = options2["construct"] || function(data) {
        return data;
      };
      this.instanceOf = options2["instanceOf"] || null;
      this.predicate = options2["predicate"] || null;
      this.represent = options2["represent"] || null;
      this.defaultStyle = options2["defaultStyle"] || null;
      this.styleAliases = compileStyleAliases(options2["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    module2.exports = Type;
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema.js
var require_schema4 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Type = require_type();
    function compileList(schema, name, result) {
      var exclude = [];
      schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
      });
      schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
            exclude.push(previousIndex);
          }
        });
        result.push(currentType);
      });
      return result.filter(function(type, index) {
        return exclude.indexOf(index) === -1;
      });
    }
    function compileMap() {
      var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;
      function collectType(type) {
        result[type.kind][type.tag] = result["fallback"][type.tag] = type;
      }
      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
    function Schema(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function(type) {
        if (type.loadKind && type.loadKind !== "scalar") {
          throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
      });
      this.compiledImplicit = compileList(this, "implicit", []);
      this.compiledExplicit = compileList(this, "explicit", []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    Schema.DEFAULT = null;
    Schema.create = function createSchema() {
      var schemas2, types;
      switch (arguments.length) {
        case 1:
          schemas2 = Schema.DEFAULT;
          types = arguments[0];
          break;
        case 2:
          schemas2 = arguments[0];
          types = arguments[1];
          break;
        default:
          throw new YAMLException("Wrong number of arguments for Schema.create function");
      }
      schemas2 = common.toArray(schemas2);
      types = common.toArray(types);
      if (!schemas2.every(function(schema) {
        return schema instanceof Schema;
      })) {
        throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
      }
      if (!types.every(function(type) {
        return type instanceof Type;
      })) {
        throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      return new Schema({
        include: schemas2,
        explicit: types
      });
    };
    module2.exports = Schema;
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/str.js
var require_str = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/str.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/seq.js
var require_seq2 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/map.js
var require_map2 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/map.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
var require_failsafe = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema4();
    module2.exports = new Schema({
      explicit: [
        require_str(),
        require_seq2(),
        require_map2()
      ]
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/null.js
var require_null2 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/null.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlNull(data) {
      if (data === null) return true;
      var max = data.length;
      return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/bool.js
var require_bool3 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlBoolean(data) {
      if (data === null) return false;
      var max = data.length;
      return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    module2.exports = new Type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/int.js
var require_int3 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/int.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    function isHexCode(c) {
      return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
    }
    function isOctCode(c) {
      return 48 <= c && c <= 55;
    }
    function isDecCode(c) {
      return 48 <= c && c <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null) return false;
      var max = data.length, index = 0, hasDigits = false, ch;
      if (!max) return false;
      ch = data[index];
      if (ch === "-" || ch === "+") {
        ch = data[++index];
      }
      if (ch === "0") {
        if (index + 1 === max) return true;
        ch = data[++index];
        if (ch === "b") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (ch !== "0" && ch !== "1") return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "x") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_") continue;
            if (!isHexCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_") continue;
          if (!isOctCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "_") return false;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch === ":") break;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits || ch === "_") return false;
      if (ch !== ":") return true;
      return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
    }
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch, base, digits = [];
      if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
      }
      ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0") return 0;
      if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
      }
      if (value.indexOf(":") !== -1) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseInt(value, 10);
    }
    function isInteger(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        /* eslint-disable max-len */
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/float.js
var require_float3 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/float.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    function resolveYamlFloat(data) {
      if (data === null) return false;
      if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === "_") {
        return false;
      }
      return true;
    }
    function constructYamlFloat(data) {
      var value, sign, base, digits;
      value = data.replace(/_/g, "").toLowerCase();
      sign = value[0] === "-" ? -1 : 1;
      digits = [];
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      } else if (value.indexOf(":") >= 0) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseFloat(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema/json.js
var require_json = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema4();
    module2.exports = new Schema({
      include: [
        require_failsafe()
      ],
      implicit: [
        require_null2(),
        require_bool3(),
        require_int3(),
        require_float3()
      ]
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema/core.js
var require_core = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema4();
    module2.exports = new Schema({
      include: [
        require_json()
      ]
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/timestamp.js
var require_timestamp2 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    function resolveYamlTimestamp(data) {
      if (data === null) return false;
      if (YAML_DATE_REGEXP.exec(data) !== null) return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
      match = YAML_DATE_REGEXP.exec(data);
      if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match === null) throw new Error("Date resolve error");
      year = +match[1];
      month = +match[2] - 1;
      day = +match[3];
      if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = +match[4];
      minute = +match[5];
      second = +match[6];
      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 6e4;
        if (match[9] === "-") delta = -delta;
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
      if (delta) date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    module2.exports = new Type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/merge.js
var require_merge2 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/binary.js
var require_binary2 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports2, module2) {
    "use strict";
    var NodeBuffer;
    try {
      _require = __require;
      NodeBuffer = _require("buffer").Buffer;
    } catch (__) {
    }
    var _require;
    var Type = require_type();
    var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null) return false;
      var code2, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        code2 = map.indexOf(data.charAt(idx));
        if (code2 > 64) continue;
        if (code2 < 0) return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
      for (idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
      }
      tailbits = max % 4 * 6;
      if (tailbits === 0) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push(bits >> 10 & 255);
        result.push(bits >> 2 & 255);
      } else if (tailbits === 12) {
        result.push(bits >> 4 & 255);
      }
      if (NodeBuffer) {
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
      }
      return result;
    }
    function representYamlBinary(object) {
      var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map[bits >> 18 & 63];
          result += map[bits >> 12 & 63];
          result += map[bits >> 6 & 63];
          result += map[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      tail = max % 3;
      if (tail === 0) {
        result += map[bits >> 18 & 63];
        result += map[bits >> 12 & 63];
        result += map[bits >> 6 & 63];
        result += map[bits & 63];
      } else if (tail === 2) {
        result += map[bits >> 10 & 63];
        result += map[bits >> 4 & 63];
        result += map[bits << 2 & 63];
        result += map[64];
      } else if (tail === 1) {
        result += map[bits >> 2 & 63];
        result += map[bits << 4 & 63];
        result += map[64];
        result += map[64];
      }
      return result;
    }
    function isBinary(object) {
      return NodeBuffer && NodeBuffer.isBuffer(object);
    }
    module2.exports = new Type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/omap.js
var require_omap2 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null) return true;
      var objectKeys = {}, index, length, pair, pairKey, pairHasKey, object = data;
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
        if (_toString.call(pair) !== "[object Object]") return false;
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey) pairHasKey = true;
            else return false;
          }
        }
        if (!pairHasKey) return false;
        if (_hasOwnProperty.call(objectKeys, pairKey)) return false;
        Object.defineProperty(objectKeys, pairKey, { value: true });
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    module2.exports = new Type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/pairs.js
var require_pairs2 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _toString = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null) return true;
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if (_toString.call(pair) !== "[object Object]") return false;
        keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [keys[0], pair[keys[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null) return [];
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [keys[0], pair[keys[0]]];
      }
      return result;
    }
    module2.exports = new Type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/set.js
var require_set2 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/set.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null) return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null) return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    module2.exports = new Type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
var require_default_safe = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema4();
    module2.exports = new Schema({
      include: [
        require_core()
      ],
      implicit: [
        require_timestamp2(),
        require_merge2()
      ],
      explicit: [
        require_binary2(),
        require_omap2(),
        require_pairs2(),
        require_set2()
      ]
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
var require_undefined = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptUndefined() {
      return true;
    }
    function constructJavascriptUndefined() {
      return void 0;
    }
    function representJavascriptUndefined() {
      return "";
    }
    function isUndefined(object) {
      return typeof object === "undefined";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/undefined", {
      kind: "scalar",
      resolve: resolveJavascriptUndefined,
      construct: constructJavascriptUndefined,
      predicate: isUndefined,
      represent: representJavascriptUndefined
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
var require_regexp = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptRegExp(data) {
      if (data === null) return false;
      if (data.length === 0) return false;
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        if (modifiers.length > 3) return false;
        if (regexp[regexp.length - modifiers.length - 1] !== "/") return false;
      }
      return true;
    }
    function constructJavascriptRegExp(data) {
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail) modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
      }
      return new RegExp(regexp, modifiers);
    }
    function representJavascriptRegExp(object) {
      var result = "/" + object.source + "/";
      if (object.global) result += "g";
      if (object.multiline) result += "m";
      if (object.ignoreCase) result += "i";
      return result;
    }
    function isRegExp(object) {
      return Object.prototype.toString.call(object) === "[object RegExp]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/regexp", {
      kind: "scalar",
      resolve: resolveJavascriptRegExp,
      construct: constructJavascriptRegExp,
      predicate: isRegExp,
      represent: representJavascriptRegExp
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/js/function.js
var require_function = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports2, module2) {
    "use strict";
    var esprima;
    try {
      _require = __require;
      esprima = _require("esprima");
    } catch (_) {
      if (typeof window !== "undefined") esprima = window.esprima;
    }
    var _require;
    var Type = require_type();
    function resolveJavascriptFunction(data) {
      if (data === null) return false;
      try {
        var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
        if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    function constructJavascriptFunction(data) {
      var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
      if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
        throw new Error("Failed to resolve function");
      }
      ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
      });
      body = ast.body[0].expression.body.range;
      if (ast.body[0].expression.body.type === "BlockStatement") {
        return new Function(params, source.slice(body[0] + 1, body[1] - 1));
      }
      return new Function(params, "return " + source.slice(body[0], body[1]));
    }
    function representJavascriptFunction(object) {
      return object.toString();
    }
    function isFunction(object) {
      return Object.prototype.toString.call(object) === "[object Function]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/function", {
      kind: "scalar",
      resolve: resolveJavascriptFunction,
      construct: constructJavascriptFunction,
      predicate: isFunction,
      represent: representJavascriptFunction
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema/default_full.js
var require_default_full = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema4();
    module2.exports = Schema.DEFAULT = new Schema({
      include: [
        require_default_safe()
      ],
      explicit: [
        require_undefined(),
        require_regexp(),
        require_function()
      ]
    });
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/loader.js
var require_loader = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/loader.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Mark = require_mark();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function is_EOL(c) {
      return c === 10 || c === 13;
    }
    function is_WHITE_SPACE(c) {
      return c === 9 || c === 32;
    }
    function is_WS_OR_EOL(c) {
      return c === 9 || c === 32 || c === 10 || c === 13;
    }
    function is_FLOW_INDICATOR(c) {
      return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    }
    function fromHexCode(c) {
      var lc;
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      lc = c | 32;
      if (97 <= lc && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c) {
      if (c === 120) {
        return 2;
      }
      if (c === 117) {
        return 4;
      }
      if (c === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c) {
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c) {
      return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
    }
    function charFromCodepoint(c) {
      if (c <= 65535) {
        return String.fromCharCode(c);
      }
      return String.fromCharCode(
        (c - 65536 >> 10) + 55296,
        (c - 65536 & 1023) + 56320
      );
    }
    function setProperty(object, key, value) {
      if (key === "__proto__") {
        Object.defineProperty(object, key, {
          configurable: true,
          enumerable: true,
          writable: true,
          value
        });
      } else {
        object[key] = value;
      }
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
    var i;
    function State(input, options2) {
      this.input = input;
      this.filename = options2["filename"] || null;
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.onWarning = options2["onWarning"] || null;
      this.legacy = options2["legacy"] || false;
      this.json = options2["json"] || false;
      this.listener = options2["listener"] || null;
      this.maxTotalMergeKeys = typeof options2["maxTotalMergeKeys"] === "number" ? options2["maxTotalMergeKeys"] : 1e4;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.totalMergeKeys = 0;
      this.documents = [];
    }
    function generateError(state, message2) {
      return new YAMLException(
        message2,
        new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart)
      );
    }
    function throwError(state, message2) {
      throw generateError(state, message2);
    }
    function throwWarning(state, message2) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message2));
      }
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        state.tagMap[handle] = prefix;
      }
    };
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
      if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function chargeMergeWork(state) {
      state.totalMergeKeys += 1;
      if (state.maxTotalMergeKeys !== -1 && state.totalMergeKeys > state.maxTotalMergeKeys) {
        throwError(state, "merge keys exceeded maxTotalMergeKeys (" + state.maxTotalMergeKeys + ")");
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;
      if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
      }
      chargeMergeWork(state);
      sourceKeys = Object.keys(source);
      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
        chargeMergeWork(state);
        if (!_hasOwnProperty.call(destination, key)) {
          setProperty(destination, key, source[key]);
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
      var index, quantity;
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
            keyNode[index] = "[object Object]";
          }
        }
      }
      if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          if (valueNode.length > 100) {
            throwError(state, "abnormal merge sequence size");
          }
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        setProperty(_result, keyNode, valueNode);
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      var ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (is_EOL(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);
      if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
      ch = state.input.charCodeAt(state.position);
      if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
        } else if (ch === 35) {
          preceding = state.input.charCodeAt(state.position - 1);
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a single quoted scalar");
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a double quoted scalar");
    }
    function readFlowCollection(state, nodeIndent) {
      var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(state, "unexpected end of the stream within a flow collection");
    }
    function readBlockScalar(state, nodeIndent) {
      var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (is_WHITE_SPACE(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!is_EOL(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (ch !== 45) {
          break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        _pos = state.position;
        if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
          }
          state.position += 1;
          ch = following;
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(state, "can not read an implicit mapping pair; a colon is missed");
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else {
          break;
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 33) return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, "unexpected end of the stream within a verbatim tag");
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, "named tag handle cannot contain such characters");
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, "tag suffix cannot contain flow indicator characters");
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      var _position, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 38) return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 42) return false;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
      }
      alias = state.input.slice(_position, state.position);
      if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag !== null && state.tag !== "!") {
        if (state.tag === "?") {
          if (state.result !== null && state.kind !== "scalar") {
            throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
          }
          for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
            type = state.implicitTypes[typeIndex];
            if (type.resolve(state.result)) {
              state.result = type.construct(state.result);
              state.tag = type.tag;
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
              break;
            }
          }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
          type = state.typeMap[state.kind || "fallback"][state.tag];
          if (state.result !== null && type.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
          }
          if (!type.resolve(state.result)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
          } else {
            state.result = type.construct(state.result);
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = {};
      state.anchorMap = {};
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(state, "directive name must not be less than one character in length");
        }
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !is_EOL(ch));
            break;
          }
          if (is_EOL(ch)) break;
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
      skipSeparationSpace(state, true, -1);
      if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
      } else {
        return;
      }
    }
    function loadDocuments(input, options2) {
      input = String(input);
      options2 = options2 || {};
      if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      var state = new State(input, options2);
      var nullpos = input.indexOf("\0");
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
      }
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll(input, iterator, options2) {
      if (iterator !== null && typeof iterator === "object" && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      var documents = loadDocuments(input, options2);
      if (typeof iterator !== "function") {
        return documents;
      }
      for (var index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }
    function load(input, options2) {
      var documents = loadDocuments(input, options2);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException("expected a single document in the stream, but found more");
    }
    function safeLoadAll(input, iterator, options2) {
      if (typeof iterator === "object" && iterator !== null && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    function safeLoad(input, options2) {
      return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.loadAll = loadAll;
    module2.exports.load = load;
    module2.exports.safeLoadAll = safeLoadAll;
    module2.exports.safeLoad = safeLoad;
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml/dumper.js
var require_dumper = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml/dumper.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var _toString = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_CARRIAGE_RETURN = 13;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    function compileStyleMap(schema, map) {
      var result, keys, index, length, tag, style, type;
      if (map === null) return {};
      result = {};
      keys = Object.keys(map);
      for (index = 0, length = keys.length; index < length; index += 1) {
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
          tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type = schema.compiledTypeMap["fallback"][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
          style = type.styleAliases[style];
        }
        result[tag] = style;
      }
      return result;
    }
    function encodeHex(character) {
      var string, handle, length;
      string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
      }
      return "\\" + handle + common.repeat("0", length - string.length) + string;
    }
    function State(options2) {
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.indent = Math.max(1, options2["indent"] || 2);
      this.noArrayIndent = options2["noArrayIndent"] || false;
      this.skipInvalid = options2["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options2["flowLevel"]) ? -1 : options2["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options2["styles"] || null);
      this.sortKeys = options2["sortKeys"] || false;
      this.lineWidth = options2["lineWidth"] || 80;
      this.noRefs = options2["noRefs"] || false;
      this.noCompatMode = options2["noCompatMode"] || false;
      this.condenseFlow = options2["condenseFlow"] || false;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
      while (position < length) {
        next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str2) {
      var index, length, type;
      for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type = state.implicitTypes[index];
        if (type.resolve(str2)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
    function isPrintable(c) {
      return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
    }
    function isNsChar(c) {
      return isPrintable(c) && !isWhitespace(c) && c !== 65279 && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
    }
    function isPlainSafe(c, prev) {
      return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
    }
    function isPlainSafeFirst(c) {
      return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    }
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
      var i;
      var char, prev_char;
      var hasLineBreak = false;
      var hasFoldableLine = false;
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1;
      var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
      if (singleLineOnly) {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
      } else {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
              i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
              previousLineBreak = i;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    function writeScalar(state, string, level, iskey) {
      state.dump = function() {
        if (string.length === 0) {
          return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
          return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string, lineWidth) + '"';
          default:
            throw new YAMLException("impossible error: invalid scalar style");
        }
      }();
    }
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
      var clip = string[string.length - 1] === "\n";
      var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
      var chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      var lineRe = /(\n+)([^\n]*)/g;
      var result = function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      }();
      var prevMoreIndented = string[0] === "\n" || string[0] === " ";
      var moreIndented;
      var match;
      while (match = lineRe.exec(string)) {
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ") return line;
      var breakRe = / [^ ]/g;
      var match;
      var start = 0, end, curr = 0, next = 0;
      var result = "";
      while (match = breakRe.exec(line)) {
        next = match.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      var result = "";
      var char, nextChar;
      var escapeSeq;
      for (var i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char >= 55296 && char <= 56319) {
          nextChar = string.charCodeAt(i + 1);
          if (nextChar >= 56320 && nextChar <= 57343) {
            result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
            i++;
            continue;
          }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level, object[index], false, false)) {
          if (index !== 0) _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level + 1, object[index], true, true)) {
          if (!compact || index !== 0) {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (index !== 0) pairBuffer += ", ";
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new YAMLException("sortKeys must be a boolean or a function");
      }
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (!compact || index !== 0) {
          pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      var _result, typeList, index, length, type, style;
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (index = 0, length = typeList.length; index < length; index += 1) {
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
          state.tag = explicit ? type.tag : "?";
          if (type.represent) {
            style = state.styleMap[type.tag] || type.defaultStyle;
            if (_toString.call(type.represent) === "[object Function]") {
              _result = type.represent(object, style);
            } else if (_hasOwnProperty.call(type.represent, style)) {
              _result = type.represent[style](object, style);
            } else {
              throw new YAMLException("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(state, level, object, block, compact, iskey) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      var type = _toString.call(state.dump);
      if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
      }
      var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
          if (block && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object Array]") {
          var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
          if (block && state.dump.length !== 0) {
            writeBlockSequence(state, arrayLevel, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, arrayLevel, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey);
          }
        } else {
          if (state.skipInvalid) return false;
          throw new YAMLException("unacceptable kind of an object to dump " + type);
        }
        if (state.tag !== null && state.tag !== "?") {
          state.dump = "!<" + state.tag + "> " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      var objects = [], duplicatesIndexes = [], index, length;
      inspectNode(object, objects, duplicatesIndexes);
      for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList, index, length;
      if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (index = 0, length = object.length; index < length; index += 1) {
              inspectNode(object[index], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
            for (index = 0, length = objectKeyList.length; index < length; index += 1) {
              inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump(input, options2) {
      options2 = options2 || {};
      var state = new State(options2);
      if (!state.noRefs) getDuplicateReferences(input, state);
      if (writeNode(state, 0, input, true, true)) return state.dump + "\n";
      return "";
    }
    function safeDump(input, options2) {
      return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.dump = dump;
    module2.exports.safeDump = safeDump;
  }
});

// ../praxis-ba/node_modules/js-yaml/lib/js-yaml.js
var require_js_yaml = __commonJS({
  "../praxis-ba/node_modules/js-yaml/lib/js-yaml.js"(exports2, module2) {
    "use strict";
    var loader = require_loader();
    var dumper = require_dumper();
    function deprecated(name) {
      return function() {
        throw new Error("Function " + name + " is deprecated and cannot be used.");
      };
    }
    module2.exports.Type = require_type();
    module2.exports.Schema = require_schema4();
    module2.exports.FAILSAFE_SCHEMA = require_failsafe();
    module2.exports.JSON_SCHEMA = require_json();
    module2.exports.CORE_SCHEMA = require_core();
    module2.exports.DEFAULT_SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_FULL_SCHEMA = require_default_full();
    module2.exports.load = loader.load;
    module2.exports.loadAll = loader.loadAll;
    module2.exports.safeLoad = loader.safeLoad;
    module2.exports.safeLoadAll = loader.safeLoadAll;
    module2.exports.dump = dumper.dump;
    module2.exports.safeDump = dumper.safeDump;
    module2.exports.YAMLException = require_exception();
    module2.exports.MINIMAL_SCHEMA = require_failsafe();
    module2.exports.SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_SCHEMA = require_default_full();
    module2.exports.scan = deprecated("scan");
    module2.exports.parse = deprecated("parse");
    module2.exports.compose = deprecated("compose");
    module2.exports.addConstructor = deprecated("addConstructor");
  }
});

// ../praxis-ba/node_modules/js-yaml/index.js
var require_js_yaml2 = __commonJS({
  "../praxis-ba/node_modules/js-yaml/index.js"(exports2, module2) {
    "use strict";
    var yaml2 = require_js_yaml();
    module2.exports = yaml2;
  }
});

// ../praxis-ba/node_modules/gray-matter/lib/engines.js
var require_engines = __commonJS({
  "../praxis-ba/node_modules/gray-matter/lib/engines.js"(exports, module) {
    "use strict";
    var yaml = require_js_yaml2();
    var engines = exports = module.exports;
    engines.yaml = {
      parse: yaml.safeLoad.bind(yaml),
      stringify: yaml.safeDump.bind(yaml)
    };
    engines.json = {
      parse: JSON.parse.bind(JSON),
      stringify: function(obj, options2) {
        const opts = Object.assign({ replacer: null, space: 2 }, options2);
        return JSON.stringify(obj, opts.replacer, opts.space);
      }
    };
    engines.javascript = {
      parse: function parse(str, options, wrap) {
        try {
          if (wrap !== false) {
            str = "(function() {\nreturn " + str.trim() + ";\n}());";
          }
          return eval(str) || {};
        } catch (err) {
          if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
            return parse(str, options, false);
          }
          throw new SyntaxError(err);
        }
      },
      stringify: function() {
        throw new Error("stringifying JavaScript is not supported");
      }
    };
  }
});

// ../praxis-ba/node_modules/strip-bom-string/index.js
var require_strip_bom_string = __commonJS({
  "../praxis-ba/node_modules/strip-bom-string/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(str2) {
      if (typeof str2 === "string" && str2.charAt(0) === "\uFEFF") {
        return str2.slice(1);
      }
      return str2;
    };
  }
});

// ../praxis-ba/node_modules/gray-matter/lib/utils.js
var require_utils = __commonJS({
  "../praxis-ba/node_modules/gray-matter/lib/utils.js"(exports2) {
    "use strict";
    var stripBom = require_strip_bom_string();
    var typeOf = require_kind_of();
    exports2.define = function(obj, key, val) {
      Reflect.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: val
      });
    };
    exports2.isBuffer = function(val) {
      return typeOf(val) === "buffer";
    };
    exports2.isObject = function(val) {
      return typeOf(val) === "object";
    };
    exports2.toBuffer = function(input) {
      return typeof input === "string" ? Buffer.from(input) : input;
    };
    exports2.toString = function(input) {
      if (exports2.isBuffer(input)) return stripBom(String(input));
      if (typeof input !== "string") {
        throw new TypeError("expected input to be a string or buffer");
      }
      return stripBom(input);
    };
    exports2.arrayify = function(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    exports2.startsWith = function(str2, substr, len) {
      if (typeof len !== "number") len = substr.length;
      return str2.slice(0, len) === substr;
    };
  }
});

// ../praxis-ba/node_modules/gray-matter/lib/defaults.js
var require_defaults = __commonJS({
  "../praxis-ba/node_modules/gray-matter/lib/defaults.js"(exports2, module2) {
    "use strict";
    var engines2 = require_engines();
    var utils = require_utils();
    module2.exports = function(options2) {
      const opts = Object.assign({}, options2);
      opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || "---");
      if (opts.delimiters.length === 1) {
        opts.delimiters.push(opts.delimiters[0]);
      }
      opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
      opts.engines = Object.assign({}, engines2, opts.parsers, opts.engines);
      return opts;
    };
  }
});

// ../praxis-ba/node_modules/gray-matter/lib/engine.js
var require_engine = __commonJS({
  "../praxis-ba/node_modules/gray-matter/lib/engine.js"(exports2, module2) {
    "use strict";
    module2.exports = function(name, options2) {
      let engine = options2.engines[name] || options2.engines[aliase(name)];
      if (typeof engine === "undefined") {
        throw new Error('gray-matter engine "' + name + '" is not registered');
      }
      if (typeof engine === "function") {
        engine = { parse: engine };
      }
      return engine;
    };
    function aliase(name) {
      switch (name.toLowerCase()) {
        case "js":
        case "javascript":
          return "javascript";
        case "coffee":
        case "coffeescript":
        case "cson":
          return "coffee";
        case "yaml":
        case "yml":
          return "yaml";
        default: {
          return name;
        }
      }
    }
  }
});

// ../praxis-ba/node_modules/gray-matter/lib/stringify.js
var require_stringify2 = __commonJS({
  "../praxis-ba/node_modules/gray-matter/lib/stringify.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(file, data, options2) {
      if (data == null && options2 == null) {
        switch (typeOf(file)) {
          case "object":
            data = file.data;
            options2 = {};
            break;
          case "string":
            return file;
          default: {
            throw new TypeError("expected file to be a string or object");
          }
        }
      }
      const str2 = file.content;
      const opts = defaults(options2);
      if (data == null) {
        if (!opts.data) return file;
        data = opts.data;
      }
      const language = file.language || opts.language;
      const engine = getEngine(language, opts);
      if (typeof engine.stringify !== "function") {
        throw new TypeError('expected "' + language + '.stringify" to be a function');
      }
      data = Object.assign({}, file.data, data);
      const open = opts.delimiters[0];
      const close = opts.delimiters[1];
      const matter5 = engine.stringify(data, options2).trim();
      let buf = "";
      if (matter5 !== "{}") {
        buf = newline(open) + newline(matter5) + newline(close);
      }
      if (typeof file.excerpt === "string" && file.excerpt !== "") {
        if (str2.indexOf(file.excerpt.trim()) === -1) {
          buf += newline(file.excerpt) + newline(close);
        }
      }
      return buf + newline(str2);
    };
    function newline(str2) {
      return str2.slice(-1) !== "\n" ? str2 + "\n" : str2;
    }
  }
});

// ../praxis-ba/node_modules/gray-matter/lib/excerpt.js
var require_excerpt = __commonJS({
  "../praxis-ba/node_modules/gray-matter/lib/excerpt.js"(exports2, module2) {
    "use strict";
    var defaults = require_defaults();
    module2.exports = function(file, options2) {
      const opts = defaults(options2);
      if (file.data == null) {
        file.data = {};
      }
      if (typeof opts.excerpt === "function") {
        return opts.excerpt(file, opts);
      }
      const sep5 = file.data.excerpt_separator || opts.excerpt_separator;
      if (sep5 == null && (opts.excerpt === false || opts.excerpt == null)) {
        return file;
      }
      const delimiter = typeof opts.excerpt === "string" ? opts.excerpt : sep5 || opts.delimiters[0];
      const idx = file.content.indexOf(delimiter);
      if (idx !== -1) {
        file.excerpt = file.content.slice(0, idx);
      }
      return file;
    };
  }
});

// ../praxis-ba/node_modules/gray-matter/lib/to-file.js
var require_to_file = __commonJS({
  "../praxis-ba/node_modules/gray-matter/lib/to-file.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var stringify2 = require_stringify2();
    var utils = require_utils();
    module2.exports = function(file) {
      if (typeOf(file) !== "object") {
        file = { content: file };
      }
      if (typeOf(file.data) !== "object") {
        file.data = {};
      }
      if (file.contents && file.content == null) {
        file.content = file.contents;
      }
      utils.define(file, "orig", utils.toBuffer(file.content));
      utils.define(file, "language", file.language || "");
      utils.define(file, "matter", file.matter || "");
      utils.define(file, "stringify", function(data, options2) {
        if (options2 && options2.language) {
          file.language = options2.language;
        }
        return stringify2(file, data, options2);
      });
      file.content = utils.toString(file.content);
      file.isEmpty = false;
      file.excerpt = "";
      return file;
    };
  }
});

// ../praxis-ba/node_modules/gray-matter/lib/parse.js
var require_parse = __commonJS({
  "../praxis-ba/node_modules/gray-matter/lib/parse.js"(exports2, module2) {
    "use strict";
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(language, str2, options2) {
      const opts = defaults(options2);
      const engine = getEngine(language, opts);
      if (typeof engine.parse !== "function") {
        throw new TypeError('expected "' + language + '.parse" to be a function');
      }
      return engine.parse(str2, opts);
    };
  }
});

// ../praxis-ba/node_modules/gray-matter/index.js
var require_gray_matter = __commonJS({
  "../praxis-ba/node_modules/gray-matter/index.js"(exports2, module2) {
    "use strict";
    var fs = __require("fs");
    var sections = require_section_matter();
    var defaults = require_defaults();
    var stringify2 = require_stringify2();
    var excerpt = require_excerpt();
    var engines2 = require_engines();
    var toFile = require_to_file();
    var parse2 = require_parse();
    var utils = require_utils();
    function matter5(input, options2) {
      if (input === "") {
        return { data: {}, content: input, excerpt: "", orig: input };
      }
      let file = toFile(input);
      const cached = matter5.cache[file.content];
      if (!options2) {
        if (cached) {
          file = Object.assign({}, cached);
          file.orig = cached.orig;
          return file;
        }
        matter5.cache[file.content] = file;
      }
      return parseMatter(file, options2);
    }
    function parseMatter(file, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      const close = "\n" + opts.delimiters[1];
      let str2 = file.content;
      if (opts.language) {
        file.language = opts.language;
      }
      const openLen = open.length;
      if (!utils.startsWith(str2, open, openLen)) {
        excerpt(file, opts);
        return file;
      }
      if (str2.charAt(openLen) === open.slice(-1)) {
        return file;
      }
      str2 = str2.slice(openLen);
      const len = str2.length;
      const language = matter5.language(str2, opts);
      if (language.name) {
        file.language = language.name;
        str2 = str2.slice(language.raw.length);
      }
      let closeIndex = str2.indexOf(close);
      if (closeIndex === -1) {
        closeIndex = len;
      }
      file.matter = str2.slice(0, closeIndex);
      const block = file.matter.replace(/^\s*#[^\n]+/gm, "").trim();
      if (block === "") {
        file.isEmpty = true;
        file.empty = file.content;
        file.data = {};
      } else {
        file.data = parse2(file.language, file.matter, opts);
      }
      if (closeIndex === len) {
        file.content = "";
      } else {
        file.content = str2.slice(closeIndex + close.length);
        if (file.content[0] === "\r") {
          file.content = file.content.slice(1);
        }
        if (file.content[0] === "\n") {
          file.content = file.content.slice(1);
        }
      }
      excerpt(file, opts);
      if (opts.sections === true || typeof opts.section === "function") {
        sections(file, opts.section);
      }
      return file;
    }
    matter5.engines = engines2;
    matter5.stringify = function(file, data, options2) {
      if (typeof file === "string") file = matter5(file, options2);
      return stringify2(file, data, options2);
    };
    matter5.read = function(filepath, options2) {
      const str2 = fs.readFileSync(filepath, "utf8");
      const file = matter5(str2, options2);
      file.path = filepath;
      return file;
    };
    matter5.test = function(str2, options2) {
      return utils.startsWith(str2, defaults(options2).delimiters[0]);
    };
    matter5.language = function(str2, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      if (matter5.test(str2)) {
        str2 = str2.slice(open.length);
      }
      const language = str2.slice(0, str2.search(/\r?\n/));
      return {
        raw: language,
        name: language ? language.trim() : ""
      };
    };
    matter5.cache = {};
    matter5.clearCache = function() {
      matter5.cache = {};
    };
    module2.exports = matter5;
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/parse.js
import { readFileSync } from "node:fs";
function parsePage(raw, type) {
  const { data, content } = (0, import_gray_matter.default)(raw, { engines: { yaml: yamlEngine } });
  const frontmatterInput = data;
  const validation = validateFrontmatter(type, frontmatterInput);
  if (!validation.ok)
    return { error: validation.issues.join("; ") };
  const body = content;
  const acs = type === "fr" ? parseAcBlock(body).acs : [];
  return { frontmatter: validation.data, body, acs };
}
function parseFile(path, type) {
  let raw;
  try {
    raw = readFileSync(path, "utf8");
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
  return parsePage(raw, type);
}
function peekType(raw) {
  const { data } = (0, import_gray_matter.default)(raw);
  if (typeof data !== "object" || data === null)
    return void 0;
  const type = data.type;
  return typeof type === "string" ? type : void 0;
}
var import_gray_matter, import_yaml, yamlEngine;
var init_parse = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/parse.js"() {
    "use strict";
    import_gray_matter = __toESM(require_gray_matter(), 1);
    import_yaml = __toESM(require_dist(), 1);
    init_ac();
    init_schema();
    yamlEngine = {
      parse: (input) => (0, import_yaml.parse)(input)
    };
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/serialize.js
function naturalCompare(a, b) {
  const aRuns = a.match(RUN) ?? [a];
  const bRuns = b.match(RUN) ?? [b];
  const len = Math.max(aRuns.length, bRuns.length);
  for (let i = 0; i < len; i++) {
    const aRun = aRuns[i];
    const bRun = bRuns[i];
    if (aRun === void 0)
      return -1;
    if (bRun === void 0)
      return 1;
    if (aRun === bRun)
      continue;
    const aIsNum = ALL_DIGITS.test(aRun);
    const bIsNum = ALL_DIGITS.test(bRun);
    if (aIsNum && bIsNum) {
      const diff = Number(aRun) - Number(bRun);
      if (diff !== 0)
        return diff < 0 ? -1 : 1;
      return aRun.length < bRun.length ? -1 : 1;
    }
    return aRun < bRun ? -1 : 1;
  }
  return 0;
}
function sortRefs(values) {
  return [...values].sort(naturalCompare);
}
function isStringArray(value) {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}
function emitPage(type, frontmatter, body) {
  const fm = frontmatter;
  const refKeys = REF_ARRAY_KEYS[type];
  const ordered = {};
  for (const key of KEY_ORDER[type]) {
    if (!(key in fm))
      continue;
    const value = fm[key];
    if (value === void 0 || value === null)
      continue;
    ordered[key] = refKeys.includes(key) && isStringArray(value) ? sortRefs(value) : value;
  }
  const yamlBlock = (0, import_yaml2.stringify)(ordered, STRINGIFY_OPTIONS);
  return `---
${yamlBlock}---
${normalizeTrailingNewline(body)}`;
}
function normalizeTrailingNewline(body) {
  const content = body.replace(/\n+$/, "");
  return content === "" ? "" : `${content}
`;
}
function byNaturalId(nodes) {
  return [...nodes].sort((a, b) => naturalCompare(a.frontmatter.id, b.frontmatter.id));
}
function exportPrd(graph) {
  const lines = ["# PRD", ""];
  for (const epic of byNaturalId(graph.epics)) {
    lines.push(`## ${epic.frontmatter.id} \u2014 ${epic.frontmatter.title}`, "");
    const epicFrs = byNaturalId(graph.frs.filter((fr) => fr.frontmatter.epic === epic.frontmatter.id));
    for (const fr of epicFrs) {
      lines.push(`### ${fr.frontmatter.id} (${fr.frontmatter.status})`, "", fr.body.trim(), "");
    }
    const epicNfrs = byNaturalId(graph.nfrs.filter((nfr) => nfr.frontmatter.epic === epic.frontmatter.id));
    for (const nfr of epicNfrs) {
      lines.push(`### ${nfr.frontmatter.id} (${nfr.frontmatter.status})`, "", nfr.body.trim(), "");
    }
  }
  return `${lines.join("\n").trimEnd()}
`;
}
function exportRtm(graph) {
  const rows = [];
  for (const fr of graph.frs) {
    const wpIds = byNaturalId(graph.wps.filter((wp) => graph.wpDelivers(wp.frontmatter.id).includes(fr.frontmatter.id))).map((wp) => wp.frontmatter.id);
    const wpsCell = wpIds.length > 0 ? wpIds.join(", ") : "\u2014";
    const crIds = fr.frontmatter.traces_to.length > 0 ? sortRefs(fr.frontmatter.traces_to) : ["\u2014"];
    for (const cr of crIds)
      rows.push({ cr, fr: fr.frontmatter.id, wps: wpsCell });
  }
  rows.sort((a, b) => naturalCompare(a.cr, b.cr) || naturalCompare(a.fr, b.fr));
  const lines = ["# RTM", "", "| CR | FR | WP |", "| --- | --- | --- |", ...rows.map((r) => `| ${r.cr} | ${r.fr} | ${r.wps} |`)];
  return `${lines.join("\n")}
`;
}
function exportBacklog(graph) {
  const openCrs = byNaturalId(graph.crs.filter((cr) => cr.frontmatter.status !== "resolved"));
  const openWps = byNaturalId(graph.wps.filter((wp) => wp.frontmatter.status !== "accepted" && wp.frontmatter.status !== "abandoned"));
  const openBugs = byNaturalId(graph.bugs.filter((bug) => bug.frontmatter.status === "open"));
  const lines = ["# Backlog", "", "## Change Requests", ""];
  for (const cr of openCrs)
    lines.push(`- ${cr.frontmatter.id} (${cr.frontmatter.status})`);
  lines.push("", "## Work Packages", "");
  for (const wp of openWps)
    lines.push(`- ${wp.frontmatter.id} (${wp.frontmatter.status})`);
  lines.push("", "## Bugs", "");
  for (const bug of openBugs)
    lines.push(`- ${bug.frontmatter.id} (${bug.frontmatter.severity})`);
  return `${lines.join("\n").trimEnd()}
`;
}
var import_yaml2, RUN, ALL_DIGITS, KEY_ORDER, REF_ARRAY_KEYS, STRINGIFY_OPTIONS;
var init_serialize = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/serialize.js"() {
    "use strict";
    import_yaml2 = __toESM(require_dist(), 1);
    RUN = /(\d+|\D+)/g;
    ALL_DIGITS = /^\d+$/;
    KEY_ORDER = {
      vision: ["type", "status", "confirmed_at", "confirmed_by"],
      fr: [
        "id",
        "type",
        "epic",
        "status",
        "version",
        "traces_to",
        "enforces",
        "references_nfr",
        "related",
        "goal_ids",
        "baseline",
        "supersedes",
        "superseded_by",
        "provenance"
      ],
      nfr: [
        "id",
        "type",
        "epic",
        "status",
        "version",
        "traces_to",
        "verified_by",
        "related",
        "goal_ids",
        "baseline",
        "supersedes",
        "superseded_by",
        "provenance"
      ],
      br: [
        "id",
        "type",
        "epic",
        "kind",
        "enforcement",
        "status",
        "version",
        "goal_ids",
        "baseline",
        "supersedes",
        "superseded_by",
        "provenance"
      ],
      cr: ["id", "type", "status", "entry_point", "entry_point_confirmed", "impacts", "provenance", "spawned_from_bug"],
      wp: ["id", "type", "role", "status", "plan"],
      bug: ["id", "type", "status", "severity", "affects", "reported", "reporter", "spawned_cr"],
      epic: ["id", "type", "title", "status"],
      goal: ["id", "type", "title", "status"]
    };
    REF_ARRAY_KEYS = {
      vision: [],
      fr: ["traces_to", "enforces", "references_nfr", "related", "goal_ids"],
      nfr: ["traces_to", "verified_by", "related", "goal_ids"],
      br: ["goal_ids"],
      cr: [],
      wp: [],
      bug: ["affects"],
      epic: [],
      goal: []
    };
    STRINGIFY_OPTIONS = { lineWidth: 0, aliasDuplicateObjects: false };
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/ids.js
import { closeSync, openSync, readFileSync as readFileSync2, renameSync, statSync, unlinkSync, writeFileSync, writeSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { join } from "node:path";
function countersPath(repo) {
  return join(repo, ".ba", "counters.yaml");
}
function lockPath(repo) {
  return join(repo, ".ba", ".lock");
}
function readCounters(repo) {
  const raw = readFileSync2(countersPath(repo), "utf8");
  const parsed = (0, import_yaml3.parse)(raw);
  const result = countersSchema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues.map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`);
    throw new Error(`ids: ${countersPath(repo)} failed schema validation: ${issues.join("; ")}`);
  }
  return result.data;
}
function writeCounters(repo, counters) {
  const validated = countersSchema.parse(counters);
  const dest = countersPath(repo);
  const tmp = join(repo, ".ba", `.counters.yaml.tmp-${process.pid}-${randomUUID()}`);
  writeFileSync(tmp, (0, import_yaml3.stringify)(validated, { lineWidth: 0 }), "utf8");
  renameSync(tmp, dest);
}
function errno(err) {
  return err instanceof Error && "code" in err ? err.code : void 0;
}
function isEexist(err) {
  return errno(err) === "EEXIST";
}
function isEnoent(err) {
  return errno(err) === "ENOENT";
}
function sleep(ms) {
  return new Promise((resolve3) => setTimeout(resolve3, ms));
}
function ownerIsAlive(lock) {
  let raw;
  try {
    raw = readFileSync2(lock, "utf8");
  } catch {
    return false;
  }
  const pid = Number(raw.trim());
  if (!Number.isInteger(pid) || pid <= 0)
    return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return errno(err) === "EPERM";
  }
}
function breakIfStale(lock) {
  let mtimeMs;
  try {
    mtimeMs = statSync(lock).mtimeMs;
  } catch {
    return false;
  }
  const age = Date.now() - mtimeMs;
  if (age <= STALE_LOCK_MS)
    return false;
  if (ownerIsAlive(lock))
    return false;
  console.warn(`ids: breaking stale lock ${lock} (age ${Math.round(age)}ms > ${STALE_LOCK_MS}ms)`);
  const claim = `${lock}.stale-${process.pid}-${randomUUID()}`;
  try {
    renameSync(lock, claim);
  } catch (err) {
    if (isEnoent(err))
      return false;
    throw err;
  }
  try {
    unlinkSync(claim);
  } catch {
  }
  return true;
}
async function acquireLock(repo) {
  const lock = lockPath(repo);
  const deadline = Date.now() + LOCK_ACQUIRE_TIMEOUT_MS;
  for (; ; ) {
    let fd;
    try {
      fd = openSync(lock, "wx");
    } catch (err) {
      if (!isEexist(err))
        throw err;
      if (breakIfStale(lock))
        continue;
      if (Date.now() >= deadline) {
        throw new Error(`ids: timed out acquiring lock ${lock} after ${LOCK_ACQUIRE_TIMEOUT_MS}ms`);
      }
      await sleep(LOCK_RETRY_INTERVAL_MS);
      continue;
    }
    try {
      writeSync(fd, String(process.pid));
      closeSync(fd);
    } catch (err) {
      try {
        closeSync(fd);
      } catch {
      }
      try {
        unlinkSync(lock);
      } catch {
      }
      throw err;
    }
    return;
  }
}
function releaseLock(repo) {
  try {
    unlinkSync(lockPath(repo));
  } catch {
  }
}
function pad3(n) {
  return String(n).padStart(3, "0");
}
function bump(counters, scope, date) {
  switch (scope.kind) {
    case "epic": {
      const n = counters.product.epic + 1;
      const id = `E${n}`;
      return {
        id,
        next: {
          ...counters,
          product: { ...counters.product, epic: n },
          // Proactively seed the epic's own fr/nfr/br bucket so a later
          // `{kind:'fr'|'nfr'|'br', epic: id}` allocation always finds an
          // entry (also harmless/idempotent if one already existed).
          epics: { ...counters.epics, [id]: counters.epics[id] ?? { fr: 0, nfr: 0, br: 0 } }
        }
      };
    }
    case "cr": {
      const n = counters.product.cr + 1;
      return { id: `CR-${pad3(n)}`, next: { ...counters, product: { ...counters.product, cr: n } } };
    }
    case "bug": {
      const n = counters.product.bug + 1;
      return { id: `BUG-${pad3(n)}`, next: { ...counters, product: { ...counters.product, bug: n } } };
    }
    case "wp": {
      if (date === void 0 || !DATE_KEY2.test(date)) {
        throw new Error("ids: allocateId scope 'wp' requires a 3rd argument \u2014 an explicit YYYYMMDD creation date (e.g. allocateId(repo, {kind:'wp'}, '20260713')) \u2014 this module never reads the clock");
      }
      const n = counters.product.wp + 1;
      return { id: `WP-${date}-${pad3(n)}`, next: { ...counters, product: { ...counters.product, wp: n } } };
    }
    case "fr":
    case "nfr":
    case "br": {
      const prior = counters.epics[scope.epic] ?? { fr: 0, nfr: 0, br: 0 };
      const n = prior[scope.kind] + 1;
      const nextEpicCounters = { ...prior, [scope.kind]: n };
      const suffix = scope.kind === "fr" ? "FR" : scope.kind === "nfr" ? "NFR" : "BR";
      return {
        id: `${scope.epic}-${suffix}${n}`,
        next: { ...counters, epics: { ...counters.epics, [scope.epic]: nextEpicCounters } }
      };
    }
  }
}
async function allocateId(repo, scope, date) {
  await acquireLock(repo);
  try {
    const counters = readCounters(repo);
    const { id, next } = bump(counters, scope, date);
    writeCounters(repo, next);
    return id;
  } finally {
    releaseLock(repo);
  }
}
async function allocateBaselineId(repo, date) {
  if (!DATE_KEY2.test(date))
    throw new Error(`ids: allocateBaselineId date must be YYYYMMDD, got ${JSON.stringify(date)}`);
  await acquireLock(repo);
  try {
    const counters = readCounters(repo);
    const prevSeq = counters.product.baselineSeq[date] ?? 0;
    const seq = prevSeq + 1;
    const id = seq === 1 ? `BL-${date}` : `BL-${date}-${seq}`;
    const next = {
      ...counters,
      product: { ...counters.product, baselineSeq: { ...counters.product.baselineSeq, [date]: seq } }
    };
    writeCounters(repo, next);
    return id;
  } finally {
    releaseLock(repo);
  }
}
function noteId(hwm, id) {
  const raiseMax = (key, n) => {
    const existing = hwm.get(key);
    if (!existing || n > existing.n)
      hwm.set(key, { n, id });
  };
  let m;
  if (m = WP_NUM.exec(id)) {
    raiseMax("product.wp", Number(m[2]));
    return;
  }
  if (m = FR_NUM.exec(id)) {
    raiseMax(`epics.E${m[1]}.fr`, Number(m[2]));
    return;
  }
  if (m = NFR_NUM.exec(id)) {
    raiseMax(`epics.E${m[1]}.nfr`, Number(m[2]));
    return;
  }
  if (m = BR_NUM.exec(id)) {
    raiseMax(`epics.E${m[1]}.br`, Number(m[2]));
    return;
  }
  if (m = EPIC_NUM.exec(id)) {
    raiseMax("product.epic", Number(m[1]));
    return;
  }
  if (m = CR_NUM.exec(id)) {
    raiseMax("product.cr", Number(m[1]));
    return;
  }
  if (m = BUG_NUM.exec(id)) {
    raiseMax("product.bug", Number(m[1]));
    return;
  }
  if (m = BASELINE_NUM.exec(id)) {
    const seq = m[2] !== void 0 ? Number(m[2]) : 1;
    raiseMax(`baselineSeq.${m[1]}`, seq);
    return;
  }
}
function flattenCounters(counters) {
  const flat = /* @__PURE__ */ new Map();
  flat.set("product.epic", counters.product.epic);
  flat.set("product.cr", counters.product.cr);
  flat.set("product.wp", counters.product.wp);
  flat.set("product.bug", counters.product.bug);
  for (const [date, seq] of Object.entries(counters.product.baselineSeq))
    flat.set(`baselineSeq.${date}`, seq);
  for (const [epicId, epicCounters] of Object.entries(counters.epics)) {
    flat.set(`epics.${epicId}.fr`, epicCounters.fr);
    flat.set(`epics.${epicId}.nfr`, epicCounters.nfr);
    flat.set(`epics.${epicId}.br`, epicCounters.br);
  }
  return flat;
}
function idOf(fm) {
  if (typeof fm !== "object" || fm === null || !("id" in fm))
    return void 0;
  const id = fm.id;
  return typeof id === "string" ? id : void 0;
}
function maxGuard(repo, pages, baselines) {
  const counters = readCounters(repo);
  const hwm = /* @__PURE__ */ new Map();
  for (const page of pages) {
    const id = idOf(page.frontmatter);
    if (id !== void 0)
      noteId(hwm, id);
  }
  for (const baseline of baselines) {
    noteId(hwm, baseline.id);
    for (const item of baseline.items)
      noteId(hwm, item.id);
  }
  for (const id of counters.retired)
    noteId(hwm, id);
  const ledger = flattenCounters(counters);
  const violations = [];
  for (const [key, { n, id }] of hwm) {
    const ledgerN = ledger.get(key) ?? 0;
    if (n > ledgerN)
      violations.push(`${key}: ledger=${ledgerN} but corpus has ${id} (${n})`);
  }
  violations.sort();
  return { ok: violations.length === 0, violations };
}
var import_yaml3, LOCK_ACQUIRE_TIMEOUT_MS, STALE_LOCK_MS, LOCK_RETRY_INTERVAL_MS, DATE_KEY2, EPIC_NUM, FR_NUM, NFR_NUM, BR_NUM, CR_NUM, WP_NUM, BUG_NUM, BASELINE_NUM;
var init_ids = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/ids.js"() {
    "use strict";
    import_yaml3 = __toESM(require_dist(), 1);
    init_schema();
    LOCK_ACQUIRE_TIMEOUT_MS = 1e4;
    STALE_LOCK_MS = 3e4;
    LOCK_RETRY_INTERVAL_MS = 25;
    DATE_KEY2 = /^\d{8}$/;
    EPIC_NUM = /^E(\d+)$/;
    FR_NUM = /^E(\d+)-FR(\d+)$/;
    NFR_NUM = /^E(\d+)-NFR(\d+)$/;
    BR_NUM = /^E(\d+)-BR(\d+)$/;
    CR_NUM = /^CR-(\d+)$/;
    WP_NUM = /^WP-(\d{8})-(\d+)$/;
    BUG_NUM = /^BUG-(\d+)$/;
    BASELINE_NUM = /^BL-(\d{8})(?:-(\d+))?$/;
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/history.js
function locateHistorySection(body) {
  const sentineled = SENTINELED_HISTORY.exec(body);
  if (sentineled) {
    const heading = sentineled[1];
    const headingStart = sentineled.index + SENTINEL.length + 1;
    return { headingStart, headingEnd: headingStart + heading.length, legacy: false };
  }
  const bareHeading = /^## History[ \t]*$/gm;
  let m;
  while (m = bareHeading.exec(body)) {
    const headingEnd = m.index + m[0].length;
    const rest = body.slice(headingEnd).replace(/^\n+/, "");
    if (/^### v\d+ — /.test(rest)) {
      return { headingStart: m.index, headingEnd, legacy: true };
    }
  }
  return null;
}
function formatHistoryHeading(version, date, ref) {
  return `### v${version} \u2014 ${date} \u2014 ${ref}`;
}
function historyCrRefs(body) {
  const loc = locateHistorySection(body);
  if (!loc)
    return [];
  const section2 = body.slice(loc.headingEnd);
  const refs = [];
  for (const m of section2.matchAll(/^#{3,6} v\d+ — \S+ — (\S+)[ \t]*$/gm)) {
    const ref = m[1];
    if (/^CR-\d{3}$/.test(ref))
      refs.push(ref);
  }
  return [...new Set(refs)];
}
function demoteHeadings(text) {
  return text.replace(/^###? /gm, (m) => m === "## " ? "#### " : "##### ");
}
function archiveIntoHistory(body, heading, priorBody) {
  const newEntry = `${heading}

${demoteHeadings(priorBody)}`;
  const loc = locateHistorySection(body);
  if (!loc) {
    const head = body.replace(/\n+$/, "");
    const prefix = head === "" ? "" : `${head}

`;
    return `${prefix}${SENTINEL}
## History

${newEntry}
`;
  }
  const beforeHistory = body.slice(0, loc.headingEnd);
  const rest = body.slice(loc.headingEnd).replace(/^\n+/, "");
  const restBlock = rest === "" ? "" : `

${rest}`;
  const spliced = `${beforeHistory}

${newEntry}${restBlock}`;
  if (!loc.legacy)
    return spliced;
  return `${spliced.slice(0, loc.headingStart)}${SENTINEL}
${spliced.slice(loc.headingStart)}`;
}
var HISTORY_HEADING_LINE, ENTRY_HEADING, SENTINEL, SENTINELED_HISTORY;
var init_history = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/history.js"() {
    "use strict";
    HISTORY_HEADING_LINE = /^## History[ \t]*$/m;
    ENTRY_HEADING = /^### v(\d+) — (\S+) — (\S+)[ \t]*$/gm;
    SENTINEL = "<!-- praxis-ba:history -->";
    SENTINELED_HISTORY = /^<!-- praxis-ba:history -->\n(## History[ \t]*)$/m;
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/fs.js
import { readFileSync as readFileSync3, readdirSync, statSync as statSync2 } from "node:fs";
import { join as join2 } from "node:path";
function configPath(repo) {
  return join2(repo, ".ba", "config.yaml");
}
function readCanonConfig(repo) {
  let raw;
  try {
    raw = readFileSync3(configPath(repo), "utf8");
  } catch {
    return void 0;
  }
  const parsed = (0, import_yaml4.parse)(raw);
  const result = configSchema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues.map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`);
    throw new Error(`config: ${configPath(repo)} failed schema validation: ${issues.join("; ")}`);
  }
  return result.data;
}
function walkMdFilesUnder(dir, out) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (EXCLUDED_DIR_NAMES.has(entry.name))
        continue;
      walkMdFilesUnder(join2(dir, entry.name), out);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      if (EXCLUDED_ATTACHMENT_FILENAMES.has(entry.name))
        continue;
      out.push(join2(dir, entry.name));
    }
  }
}
function walkRoot(repo, root) {
  const abs = join2(repo, root);
  let stat;
  try {
    stat = statSync2(abs);
  } catch {
    return [];
  }
  if (stat.isFile())
    return abs.endsWith(".md") ? [abs] : [];
  const out = [];
  walkMdFilesUnder(abs, out);
  return out;
}
function collectFromRoots(repo, roots) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const root of roots) {
    for (const file of walkRoot(repo, root)) {
      if (!seen.has(file)) {
        seen.add(file);
        out.push(file);
      }
    }
  }
  return out;
}
function walkCanonFiles(repo) {
  const config = readCanonConfig(repo);
  return collectFromRoots(repo, config?.canon_roots ?? DEFAULT_CANON_ROOTS);
}
var import_yaml4, DEFAULT_CANON_ROOTS, EXCLUDED_DIR_NAMES, EXCLUDED_ATTACHMENT_FILENAMES;
var init_fs = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/fs.js"() {
    "use strict";
    import_yaml4 = __toESM(require_dist(), 1);
    init_schema();
    DEFAULT_CANON_ROOTS = [
      "vision.md",
      "epics/",
      "br/",
      "cr/",
      "wp/",
      "bugs/",
      "goals/"
    ];
    EXCLUDED_DIR_NAMES = /* @__PURE__ */ new Set([
      ".ba",
      "baselines",
      ".git",
      "node_modules",
      "dist",
      "build",
      "coverage",
      "tmp",
      "vendor"
    ]);
    EXCLUDED_ATTACHMENT_FILENAMES = /* @__PURE__ */ new Set(["plan.md"]);
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/versiondiff.js
function normalize(body) {
  const lines = body.split(/\r\n|\r|\n/).map((line) => line.trim());
  while (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }
  return lines.join("\n");
}
function canonicalizeAcBlock(body, acs) {
  const lines = body.split("\n").map((line) => line.replace(/\r$/, ""));
  const headingIndex = lines.findIndex((line) => SECTION_HEADING.test(line));
  if (headingIndex === -1)
    return body;
  let endIndex = lines.length;
  for (let i = headingIndex + 1; i < lines.length; i++) {
    if (NEXT_HEADING.test(lines[i])) {
      endIndex = i;
      break;
    }
  }
  const sorted = [...acs].sort((a, b) => a.acId - b.acId);
  const canonicalBlock = [
    "## Acceptance Criteria",
    ...sorted.map((ac) => `- AC-${ac.acId}: ${ac.text}`)
  ];
  lines.splice(headingIndex, endIndex - headingIndex, ...canonicalBlock);
  return lines.join("\n");
}
function canonicalBody(type, body) {
  if (type !== "fr")
    return normalize(body);
  const { acs } = parseAcBlock(body);
  return normalize(canonicalizeAcBlock(body, acs));
}
function shouldBump(type, oldPage, newPage) {
  return canonicalBody(type, oldPage.body) !== canonicalBody(type, newPage.body);
}
var init_versiondiff = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/versiondiff.js"() {
    "use strict";
    init_ac();
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/scopelinks.js
function classify(id) {
  if (CR_ID.test(id))
    return "cr";
  if (FR_ID.test(id))
    return "fr";
  if (NFR_ID.test(id))
    return "nfr";
  if (BR_ID.test(id))
    return "br";
  return void 0;
}
function parseScope(body) {
  const out = { crs: [], frs: [], nfrs: [], brs: [], errors: [] };
  const scopeMatch = SCOPE_HEADING.exec(body);
  if (!scopeMatch) {
    out.errors.push("missing ## Scope section");
    return out;
  }
  const after = body.slice(scopeMatch.index + scopeMatch[0].length);
  const nextH2 = /^## /m.exec(after);
  const section2 = nextH2 ? after.slice(0, nextH2.index) : after;
  let current;
  for (const line of section2.split("\n")) {
    const sub = SUBSECTION.exec(line);
    if (sub) {
      current = sub[1];
      continue;
    }
    if (!line.startsWith("- "))
      continue;
    if (!current) {
      out.errors.push(`Scope link outside any subsection: ${line.trim()}`);
      continue;
    }
    const m = LINK_LINE.exec(line);
    if (!m) {
      out.errors.push(`malformed Scope link line under ### ${current}: ${line.trim()}`);
      continue;
    }
    const [, id, v, label, path, anchor] = m;
    const cls = classify(id);
    if (!cls || !BUCKET_FOR[current].has(cls)) {
      out.errors.push(`### ${current} does not accept id ${id} (${cls ?? "unrecognized id shape"})`);
      continue;
    }
    const ref = { id, path };
    if (v !== void 0)
      ref.version = Number(v);
    if (label !== void 0)
      ref.label = label;
    if (anchor !== void 0)
      ref.anchor = anchor;
    if (cls === "cr")
      out.crs.push(ref);
    else if (cls === "fr")
      out.frs.push(ref);
    else if (cls === "nfr")
      out.nfrs.push(ref);
    else
      out.brs.push(ref);
  }
  if (out.frs.length === 0)
    out.errors.push("### Delivers lists no FR link");
  return out;
}
function slugifyHeading(text) {
  return text.toLowerCase().replace(/[^a-z0-9 _-]/g, "").replace(/ /g, "-");
}
function pageAnchors(body) {
  const seen = /* @__PURE__ */ new Map();
  const out = /* @__PURE__ */ new Set();
  for (const m of body.matchAll(/^#{1,6} (.+)$/gm)) {
    const base = slugifyHeading(m[1]);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.add(n === 0 ? base : `${base}-${n}`);
  }
  return out;
}
var SCOPE_HEADING, LINK_LINE, BUCKET_FOR, SUBSECTION;
var init_scopelinks = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/scopelinks.js"() {
    "use strict";
    init_schema();
    SCOPE_HEADING = /^## Scope[ \t]*$/m;
    LINK_LINE = /^- \[([A-Z0-9-]+)(?: v(\d+))?(?: — (.+?))?\]\(([^)#\s]+)(?:#([A-Za-z0-9_-]+))?\)[ \t]*$/;
    BUCKET_FOR = {
      "Change requests": /* @__PURE__ */ new Set(["cr"]),
      Delivers: /* @__PURE__ */ new Set(["fr"]),
      Constraints: /* @__PURE__ */ new Set(["nfr", "br"])
    };
    SUBSECTION = new RegExp(`^### (${Object.keys(BUCKET_FOR).join("|")})[ \\t]*$`);
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/graph.js
function nodeTypeOf(fm) {
  if (typeof fm !== "object" || fm === null || !("type" in fm))
    return void 0;
  const t = fm.type;
  return typeof t === "string" && NODE_TYPES.has(t) ? t : void 0;
}
function idOf2(fm) {
  if (typeof fm !== "object" || fm === null || !("id" in fm))
    return void 0;
  const id = fm.id;
  return typeof id === "string" ? id : void 0;
}
function buildGraph(pages, paths) {
  const epics = [];
  const frs = [];
  const nfrs = [];
  const brs = [];
  const crs = [];
  const wps = [];
  const bugs = [];
  const goals = [];
  const pathIndex = /* @__PURE__ */ new Map();
  for (const page of pages) {
    const type = nodeTypeOf(page.frontmatter);
    switch (type) {
      case "epic":
        epics.push({ frontmatter: page.frontmatter, body: page.body });
        break;
      case "fr":
        frs.push({ frontmatter: page.frontmatter, body: page.body });
        break;
      case "nfr":
        nfrs.push({ frontmatter: page.frontmatter, body: page.body });
        break;
      case "br":
        brs.push({ frontmatter: page.frontmatter, body: page.body });
        break;
      case "cr":
        crs.push({ frontmatter: page.frontmatter, body: page.body });
        break;
      case "wp":
        wps.push({ frontmatter: page.frontmatter, body: page.body });
        break;
      case "bug":
        bugs.push({ frontmatter: page.frontmatter, body: page.body });
        break;
      case "goal":
        goals.push({ frontmatter: page.frontmatter, body: page.body });
        break;
      default:
        break;
    }
    if (type !== void 0 && paths) {
      const path = paths.get(page);
      const id = idOf2(page.frontmatter);
      if (path !== void 0 && id !== void 0)
        pathIndex.set(id, path);
    }
  }
  const idIndex = /* @__PURE__ */ new Set();
  for (const n of epics)
    idIndex.add(n.frontmatter.id);
  for (const n of frs)
    idIndex.add(n.frontmatter.id);
  for (const n of nfrs)
    idIndex.add(n.frontmatter.id);
  for (const n of brs)
    idIndex.add(n.frontmatter.id);
  for (const n of crs)
    idIndex.add(n.frontmatter.id);
  for (const n of wps)
    idIndex.add(n.frontmatter.id);
  for (const n of bugs)
    idIndex.add(n.frontmatter.id);
  for (const n of goals)
    idIndex.add(n.frontmatter.id);
  const edges = [];
  for (const fr of frs) {
    for (const to of fr.frontmatter.traces_to)
      edges.push({ from: fr.frontmatter.id, to });
    for (const to of fr.frontmatter.enforces)
      edges.push({ from: fr.frontmatter.id, to });
    for (const to of fr.frontmatter.references_nfr)
      edges.push({ from: fr.frontmatter.id, to });
    for (const to of fr.frontmatter.goal_ids ?? [])
      edges.push({ from: fr.frontmatter.id, to });
  }
  for (const nfr of nfrs) {
    for (const to of nfr.frontmatter.traces_to)
      edges.push({ from: nfr.frontmatter.id, to });
    for (const to of nfr.frontmatter.goal_ids ?? [])
      edges.push({ from: nfr.frontmatter.id, to });
  }
  for (const br of brs) {
    for (const to of br.frontmatter.goal_ids ?? [])
      edges.push({ from: br.frontmatter.id, to });
  }
  const scopeByWp = /* @__PURE__ */ new Map();
  for (const wp of wps) {
    const scope = parseScope(wp.body);
    scopeByWp.set(wp.frontmatter.id, scope);
    for (const ref of [...scope.crs, ...scope.frs, ...scope.nfrs, ...scope.brs]) {
      edges.push({ from: wp.frontmatter.id, to: ref.id });
    }
  }
  const reverse = /* @__PURE__ */ new Map();
  for (const { from, to } of edges) {
    const existing = reverse.get(to);
    if (existing)
      existing.push(from);
    else
      reverse.set(to, [from]);
  }
  const frById = new Map(frs.map((fr) => [fr.frontmatter.id, fr]));
  const nfrById = new Map(nfrs.map((nfr) => [nfr.frontmatter.id, nfr]));
  const brById = new Map(brs.map((br) => [br.frontmatter.id, br]));
  const crById = new Map(crs.map((cr) => [cr.frontmatter.id, cr]));
  const wpById = new Map(wps.map((wp) => [wp.frontmatter.id, wp]));
  function wpScope(wpId) {
    return scopeByWp.get(wpId) ?? { crs: [], frs: [], nfrs: [], brs: [], errors: [`wpScope: unknown WP id '${wpId}'`] };
  }
  return {
    epics,
    frs,
    nfrs,
    brs,
    crs,
    wps,
    bugs,
    goals,
    backlinks(id) {
      const sources = reverse.get(id) ?? [];
      return [...new Set(sources)].sort(naturalCompare);
    },
    orphans() {
      return frs.filter((fr) => fr.frontmatter.traces_to.length === 0).map((fr) => fr.frontmatter.id).sort(naturalCompare);
    },
    danglingRefs() {
      return edges.filter(({ to }) => {
        if (idIndex.has(to))
          return false;
        if (/^[A-Z][A-Z0-9]{1,9}-NFR-\d{3}$/.test(to) && !/^E\d+-NFR\d+$/.test(to)) {
          return false;
        }
        return true;
      }).sort((a, b) => naturalCompare(a.from, b.from) || naturalCompare(a.to, b.to));
    },
    closure(wpId) {
      const wp = wpById.get(wpId);
      if (!wp)
        return { frs: [], nfrs: [], brs: [] };
      const scope = scopeByWp.get(wpId);
      const nfrSet = new Set(scope.nfrs.map((r) => r.id));
      const brSet = new Set(scope.brs.map((r) => r.id));
      const frIds = scope.frs.map((r) => r.id);
      for (const frId of frIds) {
        const fr = frById.get(frId);
        if (!fr)
          continue;
        for (const br of fr.frontmatter.enforces)
          brSet.add(br);
        for (const nfr of fr.frontmatter.references_nfr) {
          if (/^E\d+-NFR\d+$/.test(nfr))
            nfrSet.add(nfr);
        }
      }
      return {
        // Deliberately NOT deduped (matches the pre-v3 `fr_ids` behavior) —
        // writer.ts's `accept()` relies on collapsing duplicates itself via
        // its own `Set`, not on this method doing so.
        frs: [...frIds].sort(naturalCompare),
        nfrs: [...nfrSet].sort(naturalCompare),
        brs: [...brSet].sort(naturalCompare)
      };
    },
    crSpawned(crId) {
      const ids = [];
      for (const fr of frs)
        if (fr.frontmatter.traces_to.includes(crId))
          ids.push(fr.frontmatter.id);
      for (const nfr of nfrs)
        if (nfr.frontmatter.traces_to.includes(crId))
          ids.push(nfr.frontmatter.id);
      return [...new Set(ids)].sort(naturalCompare);
    },
    frReachesCr(frId) {
      const fr = frById.get(frId);
      if (!fr)
        return false;
      return fr.frontmatter.traces_to.some((cr) => idIndex.has(cr));
    },
    pathOf(id) {
      return pathIndex.get(id);
    },
    wpScope,
    wpDelivers(wpId) {
      return wpScope(wpId).frs.map((r) => r.id).sort(naturalCompare);
    },
    crImpacts(crId) {
      return crById.get(crId)?.frontmatter.impacts ?? [];
    },
    crAmendRealized(crId, reqId) {
      const target = frById.get(reqId) ?? nfrById.get(reqId) ?? brById.get(reqId);
      if (!target || target.frontmatter.status !== "baselined")
        return false;
      return historyCrRefs(target.body).includes(crId);
    },
    goalRequirements(goalId) {
      const ids = [];
      for (const fr of frs)
        if ((fr.frontmatter.goal_ids ?? []).includes(goalId))
          ids.push(fr.frontmatter.id);
      for (const nfr of nfrs)
        if ((nfr.frontmatter.goal_ids ?? []).includes(goalId))
          ids.push(nfr.frontmatter.id);
      for (const br of brs)
        if ((br.frontmatter.goal_ids ?? []).includes(goalId))
          ids.push(br.frontmatter.id);
      return [...new Set(ids)].sort(naturalCompare);
    }
  };
}
var NODE_TYPES;
var init_graph = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/graph.js"() {
    "use strict";
    init_serialize();
    init_scopelinks();
    init_history();
    NODE_TYPES = /* @__PURE__ */ new Set([
      "vision",
      "fr",
      "nfr",
      "br",
      "cr",
      "wp",
      "bug",
      "epic",
      "goal"
    ]);
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/gates.js
import { dirname, relative } from "node:path";
function byId(nodes) {
  return new Map(nodes.map((n) => [n.frontmatter.id, n]));
}
function acIssue(frId, fr) {
  if (!fr)
    return `${frId}: FR not found`;
  const result = parseAcBlock(fr.body);
  if (result.error !== void 0)
    return `${frId}: ${result.error}`;
  if (result.acs.length === 0)
    return `${frId}: has no Acceptance Criteria`;
  const bad = unverifiableAcIds(result.acs);
  if (bad.length > 0) {
    return `${frId}: AC-${bad.join(", AC-")} unverifiable (need given/when/then or \u0414\u0430\u043D\u043E/\u041A\u043E\u0433\u0434\u0430/\u0422\u043E\u0433\u0434\u0430)`;
  }
  return void 0;
}
function visionCheck(visionConfirmed) {
  return {
    name: "vision-confirmed",
    ok: visionConfirmed,
    reason: visionConfirmed ? "vision is confirmed" : "vision is not confirmed"
  };
}
function toVerdict(checks) {
  return { verdict: checks.every((c) => c.ok) ? "VERIFY-OK" : "VERIFY-FAIL", checks };
}
function expectedScopeHref(wpRelPath, targetRelPath) {
  return relative(dirname(wpRelPath), targetRelPath).split("\\").join("/");
}
function scopeLinkIssues(graph, wpId, _linkRoot) {
  const frById = byId(graph.frs);
  const nfrById = byId(graph.nfrs);
  const brById = byId(graph.brs);
  const crById = byId(graph.crs);
  const scope = graph.wpScope(wpId);
  const wpRelPath = graph.pathOf(wpId);
  const issues = [...scope.errors];
  if (wpRelPath === void 0) {
    throw new Error(`scopeLinkIssues: pathOf returned undefined for WP ${wpId} \u2014 Graph was built without a paths map`);
  }
  for (const ref of [...scope.crs, ...scope.frs, ...scope.nfrs, ...scope.brs]) {
    const target = crById.get(ref.id) ?? frById.get(ref.id) ?? nfrById.get(ref.id) ?? brById.get(ref.id);
    if (!target) {
      issues.push(`${ref.id}: Scope link does not resolve to any node in the graph`);
      continue;
    }
    const targetPath = graph.pathOf(ref.id);
    if (targetPath === void 0) {
      throw new Error(`scopeLinkIssues: pathOf returned undefined for resolved node ${ref.id} \u2014 Graph was built without a paths map`);
    }
    const expectedPath = expectedScopeHref(wpRelPath, targetPath);
    if (ref.path !== expectedPath) {
      issues.push(`${ref.id}: Scope link path '${ref.path}' does not match expected '${expectedPath}'`);
    }
    if (ref.anchor !== void 0 && !pageAnchors(target.body).has(ref.anchor)) {
      issues.push(`${ref.id}: Scope link anchor '#${ref.anchor}' does not exist on the target page`);
    }
  }
  return issues;
}
function scopeVersionIssues(graph, wpId) {
  const frById = byId(graph.frs);
  const nfrById = byId(graph.nfrs);
  const brById = byId(graph.brs);
  const scope = graph.wpScope(wpId);
  const issues = [];
  for (const ref of scope.crs) {
    if (ref.version !== void 0)
      issues.push(`${ref.id}: CR refs do not carry version stamps`);
  }
  for (const ref of [...scope.frs, ...scope.nfrs, ...scope.brs]) {
    if (ref.version === void 0)
      continue;
    const target = frById.get(ref.id) ?? nfrById.get(ref.id) ?? brById.get(ref.id);
    if (!target) {
      issues.push(`${ref.id}: cannot verify Scope link version stamp v${ref.version} \u2014 target not found`);
    } else if (target.frontmatter.version !== ref.version) {
      issues.push(`${ref.id}: Scope link stamped v${ref.version} but current version is v${target.frontmatter.version}`);
    }
  }
  return issues;
}
function definitionOfReady(graph, wpId, visionConfirmed, opts) {
  const frById = byId(graph.frs);
  const nfrById = byId(graph.nfrs);
  const brById = byId(graph.brs);
  const crById = byId(graph.crs);
  const closure = graph.closure(wpId);
  const scope = graph.wpScope(wpId);
  const scopeCrIds = new Set(scope.crs.map((r) => r.id));
  const memberIds = /* @__PURE__ */ new Set([wpId, ...closure.frs, ...closure.nfrs]);
  const inactiveFrs = [];
  const acIssues = [];
  const unscopedTraceFrs = [];
  for (const frId of closure.frs) {
    const fr = frById.get(frId);
    if (!fr) {
      inactiveFrs.push(`${frId}: FR not found`);
      unscopedTraceFrs.push(`${frId}: FR not found`);
    } else {
      if (fr.frontmatter.status !== "active")
        inactiveFrs.push(`${frId}: status is '${fr.frontmatter.status}', not active`);
      const tracesToScopedCr = fr.frontmatter.traces_to.some((crId) => scopeCrIds.has(crId));
      if (!tracesToScopedCr)
        unscopedTraceFrs.push(`${frId}: traces_to does not intersect the WP's Scope CR list`);
    }
    const issue = acIssue(frId, fr);
    if (issue)
      acIssues.push(issue);
  }
  const brIssues = [];
  for (const brId of closure.brs) {
    const br = brById.get(brId);
    if (!br)
      brIssues.push(`${brId}: BR not found`);
    else if (br.frontmatter.status === "retired")
      brIssues.push(`${brId}: BR is retired`);
  }
  const nfrIssues = [];
  const unconfirmedTraceNfrs = [];
  for (const nfrId of closure.nfrs) {
    const nfr = nfrById.get(nfrId);
    if (!nfr) {
      nfrIssues.push(`${nfrId}: NFR not found`);
      unconfirmedTraceNfrs.push(`${nfrId}: NFR not found`);
    } else {
      if (nfr.frontmatter.status !== "active")
        nfrIssues.push(`${nfrId}: status is '${nfr.frontmatter.status}', not active`);
      const resolvesToConfirmedCr = nfr.frontmatter.traces_to.some((crId) => crById.get(crId)?.frontmatter.status === "confirmed");
      if (!resolvesToConfirmedCr)
        unconfirmedTraceNfrs.push(`${nfrId}: traces_to does not resolve to a confirmed CR`);
    }
  }
  const dangling = graph.danglingRefs().filter((d) => memberIds.has(d.from));
  const scopeLinkIssuesList = scopeLinkIssues(graph, wpId, opts.linkRoot);
  const scopeVersionIssuesList = scopeVersionIssues(graph, wpId);
  const unconfirmedScopedCrs = [];
  for (const ref of scope.crs) {
    const cr = crById.get(ref.id);
    if (!cr)
      unconfirmedScopedCrs.push(`${ref.id}: CR not found`);
    else if (cr.frontmatter.status !== "confirmed")
      unconfirmedScopedCrs.push(`${ref.id}: status is '${cr.frontmatter.status}', not confirmed`);
  }
  const checks = [
    visionCheck(visionConfirmed),
    {
      name: "frs-active",
      ok: inactiveFrs.length === 0,
      reason: inactiveFrs.length === 0 ? "every FR in the closure is active" : inactiveFrs.join("; ")
    },
    {
      name: "frs-well-formed-acs",
      ok: acIssues.length === 0,
      reason: acIssues.length === 0 ? "every FR in the closure has >=1 well-formed AC" : acIssues.join("; ")
    },
    {
      name: "frs-trace-to-scoped-cr",
      ok: unscopedTraceFrs.length === 0,
      reason: unscopedTraceFrs.length === 0 ? "every Delivers FR's traces_to intersects the WP's Scope CR list" : unscopedTraceFrs.join("; ")
    },
    {
      name: "enforced-brs-not-retired",
      ok: brIssues.length === 0,
      reason: brIssues.length === 0 ? "every enforced BR resolves and is not retired" : brIssues.join("; ")
    },
    {
      name: "referenced-nfrs-active",
      ok: nfrIssues.length === 0,
      reason: nfrIssues.length === 0 ? "every referenced NFR resolves and is active" : nfrIssues.join("; ")
    },
    {
      name: "nfrs-trace-to-confirmed-cr",
      ok: unconfirmedTraceNfrs.length === 0,
      reason: unconfirmedTraceNfrs.length === 0 ? "every NFR in the closure traces_to a confirmed CR" : unconfirmedTraceNfrs.join("; ")
    },
    {
      name: "no-dangling-refs-in-closure",
      ok: dangling.length === 0,
      reason: dangling.length === 0 ? "no orphan/dangling ref in the closure" : dangling.map((d) => `${d.from} -> ${d.to} does not resolve`).join("; ")
    },
    {
      name: "wp-scope-links",
      ok: scopeLinkIssuesList.length === 0,
      reason: scopeLinkIssuesList.length === 0 ? "every Scope link parses, resolves, path-matches, and anchor-matches" : scopeLinkIssuesList.join("; ")
    },
    {
      name: "wp-scope-version-current",
      ok: scopeVersionIssuesList.length === 0,
      reason: scopeVersionIssuesList.length === 0 ? "every version-stamped Scope link matches its target's current version" : scopeVersionIssuesList.join("; ")
    },
    {
      name: "wp-scope-crs-confirmed",
      ok: unconfirmedScopedCrs.length === 0,
      reason: unconfirmedScopedCrs.length === 0 ? "every ### Change requests CR is confirmed" : unconfirmedScopedCrs.join("; ")
    }
  ];
  return toVerdict(checks);
}
function acceptGate(graph, wpId, visionConfirmed, evidence, headCommit) {
  const frById = byId(graph.frs);
  const wpById = byId(graph.wps);
  const wp = wpById.get(wpId);
  const frIds = graph.wpDelivers(wpId);
  const acIssues = [];
  for (const frId of frIds) {
    const issue = acIssue(frId, frById.get(frId));
    if (issue)
      acIssues.push(issue);
  }
  const planApproved = wp?.frontmatter.status === "plan-approved";
  const commitMatches = evidence.commit === headCommit;
  const hashesPresent = evidence.testRunHashes.length > 0;
  const checks = [
    visionCheck(visionConfirmed),
    {
      name: "ac-presence",
      ok: acIssues.length === 0,
      reason: acIssues.length === 0 ? "every WP FR has >=1 well-formed AC" : acIssues.join("; ")
    },
    {
      name: "wp-plan-approved",
      ok: planApproved,
      reason: wp === void 0 ? `${wpId}: WP not found` : planApproved ? `${wpId} is plan-approved` : `${wpId}: status is '${wp.frontmatter.status}', not plan-approved`
    },
    {
      name: "evidence-commit-matches-head",
      ok: commitMatches,
      reason: commitMatches ? "evidence.commit matches HEAD" : `evidence.commit (${evidence.commit}) !== headCommit (${headCommit})`
    },
    {
      name: "evidence-test-run-hashes-present",
      ok: hashesPresent,
      reason: hashesPresent ? "evidence.testRunHashes is present" : `${wpId}: evidence.testRunHashes is empty`
    }
  ];
  return toVerdict(checks);
}
var init_gates = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/gates.js"() {
    "use strict";
    init_ac();
    init_scopelinks();
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/reconcile.js
var reconcile_exports = {};
__export(reconcile_exports, {
  crImpactsDelivered: () => crImpactsDelivered,
  reconcileCrs: () => reconcileCrs,
  requirementNodeIndex: () => requirementNodeIndex
});
function requirementNodeIndex(graph) {
  const frById = new Map(graph.frs.map((fr) => [fr.frontmatter.id, fr]));
  const nfrById = new Map(graph.nfrs.map((nfr) => [nfr.frontmatter.id, nfr]));
  const brById = new Map(graph.brs.map((br) => [br.frontmatter.id, br]));
  return (id) => frById.get(id) ?? nfrById.get(id) ?? brById.get(id);
}
function crImpactsDelivered(nodeOf, crId, impacts, backfilled) {
  return impacts.every((impact) => {
    if ("amends" in impact) {
      const node2 = nodeOf(impact.amends);
      if (node2 === void 0 || node2.frontmatter.status !== "baselined")
        return false;
      return backfilled || historyCrRefs(node2.body).includes(crId);
    }
    if (impact.realized === void 0)
      return false;
    const node = nodeOf(impact.realized);
    if (node === void 0 || node.frontmatter.status !== "baselined")
      return false;
    if (backfilled)
      return true;
    const traces = "traces_to" in node.frontmatter ? node.frontmatter.traces_to : void 0;
    return traces === void 0 || traces.includes(crId);
  });
}
function reconcileCrs(repo, affectedCrIds, date) {
  if (!DATE_KEY3.test(date))
    throw new Error(`reconcile: date must be YYYYMMDD, got ${JSON.stringify(date)}`);
  if (affectedCrIds.length === 0)
    return;
  const graph = loadGraph(repo);
  const crById = new Map(graph.crs.map((cr) => [cr.frontmatter.id, cr]));
  const nodeOf = requirementNodeIndex(graph);
  for (const crId of affectedCrIds) {
    const cr = crById.get(crId);
    if (!cr || cr.frontmatter.status === "resolved")
      continue;
    const impacts = cr.frontmatter.impacts ?? [];
    if (impacts.length === 0)
      continue;
    if (!crImpactsDelivered(nodeOf, crId, impacts, cr.frontmatter.provenance === "backfilled"))
      continue;
    const nextFm = { ...cr.frontmatter, status: "resolved" };
    atomicWrite(crPath(repo, crId), emitPage("cr", nextFm, cr.body));
  }
}
var DATE_KEY3;
var init_reconcile = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/reconcile.js"() {
    "use strict";
    init_history();
    init_serialize();
    init_writer();
    DATE_KEY3 = /^\d{8}$/;
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/writer.js
import { mkdirSync, readdirSync as readdirSync2, readFileSync as readFileSync4, renameSync as renameSync2, unlinkSync as unlinkSync2, writeFileSync as writeFileSync2 } from "node:fs";
import { createHash, randomUUID as randomUUID2 } from "node:crypto";
import { dirname as dirname2, join as join3, relative as relative2, sep } from "node:path";
function visionPath(repo) {
  return join3(repo, "vision.md");
}
function epicsRoot(repo) {
  return join3(repo, "epics");
}
function brPath(repo, id) {
  return join3(repo, "br", `${id}.md`);
}
function crPath(repo, id) {
  return join3(repo, "cr", `${id}.md`);
}
function wpPath(repo, id) {
  return join3(repo, "wp", id, "index.md");
}
function slugify(title) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug === "" ? "epic" : slug;
}
function findEpicDir(repo, epicId) {
  const root = epicsRoot(repo);
  let entries;
  try {
    entries = readdirSync2(root, { withFileTypes: true });
  } catch {
    throw new Error(`writer: no epics directory under ${repo} (looking for ${epicId})`);
  }
  const match = entries.find((e) => e.isDirectory() && (e.name === epicId || e.name.startsWith(`${epicId}-`)));
  if (!match)
    throw new Error(`writer: no epic directory found for ${epicId} under ${root}`);
  return join3(root, match.name);
}
function epicOfRequirementId(id) {
  const m = /^(E\d+)-/.exec(id);
  if (!m)
    throw new Error(`writer: cannot derive an epic id from ${id}`);
  return m[1];
}
function requirementFilePath(repo, type, epicId, id) {
  return join3(findEpicDir(repo, epicId), `${id}.md`);
}
function requirementTypeOf(id) {
  if (FR_ID.test(id))
    return "fr";
  if (NFR_ID.test(id))
    return "nfr";
  if (BR_ID.test(id))
    return "br";
  throw new Error(`writer: ${id} is not a requirement id (expected an FR/NFR/BR id)`);
}
function pathForRequirement(repo, id) {
  const type = requirementTypeOf(id);
  if (type === "br")
    return { type, path: brPath(repo, id) };
  return { type, path: requirementFilePath(repo, type, epicOfRequirementId(id), id) };
}
function atomicWrite(path, content) {
  const dir = dirname2(path);
  mkdirSync(dir, { recursive: true });
  const tmp = join3(dir, `.tmp-${process.pid}-${randomUUID2()}`);
  writeFileSync2(tmp, content, "utf8");
  renameSync2(tmp, path);
}
function emitRequirement(type, frontmatter, body) {
  switch (type) {
    case "fr":
      return emitPage("fr", frontmatter, body);
    case "nfr":
      return emitPage("nfr", frontmatter, body);
    case "br":
      return emitPage("br", frontmatter, body);
  }
}
function assertLegalTransition(id, from, to) {
  if (from === to)
    throw new Error(`writer: ${id} is already '${to}'`);
  if (!LEGAL_TRANSITIONS[from].has(to)) {
    throw new Error(`writer: illegal status transition for ${id}: '${from}' -> '${to}'`);
  }
}
function assertConfirmedCr(repo, crId, reqId) {
  if (!CR_ID.test(crId))
    throw new Error(`writer: ${crId} is not a valid CR id`);
  const parsed = parseFile(crPath(repo, crId), "cr");
  if ("error" in parsed)
    throw new Error(`writer: cannot read CR ${crId}: ${parsed.error}`);
  const fm = parsed.frontmatter;
  const status = fm.status;
  if (status !== "confirmed") {
    throw new Error(`writer: CR ${crId} must be 'confirmed' to drive a requirement edit (was '${String(status)}')`);
  }
  if (fm.entry_point !== "requirement") {
    throw new Error(`writer: CR ${crId} has entry_point '${String(fm.entry_point)}', not 'requirement' \u2014 it cannot drive an edit to ${reqId}`);
  }
  const impacts = fm.impacts ?? [];
  const amendsThis = impacts.some((impact) => "amends" in impact && impact.amends === reqId);
  if (!amendsThis) {
    throw new Error(`writer: CR ${crId}'s impacts do not declare an 'amends' entry for ${reqId} \u2014 it cannot drive this edit`);
  }
}
async function editRequirement(repo, input) {
  const { id, cr, activate, date } = input;
  const body = stripAllLeadingFrontmatter(input.body);
  const { type, path } = pathForRequirement(repo, id);
  const parsed = parseFile(path, type);
  if ("error" in parsed)
    throw new Error(`writer: failed to read ${id} at ${path}: ${parsed.error}`);
  const fm = parsed.frontmatter;
  const currentStatus = fm.status;
  if (currentStatus === "batched") {
    throw new Error(`writer: cannot edit ${id} in place \u2014 status is 'batched' (frozen pending accept/abandon)`);
  }
  if (currentStatus === "superseded" || currentStatus === "retired") {
    throw new Error(`writer: cannot edit ${id} \u2014 status '${currentStatus}' is terminal`);
  }
  if (activate === true && currentStatus !== "draft") {
    throw new Error(`writer: cannot activate ${id} \u2014 status is '${currentStatus}', not 'draft'`);
  }
  const nextFm = { ...fm };
  let nextBody = body;
  let bumped = false;
  let bumpDate;
  if (cr !== void 0 && currentStatus === "draft") {
    throw new Error(`writer: ${id} is a draft \u2014 draft authoring is free-form; do not pass --cr (it would fabricate an amendment)`);
  }
  if (currentStatus === "baselined" && cr === void 0) {
    throw new Error(`writer: editing baselined ${id} requires a confirmed --cr`);
  }
  if (cr !== void 0) {
    assertConfirmedCr(repo, cr, id);
    bumped = shouldBump(type, { frontmatter: fm, body: parsed.body }, { frontmatter: fm, body });
    if (!bumped) {
      throw new Error(`writer: no content change to ${id} against ${cr} \u2014 a CR-driven edit must change the requirement (spec \xA74)`);
    }
    if (!date)
      throw new Error(`writer: bumping ${id} requires a date`);
    if (!DATE_KEY4.test(date)) {
      throw new Error(`writer: bumping ${id} requires a YYYYMMDD date, got ${JSON.stringify(date)}`);
    }
    bumpDate = date;
    const oldVersion = fm.version;
    const heading = formatHistoryHeading(oldVersion, bumpDate, cr);
    nextBody = archiveIntoHistory(body, heading, parsed.body);
    nextFm.version = oldVersion + 1;
    if (type === "fr" || type === "nfr") {
      const traces = fm.traces_to ?? [];
      if (!traces.includes(cr))
        nextFm.traces_to = [...traces, cr];
    }
  }
  if (activate === true) {
    nextFm.status = "active";
  }
  if (type === "fr") {
    nextFm.references_nfr = mergeReferencesNfr(nextFm.references_nfr, nextBody);
  }
  nextBody = stripAllLeadingFrontmatter(nextBody);
  atomicWrite(path, emitRequirement(type, nextFm, nextBody));
  if (bumped && currentStatus === "baselined" && cr !== void 0 && bumpDate !== void 0) {
    const { reconcileCrs: reconcileCrs2 } = await Promise.resolve().then(() => (init_reconcile(), reconcile_exports));
    reconcileCrs2(repo, [cr], bumpDate);
  }
  return { id, path, bumped };
}
async function retireRequirement(repo, id) {
  return setStatus(repo, id, "retired");
}
async function addEpic(repo, title) {
  const id = await allocateId(repo, { kind: "epic" });
  const dir = join3(epicsRoot(repo), `${id}-${slugify(title)}`);
  const path = join3(dir, "index.md");
  const frontmatter = { id, type: "epic", title, status: "active" };
  atomicWrite(path, emitPage("epic", frontmatter, ""));
  return { id };
}
async function setStatus(repo, id, status) {
  const { type, path } = pathForRequirement(repo, id);
  const parsed = parseFile(path, type);
  if ("error" in parsed)
    throw new Error(`writer: failed to read ${id} at ${path}: ${parsed.error}`);
  const fm = parsed.frontmatter;
  const currentStatus = fm.status;
  assertLegalTransition(id, currentStatus, status);
  const nextFm = { ...fm, status };
  let nextBody = stripAllLeadingFrontmatter(parsed.body);
  if (type === "fr") {
    nextFm.references_nfr = mergeReferencesNfr(nextFm.references_nfr, nextBody);
  }
  atomicWrite(path, emitRequirement(type, nextFm, nextBody));
  return { id, path };
}
async function setVisionConfirmed(repo, by, date) {
  const path = visionPath(repo);
  const parsed = parseFile(path, "vision");
  if ("error" in parsed)
    throw new Error(`writer: failed to read vision at ${path}: ${parsed.error}`);
  const fm = parsed.frontmatter;
  if (fm.status === "confirmed")
    throw new Error("writer: vision is already confirmed");
  const nextFm = { ...fm, status: "confirmed", confirmed_at: date, confirmed_by: by };
  atomicWrite(path, emitPage("vision", nextFm, parsed.body));
  return { path };
}
function loadGraph(repo) {
  const files = walkCanonFiles(repo);
  const pages = [];
  const paths = /* @__PURE__ */ new Map();
  for (const file of files) {
    let raw;
    try {
      raw = readFileSync4(file, "utf8");
    } catch {
      continue;
    }
    const type = peekType(raw);
    if (type === void 0 || !(type in schemas))
      continue;
    const parsed = parsePage(raw, type);
    if ("error" in parsed)
      continue;
    pages.push(parsed);
    paths.set(parsed, relative2(repo, file).split(sep).join("/"));
  }
  return buildGraph(pages, paths);
}
async function confirmCr(repo, input) {
  const { crId, entry, impacts } = input;
  const path = crPath(repo, crId);
  const parsed = parseFile(path, "cr");
  if ("error" in parsed)
    throw new Error(`writer: cannot read CR ${crId}: ${parsed.error}`);
  const fm = parsed.frontmatter;
  if (fm.status !== "captured") {
    throw new Error(`writer: CR ${crId} must be 'captured' to confirm (was '${String(fm.status)}')`);
  }
  if (entry === "requirement") {
    if (!impacts || impacts.length === 0) {
      throw new Error(`writer: confirming ${crId} as entry 'requirement' requires a non-empty impacts set`);
    }
    const graph = loadGraph(repo);
    const reqIds = /* @__PURE__ */ new Set([
      ...graph.frs.map((n) => n.frontmatter.id),
      ...graph.nfrs.map((n) => n.frontmatter.id),
      ...graph.brs.map((n) => n.frontmatter.id)
    ]);
    const epicIds = new Set(graph.epics.map((e) => e.frontmatter.id));
    for (const impact of impacts) {
      if ("amends" in impact) {
        if (!reqIds.has(impact.amends)) {
          throw new Error(`writer: confirming ${crId} \u2014 impact amends '${impact.amends}' does not resolve in the graph`);
        }
      } else if (!epicIds.has(impact.epic)) {
        throw new Error(`writer: confirming ${crId} \u2014 impact spawns a '${impact.spawns}' under epic '${impact.epic}', which does not exist`);
      }
    }
  } else if (impacts !== void 0 && impacts.length > 0) {
    throw new Error(`writer: confirming ${crId} as entry 'vision' must not carry impacts (impacts are a 'requirement'-entry concept)`);
  }
  const nextFm = { ...fm, entry_point: entry, entry_point_confirmed: true, status: "confirmed" };
  if (impacts !== void 0)
    nextFm.impacts = impacts;
  atomicWrite(path, emitPage("cr", nextFm, parsed.body));
  return { id: crId, path };
}
async function realizeCrSpawn(repo, input) {
  const { crId, epic, type, newId } = input;
  const path = crPath(repo, crId);
  const parsed = parseFile(path, "cr");
  if ("error" in parsed)
    throw new Error(`writer: cannot read CR ${crId}: ${parsed.error}`);
  const fm = parsed.frontmatter;
  const impacts = (fm.impacts ?? []).slice();
  const idx = impacts.findIndex((impact) => "spawns" in impact && impact.spawns === type && impact.epic === epic && impact.realized === void 0);
  if (idx === -1) {
    throw new Error(`writer: ${crId} has no un-realized '${type}' spawn under ${epic} to realize as ${newId}`);
  }
  const realizesElsewhere = impacts.some((impact, i) => i !== idx && "spawns" in impact && impact.realized === newId);
  if (realizesElsewhere) {
    throw new Error(`writer: realizeCrSpawn \u2014 ${newId} already realizes a different impact entry on ${crId}`);
  }
  const idClass = type === "fr" ? FR_ID : type === "nfr" ? NFR_ID : BR_ID;
  if (!idClass.test(newId)) {
    throw new Error(`writer: realizeCrSpawn \u2014 ${newId} is not a valid '${type}' id`);
  }
  const newIdEpic = epicOfRequirementId(newId);
  if (newIdEpic !== epic) {
    throw new Error(`writer: realizeCrSpawn \u2014 ${newId}'s epic ('${newIdEpic}') does not match the impact's declared epic '${epic}'`);
  }
  const graph = loadGraph(repo);
  const node = type === "fr" ? graph.frs.find((n) => n.frontmatter.id === newId) : type === "nfr" ? graph.nfrs.find((n) => n.frontmatter.id === newId) : graph.brs.find((n) => n.frontmatter.id === newId);
  if (!node)
    throw new Error(`writer: realizeCrSpawn \u2014 ${newId} does not resolve to a '${type}' page in the graph`);
  if (type !== "br" && !node.frontmatter.traces_to.includes(crId)) {
    throw new Error(`writer: realizeCrSpawn \u2014 ${newId}'s traces_to does not include ${crId}`);
  }
  const nextImpacts = impacts.map((impact, i) => i === idx ? { ...impact, realized: newId } : impact);
  const nextFm = { ...fm, impacts: nextImpacts };
  atomicWrite(path, emitPage("cr", nextFm, parsed.body));
  return { id: crId, path };
}
function readVisionConfirmed(repo) {
  const parsed = parseFile(visionPath(repo), "vision");
  if ("error" in parsed)
    return false;
  return parsed.frontmatter.status === "confirmed";
}
function setWpAccepted(repo, wpId) {
  const path = wpPath(repo, wpId);
  const parsed = parseFile(path, "wp");
  if ("error" in parsed)
    throw new Error(`writer: accept failed to read WP ${wpId} at ${path}: ${parsed.error}`);
  const fm = parsed.frontmatter;
  const nextFm = { ...fm, status: "accepted" };
  atomicWrite(path, emitPage("wp", nextFm, parsed.body));
}
function byId2(nodes) {
  return new Map(nodes.map((n) => [n.frontmatter.id, n]));
}
function baselinesRoot(repo) {
  return join3(repo, "baselines");
}
function contentHash(content) {
  return createHash("sha256").update(content, "utf8").digest("hex");
}
function cacheDir(repo) {
  return join3(repo, ".ba", "cache");
}
function pendingMarkerPath(repo, wpId) {
  return join3(cacheDir(repo), `pending-${wpId}.json`);
}
function readPendingMarker(repo, wpId) {
  const path = pendingMarkerPath(repo, wpId);
  let raw;
  try {
    raw = readFileSync4(path, "utf8");
  } catch {
    return void 0;
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`writer: pending marker ${path} is not valid JSON`);
  }
  const result = pendingMarkerSchema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
    throw new Error(`writer: pending marker ${path} failed validation: ${issues.join("; ")}`);
  }
  if (result.data.wpId !== wpId) {
    throw new Error(`writer: pending marker ${path} is for ${result.data.wpId}, not ${wpId}`);
  }
  return result.data;
}
function writePendingMarker(repo, marker) {
  atomicWrite(pendingMarkerPath(repo, marker.wpId), `${JSON.stringify(marker, null, 2)}
`);
}
function deletePendingMarker(repo, wpId) {
  try {
    unlinkSync2(pendingMarkerPath(repo, wpId));
  } catch {
  }
}
async function accept(repo, wpId, evidence, date, headCommit, options2 = {}) {
  if (!DATE_KEY4.test(date)) {
    throw new Error(`writer: accept date must be YYYYMMDD, got ${JSON.stringify(date)}`);
  }
  verifyEvidenceSchema.parse(evidence);
  const crashAfter = options2.crashAfter;
  const marker = readPendingMarker(repo, wpId);
  if (!marker) {
    const wpPeek = parseFile(wpPath(repo, wpId), "wp");
    if (!("error" in wpPeek) && wpPeek.frontmatter.status === "accepted") {
      return {
        verdict: "VERIFY-OK",
        checks: [{ name: "already-accepted", ok: true, reason: `${wpId} is already accepted (idempotent no-op)` }]
      };
    }
  }
  const graph = loadGraph(repo);
  const closure = graph.closure(wpId);
  const closureIds = [.../* @__PURE__ */ new Set([...closure.frs, ...closure.nfrs, ...closure.brs])];
  const frById = byId2(graph.frs);
  const nfrById = byId2(graph.nfrs);
  const brById = byId2(graph.brs);
  const statusBaselineOf = (id) => {
    const node = frById.get(id) ?? nfrById.get(id) ?? brById.get(id);
    return node ? { status: node.frontmatter.status, baseline: node.frontmatter.baseline } : void 0;
  };
  let targetId;
  let effectiveDate;
  let verdict;
  if (marker) {
    targetId = marker.baselineId;
    effectiveDate = marker.date;
    verdict = {
      verdict: "VERIFY-OK",
      checks: [
        { name: "resumed-from-pending-marker", ok: true, reason: `resumed ${wpId} from its pending marker (${targetId})` }
      ]
    };
  } else {
    const gateResult = acceptGate(graph, wpId, readVisionConfirmed(repo), evidence, headCommit);
    if (gateResult.verdict === "VERIFY-FAIL")
      return gateResult;
    const batched = closureIds.filter((id) => statusBaselineOf(id)?.status === "batched");
    if (batched.length === 0) {
      throw new Error(`writer: accept found no batched items in ${wpId}'s closure \u2014 nothing to baseline`);
    }
    targetId = await allocateBaselineId(repo, date);
    effectiveDate = date;
    writePendingMarker(repo, {
      wpId,
      baselineId: targetId,
      // Informational intent only — the authoritative delivered set is
      // recomputed below from current status (this run and every resume).
      deliveredIds: batched,
      date,
      headCommit,
      verifyEvidenceRef: `.ba/cache/verify-${wpId}.json`
    });
    verdict = gateResult;
    if (crashAfter === "marker")
      throw new Error("TEST-ONLY crash after marker write");
  }
  const deliveredIds = closureIds.filter((id) => {
    const sb = statusBaselineOf(id);
    if (!sb)
      return false;
    return sb.status === "batched" || sb.status === "baselined" && sb.baseline === targetId;
  });
  if (deliveredIds.length === 0) {
    throw new Error(`writer: accept found no deliverable items for ${wpId} under ${targetId} \u2014 nothing to baseline`);
  }
  const baselineDir = join3(baselinesRoot(repo), targetId);
  const items = [];
  const affectedCrIds = /* @__PURE__ */ new Set();
  for (let idx = 0; idx < deliveredIds.length; idx++) {
    const id = deliveredIds[idx];
    const { type, path } = pathForRequirement(repo, id);
    const parsed = parseFile(path, type);
    if ("error" in parsed) {
      throw new Error(`writer: accept could not read delivered item ${id} at ${path}: ${parsed.error}`);
    }
    const fm = parsed.frontmatter;
    const alreadyStamped = fm.status === "baselined" && fm.baseline === targetId;
    const finalFm = alreadyStamped ? fm : { ...fm, status: "baselined", baseline: targetId };
    const frozen = emitRequirement(type, finalFm, parsed.body);
    if (!alreadyStamped)
      atomicWrite(path, frozen);
    if (idx === 0 && crashAfter === "firstItemLive") {
      throw new Error("TEST-ONLY crash after first item live-write, before its frozen-write");
    }
    atomicWrite(join3(baselineDir, `${id}.md`), frozen);
    items.push({ id, version: finalFm.version, content_hash: contentHash(frozen) });
    if (type === "fr" || type === "nfr") {
      for (const cr of finalFm.traces_to ?? [])
        affectedCrIds.add(cr);
    }
    if (type === "br") {
      for (const crRef of historyCrRefs(parsed.body))
        affectedCrIds.add(crRef);
    }
  }
  if (crashAfter === "items")
    throw new Error("TEST-ONLY crash after all item/frozen writes, before manifest");
  items.sort((a, b) => naturalCompare(a.id, b.id));
  const manifest = baselineManifestSchema.parse({
    id: targetId,
    date: effectiveDate,
    wp_ids: [wpId],
    triggered_by: wpId,
    items,
    accepted_by: evidence.producedBy,
    verify_evidence_ref: `.ba/cache/verify-${wpId}.json`
  });
  atomicWrite(join3(baselineDir, "manifest.yaml"), (0, import_yaml5.stringify)(manifest, { lineWidth: 0 }));
  if (crashAfter === "manifest")
    throw new Error("TEST-ONLY crash after manifest write, before reconcile/setWpAccepted");
  const { reconcileCrs: reconcileCrs2 } = await Promise.resolve().then(() => (init_reconcile(), reconcile_exports));
  reconcileCrs2(repo, [...affectedCrIds].sort(naturalCompare), effectiveDate);
  setWpAccepted(repo, wpId);
  deletePendingMarker(repo, wpId);
  return verdict;
}
var import_yaml5, DATE_KEY4, LEGAL_TRANSITIONS;
var init_writer = __esm({
  "../praxis-ba/plugins/ba/canon-graph/dist/writer.js"() {
    "use strict";
    import_yaml5 = __toESM(require_dist(), 1);
    init_ids();
    init_history();
    init_fs();
    init_parse();
    init_serialize();
    init_versiondiff();
    init_graph();
    init_gates();
    init_body_refs();
    init_schema();
    DATE_KEY4 = /^\d{8}$/;
    LEGAL_TRANSITIONS = {
      // draft → batched: allowed so `wp prepare` can batch freshly authored
      // members that were never activated; prefer activate-first in skills.
      draft: /* @__PURE__ */ new Set(["active", "batched", "retired"]),
      active: /* @__PURE__ */ new Set(["batched", "retired"]),
      // batched -> active is the `wp abandon` revert edge (§7); batched ->
      // baselined is `accept` (§8a). Both are future (Task 11+) call sites of
      // this same matrix, not exercised by any Task 10 verb, but pinned here now
      // so `setStatus` is correct for them without a later revisit.
      batched: /* @__PURE__ */ new Set(["baselined", "active", "retired"]),
      // A content edit to a baselined item never changes its *status* (see
      // `editRequirement`) — the only legal bare status transition off
      // `baselined` is a soft retire. Supersede/split (a NEW id, this one ->
      // `superseded`) is a distinct, not-yet-built verb — deliberately out of
      // Task 10's scope (no interface name was given for it); `superseded` is
      // therefore not a legal target of `setStatus` from anywhere yet.
      baselined: /* @__PURE__ */ new Set(["retired"]),
      superseded: /* @__PURE__ */ new Set([]),
      retired: /* @__PURE__ */ new Set([])
    };
  }
});

// ../praxis-ba/plugins/ba/canon-graph/dist/cli.js
init_zod();
var import_yaml9 = __toESM(require_dist(), 1);
init_ac();
init_body_refs();
import { existsSync as existsSync7, readFileSync as readFileSync13, readdirSync as readdirSync8, statSync as statSync5 } from "node:fs";
import { execSync } from "node:child_process";
import { userInfo } from "node:os";
import { basename as basename2, dirname as dirname9, join as join13, relative as relative7, resolve as resolve2, sep as sep4 } from "node:path";
import { parseArgs } from "node:util";

// ../praxis-ba/plugins/ba/canon-graph/dist/fmt.js
init_parse();
init_serialize();
init_writer();
init_schema();
import { readFileSync as readFileSync5 } from "node:fs";
function formatText(raw, type) {
  const parsed = parsePage(raw, type);
  if ("error" in parsed) {
    throw new Error(`fmt: cannot format as '${type}': ${parsed.error}`);
  }
  return emitPage(type, parsed.frontmatter, parsed.body);
}
function peekType2(raw) {
  const type = peekType(raw);
  return type !== void 0 && type in schemas ? type : void 0;
}
function formatFile(repo, path) {
  const raw = readFileSync5(path, "utf8");
  const type = peekType2(raw);
  if (type === void 0) {
    throw new Error(`fmt: ${path}: missing or unrecognized frontmatter 'type'`);
  }
  const formatted = formatText(raw, type);
  if (formatted === raw)
    return { changed: false };
  atomicWrite(path, formatted);
  return { changed: true };
}

// ../praxis-ba/plugins/ba/canon-graph/dist/cli.js
init_fs();

// ../praxis-ba/plugins/ba/canon-graph/dist/init.js
var import_yaml6 = __toESM(require_dist(), 1);
init_fs();
init_ids();
init_schema();
init_serialize();
init_writer();
import { lstatSync, mkdirSync as mkdirSync2, readdirSync as readdirSync3, realpathSync, writeFileSync as writeFileSync3 } from "node:fs";
import { join as join4 } from "node:path";
var CANON_FOLDERS = ["epics", "br", "cr", "wp", "bugs", "baselines"];
var CANON_FOLDER_KEEP = ".gitkeep";
function emptyCounters() {
  return countersSchema.parse({
    product: { epic: 0, cr: 0, wp: 0, bug: 0, baselineSeq: {} },
    epics: {},
    retired: []
  });
}
var VISION_BODY = `<!-- Draft vision. Replace this body with the product vision. Leave \`status: draft\`
in the frontmatter: only a human running \`praxis-ba vision confirm\` may set
\`status: confirmed\`. No work package can become ready while the vision is a draft. -->

State, in one or two paragraphs, what this product is for and the outcome
it exists to produce - the single sentence a stranger could use to judge
whether any future requirement belongs in scope. Plain prose; only the
frontmatter status is machine-checked.
`;
function visionText(product) {
  const heading = product ? `# ${product.replace(/\s+/g, " ").trim()}

` : "";
  return emitPage("vision", { type: "vision", status: "draft" }, `
${heading}${VISION_BODY}`);
}
function kindOf(abs, rel) {
  let st;
  try {
    st = lstatSync(abs);
  } catch (err) {
    if (err.code === "ENOENT")
      return "missing";
    throw err;
  }
  if (st.isSymbolicLink())
    throw new Error(`init: ${rel} is a symbolic link; refusing to write through it`);
  if (st.isDirectory())
    return "dir";
  if (st.isFile())
    return "file";
  throw new Error(`init: ${rel} exists but is neither a regular file nor a directory`);
}
function expectFile(abs, rel) {
  const k = kindOf(abs, rel);
  if (k === "dir")
    throw new Error(`init: ${rel} exists but is a directory, expected a file`);
  return k === "file";
}
function expectDir(abs, rel) {
  const k = kindOf(abs, rel);
  if (k === "file")
    throw new Error(`init: ${rel} exists but is a file, expected a directory`);
  return k === "dir";
}
function writeNew(abs, content) {
  writeFileSync3(abs, content, { encoding: "utf8", flag: "wx" });
}
function epicsPresent(repo) {
  try {
    return readdirSync3(join4(repo, "epics"), { withFileTypes: true }).some((e) => e.isDirectory());
  } catch {
    return false;
  }
}
async function initCanon(repoInput, options2 = {}) {
  const dryRun = options2.dryRun === true;
  const epicTitle = options2.epic?.trim();
  if (options2.epic !== void 0 && !epicTitle)
    throw new Error("init: --epic needs a non-empty title");
  const product = options2.product?.trim();
  if (options2.product !== void 0 && !product)
    throw new Error("init: --product needs a non-empty name");
  let repo;
  try {
    repo = realpathSync(repoInput);
  } catch (err) {
    if (err.code === "ENOENT")
      throw new Error(`init: ${repoInput} does not exist; create the directory first`);
    throw err;
  }
  if (!lstatSync(repo).isDirectory())
    throw new Error(`init: ${repoInput} is a file, not a directory`);
  const created = [];
  const skipped = [];
  const notes = [];
  const actions = [];
  const baDir = join4(repo, ".ba");
  const baExists = expectDir(baDir, ".ba");
  if (baExists)
    skipped.push(".ba/");
  else {
    created.push(".ba/");
    actions.push(() => mkdirSync2(baDir));
  }
  const configAbs = join4(baDir, "config.yaml");
  if (baExists && expectFile(configAbs, ".ba/config.yaml")) {
    try {
      readCanonConfig(repo);
    } catch (err) {
      throw new Error(`init: ${err instanceof Error ? err.message : String(err)}; fix or remove it, init does not repair it`);
    }
    skipped.push(".ba/config.yaml");
  } else {
    const config = configSchema.parse({ canon_roots: [...DEFAULT_CANON_ROOTS] });
    created.push(".ba/config.yaml");
    actions.push(() => writeNew(configAbs, (0, import_yaml6.stringify)(config, { lineWidth: 0 })));
  }
  const countersAbs = join4(baDir, "counters.yaml");
  if (baExists && expectFile(countersAbs, ".ba/counters.yaml")) {
    try {
      readCounters(repo);
    } catch (err) {
      throw new Error(`init: ${err instanceof Error ? err.message : String(err)}; fix or remove it, init does not repair it`);
    }
    skipped.push(".ba/counters.yaml");
  } else {
    created.push(".ba/counters.yaml");
    actions.push(() => writeNew(countersAbs, (0, import_yaml6.stringify)(emptyCounters(), { lineWidth: 0 })));
  }
  for (const name of CANON_FOLDERS) {
    const abs = join4(repo, name);
    if (expectDir(abs, name))
      skipped.push(`${name}/`);
    else {
      created.push(`${name}/`);
      actions.push(() => {
        mkdirSync2(abs);
        writeNew(join4(abs, CANON_FOLDER_KEEP), "");
      });
    }
  }
  const visionAbs = join4(repo, "vision.md");
  if (expectFile(visionAbs, "vision.md"))
    skipped.push("vision.md");
  else {
    created.push("vision.md");
    actions.push(() => writeNew(visionAbs, visionText(product)));
  }
  let epicPlan;
  let epicCreateNeeded = false;
  if (epicTitle) {
    if (epicsPresent(repo)) {
      notes.push("epic not created: this canon already has epics");
    } else {
      epicCreateNeeded = true;
      const countersExist = baExists && kindOf(countersAbs, ".ba/counters.yaml") === "file";
      const nextN = (countersExist ? readCounters(repo).product.epic : 0) + 1;
      const id = `E${nextN}`;
      epicPlan = { id, path: `epics/${id}-${slugify(epicTitle)}/index.md` };
      created.push(epicPlan.path);
    }
  }
  if (!dryRun) {
    for (const act of actions)
      act();
    if (epicCreateNeeded && epicTitle) {
      const { id } = await addEpic(repo, epicTitle);
      epicPlan = { id, path: `epics/${id}-${slugify(epicTitle)}/index.md` };
      const predicted = created.findIndex((p) => p.startsWith("epics/E") && p.endsWith("/index.md"));
      if (predicted >= 0)
        created[predicted] = epicPlan.path;
    }
  }
  const next = [
    "Edit vision.md, then confirm it with a human decision: skill confirm-vision (praxis-ba vision confirm)",
    "Optional: skill ba-scaffold lays out the project documentation layer (project.md, glossary, inputs/, shared/); init does not create it",
    "Then capture the first change request: skill capture-cr"
  ];
  return { repo, dryRun, created, skipped, ...epicPlan ? { epic: epicPlan } : {}, notes, next };
}

// ../praxis-ba/plugins/ba/canon-graph/dist/cli.js
init_graph();
init_gates();

// ../praxis-ba/plugins/ba/canon-graph/dist/goals.js
init_serialize();
function isOpenRequirementStatus(status) {
  return status !== "retired" && status !== "superseded";
}
function checkGoals(graph) {
  const requirementsWithoutGoals = [];
  for (const nodes of [graph.frs, graph.nfrs, graph.brs]) {
    for (const node of nodes) {
      if (!isOpenRequirementStatus(node.frontmatter.status))
        continue;
      const goals = node.frontmatter.goal_ids ?? [];
      if (goals.length === 0)
        requirementsWithoutGoals.push(node.frontmatter.id);
    }
  }
  requirementsWithoutGoals.sort(naturalCompare);
  const goalsWithoutRequirements = [];
  for (const goal of graph.goals) {
    if (goal.frontmatter.status === "retired")
      continue;
    if (graph.goalRequirements(goal.frontmatter.id).length === 0) {
      goalsWithoutRequirements.push(goal.frontmatter.id);
    }
  }
  goalsWithoutRequirements.sort(naturalCompare);
  return { requirementsWithoutGoals, goalsWithoutRequirements };
}

// ../praxis-ba/plugins/ba/canon-graph/dist/one-pager.js
init_ac();
init_writer();
import { mkdirSync as mkdirSync3, writeFileSync as writeFileSync4 } from "node:fs";
import { dirname as dirname3, join as join5 } from "node:path";
function section(body, names) {
  const map = {};
  let current = "";
  for (const line of body.split(/\r?\n/)) {
    const m = /^##\s+(.+)\s*$/.exec(line);
    if (m) {
      current = m[1].trim().toLowerCase();
      map[current] = "";
      continue;
    }
    if (current)
      map[current] += `${line}
`;
  }
  for (const n of names) {
    const v = (map[n.toLowerCase()] ?? "").trim();
    if (v)
      return v;
  }
  return "";
}
function extractAcceptanceCriteriaSource(body) {
  const lines = body.split("\n").map((line) => line.replace(/\r$/, ""));
  const headingIndex = lines.findIndex((line) => SECTION_HEADING.test(line));
  if (headingIndex === -1)
    return "";
  const collected = [];
  for (let i = headingIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (NEXT_HEADING.test(line))
      break;
    collected.push(line);
  }
  return collected.join("\n").trim();
}
function lookupKind(graph, id) {
  if (graph.frs.some((n) => n.frontmatter.id === id))
    return "fr";
  if (graph.nfrs.some((n) => n.frontmatter.id === id))
    return "nfr";
  if (graph.brs.some((n) => n.frontmatter.id === id))
    return "br";
  if (graph.goals.some((n) => n.frontmatter.id === id))
    return "goal";
  if (graph.wps.some((n) => n.frontmatter.id === id))
    return "wp";
  if (graph.crs.some((n) => n.frontmatter.id === id))
    return "cr";
  if (graph.epics.some((n) => n.frontmatter.id === id))
    return "epic";
  if (graph.bugs.some((n) => n.frontmatter.id === id))
    return "bug";
  return void 0;
}
function buildOnePager(repo, id) {
  const graph = loadGraph(repo);
  const kind = lookupKind(graph, id);
  if (kind === void 0) {
    return { ok: false, error: `FAIL: requirement ${id} not found` };
  }
  if (kind !== "fr") {
    return { ok: false, error: `FAIL: ${id} is not an FR` };
  }
  const fr = graph.frs.find((n) => n.frontmatter.id === id);
  if (!fr)
    return { ok: false, error: `FAIL: requirement ${id} not found` };
  const sourcePath = graph.pathOf(id) ?? `epics/${fr.frontmatter.epic}-x/${id}.md`;
  const purpose = section(fr.body, ["\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435", "purpose", "summary", "intent"]);
  const value = section(fr.body, ["\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0430\u044F \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C", "user value", "value", "\u0447\u0442\u043E \u0441\u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C"]);
  const ac = parseAcBlock(fr.body);
  const ready = extractAcceptanceCriteriaSource(fr.body);
  if (!purpose) {
    return { ok: false, error: "FAIL: one-pager not emitted; missing: \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435/purpose" };
  }
  if (ac.error !== void 0 || ac.acs.length === 0 || ready.length === 0) {
    return { ok: false, error: "FAIL: one-pager not emitted; missing: Acceptance Criteria" };
  }
  const markdown = [
    `# One-pager: ${id}`,
    "",
    "## \u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435",
    "",
    purpose,
    "",
    "## \u0427\u0442\u043E \u0441\u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
    "",
    value || "_\u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0432 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0435_",
    "",
    "## \u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u0438",
    "",
    ready,
    "",
    `Source: ${sourcePath}`,
    ""
  ].join("\n");
  return { ok: true, markdown, sourcePath, outPath: join5(repo, "one-pagers", `${id}.md`) };
}
function writeOnePager(repo, id, outPath) {
  const built = buildOnePager(repo, id);
  if (!built.ok)
    return built;
  const dest = outPath ?? built.outPath;
  mkdirSync3(dirname3(dest), { recursive: true });
  writeFileSync4(dest, built.markdown, "utf8");
  return { ...built, outPath: dest };
}

// ../praxis-ba/plugins/ba/canon-graph/dist/cli.js
init_ids();

// ../praxis-ba/plugins/ba/canon-graph/dist/migrate.js
var import_gray_matter2 = __toESM(require_gray_matter(), 1);
var import_yaml7 = __toESM(require_dist(), 1);
init_ac();
init_serialize();
init_schema();
init_ids();
init_writer();
init_fs();
import { mkdirSync as mkdirSync4, readFileSync as readFileSync6, readdirSync as readdirSync4 } from "node:fs";
import { createHash as createHash2 } from "node:crypto";
import { join as join6, relative as relative3, sep as sep2 } from "node:path";
function readJson(path) {
  const raw = JSON.parse(readFileSync6(path, "utf8"));
  return raw;
}
function tryReaddir(dir) {
  try {
    return readdirSync4(dir);
  } catch {
    return [];
  }
}
var v1YamlEngine = { parse: (input) => (0, import_yaml7.parse)(input) };
function readV1WpMdFrontmatter(raw) {
  const { data } = (0, import_gray_matter2.default)(raw, { engines: { yaml: v1YamlEngine } });
  const fmUnknown = data;
  return fmUnknown;
}
function sha256Hex(content) {
  return createHash2("sha256").update(content, "utf8").digest("hex");
}
function emitValidated(path, type, frontmatter, body) {
  const validation = validateFrontmatter(type, frontmatter);
  if (!validation.ok) {
    throw new Error(`migrate: emitted ${type} frontmatter for ${path} failed schema validation: ${validation.issues.join("; ")}`);
  }
  const content = emitPage(type, frontmatter, body);
  atomicWrite(path, content);
}
function slugify2(title) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug === "" ? "epic" : slug;
}
function epicDir(outDir, epicId, slug) {
  return join6(outDir, "epics", `${epicId}-${slug}`);
}
var V1_STATUS_TO_V2 = {
  active: "active",
  draft: "draft",
  baseline: "baselined",
  superseded: "superseded",
  retired: "retired"
};
function mapRequirementStatus(v1Status, id) {
  const mapped = V1_STATUS_TO_V2[v1Status];
  if (!mapped)
    throw new Error(`migrate: ${id} has an unrecognized v1 status '${v1Status}'`);
  return mapped;
}
function parseVersion(v, id) {
  const m = /^v(\d+)$/.exec(v);
  if (!m)
    throw new Error(`migrate: ${id} has an unparseable version '${v}' (expected 'v<N>')`);
  return Number(m[1]);
}
function toDateKey(isoDate, context) {
  const digits = isoDate.replace(/-/g, "");
  if (!/^\d{8}$/.test(digits))
    throw new Error(`migrate: cannot parse date '${isoDate}' (${context}) into YYYYMMDD`);
  return digits;
}
var GOAL_TRACE_BRACKET = /\s*\[goal-trace:\s*([\s\S]*?)\]\s*$/;
function splitStatementAndRationale(text) {
  const trimmed = text.trim();
  const m = GOAL_TRACE_BRACKET.exec(trimmed);
  if (!m)
    return { statement: trimmed };
  const rationale = m[1]?.trim();
  const statement = trimmed.slice(0, m.index).trim();
  return rationale ? { statement, rationale } : { statement };
}
function formatRationale(rationale) {
  return rationale.split("|").map((segment) => segment.trim()).filter((segment) => segment.length > 0).map((segment) => `- ${segment}`).join("\n");
}
function buildFrBody(text, acs) {
  const { statement, rationale } = splitStatementAndRationale(text);
  const lines = [statement, "", "## Acceptance Criteria", ""];
  acs.forEach((ac, index) => lines.push(`- AC-${index + 1}: ${ac.trim()}`));
  if (rationale)
    lines.push("", "## Rationale", "", formatRationale(rationale));
  return lines.join("\n");
}
function buildNfrBody(text) {
  const { statement, rationale } = splitStatementAndRationale(text);
  const lines = [statement];
  if (rationale)
    lines.push("", "## Rationale", "", formatRationale(rationale));
  return lines.join("\n");
}
var PLACEHOLDER_RATIONALE = "(to be completed)";
function buildBrBody(ruleText, rationale) {
  const lines = [ruleText.trim()];
  if (rationale.trim() !== "" && rationale.trim() !== PLACEHOLDER_RATIONALE) {
    lines.push("", "## Rationale", "", rationale.trim());
  }
  return lines.join("\n");
}
function readCrs(v1Dir) {
  const dir = join6(v1Dir, "cr");
  return tryReaddir(dir).filter((f) => /^CR-\d{3}\.json$/.test(f)).map((f) => readJson(join6(dir, f))).sort((a, b) => naturalCompare(a.id, b.id));
}
function readBaselines(v1Dir) {
  const dir = join6(v1Dir, "baselines");
  return tryReaddir(dir).filter((f) => /^BL-\d{8}(-\d+)?\.json$/.test(f)).map((f) => readJson(join6(dir, f))).sort((a, b) => naturalCompare(a.baseline_id, b.baseline_id));
}
function readV1Vision(v1Dir) {
  const path = join6(v1Dir, "vision.md");
  let raw;
  try {
    raw = readFileSync6(path, "utf8");
  } catch {
    return void 0;
  }
  const { data, content } = (0, import_gray_matter2.default)(raw, { engines: { yaml: v1YamlEngine } });
  const fmUnknown = data;
  return { status: fmUnknown.status, body: content };
}
function mapVisionStatus(v1Status) {
  return v1Status === "draft" || v1Status === "confirmed" ? v1Status : "confirmed";
}
function readWps(v1Dir) {
  const dir = join6(v1Dir, "work-packages");
  const idsWithJson = /* @__PURE__ */ new Set();
  const idsWithMd = /* @__PURE__ */ new Set();
  for (const f of tryReaddir(dir)) {
    if (/^WP-\d{8}-\d{3}\.json$/.test(f))
      idsWithJson.add(f.slice(0, -".json".length));
    else if (/^WP-\d{8}-\d{3}\.md$/.test(f))
      idsWithMd.add(f.slice(0, -".md".length));
  }
  const wps = [];
  for (const filenameId of /* @__PURE__ */ new Set([...idsWithJson, ...idsWithMd])) {
    if (idsWithJson.has(filenameId)) {
      const data = readJson(join6(dir, `${filenameId}.json`));
      wps.push({ id: data.wp_id, role: asRole(data.role, data.wp_id), frIds: [...data.fr_ids] });
    } else {
      const raw = readFileSync6(join6(dir, `${filenameId}.md`), "utf8");
      const fm = readV1WpMdFrontmatter(raw);
      wps.push({ id: fm.wp_id, role: asRole(fm.role, fm.wp_id), frIds: [...fm.fr_ids] });
    }
  }
  return wps.sort((a, b) => naturalCompare(a.id, b.id));
}
function asRole(role, wpId) {
  if (role !== "developer" && role !== "qa") {
    throw new Error(`migrate: ${wpId} has an unrecognized role '${role}' (expected developer|qa)`);
  }
  return role;
}
function trueFrozenIds(baselineId, fileList, requirements) {
  const fromRequirements = requirements.filter((r) => r.baseline_ref === baselineId).map((r) => r.id);
  return [.../* @__PURE__ */ new Set([...fileList, ...fromRequirements])].sort(naturalCompare);
}
var MIGRATED_CANON_ROOTS = [...DEFAULT_CANON_ROOTS];
function migrate(v1Dir, outDir) {
  const written = [];
  const product = readJson(join6(v1Dir, "product.json"));
  const brRegistry = readJson(join6(v1Dir, "br-registry.json"));
  const crs = readCrs(v1Dir);
  const baselines = readBaselines(v1Dir);
  const wps = readWps(v1Dir);
  const v1Vision = readV1Vision(v1Dir);
  const epicSlugById = new Map(product.epics.map((e) => [e.id, slugify2(e.title)]));
  const versionById = /* @__PURE__ */ new Map();
  const pathById = /* @__PURE__ */ new Map();
  const reqStatusById = new Map(product.requirement_db.map((r) => [r.id, r.status]));
  if (v1Vision) {
    const path = join6(outDir, "vision.md");
    const status = mapVisionStatus(v1Vision.status);
    emitValidated(path, "vision", { type: "vision", status }, v1Vision.body);
    written.push(path);
  }
  for (const epic of product.epics) {
    const path = join6(epicDir(outDir, epic.id, epicSlugById.get(epic.id)), "index.md");
    emitValidated(path, "epic", { id: epic.id, type: "epic", title: epic.title, status: epic.status }, "");
    written.push(path);
  }
  for (const req of product.requirement_db.filter((r) => r.type === "fr" || r.type === "nfr")) {
    const slug = epicSlugById.get(req.epic_id);
    if (slug === void 0)
      throw new Error(`migrate: ${req.id} references unknown epic '${req.epic_id}'`);
    const path = join6(epicDir(outDir, req.epic_id, slug), `${req.id}.md`);
    const version = parseVersion(req.current.version, req.id);
    const status = mapRequirementStatus(req.status, req.id);
    const tracesTo = [...req.cr_refs];
    const hasDerivedTrace = tracesTo.length > 0;
    const fm = {
      id: req.id,
      type: req.type,
      epic: req.epic_id,
      status,
      version,
      traces_to: tracesTo,
      ...req.type === "fr" ? { enforces: [], references_nfr: [], related: [] } : { verified_by: [], related: [] }
    };
    if (req.baseline_ref)
      fm.baseline = req.baseline_ref;
    if (!hasDerivedTrace)
      fm.provenance = "migrated";
    const body = req.type === "fr" ? buildFrBody(req.current.text, req.current.acceptance_criteria) : buildNfrBody(req.current.text);
    emitValidated(path, req.type, fm, body);
    written.push(path);
    versionById.set(req.id, version);
    pathById.set(req.id, path);
  }
  for (const rule of brRegistry.rules) {
    const path = join6(outDir, "br", `${rule.id}.md`);
    const version = parseVersion(rule.current.version, rule.id);
    const status = mapRequirementStatus(rule.status, rule.id);
    const enforcement = rule.current.enforcement;
    if (enforcement !== "advisory" && enforcement !== "hard") {
      throw new Error(`migrate: ${rule.id} has an unrecognized enforcement '${enforcement}'`);
    }
    const fm = {
      id: rule.id,
      type: "br",
      epic: rule.epic_id,
      kind: "operative",
      enforcement,
      status,
      version
    };
    const body = buildBrBody(rule.current.rule_text, rule.current.rationale);
    emitValidated(path, "br", fm, body);
    written.push(path);
    versionById.set(rule.id, version);
    pathById.set(rule.id, path);
  }
  for (const cr of crs) {
    const path = join6(outDir, "cr", `${cr.id}.md`);
    const fm = { id: cr.id, type: "cr", status: cr.status };
    if (cr.status === "confirmed" || cr.status === "resolved") {
      const level = cr.entry_point_confirmed ?? cr.entry_point_advisory;
      if (level) {
        fm.entry_point = level;
        fm.entry_point_confirmed = true;
      }
    }
    const body = `${cr.client_words.trim()}
`;
    emitValidated(path, "cr", fm, body);
    written.push(path);
  }
  for (const wp of wps) {
    const path = join6(outDir, "wp", `${wp.id}.md`);
    const allBaselined = wp.frIds.length > 0 && wp.frIds.every((id) => reqStatusById.get(id) === "baseline");
    const status = allBaselined ? "accepted" : "draft";
    const fm = { id: wp.id, type: "wp", role: wp.role, status };
    const deliversLines = wp.frIds.map((id) => {
      const itemPath = pathById.get(id);
      if (!itemPath)
        throw new Error(`migrate: wp ${wp.id} scopes unknown FR '${id}'`);
      return `- [${id}](${relative3(outDir, itemPath).split(sep2).join("/")})`;
    }).join("\n");
    const body = `Migrated from v1 ${wp.id} (role: ${wp.role}). FR scope: ${wp.frIds.join(", ")}.

## Scope

### Delivers

${deliversLines}
`;
    emitValidated(path, "wp", fm, body);
    written.push(path);
  }
  for (const baseline of baselines) {
    const frozenIds = trueFrozenIds(baseline.baseline_id, baseline.frozen_requirement_ids, product.requirement_db);
    const items = frozenIds.map((id) => {
      const version = versionById.get(id);
      const itemPath = pathById.get(id);
      if (version === void 0 || itemPath === void 0) {
        throw new Error(`migrate: baseline ${baseline.baseline_id} references unknown item '${id}'`);
      }
      const content = readFileSync6(itemPath, "utf8");
      return { id, version, content_hash: sha256Hex(content) };
    });
    const manifest = baselineManifestSchema.parse({
      id: baseline.baseline_id,
      date: toDateKey(baseline.date, baseline.baseline_id),
      wp_ids: [baseline.wp_ref],
      triggered_by: baseline.wp_ref,
      items,
      // No v1 field corresponds to either of these — v1 predates the
      // VERIFY-EVIDENCE artifact (§6.9) entirely. A plain, honest constant
      // (never a fabricated evidence-ref path) so nothing downstream ever
      // mistakes this for a real accept()-produced evidence trail.
      accepted_by: "migrated-from-v1",
      verify_evidence_ref: "migrated-from-v1 (no VERIFY-EVIDENCE artifact; predates the v2 harness)"
    });
    const path = join6(outDir, "baselines", baseline.baseline_id, "manifest.yaml");
    atomicWrite(path, (0, import_yaml7.stringify)(manifest, { lineWidth: 0 }));
    written.push(path);
  }
  const counters = seedCounters(product, baselines);
  mkdirSync4(join6(outDir, ".ba"), { recursive: true });
  writeCounters(outDir, counters);
  written.push(join6(outDir, ".ba", "counters.yaml"));
  const configPath2 = join6(outDir, ".ba", "config.yaml");
  atomicWrite(configPath2, (0, import_yaml7.stringify)({ canon_roots: [...MIGRATED_CANON_ROOTS] }, { lineWidth: 0 }));
  written.push(configPath2);
  return { written };
}
function seedCounters(product, baselines) {
  const baselineSeq = {};
  for (const b of baselines) {
    const m = /^BL-(\d{8})(?:-(\d+))?$/.exec(b.baseline_id);
    if (!m)
      throw new Error(`migrate: cannot parse baseline id '${b.baseline_id}'`);
    const date = m[1];
    const seq = m[2] !== void 0 ? Number(m[2]) : 1;
    baselineSeq[date] = Math.max(baselineSeq[date] ?? 0, seq);
  }
  const epics = {};
  for (const epic of product.epics) {
    epics[epic.id] = { fr: epic._counters.fr, nfr: epic._counters.nfr, br: epic._counters.br };
  }
  return countersSchema.parse({
    product: {
      epic: product._counters.epic,
      cr: product._counters.cr,
      wp: product._counters.wp,
      // v1 has no bug tracking at all (client bugs are a v2-only concept —
      // design spec §6.7) — seeded at zero, never inferred.
      bug: 0,
      baselineSeq
    },
    epics,
    retired: []
  });
}
function mdStatementOf(body) {
  const lines = body.split("\n");
  const headingIndex = lines.findIndex((line) => NEXT_HEADING.test(line));
  const statementLines = headingIndex === -1 ? lines : lines.slice(0, headingIndex);
  return statementLines.join("\n");
}
function normalizeText(s) {
  return s.split("\n").map((line) => line.trim()).filter((line) => line.length > 0).join(" ").trim();
}
function hashStatement(statement, acs = []) {
  const payload = JSON.stringify({ statement: normalizeText(statement), acs: acs.map(normalizeText) });
  return sha256Hex(payload);
}
function idSetCheck(name, expected, actual) {
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);
  const missing = [...expectedSet].filter((id) => !actualSet.has(id)).sort(naturalCompare);
  const extra = [...actualSet].filter((id) => !expectedSet.has(id)).sort(naturalCompare);
  const ok2 = missing.length === 0 && extra.length === 0;
  const parts = [];
  if (missing.length > 0)
    parts.push(`missing: ${missing.join(", ")}`);
  if (extra.length > 0)
    parts.push(`extra: ${extra.join(", ")}`);
  return { name, ok: ok2, reason: ok2 ? `all ${expectedSet.size} id(s) present` : parts.join("; ") };
}
function setEquals(a, b) {
  return a.size === b.size && [...a].every((v) => b.has(v));
}
function readOutBaselineIds(outDir) {
  const dir = join6(outDir, "baselines");
  try {
    return readdirSync4(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}
function readOutBaselineManifest(outDir, id) {
  const path = join6(outDir, "baselines", id, "manifest.yaml");
  let raw;
  try {
    raw = readFileSync6(path, "utf8");
  } catch {
    return void 0;
  }
  return baselineManifestSchema.parse((0, import_yaml7.parse)(raw));
}
function verifyParity(v1Dir, outDir) {
  const product = readJson(join6(v1Dir, "product.json"));
  const brRegistry = readJson(join6(v1Dir, "br-registry.json"));
  const crs = readCrs(v1Dir);
  const baselines = readBaselines(v1Dir);
  const wps = readWps(v1Dir);
  const graph = loadGraph(outDir);
  const checks = [];
  const v1Frs = product.requirement_db.filter((r) => r.type === "fr");
  const v1Nfrs = product.requirement_db.filter((r) => r.type === "nfr");
  checks.push(idSetCheck("epic-ids", product.epics.map((e) => e.id), graph.epics.map((n) => n.frontmatter.id)));
  checks.push(idSetCheck("fr-ids", v1Frs.map((r) => r.id), graph.frs.map((n) => n.frontmatter.id)));
  checks.push(idSetCheck("nfr-ids", v1Nfrs.map((r) => r.id), graph.nfrs.map((n) => n.frontmatter.id)));
  checks.push(idSetCheck("br-ids", brRegistry.rules.map((r) => r.id), graph.brs.map((n) => n.frontmatter.id)));
  checks.push(idSetCheck("cr-ids", crs.map((c) => c.id), graph.crs.map((n) => n.frontmatter.id)));
  checks.push(idSetCheck("baseline-ids", baselines.map((b) => b.baseline_id), readOutBaselineIds(outDir)));
  checks.push(idSetCheck("wp-ids", wps.map((w) => w.id), graph.wps.map((n) => n.frontmatter.id)));
  const frById = new Map(graph.frs.map((n) => [n.frontmatter.id, n]));
  const frMismatches = [];
  for (const req of v1Frs) {
    const node = frById.get(req.id);
    if (!node)
      continue;
    const v1Hash = hashStatement(splitStatementAndRationale(req.current.text).statement, req.current.acceptance_criteria);
    const mdAcs = [...parseAcBlock(node.body).acs].sort((a, b) => a.acId - b.acId).map((ac) => ac.text);
    const mdHash = hashStatement(mdStatementOf(node.body), mdAcs);
    if (v1Hash !== mdHash)
      frMismatches.push(req.id);
  }
  checks.push({
    name: "fr-content-hash",
    ok: frMismatches.length === 0,
    reason: frMismatches.length === 0 ? "every FR statement + AC text matches v1" : `reworded: ${frMismatches.join(", ")}`
  });
  const nfrById = new Map(graph.nfrs.map((n) => [n.frontmatter.id, n]));
  const nfrMismatches = [];
  for (const req of v1Nfrs) {
    const node = nfrById.get(req.id);
    if (!node)
      continue;
    const v1Hash = hashStatement(splitStatementAndRationale(req.current.text).statement);
    const mdHash = hashStatement(mdStatementOf(node.body));
    if (v1Hash !== mdHash)
      nfrMismatches.push(req.id);
  }
  checks.push({
    name: "nfr-content-hash",
    ok: nfrMismatches.length === 0,
    reason: nfrMismatches.length === 0 ? "every NFR statement matches v1" : `reworded: ${nfrMismatches.join(", ")}`
  });
  const brById = new Map(graph.brs.map((n) => [n.frontmatter.id, n]));
  const brMismatches = [];
  for (const rule of brRegistry.rules) {
    const node = brById.get(rule.id);
    if (!node)
      continue;
    const v1Hash = hashStatement(rule.current.rule_text);
    const mdHash = hashStatement(mdStatementOf(node.body));
    if (v1Hash !== mdHash)
      brMismatches.push(rule.id);
  }
  checks.push({
    name: "br-content-hash",
    ok: brMismatches.length === 0,
    reason: brMismatches.length === 0 ? "every BR statement matches v1" : `reworded: ${brMismatches.join(", ")}`
  });
  const baselineMismatches = [];
  for (const b of baselines) {
    const manifest = readOutBaselineManifest(outDir, b.baseline_id);
    if (!manifest) {
      baselineMismatches.push(`${b.baseline_id}: manifest missing`);
      continue;
    }
    const expected = new Set(trueFrozenIds(b.baseline_id, b.frozen_requirement_ids, product.requirement_db));
    const actual = new Set(manifest.items.map((i) => i.id));
    if (!setEquals(expected, actual))
      baselineMismatches.push(`${b.baseline_id}: frozen id list mismatch`);
  }
  checks.push({
    name: "baseline-frozen-ids",
    ok: baselineMismatches.length === 0,
    reason: baselineMismatches.length === 0 ? "every baseline frozen-id list matches v1" : baselineMismatches.join("; ")
  });
  const wpById = new Map(graph.wps.map((n) => [n.frontmatter.id, n]));
  const wpMismatches = [];
  for (const wp of wps) {
    const node = wpById.get(wp.id);
    if (!node) {
      wpMismatches.push(`${wp.id}: not found in md canon`);
      continue;
    }
    const expected = new Set(wp.frIds);
    const actual = new Set(graph.wpDelivers(wp.id));
    if (!setEquals(expected, actual))
      wpMismatches.push(`${wp.id}: fr_ids mismatch`);
  }
  checks.push({
    name: "wp-fr-ids",
    ok: wpMismatches.length === 0,
    reason: wpMismatches.length === 0 ? "every WP's fr_ids matches v1" : wpMismatches.join("; ")
  });
  const verdict = checks.every((c) => c.ok) ? "VERIFY-OK" : "VERIFY-FAIL";
  return { verdict, checks };
}

// ../praxis-ba/plugins/ba/canon-graph/dist/migrate-v3.js
var import_gray_matter3 = __toESM(require_gray_matter(), 1);
var import_yaml8 = __toESM(require_dist(), 1);
init_zod();
init_fs();
init_history();
init_ids();
init_parse();
init_reconcile();
init_writer();
init_schema();
init_scopelinks();
init_serialize();
init_gates();
import { existsSync, mkdirSync as mkdirSync5, readdirSync as readdirSync5, readFileSync as readFileSync7, renameSync as renameSync3 } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash as createHash3 } from "node:crypto";
import { basename, dirname as dirname4, join as join7, resolve } from "node:path";
var backfillEntrySchema = external_exports.object({ impacts: external_exports.array(crImpactSchema) });
var backfillMapSchema = external_exports.record(external_exports.string().regex(CR_ID), backfillEntrySchema);
var paritySnapshotSchema = external_exports.object({
  ids: external_exports.array(external_exports.string()),
  statuses: external_exports.record(external_exports.string(), external_exports.string()),
  versions: external_exports.record(external_exports.string(), external_exports.number()),
  rtmEdges: external_exports.array(external_exports.object({ from: external_exports.string(), to: external_exports.string() })),
  planFiles: external_exports.record(external_exports.string(), external_exports.string()),
  counters: countersSchema
});
var wpSchemaV2 = external_exports.object({
  id: external_exports.string().regex(WP_ID),
  type: external_exports.literal("wp"),
  role: external_exports.enum(["developer", "qa"]),
  status: external_exports.enum(["draft", "ready", "plan-approved", "accepted", "abandoned"]),
  fr_ids: external_exports.array(external_exports.string()).optional(),
  extra_brs: external_exports.array(external_exports.string()).optional(),
  extra_nfrs: external_exports.array(external_exports.string()).optional(),
  plan: external_exports.string().optional()
});
var crSchemaV2 = external_exports.object({
  id: external_exports.string().regex(CR_ID),
  type: external_exports.literal("cr"),
  status: external_exports.enum(["captured", "confirmed", "resolved"]),
  entry_point: external_exports.string().optional(),
  entry_point_confirmed: external_exports.boolean().optional(),
  spawned_from_bug: external_exports.string().regex(BUG_ID).optional()
});
var legacyYamlEngine = { parse: (input) => (0, import_yaml8.parse)(input) };
function readRawPage(path) {
  let raw;
  try {
    raw = readFileSync7(path, "utf8");
  } catch {
    return void 0;
  }
  const { data, content } = (0, import_gray_matter3.default)(raw, { engines: { yaml: legacyYamlEngine } });
  return { frontmatter: data, body: content };
}
function sha256Hex2(content) {
  return createHash3("sha256").update(content, "utf8").digest("hex");
}
function resolveLinkRoot(canonDir) {
  return readCanonConfig(canonDir)?.link_root ?? basename(resolve(canonDir));
}
function gitMove(src, dst, repoRoot) {
  mkdirSync5(dirname4(dst), { recursive: true });
  try {
    execFileSync("git", ["mv", "--", src, dst], { cwd: repoRoot, stdio: "pipe" });
  } catch {
    renameSync3(src, dst);
    try {
      execFileSync("git", ["add", "-A"], { cwd: repoRoot, stdio: "pipe" });
    } catch {
    }
  }
}
function flatWpPath(canonDir, id) {
  return join7(canonDir, "wp", `${id}.md`);
}
function buildScopeSection(graph, refs, _linkRoot, wpId, advisories) {
  const frById = new Map(graph.frs.map((n) => [n.frontmatter.id, n]));
  const nfrById = new Map(graph.nfrs.map((n) => [n.frontmatter.id, n]));
  const brById = new Map(graph.brs.map((n) => [n.frontmatter.id, n]));
  const wpRelPath = `wp/${wpId}/index.md`;
  const frIds = [...new Set(refs.frIds)].sort(naturalCompare);
  const crIds = /* @__PURE__ */ new Set();
  const nfrIds = new Set(refs.extraNfrs);
  const brIds = new Set(refs.extraBrs);
  const deliversLines = [];
  for (const frId of frIds) {
    const fr = frById.get(frId);
    if (!fr) {
      advisories.push(`${wpId}: fr_ids references unknown FR '${frId}' \u2014 omitted from Delivers`);
      continue;
    }
    for (const cr of fr.frontmatter.traces_to)
      crIds.add(cr);
    for (const br of fr.frontmatter.enforces)
      brIds.add(br);
    for (const nfr of fr.frontmatter.references_nfr) {
      if (/^E\d+-NFR\d+$/.test(nfr))
        nfrIds.add(nfr);
    }
    const path = graph.pathOf(frId);
    if (!path) {
      advisories.push(`${wpId}: FR '${frId}' has no resolvable canon path \u2014 omitted from Delivers`);
      continue;
    }
    const anchor = pageAnchors(fr.body).has("acceptance-criteria") ? "#acceptance-criteria" : "";
    deliversLines.push(`- [${frId} v${fr.frontmatter.version}](${expectedScopeHref(wpRelPath, path)}${anchor})`);
  }
  const crLines = [...crIds].sort(naturalCompare).map((crId) => `- [${crId}](${expectedScopeHref(wpRelPath, `cr/${crId}.md`)})`);
  const constraintIds = [.../* @__PURE__ */ new Set([...nfrIds, ...brIds])].sort(naturalCompare);
  const constraintLines = [];
  for (const id of constraintIds) {
    const nfr = nfrById.get(id);
    const br = brById.get(id);
    if (nfr) {
      const path = graph.pathOf(id);
      if (!path) {
        advisories.push(`${wpId}: NFR '${id}' has no resolvable canon path \u2014 omitted from Constraints`);
        continue;
      }
      const anchor = pageAnchors(nfr.body).has("planguage") ? "#planguage" : "";
      constraintLines.push(`- [${id} v${nfr.frontmatter.version}](${expectedScopeHref(wpRelPath, path)}${anchor})`);
    } else if (br) {
      const path = graph.pathOf(id);
      if (!path) {
        advisories.push(`${wpId}: BR '${id}' has no resolvable canon path \u2014 omitted from Constraints`);
        continue;
      }
      constraintLines.push(`- [${id} v${br.frontmatter.version}](${expectedScopeHref(wpRelPath, path)})`);
    } else {
      advisories.push(`${wpId}: Constraints ref '${id}' does not resolve to any NFR/BR \u2014 omitted`);
    }
  }
  const sections = [];
  if (crLines.length > 0)
    sections.push(["### Change requests", ...crLines].join("\n"));
  sections.push(["### Delivers", ...deliversLines].join("\n"));
  if (constraintLines.length > 0)
    sections.push(["### Constraints", ...constraintLines].join("\n"));
  return ["## Scope", "", sections.join("\n\n")].join("\n");
}
var WP_FLAT_FILE = /^WP-\d{8}-\d{3}\.md$/;
function migrateWps(canonDir, repoRoot, graph, linkRoot, written, moved, advisories) {
  const wpDir = join7(canonDir, "wp");
  let entries;
  try {
    entries = readdirSync5(wpDir, { withFileTypes: true });
  } catch {
    return;
  }
  const filenames = entries.filter((e) => e.isFile() && WP_FLAT_FILE.test(e.name)).map((e) => e.name).sort(naturalCompare);
  for (const filename of filenames) {
    const id = filename.slice(0, -".md".length);
    const oldPath = flatWpPath(canonDir, id);
    const raw = readRawPage(oldPath);
    if (!raw)
      throw new Error(`migrate-v3: cannot read legacy WP at ${oldPath}`);
    const legacy = wpSchemaV2.safeParse(raw.frontmatter);
    if (!legacy.success) {
      const issues = legacy.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
      throw new Error(`migrate-v3: ${oldPath} failed legacy wp schema validation: ${issues.join("; ")}`);
    }
    const fm = legacy.data;
    const newPath = wpPath(canonDir, id);
    const newDir = dirname4(newPath);
    let planValue = fm.plan;
    if (fm.plan !== void 0) {
      const srcAbs = join7(repoRoot, fm.plan);
      if (existsSync(srcAbs)) {
        const dstAbs = join7(newDir, "plan.md");
        gitMove(srcAbs, dstAbs, repoRoot);
        moved.push({ from: fm.plan, to: `wp/${id}/plan.md` });
        planValue = `wp/${id}/plan.md`;
      } else {
        advisories.push(`${id}: plan '${fm.plan}' not found at ${srcAbs} \u2014 leaving plan: unchanged`);
      }
    }
    const scope = buildScopeSection(graph, { frIds: fm.fr_ids ?? [], extraBrs: fm.extra_brs ?? [], extraNfrs: fm.extra_nfrs ?? [] }, linkRoot, id, advisories);
    const oldBody = raw.body.trim();
    const newBody = `${oldBody === "" ? "" : `${oldBody}

`}${scope}
`;
    const newFm = { id, type: "wp", role: fm.role, status: fm.status };
    if (planValue !== void 0)
      newFm.plan = planValue;
    const validatedFm = wpSchema.parse(newFm);
    gitMove(oldPath, newPath, repoRoot);
    atomicWrite(newPath, emitPage("wp", validatedFm, newBody));
    moved.push({ from: `wp/${filename}`, to: `wp/${id}/index.md` });
    written.push(newPath);
  }
}
var CR_FILE = /^CR-\d{3}\.md$/;
function migrateCrs(canonDir, backfill, written, advisories) {
  const crDir = join7(canonDir, "cr");
  let entries;
  try {
    entries = readdirSync5(crDir, { withFileTypes: true });
  } catch {
    return;
  }
  const filenames = entries.filter((e) => e.isFile() && CR_FILE.test(e.name)).map((e) => e.name).sort(naturalCompare);
  for (const filename of filenames) {
    const id = filename.slice(0, -".md".length);
    const path = crPath(canonDir, id);
    const current = parseFile(path, "cr");
    let fm;
    let body;
    let changed = false;
    if ("error" in current) {
      const raw = readRawPage(path);
      if (!raw)
        throw new Error(`migrate-v3: cannot read legacy CR at ${path}`);
      const legacy = crSchemaV2.safeParse(raw.frontmatter);
      if (!legacy.success) {
        const issues = legacy.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
        throw new Error(`migrate-v3: ${path} failed legacy cr schema validation: ${issues.join("; ")}`);
      }
      fm = { ...legacy.data };
      body = raw.body;
      if (fm.entry_point !== void 0 && fm.entry_point !== "vision") {
        fm.entry_point = "requirement";
      }
      changed = true;
    } else {
      fm = { ...current.frontmatter };
      body = current.body;
    }
    if ((fm.status === "confirmed" || fm.status === "resolved") && fm.entry_point === "requirement") {
      const currentImpacts = fm.impacts ?? [];
      if (currentImpacts.length === 0) {
        const entry = backfill[id];
        if (entry) {
          fm.impacts = entry.impacts;
          fm.provenance = "backfilled";
          changed = true;
        } else {
          advisories.push(`${id}: ${fm.status} requirement-entry CR has no backfill entry \u2014 impacts left unset`);
        }
      }
    }
    if (changed) {
      const validated = crSchema.parse(fm);
      atomicWrite(path, emitPage("cr", validated, body));
      written.push(path);
    }
  }
}
function demoteNonEntryHeadingsInHistory(section2) {
  const matches = [...section2.matchAll(ENTRY_HEADING)];
  if (matches.length === 0)
    return demoteHeadings(section2);
  let out = "";
  let cursor = 0;
  for (const m of matches) {
    const start = m.index;
    out += demoteHeadings(section2.slice(cursor, start));
    out += m[0];
    cursor = start + m[0].length;
  }
  out += demoteHeadings(section2.slice(cursor));
  return out;
}
function demoteLegacyHistoryBody(body) {
  const match = HISTORY_HEADING_LINE.exec(body);
  if (!match)
    return body;
  const headEnd = match.index + match[0].length;
  return body.slice(0, headEnd) + demoteNonEntryHeadingsInHistory(body.slice(headEnd));
}
function demoteOne(canonDir, type, frontmatter, body, path, written) {
  if (!HISTORY_HEADING_LINE.test(body))
    return;
  const demoted = demoteLegacyHistoryBody(body);
  if (demoted === body)
    return;
  if (!path)
    return;
  const abs = join7(canonDir, ...path.split("/"));
  atomicWrite(abs, emitPage(type, frontmatter, demoted));
  written.push(abs);
}
function demoteLegacyHistories(canonDir, graph, written) {
  for (const fr of graph.frs) {
    demoteOne(canonDir, "fr", fr.frontmatter, fr.body, graph.pathOf(fr.frontmatter.id), written);
  }
  for (const nfr of graph.nfrs) {
    demoteOne(canonDir, "nfr", nfr.frontmatter, nfr.body, graph.pathOf(nfr.frontmatter.id), written);
  }
  for (const br of graph.brs) {
    demoteOne(canonDir, "br", br.frontmatter, br.body, graph.pathOf(br.frontmatter.id), written);
  }
}
function bumpBugCounterFloor(canonDir, written) {
  const counters = readCounters(canonDir);
  if (counters.product.bug >= 13)
    return;
  writeCounters(canonDir, { ...counters, product: { ...counters.product, bug: 13 } });
  written.push(join7(canonDir, ".ba", "counters.yaml"));
}
function seedLinkRootIfAbsent(canonDir, written) {
  const path = join7(canonDir, ".ba", "config.yaml");
  let raw;
  try {
    raw = readFileSync7(path, "utf8");
  } catch {
    const seeded = { link_root: basename(resolve(canonDir)) };
    atomicWrite(path, (0, import_yaml8.stringify)(seeded, { lineWidth: 0 }));
    written.push(path);
    return;
  }
  const parsed = (0, import_yaml8.parse)(raw);
  const obj = typeof parsed === "object" && parsed !== null ? { ...parsed } : {};
  if (obj.link_root !== void 0)
    return;
  obj.link_root = basename(resolve(canonDir));
  atomicWrite(path, (0, import_yaml8.stringify)(obj, { lineWidth: 0 }));
  written.push(path);
}
function reconcileAllCrs(canonDir, date, written) {
  const crDir = join7(canonDir, "cr");
  let entries;
  try {
    entries = readdirSync5(crDir, { withFileTypes: true });
  } catch {
    return;
  }
  const ids = entries.filter((e) => e.isFile() && CR_FILE.test(e.name)).map((e) => e.name.slice(0, -".md".length)).sort(naturalCompare);
  const statusBefore = /* @__PURE__ */ new Map();
  for (const id of ids) {
    const parsed = parseFile(crPath(canonDir, id), "cr");
    if (!("error" in parsed))
      statusBefore.set(id, parsed.frontmatter.status);
  }
  reconcileCrs(canonDir, ids, date);
  for (const id of ids) {
    const parsed = parseFile(crPath(canonDir, id), "cr");
    if ("error" in parsed)
      continue;
    const after = parsed.frontmatter.status;
    if (statusBefore.get(id) !== after)
      written.push(crPath(canonDir, id));
  }
}
function migrateV3(canonDir, repoRoot, backfill, date) {
  const written = [];
  const moved = [];
  const advisories = [];
  const snapshotPath = join7(canonDir, ".ba", "cache", "migrate-v3-snapshot.json");
  if (!existsSync(snapshotPath)) {
    const snapshot = snapshotForParity(canonDir, repoRoot);
    atomicWrite(snapshotPath, `${JSON.stringify(snapshot, null, 2)}
`);
    written.push(snapshotPath);
  }
  const linkRoot = resolveLinkRoot(canonDir);
  const graph = loadGraph(canonDir);
  migrateWps(canonDir, repoRoot, graph, linkRoot, written, moved, advisories);
  migrateCrs(canonDir, backfill, written, advisories);
  demoteLegacyHistories(canonDir, graph, written);
  bumpBugCounterFloor(canonDir, written);
  seedLinkRootIfAbsent(canonDir, written);
  reconcileAllCrs(canonDir, date, written);
  return { written, moved, advisories };
}
function readWpForSnapshot(path) {
  const raw = readRawPage(path);
  if (!raw)
    return void 0;
  const current = wpSchema.safeParse(raw.frontmatter);
  if (current.success) {
    return { id: current.data.id, status: current.data.status, frIds: parseScope(raw.body).frs.map((r) => r.id), plan: current.data.plan };
  }
  const legacy = wpSchemaV2.safeParse(raw.frontmatter);
  if (legacy.success) {
    return { id: legacy.data.id, status: legacy.data.status, frIds: legacy.data.fr_ids ?? [], plan: legacy.data.plan };
  }
  return void 0;
}
function readCrForSnapshot(path) {
  const raw = readRawPage(path);
  if (!raw)
    return void 0;
  const current = crSchema.safeParse(raw.frontmatter);
  if (current.success)
    return { id: current.data.id, status: current.data.status };
  const legacy = crSchemaV2.safeParse(raw.frontmatter);
  if (legacy.success)
    return { id: legacy.data.id, status: legacy.data.status };
  return void 0;
}
function resolvePlanAbsPath(canonDir, repoRoot, wpId, plan) {
  return plan === `wp/${wpId}/plan.md` ? join7(canonDir, plan) : join7(repoRoot, plan);
}
function snapshotForParity(canonDir, repoRoot) {
  const files = walkCanonFiles(canonDir);
  const ids = [];
  const statuses = {};
  const versions = {};
  const rtmEdges = [];
  const planFiles = {};
  for (const file of files) {
    let raw;
    try {
      raw = readFileSync7(file, "utf8");
    } catch {
      continue;
    }
    const type = peekType(raw);
    if (type === "fr" || type === "nfr" || type === "br") {
      const parsed = parsePage(raw, type);
      if ("error" in parsed)
        continue;
      const fm = parsed.frontmatter;
      ids.push(fm.id);
      statuses[fm.id] = fm.status;
      versions[fm.id] = fm.version;
      for (const crId of fm.traces_to ?? [])
        rtmEdges.push({ from: fm.id, to: crId });
    } else if (type === "wp") {
      const info = readWpForSnapshot(file);
      if (!info)
        continue;
      ids.push(info.id);
      if (info.status !== void 0)
        statuses[info.id] = info.status;
      for (const frId of info.frIds)
        rtmEdges.push({ from: frId, to: info.id });
      if (info.plan !== void 0) {
        const planAbs = resolvePlanAbsPath(canonDir, repoRoot, info.id, info.plan);
        try {
          planFiles[info.id] = sha256Hex2(readFileSync7(planAbs, "utf8"));
        } catch {
        }
      }
    } else if (type === "cr") {
      const info = readCrForSnapshot(file);
      if (!info)
        continue;
      ids.push(info.id);
      statuses[info.id] = info.status;
    } else if (type === "epic" || type === "bug") {
      const parsed = parsePage(raw, type);
      if ("error" in parsed)
        continue;
      const fm = parsed.frontmatter;
      ids.push(fm.id);
      statuses[fm.id] = fm.status;
    }
  }
  const dedupedEdges = rtmEdges.filter((edge, i, arr) => arr.findIndex((o) => o.from === edge.from && o.to === edge.to) === i);
  return {
    ids: [...new Set(ids)].sort(naturalCompare),
    statuses,
    versions,
    rtmEdges: dedupedEdges.sort((a, b) => naturalCompare(a.from, b.from) || naturalCompare(a.to, b.to)),
    planFiles,
    counters: readCounters(canonDir)
  };
}
function counterRegressions(oldCounters, newCounters) {
  const out = [];
  const cmp = (key, before, after) => {
    if (after < before)
      out.push(`${key}: ${before} -> ${after}`);
  };
  cmp("product.epic", oldCounters.product.epic, newCounters.product.epic);
  cmp("product.cr", oldCounters.product.cr, newCounters.product.cr);
  cmp("product.wp", oldCounters.product.wp, newCounters.product.wp);
  cmp("product.bug", oldCounters.product.bug, newCounters.product.bug);
  for (const [date, seq] of Object.entries(oldCounters.product.baselineSeq)) {
    cmp(`baselineSeq.${date}`, seq, newCounters.product.baselineSeq[date] ?? 0);
  }
  for (const [epicId, epicCounters] of Object.entries(oldCounters.epics)) {
    const after = newCounters.epics[epicId] ?? { fr: 0, nfr: 0, br: 0 };
    cmp(`epics.${epicId}.fr`, epicCounters.fr, after.fr);
    cmp(`epics.${epicId}.nfr`, epicCounters.nfr, after.nfr);
    cmp(`epics.${epicId}.br`, epicCounters.br, after.br);
  }
  return out;
}
function verifyParityV3(snapshot, canonDir, repoRoot) {
  const graph = loadGraph(canonDir);
  const checks = [];
  const newIds = /* @__PURE__ */ new Set([
    ...graph.epics.map((n) => n.frontmatter.id),
    ...graph.frs.map((n) => n.frontmatter.id),
    ...graph.nfrs.map((n) => n.frontmatter.id),
    ...graph.brs.map((n) => n.frontmatter.id),
    ...graph.crs.map((n) => n.frontmatter.id),
    ...graph.wps.map((n) => n.frontmatter.id),
    ...graph.bugs.map((n) => n.frontmatter.id)
  ]);
  const oldIds = new Set(snapshot.ids);
  const missingIds = [...oldIds].filter((id) => !newIds.has(id)).sort(naturalCompare);
  const extraIds = [...newIds].filter((id) => !oldIds.has(id)).sort(naturalCompare);
  checks.push({
    name: "same-id-set",
    ok: missingIds.length === 0 && extraIds.length === 0,
    reason: missingIds.length === 0 && extraIds.length === 0 ? `all ${oldIds.size} id(s) preserved` : [missingIds.length > 0 ? `missing: ${missingIds.join(", ")}` : "", extraIds.length > 0 ? `extra: ${extraIds.join(", ")}` : ""].filter((s) => s.length > 0).join("; ")
  });
  const newStatusOf = new Map([
    ...graph.epics.map((n) => [n.frontmatter.id, n.frontmatter.status]),
    ...graph.frs.map((n) => [n.frontmatter.id, n.frontmatter.status]),
    ...graph.nfrs.map((n) => [n.frontmatter.id, n.frontmatter.status]),
    ...graph.brs.map((n) => [n.frontmatter.id, n.frontmatter.status]),
    ...graph.crs.map((n) => [n.frontmatter.id, n.frontmatter.status]),
    ...graph.wps.map((n) => [n.frontmatter.id, n.frontmatter.status]),
    ...graph.bugs.map((n) => [n.frontmatter.id, n.frontmatter.status])
  ]);
  const statusViolations = [];
  for (const [id, oldStatus] of Object.entries(snapshot.statuses)) {
    if (!newIds.has(id))
      continue;
    const newStatus = newStatusOf.get(id);
    if (newStatus === void 0 || newStatus === oldStatus)
      continue;
    if (CR_ID.test(id) && oldStatus === "confirmed" && newStatus === "resolved")
      continue;
    statusViolations.push(`${id}: ${oldStatus} -> ${newStatus}`);
  }
  checks.push({
    name: "statuses-preserved",
    ok: statusViolations.length === 0,
    reason: statusViolations.length === 0 ? "every status preserved (or the allowed CR confirmed->resolved)" : statusViolations.join("; ")
  });
  const frNfrBrById = new Map([
    ...graph.frs.map((n) => [n.frontmatter.id, n.frontmatter.version]),
    ...graph.nfrs.map((n) => [n.frontmatter.id, n.frontmatter.version]),
    ...graph.brs.map((n) => [n.frontmatter.id, n.frontmatter.version])
  ]);
  const versionViolations = [];
  for (const [id, oldVersion] of Object.entries(snapshot.versions)) {
    const newVersion = frNfrBrById.get(id);
    if (newVersion === void 0 || newVersion === oldVersion)
      continue;
    versionViolations.push(`${id}: v${oldVersion} -> v${newVersion}`);
  }
  checks.push({
    name: "versions-untouched",
    ok: versionViolations.length === 0,
    reason: versionViolations.length === 0 ? "no FR/NFR/BR version changed" : versionViolations.join("; ")
  });
  const newEdges = /* @__PURE__ */ new Set();
  for (const fr of graph.frs) {
    for (const cr of fr.frontmatter.traces_to)
      newEdges.add(`${fr.frontmatter.id}->${cr}`);
  }
  for (const nfr of graph.nfrs) {
    for (const cr of nfr.frontmatter.traces_to)
      newEdges.add(`${nfr.frontmatter.id}->${cr}`);
  }
  for (const wp of graph.wps) {
    for (const frId of graph.wpDelivers(wp.frontmatter.id))
      newEdges.add(`${frId}->${wp.frontmatter.id}`);
  }
  const droppedEdges = snapshot.rtmEdges.filter((e) => !newEdges.has(`${e.from}->${e.to}`)).map((e) => `${e.from}->${e.to}`);
  checks.push({
    name: "rtm-superset",
    ok: droppedEdges.length === 0,
    reason: droppedEdges.length === 0 ? "every pre-migration FR->CR/WP edge survives" : `dropped: ${droppedEdges.join(", ")}`
  });
  const planViolations = [];
  for (const [wpId, oldHash] of Object.entries(snapshot.planFiles)) {
    const newPath = join7(canonDir, "wp", wpId, "plan.md");
    let content;
    try {
      content = readFileSync7(newPath, "utf8");
    } catch {
      planViolations.push(`${wpId}: plan.md missing at ${newPath}`);
      continue;
    }
    if (sha256Hex2(content) !== oldHash)
      planViolations.push(`${wpId}: plan.md content changed`);
  }
  checks.push({
    name: "plan-content-identical",
    ok: planViolations.length === 0,
    reason: planViolations.length === 0 ? "every migrated plan file is byte-identical to its pre-migration content" : planViolations.join("; ")
  });
  const counterViolations = counterRegressions(snapshot.counters, readCounters(canonDir));
  checks.push({
    name: "counters-monotonic",
    ok: counterViolations.length === 0,
    reason: counterViolations.length === 0 ? "no counter regressed" : counterViolations.join("; ")
  });
  const verdict = checks.every((c) => c.ok) ? "VERIFY-OK" : "VERIFY-FAIL";
  return { verdict, checks };
}

// ../praxis-ba/plugins/ba/canon-graph/dist/cli.js
init_history();
init_parse();
init_reconcile();

// ../praxis-ba/plugins/ba/canon-graph/dist/rules.js
var import_gray_matter4 = __toESM(require_gray_matter(), 1);
init_zod();
init_ac();
import { existsSync as existsSync2, readdirSync as readdirSync6, readFileSync as readFileSync8, statSync as statSync3 } from "node:fs";
import { join as join8 } from "node:path";
var BaRuleFrontmatterSchema = external_exports.object({
  id: external_exports.string().min(1),
  roles: external_exports.array(external_exports.string()).min(1),
  stages: external_exports.array(external_exports.string()).min(1),
  severity: external_exports.enum(["mandatory", "advisory"]).default("mandatory"),
  overridable: external_exports.boolean().default(true),
  title: external_exports.string().optional()
});
function walkMarkdown(root) {
  if (!existsSync2(root))
    return [];
  const out = [];
  const stack = [root];
  while (stack.length) {
    const cur = stack.pop();
    for (const name of readdirSync6(cur)) {
      const p = join8(cur, name);
      const st = statSync3(p);
      if (st.isDirectory())
        stack.push(p);
      else if (name.endsWith(".md"))
        out.push(p);
    }
  }
  return out.sort();
}
function loadBaRules(rulesDir, errors) {
  const rules = [];
  for (const path of walkMarkdown(rulesDir)) {
    const raw = readFileSync8(path, "utf8");
    const parsed = (0, import_gray_matter4.default)(raw);
    const fm = BaRuleFrontmatterSchema.safeParse(parsed.data);
    if (!fm.success) {
      errors?.push(`${path}: invalid frontmatter: ${fm.error.issues.map((i) => i.path.join(".")).join(", ")}`);
      continue;
    }
    rules.push({ path, frontmatter: fm.data, body: parsed.content.trim() });
  }
  return rules;
}
function evaluateBaRules(rules, graph) {
  const byId3 = new Map(rules.map((r) => [r.frontmatter.id, r]));
  const violations = [];
  const acRule = byId3.get("ba-ac-gherkin");
  if (acRule) {
    for (const fr of graph.frs) {
      if (fr.frontmatter.status === "retired" || fr.frontmatter.status === "superseded")
        continue;
      const ac = parseAcBlock(fr.body);
      if (ac.error !== void 0 || ac.acs.length === 0) {
        violations.push({
          ruleId: acRule.frontmatter.id,
          severity: acRule.frontmatter.severity,
          targetId: fr.frontmatter.id,
          message: ac.error ?? "missing Acceptance Criteria"
        });
        continue;
      }
      const bad = unverifiableAcIds(ac.acs);
      if (bad.length > 0) {
        violations.push({
          ruleId: acRule.frontmatter.id,
          severity: acRule.frontmatter.severity,
          targetId: fr.frontmatter.id,
          message: `AC-${bad.join(", AC-")} not in given/when/then (or \u0414\u0430\u043D\u043E/\u041A\u043E\u0433\u0434\u0430/\u0422\u043E\u0433\u0434\u0430) form`
        });
      }
    }
  }
  const goalRule = byId3.get("ba-requirement-has-goal");
  if (goalRule) {
    for (const nodes of [graph.frs, graph.nfrs, graph.brs]) {
      for (const node of nodes) {
        if (node.frontmatter.status === "retired" || node.frontmatter.status === "superseded")
          continue;
        if ((node.frontmatter.goal_ids ?? []).length === 0) {
          violations.push({
            ruleId: goalRule.frontmatter.id,
            severity: goalRule.frontmatter.severity,
            targetId: node.frontmatter.id,
            message: "requirement has no goal_ids"
          });
        }
      }
    }
  }
  return violations;
}

// ../praxis-ba/plugins/ba/canon-graph/dist/cli.js
import { fileURLToPath } from "node:url";

// ../praxis-ba/plugins/ba/canon-graph/dist/handoff.js
import { existsSync as existsSync3, mkdirSync as mkdirSync6, readFileSync as readFileSync9, writeFileSync as writeFileSync5 } from "node:fs";
import { dirname as dirname5, join as join9, relative as relative4 } from "node:path";
function emitBaArchitectHandoff(repo, wpId, outPath) {
  const wpIndex = join9(repo, "wp", wpId, "index.md");
  if (!existsSync3(wpIndex)) {
    throw new Error(`WP index not found: ${wpIndex}`);
  }
  const body = readFileSync9(wpIndex, "utf8");
  const fmMatch = body.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    throw new Error(`WP missing frontmatter: ${wpIndex}`);
  }
  const fm = fmMatch[1];
  const status = (fm.match(/^status:\s*(.+)$/m) ?? [])[1]?.trim();
  if (!status || !["ready", "plan-approved", "accepted"].includes(status)) {
    throw new Error(`WP status not handoff-ready: ${status}`);
  }
  const reqIds = [...body.matchAll(/\[([A-Z0-9]+-FR\d+)(?:\s+v\d+)?\]/g)].map((m) => m[1]);
  const uniqueReqs = [...new Set(reqIds)];
  if (uniqueReqs.length === 0) {
    throw new Error("no requirement ids found in Scope Delivers");
  }
  const visionPath2 = join9(repo, "vision.md");
  const visionConfirmed = existsSync3(visionPath2) && /status:\s*confirmed/.test(readFileSync9(visionPath2, "utf8"));
  const handoff = {
    contract: "ba.architect.handoff",
    version: "0.1.0",
    workPackageId: wpId,
    workPackagePath: relative4(repo, wpIndex).split("\\").join("/"),
    requirementIds: uniqueReqs,
    visionConfirmed,
    readinessChecks: [
      { id: "wp-status", passed: true, detail: status },
      { id: "vision", passed: visionConfirmed },
      {
        id: "requirements-present",
        passed: uniqueReqs.length > 0,
        detail: uniqueReqs.join(",")
      }
    ]
  };
  const out = outPath ?? join9(repo, "wp", wpId, "handoffs", "ba-architect.handoff.json");
  mkdirSync6(dirname5(out), { recursive: true });
  writeFileSync5(out, `${JSON.stringify(handoff, null, 2)}
`);
  return { path: out, handoff };
}

// ../praxis-ba/plugins/ba/canon-graph/dist/semantic-lint.js
init_body_refs();
import { existsSync as existsSync4, readFileSync as readFileSync10 } from "node:fs";
import { dirname as dirname6, join as join10, relative as relative5 } from "node:path";
var COMMITTED_STATUSES = /* @__PURE__ */ new Set([
  "active",
  "batched",
  "baselined",
  "approved"
]);
function loadTaxonomy(repo) {
  for (const candidate of [
    join10(repo, "shared", "taxonomy.md"),
    join10(repo, "..", "shared", "taxonomy.md")
  ]) {
    if (existsSync4(candidate)) {
      const text = readFileSync10(candidate, "utf8");
      return {
        tags: new Set([...text.matchAll(/`([a-z0-9][a-z0-9-]*)`/g)].map((m) => m[1])),
        path: candidate
      };
    }
  }
  return { tags: /* @__PURE__ */ new Set(), path: null };
}
function loadNfrCatalogue(repo) {
  for (const candidate of [
    join10(repo, "shared", "nfr.md"),
    join10(repo, "..", "shared", "nfr.md")
  ]) {
    if (existsSync4(candidate)) {
      return { text: readFileSync10(candidate, "utf8"), path: candidate };
    }
  }
  return { text: "", path: null };
}
function collectDocs(repo, graph) {
  const docs = [];
  const push = (id, type, status, body, epic) => {
    const rel = graph.pathOf(id);
    if (!rel)
      return;
    docs.push({
      id,
      type,
      status,
      epic,
      body,
      absPath: join10(repo, rel),
      relPath: rel
    });
  };
  for (const e of graph.epics) {
    push(e.frontmatter.id, "epic", String(e.frontmatter.status ?? ""), e.body);
  }
  for (const fr of graph.frs) {
    push(fr.frontmatter.id, "fr", String(fr.frontmatter.status ?? ""), fr.body, fr.frontmatter.epic);
  }
  for (const nfr of graph.nfrs) {
    push(nfr.frontmatter.id, "nfr", String(nfr.frontmatter.status ?? ""), nfr.body, nfr.frontmatter.epic);
  }
  for (const br of graph.brs) {
    push(br.frontmatter.id, "br", String(br.frontmatter.status ?? ""), br.body, br.frontmatter.epic);
  }
  for (const cr of graph.crs) {
    push(cr.frontmatter.id, "cr", String(cr.frontmatter.status ?? ""), cr.body);
  }
  for (const wp of graph.wps) {
    push(wp.frontmatter.id, "wp", String(wp.frontmatter.status ?? ""), wp.body);
  }
  return docs;
}
function runSemanticLint(repo, graph) {
  const findings = [];
  const { tags: taxonomy, path: taxonomyPath } = loadTaxonomy(repo);
  const { text: nfrText, path: nfrCataloguePath } = loadNfrCatalogue(repo);
  const epicStatus = /* @__PURE__ */ new Map();
  for (const e of graph.epics) {
    epicStatus.set(e.frontmatter.id, String(e.frontmatter.status ?? "?"));
  }
  const docs = collectDocs(repo, graph);
  for (const doc of docs) {
    const found = [
      ...doc.body.matchAll(/(?<!`)\[NEEDS CLARIFICATION:?\s*([^\]]*)/g)
    ];
    if (found.length > 0) {
      const committed = COMMITTED_STATUSES.has(doc.status);
      let head = committed ? `${doc.id}: status ${doc.status}, but body has ${found.length} \xD7 [NEEDS CLARIFICATION]` : `${doc.id} (${doc.status}): ${found.length} \xD7 [NEEDS CLARIFICATION]`;
      for (const m of found) {
        const q = (m[1] ?? "").replace(/\s+/g, " ").trim();
        const clipped = q.length > 100 ? `${q.slice(0, 100)}\u2026` : q;
        if (clipped)
          head += `
             \u2014 ${clipped}`;
      }
      findings.push({
        check: "needs-clarification-committed",
        severity: committed ? "error" : "warning",
        message: head
      });
    }
    if (nfrCataloguePath) {
      const { catalog } = extractNfrMentions(doc.body);
      for (const ref of catalog) {
        if (!nfrText.includes(ref)) {
          findings.push({
            check: "nfr-catalogue-refs",
            severity: "error",
            message: `${doc.id}: references ${ref}, absent from ${relative5(repo, nfrCataloguePath).split("\\").join("/") || "shared/nfr.md"}`
          });
        }
      }
    }
    const tagLine = doc.body.match(/\*\*Теги\*\*\s*\|\s*(.+?)\s*\|/);
    if (tagLine && taxonomy.size > 0) {
      const raw = tagLine[1];
      if (!raw.includes("shared/taxonomy")) {
        for (const tag of raw.matchAll(/[a-z0-9][a-z0-9-]*/g)) {
          const t = tag[0];
          if (!taxonomy.has(t)) {
            findings.push({
              check: "taxonomy-tags",
              severity: "warning",
              message: `${doc.id}: tag \`${t}\` absent from shared/taxonomy.md`
            });
          }
        }
      }
    }
    if (doc.epic && COMMITTED_STATUSES.has(doc.status) && epicStatus.has(doc.epic)) {
      const ps = epicStatus.get(doc.epic);
      if (ps === "draft" || ps === "in-review") {
        findings.push({
          check: "child-status-vs-epic",
          severity: "error",
          message: `${doc.id}: status ${doc.status}, but epic ${doc.epic} is still ${ps}`
        });
      }
    }
    for (const m of doc.body.matchAll(/\]\((\.\.?\/[^)#]+?\.md)/g)) {
      const target = m[1];
      if (target.includes("{") || target.includes("XXX"))
        continue;
      const abs = join10(dirname6(doc.absPath), target);
      if (!existsSync4(abs)) {
        findings.push({
          check: "markdown-links-resolve-semantic",
          severity: "error",
          message: `${doc.relPath}: broken link ${target}`
        });
      }
    }
  }
  return {
    findings,
    errors: findings.filter((f) => f.severity === "error"),
    warnings: findings.filter((f) => f.severity === "warning"),
    taxonomyPath,
    nfrCataloguePath
  };
}
function semanticLintToChecks(result) {
  const byCheck = /* @__PURE__ */ new Map();
  for (const f of result.findings) {
    const list = byCheck.get(f.check) ?? [];
    list.push(f);
    byCheck.set(f.check, list);
  }
  const names = [
    "needs-clarification-committed",
    "nfr-catalogue-refs",
    "taxonomy-tags",
    "child-status-vs-epic",
    "markdown-links-resolve-semantic"
  ];
  return names.map((name) => {
    const all = byCheck.get(name) ?? [];
    const errors = all.filter((f) => f.severity === "error");
    const warnings = all.filter((f) => f.severity === "warning");
    if (name === "nfr-catalogue-refs" && !result.nfrCataloguePath) {
      return {
        name,
        ok: true,
        reason: "shared/nfr.md not found \u2014 catalogue-ref check skipped",
        severity: "advisory"
      };
    }
    if (name === "taxonomy-tags" && !result.taxonomyPath) {
      return {
        name,
        ok: true,
        reason: "shared/taxonomy.md not found \u2014 taxonomy check skipped",
        severity: "advisory"
      };
    }
    if (errors.length > 0) {
      return {
        name,
        ok: false,
        reason: errors.map((e) => e.message).join("; ")
      };
    }
    if (warnings.length > 0) {
      return {
        name,
        ok: false,
        reason: warnings.map((w) => w.message).join("; "),
        severity: "advisory"
      };
    }
    return {
      name,
      ok: true,
      reason: name === "needs-clarification-committed" ? "no committed artefact carries an open [NEEDS CLARIFICATION]" : name === "nfr-catalogue-refs" ? "every catalogue NFR mention resolves in shared/nfr.md" : name === "taxonomy-tags" ? "every Passport tag is in shared/taxonomy.md" : name === "child-status-vs-epic" ? "no committed child is ahead of its epic status" : "every relative .md link in semantic corpus resolves"
    };
  });
}

// ../praxis-ba/plugins/ba/canon-graph/dist/cli.js
init_schema();
init_scopelinks();
init_serialize();

// ../praxis-ba/plugins/ba/canon-graph/dist/status.js
init_ac();
init_serialize();
function isOpenRequirementStatus2(status) {
  return status !== "retired" && status !== "superseded";
}
function requirementIdsLinkedToWp(graph) {
  const linked = /* @__PURE__ */ new Set();
  for (const wp of graph.wps) {
    if (wp.frontmatter.status === "abandoned")
      continue;
    const scope = graph.wpScope(wp.frontmatter.id);
    for (const ref of [...scope.frs, ...scope.nfrs, ...scope.brs])
      linked.add(ref.id);
    const closure = graph.closure(wp.frontmatter.id);
    for (const id of [...closure.frs, ...closure.nfrs, ...closure.brs])
      linked.add(id);
  }
  return linked;
}
function findMissingItems(graph) {
  const items = [];
  const linkedToWp = requirementIdsLinkedToWp(graph);
  for (const fr of graph.frs) {
    if (!isOpenRequirementStatus2(fr.frontmatter.status))
      continue;
    const ac = parseAcBlock(fr.body);
    if (ac.error !== void 0 || ac.acs.length === 0) {
      items.push({
        kind: "requirement-without-ac",
        id: fr.frontmatter.id,
        detail: ac.error ?? "has no Acceptance Criteria"
      });
    } else {
      const bad = unverifiableAcIds(ac.acs);
      if (bad.length > 0) {
        items.push({
          kind: "requirement-unverifiable-ac",
          id: fr.frontmatter.id,
          detail: `AC-${bad.join(", AC-")} unverifiable (need given/when/then or \u0414\u0430\u043D\u043E/\u041A\u043E\u0433\u0434\u0430/\u0422\u043E\u0433\u0434\u0430)`
        });
      }
    }
  }
  for (const nodes of [graph.frs, graph.nfrs, graph.brs]) {
    for (const node of nodes) {
      if (!isOpenRequirementStatus2(node.frontmatter.status))
        continue;
      if (!linkedToWp.has(node.frontmatter.id)) {
        items.push({
          kind: "requirement-not-linked-to-wp",
          id: node.frontmatter.id,
          detail: "not referenced by any open WP Scope/closure"
        });
      }
    }
  }
  const goals = checkGoals(graph);
  for (const id of goals.requirementsWithoutGoals) {
    items.push({
      kind: "requirement-without-goal",
      id,
      detail: "goal_ids empty or absent"
    });
  }
  for (const id of goals.goalsWithoutRequirements) {
    items.push({
      kind: "goal-without-requirements",
      id,
      detail: "no FR/NFR/BR cites this goal"
    });
  }
  return items.sort((a, b) => naturalCompare(a.kind, b.kind) || naturalCompare(a.id, b.id));
}

// ../praxis-ba/plugins/ba/canon-graph/dist/bug-contract.js
init_schema();
var HEADING = /^(?:\*\*)?(repro|reproduction|воспроизведение|expected|ожидаем(?:ое|ый)?|actual|фактическ(?:ое|ий)?)\s*:?(?:\*\*)?\s*(.*)$/i;
function isCanonRequirementId(id) {
  return FR_ID.test(id) || NFR_ID.test(id) || BR_ID.test(id);
}
function parseBugBody(body) {
  const sections = { repro: "", expected: "", actual: "" };
  const parts = {
    repro: [],
    expected: [],
    actual: []
  };
  let current = "";
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    const m = HEADING.exec(line.replace(/^#+\s+/, ""));
    if (m) {
      const key = (m[1] ?? "").toLowerCase();
      const sectionKey = key.startsWith("repro") || key.startsWith("\u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437") ? "repro" : key.startsWith("expect") || key.startsWith("\u043E\u0436\u0438\u0434\u0430") ? "expected" : "actual";
      current = sectionKey;
      const rest = (m[2] ?? "").replace(/\*+/g, "").trim();
      if (rest)
        parts[sectionKey].push(rest);
      continue;
    }
    if (current !== "" && line && !line.startsWith("<!--"))
      parts[current].push(line);
  }
  const repro = parts.repro.join("\n").trim();
  const expected = parts.expected.join("\n").trim();
  const actual = parts.actual.join("\n").trim();
  if (!repro)
    return { error: "bug body missing Repro steps" };
  if (!expected)
    return { error: "bug body missing Expected behavior" };
  if (!actual)
    return { error: "bug body missing Actual behavior" };
  if (expected === actual) {
    return { error: "Expected and Actual must be distinct" };
  }
  return { repro, expected, actual };
}
function existingRequirementIds(graph) {
  return /* @__PURE__ */ new Set([
    ...graph.frs.map((n) => n.frontmatter.id),
    ...graph.nfrs.map((n) => n.frontmatter.id),
    ...graph.brs.map((n) => n.frontmatter.id)
  ]);
}
function unresolvedAffects(affects, graph) {
  const known = existingRequirementIds(graph);
  const bad = [];
  for (const id of affects) {
    if (!isCanonRequirementId(id) || !known.has(id))
      bad.push(id);
  }
  return bad;
}
function assertBugCapture(input) {
  if (input.affects.length === 0) {
    throw new Error("bug capture: --affects <FR|NFR|BR id> is required");
  }
  const unknown = unresolvedAffects(input.affects, input.graph);
  if (unknown.length) {
    throw new Error(`bug capture: unknown requirement id(s): ${unknown.join(", ")} (must be an existing FR/NFR/BR)`);
  }
  const parsed = parseBugBody(input.body);
  if ("error" in parsed)
    throw new Error(`bug capture: ${parsed.error}`);
  return parsed;
}

// ../praxis-ba/plugins/ba/canon-graph/dist/code-surface-scan.js
import { createHash as createHash4 } from "node:crypto";
import { existsSync as existsSync5, mkdirSync as mkdirSync7, readFileSync as readFileSync11, readdirSync as readdirSync7, statSync as statSync4, writeFileSync as writeFileSync6 } from "node:fs";
import { dirname as dirname7, join as join11, relative as relative6, sep as sep3 } from "node:path";
var SKIP_DIRS = /* @__PURE__ */ new Set(["node_modules", "dist", ".git", "coverage", ".ba"]);
var BACKEND_CALL = /\b(?:app|router|fastify|server)\.(get|post|put|patch|delete|head|options)\s*\(\s*(['"`])([^'"`]+)\2/gi;
var ROUTE_CHAIN = /\.route\s*\(\s*(['"`])([^'"`]+)\1\s*\)\s*\.\s*(get|post|put|patch|delete)/gi;
var FRONT_HANDLER = /\bon(Click|Submit|Change|Input)\s*(?:=|:\s*)\s*(?:\{\s*)?([A-Za-z_$][\w$]*)?/g;
var ADD_LISTENER = /addEventListener\s*\(\s*(['"`])(click|submit|change|input)\1\s*,\s*([A-Za-z_$][\w$]*)?/gi;
function posixRel(root, file) {
  return relative6(root, file).split(sep3).join("/");
}
function fingerprint(kind, label, file, snippet) {
  const h = createHash4("sha256").update(snippet.trim()).digest("hex").slice(0, 12);
  return `${kind}|${label}|${file}|${h}`;
}
function isCommentLine(line) {
  const t = line.trim();
  return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || t.startsWith("#");
}
function walkFiles(root) {
  if (!existsSync5(root))
    return [];
  const out = [];
  const stack = [root];
  while (stack.length) {
    const cur = stack.pop();
    let entries;
    try {
      entries = readdirSync7(cur);
    } catch {
      continue;
    }
    for (const name of entries) {
      if (SKIP_DIRS.has(name))
        continue;
      const p = join11(cur, name);
      let st;
      try {
        st = statSync4(p);
      } catch {
        continue;
      }
      if (st.isDirectory())
        stack.push(p);
      else if (/\.(js|jsx|ts|tsx|mjs|cjs)$/.test(name))
        out.push(p);
    }
  }
  return out.sort();
}
function scanFile(root, file) {
  const rel = posixRel(root, file);
  let text;
  try {
    text = readFileSync11(file, "utf8");
  } catch {
    return [];
  }
  const ops = [];
  const seen = /* @__PURE__ */ new Set();
  const lines = text.split(/\r?\n/);
  const push = (kind, label, line, snippet) => {
    const fp = fingerprint(kind, label, rel, snippet);
    if (seen.has(fp))
      return;
    seen.add(fp);
    ops.push({ kind, label, file: rel, line, fingerprint: fp });
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === void 0 || isCommentLine(line))
      continue;
    const lineNo = i + 1;
    BACKEND_CALL.lastIndex = 0;
    let m;
    while (m = BACKEND_CALL.exec(line)) {
      const method = m[1];
      const path = m[3];
      if (!method || !path)
        continue;
      push("backend", `${method.toUpperCase()} ${path}`, lineNo, line);
    }
    ROUTE_CHAIN.lastIndex = 0;
    while (m = ROUTE_CHAIN.exec(line)) {
      const path = m[2];
      const method = m[3];
      if (!method || !path)
        continue;
      push("backend", `${method.toUpperCase()} ${path}`, lineNo, line);
    }
    FRONT_HANDLER.lastIndex = 0;
    while (m = FRONT_HANDLER.exec(line)) {
      const evt = m[1];
      if (!evt)
        continue;
      const name = m[2] ? ` ${m[2]}` : "";
      push("frontend", `on${evt}${name}`.trim(), lineNo, line);
    }
    ADD_LISTENER.lastIndex = 0;
    while (m = ADD_LISTENER.exec(line)) {
      const evt = m[2];
      if (!evt)
        continue;
      const name = m[3] ? ` ${m[3]}` : "";
      push("frontend", `on${evt[0]?.toUpperCase() ?? ""}${evt.slice(1)}${name}`.trim(), lineNo, line);
    }
  }
  return ops;
}
function loadSurfaceState(path) {
  if (!existsSync5(path))
    return { accepted: [] };
  try {
    const raw = JSON.parse(readFileSync11(path, "utf8"));
    return { accepted: Array.isArray(raw.accepted) ? raw.accepted : [] };
  } catch {
    return { accepted: [] };
  }
}
function saveSurfaceState(path, state) {
  mkdirSync7(dirname7(path), { recursive: true });
  writeFileSync6(path, JSON.stringify(state, null, 2) + "\n");
}
function formatSurfaceReport(report, incremental) {
  const ops = incremental ? report.newOrChanged : report.operations;
  const backend = ops.filter((o) => o.kind === "backend");
  const frontend = ops.filter((o) => o.kind === "frontend");
  const lines = ["### Backend"];
  if (backend.length === 0)
    lines.push("(none)");
  for (const o of backend)
    lines.push(`${o.label} -> ${o.file}:${o.line}`);
  lines.push("", "### Frontend");
  if (frontend.length === 0)
    lines.push("(none)");
  for (const o of frontend)
    lines.push(`${o.label} -> ${o.file}:${o.line}`);
  lines.push("", "### \u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E / \u043D\u0435\u0447\u0438\u0442\u0430\u0435\u043C\u043E");
  if (report.warnings.length === 0)
    lines.push("(none)");
  for (const w of report.warnings)
    lines.push(`\u26A0\uFE0F ${w.message}`);
  return `${lines.join("\n")}
`;
}
function scanCodeSurface(opts) {
  const root = opts.root;
  const warnings = [];
  const files = [];
  if (opts.anchors?.length) {
    for (const a of opts.anchors) {
      const p = a.startsWith("/") ? a : join11(root, a);
      if (!existsSync5(p)) {
        warnings.push({ path: a, message: `\u044F\u043A\u043E\u0440\u044C ${a} \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D` });
        continue;
      }
      const st = statSync4(p);
      if (st.isDirectory())
        files.push(...walkFiles(p));
      else
        files.push(p);
    }
  } else {
    files.push(...walkFiles(root));
  }
  const operations = [];
  const seen = /* @__PURE__ */ new Set();
  for (const file of files) {
    for (const op of scanFile(root, file)) {
      if (seen.has(op.fingerprint))
        continue;
      seen.add(op.fingerprint);
      operations.push(op);
    }
  }
  operations.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.label.localeCompare(b.label));
  const state = opts.statePath ? loadSurfaceState(opts.statePath) : { accepted: [] };
  const accepted = new Set(state.accepted.map((x) => x.fingerprint));
  const meanings = (opts.knownMeanings ?? []).map((s) => s.toLowerCase());
  const newOrChanged = operations.filter((op) => {
    if (accepted.has(op.fingerprint))
      return false;
    if (meanings.length) {
      if (meanings.some((m) => m.includes(op.label.toLowerCase()) || m.includes(`${op.file}:${op.line}`))) {
        return false;
      }
    }
    return true;
  });
  if (opts.accept && opts.statePath) {
    const next = new Map(state.accepted.map((a) => [a.fingerprint, a]));
    for (const op of operations)
      next.set(op.fingerprint, { fingerprint: op.fingerprint });
    saveSurfaceState(opts.statePath, { accepted: [...next.values()] });
  }
  return { operations, warnings, newOrChanged };
}

// ../praxis-ba/plugins/ba/canon-graph/dist/onboard-context.js
init_parse();
init_writer();
import { existsSync as existsSync6, mkdirSync as mkdirSync8, readFileSync as readFileSync12, writeFileSync as writeFileSync7 } from "node:fs";
import { dirname as dirname8, join as join12 } from "node:path";
var ONBOARD_CONTEXT_FILES = [
  { rel: "shared/data-model.md", template: "data-model.md", marker: /data model|сущност/i },
  { rel: "shared/integrations.md", template: "integrations.md", marker: /integrat|интеграц/i },
  { rel: "shared/rbac.md", template: "rbac.md", marker: /rbac|ролев/i },
  { rel: "shared/nfr.md", template: "nfr-catalog.md", marker: /nfr|нфр/i },
  { rel: "glossary.md", template: "glossary.md", marker: /glossary|глоссар|термин/i },
  { rel: "as-is.md", template: "as-is.md", marker: /as-is|as is|текущ/i },
  { rel: "project.md", template: "project.md", marker: /проект|product|суть/i }
];
function checkOnboardContext(projectRoot) {
  const present = [];
  const missing = [];
  const headingGaps = [];
  for (const f of ONBOARD_CONTEXT_FILES) {
    const path = join12(projectRoot, f.rel);
    if (!existsSync6(path)) {
      missing.push(f.rel);
      continue;
    }
    present.push(f.rel);
    const text = readFileSync12(path, "utf8");
    if (!f.marker.test(text))
      headingGaps.push(f.rel);
  }
  return { present, missing, headingGaps, protected: [] };
}
function initOnboardContext(opts) {
  const created = [];
  const skipped = [];
  const protectedPaths = [];
  if (opts.canonDir) {
    const visionPath2 = join12(opts.canonDir, "vision.md");
    if (existsSync6(visionPath2)) {
      const parsed = parseFile(visionPath2, "vision");
      if (!("error" in parsed) && parsed.frontmatter.status === "confirmed") {
        protectedPaths.push("vision.md");
      }
    }
    const graph = loadGraph(opts.canonDir);
    for (const n of [...graph.frs, ...graph.nfrs, ...graph.brs]) {
      if (n.frontmatter.status === "baselined") {
        protectedPaths.push(n.frontmatter.id);
      }
    }
  }
  for (const f of ONBOARD_CONTEXT_FILES) {
    const dest = join12(opts.projectRoot, f.rel);
    if (existsSync6(dest)) {
      skipped.push(f.rel);
      continue;
    }
    const src = join12(opts.templatesDir, f.template);
    if (!existsSync6(src)) {
      skipped.push(f.rel);
      continue;
    }
    mkdirSync8(dirname8(dest), { recursive: true });
    writeFileSync7(dest, readFileSync12(src, "utf8"));
    created.push(f.rel);
  }
  return { created, skipped, protected: protectedPaths };
}
function knownCanonMeanings(canonDir) {
  if (!existsSync6(canonDir))
    return [];
  const graph = loadGraph(canonDir);
  const out = [];
  for (const n of [...graph.crs, ...graph.frs, ...graph.nfrs, ...graph.brs]) {
    out.push(`${n.frontmatter.id}
${n.body}`);
  }
  return out;
}

// ../praxis-ba/plugins/ba/canon-graph/dist/cli.js
init_writer();
async function runCli(argv2, opts = {}) {
  try {
    const { values, positionals } = parseArgs({
      args: [...argv2],
      options: OPTIONS,
      allowPositionals: true,
      strict: true
    });
    const repo = opts.repo ?? asString(values.repo);
    if (!repo)
      throw new Error("praxis-ba: --repo <dir> is required");
    const cmd = positionals[0];
    if (!cmd)
      throw new Error("praxis-ba: no command given");
    const sub = positionals[1];
    const verb = TWO_WORD_COMMANDS.has(cmd) && sub ? `${cmd} ${sub}` : cmd;
    return await dispatch(verb, repo, values, positionals);
  } catch (err) {
    return {
      code: 1,
      json: { verdict: "VERIFY-FAIL", checks: [{ name: "error", ok: false, reason: message(err) }] }
    };
  }
}
var TWO_WORD_COMMANDS = /* @__PURE__ */ new Set(["vision", "cr", "epic", "req", "wp", "bug", "id", "goals"]);
var OPTIONS = {
  repo: { type: "string" },
  json: { type: "boolean", default: false },
  "body-file": { type: "string" },
  check: { type: "boolean", default: false },
  title: { type: "string" },
  req: { type: "string" },
  cr: { type: "string" },
  activate: { type: "boolean", default: false },
  wp: { type: "string" },
  plan: { type: "string" },
  evidence: { type: "string" },
  date: { type: "string" },
  affects: { type: "string" },
  severity: { type: "string" },
  status: { type: "string" },
  "spawn-cr": { type: "boolean", default: false },
  scope: { type: "string" },
  what: { type: "string" },
  entry: { type: "string" },
  "impacts-file": { type: "string" },
  spawn: { type: "string" },
  id: { type: "string" },
  by: { type: "string" },
  "head-commit": { type: "string" },
  reporter: { type: "string" },
  bug: { type: "string" },
  out: { type: "string" },
  rules: { type: "string" },
  verify: { type: "boolean", default: false },
  backfill: { type: "string" },
  "repo-root": { type: "string" },
  root: { type: "string" },
  anchors: { type: "string" },
  state: { type: "string" },
  incremental: { type: "boolean", default: false },
  "accept-scan": { type: "boolean", default: false },
  templates: { type: "string" },
  init: { type: "boolean", default: false },
  project: { type: "string" },
  canon: { type: "string" },
  "dry-run": { type: "boolean", default: false },
  product: { type: "string" },
  epic: { type: "string" }
};
function asString(v) {
  return typeof v === "string" ? v : void 0;
}
function requireFlag(v, msg) {
  const s = asString(v);
  if (!s)
    throw new Error(msg);
  return s;
}
function splitCsv(v) {
  const s = asString(v);
  return s ? s.split(",").map((x) => x.trim()).filter((x) => x.length > 0) : [];
}
function message(err) {
  return err instanceof Error ? err.message : String(err);
}
function todayDate() {
  const d = /* @__PURE__ */ new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}
function currentUser() {
  try {
    return userInfo().username;
  } catch {
    return "unknown";
  }
}
function gitHeadCommit(repo) {
  try {
    return execSync("git rev-parse HEAD", { cwd: repo, encoding: "utf8" }).trim();
  } catch {
    throw new Error("praxis-ba accept: --head-commit was not given and `git rev-parse HEAD` failed under --repo; pass --head-commit explicitly");
  }
}
function toResult(checks, extra = {}) {
  const hardFail = checks.some((c) => !c.ok && c.severity !== "advisory");
  const advisoryFail = checks.some((c) => !c.ok && c.severity === "advisory");
  const verdict = hardFail ? "VERIFY-FAIL" : "VERIFY-OK";
  const code2 = hardFail ? 1 : advisoryFail ? 2 : 0;
  const cleanChecks = checks.map(({ name, ok: ok2, reason }) => ({ name, ok: ok2, reason }));
  const json2 = { verdict, checks: cleanChecks };
  if (extra.id)
    json2.id = extra.id;
  if (extra.path)
    json2.path = extra.path;
  if (extra.handoffPath)
    json2.handoffPath = extra.handoffPath;
  return { code: code2, json: json2 };
}
function ok(name, reason, extra = {}) {
  return toResult([{ name, ok: true, reason }], extra);
}
function bugPath(repo, id) {
  return join13(repo, "bugs", `${id}.md`);
}
function setWpFrontmatter(repo, wpId, patch) {
  const path = wpPath(repo, wpId);
  const parsed = parseFile(path, "wp");
  if ("error" in parsed)
    throw new Error(`praxis-ba: cannot read WP ${wpId} at ${path}: ${parsed.error}`);
  const fm = parsed.frontmatter;
  const nextFm = { ...fm, ...patch };
  atomicWrite(path, emitPage("wp", nextFm, parsed.body));
  return { path };
}
function statusOfMember(graph, id) {
  return graph.frs.find((n) => n.frontmatter.id === id)?.frontmatter.status ?? graph.nfrs.find((n) => n.frontmatter.id === id)?.frontmatter.status ?? graph.brs.find((n) => n.frontmatter.id === id)?.frontmatter.status;
}
function isVisionConfirmed(repo) {
  const parsed = parseFile(join13(repo, "vision.md"), "vision");
  if ("error" in parsed)
    return false;
  return parsed.frontmatter.status === "confirmed";
}
function resolveLinkRoot2(repo) {
  return readCanonConfig(repo)?.link_root ?? basename2(resolve2(repo));
}
var NEEDS_CANON = /* @__PURE__ */ new Set([
  "vision confirm",
  "cr confirm",
  "cr realize",
  "epic add",
  "req edit",
  "req retire",
  "wp prepare",
  "wp approve-plan",
  "wp abandon",
  "accept",
  "bug capture",
  "bug resolve",
  "id next",
  "status",
  "goals status",
  "check-goals",
  "one-pager",
  "render",
  "export",
  "validate"
]);
function assertCanonRoot(repo) {
  const hint = `run praxis-ba init --repo ${repo}`;
  let baIsDir = false;
  try {
    baIsDir = statSync5(join13(repo, ".ba")).isDirectory();
  } catch {
    baIsDir = false;
  }
  if (!baIsDir)
    throw new Error(`no canon here: ${hint}`);
  if (!existsSync7(join13(repo, ".ba", "counters.yaml"))) {
    throw new Error(`no canon here (.ba/counters.yaml is missing): ${hint}`);
  }
}
async function dispatch(verb, repo, values, positionals) {
  if (NEEDS_CANON.has(verb))
    assertCanonRoot(repo);
  switch (verb) {
    case "init": {
      const r = await initCanon(repo, {
        dryRun: values["dry-run"] === true,
        product: asString(values.product),
        epic: asString(values.epic)
      });
      const verbPhrase = r.dryRun ? "would create" : "created";
      const checks = [
        {
          name: r.dryRun ? "init-dry-run" : "init",
          ok: true,
          reason: `${verbPhrase} ${r.created.length} path(s), ${r.skipped.length} already present, in ${r.repo}${r.dryRun ? " (nothing written)" : ""}`
        },
        ...r.created.map((p) => ({ name: r.dryRun ? "would-create" : "created", ok: true, reason: p })),
        ...r.skipped.map((p) => ({ name: "skipped", ok: true, reason: `${p} (already exists, left untouched)` })),
        ...r.notes.map((n) => ({ name: "note", ok: true, reason: n })),
        ...r.next.map((n) => ({ name: "next", ok: true, reason: n }))
      ];
      const res = toResult(checks, { ...r.epic ? { id: r.epic.id, path: join13(r.repo, r.epic.path) } : {} });
      res.json.created = r.created;
      res.json.skipped = r.skipped;
      res.json.dryRun = r.dryRun;
      res.json.next = r.next;
      return res;
    }
    case "vision confirm": {
      const by = asString(values.by) ?? currentUser();
      const date = asString(values.date) ?? todayDate();
      const { path } = await setVisionConfirmed(repo, by, date);
      return ok("vision-confirm", `vision confirmed by ${by} on ${date}`, { path });
    }
    case "cr confirm": {
      const crId = requireFlag(values.cr, "cr confirm: --cr <id> is required");
      const entry = requireFlag(values.entry, "cr confirm: --entry <level> is required");
      if (entry !== "vision" && entry !== "requirement") {
        throw new Error(`cr confirm: --entry must be vision|requirement, got '${entry}'`);
      }
      const impactsFile = asString(values["impacts-file"]);
      let impacts;
      if (impactsFile !== void 0) {
        const raw = JSON.parse(readFileSync13(impactsFile, "utf8"));
        impacts = external_exports.array(crImpactSchema).parse(raw);
      }
      const { path } = await confirmCr(repo, { crId, entry, impacts });
      return ok("cr-confirm", `${crId} confirmed (entry: ${entry})`, { id: crId, path });
    }
    case "cr realize": {
      const crId = requireFlag(values.cr, "cr realize: --cr <id> is required");
      const spawnSpec = requireFlag(values.spawn, "cr realize: --spawn <E#>:<fr|nfr|br> is required");
      const newId = requireFlag(values.id, "cr realize: --id <new-id> is required");
      const m = /^(E\d+):(fr|nfr|br)$/.exec(spawnSpec);
      if (!m) {
        throw new Error(`cr realize: --spawn must look like <epic>:<fr|nfr|br> (e.g. E2:fr), got '${spawnSpec}'`);
      }
      const epic = m[1];
      const type = m[2];
      const { path } = await realizeCrSpawn(repo, { crId, epic, type, newId });
      return ok("cr-realize", `${crId} realized its '${type}' spawn under ${epic} as ${newId}`, { id: crId, path });
    }
    case "epic add": {
      const title = requireFlag(values.title, "epic add: --title <t> is required");
      const { id } = await addEpic(repo, title);
      return ok("epic-add", `minted ${id}`, { id });
    }
    case "req edit": {
      const id = requireFlag(values.req, "req edit: --req <id> is required");
      const bodyFile = requireFlag(values["body-file"], "req edit: --body-file <path> is required");
      const body = readFileSync13(bodyFile, "utf8");
      const cr = asString(values.cr);
      const activate = values.activate === true;
      const date = asString(values.date) ?? todayDate();
      const { path, bumped } = await editRequirement(repo, { id, body, cr, activate, date });
      return ok("req-edit", `updated ${id}${bumped ? " (version bumped)" : ""}`, { id, path });
    }
    case "req retire": {
      const id = requireFlag(values.req, "req retire: --req <id> is required");
      const { path } = await retireRequirement(repo, id);
      const graph = loadGraph(repo);
      const backlinks = graph.backlinks(id);
      const checks = [{ name: "req-retire", ok: true, reason: `retired ${id}` }];
      checks.push(backlinks.length === 0 ? { name: "dangling-backlinks", ok: true, reason: "no other page references the retired id" } : {
        name: "dangling-backlinks",
        ok: false,
        reason: `${id} is retired but still referenced by ${backlinks.join(", ")}`,
        severity: "advisory"
      });
      return toResult(checks, { id, path });
    }
    case "wp prepare":
      return wpPrepare(repo, requireFlag(values.wp, "wp prepare: --wp <id> is required"));
    case "wp approve-plan": {
      const wpId = requireFlag(values.wp, "wp approve-plan: --wp <id> is required");
      const plan = requireFlag(values.plan, "wp approve-plan: --plan <path> is required");
      const expectedPlan = `wp/${wpId}/plan.md`;
      if (plan !== expectedPlan) {
        throw new Error(`wp approve-plan: --plan must be the canon-relative path '${expectedPlan}', got '${plan}'`);
      }
      const planAbsPath = join13(repo, plan);
      if (!existsSync7(planAbsPath)) {
        return toResult([{ name: "plan-exists", ok: false, reason: `${planAbsPath} does not exist` }], { id: wpId });
      }
      const path = wpPath(repo, wpId);
      const parsed = parseFile(path, "wp");
      if ("error" in parsed)
        throw new Error(`wp approve-plan: cannot read ${wpId}: ${parsed.error}`);
      const fm = parsed.frontmatter;
      if (fm.status !== "ready") {
        throw new Error(`wp approve-plan: ${wpId} status is '${String(fm.status)}', expected 'ready'`);
      }
      const validation = await validate(repo, false);
      if (validation.json.verdict !== "VERIFY-OK") {
        return {
          code: 1,
          json: {
            id: wpId,
            verdict: "VERIFY-FAIL",
            checks: [
              {
                name: "pre-approve-validate",
                ok: false,
                reason: "wp approve-plan blocked: praxis-ba validate must PASS before plan-approved"
              },
              ...validation.json.checks
            ]
          }
        };
      }
      setWpFrontmatter(repo, wpId, { status: "plan-approved", plan });
      const { path: handoffPath } = emitBaArchitectHandoff(repo, wpId);
      return ok("wp-approve-plan", `${wpId} is plan-approved (plan: ${plan}); ba.architect.handoff emitted`, { id: wpId, path, handoffPath });
    }
    case "wp abandon":
      return wpAbandon(repo, requireFlag(values.wp, "wp abandon: --wp <id> is required"));
    case "accept": {
      const wpId = requireFlag(values.wp, "accept: --wp <id> is required");
      const evidencePath = requireFlag(values.evidence, "accept: --evidence <path> is required");
      const date = asString(values.date) ?? todayDate();
      const evidence = verifyEvidenceSchema.parse(JSON.parse(readFileSync13(evidencePath, "utf8")));
      const headCommit = asString(values["head-commit"]) ?? gitHeadCommit(repo);
      const verdict = await accept(repo, wpId, evidence, date, headCommit);
      const code2 = verdict.verdict === "VERIFY-OK" ? 0 : 1;
      return { code: code2, json: { id: wpId, verdict: verdict.verdict, checks: verdict.checks } };
    }
    case "bug capture": {
      const affects = splitCsv(values.affects);
      if (affects.length === 0)
        throw new Error("bug capture: --affects <id> is required");
      const severity = requireFlag(values.severity, "bug capture: --severity <s> is required");
      const bodyFile = requireFlag(values["body-file"], "bug capture: --body-file <path> is required");
      const body = readFileSync13(bodyFile, "utf8");
      const graph = loadGraph(repo);
      assertBugCapture({ body, affects, graph });
      const date = asString(values.date) ?? todayDate();
      const reporter = asString(values.reporter) ?? currentUser();
      const id = await allocateId(repo, { kind: "bug" });
      const path = bugPath(repo, id);
      const frontmatter = { id, type: "bug", status: "open", severity, affects, reported: date, reporter };
      atomicWrite(path, emitPage("bug", frontmatter, body));
      return ok("bug-capture", `minted ${id} (status: open)`, { id, path });
    }
    case "code-surface-scan": {
      const root = asString(values.root) ?? asString(values["repo-root"]) ?? repo;
      const anchors = splitCsv(values.anchors);
      const statePath = asString(values.state) ?? join13(root, ".ba", "code-surface-state.json");
      const incremental = values.incremental === true;
      const acceptScan = values["accept-scan"] === true;
      const canon = asString(values.canon);
      const report = scanCodeSurface({
        root,
        anchors: anchors.length ? anchors : void 0,
        statePath,
        incremental,
        accept: acceptScan,
        knownMeanings: canon ? knownCanonMeanings(canon) : void 0
      });
      const md = formatSurfaceReport(report, incremental);
      const result = ok("code-surface-scan", md, { path: statePath });
      result.json.surface = incremental ? report.newOrChanged : report.operations;
      result.json.warnings = report.warnings;
      return result;
    }
    case "onboard-context": {
      const projectRoot = asString(values.project) ?? asString(values.root) ?? repo;
      if (values.init === true) {
        const templatesDir = requireFlag(values.templates, "onboard-context --init: --templates <dir> is required");
        const result = initOnboardContext({
          projectRoot,
          templatesDir,
          canonDir: asString(values.canon)
        });
        return ok("onboard-context", `created ${result.created.length}; skipped existing ${result.skipped.length}; protected ${result.protected.join(", ") || "none"}`, { path: projectRoot });
      }
      const check = checkOnboardContext(projectRoot);
      const okAll = check.missing.length === 0 && check.headingGaps.length === 0;
      return toResult([
        {
          name: "onboard-context",
          ok: okAll,
          reason: okAll ? `context layer present: ${check.present.join(", ")}` : `missing: ${check.missing.join(", ") || "none"}; heading gaps: ${check.headingGaps.join(", ") || "none"}`
        }
      ], { path: projectRoot });
    }
    case "bug resolve":
      return bugResolve(repo, values);
    case "id next":
      return idNext(repo, requireFlag(values.scope, "id next: --scope <spec> is required"), asString(values.date));
    case "status":
      return statusSummary(repo);
    case "goals status":
    case "check-goals":
      return goalsStatus(repo);
    case "one-pager": {
      const id = requireFlag(values.id, "one-pager: --id <FR-id> is required");
      const outPath = asString(values.out);
      const result = writeOnePager(repo, id, outPath);
      if (!result.ok)
        throw new Error(result.error);
      return ok("one-pager", `OK wrote ${result.outPath}`, { id, path: result.outPath });
    }
    case "rules-lint":
      return rulesLint(repo, asString(values.rules));
    case "render":
    case "export":
      return renderView(repo, asString(values.what));
    case "migrate": {
      const outDir = requireFlag(values.out, "migrate: --out <dir> is required");
      if (values.verify === true) {
        const verdict = verifyParity(repo, outDir);
        const code2 = verdict.verdict === "VERIFY-OK" ? 0 : 1;
        return { code: code2, json: { verdict: verdict.verdict, checks: verdict.checks } };
      }
      const { written } = migrate(repo, outDir);
      return ok("migrate", `wrote ${written.length} file(s) under ${outDir}`, { path: outDir });
    }
    case "migrate-v3": {
      const repoRoot = asString(values["repo-root"]) ?? resolve2(repo, "..");
      if (values.verify === true) {
        const snapshotPath = join13(repo, ".ba", "cache", "migrate-v3-snapshot.json");
        const snapshot = paritySnapshotSchema.parse(JSON.parse(readFileSync13(snapshotPath, "utf8")));
        const verdict = verifyParityV3(snapshot, repo, repoRoot);
        const code2 = verdict.verdict === "VERIFY-OK" ? 0 : 1;
        return { code: code2, json: { verdict: verdict.verdict, checks: verdict.checks } };
      }
      const backfillPath = requireFlag(values.backfill, "migrate-v3: --backfill <path> is required");
      const backfill = backfillMapSchema.parse(JSON.parse(readFileSync13(backfillPath, "utf8")));
      const date = asString(values.date) ?? todayDate();
      const { written, moved, advisories } = migrateV3(repo, repoRoot, backfill, date);
      const checks = [
        { name: "migrate-v3", ok: true, reason: `wrote ${written.length} file(s), moved ${moved.length} file(s)` }
      ];
      if (advisories.length > 0) {
        checks.push({ name: "migrate-v3-advisories", ok: false, reason: advisories.join("; "), severity: "advisory" });
      }
      return toResult(checks, { path: repo });
    }
    case "validate":
      return validate(repo, values.check === true);
    case "fmt":
      return fmtCommand(repo, positionals.slice(1), values.check === true);
    case "baseline":
      throw new Error("praxis-ba: there is no standalone 'baseline' verb \u2014 only 'accept' writes baselines");
    default:
      throw new Error(`praxis-ba: unknown command '${verb}'`);
  }
}
async function wpPrepare(repo, wpId) {
  const graph = loadGraph(repo);
  const wp = graph.wps.find((w) => w.frontmatter.id === wpId);
  if (!wp || graph.wpDelivers(wpId).length === 0) {
    return toResult([
      { name: "wp-resolves", ok: false, reason: `${wpId}: WP not found or its Scope lists no Delivers FR (empty closure)` }
    ], { id: wpId });
  }
  const verdict = definitionOfReady(graph, wpId, isVisionConfirmed(repo), { linkRoot: resolveLinkRoot2(repo) });
  if (verdict.verdict === "VERIFY-FAIL") {
    return { code: 1, json: { id: wpId, verdict: verdict.verdict, checks: verdict.checks } };
  }
  const closure = graph.closure(wpId);
  const memberIds = [.../* @__PURE__ */ new Set([...closure.frs, ...closure.nfrs, ...closure.brs])];
  for (const id of memberIds) {
    const status = statusOfMember(graph, id);
    if (status === "draft" || status === "active")
      await setStatus(repo, id, "batched");
  }
  setWpFrontmatter(repo, wpId, { status: "ready" });
  return { code: 0, json: { id: wpId, verdict: verdict.verdict, checks: verdict.checks } };
}
async function wpAbandon(repo, wpId) {
  const graph = loadGraph(repo);
  const wp = graph.wps.find((w) => w.frontmatter.id === wpId);
  if (!wp)
    return toResult([{ name: "wp-resolves", ok: false, reason: `${wpId}: WP not found` }], { id: wpId });
  const closure = graph.closure(wpId);
  const memberIds = [.../* @__PURE__ */ new Set([...closure.frs, ...closure.nfrs, ...closure.brs])];
  for (const id of memberIds) {
    if (statusOfMember(graph, id) === "batched")
      await setStatus(repo, id, "active");
  }
  setWpFrontmatter(repo, wpId, { status: "abandoned" });
  return ok("wp-abandon", `${wpId} abandoned; batched members reverted to active`, { id: wpId });
}
async function bugResolve(repo, values) {
  const id = requireFlag(values.bug, "bug resolve: --bug <id> is required");
  const status = requireFlag(values.status, "bug resolve: --status fixed|wontfix|duplicate is required");
  if (status !== "fixed" && status !== "wontfix" && status !== "duplicate") {
    throw new Error(`bug resolve: --status must be fixed|wontfix|duplicate, got '${status}'`);
  }
  const path = bugPath(repo, id);
  const parsed = parseFile(path, "bug");
  if ("error" in parsed)
    throw new Error(`bug resolve: cannot read ${id}: ${parsed.error}`);
  const fm = parsed.frontmatter;
  const nextFm = { ...fm, status };
  let spawnedCr;
  if (values["spawn-cr"] === true) {
    spawnedCr = await allocateId(repo, { kind: "cr" });
    atomicWrite(crPath(repo, spawnedCr), emitPage("cr", { id: spawnedCr, type: "cr", status: "captured" }, `Spawned from ${id}.
`));
    nextFm.spawned_cr = spawnedCr;
  }
  atomicWrite(path, emitPage("bug", nextFm, parsed.body));
  return ok("bug-resolve", `${id} -> ${status}${spawnedCr ? ` (spawned ${spawnedCr})` : ""}`, { id, path });
}
async function idNext(repo, scopeSpec, date) {
  const [kind, epic] = scopeSpec.split(":");
  let id;
  switch (kind) {
    case "epic":
    case "cr":
    case "bug":
      id = await allocateId(repo, { kind });
      break;
    case "wp": {
      if (date === void 0)
        throw new Error("id next: scope 'wp' requires --date <YYYYMMDD>");
      id = await allocateId(repo, { kind: "wp" }, date);
      break;
    }
    case "fr":
    case "nfr":
    case "br": {
      if (!epic)
        throw new Error(`id next: scope '${kind}' requires an epic, e.g. --scope ${kind}:E1`);
      id = await allocateId(repo, { kind, epic });
      break;
    }
    default:
      throw new Error(`id next: unrecognized scope '${scopeSpec}'`);
  }
  return ok("id-next", id);
}
function statusSummary(repo) {
  const graph = loadGraph(repo);
  const countBy = (nodes) => {
    const m = /* @__PURE__ */ new Map();
    for (const n of nodes)
      m.set(n.frontmatter.status, (m.get(n.frontmatter.status) ?? 0) + 1);
    return [...m.entries()].map(([s, c]) => `${s}:${c}`).join(", ") || "none";
  };
  const missing = findMissingItems(graph);
  const byKind = /* @__PURE__ */ new Map();
  for (const item of missing) {
    const list = byKind.get(item.kind) ?? [];
    list.push(`${item.id}: ${item.detail}`);
    byKind.set(item.kind, list);
  }
  const checks = [
    { name: "epics", ok: true, reason: `${graph.epics.length} epic(s)` },
    { name: "frs", ok: true, reason: countBy(graph.frs) },
    { name: "nfrs", ok: true, reason: countBy(graph.nfrs) },
    { name: "brs", ok: true, reason: countBy(graph.brs) },
    { name: "crs", ok: true, reason: countBy(graph.crs) },
    { name: "wps", ok: true, reason: countBy(graph.wps) },
    { name: "bugs", ok: true, reason: countBy(graph.bugs) },
    { name: "goals", ok: true, reason: countBy(graph.goals) }
  ];
  const missingKinds = [
    "requirement-without-ac",
    "requirement-unverifiable-ac",
    "requirement-not-linked-to-wp",
    "requirement-without-goal",
    "goal-without-requirements"
  ];
  for (const kind of missingKinds) {
    const list = byKind.get(kind) ?? [];
    checks.push({
      name: `missing:${kind}`,
      ok: list.length === 0,
      reason: list.length === 0 ? "none" : list.join("; "),
      severity: "advisory"
    });
  }
  return toResult(checks);
}
function goalsStatus(repo) {
  const graph = loadGraph(repo);
  const result = checkGoals(graph);
  const checks = [
    {
      name: "requirements-without-goals",
      ok: result.requirementsWithoutGoals.length === 0,
      reason: result.requirementsWithoutGoals.length === 0 ? "every open requirement cites at least one goal" : result.requirementsWithoutGoals.join(", "),
      severity: "advisory"
    },
    {
      name: "goals-without-requirements",
      ok: result.goalsWithoutRequirements.length === 0,
      reason: result.goalsWithoutRequirements.length === 0 ? "every open goal is cited by at least one requirement" : result.goalsWithoutRequirements.join(", "),
      severity: "advisory"
    }
  ];
  return toResult(checks);
}
function rulesLint(repo, rulesDirFlag) {
  const graph = loadGraph(repo);
  const pluginRoot = resolve2(fileURLToPath(new URL("../..", import.meta.url)));
  const rulesDir = rulesDirFlag ?? join13(pluginRoot, "rules");
  const loadErrors = [];
  const rules = loadBaRules(rulesDir, loadErrors);
  const violations = evaluateBaRules(rules, graph);
  const checks = [
    {
      name: "rules-loaded",
      ok: loadErrors.length === 0,
      reason: loadErrors.length === 0 ? `${rules.length} rule file(s) from ${rulesDir}` : loadErrors.join("; "),
      severity: "advisory"
    }
  ];
  if (violations.length === 0) {
    checks.push({ name: "rules-violations", ok: true, reason: "none" });
  } else {
    for (const v of violations) {
      checks.push({
        name: `rule:${v.ruleId}:${v.targetId}`,
        ok: false,
        reason: v.message,
        severity: v.severity === "advisory" ? "advisory" : void 0
      });
    }
  }
  return toResult(checks);
}
function renderView(repo, what) {
  const graph = loadGraph(repo);
  const view = what ?? "prd";
  let text;
  switch (view) {
    case "prd":
      text = exportPrd(graph);
      break;
    case "rtm":
      text = exportRtm(graph);
      break;
    case "backlog":
      text = exportBacklog(graph);
      break;
    default:
      throw new Error(`render: unknown --what '${view}' (expected prd|rtm|backlog)`);
  }
  return ok(view, text);
}
function walkCorpus(repo) {
  const files = walkCanonFiles(repo);
  const results = [];
  for (const file of files) {
    let raw;
    try {
      raw = readFileSync13(file, "utf8");
    } catch (err) {
      results.push({ path: file, error: message(err) });
      continue;
    }
    const type = peekType(raw);
    if (type === void 0 || !(type in schemas)) {
      results.push({ path: file, type, error: "unrecognized or missing 'type' field" });
      continue;
    }
    const parsed = parsePage(raw, type);
    if ("error" in parsed) {
      results.push({ path: file, type, error: parsed.error });
      continue;
    }
    results.push({ path: file, type, parsed });
  }
  return results;
}
function isValid2(w) {
  return "parsed" in w;
}
function readBaselineManifests(repo) {
  const dir = join13(repo, "baselines");
  let entries;
  try {
    entries = readdirSync8(dir, { withFileTypes: true });
  } catch {
    return { manifests: [], errors: [] };
  }
  const manifests = [];
  const errors = [];
  for (const entry of entries) {
    if (!entry.isDirectory())
      continue;
    const manifestPath = join13(dir, entry.name, "manifest.yaml");
    let raw;
    try {
      raw = readFileSync13(manifestPath, "utf8");
    } catch {
      continue;
    }
    try {
      manifests.push(baselineManifestSchema.parse((0, import_yaml9.parse)(raw)));
    } catch (err) {
      errors.push(`${manifestPath}: ${message(err)}`);
    }
  }
  return { manifests, errors };
}
function partialStateViolations(repo, pages) {
  const violations = [];
  for (const page of pages) {
    const fm = page.frontmatter;
    const baseline = typeof fm.baseline === "string" ? fm.baseline : void 0;
    const id = typeof fm.id === "string" ? fm.id : void 0;
    if (!baseline || !id)
      continue;
    const manifestPath = join13(repo, "baselines", baseline, "manifest.yaml");
    let raw;
    try {
      raw = readFileSync13(manifestPath, "utf8");
    } catch {
      violations.push(`${id}: claims baseline ${baseline} but ${manifestPath} is absent`);
      continue;
    }
    let manifest;
    try {
      manifest = baselineManifestSchema.parse((0, import_yaml9.parse)(raw));
    } catch (err) {
      violations.push(`${id}: ${manifestPath} failed schema validation: ${message(err)}`);
      continue;
    }
    if (!manifest.items.some((item) => item.id === id)) {
      violations.push(`${id}: baseline ${baseline}'s manifest.yaml does not list it in items[]`);
    }
  }
  return violations;
}
function orphanedPendingMarkers(repo) {
  const dir = join13(repo, ".ba", "cache");
  let entries;
  try {
    entries = readdirSync8(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.filter((e) => e.isFile() && e.name.startsWith("pending-") && e.name.endsWith(".json")).map((e) => e.name);
}
function frontmatterBlock(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(raw);
  return m?.[1];
}
function roundTripViolations(valid) {
  const violations = [];
  for (const w of valid) {
    const raw = readFileSync13(w.path, "utf8");
    const original = frontmatterBlock(raw);
    const reEmitted = frontmatterBlock(emitPage(w.type, w.parsed.frontmatter, w.parsed.body));
    if (original !== reEmitted)
      violations.push(w.path);
  }
  return violations;
}
function derivedViewsIdempotent(graph) {
  return exportPrd(graph) === exportPrd(graph) && exportRtm(graph) === exportRtm(graph) && exportBacklog(graph) === exportBacklog(graph);
}
function wpScopeLinkIssues(graph, linkRoot) {
  const issues = [];
  for (const wp of graph.wps) {
    for (const issue of scopeLinkIssues(graph, wp.frontmatter.id, linkRoot)) {
      issues.push(`${wp.frontmatter.id}: ${issue}`);
    }
  }
  return issues;
}
function wpScopeVersionCurrentIssues(graph) {
  const issues = [];
  for (const wp of graph.wps) {
    if (wp.frontmatter.status === "accepted" || wp.frontmatter.status === "abandoned")
      continue;
    for (const issue of scopeVersionIssues(graph, wp.frontmatter.id)) {
      issues.push(`${wp.frontmatter.id}: ${issue}`);
    }
  }
  return issues;
}
function crImpactsPresentIssues(graph) {
  const issues = [];
  const reqIds = /* @__PURE__ */ new Set([
    ...graph.frs.map((n) => n.frontmatter.id),
    ...graph.nfrs.map((n) => n.frontmatter.id),
    ...graph.brs.map((n) => n.frontmatter.id)
  ]);
  const epicIds = new Set(graph.epics.map((e) => e.frontmatter.id));
  for (const cr of graph.crs) {
    const fm = cr.frontmatter;
    if (fm.status !== "confirmed" || fm.entry_point !== "requirement")
      continue;
    const impacts = fm.impacts ?? [];
    if (impacts.length === 0) {
      issues.push(`${fm.id}: confirmed requirement-entry CR has an empty impacts set`);
      continue;
    }
    for (const impact of impacts) {
      if ("amends" in impact) {
        if (!reqIds.has(impact.amends))
          issues.push(`${fm.id}: impact amends '${impact.amends}', which does not resolve`);
      } else if (!epicIds.has(impact.epic)) {
        issues.push(`${fm.id}: impact spawns a '${impact.spawns}' under epic '${impact.epic}', which does not resolve`);
      }
    }
  }
  return issues;
}
function crImpactsConsistentIssues(graph) {
  const issues = [];
  const nodeOf = requirementNodeIndex(graph);
  for (const cr of graph.crs) {
    const crId = cr.frontmatter.id;
    const impacts = cr.frontmatter.impacts ?? [];
    const backfilled = cr.frontmatter.provenance === "backfilled";
    for (const impact of impacts) {
      if (!("spawns" in impact) || impact.realized === void 0)
        continue;
      const node = nodeOf(impact.realized);
      if (!node) {
        issues.push(`${crId}: realized id '${impact.realized}' does not resolve to a FR/NFR/BR`);
        continue;
      }
      const realizedType = FR_ID.test(impact.realized) ? "fr" : NFR_ID.test(impact.realized) ? "nfr" : BR_ID.test(impact.realized) ? "br" : void 0;
      if (realizedType !== void 0 && realizedType !== impact.spawns) {
        issues.push(`${crId}: realized id '${impact.realized}' is a '${realizedType}', but the impact declares spawns '${impact.spawns}'`);
      }
      const realizedEpic = /^(E\d+)-/.exec(impact.realized)?.[1];
      if (realizedEpic !== void 0 && realizedEpic !== impact.epic) {
        issues.push(`${crId}: realized id '${impact.realized}'s epic ('${realizedEpic}') does not match the impact's declared epic '${impact.epic}'`);
      }
      if (backfilled)
        continue;
      const traces = "traces_to" in node.frontmatter ? node.frontmatter.traces_to : void 0;
      if (traces !== void 0 && !traces.includes(crId)) {
        issues.push(`${crId}: realized id '${impact.realized}'s traces_to does not include ${crId}`);
      }
    }
    if (cr.frontmatter.status === "resolved" && (impacts.length === 0 || !crImpactsDelivered(nodeOf, crId, impacts, backfilled))) {
      issues.push(`${crId}: status is 'resolved' but its impacts are not all provably delivered`);
    }
  }
  return issues;
}
function crCitationsDeclaredIssues(graph) {
  const issues = [];
  const crById = new Map(graph.crs.map((cr) => [cr.frontmatter.id, cr]));
  const crAmends = (crId, id) => {
    const impacts = crById.get(crId)?.frontmatter.impacts ?? [];
    return impacts.some((impact) => "amends" in impact && impact.amends === id);
  };
  const crAmendsOrRealizes = (crId, id) => {
    const impacts = crById.get(crId)?.frontmatter.impacts ?? [];
    return impacts.some((impact) => "amends" in impact && impact.amends === id || "spawns" in impact && impact.realized === id);
  };
  for (const nodes of [graph.frs, graph.nfrs]) {
    for (const node of nodes) {
      const id = node.frontmatter.id;
      for (const crId of node.frontmatter.traces_to) {
        const cr = crById.get(crId);
        if (!cr)
          continue;
        if (cr.frontmatter.entry_point !== "requirement")
          continue;
        if (!crAmendsOrRealizes(crId, id)) {
          issues.push(`${id}: traces_to ${crId}, a requirement-entry CR, but ${crId}'s impacts do not declare it`);
        }
      }
    }
  }
  for (const nodes of [graph.frs, graph.nfrs, graph.brs]) {
    for (const node of nodes) {
      const id = node.frontmatter.id;
      for (const crId of historyCrRefs(node.body)) {
        if (!crAmends(crId, id)) {
          issues.push(`${id}: ## History cites ${crId}, but ${crId}'s impacts do not declare an amends entry for it`);
        }
      }
    }
  }
  return issues;
}
function historyAnchorDuplicateIssues(graph) {
  const issues = [];
  for (const nodes of [graph.frs, graph.nfrs, graph.brs]) {
    for (const node of nodes) {
      const seen = /* @__PURE__ */ new Map();
      const dupes = /* @__PURE__ */ new Set();
      for (const m of node.body.matchAll(/^#{2,3} (.+)$/gm)) {
        const slug = slugifyHeading(m[1]);
        const count = (seen.get(slug) ?? 0) + 1;
        seen.set(slug, count);
        if (count > 1)
          dupes.add(slug);
      }
      if (dupes.size > 0)
        issues.push(`${node.frontmatter.id}: duplicate heading slug(s) ${[...dupes].sort().join(", ")}`);
    }
  }
  return issues;
}
function duplicateFrontmatterIssues(graph) {
  const issues = [];
  for (const nodes of [graph.frs, graph.nfrs, graph.brs, graph.wps, graph.crs]) {
    for (const node of nodes) {
      if (bodyHasLeadingFrontmatterFence(node.body)) {
        issues.push(`${node.frontmatter.id}: body starts with a YAML frontmatter fence (duplicate FM)`);
      }
    }
  }
  return issues;
}
function referencesNfrTraceabilityIssues(graph) {
  const issues = [];
  for (const fr of graph.frs) {
    const { canon, catalog } = extractNfrMentions(fr.body);
    const mentioned = [...canon, ...catalog];
    if (mentioned.length === 0)
      continue;
    const declared = new Set(fr.frontmatter.references_nfr);
    const missing = mentioned.filter((id) => !declared.has(id));
    if (missing.length > 0) {
      issues.push(`${fr.frontmatter.id}: body mentions ${missing.join(", ")} but references_nfr omits them`);
    }
  }
  return issues;
}
function brokenMarkdownLinkIssues(repo, graph) {
  const issues = [];
  const linkRe = /\]\(([^)#]+\.md)(#[^)]*)?\)/g;
  for (const nodes of [graph.frs, graph.nfrs, graph.brs, graph.wps, graph.crs, graph.epics]) {
    for (const node of nodes) {
      const rel = graph.pathOf(node.frontmatter.id);
      if (!rel)
        continue;
      const absDir = dirname9(join13(repo, rel));
      for (const m of node.body.matchAll(linkRe)) {
        const href = m[1];
        if (href.includes("{") || href.includes("XXX"))
          continue;
        if (/^[a-z]+:\/\//i.test(href))
          continue;
        const target = join13(absDir, href);
        if (!existsSync7(target)) {
          issues.push(`${node.frontmatter.id}: broken link (${href}) from ${rel}`);
        }
      }
    }
  }
  return issues;
}
async function validate(repo, check) {
  const results = walkCorpus(repo);
  const validPages = results.filter(isValid2);
  const schemaFailures = results.filter((r) => !isValid2(r));
  const paths = /* @__PURE__ */ new Map();
  for (const r of validPages)
    paths.set(r.parsed, relative7(repo, r.path).split(sep4).join("/"));
  const graph = buildGraph(validPages.map((r) => r.parsed), paths);
  const { manifests, errors: manifestErrors } = readBaselineManifests(repo);
  const guard = maxGuard(repo, validPages.map((r) => r.parsed), manifests);
  const partial = partialStateViolations(repo, validPages.map((r) => r.parsed));
  const pendingMarkers = orphanedPendingMarkers(repo);
  const dangling = graph.danglingRefs();
  const orphanIds = graph.orphans();
  const frById = new Map(graph.frs.map((fr) => [fr.frontmatter.id, fr]));
  const hardOrphans = orphanIds.filter((id) => frById.get(id)?.frontmatter.provenance !== "migrated");
  const migratedOrphans = orphanIds.filter((id) => frById.get(id)?.frontmatter.provenance === "migrated");
  const duplicateAcFrs = graph.frs.filter((fr) => parseAcBlock(fr.body).error !== void 0).map((fr) => fr.frontmatter.id);
  const allSchemaFailures = [...schemaFailures.map((f) => `${f.path}: ${f.error}`), ...manifestErrors];
  const wpScopeLinkIssueList = wpScopeLinkIssues(graph, resolveLinkRoot2(repo));
  const wpScopeVersionIssueList = wpScopeVersionCurrentIssues(graph);
  const crImpactsPresentIssueList = crImpactsPresentIssues(graph);
  const crImpactsConsistentIssueList = crImpactsConsistentIssues(graph);
  const crCitationsDeclaredIssueList = crCitationsDeclaredIssues(graph);
  const historyAnchorIssueList = historyAnchorDuplicateIssues(graph);
  const duplicateFrontmatterIssueList = duplicateFrontmatterIssues(graph);
  const brokenMarkdownLinkIssueList = brokenMarkdownLinkIssues(repo, graph);
  const referencesNfrTraceabilityIssueList = referencesNfrTraceabilityIssues(graph);
  const semantic = runSemanticLint(repo, graph);
  const semanticChecks = semanticLintToChecks(semantic);
  const checks = [
    {
      name: "schema-valid",
      ok: allSchemaFailures.length === 0,
      reason: allSchemaFailures.length === 0 ? "every canon page and baseline manifest is schema-valid" : allSchemaFailures.join("; ")
    },
    {
      name: "no-dangling-refs",
      ok: dangling.length === 0,
      reason: dangling.length === 0 ? "no dangling typed ref" : dangling.map((d) => `${d.from} -> ${d.to}`).join("; ")
    },
    {
      name: "no-orphans",
      ok: hardOrphans.length === 0,
      reason: hardOrphans.length === 0 ? "no un-migrated orphan FR" : hardOrphans.join(", ")
    },
    {
      name: "no-duplicate-ac-ids",
      ok: duplicateAcFrs.length === 0,
      reason: duplicateAcFrs.length === 0 ? "no FR has a duplicate AC id" : duplicateAcFrs.join(", ")
    },
    {
      name: "migrated-orphans",
      ok: migratedOrphans.length === 0,
      reason: migratedOrphans.length === 0 ? "no provenance:migrated orphan pending re-import" : `${migratedOrphans.join(", ")} (provenance:migrated \u2014 re-import via shape-requirement to clear)`,
      severity: "advisory"
    },
    {
      name: "id-max-guard",
      ok: guard.ok,
      reason: guard.ok ? "counters.yaml is >= every id seen in the corpus" : guard.violations.join("; ")
    },
    {
      name: "accept-partial-state",
      ok: partial.length === 0,
      reason: partial.length === 0 ? "no item claims an incomplete baseline" : partial.join("; ")
    },
    {
      name: "no-orphaned-pending-markers",
      ok: pendingMarkers.length === 0,
      reason: pendingMarkers.length === 0 ? "no orphaned accept pending-marker" : pendingMarkers.join(", "),
      severity: "advisory"
    },
    {
      name: "wp-scope-links",
      ok: wpScopeLinkIssueList.length === 0,
      reason: wpScopeLinkIssueList.length === 0 ? "every WP Scope link parses, resolves, path-matches, and anchor-matches" : wpScopeLinkIssueList.join("; ")
    },
    {
      name: "wp-scope-version-current",
      ok: wpScopeVersionIssueList.length === 0,
      reason: wpScopeVersionIssueList.length === 0 ? "every non-accepted WP's version-stamped Scope link matches its target's current version" : wpScopeVersionIssueList.join("; ")
    },
    {
      name: "cr-impacts-present",
      ok: crImpactsPresentIssueList.length === 0,
      reason: crImpactsPresentIssueList.length === 0 ? "every confirmed requirement-entry CR has a non-empty, resolving impacts set" : crImpactsPresentIssueList.join("; ")
    },
    {
      name: "cr-impacts-consistent",
      ok: crImpactsConsistentIssueList.length === 0,
      reason: crImpactsConsistentIssueList.length === 0 ? "every realized impact traces back to its CR, and every resolved CR is fully delivered" : crImpactsConsistentIssueList.join("; ")
    },
    {
      name: "cr-citations-declared",
      ok: crCitationsDeclaredIssueList.length === 0,
      reason: crCitationsDeclaredIssueList.length === 0 ? "every traces_to/## History CR citation is backed by that CR's own declared impacts" : crCitationsDeclaredIssueList.join("; ")
    },
    {
      name: "history-anchor-unique",
      ok: historyAnchorIssueList.length === 0,
      reason: historyAnchorIssueList.length === 0 ? "no fr/nfr/br page has a duplicate ##/### heading slug" : historyAnchorIssueList.join("; ")
    },
    {
      name: "no-duplicate-frontmatter",
      ok: duplicateFrontmatterIssueList.length === 0,
      reason: duplicateFrontmatterIssueList.length === 0 ? "no requirement body starts with a second YAML frontmatter fence" : duplicateFrontmatterIssueList.join("; ")
    },
    {
      name: "markdown-links-resolve",
      ok: brokenMarkdownLinkIssueList.length === 0,
      reason: brokenMarkdownLinkIssueList.length === 0 ? "every relative .md link in the corpus resolves on disk" : brokenMarkdownLinkIssueList.join("; ")
    },
    {
      name: "references-nfr-traceability",
      ok: referencesNfrTraceabilityIssueList.length === 0,
      reason: referencesNfrTraceabilityIssueList.length === 0 ? "every FR body NFR mention is declared in references_nfr" : referencesNfrTraceabilityIssueList.join("; ")
    },
    // Semantic body checks (formerly tools/lint.py 1–5) — Node-only, no Python.
    ...semanticChecks,
    (() => {
      const unknown = graph.bugs.flatMap((b) => unresolvedAffects(b.frontmatter.affects, graph).map((id) => `${b.frontmatter.id} -> ${id}`));
      return {
        name: "bug-affects-resolves",
        ok: unknown.length === 0,
        reason: unknown.length === 0 ? "every bug affects[] id is an existing FR/NFR/BR" : unknown.join("; ")
      };
    })()
  ];
  if (check) {
    const rt = roundTripViolations(validPages);
    checks.push({
      name: "frontmatter-round-trip",
      ok: rt.length === 0,
      reason: rt.length === 0 ? "emit(parse(f)) matches every committed page" : rt.join(", ")
    });
    const idempotent = derivedViewsIdempotent(graph);
    checks.push({
      name: "derived-view-idempotent",
      ok: idempotent,
      reason: idempotent ? "prd/rtm/backlog render identically on repeat" : "a derived view rendered differently on repeat"
    });
  }
  return toResult(checks);
}
function collectCanonFiles(repo) {
  return walkCanonFiles(repo).sort();
}
function fmtCommand(repo, paths, check) {
  const targets = paths.length > 0 ? [...paths] : collectCanonFiles(repo);
  if (targets.length === 0)
    return ok("fmt", "no canon files found");
  const checks = targets.map((path) => {
    if (check) {
      const raw = readFileSync13(path, "utf8");
      const type = peekType(raw);
      if (type === void 0 || !(type in schemas)) {
        throw new Error(`fmt: ${path}: missing or unrecognized frontmatter 'type'`);
      }
      const canonical = formatText(raw, type);
      const isCanonical = canonical === raw;
      return {
        name: path,
        ok: isCanonical,
        reason: isCanonical ? "already canonical" : "drifted from canonical form",
        severity: "advisory"
      };
    }
    const { changed } = formatFile(repo, path);
    return { name: path, ok: true, reason: changed ? "rewrote to canonical form" : "already canonical" };
  });
  return toResult(checks);
}

// ../praxis-ba/plugins/ba/canon-graph/bin/praxis-ba.mjs
var argv = process.argv.slice(2);
var wantsJson = argv.includes("--json");
var { code, json } = await runCli(argv);
if (wantsJson) {
  console.log(JSON.stringify(json));
} else if (json.checks.length === 1 && ["prd", "rtm", "backlog", "code-surface-scan"].includes(json.checks[0].name)) {
  console.log(json.checks[0].reason);
} else {
  console.log(json.verdict);
  for (const c of json.checks) {
    console.log(`  ${c.ok ? "ok  " : "FAIL"}  ${c.name}: ${c.reason}`);
  }
  if (json.id) console.log(`id: ${json.id}`);
  if (json.path) console.log(`path: ${json.path}`);
  if (json.handoffPath) console.log(`handoffPath: ${json.handoffPath}`);
}
process.exitCode = code;
/*! Bundled license information:

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

strip-bom-string/index.js:
  (*!
   * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
