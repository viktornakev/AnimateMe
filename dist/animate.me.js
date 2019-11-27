var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnimateMe = /** @class */ (function () {
        function AnimateMe(selector, options) {
            if (selector === void 0) { selector = '.animate-me'; }
            if (options === void 0) { options = {}; }
            this.win = window;
            this.winO = 0;
            this.winH = 0;
            this.winW = 0;
            this.offsets = [];
            this.options = {};
            this.animated = [];
            this.isTouchDevice = false;
            this.options = __assign({ offset: 0.5, reverse: true, animatedIn: 'animate-me--in', offsetAttr: 'data-offset', animationAttr: 'data-animation', touchDisabled: true }, options);
            this.animated = __spreadArrays(document.querySelectorAll(selector));
            // prettier-ignore
            this.isTouchDevice = 'ontouchstart' in this.win || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints > 0;
            if (this.options.offset && this.options.offset > 1) {
                this.options.offset = 1;
            }
            if (this.options.offset && this.options.offset < 0) {
                this.options.offset = 0;
            }
            this.getCurrentScroll();
            this.getWindowDimensions();
            this.scrollListener = this.scrollListener.bind(this);
            this.resizeListener = this.resizeListener.bind(this);
            this.start = this.start.bind(this);
            this.cleanup = this.cleanup.bind(this);
            this.destroy = this.destroy.bind(this);
            this.listen();
            this.start();
            return this;
        }
        AnimateMe.prototype.start = function () {
            this.updateOffsets();
            this.bind();
        };
        AnimateMe.prototype.listen = function () {
            this.win.addEventListener('animateme:enable', this.start, false);
            this.win.addEventListener('animateme:cleanup', this.cleanup, false);
            this.win.addEventListener('animateme:destroy', this.destroy, false);
        };
        AnimateMe.prototype.getCurrentScroll = function () {
            this.winO = this.win.pageYOffset;
        };
        AnimateMe.prototype.getWindowDimensions = function () {
            this.winH = this.win.innerHeight;
            this.winW = this.win.innerWidth;
        };
        AnimateMe.prototype.scrollListener = function () {
            this.getCurrentScroll();
            this.animate();
        };
        AnimateMe.prototype.resizeListener = function () {
            this.getWindowDimensions();
            this.updateOffsets();
        };
        AnimateMe.prototype.bind = function () {
            this.getCurrentScroll();
            this.updateOffsets();
            this.animate();
            this.win.addEventListener('scroll', this.scrollListener, false);
            this.win.addEventListener('resize', this.resizeListener, false);
        };
        AnimateMe.prototype.unbind = function () {
            this.win.removeEventListener('scroll', this.scrollListener, false);
            this.win.removeEventListener('resize', this.resizeListener, false);
        };
        AnimateMe.prototype.cleanup = function () {
            var _this = this;
            this.animated.forEach(function (element) { return element.classList.remove(_this.options.animatedIn); });
        };
        AnimateMe.prototype.destroy = function () {
            this.unbind();
            this.cleanup();
        };
        AnimateMe.prototype.animate = function () {
            var _a = this, winO = _a.winO, winH = _a.winH, offsets = _a.offsets, _b = _a.options, offset = _b.offset, reverse = _b.reverse, animatedIn = _b.animatedIn, touchDisabled = _b.touchDisabled, animationAttr = _b.animationAttr, animated = _a.animated, isTouchDevice = _a.isTouchDevice;
            animated.forEach(function (element, i) {
                var animationName = element.getAttribute(animationAttr) || '';
                if (touchDisabled && isTouchDevice) {
                    element.classList.add(animatedIn);
                }
                else {
                    var shouldAnimate = winO + winH * offset > offsets[i];
                    if (reverse) {
                        element.classList.toggle(animatedIn, shouldAnimate);
                        // prettier-ignore
                        animationName && element.classList.toggle(animationName, shouldAnimate);
                    }
                    else {
                        if (shouldAnimate) {
                            element.classList.add(animatedIn);
                            animationName && element.classList.add(animationName);
                        }
                    }
                }
            });
        };
        AnimateMe.prototype.updateOffsets = function () {
            var offsetAttr = this.options.offsetAttr;
            var pageYOffset = this.win.pageYOffset;
            this.offsets = this.animated.map(function (element) {
                var offsetDelay = parseFloat(element.getAttribute(offsetAttr)) || 0;
                var elementOffset = element.getBoundingClientRect().top + pageYOffset;
                return elementOffset + offsetDelay;
            });
        };
        return AnimateMe;
    }());
    exports.AnimateMe = AnimateMe;
    exports.default = AnimateMe;
});
