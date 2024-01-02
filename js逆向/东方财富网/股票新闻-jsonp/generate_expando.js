const f = "3.5.1";

function generateExpando() {
    return "jQuery" + (f + Math.random()).replace(/\D/g, "");
}

const S = {
    fn: {
        jquery: f,
        // constructor: S,
        length: 0,
        toArray: function () {
            return Array.from(this);
        },
        get: function (e) {
            return e == null ? Array.from(this) : e < 0 ? this[e + this.length] : this[e];
        },
        pushStack: function (e) {
            const newObj = S.merge(this.constructor(), e);
            newObj.prevObject = this;
            return newObj;
        },
        each: function (e) {
            return S.each(this, e);
        },
        map: function (n) {
            return this.pushStack(S.map(this, function (e, t) {
                return n.call(e, t, e);
            }));
        },
        slice: function () {
            return this.pushStack(Array.prototype.slice.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        even: function () {
            return this.pushStack(S.grep(this, function (e, t) {
                return (t + 1) % 2;
            }));
        },
        odd: function () {
            return this.pushStack(S.grep(this, function (e, t) {
                return t % 2;
            }));
        },
        eq: function (e) {
            const t = this.length;
            const n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor();
        },
        push: Array.prototype.push,
        sort: Array.prototype.sort,
        splice: Array.prototype.splice,
    },
};

S.fn.expando = generateExpando();

S.extend = S.fn.extend = function () {
    let options, name, src, copy, copyIsArray, clone;
    let target = arguments[0] || {};
    let i = 1;
    const length = arguments.length;
    let deep = false;
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    if (typeof target !== "object" && !S.isFunction(target)) {
        target = {};
    }
    if (i === length) {
        target = this;
        i--;
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                if (deep && copy && (S.isPlainObject(copy) || (copyIsArray = S.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && S.isArray(src) ? src : [];
                    } else {
                        clone = src && S.isPlainObject(src) ? src : {};
                    }
                    target[name] = S.extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
};

S.extend({
    expando: generateExpando(),
    isReady: true,
    error: function (e) {
        throw new Error(e);
    },
    noop: function () {
    },
    isPlainObject: function (e) {
        let t, n;
        return !(!e || Object.prototype.toString.call(e) !== "[object Object]") && (!(t = Object.getPrototypeOf(e)) || typeof (n = Object.prototype.toString.call(t.constructor) === "[object Function]" && t.constructor) === "function" && Function.prototype.toString.call(n) === Function.prototype.toString.call(Object));
    },
    isEmptyObject: function (e) {
        let t;
        for (t in e) {
            return false;
        }
        return true;
    },
    globalEval: function (e, t, n) {
        // function implementation
    },
    each: function (e, t) {
        // function implementation
    },
    makeArray: function (e, t) {
        // function implementation
    },
    inArray: function (e, t, n) {
        // function implementation
    },
    merge: function (e, t) {
        // function implementation
    },
    grep: function (e, t, n) {
        // function implementation
    },
    map: function (e, t, n) {
        // function implementation
    },
    guid: 1,
    support: {}, // Support object - You might want to fill this with actual support information
});

if (typeof Symbol === "function") {
    S.fn[Symbol.iterator] = Array.prototype[Symbol.iterator];
}

const types = "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ");
const typeMap = {};
types.forEach(function (type) {
    typeMap["[object " + type + "]"] = type.toLowerCase();
});

const expandoValue = generateExpando(); // 获取生成的 expando 值
console.log(expandoValue)