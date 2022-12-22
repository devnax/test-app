(function () {
    function m(d) {
        throw d;
    }
    var o = void 0,
        r = !0,
        s = null,
        t = !1;

    function u(d) {
        return function () {
            return d
        }
    }
    var v = 200;

    function y(d, g) {
        var l, j, q;
        switch (d.nodeType) {
            case document.ELEMENT_NODE:
                l = document.createElementNS(d.namespaceURI, d.nodeName);
                if (d.attributes && 0 < d.attributes.length) {
                    j = 0;
                    for (q = d.attributes.length; j < q; j += 1) l.setAttribute(d.attributes[j].nodeName, d.getAttribute(d.attributes[j].nodeName))
                }
                if (g && d.childNodes && 0 < d.childNodes.length) {
                    j = 0;
                    for (q = d.childNodes.length; j < q; j += 1) l.appendChild(y(d.childNodes[j], g))
                }
                return l;
            case document.TEXT_NODE:
            case document.CDATA_SECTION_NODE:
            case document.COMMENT_NODE:
                return document.createTextNode(d.nodeValue)
        }
    }
    var z = {
        "0": "MSIE",
        1: "Chrome",
        2: "Safari",
        3: "Firefox"
    };

    function A(d) {
        this.parent = d;
        var d = r,
            g;
        g = window.navigator.appName;
        var l = window.navigator.userAgent,
            j = l.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i),
            l = l.match(/version\/([\.\d]+)/i);
        (j && l) !== s && (j[2] = l[1]);
        g = j = j ? [j[1], j[2]] : [g, window.navigator.appVersion, "-?"];
        j = g[1].split(".");
        switch (g[0]) {
            case z[0]:
                9 > j[0] && (d = t);
                break;
            case z[1]:
                22 > j[0] && (d = t);
                break;
            case z[2]:
                5 > j[0] && (d = t);
                break;
            case z[3]:
                10 > j[0] && (d = t);
                break;
            default:
                d = t
        }
        d || this.parent.t("This browser version may not support all TI ExamCalc functionality. Fully supported browsers versions are listed at education.ti.com.");
        (this.xb = !!document.createElement("canvas").getContext) || this.parent.t("This browser version may not support all TI ExamCalc functionality. Fully supported browsers versions are listed at education.ti.com.")
    }
    var B, C;

    function D(d) {
        this.La = this.ga = this.fa = "";
        this.Gb = function (g) {
            var l, j, q = t,
                h, p = this;
            h = {
                "ROMLocation": "/30mv/configs/TI-30MV/bin/ti30mv.h84statej",
                "FaceplateLocation": "/30mv/configs/TI_30X_MV_ExamCalcs_SteelBlue.svg",
                "FaceplateMobileLocation": "/30mv/configs/TI-30XS_SmartView_Standard_Touch.svg",
                "KeyMappingFile": "",
                "KeyHistBufferLength": "10"
            }


            d.T === h.KeyHistBufferLength && p.fa ===
                h.FaceplateLocation && p.ga === h.FaceplateMobileLocation && B === h.KeyMappingFile && p.La === h.ROMLocation ? (loadingStateFile = t, d.O()) : (d.T = h.KeyHistBufferLength, p.fa = h.FaceplateLocation, p.ga = h.FaceplateMobileLocation, B = h.KeyMappingFile, p.La = h.ROMLocation, p.Fb())

        };




        this.Fb = function () {
            var g;
            !this.fa || !this.ga ? d.t("You must specify a URL for the faceplates.") : (g = this.fa.split(".").pop(), "svg" !== g ? d.t("The faceplate extension must be svg.") :
                (g = this.ga.split(".").pop(), "svg" !== g ? d.t("The faceplate extension must be svg.") : navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || "ontouchstart" in window || 0 < navigator.msMaxTouchPoints ? this.cb(this.ga) : this.cb(this.fa)))
        };
        this.cb = function (g) {
            var l, j, q, h, p, c, k, e, f = this;
            j = new XMLHttpRequest;
            l = setTimeout(function () {
                q = r;
                j.abort();
                d.t("Unable to connect with the server, or the requested faceplate is not available.")
            }, 50000);
            j.open("GET", g, r);
            j.onreadystatechange = function () {
                if (!q && (clearTimeout(l), 4 === j.readyState))
                    if (this.status === v) {
                        p = j.responseXML.documentElement;
                        try {
                            p = document.importNode(p, r)
                        } catch (g) {
                            p = y(p, r)
                        }
                        h = document.getElementById("calculatorDiv");
                        e = p.getAttribute("width").indexOf("px");
                        c = parseFloat(p.getAttribute("width").substring(0, e));
                        e = p.getAttribute("height").indexOf("px");
                        k = parseFloat(p.getAttribute("height").substring(0, e));
                        h.style.width = c + "px";
                        h.style.height = k + "px";
                        h.appendChild(p);
                        f.Db(f.La)
                    } else d.t("The requested faceplate is not available.")
            };
            j.send()
        };
        this.Db = function (g) {
            var l = 15E4,
                j, q, h, p, c, k, e, f;
            l || (l = 15E3);
            g = "/30mv/configs/ti30mv.h84statej"

            g = g.substring(0, g.lastIndexOf("."));
            g += ".h84statej";
            j = new XMLHttpRequest;
            q = t;
            j.open("GET", g, r);
            c = setTimeout(function () {
                q = r;
                j.abort();
                d.t("Unable to connect with the server, or the requested ROM file is not available.");
                loadingStateFile = t
            }, l);
            j.setRequestHeader("Content-Type",
                "text/html;charset=utf-8");
            j.onload = function () {
                q ? loadingStateFile = t : (clearTimeout(c), this.status === v ? (h = this.responseText, p = 1E3, k = setInterval(function () {
                    p -= 100;
                    if (0 >= p) {
                        clearInterval(k);
                        C = [];
                        e = 0;
                        for (f = h.length; e < f; e += 2) C.push(parseInt(h.substr(e, 2), 16));
                        d.O();
                        loadingStateFile = t
                    }
                }, 100)) : (g = "bin/No_Apps.h84statej", j.open("GET", g, r), j.send(), d.t("The requested state file is not available.")))
            };
            j.send()


        }
    }

    function E() {
        this.O()
    }
    E.prototype.O = function () {
        var d, g, l;
        this.la = this.Aa = this.Ba = this.c = this.B = this.A = this.v = this.z = this.w = this.f = this.e = this.d = this.p = this.g = 0;
        this.M = [];
        this.ka = [];
        this.j = [];
        this.m = [];
        this.q = [];
        for (g = 0; 65536 > g; g++) this.M[g] = 0, this.ka[g] = 0, this.j[g] = 0, this.m[g] = 0, this.q[g] = 0;
        this.b = this.k = this.i = 0;
        this.a = Array(64);
        this.o = t;
        this.F = Array(16);
        for (d = 0; 16 > d; d++) {
            this.F[d] = Array(16);
            for (g = 0; 16 > g; g++) {
                this.F[d][g] = Array(16);
                for (l = 0; 16 > l; l++) this.F[d][g][l] = 0
            }
        }
        this.h = Array(16);
        for (d = 0; 4 > d; d++) {
            this.h[d] = Array(16);
            for (g = 0; 16 > g; g++) {
                this.h[d][g] = Array(16);
                for (l = 0; 16 > l; l++) this.h[d][g][l] = 0
            }
        }
        this.L = 255;
        this.Ua = this.Sa = this.Xa = this.Wa = this.Ta = this.Va = 0;
        this.Z = this.Pa = this.va = this.za = this.ya = this.ja = this.ia = this.xa = this.wa = t;
        this.C = Array(2);
        this.$a = new Date;
        this.C[0] = new F;
        this.C[1] = new F;
        for (g = 0; 64 > g; g++) this.a[g] = 0
    };

    function G(d) {
        d.ya = 0 !== (d.a[10] & 4) ? r : t;
        d.za = 0 !== (d.a[10] & 8) ? r : t
    }

    function H(d) {
        if (0 !== (d.a[44] & 1)) {
            if (d.C[0].Y === t && (d.C[0].eb(35E4), d.C[0].fb()), d.C[1].Y === t) d.C[1].eb(6E3), d.C[1].fb()
        } else d.C[0].gb(), d.C[1].gb()
    }

    function I(d) {
        d.a[40] &= 13
    }

    function J(d) {
        d.a[40] &= 11
    }

    function K(d) {
        d.k = ((d.a[9] & 7) << 4) + (d.a[8] & 14) >> 1;
        d.wa === r && (d.b += 1, d.wa = t);
        d.k = 0 !== d.k ? d.k - 1 : 63;
        d.d = 0;
        d.f = 8 + (d.k >>> 3);
        d.e = d.k % 8 << 1;
        d.h[d.d][d.f][d.e] = d.b & 15;
        d.h[d.d][d.f][d.e + 1] = (d.b & 240) >> 4;
        d.k = 0 !== d.k ? d.k - 1 : 63;
        d.d = 0;
        d.f = 8 + (d.k >>> 3);
        d.e = d.k % 8 << 1;
        d.h[d.d][d.f][d.e] = (d.b & 3840) >> 8;
        d.h[d.d][d.f][d.e + 1] = (d.b & 61440) >> 12;
        15 < d.k << 1 ? (d.a[9] = d.k >>> 3, d.a[8] = (d.k << 1) % 16) : (d.a[9] = 0, d.a[8] = d.k << 1)
    }

    function M(d) {
        return 8 <= d && 14 > d ? r : t
    }

    function N(d) {
        var g;
        g = (d.a[27] << 8) + (d.a[29] << 4) + d.a[28];
        0 !== (d.a[23] & 1) && (g = 0 !== (d.a[23] & 2) ? g - 1 : g + 1, d.a[27] = g >> 8, d.a[29] = g % 256 >> 4, d.a[28] = g % 256 % 16)
    }

    function O(d, g) {
        if (255 === d.L) d.a[g] = 0;
        else {
            switch ((d.L & 240) >> 4) {
                case 1:
                    if (0 === (d.a[12] & 1)) {
                        d.a[g] = 0;
                        return
                    }
                    break;
                case 2:
                    if (0 === (d.a[12] & 2)) {
                        d.a[g] = 0;
                        return
                    }
                    break;
                case 3:
                    if (0 === (d.a[12] & 4)) {
                        d.a[g] = 0;
                        return
                    }
                    break;
                case 4:
                    if (0 === (d.a[12] & 8)) {
                        d.a[g] = 0;
                        return
                    }
                    break;
                case 5:
                    if (0 === (d.a[13] & 1)) {
                        d.a[g] = 0;
                        return
                    }
                    break;
                case 6:
                    if (0 === (d.a[13] & 2)) {
                        d.a[g] = 0;
                        return
                    }
                    break;
                case 7:
                    if (0 === (d.a[13] & 4)) {
                        d.a[g] = 0;
                        return
                    }
            }
            switch (d.L & 15) {
                case 8:
                    if (16 === g) {
                        d.a[g] = 0;
                        break
                    }
                    17 === g && (d.a[g] = 8);
                    break;
                case 7:
                    if (16 === g) {
                        d.a[g] = 0;
                        break
                    }
                    17 === g && (d.a[g] = 4);
                    break;
                case 6:
                    if (16 === g) {
                        d.a[g] = 0;
                        break
                    }
                    17 === g && (d.a[g] = 2);
                    break;
                case 5:
                    if (16 === g) {
                        d.a[g] = 0;
                        break
                    }
                    17 === g && (d.a[g] = 1);
                    break;
                case 4:
                    16 === g && (d.a[g] = 8);
                    17 === g && (d.a[g] = 0);
                    break;
                case 3:
                    16 === g && (d.a[g] = 4);
                    17 === g && (d.a[g] = 0);
                    break;
                case 2:
                    16 === g && (d.a[g] = 2);
                    17 === g && (d.a[g] = 0);
                    break;
                case 1:
                    16 === g && (d.a[g] = 1);
                    17 === g && (d.a[g] = 0);
                    break;
                case 0:
                    16 === g && (d.a[g] = 0), 17 === g && (d.a[g] = 8)
            }
        }
    }

    function P(d) {
        var g, l, j, q, h, p, c, k, e, f, x, L, w;
        g = d.a[51];
        l = d.a[53];
        j = d.a[52];
        p = d.a[59];
        c = d.a[61];
        k = d.a[60];
        e = ((d.a[50] & 7) << 8) + (d.a[49] << 4) + d.a[48] >>> 0;
        f = d.a[56] & 7;
        w = 0;
        q = (g << 8) + (l << 4) + j >>> 0;
        h = (p << 8) + (c << 4) + k >>> 0;
        for (x = 0; x < e && M(g) !== r && M(g) !== r; x++) {
            L = w;
            w = 0;
            g = d.F[g][l][j];
            for (l = 0; l < f; l++) w += g & 1 << l - 1;
            w *= 1 << 8 - f;
            l = 1 << f;
            g = (g >>> 0) / l + L >>> 0;
            d.F[p][c][k] = g;
            q += 1;
            h += 1;
            g = q >>> 8;
            l = q % 256 >>> 4 >>> 0;
            j = q % 256 % 16;
            p = h >>> 8;
            c = h % 256 >>> 4 >>> 0;
            k = h % 256 % 16
        }
        0 !== (d.a[11] & 2) && 0 !== (d.a[58] & 8) && (d.va = r, d.a[41] |= 1);
        d.a[58] &= 14
    }

    function F() {
        this.Y = this.ea = t;
        this.ca = this.qa = 0;
        this.hb = function (d) {
            this.Y && (this.ca -= d, 0 >= this.ca && (this.ea = r, this.ca = this.qa))
        };
        this.reset = function () {
            this.ca = this.qa
        };
        this.fb = function () {
            this.Y = r;
            this.ca = this.qa
        };
        this.gb = function () {
            this.Y = t
        };
        this.eb = function (d) {
            this.qa = d
        }
    }

    function Q() {
        this.O()
    }
    Q.prototype.O = function () {
        this.Ga = [];
        this.Ha = o;
        this.n ? this.n.O() : this.n = new E
    };

    function R(d) {
        var g = C,
            l, j, q, h;
        q = 0;
        j = g.length;
        for (l = 0; q < j; q += 2, l++) {
            h = g[q + 1] << 8 | g[q];
            d.n.M[l] = h;
            h = d.n;
            var p = d.n.M[l],
                c = l;
            h.ka[c] = (p & 65024) >>> 10;
            switch (h.ka[c]) {
                case 0:
                    h.j[c] = (p & 7) >>> 0;
                    h.m[c] = (p & 192) >>> 6;
                    h.q[c] = (p & 768) >>> 8;
                    break;
                case 22:
                    h.j[c] = (p & 15) >>> 0;
                    h.m[c] = (p & 240) >>> 4;
                    h.q[c] = (p & 768) >>> 8;
                    break;
                case 20:
                    h.j[c] = (p & 15) >>> 0;
                    h.m[c] = (p & 1008) >>> 4;
                    break;
                case 60:
                case 61:
                case 62:
                case 63:
                    h.j[c] = (p & 4095) >>> 0;
                    break;
                case 3:
                    h.j[c] = (p & 15) >>> 0;
                    h.q[c] = (p & 768) >>> 8;
                    break;
                case 40:
                case 41:
                case 42:
                case 43:
                    h.j[c] = (p & 4095) >>>
                        0;
                    break;
                case 16:
                    h.j[c] = (p & 15) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 14:
                    h.m[c] = (p & 1008) >>> 4;
                    break;
                case 1:
                    h.q[c] = (p & 768) >>> 8;
                    h.j[c] = (p & 15) >>> 0;
                    h.m[c] = (p & 240) >>> 4;
                    break;
                case 32:
                case 33:
                case 34:
                case 35:
                    h.j[c] = (p & 15) >>> 0;
                    h.m[c] = (p & 240) >>> 4;
                    h.q[c] = (p & 3840) >>> 8;
                    break;
                case 15:
                    h.m[c] = (p & 1008) >>> 4;
                    break;
                case 5:
                    h.q[c] = (p & 768) >>> 8;
                    h.j[c] = (p & 15) >>> 0;
                    h.m[c] = (p & 240) >>> 4;
                    break;
                case 30:
                    h.m[c] = (p & 1008) >>> 4;
                    break;
                case 31:
                    h.m[c] = (p & 1008) >>> 4;
                    break;
                case 10:
                    h.m[c] = (p & 1008) >>> 4;
                    break;
                case 11:
                    h.m[c] = (p & 1008) >>>
                        4;
                    break;
                case 7:
                    h.q[c] = (p & 768) >>> 8;
                    h.m[c] = (p & 240) >>> 4;
                    h.j[c] = (p & 15) >>> 0;
                    break;
                case 17:
                    h.j[c] = (p & 7) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 21:
                    h.j[c] = (p & 7) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 2:
                    h.j[c] = (p & 15) >>> 0;
                    h.q[c] = (p & 768) >>> 8;
                    break;
                case 6:
                    h.m[c] = (p & 240) >>> 4;
                    h.q[c] = (p & 768) >>> 8;
                    break;
                case 18:
                    h.j[c] = (p & 15) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 19:
                    h.j[c] = (p & 7) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 23:
                    h.j[c] = (p & 7) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] =
                        (p & 896) >>> 7;
                    break;
                case 24:
                    h.j[c] = (p & 15) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 25:
                    h.j[c] = (p & 7) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 26:
                    h.j[c] = (p & 15) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 27:
                    h.j[c] = (p & 7) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 28:
                    h.j[c] = (p & 15) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 29:
                    h.j[c] = (p & 7) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 12:
                    h.j[c] = (p & 3) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 8:
                    h.j[c] = (p & 3) >>> 0;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 13:
                    h.j[c] = (p & 3) >>> 0;
                    h.m[c] = (p & 112) >>> 4;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 9:
                    h.j[c] = (p & 3) >>> 0;
                    h.q[c] = (p & 896) >>> 7;
                    break;
                case 44:
                case 45:
                case 46:
                case 47:
                    h.j[c] = (p & 4095) >>> 0;
                    break;
                case 48:
                case 49:
                case 50:
                case 51:
                    h.j[c] = (p & 4095) >>> 0;
                    break;
                case 52:
                case 53:
                case 54:
                case 55:
                    h.j[c] = (p & 4095) >>> 0;
                    break;
                case 56:
                case 57:
                case 58:
                case 59:
                    h.j[c] = (p & 4095) >>> 0;
                    break;
                case 36:
                case 37:
                case 38:
                case 39:
                    h.j[c] = (p & 4095) >>> 0
            }
        }
        d.n.b = 0;
        d.n.Va = d.n.M[1] & 4095;
        d.n.Wa = d.n.M[2] & 4095;
        d.n.Xa = d.n.M[3] & 4095;
        d.n.Ta = d.n.M[4] & 4095;
        d.n.Sa = d.n.M[5] & 4095;
        d.n.Ua = d.n.M[6] & 4095
    }

    function S(d, g) {
        d.n.L = g;
        0 === d.n.L && (d.n.L = 255, d.n.a[47] |= 1, 0 !== (d.n.a[47] & 8) && (d.n.xa = r));
        return aa(d, g) === r ? (d.n.Oa = r, d.n.a[40] |= 8, r) : t
    }

    function T(d, g) {
        if (g.n.a[11] & 1 && !(g.n.a[40] & 8)) {
            var l = g.Ga.shift();
            S(g, l) || (g.Ga.push(l), d.Ha = setTimeout(function () {
                T(g, g)
            }, 100))
        } else d.Ha = setTimeout(function () {
            T(g, g)
        }, 100)
    }

    function aa(d, g) {
        if (d.n.ia && d.n.ya || d.n.ja && d.n.za) return t;
        switch ((g & 240) >> 4) {
            case 1:
                if (0 === (d.n.a[12] & 1)) return t;
                break;
            case 2:
                if (0 === (d.n.a[12] & 2)) return t;
                break;
            case 3:
                if (0 === (d.n.a[12] & 4)) return t;
                break;
            case 4:
                if (0 === (d.n.a[12] & 8)) return t;
                break;
            case 5:
                if (0 === (d.n.a[13] & 1)) return t;
                break;
            case 6:
                if (0 === (d.n.a[13] & 2)) return t
        }
        switch (g & 15) {
            case 0:
                return r;
            case 1:
                if (0 !== (d.n.a[11] & 1) && 0 !== (d.n.a[32] & 1)) return r;
                break;
            case 2:
                if (0 !== (d.n.a[11] & 1) && 0 !== (d.n.a[32] & 2)) return r;
                break;
            case 3:
                if (0 !== (d.n.a[11] &
                        1) && 0 !== (d.n.a[32] & 4)) return r;
                break;
            case 4:
                if (0 !== (d.n.a[11] & 1) && 0 !== (d.n.a[32] & 8)) return r;
                break;
            case 5:
                if (0 !== (d.n.a[11] & 1) && 0 !== (d.n.a[33] & 1)) return r;
                break;
            case 6:
                if (0 !== (d.n.a[11] & 1) && 0 !== (d.n.a[33] & 2)) return r;
                break;
            case 7:
                if (0 !== (d.n.a[11] & 1) && 0 !== (d.n.a[33] & 4)) return r;
                break;
            case 8:
                if (0 !== (d.n.a[11] & 1) && 0 !== (d.n.a[33] & 8)) return r
        }
        return t
    }

    function U() {
        this.nb = "display";
        this.pb = 372;
        this.Qa = this.Ra = 0;
        this.ob = 48;
        this.G = {};
        this.O()
    }
    U.prototype.Ja = function (d) {
        this.G = d
    };
    U.prototype.O = function () {
        var d = document.getElementById("svg").getAttribute("viewBox"),
            g = document.getElementById("Display_Rect"),
            l, j, q, h = document.getElementById("displayDiv");
        q = d.split(/\s*,\s*|\s+/);
        d = parseFloat(q[0]);
        l = parseFloat(q[1]);
        j = parseFloat(q[2]);
        q = parseFloat(q[3]);
        h.style.top = 100 * ((g.getAttribute("y") - l) / q) + "%";
        h.style.left = 100 * ((g.getAttribute("x") - d) / j) + "%";
        h.style.height = g.getAttribute("height") * (100 / q) + "%";
        h.style.width = g.getAttribute("width") * (100 / j) + "%";
        this.canvas = document.getElementById(this.nb);
        this.context = this.canvas.getContext("2d")
    };

    function V() {
        this.Fa = this.enabled = t;
        this.G = {};
        this.Ya = "h30keymap";
        this.l[0] = {
            s: "KEY_2ND",
            code: 24,
            keyCode: [50],
            shiftKey: [r],
            r: 1,
            enabled: r
        };
        this.l[1] = {
            s: "KEY_MODE_QUIT",
            code: 72,
            keyCode: [77],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[2] = {
            s: "KEY_DELETE_INSERT",
            code: 88,
            keyCode: [46],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[3] = {
            s: "KEY_UPARROW",
            code: 104,
            keyCode: [38],
            shiftKey: [t],
            r: 6,
            enabled: r
        };
        this.l[4] = {
            s: "KEY_RIGHTARROW",
            code: 102,
            keyCode: [39],
            shiftKey: [t],
            r: 6,
            enabled: r
        };
        this.l[5] = {
            s: "KEY_LOG_10X",
            code: 23,
            keyCode: [76],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[6] = {
            s: "KEY_PRB_ANGLE",
            code: 40,
            keyCode: [82],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[7] = {
            s: "KEY_DATA_STAT",
            code: 56,
            keyCode: [68],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[8] = {
            s: "KEY_LEFTARROW",
            code: 103,
            keyCode: [37],
            shiftKey: [t],
            r: 6,
            enabled: r
        };
        this.l[9] = {
            s: "KEY_DOWNARROW",
            code: 101,
            keyCode: [40],
            shiftKey: [t],
            r: 6,
            enabled: r
        };
        this.l[10] = {
            s: "KEY_LN_EX",
            code: 22,
            keyCode: [78],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[11] = {
            s: "KEY_ND_UND",
            code: 39,
            keyCode: [70],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[12] = {
            s: "KEY_X10N_UND-ND",
            code: 55,
            keyCode: [222],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[13] = {
            s: "KEY_TABLE_FTOD",
            code: 71,
            keyCode: [65],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[14] = {
            s: "KEY_CLEAR",
            code: 87,
            keyCode: [8],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[15] = {
            s: "KEY_PI_HYP",
            code: 21,
            keyCode: [80],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[16] = {
            s: "KEY_SIN_SIN-1",
            code: 38,
            keyCode: [83],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[17] = {
            s: "KEY_COS_COS-1",
            code: 54,
            keyCode: [67],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[18] = {
            s: "KEY_TAN_TAN-1",
            code: 70,
            keyCode: [84],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[19] = {
            s: "KEY_DIVIDE_K",
            code: 86,
            keyCode: [111, 191],
            shiftKey: [t, t],
            r: 3,
            enabled: r
        };
        this.l[20] = {
            s: "KEY_CARET_XSQRT",
            code: 20,
            keyCode: [54],
            shiftKey: [r],
            r: 5,
            enabled: r
        };
        this.l[21] = {
            s: "KEY_X-1",
            code: 37,
            keyCode: [73],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[22] = {
            s: "KEY_LEFTPAREN_PERCENT",
            code: 53,
            keyCode: [57],
            shiftKey: [r],
            r: 5,
            enabled: r
        };
        this.l[23] = {
            s: "KEY_RIGHTPAREN_TOPERCENT",
            code: 69,
            keyCode: [48],
            shiftKey: [r],
            r: 5,
            enabled: r
        };
        this.l[24] = {
            s: "KEY_MULTIPLY",
            code: 85,
            keyCode: [106, 56],
            shiftKey: [t,
                r
            ],
            r: 3,
            enabled: r
        };
        this.l[25] = {
            s: "KEY_X2_SQRT",
            code: 19,
            keyCode: [88],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[26] = {
            s: "KEY_7",
            code: 36,
            keyCode: [103, 55],
            shiftKey: [t, t],
            r: 4,
            enabled: r
        };
        this.l[27] = {
            s: "KEY_8",
            code: 52,
            keyCode: [104, 56],
            shiftKey: [t, t],
            r: 4,
            enabled: r
        };
        this.l[28] = {
            s: "KEY_9",
            code: 68,
            keyCode: [105, 57],
            shiftKey: [t, t],
            r: 4,
            enabled: r
        };
        this.l[29] = {
            s: "KEY_MINUS_CONTRASTDOWN",
            code: 84,
            keyCode: [109, 189],
            shiftKey: [t, t],
            r: 3,
            enabled: r
        };
        this.l[30] = {
            s: "KEY_XYZTABC_CLEARVAR",
            code: 18,
            keyCode: [89],
            shiftKey: [t],
            r: 5,
            enabled: r
        };
        this.l[31] = {
            s: "KEY_4",
            code: 35,
            keyCode: [100, 52],
            shiftKey: [t, t],
            r: 4,
            enabled: r
        };
        this.l[32] = {
            s: "KEY_5",
            code: 51,
            keyCode: [101, 53],
            shiftKey: [t, t],
            r: 4,
            enabled: r
        };
        this.l[33] = {
            s: "KEY_6",
            code: 67,
            keyCode: [102, 54],
            shiftKey: [t, t],
            r: 4,
            enabled: r
        };
        this.l[34] = {
            s: "KEY_PLUS_CONTRASTUP",
            code: 83,
            keyCode: [107, 187],
            shiftKey: [t, r],
            r: 3,
            enabled: r
        };
        this.l[35] = {
            s: "KEY_STO_RECALL",
            code: 17,
            keyCode: [186],
            shiftKey: [r],
            r: 5,
            enabled: r
        };
        this.l[36] = {
            s: "KEY_1",
            code: 34,
            keyCode: [97, 49],
            shiftKey: [t, t],
            r: 4,
            enabled: r
        };
        this.l[37] = {
            s: "KEY_2",
            code: 50,
            keyCode: [98, 50],
            shiftKey: [t, t],
            r: 4,
            enabled: r
        };
        this.l[38] = {
            s: "KEY_3",
            code: 66,
            keyCode: [99, 51],
            shiftKey: [t, t],
            r: 4,
            enabled: r
        };
        this.l[39] = {
            s: "KEY_TOGGLE",
            code: 82,
            keyCode: [192],
            shiftKey: [r],
            r: 4,
            enabled: r
        };
        this.l[40] = {
            s: "KEY_0_RESET",
            code: 33,
            keyCode: [96, 48],
            shiftKey: [t, t],
            r: 4,
            enabled: r
        };
        this.l[41] = {
            s: "KEY_DECIMAL_COMMA",
            code: 49,
            keyCode: [110, 190],
            shiftKey: [t, t],
            r: 4,
            enabled: r
        };
        this.l[42] = {
            s: "KEY_NEGATIVE_ANS",
            code: 65,
            keyCode: [189],
            shiftKey: [r],
            r: 4,
            enabled: r
        };
        this.l[43] = {
            s: "KEY_ENTER",
            code: 81,
            keyCode: [13],
            shiftKey: [t],
            r: 4,
            enabled: r
        }
    }
    V.prototype = new function () {
        this.D = o;
        this.$ = t;
        this.aa = [];
        this.T = this.ba = 0;
        this.I = this.Da = t;
        this.yb = "transparent";
        this.N = o;
        this.U = {
            "0": "SCREEN_OPERATION_KEYS",
            1: "SECOND_KEY",
            2: "ALPHA_KEY",
            3: "ARITMETHIC_OPERATORS_KEYS",
            4: "NUMBER_KEYS",
            5: "MORE_MATH_OPERATOR_KEYS",
            6: "ARROW_KEYS",
            7: "NO_GROUP"
        };
        this.R = {
            tb: o,
            ub: o,
            ib: o,
            jb: o,
            sb: o,
            qb: o,
            kb: o,
            rb: o
        };
        this.Na = {
            lb: "Button has no Fill Attribute",
            mb: "Button has no Stroke Attribute or its Fill is Transparent"
        };
        this.l = [];
        this.u = [];
        this.K = [];
        this.S = [];
        this.V = [];
        this.J = [];
        this.ua = [];
        this.Ea = "red";
        this.Mb = "orange";
        this.X = [];
        this.oa = [];
        this.ma = [];
        this.na = [];
        this.W = "normal";
        this.Ka = t;
        this.Ma = function (d) {
            0 < this.T && (this.aa[this.ba] = d, this.ba = (this.ba + 1) % this.T)
        };
        this.ab = function () {
            this.ba = this.aa.length = 0
        };
        this.Cb = function () {
            var d = 0,
                g = [],
                d = [],
                l = [];
            return this.aa.length === this.T && 0 !== this.ba ? (d = this.ba, g = this.aa.slice(0, d), d = this.aa.slice(d), l.concat(d, g)) : this.aa
        };
        this.Hb = function (d) {
            var g = d.currentTarget || d.target || d.srcElement;
            this.Ka && (d.stopPropagation(), d.preventDefault(),
                this.N.focus(), !this.I && this.ha(g.id) && (this.D = g, this.I = this.$ = r, this.Q(g.id, this.Ea), d = this.u.indexOf(g.id), this.sa(this.V[d]), this.Ma(g.id)))
        };
        this.bb = function (d) {
            var g = d.currentTarget || d.target || d.srcElement,
                l = -1;
            d.preventDefault();
            this.I && (this.D === g && this.ha(g.id)) && (l = this.u.indexOf(g.id), this.Q(g.id, this.R[this.U[this.l[l].r]]), this.D = s, this.I = t, this.ta(g.id))
        };
        this.Ib = function (d) {
            var g = d.currentTarget || d.target || d.srcElement;
            this.I && this.D === g && this.bb(d)
        };
        this.Q = function (d, g) {
            var l;
            l = this.ua[this.u.indexOf(d)];
            l !== o && l.setAttribute("fill", g)
        };
        this.P = function (d, g) {
            var l, j, q;
            l = function (g) {
                return -1 === d.indexOf(g)
            };
            j = function (d) {
                this.Q(d, this.Mb);
                return r
            };
            q = function (d) {
                this.Q(d, this.R[this.U[this.l[this.u.indexOf(d)].r]]);
                return r
            };
            d && (g ? (d.forEach(q, this), this.X = this.X.filter(l, this)) : (d.forEach(j, this), this.X = d));
            q = j = l = s
        };
        this.Bb = function (d) {
            for (var g = -1, l = 0, j = d.getElementsByTagName("path"), q, h, p, g = j.length; l < g; l += 1)
                if (j[l].hasAttribute("fill")) {
                    h = j[l].getAttribute("fill");
                    if (h !== this.yb && j[l].hasAttribute("stroke")) {
                        q =
                            j[l];
                        break
                    }
                    p = this.Na.mb
                } else p = this.Na.lb;
            q === o && m(Error("Couldn't locate a suitable button: " + p));
            g = this.u.indexOf(d.id); - 1 !== g && (this.ua[g] = j[l]);
            return q
        };
        this.Eb = function (d) {
            var g, l, j, q, h, p, c, k = this,
                e, f, x;
            this.Da && this.Ab();
            this.u = this.l.map(function (c) {
                return c.s
            });
            this.K = this.l.map(function (c) {
                return c.keyCode[0]
            });
            this.S = this.l.map(function (c) {
                return c.keyCode[1]
            });
            this.V = this.l.map(function (c) {
                return c.code
            });
            this.N = document.getElementById("calculatorDiv");
            this.N.onkeydown = function (c) {
                c.preventDefault();
                k.Nb(c)
            };
            this.N.onkeyup = function (c) {
                c.preventDefault();
                k.Ob(c)
            };
            this.N.onmousedown = function (c) {
                c.preventDefault();
                k.N.focus()
            };
            this.N.onblur = function () {
                k.Pb()
            };
            this.N.oncontextmenu = function (c) {
                c.preventDefault()
            };
            q = function (c) {
                k.Hb(c)
            };
            h = function (c) {
                k.bb(c)
            };
            p = function (c) {
                k.Ib(c)
            };
            c = function (c) {
                1 === c.targetTouches.length && c.preventDefault()
            };
            window.navigator.msPointerEnabled ? e = 0 : "ontouchstart" in window ? (e = 1, "ontouchleave" in window && (f = r), window.hasOwnProperty("ontouchstart") || (x = r)) : e = 2;
            g = this.u.length;
            this.J = [];
            for (j = 0; j < g; j += 1) {
                this.J.push(document.getElementById(this.u[j]));
                try {
                    l = this.Bb(this.J[j]), color = l.getAttribute("fill"), this.R[this.U[this.l[j].r]] === o && (this.R[this.U[this.l[j].r]] = l.getAttribute("fill"))
                } catch (L) {
                    d.t("Button was undefined for key " + this.u[j] + ": " + L.message)
                }
                switch (e) {
                    case 0:
                        this.J[j].addEventListener("MSPointerDown", q);
                        this.J[j].addEventListener("MSPointerUp", h);
                        this.J[j].addEventListener("MSPointerOut", p);
                        break;
                    case 1:
                        if (this.J[j].addEventListener("touchstart", q), this.J[j].addEventListener("touchmove",
                                c), this.J[j].addEventListener("touchend", h), f && this.J[j].addEventListener("touchleave", p), !x) break;
                    default:
                        this.J[j].onmousedown = q, this.J[j].onmouseup = h, this.J[j].onmouseout = p
                }
            }
            this.Da = r
        };
        this.Ab = function () {
            this.u.length = 0;
            this.K.length = 0;
            this.S.length = 0;
            this.V.length = 0;
            this.J.length = 0;
            this.ua.length = 0;
            this.X.length = 0;
            this.D = o;
            this.$ = t;
            this.ab();
            this.Da = this.I = t;
            this.W = "normal";
            this.R = {
                tb: o,
                ub: o,
                ib: o,
                jb: o,
                sb: o,
                qb: o,
                kb: o,
                rb: o
            }
        };
        this.Pb = function () {
            var d = 0,
                g = 0,
                l = 0,
                j = t,
                q, h;
            document.onhelp = u(r);
            if (this.D &&
                this.I)
                if (this.D.id) q = this.D.id, d = this.u.indexOf(q), this.Q(q, this.R[this.U[this.l[d].r]]), this.D = s, this.I = t, this.ta(q);
                else {
                    for (h = this.D; !j && -1 !== d;) {
                        d = this.K.indexOf(h.keyboardCode, g);
                        if (-1 !== d && this.l[d].shiftKey[0] === h.shiftKey) {
                            q = this.u[d];
                            j = r;
                            break
                        }
                        if (d === this.K.length - 1) {
                            d = -1;
                            break
                        }
                        g = d + 1
                    }
                    j || (l = 1, d = g = 0);
                    for (; !j && -1 !== d;) {
                        d = this.S.indexOf(h.keyboardCode, g);
                        if (-1 !== d && this.l[d].shiftKey[l] === h.shiftKey) {
                            q = this.u[d];
                            j = r;
                            break
                        }
                        if (d === this.K.length - 1) {
                            d = -1;
                            break
                        }
                        g = d + 1
                    } - 1 !== d && j && (this.Q(q, this.R[this.U[this.l[d].r]]),
                        this.D = s, this.I = t, this.ta(q))
                }
        };
        this.Ob = function (d) {
            var g, l = 0,
                j, q = 0,
                h = 0,
                p = t;
            if (W === t && this.I && 9 !== d.keyCode) {
                g = this.Za(d);
                if (18 === g.keyboardCode || 91 === g.keyboardCode || 16 === g.keyboardCode) g = this.D;
                for (; !p && -1 !== l;) {
                    l = this.K.indexOf(g.keyboardCode, h);
                    if (-1 !== l && this.l[l].shiftKey[0] === g.shiftKey) {
                        j = this.u[l];
                        p = r;
                        break
                    }
                    if (l === this.K.length - 1) {
                        l = -1;
                        break
                    }
                    h = l + 1
                }
                p || (q = 1, l = h = 0);
                for (; !p && -1 !== l;) {
                    l = this.S.indexOf(g.keyboardCode, h);
                    if (-1 !== l && this.l[l].shiftKey[q] === g.shiftKey) {
                        j = this.u[l];
                        p = r;
                        break
                    }
                    if (l ===
                        this.K.length - 1) {
                        l = -1;
                        break
                    }
                    h = l + 1
                }
                p && (this.D.hasOwnProperty("keyboardCode") && this.D.keyboardCode === g.keyboardCode && this.D.hasOwnProperty("shiftKey") && this.D.shiftKey === g.shiftKey && this.ha(j)) && (d.preventDefault(), this.Q(j, this.R[this.U[this.l[l].r]]), this.D = s, this.I = t, this.ta(j))
            }
        };
        this.Nb = function (d) {
            var g = -2,
                l = 0,
                j, q = 0,
                h = t;
            if (this.Ka) {
                for (j = this.Za(d); !h && -1 !== g;) g = this.K.indexOf(j.keyboardCode, q), -1 !== g && (this.l[g].shiftKey[l] === j.shiftKey && this.ha(this.u[g])) && (d.preventDefault(), document.onhelp =
                    u(t), !this.I && W === t && (16 !== d.keyCode && 9 !== d.keyCode) && (this.D = j, this.Q(this.u[g], this.Ea), this.sa(this.V[g]), this.Ma(this.u[g]), h = this.$ = this.I = r)), g === this.K.length - 1 ? g = -1 : q = g + 1;
                h || (q = 0, g = -2, l = 1);
                for (; !h && -1 !== g;) g = this.S.indexOf(j.keyboardCode, q), -1 !== g && (this.l[g].shiftKey[l] === j.shiftKey && this.ha(this.u[g])) && (d.preventDefault(), document.onhelp = u(t), !this.I && W === t && (16 !== d.keyCode && 9 !== d.keyCode) && (this.D = j, this.Q(this.u[g], this.Ea), this.sa(this.V[g]), this.Ma(this.u[g]), h = this.$ = this.I = r)), g ===
                    this.K.length - 1 ? g = -1 : q = g + 1
            }
        };
        this.Za = function (d) {
            var g = d.keyCode,
                l = d.shiftKey,
                j = d.keyIdentifier,
                d = d.location || d.keyLocation;
            switch (g) {
                case 59:
                    g = 186;
                    break;
                case 61:
                    g = 187;
                    3 === d && (l = t);
                    break;
                case 96:
                    g = 48;
                    break;
                case 97:
                    g = 49;
                    break;
                case 98:
                    g = 50;
                    break;
                case 99:
                    g = 51;
                    break;
                case 100:
                    g = 52;
                    break;
                case 101:
                    g = 53;
                    break;
                case 102:
                    g = 54;
                    break;
                case 103:
                    g = 55;
                    break;
                case 104:
                    g = 56;
                    break;
                case 105:
                    g = 57;
                    break;
                case 106:
                    g = 56;
                    l = r;
                    break;
                case 107:
                    g = 187;
                    l = r;
                    break;
                case 109:
                    g = 189;
                    break;
                case 110:
                    g = 190;
                    break;
                case 111:
                    g = 191;
                    break;
                case 173:
                    g =
                        189;
                    break;
                case 187:
                    3 === d && (l = "U+002B" === j ? r : t);
                    break;
                case 224:
                    g = 91
            }
            return {
                keyboardCode: g,
                shiftKey: l
            }
        };
        this.ha = function (d) {
            return 0 === this.X.length || -1 === this.X.toString().indexOf(d)
        };
        this.Lb = function () {
            var d, g, l, j = [],
                q, h = this;
            B || m(Error("Unable to connect with the server, or the requested key mapping file is not available."));
            if (B.split(".").pop() === this.Ya) {
                d = new XMLHttpRequest;
                l = t;
                g = setTimeout(function () {
                        l = r;
                        d.abort();
                        m(Error("Unable to connect with the server, or the requested key mapping file is not available."))
                    },
                    5E3);
                d.open("GET", B, r);
                d.onreadystatechange = function () {
                    if (4 !== d.readyState || l) return t;
                    clearTimeout(g);
                    if (200 === d.status) {
                        try {
                            j = JSON.parse(d.responseText)
                        } catch (c) {
                            m(Error("The key mapping file is damaged or not a valid key mapping file."))
                        }
                        0 < j.length && (j.forEach(function (c) {
                            q = this.V.indexOf(c.code);
                            if (-1 !== q) {
                                for (a = 0; 2 > a; a += 1)
                                    if (b = this.K.indexOf(c.keyCode[a]), -1 !== b && this.l[b].shiftKey[0] === c.shiftKey[0] && (delete this.K[b], delete this.l[b].keyCode[0], delete this.l[b].shiftKey[0]), b = this.S.indexOf(c.keyCode[a]),
                                        -1 !== b && this.l[b].shiftKey[1] === c.shiftKey[1]) delete this.S[b], delete this.l[b].keyCode[1], delete this.l[b].shiftKey[1];
                                this.l[q].keyCode = c.keyCode;
                                this.K[q] = c.keyCode[0];
                                this.S[q] = c.keyCode[1];
                                this.l[q].shiftKey = c.shiftKey
                            }
                        }, h), h.l.forEach(function (c) {
                            !c.keyCode[0] && !c.keyCode[1] && m(Error("The key " + c.s + " doesn't have a keyboard code associated."))
                        }))
                    } else h = s, 404 === d.status && m(Error("Unable to connect with the server, or the requested key mapping file is not available."));
                    h = j = s
                };
                try {
                    d.send(s)
                } catch (p) {
                    m(Error(p.message))
                }
            } else m(Error("The key mapping file extension must be " +
                this.Ya))
        };
        this.disableKeys = function (d) {
            if (W === t) {
                var d = d.trim(),
                    g = window.location.host,
                    l = d.split("/"),
                    j, q, h = this;
                if (0 === d.indexOf("http://") || 0 === d.indexOf("https://")) {
                    if ("json" === d.split(".").pop()) {
                        if (l[2] === g) {
                            g = new XMLHttpRequest;
                            g.open("GET", d + "?r=" + Math.random(), t);
                            g.send(s);
                            if (g.status === v) {
                                try {
                                    j = JSON.parse(g.responseText), j.keys && (j.hasOwnProperty("secondKeys") && j.hasOwnProperty("alphaKeys") && j.keys instanceof Array && j.secondKeys instanceof Array && j.alphaKeys instanceof Array) && (q = function (c) {
                                        c =
                                            h.V.indexOf(c);
                                        if (-1 !== c) return h.u[c];
                                        m(Error("You must provide a path to a valid key configuration file"))
                                    }, h.oa = j.keys.map(q, h), h.ma = j.secondKeys.map(q, h), h.na = j.alphaKeys.map(q, h), h.P(h.u, r), "2nd" !== h.W && "alpha" !== h.W && h.P(h.oa, t), "2nd" === h.W && h.P(h.ma, t), "alpha" === h.W && h.P(h.na, t))
                                } catch (p) {
                                    h.P(h.u, r), h = s, m(Error("You must provide a path to a valid key configuration file"))
                                }
                                h = s;
                                return r
                            }
                            h = s;
                            m(Error("Unable to connect with the server, or the requested key mapping file is not available."))
                        }
                        m(Error("The requested file must be in the same server as the TI ExamCalc application"))
                    }
                    m(Error("The key configuration file extension must be .json"))
                }
                m(Error("You must provide a valid URL beginning with http:// or https://"))
            }
            m(Error("The keys cannot be disabled when the calculator is hidden."))
        };
        this.enableAllKeys = function () {
            W === t ? (this.oa.length = 0, this.ma.length = 0, this.na.length = 0, this.P(this.u, r)) : m(Error("The keys cannot be enabled when the calculator is hidden."))
        };
        this.disableAllKeys = function () {
            W === t ? this.P(this.u, t) : m(Error("The keys cannot be disabled when the calculator is hidden."))
        };
        this.ta = function (d) {
            d = (this.Fa = this.l[0].s === d && !this.Fa) ? "2nd" : "normal";
            W === t && this.W !== d && (this.P(this.X, r), "2nd" === d ? this.P(this.ma, t) : "alpha" === d ? this.P(this.na, t) : this.P(this.oa, t), this.W = d)
        };
        this.sa =
            u(r);
        this.vb = function () {
            this.Ka = r
        }
    };
    V.prototype.Ja = function (d) {
        this.G = d
    };
    V.prototype.sa = function (d) {
        var g = this.G;
        g.Ga.push(d);
        T(g, g)
    };
    var W = t,
        X;
    TI30 = function (d) {
        this.t = function (d) {
            console.log("TI Default Error Handler: " + d)
        };
        new A(this);
        (new D(this)).Gb(d);
        this.zb = new Y(this, "TI30")
    };
    TI30.prototype.O = function () {
        var d, g, l;
        this.pa = this.pa || new U;
        if (!this.H) {
            this.H = new V;
            try {
                this.H.Eb(this)
            } catch (j) {
                this.t(j.message)
            }
        }
        l = parseInt(this.T, 10);
        isNaN(l) ? (this.t("Unable to read a key history buffer length value. A value of 100 will be set."), this.H.T = 100) : this.H.T = l;
        this.G ? this.G.O() : this.G = new Q;
        this.H.vb();
        this.H.Ja(this.G);
        this.pa.Ja(this.G);
        this.scale || (this.scale = 1, this.N = document.getElementById("calculatorDiv"), this.Kb = this.N.getBoundingClientRect().width, this.Jb = this.N.getBoundingClientRect().height);
        R(this.G);
        g = this;
        this.Ia = this.Ia || 0;
        this.ra = this.ra || s;
        d = function () {
            var h = g.G.n,
                p;
            for (p = 3E3; p >= 0; p--) {
                var c = h,
                    k = o,
                    e = o,
                    f = o,
                    k = k = o;
                switch (c.ka[c.b]) {
                    case 0:
                        c.o = t;
                        k = c.q[c.b];
                        switch (k) {
                            case 2:
                                c.i = c.i + 2;
                                c.g = c.j[c.b];
                                c.b = c.g !== 0 ? c.b + c.a[c.g] + 1 : c.b + 1;
                                break;
                            case 3:
                                c.i = c.i + 3;
                                c.k = (c.a[9] & 7) * 16 + (c.a[8] & 14) >>> 1;
                                c.d = 0;
                                c.f = 8 + (c.k >>> 3);
                                c.e = c.k % 8 * 2;
                                c.b = c.h[c.d][c.f][c.e + 1] * 4096 + c.h[c.d][c.f][c.e] * 256;
                                c.k = c.k + 1;
                                c.d = 0;
                                c.f = 8 + (c.k >>> 3);
                                c.e = c.k % 8 << 1;
                                c.b = c.h[c.d][c.f][c.e + 1] * 16 + c.h[c.d][c.f][c.e] + c.b;
                                c.k = c.k + 1;
                                if (c.k > 63) {
                                    c.a[9] =
                                        0;
                                    c.a[8] = 0
                                } else if (c.k << 1 > 15) {
                                    c.a[9] = c.k >>> 3;
                                    c.a[8] = (c.k << 1) % 16
                                } else {
                                    c.a[9] = 0;
                                    c.a[8] = c.k << 1
                                }
                                break;
                            case 0:
                                c.i = c.i + 1;
                                k = c.m[c.b];
                                if (k === 0) c.b = c.b + 1;
                                else if (k === 2) c.wa = r
                        }
                        break;
                    case 1:
                        c.o = t;
                        k = c.q[c.b];
                        switch (k) {
                            case 0:
                                c.i = c.i + 2;
                                c.la = (c.a[7] << 12) + (c.a[6] << 8) + (c.a[5] << 4) + c.a[4];
                                c.Ba = c.M[c.la];
                                e = (c.Ba & 240) >> 4;
                                c.e = c.a[2] | 1;
                                c.f = c.a[3];
                                c.d = c.a[0] >>> 2;
                                c.h[c.d][c.f][c.e] = e;
                                e = c.Ba & 15;
                                c.h[c.d][c.f][c.e - 1] = e;
                                break;
                            case 1:
                                c.i = c.i + 2;
                                c.la = (c.a[7] << 12) + (c.a[6] << 8) + (c.a[5] << 4) + c.a[4];
                                c.Aa = c.M[c.la];
                                e = (c.Aa & 61440) >> 12;
                                c.e = c.a[2] | 1;
                                c.f = c.a[3];
                                c.d = c.a[0] >>> 2;
                                c.h[c.d][c.f][c.e] = e;
                                e = (c.Aa & 3840) >> 8;
                                c.h[c.d][c.f][c.e - 1] = e;
                                break;
                            case 2:
                                c.i = c.i + 1;
                                c.e = c.a[2];
                                c.f = c.a[3];
                                c.d = c.a[0] >>> 2;
                                c.h[c.d][c.f][c.e] = c.j[c.b];
                                c.a[2] = (c.a[2] + c.m[c.b]) % 16;
                                break;
                            case 3:
                                c.i = c.i + 1;
                                c.e = c.a[2] & 14;
                                c.f = c.a[3];
                                c.d = c.a[0] >>> 2;
                                c.h[c.d][c.f][c.e] = c.j[c.b];
                                c.h[c.d][c.f][c.e + 1] = c.m[c.b]
                        }
                        c.b = c.b + 1;
                        break;
                    case 2:
                        c.i = c.i + 2;
                        c.o = t;
                        switch (c.q[c.b]) {
                            case 0:
                                c.d = c.a[0] >>> 2;
                                c.f = c.a[3];
                                c.e = c.a[2];
                                k = c.a[0];
                                c.c = c.h[c.d][c.f][c.e] + c.j[c.b];
                                if (c.c < 16) {
                                    c.h[c.d][c.f][c.e] =
                                        c.c;
                                    k = c.c !== 0 ? k & 12 : (k | 2) & 14
                                } else {
                                    c.c = c.c % 16;
                                    c.h[c.d][c.f][c.e] = c.c;
                                    k = c.c !== 0 ? k & 13 | 1 : k | 3
                                }
                                c.a[0] = k;
                                break;
                            case 2:
                                c.d = c.a[0] >>> 2;
                                c.f = c.a[3];
                                c.e = c.a[2];
                                k = c.a[0];
                                c.c = c.h[c.d][c.f][c.e] - c.j[c.b];
                                if (c.c >= 0) {
                                    c.h[c.d][c.f][c.e] = c.c;
                                    k = c.c !== 0 ? k & 12 : (k | 2) & 14
                                } else {
                                    c.c = 16 + c.c;
                                    c.h[c.d][c.f][c.e] = c.c;
                                    k = c.c !== 0 ? k & 13 | 1 : k | 3
                                }
                                c.a[0] = k
                        }
                        c.b = c.b + 1;
                        break;
                    case 3:
                        c.o = t;
                        k = c.q[c.b];
                        switch (k) {
                            case 0:
                                c.i = c.i + 2;
                                c.d = c.a[0] >>> 2;
                                c.f = c.a[3];
                                c.e = c.a[2];
                                k = c.a[0];
                                c.c = c.h[c.d][c.f][c.e] & c.j[c.b];
                                c.h[c.d][c.f][c.e] = c.c;
                                k = c.c !== 0 ? k & 13 : k | 2;
                                c.a[0] = k;
                                break;
                            case 1:
                                c.i = c.i + 2;
                                c.d = c.a[0] >>> 2;
                                c.f = c.a[3];
                                c.e = c.a[2];
                                k = c.a[0];
                                c.c = c.h[c.d][c.f][c.e] | c.j[c.b];
                                c.h[c.d][c.f][c.e] = c.c;
                                k = c.c !== 0 ? k & 13 : k | 2;
                                c.a[0] = k;
                                break;
                            case 2:
                                c.i = c.i + 2;
                                c.d = c.a[0] >>> 2;
                                c.f = c.a[3];
                                c.e = c.a[2];
                                k = c.a[0];
                                c.c = c.h[c.d][c.f][c.e] ^ c.j[c.b];
                                c.h[c.d][c.f][c.e] = c.c;
                                k = c.c !== 0 ? k & 13 : k | 2;
                                c.a[0] = k;
                                break;
                            case 3:
                                c.d = c.a[0] >>> 2;
                                c.f = c.a[3];
                                c.e = c.a[2];
                                k = c.a[0];
                                c.c = c.h[c.d][c.f][c.e] - c.j[c.b];
                                k = c.c >= 0 ? c.c !== 0 ? k & 12 : (k | 2) & 14 : k & 13 | 1;
                                c.a[0] = k
                        }
                        c.b = c.b + 1;
                        break;
                    case 5:
                        c.o = t;
                        k = c.q[c.b];
                        switch (k) {
                            case 0:
                                c.i =
                                    c.i + 2;
                                c.d = c.a[0] >>> 2;
                                c.f = c.a[3];
                                c.e = c.a[2];
                                c.z = c.m[c.b];
                                c.w = c.j[c.b];
                                c.h[c.d][c.f][c.e] = c.h[c.d][c.z][c.w];
                                break;
                            case 2:
                                c.i = c.i + 4;
                                c.d = c.a[0] >>> 2;
                                c.f = c.a[3];
                                c.e = c.a[2];
                                c.z = c.m[c.b];
                                c.w = c.j[c.b];
                                e = c.h[c.d][c.f][c.e];
                                c.h[c.d][c.f][c.e] = c.h[c.d][c.z][c.w];
                                c.h[c.d][c.z][c.w] = e
                        }
                        c.b = c.b + 1;
                        break;
                    case 6:
                        c.i = c.i + 3;
                        c.o = t;
                        k = c.q[c.b];
                        switch (k) {
                            case 0:
                                f = 0;
                                c.a[0] = c.a[0] | 2;
                                do {
                                    c.d = c.a[0] >>> 2;
                                    f = f + 1;
                                    c.f = c.a[3];
                                    c.e = c.a[2];
                                    c.z = c.m[c.b];
                                    c.w = c.a[2];
                                    c.c = c.h[c.d][c.f][c.e] + c.h[c.d][c.z][c.w] + (c.a[0] & 1);
                                    if (c.c < 16) {
                                        c.h[c.d][c.f][c.e] =
                                            c.c;
                                        c.a[0] = c.c !== 0 ? c.a[0] & 12 : c.a[0] & 14
                                    } else {
                                        c.c = c.c % 16;
                                        c.h[c.d][c.f][c.e] = c.c;
                                        c.a[0] = c.c !== 0 ? c.a[0] & 13 | 1 : c.a[0] | 1
                                    }
                                    c.a[2] = (c.a[2] + 1) % 16;
                                    c.a[1] = c.a[1] !== 0 ? c.a[1] - 1 : 15
                                } while (c.a[1] > 0);
                                break;
                            case 1:
                                f = 0;
                                c.a[0] = c.a[0] | 2;
                                do {
                                    c.d = c.a[0] >>> 2;
                                    f = f + 1;
                                    c.f = c.a[3];
                                    c.e = c.a[2];
                                    c.z = c.m[c.b];
                                    c.w = c.a[2];
                                    c.c = c.h[c.d][c.f][c.e] + c.h[c.d][c.z][c.w] + (c.a[0] & 1);
                                    if (c.c < 10) {
                                        c.h[c.d][c.f][c.e] = c.c;
                                        c.a[0] = c.c !== 0 ? c.a[0] & 12 : c.a[0] & 14
                                    } else {
                                        c.c = c.c % 10;
                                        c.h[c.d][c.f][c.e] = c.c;
                                        c.a[0] = c.c !== 0 ? c.a[0] & 13 | 1 : c.a[0] | 1
                                    }
                                    c.a[2] = (c.a[2] + 1) % 16;
                                    c.a[1] = c.a[1] !== 0 ? c.a[1] - 1 : 15
                                } while (c.a[1] > 0);
                                break;
                            case 2:
                                f = 0;
                                c.a[0] = c.a[0] | 2;
                                do {
                                    c.d = c.a[0] >>> 2;
                                    f = f + 1;
                                    c.f = c.a[3];
                                    c.e = c.a[2];
                                    c.z = c.m[c.b];
                                    c.w = c.a[2];
                                    c.c = c.h[c.d][c.f][c.e] - c.h[c.d][c.z][c.w] - (c.a[0] & 1);
                                    if (c.c >= 0) {
                                        c.h[c.d][c.f][c.e] = c.c;
                                        c.a[0] = c.c !== 0 ? c.a[0] & 12 : c.a[0] & 14
                                    } else {
                                        c.c = c.c + 16;
                                        c.h[c.d][c.f][c.e] = c.c;
                                        c.a[0] = c.c !== 0 ? c.a[0] & 13 | 1 : c.a[0] | 1
                                    }
                                    c.a[2] = (c.a[2] + 1) % 16;
                                    c.a[1] = c.a[1] !== 0 ? c.a[1] - 1 : 15
                                } while (c.a[1] > 0);
                                break;
                            case 3:
                                f = 0;
                                c.a[0] = c.a[0] | 2;
                                do {
                                    c.d = c.a[0] >>> 2;
                                    f = f + 1;
                                    c.f = c.a[3];
                                    c.e = c.a[2];
                                    c.z = c.m[c.b];
                                    c.w = c.a[2];
                                    c.c = c.h[c.d][c.f][c.e] - c.h[c.d][c.z][c.w] - (c.a[0] & 1);
                                    if (c.c >= 0) {
                                        c.h[c.d][c.f][c.e] = c.c;
                                        c.a[0] = c.c !== 0 ? c.a[0] & 12 : c.a[0] & 14
                                    } else {
                                        c.c = c.c + 10;
                                        c.h[c.d][c.f][c.e] = c.c;
                                        c.a[0] = c.c !== 0 ? c.a[0] & 13 | 1 : c.a[0] | 1
                                    }
                                    c.a[2] = (c.a[2] + 1) % 16;
                                    c.a[1] = c.a[1] > 0 ? c.a[1] - 1 : 15
                                } while (c.a[1] > 0)
                        }
                        c.b = c.b + 1;
                        break;
                    case 7:
                        c.o = t;
                        k = c.q[c.b];
                        switch (k) {
                            case 0:
                                c.i = c.i + 2;
                                c.d = c.a[0] >>> 2;
                                f = 0;
                                do {
                                    f = f + 1;
                                    c.f = c.a[3];
                                    c.e = (c.a[2] + c.j[c.b]) % 16;
                                    c.z = c.m[c.b];
                                    c.w = c.a[2];
                                    c.h[c.d][c.f][c.e] = c.h[c.d][c.z][c.w];
                                    c.a[2] = c.a[2] === 15 ? 0 : c.a[2] + 1;
                                    c.a[1] =
                                        c.a[1] > 0 ? c.a[1] - 1 : 15
                                } while (c.a[1] > 0);
                                break;
                            case 1:
                                c.i = c.i + 2;
                                c.d = c.a[0] >>> 2;
                                f = 0;
                                do {
                                    f = f + 1;
                                    c.f = c.a[3];
                                    c.e = (c.a[2] + c.j[c.b]) % 16;
                                    c.z = c.m[c.b];
                                    c.w = c.a[2];
                                    c.h[c.d][c.f][c.e] = c.h[c.d][c.z][c.w];
                                    c.a[2] = c.a[2] > 0 ? c.a[2] - 1 : 15;
                                    c.a[1] = c.a[1] > 0 ? c.a[1] - 1 : 15
                                } while (c.a[1] > 0);
                                break;
                            case 2:
                                c.i = c.i + 4;
                                c.d = c.a[0] >>> 2;
                                f = 0;
                                do {
                                    f = f + 1;
                                    c.f = c.a[3];
                                    c.e = c.a[2];
                                    c.z = c.m[c.b];
                                    c.w = c.e;
                                    e = c.h[c.d][c.f][c.e];
                                    c.h[c.d][c.f][c.e] = c.h[c.d][c.z][c.w];
                                    c.h[c.d][c.z][c.w] = e;
                                    c.a[2] = c.a[2] === 15 ? 0 : c.a[2] + 1;
                                    c.a[1] = c.a[1] > 0 ? c.a[1] - 1 : 15
                                } while (c.a[1] >
                                    0);
                                break;
                            case 3:
                                c.i = c.i + 2;
                                c.d = c.a[0] >>> 2;
                                f = 0;
                                c.a[0] = c.a[0] | 2;
                                do {
                                    f = f + 1;
                                    c.f = c.a[3];
                                    c.e = c.a[2];
                                    c.z = c.m[c.b];
                                    c.w = c.a[2];
                                    e = c.a[0] & 1;
                                    c.c = c.h[c.d][c.f][c.e] - c.h[c.d][c.z][c.w] - e;
                                    c.a[0] = c.c >= 0 ? c.c !== 0 ? c.a[0] & 12 : c.a[0] & 14 : c.c !== 0 ? c.a[0] & 13 | 1 : c.a[0] | 1;
                                    c.a[2] = c.a[2] === 15 ? 0 : c.a[2] + 1;
                                    c.a[1] = c.a[1] > 0 ? c.a[1] - 1 : 15
                                } while (c.a[1] > 0)
                        }
                        c.b = c.b + 1;
                        break;
                    case 8:
                        c.i = c.i + 1;
                        c.o = t;
                        c.d = c.a[0] >>> 2;
                        c.f = c.a[3];
                        c.e = c.a[2];
                        c.p = c.q[c.b];
                        e = c.j[c.b];
                        k = c.a[0];
                        for (f = c.h[c.d][c.f][c.e]; e >= 0;) {
                            k = f % 2 !== 0 ? k | 1 : k & 14;
                            f = f >>> 1;
                            e = e - 1
                        }
                        c.a[c.p] = f;
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 9:
                        c.i = c.i + 1;
                        c.o = t;
                        c.d = c.a[0] >>> 2;
                        c.f = c.a[3];
                        c.e = c.a[2];
                        c.p = c.q[c.b];
                        e = c.j[c.b];
                        k = c.a[0];
                        for (c.c = c.h[c.d][c.f][c.e]; e >= 0;) {
                            c.c = c.c << 1;
                            if (c.c >= 16) {
                                c.c = c.c % 16;
                                k = k | 1
                            } else k = k & 14;
                            e = e - 1
                        }
                        c.a[c.p] = c.c;
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 10:
                        c.i = c.i + 1;
                        c.o = t;
                        c.k = ((c.a[9] & 7) << 4) + (c.a[8] & 14) >>> 1;
                        c.k = c.k !== 0 ? c.k - 1 : 63;
                        c.d = 0;
                        c.f = 8 + (c.k >>> 3);
                        c.e = c.k % 8 << 1;
                        c.g = c.m[c.b];
                        if (c.g !== 30) {
                            if (c.g !== 48) {
                                if (c.g === 16) {
                                    O(c, 16);
                                    O(c, 17)
                                }
                                c.h[c.d][c.f][c.e] = c.a[c.g];
                                c.h[c.d][c.f][c.e +
                                    1
                                ] = c.a[c.g + 1]
                            }
                        } else {
                            c.v = c.a[27];
                            if (M(c.v) === t) {
                                if (c.v < 14) {
                                    if ((c.a[24] & 1) !== 0) {
                                        c.B = c.a[29];
                                        c.A = c.a[28];
                                        c.a[30] = c.F[c.v][c.B][c.A] % 16;
                                        c.h[c.d][c.f][c.e] = c.a[30];
                                        c.a[31] = c.F[c.v][c.B][c.A] >>> 4;
                                        c.h[c.d][c.f][c.e + 1] = c.a[31]
                                    }
                                } else if ((c.a[24] & 2) !== 0) {
                                    c.B = c.a[29];
                                    c.A = c.a[28];
                                    c.a[30] = c.F[c.v][c.B][c.A] % 16;
                                    c.h[c.d][c.f][c.e] = c.a[30];
                                    c.a[31] = c.F[c.v][c.B][c.A] >>> 4;
                                    c.h[c.d][c.f][c.e + 1] = c.a[31]
                                }
                                N(c)
                            }
                        }
                        c.a[8] = c.k * 2 % 16;
                        c.a[9] = c.k >>> 3;
                        c.b = c.b + 1;
                        break;
                    case 11:
                        c.i = c.i + 1;
                        c.k = ((c.a[9] & 7) << 4) + (c.a[8] & 14) >> 1;
                        c.d = 0;
                        c.f =
                            8 + (c.k >>> 3);
                        c.e = c.k % 8 << 1;
                        c.g = c.m[c.b];
                        c.o = c.g !== 6 ? t : r;
                        if (c.g !== 30) {
                            c.a[c.g] = c.h[c.d][c.f][c.e];
                            c.a[c.g + 1] = c.h[c.d][c.f][(c.e + 1) % 16];
                            switch (c.g) {
                                case 8:
                                    c.a[c.g] = c.h[c.d][c.f][c.e] & 14;
                                    c.a[c.g + 1] = c.h[c.d][c.f][(c.e + 1) % 16] & 7;
                                    break;
                                case 44:
                                    H(c);
                                    break;
                                case 10:
                                    G(c);
                                    break;
                                case 42:
                                    I(c);
                                    J(c);
                                    break;
                                case 22:
                                    if ((c.a[22] & 2) !== 0) c.Z = r;
                                    break;
                                case 24:
                                    if ((c.a[c.g] & 1) !== 0) c.L = 255;
                                    break;
                                case 58:
                                    (c.a[58] & 1) !== 0 && P(c)
                            }
                        } else {
                            c.v = c.a[27];
                            if (M(c.v) === t) {
                                if (c.v < 14) {
                                    if ((c.a[24] & 1) !== 0) {
                                        c.B = c.a[29];
                                        c.A = c.a[28];
                                        c.a[30] = c.h[c.d][c.f][c.e];
                                        c.a[31] = c.h[c.d][c.f][(c.e + 1) % 16];
                                        c.F[c.v][c.B][c.A] = c.a[31] * 16 + c.a[30]
                                    }
                                } else if ((c.a[24] & 2) !== 0) {
                                    c.B = c.a[29];
                                    c.A = c.a[28];
                                    c.a[30] = c.h[c.d][c.f][c.e];
                                    c.a[31] = c.h[c.d][c.f][(c.e + 1) % 16];
                                    c.F[c.v][c.B][c.A] = c.a[31] * 16 + c.a[30]
                                }
                                N(c)
                            }
                        }
                        c.k = (c.k + 1) % 64;
                        c.a[9] = c.k >>> 3;
                        c.a[8] = (c.k << 1) % 16;
                        c.b = c.b + 1;
                        break;
                    case 12:
                        c.i = c.i + 1;
                        c.o = t;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        e = c.j[c.b];
                        k = c.a[0];
                        for (f = c.g !== 0 ? c.a[c.g] : 0; e >= 0;) {
                            k = f % 2 !== 0 ? k | 1 : k & 14;
                            f = f >>> 1;
                            e = e - 1
                        }
                        c.a[c.p] = f;
                        c.a[0] = k;
                        c.o = c.p !== 7 ? t : r;
                        c.b = c.b + 1;
                        break;
                    case 13:
                        c.i = c.i + 1;
                        c.o =
                            t;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        e = c.j[c.b];
                        k = c.a[0];
                        for (c.c = c.g !== 0 ? c.a[c.g] : 0; e >= 0;) {
                            c.c = c.c << 1;
                            if (c.c >= 16) {
                                c.c = c.c % 16;
                                k = k | 1
                            } else k = k & 14;
                            e = e - 1
                        }
                        c.a[c.p] = c.c;
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 14:
                        c.i = c.i + 1;
                        c.g = c.m[c.b];
                        c.o = c.g !== 7 ? t : r;
                        c.e = c.a[2];
                        c.f = c.a[3];
                        c.d = c.a[0] >>> 2;
                        c.a[c.g] = c.h[c.d][c.f][c.e];
                        switch (c.g) {
                            case 8:
                                c.a[c.g] = c.h[c.d][c.f][c.e] & 14;
                                break;
                            case 9:
                                c.a[c.g] = c.h[c.d][c.f][c.e] & 7;
                                break;
                            case 44:
                                H(c);
                                break;
                            case 10:
                                G(c);
                                break;
                            case 42:
                                I(c);
                                break;
                            case 43:
                                J(c);
                                break;
                            case 22:
                                if ((c.a[22] &
                                        2) === 0) c.Z = r;
                                break;
                            case 24:
                                if ((c.a[c.g] & 1) !== 0) c.L = 255;
                                break;
                            case 58:
                                (c.a[58] & 1) !== 0 && P(c)
                        }
                        c.b = c.b + 1;
                        break;
                    case 15:
                        c.i = c.i + 1;
                        c.o = t;
                        c.g = c.m[c.b];
                        (c.g === 16 || c.g === 17) && O(c, c.g);
                        c.d = c.a[0] >>> 2;
                        c.f = c.a[3];
                        c.e = c.a[2];
                        c.h[c.d][c.f][c.e] = c.a[c.g];
                        c.b = c.b + 1;
                        break;
                    case 16:
                        c.i = c.i + 1;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        c.c = c.g !== 0 ? c.a[c.g] + c.j[c.b] : c.j[c.b];
                        k = c.a[0];
                        if (c.c < 16) {
                            c.a[c.p] = c.c;
                            k = c.c !== 0 ? k & 12 : (k | 2) & 14
                        } else {
                            c.c = c.c % 16;
                            c.a[c.p] = c.c;
                            k = c.c !== 0 ? k & 13 | 1 : k | 3
                        }
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 17:
                        c.i = c.i +
                            1;
                        c.o = t;
                        c.g = c.j[c.b];
                        e = c.g !== 0 ? c.a[c.g] : 0;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        c.c = c.g !== 0 ? c.a[c.g] + e : e;
                        k = c.a[0];
                        if (c.c < 16) {
                            c.a[c.p] = c.c;
                            k = c.c !== 0 ? k & 12 : (k | 2) & 14
                        } else {
                            c.c = c.c % 16;
                            c.a[c.p] = c.c;
                            k = c.c !== 0 ? k & 13 | 1 : k | 3
                        }
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 18:
                        c.i = c.i + 1;
                        c.o = t;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        c.c = c.g !== 0 ? c.a[c.g] - c.j[c.b] : 0 - c.j[c.b];
                        k = c.a[0];
                        if (c.c >= 0) {
                            c.a[c.p] = c.c;
                            k = c.c !== 0 ? k & 12 : (k | 2) & 14
                        } else {
                            c.c = c.c + 16;
                            c.a[c.p] = c.c;
                            k = k & 13 | 1
                        }
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 19:
                        c.i = c.i + 1;
                        c.o = t;
                        c.g = c.j[c.b];
                        e = c.g !== 0 ? c.a[c.g] : 0;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        c.c = c.g !== 0 ? c.a[c.g] - e : 0 - e;
                        k = c.a[0];
                        if (c.c >= 0) {
                            c.a[c.p] = c.c;
                            k = c.c !== 0 ? k & 12 : (k | 2) & 14
                        } else {
                            c.c = c.c + 16;
                            c.a[c.p] = c.c;
                            k = c.c !== 0 ? k & 13 | 1 : k | 3
                        }
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 20:
                        c.i = c.i + 1;
                        c.g = c.m[c.b];
                        c.o = c.g !== 7 ? t : r;
                        c.a[c.g] = c.j[c.b];
                        switch (c.g) {
                            case 8:
                                c.a[c.g] = c.j[c.b] & 14;
                                break;
                            case 9:
                                c.a[c.g] = c.j[c.b] & 7;
                                break;
                            case 44:
                                H(c);
                                break;
                            case 10:
                                G(c);
                                break;
                            case 42:
                                I(c);
                                break;
                            case 43:
                                J(c);
                                break;
                            case 22:
                                if ((c.a[22] & 2) === 0) c.Z = r;
                                break;
                            case 24:
                                if ((c.a[c.g] &
                                        1) !== 0) {
                                    c.L = 255;
                                    c.a[47] = c.a[47] & 14
                                }
                                break;
                            case 58:
                                (c.a[58] & 1) !== 0 && P(c)
                        }
                        c.b = c.b + 1;
                        break;
                    case 21:
                        c.i = c.i + 1;
                        c.o = t;
                        c.g = c.j[c.b];
                        e = c.g !== 0 ? c.a[c.g] : 0;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        k = c.a[0];
                        c.c = c.g !== 0 ? c.a[c.g] + e + (k & 1) : e + (k & 1);
                        if (c.c < 16) {
                            c.a[c.p] = c.c;
                            k = c.c !== 0 ? k & 12 : (k | 2) & 14
                        } else {
                            c.c = c.c % 16;
                            c.a[c.p] = c.c;
                            k = c.c !== 0 ? k & 13 | 1 : k | 3
                        }
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 22:
                        c.i = c.i + 1;
                        c.g = c.q[c.b] << 1;
                        c.o = c.g !== 6 ? t : r;
                        c.a[c.g] = c.j[c.b];
                        c.a[c.g + 1] = c.m[c.b];
                        switch (c.g) {
                            case 8:
                                c.a[c.g] = c.j[c.b] & 14;
                                c.a[c.g + 1] = c.j[c.b] &
                                    7;
                                break;
                            case 44:
                                H(c);
                                break;
                            case 10:
                                G(c);
                                break;
                            case 42:
                                I(c);
                                J(c);
                                break;
                            case 22:
                                if ((c.a[22] & 2) === 0) c.Z = r;
                                break;
                            case 24:
                                if ((c.a[c.g] & 1) !== 0) c.L = 255;
                                break;
                            case 58:
                                (c.a[58] & 1) !== 0 && P(c)
                        }
                        c.b = c.b + 1;
                        break;
                    case 23:
                        c.i = c.i + 1;
                        c.o = t;
                        c.g = c.j[c.b];
                        e = c.g !== 0 ? c.a[c.g] : 0;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        k = c.a[0] >>> 0;
                        c.c = c.g !== 0 ? c.a[c.g] - e - (k & 1) : 0 - e - (k & 1);
                        if (c.c >= 0) {
                            c.a[c.p] = c.c;
                            k = c.c !== 0 ? k & 12 : (k | 2) & 14
                        } else {
                            c.c = c.c + 16;
                            c.a[c.p] = c.c;
                            k = c.c !== 0 ? k & 13 | 1 : k | 3
                        }
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 24:
                        c.i = c.i + 1;
                        c.o = t;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        c.c = c.g !== 0 ? c.a[c.g] & c.j[c.b] : 0;
                        k = c.a[0];
                        c.a[c.p] = c.c;
                        k = c.c !== 0 ? k & 13 : k | 2;
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 25:
                        c.i = c.i + 1;
                        c.o = t;
                        c.g = c.j[c.b];
                        e = c.g !== 0 ? c.a[c.g] : 0;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        c.c = c.g !== 0 ? c.a[c.g] & e : 0;
                        k = c.a[0];
                        c.a[c.p] = c.c;
                        k = c.c !== 0 ? k & 13 : k | 2;
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 26:
                        c.i = c.i + 1;
                        c.o = t;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        c.c = c.g !== 0 ? c.a[c.g] | c.j[c.b] : c.j[c.b];
                        k = c.a[0];
                        c.a[c.p] = c.c;
                        k = c.c !== 0 ? k & 13 : k | 2;
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 27:
                        c.i =
                            c.i + 1;
                        c.o = t;
                        c.g = c.j[c.b];
                        e = c.g !== 0 ? c.a[c.g] : 0;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        c.c = c.g !== 0 ? c.a[c.g] | e : e;
                        k = c.a[0];
                        c.a[c.p] = c.c;
                        k = c.c !== 0 ? k & 13 : k | 2;
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 28:
                        c.i = c.i + 1;
                        c.o = t;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        c.c = c.g !== 0 ? c.a[c.g] ^ c.j[c.b] : 0 ^ c.j[c.b];
                        k = c.a[0];
                        c.a[c.p] = c.c;
                        k = c.c !== 0 ? k & 13 : k | 2;
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 29:
                        c.i = c.i + 1;
                        c.o = t;
                        c.g = c.j[c.b];
                        e = c.g !== 0 ? c.a[c.g] : 0;
                        c.g = c.m[c.b];
                        c.p = c.q[c.b];
                        c.c = c.g !== 0 ? c.a[c.g] ^ e : 0 ^ e;
                        k = c.a[0];
                        c.a[c.p] = c.c;
                        k = c.c !== 0 ? k & 13 : k |
                            2;
                        c.o = c.p !== 7 ? t : r;
                        c.a[0] = k;
                        c.b = c.b + 1;
                        break;
                    case 30:
                        c.i = c.i + 1;
                        c.o = t;
                        c.d = c.a[0] >>> 2;
                        c.f = c.a[3];
                        c.e = c.a[2] & 14;
                        c.g = c.m[c.b];
                        c.o = c.g !== 6 ? t : r;
                        if (c.g !== 30) {
                            c.a[c.g] = c.h[c.d][c.f][c.e];
                            c.a[c.g + 1] = c.h[c.d][c.f][(c.e + 1) % 16];
                            switch (c.g) {
                                case 8:
                                    c.a[c.g] = c.h[c.d][c.f][c.e] & 14;
                                    c.a[c.g + 1] = c.h[c.d][c.f][(c.e + 1) % 16] & 7;
                                    break;
                                case 44:
                                    H(c);
                                    break;
                                case 10:
                                    G(c);
                                    break;
                                case 42:
                                    I(c);
                                    J(c);
                                    break;
                                case 22:
                                    if ((c.a[22] & 2) === 0) c.Z = r;
                                    break;
                                case 24:
                                    if ((c.a[c.g] & 1) !== 0) c.L = 255;
                                    break;
                                case 58:
                                    (c.a[58] & 1) !== 0 && P(c)
                            }
                        } else {
                            c.v = c.a[27];
                            if (M(c.v) ===
                                t) {
                                if (c.v < 14) {
                                    if ((c.a[24] & 1) !== 0) {
                                        c.B = c.a[29];
                                        c.A = c.a[28];
                                        c.a[30] = c.h[c.d][c.f][c.e];
                                        c.a[31] = c.h[c.d][c.f][(c.e + 1) % 16];
                                        c.F[c.v][c.B][c.A] = c.a[31] * 16 + c.a[30]
                                    }
                                } else if ((c.a[24] & 2) !== 0) {
                                    c.B = c.a[29];
                                    c.A = c.a[28];
                                    c.a[30] = c.h[c.d][c.f][c.e];
                                    c.a[31] = c.h[c.d][c.f][(c.e + 1) % 16];
                                    c.F[c.v][c.B][c.A] = (c.a[31] << 4) + c.a[30]
                                }
                                N(c)
                            }
                        }
                        c.b = c.b + 1;
                        break;
                    case 31:
                        c.i = c.i + 1;
                        c.o = t;
                        c.d = c.a[0] >>> 2;
                        c.f = c.a[3];
                        c.e = c.a[2] & 14;
                        c.g = c.m[c.b];
                        if (c.g !== 30) {
                            if (c.g !== 48) {
                                if (c.g === 16) {
                                    O(c, 16);
                                    O(c, 17)
                                }
                                c.h[c.d][c.f][c.e] = c.a[c.g];
                                c.h[c.d][c.f][c.e +
                                    1
                                ] = c.a[c.g + 1]
                            }
                        } else {
                            c.v = c.a[27];
                            if (M(c.v) === t) {
                                if (c.v < 14) {
                                    if ((c.a[24] & 1) !== 0) {
                                        c.B = c.a[29];
                                        c.A = c.a[28];
                                        c.a[30] = c.F[c.v][c.B][c.A] % 16;
                                        c.h[c.d][c.f][c.e] = c.a[30];
                                        c.a[31] = c.F[c.v][c.B][c.A] >>> 4;
                                        c.h[c.d][c.f][c.e + 1] = c.a[31]
                                    }
                                } else if ((c.a[24] & 2) !== 0) {
                                    c.B = c.a[29];
                                    c.A = c.a[28];
                                    c.a[30] = c.F[c.v][c.B][c.A] % 16;
                                    c.h[c.d][c.f][c.e] = c.a[30];
                                    c.a[31] = c.F[c.v][c.B][c.A] >>> 4;
                                    c.h[c.d][c.f][c.e + 1] = c.a[31]
                                }
                                N(c)
                            }
                        }
                        c.b = c.b + 1;
                        break;
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                        c.i = c.i + 1;
                        c.o = t;
                        c.d = c.a[0] >>> 2;
                        c.f = c.q[c.b];
                        c.e = c.m[c.b];
                        c.h[c.d][c.f][c.e] =
                            c.j[c.b];
                        c.b = c.b + 1;
                        break;
                    case 36:
                    case 37:
                    case 38:
                    case 39:
                        c.b = c.b + 1;
                        c.o = t;
                        c.k = ((c.a[9] & 7) << 4) + (c.a[8] & 14) >>> 1;
                        c.k = c.k !== 0 ? c.k - 1 : 63;
                        c.d = 0;
                        c.f = 8 + (c.k >>> 3);
                        c.e = c.k % 8 << 1;
                        c.h[c.d][c.f][c.e] = c.b & 15;
                        c.h[c.d][c.f][c.e + 1] = (c.b & 240) >> 4;
                        c.k = c.k - 1;
                        c.d = 0;
                        c.f = 8 + (c.k >>> 3);
                        c.e = c.k % 8 << 1;
                        c.h[c.d][c.f][c.e] = (c.b & 3840) >> 8;
                        c.h[c.d][c.f][c.e + 1] = (c.b & 61440) >> 12;
                        c.b = (c.b >>> 12 << 12) + c.j[c.b - 1];
                        if (c.k << 1 > 15) {
                            c.a[9] = c.k >>> 3;
                            c.a[8] = (c.k << 1) % 16
                        } else {
                            c.a[9] = 0;
                            c.a[8] = c.k << 1
                        }
                        break;
                    case 40:
                    case 41:
                    case 42:
                    case 43:
                        k = c.b;
                        c.i = c.i + 2;
                        c.b =
                            c.b + 1;
                        c.o = t;
                        c.k = ((c.a[9] & 7) << 4) + (c.a[8] & 14) >>> 1;
                        c.k = c.k !== 0 ? c.k - 1 : 63;
                        c.d = 0;
                        c.f = 8 + (c.k >>> 3);
                        c.e = c.k % 8 << 1;
                        c.h[c.d][c.f][c.e] = c.b & 15;
                        c.h[c.d][c.f][c.e + 1] = (c.b & 240) >> 4;
                        c.k = c.k - 1;
                        c.d = 0;
                        c.f = 8 + (c.k >>> 3);
                        c.e = c.k % 8 * 2;
                        c.h[c.d][c.f][c.e] = (c.b & 3840) >> 8;
                        c.h[c.d][c.f][c.e + 1] = (c.b & 61440) >> 12;
                        if (c.k * 2 > 15) {
                            c.a[9] = c.k >>> 3;
                            c.a[8] = (c.k << 1) % 16
                        } else {
                            c.a[9] = 0;
                            c.a[8] = c.k << 1
                        }
                        c.b = c.j[k];
                        break;
                    case 44:
                    case 45:
                    case 46:
                    case 47:
                        c.i = c.i + 1;
                        c.o = t;
                        c.b = (c.a[0] & 2) !== 0 ? ((c.b >>> 0) / 4096 >>> 0) * 4096 + c.j[c.b] : c.b + 1;
                        break;
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                        c.i =
                            c.i + 1;
                        c.o = t;
                        c.b = (c.a[0] & 2) === 0 ? ((c.b >>> 0) / 4096 >>> 0) * 4096 + c.j[c.b] : c.b + 1;
                        break;
                    case 52:
                    case 53:
                    case 54:
                    case 55:
                        c.i = c.i + 1;
                        c.o = t;
                        c.b = (c.a[0] & 1) !== 0 ? ((c.b >>> 0) / 4096 >>> 0) * 4096 + c.j[c.b] : c.b + 1;
                        break;
                    case 56:
                    case 57:
                    case 58:
                    case 59:
                        c.i = c.i + 1;
                        c.o = t;
                        c.b = (c.a[0] & 1) === 0 ? ((c.b >>> 0) / 4096 >>> 0) * 4096 + c.j[c.b] : c.b + 1;
                        break;
                    case 60:
                    case 61:
                    case 62:
                    case 63:
                        k = c.b;
                        c.i = c.i + 1;
                        if (c.o === r) c.b = c.a[7] * 4096 + c.j[k];
                        c.o = t;
                        c.b = ((c.b >>> 0) / 4096 >>> 0) * 4096 + c.j[k]
                }
                if (c.xa && (c.a[10] & 2) !== 0) {
                    K(c);
                    c.b = c.Va;
                    c.xa = t;
                    c.a[40] = c.a[40] & 14
                }
                if (c.ia &&
                    c.ya) {
                    K(c);
                    c.b = c.Wa;
                    c.ia = t;
                    c.a[40] = c.a[40] & 13
                }
                if (c.ja && c.za) {
                    K(c);
                    c.b = c.Xa;
                    c.ja = t;
                    c.a[40] = c.a[40] & 11
                }
                if (c.Oa) {
                    K(c);
                    c.b = c.Ta;
                    c.Oa = t;
                    c.a[40] = c.a[40] & 7
                }
                if (c.va) {
                    K(c);
                    c.b = c.Sa;
                    c.va = t;
                    c.a[41] = c.a[41] & 14
                }
                if (c.Pa) {
                    K(c);
                    c.b = c.Ua;
                    c.Pa = t;
                    c.a[41] = c.a[41] & 13
                }(c.a[22] & 2) === 0 && (c.h[2][8][10] = 15)
            }
            p = (new Date - h.$a) * 1E3;
            h.$a = new Date;
            h.C[0].hb(p);
            h.C[1].hb(p);
            if (h.C[0].ea && h.C[0].Y) {
                if ((h.a[42] & 4) !== 0) {
                    h.ia = r;
                    h.a[40] = h.a[40] | 2
                }
                h.C[0].reset();
                h.C[0].ea = t
            }
            if (h.C[1].ea && h.C[1].Y) {
                if ((h.a[43] & 4) !== 0) {
                    h.ja = r;
                    h.a[40] = h.a[40] |
                        4
                }
                h.C[1].reset();
                h.C[1].ea = t
            }
            if (g.G.n.Z === r) {
                g.G.n.Z = t;
                h = g.pa;
                p = [];
                var e = 0,
                    j, l, q, n = [],
                    i, c = h.Qa,
                    k = h.Ra;
                h.context.fillStyle = "#ffffff";
                h.context.fillRect(c, k, 384, 160);
                h.context.fillStyle = "#000000";
                for (f = 14; f <= 15; f++)
                    for (j = 0; j < 16; j++)
                        for (l = 0; l < 16; l++) {
                            p[e] = h.G.n.F[f][j][l];
                            e++
                        }
                j = k + 6;
                for (k = 0; k < h.pb; k++) {
                    k % 12 === 0 && (j = j + 2);
                    if (p[k] !== 0) {
                        l = p[k];
                        for (e = 0; e < 8; e++)
                            if ((l >> 7 - e & 1) !== 0) {
                                f = k % 12 * 16;
                                f = f + e * 2;
                                f = f + c;
                                h.context.fillRect(f, j, 2, 2)
                            }
                    }
                }
                c = h.Qa + h.ob;
                k = h.Ra;
                for (q = 0; q < 96; q++)
                    if ((p[372 + (q / 8 >>> 0)] & 1 << 7 - q % 8) !== 0) switch (q) {
                        case 2:
                            n = [252, 180, 180, 180, 180, 148, 252];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 0;
                                            f = f + c;
                                            f = f + (i - 48);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 8:
                            n = [192, 32, 64, 128, 224];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 16;
                                            f = f + c;
                                            f = f + (i - 56);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 9:
                            n = [9, 13, 11, 9, 9];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 16;
                                            f = f + c;
                                            f = f + (i - 56);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 10:
                            n = [96, 80, 80, 80, 96];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 32;
                                            f = f + c;
                                            f = f + (i - 64);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 11:
                            n = [7, 4, 7, 4, 7];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 32;
                                            f = f + c;
                                            f = f + (i - 64);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 15:
                            n = [40, 40, 56, 40, 40];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 48;
                                            f = f + c;
                                            f = f + (i - 72);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 16:
                            n = [2, 2, 2, 1, 1];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 48;
                                            f = f + c;
                                            f = f + (i - 72);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } n = [128, 128, 128, 0, 0];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 64;
                                            f = f + c;
                                            f = f + (i - 80);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 17:
                            n = [56, 40, 56, 32, 32];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 64;
                                            f = f + c;
                                            f = f + (i - 80);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 21:
                            n = [1, 1, 1, 1, 1];
                            for (e =
                                0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 64;
                                            f = f + c;
                                            f = f + (i - 80);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } n = [192, 0, 192, 0, 0];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 80;
                                            f = f + c;
                                            f = f + (i - 88);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 22:
                            n = [16, 16, 16, 16, 16];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 80;
                                            f = f + c;
                                            f = f + (i - 88);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 23:
                            n = [5, 5, 2, 5, 5];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !==
                                    0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 80;
                                            f = f + c;
                                            f = f + (i - 88);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 27:
                            n = [36, 40, 48, 40, 36];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 96;
                                            f = f + c;
                                            f = f + (i - 96);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 31:
                            n = [255, 66, 36, 24, 36, 66, 255];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 112;
                                            f = f + c;
                                            f = f + (i - 104);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 35:
                            n = [31, 20, 23, 22, 21, 16, 31];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !==
                                    0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 128;
                                            f = f + c;
                                            f = f + (i - 112);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } n = [192, 64, 64, 192, 192, 64, 192];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 144;
                                            f = f + c;
                                            f = f + (i - 120);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 41:
                            h.context.fillStyle = "#000000";
                            n = [6, 8, 4, 2, 12];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 144;
                                            f = f + c;
                                            f = f + (i - 120);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 42:
                            n = [96, 128, 128, 128, 96];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 160;
                                            f = f + c;
                                            f = f + (i - 128);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 43:
                            n = [8, 8, 8, 8, 8];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 160;
                                            f = f + c;
                                            f = f + (i - 128);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 44:
                            n = [2, 3, 2, 2, 2];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 160;
                                            f = f + c;
                                            f = f + (i - 128);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } n = [64, 64, 192, 64, 64];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !==
                                    0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 176;
                                            f = f + c;
                                            f = f + (i - 136);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 45:
                            n = [14, 16, 22, 18, 14];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 176;
                                            f = f + c;
                                            f = f + (i - 136);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 46:
                            n = [224, 128, 224, 128, 224];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 0;
                                            f = f + c;
                                            f = f + (i + 48);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 47:
                            n = [9, 13, 11, 9, 9];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !==
                                    0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 0;
                                            f = f + c;
                                            f = f + (i + 48);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 48:
                            n = [56, 64, 88, 72, 56];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 16;
                                            f = f + c;
                                            f = f + (i + 40);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 53:
                            n = [1, 1, 1, 1, 1];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 16;
                                            f = f + c;
                                            f = f + (i + 40);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } n = [64, 64, 192, 64, 64];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i =
                                        0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 32;
                                            f = f + c;
                                            f = f + (i + 32);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 54:
                            n = [28, 16, 28, 16, 28];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 32;
                                            f = f + c;
                                            f = f + (i + 32);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 55:
                            n = [1, 1, 0, 1, 1];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 32;
                                            f = f + c;
                                            f = f + (i + 32);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } n = [64, 64, 128, 64, 64];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >>
                                                7 - i & 1) !== 0) {
                                            f = 48;
                                            f = f + c;
                                            f = f + (i + 24);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 56:
                            n = [12, 18, 18, 18, 12];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 48;
                                            f = f + c;
                                            f = f + (i + 24);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 57:
                            n = [96, 128, 128, 128, 96];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 64;
                                            f = f + c;
                                            f = f + (i + 16);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 58:
                            n = [14, 4, 4, 4, 4];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >>
                                                7 - i & 1) !== 0) {
                                            f = 64;
                                            f = f + c;
                                            f = f + (i + 16);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 68:
                            n = [127, 83, 93, 83, 93, 67, 127];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 80;
                                            f = f + c;
                                            f = f + (i + 8);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 76:
                            n = [48, 40, 40, 40, 48];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 96;
                                            f = f + c;
                                            f = f + i;
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 77:
                            n = [3, 2, 3, 2, 3];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >>
                                                7 - i & 1) !== 0) {
                                            f = 96;
                                            f = f + c;
                                            f = f + i;
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } n = [128, 0, 128, 0, 128];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 112;
                                            f = f + c;
                                            f = f + i;
                                            f = f - 8;
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 78:
                            n = [28, 32, 44, 36, 28];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 112;
                                            f = f + c;
                                            f = f + (i - 8);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 79:
                            n = [1, 1, 1, 1, 1];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 112;
                                            f = f + c;
                                            f = f + (i - 8);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } n = [192, 64, 192, 128, 64];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 128;
                                            f = f + c;
                                            f = f + (i - 16);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 80:
                            n = [8, 20, 20, 28, 20];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 128;
                                            f = f + c;
                                            f = f + (i - 16);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 81:
                            n = [1, 1, 1, 1, 1];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 128;
                                            f = f + c;
                                            f = f + (i -
                                                16);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } n = [128, 64, 64, 64, 128];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 144;
                                            f = f + c;
                                            f = f + (i - 24);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 87:
                            n = [4, 8, 30, 8, 4];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 144;
                                            f = f + c;
                                            f = f + (i - 24);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 89:
                            n = [32, 112, 168, 32, 0];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 160;
                                            f = f + c;
                                            f = f + (i - 32);
                                            j = k;
                                            h.context.fillRect(f,
                                                j + e, 1, 1)
                                        }
                                } break;
                        case 91:
                            n = [0, 0, 2, 1, 0];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 160;
                                            f = f + c;
                                            f = f + (i - 32);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } n = [0, 128, 160, 192, 128];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 176;
                                            f = f + c;
                                            f = f + (i - 40);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                } break;
                        case 93:
                            n = [4, 2, 15, 2, 4];
                            for (e = 0; e < n.length; e++)
                                if (n[e] !== 0) {
                                    l = n[e];
                                    for (i = 0; i < 8; i++)
                                        if ((l >> 7 - i & 1) !== 0) {
                                            f = 176;
                                            f = f + c;
                                            f = f + (i - 40);
                                            j = k;
                                            h.context.fillRect(f, j + e, 1, 1)
                                        }
                                }
                    }
            }
            g.ra =
                setTimeout(d, 0)
        };
        if (B) try {
            this.H.Lb()
        } catch (q) {
            this.t(q.message)
        }
        d()
    };
    TI30.prototype.resetEmulator = function () {
        var d = (new Date).getTime();
        return d > this.Ia + 3E3 ? (this.Ia = d, this.deleteKeyHistory(), clearTimeout(this.ra), this.O(), r) : t
    };
    TI30.prototype.hideCalculator = function () {
        var d = t,
            g;
        if (g = document.getElementById("calculatorDiv")) g.style.visibility = "hidden", window.getComputedStyle ? X = document.defaultView.getComputedStyle(g, s).getPropertyValue("z-index") : g.currentStyle && (X = g.currentStyle["z-index"]), g.style.zIndex = -1E3, W = d = r;
        return d
    };
    TI30.prototype.showCalculator = function () {
        var d = t,
            g;
        if (g = document.getElementById("calculatorDiv")) g.style.visibility = "visible", g.style.zIndex = X, d = r, W = t;
        return d
    };
    TI30.prototype.resize = function (d) {
        var g = t;
        if (this.scale !== o)
            if ("string" === typeof d)
                if (W === t) {
                    switch (d.toLowerCase()) {
                        case "small":
                            d = 0.75;
                            break;
                        case "medium":
                            d = 1;
                            break;
                        case "large":
                            d = 1.5;
                            break;
                        case "extra large":
                            d = 2;
                            break;
                        default:
                            return this.t("The calculator scale must be specified by its string name representation (small, medium, large or extra large)."), g
                    }
                    0 < d && (this.scale = d, d = document.getElementById("calculatorDiv"), d.style.width = this.Kb * this.scale + "px", d.style.height = this.Jb * this.scale + "px", g =
                        r)
                } else this.t("The calculator cannot be resized when it is hidden.");
        else this.t("The calculator scale must be specified by its string name representation (small, medium, large or extra large).");
        else this.t("The calculator cannot be resized while it is loading.");
        return g
    };
    TI30.prototype.enableAllKeys = function () {
        var d = r;
        try {
            this.H.enableAllKeys()
        } catch (g) {
            d = t, this.t(g.message)
        }
        return d
    };
    TI30.prototype.disableAllKeys = function () {
        var d = r;
        try {
            this.H.disableAllKeys()
        } catch (g) {
            d = t, this.t(g.message)
        }
        return d
    };
    TI30.prototype.disableKeys = function (d) {
        var g = r;
        if (d && "string" === typeof d) try {
            this.H.disableKeys(d)
        } catch (l) {
            g = t, this.t(l.message)
        } else g = t, this.t("You must provide a valid URL beginning with http:// or https://");
        return g
    };
    TI30.prototype.getKeyHistory = function () {
        return this.H.Cb()
    };
    TI30.prototype.hasBeenUsed = function () {
        var d = t;
        try {
            this.H !== o && (d = this.H.$, this.H.$ = t)
        } catch (g) {
            d = t, this.t("Cannot determine if the calculator has been used.")
        }
        return d
    };
    TI30.prototype.deleteKeyHistory = function () {
        var d = t;
        this.H !== o && (this.H.ab(), d = r);
        return d
    };
    TI30.prototype.killInstance = function () {
        if (!this.zb.killInstance()) return this.t("Unable to destroy the XXX ExamCalc instance.".replace("XXX", "TI-30XS")), this
    };

    function Y(d, g) {
        this.da = d;
        this.Ca = g
    }
    Y.prototype.wb = {
        TI84: r,
        TI83: r,
        TI30: r,
        TI108: r
    };
    Y.prototype.killInstance = function () {
        if ("undefined" !== typeof this.da && this.wb[this.Ca]) {
            var d = this.da,
                g = this.Ca;
            if ("TI84" === g || "TI83" === g) clearTimeout(repeaterTimer), d.G.Qb(), clearTimeout(d.G.H.Sb), clearTimeout(d.G.pa.Rb);
            else if ("TI30" === g || "TI108" === g) clearTimeout(d.ra), clearTimeout(d.G.Ha);
            d = this.Ca;
            if ("TI84" === d || "TI83" === d) actualConfigurationFile = faceplateForMobiles = faceplate = B = actualStateFile = TI84_RomImage = o;
            else if ("TI30" === d || "TI108" === d) B = C = o;
            Z(this, this.da, this.da);
            this.da = o;
            delete this.da;
            return r
        }
        return t
    };

    function Z(d, g, l) {
        if (g !== s) {
            var j, q, h = Object.keys(g);
            for (j = 0; j < h.length; j++) {
                q = g[h[j]];
                switch (Object.prototype.toString.call(q)) {
                    case "[object Object]":
                        q !== l && Z(d, q, g);
                        break;
                    case "[object Array]":
                        q.length = 0;
                        break;
                    case "[object HTMLDivElement]":
                        document.getElementById(q.id) && q.parentNode.removeChild(q)
                }
                g[h[j]] = o;
                delete g[h[j]]
            }
        }
    };
})();