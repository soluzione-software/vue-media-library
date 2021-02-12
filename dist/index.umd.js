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
        inject("data-v-729617df_0", { source: "\ninput[data-v-729617df] {\n    display: none;\n}\n", map: {"version":3,"sources":["/home/yuriy/gits/vue-media-library/src/components/FilePicker/ButtonFilePicker.vue"],"names":[],"mappings":";AAoBA;IACA,aAAA;AACA","file":"ButtonFilePicker.vue","sourcesContent":["<template>\n    <div>\n        <b-button variant=\"primary\" @click.prevent=\"$refs.input.click()\">Select a file</b-button>\n        <input ref=\"input\" type=\"file\" :accept=\"accept\" @change=\"() => {$emit('change', $refs.input.files)}\"/>\n    </div>\n</template>\n\n<script>\nexport default {\n    name: \"ButtonFilePicker\",\n    props: {\n        accept: {\n            type: String,\n            required: true,\n        }\n    },\n}\n</script>\n\n<style scoped>\ninput {\n    display: none;\n}\n</style>\n"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__ = "data-v-729617df";
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
        inject("data-v-156f757a_0", { source: "\np[data-v-156f757a]{\n    width: 100%;\n    height: 100%;\n    text-align: center;\n    font-size: 2em;\n    line-height: 170px;\n    background-color: #cecece;\n    border: 3px dashed gray;\n    color: #4a4a4a;\n    cursor: pointer;\n}\np[data-v-156f757a]:hover{\n    color: #242424;\n}\ninput[data-v-156f757a]{\n    display: none;\n}\n", map: {"version":3,"sources":["/home/yuriy/gits/vue-media-library/src/components/FilePicker/DragFilePicker.vue"],"names":[],"mappings":";AAoBA;IACA,WAAA;IACA,YAAA;IACA,kBAAA;IACA,cAAA;IACA,kBAAA;IACA,yBAAA;IACA,uBAAA;IACA,cAAA;IACA,eAAA;AACA;AACA;IACA,cAAA;AACA;AACA;IACA,aAAA;AACA","file":"DragFilePicker.vue","sourcesContent":["<template>\n    <div>\n        <p @click=\"$refs.input.click()\">Drag your files here or click in this area.</p>\n        <input ref=\"input\" type=\"file\" :accept=\"accept\" @change=\"() => {$emit('change', $refs.input.files)}\">\n    </div>\n</template>\n\n<script>\n    export default {\n        name: \"DragFilePicker\",\n        props: {\n            accept: {\n                type: String,\n                required: true,\n            }\n        },\n    }\n</script>\n\n<style scoped>\n    p{\n        width: 100%;\n        height: 100%;\n        text-align: center;\n        font-size: 2em;\n        line-height: 170px;\n        background-color: #cecece;\n        border: 3px dashed gray;\n        color: #4a4a4a;\n        cursor: pointer;\n    }\n    p:hover{\n        color: #242424;\n    }\n    input{\n        display: none;\n    }\n</style>"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$1 = "data-v-156f757a";
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
        inject("data-v-b780b57c_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$2 = "data-v-b780b57c";
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
        inject("data-v-16b7f8be_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Modal.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$3 = "data-v-16b7f8be";
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
        inject("data-v-51f952b9_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ImageCropper.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$4 = "data-v-51f952b9";
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

    //
    //
    //
    //
    //
    //

    var script$5 = {
        name: "Icon",
        props: {
            d: {
                type: String,
                required: true
            }
        }
    };

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
          attrs: {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "24",
            height: "24"
          }
        },
        [_c("path", { staticClass: "heroicon-ui", attrs: { d: _vm.d } })]
      )
    };
    var __vue_staticRenderFns__$5 = [];
    __vue_render__$5._withStripped = true;

      /* style */
      var __vue_inject_styles__$5 = function (inject) {
        if (!inject) { return }
        inject("data-v-33d21d2e_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Icon.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$5 = "data-v-33d21d2e";
      /* module identifier */
      var __vue_module_identifier__$5 = undefined;
      /* functional template */
      var __vue_is_functional_template__$5 = false;
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
    var script$6 = {
        name: "ImageItem",
        components: {Icon: __vue_component__$5},
        mixins: [isDownloadable, isEditable, isViewable],
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
            isMoreItem: function isMoreItem(){
                return this.moreCount !== undefined && this.moreItem !== undefined && this.moreItem.v_id === this.item.v_id;
            },
            overlayVisible: function overlayVisible(){
                return this.isMoreItem || this.viewable || this.downloadable || !this.readonly;
            }
        }
    };

    /* script */
    var __vue_script__$6 = script$6;

    /* template */
    var __vue_render__$6 = function() {
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
                            [_vm._v("+" + _vm._s(_vm.moreCount))]
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
                                  [
                                    _c("Icon", {
                                      staticClass: "fill-current",
                                      attrs: {
                                        d:
                                          "M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                                      }
                                    })
                                  ],
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
                                  [
                                    _c("Icon", {
                                      staticClass: "fill-current",
                                      attrs: {
                                        d:
                                          "M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"
                                      }
                                    })
                                  ],
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
                                        [
                                          _c("Icon", {
                                            staticClass: "fill-current",
                                            attrs: {
                                              d:
                                                "M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"
                                            }
                                          })
                                        ],
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
                                    [
                                      _c("Icon", {
                                        staticClass: "fill-current",
                                        attrs: {
                                          d:
                                            "M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"
                                        }
                                      })
                                    ],
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
    var __vue_staticRenderFns__$6 = [];
    __vue_render__$6._withStripped = true;

      /* style */
      var __vue_inject_styles__$6 = function (inject) {
        if (!inject) { return }
        inject("data-v-c6a79ff8_0", { source: "\n.image[data-v-c6a79ff8] {\n    vertical-align: middle;\n    width: 100%;\n    backface-visibility: hidden;\n}\n.image-container:hover .overlay[data-v-c6a79ff8] {\n    opacity: 1;\n}\n.spacer[data-v-c6a79ff8]{\n    padding-top: 100%;\n}\n.t-0[data-v-c6a79ff8] {\n    top: 0;\n}\n.fill-current[data-v-c6a79ff8] {\n    fill: currentColor;\n}\n.object-cover[data-v-c6a79ff8] {\n    object-fit: cover;\n}\n.image-container[data-v-c6a79ff8] {\n     overflow:hidden;\n}\n.overlay[data-v-c6a79ff8],\n.visible-overlay[data-v-c6a79ff8] {\n    width:100%;\n    height:100%;\n    position:absolute;\n    overflow:hidden;\n    top:0;\n    left:0;\n    background-color:rgba(0,0,0,0.5);\n    -webkit-transition:all .4s ease-in-out;\n    transition:all .4s ease-in-out\n}\n.overlay[data-v-c6a79ff8] {\n    opacity:0;\n}\n.image-container img[data-v-c6a79ff8] {\n    -webkit-transition:all .4s linear;\n    transition:all .4s linear;\n}\n.image-container:hover img[data-v-c6a79ff8] {\n    -ms-transform:scale(1.2);\n    -webkit-transform:scale(1.2);\n    transform:scale(1.2);\n}\n.image-container:hover .overlay[data-v-c6a79ff8] {\n    opacity:1;\n    filter:alpha(opacity=100);\n}\n.more-link[data-v-c6a79ff8]{\n    text-decoration: none;\n}\n\n", map: {"version":3,"sources":["/home/yuriy/gits/vue-media-library/src/components/Views/ImageItem.vue"],"names":[],"mappings":";AA6FA;IACA,sBAAA;IACA,WAAA;IACA,2BAAA;AACA;AAEA;IACA,UAAA;AACA;AAEA;IACA,iBAAA;AACA;AACA;IACA,MAAA;AACA;AACA;IACA,kBAAA;AACA;AACA;IACA,iBAAA;AACA;AAEA;KACA,eAAA;AACA;AAEA;;IAEA,UAAA;IACA,WAAA;IACA,iBAAA;IACA,eAAA;IACA,KAAA;IACA,MAAA;IACA,gCAAA;IACA,sCAAA;IACA;AACA;AAEA;IACA,SAAA;AACA;AAEA;IACA,iCAAA;IACA,yBAAA;AACA;AAEA;IACA,wBAAA;IACA,4BAAA;IACA,oBAAA;AACA;AAEA;IACA,SAAA;IACA,yBAAA;AACA;AAEA;IACA,qBAAA;AACA","file":"ImageItem.vue","sourcesContent":["<template>\n    <div class=\"position-relative image-container d-flex align-items-center\">\n        <div v-if=\"squared\" class=\"spacer\"></div>\n        <img\n                class=\"image\"\n                :class=\"{'h-100': squared, 'position-absolute': squared, 't-0': squared, 'object-cover': squared}\"\n                :src=\"item.thumbnail\"\n                alt=\"\"\n        />\n\n        <div v-if=\"showProgress\" class=\"visible-overlay d-flex flex-column justify-content-center align-items-center\">\n            <div class=\"w-100 px-3\">\n                <b-progress :value=\"progressValue\" variant=\"info\" striped animated/>\n            </div>\n        </div>\n\n        <div v-else class=\"d-flex flex-column justify-content-center align-items-center\" :class=\"isMoreItem ? 'visible-overlay' : 'overlay'\">\n            <div>\n                <b-link v-if=\"isMoreItem\" class=\"more-link text-white display-4\" @click.prevent=\"$emit('more', item)\">+{{ moreCount }}</b-link>\n                <template v-else>\n                    <b-button v-if=\"viewable\" variant=\"outline-light\" class=\"mx-1\" @click=\"$emit('view', item)\">\n                        <Icon class=\"fill-current\" d=\"M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z\"/>\n                    </b-button>\n\n                    <b-button v-if=\"downloadable\" variant=\"outline-light\" class=\"mx-1\" @click=\"$emit('download', item)\">\n                        <Icon class=\"fill-current\" d=\"M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z\"/>\n                    </b-button>\n\n                    <template v-if=\"!readonly\">\n\n                        <b-button v-if=\"editable && item.id\" variant=\"outline-light\" class=\"mx-1\" @click=\"$emit('edit', item)\">\n                            <Icon class=\"fill-current\" d=\"M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z\"/>\n                        </b-button>\n\n                        <b-button variant=\"outline-light\" class=\"mx-1\" @click=\"$emit('delete', item)\">\n                            <Icon class=\"fill-current\" d=\"M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z\"/>\n                        </b-button>\n\n                    </template>\n                </template>\n            </div>\n        </div>\n    </div>\n</template>\n\n<script>\n    import Icon from \"../Icon.vue\";\n    import {isDownloadable, isEditable, isViewable} from \"../../mixins\";\n    import Media from \"../../Media\";\n    export default {\n        name: \"ImageItem\",\n        components: {Icon},\n        mixins: [isDownloadable, isEditable, isViewable],\n        props: {\n            item: {\n                type: Object,\n                required: true\n            },\n            readonly: {\n                type: Boolean,\n                default: false,\n            },\n            squared: {\n                type: Boolean,\n                default: false,\n            },\n            moreCount: {\n                type: Number\n            },\n            moreItem: {\n                type: Media,\n            },\n            showProgress: {\n                type: Boolean,\n                default: false\n            },\n            progressValue: {\n                type: Number,\n                default: 0\n            }\n        },\n        computed: {\n            isMoreItem(){\n                return this.moreCount !== undefined && this.moreItem !== undefined && this.moreItem.v_id === this.item.v_id;\n            },\n            overlayVisible(){\n                return this.isMoreItem || this.viewable || this.downloadable || !this.readonly;\n            }\n        }\n    }\n</script>\n\n<style scoped>\n    .image {\n        vertical-align: middle;\n        width: 100%;\n        backface-visibility: hidden;\n    }\n\n    .image-container:hover .overlay {\n        opacity: 1;\n    }\n\n    .spacer{\n        padding-top: 100%;\n    }\n    .t-0 {\n        top: 0;\n    }\n    .fill-current {\n        fill: currentColor;\n    }\n    .object-cover {\n        object-fit: cover;\n    }\n\n    .image-container {\n         overflow:hidden;\n     }\n\n    .overlay,\n    .visible-overlay {\n        width:100%;\n        height:100%;\n        position:absolute;\n        overflow:hidden;\n        top:0;\n        left:0;\n        background-color:rgba(0,0,0,0.5);\n        -webkit-transition:all .4s ease-in-out;\n        transition:all .4s ease-in-out\n    }\n\n    .overlay {\n        opacity:0;\n    }\n\n    .image-container img {\n        -webkit-transition:all .4s linear;\n        transition:all .4s linear;\n    }\n\n    .image-container:hover img {\n        -ms-transform:scale(1.2);\n        -webkit-transform:scale(1.2);\n        transform:scale(1.2);\n    }\n\n    .image-container:hover .overlay {\n        opacity:1;\n        filter:alpha(opacity=100);\n    }\n\n    .more-link{\n        text-decoration: none;\n    }\n\n</style>\n"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$6 = "data-v-c6a79ff8";
      /* module identifier */
      var __vue_module_identifier__$6 = undefined;
      /* functional template */
      var __vue_is_functional_template__$6 = false;
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
        createInjector,
        undefined,
        undefined
      );

    //

    var script$7 = {
        name: "Column",
        components: {ImageItem: __vue_component__$6},
        mixins: [isDownloadable, isEditable, isViewable],
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
        computed: {
            progress: function progress(){
                var obj = {};

                this.uploadingMedia.every(function (item) {
                    obj[item.media.v_id] = item.progress;
                });

                return obj;
            }
        },
    };

    /* script */
    var __vue_script__$7 = script$7;

    /* template */
    var __vue_render__$7 = function() {
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
              "show-progress": _vm.progress[item.v_id] !== undefined,
              "progress-value": _vm.progress[item.v_id]
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
    var __vue_staticRenderFns__$7 = [];
    __vue_render__$7._withStripped = true;

      /* style */
      var __vue_inject_styles__$7 = function (inject) {
        if (!inject) { return }
        inject("data-v-1fe9e964_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Column.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$7 = "data-v-1fe9e964";
      /* module identifier */
      var __vue_module_identifier__$7 = undefined;
      /* functional template */
      var __vue_is_functional_template__$7 = false;
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
        createInjector,
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

    var script$8 = {
        name: "Columns",
        components: {Column: __vue_component__$7},
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
    var __vue_script__$8 = script$8;

    /* template */
    var __vue_render__$8 = function() {
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
    var __vue_staticRenderFns__$8 = [];
    __vue_render__$8._withStripped = true;

      /* style */
      var __vue_inject_styles__$8 = function (inject) {
        if (!inject) { return }
        inject("data-v-5f7b7fe4_0", { source: "\n.w-full[data-v-5f7b7fe4] {\n    width: 100%;\n}\n.w-1\\/2[data-v-5f7b7fe4] {\n    width: 50%;\n}\n.w-1\\/3[data-v-5f7b7fe4] {\n    width: 33.33%;\n}\n.w-1\\/4[data-v-5f7b7fe4] {\n    width: 25%;\n}\n.w-1\\/5[data-v-5f7b7fe4] {\n    width: 20%;\n}\n", map: {"version":3,"sources":["/home/yuriy/gits/vue-media-library/src/components/Views/Columns.vue"],"names":[],"mappings":";AA2JA;IACA,WAAA;AACA;AAEA;IACA,UAAA;AACA;AAEA;IACA,aAAA;AACA;AAEA;IACA,UAAA;AACA;AAEA;IACA,UAAA;AACA","file":"Columns.vue","sourcesContent":["<template>\n    <div class=\"d-flex flex-wrap\">\n        <column\n                :class=\"columnClasses\"\n                v-for=\"(column, i) in columns\"\n                :key=\"i\"\n                :items=\"column\"\n                :readonly=\"readonly\"\n                :viewable=\"viewable\"\n                :editable=\"editable\"\n                :downloadable=\"downloadable\"\n                :squared-items=\"squaredItems\"\n                :more-count=\"moreCount\"\n                :more-item=\"moreItem\"\n                :uploading-media=\"uploadingMedia\"\n                @view=\"(args) => {$emit('view', args)}\"\n                @download=\"(args) => {$emit('download', args)}\"\n                @edit=\"(args) => {$emit('edit', args)}\"\n                @delete=\"(args) => {$emit('delete', args)}\"\n                @more=\"(args) => {$emit('more', args)}\"\n        />\n    </div>\n</template>\n\n<script>\n    import Column from \"./Column.vue\";\n    import {isDownloadable, isEditable, isViewable} from \"../../mixins\";\n    import Media from \"../../Media\";\n\n    const defaultColumns = {\n        'xs': 1,\n        'sm': 2,\n        'md': 3,\n        'lg': 4,\n        'xl': 5\n    };\n\n    export default {\n        name: \"Columns\",\n        components: {Column},\n        mixins: [isDownloadable, isEditable, isViewable],\n        props: {\n            items: {\n                type: Array,\n                default(){\n                    return []\n                },\n            },\n            readonly: {\n                type: Boolean,\n                default: false\n            },\n            columnsCount: {\n                type: Object,\n                default(){\n                    return defaultColumns;\n                }\n            },\n            squaredItems: {\n                type: Boolean,\n                default: false,\n            },\n            moreCount: {\n                type: Number\n            },\n            moreItem: {\n                type: Media,\n            },\n            uploadingMedia: {\n                type: Array,\n                default() {\n                    return [];\n                }\n            },\n        },\n        data(){\n            return {\n                window: {\n                    width: 0,\n                    height: 0\n                },\n                breakpoints: {\n                    // https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints\n                    'sm': 576,\n                    'md': 768,\n                    'lg': 992,\n                    'xl': 1200,\n                }\n            }\n        },\n        mounted() {\n\n        },\n        created() {\n            this.handleResize();\n            window.addEventListener('resize', this.handleResize);\n        },\n        destroyed() {\n            window.removeEventListener('resize', this.handleResize);\n        },\n        methods: {\n            chunk(array, chunks){\n                let res = [];\n\n                for (let i = 0; i < chunks; i++){\n                    res.push([]);\n                }\n\n                let current = 0;\n                array.forEach(item => {\n                    res[current].push(item);\n                    current = current + 1 < chunks ? current + 1 : 0;\n                });\n\n                return res;\n            },\n            handleResize() {\n                this.window.width = window.innerWidth;\n                this.window.height = window.innerHeight;\n            },\n            getColumnsCount(breakpoint){\n                return this.columnsCount[breakpoint] || defaultColumns[breakpoint];\n            },\n        },\n        computed: {\n            columns(){\n                let chunks = this.getColumnsCount(this.currentBreakpoint);\n\n                return this.chunk(this.items, chunks);\n            },\n            currentBreakpoint(){\n                let breakpoint = 'xs';\n\n                Object.entries(this.breakpoints).reverse().every(entry => {\n                    let br = entry[0];\n                    let size = entry[1];\n                    if (this.window.width >= size){\n                        breakpoint = br;\n                        return false;\n                    }\n                    return true;\n                });\n\n                return breakpoint;\n            },\n            columnClasses(){\n                let count = this.getColumnsCount(this.currentBreakpoint);\n                let w = count === 1 ? 'full' : `1/${count}`;\n                return `w-${w}`;\n            },\n        }\n    }\n</script>\n\n<style scoped>\n    .w-full {\n        width: 100%;\n    }\n\n    .w-1\\/2 {\n        width: 50%;\n    }\n\n    .w-1\\/3 {\n        width: 33.33%;\n    }\n\n    .w-1\\/4 {\n        width: 25%;\n    }\n\n    .w-1\\/5 {\n        width: 20%;\n    }\n</style>\n"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$8 = "data-v-5f7b7fe4";
      /* module identifier */
      var __vue_module_identifier__$8 = undefined;
      /* functional template */
      var __vue_is_functional_template__$8 = false;
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
        createInjector,
        undefined,
        undefined
      );

    //

    var script$9 = {
        name: "GridView",
        components: {Columns: __vue_component__$8, Modal: __vue_component__$3},
        mixins: [isDownloadable, isEditable, isViewable, usesPortal],
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
            },
            squaredItems: {
                type: Boolean,
                default: false,
            },
            displayLimit: {
                type: Number,
                default: -1
            },
            uploadingMedia: {
                type: Array,
                default: function default$2() {
                    return [];
                }
            },
        },
        data: function data(){
            return {
            }
        },
        methods: {
            onMore: function onMore(){
                var this$1 = this;

                this.$nextTick(function () {
                    this$1.$nextTick(function () {
                        this$1.$refs.moreModal.show();
                    });
                });
            }
        },
        computed: {
            visibleCount: function visibleCount(){
                return this.displayLimit > 0 ? Math.min(this.displayLimit, this.items.length) : this.items.length;
            },
            moreCount: function moreCount(){
                var count = this.items.length - this.visibleCount;
                return count > 0 ? count + 1 : undefined;
            },
            visibleItems: function visibleItems(){
                return this.items.slice(0, this.visibleCount);
            }
        }
    };

    /* script */
    var __vue_script__$9 = script$9;

    /* template */
    var __vue_render__$9 = function() {
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
    var __vue_staticRenderFns__$9 = [];
    __vue_render__$9._withStripped = true;

      /* style */
      var __vue_inject_styles__$9 = function (inject) {
        if (!inject) { return }
        inject("data-v-64def040_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Grid.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$9 = "data-v-64def040";
      /* module identifier */
      var __vue_module_identifier__$9 = undefined;
      /* functional template */
      var __vue_is_functional_template__$9 = false;
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
        createInjector,
        undefined,
        undefined
      );

    //

    var script$a = {
        name: "SingleView",
        components: {ImageItem: __vue_component__$6},
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
    var __vue_script__$a = script$a;

    /* template */
    var __vue_render__$a = function() {
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
    var __vue_staticRenderFns__$a = [];
    __vue_render__$a._withStripped = true;

      /* style */
      var __vue_inject_styles__$a = function (inject) {
        if (!inject) { return }
        inject("data-v-e299d19e_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Single.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$a = "data-v-e299d19e";
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
        name: "ListView",
        components: {Icon: __vue_component__$5},
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
        }
    };

    /* script */
    var __vue_script__$b = script$b;

    /* template */
    var __vue_render__$b = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", [
        _c(
          "ul",
          { staticClass: "list-unstyled" },
          _vm._l(_vm.items, function(item) {
            return _c(
              "li",
              { key: item.v_id },
              [
                !_vm.readonly
                  ? [
                      _c(
                        "b-button",
                        {
                          staticClass: "mx-1",
                          attrs: { variant: "outline-light" },
                          on: {
                            click: function($event) {
                              return _vm.$emit("delete", item)
                            }
                          }
                        },
                        [
                          _c("Icon", {
                            staticClass: "fill-current",
                            attrs: {
                              d:
                                "M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"
                            }
                          })
                        ],
                        1
                      )
                    ]
                  : _vm._e(),
                _vm._v("\n            " + _vm._s(item.file_name) + "\n        ")
              ],
              2
            )
          }),
          0
        )
      ])
    };
    var __vue_staticRenderFns__$b = [];
    __vue_render__$b._withStripped = true;

      /* style */
      var __vue_inject_styles__$b = function (inject) {
        if (!inject) { return }
        inject("data-v-513c4474_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"List.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$b = "data-v-513c4474";
      /* module identifier */
      var __vue_module_identifier__$b = undefined;
      /* functional template */
      var __vue_is_functional_template__$b = false;
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
        createInjector,
        undefined,
        undefined
      );

    //

    var script$c = {
        name: "VueMediaLibrary",
        components: {ImageCropper: __vue_component__$4, Modal: __vue_component__$3, FilePicker: __vue_component__$2, Grid: __vue_component__$9, Single: __vue_component__$a, List: __vue_component__$b},
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
                return items.map(function (item) { return Media.fromObject(item); })
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
    var __vue_script__$c = script$c;

    /* template */
    var __vue_render__$c = function() {
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
    var __vue_staticRenderFns__$c = [];
    __vue_render__$c._withStripped = true;

      /* style */
      var __vue_inject_styles__$c = function (inject) {
        if (!inject) { return }
        inject("data-v-3cbc3d88_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"MediaLibrary.vue"}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__$c = "data-v-3cbc3d88";
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

    // Import vue component

    // Declare install function executed by Vue.use()
    function install(Vue) {
        if (install.installed) { return; }
        install.installed = true;
        Vue.component('media-library', __vue_component__$c);
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

    exports.default = __vue_component__$c;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
