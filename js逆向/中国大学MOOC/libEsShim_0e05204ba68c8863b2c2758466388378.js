/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */
(function (t, r) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(r)
    } else if (typeof exports === "object") {
        module.exports = r()
    } else {
        t.returnExports = r()
    }
})(this, function () {
    var t = Array;
    var r = t.prototype;
    var e = Object;
    var n = e.prototype;
    var i = Function;
    var a = i.prototype;
    var o = String;
    var f = o.prototype;
    var u = Number;
    var l = u.prototype;
    var s = r.slice;
    var c = r.splice;
    var v = r.push;
    var h = r.unshift;
    var p = r.concat;
    var y = r.join;
    var d = a.call;
    var g = a.apply;
    var w = Math.max;
    var b = Math.min;
    var T = n.toString;
    var m = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
    var D;
    var S = Function.prototype.toString, x = /^\s*class /, O = function isES6ClassFn(t) {
        try {
            var r = S.call(t);
            var e = r.replace(/\/\/.*\n/g, "");
            var n = e.replace(/\/\*[.\s\S]*\*\//g, "");
            var i = n.replace(/\n/gm, " ").replace(/ {2}/g, " ");
            return x.test(i)
        } catch (a) {
            return false
        }
    }, E = function tryFunctionObject(t) {
        try {
            if (O(t)) {
                return false
            }
            S.call(t);
            return true
        } catch (r) {
            return false
        }
    }, j = "[object Function]", I = "[object GeneratorFunction]", D = function isCallable(t) {
        if (!t) {
            return false
        }
        if (typeof t !== "function" && typeof t !== "object") {
            return false
        }
        if (m) {
            return E(t)
        }
        if (O(t)) {
            return false
        }
        var r = T.call(t);
        return r === j || r === I
    };
    var M;
    var U = RegExp.prototype.exec, F = function tryRegexExec(t) {
        try {
            U.call(t);
            return true
        } catch (r) {
            return false
        }
    }, $ = "[object RegExp]";
    M = function isRegex(t) {
        if (typeof t !== "object") {
            return false
        }
        return m ? F(t) : T.call(t) === $
    };
    var N;
    var C = String.prototype.valueOf, k = function tryStringObject(t) {
        try {
            C.call(t);
            return true
        } catch (r) {
            return false
        }
    }, A = "[object String]";
    N = function isString(t) {
        if (typeof t === "string") {
            return true
        }
        if (typeof t !== "object") {
            return false
        }
        return m ? k(t) : T.call(t) === A
    };
    var R = e.defineProperty && function () {
        try {
            var t = {};
            e.defineProperty(t, "x", {enumerable: false, value: t});
            for (var r in t) {
                return false
            }
            return t.x === t
        } catch (n) {
            return false
        }
    }();
    var P = function (t) {
        var r;
        if (R) {
            r = function (t, r, n, i) {
                if (!i && r in t) {
                    return
                }
                e.defineProperty(t, r, {configurable: true, enumerable: false, writable: true, value: n})
            }
        } else {
            r = function (t, r, e, n) {
                if (!n && r in t) {
                    return
                }
                t[r] = e
            }
        }
        return function defineProperties(e, n, i) {
            for (var a in n) {
                if (t.call(n, a)) {
                    r(e, a, n[a], i)
                }
            }
        }
    }(n.hasOwnProperty);
    var J = function isPrimitive(t) {
        var r = typeof t;
        return t === null || r !== "object" && r !== "function"
    };
    var Y = u.isNaN || function isActualNaN(t) {
        return t !== t
    };
    var Z = {
        ToInteger: function ToInteger(t) {
            var r = +t;
            if (Y(r)) {
                r = 0
            } else if (r !== 0 && r !== 1 / 0 && r !== -(1 / 0)) {
                r = (r > 0 || -1) * Math.floor(Math.abs(r))
            }
            return r
        }, ToPrimitive: function ToPrimitive(t) {
            var r, e, n;
            if (J(t)) {
                return t
            }
            e = t.valueOf;
            if (D(e)) {
                r = e.call(t);
                if (J(r)) {
                    return r
                }
            }
            n = t.toString;
            if (D(n)) {
                r = n.call(t);
                if (J(r)) {
                    return r
                }
            }
            throw new TypeError
        }, ToObject: function (t) {
            if (t == null) {
                throw new TypeError("can't convert " + t + " to object")
            }
            return e(t)
        }, ToUint32: function ToUint32(t) {
            return t >>> 0
        }
    };
    var z = function Empty() {
    };
    P(a, {
        bind: function bind(t) {
            var r = this;
            if (!D(r)) {
                throw new TypeError("Function.prototype.bind called on incompatible " + r)
            }
            var n = s.call(arguments, 1);
            var a;
            var o = function () {
                if (this instanceof a) {
                    var i = g.call(r, this, p.call(n, s.call(arguments)));
                    if (e(i) === i) {
                        return i
                    }
                    return this
                } else {
                    return g.call(r, t, p.call(n, s.call(arguments)))
                }
            };
            var f = w(0, r.length - n.length);
            var u = [];
            for (var l = 0; l < f; l++) {
                v.call(u, "$" + l)
            }
            a = i("binder", "return function (" + y.call(u, ",") + "){ return binder.apply(this, arguments); }")(o);
            if (r.prototype) {
                z.prototype = r.prototype;
                a.prototype = new z;
                z.prototype = null
            }
            return a
        }
    });
    var G = d.bind(n.hasOwnProperty);
    var H = d.bind(n.toString);
    var W = d.bind(s);
    var B = g.bind(s);
    if (typeof document === "object" && document && document.documentElement) {
        try {
            W(document.documentElement.childNodes)
        } catch (X) {
            var L = W;
            var q = B;
            W = function arraySliceIE(t) {
                var r = [];
                var e = t.length;
                while (e-- > 0) {
                    r[e] = t[e]
                }
                return q(r, L(arguments, 1))
            };
            B = function arraySliceApplyIE(t, r) {
                return q(W(t), r)
            }
        }
    }
    var K = d.bind(f.slice);
    var Q = d.bind(f.split);
    var V = d.bind(f.indexOf);
    var _ = d.bind(v);
    var tt = d.bind(n.propertyIsEnumerable);
    var rt = d.bind(r.sort);
    var et = t.isArray || function isArray(t) {
        return H(t) === "[object Array]"
    };
    var nt = [].unshift(0) !== 1;
    P(r, {
        unshift: function () {
            h.apply(this, arguments);
            return this.length
        }
    }, nt);
    P(t, {isArray: et});
    var it = e("a");
    var at = it[0] !== "a" || !(0 in it);
    var ot = function properlyBoxed(t) {
        var r = true;
        var e = true;
        var n = false;
        if (t) {
            try {
                t.call("foo", function (t, e, n) {
                    if (typeof n !== "object") {
                        r = false
                    }
                });
                t.call([1], function () {
                    "use strict";
                    e = typeof this === "string"
                }, "x")
            } catch (i) {
                n = true
            }
        }
        return !!t && !n && r && e
    };
    P(r, {
        forEach: function forEach(t) {
            var r = Z.ToObject(this);
            var e = at && N(this) ? Q(this, "") : r;
            var n = -1;
            var i = Z.ToUint32(e.length);
            var a;
            if (arguments.length > 1) {
                a = arguments[1]
            }
            if (!D(t)) {
                throw new TypeError("Array.prototype.forEach callback must be a function")
            }
            while (++n < i) {
                if (n in e) {
                    if (typeof a === "undefined") {
                        t(e[n], n, r)
                    } else {
                        t.call(a, e[n], n, r)
                    }
                }
            }
        }
    }, !ot(r.forEach));
    P(r, {
        map: function map(r) {
            var e = Z.ToObject(this);
            var n = at && N(this) ? Q(this, "") : e;
            var i = Z.ToUint32(n.length);
            var a = t(i);
            var o;
            if (arguments.length > 1) {
                o = arguments[1]
            }
            if (!D(r)) {
                throw new TypeError("Array.prototype.map callback must be a function")
            }
            for (var f = 0; f < i; f++) {
                if (f in n) {
                    if (typeof o === "undefined") {
                        a[f] = r(n[f], f, e)
                    } else {
                        a[f] = r.call(o, n[f], f, e)
                    }
                }
            }
            return a
        }
    }, !ot(r.map));
    P(r, {
        filter: function filter(t) {
            var r = Z.ToObject(this);
            var e = at && N(this) ? Q(this, "") : r;
            var n = Z.ToUint32(e.length);
            var i = [];
            var a;
            var o;
            if (arguments.length > 1) {
                o = arguments[1]
            }
            if (!D(t)) {
                throw new TypeError("Array.prototype.filter callback must be a function")
            }
            for (var f = 0; f < n; f++) {
                if (f in e) {
                    a = e[f];
                    if (typeof o === "undefined" ? t(a, f, r) : t.call(o, a, f, r)) {
                        _(i, a)
                    }
                }
            }
            return i
        }
    }, !ot(r.filter));
    P(r, {
        every: function every(t) {
            var r = Z.ToObject(this);
            var e = at && N(this) ? Q(this, "") : r;
            var n = Z.ToUint32(e.length);
            var i;
            if (arguments.length > 1) {
                i = arguments[1]
            }
            if (!D(t)) {
                throw new TypeError("Array.prototype.every callback must be a function")
            }
            for (var a = 0; a < n; a++) {
                if (a in e && !(typeof i === "undefined" ? t(e[a], a, r) : t.call(i, e[a], a, r))) {
                    return false
                }
            }
            return true
        }
    }, !ot(r.every));
    P(r, {
        some: function some(t) {
            var r = Z.ToObject(this);
            var e = at && N(this) ? Q(this, "") : r;
            var n = Z.ToUint32(e.length);
            var i;
            if (arguments.length > 1) {
                i = arguments[1]
            }
            if (!D(t)) {
                throw new TypeError("Array.prototype.some callback must be a function")
            }
            for (var a = 0; a < n; a++) {
                if (a in e && (typeof i === "undefined" ? t(e[a], a, r) : t.call(i, e[a], a, r))) {
                    return true
                }
            }
            return false
        }
    }, !ot(r.some));
    var ft = false;
    if (r.reduce) {
        ft = typeof r.reduce.call("es5", function (t, r, e, n) {
            return n
        }) === "object"
    }
    P(r, {
        reduce: function reduce(t) {
            var r = Z.ToObject(this);
            var e = at && N(this) ? Q(this, "") : r;
            var n = Z.ToUint32(e.length);
            if (!D(t)) {
                throw new TypeError("Array.prototype.reduce callback must be a function")
            }
            if (n === 0 && arguments.length === 1) {
                throw new TypeError("reduce of empty array with no initial value")
            }
            var i = 0;
            var a;
            if (arguments.length >= 2) {
                a = arguments[1]
            } else {
                do {
                    if (i in e) {
                        a = e[i++];
                        break
                    }
                    if (++i >= n) {
                        throw new TypeError("reduce of empty array with no initial value")
                    }
                } while (true)
            }
            for (; i < n; i++) {
                if (i in e) {
                    a = t(a, e[i], i, r)
                }
            }
            return a
        }
    }, !ft);
    var ut = false;
    if (r.reduceRight) {
        ut = typeof r.reduceRight.call("es5", function (t, r, e, n) {
            return n
        }) === "object"
    }
    P(r, {
        reduceRight: function reduceRight(t) {
            var r = Z.ToObject(this);
            var e = at && N(this) ? Q(this, "") : r;
            var n = Z.ToUint32(e.length);
            if (!D(t)) {
                throw new TypeError("Array.prototype.reduceRight callback must be a function")
            }
            if (n === 0 && arguments.length === 1) {
                throw new TypeError("reduceRight of empty array with no initial value")
            }
            var i;
            var a = n - 1;
            if (arguments.length >= 2) {
                i = arguments[1]
            } else {
                do {
                    if (a in e) {
                        i = e[a--];
                        break
                    }
                    if (--a < 0) {
                        throw new TypeError("reduceRight of empty array with no initial value")
                    }
                } while (true)
            }
            if (a < 0) {
                return i
            }
            do {
                if (a in e) {
                    i = t(i, e[a], a, r)
                }
            } while (a--);
            return i
        }
    }, !ut);
    var lt = r.indexOf && [0, 1].indexOf(1, 2) !== -1;
    P(r, {
        indexOf: function indexOf(t) {
            var r = at && N(this) ? Q(this, "") : Z.ToObject(this);
            var e = Z.ToUint32(r.length);
            if (e === 0) {
                return -1
            }
            var n = 0;
            if (arguments.length > 1) {
                n = Z.ToInteger(arguments[1])
            }
            n = n >= 0 ? n : w(0, e + n);
            for (; n < e; n++) {
                if (n in r && r[n] === t) {
                    return n
                }
            }
            return -1
        }
    }, lt);
    var st = r.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
    P(r, {
        lastIndexOf: function lastIndexOf(t) {
            var r = at && N(this) ? Q(this, "") : Z.ToObject(this);
            var e = Z.ToUint32(r.length);
            if (e === 0) {
                return -1
            }
            var n = e - 1;
            if (arguments.length > 1) {
                n = b(n, Z.ToInteger(arguments[1]))
            }
            n = n >= 0 ? n : e - Math.abs(n);
            for (; n >= 0; n--) {
                if (n in r && t === r[n]) {
                    return n
                }
            }
            return -1
        }
    }, st);
    var ct = function () {
        var t = [1, 2];
        var r = t.splice();
        return t.length === 2 && et(r) && r.length === 0
    }();
    P(r, {
        splice: function splice(t, r) {
            if (arguments.length === 0) {
                return []
            } else {
                return c.apply(this, arguments)
            }
        }
    }, !ct);
    var vt = function () {
        var t = {};
        r.splice.call(t, 0, 0, 1);
        return t.length === 1
    }();
    P(r, {
        splice: function splice(t, r) {
            if (arguments.length === 0) {
                return []
            }
            var e = arguments;
            this.length = w(Z.ToInteger(this.length), 0);
            if (arguments.length > 0 && typeof r !== "number") {
                e = W(arguments);
                if (e.length < 2) {
                    _(e, this.length - t)
                } else {
                    e[1] = Z.ToInteger(r)
                }
            }
            return c.apply(this, e)
        }
    }, !vt);
    var ht = function () {
        var r = new t(1e5);
        r[8] = "x";
        r.splice(1, 1);
        return r.indexOf("x") === 7
    }();
    var pt = function () {
        var t = 256;
        var r = [];
        r[t] = "a";
        r.splice(t + 1, 0, "b");
        return r[t] === "a"
    }();
    P(r, {
        splice: function splice(t, r) {
            var e = Z.ToObject(this);
            var n = [];
            var i = Z.ToUint32(e.length);
            var a = Z.ToInteger(t);
            var f = a < 0 ? w(i + a, 0) : b(a, i);
            var u = b(w(Z.ToInteger(r), 0), i - f);
            var l = 0;
            var s;
            while (l < u) {
                s = o(f + l);
                if (G(e, s)) {
                    n[l] = e[s]
                }
                l += 1
            }
            var c = W(arguments, 2);
            var v = c.length;
            var h;
            if (v < u) {
                l = f;
                var p = i - u;
                while (l < p) {
                    s = o(l + u);
                    h = o(l + v);
                    if (G(e, s)) {
                        e[h] = e[s]
                    } else {
                        delete e[h]
                    }
                    l += 1
                }
                l = i;
                var y = i - u + v;
                while (l > y) {
                    delete e[l - 1];
                    l -= 1
                }
            } else if (v > u) {
                l = i - u;
                while (l > f) {
                    s = o(l + u - 1);
                    h = o(l + v - 1);
                    if (G(e, s)) {
                        e[h] = e[s]
                    } else {
                        delete e[h]
                    }
                    l -= 1
                }
            }
            l = f;
            for (var d = 0; d < c.length; ++d) {
                e[l] = c[d];
                l += 1
            }
            e.length = i - u + v;
            return n
        }
    }, !ht || !pt);
    var yt = r.join;
    var dt;
    try {
        dt = Array.prototype.join.call("123", ",") !== "1,2,3"
    } catch (X) {
        dt = true
    }
    if (dt) {
        P(r, {
            join: function join(t) {
                var r = typeof t === "undefined" ? "," : t;
                return yt.call(N(this) ? Q(this, "") : this, r)
            }
        }, dt)
    }
    var gt = [1, 2].join(undefined) !== "1,2";
    if (gt) {
        P(r, {
            join: function join(t) {
                var r = typeof t === "undefined" ? "," : t;
                return yt.call(this, r)
            }
        }, gt)
    }
    var wt = function push(t) {
        var r = Z.ToObject(this);
        var e = Z.ToUint32(r.length);
        var n = 0;
        while (n < arguments.length) {
            r[e + n] = arguments[n];
            n += 1
        }
        r.length = e + n;
        return e + n
    };
    var bt = function () {
        var t = {};
        var r = Array.prototype.push.call(t, undefined);
        return r !== 1 || t.length !== 1 || typeof t[0] !== "undefined" || !G(t, 0)
    }();
    P(r, {
        push: function push(t) {
            if (et(this)) {
                return v.apply(this, arguments)
            }
            return wt.apply(this, arguments)
        }
    }, bt);
    var Tt = function () {
        var t = [];
        var r = t.push(undefined);
        return r !== 1 || t.length !== 1 || typeof t[0] !== "undefined" || !G(t, 0)
    }();
    P(r, {push: wt}, Tt);
    P(r, {
        slice: function (t, r) {
            var e = N(this) ? Q(this, "") : this;
            return B(e, arguments)
        }
    }, at);
    var mt = function () {
        try {
            [1, 2].sort(null)
        } catch (t) {
            try {
                [1, 2].sort({})
            } catch (r) {
                return false
            }
        }
        return true
    }();
    var Dt = function () {
        try {
            [1, 2].sort(/a/);
            return false
        } catch (t) {
        }
        return true
    }();
    var St = function () {
        try {
            [1, 2].sort(undefined);
            return true
        } catch (t) {
        }
        return false
    }();
    P(r, {
        sort: function sort(t) {
            if (typeof t === "undefined") {
                return rt(this)
            }
            if (!D(t)) {
                throw new TypeError("Array.prototype.sort callback must be a function")
            }
            return rt(this, t)
        }
    }, mt || !St || !Dt);
    var xt = !tt({toString: null}, "toString");
    var Ot = tt(function () {
    }, "prototype");
    var Et = !G("x", "0");
    var jt = function (t) {
        var r = t.constructor;
        return r && r.prototype === t
    };
    var It = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true,
        $width: true,
        $height: true,
        $top: true,
        $localStorage: true
    };
    var Mt = function () {
        if (typeof window === "undefined") {
            return false
        }
        for (var t in window) {
            try {
                if (!It["$" + t] && G(window, t) && window[t] !== null && typeof window[t] === "object") {
                    jt(window[t])
                }
            } catch (r) {
                return true
            }
        }
        return false
    }();
    var Ut = function (t) {
        if (typeof window === "undefined" || !Mt) {
            return jt(t)
        }
        try {
            return jt(t)
        } catch (r) {
            return false
        }
    };
    var Ft = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
    var $t = Ft.length;
    var Nt = function isArguments(t) {
        return H(t) === "[object Arguments]"
    };
    var Ct = function isArguments(t) {
        return t !== null && typeof t === "object" && typeof t.length === "number" && t.length >= 0 && !et(t) && D(t.callee)
    };
    var kt = Nt(arguments) ? Nt : Ct;
    P(e, {
        keys: function keys(t) {
            var r = D(t);
            var e = kt(t);
            var n = t !== null && typeof t === "object";
            var i = n && N(t);
            if (!n && !r && !e) {
                throw new TypeError("Object.keys called on a non-object")
            }
            var a = [];
            var f = Ot && r;
            if (i && Et || e) {
                for (var u = 0; u < t.length; ++u) {
                    _(a, o(u))
                }
            }
            if (!e) {
                for (var l in t) {
                    if (!(f && l === "prototype") && G(t, l)) {
                        _(a, o(l))
                    }
                }
            }
            if (xt) {
                var s = Ut(t);
                for (var c = 0; c < $t; c++) {
                    var v = Ft[c];
                    if (!(s && v === "constructor") && G(t, v)) {
                        _(a, v)
                    }
                }
            }
            return a
        }
    });
    var At = e.keys && function () {
        return e.keys(arguments).length === 2
    }(1, 2);
    var Rt = e.keys && function () {
        var t = e.keys(arguments);
        return arguments.length !== 1 || t.length !== 1 || t[0] !== 1
    }(1);
    var Pt = e.keys;
    P(e, {
        keys: function keys(t) {
            if (kt(t)) {
                return Pt(W(t))
            } else {
                return Pt(t)
            }
        }
    }, !At || Rt);
    var Jt = new Date(-0xc782b5b342b24).getUTCMonth() !== 0;
    var Yt = new Date(-0x55d318d56a724);
    var Zt = new Date(14496624e5);
    var zt = Yt.toUTCString() !== "Mon, 01 Jan -45875 11:59:59 GMT";
    var Gt;
    var Ht;
    var Wt = Yt.getTimezoneOffset();
    if (Wt < -720) {
        Gt = Yt.toDateString() !== "Tue Jan 02 -45875";
        Ht = !/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/.test(String(Zt))
    } else {
        Gt = Yt.toDateString() !== "Mon Jan 01 -45875";
        Ht = !/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/.test(String(Zt))
    }
    var Bt = d.bind(Date.prototype.getFullYear);
    var Xt = d.bind(Date.prototype.getMonth);
    var Lt = d.bind(Date.prototype.getDate);
    var qt = d.bind(Date.prototype.getUTCFullYear);
    var Kt = d.bind(Date.prototype.getUTCMonth);
    var Qt = d.bind(Date.prototype.getUTCDate);
    var Vt = d.bind(Date.prototype.getUTCDay);
    var _t = d.bind(Date.prototype.getUTCHours);
    var tr = d.bind(Date.prototype.getUTCMinutes);
    var rr = d.bind(Date.prototype.getUTCSeconds);
    var er = d.bind(Date.prototype.getUTCMilliseconds);
    var nr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var ir = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var ar = function daysInMonth(t, r) {
        return Lt(new Date(r, t, 0))
    };
    P(Date.prototype, {
        getFullYear: function getFullYear() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError("this is not a Date object.")
            }
            var t = Bt(this);
            if (t < 0 && Xt(this) > 11) {
                return t + 1
            }
            return t
        }, getMonth: function getMonth() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError("this is not a Date object.")
            }
            var t = Bt(this);
            var r = Xt(this);
            if (t < 0 && r > 11) {
                return 0
            }
            return r
        }, getDate: function getDate() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError("this is not a Date object.")
            }
            var t = Bt(this);
            var r = Xt(this);
            var e = Lt(this);
            if (t < 0 && r > 11) {
                if (r === 12) {
                    return e
                }
                var n = ar(0, t + 1);
                return n - e + 1
            }
            return e
        }, getUTCFullYear: function getUTCFullYear() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError("this is not a Date object.")
            }
            var t = qt(this);
            if (t < 0 && Kt(this) > 11) {
                return t + 1
            }
            return t
        }, getUTCMonth: function getUTCMonth() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError("this is not a Date object.")
            }
            var t = qt(this);
            var r = Kt(this);
            if (t < 0 && r > 11) {
                return 0
            }
            return r
        }, getUTCDate: function getUTCDate() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError("this is not a Date object.")
            }
            var t = qt(this);
            var r = Kt(this);
            var e = Qt(this);
            if (t < 0 && r > 11) {
                if (r === 12) {
                    return e
                }
                var n = ar(0, t + 1);
                return n - e + 1
            }
            return e
        }
    }, Jt);
    P(Date.prototype, {
        toUTCString: function toUTCString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError("this is not a Date object.")
            }
            var t = Vt(this);
            var r = Qt(this);
            var e = Kt(this);
            var n = qt(this);
            var i = _t(this);
            var a = tr(this);
            var o = rr(this);
            return nr[t] + ", " + (r < 10 ? "0" + r : r) + " " + ir[e] + " " + n + " " + (i < 10 ? "0" + i : i) + ":" + (a < 10 ? "0" + a : a) + ":" + (o < 10 ? "0" + o : o) + " GMT"
        }
    }, Jt || zt);
    P(Date.prototype, {
        toDateString: function toDateString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError("this is not a Date object.")
            }
            var t = this.getDay();
            var r = this.getDate();
            var e = this.getMonth();
            var n = this.getFullYear();
            return nr[t] + " " + ir[e] + " " + (r < 10 ? "0" + r : r) + " " + n
        }
    }, Jt || Gt);
    if (Jt || Ht) {
        Date.prototype.toString = function toString() {
            if (!this || !(this instanceof Date)) {
                throw new TypeError("this is not a Date object.")
            }
            var t = this.getDay();
            var r = this.getDate();
            var e = this.getMonth();
            var n = this.getFullYear();
            var i = this.getHours();
            var a = this.getMinutes();
            var o = this.getSeconds();
            var f = this.getTimezoneOffset();
            var u = Math.floor(Math.abs(f) / 60);
            var l = Math.floor(Math.abs(f) % 60);
            return nr[t] + " " + ir[e] + " " + (r < 10 ? "0" + r : r) + " " + n + " " + (i < 10 ? "0" + i : i) + ":" + (a < 10 ? "0" + a : a) + ":" + (o < 10 ? "0" + o : o) + " GMT" + (f > 0 ? "-" : "+") + (u < 10 ? "0" + u : u) + (l < 10 ? "0" + l : l)
        };
        if (R) {
            e.defineProperty(Date.prototype, "toString", {configurable: true, enumerable: false, writable: true})
        }
    }
    var or = -621987552e5;
    var fr = "-000001";
    var ur = Date.prototype.toISOString && new Date(or).toISOString().indexOf(fr) === -1;
    var lr = Date.prototype.toISOString && new Date(-1).toISOString() !== "1969-12-31T23:59:59.999Z";
    var sr = d.bind(Date.prototype.getTime);
    P(Date.prototype, {
        toISOString: function toISOString() {
            if (!isFinite(this) || !isFinite(sr(this))) {
                throw new RangeError("Date.prototype.toISOString called on non-finite value.")
            }
            var t = qt(this);
            var r = Kt(this);
            t += Math.floor(r / 12);
            r = (r % 12 + 12) % 12;
            var e = [r + 1, Qt(this), _t(this), tr(this), rr(this)];
            t = (t < 0 ? "-" : t > 9999 ? "+" : "") + K("00000" + Math.abs(t), 0 <= t && t <= 9999 ? -4 : -6);
            for (var n = 0; n < e.length; ++n) {
                e[n] = K("00" + e[n], -2)
            }
            return t + "-" + W(e, 0, 2).join("-") + "T" + W(e, 2).join(":") + "." + K("000" + er(this), -3) + "Z"
        }
    }, ur || lr);
    var cr = function () {
        try {
            return Date.prototype.toJSON && new Date(NaN).toJSON() === null && new Date(or).toJSON().indexOf(fr) !== -1 && Date.prototype.toJSON.call({
                toISOString: function () {
                    return true
                }
            })
        } catch (t) {
            return false
        }
    }();
    if (!cr) {
        Date.prototype.toJSON = function toJSON(t) {
            var r = e(this);
            var n = Z.ToPrimitive(r);
            if (typeof n === "number" && !isFinite(n)) {
                return null
            }
            var i = r.toISOString;
            if (!D(i)) {
                throw new TypeError("toISOString property is not callable")
            }
            return i.call(r)
        }
    }
    var vr = Date.parse("+033658-09-27T01:46:40.000Z") === 1e15;
    var hr = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z"));
    var pr = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
    if (pr || hr || !vr) {
        var yr = Math.pow(2, 31) - 1;
        var dr = Y(new Date(1970, 0, 1, 0, 0, 0, yr + 1).getTime());
        Date = function (t) {
            var r = function Date(e, n, i, a, f, u, l) {
                var s = arguments.length;
                var c;
                if (this instanceof t) {
                    var v = u;
                    var h = l;
                    if (dr && s >= 7 && l > yr) {
                        var p = Math.floor(l / yr) * yr;
                        var y = Math.floor(p / 1e3);
                        v += y;
                        h -= y * 1e3
                    }
                    c = s === 1 && o(e) === e ? new t(r.parse(e)) : s >= 7 ? new t(e, n, i, a, f, v, h) : s >= 6 ? new t(e, n, i, a, f, v) : s >= 5 ? new t(e, n, i, a, f) : s >= 4 ? new t(e, n, i, a) : s >= 3 ? new t(e, n, i) : s >= 2 ? new t(e, n) : s >= 1 ? new t(e instanceof t ? +e : e) : new t
                } else {
                    c = t.apply(this, arguments)
                }
                if (!J(c)) {
                    P(c, {constructor: r}, true)
                }
                return c
            };
            var e = new RegExp("^" + "(\\d{4}|[+-]\\d{6})" + "(?:-(\\d{2})" + "(?:-(\\d{2})" + "(?:" + "T(\\d{2})" + ":(\\d{2})" + "(?:" + ":(\\d{2})" + "(?:(\\.\\d{1,}))?" + ")?" + "(" + "Z|" + "(?:" + "([-+])" + "(\\d{2})" + ":(\\d{2})" + ")" + ")?)?)?)?" + "$");
            var n = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
            var i = function dayFromMonth(t, r) {
                var e = r > 1 ? 1 : 0;
                return n[r] + Math.floor((t - 1969 + e) / 4) - Math.floor((t - 1901 + e) / 100) + Math.floor((t - 1601 + e) / 400) + 365 * (t - 1970)
            };
            var a = function toUTC(r) {
                var e = 0;
                var n = r;
                if (dr && n > yr) {
                    var i = Math.floor(n / yr) * yr;
                    var a = Math.floor(i / 1e3);
                    e += a;
                    n -= a * 1e3
                }
                return u(new t(1970, 0, 1, 0, 0, e, n))
            };
            for (var f in t) {
                if (G(t, f)) {
                    r[f] = t[f]
                }
            }
            P(r, {now: t.now, UTC: t.UTC}, true);
            r.prototype = t.prototype;
            P(r.prototype, {constructor: r}, true);
            var l = function parse(r) {
                var n = e.exec(r);
                if (n) {
                    var o = u(n[1]), f = u(n[2] || 1) - 1, l = u(n[3] || 1) - 1, s = u(n[4] || 0), c = u(n[5] || 0),
                        v = u(n[6] || 0), h = Math.floor(u(n[7] || 0) * 1e3), p = Boolean(n[4] && !n[8]),
                        y = n[9] === "-" ? 1 : -1, d = u(n[10] || 0), g = u(n[11] || 0), w;
                    var b = c > 0 || v > 0 || h > 0;
                    if (s < (b ? 24 : 25) && c < 60 && v < 60 && h < 1e3 && f > -1 && f < 12 && d < 24 && g < 60 && l > -1 && l < i(o, f + 1) - i(o, f)) {
                        w = ((i(o, f) + l) * 24 + s + d * y) * 60;
                        w = ((w + c + g * y) * 60 + v) * 1e3 + h;
                        if (p) {
                            w = a(w)
                        }
                        if (-864e13 <= w && w <= 864e13) {
                            return w
                        }
                    }
                    return NaN
                }
                return t.parse.apply(this, arguments)
            };
            P(r, {parse: l});
            return r
        }(Date)
    }
    if (!Date.now) {
        Date.now = function now() {
            return (new Date).getTime()
        }
    }
    var gr = l.toFixed && (8e-5.toFixed(3) !== "0.000" || .9.toFixed(0) !== "1" || 1.255.toFixed(2) !== "1.25" || (1000000000000000128).toFixed(0) !== "1000000000000000128");
    var wr = {
        base: 1e7, size: 6, data: [0, 0, 0, 0, 0, 0], multiply: function multiply(t, r) {
            var e = -1;
            var n = r;
            while (++e < wr.size) {
                n += t * wr.data[e];
                wr.data[e] = n % wr.base;
                n = Math.floor(n / wr.base)
            }
        }, divide: function divide(t) {
            var r = wr.size;
            var e = 0;
            while (--r >= 0) {
                e += wr.data[r];
                wr.data[r] = Math.floor(e / t);
                e = e % t * wr.base
            }
        }, numToString: function numToString() {
            var t = wr.size;
            var r = "";
            while (--t >= 0) {
                if (r !== "" || t === 0 || wr.data[t] !== 0) {
                    var e = o(wr.data[t]);
                    if (r === "") {
                        r = e
                    } else {
                        r += K("0000000", 0, 7 - e.length) + e
                    }
                }
            }
            return r
        }, pow: function pow(t, r, e) {
            return r === 0 ? e : r % 2 === 1 ? pow(t, r - 1, e * t) : pow(t * t, r / 2, e)
        }, log: function log(t) {
            var r = 0;
            var e = t;
            while (e >= 4096) {
                r += 12;
                e /= 4096
            }
            while (e >= 2) {
                r += 1;
                e /= 2
            }
            return r
        }
    };
    var br = function toFixed(t) {
        var r, e, n, i, a, f, l, s;
        r = u(t);
        r = Y(r) ? 0 : Math.floor(r);
        if (r < 0 || r > 20) {
            throw new RangeError("Number.toFixed called with invalid number of decimals")
        }
        e = u(this);
        if (Y(e)) {
            return "NaN"
        }
        if (e <= -1e21 || e >= 1e21) {
            return o(e)
        }
        n = "";
        if (e < 0) {
            n = "-";
            e = -e
        }
        i = "0";
        if (e > 1e-21) {
            a = wr.log(e * wr.pow(2, 69, 1)) - 69;
            f = a < 0 ? e * wr.pow(2, -a, 1) : e / wr.pow(2, a, 1);
            f *= 4503599627370496;
            a = 52 - a;
            if (a > 0) {
                wr.multiply(0, f);
                l = r;
                while (l >= 7) {
                    wr.multiply(1e7, 0);
                    l -= 7
                }
                wr.multiply(wr.pow(10, l, 1), 0);
                l = a - 1;
                while (l >= 23) {
                    wr.divide(1 << 23);
                    l -= 23
                }
                wr.divide(1 << l);
                wr.multiply(1, 1);
                wr.divide(2);
                i = wr.numToString()
            } else {
                wr.multiply(0, f);
                wr.multiply(1 << -a, 0);
                i = wr.numToString() + K("0.00000000000000000000", 2, 2 + r)
            }
        }
        if (r > 0) {
            s = i.length;
            if (s <= r) {
                i = n + K("0.0000000000000000000", 0, r - s + 2) + i
            } else {
                i = n + K(i, 0, s - r) + "." + K(i, s - r)
            }
        } else {
            i = n + i
        }
        return i
    };
    P(l, {toFixed: br}, gr);
    var Tr = function () {
        try {
            return 1..toPrecision(undefined) === "1"
        } catch (t) {
            return true
        }
    }();
    var mr = l.toPrecision;
    P(l, {
        toPrecision: function toPrecision(t) {
            return typeof t === "undefined" ? mr.call(this) : mr.call(this, t)
        }
    }, Tr);
    if ("ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || "tesst".split(/(s)*/)[1] === "t" || "test".split(/(?:)/, -1).length !== 4 || "".split(/.?/).length || ".".split(/()()/).length > 1) {
        (function () {
            var t = typeof /()??/.exec("")[1] === "undefined";
            var r = Math.pow(2, 32) - 1;
            f.split = function (e, n) {
                var i = String(this);
                if (typeof e === "undefined" && n === 0) {
                    return []
                }
                if (!M(e)) {
                    return Q(this, e, n)
                }
                var a = [];
                var o = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""),
                    f = 0, u, l, s, c;
                var h = new RegExp(e.source, o + "g");
                if (!t) {
                    u = new RegExp("^" + h.source + "$(?!\\s)", o)
                }
                var p = typeof n === "undefined" ? r : Z.ToUint32(n);
                l = h.exec(i);
                while (l) {
                    s = l.index + l[0].length;
                    if (s > f) {
                        _(a, K(i, f, l.index));
                        if (!t && l.length > 1) {
                            l[0].replace(u, function () {
                                for (var t = 1; t < arguments.length - 2; t++) {
                                    if (typeof arguments[t] === "undefined") {
                                        l[t] = void 0
                                    }
                                }
                            })
                        }
                        if (l.length > 1 && l.index < i.length) {
                            v.apply(a, W(l, 1))
                        }
                        c = l[0].length;
                        f = s;
                        if (a.length >= p) {
                            break
                        }
                    }
                    if (h.lastIndex === l.index) {
                        h.lastIndex++
                    }
                    l = h.exec(i)
                }
                if (f === i.length) {
                    if (c || !h.test("")) {
                        _(a, "")
                    }
                } else {
                    _(a, K(i, f))
                }
                return a.length > p ? W(a, 0, p) : a
            }
        })()
    } else if ("0".split(void 0, 0).length) {
        f.split = function split(t, r) {
            if (typeof t === "undefined" && r === 0) {
                return []
            }
            return Q(this, t, r)
        }
    }
    var Dr = f.replace;
    var Sr = function () {
        var t = [];
        "x".replace(/x(.)?/g, function (r, e) {
            _(t, e)
        });
        return t.length === 1 && typeof t[0] === "undefined"
    }();
    if (!Sr) {
        f.replace = function replace(t, r) {
            var e = D(r);
            var n = M(t) && /\)[*?]/.test(t.source);
            if (!e || !n) {
                return Dr.call(this, t, r)
            } else {
                var i = function (e) {
                    var n = arguments.length;
                    var i = t.lastIndex;
                    t.lastIndex = 0;
                    var a = t.exec(e) || [];
                    t.lastIndex = i;
                    _(a, arguments[n - 2], arguments[n - 1]);
                    return r.apply(this, a)
                };
                return Dr.call(this, t, i)
            }
        }
    }
    var xr = f.substr;
    var Or = "".substr && "0b".substr(-1) !== "b";
    P(f, {
        substr: function substr(t, r) {
            var e = t;
            if (t < 0) {
                e = w(this.length + t, 0)
            }
            return xr.call(this, e, r)
        }
    }, Or);
    var Er = "\t\n\x0B\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028" + "\u2029\ufeff";
    var jr = "\u200b";
    var Ir = "[" + Er + "]";
    var Mr = new RegExp("^" + Ir + Ir + "*");
    var Ur = new RegExp(Ir + Ir + "*$");
    var Fr = f.trim && (Er.trim() || !jr.trim());
    P(f, {
        trim: function trim() {
            if (typeof this === "undefined" || this === null) {
                throw new TypeError("can't convert " + this + " to object")
            }
            return o(this).replace(Mr, "").replace(Ur, "")
        }
    }, Fr);
    var $r = d.bind(String.prototype.trim);
    var Nr = f.lastIndexOf && "abc\u3042\u3044".lastIndexOf("\u3042\u3044", 2) !== -1;
    P(f, {
        lastIndexOf: function lastIndexOf(t) {
            if (typeof this === "undefined" || this === null) {
                throw new TypeError("can't convert " + this + " to object")
            }
            var r = o(this);
            var e = o(t);
            var n = arguments.length > 1 ? u(arguments[1]) : NaN;
            var i = Y(n) ? Infinity : Z.ToInteger(n);
            var a = b(w(i, 0), r.length);
            var f = e.length;
            var l = a + f;
            while (l > 0) {
                l = w(0, l - f);
                var s = V(K(r, l, a + f), e);
                if (s !== -1) {
                    return l + s
                }
            }
            return -1
        }
    }, Nr);
    var Cr = f.lastIndexOf;
    P(f, {
        lastIndexOf: function lastIndexOf(t) {
            return Cr.apply(this, arguments)
        }
    }, f.lastIndexOf.length !== 1);
    if (parseInt(Er + "08") !== 8 || parseInt(Er + "0x16") !== 22) {
        parseInt = function (t) {
            var r = /^[-+]?0[xX]/;
            return function parseInt(e, n) {
                if (typeof e === "symbol") {
                    "" + e
                }
                var i = $r(String(e));
                var a = u(n) || (r.test(i) ? 16 : 10);
                return t(i, a)
            }
        }(parseInt)
    }
    if (1 / parseFloat("-0") !== -Infinity) {
        parseFloat = function (t) {
            return function parseFloat(r) {
                var e = $r(String(r));
                var n = t(e);
                return n === 0 && K(e, 0, 1) === "-" ? -0 : n
            }
        }(parseFloat)
    }
    if (String(new RangeError("test")) !== "RangeError: test") {
        var kr = function toString() {
            if (typeof this === "undefined" || this === null) {
                throw new TypeError("can't convert " + this + " to object")
            }
            var t = this.name;
            if (typeof t === "undefined") {
                t = "Error"
            } else if (typeof t !== "string") {
                t = o(t)
            }
            var r = this.message;
            if (typeof r === "undefined") {
                r = ""
            } else if (typeof r !== "string") {
                r = o(r)
            }
            if (!t) {
                return r
            }
            if (!r) {
                return t
            }
            return t + ": " + r
        };
        Error.prototype.toString = kr
    }
    if (R) {
        var Ar = function (t, r) {
            if (tt(t, r)) {
                var e = Object.getOwnPropertyDescriptor(t, r);
                if (e.configurable) {
                    e.enumerable = false;
                    Object.defineProperty(t, r, e)
                }
            }
        };
        Ar(Error.prototype, "message");
        if (Error.prototype.message !== "") {
            Error.prototype.message = ""
        }
        Ar(Error.prototype, "name")
    }
    if (String(/a/gim) !== "/a/gim") {
        var Rr = function toString() {
            var t = "/" + this.source + "/";
            if (this.global) {
                t += "g"
            }
            if (this.ignoreCase) {
                t += "i"
            }
            if (this.multiline) {
                t += "m"
            }
            return t
        };
        RegExp.prototype.toString = Rr
    }
});
//# sourceMappingURL=es5-shim.map

