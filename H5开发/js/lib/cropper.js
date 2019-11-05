/*
 * Cropper.js v1.3.5
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2015-2018 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-04-15T06:20:44.574Z
 */
!function(B, A) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = A() : "function" == typeof define && define.amd ? define(A) : B.Cropper = A()
}(this, function() {
    var A3 = "undefined" != typeof window
      , A1 = A3 ? window : {}
      , Bd = "cropper"
      , A0 = "all"
      , As = "crop"
      , Ar = "move"
      , AI = "zoom"
      , Aw = "e"
      , Ay = "w"
      , AA = "s"
      , AJ = "n"
      , Az = "ne"
      , Ai = "nw"
      , Ah = "se"
      , Am = "sw"
      , AR = Bd + "-crop"
      , AX = Bd + "-disabled"
      , An = Bd + "-hidden"
      , A5 = Bd + "-hide"
      , A4 = Bd + "-modal"
      , AT = Bd + "-move"
      , A6 = Bd + "Action"
      , Bc = Bd + "Preview"
      , AS = "crop"
      , A8 = "move"
      , AY = "none"
      , Ba = "crop"
      , Bb = "cropend"
      , AV = "cropmove"
      , AW = "cropstart"
      , A7 = "dblclick"
      , AL = A1.PointerEvent ? "pointerdown" : "touchstart mousedown"
      , AM = A1.PointerEvent ? "pointermove" : "touchmove mousemove"
      , AB = A1.PointerEvent ? "pointerup pointercancel" : "touchend touchcancel mouseup"
      , AD = "ready"
      , AH = "resize"
      , AC = "wheel mousewheel DOMMouseScroll"
      , AE = "zoom"
      , Ax = /^(?:e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/
      , At = /^data:/
      , AZ = /^data:image\/jpeg;base64,/
      , Ao = /^(?:img|canvas)$/i
      , AU = {
        viewMode: 0,
        dragMode: AS,
        aspectRatio: NaN,
        data: null,
        preview: "",
        responsive: !0,
        restore: !0,
        checkCrossOrigin: !0,
        checkOrientation: !0,
        modal: !0,
        guides: !0,
        center: !0,
        highlight: !0,
        background: !0,
        autoCrop: !0,
        autoCropArea: 0.8,
        movable: !0,
        rotatable: !0,
        scalable: !0,
        zoomable: !0,
        zoomOnTouch: !0,
        zoomOnWheel: !0,
        wheelZoomRatio: 0.1,
        cropBoxMovable: !0,
        cropBoxResizable: !0,
        toggleDragModeOnDblclick: !0,
        minCanvasWidth: 0,
        minCanvasHeight: 0,
        minCropBoxWidth: 0,
        minCropBoxHeight: 0,
        minContainerWidth: 200,
        minContainerHeight: 100,
        ready: null,
        cropstart: null,
        cropmove: null,
        cropend: null,
        crop: null,
        zoom: null
    }
      , A2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(A) {
        return typeof A
    }
    : function(A) {
        return A && "function" == typeof Symbol && A.constructor === Symbol && A !== Symbol.prototype ? "symbol" : typeof A
    }
      , Aa = function(B, A) {
        if (!(B instanceof A)) {
            throw new TypeError("Cannot call a class as a function")
        }
    }
      , Ap = function() {
        function A(D, B) {
            for (var C = 0; C < B.length; C++) {
                var E = B[C];
                E.enumerable = E.enumerable || !1,
                E.configurable = !0,
                "value"in E && (E.writable = !0),
                Object.defineProperty(D, E.key, E)
            }
        }
        return function(D, B, C) {
            return B && A(D.prototype, B),
            C && A(D, C),
            D
        }
    }()
      , Bz = function(C) {
        if (Array.isArray(C)) {
            for (var A = 0, B = Array(C.length); A < C.length; A++) {
                B[A] = C[A]
            }
            return B
        }
        return Array.from(C)
    }
      , Be = Number.isNaN || A1.isNaN;
    function Af(A) {
        return "number" == typeof A && !Be(A)
    }
    function AF(A) {
        return void 0 === A
    }
    function Av(A) {
        return "object" === (void 0 === A ? "undefined" : A2(A)) && null !== A
    }
    var Aq = Object.prototype.hasOwnProperty;
    function AG(C) {
        if (!Av(C)) {
            return !1
        }
        try {
            var A = C.constructor
              , B = A.prototype;
            return A && B && Aq.call(B, "isPrototypeOf")
        } catch (C) {
            return !1
        }
    }
    function Au(A) {
        return "function" == typeof A
    }
    function Ak(A, B) {
        if (A && Au(B)) {
            if (Array.isArray(A) || Af(A.length)) {
                var C = A.length
                  , D = void 0;
                for (D = 0; D < C && !1 !== B.call(A, A[D], D, A); D += 1) {}
            } else {
                Av(A) && Object.keys(A).forEach(function(E) {
                    B.call(A, A[E], E, A)
                })
            }
        }
        return A
    }
    var Bp = Object.assign || function(B) {
        for (var C = arguments.length, A = Array(1 < C ? C - 1 : 0), D = 1; D < C; D++) {
            A[D - 1] = arguments[D]
        }
        return Av(B) && 0 < A.length && A.forEach(function(E) {
            Av(E) && Object.keys(E).forEach(function(F) {
                B[F] = E[F]
            })
        }),
        B
    }
      , Bu = /\.\d*(?:0|9){12}\d*$/i;
    function Bi(B) {
        var A = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 100000000000;
        return Bu.test(B) ? Math.round(B * A) / A : B
    }
    var BF = /^(?:width|height|left|top|marginLeft|marginTop)$/;
    function BB(C, A) {
        var B = C.style;
        Ak(A, function(E, D) {
            BF.test(D) && Af(E) && (E += "px"),
            B[D] = E
        })
    }
    function Bv(C, A) {
        if (A) {
            if (Af(C.length)) {
                Ak(C, function(D) {
                    Bv(D, A)
                })
            } else {
                if (C.classList) {
                    C.classList.add(A)
                } else {
                    var B = C.className.trim();
                    B ? B.indexOf(A) < 0 && (C.className = B + " " + A) : C.className = A
                }
            }
        }
    }
    function Bw(B, A) {
        A && (Af(B.length) ? Ak(B, function(C) {
            Bw(C, A)
        }) : B.classList ? B.classList.remove(A) : 0 <= B.className.indexOf(A) && (B.className = B.className.replace(A, "")))
    }
    function Bs(C, A, B) {
        A && (Af(C.length) ? Ak(C, function(D) {
            Bs(D, A, B)
        }) : B ? Bv(C, A) : Bw(C, A))
    }
    var Bk = /([a-z\d])([A-Z])/g;
    function Bl(A) {
        return A.replace(Bk, "$1-$2").toLowerCase()
    }
    function BA(B, A) {
        return Av(B[A]) ? B[A] : B.dataset ? B.dataset[A] : B.getAttribute("data-" + Bl(A))
    }
    function BE(C, A, B) {
        Av(B) ? C[A] = B : C.dataset ? C.dataset[A] = B : C.setAttribute("data-" + Bl(A), B)
    }
    function Bx(A, B) {
        if (Av(A[B])) {
            try {
                delete A[B]
            } catch (C) {
                A[B] = void 0
            }
        } else {
            if (A.dataset) {
                try {
                    delete A.dataset[B]
                } catch (C) {
                    A.dataset[B] = void 0
                }
            } else {
                A.removeAttribute("data-" + Bl(B))
            }
        }
    }
    var Bm = /\s\s*/
      , By = function() {
        var C = !1;
        if (A3) {
            var A = !1
              , B = function() {}
              , D = Object.defineProperty({}, "once", {
                get: function() {
                    return C = !0,
                    A
                },
                set: function(E) {
                    A = E
                }
            });
            A1.addEventListener("test", B, D),
            A1.removeEventListener("test", B, D)
        }
        return C
    }();
    function BD(A, D, E) {
        var B = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {}
          , C = E;
        D.trim().split(Bm).forEach(function(G) {
            if (!By) {
                var F = A.listeners;
                F && F[G] && F[G][E] && (C = F[G][E],
                delete F[G][E],
                0 === Object.keys(F[G]).length && delete F[G],
                0 === Object.keys(F).length && delete A.listeners)
            }
            A.removeEventListener(G, C, B)
        })
    }
    function Bq(D, E, A) {
        var B = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {}
          , C = A;
        E.trim().split(Bm).forEach(function(H) {
            if (B.once && !By) {
                var G = D.listeners
                  , F = void 0 === G ? {} : G;
                C = function() {
                    for (var K = arguments.length, I = Array(K), J = 0; J < K; J++) {
                        I[J] = arguments[J]
                    }
                    delete F[H][A],
                    D.removeEventListener(H, C, B),
                    A.apply(D, I)
                }
                ,
                F[H] || (F[H] = {}),
                F[H][A] && D.removeEventListener(H, F[H][A], B),
                F[H][A] = C,
                D.listeners = F
            }
            D.addEventListener(H, C, B)
        })
    }
    function BC(C, A, B) {
        var D = void 0;
        return Au(Event) && Au(CustomEvent) ? D = new CustomEvent(A,{
            detail: B,
            bubbles: !0,
            cancelable: !0
        }) : (D = document.createEvent("CustomEvent")).initCustomEvent(A, !0, !0, B),
        C.dispatchEvent(D)
    }
    function Bn(B) {
        var A = B.getBoundingClientRect();
        return {
            left: A.left + (window.pageXOffset - document.documentElement.clientLeft),
            top: A.top + (window.pageYOffset - document.documentElement.clientTop)
        }
    }
    var Bo = A1.location
      , Bj = /^(https?:)\/\/([^:/?#]+):?(\d*)/i;
    function AO(B) {
        var A = B.match(Bj);
        return A && (A[1] !== Bo.protocol || A[2] !== Bo.hostname || A[3] !== Bo.port)
    }
    function AQ(B) {
        var A = "timestamp=" + (new Date).getTime();
        return B + (-1 === B.indexOf("?") ? "?" : "&") + A
    }
    function Bf(C) {
        var E = C.rotate
          , A = C.scaleX
          , H = C.scaleY
          , F = C.translateX
          , G = C.translateY
          , D = [];
        Af(F) && 0 !== F && D.push("translateX(" + F + "px)"),
        Af(G) && 0 !== G && D.push("translateY(" + G + "px)"),
        Af(E) && 0 !== E && D.push("rotate(" + E + "deg)"),
        Af(A) && 1 !== A && D.push("scaleX(" + A + ")"),
        Af(H) && 1 !== H && D.push("scaleY(" + H + ")");
        var B = D.length ? D.join(" ") : "none";
        return {
            WebkitTransform: B,
            msTransform: B,
            transform: B
        }
    }
    function AP(D, A) {
        var B = D.pageX
          , E = D.pageY
          , C = {
            endX: B,
            endY: E
        };
        return A ? C : Bp({
            startX: B,
            startY: E
        }, C)
    }
    var Br = Number.isFinite || A1.isFinite;
    function Al(F) {
        var B = F.aspectRatio
          , C = F.height
          , G = F.width
          , D = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "contain"
          , E = function(H) {
            return Br(H) && 0 < H
        };
        if (E(G) && E(C)) {
            var A = C * B;
            "contain" === D && G < A || "cover" === D && A < G ? C = G / B : G = C * B
        } else {
            E(G) ? C = G / B : E(C) && (G = C * B)
        }
        return {
            width: G,
            height: C
        }
    }
    var AK = String.fromCharCode;
    var Bg = /^data:.*,/;
    function Ac(E) {
        var G = new DataView(E)
          , A = void 0
          , M = void 0
          , H = void 0
          , I = void 0;
        if (255 === G.getUint8(0) && 216 === G.getUint8(1)) {
            for (var F = G.byteLength, D = 2; D < F; ) {
                if (255 === G.getUint8(D) && 225 === G.getUint8(D + 1)) {
                    H = D;
                    break
                }
                D += 1
            }
        }
        if (H) {
            var B = H + 10;
            if ("Exif" === function(R, O, P) {
                var S = ""
                  , Q = void 0;
                for (P += O,
                Q = O; Q < P; Q += 1) {
                    S += AK(R.getUint8(Q))
                }
                return S
            }(G, H + 4, 4)) {
                var L = G.getUint16(B);
                if (((M = 18761 === L) || 19789 === L) && 42 === G.getUint16(B + 2, M)) {
                    var N = G.getUint32(B + 4, M);
                    8 <= N && (I = B + N)
                }
            }
        }
        if (I) {
            var J = G.getUint16(I, M)
              , C = void 0
              , K = void 0;
            for (K = 0; K < J; K += 1) {
                if (C = I + 12 * K + 2,
                274 === G.getUint16(C, M)) {
                    C += 8,
                    A = G.getUint16(C, M),
                    G.setUint16(C, 1, M);
                    break
                }
            }
        }
        return A
    }
    var A9 = {
        render: function() {
            this.initContainer(),
            this.initCanvas(),
            this.initCropBox(),
            this.renderCanvas(),
            this.cropped && this.renderCropBox()
        },
        initContainer: function() {
            var D = this.element
              , A = this.options
              , B = this.container
              , E = this.cropper;
            Bv(E, An),
            Bw(D, An);
            var C = {
                width: Math.max(B.offsetWidth, Number(A.minContainerWidth) || 200),
                height: Math.max(B.offsetHeight, Number(A.minContainerHeight) || 100)
            };
            BB(E, {
                width: (this.containerData = C).width,
                height: C.height
            }),
            Bv(D, An),
            Bw(E, An)
        },
        initCanvas: function() {
            var D = this.containerData
              , F = this.imageData
              , A = this.options.viewMode
              , J = Math.abs(F.rotate) % 180 == 90
              , G = J ? F.naturalHeight : F.naturalWidth
              , H = J ? F.naturalWidth : F.naturalHeight
              , E = G / H
              , C = D.width
              , B = D.height;
            D.height * E > D.width ? 3 === A ? C = D.height * E : B = D.width / E : 3 === A ? B = D.width / E : C = D.height * E;
            var I = {
                aspectRatio: E,
                naturalWidth: G,
                naturalHeight: H,
                width: C,
                height: B
            };
            I.left = (D.width - C) / 2,
            I.top = (D.height - B) / 2,
            I.oldLeft = I.left,
            I.oldTop = I.top,
            this.canvasData = I,
            this.limited = 1 === A || 2 === A,
            this.limitCanvas(!0, !0),
            this.initialImageData = Bp({}, F),
            this.initialCanvasData = Bp({}, I)
        },
        limitCanvas: function(E, G) {
            var A = this.options
              , M = this.containerData
              , H = this.canvasData
              , I = this.cropBoxData
              , F = A.viewMode
              , D = H.aspectRatio
              , B = this.cropped && I;
            if (E) {
                var L = Number(A.minCanvasWidth) || 0
                  , N = Number(A.minCanvasHeight) || 0;
                1 < F ? (L = Math.max(L, M.width),
                N = Math.max(N, M.height),
                3 === F && (L < N * D ? L = N * D : N = L / D)) : 0 < F && (L ? L = Math.max(L, B ? I.width : 0) : N ? N = Math.max(N, B ? I.height : 0) : B && ((L = I.width) < (N = I.height) * D ? L = N * D : N = L / D));
                var J = Al({
                    aspectRatio: D,
                    width: L,
                    height: N
                });
                L = J.width,
                N = J.height,
                H.minWidth = L,
                H.minHeight = N,
                H.maxWidth = 1 / 0,
                H.maxHeight = 1 / 0
            }
            if (G) {
                if (F) {
                    var C = M.width - H.width
                      , K = M.height - H.height;
                    H.minLeft = Math.min(0, C),
                    H.minTop = Math.min(0, K),
                    H.maxLeft = Math.max(0, C),
                    H.maxTop = Math.max(0, K),
                    B && this.limited && (H.minLeft = Math.min(I.left, I.left + (I.width - H.width)),
                    H.minTop = Math.min(I.top, I.top + (I.height - H.height)),
                    H.maxLeft = I.left,
                    H.maxTop = I.top,
                    2 === F && (H.width >= M.width && (H.minLeft = Math.min(0, C),
                    H.maxLeft = Math.max(0, C)),
                    H.height >= M.height && (H.minTop = Math.min(0, K),
                    H.maxTop = Math.max(0, K))))
                } else {
                    H.minLeft = -H.width,
                    H.minTop = -H.height,
                    H.maxLeft = M.width,
                    H.maxTop = M.height
                }
            }
        },
        renderCanvas: function(D, F) {
            var A = this.canvasData
              , I = this.imageData;
            if (F) {
                var G = function(M) {
                    var O = M.width
                      , J = M.height
                      , R = M.degree;
                    if (90 == (R = Math.abs(R) % 180)) {
                        return {
                            width: J,
                            height: O
                        }
                    }
                    var P = R % 90 * Math.PI / 180
                      , Q = Math.sin(P)
                      , N = Math.cos(P)
                      , L = O * N + J * Q
                      , K = O * Q + J * N;
                    return 90 < R ? {
                        width: K,
                        height: L
                    } : {
                        width: L,
                        height: K
                    }
                }({
                    width: I.naturalWidth * Math.abs(I.scaleX || 1),
                    height: I.naturalHeight * Math.abs(I.scaleY || 1),
                    degree: I.rotate || 0
                })
                  , H = G.width
                  , E = G.height
                  , C = A.width * (H / A.naturalWidth)
                  , B = A.height * (E / A.naturalHeight);
                A.left -= (C - A.width) / 2,
                A.top -= (B - A.height) / 2,
                A.width = C,
                A.height = B,
                A.aspectRatio = H / E,
                A.naturalWidth = H,
                A.naturalHeight = E,
                this.limitCanvas(!0, !1)
            }
            (A.width > A.maxWidth || A.width < A.minWidth) && (A.left = A.oldLeft),
            (A.height > A.maxHeight || A.height < A.minHeight) && (A.top = A.oldTop),
            A.width = Math.min(Math.max(A.width, A.minWidth), A.maxWidth),
            A.height = Math.min(Math.max(A.height, A.minHeight), A.maxHeight),
            this.limitCanvas(!1, !0),
            A.left = Math.min(Math.max(A.left, A.minLeft), A.maxLeft),
            A.top = Math.min(Math.max(A.top, A.minTop), A.maxTop),
            A.oldLeft = A.left,
            A.oldTop = A.top,
            BB(this.canvas, Bp({
                width: A.width,
                height: A.height
            }, Bf({
                translateX: A.left,
                translateY: A.top
            }))),
            this.renderImage(D),
            this.cropped && this.limited && this.limitCropBox(!0, !0)
        },
        renderImage: function(D) {
            var A = this.canvasData
              , B = this.imageData
              , E = B.naturalWidth * (A.width / A.naturalWidth)
              , C = B.naturalHeight * (A.height / A.naturalHeight);
            Bp(B, {
                width: E,
                height: C,
                left: (A.width - E) / 2,
                top: (A.height - C) / 2
            }),
            BB(this.image, Bp({
                width: B.width,
                height: B.height
            }, Bf(Bp({
                translateX: B.left,
                translateY: B.top
            }, B)))),
            D && this.output()
        },
        initCropBox: function() {
            var D = this.options
              , A = this.canvasData
              , B = D.aspectRatio
              , E = Number(D.autoCropArea) || 0.8
              , C = {
                width: A.width,
                height: A.height
            };
            B && (A.height * B > A.width ? C.height = C.width / B : C.width = C.height * B),
            this.cropBoxData = C,
            this.limitCropBox(!0, !0),
            C.width = Math.min(Math.max(C.width, C.minWidth), C.maxWidth),
            C.height = Math.min(Math.max(C.height, C.minHeight), C.maxHeight),
            C.width = Math.max(C.minWidth, C.width * E),
            C.height = Math.max(C.minHeight, C.height * E),
            C.left = A.left + (A.width - C.width) / 2,
            C.top = A.top + (A.height - C.height) / 2,
            C.oldLeft = C.left,
            C.oldTop = C.top,
            this.initialCropBoxData = Bp({}, C)
        },
        limitCropBox: function(D, F) {
            var A = this.options
              , K = this.containerData
              , G = this.canvasData
              , H = this.cropBoxData
              , E = this.limited
              , C = A.aspectRatio;
            if (D) {
                var B = Number(A.minCropBoxWidth) || 0
                  , J = Number(A.minCropBoxHeight) || 0
                  , L = Math.min(K.width, E ? G.width : K.width)
                  , I = Math.min(K.height, E ? G.height : K.height);
                B = Math.min(B, K.width),
                J = Math.min(J, K.height),
                C && (B && J ? B < J * C ? J = B / C : B = J * C : B ? J = B / C : J && (B = J * C),
                L < I * C ? I = L / C : L = I * C),
                H.minWidth = Math.min(B, L),
                H.minHeight = Math.min(J, I),
                H.maxWidth = L,
                H.maxHeight = I
            }
            F && (E ? (H.minLeft = Math.max(0, G.left),
            H.minTop = Math.max(0, G.top),
            H.maxLeft = Math.min(K.width, G.left + G.width) - H.width,
            H.maxTop = Math.min(K.height, G.top + G.height) - H.height) : (H.minLeft = 0,
            H.minTop = 0,
            H.maxLeft = K.width - H.width,
            H.maxTop = K.height - H.height))
        },
        renderCropBox: function() {
            var C = this.options
              , A = this.containerData
              , B = this.cropBoxData;
            (B.width > B.maxWidth || B.width < B.minWidth) && (B.left = B.oldLeft),
            (B.height > B.maxHeight || B.height < B.minHeight) && (B.top = B.oldTop),
            B.width = Math.min(Math.max(B.width, B.minWidth), B.maxWidth),
            B.height = Math.min(Math.max(B.height, B.minHeight), B.maxHeight),
            this.limitCropBox(!1, !0),
            B.left = Math.min(Math.max(B.left, B.minLeft), B.maxLeft),
            B.top = Math.min(Math.max(B.top, B.minTop), B.maxTop),
            B.oldLeft = B.left,
            B.oldTop = B.top,
            C.movable && C.cropBoxMovable && BE(this.face, A6, B.width >= A.width && B.height >= A.height ? Ar : A0),
            BB(this.cropBox, Bp({
                width: B.width,
                height: B.height
            }, Bf({
                translateX: B.left,
                translateY: B.top
            }))),
            this.cropped && this.limited && this.limitCanvas(!0, !0),
            this.disabled || this.output()
        },
        output: function() {
            this.preview(),
            BC(this.element, Ba, this.getData())
        }
    }
      , AN = {
        initPreview: function() {
            var B = this.crossOrigin
              , D = this.options.preview
              , E = B ? this.crossOriginUrl : this.url
              , A = document.createElement("img");
            if (B && (A.crossOrigin = B),
            A.src = E,
            this.viewBox.appendChild(A),
            this.viewBoxImage = A,
            D) {
                var C = D;
                "string" == typeof D ? C = this.element.ownerDocument.querySelectorAll(D) : D.querySelector && (C = [D]),
                Ak(this.previews = C, function(G) {
                    var F = document.createElement("img");
                    BE(G, Bc, {
                        width: G.offsetWidth,
                        height: G.offsetHeight,
                        html: G.innerHTML
                    }),
                    B && (F.crossOrigin = B),
                    F.src = E,
                    F.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"',
                    G.innerHTML = "",
                    G.appendChild(F)
                })
            }
        },
        resetPreview: function() {
            Ak(this.previews, function(B) {
                var A = BA(B, Bc);
                BB(B, {
                    width: A.width,
                    height: A.height
                }),
                B.innerHTML = A.html,
                Bx(B, Bc)
            })
        },
        preview: function() {
            var A = this.imageData
              , D = this.canvasData
              , E = this.cropBoxData
              , B = E.width
              , H = E.height
              , I = A.width
              , F = A.height
              , C = E.left - D.left - A.left
              , G = E.top - D.top - A.top;
            this.cropped && !this.disabled && (BB(this.viewBoxImage, Bp({
                width: I,
                height: F
            }, Bf(Bp({
                translateX: -C,
                translateY: -G
            }, A)))),
            Ak(this.previews, function(O) {
                var K = BA(O, Bc)
                  , L = K.width
                  , P = K.height
                  , M = L
                  , N = P
                  , J = 1;
                B && (N = H * (J = L / B)),
                H && P < N && (M = B * (J = P / H),
                N = P),
                BB(O, {
                    width: M,
                    height: N
                }),
                BB(O.getElementsByTagName("img")[0], Bp({
                    width: I * J,
                    height: F * J
                }, Bf(Bp({
                    translateX: -C * J,
                    translateY: -G * J
                }, A))))
            }))
        }
    }
      , Bh = {
        bind: function() {
            var C = this.element
              , A = this.options
              , B = this.cropper;
            Au(A.cropstart) && Bq(C, AW, A.cropstart),
            Au(A.cropmove) && Bq(C, AV, A.cropmove),
            Au(A.cropend) && Bq(C, Bb, A.cropend),
            Au(A.crop) && Bq(C, Ba, A.crop),
            Au(A.zoom) && Bq(C, AE, A.zoom),
            Bq(B, AL, this.onCropStart = this.cropStart.bind(this)),
            A.zoomable && A.zoomOnWheel && Bq(B, AC, this.onWheel = this.wheel.bind(this)),
            A.toggleDragModeOnDblclick && Bq(B, A7, this.onDblclick = this.dblclick.bind(this)),
            Bq(C.ownerDocument, AM, this.onCropMove = this.cropMove.bind(this)),
            Bq(C.ownerDocument, AB, this.onCropEnd = this.cropEnd.bind(this)),
            A.responsive && Bq(window, AH, this.onResize = this.resize.bind(this))
        },
        unbind: function() {
            var C = this.element
              , A = this.options
              , B = this.cropper;
            Au(A.cropstart) && BD(C, AW, A.cropstart),
            Au(A.cropmove) && BD(C, AV, A.cropmove),
            Au(A.cropend) && BD(C, Bb, A.cropend),
            Au(A.crop) && BD(C, Ba, A.crop),
            Au(A.zoom) && BD(C, AE, A.zoom),
            BD(B, AL, this.onCropStart),
            A.zoomable && A.zoomOnWheel && BD(B, AC, this.onWheel),
            A.toggleDragModeOnDblclick && BD(B, A7, this.onDblclick),
            BD(C.ownerDocument, AM, this.onCropMove),
            BD(C.ownerDocument, AB, this.onCropEnd),
            A.responsive && BD(window, AH, this.onResize)
        }
    }
      , Ad = {
        resize: function() {
            var C = this.options
              , E = this.container
              , A = this.containerData
              , H = Number(C.minContainerWidth) || 200
              , F = Number(C.minContainerHeight) || 100;
            if (!(this.disabled || A.width <= H || A.height <= F)) {
                var G = E.offsetWidth / A.width;
                if (1 !== G || E.offsetHeight !== A.height) {
                    var D = void 0
                      , B = void 0;
                    C.restore && (D = this.getCanvasData(),
                    B = this.getCropBoxData()),
                    this.render(),
                    C.restore && (this.setCanvasData(Ak(D, function(J, I) {
                        D[I] = J * G
                    })),
                    this.setCropBoxData(Ak(B, function(J, I) {
                        B[I] = J * G
                    })))
                }
            }
        },
        dblclick: function() {
            var B, A;
            this.disabled || this.options.dragMode === AY || this.setDragMode((B = this.dragBox,
            A = AR,
            (B.classList ? B.classList.contains(A) : -1 < B.className.indexOf(A)) ? A8 : AS))
        },
        wheel: function(C) {
            var A = this
              , B = Number(this.options.wheelZoomRatio) || 0.1
              , D = 1;
            this.disabled || (C.preventDefault(),
            this.wheeling || (this.wheeling = !0,
            setTimeout(function() {
                A.wheeling = !1
            }, 50),
            C.deltaY ? D = 0 < C.deltaY ? 1 : -1 : C.wheelDelta ? D = -C.wheelDelta / 120 : C.detail && (D = 0 < C.detail ? 1 : -1),
            this.zoom(-D * B, C)))
        },
        cropStart: function(C) {
            if (!this.disabled) {
                var A = this.options
                  , B = this.pointers
                  , D = void 0;
                C.changedTouches ? Ak(C.changedTouches, function(E) {
                    B[E.identifier] = AP(E)
                }) : B[C.pointerId || 0] = AP(C),
                D = 1 < Object.keys(B).length && A.zoomable && A.zoomOnTouch ? AI : BA(C.target, A6),
                Ax.test(D) && !1 !== BC(this.element, AW, {
                    originalEvent: C,
                    action: D
                }) && (C.preventDefault(),
                this.action = D,
                this.cropping = !1,
                D === As && (this.cropping = !0,
                Bv(this.dragBox, A4)))
            }
        },
        cropMove: function(C) {
            var A = this.action;
            if (!this.disabled && A) {
                var B = this.pointers;
                C.preventDefault(),
                !1 !== BC(this.element, AV, {
                    originalEvent: C,
                    action: A
                }) && (C.changedTouches ? Ak(C.changedTouches, function(D) {
                    Bp(B[D.identifier], AP(D, !0))
                }) : Bp(B[C.pointerId || 0], AP(C, !0)),
                this.change(C))
            }
        },
        cropEnd: function(C) {
            if (!this.disabled) {
                var A = this.action
                  , B = this.pointers;
                C.changedTouches ? Ak(C.changedTouches, function(D) {
                    delete B[D.identifier]
                }) : delete B[C.pointerId || 0],
                A && (C.preventDefault(),
                Object.keys(B).length || (this.action = ""),
                this.cropping && (this.cropping = !1,
                Bs(this.dragBox, A4, this.cropped && this.options.modal)),
                BC(this.element, Bb, {
                    originalEvent: C,
                    action: A
                }))
            }
        }
    }
      , Ae = {
        change: function(I) {
            var L = this.options
              , X = this.canvasData
              , T = this.containerData
              , N = this.cropBoxData
              , O = this.pointers
              , K = this.action
              , A = L.aspectRatio
              , E = N.left
              , S = N.top
              , W = N.width
              , P = N.height
              , F = E + W
              , Q = S + P
              , V = 0
              , J = 0
              , U = T.width
              , G = T.height
              , H = !0
              , R = void 0;
            !A && I.shiftKey && (A = W && P ? W / P : 1),
            this.limited && (V = N.minLeft,
            J = N.minTop,
            U = V + Math.min(T.width, X.width, X.left + X.width),
            G = J + Math.min(T.height, X.height, X.top + X.height));
            var q, z, Y, j = O[Object.keys(O)[0]], k = {
                x: j.endX - j.startX,
                y: j.endY - j.startY
            }, Z = function(B) {
                switch (B) {
                case Aw:
                    F + k.x > U && (k.x = U - F);
                    break;
                case Ay:
                    E + k.x < V && (k.x = V - E);
                    break;
                case AJ:
                    S + k.y < J && (k.y = J - S);
                    break;
                case AA:
                    Q + k.y > G && (k.y = G - Q)
                }
            };
            switch (K) {
            case A0:
                E += k.x,
                S += k.y;
                break;
            case Aw:
                if (0 <= k.x && (U <= F || A && (S <= J || G <= Q))) {
                    H = !1;
                    break
                }
                Z(Aw),
                W += k.x,
                A && (P = W / A,
                S -= k.x / A / 2),
                W < 0 && (K = Ay,
                W = 0);
                break;
            case AJ:
                if (k.y <= 0 && (S <= J || A && (E <= V || U <= F))) {
                    H = !1;
                    break
                }
                Z(AJ),
                P -= k.y,
                S += k.y,
                A && (W = P * A,
                E += k.y * A / 2),
                P < 0 && (K = AA,
                P = 0);
                break;
            case Ay:
                if (k.x <= 0 && (E <= V || A && (S <= J || G <= Q))) {
                    H = !1;
                    break
                }
                Z(Ay),
                W -= k.x,
                E += k.x,
                A && (P = W / A,
                S += k.x / A / 2),
                W < 0 && (K = Aw,
                W = 0);
                break;
            case AA:
                if (0 <= k.y && (G <= Q || A && (E <= V || U <= F))) {
                    H = !1;
                    break
                }
                Z(AA),
                P += k.y,
                A && (W = P * A,
                E -= k.y * A / 2),
                P < 0 && (K = AJ,
                P = 0);
                break;
            case Az:
                if (A) {
                    if (k.y <= 0 && (S <= J || U <= F)) {
                        H = !1;
                        break
                    }
                    Z(AJ),
                    P -= k.y,
                    S += k.y,
                    W = P * A
                } else {
                    Z(AJ),
                    Z(Aw),
                    0 <= k.x ? F < U ? W += k.x : k.y <= 0 && S <= J && (H = !1) : W += k.x,
                    k.y <= 0 ? J < S && (P -= k.y,
                    S += k.y) : (P -= k.y,
                    S += k.y)
                }
                W < 0 && P < 0 ? (K = Am,
                W = P = 0) : W < 0 ? (K = Ai,
                W = 0) : P < 0 && (K = Ah,
                P = 0);
                break;
            case Ai:
                if (A) {
                    if (k.y <= 0 && (S <= J || E <= V)) {
                        H = !1;
                        break
                    }
                    Z(AJ),
                    P -= k.y,
                    S += k.y,
                    W = P * A,
                    E += k.y * A
                } else {
                    Z(AJ),
                    Z(Ay),
                    k.x <= 0 ? V < E ? (W -= k.x,
                    E += k.x) : k.y <= 0 && S <= J && (H = !1) : (W -= k.x,
                    E += k.x),
                    k.y <= 0 ? J < S && (P -= k.y,
                    S += k.y) : (P -= k.y,
                    S += k.y)
                }
                W < 0 && P < 0 ? (K = Ah,
                W = P = 0) : W < 0 ? (K = Az,
                W = 0) : P < 0 && (K = Am,
                P = 0);
                break;
            case Am:
                if (A) {
                    if (k.x <= 0 && (E <= V || G <= Q)) {
                        H = !1;
                        break
                    }
                    Z(Ay),
                    W -= k.x,
                    E += k.x,
                    P = W / A
                } else {
                    Z(AA),
                    Z(Ay),
                    k.x <= 0 ? V < E ? (W -= k.x,
                    E += k.x) : 0 <= k.y && G <= Q && (H = !1) : (W -= k.x,
                    E += k.x),
                    0 <= k.y ? Q < G && (P += k.y) : P += k.y
                }
                W < 0 && P < 0 ? (K = Az,
                W = P = 0) : W < 0 ? (K = Ah,
                W = 0) : P < 0 && (K = Ai,
                P = 0);
                break;
            case Ah:
                if (A) {
                    if (0 <= k.x && (U <= F || G <= Q)) {
                        H = !1;
                        break
                    }
                    Z(Aw),
                    P = (W += k.x) / A
                } else {
                    Z(AA),
                    Z(Aw),
                    0 <= k.x ? F < U ? W += k.x : 0 <= k.y && G <= Q && (H = !1) : W += k.x,
                    0 <= k.y ? Q < G && (P += k.y) : P += k.y
                }
                W < 0 && P < 0 ? (K = Ai,
                W = P = 0) : W < 0 ? (K = Am,
                W = 0) : P < 0 && (K = Az,
                P = 0);
                break;
            case Ar:
                this.move(k.x, k.y),
                H = !1;
                break;
            case AI:
                this.zoom((z = Bp({}, q = O),
                Y = [],
                Ak(q, function(B, C) {
                    delete z[C],
                    Ak(z, function(f) {
                        var M = Math.abs(B.startX - f.startX)
                          , b = Math.abs(B.startY - f.startY)
                          , g = Math.abs(B.endX - f.endX)
                          , c = Math.abs(B.endY - f.endY)
                          , d = Math.sqrt(M * M + b * b)
                          , D = (Math.sqrt(g * g + c * c) - d) / d;
                        Y.push(D)
                    })
                }),
                Y.sort(function(C, B) {
                    return Math.abs(C) < Math.abs(B)
                }),
                Y[0]), I),
                H = !1;
                break;
            case As:
                if (!k.x || !k.y) {
                    H = !1;
                    break
                }
                R = Bn(this.cropper),
                E = j.startX - R.left,
                S = j.startY - R.top,
                W = N.minWidth,
                P = N.minHeight,
                0 < k.x ? K = 0 < k.y ? Ah : Az : k.x < 0 && (E -= W,
                K = 0 < k.y ? Am : Ai),
                k.y < 0 && (S -= P),
                this.cropped || (Bw(this.cropBox, An),
                this.cropped = !0,
                this.limited && this.limitCropBox(!0, !0))
            }
            H && (N.width = W,
            N.height = P,
            N.left = E,
            N.top = S,
            this.action = K,
            this.renderCropBox()),
            Ak(O, function(B) {
                B.startX = B.endX,
                B.startY = B.endY
            })
        }
    }
      , Aj = {
        crop: function() {
            return !this.ready || this.cropped || this.disabled || (this.cropped = !0,
            this.limitCropBox(!0, !0),
            this.options.modal && Bv(this.dragBox, A4),
            Bw(this.cropBox, An),
            this.setCropBoxData(this.initialCropBoxData)),
            this
        },
        reset: function() {
            return this.ready && !this.disabled && (this.imageData = Bp({}, this.initialImageData),
            this.canvasData = Bp({}, this.initialCanvasData),
            this.cropBoxData = Bp({}, this.initialCropBoxData),
            this.renderCanvas(),
            this.cropped && this.renderCropBox()),
            this
        },
        clear: function() {
            return this.cropped && !this.disabled && (Bp(this.cropBoxData, {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }),
            this.cropped = !1,
            this.renderCropBox(),
            this.limitCanvas(!0, !0),
            this.renderCanvas(),
            Bw(this.dragBox, A4),
            Bv(this.cropBox, An)),
            this
        },
        replace: function(A) {
            var B = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
            return !this.disabled && A && (this.isImg && (this.element.src = A),
            B ? (this.url = A,
            this.image.src = A,
            this.ready && (this.viewBoxImage.src = A,
            Ak(this.previews, function(C) {
                C.getElementsByTagName("img")[0].src = A
            }))) : (this.isImg && (this.replaced = !0),
            this.options.data = null,
            this.uncreate(),
            this.load(A))),
            this
        },
        enable: function() {
            return this.ready && this.disabled && (this.disabled = !1,
            Bw(this.cropper, AX)),
            this
        },
        disable: function() {
            return this.ready && !this.disabled && (this.disabled = !0,
            Bv(this.cropper, AX)),
            this
        },
        destroy: function() {
            var A = this.element;
            return BA(A, Bd) && (this.isImg && this.replaced && (A.src = this.originalUrl),
            this.uncreate(),
            Bx(A, Bd)),
            this
        },
        move: function(D) {
            var A = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : D
              , B = this.canvasData
              , E = B.left
              , C = B.top;
            return this.moveTo(AF(D) ? D : E + Number(D), AF(A) ? A : C + Number(A))
        },
        moveTo: function(C) {
            var A = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : C
              , B = this.canvasData
              , D = !1;
            return C = Number(C),
            A = Number(A),
            this.ready && !this.disabled && this.options.movable && (Af(C) && (B.left = C,
            D = !0),
            Af(A) && (B.top = A,
            D = !0),
            D && this.renderCanvas(!0)),
            this
        },
        zoom: function(C, A) {
            var B = this.canvasData;
            return C = (C = Number(C)) < 0 ? 1 / (1 - C) : 1 + C,
            this.zoomTo(B.width * C / B.naturalWidth, null, A)
        },
        zoomTo: function(D, G, Q) {
            var M, H, I, F = this.options, A = this.canvasData, B = A.width, L = A.height, P = A.naturalWidth, J = A.naturalHeight;
            if (0 <= (D = Number(D)) && this.ready && !this.disabled && F.zoomable) {
                var C = P * D
                  , K = J * D;
                if (!1 === BC(this.element, AE, {
                    originalEvent: Q,
                    oldRatio: B / P,
                    ratio: C / P
                })) {
                    return this
                }
                if (Q) {
                    var O = this.pointers
                      , E = Bn(this.cropper)
                      , N = O && Object.keys(O).length ? (I = H = M = 0,
                    Ak(O, function(T) {
                        var R = T.startX
                          , S = T.startY;
                        M += R,
                        H += S,
                        I += 1
                    }),
                    {
                        pageX: M /= I,
                        pageY: H /= I
                    }) : {
                        pageX: Q.pageX,
                        pageY: Q.pageY
                    };
                    A.left -= (C - B) * ((N.pageX - E.left - A.left) / B),
                    A.top -= (K - L) * ((N.pageY - E.top - A.top) / L)
                } else {
                    AG(G) && Af(G.x) && Af(G.y) ? (A.left -= (C - B) * ((G.x - A.left) / B),
                    A.top -= (K - L) * ((G.y - A.top) / L)) : (A.left -= (C - B) / 2,
                    A.top -= (K - L) / 2)
                }
                A.width = C,
                A.height = K,
                this.renderCanvas(!0)
            }
            return this
        },
        rotate: function(A) {
            return this.rotateTo((this.imageData.rotate || 0) + Number(A))
        },
        rotateTo: function(A) {
            return Af(A = Number(A)) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = A % 360,
            this.renderCanvas(!0, !0)),
            this
        },
        scaleX: function(B) {
            var A = this.imageData.scaleY;
            return this.scale(B, Af(A) ? A : 1)
        },
        scaleY: function(B) {
            var A = this.imageData.scaleX;
            return this.scale(Af(A) ? A : 1, B)
        },
        scale: function(C) {
            var A = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : C
              , B = this.imageData
              , D = !1;
            return C = Number(C),
            A = Number(A),
            this.ready && !this.disabled && this.options.scalable && (Af(C) && (B.scaleX = C,
            D = !0),
            Af(A) && (B.scaleY = A,
            D = !0),
            D && this.renderCanvas(!0, !0)),
            this
        },
        getData: function() {
            var C = 0 < arguments.length && void 0 !== arguments[0] && arguments[0]
              , F = this.options
              , B = this.imageData
              , G = this.canvasData
              , D = this.cropBoxData
              , E = void 0;
            if (this.ready && this.cropped) {
                E = {
                    x: D.left - G.left,
                    y: D.top - G.top,
                    width: D.width,
                    height: D.height
                };
                var A = B.width / B.naturalWidth;
                Ak(E, function(I, H) {
                    I /= A,
                    E[H] = C ? Math.round(I) : I
                })
            } else {
                E = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
            return F.rotatable && (E.rotate = B.rotate || 0),
            F.scalable && (E.scaleX = B.scaleX || 1,
            E.scaleY = B.scaleY || 1),
            E
        },
        setData: function(F) {
            var B = this.options
              , C = this.imageData
              , G = this.canvasData
              , D = {};
            if (this.ready && !this.disabled && AG(F)) {
                var E = !1;
                B.rotatable && Af(F.rotate) && F.rotate !== C.rotate && (C.rotate = F.rotate,
                E = !0),
                B.scalable && (Af(F.scaleX) && F.scaleX !== C.scaleX && (C.scaleX = F.scaleX,
                E = !0),
                Af(F.scaleY) && F.scaleY !== C.scaleY && (C.scaleY = F.scaleY,
                E = !0)),
                E && this.renderCanvas(!0, !0);
                var A = C.width / C.naturalWidth;
                Af(F.x) && (D.left = F.x * A + G.left),
                Af(F.y) && (D.top = F.y * A + G.top),
                Af(F.width) && (D.width = F.width * A),
                Af(F.height) && (D.height = F.height * A),
                this.setCropBoxData(D)
            }
            return this
        },
        getContainerData: function() {
            return this.ready ? Bp({}, this.containerData) : {}
        },
        getImageData: function() {
            return this.sized ? Bp({}, this.imageData) : {}
        },
        getCanvasData: function() {
            var A = this.canvasData
              , B = {};
            return this.ready && Ak(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(C) {
                B[C] = A[C]
            }),
            B
        },
        setCanvasData: function(C) {
            var A = this.canvasData
              , B = A.aspectRatio;
            return this.ready && !this.disabled && AG(C) && (Af(C.left) && (A.left = C.left),
            Af(C.top) && (A.top = C.top),
            Af(C.width) ? (A.width = C.width,
            A.height = C.width / B) : Af(C.height) && (A.height = C.height,
            A.width = C.height * B),
            this.renderCanvas(!0)),
            this
        },
        getCropBoxData: function() {
            var B = this.cropBoxData
              , A = void 0;
            return this.ready && this.cropped && (A = {
                left: B.left,
                top: B.top,
                width: B.width,
                height: B.height
            }),
            A || {}
        },
        setCropBoxData: function(D) {
            var A = this.cropBoxData
              , B = this.options.aspectRatio
              , E = void 0
              , C = void 0;
            return this.ready && this.cropped && !this.disabled && AG(D) && (Af(D.left) && (A.left = D.left),
            Af(D.top) && (A.top = D.top),
            Af(D.width) && D.width !== A.width && (E = !0,
            A.width = D.width),
            Af(D.height) && D.height !== A.height && (C = !0,
            A.height = D.height),
            B && (E ? A.height = A.width / B : C && (A.width = A.height * B)),
            this.renderCropBox()),
            this
        },
        getCroppedCanvas: function() {
            var CA = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            if (!this.ready || !window.HTMLCanvasElement) {
                return null
            }
            var CF, Bt, CM, CG, CH, CE, Cu, Cv, CL, CP, CI, Cw, CJ, CO, CB, CN, Cy, Cz, CK, Cs, Ct, Cj, Cl, Cp, Ck, CD, Ca, B9, Cq, Ce, Cg, Ci, Cr, Ch, B2, B1, B4, B5, Cm, Cf, Cb, CC = this.canvasData, B6 = (CF = this.image,
            Bt = this.imageData,
            CM = CC,
            CG = CA,
            CH = Bt.aspectRatio,
            CE = Bt.naturalWidth,
            Cu = Bt.naturalHeight,
            Cv = Bt.rotate,
            CL = void 0 === Cv ? 0 : Cv,
            CP = Bt.scaleX,
            CI = void 0 === CP ? 1 : CP,
            Cw = Bt.scaleY,
            CJ = void 0 === Cw ? 1 : Cw,
            CO = CM.aspectRatio,
            CB = CM.naturalWidth,
            CN = CM.naturalHeight,
            Cy = CG.fillColor,
            Cz = void 0 === Cy ? "transparent" : Cy,
            CK = CG.imageSmoothingEnabled,
            Cs = void 0 === CK || CK,
            Ct = CG.imageSmoothingQuality,
            Cj = void 0 === Ct ? "low" : Ct,
            Cl = CG.maxWidth,
            Cp = void 0 === Cl ? 1 / 0 : Cl,
            Ck = CG.maxHeight,
            CD = void 0 === Ck ? 1 / 0 : Ck,
            Ca = CG.minWidth,
            B9 = void 0 === Ca ? 0 : Ca,
            Cq = CG.minHeight,
            Ce = void 0 === Cq ? 0 : Cq,
            Cg = document.createElement("canvas"),
            Ci = Cg.getContext("2d"),
            Cr = Al({
                aspectRatio: CO,
                width: Cp,
                height: CD
            }),
            Ch = Al({
                aspectRatio: CO,
                width: B9,
                height: Ce
            }, "cover"),
            B2 = Math.min(Cr.width, Math.max(Ch.width, CB)),
            B1 = Math.min(Cr.height, Math.max(Ch.height, CN)),
            B4 = Al({
                aspectRatio: CH,
                width: Cp,
                height: CD
            }),
            B5 = Al({
                aspectRatio: CH,
                width: B9,
                height: Ce
            }, "cover"),
            Cm = Math.min(B4.width, Math.max(B5.width, CE)),
            Cf = Math.min(B4.height, Math.max(B5.height, Cu)),
            Cb = [-Cm / 2, -Cf / 2, Cm, Cf],
            Cg.width = Bi(B2),
            Cg.height = Bi(B1),
            Ci.fillStyle = Cz,
            Ci.fillRect(0, 0, B2, B1),
            Ci.save(),
            Ci.translate(B2 / 2, B1 / 2),
            Ci.rotate(CL * Math.PI / 180),
            Ci.scale(CI, CJ),
            Ci.imageSmoothingEnabled = Cs,
            Ci.imageSmoothingQuality = Cj,
            Ci.drawImage.apply(Ci, [CF].concat(Bz(Cb.map(function(A) {
                return Math.floor(Bi(A))
            })))),
            Ci.restore(),
            Cg);
            if (!this.cropped) {
                return B6
            }
            var Cx = this.getData()
              , BR = Cx.x
              , B7 = Cx.y
              , B0 = Cx.width
              , Cn = Cx.height
              , Cd = B6.width / Math.floor(CC.naturalWidth);
            1 !== Cd && (BR *= Cd,
            B7 *= Cd,
            B0 *= Cd,
            Cn *= Cd);
            var B8 = B0 / Cn
              , Co = Al({
                aspectRatio: B8,
                width: CA.maxWidth || 1 / 0,
                height: CA.maxHeight || 1 / 0
            })
              , Cc = Al({
                aspectRatio: B8,
                width: CA.minWidth || 0,
                height: CA.minHeight || 0
            }, "cover")
              , B3 = Al({
                aspectRatio: B8,
                width: CA.width || (1 !== Cd ? B6.width : B0),
                height: CA.height || (1 !== Cd ? B6.height : Cn)
            })
              , BL = B3.width
              , BO = B3.height;
            BL = Math.min(Co.width, Math.max(Cc.width, BL)),
            BO = Math.min(Co.height, Math.max(Cc.height, BO));
            var BZ = document.createElement("canvas")
              , BV = BZ.getContext("2d");
            BZ.width = Bi(BL),
            BZ.height = Bi(BO),
            BV.fillStyle = CA.fillColor || "transparent",
            BV.fillRect(0, 0, BL, BO);
            var BP = CA.imageSmoothingEnabled
              , BQ = void 0 === BP || BP
              , BN = CA.imageSmoothingQuality;
            BV.imageSmoothingEnabled = BQ,
            BN && (BV.imageSmoothingQuality = BN);
            var BG = B6.width
              , BH = B6.height
              , BU = BR
              , BY = B7
              , BT = void 0
              , BI = void 0
              , BS = void 0
              , BX = void 0
              , BM = void 0
              , BW = void 0;
            BU <= -B0 || BG < BU ? BM = BS = BT = BU = 0 : BU <= 0 ? (BS = -BU,
            BU = 0,
            BM = BT = Math.min(BG, B0 + BU)) : BU <= BG && (BS = 0,
            BM = BT = Math.min(B0, BG - BU)),
            BT <= 0 || BY <= -Cn || BH < BY ? BW = BX = BI = BY = 0 : BY <= 0 ? (BX = -BY,
            BY = 0,
            BW = BI = Math.min(BH, Cn + BY)) : BY <= BH && (BX = 0,
            BW = BI = Math.min(Cn, BH - BY));
            var BJ = [BU, BY, BT, BI];
            if (0 < BM && 0 < BW) {
                var BK = BL / B0;
                BJ.push(BS * BK, BX * BK, BM * BK, BW * BK)
            }
            return BV.drawImage.apply(BV, [B6].concat(Bz(BJ.map(function(A) {
                return Math.floor(Bi(A))
            })))),
            BZ
        },
        setAspectRatio: function(B) {
            var A = this.options;
            return this.disabled || AF(B) || (A.aspectRatio = Math.max(0, B) || NaN,
            this.ready && (this.initCropBox(),
            this.cropped && this.renderCropBox())),
            this
        },
        setDragMode: function(E) {
            var A = this.options
              , B = this.dragBox
              , F = this.face;
            if (this.ready && !this.disabled) {
                var C = E === AS
                  , D = A.movable && E === A8;
                E = C || D ? E : AY,
                A.dragMode = E,
                BE(B, A6, E),
                Bs(B, AR, C),
                Bs(B, AT, D),
                A.cropBoxMovable || (BE(F, A6, E),
                Bs(F, AR, C),
                Bs(F, AT, D))
            }
            return this
        }
    }
      , Ag = A1.Cropper
      , Ab = function() {
        function A(C) {
            var B = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            if (Aa(this, A),
            !C || !Ao.test(C.tagName)) {
                throw new Error("The first argument is required and must be an <img> or <canvas> element.")
            }
            this.element = C,
            this.options = Bp({}, AU, AG(B) && B),
            this.cropped = !1,
            this.disabled = !1,
            this.pointers = {},
            this.ready = !1,
            this.reloading = !1,
            this.replaced = !1,
            this.sized = !1,
            this.sizing = !1,
            this.init()
        }
        return Ap(A, [{
            key: "init",
            value: function() {
                var D = this.element
                  , B = D.tagName.toLowerCase()
                  , C = void 0;
                if (!BA(D, Bd)) {
                    if (BE(D, Bd, this),
                    "img" === B) {
                        if (this.isImg = !0,
                        C = D.getAttribute("src") || "",
                        !(this.originalUrl = C)) {
                            return
                        }
                        C = D.src
                    } else {
                        "canvas" === B && window.HTMLCanvasElement && (C = D.toDataURL())
                    }
                    this.load(C)
                }
            }
        }, {
            key: "load",
            value: function(E) {
                var G = this;
                if (E) {
                    this.url = E,
                    this.imageData = {};
                    var B = this.element
                      , K = this.options;
                    if (K.checkOrientation && window.ArrayBuffer) {
                        if (At.test(E)) {
                            AZ.test(E) ? this.read((H = E.replace(Bg, ""),
                            I = atob(H),
                            F = new ArrayBuffer(I.length),
                            Ak(D = new Uint8Array(F), function(M, L) {
                                D[L] = I.charCodeAt(L)
                            }),
                            F)) : this.clone()
                        } else {
                            var H, I, F, D, C = new XMLHttpRequest;
                            this.reloading = !0,
                            this.xhr = C;
                            var J = function() {
                                G.reloading = !1,
                                G.xhr = null
                            };
                            C.ontimeout = J,
                            C.onabort = J,
                            C.onerror = function() {
                                J(),
                                G.clone()
                            }
                            ,
                            C.onload = function() {
                                J(),
                                G.read(C.response)
                            }
                            ,
                            K.checkCrossOrigin && AO(E) && B.crossOrigin && (E = AQ(E)),
                            C.open("get", E),
                            C.responseType = "arraybuffer",
                            C.withCredentials = "use-credentials" === B.crossOrigin,
                            C.send()
                        }
                    } else {
                        this.clone()
                    }
                }
            }
        }, {
            key: "read",
            value: function(E) {
                var G, B, K, H = this.options, I = this.imageData, F = Ac(E), D = 0, C = 1, J = 1;
                if (1 < F) {
                    this.url = (G = "image/jpeg",
                    B = new Uint8Array(E),
                    K = "",
                    Ak(B, function(M) {
                        K += AK(M)
                    }),
                    "data:" + G + ";base64," + btoa(K));
                    var L = function(O) {
                        var M = 0
                          , N = 1
                          , P = 1;
                        switch (O) {
                        case 2:
                            N = -1;
                            break;
                        case 3:
                            M = -180;
                            break;
                        case 4:
                            P = -1;
                            break;
                        case 5:
                            M = 90,
                            P = -1;
                            break;
                        case 6:
                            M = 90;
                            break;
                        case 7:
                            M = 90,
                            N = -1;
                            break;
                        case 8:
                            M = -90
                        }
                        return {
                            rotate: M,
                            scaleX: N,
                            scaleY: P
                        }
                    }(F);
                    D = L.rotate,
                    C = L.scaleX,
                    J = L.scaleY
                }
                H.rotatable && (I.rotate = D),
                H.scalable && (I.scaleX = C,
                I.scaleY = J),
                this.clone()
            }
        }, {
            key: "clone",
            value: function() {
                var E = this.element
                  , B = this.url
                  , C = void 0
                  , F = void 0;
                this.options.checkCrossOrigin && AO(B) && ((C = E.crossOrigin) ? F = B : (C = "anonymous",
                F = AQ(B))),
                this.crossOrigin = C,
                this.crossOriginUrl = F;
                var D = document.createElement("img");
                C && (D.crossOrigin = C),
                D.src = F || B,
                (this.image = D).onload = this.start.bind(this),
                D.onerror = this.stop.bind(this),
                Bv(D, A5),
                E.parentNode.insertBefore(D, E.nextSibling)
            }
        }, {
            key: "start",
            value: function() {
                var C = this
                  , F = this.isImg ? this.element : this.image;
                F.onload = null,
                F.onerror = null,
                this.sizing = !0;
                var B = A1.navigator && /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(A1.navigator.userAgent)
                  , G = function(I, H) {
                    Bp(C.imageData, {
                        naturalWidth: I,
                        naturalHeight: H,
                        aspectRatio: I / H
                    }),
                    C.sizing = !1,
                    C.sized = !0,
                    C.build()
                };
                if (!F.naturalWidth || B) {
                    var D = document.createElement("img")
                      , E = document.body || document.documentElement;
                    (this.sizingImage = D).onload = function() {
                        G(D.width, D.height),
                        B || E.removeChild(D)
                    }
                    ,
                    D.src = F.src,
                    B || (D.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",
                    E.appendChild(D))
                } else {
                    G(F.naturalWidth, F.naturalHeight)
                }
            }
        }, {
            key: "stop",
            value: function() {
                var B = this.image;
                B.onload = null,
                B.onerror = null,
                B.parentNode.removeChild(B),
                this.image = null
            }
        }, {
            key: "build",
            value: function() {
                if (this.sized && !this.ready) {
                    var E = this.element
                      , G = this.options
                      , B = this.image
                      , K = E.parentNode
                      , H = document.createElement("div");
                    H.innerHTML = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>';
                    var I = H.querySelector("." + Bd + "-container")
                      , F = I.querySelector("." + Bd + "-canvas")
                      , D = I.querySelector("." + Bd + "-drag-box")
                      , C = I.querySelector("." + Bd + "-crop-box")
                      , J = C.querySelector("." + Bd + "-face");
                    this.container = K,
                    this.cropper = I,
                    this.canvas = F,
                    this.dragBox = D,
                    this.cropBox = C,
                    this.viewBox = I.querySelector("." + Bd + "-view-box"),
                    this.face = J,
                    F.appendChild(B),
                    Bv(E, An),
                    K.insertBefore(I, E.nextSibling),
                    this.isImg || Bw(B, A5),
                    this.initPreview(),
                    this.bind(),
                    G.aspectRatio = Math.max(0, G.aspectRatio) || NaN,
                    G.viewMode = Math.max(0, Math.min(3, Math.round(G.viewMode))) || 0,
                    Bv(C, An),
                    G.guides || Bv(C.getElementsByClassName(Bd + "-dashed"), An),
                    G.center || Bv(C.getElementsByClassName(Bd + "-center"), An),
                    G.background && Bv(I, Bd + "-bg"),
                    G.highlight || Bv(J, "cropper-invisible"),
                    G.cropBoxMovable && (Bv(J, AT),
                    BE(J, A6, A0)),
                    G.cropBoxResizable || (Bv(C.getElementsByClassName(Bd + "-line"), An),
                    Bv(C.getElementsByClassName(Bd + "-point"), An)),
                    this.render(),
                    this.ready = !0,
                    this.setDragMode(G.dragMode),
                    G.autoCrop && this.crop(),
                    this.setData(G.data),
                    Au(G.ready) && Bq(E, AD, G.ready, {
                        once: !0
                    }),
                    BC(E, AD)
                }
            }
        }, {
            key: "unbuild",
            value: function() {
                this.ready && (this.ready = !1,
                this.unbind(),
                this.resetPreview(),
                this.cropper.parentNode.removeChild(this.cropper),
                Bw(this.element, An))
            }
        }, {
            key: "uncreate",
            value: function() {
                this.ready ? (this.unbuild(),
                this.ready = !1,
                this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null,
                this.sizing = !1,
                this.sized = !1) : this.reloading ? this.xhr.abort() : this.image && this.stop()
            }
        }], [{
            key: "noConflict",
            value: function() {
                return window.Cropper = Ag,
                A
            }
        }, {
            key: "setDefaults",
            value: function(B) {
                Bp(AU, AG(B) && B)
            }
        }]),
        A
    }();
    return Bp(Ab.prototype, A9, AN, Bh, Ad, Ae, Aj),
    Ab
});
