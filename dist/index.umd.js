(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue-cropperjs'), require('cropperjs/dist/cropper.css')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue-cropperjs', 'cropperjs/dist/cropper.css'], factory) :
    (global = global || self, factory(global['vue-media-library'] = {}, global.Cropper));
}(this, (function (exports, Cropper) { 'use strict';

    Cropper = Cropper && Object.prototype.hasOwnProperty.call(Cropper, 'default') ? Cropper['default'] : Cropper;

    //
    //
    //
    //
    //
    //
    //

    var script = {
        name: "ButtonFilePicker",
        props: {
            accept: {
                type: String,
                required: true,
            }
        },
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        var options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        var hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                var originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                var existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    var isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
        return function (id, style) { return addStyle(id, style); };
    }
    var HEAD;
    var styles = {};
    function addStyle(id, css) {
        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
        if (!style.ids.has(id)) {
            style.ids.add(id);
            var code = css.source;
            if (css.map) {
                // https://developer.chrome.com/devtools/docs/javascript-debugging
                // this makes source maps inside style tags work properly in Chrome
                code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
                // http://stackoverflow.com/a/26603875
                code +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                        ' */';
            }
            if (!style.element) {
                style.element = document.createElement('style');
                style.element.type = 'text/css';
                if (css.media)
                    { style.element.setAttribute('media', css.media); }
                if (HEAD === undefined) {
                    HEAD = document.head || document.getElementsByTagName('head')[0];
                }
                HEAD.appendChild(style.element);
            }
            if ('styleSheet' in style.element) {
                style.styles.push(code);
                style.element.styleSheet.cssText = style.styles
                    .filter(Boolean)
                    .join('\n');
            }
            else {
                var index = style.ids.size - 1;
                var textNode = document.createTextNode(code);
                var nodes = style.element.childNodes;
                if (nodes[index])
                    { style.element.removeChild(nodes[index]); }
                if (nodes.length)
                    { style.element.insertBefore(textNode, nodes[index]); }
                else
                    { style.element.appendChild(textNode); }
            }
        }
    }

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        [
          _c(
            "b-button",
            {
              attrs: { variant: "primary" },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.$refs.input.click()
                }
              }
            },
            [_vm._v("Select a file")]
          ),
          _vm._v(" "),
          _c("input", {
            ref: "input",
            attrs: { type: "file", accept: _vm.accept },
            on: {
              change: function() {
                _vm.$emit("change", _vm.$refs.input.files);
              }
            }
          })
        ],
        1
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      var __vue_inject_styles__ = function (inject) {
        if (!inject) { return }
        inject("data-v-251ed780_0", { source: "\ninput[data-v-251ed780] {\r\n    display: none;\n}\r\n", map: {"version":3,"sources":["C:\\Software\\Laravel\\vue-media-library\\src\\components\\FilePicker\\ButtonFilePicker.vue"],"names":[],"mappings":";AAoBA;IACA,aAAA;AACA","file":"ButtonFilePicker.vue","sourcesContent":["<template>\r\n    <div>\r\n        <b-button variant=\"primary\" @click.prevent=\"$refs.input.click()\">Select a file</b-button>\r\n        <input ref=\"input\" type=\"file\" :accept=\"accept\" @change=\"() => {$emit('change', $refs.input.files)}\"/>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    name: \"ButtonFilePicker\",\r\n    props: {\r\n        accept: {\r\n            type: String,\r\n            required: true,\r\n        }\r\n    },\r\n}\r\n</script>\r\n\r\n<style scoped>\r\ninput {\r\n    display: none;\r\n}\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__ = "data-v-251ed780";
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        createInjector,
        undefined,
        undefined
      );

    //
    //
    //
    //
    //
    //
    //

    var script$1 = {
        name: "DragFilePicker",
        props: {
            accept: {
                type: String,
                required: true,
            }
        },
    };

    /* script */
    var __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", [
        _c(
          "p",
          {
            on: {
              click: function($event) {
                return _vm.$refs.input.click()
              }
            }
          },
          [_vm._v("Drag your files here or click in this area.")]
        ),
        _vm._v(" "),
        _c("input", {
          ref: "input",
          attrs: { type: "file", accept: _vm.accept },
          on: {
            change: function() {
              _vm.$emit("change", _vm.$refs.input.files);
            }
          }
        })
      ])
    };
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

      /* style */
      var __vue_inject_styles__$1 = function (inject) {
        if (!inject) { return }
        inject("data-v-6327c3a4_0", { source: "\np[data-v-6327c3a4]{\n    width: 100%;\n    height: 100%;\n    text-align: center;\n    font-size: 2em;\n    line-height: 170px;\n    background-color: #cecece;\n    border: 3px dashed gray;\n    color: #4a4a4a;\n    cursor: pointer;\n}\np[data-v-6327c3a4]:hover{\n    color: #242424;\n}\ninput[data-v-6327c3a4]{\n    display: none;\n}\n", map: {"version":3,"sources":["C:\\Software\\Laravel\\vue-media-library\\src\\components\\FilePicker\\DragFilePicker.vue"],"names":[],"mappings":";AAoBA;IACA,WAAA;IACA,YAAA;IACA,kBAAA;IACA,cAAA;IACA,kBAAA;IACA,yBAAA;IACA,uBAAA;IACA,cAAA;IACA,eAAA;AACA;AACA;IACA,cAAA;AACA;AACA;IACA,aAAA;AACA","file":"DragFilePicker.vue","sourcesContent":["<template>\r\n    <div>\r\n        <p @click=\"$refs.input.click()\">Drag your files here or click in this area.</p>\r\n        <input ref=\"input\" type=\"file\" :accept=\"accept\" @change=\"() => {$emit('change', $refs.input.files)}\">\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    export default {\r\n        name: \"DragFilePicker\",\r\n        props: {\r\n            accept: {\r\n                type: String,\r\n                required: true,\r\n            }\r\n        },\r\n    }\r\n</script>\r\n\r\n<style scoped>\r\n    p{\r\n        width: 100%;\r\n        height: 100%;\r\n        text-align: center;\r\n        font-size: 2em;\r\n        line-height: 170px;\r\n        background-color: #cecece;\r\n        border: 3px dashed gray;\r\n        color: #4a4a4a;\r\n        cursor: pointer;\r\n    }\r\n    p:hover{\r\n        color: #242424;\r\n    }\r\n    input{\r\n        display: none;\r\n    }\r\n</style>"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$1 = "data-v-6327c3a4";
      /* module identifier */
      var __vue_module_identifier__$1 = undefined;
      /* functional template */
      var __vue_is_functional_template__$1 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$2 = {
        name: "FilePicker",
        components: {ButtonFilePicker: __vue_component__, DragFilePicker: __vue_component__$1},
        props: {
            accept: {
                type: Array,
                required: true,
            },
            mode: {
                type: String,
                default: 'button',
            },
        },
        methods: {
            /**
             * @param {FileList} files
             * @returns void
             */
            onChange: function onChange(files) {
                var file = this.filter(files[0]);
                if (!file) {
                    this.$emit('error:wrong_files', {files: files});
                    return;
                }

                this.$emit('selected', file);
            },

            /**
             * @param {File} file
             * @returns {File|null}
             */
            filter: function filter(file) {
                return this.accept.indexOf(file.type) >= 0 || this.accept.indexOf('*') >= 0 ? file : null;
            }
        },
        computed: {
            acceptFiles: function acceptFiles() {
                return this.accept.join(',');
            }
        }
    };

    /* script */
    var __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$2 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        [
          _vm._t("default", null, {
            change: _vm.onChange,
            accept: _vm.acceptFiles
          }),
          _vm._v(" "),
          !_vm.$scopedSlots["default"]
            ? _c(_vm.mode + "-file-picker", {
                tag: "component",
                attrs: { accept: _vm.acceptFiles },
                on: { change: _vm.onChange }
              })
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "mt-1" }, [_vm._t("help")], 2)
        ],
        2
      )
    };
    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;

      /* style */
      var __vue_inject_styles__$2 = function (inject) {
        if (!inject) { return }
        inject("data-v-68d79c66_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$2 = "data-v-68d79c66";
      /* module identifier */
      var __vue_module_identifier__$2 = undefined;
      /* functional template */
      var __vue_is_functional_template__$2 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
        __vue_inject_styles__$2,
        __vue_script__$2,
        __vue_scope_id__$2,
        __vue_is_functional_template__$2,
        __vue_module_identifier__$2,
        false,
        createInjector,
        undefined,
        undefined
      );

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$3 = {
        name: "Modal",
        props: {
            modalId: {
                type: String,
                default: function default$1(){
                    return Math.random().toString(36).substring(3);
                }
            },
            size: {
                type: String,
            },
            okTitle: {
                type: String
            }
        },
        methods: {
            show: function show(){
                this.$bvModal.show(this.modalId);
            },
            hide: function hide(){
                this.$bvModal.hide(this.modalId);
            },
        },
    };

    /* script */
    var __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$3 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "b-modal",
        {
          attrs: {
            id: _vm.modalId,
            size: _vm.size,
            static: true,
            lazy: true,
            "ok-title": _vm.okTitle
          },
          on: {
            ok: function(args) {
              _vm.$emit("ok", args);
            }
          }
        },
        [_vm._t("default")],
        2
      )
    };
    var __vue_staticRenderFns__$3 = [];
    __vue_render__$3._withStripped = true;

      /* style */
      var __vue_inject_styles__$3 = function (inject) {
        if (!inject) { return }
        inject("data-v-06b6de43_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Modal.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$3 = "data-v-06b6de43";
      /* module identifier */
      var __vue_module_identifier__$3 = undefined;
      /* functional template */
      var __vue_is_functional_template__$3 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
        __vue_inject_styles__$3,
        __vue_script__$3,
        __vue_scope_id__$3,
        __vue_is_functional_template__$3,
        __vue_module_identifier__$3,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$4 = {
        name: "ImageCropper",
        components: {Cropper: Cropper},
        props: {
            image: {
                type: String,
                required: true,
            },
            options: {
                type: Object,
                default: function () {
                    return {};
                },
            },
        },
        data: function data(){
            return {}
        },
        methods: {
            /**
             * @param {BlobCallback} callback
             * @param {string?} type
             * @param {number?} quality
             */
            getResult: function getResult(callback, type, quality){
                this.$refs.cropper.getCroppedCanvas(this.options).toBlob(callback, type, quality);
            },
        },
        computed: {
            slotBindings: function slotBindings(){
                var this$1 = this;

                return {
                    reset: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).reset.apply(ref, args);
                },
                    clear: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).clear.apply(ref, args);
                },
                    initCrop: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).initCrop.apply(ref, args);
                },
                    replace: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).replace.apply(ref, args);
                },
                    enable: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).enable.apply(ref, args);
                },
                    disable: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).disable.apply(ref, args);
                },
                    destroy: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).destroy.apply(ref, args);
                },
                    move: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).move.apply(ref, args);
                },
                    moveTo: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).moveTo.apply(ref, args);
                },
                    relativeZoom: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).relativeZoom.apply(ref, args);
                },
                    zoomTo: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).zoomTo.apply(ref, args);
                },
                    rotate: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).rotate.apply(ref, args);
                },
                    rotateTo: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).rotateTo.apply(ref, args);
                },
                    scaleX: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).scaleX.apply(ref, args);
                },
                    scaleY: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).scaleY.apply(ref, args);
                },
                    scale: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).scale.apply(ref, args);
                },
                    getData: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).getData.apply(ref, args);
                },
                    setData: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).setData.apply(ref, args);
                },
                    getContainerData: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).getContainerData.apply(ref, args);
                },
                    getImageData: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).getImageData.apply(ref, args);
                },
                    getCanvasData: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).getCanvasData.apply(ref, args);
                },
                    setCanvasData: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).setCanvasData.apply(ref, args);
                },
                    getCropBoxData: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).getCropBoxData.apply(ref, args);
                },
                    setCropBoxData: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).setCropBoxData.apply(ref, args);
                },
                    setAspectRatio: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).setAspectRatio.apply(ref, args);
                },
                    setDragMode: function () {
                        var ref;

                        var args = [], len = arguments.length;
                        while ( len-- ) args[ len ] = arguments[ len ];
                        return (ref = this$1.$refs.cropper).setDragMode.apply(ref, args);
                },
                };
            },
        },
    };

    /* script */
    var __vue_script__$4 = script$4;

    /* template */
    var __vue_render__$4 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        [
          _c(
            "cropper",
            _vm._b(
              {
                ref: "cropper",
                attrs: { src: _vm.image, "container-style": { maxHeight: "70vh" } }
              },
              "cropper",
              _vm.options,
              false
            )
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "mt-3" },
            [_vm._t("default", null, null, _vm.slotBindings)],
            2
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$4 = [];
    __vue_render__$4._withStripped = true;

      /* style */
      var __vue_inject_styles__$4 = function (inject) {
        if (!inject) { return }
        inject("data-v-121d39c4_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ImageCropper.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$4 = "data-v-121d39c4";
      /* module identifier */
      var __vue_module_identifier__$4 = undefined;
      /* functional template */
      var __vue_is_functional_template__$4 = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
        __vue_inject_styles__$4,
        __vue_script__$4,
        __vue_scope_id__$4,
        __vue_is_functional_template__$4,
        __vue_module_identifier__$4,
        false,
        createInjector,
        undefined,
        undefined
      );

    var isDownloadable = {
        props: {
            downloadable: {
                type: Boolean,
                default: false
            },
        }
    };

    var isEditable = {
        props: {
            editable: {
                type: Boolean,
                default: false
            },
        }
    };

    var isViewable = {
        props: {
            viewable: {
                type: Boolean,
                default: false
            },
        }
    };

    var usesPortal = {
        props: {
            usePortal: {
                type: Boolean,
                default: false,
            },
            portalTarget: {
                type: String,
                default: 'modals',
            },
        }
    };

    var usesProgress = {
        methods: {
            shouldShowProgress: function shouldShowProgress(uploadingMedia, item) {
                return this.getUploadingItem(uploadingMedia, item) !== undefined;
            },
            getProgressValue: function getProgressValue(uploadingMedia, item) {
                var uploadingItem = this.getUploadingItem(uploadingMedia, item);
                return uploadingItem ? uploadingItem.progress : null;
            },
            getUploadingItem: function getUploadingItem(uploadingMedia, item) {
                return uploadingMedia.filter(function (i) { return i.media.v_id === item.v_id; })[0];
            },
        },
    };

    //
    //
    //
    //
    //
    //

    var script$5 = {};

    /* script */
    var __vue_script__$5 = script$5;

    /* template */
    var __vue_render__$5 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "svg",
        {
          staticClass: "fill-current",
          attrs: {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "24",
            height: "24"
          }
        },
        [_vm._t("default")],
        2
      )
    };
    var __vue_staticRenderFns__$5 = [];
    __vue_render__$5._withStripped = true;

      /* style */
      var __vue_inject_styles__$5 = undefined;
      /* scoped */
      var __vue_scope_id__$5 = undefined;
      /* module identifier */
      var __vue_module_identifier__$5 = undefined;
      /* functional template */
      var __vue_is_functional_template__$5 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
        __vue_inject_styles__$5,
        __vue_script__$5,
        __vue_scope_id__$5,
        __vue_is_functional_template__$5,
        __vue_module_identifier__$5,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$6 = {
        components: {Icon: __vue_component__$5}
    };

    /* script */
    var __vue_script__$6 = script$6;

    /* template */
    var __vue_render__$6 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("Icon", [
        _c("path", {
          attrs: {
            d:
              "M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"
          }
        })
      ])
    };
    var __vue_staticRenderFns__$6 = [];
    __vue_render__$6._withStripped = true;

      /* style */
      var __vue_inject_styles__$6 = undefined;
      /* scoped */
      var __vue_scope_id__$6 = undefined;
      /* module identifier */
      var __vue_module_identifier__$6 = undefined;
      /* functional template */
      var __vue_is_functional_template__$6 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
        __vue_inject_styles__$6,
        __vue_script__$6,
        __vue_scope_id__$6,
        __vue_is_functional_template__$6,
        __vue_module_identifier__$6,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$7 = {
        components: {Icon: __vue_component__$5}
    };

    /* script */
    var __vue_script__$7 = script$7;

    /* template */
    var __vue_render__$7 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("Icon", [
        _c("path", {
          attrs: {
            d:
              "M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"
          }
        })
      ])
    };
    var __vue_staticRenderFns__$7 = [];
    __vue_render__$7._withStripped = true;

      /* style */
      var __vue_inject_styles__$7 = undefined;
      /* scoped */
      var __vue_scope_id__$7 = undefined;
      /* module identifier */
      var __vue_module_identifier__$7 = undefined;
      /* functional template */
      var __vue_is_functional_template__$7 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
        __vue_inject_styles__$7,
        __vue_script__$7,
        __vue_scope_id__$7,
        __vue_is_functional_template__$7,
        __vue_module_identifier__$7,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$8 = {
        components: {Icon: __vue_component__$5}
    };

    /* script */
    var __vue_script__$8 = script$8;

    /* template */
    var __vue_render__$8 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("Icon", [
        _c("path", {
          attrs: {
            d:
              "M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"
          }
        })
      ])
    };
    var __vue_staticRenderFns__$8 = [];
    __vue_render__$8._withStripped = true;

      /* style */
      var __vue_inject_styles__$8 = undefined;
      /* scoped */
      var __vue_scope_id__$8 = undefined;
      /* module identifier */
      var __vue_module_identifier__$8 = undefined;
      /* functional template */
      var __vue_is_functional_template__$8 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
        __vue_inject_styles__$8,
        __vue_script__$8,
        __vue_scope_id__$8,
        __vue_is_functional_template__$8,
        __vue_module_identifier__$8,
        false,
        undefined,
        undefined,
        undefined
      );

    /**
     * Class which represents each library item
     *
     * @property {String} v_id Autogenerated id to use in Vue components
     */
    var Media = function Media(id, collectionName, fileName, mimeType, file, url, thumbnail) {
        this.v_id = Math.random().toString(36).substring(3);
        this.id = id;
        this.collection_name = collectionName;
        this.file_name = fileName;
        this.mime_type = mimeType;
        this.file = file;
        this.url = url;
        this.thumbnail = thumbnail;
    };

    /**
     *
     * @returns {Media}
     */
    Media.fromObject = function fromObject (obj){
        return new Media(obj.id, obj.collection_name, obj.file_name, obj.mime_type, null, obj.url, obj.thumbnail)
    };

    /**
     * @returns {Media}
     */
    Media.prototype.clone = function clone (){
        return new Media(this.id, this.collection_name, this.file_name, this.mime_type, this.file, this.url, this.thumbnail)
    };

    //

    var script$9 = {
        components: {Icon: __vue_component__$5}
    };

    /* script */
    var __vue_script__$9 = script$9;

    /* template */
    var __vue_render__$9 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("Icon", [
        _c("path", {
          attrs: {
            d:
              "M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
          }
        })
      ])
    };
    var __vue_staticRenderFns__$9 = [];
    __vue_render__$9._withStripped = true;

      /* style */
      var __vue_inject_styles__$9 = undefined;
      /* scoped */
      var __vue_scope_id__$9 = undefined;
      /* module identifier */
      var __vue_module_identifier__$9 = undefined;
      /* functional template */
      var __vue_is_functional_template__$9 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
        __vue_inject_styles__$9,
        __vue_script__$9,
        __vue_scope_id__$9,
        __vue_is_functional_template__$9,
        __vue_module_identifier__$9,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$a = {
        name: "ImageItem",
        components: {
            DeleteIcon: __vue_component__$6,
            DownloadIcon: __vue_component__$7,
            EditIcon: __vue_component__$8,
            ViewIcon: __vue_component__$9,
        },
        mixins: [
            isDownloadable,
            isEditable,
            isViewable ],
        props: {
            item: {
                type: Object,
                required: true
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            squared: {
                type: Boolean,
                default: false,
            },
            moreCount: {
                type: Number
            },
            moreItem: {
                type: Media,
            },
            showProgress: {
                type: Boolean,
                default: false
            },
            progressValue: {
                type: Number,
                default: 0
            }
        },
        computed: {
            isMoreItem: function isMoreItem() {
                return this.moreCount !== undefined && this.moreItem !== undefined && this.moreItem.v_id === this.item.v_id;
            },
            overlayVisible: function overlayVisible() {
                return this.isMoreItem || this.viewable || this.downloadable || !this.readonly;
            }
        }
    };

    /* script */
    var __vue_script__$a = script$a;

    /* template */
    var __vue_render__$a = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        {
          staticClass: "position-relative image-container d-flex align-items-center"
        },
        [
          _vm.squared ? _c("div", { staticClass: "spacer" }) : _vm._e(),
          _vm._v(" "),
          _c("img", {
            staticClass: "image",
            class: {
              "h-100": _vm.squared,
              "position-absolute": _vm.squared,
              "t-0": _vm.squared,
              "object-cover": _vm.squared
            },
            attrs: { src: _vm.item.thumbnail, alt: "" }
          }),
          _vm._v(" "),
          _vm.showProgress
            ? _c(
                "div",
                {
                  staticClass:
                    "visible-overlay d-flex flex-column justify-content-center align-items-center"
                },
                [
                  _c(
                    "div",
                    { staticClass: "w-100 px-3" },
                    [
                      _c("b-progress", {
                        attrs: {
                          value: _vm.progressValue,
                          variant: "info",
                          striped: "",
                          animated: ""
                        }
                      })
                    ],
                    1
                  )
                ]
              )
            : _c(
                "div",
                {
                  staticClass:
                    "d-flex flex-column justify-content-center align-items-center",
                  class: _vm.isMoreItem ? "visible-overlay" : "overlay"
                },
                [
                  _c(
                    "div",
                    [
                      _vm.isMoreItem
                        ? _c(
                            "b-link",
                            {
                              staticClass: "more-link text-white display-4",
                              on: {
                                click: function($event) {
                                  $event.preventDefault();
                                  return _vm.$emit("more", _vm.item)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                +" +
                                  _vm._s(_vm.moreCount) +
                                  "\n            "
                              )
                            ]
                          )
                        : [
                            _vm.viewable
                              ? _c(
                                  "b-button",
                                  {
                                    staticClass: "mx-1",
                                    attrs: { variant: "outline-light" },
                                    on: {
                                      click: function($event) {
                                        return _vm.$emit("view", _vm.item)
                                      }
                                    }
                                  },
                                  [_c("ViewIcon")],
                                  1
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.downloadable
                              ? _c(
                                  "b-button",
                                  {
                                    staticClass: "mx-1",
                                    attrs: { variant: "outline-light" },
                                    on: {
                                      click: function($event) {
                                        return _vm.$emit("download", _vm.item)
                                      }
                                    }
                                  },
                                  [_c("DownloadIcon")],
                                  1
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            !_vm.readonly
                              ? [
                                  _vm.editable && _vm.item.id
                                    ? _c(
                                        "b-button",
                                        {
                                          staticClass: "mx-1",
                                          attrs: { variant: "outline-light" },
                                          on: {
                                            click: function($event) {
                                              return _vm.$emit("edit", _vm.item)
                                            }
                                          }
                                        },
                                        [_c("EditIcon")],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c(
                                    "b-button",
                                    {
                                      staticClass: "mx-1",
                                      attrs: { variant: "outline-light" },
                                      on: {
                                        click: function($event) {
                                          return _vm.$emit("delete", _vm.item)
                                        }
                                      }
                                    },
                                    [_c("DeleteIcon")],
                                    1
                                  )
                                ]
                              : _vm._e()
                          ]
                    ],
                    2
                  )
                ]
              )
        ]
      )
    };
    var __vue_staticRenderFns__$a = [];
    __vue_render__$a._withStripped = true;

      /* style */
      var __vue_inject_styles__$a = function (inject) {
        if (!inject) { return }
        inject("data-v-644b1398_0", { source: "\n.image[data-v-644b1398] {\r\n    vertical-align: middle;\r\n    width: 100%;\r\n    backface-visibility: hidden;\n}\n.image-container:hover .overlay[data-v-644b1398] {\r\n    opacity: 1;\n}\n.spacer[data-v-644b1398] {\r\n    padding-top: 100%;\n}\n.t-0[data-v-644b1398] {\r\n    top: 0;\n}\n.fill-current[data-v-644b1398] {\r\n    fill: currentColor;\n}\n.object-cover[data-v-644b1398] {\r\n    object-fit: cover;\n}\n.image-container[data-v-644b1398] {\r\n    overflow: hidden;\n}\n.overlay[data-v-644b1398],\r\n.visible-overlay[data-v-644b1398] {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: absolute;\r\n    overflow: hidden;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    -webkit-transition: all .4s ease-in-out;\r\n    transition: all .4s ease-in-out\n}\n.overlay[data-v-644b1398] {\r\n    opacity: 0;\n}\n.image-container img[data-v-644b1398] {\r\n    -webkit-transition: all .4s linear;\r\n    transition: all .4s linear;\n}\n.image-container:hover img[data-v-644b1398] {\r\n    -ms-transform: scale(1.2);\r\n    -webkit-transform: scale(1.2);\r\n    transform: scale(1.2);\n}\n.image-container:hover .overlay[data-v-644b1398] {\r\n    opacity: 1;\r\n    filter: alpha(opacity=100);\n}\n.more-link[data-v-644b1398] {\r\n    text-decoration: none;\n}\r\n\r\n", map: {"version":3,"sources":["C:\\Software\\Laravel\\vue-media-library\\src\\components\\Views\\ImageItem.vue"],"names":[],"mappings":";AAkHA;IACA,sBAAA;IACA,WAAA;IACA,2BAAA;AACA;AAEA;IACA,UAAA;AACA;AAEA;IACA,iBAAA;AACA;AAEA;IACA,MAAA;AACA;AAEA;IACA,kBAAA;AACA;AAEA;IACA,iBAAA;AACA;AAEA;IACA,gBAAA;AACA;AAEA;;IAEA,WAAA;IACA,YAAA;IACA,kBAAA;IACA,gBAAA;IACA,MAAA;IACA,OAAA;IACA,oCAAA;IACA,uCAAA;IACA;AACA;AAEA;IACA,UAAA;AACA;AAEA;IACA,kCAAA;IACA,0BAAA;AACA;AAEA;IACA,yBAAA;IACA,6BAAA;IACA,qBAAA;AACA;AAEA;IACA,UAAA;IACA,0BAAA;AACA;AAEA;IACA,qBAAA;AACA","file":"ImageItem.vue","sourcesContent":["<template>\r\n    <div class=\"position-relative image-container d-flex align-items-center\">\r\n        <div v-if=\"squared\" class=\"spacer\"></div>\r\n        <img\r\n            class=\"image\"\r\n            :class=\"{'h-100': squared, 'position-absolute': squared, 't-0': squared, 'object-cover': squared}\"\r\n            :src=\"item.thumbnail\"\r\n            alt=\"\"\r\n        />\r\n\r\n        <div v-if=\"showProgress\" class=\"visible-overlay d-flex flex-column justify-content-center align-items-center\">\r\n            <div class=\"w-100 px-3\">\r\n                <b-progress :value=\"progressValue\" variant=\"info\" striped animated/>\r\n            </div>\r\n        </div>\r\n\r\n        <div v-else class=\"d-flex flex-column justify-content-center align-items-center\"\r\n             :class=\"isMoreItem ? 'visible-overlay' : 'overlay'\">\r\n            <div>\r\n                <b-link v-if=\"isMoreItem\" class=\"more-link text-white display-4\" @click.prevent=\"$emit('more', item)\">\r\n                    +{{ moreCount }}\r\n                </b-link>\r\n                <template v-else>\r\n                    <b-button v-if=\"viewable\" variant=\"outline-light\" class=\"mx-1\" @click=\"$emit('view', item)\">\r\n                        <ViewIcon/>\r\n                    </b-button>\r\n\r\n                    <b-button v-if=\"downloadable\" variant=\"outline-light\" class=\"mx-1\" @click=\"$emit('download', item)\">\r\n                        <DownloadIcon/>\r\n                    </b-button>\r\n\r\n                    <template v-if=\"!readonly\">\r\n\r\n                        <b-button v-if=\"editable && item.id\" variant=\"outline-light\" class=\"mx-1\"\r\n                                  @click=\"$emit('edit', item)\">\r\n                            <EditIcon/>\r\n                        </b-button>\r\n\r\n                        <b-button variant=\"outline-light\" class=\"mx-1\" @click=\"$emit('delete', item)\">\r\n                            <DeleteIcon/>\r\n                        </b-button>\r\n\r\n                    </template>\r\n                </template>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nimport {\r\n    isDownloadable,\r\n    isEditable,\r\n    isViewable,\r\n} from \"../../mixins\";\r\nimport DeleteIcon from \"../Icons/Delete.vue\";\r\nimport DownloadIcon from \"../Icons/Download.vue\";\r\nimport EditIcon from \"../Icons/Edit.vue\";\r\nimport Media from \"../../Media\";\r\nimport ViewIcon from \"../Icons/View.vue\";\r\n\r\nexport default {\r\n    name: \"ImageItem\",\r\n    components: {\r\n        DeleteIcon,\r\n        DownloadIcon,\r\n        EditIcon,\r\n        ViewIcon,\r\n    },\r\n    mixins: [\r\n        isDownloadable,\r\n        isEditable,\r\n        isViewable,\r\n    ],\r\n    props: {\r\n        item: {\r\n            type: Object,\r\n            required: true\r\n        },\r\n        readonly: {\r\n            type: Boolean,\r\n            default: false,\r\n        },\r\n        squared: {\r\n            type: Boolean,\r\n            default: false,\r\n        },\r\n        moreCount: {\r\n            type: Number\r\n        },\r\n        moreItem: {\r\n            type: Media,\r\n        },\r\n        showProgress: {\r\n            type: Boolean,\r\n            default: false\r\n        },\r\n        progressValue: {\r\n            type: Number,\r\n            default: 0\r\n        }\r\n    },\r\n    computed: {\r\n        isMoreItem() {\r\n            return this.moreCount !== undefined && this.moreItem !== undefined && this.moreItem.v_id === this.item.v_id;\r\n        },\r\n        overlayVisible() {\r\n            return this.isMoreItem || this.viewable || this.downloadable || !this.readonly;\r\n        }\r\n    }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.image {\r\n    vertical-align: middle;\r\n    width: 100%;\r\n    backface-visibility: hidden;\r\n}\r\n\r\n.image-container:hover .overlay {\r\n    opacity: 1;\r\n}\r\n\r\n.spacer {\r\n    padding-top: 100%;\r\n}\r\n\r\n.t-0 {\r\n    top: 0;\r\n}\r\n\r\n.fill-current {\r\n    fill: currentColor;\r\n}\r\n\r\n.object-cover {\r\n    object-fit: cover;\r\n}\r\n\r\n.image-container {\r\n    overflow: hidden;\r\n}\r\n\r\n.overlay,\r\n.visible-overlay {\r\n    width: 100%;\r\n    height: 100%;\r\n    position: absolute;\r\n    overflow: hidden;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    -webkit-transition: all .4s ease-in-out;\r\n    transition: all .4s ease-in-out\r\n}\r\n\r\n.overlay {\r\n    opacity: 0;\r\n}\r\n\r\n.image-container img {\r\n    -webkit-transition: all .4s linear;\r\n    transition: all .4s linear;\r\n}\r\n\r\n.image-container:hover img {\r\n    -ms-transform: scale(1.2);\r\n    -webkit-transform: scale(1.2);\r\n    transform: scale(1.2);\r\n}\r\n\r\n.image-container:hover .overlay {\r\n    opacity: 1;\r\n    filter: alpha(opacity=100);\r\n}\r\n\r\n.more-link {\r\n    text-decoration: none;\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$a = "data-v-644b1398";
      /* module identifier */
      var __vue_module_identifier__$a = undefined;
      /* functional template */
      var __vue_is_functional_template__$a = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$a = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
        __vue_inject_styles__$a,
        __vue_script__$a,
        __vue_scope_id__$a,
        __vue_is_functional_template__$a,
        __vue_module_identifier__$a,
        false,
        createInjector,
        undefined,
        undefined
      );

    //

    var script$b = {
        name: "Column",
        components: {ImageItem: __vue_component__$a},
        mixins: [
            isDownloadable,
            isEditable,
            isViewable,
            usesProgress ],
        props: {
            items: {
                type: Array,
                default: function default$1(){
                    return []
                }
            },
            readonly: {
                type: Boolean,
                default: false
            },
            squaredItems: {
                type: Boolean,
                default: false,
            },
            moreCount: {
                type: Number
            },
            moreItem: {
                type: Media,
            },
            uploadingMedia: {
                type: Array,
                default: function default$2() {
                    return [];
                }
            },
        },
    };

    /* script */
    var __vue_script__$b = script$b;

    /* template */
    var __vue_render__$b = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { staticClass: "column px-1" },
        _vm._l(_vm.items, function(item) {
          return _c("ImageItem", {
            key: item.v_id,
            staticClass: "mt-2",
            attrs: {
              item: item,
              readonly: _vm.readonly,
              viewable: _vm.viewable,
              editable: _vm.editable,
              downloadable: _vm.downloadable,
              squared: _vm.squaredItems,
              "more-count": _vm.moreCount,
              "more-item": _vm.moreItem,
              "show-progress": _vm.shouldShowProgress(_vm.uploadingMedia, item),
              "progress-value": _vm.getProgressValue(_vm.uploadingMedia, item)
            },
            on: {
              view: function(args) {
                _vm.$emit("view", args);
              },
              download: function(args) {
                _vm.$emit("download", args);
              },
              edit: function(args) {
                _vm.$emit("edit", args);
              },
              delete: function(args) {
                _vm.$emit("delete", args);
              },
              more: function(args) {
                _vm.$emit("more", args);
              }
            }
          })
        }),
        1
      )
    };
    var __vue_staticRenderFns__$b = [];
    __vue_render__$b._withStripped = true;

      /* style */
      var __vue_inject_styles__$b = undefined;
      /* scoped */
      var __vue_scope_id__$b = undefined;
      /* module identifier */
      var __vue_module_identifier__$b = undefined;
      /* functional template */
      var __vue_is_functional_template__$b = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$b = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
        __vue_inject_styles__$b,
        __vue_script__$b,
        __vue_scope_id__$b,
        __vue_is_functional_template__$b,
        __vue_module_identifier__$b,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var defaultColumns = {
        'xs': 1,
        'sm': 2,
        'md': 3,
        'lg': 4,
        'xl': 5
    };

    var script$c = {
        name: "Columns",
        components: {Column: __vue_component__$b},
        mixins: [isDownloadable, isEditable, isViewable],
        props: {
            items: {
                type: Array,
                default: function default$1(){
                    return []
                },
            },
            readonly: {
                type: Boolean,
                default: false
            },
            columnsCount: {
                type: Object,
                default: function default$2(){
                    return defaultColumns;
                }
            },
            squaredItems: {
                type: Boolean,
                default: false,
            },
            moreCount: {
                type: Number
            },
            moreItem: {
                type: Media,
            },
            uploadingMedia: {
                type: Array,
                default: function default$3() {
                    return [];
                }
            },
        },
        data: function data(){
            return {
                window: {
                    width: 0,
                    height: 0
                },
                breakpoints: {
                    // https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints
                    'sm': 576,
                    'md': 768,
                    'lg': 992,
                    'xl': 1200,
                }
            }
        },
        mounted: function mounted() {

        },
        created: function created() {
            this.handleResize();
            window.addEventListener('resize', this.handleResize);
        },
        destroyed: function destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            chunk: function chunk(array, chunks){
                var res = [];

                for (var i = 0; i < chunks; i++){
                    res.push([]);
                }

                var current = 0;
                array.forEach(function (item) {
                    res[current].push(item);
                    current = current + 1 < chunks ? current + 1 : 0;
                });

                return res;
            },
            handleResize: function handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
            getColumnsCount: function getColumnsCount(breakpoint){
                return this.columnsCount[breakpoint] || defaultColumns[breakpoint];
            },
        },
        computed: {
            columns: function columns(){
                var chunks = this.getColumnsCount(this.currentBreakpoint);

                return this.chunk(this.items, chunks);
            },
            currentBreakpoint: function currentBreakpoint(){
                var this$1 = this;

                var breakpoint = 'xs';

                Object.entries(this.breakpoints).reverse().every(function (entry) {
                    var br = entry[0];
                    var size = entry[1];
                    if (this$1.window.width >= size){
                        breakpoint = br;
                        return false;
                    }
                    return true;
                });

                return breakpoint;
            },
            columnClasses: function columnClasses(){
                var count = this.getColumnsCount(this.currentBreakpoint);
                var w = count === 1 ? 'full' : ("1/" + count);
                return ("w-" + w);
            },
        }
    };

    /* script */
    var __vue_script__$c = script$c;

    /* template */
    var __vue_render__$c = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { staticClass: "d-flex flex-wrap" },
        _vm._l(_vm.columns, function(column, i) {
          return _c("column", {
            key: i,
            class: _vm.columnClasses,
            attrs: {
              items: column,
              readonly: _vm.readonly,
              viewable: _vm.viewable,
              editable: _vm.editable,
              downloadable: _vm.downloadable,
              "squared-items": _vm.squaredItems,
              "more-count": _vm.moreCount,
              "more-item": _vm.moreItem,
              "uploading-media": _vm.uploadingMedia
            },
            on: {
              view: function(args) {
                _vm.$emit("view", args);
              },
              download: function(args) {
                _vm.$emit("download", args);
              },
              edit: function(args) {
                _vm.$emit("edit", args);
              },
              delete: function(args) {
                _vm.$emit("delete", args);
              },
              more: function(args) {
                _vm.$emit("more", args);
              }
            }
          })
        }),
        1
      )
    };
    var __vue_staticRenderFns__$c = [];
    __vue_render__$c._withStripped = true;

      /* style */
      var __vue_inject_styles__$c = function (inject) {
        if (!inject) { return }
        inject("data-v-69d61354_0", { source: "\n.w-full[data-v-69d61354] {\n    width: 100%;\n}\n.w-1\\/2[data-v-69d61354] {\n    width: 50%;\n}\n.w-1\\/3[data-v-69d61354] {\n    width: 33.33%;\n}\n.w-1\\/4[data-v-69d61354] {\n    width: 25%;\n}\n.w-1\\/5[data-v-69d61354] {\n    width: 20%;\n}\n", map: {"version":3,"sources":["C:\\Software\\Laravel\\vue-media-library\\src\\components\\Views\\Columns.vue"],"names":[],"mappings":";AA2JA;IACA,WAAA;AACA;AAEA;IACA,UAAA;AACA;AAEA;IACA,aAAA;AACA;AAEA;IACA,UAAA;AACA;AAEA;IACA,UAAA;AACA","file":"Columns.vue","sourcesContent":["<template>\r\n    <div class=\"d-flex flex-wrap\">\r\n        <column\r\n                :class=\"columnClasses\"\r\n                v-for=\"(column, i) in columns\"\r\n                :key=\"i\"\r\n                :items=\"column\"\r\n                :readonly=\"readonly\"\r\n                :viewable=\"viewable\"\r\n                :editable=\"editable\"\r\n                :downloadable=\"downloadable\"\r\n                :squared-items=\"squaredItems\"\r\n                :more-count=\"moreCount\"\r\n                :more-item=\"moreItem\"\r\n                :uploading-media=\"uploadingMedia\"\r\n                @view=\"(args) => {$emit('view', args)}\"\r\n                @download=\"(args) => {$emit('download', args)}\"\r\n                @edit=\"(args) => {$emit('edit', args)}\"\r\n                @delete=\"(args) => {$emit('delete', args)}\"\r\n                @more=\"(args) => {$emit('more', args)}\"\r\n        />\r\n    </div>\r\n</template>\r\n\r\n<script>\r\n    import Column from \"./Column.vue\";\r\n    import {isDownloadable, isEditable, isViewable} from \"../../mixins\";\r\n    import Media from \"../../Media\";\r\n\r\n    const defaultColumns = {\r\n        'xs': 1,\r\n        'sm': 2,\r\n        'md': 3,\r\n        'lg': 4,\r\n        'xl': 5\r\n    };\r\n\r\n    export default {\r\n        name: \"Columns\",\r\n        components: {Column},\r\n        mixins: [isDownloadable, isEditable, isViewable],\r\n        props: {\r\n            items: {\r\n                type: Array,\r\n                default(){\r\n                    return []\r\n                },\r\n            },\r\n            readonly: {\r\n                type: Boolean,\r\n                default: false\r\n            },\r\n            columnsCount: {\r\n                type: Object,\r\n                default(){\r\n                    return defaultColumns;\r\n                }\r\n            },\r\n            squaredItems: {\r\n                type: Boolean,\r\n                default: false,\r\n            },\r\n            moreCount: {\r\n                type: Number\r\n            },\r\n            moreItem: {\r\n                type: Media,\r\n            },\r\n            uploadingMedia: {\r\n                type: Array,\r\n                default() {\r\n                    return [];\r\n                }\r\n            },\r\n        },\r\n        data(){\r\n            return {\r\n                window: {\r\n                    width: 0,\r\n                    height: 0\r\n                },\r\n                breakpoints: {\r\n                    // https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints\r\n                    'sm': 576,\r\n                    'md': 768,\r\n                    'lg': 992,\r\n                    'xl': 1200,\r\n                }\r\n            }\r\n        },\r\n        mounted() {\r\n\r\n        },\r\n        created() {\r\n            this.handleResize();\r\n            window.addEventListener('resize', this.handleResize);\r\n        },\r\n        destroyed() {\r\n            window.removeEventListener('resize', this.handleResize);\r\n        },\r\n        methods: {\r\n            chunk(array, chunks){\r\n                let res = [];\r\n\r\n                for (let i = 0; i < chunks; i++){\r\n                    res.push([]);\r\n                }\r\n\r\n                let current = 0;\r\n                array.forEach(item => {\r\n                    res[current].push(item);\r\n                    current = current + 1 < chunks ? current + 1 : 0;\r\n                });\r\n\r\n                return res;\r\n            },\r\n            handleResize() {\r\n                this.window.width = window.innerWidth;\r\n                this.window.height = window.innerHeight;\r\n            },\r\n            getColumnsCount(breakpoint){\r\n                return this.columnsCount[breakpoint] || defaultColumns[breakpoint];\r\n            },\r\n        },\r\n        computed: {\r\n            columns(){\r\n                let chunks = this.getColumnsCount(this.currentBreakpoint);\r\n\r\n                return this.chunk(this.items, chunks);\r\n            },\r\n            currentBreakpoint(){\r\n                let breakpoint = 'xs';\r\n\r\n                Object.entries(this.breakpoints).reverse().every(entry => {\r\n                    let br = entry[0];\r\n                    let size = entry[1];\r\n                    if (this.window.width >= size){\r\n                        breakpoint = br;\r\n                        return false;\r\n                    }\r\n                    return true;\r\n                });\r\n\r\n                return breakpoint;\r\n            },\r\n            columnClasses(){\r\n                let count = this.getColumnsCount(this.currentBreakpoint);\r\n                let w = count === 1 ? 'full' : `1/${count}`;\r\n                return `w-${w}`;\r\n            },\r\n        }\r\n    }\r\n</script>\r\n\r\n<style scoped>\r\n    .w-full {\r\n        width: 100%;\r\n    }\r\n\r\n    .w-1\\/2 {\r\n        width: 50%;\r\n    }\r\n\r\n    .w-1\\/3 {\r\n        width: 33.33%;\r\n    }\r\n\r\n    .w-1\\/4 {\r\n        width: 25%;\r\n    }\r\n\r\n    .w-1\\/5 {\r\n        width: 20%;\r\n    }\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$c = "data-v-69d61354";
      /* module identifier */
      var __vue_module_identifier__$c = undefined;
      /* functional template */
      var __vue_is_functional_template__$c = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$c = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
        __vue_inject_styles__$c,
        __vue_script__$c,
        __vue_scope_id__$c,
        __vue_is_functional_template__$c,
        __vue_module_identifier__$c,
        false,
        createInjector,
        undefined,
        undefined
      );

    var View = {
        props: {
            items: {
                type: Array,
                default: function default$1() {
                    return []
                },
            },
            readonly: {
                type: Boolean,
                default: false
            },
            uploadingMedia: {
                type: Array,
                default: function default$2() {
                    return [];
                }
            },
        },
    };

    //

    var script$d = {
        extends: View,
        components: {
            Columns: __vue_component__$c,
            Modal: __vue_component__$3,
        },
        mixins: [
            isDownloadable,
            isEditable,
            isViewable,
            usesPortal ],
        props: {
            columnsCount: {
                type: Object,
            },
            squaredItems: {
                type: Boolean,
                default: false,
            },
            displayLimit: {
                type: Number,
                default: -1
            },
        },
        methods: {
            onMore: function onMore() {
                var this$1 = this;

                this.$nextTick(function () {
                    this$1.$nextTick(function () {
                        this$1.$refs.moreModal.show();
                    });
                });
            }
        },
        computed: {
            visibleCount: function visibleCount() {
                return this.displayLimit > 0 ? Math.min(this.displayLimit, this.items.length) : this.items.length;
            },
            moreCount: function moreCount() {
                var count = this.items.length - this.visibleCount;
                return count > 0 ? count + 1 : undefined;
            },
            visibleItems: function visibleItems() {
                return this.items.slice(0, this.visibleCount);
            }
        }
    };

    /* script */
    var __vue_script__$d = script$d;

    /* template */
    var __vue_render__$d = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        [
          _c("columns", {
            attrs: {
              items: _vm.visibleItems,
              readonly: _vm.readonly,
              viewable: _vm.viewable,
              editable: _vm.editable,
              downloadable: _vm.downloadable,
              "columns-count": _vm.columnsCount,
              "squared-items": _vm.squaredItems,
              "more-count": _vm.moreCount,
              "more-item": _vm.visibleItems[_vm.visibleItems.length - 1],
              "uploading-media": _vm.uploadingMedia
            },
            on: {
              view: function(args) {
                _vm.$emit("view", args);
              },
              download: function(args) {
                _vm.$emit("download", args);
              },
              edit: function(args) {
                _vm.$emit("edit", args);
              },
              delete: function(args) {
                _vm.$emit("delete", args);
              },
              more: _vm.onMore
            }
          }),
          _vm._v(" "),
          _c(
            _vm.usePortal ? "portal" : "div",
            { tag: "component", attrs: { to: _vm.portalTarget } },
            [
              _c(
                "modal",
                { ref: "moreModal", attrs: { size: "xl" } },
                [
                  _c("columns", {
                    attrs: {
                      items: _vm.items,
                      readonly: _vm.readonly,
                      viewable: _vm.viewable,
                      editable: _vm.editable,
                      downloadable: _vm.downloadable,
                      "columns-count": _vm.columnsCount,
                      "squared-items": _vm.squaredItems,
                      "uploading-media": _vm.uploadingMedia
                    },
                    on: {
                      view: function(args) {
                        _vm.$emit("view", args);
                      },
                      download: function(args) {
                        _vm.$emit("download", args);
                      },
                      edit: function(args) {
                        _vm.$emit("edit", args);
                      },
                      delete: function(args) {
                        _vm.$emit("delete", args);
                      }
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$d = [];
    __vue_render__$d._withStripped = true;

      /* style */
      var __vue_inject_styles__$d = undefined;
      /* scoped */
      var __vue_scope_id__$d = undefined;
      /* module identifier */
      var __vue_module_identifier__$d = undefined;
      /* functional template */
      var __vue_is_functional_template__$d = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$d = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
        __vue_inject_styles__$d,
        __vue_script__$d,
        __vue_scope_id__$d,
        __vue_is_functional_template__$d,
        __vue_module_identifier__$d,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$e = {
        name: "SingleView",
        components: {ImageItem: __vue_component__$a},
        mixins: [isDownloadable, isEditable, isViewable],
        props: {
            items: {
                type: Array,
                default: function default$1(){
                    return []
                },
            },
            readonly: {
                type: Boolean,
                default: false
            },
            uploadingMedia: {
                type: Array,
                default: function default$2() {
                    return [];
                }
            },
        },
        computed: {
            mediaItem: function mediaItem(){
                return this.items[0];
            },
            progress: function progress(){
                var this$1 = this;

                var uploadingMedia = this.uploadingMedia.find(function (item) { return item.media.v_id === this$1.mediaItem.v_id; });

                return uploadingMedia !== undefined ? uploadingMedia.progress : undefined;
            }
        },
    };

    /* script */
    var __vue_script__$e = script$e;

    /* template */
    var __vue_render__$e = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _vm.items.length > 0
        ? _c("ImageItem", {
            staticClass: "mt-2",
            attrs: {
              item: _vm.mediaItem,
              readonly: _vm.readonly,
              viewable: _vm.viewable,
              editable: _vm.editable,
              downloadable: _vm.downloadable,
              "show-progress": _vm.progress !== undefined,
              "progress-value": _vm.progress
            },
            on: {
              view: function(args) {
                _vm.$emit("view", args);
              },
              download: function(args) {
                _vm.$emit("download", args);
              },
              edit: function(args) {
                _vm.$emit("edit", args);
              },
              delete: function(args) {
                _vm.$emit("delete", args);
              }
            }
          })
        : _vm._e()
    };
    var __vue_staticRenderFns__$e = [];
    __vue_render__$e._withStripped = true;

      /* style */
      var __vue_inject_styles__$e = undefined;
      /* scoped */
      var __vue_scope_id__$e = undefined;
      /* module identifier */
      var __vue_module_identifier__$e = undefined;
      /* functional template */
      var __vue_is_functional_template__$e = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$e = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
        __vue_inject_styles__$e,
        __vue_script__$e,
        __vue_scope_id__$e,
        __vue_is_functional_template__$e,
        __vue_module_identifier__$e,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$f = {
        components: {
            DeleteIcon: __vue_component__$6,
        },
        mixins: [
            usesProgress ],
        props: {
            item: {
                type: Object,
                required: true,
            },
            readonly: {
                type: Boolean,
                default: false
            },
            showProgress: {
                type: Boolean,
                default: false,
            },
            progressValue: {
                type: Number,
            },
        },
    };

    /* script */
    var __vue_script__$f = script$f;

    /* template */
    var __vue_render__$f = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "li",
        [
          _vm.showProgress
            ? _c("b-progress", {
                attrs: {
                  value: _vm.progressValue,
                  variant: "info",
                  striped: "",
                  animated: ""
                }
              })
            : !_vm.readonly
            ? [
                _c(
                  "b-button",
                  {
                    staticClass: "mx-1",
                    attrs: { variant: "outline-light" },
                    on: {
                      click: function($event) {
                        return _vm.$emit("delete", _vm.item)
                      }
                    }
                  },
                  [_c("DeleteIcon")],
                  1
                )
              ]
            : _vm._e(),
          _vm._v("\n    " + _vm._s(_vm.item.file_name) + "\n")
        ],
        2
      )
    };
    var __vue_staticRenderFns__$f = [];
    __vue_render__$f._withStripped = true;

      /* style */
      var __vue_inject_styles__$f = undefined;
      /* scoped */
      var __vue_scope_id__$f = undefined;
      /* module identifier */
      var __vue_module_identifier__$f = undefined;
      /* functional template */
      var __vue_is_functional_template__$f = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$f = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
        __vue_inject_styles__$f,
        __vue_script__$f,
        __vue_scope_id__$f,
        __vue_is_functional_template__$f,
        __vue_module_identifier__$f,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$g = {
        extends: View,
        components: {ListItem: __vue_component__$f},
        mixins: [usesProgress],
    };

    /* script */
    var __vue_script__$g = script$g;

    /* template */
    var __vue_render__$g = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", [
        _c(
          "ul",
          { staticClass: "list-unstyled" },
          _vm._l(_vm.items, function(item) {
            return _c("ListItem", {
              key: item.v_id,
              attrs: {
                item: item,
                "show-progress": _vm.shouldShowProgress(_vm.uploadingMedia, item),
                "progress-value": _vm.getProgressValue(_vm.uploadingMedia, item)
              },
              on: {
                delete: function(args) {
                  return _vm.$emit("delete", args)
                }
              }
            })
          }),
          1
        )
      ])
    };
    var __vue_staticRenderFns__$g = [];
    __vue_render__$g._withStripped = true;

      /* style */
      var __vue_inject_styles__$g = undefined;
      /* scoped */
      var __vue_scope_id__$g = undefined;
      /* module identifier */
      var __vue_module_identifier__$g = undefined;
      /* functional template */
      var __vue_is_functional_template__$g = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$g = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
        __vue_inject_styles__$g,
        __vue_script__$g,
        __vue_scope_id__$g,
        __vue_is_functional_template__$g,
        __vue_module_identifier__$g,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$h = {
        name: "VueMediaLibrary",
        components: {ImageCropper: __vue_component__$4, Modal: __vue_component__$3, FilePicker: __vue_component__$2, Grid: __vue_component__$d, Single: __vue_component__$e, List: __vue_component__$g},
        mixins: [isDownloadable, isEditable, isViewable, usesPortal],
        props: {
            media: {
                type: Array,
                required: true,
            },
            accept: {
                type: Array,
                default: function default$1() {
                    return ['*']
                }
            },
            limit: {
                type: Number,
                default: -1,
            },
            viewMode: {
                type: String,
                default: 'list',
                validator: function validator(value) {
                    return [
                        'grid',
                        'single',
                        'list' ].indexOf(value) !== -1
                }
            },
            filePickerMode: {
                type: String,
                default: 'button',
                validator: function validator(value) {
                    return [
                        'button',
                        'drag' // fixme: make it more graceful
                    ].indexOf(value) !== -1
                }
            },
            collectionName: {
                type: String,
                default: 'default',
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            cropperOptions: {
                type: Object,
            },
            mimeType: {
                type: String,
            },
            gridColumns: {
                type: Object,
            },
            gridSquaredItems: {
                type: Boolean,
                default: false,
            },
            gridDisplayLimit: {
                type: Number,
                default: -1
            },
            uploadBaseUrl: {
                type: String
            },
            uploadModelClass: {
                type: String
            },
        },
        model: {
            prop: 'media',
        },
        data: function data() {
            return {
                /**
                 * @var {Media|null} cropperMedia
                 */
                cropperMedia: null,

                /**
                 * @var {boolean} creating
                 */
                creating: false,

                /**
                 * @var {boolean} updating
                 */
                updating: false,

                /**
                 * @var {Media[]} items
                 */
                items: [],
                /**
                 * @param {Array<Object>} addedItems where each item is an Object which has media property and optional
                 * pendingMediaId property
                 */
                addedItems: [],
                /**
                 * @param {Array<Object>} updatedItems where each item is an Object which has media property and optional
                 * pendingMediaId property
                 */
                updatedItems: [],
                /**
                 * @var {Media[]} deletedItems
                 */
                deletedItems: [],
                /**
                 * @param {Object} uploadingMedia
                 */
                uploadingMedia: [],
            }
        },
        watch: {
            media: function media(new_) {
                this.items = this.filterMedia(this.mapObjectsToMedia(new_));
            }
        },
        mounted: function mounted() {
            this.items = this.filterMedia(this.mapObjectsToMedia(this.media));
        },
        methods: {
            onSelected: function onSelected(file) {
                var this$1 = this;

                var img = URL.createObjectURL(file); // fixme: do only for images

                if (this.editable) {
                    this.creating = true;

                    var image = new Image();
                    image.onload = function () {
                        if (this$1.cropperMinWidth && image.width < this$1.cropperMinWidth) {
                            this$1.$emit('error:wrong_width', {image: image});
                        } else if (this$1.cropperMinHeight && image.height < this$1.cropperMinHeight) {
                            this$1.$emit('error:wrong_height', {image: image});
                        } else {
                            this$1.cropperMedia = new Media(null, this$1.collectionName, file.name, file.type, file, img, img);

                            this$1.$nextTick(function () {
                                this$1.$nextTick(function () {
                                    this$1.$refs.cropperModal.show();
                                });
                            });
                        }
                    };
                    image.src = img;
                } else {
                    var media = new Media(null, this.collectionName, file.name, file.type, file, img, img);
                    this.onAdded(media);
                }
            },

            onSave: function onSave() {
                var this$1 = this;

                this.$refs.cropperModal.hide();

                this.$refs.cropper.getResult(function (blob) {
                    var item = this$1.blobToMedia(blob, this$1.cropperMedia);

                    if (this$1.creating) {
                        this$1.onAdded(item);
                    } else if (this$1.updating) {
                        this$1.onEdited(item);
                    }
                }, this.mimeType || this.cropperMedia.mime_type);
            },

            /**
             * @param {Media} media
             */
            onAdded: function onAdded(media) {
                var this$1 = this;

                this.items.push(media);

                this.onCreated(media);

                if (this.shouldAutoUpload) {
                    this.storePendingMedia(media)
                        .then(function (ref) {
                            var pendingMediaId = ref.pendingMediaId;

                            this$1.addedItems.push({media: media, pendingMediaId: pendingMediaId});
                            this$1.$emit('uploaded', {media: media, pendingMediaId: pendingMediaId});
                        })
                        .catch(function (error) {
                            // todo: manage properly
                            console.error(error);
                        });
                } else {
                    this.addedItems.push({media: media});
                }

                this.creating = false;
            },

            /**
             * @param {Media} media
             */
            onEdited: function onEdited(media) {
                var this$1 = this;

                this.items = this.items.map(function (item) {
                    if (item.id === media.id) {
                        item.url = media.url;
                        item.thumbnail = media.thumbnail;
                        item.file = media.file;
                    }
                    return item;
                });

                this.onUpdated(media);

                var previous = this.updatedItems.find(function (item) { return item.media.id === media.id; });
                if (previous) {
                    this.updatedItems = this.updatedItems.map(function (item) {
                        if (item.media.id === media.id) {
                            item.media = media;
                        }
                        return item;
                    });

                    if (this.shouldAutoUpload) {
                        var updatedItem = this.updatedItems.find(function (item) { return item.media.id === media.id; });

                        this.updatePendingMedia(updatedItem.media, updatedItem.pendingMediaId)
                            .then(function () {
                                this$1.updatedItems = this$1.updatedItems.map(function (item) {
                                    if (item.media.id === media.id) {
                                        item.pendingMediaId = updatedItem.pendingMediaId;
                                    }
                                    return item;
                                });
                            })
                            .catch(function (error) {
                                // todo: manage properly
                                console.error(error);
                            });
                    }
                } else if (this.shouldAutoUpload) {
                    this.storePendingMedia(media)
                        .then(function (ref) {
                            var pendingMediaId = ref.pendingMediaId;

                            this$1.updatedItems.push({media: media, pendingMediaId: pendingMediaId});
                        })
                        .catch(function (error) {
                            // todo: manage properly
                            console.error(error);
                        });
                } else {
                    this.updatedItems.push({media: media});
                }

                this.updating = false;
            },

            /**
             * @param {Blob} blob
             * @param {Media} item
             */
            blobToMedia: function blobToMedia(blob, item) {
                var newItem = item.clone();

                var file = new File([blob], newItem.file_name, {type: blob.type});
                var url = URL.createObjectURL(blob);
                newItem.url = newItem.thumbnail = url;
                newItem.file = file;

                return newItem;
            },

            /**
             * @param {Media} item
             */
            onView: function onView(item) {
                var i = this.items.map(function (v) { return v.v_id; }).indexOf(item.v_id);
                this.$emit('view', {media: item, index: i});
            },
            onDownload: function onDownload(item) {
                console.log('onDownload', item);
            },
            onEdit: function onEdit(media) {
                this.updating = true;
                this.cropperMedia = media;
                this.$refs.cropperModal.show();
            },
            onDelete: function onDelete(item) {
                this.$emit('delete', {item: item, delete: this.delete});
            },
            delete: function delete$1(item) {
                this.items = this.items.filter(function (mediaItem) {
                    return mediaItem.v_id !== item.v_id;
                });

                var previous;
                if (item.id) {
                    this.deletedItems.push(Object.assign({}, item));
                    previous = this.updatedItems.find(function (mediaItem) { return mediaItem.media.v_id === item.v_id; });
                    this.updatedItems = this.updatedItems.filter(function (mediaItem) { return mediaItem.media.v_id !== item.v_id; });
                } else {
                    previous = this.addedItems.find(function (mediaItem) { return mediaItem.media.v_id === item.v_id; });
                    this.addedItems = this.addedItems.filter(function (mediaItem) { return mediaItem.media.v_id !== item.v_id; });
                }

                if (previous && this.shouldAutoUpload) {
                    this.deletePendingMedia(previous.pendingMediaId);
                }

                this.onDeleted(item);
            },

            /**
             * @param {Object[]} items
             * @return {Media[]}
             */
            mapObjectsToMedia: function mapObjectsToMedia(items) {
                return items.map(function (item) {
                    var m = Media.fromObject(item);
                    m.v_id = item.v_id || m.v_id;
                    return m;
                })
            },

            /**
             * Filters "mediaItems" param based on collectionName
             * @param {Media[]} mediaItems
             * @return {Media[]}
             */
            filterMedia: function filterMedia(mediaItems) {
                var this$1 = this;

                return mediaItems.filter(function (item) { return item.collection_name === this$1.collectionName; })
            },

            /**
             * @param {Media} media
             */
            storePendingMedia: function storePendingMedia(media) {
                var this$1 = this;

                return new Promise(function (resolve, reject) {
                    this$1.uploadingMedia.push({media: media, progress: 0});

                    var data = new FormData();
                    data.set('collection_name', this$1.collectionName);
                    data.set('model_class', this$1.uploadModelClass);
                    data.set('media[file]', media.file);

                    var config = {
                        onUploadProgress: function (progressEvent) { return this$1.onUploadProgress(media, progressEvent); },
                    };

                    this$1.axios
                        .post(this$1.pendingStoreUrl, data, config)
                        .then(function (ref) {
                            var data = ref.data;

                            this$1.removeUploadingMedia(media);
                            resolve({pendingMediaId: data.id});
                        })
                        .catch(function (error) {
                            console.error(error);
                            reject(error);
                        });
                })
            },

            /**
             * @param {Media} media
             * @param {Number} pendingMediaId
             */
            updatePendingMedia: function updatePendingMedia(media, pendingMediaId) {
                var this$1 = this;

                return new Promise(function (resolve, reject) {
                    this$1.uploadingMedia.push({media: media, progress: 0});

                    var data = new FormData();
                    data.set('_method', 'PUT'); // we cannot send 'multipart/form-data' wit PUT request method
                    data.set('collection_name', this$1.collectionName);
                    data.set('model_class', this$1.uploadModelClass);
                    data.set('media[file]', media.file);

                    var config = {
                        onUploadProgress: function (progressEvent) { return this$1.onUploadProgress(media, progressEvent); },
                    };

                    this$1.axios
                        .post(this$1.pendingUpdateUrl.replace('{id}', ("" + pendingMediaId)), data, config)
                        .then(function (ref) {
                            var data = ref.data;

                            resolve(data);
                        })
                        .catch(function (error) {
                            console.error(error);
                            reject(error);
                        });
                })
            },

            /**
             * @param {Number} pendingMediaId
             */
            deletePendingMedia: function deletePendingMedia(pendingMediaId) {
                var this$1 = this;

                return new Promise(function (resolve, reject) {
                    this$1.axios
                        .delete(this$1.pendingDeleteUrl.replace('{id}', ("" + pendingMediaId)))
                        .then(function (ref) {
                            var data = ref.data;

                            resolve(data);
                        })
                        .catch(function (error) {
                            console.error(error);
                            reject(error);
                        });
                })
            },

            onUploadProgress: function onUploadProgress(media, progressEvent) {
                var totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

                if (totalLength !== null) {
                    this.updateProgressValue(media, Math.round((progressEvent.loaded * 100) / totalLength));
                }
            },

            updateProgressValue: function updateProgressValue(media, value) {
                this.uploadingMedia = this.uploadingMedia.map(function (item) {
                    if (item.media.v_id === media.v_id) {
                        item.progress = value;
                    }
                    return item;
                });
            },

            removeUploadingMedia: function removeUploadingMedia(media) {
                this.uploadingMedia = this.uploadingMedia.filter(function (item) { return item.media.v_id !== media.v_id; });
            },

            /**
             *
             * @param {FormData} formData
             */
            fillFormData: function fillFormData(formData) {
                var this$1 = this;

                this.addedItems.forEach(function (item) {
                    if (item.pendingMediaId !== undefined) {
                        formData.append(("media[store][" + (this$1.collectionName) + "][][pending_media_id]"), item.pendingMediaId);
                    } else {
                        formData.append(("media[store][" + (this$1.collectionName) + "][][file]"), item.media.file);
                    }
                });

                this.updatedItems.forEach(function (item, index) {
                    formData.set(("media[update][" + index + "][id]"), item.media.id);
                    if (item.pendingMediaId !== undefined) {
                        formData.set(("media[update][" + index + "][pending_media_id]"), item.pendingMediaId);
                    } else {
                        formData.set(("media[update][" + index + "][file]"), item.media.file);
                    }
                });

                this.deletedItems.forEach(function (item) {
                    formData.append('media[delete][]', item.id);
                });
            },
            onCreated: function onCreated(item) {
                this.$emit('created', item);
                this.$emit('input', this.items);
            },
            onUpdated: function onUpdated(item) {
                this.$emit('updated', item);
                this.$emit('input', this.items);
            },
            onDeleted: function onDeleted(item) {
                this.$emit('deleted', item);
                this.$emit('input', this.items);
            },
        },
        computed: {
            pendingStoreUrl: function pendingStoreUrl() {
                return ((this.uploadBaseUrl) + "/laravel-media-library/pending");
            },
            pendingUpdateUrl: function pendingUpdateUrl() {
                return ((this.uploadBaseUrl) + "/laravel-media-library/pending/{id}");
            },
            pendingDeleteUrl: function pendingDeleteUrl() {
                return ((this.uploadBaseUrl) + "/laravel-media-library/pending/{id}");
            },
            shouldAutoUpload: function shouldAutoUpload() {
                return this.uploadBaseUrl !== undefined && this.uploadModelClass !== undefined;
            },
        }
    };

    /* script */
    var __vue_script__$h = script$h;

    /* template */
    var __vue_render__$h = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        [
          _c(_vm.viewMode, {
            tag: "component",
            attrs: {
              items: _vm.items,
              readonly: _vm.readonly,
              viewable: _vm.viewable,
              editable: _vm.editable,
              downloadable: _vm.downloadable,
              "columns-count": _vm.gridColumns,
              "squared-items": _vm.gridSquaredItems,
              "display-limit": _vm.gridDisplayLimit,
              "use-portal": _vm.usePortal,
              "portal-target": _vm.portalTarget,
              "uploading-media": _vm.uploadingMedia
            },
            on: {
              view: _vm.onView,
              download: _vm.onDownload,
              edit: _vm.onEdit,
              delete: _vm.onDelete
            }
          }),
          _vm._v(" "),
          !_vm.readonly &&
          (_vm.viewMode === "single"
            ? _vm.items.length === 0
            : _vm.limit === -1 || _vm.items.length < _vm.limit)
            ? _c("file-picker", {
                staticClass: "my-2 mx-1",
                attrs: { mode: _vm.filePickerMode, accept: _vm.accept },
                on: {
                  selected: _vm.onSelected,
                  "error:wrong_files": function(args) {
                    return _vm.$emit("error:wrong_files", args)
                  }
                },
                scopedSlots: _vm._u(
                  [
                    _vm.$scopedSlots["file-picker"]
                      ? {
                          key: "default",
                          fn: function(ref) {
                            var change = ref.change;
                            var acceptFiles = ref.accept;
                            return [
                              _vm._t("file-picker", null, {
                                change: change,
                                accept: acceptFiles
                              })
                            ]
                          }
                        }
                      : null,
                    {
                      key: "help",
                      fn: function() {
                        return [_vm._t("help")]
                      },
                      proxy: true
                    }
                  ],
                  null,
                  true
                )
              })
            : _vm._e(),
          _vm._v(" "),
          !_vm.readonly
            ? _c(
                _vm.usePortal ? "portal" : "div",
                { tag: "component", attrs: { to: _vm.portalTarget } },
                [
                  _c(
                    "modal",
                    {
                      ref: "cropperModal",
                      attrs: { size: "xl", "ok-title": "Save" },
                      on: { ok: _vm.onSave }
                    },
                    [
                      _vm.cropperMedia
                        ? _c("image-cropper", {
                            ref: "cropper",
                            attrs: {
                              image: _vm.cropperMedia.url,
                              options: _vm.cropperOptions
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return _vm._t(
                                      "cropper-tools",
                                      null,
                                      null,
                                      scope
                                    )
                                  }
                                }
                              ],
                              null,
                              true
                            )
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.viewable ? _vm._t("viewer") : _vm._e()
        ],
        2
      )
    };
    var __vue_staticRenderFns__$h = [];
    __vue_render__$h._withStripped = true;

      /* style */
      var __vue_inject_styles__$h = function (inject) {
        if (!inject) { return }
        inject("data-v-649ce0bf_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"MediaLibrary.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$h = "data-v-649ce0bf";
      /* module identifier */
      var __vue_module_identifier__$h = undefined;
      /* functional template */
      var __vue_is_functional_template__$h = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$h = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
        __vue_inject_styles__$h,
        __vue_script__$h,
        __vue_scope_id__$h,
        __vue_is_functional_template__$h,
        __vue_module_identifier__$h,
        false,
        createInjector,
        undefined,
        undefined
      );

    // Import vue component

    // Declare install function executed by Vue.use()
    function install(Vue) {
        if (install.installed) { return; }
        install.installed = true;
        Vue.component('media-library', __vue_component__$h);
    }

    // Create module definition for Vue.use()
    var plugin = {
        install: install,
    };

    // Auto-install when vue is found (eg. in browser via <script> tag)
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
        GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
        GlobalVue = global.Vue;
    }
    if (GlobalVue) {
        GlobalVue.use(plugin);
    }

    exports.default = __vue_component__$h;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