/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */
(function (e, t) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(t)
    } else if (typeof exports === "object") {
        module.exports = t()
    } else {
        e.returnExports = t()
    }
})(this, function () {
    var e = Function.call;
    var t = Object.prototype;
    var r = e.bind(t.hasOwnProperty);
    var n = e.bind(t.propertyIsEnumerable);
    var o = e.bind(t.toString);
    var i;
    var c;
    var f;
    var a;
    var l = r(t, "__defineGetter__");
    if (l) {
        i = e.bind(t.__defineGetter__);
        c = e.bind(t.__defineSetter__);
        f = e.bind(t.__lookupGetter__);
        a = e.bind(t.__lookupSetter__)
    }
    var u = function isPrimitive(e) {
        return e == null || typeof e !== "object" && typeof e !== "function"
    };
    if (!Object.getPrototypeOf) {
        Object.getPrototypeOf = function getPrototypeOf(e) {
            var r = e.__proto__;
            if (r || r === null) {
                return r
            } else if (o(e.constructor) === "[object Function]") {
                return e.constructor.prototype
            } else if (e instanceof Object) {
                return t
            } else {
                return null
            }
        }
    }
    var p = function doesGetOwnPropertyDescriptorWork(e) {
        try {
            e.sentinel = 0;
            return Object.getOwnPropertyDescriptor(e, "sentinel").value === 0
        } catch (t) {
            return false
        }
    };
    if (Object.defineProperty) {
        var s = p({});
        var b = typeof document === "undefined" || p(document.createElement("div"));
        if (!b || !s) {
            var O = Object.getOwnPropertyDescriptor
        }
    }
    if (!Object.getOwnPropertyDescriptor || O) {
        var d = "Object.getOwnPropertyDescriptor called on a non-object: ";
        Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(e, o) {
            if (u(e)) {
                throw new TypeError(d + e)
            }
            if (O) {
                try {
                    return O.call(Object, e, o)
                } catch (i) {
                }
            }
            var c;
            if (!r(e, o)) {
                return c
            }
            c = {enumerable: n(e, o), configurable: true};
            if (l) {
                var p = e.__proto__;
                var s = e !== t;
                if (s) {
                    e.__proto__ = t
                }
                var b = f(e, o);
                var y = a(e, o);
                if (s) {
                    e.__proto__ = p
                }
                if (b || y) {
                    if (b) {
                        c.get = b
                    }
                    if (y) {
                        c.set = y
                    }
                    return c
                }
            }
            c.value = e[o];
            c.writable = true;
            return c
        }
    }
    if (!Object.getOwnPropertyNames) {
        Object.getOwnPropertyNames = function getOwnPropertyNames(e) {
            return Object.keys(e)
        }
    }
    if (!Object.create) {
        var y;
        var j = !({__proto__: null} instanceof Object);
        var v = function shouldUseActiveX() {
            if (!document.domain) {
                return false
            }
            try {
                return !!new ActiveXObject("htmlfile")
            } catch (e) {
                return false
            }
        };
        var _ = function getEmptyViaActiveX() {
            var e;
            var t;
            t = new ActiveXObject("htmlfile");
            var r = "script";
            t.write("<" + r + "></" + r + ">");
            t.close();
            e = t.parentWindow.Object.prototype;
            t = null;
            return e
        };
        var w = function getEmptyViaIFrame() {
            var e = document.createElement("iframe");
            var t = document.body || document.documentElement;
            var r;
            e.style.display = "none";
            t.appendChild(e);
            e.src = "javascript:";
            r = e.contentWindow.Object.prototype;
            t.removeChild(e);
            e = null;
            return r
        };
        if (j || typeof document === "undefined") {
            y = function () {
                return {__proto__: null}
            }
        } else {
            y = function () {
                var e = v() ? _() : w();
                delete e.constructor;
                delete e.hasOwnProperty;
                delete e.propertyIsEnumerable;
                delete e.isPrototypeOf;
                delete e.toLocaleString;
                delete e.toString;
                delete e.valueOf;
                var t = function Empty() {
                };
                t.prototype = e;
                y = function () {
                    return new t
                };
                return new t
            }
        }
        Object.create = function create(e, t) {
            var r;
            var n = function Type() {
            };
            if (e === null) {
                r = y()
            } else {
                if (e !== null && u(e)) {
                    throw new TypeError("Object prototype may only be an Object or null")
                }
                n.prototype = e;
                r = new n;
                r.__proto__ = e
            }
            if (t !== void 0) {
                Object.defineProperties(r, t)
            }
            return r
        }
    }
    var m = function doesDefinePropertyWork(e) {
        try {
            Object.defineProperty(e, "sentinel", {});
            return "sentinel" in e
        } catch (t) {
            return false
        }
    };
    if (Object.defineProperty) {
        var P = m({});
        var E = typeof document === "undefined" || m(document.createElement("div"));
        if (!P || !E) {
            var h = Object.defineProperty, g = Object.defineProperties
        }
    }
    if (!Object.defineProperty || h) {
        var z = "Property description must be an object: ";
        var T = "Object.defineProperty called on non-object: ";
        var x = "getters & setters can not be defined on this javascript engine";
        Object.defineProperty = function defineProperty(e, r, n) {
            if (u(e)) {
                throw new TypeError(T + e)
            }
            if (u(n)) {
                throw new TypeError(z + n)
            }
            if (h) {
                try {
                    return h.call(Object, e, r, n)
                } catch (o) {
                }
            }
            if ("value" in n) {
                if (l && (f(e, r) || a(e, r))) {
                    var p = e.__proto__;
                    e.__proto__ = t;
                    delete e[r];
                    e[r] = n.value;
                    e.__proto__ = p
                } else {
                    e[r] = n.value
                }
            } else {
                var s = "get" in n;
                var b = "set" in n;
                if (!l && (s || b)) {
                    throw new TypeError(x)
                }
                if (s) {
                    i(e, r, n.get)
                }
                if (b) {
                    c(e, r, n.set)
                }
            }
            return e
        }
    }
    if (!Object.defineProperties || g) {
        Object.defineProperties = function defineProperties(e, t) {
            if (g) {
                try {
                    return g.call(Object, e, t)
                } catch (r) {
                }
            }
            Object.keys(t).forEach(function (r) {
                if (r !== "__proto__") {
                    Object.defineProperty(e, r, t[r])
                }
            });
            return e
        }
    }
    if (!Object.seal) {
        Object.seal = function seal(e) {
            if (Object(e) !== e) {
                throw new TypeError("Object.seal can only be called on Objects.")
            }
            return e
        }
    }
    if (!Object.freeze) {
        Object.freeze = function freeze(e) {
            if (Object(e) !== e) {
                throw new TypeError("Object.freeze can only be called on Objects.")
            }
            return e
        }
    }
    try {
        Object.freeze(function () {
        })
    } catch (S) {
        Object.freeze = function (e) {
            return function freeze(t) {
                if (typeof t === "function") {
                    return t
                } else {
                    return e(t)
                }
            }
        }(Object.freeze)
    }
    if (!Object.preventExtensions) {
        Object.preventExtensions = function preventExtensions(e) {
            if (Object(e) !== e) {
                throw new TypeError("Object.preventExtensions can only be called on Objects.")
            }
            return e
        }
    }
    if (!Object.isSealed) {
        Object.isSealed = function isSealed(e) {
            if (Object(e) !== e) {
                throw new TypeError("Object.isSealed can only be called on Objects.")
            }
            return false
        }
    }
    if (!Object.isFrozen) {
        Object.isFrozen = function isFrozen(e) {
            if (Object(e) !== e) {
                throw new TypeError("Object.isFrozen can only be called on Objects.")
            }
            return false
        }
    }
    if (!Object.isExtensible) {
        Object.isExtensible = function isExtensible(e) {
            if (Object(e) !== e) {
                throw new TypeError("Object.isExtensible can only be called on Objects.")
            }
            var t = "";
            while (r(e, t)) {
                t += "?"
            }
            e[t] = true;
            var n = r(e, t);
            delete e[t];
            return n
        }
    }
});
//# sourceMappingURL=es5-sham.map

/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
(function () {
    function N(p, r) {
        function q(a) {
            if (q[a] !== w) return q[a];
            var c;
            if ("bug-string-char-index" == a) c = "a" != "a"[0]; else if ("json" == a) c = q("json-stringify") && q("json-parse"); else {
                var e;
                if ("json-stringify" == a) {
                    c = r.stringify;
                    var b = "function" == typeof c && s;
                    if (b) {
                        (e = function () {
                            return 1
                        }).toJSON = e;
                        try {
                            b = "0" === c(0) && "0" === c(new t) && '""' == c(new A) && c(u) === w && c(w) === w && c() === w && "1" === c(e) && "[1]" == c([e]) && "[null]" == c([w]) && "null" == c(null) && "[null,null,null]" == c([w, u, null]) && '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}' ==
                                c({a: [e, !0, !1, null, "\x00\b\n\f\r\t"]}) && "1" === c(null, e) && "[\n 1,\n 2\n]" == c([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == c(new C(-864E13)) && '"+275760-09-13T00:00:00.000Z"' == c(new C(864E13)) && '"-000001-01-01T00:00:00.000Z"' == c(new C(-621987552E5)) && '"1969-12-31T23:59:59.999Z"' == c(new C(-1))
                        } catch (f) {
                            b = !1
                        }
                    }
                    c = b
                }
                if ("json-parse" == a) {
                    c = r.parse;
                    if ("function" == typeof c) try {
                        if (0 === c("0") && !c(!1)) {
                            e = c('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');
                            var n = 5 == e.a.length && 1 === e.a[0];
                            if (n) {
                                try {
                                    n = !c('"\t"')
                                } catch (d) {
                                }
                                if (n) try {
                                    n =
                                        1 !== c("01")
                                } catch (g) {
                                }
                                if (n) try {
                                    n = 1 !== c("1.")
                                } catch (m) {
                                }
                            }
                        }
                    } catch (X) {
                        n = !1
                    }
                    c = n
                }
            }
            return q[a] = !!c
        }

        p || (p = k.Object());
        r || (r = k.Object());
        var t = p.Number || k.Number, A = p.String || k.String, H = p.Object || k.Object, C = p.Date || k.Date,
            G = p.SyntaxError || k.SyntaxError, K = p.TypeError || k.TypeError, L = p.Math || k.Math,
            I = p.JSON || k.JSON;
        "object" == typeof I && I && (r.stringify = I.stringify, r.parse = I.parse);
        var H = H.prototype, u = H.toString, v, B, w, s = new C(-0xc782b5b800cec);
        try {
            s = -109252 == s.getUTCFullYear() && 0 === s.getUTCMonth() && 1 === s.getUTCDate() &&
                10 == s.getUTCHours() && 37 == s.getUTCMinutes() && 6 == s.getUTCSeconds() && 708 == s.getUTCMilliseconds()
        } catch (Q) {
        }
        if (!q("json")) {
            var D = q("bug-string-char-index");
            if (!s) var x = L.floor, M = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], E = function (a, c) {
                return M[c] + 365 * (a - 1970) + x((a - 1969 + (c = +(1 < c))) / 4) - x((a - 1901 + c) / 100) + x((a - 1601 + c) / 400)
            };
            (v = H.hasOwnProperty) || (v = function (a) {
                var c = {}, e;
                (c.__proto__ = null, c.__proto__ = {toString: 1}, c).toString != u ? v = function (a) {
                    var c = this.__proto__;
                    a = a in (this.__proto__ = null, this);
                    this.__proto__ =
                        c;
                    return a
                } : (e = c.constructor, v = function (a) {
                    var c = (this.constructor || e).prototype;
                    return a in this && !(a in c && this[a] === c[a])
                });
                c = null;
                return v.call(this, a)
            });
            B = function (a, c) {
                var e = 0, b, f, n;
                (b = function () {
                    this.valueOf = 0
                }).prototype.valueOf = 0;
                f = new b;
                for (n in f) v.call(f, n) && e++;
                b = f = null;
                e ? B = 2 == e ? function (a, c) {
                    var e = {}, b = "[object Function]" == u.call(a), f;
                    for (f in a) b && "prototype" == f || v.call(e, f) || !(e[f] = 1) || !v.call(a, f) || c(f)
                } : function (a, c) {
                    var e = "[object Function]" == u.call(a), b, f;
                    for (b in a) e && "prototype" ==
                    b || !v.call(a, b) || (f = "constructor" === b) || c(b);
                    (f || v.call(a, b = "constructor")) && c(b)
                } : (f = "valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "), B = function (a, c) {
                    var e = "[object Function]" == u.call(a), b,
                        h = !e && "function" != typeof a.constructor && F[typeof a.hasOwnProperty] && a.hasOwnProperty || v;
                    for (b in a) e && "prototype" == b || !h.call(a, b) || c(b);
                    for (e = f.length; b = f[--e]; h.call(a, b) && c(b)) ;
                });
                return B(a, c)
            };
            if (!q("json-stringify")) {
                var U = {
                    92: "\\\\", 34: '\\"', 8: "\\b",
                    12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t"
                }, y = function (a, c) {
                    return ("000000" + (c || 0)).slice(-a)
                }, R = function (a) {
                    for (var c = '"', b = 0, h = a.length, f = !D || 10 < h, n = f && (D ? a.split("") : a); b < h; b++) {
                        var d = a.charCodeAt(b);
                        switch (d) {
                            case 8:
                            case 9:
                            case 10:
                            case 12:
                            case 13:
                            case 34:
                            case 92:
                                c += U[d];
                                break;
                            default:
                                if (32 > d) {
                                    c += "\\u00" + y(2, d.toString(16));
                                    break
                                }
                                c += f ? n[b] : a.charAt(b)
                        }
                    }
                    return c + '"'
                }, O = function (a, c, b, h, f, n, d) {
                    var g, m, k, l, p, r, s, t, q;
                    try {
                        g = c[a]
                    } catch (z) {
                    }
                    if ("object" == typeof g && g) if (m = u.call(g), "[object Date]" != m || v.call(g,
                        "toJSON")) "function" == typeof g.toJSON && ("[object Number]" != m && "[object String]" != m && "[object Array]" != m || v.call(g, "toJSON")) && (g = g.toJSON(a)); else if (g > -1 / 0 && g < 1 / 0) {
                        if (E) {
                            l = x(g / 864E5);
                            for (m = x(l / 365.2425) + 1970 - 1; E(m + 1, 0) <= l; m++) ;
                            for (k = x((l - E(m, 0)) / 30.42); E(m, k + 1) <= l; k++) ;
                            l = 1 + l - E(m, k);
                            p = (g % 864E5 + 864E5) % 864E5;
                            r = x(p / 36E5) % 24;
                            s = x(p / 6E4) % 60;
                            t = x(p / 1E3) % 60;
                            p %= 1E3
                        } else m = g.getUTCFullYear(), k = g.getUTCMonth(), l = g.getUTCDate(), r = g.getUTCHours(), s = g.getUTCMinutes(), t = g.getUTCSeconds(), p = g.getUTCMilliseconds();
                        g = (0 >= m || 1E4 <= m ? (0 > m ? "-" : "+") + y(6, 0 > m ? -m : m) : y(4, m)) + "-" + y(2, k + 1) + "-" + y(2, l) + "T" + y(2, r) + ":" + y(2, s) + ":" + y(2, t) + "." + y(3, p) + "Z"
                    } else g = null;
                    b && (g = b.call(c, a, g));
                    if (null === g) return "null";
                    m = u.call(g);
                    if ("[object Boolean]" == m) return "" + g;
                    if ("[object Number]" == m) return g > -1 / 0 && g < 1 / 0 ? "" + g : "null";
                    if ("[object String]" == m) return R("" + g);
                    if ("object" == typeof g) {
                        for (a = d.length; a--;) if (d[a] === g) throw K();
                        d.push(g);
                        q = [];
                        c = n;
                        n += f;
                        if ("[object Array]" == m) {
                            k = 0;
                            for (a = g.length; k < a; k++) m = O(k, g, b, h, f, n, d), q.push(m === w ? "null" :
                                m);
                            a = q.length ? f ? "[\n" + n + q.join(",\n" + n) + "\n" + c + "]" : "[" + q.join(",") + "]" : "[]"
                        } else B(h || g, function (a) {
                            var c = O(a, g, b, h, f, n, d);
                            c !== w && q.push(R(a) + ":" + (f ? " " : "") + c)
                        }), a = q.length ? f ? "{\n" + n + q.join(",\n" + n) + "\n" + c + "}" : "{" + q.join(",") + "}" : "{}";
                        d.pop();
                        return a
                    }
                };
                r.stringify = function (a, c, b) {
                    var h, f, n, d;
                    if (F[typeof c] && c) if ("[object Function]" == (d = u.call(c))) f = c; else if ("[object Array]" == d) {
                        n = {};
                        for (var g = 0, k = c.length, l; g < k; l = c[g++], (d = u.call(l), "[object String]" == d || "[object Number]" == d) && (n[l] = 1)) ;
                    }
                    if (b) if ("[object Number]" ==
                        (d = u.call(b))) {
                        if (0 < (b -= b % 1)) for (h = "", 10 < b && (b = 10); h.length < b; h += " ") ;
                    } else "[object String]" == d && (h = 10 >= b.length ? b : b.slice(0, 10));
                    return O("", (l = {}, l[""] = a, l), f, n, h, "", [])
                }
            }
            if (!q("json-parse")) {
                var V = A.fromCharCode,
                    W = {92: "\\", 34: '"', 47: "/", 98: "\b", 116: "\t", 110: "\n", 102: "\f", 114: "\r"}, b, J,
                    l = function () {
                        b = J = null;
                        throw G();
                    }, z = function () {
                        for (var a = J, c = a.length, e, h, f, k, d; b < c;) switch (d = a.charCodeAt(b), d) {
                            case 9:
                            case 10:
                            case 13:
                            case 32:
                                b++;
                                break;
                            case 123:
                            case 125:
                            case 91:
                            case 93:
                            case 58:
                            case 44:
                                return e =
                                    D ? a.charAt(b) : a[b], b++, e;
                            case 34:
                                e = "@";
                                for (b++; b < c;) if (d = a.charCodeAt(b), 32 > d) l(); else if (92 == d) switch (d = a.charCodeAt(++b), d) {
                                    case 92:
                                    case 34:
                                    case 47:
                                    case 98:
                                    case 116:
                                    case 110:
                                    case 102:
                                    case 114:
                                        e += W[d];
                                        b++;
                                        break;
                                    case 117:
                                        h = ++b;
                                        for (f = b + 4; b < f; b++) d = a.charCodeAt(b), 48 <= d && 57 >= d || 97 <= d && 102 >= d || 65 <= d && 70 >= d || l();
                                        e += V("0x" + a.slice(h, b));
                                        break;
                                    default:
                                        l()
                                } else {
                                    if (34 == d) break;
                                    d = a.charCodeAt(b);
                                    for (h = b; 32 <= d && 92 != d && 34 != d;) d = a.charCodeAt(++b);
                                    e += a.slice(h, b)
                                }
                                if (34 == a.charCodeAt(b)) return b++, e;
                                l();
                            default:
                                h =
                                    b;
                                45 == d && (k = !0, d = a.charCodeAt(++b));
                                if (48 <= d && 57 >= d) {
                                    for (48 == d && (d = a.charCodeAt(b + 1), 48 <= d && 57 >= d) && l(); b < c && (d = a.charCodeAt(b), 48 <= d && 57 >= d); b++) ;
                                    if (46 == a.charCodeAt(b)) {
                                        for (f = ++b; f < c && (d = a.charCodeAt(f), 48 <= d && 57 >= d); f++) ;
                                        f == b && l();
                                        b = f
                                    }
                                    d = a.charCodeAt(b);
                                    if (101 == d || 69 == d) {
                                        d = a.charCodeAt(++b);
                                        43 != d && 45 != d || b++;
                                        for (f = b; f < c && (d = a.charCodeAt(f), 48 <= d && 57 >= d); f++) ;
                                        f == b && l();
                                        b = f
                                    }
                                    return +a.slice(h, b)
                                }
                                k && l();
                                if ("true" == a.slice(b, b + 4)) return b += 4, !0;
                                if ("false" == a.slice(b, b + 5)) return b += 5, !1;
                                if ("null" == a.slice(b,
                                    b + 4)) return b += 4, null;
                                l()
                        }
                        return "$"
                    }, P = function (a) {
                        var c, b;
                        "$" == a && l();
                        if ("string" == typeof a) {
                            if ("@" == (D ? a.charAt(0) : a[0])) return a.slice(1);
                            if ("[" == a) {
                                for (c = []; ; b || (b = !0)) {
                                    a = z();
                                    if ("]" == a) break;
                                    b && ("," == a ? (a = z(), "]" == a && l()) : l());
                                    "," == a && l();
                                    c.push(P(a))
                                }
                                return c
                            }
                            if ("{" == a) {
                                for (c = {}; ; b || (b = !0)) {
                                    a = z();
                                    if ("}" == a) break;
                                    b && ("," == a ? (a = z(), "}" == a && l()) : l());
                                    "," != a && "string" == typeof a && "@" == (D ? a.charAt(0) : a[0]) && ":" == z() || l();
                                    c[a.slice(1)] = P(z())
                                }
                                return c
                            }
                            l()
                        }
                        return a
                    }, T = function (a, b, e) {
                        e = S(a, b, e);
                        e ===
                        w ? delete a[b] : a[b] = e
                    }, S = function (a, b, e) {
                        var h = a[b], f;
                        if ("object" == typeof h && h) if ("[object Array]" == u.call(h)) for (f = h.length; f--;) T(h, f, e); else B(h, function (a) {
                            T(h, a, e)
                        });
                        return e.call(a, b, h)
                    };
                r.parse = function (a, c) {
                    var e, h;
                    b = 0;
                    J = "" + a;
                    e = P(z());
                    "$" != z() && l();
                    b = J = null;
                    return c && "[object Function]" == u.call(c) ? S((h = {}, h[""] = e, h), "", c) : e
                }
            }
        }
        r.runInContext = N;
        return r
    }

    var K = typeof define === "function" && define.amd, F = {"function": !0, object: !0},
        G = F[typeof exports] && exports && !exports.nodeType && exports, k = F[typeof window] &&
        window || this, t = G && F[typeof module] && module && !module.nodeType && "object" == typeof global && global;
    !t || t.global !== t && t.window !== t && t.self !== t || (k = t);
    if (G && !K) N(k, G); else {
        var L = k.JSON, Q = k.JSON3, M = !1, A = N(k, k.JSON3 = {
            noConflict: function () {
                M || (M = !0, k.JSON = L, k.JSON3 = Q, L = Q = null);
                return A
            }
        });
        k.JSON = {parse: A.parse, stringify: A.stringify}
    }
    K && define(function () {
        return A
    })
}).call(this);
/*!
 * https://github.com/paulmillr/es6-shim
 * @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com)
 *   and contributors,  MIT License
 * es6-shim: v0.35.4
 * see https://github.com/paulmillr/es6-shim/blob/0.35.3/LICENSE
 * Details and documentation:
 * https://github.com/paulmillr/es6-shim/
 */
(function (e, t) {
    if (typeof define === "function" && define.amd) {
        define(t)
    } else if (typeof exports === "object") {
        module.exports = t()
    } else {
        e.returnExports = t()
    }
})(this, function () {
    "use strict";
    var e = Function.call.bind(Function.apply);
    var t = Function.call.bind(Function.call);
    var r = Array.isArray;
    var n = Object.keys;
    var o = function notThunker(t) {
        return function notThunk() {
            return !e(t, this, arguments)
        }
    };
    var i = function (e) {
        try {
            e();
            return false
        } catch (t) {
            return true
        }
    };
    var a = function valueOrFalseIfThrows(e) {
        try {
            return e()
        } catch (t) {
            return false
        }
    };
    var u = o(i);
    var f = function () {
        return !i(function () {
            return Object.defineProperty({}, "x", {
                get: function () {
                }
            })
        })
    };
    var s = !!Object.defineProperty && f();
    var c = function foo() {
    }.name === "foo";
    var l = Function.call.bind(Array.prototype.forEach);
    var p = Function.call.bind(Array.prototype.reduce);
    var v = Function.call.bind(Array.prototype.filter);
    var y = Function.call.bind(Array.prototype.some);
    var h = function (e, t, r, n) {
        if (!n && t in e) {
            return
        }
        if (s) {
            Object.defineProperty(e, t, {configurable: true, enumerable: false, writable: true, value: r})
        } else {
            e[t] = r
        }
    };
    var b = function (e, t, r) {
        l(n(t), function (n) {
            var o = t[n];
            h(e, n, o, !!r)
        })
    };
    var g = Function.call.bind(Object.prototype.toString);
    var d = typeof /abc/ === "function" ? function IsCallableSlow(e) {
        return typeof e === "function" && g(e) === "[object Function]"
    } : function IsCallableFast(e) {
        return typeof e === "function"
    };
    var m = {
        getter: function (e, t, r) {
            if (!s) {
                throw new TypeError("getters require true ES5 support")
            }
            Object.defineProperty(e, t, {configurable: true, enumerable: false, get: r})
        }, proxy: function (e, t, r) {
            if (!s) {
                throw new TypeError("getters require true ES5 support")
            }
            var n = Object.getOwnPropertyDescriptor(e, t);
            Object.defineProperty(r, t, {
                configurable: n.configurable,
                enumerable: n.enumerable,
                get: function getKey() {
                    return e[t]
                },
                set: function setKey(r) {
                    e[t] = r
                }
            })
        }, redefine: function (e, t, r) {
            if (s) {
                var n = Object.getOwnPropertyDescriptor(e, t);
                n.value = r;
                Object.defineProperty(e, t, n)
            } else {
                e[t] = r
            }
        }, defineByDescriptor: function (e, t, r) {
            if (s) {
                Object.defineProperty(e, t, r)
            } else if ("value" in r) {
                e[t] = r.value
            }
        }, preserveToString: function (e, t) {
            if (t && d(t.toString)) {
                h(e, "toString", t.toString.bind(t), true)
            }
        }
    };
    var O = Object.create || function (e, t) {
        var r = function Prototype() {
        };
        r.prototype = e;
        var o = new r;
        if (typeof t !== "undefined") {
            n(t).forEach(function (e) {
                m.defineByDescriptor(o, e, t[e])
            })
        }
        return o
    };
    var w = function (e, t) {
        if (!Object.setPrototypeOf) {
            return false
        }
        return a(function () {
            var r = function Subclass(t) {
                var r = new e(t);
                Object.setPrototypeOf(r, Subclass.prototype);
                return r
            };
            Object.setPrototypeOf(r, e);
            r.prototype = O(e.prototype, {constructor: {value: r}});
            return t(r)
        })
    };
    var j = function () {
        if (typeof self !== "undefined") {
            return self
        }
        if (typeof window !== "undefined") {
            return window
        }
        if (typeof global !== "undefined") {
            return global
        }
        throw new Error("unable to locate global object")
    };
    var S = j();
    var T = S.isFinite;
    var I = Function.call.bind(String.prototype.indexOf);
    var E = Function.apply.bind(Array.prototype.indexOf);
    var P = Function.call.bind(Array.prototype.concat);
    var C = Function.call.bind(String.prototype.slice);
    var M = Function.call.bind(Array.prototype.push);
    var x = Function.apply.bind(Array.prototype.push);
    var N = Function.call.bind(Array.prototype.shift);
    var A = Math.max;
    var R = Math.min;
    var _ = Math.floor;
    var k = Math.abs;
    var L = Math.exp;
    var F = Math.log;
    var D = Math.sqrt;
    var z = Function.call.bind(Object.prototype.hasOwnProperty);
    var q;
    var W = function () {
    };
    var G = S.Map;
    var H = G && G.prototype["delete"];
    var V = G && G.prototype.get;
    var B = G && G.prototype.has;
    var U = G && G.prototype.set;
    var $ = S.Symbol || {};
    var J = $.species || "@@species";
    var X = Number.isNaN || function isNaN(e) {
        return e !== e
    };
    var K = Number.isFinite || function isFinite(e) {
        return typeof e === "number" && T(e)
    };
    var Z = d(Math.sign) ? Math.sign : function sign(e) {
        var t = Number(e);
        if (t === 0) {
            return t
        }
        if (X(t)) {
            return t
        }
        return t < 0 ? -1 : 1
    };
    var Y = function log1p(e) {
        var t = Number(e);
        if (t < -1 || X(t)) {
            return NaN
        }
        if (t === 0 || t === Infinity) {
            return t
        }
        if (t === -1) {
            return -Infinity
        }
        return 1 + t - 1 === 0 ? t : t * (F(1 + t) / (1 + t - 1))
    };
    var Q = function isArguments(e) {
        return g(e) === "[object Arguments]"
    };
    var ee = function isArguments(e) {
        return e !== null && typeof e === "object" && typeof e.length === "number" && e.length >= 0 && g(e) !== "[object Array]" && g(e.callee) === "[object Function]"
    };
    var te = Q(arguments) ? Q : ee;
    var re = {
        primitive: function (e) {
            return e === null || typeof e !== "function" && typeof e !== "object"
        }, string: function (e) {
            return g(e) === "[object String]"
        }, regex: function (e) {
            return g(e) === "[object RegExp]"
        }, symbol: function (e) {
            return typeof S.Symbol === "function" && typeof e === "symbol"
        }
    };
    var ne = function overrideNative(e, t, r) {
        var n = e[t];
        h(e, t, r, true);
        m.preserveToString(e[t], n)
    };
    var oe = typeof $ === "function" && typeof $["for"] === "function" && re.symbol($());
    var ie = re.symbol($.iterator) ? $.iterator : "_es6-shim iterator_";
    if (S.Set && typeof (new S.Set)["@@iterator"] === "function") {
        ie = "@@iterator"
    }
    if (!S.Reflect) {
        h(S, "Reflect", {}, true)
    }
    var ae = S.Reflect;
    var ue = String;
    var fe = typeof document === "undefined" || !document ? null : document.all;
    var se = fe == null ? function isNullOrUndefined(e) {
        return e == null
    } : function isNullOrUndefinedAndNotDocumentAll(e) {
        return e == null && e !== fe
    };
    var ce = {
        Call: function Call(t, r) {
            var n = arguments.length > 2 ? arguments[2] : [];
            if (!ce.IsCallable(t)) {
                throw new TypeError(t + " is not a function")
            }
            return e(t, r, n)
        }, RequireObjectCoercible: function (e, t) {
            if (se(e)) {
                throw new TypeError(t || "Cannot call method on " + e)
            }
            return e
        }, TypeIsObject: function (e) {
            if (e === void 0 || e === null || e === true || e === false) {
                return false
            }
            return typeof e === "function" || typeof e === "object" || e === fe
        }, ToObject: function (e, t) {
            return Object(ce.RequireObjectCoercible(e, t))
        }, IsCallable: d, IsConstructor: function (e) {
            return ce.IsCallable(e)
        }, ToInt32: function (e) {
            return ce.ToNumber(e) >> 0
        }, ToUint32: function (e) {
            return ce.ToNumber(e) >>> 0
        }, ToNumber: function (e) {
            if (g(e) === "[object Symbol]") {
                throw new TypeError("Cannot convert a Symbol value to a number")
            }
            return +e
        }, ToInteger: function (e) {
            var t = ce.ToNumber(e);
            if (X(t)) {
                return 0
            }
            if (t === 0 || !K(t)) {
                return t
            }
            return (t > 0 ? 1 : -1) * _(k(t))
        }, ToLength: function (e) {
            var t = ce.ToInteger(e);
            if (t <= 0) {
                return 0
            }
            if (t > Number.MAX_SAFE_INTEGER) {
                return Number.MAX_SAFE_INTEGER
            }
            return t
        }, SameValue: function (e, t) {
            if (e === t) {
                if (e === 0) {
                    return 1 / e === 1 / t
                }
                return true
            }
            return X(e) && X(t)
        }, SameValueZero: function (e, t) {
            return e === t || X(e) && X(t)
        }, IsIterable: function (e) {
            return ce.TypeIsObject(e) && (typeof e[ie] !== "undefined" || te(e))
        }, GetIterator: function (e) {
            if (te(e)) {
                return new q(e, "value")
            }
            var t = ce.GetMethod(e, ie);
            if (!ce.IsCallable(t)) {
                throw new TypeError("value is not an iterable")
            }
            var r = ce.Call(t, e);
            if (!ce.TypeIsObject(r)) {
                throw new TypeError("bad iterator")
            }
            return r
        }, GetMethod: function (e, t) {
            var r = ce.ToObject(e)[t];
            if (se(r)) {
                return void 0
            }
            if (!ce.IsCallable(r)) {
                throw new TypeError("Method not callable: " + t)
            }
            return r
        }, IteratorComplete: function (e) {
            return !!e.done
        }, IteratorClose: function (e, t) {
            var r = ce.GetMethod(e, "return");
            if (r === void 0) {
                return
            }
            var n, o;
            try {
                n = ce.Call(r, e)
            } catch (i) {
                o = i
            }
            if (t) {
                return
            }
            if (o) {
                throw o
            }
            if (!ce.TypeIsObject(n)) {
                throw new TypeError("Iterator's return method returned a non-object.")
            }
        }, IteratorNext: function (e) {
            var t = arguments.length > 1 ? e.next(arguments[1]) : e.next();
            if (!ce.TypeIsObject(t)) {
                throw new TypeError("bad iterator")
            }
            return t
        }, IteratorStep: function (e) {
            var t = ce.IteratorNext(e);
            var r = ce.IteratorComplete(t);
            return r ? false : t
        }, Construct: function (e, t, r, n) {
            var o = typeof r === "undefined" ? e : r;
            if (!n && ae.construct) {
                return ae.construct(e, t, o)
            }
            var i = o.prototype;
            if (!ce.TypeIsObject(i)) {
                i = Object.prototype
            }
            var a = O(i);
            var u = ce.Call(e, a, t);
            return ce.TypeIsObject(u) ? u : a
        }, SpeciesConstructor: function (e, t) {
            var r = e.constructor;
            if (r === void 0) {
                return t
            }
            if (!ce.TypeIsObject(r)) {
                throw new TypeError("Bad constructor")
            }
            var n = r[J];
            if (se(n)) {
                return t
            }
            if (!ce.IsConstructor(n)) {
                throw new TypeError("Bad @@species")
            }
            return n
        }, CreateHTML: function (e, t, r, n) {
            var o = ce.ToString(e);
            var i = "<" + t;
            if (r !== "") {
                var a = ce.ToString(n);
                var u = a.replace(/"/g, "&quot;");
                i += " " + r + '="' + u + '"'
            }
            var f = i + ">";
            var s = f + o;
            return s + "</" + t + ">"
        }, IsRegExp: function IsRegExp(e) {
            if (!ce.TypeIsObject(e)) {
                return false
            }
            var t = e[$.match];
            if (typeof t !== "undefined") {
                return !!t
            }
            return re.regex(e)
        }, ToString: function ToString(e) {
            return ue(e)
        }
    };
    if (s && oe) {
        var le = function defineWellKnownSymbol(e) {
            if (re.symbol($[e])) {
                return $[e]
            }
            var t = $["for"]("Symbol." + e);
            Object.defineProperty($, e, {configurable: false, enumerable: false, writable: false, value: t});
            return t
        };
        if (!re.symbol($.search)) {
            var pe = le("search");
            var ve = String.prototype.search;
            h(RegExp.prototype, pe, function search(e) {
                return ce.Call(ve, e, [this])
            });
            var ye = function search(e) {
                var t = ce.RequireObjectCoercible(this);
                if (!se(e)) {
                    var r = ce.GetMethod(e, pe);
                    if (typeof r !== "undefined") {
                        return ce.Call(r, e, [t])
                    }
                }
                return ce.Call(ve, t, [ce.ToString(e)])
            };
            ne(String.prototype, "search", ye)
        }
        if (!re.symbol($.replace)) {
            var he = le("replace");
            var be = String.prototype.replace;
            h(RegExp.prototype, he, function replace(e, t) {
                return ce.Call(be, e, [this, t])
            });
            var ge = function replace(e, t) {
                var r = ce.RequireObjectCoercible(this);
                if (!se(e)) {
                    var n = ce.GetMethod(e, he);
                    if (typeof n !== "undefined") {
                        return ce.Call(n, e, [r, t])
                    }
                }
                return ce.Call(be, r, [ce.ToString(e), t])
            };
            ne(String.prototype, "replace", ge)
        }
        if (!re.symbol($.split)) {
            var de = le("split");
            var me = String.prototype.split;
            h(RegExp.prototype, de, function split(e, t) {
                return ce.Call(me, e, [this, t])
            });
            var Oe = function split(e, t) {
                var r = ce.RequireObjectCoercible(this);
                if (!se(e)) {
                    var n = ce.GetMethod(e, de);
                    if (typeof n !== "undefined") {
                        return ce.Call(n, e, [r, t])
                    }
                }
                return ce.Call(me, r, [ce.ToString(e), t])
            };
            ne(String.prototype, "split", Oe)
        }
        var we = re.symbol($.match);
        var je = we && function () {
            var e = {};
            e[$.match] = function () {
                return 42
            };
            return "a".match(e) !== 42
        }();
        if (!we || je) {
            var Se = le("match");
            var Te = String.prototype.match;
            h(RegExp.prototype, Se, function match(e) {
                return ce.Call(Te, e, [this])
            });
            var Ie = function match(e) {
                var t = ce.RequireObjectCoercible(this);
                if (!se(e)) {
                    var r = ce.GetMethod(e, Se);
                    if (typeof r !== "undefined") {
                        return ce.Call(r, e, [t])
                    }
                }
                return ce.Call(Te, t, [ce.ToString(e)])
            };
            ne(String.prototype, "match", Ie)
        }
    }
    var Ee = function wrapConstructor(e, t, r) {
        m.preserveToString(t, e);
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(e, t)
        }
        if (s) {
            l(Object.getOwnPropertyNames(e), function (n) {
                if (n in W || r[n]) {
                    return
                }
                m.proxy(e, n, t)
            })
        } else {
            l(Object.keys(e), function (n) {
                if (n in W || r[n]) {
                    return
                }
                t[n] = e[n]
            })
        }
        t.prototype = e.prototype;
        m.redefine(e.prototype, "constructor", t)
    };
    var Pe = function () {
        return this
    };
    var Ce = function (e) {
        if (s && !z(e, J)) {
            m.getter(e, J, Pe)
        }
    };
    var Me = function (e, t) {
        var r = t || function iterator() {
            return this
        };
        h(e, ie, r);
        if (!e[ie] && re.symbol(ie)) {
            e[ie] = r
        }
    };
    var xe = function createDataProperty(e, t, r) {
        if (s) {
            Object.defineProperty(e, t, {configurable: true, enumerable: true, writable: true, value: r})
        } else {
            e[t] = r
        }
    };
    var Ne = function createDataPropertyOrThrow(e, t, r) {
        xe(e, t, r);
        if (!ce.SameValue(e[t], r)) {
            throw new TypeError("property is nonconfigurable")
        }
    };
    var Ae = function (e, t, r, n) {
        if (!ce.TypeIsObject(e)) {
            throw new TypeError("Constructor requires `new`: " + t.name)
        }
        var o = t.prototype;
        if (!ce.TypeIsObject(o)) {
            o = r
        }
        var i = O(o);
        for (var a in n) {
            if (z(n, a)) {
                var u = n[a];
                h(i, a, u, true)
            }
        }
        return i
    };
    if (String.fromCodePoint && String.fromCodePoint.length !== 1) {
        var Re = String.fromCodePoint;
        ne(String, "fromCodePoint", function fromCodePoint(e) {
            return ce.Call(Re, this, arguments)
        })
    }
    var _e = {
        fromCodePoint: function fromCodePoint(e) {
            var t = [];
            var r;
            for (var n = 0, o = arguments.length; n < o; n++) {
                r = Number(arguments[n]);
                if (!ce.SameValue(r, ce.ToInteger(r)) || r < 0 || r > 1114111) {
                    throw new RangeError("Invalid code point " + r)
                }
                if (r < 65536) {
                    M(t, String.fromCharCode(r))
                } else {
                    r -= 65536;
                    M(t, String.fromCharCode((r >> 10) + 55296));
                    M(t, String.fromCharCode(r % 1024 + 56320))
                }
            }
            return t.join("")
        }, raw: function raw(e) {
            var t = ce.ToObject(e, "bad callSite");
            var r = ce.ToObject(t.raw, "bad raw value");
            var n = r.length;
            var o = ce.ToLength(n);
            if (o <= 0) {
                return ""
            }
            var i = [];
            var a = 0;
            var u, f, s, c;
            while (a < o) {
                u = ce.ToString(a);
                s = ce.ToString(r[u]);
                M(i, s);
                if (a + 1 >= o) {
                    break
                }
                f = a + 1 < arguments.length ? arguments[a + 1] : "";
                c = ce.ToString(f);
                M(i, c);
                a += 1
            }
            return i.join("")
        }
    };
    if (String.raw && String.raw({raw: {0: "x", 1: "y", length: 2}}) !== "xy") {
        ne(String, "raw", _e.raw)
    }
    b(String, _e);
    var ke = function repeat(e, t) {
        if (t < 1) {
            return ""
        }
        if (t % 2) {
            return repeat(e, t - 1) + e
        }
        var r = repeat(e, t / 2);
        return r + r
    };
    var Le = Infinity;
    var Fe = {
        repeat: function repeat(e) {
            var t = ce.ToString(ce.RequireObjectCoercible(this));
            var r = ce.ToInteger(e);
            if (r < 0 || r >= Le) {
                throw new RangeError("repeat count must be less than infinity and not overflow maximum string size")
            }
            return ke(t, r)
        }, startsWith: function startsWith(e) {
            var t = ce.ToString(ce.RequireObjectCoercible(this));
            if (ce.IsRegExp(e)) {
                throw new TypeError('Cannot call method "startsWith" with a regex')
            }
            var r = ce.ToString(e);
            var n;
            if (arguments.length > 1) {
                n = arguments[1]
            }
            var o = A(ce.ToInteger(n), 0);
            return C(t, o, o + r.length) === r
        }, endsWith: function endsWith(e) {
            var t = ce.ToString(ce.RequireObjectCoercible(this));
            if (ce.IsRegExp(e)) {
                throw new TypeError('Cannot call method "endsWith" with a regex')
            }
            var r = ce.ToString(e);
            var n = t.length;
            var o;
            if (arguments.length > 1) {
                o = arguments[1]
            }
            var i = typeof o === "undefined" ? n : ce.ToInteger(o);
            var a = R(A(i, 0), n);
            return C(t, a - r.length, a) === r
        }, includes: function includes(e) {
            if (ce.IsRegExp(e)) {
                throw new TypeError('"includes" does not accept a RegExp')
            }
            var t = ce.ToString(e);
            var r;
            if (arguments.length > 1) {
                r = arguments[1]
            }
            return I(this, t, r) !== -1
        }, codePointAt: function codePointAt(e) {
            var t = ce.ToString(ce.RequireObjectCoercible(this));
            var r = ce.ToInteger(e);
            var n = t.length;
            if (r >= 0 && r < n) {
                var o = t.charCodeAt(r);
                var i = r + 1 === n;
                if (o < 55296 || o > 56319 || i) {
                    return o
                }
                var a = t.charCodeAt(r + 1);
                if (a < 56320 || a > 57343) {
                    return o
                }
                return (o - 55296) * 1024 + (a - 56320) + 65536
            }
        }
    };
    if (String.prototype.includes && "a".includes("a", Infinity) !== false) {
        ne(String.prototype, "includes", Fe.includes)
    }
    if (String.prototype.startsWith && String.prototype.endsWith) {
        var De = i(function () {
            return "/a/".startsWith(/a/)
        });
        var ze = a(function () {
            return "abc".startsWith("a", Infinity) === false
        });
        if (!De || !ze) {
            ne(String.prototype, "startsWith", Fe.startsWith);
            ne(String.prototype, "endsWith", Fe.endsWith)
        }
    }
    if (oe) {
        var qe = a(function () {
            var e = /a/;
            e[$.match] = false;
            return "/a/".startsWith(e)
        });
        if (!qe) {
            ne(String.prototype, "startsWith", Fe.startsWith)
        }
        var We = a(function () {
            var e = /a/;
            e[$.match] = false;
            return "/a/".endsWith(e)
        });
        if (!We) {
            ne(String.prototype, "endsWith", Fe.endsWith)
        }
        var Ge = a(function () {
            var e = /a/;
            e[$.match] = false;
            return "/a/".includes(e)
        });
        if (!Ge) {
            ne(String.prototype, "includes", Fe.includes)
        }
    }
    b(String.prototype, Fe);
    var He = ["\t\n\x0B\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003", "\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028", "\u2029\ufeff"].join("");
    var Ve = new RegExp("(^[" + He + "]+)|([" + He + "]+$)", "g");
    var Be = function trim() {
        return ce.ToString(ce.RequireObjectCoercible(this)).replace(Ve, "")
    };
    var Ue = ["\x85", "\u200b", "\ufffe"].join("");
    var $e = new RegExp("[" + Ue + "]", "g");
    var Je = /^[-+]0x[0-9a-f]+$/i;
    var Xe = Ue.trim().length !== Ue.length;
    h(String.prototype, "trim", Be, Xe);
    var Ke = function (e) {
        return {value: e, done: arguments.length === 0}
    };
    var Ze = function (e) {
        ce.RequireObjectCoercible(e);
        this._s = ce.ToString(e);
        this._i = 0
    };
    Ze.prototype.next = function () {
        var e = this._s;
        var t = this._i;
        if (typeof e === "undefined" || t >= e.length) {
            this._s = void 0;
            return Ke()
        }
        var r = e.charCodeAt(t);
        var n, o;
        if (r < 55296 || r > 56319 || t + 1 === e.length) {
            o = 1
        } else {
            n = e.charCodeAt(t + 1);
            o = n < 56320 || n > 57343 ? 1 : 2
        }
        this._i = t + o;
        return Ke(e.substr(t, o))
    };
    Me(Ze.prototype);
    Me(String.prototype, function () {
        return new Ze(this)
    });
    var Ye = {
        from: function from(e) {
            var r = this;
            var n;
            if (arguments.length > 1) {
                n = arguments[1]
            }
            var o, i;
            if (typeof n === "undefined") {
                o = false
            } else {
                if (!ce.IsCallable(n)) {
                    throw new TypeError("Array.from: when provided, the second argument must be a function")
                }
                if (arguments.length > 2) {
                    i = arguments[2]
                }
                o = true
            }
            var a = typeof (te(e) || ce.GetMethod(e, ie)) !== "undefined";
            var u, f, s;
            if (a) {
                f = ce.IsConstructor(r) ? Object(new r) : [];
                var c = ce.GetIterator(e);
                var l, p;
                s = 0;
                while (true) {
                    l = ce.IteratorStep(c);
                    if (l === false) {
                        break
                    }
                    p = l.value;
                    try {
                        if (o) {
                            p = typeof i === "undefined" ? n(p, s) : t(n, i, p, s)
                        }
                        f[s] = p
                    } catch (v) {
                        ce.IteratorClose(c, true);
                        throw v
                    }
                    s += 1
                }
                u = s
            } else {
                var y = ce.ToObject(e);
                u = ce.ToLength(y.length);
                f = ce.IsConstructor(r) ? Object(new r(u)) : new Array(u);
                var h;
                for (s = 0; s < u; ++s) {
                    h = y[s];
                    if (o) {
                        h = typeof i === "undefined" ? n(h, s) : t(n, i, h, s)
                    }
                    Ne(f, s, h)
                }
            }
            f.length = u;
            return f
        }, of: function of() {
            var e = arguments.length;
            var t = this;
            var n = r(t) || !ce.IsCallable(t) ? new Array(e) : ce.Construct(t, [e]);
            for (var o = 0; o < e; ++o) {
                Ne(n, o, arguments[o])
            }
            n.length = e;
            return n
        }
    };
    b(Array, Ye);
    Ce(Array);
    q = function (e, t) {
        this.i = 0;
        this.array = e;
        this.kind = t
    };
    b(q.prototype, {
        next: function () {
            var e = this.i;
            var t = this.array;
            if (!(this instanceof q)) {
                throw new TypeError("Not an ArrayIterator")
            }
            if (typeof t !== "undefined") {
                var r = ce.ToLength(t.length);
                for (; e < r; e++) {
                    var n = this.kind;
                    var o;
                    if (n === "key") {
                        o = e
                    } else if (n === "value") {
                        o = t[e]
                    } else if (n === "entry") {
                        o = [e, t[e]]
                    }
                    this.i = e + 1;
                    return Ke(o)
                }
            }
            this.array = void 0;
            return Ke()
        }
    });
    Me(q.prototype);
    var Qe = Array.of === Ye.of || function () {
        var e = function Foo(e) {
            this.length = e
        };
        e.prototype = [];
        var t = Array.of.apply(e, [1, 2]);
        return t instanceof e && t.length === 2
    }();
    if (!Qe) {
        ne(Array, "of", Ye.of)
    }
    var et = {
        copyWithin: function copyWithin(e, t) {
            var r = ce.ToObject(this);
            var n = ce.ToLength(r.length);
            var o = ce.ToInteger(e);
            var i = ce.ToInteger(t);
            var a = o < 0 ? A(n + o, 0) : R(o, n);
            var u = i < 0 ? A(n + i, 0) : R(i, n);
            var f;
            if (arguments.length > 2) {
                f = arguments[2]
            }
            var s = typeof f === "undefined" ? n : ce.ToInteger(f);
            var c = s < 0 ? A(n + s, 0) : R(s, n);
            var l = R(c - u, n - a);
            var p = 1;
            if (u < a && a < u + l) {
                p = -1;
                u += l - 1;
                a += l - 1
            }
            while (l > 0) {
                if (u in r) {
                    r[a] = r[u]
                } else {
                    delete r[a]
                }
                u += p;
                a += p;
                l -= 1
            }
            return r
        }, fill: function fill(e) {
            var t;
            if (arguments.length > 1) {
                t = arguments[1]
            }
            var r;
            if (arguments.length > 2) {
                r = arguments[2]
            }
            var n = ce.ToObject(this);
            var o = ce.ToLength(n.length);
            t = ce.ToInteger(typeof t === "undefined" ? 0 : t);
            r = ce.ToInteger(typeof r === "undefined" ? o : r);
            var i = t < 0 ? A(o + t, 0) : R(t, o);
            var a = r < 0 ? o + r : r;
            for (var u = i; u < o && u < a; ++u) {
                n[u] = e
            }
            return n
        }, find: function find(e) {
            var r = ce.ToObject(this);
            var n = ce.ToLength(r.length);
            if (!ce.IsCallable(e)) {
                throw new TypeError("Array#find: predicate must be a function")
            }
            var o = arguments.length > 1 ? arguments[1] : null;
            for (var i = 0, a; i < n; i++) {
                a = r[i];
                if (o) {
                    if (t(e, o, a, i, r)) {
                        return a
                    }
                } else if (e(a, i, r)) {
                    return a
                }
            }
        }, findIndex: function findIndex(e) {
            var r = ce.ToObject(this);
            var n = ce.ToLength(r.length);
            if (!ce.IsCallable(e)) {
                throw new TypeError("Array#findIndex: predicate must be a function")
            }
            var o = arguments.length > 1 ? arguments[1] : null;
            for (var i = 0; i < n; i++) {
                if (o) {
                    if (t(e, o, r[i], i, r)) {
                        return i
                    }
                } else if (e(r[i], i, r)) {
                    return i
                }
            }
            return -1
        }, keys: function keys() {
            return new q(this, "key")
        }, values: function values() {
            return new q(this, "value")
        }, entries: function entries() {
            return new q(this, "entry")
        }
    };
    if (Array.prototype.keys && !ce.IsCallable([1].keys().next)) {
        delete Array.prototype.keys
    }
    if (Array.prototype.entries && !ce.IsCallable([1].entries().next)) {
        delete Array.prototype.entries
    }
    if (Array.prototype.keys && Array.prototype.entries && !Array.prototype.values && Array.prototype[ie]) {
        b(Array.prototype, {values: Array.prototype[ie]});
        if (re.symbol($.unscopables)) {
            Array.prototype[$.unscopables].values = true
        }
    }
    if (c && Array.prototype.values && Array.prototype.values.name !== "values") {
        var tt = Array.prototype.values;
        ne(Array.prototype, "values", function values() {
            return ce.Call(tt, this, arguments)
        });
        h(Array.prototype, ie, Array.prototype.values, true)
    }
    b(Array.prototype, et);
    if (1 / [true].indexOf(true, -0) < 0) {
        h(Array.prototype, "indexOf", function indexOf(e) {
            var t = E(this, arguments);
            if (t === 0 && 1 / t < 0) {
                return 0
            }
            return t
        }, true)
    }
    Me(Array.prototype, function () {
        return this.values()
    });
    if (Object.getPrototypeOf) {
        Me(Object.getPrototypeOf([].values()))
    }
    var rt = function () {
        return a(function () {
            return Array.from({length: -1}).length === 0
        })
    }();
    var nt = function () {
        var e = Array.from([0].entries());
        return e.length === 1 && r(e[0]) && e[0][0] === 0 && e[0][1] === 0
    }();
    if (!rt || !nt) {
        ne(Array, "from", Ye.from)
    }
    var ot = function () {
        return a(function () {
            return Array.from([0], void 0)
        })
    }();
    if (!ot) {
        var it = Array.from;
        ne(Array, "from", function from(e) {
            if (arguments.length > 1 && typeof arguments[1] !== "undefined") {
                return ce.Call(it, this, arguments)
            } else {
                return t(it, this, e)
            }
        })
    }
    var at = -(Math.pow(2, 32) - 1);
    var ut = function (e, r) {
        var n = {length: at};
        n[r ? (n.length >>> 0) - 1 : 0] = true;
        return a(function () {
            t(e, n, function () {
                throw new RangeError("should not reach here")
            }, []);
            return true
        })
    };
    if (!ut(Array.prototype.forEach)) {
        var ft = Array.prototype.forEach;
        ne(Array.prototype, "forEach", function forEach(e) {
            return ce.Call(ft, this.length >= 0 ? this : [], arguments)
        }, true)
    }
    if (!ut(Array.prototype.map)) {
        var st = Array.prototype.map;
        ne(Array.prototype, "map", function map(e) {
            return ce.Call(st, this.length >= 0 ? this : [], arguments)
        }, true)
    }
    if (!ut(Array.prototype.filter)) {
        var ct = Array.prototype.filter;
        ne(Array.prototype, "filter", function filter(e) {
            return ce.Call(ct, this.length >= 0 ? this : [], arguments)
        }, true)
    }
    if (!ut(Array.prototype.some)) {
        var lt = Array.prototype.some;
        ne(Array.prototype, "some", function some(e) {
            return ce.Call(lt, this.length >= 0 ? this : [], arguments)
        }, true)
    }
    if (!ut(Array.prototype.every)) {
        var pt = Array.prototype.every;
        ne(Array.prototype, "every", function every(e) {
            return ce.Call(pt, this.length >= 0 ? this : [], arguments)
        }, true)
    }
    if (!ut(Array.prototype.reduce)) {
        var vt = Array.prototype.reduce;
        ne(Array.prototype, "reduce", function reduce(e) {
            return ce.Call(vt, this.length >= 0 ? this : [], arguments)
        }, true)
    }
    if (!ut(Array.prototype.reduceRight, true)) {
        var yt = Array.prototype.reduceRight;
        ne(Array.prototype, "reduceRight", function reduceRight(e) {
            return ce.Call(yt, this.length >= 0 ? this : [], arguments)
        }, true)
    }
    var ht = Number("0o10") !== 8;
    var bt = Number("0b10") !== 2;
    var gt = y(Ue, function (e) {
        return Number(e + 0 + e) === 0
    });
    if (ht || bt || gt) {
        var dt = Number;
        var mt = /^0b[01]+$/i;
        var Ot = /^0o[0-7]+$/i;
        var wt = mt.test.bind(mt);
        var jt = Ot.test.bind(Ot);
        var St = function (e) {
            var t;
            if (typeof e.valueOf === "function") {
                t = e.valueOf();
                if (re.primitive(t)) {
                    return t
                }
            }
            if (typeof e.toString === "function") {
                t = e.toString();
                if (re.primitive(t)) {
                    return t
                }
            }
            throw new TypeError("No default value")
        };
        var Tt = $e.test.bind($e);
        var It = Je.test.bind(Je);
        var Et = function () {
            var e = function Number(t) {
                var r;
                if (arguments.length > 0) {
                    r = re.primitive(t) ? t : St(t, "number")
                } else {
                    r = 0
                }
                if (typeof r === "string") {
                    r = ce.Call(Be, r);
                    if (wt(r)) {
                        r = parseInt(C(r, 2), 2)
                    } else if (jt(r)) {
                        r = parseInt(C(r, 2), 8)
                    } else if (Tt(r) || It(r)) {
                        r = NaN
                    }
                }
                var n = this;
                var o = a(function () {
                    dt.prototype.valueOf.call(n);
                    return true
                });
                if (n instanceof e && !o) {
                    return new dt(r)
                }
                return dt(r)
            };
            return e
        }();
        Ee(dt, Et, {});
        b(Et, {
            NaN: dt.NaN,
            MAX_VALUE: dt.MAX_VALUE,
            MIN_VALUE: dt.MIN_VALUE,
            NEGATIVE_INFINITY: dt.NEGATIVE_INFINITY,
            POSITIVE_INFINITY: dt.POSITIVE_INFINITY
        });
        Number = Et;
        m.redefine(S, "Number", Et)
    }
    var Pt = Math.pow(2, 53) - 1;
    b(Number, {
        MAX_SAFE_INTEGER: Pt,
        MIN_SAFE_INTEGER: -Pt,
        EPSILON: 2.220446049250313e-16,
        parseInt: S.parseInt,
        parseFloat: S.parseFloat,
        isFinite: K,
        isInteger: function isInteger(e) {
            return K(e) && ce.ToInteger(e) === e
        },
        isSafeInteger: function isSafeInteger(e) {
            return Number.isInteger(e) && k(e) <= Number.MAX_SAFE_INTEGER
        },
        isNaN: X
    });
    h(Number, "parseInt", S.parseInt, Number.parseInt !== S.parseInt);
    if ([, 1].find(function () {
        return true
    }) === 1) {
        ne(Array.prototype, "find", et.find)
    }
    if ([, 1].findIndex(function () {
        return true
    }) !== 0) {
        ne(Array.prototype, "findIndex", et.findIndex)
    }
    var Ct = Function.bind.call(Function.bind, Object.prototype.propertyIsEnumerable);
    var Mt = function ensureEnumerable(e, t) {
        if (s && Ct(e, t)) {
            Object.defineProperty(e, t, {enumerable: false})
        }
    };
    var xt = function sliceArgs() {
        var e = Number(this);
        var t = arguments.length;
        var r = t - e;
        var n = new Array(r < 0 ? 0 : r);
        for (var o = e; o < t; ++o) {
            n[o - e] = arguments[o]
        }
        return n
    };
    var Nt = function assignTo(e) {
        return function assignToSource(t, r) {
            t[r] = e[r];
            return t
        }
    };
    var At = function (e, t) {
        var r = n(Object(t));
        var o;
        if (ce.IsCallable(Object.getOwnPropertySymbols)) {
            o = v(Object.getOwnPropertySymbols(Object(t)), Ct(t))
        }
        return p(P(r, o || []), Nt(t), e)
    };
    var Rt = {
        assign: function (e, t) {
            var r = ce.ToObject(e, "Cannot convert undefined or null to object");
            return p(ce.Call(xt, 1, arguments), At, r)
        }, is: function is(e, t) {
            return ce.SameValue(e, t)
        }
    };
    var _t = Object.assign && Object.preventExtensions && function () {
        var e = Object.preventExtensions({1: 2});
        try {
            Object.assign(e, "xy")
        } catch (t) {
            return e[1] === "y"
        }
    }();
    if (_t) {
        ne(Object, "assign", Rt.assign)
    }
    b(Object, Rt);
    if (s) {
        var kt = {
            setPrototypeOf: function (e, r) {
                var n;
                var o = function (e, t) {
                    if (!ce.TypeIsObject(e)) {
                        throw new TypeError("cannot set prototype on a non-object")
                    }
                    if (!(t === null || ce.TypeIsObject(t))) {
                        throw new TypeError("can only set prototype to an object or null" + t)
                    }
                };
                var i = function (e, r) {
                    o(e, r);
                    t(n, e, r);
                    return e
                };
                try {
                    n = e.getOwnPropertyDescriptor(e.prototype, r).set;
                    t(n, {}, null)
                } catch (a) {
                    if (e.prototype !== {}[r]) {
                        return
                    }
                    n = function (e) {
                        this[r] = e
                    };
                    i.polyfill = i(i({}, null), e.prototype) instanceof e
                }
                return i
            }(Object, "__proto__")
        };
        b(Object, kt)
    }
    if (Object.setPrototypeOf && Object.getPrototypeOf && Object.getPrototypeOf(Object.setPrototypeOf({}, null)) !== null && Object.getPrototypeOf(Object.create(null)) === null) {
        (function () {
            var e = Object.create(null);
            var t = Object.getPrototypeOf;
            var r = Object.setPrototypeOf;
            Object.getPrototypeOf = function (r) {
                var n = t(r);
                return n === e ? null : n
            };
            Object.setPrototypeOf = function (t, n) {
                var o = n === null ? e : n;
                return r(t, o)
            };
            Object.setPrototypeOf.polyfill = false
        })()
    }
    var Lt = !i(function () {
        return Object.keys("foo")
    });
    if (!Lt) {
        var Ft = Object.keys;
        ne(Object, "keys", function keys(e) {
            return Ft(ce.ToObject(e))
        });
        n = Object.keys
    }
    var Dt = i(function () {
        return Object.keys(/a/g)
    });
    if (Dt) {
        var zt = Object.keys;
        ne(Object, "keys", function keys(e) {
            if (re.regex(e)) {
                var t = [];
                for (var r in e) {
                    if (z(e, r)) {
                        M(t, r)
                    }
                }
                return t
            }
            return zt(e)
        });
        n = Object.keys
    }
    if (Object.getOwnPropertyNames) {
        var qt = !i(function () {
            return Object.getOwnPropertyNames("foo")
        });
        if (!qt) {
            var Wt = typeof window === "object" ? Object.getOwnPropertyNames(window) : [];
            var Gt = Object.getOwnPropertyNames;
            ne(Object, "getOwnPropertyNames", function getOwnPropertyNames(e) {
                var t = ce.ToObject(e);
                if (g(t) === "[object Window]") {
                    try {
                        return Gt(t)
                    } catch (r) {
                        return P([], Wt)
                    }
                }
                return Gt(t)
            })
        }
    }
    if (Object.getOwnPropertyDescriptor) {
        var Ht = !i(function () {
            return Object.getOwnPropertyDescriptor("foo", "bar")
        });
        if (!Ht) {
            var Vt = Object.getOwnPropertyDescriptor;
            ne(Object, "getOwnPropertyDescriptor", function getOwnPropertyDescriptor(e, t) {
                return Vt(ce.ToObject(e), t)
            })
        }
    }
    if (Object.seal) {
        var Bt = !i(function () {
            return Object.seal("foo")
        });
        if (!Bt) {
            var Ut = Object.seal;
            ne(Object, "seal", function seal(e) {
                if (!ce.TypeIsObject(e)) {
                    return e
                }
                return Ut(e)
            })
        }
    }
    if (Object.isSealed) {
        var $t = !i(function () {
            return Object.isSealed("foo")
        });
        if (!$t) {
            var Jt = Object.isSealed;
            ne(Object, "isSealed", function isSealed(e) {
                if (!ce.TypeIsObject(e)) {
                    return true
                }
                return Jt(e)
            })
        }
    }
    if (Object.freeze) {
        var Xt = !i(function () {
            return Object.freeze("foo")
        });
        if (!Xt) {
            var Kt = Object.freeze;
            ne(Object, "freeze", function freeze(e) {
                if (!ce.TypeIsObject(e)) {
                    return e
                }
                return Kt(e)
            })
        }
    }
    if (Object.isFrozen) {
        var Zt = !i(function () {
            return Object.isFrozen("foo")
        });
        if (!Zt) {
            var Yt = Object.isFrozen;
            ne(Object, "isFrozen", function isFrozen(e) {
                if (!ce.TypeIsObject(e)) {
                    return true
                }
                return Yt(e)
            })
        }
    }
    if (Object.preventExtensions) {
        var Qt = !i(function () {
            return Object.preventExtensions("foo")
        });
        if (!Qt) {
            var er = Object.preventExtensions;
            ne(Object, "preventExtensions", function preventExtensions(e) {
                if (!ce.TypeIsObject(e)) {
                    return e
                }
                return er(e)
            })
        }
    }
    if (Object.isExtensible) {
        var tr = !i(function () {
            return Object.isExtensible("foo")
        });
        if (!tr) {
            var rr = Object.isExtensible;
            ne(Object, "isExtensible", function isExtensible(e) {
                if (!ce.TypeIsObject(e)) {
                    return false
                }
                return rr(e)
            })
        }
    }
    if (Object.getPrototypeOf) {
        var nr = !i(function () {
            return Object.getPrototypeOf("foo")
        });
        if (!nr) {
            var or = Object.getPrototypeOf;
            ne(Object, "getPrototypeOf", function getPrototypeOf(e) {
                return or(ce.ToObject(e))
            })
        }
    }
    var ir = s && function () {
        var e = Object.getOwnPropertyDescriptor(RegExp.prototype, "flags");
        return e && ce.IsCallable(e.get)
    }();
    if (s && !ir) {
        var ar = function flags() {
            if (!ce.TypeIsObject(this)) {
                throw new TypeError("Method called on incompatible type: must be an object.")
            }
            var e = "";
            if (this.global) {
                e += "g"
            }
            if (this.ignoreCase) {
                e += "i"
            }
            if (this.multiline) {
                e += "m"
            }
            if (this.unicode) {
                e += "u"
            }
            if (this.sticky) {
                e += "y"
            }
            return e
        };
        m.getter(RegExp.prototype, "flags", ar)
    }
    var ur = s && a(function () {
        return String(new RegExp(/a/g, "i")) === "/a/i"
    });
    var fr = oe && s && function () {
        var e = /./;
        e[$.match] = false;
        return RegExp(e) === e
    }();
    var sr = a(function () {
        return RegExp.prototype.toString.call({source: "abc"}) === "/abc/"
    });
    var cr = sr && a(function () {
        return RegExp.prototype.toString.call({source: "a", flags: "b"}) === "/a/b"
    });
    if (!sr || !cr) {
        var lr = RegExp.prototype.toString;
        h(RegExp.prototype, "toString", function toString() {
            var e = ce.RequireObjectCoercible(this);
            if (re.regex(e)) {
                return t(lr, e)
            }
            var r = ue(e.source);
            var n = ue(e.flags);
            return "/" + r + "/" + n
        }, true);
        m.preserveToString(RegExp.prototype.toString, lr)
    }
    if (s && (!ur || fr)) {
        var pr = Object.getOwnPropertyDescriptor(RegExp.prototype, "flags").get;
        var vr = Object.getOwnPropertyDescriptor(RegExp.prototype, "source") || {};
        var yr = function () {
            return this.source
        };
        var hr = ce.IsCallable(vr.get) ? vr.get : yr;
        var br = RegExp;
        var gr = function () {
            return function RegExp(e, t) {
                var r = ce.IsRegExp(e);
                var n = this instanceof RegExp;
                if (!n && r && typeof t === "undefined" && e.constructor === RegExp) {
                    return e
                }
                var o = e;
                var i = t;
                if (re.regex(e)) {
                    o = ce.Call(hr, e);
                    i = typeof t === "undefined" ? ce.Call(pr, e) : t;
                    return new RegExp(o, i)
                } else if (r) {
                    o = e.source;
                    i = typeof t === "undefined" ? e.flags : t
                }
                return new br(e, t)
            }
        }();
        Ee(br, gr, {$input: true});
        RegExp = gr;
        m.redefine(S, "RegExp", gr)
    }
    if (s) {
        var dr = {input: "$_", lastMatch: "$&", lastParen: "$+", leftContext: "$`", rightContext: "$'"};
        l(n(dr), function (e) {
            if (e in RegExp && !(dr[e] in RegExp)) {
                m.getter(RegExp, dr[e], function get() {
                    return RegExp[e]
                })
            }
        })
    }
    Ce(RegExp);
    var mr = 1 / Number.EPSILON;
    var Or = function roundTiesToEven(e) {
        return e + mr - mr
    };
    var wr = Math.pow(2, -23);
    var jr = Math.pow(2, 127) * (2 - wr);
    var Sr = Math.pow(2, -126);
    var Tr = Math.E;
    var Ir = Math.LOG2E;
    var Er = Math.LOG10E;
    var Pr = Number.prototype.clz;
    delete Number.prototype.clz;
    var Cr = {
        acosh: function acosh(e) {
            var t = Number(e);
            if (X(t) || e < 1) {
                return NaN
            }
            if (t === 1) {
                return 0
            }
            if (t === Infinity) {
                return t
            }
            var r = 1 / (t * t);
            if (t < 2) {
                return Y(t - 1 + D(1 - r) * t)
            }
            var n = t / 2;
            return Y(n + D(1 - r) * n - 1) + 1 / Ir
        }, asinh: function asinh(e) {
            var t = Number(e);
            if (t === 0 || !T(t)) {
                return t
            }
            var r = k(t);
            var n = r * r;
            var o = Z(t);
            if (r < 1) {
                return o * Y(r + n / (D(n + 1) + 1))
            }
            return o * (Y(r / 2 + D(1 + 1 / n) * r / 2 - 1) + 1 / Ir)
        }, atanh: function atanh(e) {
            var t = Number(e);
            if (t === 0) {
                return t
            }
            if (t === -1) {
                return -Infinity
            }
            if (t === 1) {
                return Infinity
            }
            if (X(t) || t < -1 || t > 1) {
                return NaN
            }
            var r = k(t);
            return Z(t) * Y(2 * r / (1 - r)) / 2
        }, cbrt: function cbrt(e) {
            var t = Number(e);
            if (t === 0) {
                return t
            }
            var r = t < 0;
            var n;
            if (r) {
                t = -t
            }
            if (t === Infinity) {
                n = Infinity
            } else {
                n = L(F(t) / 3);
                n = (t / (n * n) + 2 * n) / 3
            }
            return r ? -n : n
        }, clz32: function clz32(e) {
            var t = Number(e);
            var r = ce.ToUint32(t);
            if (r === 0) {
                return 32
            }
            return Pr ? ce.Call(Pr, r) : 31 - _(F(r + .5) * Ir)
        }, cosh: function cosh(e) {
            var t = Number(e);
            if (t === 0) {
                return 1
            }
            if (X(t)) {
                return NaN
            }
            if (!T(t)) {
                return Infinity
            }
            var r = L(k(t) - 1);
            return (r + 1 / (r * Tr * Tr)) * (Tr / 2)
        }, expm1: function expm1(e) {
            var t = Number(e);
            if (t === -Infinity) {
                return -1
            }
            if (!T(t) || t === 0) {
                return t
            }
            if (k(t) > .5) {
                return L(t) - 1
            }
            var r = t;
            var n = 0;
            var o = 1;
            while (n + r !== n) {
                n += r;
                o += 1;
                r *= t / o
            }
            return n
        }, hypot: function hypot(e, t) {
            var r = 0;
            var n = 0;
            for (var o = 0; o < arguments.length; ++o) {
                var i = k(Number(arguments[o]));
                if (n < i) {
                    r *= n / i * (n / i);
                    r += 1;
                    n = i
                } else {
                    r += i > 0 ? i / n * (i / n) : i
                }
            }
            return n === Infinity ? Infinity : n * D(r)
        }, log2: function log2(e) {
            return F(e) * Ir
        }, log10: function log10(e) {
            return F(e) * Er
        }, log1p: Y, sign: Z, sinh: function sinh(e) {
            var t = Number(e);
            if (!T(t) || t === 0) {
                return t
            }
            var r = k(t);
            if (r < 1) {
                var n = Math.expm1(r);
                return Z(t) * n * (1 + 1 / (n + 1)) / 2
            }
            var o = L(r - 1);
            return Z(t) * (o - 1 / (o * Tr * Tr)) * (Tr / 2)
        }, tanh: function tanh(e) {
            var t = Number(e);
            if (X(t) || t === 0) {
                return t
            }
            if (t >= 20) {
                return 1
            }
            if (t <= -20) {
                return -1
            }
            return (Math.expm1(t) - Math.expm1(-t)) / (L(t) + L(-t))
        }, trunc: function trunc(e) {
            var t = Number(e);
            return t < 0 ? -_(-t) : _(t)
        }, imul: function imul(e, t) {
            var r = ce.ToUint32(e);
            var n = ce.ToUint32(t);
            var o = r >>> 16 & 65535;
            var i = r & 65535;
            var a = n >>> 16 & 65535;
            var u = n & 65535;
            return i * u + (o * u + i * a << 16 >>> 0) | 0
        }, fround: function fround(e) {
            var t = Number(e);
            if (t === 0 || t === Infinity || t === -Infinity || X(t)) {
                return t
            }
            var r = Z(t);
            var n = k(t);
            if (n < Sr) {
                return r * Or(n / Sr / wr) * Sr * wr
            }
            var o = (1 + wr / Number.EPSILON) * n;
            var i = o - (o - n);
            if (i > jr || X(i)) {
                return r * Infinity
            }
            return r * i
        }
    };
    var Mr = function withinULPDistance(e, t, r) {
        return k(1 - e / t) / Number.EPSILON < (r || 8)
    };
    b(Math, Cr);
    h(Math, "sinh", Cr.sinh, Math.sinh(710) === Infinity);
    h(Math, "cosh", Cr.cosh, Math.cosh(710) === Infinity);
    h(Math, "log1p", Cr.log1p, Math.log1p(-1e-17) !== -1e-17);
    h(Math, "asinh", Cr.asinh, Math.asinh(-1e7) !== -Math.asinh(1e7));
    h(Math, "asinh", Cr.asinh, Math.asinh(1e300) === Infinity);
    h(Math, "atanh", Cr.atanh, Math.atanh(1e-300) === 0);
    h(Math, "tanh", Cr.tanh, Math.tanh(-2e-17) !== -2e-17);
    h(Math, "acosh", Cr.acosh, Math.acosh(Number.MAX_VALUE) === Infinity);
    h(Math, "acosh", Cr.acosh, !Mr(Math.acosh(1 + Number.EPSILON), Math.sqrt(2 * Number.EPSILON)));
    h(Math, "cbrt", Cr.cbrt, !Mr(Math.cbrt(1e-300), 1e-100));
    h(Math, "sinh", Cr.sinh, Math.sinh(-2e-17) !== -2e-17);
    var xr = Math.expm1(10);
    h(Math, "expm1", Cr.expm1, xr > 22025.465794806718 || xr < 22025.465794806718);
    var Nr = Math.round;
    var Ar = Math.round(.5 - Number.EPSILON / 4) === 0 && Math.round(-.5 + Number.EPSILON / 3.99) === 1;
    var Rr = mr + 1;
    var _r = 2 * mr - 1;
    var kr = [Rr, _r].every(function (e) {
        return Math.round(e) === e
    });
    h(Math, "round", function round(e) {
        var t = _(e);
        var r = t === -1 ? -0 : t + 1;
        return e - t < .5 ? t : r
    }, !Ar || !kr);
    m.preserveToString(Math.round, Nr);
    var Lr = Math.imul;
    if (Math.imul(4294967295, 5) !== -5) {
        Math.imul = Cr.imul;
        m.preserveToString(Math.imul, Lr)
    }
    if (Math.imul.length !== 2) {
        ne(Math, "imul", function imul(e, t) {
            return ce.Call(Lr, Math, arguments)
        })
    }
    var Fr = function () {
        var e = S.setTimeout;
        if (typeof e !== "function" && typeof e !== "object") {
            return
        }
        ce.IsPromise = function (e) {
            if (!ce.TypeIsObject(e)) {
                return false
            }
            if (typeof e._promise === "undefined") {
                return false
            }
            return true
        };
        var r = function (e) {
            if (!ce.IsConstructor(e)) {
                throw new TypeError("Bad promise constructor")
            }
            var t = this;
            var r = function (e, r) {
                if (t.resolve !== void 0 || t.reject !== void 0) {
                    throw new TypeError("Bad Promise implementation!")
                }
                t.resolve = e;
                t.reject = r
            };
            t.resolve = void 0;
            t.reject = void 0;
            t.promise = new e(r);
            if (!(ce.IsCallable(t.resolve) && ce.IsCallable(t.reject))) {
                throw new TypeError("Bad promise constructor")
            }
        };
        var n;
        if (typeof window !== "undefined" && ce.IsCallable(window.postMessage)) {
            n = function () {
                var e = [];
                var t = "zero-timeout-message";
                var r = function (r) {
                    M(e, r);
                    window.postMessage(t, "*")
                };
                var n = function (r) {
                    if (r.source === window && r.data === t) {
                        r.stopPropagation();
                        if (e.length === 0) {
                            return
                        }
                        var n = N(e);
                        n()
                    }
                };
                window.addEventListener("message", n, true);
                return r
            }
        }
        var o = function () {
            var e = S.Promise;
            var t = e && e.resolve && e.resolve();
            return t && function (e) {
                return t.then(e)
            }
        };
        var i = ce.IsCallable(S.setImmediate) ? S.setImmediate : typeof process === "object" && process.nextTick ? process.nextTick : o() || (ce.IsCallable(n) ? n() : function (t) {
            e(t, 0)
        });
        var a = function (e) {
            return e
        };
        var u = function (e) {
            throw e
        };
        var f = 0;
        var s = 1;
        var c = 2;
        var l = 0;
        var p = 1;
        var v = 2;
        var y = {};
        var h = function (e, t, r) {
            i(function () {
                g(e, t, r)
            })
        };
        var g = function (e, t, r) {
            var n, o;
            if (t === y) {
                return e(r)
            }
            try {
                n = e(r);
                o = t.resolve
            } catch (i) {
                n = i;
                o = t.reject
            }
            o(n)
        };
        var d = function (e, t) {
            var r = e._promise;
            var n = r.reactionLength;
            if (n > 0) {
                h(r.fulfillReactionHandler0, r.reactionCapability0, t);
                r.fulfillReactionHandler0 = void 0;
                r.rejectReactions0 = void 0;
                r.reactionCapability0 = void 0;
                if (n > 1) {
                    for (var o = 1, i = 0; o < n; o++, i += 3) {
                        h(r[i + l], r[i + v], t);
                        e[i + l] = void 0;
                        e[i + p] = void 0;
                        e[i + v] = void 0
                    }
                }
            }
            r.result = t;
            r.state = s;
            r.reactionLength = 0
        };
        var m = function (e, t) {
            var r = e._promise;
            var n = r.reactionLength;
            if (n > 0) {
                h(r.rejectReactionHandler0, r.reactionCapability0, t);
                r.fulfillReactionHandler0 = void 0;
                r.rejectReactions0 = void 0;
                r.reactionCapability0 = void 0;
                if (n > 1) {
                    for (var o = 1, i = 0; o < n; o++, i += 3) {
                        h(r[i + p], r[i + v], t);
                        e[i + l] = void 0;
                        e[i + p] = void 0;
                        e[i + v] = void 0
                    }
                }
            }
            r.result = t;
            r.state = c;
            r.reactionLength = 0
        };
        var O = function (e) {
            var t = false;
            var r = function (r) {
                var n;
                if (t) {
                    return
                }
                t = true;
                if (r === e) {
                    return m(e, new TypeError("Self resolution"))
                }
                if (!ce.TypeIsObject(r)) {
                    return d(e, r)
                }
                try {
                    n = r.then
                } catch (o) {
                    return m(e, o)
                }
                if (!ce.IsCallable(n)) {
                    return d(e, r)
                }
                i(function () {
                    j(e, r, n)
                })
            };
            var n = function (r) {
                if (t) {
                    return
                }
                t = true;
                return m(e, r)
            };
            return {resolve: r, reject: n}
        };
        var w = function (e, r, n, o) {
            if (e === I) {
                t(e, r, n, o, y)
            } else {
                t(e, r, n, o)
            }
        };
        var j = function (e, t, r) {
            var n = O(e);
            var o = n.resolve;
            var i = n.reject;
            try {
                w(r, t, o, i)
            } catch (a) {
                i(a)
            }
        };
        var T, I;
        var E = function () {
            var e = function Promise(t) {
                if (!(this instanceof e)) {
                    throw new TypeError('Constructor Promise requires "new"')
                }
                if (this && this._promise) {
                    throw new TypeError("Bad construction")
                }
                if (!ce.IsCallable(t)) {
                    throw new TypeError("not a valid resolver")
                }
                var r = Ae(this, e, T, {
                    _promise: {
                        result: void 0,
                        state: f,
                        reactionLength: 0,
                        fulfillReactionHandler0: void 0,
                        rejectReactionHandler0: void 0,
                        reactionCapability0: void 0
                    }
                });
                var n = O(r);
                var o = n.reject;
                try {
                    t(n.resolve, o)
                } catch (i) {
                    o(i)
                }
                return r
            };
            return e
        }();
        T = E.prototype;
        var P = function (e, t, r, n) {
            var o = false;
            return function (i) {
                if (o) {
                    return
                }
                o = true;
                t[e] = i;
                if (--n.count === 0) {
                    var a = r.resolve;
                    a(t)
                }
            }
        };
        var C = function (e, t, r) {
            var n = e.iterator;
            var o = [];
            var i = {count: 1};
            var a, u;
            var f = 0;
            while (true) {
                try {
                    a = ce.IteratorStep(n);
                    if (a === false) {
                        e.done = true;
                        break
                    }
                    u = a.value
                } catch (s) {
                    e.done = true;
                    throw s
                }
                o[f] = void 0;
                var c = t.resolve(u);
                var l = P(f, o, r, i);
                i.count += 1;
                w(c.then, c, l, r.reject);
                f += 1
            }
            if (--i.count === 0) {
                var p = r.resolve;
                p(o)
            }
            return r.promise
        };
        var x = function (e, t, r) {
            var n = e.iterator;
            var o, i, a;
            while (true) {
                try {
                    o = ce.IteratorStep(n);
                    if (o === false) {
                        e.done = true;
                        break
                    }
                    i = o.value
                } catch (u) {
                    e.done = true;
                    throw u
                }
                a = t.resolve(i);
                w(a.then, a, r.resolve, r.reject)
            }
            return r.promise
        };
        b(E, {
            all: function all(e) {
                var t = this;
                if (!ce.TypeIsObject(t)) {
                    throw new TypeError("Promise is not object")
                }
                var n = new r(t);
                var o, i;
                try {
                    o = ce.GetIterator(e);
                    i = {iterator: o, done: false};
                    return C(i, t, n)
                } catch (a) {
                    var u = a;
                    if (i && !i.done) {
                        try {
                            ce.IteratorClose(o, true)
                        } catch (f) {
                            u = f
                        }
                    }
                    var s = n.reject;
                    s(u);
                    return n.promise
                }
            }, race: function race(e) {
                var t = this;
                if (!ce.TypeIsObject(t)) {
                    throw new TypeError("Promise is not object")
                }
                var n = new r(t);
                var o, i;
                try {
                    o = ce.GetIterator(e);
                    i = {iterator: o, done: false};
                    return x(i, t, n)
                } catch (a) {
                    var u = a;
                    if (i && !i.done) {
                        try {
                            ce.IteratorClose(o, true)
                        } catch (f) {
                            u = f
                        }
                    }
                    var s = n.reject;
                    s(u);
                    return n.promise
                }
            }, reject: function reject(e) {
                var t = this;
                if (!ce.TypeIsObject(t)) {
                    throw new TypeError("Bad promise constructor")
                }
                var n = new r(t);
                var o = n.reject;
                o(e);
                return n.promise
            }, resolve: function resolve(e) {
                var t = this;
                if (!ce.TypeIsObject(t)) {
                    throw new TypeError("Bad promise constructor")
                }
                if (ce.IsPromise(e)) {
                    var n = e.constructor;
                    if (n === t) {
                        return e
                    }
                }
                var o = new r(t);
                var i = o.resolve;
                i(e);
                return o.promise
            }
        });
        b(T, {
            "catch": function (e) {
                return this.then(null, e)
            }, then: function then(e, t) {
                var n = this;
                if (!ce.IsPromise(n)) {
                    throw new TypeError("not a promise")
                }
                var o = ce.SpeciesConstructor(n, E);
                var i;
                var b = arguments.length > 2 && arguments[2] === y;
                if (b && o === E) {
                    i = y
                } else {
                    i = new r(o)
                }
                var g = ce.IsCallable(e) ? e : a;
                var d = ce.IsCallable(t) ? t : u;
                var m = n._promise;
                var O;
                if (m.state === f) {
                    if (m.reactionLength === 0) {
                        m.fulfillReactionHandler0 = g;
                        m.rejectReactionHandler0 = d;
                        m.reactionCapability0 = i
                    } else {
                        var w = 3 * (m.reactionLength - 1);
                        m[w + l] = g;
                        m[w + p] = d;
                        m[w + v] = i
                    }
                    m.reactionLength += 1
                } else if (m.state === s) {
                    O = m.result;
                    h(g, i, O)
                } else if (m.state === c) {
                    O = m.result;
                    h(d, i, O)
                } else {
                    throw new TypeError("unexpected Promise state")
                }
                return i.promise
            }
        });
        y = new r(E);
        I = T.then;
        return E
    }();
    if (S.Promise) {
        delete S.Promise.accept;
        delete S.Promise.defer;
        delete S.Promise.prototype.chain
    }
    if (typeof Fr === "function") {
        b(S, {Promise: Fr});
        var Dr = w(S.Promise, function (e) {
            return e.resolve(42).then(function () {
            }) instanceof e
        });
        var zr = !i(function () {
            return S.Promise.reject(42).then(null, 5).then(null, W)
        });
        var qr = i(function () {
            return S.Promise.call(3, W)
        });
        var Wr = function (e) {
            var t = e.resolve(5);
            t.constructor = {};
            var r = e.resolve(t);
            try {
                r.then(null, W).then(null, W)
            } catch (n) {
                return true
            }
            return t === r
        }(S.Promise);
        var Gr = s && function () {
            var e = 0;
            var t = Object.defineProperty({}, "then", {
                get: function () {
                    e += 1
                }
            });
            Promise.resolve(t);
            return e === 1
        }();
        var Hr = function BadResolverPromise(e) {
            var t = new Promise(e);
            e(3, function () {
            });
            this.then = t.then;
            this.constructor = BadResolverPromise
        };
        Hr.prototype = Promise.prototype;
        Hr.all = Promise.all;
        var Vr = a(function () {
            return !!Hr.all([1, 2])
        });
        if (!Dr || !zr || !qr || Wr || !Gr || Vr) {
            Promise = Fr;
            ne(S, "Promise", Fr)
        }
        if (Promise.all.length !== 1) {
            var Br = Promise.all;
            ne(Promise, "all", function all(e) {
                return ce.Call(Br, this, arguments)
            })
        }
        if (Promise.race.length !== 1) {
            var Ur = Promise.race;
            ne(Promise, "race", function race(e) {
                return ce.Call(Ur, this, arguments)
            })
        }
        if (Promise.resolve.length !== 1) {
            var $r = Promise.resolve;
            ne(Promise, "resolve", function resolve(e) {
                return ce.Call($r, this, arguments)
            })
        }
        if (Promise.reject.length !== 1) {
            var Jr = Promise.reject;
            ne(Promise, "reject", function reject(e) {
                return ce.Call(Jr, this, arguments)
            })
        }
        Mt(Promise, "all");
        Mt(Promise, "race");
        Mt(Promise, "resolve");
        Mt(Promise, "reject");
        Ce(Promise)
    }
    var Xr = function (e) {
        var t = n(p(e, function (e, t) {
            e[t] = true;
            return e
        }, {}));
        return e.join(":") === t.join(":")
    };
    var Kr = Xr(["z", "a", "bb"]);
    var Zr = Xr(["z", 1, "a", "3", 2]);
    if (s) {
        var Yr = function fastkey(e, t) {
            if (!t && !Kr) {
                return null
            }
            if (se(e)) {
                return "^" + ce.ToString(e)
            } else if (typeof e === "string") {
                return "$" + e
            } else if (typeof e === "number") {
                if (!Zr) {
                    return "n" + e
                }
                return e
            } else if (typeof e === "boolean") {
                return "b" + e
            }
            return null
        };
        var Qr = function emptyObject() {
            return Object.create ? Object.create(null) : {}
        };
        var en = function addIterableToMap(e, n, o) {
            if (r(o) || re.string(o)) {
                l(o, function (e) {
                    if (!ce.TypeIsObject(e)) {
                        throw new TypeError("Iterator value " + e + " is not an entry object")
                    }
                    n.set(e[0], e[1])
                })
            } else if (o instanceof e) {
                t(e.prototype.forEach, o, function (e, t) {
                    n.set(t, e)
                })
            } else {
                var i, a;
                if (!se(o)) {
                    a = n.set;
                    if (!ce.IsCallable(a)) {
                        throw new TypeError("bad map")
                    }
                    i = ce.GetIterator(o)
                }
                if (typeof i !== "undefined") {
                    while (true) {
                        var u = ce.IteratorStep(i);
                        if (u === false) {
                            break
                        }
                        var f = u.value;
                        try {
                            if (!ce.TypeIsObject(f)) {
                                throw new TypeError("Iterator value " + f + " is not an entry object")
                            }
                            t(a, n, f[0], f[1])
                        } catch (s) {
                            ce.IteratorClose(i, true);
                            throw s
                        }
                    }
                }
            }
        };
        var tn = function addIterableToSet(e, n, o) {
            if (r(o) || re.string(o)) {
                l(o, function (e) {
                    n.add(e)
                })
            } else if (o instanceof e) {
                t(e.prototype.forEach, o, function (e) {
                    n.add(e)
                })
            } else {
                var i, a;
                if (!se(o)) {
                    a = n.add;
                    if (!ce.IsCallable(a)) {
                        throw new TypeError("bad set")
                    }
                    i = ce.GetIterator(o)
                }
                if (typeof i !== "undefined") {
                    while (true) {
                        var u = ce.IteratorStep(i);
                        if (u === false) {
                            break
                        }
                        var f = u.value;
                        try {
                            t(a, n, f)
                        } catch (s) {
                            ce.IteratorClose(i, true);
                            throw s
                        }
                    }
                }
            }
        };
        var rn = {
            Map: function () {
                var e = {};
                var r = function MapEntry(e, t) {
                    this.key = e;
                    this.value = t;
                    this.next = null;
                    this.prev = null
                };
                r.prototype.isRemoved = function isRemoved() {
                    return this.key === e
                };
                var n = function isMap(e) {
                    return !!e._es6map
                };
                var o = function requireMapSlot(e, t) {
                    if (!ce.TypeIsObject(e) || !n(e)) {
                        throw new TypeError("Method Map.prototype." + t + " called on incompatible receiver " + ce.ToString(e))
                    }
                };
                var i = function MapIterator(e, t) {
                    o(e, "[[MapIterator]]");
                    this.head = e._head;
                    this.i = this.head;
                    this.kind = t
                };
                i.prototype = {
                    isMapIterator: true, next: function next() {
                        if (!this.isMapIterator) {
                            throw new TypeError("Not a MapIterator")
                        }
                        var e = this.i;
                        var t = this.kind;
                        var r = this.head;
                        if (typeof this.i === "undefined") {
                            return Ke()
                        }
                        while (e.isRemoved() && e !== r) {
                            e = e.prev
                        }
                        var n;
                        while (e.next !== r) {
                            e = e.next;
                            if (!e.isRemoved()) {
                                if (t === "key") {
                                    n = e.key
                                } else if (t === "value") {
                                    n = e.value
                                } else {
                                    n = [e.key, e.value]
                                }
                                this.i = e;
                                return Ke(n)
                            }
                        }
                        this.i = void 0;
                        return Ke()
                    }
                };
                Me(i.prototype);
                var a;
                var u = function Map() {
                    if (!(this instanceof Map)) {
                        throw new TypeError('Constructor Map requires "new"')
                    }
                    if (this && this._es6map) {
                        throw new TypeError("Bad construction")
                    }
                    var e = Ae(this, Map, a, {
                        _es6map: true,
                        _head: null,
                        _map: G ? new G : null,
                        _size: 0,
                        _storage: Qr()
                    });
                    var t = new r(null, null);
                    t.next = t.prev = t;
                    e._head = t;
                    if (arguments.length > 0) {
                        en(Map, e, arguments[0])
                    }
                    return e
                };
                a = u.prototype;
                m.getter(a, "size", function () {
                    if (typeof this._size === "undefined") {
                        throw new TypeError("size method called on incompatible Map")
                    }
                    return this._size
                });
                b(a, {
                    get: function get(e) {
                        o(this, "get");
                        var t;
                        var r = Yr(e, true);
                        if (r !== null) {
                            t = this._storage[r];
                            if (t) {
                                return t.value
                            } else {
                                return
                            }
                        }
                        if (this._map) {
                            t = V.call(this._map, e);
                            if (t) {
                                return t.value
                            } else {
                                return
                            }
                        }
                        var n = this._head;
                        var i = n;
                        while ((i = i.next) !== n) {
                            if (ce.SameValueZero(i.key, e)) {
                                return i.value
                            }
                        }
                    }, has: function has(e) {
                        o(this, "has");
                        var t = Yr(e, true);
                        if (t !== null) {
                            return typeof this._storage[t] !== "undefined"
                        }
                        if (this._map) {
                            return B.call(this._map, e)
                        }
                        var r = this._head;
                        var n = r;
                        while ((n = n.next) !== r) {
                            if (ce.SameValueZero(n.key, e)) {
                                return true
                            }
                        }
                        return false
                    }, set: function set(e, t) {
                        o(this, "set");
                        var n = this._head;
                        var i = n;
                        var a;
                        var u = Yr(e, true);
                        if (u !== null) {
                            if (typeof this._storage[u] !== "undefined") {
                                this._storage[u].value = t;
                                return this
                            } else {
                                a = this._storage[u] = new r(e, t);
                                i = n.prev
                            }
                        } else if (this._map) {
                            if (B.call(this._map, e)) {
                                V.call(this._map, e).value = t
                            } else {
                                a = new r(e, t);
                                U.call(this._map, e, a);
                                i = n.prev
                            }
                        }
                        while ((i = i.next) !== n) {
                            if (ce.SameValueZero(i.key, e)) {
                                i.value = t;
                                return this
                            }
                        }
                        a = a || new r(e, t);
                        if (ce.SameValue(-0, e)) {
                            a.key = +0
                        }
                        a.next = this._head;
                        a.prev = this._head.prev;
                        a.prev.next = a;
                        a.next.prev = a;
                        this._size += 1;
                        return this
                    }, "delete": function (t) {
                        o(this, "delete");
                        var r = this._head;
                        var n = r;
                        var i = Yr(t, true);
                        if (i !== null) {
                            if (typeof this._storage[i] === "undefined") {
                                return false
                            }
                            n = this._storage[i].prev;
                            delete this._storage[i]
                        } else if (this._map) {
                            if (!B.call(this._map, t)) {
                                return false
                            }
                            n = V.call(this._map, t).prev;
                            H.call(this._map, t)
                        }
                        while ((n = n.next) !== r) {
                            if (ce.SameValueZero(n.key, t)) {
                                n.key = e;
                                n.value = e;
                                n.prev.next = n.next;
                                n.next.prev = n.prev;
                                this._size -= 1;
                                return true
                            }
                        }
                        return false
                    }, clear: function clear() {
                        o(this, "clear");
                        this._map = G ? new G : null;
                        this._size = 0;
                        this._storage = Qr();
                        var t = this._head;
                        var r = t;
                        var n = r.next;
                        while ((r = n) !== t) {
                            r.key = e;
                            r.value = e;
                            n = r.next;
                            r.next = r.prev = t
                        }
                        t.next = t.prev = t
                    }, keys: function keys() {
                        o(this, "keys");
                        return new i(this, "key")
                    }, values: function values() {
                        o(this, "values");
                        return new i(this, "value")
                    }, entries: function entries() {
                        o(this, "entries");
                        return new i(this, "key+value")
                    }, forEach: function forEach(e) {
                        o(this, "forEach");
                        var r = arguments.length > 1 ? arguments[1] : null;
                        var n = this.entries();
                        for (var i = n.next(); !i.done; i = n.next()) {
                            if (r) {
                                t(e, r, i.value[1], i.value[0], this)
                            } else {
                                e(i.value[1], i.value[0], this)
                            }
                        }
                    }
                });
                Me(a, a.entries);
                return u
            }(), Set: function () {
                var e = function isSet(e) {
                    return e._es6set && typeof e._storage !== "undefined"
                };
                var r = function requireSetSlot(t, r) {
                    if (!ce.TypeIsObject(t) || !e(t)) {
                        throw new TypeError("Set.prototype." + r + " called on incompatible receiver " + ce.ToString(t))
                    }
                };
                var o;
                var i = function Set() {
                    if (!(this instanceof Set)) {
                        throw new TypeError('Constructor Set requires "new"')
                    }
                    if (this && this._es6set) {
                        throw new TypeError("Bad construction")
                    }
                    var e = Ae(this, Set, o, {_es6set: true, "[[SetData]]": null, _storage: Qr()});
                    if (!e._es6set) {
                        throw new TypeError("bad set")
                    }
                    if (arguments.length > 0) {
                        tn(Set, e, arguments[0])
                    }
                    return e
                };
                o = i.prototype;
                var a = function (e) {
                    var t = e;
                    if (t === "^null") {
                        return null
                    } else if (t === "^undefined") {
                        return void 0
                    } else {
                        var r = t.charAt(0);
                        if (r === "$") {
                            return C(t, 1)
                        } else if (r === "n") {
                            return +C(t, 1)
                        } else if (r === "b") {
                            return t === "btrue"
                        }
                    }
                    return +t
                };
                var u = function ensureMap(e) {
                    if (!e["[[SetData]]"]) {
                        var t = new rn.Map;
                        e["[[SetData]]"] = t;
                        l(n(e._storage), function (e) {
                            var r = a(e);
                            t.set(r, r)
                        });
                        e["[[SetData]]"] = t
                    }
                    e._storage = null
                };
                m.getter(i.prototype, "size", function () {
                    r(this, "size");
                    if (this._storage) {
                        return n(this._storage).length
                    }
                    u(this);
                    return this["[[SetData]]"].size
                });
                b(i.prototype, {
                    has: function has(e) {
                        r(this, "has");
                        var t;
                        if (this._storage && (t = Yr(e)) !== null) {
                            return !!this._storage[t]
                        }
                        u(this);
                        return this["[[SetData]]"].has(e)
                    }, add: function add(e) {
                        r(this, "add");
                        var t;
                        if (this._storage && (t = Yr(e)) !== null) {
                            this._storage[t] = true;
                            return this
                        }
                        u(this);
                        this["[[SetData]]"].set(e, e);
                        return this
                    }, "delete": function (e) {
                        r(this, "delete");
                        var t;
                        if (this._storage && (t = Yr(e)) !== null) {
                            var n = z(this._storage, t);
                            return delete this._storage[t] && n
                        }
                        u(this);
                        return this["[[SetData]]"]["delete"](e)
                    }, clear: function clear() {
                        r(this, "clear");
                        if (this._storage) {
                            this._storage = Qr()
                        }
                        if (this["[[SetData]]"]) {
                            this["[[SetData]]"].clear()
                        }
                    }, values: function values() {
                        r(this, "values");
                        u(this);
                        return new f(this["[[SetData]]"].values())
                    }, entries: function entries() {
                        r(this, "entries");
                        u(this);
                        return new f(this["[[SetData]]"].entries())
                    }, forEach: function forEach(e) {
                        r(this, "forEach");
                        var n = arguments.length > 1 ? arguments[1] : null;
                        var o = this;
                        u(o);
                        this["[[SetData]]"].forEach(function (r, i) {
                            if (n) {
                                t(e, n, i, i, o)
                            } else {
                                e(i, i, o)
                            }
                        })
                    }
                });
                h(i.prototype, "keys", i.prototype.values, true);
                Me(i.prototype, i.prototype.values);
                var f = function SetIterator(e) {
                    this.it = e
                };
                f.prototype = {
                    isSetIterator: true, next: function next() {
                        if (!this.isSetIterator) {
                            throw new TypeError("Not a SetIterator")
                        }
                        return this.it.next()
                    }
                };
                Me(f.prototype);
                return i
            }()
        };
        var nn = S.Set && !Set.prototype["delete"] && Set.prototype.remove && Set.prototype.items && Set.prototype.map && Array.isArray((new Set).keys);
        if (nn) {
            S.Set = rn.Set
        }
        if (S.Map || S.Set) {
            var on = a(function () {
                return new Map([[1, 2]]).get(1) === 2
            });
            if (!on) {
                S.Map = function Map() {
                    if (!(this instanceof Map)) {
                        throw new TypeError('Constructor Map requires "new"')
                    }
                    var e = new G;
                    if (arguments.length > 0) {
                        en(Map, e, arguments[0])
                    }
                    delete e.constructor;
                    Object.setPrototypeOf(e, S.Map.prototype);
                    return e
                };
                S.Map.prototype = O(G.prototype);
                h(S.Map.prototype, "constructor", S.Map, true);
                m.preserveToString(S.Map, G)
            }
            var an = new Map;
            var un = function () {
                var e = new Map([[1, 0], [2, 0], [3, 0], [4, 0]]);
                e.set(-0, e);
                return e.get(0) === e && e.get(-0) === e && e.has(0) && e.has(-0)
            }();
            var fn = an.set(1, 2) === an;
            if (!un || !fn) {
                ne(Map.prototype, "set", function set(e, r) {
                    t(U, this, e === 0 ? 0 : e, r);
                    return this
                })
            }
            if (!un) {
                b(Map.prototype, {
                    get: function get(e) {
                        return t(V, this, e === 0 ? 0 : e)
                    }, has: function has(e) {
                        return t(B, this, e === 0 ? 0 : e)
                    }
                }, true);
                m.preserveToString(Map.prototype.get, V);
                m.preserveToString(Map.prototype.has, B)
            }
            var sn = new Set;
            var cn = Set.prototype["delete"] && Set.prototype.add && Set.prototype.has && function (e) {
                e["delete"](0);
                e.add(-0);
                return !e.has(0)
            }(sn);
            var ln = sn.add(1) === sn;
            if (!cn || !ln) {
                var pn = Set.prototype.add;
                Set.prototype.add = function add(e) {
                    t(pn, this, e === 0 ? 0 : e);
                    return this
                };
                m.preserveToString(Set.prototype.add, pn)
            }
            if (!cn) {
                var vn = Set.prototype.has;
                Set.prototype.has = function has(e) {
                    return t(vn, this, e === 0 ? 0 : e)
                };
                m.preserveToString(Set.prototype.has, vn);
                var yn = Set.prototype["delete"];
                Set.prototype["delete"] = function SetDelete(e) {
                    return t(yn, this, e === 0 ? 0 : e)
                };
                m.preserveToString(Set.prototype["delete"], yn)
            }
            var hn = w(S.Map, function (e) {
                var t = new e([]);
                t.set(42, 42);
                return t instanceof e
            });
            var bn = Object.setPrototypeOf && !hn;
            var gn = function () {
                try {
                    return !(S.Map() instanceof S.Map)
                } catch (e) {
                    return e instanceof TypeError
                }
            }();
            if (S.Map.length !== 0 || bn || !gn) {
                S.Map = function Map() {
                    if (!(this instanceof Map)) {
                        throw new TypeError('Constructor Map requires "new"')
                    }
                    var e = new G;
                    if (arguments.length > 0) {
                        en(Map, e, arguments[0])
                    }
                    delete e.constructor;
                    Object.setPrototypeOf(e, Map.prototype);
                    return e
                };
                S.Map.prototype = G.prototype;
                h(S.Map.prototype, "constructor", S.Map, true);
                m.preserveToString(S.Map, G)
            }
            var dn = w(S.Set, function (e) {
                var t = new e([]);
                t.add(42, 42);
                return t instanceof e
            });
            var mn = Object.setPrototypeOf && !dn;
            var On = function () {
                try {
                    return !(S.Set() instanceof S.Set)
                } catch (e) {
                    return e instanceof TypeError
                }
            }();
            if (S.Set.length !== 0 || mn || !On) {
                var wn = S.Set;
                S.Set = function Set() {
                    if (!(this instanceof Set)) {
                        throw new TypeError('Constructor Set requires "new"')
                    }
                    var e = new wn;
                    if (arguments.length > 0) {
                        tn(Set, e, arguments[0])
                    }
                    delete e.constructor;
                    Object.setPrototypeOf(e, Set.prototype);
                    return e
                };
                S.Set.prototype = wn.prototype;
                h(S.Set.prototype, "constructor", S.Set, true);
                m.preserveToString(S.Set, wn)
            }
            var jn = new S.Map;
            var Sn = !a(function () {
                return jn.keys().next().done
            });
            if (typeof S.Map.prototype.clear !== "function" || (new S.Set).size !== 0 || jn.size !== 0 || typeof S.Map.prototype.keys !== "function" || typeof S.Set.prototype.keys !== "function" || typeof S.Map.prototype.forEach !== "function" || typeof S.Set.prototype.forEach !== "function" || u(S.Map) || u(S.Set) || typeof jn.keys().next !== "function" || Sn || !hn) {
                b(S, {Map: rn.Map, Set: rn.Set}, true)
            }
            if (S.Set.prototype.keys !== S.Set.prototype.values) {
                h(S.Set.prototype, "keys", S.Set.prototype.values, true)
            }
            Me(Object.getPrototypeOf((new S.Map).keys()));
            Me(Object.getPrototypeOf((new S.Set).keys()));
            if (c && S.Set.prototype.has.name !== "has") {
                var Tn = S.Set.prototype.has;
                ne(S.Set.prototype, "has", function has(e) {
                    return t(Tn, this, e)
                })
            }
        }
        b(S, rn);
        Ce(S.Map);
        Ce(S.Set)
    }
    var In = function throwUnlessTargetIsObject(e) {
        if (!ce.TypeIsObject(e)) {
            throw new TypeError("target must be an object")
        }
    };
    var En = {
        apply: function apply() {
            return ce.Call(ce.Call, null, arguments)
        }, construct: function construct(e, t) {
            if (!ce.IsConstructor(e)) {
                throw new TypeError("First argument must be a constructor.")
            }
            var r = arguments.length > 2 ? arguments[2] : e;
            if (!ce.IsConstructor(r)) {
                throw new TypeError("new.target must be a constructor.")
            }
            return ce.Construct(e, t, r, "internal")
        }, deleteProperty: function deleteProperty(e, t) {
            In(e);
            if (s) {
                var r = Object.getOwnPropertyDescriptor(e, t);
                if (r && !r.configurable) {
                    return false
                }
            }
            return delete e[t]
        }, has: function has(e, t) {
            In(e);
            return t in e
        }
    };
    if (Object.getOwnPropertyNames) {
        Object.assign(En, {
            ownKeys: function ownKeys(e) {
                In(e);
                var t = Object.getOwnPropertyNames(e);
                if (ce.IsCallable(Object.getOwnPropertySymbols)) {
                    x(t, Object.getOwnPropertySymbols(e))
                }
                return t
            }
        })
    }
    var Pn = function ConvertExceptionToBoolean(e) {
        return !i(e)
    };
    if (Object.preventExtensions) {
        Object.assign(En, {
            isExtensible: function isExtensible(e) {
                In(e);
                return Object.isExtensible(e)
            }, preventExtensions: function preventExtensions(e) {
                In(e);
                return Pn(function () {
                    return Object.preventExtensions(e)
                })
            }
        })
    }
    if (s) {
        var Cn = function get(e, t, r) {
            var n = Object.getOwnPropertyDescriptor(e, t);
            if (!n) {
                var o = Object.getPrototypeOf(e);
                if (o === null) {
                    return void 0
                }
                return Cn(o, t, r)
            }
            if ("value" in n) {
                return n.value
            }
            if (n.get) {
                return ce.Call(n.get, r)
            }
            return void 0
        };
        var Mn = function set(e, r, n, o) {
            var i = Object.getOwnPropertyDescriptor(e, r);
            if (!i) {
                var a = Object.getPrototypeOf(e);
                if (a !== null) {
                    return Mn(a, r, n, o)
                }
                i = {value: void 0, writable: true, enumerable: true, configurable: true}
            }
            if ("value" in i) {
                if (!i.writable) {
                    return false
                }
                if (!ce.TypeIsObject(o)) {
                    return false
                }
                var u = Object.getOwnPropertyDescriptor(o, r);
                if (u) {
                    return ae.defineProperty(o, r, {value: n})
                } else {
                    return ae.defineProperty(o, r, {value: n, writable: true, enumerable: true, configurable: true})
                }
            }
            if (i.set) {
                t(i.set, o, n);
                return true
            }
            return false
        };
        Object.assign(En, {
            defineProperty: function defineProperty(e, t, r) {
                In(e);
                return Pn(function () {
                    return Object.defineProperty(e, t, r)
                })
            }, getOwnPropertyDescriptor: function getOwnPropertyDescriptor(e, t) {
                In(e);
                return Object.getOwnPropertyDescriptor(e, t)
            }, get: function get(e, t) {
                In(e);
                var r = arguments.length > 2 ? arguments[2] : e;
                return Cn(e, t, r)
            }, set: function set(e, t, r) {
                In(e);
                var n = arguments.length > 3 ? arguments[3] : e;
                return Mn(e, t, r, n)
            }
        })
    }
    if (Object.getPrototypeOf) {
        var xn = Object.getPrototypeOf;
        En.getPrototypeOf = function getPrototypeOf(e) {
            In(e);
            return xn(e)
        }
    }
    if (Object.setPrototypeOf && En.getPrototypeOf) {
        var Nn = function (e, t) {
            var r = t;
            while (r) {
                if (e === r) {
                    return true
                }
                r = En.getPrototypeOf(r)
            }
            return false
        };
        Object.assign(En, {
            setPrototypeOf: function setPrototypeOf(e, t) {
                In(e);
                if (t !== null && !ce.TypeIsObject(t)) {
                    throw new TypeError("proto must be an object or null")
                }
                if (t === ae.getPrototypeOf(e)) {
                    return true
                }
                if (ae.isExtensible && !ae.isExtensible(e)) {
                    return false
                }
                if (Nn(e, t)) {
                    return false
                }
                Object.setPrototypeOf(e, t);
                return true
            }
        })
    }
    var An = function (e, t) {
        if (!ce.IsCallable(S.Reflect[e])) {
            h(S.Reflect, e, t)
        } else {
            var r = a(function () {
                S.Reflect[e](1);
                S.Reflect[e](NaN);
                S.Reflect[e](true);
                return true
            });
            if (r) {
                ne(S.Reflect, e, t)
            }
        }
    };
    Object.keys(En).forEach(function (e) {
        An(e, En[e])
    });
    var Rn = S.Reflect.getPrototypeOf;
    if (c && Rn && Rn.name !== "getPrototypeOf") {
        ne(S.Reflect, "getPrototypeOf", function getPrototypeOf(e) {
            return t(Rn, S.Reflect, e)
        })
    }
    if (S.Reflect.setPrototypeOf) {
        if (a(function () {
            S.Reflect.setPrototypeOf(1, {});
            return true
        })) {
            ne(S.Reflect, "setPrototypeOf", En.setPrototypeOf)
        }
    }
    if (S.Reflect.defineProperty) {
        if (!a(function () {
            var e = !S.Reflect.defineProperty(1, "test", {value: 1});
            var t = typeof Object.preventExtensions !== "function" || !S.Reflect.defineProperty(Object.preventExtensions({}), "test", {});
            return e && t
        })) {
            ne(S.Reflect, "defineProperty", En.defineProperty)
        }
    }
    if (S.Reflect.construct) {
        if (!a(function () {
            var e = function F() {
            };
            return S.Reflect.construct(function () {
            }, [], e) instanceof e
        })) {
            ne(S.Reflect, "construct", En.construct)
        }
    }
    if (String(new Date(NaN)) !== "Invalid Date") {
        var _n = Date.prototype.toString;
        var kn = function toString() {
            var e = +this;
            if (e !== e) {
                return "Invalid Date"
            }
            return ce.Call(_n, this)
        };
        ne(Date.prototype, "toString", kn)
    }
    var Ln = {
        anchor: function anchor(e) {
            return ce.CreateHTML(this, "a", "name", e)
        }, big: function big() {
            return ce.CreateHTML(this, "big", "", "")
        }, blink: function blink() {
            return ce.CreateHTML(this, "blink", "", "")
        }, bold: function bold() {
            return ce.CreateHTML(this, "b", "", "")
        }, fixed: function fixed() {
            return ce.CreateHTML(this, "tt", "", "")
        }, fontcolor: function fontcolor(e) {
            return ce.CreateHTML(this, "font", "color", e)
        }, fontsize: function fontsize(e) {
            return ce.CreateHTML(this, "font", "size", e)
        }, italics: function italics() {
            return ce.CreateHTML(this, "i", "", "")
        }, link: function link(e) {
            return ce.CreateHTML(this, "a", "href", e)
        }, small: function small() {
            return ce.CreateHTML(this, "small", "", "")
        }, strike: function strike() {
            return ce.CreateHTML(this, "strike", "", "")
        }, sub: function sub() {
            return ce.CreateHTML(this, "sub", "", "")
        }, sup: function sub() {
            return ce.CreateHTML(this, "sup", "", "")
        }
    };
    l(Object.keys(Ln), function (e) {
        var r = String.prototype[e];
        var n = false;
        if (ce.IsCallable(r)) {
            var o = t(r, "", ' " ');
            var i = P([], o.match(/"/g)).length;
            n = o !== o.toLowerCase() || i > 2
        } else {
            n = true
        }
        if (n) {
            ne(String.prototype, e, Ln[e])
        }
    });
    var Fn = function () {
        if (!oe) {
            return false
        }
        var e = typeof JSON === "object" && typeof JSON.stringify === "function" ? JSON.stringify : null;
        if (!e) {
            return false
        }
        if (typeof e($()) !== "undefined") {
            return true
        }
        if (e([$()]) !== "[null]") {
            return true
        }
        var t = {a: $()};
        t[$()] = true;
        if (e(t) !== "{}") {
            return true
        }
        return false
    }();
    var Dn = a(function () {
        if (!oe) {
            return true
        }
        return JSON.stringify(Object($())) === "{}" && JSON.stringify([Object($())]) === "[{}]"
    });
    if (Fn || !Dn) {
        var zn = JSON.stringify;
        ne(JSON, "stringify", function stringify(e) {
            if (typeof e === "symbol") {
                return
            }
            var n;
            if (arguments.length > 1) {
                n = arguments[1]
            }
            var o = [e];
            if (!r(n)) {
                var i = ce.IsCallable(n) ? n : null;
                var a = function (e, r) {
                    var n = i ? t(i, this, e, r) : r;
                    if (typeof n !== "symbol") {
                        if (re.symbol(n)) {
                            return Nt({})(n)
                        } else {
                            return n
                        }
                    }
                };
                o.push(a)
            } else {
                o.push(n)
            }
            if (arguments.length > 2) {
                o.push(arguments[2])
            }
            return zn.apply(this, o)
        })
    }
    return S
});
//# sourceMappingURL=es6-shim.map

/*!
 * https://github.com/paulmillr/es6-shim
 * @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com)
 *   and contributors,  MIT License
 * es6-sham: v0.35.4
 * see https://github.com/paulmillr/es6-shim/blob/0.35.3/LICENSE
 * Details and documentation:
 * https://github.com/paulmillr/es6-shim/
 */
(function (t, e) {
    if (typeof define === "function" && define.amd) {
        define(e)
    } else if (typeof exports === "object") {
        module.exports = e()
    } else {
        t.returnExports = e()
    }
})(this, function () {
    "use strict";
    var t = new Function("return this;");
    var e = t();
    var r = e.Object;
    var n = Function.call.bind(Function.call);
    var o = Function.toString;
    var i = String.prototype.match;
    var f = function (t) {
        try {
            t();
            return false
        } catch (e) {
            return true
        }
    };
    var a = function () {
        return !f(function () {
            r.defineProperty({}, "x", {
                get: function () {
                }
            })
        })
    };
    var u = !!r.defineProperty && a();
    (function () {
        if (r.setPrototypeOf) {
            return
        }
        var t = r.getOwnPropertyNames;
        var e = r.getOwnPropertyDescriptor;
        var n = r.create;
        var o = r.defineProperty;
        var i = r.getPrototypeOf;
        var f = r.prototype;
        var a = function (r, n) {
            t(n).forEach(function (t) {
                o(r, t, e(n, t))
            });
            return r
        };
        var u = function (t, e) {
            return a(n(e), t)
        };
        var c, s;
        try {
            c = e(f, "__proto__").set;
            c.call({}, null);
            s = function (t, e) {
                c.call(t, e);
                return t
            }
        } catch (l) {
            c = {__proto__: null};
            if (c instanceof r) {
                s = u
            } else {
                c.__proto__ = f;
                if (c instanceof r) {
                    s = function (t, e) {
                        t.__proto__ = e;
                        return t
                    }
                } else {
                    s = function (t, e) {
                        if (i(t)) {
                            t.__proto__ = e;
                            return t
                        } else {
                            return u(t, e)
                        }
                    }
                }
            }
        }
        r.setPrototypeOf = s
    })();
    if (u && function foo() {
    }.name !== "foo") {
        r.defineProperty(Function.prototype, "name", {
            configurable: true, enumerable: false, get: function () {
                var t = n(o, this);
                var e = n(i, t, /\s*function\s+([^(\s]*)\s*/);
                var f = e && e[1];
                r.defineProperty(this, "name", {configurable: true, enumerable: false, writable: false, value: f});
                return f
            }
        })
    }
});
//# sourceMappingURL=es6-sham.map

(function t(e, r, n) {
    function i(p, u) {
        if (!r[p]) {
            if (!e[p]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(p, !0);
                if (o) return o(p, !0);
                var l = new Error("Cannot find module '" + p + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var s = r[p] = {exports: {}};
            e[p][0].call(s.exports, function (t) {
                var r = e[p][1][t];
                return i(r ? r : t)
            }, s, s.exports, t, e, r, n)
        }
        return r[p].exports
    }

    var o = typeof require == "function" && require;
    for (var p = 0; p < n.length; p++) i(n[p]);
    return i
})({
    1: [function (t, e, r) {
        "use strict";
        var n = t("./Array.prototype");
        e.exports = {
            prototype: n, shim: function t() {
                n.shim()
            }
        }
    }, {"./Array.prototype": 3}],
    2: [function (t, e, r) {
        "use strict";
        e.exports = t("array-includes")
    }, {"array-includes": 14}],
    3: [function (t, e, r) {
        "use strict";
        var n = t("./Array.prototype.includes");
        e.exports = {
            includes: n, shim: function t() {
                n.shim()
            }
        }
    }, {"./Array.prototype.includes": 2}],
    4: [function (t, e, r) {
        "use strict";
        var n = t("object.getownpropertydescriptors");
        var i = t("object.entries");
        var o = t("object.values");
        e.exports = {
            entries: i, getOwnPropertyDescriptors: n, shim: function t() {
                n.shim();
                i.shim();
                o.shim()
            }, values: o
        }
    }, {"object.entries": 38, "object.getownpropertydescriptors": 64, "object.values": 89}],
    5: [function (t, e, r) {
        "use strict";
        var n = t("./String.prototype");
        e.exports = {
            prototype: n, shim: function t() {
                n.shim()
            }
        }
    }, {"./String.prototype": 7}],
    6: [function (t, e, r) {
        "use strict";
        e.exports = t("string-at")
    }, {"string-at": 114}],
    7: [function (t, e, r) {
        "use strict";
        var n = t("./String.prototype.at");
        var i = t("./String.prototype.padStart");
        var o = t("./String.prototype.padEnd");
        var p = t("./String.prototype.trimLeft");
        var u = t("./String.prototype.trimRight");
        e.exports = {
            at: n, padStart: i, padEnd: o, trimLeft: p, trimRight: u, shim: function t() {
                n.shim();
                i.shim();
                o.shim();
                p.shim();
                u.shim()
            }
        }
    }, {
        "./String.prototype.at": 6,
        "./String.prototype.padEnd": 8,
        "./String.prototype.padStart": 9,
        "./String.prototype.trimLeft": 10,
        "./String.prototype.trimRight": 11
    }],
    8: [function (t, e, r) {
        "use strict";
        e.exports = t("string.prototype.padend")
    }, {"string.prototype.padend": 137}],
    9: [function (t, e, r) {
        "use strict";
        e.exports = t("string.prototype.padstart")
    }, {"string.prototype.padstart": 162}],
    10: [function (t, e, r) {
        "use strict";
        e.exports = t("string.prototype.trimleft")
    }, {"string.prototype.trimleft": 187}],
    11: [function (t, e, r) {
        "use strict";
        e.exports = t("string.prototype.trimright")
    }, {"string.prototype.trimright": 197}],
    12: [function (t, e, r) {/*!
 * https://github.com/es-shims/es7-shim
 * @license es7-shim Copyright 2014 by contributors, MIT License
 * see https://github.com/es-shims/es7-shim/blob/master/LICENSE
 */
        "use strict";
        var n = t("./Array");
        var i = t("./Object");
        var o = t("./String");
        e.exports = {
            Array: n, Object: i, String: o, shim: function t() {
                n.shim();
                i.shim();
                o.shim()
            }
        }
    }, {"./Array": 1, "./Object": 4, "./String": 5}],
    13: [function (t, e, r) {
        (function (r) {
            "use strict";
            var n = t("es-abstract/es6");
            var i = Number.isNaN || function (t) {
                return t !== t
            };
            var o = Number.isFinite || function (t) {
                return typeof t === "number" && r.isFinite(t)
            };
            var p = Array.prototype.indexOf;
            e.exports = function t(e) {
                var r = arguments.length > 1 ? n.ToInteger(arguments[1]) : 0;
                if (p && !i(e) && o(r) && typeof e !== "undefined") {
                    return p.apply(this, arguments) > -1
                }
                var u = n.ToObject(this);
                var a = n.ToLength(u.length);
                if (a === 0) {
                    return false
                }
                var l = r >= 0 ? r : Math.max(0, a + r);
                while (l < a) {
                    if (n.SameValueZero(e, u[l])) {
                        return true
                    }
                    l += 1
                }
                return false
            }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"es-abstract/es6": 17}],
    14: [function (t, e, r) {
        "use strict";
        var n = t("define-properties");
        var i = t("es-abstract/es6");
        var o = t("./implementation");
        var p = t("./polyfill");
        var u = p();
        var a = t("./shim");
        var l = Array.prototype.slice;
        var s = function t(e, r) {
            i.RequireObjectCoercible(e);
            return u.apply(e, l.call(arguments, 1))
        };
        n(s, {implementation: o, getPolyfill: p, shim: a});
        e.exports = s
    }, {"./implementation": 13, "./polyfill": 35, "./shim": 36, "define-properties": 15, "es-abstract/es6": 17}],
    15: [function (t, e, r) {
        "use strict";
        var n = t("object-keys");
        var i = t("foreach");
        var o = typeof Symbol === "function" && typeof Symbol() === "symbol";
        var p = Object.prototype.toString;
        var u = function (t) {
            return typeof t === "function" && p.call(t) === "[object Function]"
        };
        var a = function () {
            var t = {};
            try {
                Object.defineProperty(t, "x", {enumerable: false, value: t});
                for (var e in t) {
                    return false
                }
                return t.x === t
            } catch (t) {
                return false
            }
        };
        var l = Object.defineProperty && a();
        var s = function (t, e, r, n) {
            if (e in t && (!u(n) || !n())) {
                return
            }
            if (l) {
                Object.defineProperty(t, e, {configurable: true, enumerable: false, value: r, writable: true})
            } else {
                t[e] = r
            }
        };
        var c = function (t, e) {
            var r = arguments.length > 2 ? arguments[2] : {};
            var p = n(e);
            if (o) {
                p = p.concat(Object.getOwnPropertySymbols(e))
            }
            i(p, function (n) {
                s(t, n, e[n], r[n])
            })
        };
        c.supportsDescriptors = !!l;
        e.exports = c
    }, {foreach: 26, "object-keys": 33}],
    16: [function (t, e, r) {
        "use strict";
        var n = Number.isNaN || function (t) {
            return t !== t
        };
        var i = t("./helpers/isFinite");
        var o = t("./helpers/sign");
        var p = t("./helpers/mod");
        var u = t("is-callable");
        var a = t("es-to-primitive/es5");
        var l = {
            ToPrimitive: a, ToBoolean: function t(e) {
                return Boolean(e)
            }, ToNumber: function t(e) {
                return Number(e)
            }, ToInteger: function t(e) {
                var r = this.ToNumber(e);
                if (n(r)) {
                    return 0
                }
                if (r === 0 || !i(r)) {
                    return r
                }
                return o(r) * Math.floor(Math.abs(r))
            }, ToInt32: function t(e) {
                return this.ToNumber(e) >> 0
            }, ToUint32: function t(e) {
                return this.ToNumber(e) >>> 0
            }, ToUint16: function t(e) {
                var r = this.ToNumber(e);
                if (n(r) || r === 0 || !i(r)) {
                    return 0
                }
                var u = o(r) * Math.floor(Math.abs(r));
                return p(u, 65536)
            }, ToString: function t(e) {
                return String(e)
            }, ToObject: function t(e) {
                this.CheckObjectCoercible(e);
                return Object(e)
            }, CheckObjectCoercible: function t(e, r) {
                if (e == null) {
                    throw new TypeError(r || "Cannot call method on " + e)
                }
                return e
            }, IsCallable: u, SameValue: function t(e, r) {
                if (e === r) {
                    if (e === 0) {
                        return 1 / e === 1 / r
                    }
                    return true
                }
                return n(e) && n(r)
            }
        };
        e.exports = l
    }, {
        "./helpers/isFinite": 19,
        "./helpers/mod": 21,
        "./helpers/sign": 22,
        "es-to-primitive/es5": 23,
        "is-callable": 29
    }],
    17: [function (t, e, r) {
        "use strict";
        var n = Object.prototype.toString;
        var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol";
        var o = i ? Symbol.prototype.toString : n;
        var p = Number.isNaN || function (t) {
            return t !== t
        };
        var u = t("./helpers/isFinite");
        var a = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
        var l = t("./helpers/assign");
        var s = t("./helpers/sign");
        var c = t("./helpers/mod");
        var f = t("./helpers/isPrimitive");
        var y = t("es-to-primitive/es6");
        var v = parseInt;
        var m = t("function-bind");
        var b = m.call(Function.call, String.prototype.slice);
        var d = m.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
        var h = m.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
        var g = ["\x85", "\u200b", "\ufffe"].join("");
        var S = new RegExp("[" + g + "]", "g");
        var j = m.call(Function.call, RegExp.prototype.test, S);
        var x = /^[\-\+]0x[0-9a-f]+$/i;
        var O = m.call(Function.call, RegExp.prototype.test, x);
        var w = ["\t\n\v\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003", "\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028", "\u2029\ufeff"].join("");
        var T = new RegExp("(^[" + w + "]+)|([" + w + "]+$)", "g");
        var F = m.call(Function.call, String.prototype.replace);
        var P = function (t) {
            return F(t, T, "")
        };
        var E = t("./es5");
        var N = t("is-regex");
        var A = l(l({}, E), {
            Call: function t(e, r) {
                var n = arguments.length > 2 ? arguments[2] : [];
                if (!this.IsCallable(e)) {
                    throw new TypeError(e + " is not a function")
                }
                return e.apply(r, n)
            }, ToPrimitive: y, ToNumber: function t(e) {
                var r = f(e) ? e : y(e, "number");
                if (typeof r === "symbol") {
                    throw new TypeError("Cannot convert a Symbol value to a number")
                }
                if (typeof r === "string") {
                    if (d(r)) {
                        return this.ToNumber(v(b(r, 2), 2))
                    } else if (h(r)) {
                        return this.ToNumber(v(b(r, 2), 8))
                    } else if (j(r) || O(r)) {
                        return NaN
                    } else {
                        var n = P(r);
                        if (n !== r) {
                            return this.ToNumber(n)
                        }
                    }
                }
                return Number(r)
            }, ToInt16: function t(e) {
                var r = this.ToUint16(e);
                return r >= 32768 ? r - 65536 : r
            }, ToInt8: function t(e) {
                var r = this.ToUint8(e);
                return r >= 128 ? r - 256 : r
            }, ToUint8: function t(e) {
                var r = this.ToNumber(e);
                if (p(r) || r === 0 || !u(r)) {
                    return 0
                }
                var n = s(r) * Math.floor(Math.abs(r));
                return c(n, 256)
            }, ToUint8Clamp: function t(e) {
                var r = this.ToNumber(e);
                if (p(r) || r <= 0) {
                    return 0
                }
                if (r >= 255) {
                    return 255
                }
                var n = Math.floor(e);
                if (n + .5 < r) {
                    return n + 1
                }
                if (r < n + .5) {
                    return n
                }
                if (n % 2 !== 0) {
                    return n + 1
                }
                return n
            }, ToString: function t(e) {
                if (typeof e === "symbol") {
                    throw new TypeError("Cannot convert a Symbol value to a string")
                }
                return String(e)
            }, ToObject: function t(e) {
                this.RequireObjectCoercible(e);
                return Object(e)
            }, ToPropertyKey: function t(e) {
                var r = this.ToPrimitive(e, String);
                return typeof r === "symbol" ? o.call(r) : this.ToString(r)
            }, ToLength: function t(e) {
                var r = this.ToInteger(e);
                if (r <= 0) {
                    return 0
                }
                if (r > a) {
                    return a
                }
                return r
            }, CanonicalNumericIndexString: function t(e) {
                if (n.call(e) !== "[object String]") {
                    throw new TypeError("must be a string")
                }
                if (e === "-0") {
                    return -0
                }
                var r = this.ToNumber(e);
                if (this.SameValue(this.ToString(r), e)) {
                    return r
                }
            }, RequireObjectCoercible: E.CheckObjectCoercible, IsArray: Array.isArray || function t(e) {
                return n.call(e) === "[object Array]"
            }, IsConstructor: function t(e) {
                return this.IsCallable(e)
            }, IsExtensible: function t(e) {
                if (!Object.preventExtensions) {
                    return true
                }
                if (f(e)) {
                    return false
                }
                return Object.isExtensible(e)
            }, IsInteger: function t(e) {
                if (typeof e !== "number" || p(e) || !u(e)) {
                    return false
                }
                var r = Math.abs(e);
                return Math.floor(r) === r
            }, IsPropertyKey: function t(e) {
                return typeof e === "string" || typeof e === "symbol"
            }, IsRegExp: function t(e) {
                if (!e || typeof e !== "object") {
                    return false
                }
                if (i) {
                    var r = RegExp[Symbol.match];
                    if (typeof r !== "undefined") {
                        return E.ToBoolean(r)
                    }
                }
                return N(e)
            }, SameValueZero: function t(e, r) {
                return e === r || p(e) && p(r)
            }
        });
        delete A.CheckObjectCoercible;
        e.exports = A
    }, {
        "./es5": 16,
        "./helpers/assign": 18,
        "./helpers/isFinite": 19,
        "./helpers/isPrimitive": 20,
        "./helpers/mod": 21,
        "./helpers/sign": 22,
        "es-to-primitive/es6": 24,
        "function-bind": 28,
        "is-regex": 31
    }],
    18: [function (t, e, r) {
        var n = Object.prototype.hasOwnProperty;
        e.exports = Object.assign || function t(e, r) {
            for (var i in r) {
                if (n.call(r, i)) {
                    e[i] = r[i]
                }
            }
            return e
        }
    }, {}],
    19: [function (t, e, r) {
        var n = Number.isNaN || function (t) {
            return t !== t
        };
        e.exports = Number.isFinite || function (t) {
            return typeof t === "number" && !n(t) && t !== Infinity && t !== -Infinity
        }
    }, {}],
    20: [function (t, e, r) {
        e.exports = function t(e) {
            return e === null || typeof e !== "function" && typeof e !== "object"
        }
    }, {}],
    21: [function (t, e, r) {
        e.exports = function t(e, r) {
            var n = e % r;
            return Math.floor(n >= 0 ? n : n + r)
        }
    }, {}],
    22: [function (t, e, r) {
        e.exports = function t(e) {
            return e >= 0 ? 1 : -1
        }
    }, {}],
    23: [function (t, e, r) {
        "use strict";
        var n = Object.prototype.toString;
        var i = t("./helpers/isPrimitive");
        var o = t("is-callable");
        var p = {
            "[[DefaultValue]]": function (t, e) {
                var r = e || (n.call(t) === "[object Date]" ? String : Number);
                if (r === String || r === Number) {
                    var p = r === String ? ["toString", "valueOf"] : ["valueOf", "toString"];
                    var u, a;
                    for (a = 0; a < p.length; ++a) {
                        if (o(t[p[a]])) {
                            u = t[p[a]]();
                            if (i(u)) {
                                return u
                            }
                        }
                    }
                    throw new TypeError("No default value")
                }
                throw new TypeError("invalid [[DefaultValue]] hint supplied")
            }
        };
        e.exports = function t(e, r) {
            if (i(e)) {
                return e
            }
            return p["[[DefaultValue]]"](e, r)
        }
    }, {"./helpers/isPrimitive": 25, "is-callable": 29}],
    24: [function (t, e, r) {
        "use strict";
        var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol";
        var i = t("./helpers/isPrimitive");
        var o = t("is-callable");
        var p = t("is-date-object");
        var u = t("is-symbol");
        var a = function t(e, r) {
            if (typeof e === "undefined" || e === null) {
                throw new TypeError("Cannot call method on " + e)
            }
            if (typeof r !== "string" || r !== "number" && r !== "string") {
                throw new TypeError('hint must be "string" or "number"')
            }
            var n = r === "string" ? ["toString", "valueOf"] : ["valueOf", "toString"];
            var p, u, a;
            for (a = 0; a < n.length; ++a) {
                p = e[n[a]];
                if (o(p)) {
                    u = p.call(e);
                    if (i(u)) {
                        return u
                    }
                }
            }
            throw new TypeError("No default value")
        };
        var l = function t(e, r) {
            var n = e[r];
            if (n !== null && typeof n !== "undefined") {
                if (!o(n)) {
                    throw new TypeError(n + " returned for property " + r + " of object " + e + " is not a function")
                }
                return n
            }
        };
        e.exports = function t(e, r) {
            if (i(e)) {
                return e
            }
            var o = "default";
            if (arguments.length > 1) {
                if (r === String) {
                    o = "string"
                } else if (r === Number) {
                    o = "number"
                }
            }
            var s;
            if (n) {
                if (Symbol.toPrimitive) {
                    s = l(e, Symbol.toPrimitive)
                } else if (u(e)) {
                    s = Symbol.prototype.valueOf
                }
            }
            if (typeof s !== "undefined") {
                var c = s.call(e, o);
                if (i(c)) {
                    return c
                }
                throw new TypeError("unable to convert exotic object to primitive")
            }
            if (o === "default" && (p(e) || u(e))) {
                o = "string"
            }
            return a(e, o === "default" ? "number" : o)
        }
    }, {"./helpers/isPrimitive": 25, "is-callable": 29, "is-date-object": 30, "is-symbol": 32}],
    25: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    26: [function (t, e, r) {
        var n = Object.prototype.hasOwnProperty;
        var i = Object.prototype.toString;
        e.exports = function t(e, r, o) {
            if (i.call(r) !== "[object Function]") {
                throw new TypeError("iterator must be a function")
            }
            var p = e.length;
            if (p === +p) {
                for (var u = 0; u < p; u++) {
                    r.call(o, e[u], u, e)
                }
            } else {
                for (var a in e) {
                    if (n.call(e, a)) {
                        r.call(o, e[a], a, e)
                    }
                }
            }
        }
    }, {}],
    27: [function (t, e, r) {
        var n = "Function.prototype.bind called on incompatible ";
        var i = Array.prototype.slice;
        var o = Object.prototype.toString;
        var p = "[object Function]";
        e.exports = function t(e) {
            var r = this;
            if (typeof r !== "function" || o.call(r) !== p) {
                throw new TypeError(n + r)
            }
            var u = i.call(arguments, 1);
            var a;
            var l = function () {
                if (this instanceof a) {
                    var t = r.apply(this, u.concat(i.call(arguments)));
                    if (Object(t) === t) {
                        return t
                    }
                    return this
                } else {
                    return r.apply(e, u.concat(i.call(arguments)))
                }
            };
            var s = Math.max(0, r.length - u.length);
            var c = [];
            for (var f = 0; f < s; f++) {
                c.push("$" + f)
            }
            a = Function("binder", "return function (" + c.join(",") + "){ return binder.apply(this,arguments); }")(l);
            if (r.prototype) {
                var y = function t() {
                };
                y.prototype = r.prototype;
                a.prototype = new y;
                y.prototype = null
            }
            return a
        }
    }, {}],
    28: [function (t, e, r) {
        var n = t("./implementation");
        e.exports = Function.prototype.bind || n
    }, {"./implementation": 27}],
    29: [function (t, e, r) {
        "use strict";
        var n = Function.prototype.toString;
        var i = /^\s*class /;
        var o = function t(e) {
            try {
                var r = n.call(e);
                var o = r.replace(/\/\/.*\n/g, "");
                var p = o.replace(/\/\*[.\s\S]*\*\//g, "");
                var u = p.replace(/\n/gm, " ").replace(/ {2}/g, " ");
                return i.test(u)
            } catch (t) {
                return false
            }
        };
        var p = function t(e) {
            try {
                if (o(e)) {
                    return false
                }
                n.call(e);
                return true
            } catch (t) {
                return false
            }
        };
        var u = Object.prototype.toString;
        var a = "[object Function]";
        var l = "[object GeneratorFunction]";
        var s = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
        e.exports = function t(e) {
            if (!e) {
                return false
            }
            if (typeof e !== "function" && typeof e !== "object") {
                return false
            }
            if (s) {
                return p(e)
            }
            if (o(e)) {
                return false
            }
            var r = u.call(e);
            return r === a || r === l
        }
    }, {}],
    30: [function (t, e, r) {
        "use strict";
        var n = Date.prototype.getDay;
        var i = function t(e) {
            try {
                n.call(e);
                return true
            } catch (t) {
                return false
            }
        };
        var o = Object.prototype.toString;
        var p = "[object Date]";
        var u = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
        e.exports = function t(e) {
            if (typeof e !== "object" || e === null) {
                return false
            }
            return u ? i(e) : o.call(e) === p
        }
    }, {}],
    31: [function (t, e, r) {
        "use strict";
        var n = RegExp.prototype.exec;
        var i = function t(e) {
            try {
                n.call(e);
                return true
            } catch (t) {
                return false
            }
        };
        var o = Object.prototype.toString;
        var p = "[object RegExp]";
        var u = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
        e.exports = function t(e) {
            if (typeof e !== "object") {
                return false
            }
            return u ? i(e) : o.call(e) === p
        }
    }, {}],
    32: [function (t, e, r) {
        "use strict";
        var n = Object.prototype.toString;
        var i = typeof Symbol === "function" && typeof Symbol() === "symbol";
        if (i) {
            var o = Symbol.prototype.toString;
            var p = /^Symbol\(.*\)$/;
            var u = function t(e) {
                if (typeof e.valueOf() !== "symbol") {
                    return false
                }
                return p.test(o.call(e))
            };
            e.exports = function t(e) {
                if (typeof e === "symbol") {
                    return true
                }
                if (n.call(e) !== "[object Symbol]") {
                    return false
                }
                try {
                    return u(e)
                } catch (t) {
                    return false
                }
            }
        } else {
            e.exports = function t(e) {
                return false
            }
        }
    }, {}],
    33: [function (t, e, r) {
        "use strict";
        var n = Object.prototype.hasOwnProperty;
        var i = Object.prototype.toString;
        var o = Array.prototype.slice;
        var p = t("./isArguments");
        var u = !{toString: null}.propertyIsEnumerable("toString");
        var a = function () {
        }.propertyIsEnumerable("prototype");
        var l = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
        var s = function (t) {
            var e = t.constructor;
            return e && e.prototype === t
        };
        var c = {
            $console: true,
            $frame: true,
            $frameElement: true,
            $frames: true,
            $parent: true,
            $self: true,
            $webkitIndexedDB: true,
            $webkitStorageInfo: true,
            $window: true
        };
        var f = function () {
            if (typeof window === "undefined") {
                return false
            }
            for (var t in window) {
                try {
                    if (!c["$" + t] && n.call(window, t) && window[t] !== null && typeof window[t] === "object") {
                        try {
                            s(window[t])
                        } catch (t) {
                            return true
                        }
                    }
                } catch (t) {
                    return true
                }
            }
            return false
        }();
        var y = function (t) {
            if (typeof window === "undefined" || !f) {
                return s(t)
            }
            try {
                return s(t)
            } catch (t) {
                return false
            }
        };
        var v = function t(e) {
            var r = e !== null && typeof e === "object";
            var o = i.call(e) === "[object Function]";
            var s = p(e);
            var c = r && i.call(e) === "[object String]";
            var f = [];
            if (!r && !o && !s) {
                throw new TypeError("Object.keys called on a non-object")
            }
            var v = a && o;
            if (c && e.length > 0 && !n.call(e, 0)) {
                for (var m = 0; m < e.length; ++m) {
                    f.push(String(m))
                }
            }
            if (s && e.length > 0) {
                for (var b = 0; b < e.length; ++b) {
                    f.push(String(b))
                }
            } else {
                for (var d in e) {
                    if (!(v && d === "prototype") && n.call(e, d)) {
                        f.push(String(d))
                    }
                }
            }
            if (u) {
                var h = y(e);
                for (var g = 0; g < l.length; ++g) {
                    if (!(h && l[g] === "constructor") && n.call(e, l[g])) {
                        f.push(l[g])
                    }
                }
            }
            return f
        };
        v.shim = function t() {
            if (Object.keys) {
                var e = function () {
                    return (Object.keys(arguments) || "").length === 2
                }(1, 2);
                if (!e) {
                    var r = Object.keys;
                    Object.keys = function t(e) {
                        if (p(e)) {
                            return r(o.call(e))
                        } else {
                            return r(e)
                        }
                    }
                }
            } else {
                Object.keys = v
            }
            return Object.keys || v
        };
        e.exports = v
    }, {"./isArguments": 34}],
    34: [function (t, e, r) {
        "use strict";
        var n = Object.prototype.toString;
        e.exports = function t(e) {
            var r = n.call(e);
            var i = r === "[object Arguments]";
            if (!i) {
                i = r !== "[object Array]" && e !== null && typeof e === "object" && typeof e.length === "number" && e.length >= 0 && n.call(e.callee) === "[object Function]"
            }
            return i
        }
    }, {}],
    35: [function (t, e, r) {
        "use strict";
        var n = t("./implementation");
        e.exports = function t() {
            return Array.prototype.includes || n
        }
    }, {"./implementation": 13}],
    36: [function (t, e, r) {
        "use strict";
        var n = t("define-properties");
        var i = t("./polyfill");
        e.exports = function t() {
            var e = i();
            if (Array.prototype.includes !== e) {
                n(Array.prototype, {includes: e})
            }
            return e
        }
    }, {"./polyfill": 35, "define-properties": 15}],
    37: [function (t, e, r) {
        "use strict";
        var n = t("es-abstract/es7");
        var i = t("has");
        var o = t("function-bind");
        var p = o.call(Function.call, Object.prototype.propertyIsEnumerable);
        e.exports = function t(e) {
            var r = n.RequireObjectCoercible(e);
            var o = [];
            for (var u in r) {
                if (i(r, u) && p(r, u)) {
                    o.push([u, r[u]])
                }
            }
            return o
        }
    }, {"es-abstract/es7": 42, "function-bind": 53, has: 54}],
    38: [function (t, e, r) {
        "use strict";
        var n = t("define-properties");
        var i = t("./implementation");
        var o = t("./polyfill");
        var p = t("./shim");
        n(i, {getPolyfill: o, implementation: i, shim: p});
        e.exports = i
    }, {"./implementation": 37, "./polyfill": 61, "./shim": 62, "define-properties": 39}],
    39: [function (t, e, r) {
        arguments[4][15][0].apply(r, arguments)
    }, {dup: 15, foreach: 51, "object-keys": 59}],
    40: [function (t, e, r) {
        arguments[4][16][0].apply(r, arguments)
    }, {
        "./helpers/isFinite": 44,
        "./helpers/mod": 46,
        "./helpers/sign": 47,
        dup: 16,
        "es-to-primitive/es5": 48,
        "is-callable": 55
    }],
    41: [function (t, e, r) {
        arguments[4][17][0].apply(r, arguments)
    }, {
        "./es5": 40,
        "./helpers/assign": 43,
        "./helpers/isFinite": 44,
        "./helpers/isPrimitive": 45,
        "./helpers/mod": 46,
        "./helpers/sign": 47,
        dup: 17,
        "es-to-primitive/es6": 49,
        "function-bind": 53,
        "is-regex": 57
    }],
    42: [function (t, e, r) {
        "use strict";
        var n = t("./es6");
        var i = t("./helpers/assign");
        var o = i(n, {
            SameValueNonNumber: function t(e, r) {
                if (typeof e === "number" || typeof e !== typeof r) {
                    throw new TypeError("SameValueNonNumber requires two non-number values of the same type.")
                }
                return this.SameValue(e, r)
            }
        });
        e.exports = o
    }, {"./es6": 41, "./helpers/assign": 43}],
    43: [function (t, e, r) {
        arguments[4][18][0].apply(r, arguments)
    }, {dup: 18}],
    44: [function (t, e, r) {
        arguments[4][19][0].apply(r, arguments)
    }, {dup: 19}],
    45: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    46: [function (t, e, r) {
        arguments[4][21][0].apply(r, arguments)
    }, {dup: 21}],
    47: [function (t, e, r) {
        arguments[4][22][0].apply(r, arguments)
    }, {dup: 22}],
    48: [function (t, e, r) {
        arguments[4][23][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 50, dup: 23, "is-callable": 55}],
    49: [function (t, e, r) {
        arguments[4][24][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 50, dup: 24, "is-callable": 55, "is-date-object": 56, "is-symbol": 58}],
    50: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    51: [function (t, e, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {dup: 26}],
    52: [function (t, e, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {dup: 27}],
    53: [function (t, e, r) {
        arguments[4][28][0].apply(r, arguments)
    }, {"./implementation": 52, dup: 28}],
    54: [function (t, e, r) {
        var n = t("function-bind");
        e.exports = n.call(Function.call, Object.prototype.hasOwnProperty)
    }, {"function-bind": 53}],
    55: [function (t, e, r) {
        arguments[4][29][0].apply(r, arguments)
    }, {dup: 29}],
    56: [function (t, e, r) {
        arguments[4][30][0].apply(r, arguments)
    }, {dup: 30}],
    57: [function (t, e, r) {
        arguments[4][31][0].apply(r, arguments)
    }, {dup: 31}],
    58: [function (t, e, r) {
        arguments[4][32][0].apply(r, arguments)
    }, {dup: 32}],
    59: [function (t, e, r) {
        arguments[4][33][0].apply(r, arguments)
    }, {"./isArguments": 60, dup: 33}],
    60: [function (t, e, r) {
        arguments[4][34][0].apply(r, arguments)
    }, {dup: 34}],
    61: [function (t, e, r) {
        "use strict";
        var n = t("./implementation");
        e.exports = function t() {
            return typeof Object.entries === "function" ? Object.entries : n
        }
    }, {"./implementation": 37}],
    62: [function (t, e, r) {
        "use strict";
        var n = t("./polyfill");
        var i = t("define-properties");
        e.exports = function t() {
            var e = n();
            i(Object, {entries: e}, {
                entries: function () {
                    return Object.entries !== e
                }
            });
            return e
        }
    }, {"./polyfill": 61, "define-properties": 39}],
    63: [function (t, e, r) {
        "use strict";
        var n = t("es-abstract/es7");
        var i = Object.defineProperty;
        var o = Object.getOwnPropertyDescriptor;
        var p = Object.getOwnPropertyNames;
        var u = Object.getOwnPropertySymbols;
        var a = Function.call.bind(Array.prototype.concat);
        var l = Function.call.bind(Array.prototype.reduce);
        var s = u ? function (t) {
            return a(p(t), u(t))
        } : p;
        var c = n.IsCallable(o) && n.IsCallable(p);
        var f = function t(e, r, n) {
            if (i && r in e) {
                i(e, r, {configurable: true, enumerable: true, value: n, writable: true})
            } else {
                e[r] = n
            }
        };
        e.exports = function t(e) {
            n.RequireObjectCoercible(e);
            if (!c) {
                throw new TypeError("getOwnPropertyDescriptors requires Object.getOwnPropertyDescriptor")
            }
            var r = n.ToObject(e);
            return l(s(r), function (t, e) {
                f(t, e, o(r, e));
                return t
            }, {})
        }
    }, {"es-abstract/es7": 68}],
    64: [function (t, e, r) {
        arguments[4][38][0].apply(r, arguments)
    }, {"./implementation": 63, "./polyfill": 86, "./shim": 87, "define-properties": 65, dup: 38}],
    65: [function (t, e, r) {
        arguments[4][15][0].apply(r, arguments)
    }, {dup: 15, foreach: 77, "object-keys": 84}],
    66: [function (t, e, r) {
        arguments[4][16][0].apply(r, arguments)
    }, {
        "./helpers/isFinite": 70,
        "./helpers/mod": 72,
        "./helpers/sign": 73,
        dup: 16,
        "es-to-primitive/es5": 74,
        "is-callable": 80
    }],
    67: [function (t, e, r) {
        arguments[4][17][0].apply(r, arguments)
    }, {
        "./es5": 66,
        "./helpers/assign": 69,
        "./helpers/isFinite": 70,
        "./helpers/isPrimitive": 71,
        "./helpers/mod": 72,
        "./helpers/sign": 73,
        dup: 17,
        "es-to-primitive/es6": 75,
        "function-bind": 79,
        "is-regex": 82
    }],
    68: [function (t, e, r) {
        arguments[4][42][0].apply(r, arguments)
    }, {"./es6": 67, "./helpers/assign": 69, dup: 42}],
    69: [function (t, e, r) {
        arguments[4][18][0].apply(r, arguments)
    }, {dup: 18}],
    70: [function (t, e, r) {
        arguments[4][19][0].apply(r, arguments)
    }, {dup: 19}],
    71: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    72: [function (t, e, r) {
        arguments[4][21][0].apply(r, arguments)
    }, {dup: 21}],
    73: [function (t, e, r) {
        arguments[4][22][0].apply(r, arguments)
    }, {dup: 22}],
    74: [function (t, e, r) {
        arguments[4][23][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 76, dup: 23, "is-callable": 80}],
    75: [function (t, e, r) {
        arguments[4][24][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 76, dup: 24, "is-callable": 80, "is-date-object": 81, "is-symbol": 83}],
    76: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    77: [function (t, e, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {dup: 26}],
    78: [function (t, e, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {dup: 27}],
    79: [function (t, e, r) {
        arguments[4][28][0].apply(r, arguments)
    }, {"./implementation": 78, dup: 28}],
    80: [function (t, e, r) {
        arguments[4][29][0].apply(r, arguments)
    }, {dup: 29}],
    81: [function (t, e, r) {
        arguments[4][30][0].apply(r, arguments)
    }, {dup: 30}],
    82: [function (t, e, r) {
        arguments[4][31][0].apply(r, arguments)
    }, {dup: 31}],
    83: [function (t, e, r) {
        arguments[4][32][0].apply(r, arguments)
    }, {dup: 32}],
    84: [function (t, e, r) {
        arguments[4][33][0].apply(r, arguments)
    }, {"./isArguments": 85, dup: 33}],
    85: [function (t, e, r) {
        arguments[4][34][0].apply(r, arguments)
    }, {dup: 34}],
    86: [function (t, e, r) {
        "use strict";
        var n = t("./implementation");
        e.exports = function t() {
            return typeof Object.getOwnPropertyDescriptors === "function" ? Object.getOwnPropertyDescriptors : n
        }
    }, {"./implementation": 63}],
    87: [function (t, e, r) {
        "use strict";
        var n = t("./polyfill");
        var i = t("define-properties");
        e.exports = function t() {
            var e = n();
            i(Object, {getOwnPropertyDescriptors: e}, {
                getOwnPropertyDescriptors: function () {
                    return Object.getOwnPropertyDescriptors !== e
                }
            });
            return e
        }
    }, {"./polyfill": 86, "define-properties": 65}],
    88: [function (t, e, r) {
        "use strict";
        var n = t("es-abstract/es7");
        var i = t("has");
        var o = t("function-bind");
        var p = o.call(Function.call, Object.prototype.propertyIsEnumerable);
        e.exports = function t(e) {
            var r = n.RequireObjectCoercible(e);
            var o = [];
            for (var u in r) {
                if (i(r, u) && p(r, u)) {
                    o.push(r[u])
                }
            }
            return o
        }
    }, {"es-abstract/es7": 93, "function-bind": 104, has: 105}],
    89: [function (t, e, r) {
        arguments[4][38][0].apply(r, arguments)
    }, {"./implementation": 88, "./polyfill": 112, "./shim": 113, "define-properties": 90, dup: 38}],
    90: [function (t, e, r) {
        arguments[4][15][0].apply(r, arguments)
    }, {dup: 15, foreach: 102, "object-keys": 110}],
    91: [function (t, e, r) {
        arguments[4][16][0].apply(r, arguments)
    }, {
        "./helpers/isFinite": 95,
        "./helpers/mod": 97,
        "./helpers/sign": 98,
        dup: 16,
        "es-to-primitive/es5": 99,
        "is-callable": 106
    }],
    92: [function (t, e, r) {
        arguments[4][17][0].apply(r, arguments)
    }, {
        "./es5": 91,
        "./helpers/assign": 94,
        "./helpers/isFinite": 95,
        "./helpers/isPrimitive": 96,
        "./helpers/mod": 97,
        "./helpers/sign": 98,
        dup: 17,
        "es-to-primitive/es6": 100,
        "function-bind": 104,
        "is-regex": 108
    }],
    93: [function (t, e, r) {
        arguments[4][42][0].apply(r, arguments)
    }, {"./es6": 92, "./helpers/assign": 94, dup: 42}],
    94: [function (t, e, r) {
        arguments[4][18][0].apply(r, arguments)
    }, {dup: 18}],
    95: [function (t, e, r) {
        arguments[4][19][0].apply(r, arguments)
    }, {dup: 19}],
    96: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    97: [function (t, e, r) {
        arguments[4][21][0].apply(r, arguments)
    }, {dup: 21}],
    98: [function (t, e, r) {
        arguments[4][22][0].apply(r, arguments)
    }, {dup: 22}],
    99: [function (t, e, r) {
        arguments[4][23][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 101, dup: 23, "is-callable": 106}],
    100: [function (t, e, r) {
        arguments[4][24][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 101, dup: 24, "is-callable": 106, "is-date-object": 107, "is-symbol": 109}],
    101: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    102: [function (t, e, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {dup: 26}],
    103: [function (t, e, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {dup: 27}],
    104: [function (t, e, r) {
        arguments[4][28][0].apply(r, arguments)
    }, {"./implementation": 103, dup: 28}],
    105: [function (t, e, r) {
        arguments[4][54][0].apply(r, arguments)
    }, {dup: 54, "function-bind": 104}],
    106: [function (t, e, r) {
        arguments[4][29][0].apply(r, arguments)
    }, {dup: 29}],
    107: [function (t, e, r) {
        arguments[4][30][0].apply(r, arguments)
    }, {dup: 30}],
    108: [function (t, e, r) {
        arguments[4][31][0].apply(r, arguments)
    }, {dup: 31}],
    109: [function (t, e, r) {
        arguments[4][32][0].apply(r, arguments)
    }, {dup: 32}],
    110: [function (t, e, r) {
        arguments[4][33][0].apply(r, arguments)
    }, {"./isArguments": 111, dup: 33}],
    111: [function (t, e, r) {
        arguments[4][34][0].apply(r, arguments)
    }, {dup: 34}],
    112: [function (t, e, r) {
        "use strict";
        var n = t("./implementation");
        e.exports = function t() {
            return typeof Object.values === "function" ? Object.values : n
        }
    }, {"./implementation": 88}],
    113: [function (t, e, r) {
        "use strict";
        var n = t("./polyfill");
        var i = t("define-properties");
        e.exports = function t() {
            var e = n();
            i(Object, {values: e}, {
                values: function () {
                    return Object.values !== e
                }
            });
            return e
        }
    }, {"./polyfill": 112, "define-properties": 90}],
    114: [function (t, e, r) {
        "use strict";
        var n = t("define-properties");
        var i = t("es-abstract/es7");
        var o = t("function-bind");
        var p = function t(e) {
            i.RequireObjectCoercible(this);
            var r = i.ToObject(this);
            var n = i.ToString(r);
            var o = i.ToInteger(e);
            var p = n.length;
            if (o < 0 || o >= p) {
                return ""
            }
            var u = n.charCodeAt(o);
            var a;
            var l = o + 1;
            var s = 1;
            var c = u >= 55296 && u <= 56319;
            if (c && p > l) {
                a = n.charCodeAt(l);
                if (a >= 56320 && a <= 57343) {
                    s = 2
                }
            }
            return n.slice(o, o + s)
        };
        var u = o.call(Function.call, p);
        n(u, {
            method: p, shim: function t() {
                n(String.prototype, {at: p});
                return String.prototype.at
            }
        });
        e.exports = u
    }, {"define-properties": 115, "es-abstract/es7": 118, "function-bind": 129}],
    115: [function (t, e, r) {
        arguments[4][15][0].apply(r, arguments)
    }, {dup: 15, foreach: 127, "object-keys": 134}],
    116: [function (t, e, r) {
        arguments[4][16][0].apply(r, arguments)
    }, {
        "./helpers/isFinite": 120,
        "./helpers/mod": 122,
        "./helpers/sign": 123,
        dup: 16,
        "es-to-primitive/es5": 124,
        "is-callable": 130
    }],
    117: [function (t, e, r) {
        arguments[4][17][0].apply(r, arguments)
    }, {
        "./es5": 116,
        "./helpers/assign": 119,
        "./helpers/isFinite": 120,
        "./helpers/isPrimitive": 121,
        "./helpers/mod": 122,
        "./helpers/sign": 123,
        dup: 17,
        "es-to-primitive/es6": 125,
        "function-bind": 129,
        "is-regex": 132
    }],
    118: [function (t, e, r) {
        arguments[4][42][0].apply(r, arguments)
    }, {"./es6": 117, "./helpers/assign": 119, dup: 42}],
    119: [function (t, e, r) {
        arguments[4][18][0].apply(r, arguments)
    }, {dup: 18}],
    120: [function (t, e, r) {
        arguments[4][19][0].apply(r, arguments)
    }, {dup: 19}],
    121: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    122: [function (t, e, r) {
        arguments[4][21][0].apply(r, arguments)
    }, {dup: 21}],
    123: [function (t, e, r) {
        arguments[4][22][0].apply(r, arguments)
    }, {dup: 22}],
    124: [function (t, e, r) {
        arguments[4][23][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 126, dup: 23, "is-callable": 130}],
    125: [function (t, e, r) {
        arguments[4][24][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 126, dup: 24, "is-callable": 130, "is-date-object": 131, "is-symbol": 133}],
    126: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    127: [function (t, e, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {dup: 26}],
    128: [function (t, e, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {dup: 27}],
    129: [function (t, e, r) {
        arguments[4][28][0].apply(r, arguments)
    }, {"./implementation": 128, dup: 28}],
    130: [function (t, e, r) {
        arguments[4][29][0].apply(r, arguments)
    }, {dup: 29}],
    131: [function (t, e, r) {
        arguments[4][30][0].apply(r, arguments)
    }, {dup: 30}],
    132: [function (t, e, r) {
        arguments[4][31][0].apply(r, arguments)
    }, {dup: 31}],
    133: [function (t, e, r) {
        arguments[4][32][0].apply(r, arguments)
    }, {dup: 32}],
    134: [function (t, e, r) {
        arguments[4][33][0].apply(r, arguments)
    }, {"./isArguments": 135, dup: 33}],
    135: [function (t, e, r) {
        arguments[4][34][0].apply(r, arguments)
    }, {dup: 34}],
    136: [function (t, e, r) {
        "use strict";
        var n = t("function-bind");
        var i = t("es-abstract/es7");
        var o = n.call(Function.call, String.prototype.slice);
        e.exports = function t(e) {
            var r = i.RequireObjectCoercible(this);
            var n = i.ToString(r);
            var p = i.ToLength(n.length);
            var u;
            if (arguments.length > 1) {
                u = arguments[1]
            }
            var a = typeof u === "undefined" ? "" : i.ToString(u);
            if (a === "") {
                a = " "
            }
            var l = i.ToLength(e);
            if (l <= p) {
                return n
            }
            var s = l - p;
            while (a.length < s) {
                var c = a.length;
                var f = s - c;
                a += c > f ? o(a, 0, f) : a
            }
            var y = a.length > s ? o(a, 0, s) : a;
            return n + y
        }
    }, {"es-abstract/es7": 141, "function-bind": 152}],
    137: [function (t, e, r) {
        "use strict";
        var n = t("function-bind");
        var i = t("define-properties");
        var o = t("es-abstract/es7");
        var p = t("./implementation");
        var u = t("./polyfill");
        var a = t("./shim");
        var l = n.call(Function.apply, p);
        var s = function t(e, r) {
            o.RequireObjectCoercible(e);
            var n = [r];
            if (arguments.length > 2) {
                n.push(arguments[2])
            }
            return l(e, n)
        };
        i(s, {getPolyfill: u, implementation: p, shim: a});
        e.exports = s
    }, {
        "./implementation": 136,
        "./polyfill": 159,
        "./shim": 160,
        "define-properties": 138,
        "es-abstract/es7": 141,
        "function-bind": 152
    }],
    138: [function (t, e, r) {
        arguments[4][15][0].apply(r, arguments)
    }, {dup: 15, foreach: 150, "object-keys": 157}],
    139: [function (t, e, r) {
        arguments[4][16][0].apply(r, arguments)
    }, {
        "./helpers/isFinite": 143,
        "./helpers/mod": 145,
        "./helpers/sign": 146,
        dup: 16,
        "es-to-primitive/es5": 147,
        "is-callable": 153
    }],
    140: [function (t, e, r) {
        arguments[4][17][0].apply(r, arguments)
    }, {
        "./es5": 139,
        "./helpers/assign": 142,
        "./helpers/isFinite": 143,
        "./helpers/isPrimitive": 144,
        "./helpers/mod": 145,
        "./helpers/sign": 146,
        dup: 17,
        "es-to-primitive/es6": 148,
        "function-bind": 152,
        "is-regex": 155
    }],
    141: [function (t, e, r) {
        arguments[4][42][0].apply(r, arguments)
    }, {"./es6": 140, "./helpers/assign": 142, dup: 42}],
    142: [function (t, e, r) {
        arguments[4][18][0].apply(r, arguments)
    }, {dup: 18}],
    143: [function (t, e, r) {
        arguments[4][19][0].apply(r, arguments)
    }, {dup: 19}],
    144: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    145: [function (t, e, r) {
        arguments[4][21][0].apply(r, arguments)
    }, {dup: 21}],
    146: [function (t, e, r) {
        arguments[4][22][0].apply(r, arguments)
    }, {dup: 22}],
    147: [function (t, e, r) {
        arguments[4][23][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 149, dup: 23, "is-callable": 153}],
    148: [function (t, e, r) {
        arguments[4][24][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 149, dup: 24, "is-callable": 153, "is-date-object": 154, "is-symbol": 156}],
    149: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    150: [function (t, e, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {dup: 26}],
    151: [function (t, e, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {dup: 27}],
    152: [function (t, e, r) {
        arguments[4][28][0].apply(r, arguments)
    }, {"./implementation": 151, dup: 28}],
    153: [function (t, e, r) {
        arguments[4][29][0].apply(r, arguments)
    }, {dup: 29}],
    154: [function (t, e, r) {
        arguments[4][30][0].apply(r, arguments)
    }, {dup: 30}],
    155: [function (t, e, r) {
        arguments[4][31][0].apply(r, arguments)
    }, {dup: 31}],
    156: [function (t, e, r) {
        arguments[4][32][0].apply(r, arguments)
    }, {dup: 32}],
    157: [function (t, e, r) {
        arguments[4][33][0].apply(r, arguments)
    }, {"./isArguments": 158, dup: 33}],
    158: [function (t, e, r) {
        arguments[4][34][0].apply(r, arguments)
    }, {dup: 34}],
    159: [function (t, e, r) {
        "use strict";
        var n = t("./implementation");
        e.exports = function t() {
            return typeof String.prototype.padEnd === "function" ? String.prototype.padEnd : n
        }
    }, {"./implementation": 136}],
    160: [function (t, e, r) {
        "use strict";
        var n = t("./polyfill");
        var i = t("define-properties");
        e.exports = function t() {
            var e = n();
            i(String.prototype, {padEnd: e}, {
                padEnd: function () {
                    return String.prototype.padEnd !== e
                }
            });
            return e
        }
    }, {"./polyfill": 159, "define-properties": 138}],
    161: [function (t, e, r) {
        "use strict";
        var n = t("function-bind");
        var i = t("es-abstract/es7");
        var o = n.call(Function.call, String.prototype.slice);
        e.exports = function t(e) {
            var r = i.RequireObjectCoercible(this);
            var n = i.ToString(r);
            var p = i.ToLength(n.length);
            var u;
            if (arguments.length > 1) {
                u = arguments[1]
            }
            var a = typeof u === "undefined" ? "" : i.ToString(u);
            if (a === "") {
                a = " "
            }
            var l = i.ToLength(e);
            if (l <= p) {
                return n
            }
            var s = l - p;
            while (a.length < s) {
                var c = a.length;
                var f = s - c;
                a += c > f ? o(a, 0, f) : a
            }
            var y = a.length > s ? o(a, 0, s) : a;
            return y + n
        }
    }, {"es-abstract/es7": 166, "function-bind": 177}],
    162: [function (t, e, r) {
        "use strict";
        var n = t("function-bind");
        var i = t("define-properties");
        var o = t("es-abstract/es7");
        var p = t("./implementation");
        var u = t("./polyfill");
        var a = t("./shim");
        var l = n.call(Function.apply, p);
        var s = function t(e, r) {
            o.RequireObjectCoercible(e);
            var n = [r];
            if (arguments.length > 2) {
                n.push(arguments[2])
            }
            return l(e, n)
        };
        i(s, {getPolyfill: u, implementation: p, shim: a});
        e.exports = s
    }, {
        "./implementation": 161,
        "./polyfill": 184,
        "./shim": 185,
        "define-properties": 163,
        "es-abstract/es7": 166,
        "function-bind": 177
    }],
    163: [function (t, e, r) {
        arguments[4][15][0].apply(r, arguments)
    }, {dup: 15, foreach: 175, "object-keys": 182}],
    164: [function (t, e, r) {
        arguments[4][16][0].apply(r, arguments)
    }, {
        "./helpers/isFinite": 168,
        "./helpers/mod": 170,
        "./helpers/sign": 171,
        dup: 16,
        "es-to-primitive/es5": 172,
        "is-callable": 178
    }],
    165: [function (t, e, r) {
        arguments[4][17][0].apply(r, arguments)
    }, {
        "./es5": 164,
        "./helpers/assign": 167,
        "./helpers/isFinite": 168,
        "./helpers/isPrimitive": 169,
        "./helpers/mod": 170,
        "./helpers/sign": 171,
        dup: 17,
        "es-to-primitive/es6": 173,
        "function-bind": 177,
        "is-regex": 180
    }],
    166: [function (t, e, r) {
        arguments[4][42][0].apply(r, arguments)
    }, {"./es6": 165, "./helpers/assign": 167, dup: 42}],
    167: [function (t, e, r) {
        arguments[4][18][0].apply(r, arguments)
    }, {dup: 18}],
    168: [function (t, e, r) {
        arguments[4][19][0].apply(r, arguments)
    }, {dup: 19}],
    169: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    170: [function (t, e, r) {
        arguments[4][21][0].apply(r, arguments)
    }, {dup: 21}],
    171: [function (t, e, r) {
        arguments[4][22][0].apply(r, arguments)
    }, {dup: 22}],
    172: [function (t, e, r) {
        arguments[4][23][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 174, dup: 23, "is-callable": 178}],
    173: [function (t, e, r) {
        arguments[4][24][0].apply(r, arguments)
    }, {"./helpers/isPrimitive": 174, dup: 24, "is-callable": 178, "is-date-object": 179, "is-symbol": 181}],
    174: [function (t, e, r) {
        arguments[4][20][0].apply(r, arguments)
    }, {dup: 20}],
    175: [function (t, e, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {dup: 26}],
    176: [function (t, e, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {dup: 27}],
    177: [function (t, e, r) {
        arguments[4][28][0].apply(r, arguments)
    }, {"./implementation": 176, dup: 28}],
    178: [function (t, e, r) {
        arguments[4][29][0].apply(r, arguments)
    }, {dup: 29}],
    179: [function (t, e, r) {
        arguments[4][30][0].apply(r, arguments)
    }, {dup: 30}],
    180: [function (t, e, r) {
        arguments[4][31][0].apply(r, arguments)
    }, {dup: 31}],
    181: [function (t, e, r) {
        arguments[4][32][0].apply(r, arguments)
    }, {dup: 32}],
    182: [function (t, e, r) {
        arguments[4][33][0].apply(r, arguments)
    }, {"./isArguments": 183, dup: 33}],
    183: [function (t, e, r) {
        arguments[4][34][0].apply(r, arguments)
    }, {dup: 34}],
    184: [function (t, e, r) {
        "use strict";
        var n = t("./implementation");
        e.exports = function t() {
            return typeof String.prototype.padStart === "function" ? String.prototype.padStart : n
        }
    }, {"./implementation": 161}],
    185: [function (t, e, r) {
        "use strict";
        var n = t("./polyfill");
        var i = t("define-properties");
        e.exports = function t() {
            var e = n();
            i(String.prototype, {padStart: e}, {
                padStart: function () {
                    return String.prototype.padStart !== e
                }
            });
            return e
        }
    }, {"./polyfill": 184, "define-properties": 163}],
    186: [function (t, e, r) {
        "use strict";
        var n = t("function-bind");
        var i = n.call(Function.call, String.prototype.replace);
        var o = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*/;
        e.exports = function t() {
            return i(this, o, "")
        }
    }, {"function-bind": 191}],
    187: [function (t, e, r) {
        "use strict";
        var n = t("function-bind");
        var i = t("define-properties");
        var o = t("./implementation");
        var p = t("./polyfill");
        var u = t("./shim");
        var a = n.call(Function.call, p());
        i(a, {getPolyfill: p, implementation: o, shim: u});
        e.exports = a
    }, {"./implementation": 186, "./polyfill": 194, "./shim": 195, "define-properties": 188, "function-bind": 191}],
    188: [function (t, e, r) {
        arguments[4][15][0].apply(r, arguments)
    }, {dup: 15, foreach: 189, "object-keys": 192}],
    189: [function (t, e, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {dup: 26}],
    190: [function (t, e, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {dup: 27}],
    191: [function (t, e, r) {
        arguments[4][28][0].apply(r, arguments)
    }, {"./implementation": 190, dup: 28}],
    192: [function (t, e, r) {
        arguments[4][33][0].apply(r, arguments)
    }, {"./isArguments": 193, dup: 33}],
    193: [function (t, e, r) {
        arguments[4][34][0].apply(r, arguments)
    }, {dup: 34}],
    194: [function (t, e, r) {
        "use strict";
        var n = t("./implementation");
        e.exports = function t() {
            if (!String.prototype.trimLeft) {
                return n
            }
            var e = "\u200b";
            if (e.trimLeft() !== e) {
                return n
            }
            return String.prototype.trimLeft
        }
    }, {"./implementation": 186}],
    195: [function (t, e, r) {
        "use strict";
        var n = t("define-properties");
        var i = t("./polyfill");
        e.exports = function t() {
            var e = i();
            n(String.prototype, {trimLeft: e}, {
                trimLeft: function () {
                    return String.prototype.trimLeft !== e
                }
            });
            return e
        }
    }, {"./polyfill": 194, "define-properties": 188}],
    196: [function (t, e, r) {
        "use strict";
        var n = t("function-bind");
        var i = n.call(Function.call, String.prototype.replace);
        var o = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*$/;
        e.exports = function t() {
            return i(this, o, "")
        }
    }, {"function-bind": 201}],
    197: [function (t, e, r) {
        arguments[4][187][0].apply(r, arguments)
    }, {
        "./implementation": 196,
        "./polyfill": 204,
        "./shim": 205,
        "define-properties": 198,
        dup: 187,
        "function-bind": 201
    }],
    198: [function (t, e, r) {
        arguments[4][15][0].apply(r, arguments)
    }, {dup: 15, foreach: 199, "object-keys": 202}],
    199: [function (t, e, r) {
        arguments[4][26][0].apply(r, arguments)
    }, {dup: 26}],
    200: [function (t, e, r) {
        arguments[4][27][0].apply(r, arguments)
    }, {dup: 27}],
    201: [function (t, e, r) {
        arguments[4][28][0].apply(r, arguments)
    }, {"./implementation": 200, dup: 28}],
    202: [function (t, e, r) {
        arguments[4][33][0].apply(r, arguments)
    }, {"./isArguments": 203, dup: 33}],
    203: [function (t, e, r) {
        arguments[4][34][0].apply(r, arguments)
    }, {dup: 34}],
    204: [function (t, e, r) {
        "use strict";
        var n = t("./implementation");
        e.exports = function t() {
            if (!String.prototype.trimRight) {
                return n
            }
            var e = "\u200b";
            if (e.trimRight() !== e) {
                return n
            }
            return String.prototype.trimRight
        }
    }, {"./implementation": 196}],
    205: [function (t, e, r) {
        "use strict";
        var n = t("define-properties");
        var i = t("./polyfill");
        e.exports = function t() {
            var e = i();
            n(String.prototype, {trimRight: e}, {
                trimRight: function () {
                    return String.prototype.trimRight !== e
                }
            });
            return e
        }
    }, {"./polyfill": 204, "define-properties": 198}],
    206: [function (t, e, r) {
        "use strict";
        e.exports = t("./es7-shim").shim()
    }, {"./es7-shim": 12}]
}, {}, [206]);
//# sourceMappingURL=dist/es7-shim.map
!function (e) {
    "use strict";
    e.console || (e.console = {});
    for (var o, i, n = e.console, r = function () {
    }, t = ["memory"], l = "assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(","); o = t.pop();) n[o] || (n[o] = {});
    for (; i = l.pop();) n[i] || (n[i] = r)
}("undefined" == typeof window ? this : window);
Object.setPrototypeOf || ({__proto__: []} instanceof Array ? setProtoOf : mixinProperties);

function setProtoOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}

function mixinProperties(obj, proto) {
    for (var prop in proto) {
        if (!obj.hasOwnProperty(prop)) {
            obj[prop] = proto[prop];
        }
    }
    return obj;
}