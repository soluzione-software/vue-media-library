'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vueAdvancedCropper = require('vue-advanced-cropper');
var LightBox = _interopDefault(require('vue-image-lightbox'));

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
    inject("data-v-643f4db8_0", { source: "\ninput[data-v-643f4db8]{\n    display: none;\n}\n", map: {"version":3,"sources":["/Users/yuriy/Work/packages/npm/vue-media-library/src/components/FilePicker/ButtonFilePicker.vue"],"names":[],"mappings":";AAoBA;IACA,aAAA;AACA","file":"ButtonFilePicker.vue","sourcesContent":["<template>\n    <div>\n        <b-button variant=\"primary\" @click.prevent=\"$refs.input.click()\">Select a file</b-button>\n        <input ref=\"input\" type=\"file\" :accept=\"accept\" @change=\"() => {$emit('change', $refs.input.files)}\"/>\n    </div>\n</template>\n\n<script>\n    export default {\n        name: \"ButtonFilePicker\",\n        props: {\n            accept: {\n                type: String,\n                required: true,\n            }\n        },\n    }\n</script>\n\n<style scoped>\n    input{\n        display: none;\n    }\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-643f4db8";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
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
    inject("data-v-bdeddc12_0", { source: "\np[data-v-bdeddc12]{\n    width: 100%;\n    height: 100%;\n    text-align: center;\n    font-size: 2em;\n    line-height: 170px;\n    background-color: #cecece;\n    border: 3px dashed gray;\n    color: #4a4a4a;\n    cursor: pointer;\n}\np[data-v-bdeddc12]:hover{\n    color: #242424;\n}\ninput[data-v-bdeddc12]{\n    display: none;\n}\n", map: {"version":3,"sources":["/Users/yuriy/Work/packages/npm/vue-media-library/src/components/FilePicker/DragFilePicker.vue"],"names":[],"mappings":";AAoBA;IACA,WAAA;IACA,YAAA;IACA,kBAAA;IACA,cAAA;IACA,kBAAA;IACA,yBAAA;IACA,uBAAA;IACA,cAAA;IACA,eAAA;AACA;AACA;IACA,cAAA;AACA;AACA;IACA,aAAA;AACA","file":"DragFilePicker.vue","sourcesContent":["<template>\n    <div>\n        <p @click=\"$refs.input.click()\">Drag your files here or click in this area.</p>\n        <input ref=\"input\" type=\"file\" :accept=\"accept\" @change=\"() => {$emit('change', $refs.input.files)}\">\n    </div>\n</template>\n\n<script>\n    export default {\n        name: \"DragFilePicker\",\n        props: {\n            accept: {\n                type: String,\n                required: true,\n            }\n        },\n    }\n</script>\n\n<style scoped>\n    p{\n        width: 100%;\n        height: 100%;\n        text-align: center;\n        font-size: 2em;\n        line-height: 170px;\n        background-color: #cecece;\n        border: 3px dashed gray;\n        color: #4a4a4a;\n        cursor: pointer;\n    }\n    p:hover{\n        color: #242424;\n    }\n    input{\n        display: none;\n    }\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-bdeddc12";
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = normalizeComponent(
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
        onChange: function onChange(files){
            var file = files[0];
            if (!file){
                console.error('File type not accepted', file);
                return;
            }

            this.$emit('selected', file);
        },
        /**
         *
         * @param {File} file
         * @returns {File|null}
         */
        filter: function filter(file){
            return this.accept.indexOf(file.type) >= 0 || this.accept.indexOf('*') >= 0 ? file : null;
        }
    },
    computed: {
        acceptFiles: function acceptFiles(){
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
      _c(_vm.mode + "-file-picker", {
        tag: "component",
        attrs: { accept: _vm.acceptFiles },
        on: { change: _vm.onChange }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "mt-1" }, [_vm._t("help")], 2)
    ],
    1
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-17d6119c_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = "data-v-17d6119c";
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = normalizeComponent(
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
    inject("data-v-edc9d578_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Modal.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = "data-v-edc9d578";
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = normalizeComponent(
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
    components: {Cropper: vueAdvancedCropper.Cropper},
    props: {
        image: {
            type: String,
            required: true,
        },
        aspectRatio: {
            type: Number
        },
        minWidth: {
            type: Number
        },
        maxWidth: {
            type: Number
        },
        minHeight: {
            type: Number
        },
        maxHeight: {
            type: Number
        },
    },
    data: function data(){
        return {
        }
    },
    methods: {
        getResult: function getResult(){
            return this.$refs.cropper.getResult().canvas.toDataURL();
        },
    },
    computed: {
        stencilProps: function stencilProps(){
            return {
                aspectRatio: this.aspectRatio,
            }
        },
        restrictions: function restrictions(){
            var this$1 = this;

            if (this.minWidth || this.minHeight || this.maxWidth || this.maxHeight){
                return function () {
                    return {
                        minWidth: this$1.minWidth,
                        minHeight: this$1.minHeight,
                        maxWidth: this$1.maxWidth,
                        maxHeight: this$1.maxHeight,
                    }
                }
            }
            return undefined;
        },
    }
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("cropper", {
    ref: "cropper",
    attrs: {
      classname: "v-cropper",
      src: _vm.image,
      "stencil-props": _vm.stencilProps,
      restrictions: _vm.restrictions
    }
  })
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-aba97622_0", { source: "\n.v-cropper[data-v-aba97622] {\n    max-height: 80vh;\n}\n", map: {"version":3,"sources":["/Users/yuriy/Work/packages/npm/vue-media-library/src/components/ImageCropper.vue"],"names":[],"mappings":";AAsEA;IACA,gBAAA;AACA","file":"ImageCropper.vue","sourcesContent":["<template>\n    <cropper\n            ref=\"cropper\"\n            classname=\"v-cropper\"\n            :src=\"image\"\n            :stencil-props=\"stencilProps\"\n            :restrictions=\"restrictions\"\n    />\n</template>\n\n<script>\n    import { Cropper } from 'vue-advanced-cropper'\n\n    export default {\n        name: \"ImageCropper\",\n        components: {Cropper},\n        props: {\n            image: {\n                type: String,\n                required: true,\n            },\n            aspectRatio: {\n                type: Number\n            },\n            minWidth: {\n                type: Number\n            },\n            maxWidth: {\n                type: Number\n            },\n            minHeight: {\n                type: Number\n            },\n            maxHeight: {\n                type: Number\n            },\n        },\n        data(){\n            return {\n            }\n        },\n        methods: {\n            getResult(){\n                return this.$refs.cropper.getResult().canvas.toDataURL();\n            },\n        },\n        computed: {\n            stencilProps(){\n                return {\n                    aspectRatio: this.aspectRatio,\n                }\n            },\n            restrictions(){\n                if (this.minWidth || this.minHeight || this.maxWidth || this.maxHeight){\n                    return () => {\n                        return {\n                            minWidth: this.minWidth,\n                            minHeight: this.minHeight,\n                            maxWidth: this.maxWidth,\n                            maxHeight: this.maxHeight,\n                        }\n                    }\n                }\n                return undefined;\n            },\n        }\n    }\n</script>\n\n<style scoped>\n    .v-cropper {\n        max-height: 80vh;\n    }\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = "data-v-aba97622";
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = normalizeComponent(
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
    inject("data-v-758ce62a_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Icon.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = "data-v-758ce62a";
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = normalizeComponent(
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
    inject("data-v-0ece8e32_0", { source: "\n.image[data-v-0ece8e32] {\n    vertical-align: middle;\n    width: 100%;\n    backface-visibility: hidden;\n}\n.image-container:hover .overlay[data-v-0ece8e32] {\n    opacity: 1;\n}\n.spacer[data-v-0ece8e32]{\n    padding-top: 100%;\n}\n.t-0[data-v-0ece8e32] {\n    top: 0;\n}\n.fill-current[data-v-0ece8e32] {\n    fill: currentColor;\n}\n.object-cover[data-v-0ece8e32] {\n    object-fit: cover;\n}\n.image-container[data-v-0ece8e32] {\n     overflow:hidden;\n}\n.overlay[data-v-0ece8e32],\n.visible-overlay[data-v-0ece8e32] {\n    width:100%;\n    height:100%;\n    position:absolute;\n    overflow:hidden;\n    top:0;\n    left:0;\n    background-color:rgba(0,0,0,0.5);\n    -webkit-transition:all .4s ease-in-out;\n    transition:all .4s ease-in-out\n}\n.overlay[data-v-0ece8e32] {\n    opacity:0;\n}\n.image-container img[data-v-0ece8e32] {\n    -webkit-transition:all .4s linear;\n    transition:all .4s linear;\n}\n.image-container:hover img[data-v-0ece8e32] {\n    -ms-transform:scale(1.2);\n    -webkit-transform:scale(1.2);\n    transform:scale(1.2);\n}\n.image-container:hover .overlay[data-v-0ece8e32] {\n    opacity:1;\n    filter:alpha(opacity=100);\n}\n.more-link[data-v-0ece8e32]{\n    text-decoration: none;\n}\n\n", map: {"version":3,"sources":["/Users/yuriy/Work/packages/npm/vue-media-library/src/components/Views/ImageItem.vue"],"names":[],"mappings":";AA6FA;IACA,sBAAA;IACA,WAAA;IACA,2BAAA;AACA;AAEA;IACA,UAAA;AACA;AAEA;IACA,iBAAA;AACA;AACA;IACA,MAAA;AACA;AACA;IACA,kBAAA;AACA;AACA;IACA,iBAAA;AACA;AAEA;KACA,eAAA;AACA;AAEA;;IAEA,UAAA;IACA,WAAA;IACA,iBAAA;IACA,eAAA;IACA,KAAA;IACA,MAAA;IACA,gCAAA;IACA,sCAAA;IACA;AACA;AAEA;IACA,SAAA;AACA;AAEA;IACA,iCAAA;IACA,yBAAA;AACA;AAEA;IACA,wBAAA;IACA,4BAAA;IACA,oBAAA;AACA;AAEA;IACA,SAAA;IACA,yBAAA;AACA;AAEA;IACA,qBAAA;AACA","file":"ImageItem.vue","sourcesContent":["<template>\n    <div class=\"position-relative image-container d-flex align-items-center\">\n        <div v-if=\"squared\" class=\"spacer\"></div>\n        <img\n                class=\"image\"\n                :class=\"{'h-100': squared, 'position-absolute': squared, 't-0': squared, 'object-cover': squared}\"\n                :src=\"item.thumbnail\"\n                alt=\"\"\n        />\n\n        <div v-if=\"showProgress\" class=\"visible-overlay d-flex flex-column justify-content-center align-items-center\">\n            <div class=\"w-100 px-3\">\n                <b-progress :value=\"progressValue\" variant=\"info\" striped animated/>\n            </div>\n        </div>\n\n        <div v-else class=\"d-flex flex-column justify-content-center align-items-center\" :class=\"isMoreItem ? 'visible-overlay' : 'overlay'\">\n            <div>\n                <b-link v-if=\"isMoreItem\" class=\"more-link text-white display-4\" @click.prevent=\"$emit('more', item)\">+{{ moreCount }}</b-link>\n                <template v-else>\n                    <b-button v-if=\"viewable\" variant=\"outline-light\" class=\"mx-1\" @click=\"$emit('view', item)\">\n                        <Icon class=\"fill-current\" d=\"M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z\"/>\n                    </b-button>\n\n                    <b-button v-if=\"downloadable\" variant=\"outline-light\" class=\"mx-1\" @click=\"$emit('download', item)\">\n                        <Icon class=\"fill-current\" d=\"M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z\"/>\n                    </b-button>\n\n                    <template v-if=\"!readonly\">\n\n                        <b-button v-if=\"editable && item.id\" variant=\"outline-light\" class=\"mx-1\" @click=\"$emit('edit', item)\">\n                            <Icon class=\"fill-current\" d=\"M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z\"/>\n                        </b-button>\n\n                        <b-button variant=\"outline-light\" class=\"mx-1\" @click=\"$emit('delete', item)\">\n                            <Icon class=\"fill-current\" d=\"M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z\"/>\n                        </b-button>\n\n                    </template>\n                </template>\n            </div>\n        </div>\n    </div>\n</template>\n\n<script>\n    import Icon from \"../Icon.vue\";\n    import {isDownloadable, isEditable, isViewable} from \"../../mixins\";\n    import Media from \"../../Media\";\n    export default {\n        name: \"ImageItem\",\n        components: {Icon},\n        mixins: [isDownloadable, isEditable, isViewable],\n        props: {\n            item: {\n                type: Object,\n                required: true\n            },\n            readonly: {\n                type: Boolean,\n                default: false,\n            },\n            squared: {\n                type: Boolean,\n                default: false,\n            },\n            moreCount: {\n                type: Number\n            },\n            moreItem: {\n                type: Media,\n            },\n            showProgress: {\n                type: Boolean,\n                default: false\n            },\n            progressValue: {\n                type: Number,\n                default: 0\n            }\n        },\n        computed: {\n            isMoreItem(){\n                return this.moreCount !== undefined && this.moreItem !== undefined && this.moreItem.v_id === this.item.v_id;\n            },\n            overlayVisible(){\n                return this.isMoreItem || this.viewable || this.downloadable || !this.readonly;\n            }\n        }\n    }\n</script>\n\n<style scoped>\n    .image {\n        vertical-align: middle;\n        width: 100%;\n        backface-visibility: hidden;\n    }\n\n    .image-container:hover .overlay {\n        opacity: 1;\n    }\n\n    .spacer{\n        padding-top: 100%;\n    }\n    .t-0 {\n        top: 0;\n    }\n    .fill-current {\n        fill: currentColor;\n    }\n    .object-cover {\n        object-fit: cover;\n    }\n\n    .image-container {\n         overflow:hidden;\n     }\n\n    .overlay,\n    .visible-overlay {\n        width:100%;\n        height:100%;\n        position:absolute;\n        overflow:hidden;\n        top:0;\n        left:0;\n        background-color:rgba(0,0,0,0.5);\n        -webkit-transition:all .4s ease-in-out;\n        transition:all .4s ease-in-out\n    }\n\n    .overlay {\n        opacity:0;\n    }\n\n    .image-container img {\n        -webkit-transition:all .4s linear;\n        transition:all .4s linear;\n    }\n\n    .image-container:hover img {\n        -ms-transform:scale(1.2);\n        -webkit-transform:scale(1.2);\n        transform:scale(1.2);\n    }\n\n    .image-container:hover .overlay {\n        opacity:1;\n        filter:alpha(opacity=100);\n    }\n\n    .more-link{\n        text-decoration: none;\n    }\n\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = "data-v-0ece8e32";
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = normalizeComponent(
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
    inject("data-v-fc25ab3e_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Column.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = "data-v-fc25ab3e";
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = normalizeComponent(
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
    inject("data-v-3aedfc3e_0", { source: "\n.w-full[data-v-3aedfc3e] {\n    width: 100%;\n}\n.w-1\\/2[data-v-3aedfc3e] {\n    width: 50%;\n}\n.w-1\\/3[data-v-3aedfc3e] {\n    width: 33.33%;\n}\n.w-1\\/4[data-v-3aedfc3e] {\n    width: 25%;\n}\n.w-1\\/5[data-v-3aedfc3e] {\n    width: 20%;\n}\n", map: {"version":3,"sources":["/Users/yuriy/Work/packages/npm/vue-media-library/src/components/Views/Columns.vue"],"names":[],"mappings":";AA2JA;IACA,WAAA;AACA;AAEA;IACA,UAAA;AACA;AAEA;IACA,aAAA;AACA;AAEA;IACA,UAAA;AACA;AAEA;IACA,UAAA;AACA","file":"Columns.vue","sourcesContent":["<template>\n    <div class=\"d-flex flex-wrap\">\n        <column\n                :class=\"columnClasses\"\n                v-for=\"(column, i) in columns\"\n                :key=\"i\"\n                :items=\"column\"\n                :readonly=\"readonly\"\n                :viewable=\"viewable\"\n                :editable=\"editable\"\n                :downloadable=\"downloadable\"\n                :squared-items=\"squaredItems\"\n                :more-count=\"moreCount\"\n                :more-item=\"moreItem\"\n                :uploading-media=\"uploadingMedia\"\n                @view=\"(args) => {$emit('view', args)}\"\n                @download=\"(args) => {$emit('download', args)}\"\n                @edit=\"(args) => {$emit('edit', args)}\"\n                @delete=\"(args) => {$emit('delete', args)}\"\n                @more=\"(args) => {$emit('more', args)}\"\n        />\n    </div>\n</template>\n\n<script>\n    import Column from \"./Column.vue\";\n    import {isDownloadable, isEditable, isViewable} from \"../../mixins\";\n    import Media from \"../../Media\";\n\n    const defaultColumns = {\n        'xs': 1,\n        'sm': 2,\n        'md': 3,\n        'lg': 4,\n        'xl': 5\n    };\n\n    export default {\n        name: \"Columns\",\n        components: {Column},\n        mixins: [isDownloadable, isEditable, isViewable],\n        props: {\n            items: {\n                type: Array,\n                default(){\n                    return []\n                },\n            },\n            readonly: {\n                type: Boolean,\n                default: false\n            },\n            columnsCount: {\n                type: Object,\n                default(){\n                    return defaultColumns;\n                }\n            },\n            squaredItems: {\n                type: Boolean,\n                default: false,\n            },\n            moreCount: {\n                type: Number\n            },\n            moreItem: {\n                type: Media,\n            },\n            uploadingMedia: {\n                type: Array,\n                default() {\n                    return [];\n                }\n            },\n        },\n        data(){\n            return {\n                window: {\n                    width: 0,\n                    height: 0\n                },\n                breakpoints: {\n                    // https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints\n                    'sm': 576,\n                    'md': 768,\n                    'lg': 992,\n                    'xl': 1200,\n                }\n            }\n        },\n        mounted() {\n\n        },\n        created() {\n            this.handleResize();\n            window.addEventListener('resize', this.handleResize);\n        },\n        destroyed() {\n            window.removeEventListener('resize', this.handleResize);\n        },\n        methods: {\n            chunk(array, chunks){\n                let res = [];\n\n                for (let i = 0; i < chunks; i++){\n                    res.push([]);\n                }\n\n                let current = 0;\n                array.forEach(item => {\n                    res[current].push(item);\n                    current = current + 1 < chunks ? current + 1 : 0;\n                });\n\n                return res;\n            },\n            handleResize() {\n                this.window.width = window.innerWidth;\n                this.window.height = window.innerHeight;\n            },\n            getColumnsCount(breakpoint){\n                return this.columnsCount[breakpoint] || defaultColumns[breakpoint];\n            },\n        },\n        computed: {\n            columns(){\n                let chunks = this.getColumnsCount(this.currentBreakpoint);\n\n                return this.chunk(this.items, chunks);\n            },\n            currentBreakpoint(){\n                let breakpoint = 'xs';\n\n                Object.entries(this.breakpoints).reverse().every(entry => {\n                    let br = entry[0];\n                    let size = entry[1];\n                    if (this.window.width >= size){\n                        breakpoint = br;\n                        return false;\n                    }\n                    return true;\n                });\n\n                return breakpoint;\n            },\n            columnClasses(){\n                let count = this.getColumnsCount(this.currentBreakpoint);\n                let w = count === 1 ? 'full' : `1/${count}`;\n                return `w-${w}`;\n            },\n        }\n    }\n</script>\n\n<style scoped>\n    .w-full {\n        width: 100%;\n    }\n\n    .w-1\\/2 {\n        width: 50%;\n    }\n\n    .w-1\\/3 {\n        width: 33.33%;\n    }\n\n    .w-1\\/4 {\n        width: 25%;\n    }\n\n    .w-1\\/5 {\n        width: 20%;\n    }\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$8 = "data-v-3aedfc3e";
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = normalizeComponent(
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
    inject("data-v-3140a346_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Grid.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$9 = "data-v-3140a346";
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = normalizeComponent(
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
    inject("data-v-8edbb324_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Single.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$a = "data-v-8edbb324";
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = normalizeComponent(
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
    name: "MediaLibrary",
    components: {ImageCropper: __vue_component__$4, Modal: __vue_component__$3, FilePicker: __vue_component__$2, Grid: __vue_component__$9, Single: __vue_component__$a, LightBox: LightBox},
    mixins: [isDownloadable, isEditable, isViewable, usesPortal],
    props: {
        media: {
            type: Array,
            required: true,
        },
        accept: {
            type: Array,
            default: function default$1(){
                return ['*']
            }
        },
        limit: {
            type: Number,
            default: -1,
        },
        viewMode: {
            type: String,
            default: 'grid',
            validator: function validator(value) {
                return [
                    'grid',
                    'single' ].indexOf(value) !== -1
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
        cropperAspectRatio: {
            type: Number
        },
        cropperMinWidth: {
            type: Number
        },
        cropperMaxWidth: {
            type: Number
        },
        cropperMinHeight: {
            type: Number
        },
        cropperMaxHeight: {
            type: Number
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
    data: function data(){
        return {
            /**
             * @var {Media|null} addItem
             */
            addItem: null,
            /**
             * @var {Media|null} editItem
             */
            editItem: null,
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
        media: function media(new_){
            this.items = this.filterMedia(this.mapObjectsToMedia(new_));
        }
    },
    mounted: function mounted(){
        this.items = this.filterMedia(this.mapObjectsToMedia(this.media));
    },
    methods: {
        onSelected: function onSelected(file){
            var this$1 = this;

            var img = URL.createObjectURL(file); // fixme: do only for images
            this.addItem = new Media(null, this.collectionName, file.name, file.type, file, img, img);

            if (this.editable){
                this.$nextTick(function () {
                    this$1.$nextTick(function () {
                        this$1.$refs.addModal.show();
                    });
                });
            }
            else {
                this.items.push(this.addItem);
                this.$emit('added', this.addItem);
            }
        },
        onSaveCreate: function onSaveCreate(){
            var this$1 = this;

            this.$refs.addModal.hide();

            var img = this.$refs.addCropper.getResult();

            this.dataUrlToFile(img, this.addItem)
                .then(function (file) {
                    var item = this$1.addItem.clone();
                    item.url = item.thumbnail = img;
                    item.file = file;

                    this$1.items.push(item);

                    this$1.$emit('added', item);

                    if (this$1.shouldAutoUpload){
                        this$1.storePendingMedia(item)
                            .then(function (ref) {
                                var pendingMediaId = ref.pendingMediaId;

                                this$1.addedItems.push({media: item, pendingMediaId: pendingMediaId});
                            })
                            .catch(function (error) {
                                // todo: manage properly
                                console.error(error);
                            });
                    }
                    else {
                        this$1.addedItems.push({media: item});
                    }
                })
                .catch(function (reason) {
                    console.error(reason);
                });
        },
        onSaveEdit: function onSaveEdit(){
            var this$1 = this;

            this.$refs.editModal.hide();

            var img = this.$refs.editCropper.getResult();

            this.dataUrlToFile(img, this.editItem)
                .then(function (file) {
                    var editedMedia = this$1.editItem.clone();
                    editedMedia.url = editedMedia.thumbnail = img;
                    editedMedia.file = file;

                    this$1.items = this$1.items.map(function (item) {
                        if (item.id === editedMedia.id){
                            item.url = img;
                            item.thumbnail = img;
                            item.file = this$1.editItem.file;
                        }
                        return item;
                    });

                    this$1.$emit('updated', this$1.editItem);

                    var previous = this$1.updatedItems.find(function (item) { return item.media.id === editedMedia.id; });
                    if (previous){
                        this$1.updatedItems = this$1.updatedItems.map(function (item) {
                            if (item.media.id === editedMedia.id){
                                item.media = editedMedia;
                            }
                            return item;
                        });

                        if (this$1.shouldAutoUpload){
                            var updatedItem = this$1.updatedItems.find(function (item) { return item.media.id === editedMedia.id; });

                            this$1.updatePendingMedia(updatedItem.media, updatedItem.pendingMediaId)
                                .then(function () {
                                    this$1.updatedItems = this$1.updatedItems.map(function (item) {
                                        if (item.media.id === editedMedia.id){
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
                    }
                    else if (this$1.shouldAutoUpload) {
                        this$1.storePendingMedia(editedMedia)
                            .then(function (ref) {
                                var pendingMediaId = ref.pendingMediaId;

                                this$1.updatedItems.push({media: editedMedia, pendingMediaId: pendingMediaId});
                            })
                            .catch(function (error) {
                                // todo: manage properly
                                console.error(error);
                            });
                    }
                    else {
                        this$1.updatedItems.push({media: editedMedia});
                    }
                })
                .catch(function (reason) {
                    console.error(reason);
                });
        },
        dataUrlToFile: async function dataUrlToFile(data, item){
            return new Promise(function (resolve, reject) {
                fetch(data)
                    .then(function (res) { return res.blob(); })
                    .then(function (blob) {
                        var file = new File([blob], item.fileName,{ type: item.mimeType });
                        resolve(file);
                    })
                    .catch(reject);
            })
        },

        /**
         * @param {Media} item
         */
        onView: function onView(item){
            var i = this.items.map(function (v) { return v.v_id; }).indexOf(item.v_id);
            this.$refs.lightBox.showImage(i);
        },
        onDownload: function onDownload(item){
            console.log('onDownload', item);
        },
        onEdit: function onEdit(item){
            this.editItem = item;
            this.$refs.editModal.show();
        },
        onDelete: function onDelete(item){
            if (confirm('Sure?')){ // fixme: use tailwind dialog
                this.delete(item);
            }
        },
        delete: function delete$1(item){
            this.items = this.items.filter(function (mediaItem) {
                return mediaItem.v_id !== item.v_id;
            });

            var previous;
            if (item.id){
                this.deletedItems.push(Object.assign({}, item));
                previous = this.updatedItems.find(function (mediaItem) { return mediaItem.media.v_id === item.v_id; });
                this.updatedItems = this.updatedItems.filter(function (mediaItem) { return mediaItem.media.v_id !== item.v_id; });
            }
            else {
                previous = this.addedItems.find(function (mediaItem) { return mediaItem.media.v_id === item.v_id; });
                this.addedItems = this.addedItems.filter(function (mediaItem) { return mediaItem.media.v_id !== item.v_id; });
            }

            if (previous && this.shouldAutoUpload){
                this.deletePendingMedia(previous.pendingMediaId);
            }

            this.$emit('deleted', item);
        },

        /**
         * @param {Object[]} items
         * @return {Media[]}
         */
        mapObjectsToMedia: function mapObjectsToMedia(items){
            return items.map(function (item) { return Media.fromObject(item); })
        },

        /**
         * Filters "mediaItems" param based on collectionName
         * @param {Media[]} mediaItems
         * @return {Media[]}
         */
        filterMedia: function filterMedia(mediaItems){
            var this$1 = this;

            return mediaItems.filter(function (item) { return item.collection_name === this$1.collectionName; })
        },

        /**
         * @param {Media} media
         */
        storePendingMedia: function storePendingMedia(media){
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
        updatePendingMedia: function updatePendingMedia(media, pendingMediaId){
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
        deletePendingMedia: function deletePendingMedia(pendingMediaId){
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

        onUploadProgress: function onUploadProgress(media, progressEvent){
            var totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

            if (totalLength !== null) {
                this.updateProgressValue(media, Math.round( (progressEvent.loaded * 100) / totalLength ));
            }
        },

        updateProgressValue: function updateProgressValue(media, value){
            this.uploadingMedia = this.uploadingMedia.map(function (item) {
                if (item.media.v_id === media.v_id){
                    item.progress = value;
                }
                return item;
            });
        },

        removeUploadingMedia: function removeUploadingMedia(media){
            this.uploadingMedia = this.uploadingMedia.filter(function (item) { return item.media.v_id !== media.v_id; });
        },

        /**
         *
         * @param {FormData} formData
         */
        fillFormData: function fillFormData(formData){
            var this$1 = this;

            this.addedItems.forEach(function (item) {
                if (item.pendingMediaId !== undefined){
                    formData.append(("media[store][" + (this$1.collectionName) + "][][pending_media_id]"), item.pendingMediaId);
                }
                else {
                    formData.append(("media[store][" + (this$1.collectionName) + "][][file]"), item.media.file);
                }
            });

            this.updatedItems.forEach(function (item, index) {
                formData.set(("media[update][" + index + "][id]"), item.media.id);
                if (item.pendingMediaId !== undefined){
                    formData.set(("media[update][" + index + "][pending_media_id]"), item.pendingMediaId);
                }
                else {
                    formData.set(("media[update][" + index + "][file]"), item.media.file);
                }
            });

            this.deletedItems.forEach(function (item) {
                formData.append('media[delete][]', item.id);
            });
        }
    },
    computed: {
        lightBoxMedia: function lightBoxMedia(){
            /**
             * @param {Media} item
             */
            return this.items.map(function (item) {
                return {thumb: item.url, src: item.url}
            })
        },
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
var __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function() {
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
      !_vm.readonly
        ? [
            (_vm.viewMode === "single" && _vm.items.length === 0) ||
            (_vm.viewMode !== "single" &&
              (_vm.limit === -1 || _vm.items.length < _vm.limit))
              ? _c("file-picker", {
                  staticClass: "my-2 mx-1",
                  attrs: { mode: _vm.filePickerMode, accept: _vm.accept },
                  on: { selected: _vm.onSelected },
                  scopedSlots: _vm._u(
                    [
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
              : _vm._e()
          ]
        : _vm._e(),
      _vm._v(" "),
      _c(
        _vm.usePortal ? "portal" : "div",
        { tag: "component", attrs: { to: _vm.portalTarget } },
        [
          !_vm.readonly
            ? [
                _c(
                  "modal",
                  {
                    ref: "addModal",
                    attrs: { size: "xl", "ok-title": "Save" },
                    on: { ok: _vm.onSaveCreate }
                  },
                  [
                    _vm.addItem
                      ? _c("image-cropper", {
                          ref: "addCropper",
                          attrs: {
                            image: _vm.addItem.url,
                            "aspect-ratio": _vm.cropperAspectRatio,
                            "min-width": _vm.cropperMinWidth,
                            "max-width": _vm.cropperMaxWidth,
                            "min-height": _vm.cropperMinHeight,
                            "max-height": _vm.cropperMaxHeight
                          }
                        })
                      : _vm._e()
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "modal",
                  {
                    ref: "editModal",
                    attrs: { size: "xl", "ok-title": "Save" },
                    on: { ok: _vm.onSaveEdit }
                  },
                  [
                    _vm.editItem
                      ? _c("image-cropper", {
                          ref: "editCropper",
                          attrs: {
                            image: _vm.editItem.url,
                            "aspect-ratio": _vm.cropperAspectRatio,
                            "min-width": _vm.cropperMinWidth,
                            "max-width": _vm.cropperMaxWidth,
                            "min-height": _vm.cropperMinHeight,
                            "max-height": _vm.cropperMaxHeight
                          }
                        })
                      : _vm._e()
                  ],
                  1
                )
              ]
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _vm.viewable
        ? _c("light-box", {
            ref: "lightBox",
            attrs: {
              media: _vm.lightBoxMedia,
              "show-light-box": false,
              "show-thumbs": false
            }
          })
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  var __vue_inject_styles__$b = function (inject) {
    if (!inject) { return }
    inject("data-v-d4e6b54c_0", { source: "\n[data-v-d4e6b54c] .vue-lb-footer-count{\n    display: none;\n}\n", map: {"version":3,"sources":["/Users/yuriy/Work/packages/npm/vue-media-library/src/components/MediaLibrary.vue"],"names":[],"mappings":";AAoiBA;IACA,aAAA;AACA","file":"MediaLibrary.vue","sourcesContent":["<template>\n    <div>\n        <component\n                :is=\"viewMode\"\n                :items=\"items\"\n                :readonly=\"readonly\"\n                :viewable=\"viewable\"\n                :editable=\"editable\"\n                :downloadable=\"downloadable\"\n                :columns-count=\"gridColumns\"\n                :squared-items=\"gridSquaredItems\"\n                :display-limit=\"gridDisplayLimit\"\n                :use-portal=\"usePortal\"\n                :portal-target=\"portalTarget\"\n                :uploading-media=\"uploadingMedia\"\n                @view=\"onView\"\n                @download=\"onDownload\"\n                @edit=\"onEdit\"\n                @delete=\"onDelete\"\n        />\n\n        <template v-if=\"!readonly\">\n            <file-picker\n                    v-if=\"(viewMode === 'single' && items.length === 0) || (viewMode !== 'single' && (limit === -1 || items.length < limit))\"\n                    class=\"my-2 mx-1\"\n                    :mode=\"filePickerMode\"\n                    :accept=\"accept\"\n                    @selected=\"onSelected\"\n            >\n                <template #help>\n                    <slot name=\"help\"/>\n                </template>\n            </file-picker>\n        </template>\n\n        <component :is=\"usePortal ? 'portal' : 'div'\" :to=\"portalTarget\">\n            <template v-if=\"!readonly\">\n                <modal ref=\"addModal\" size=\"xl\" @ok=\"onSaveCreate\" ok-title=\"Save\">\n                    <image-cropper\n                            ref=\"addCropper\"\n                            v-if=\"addItem\"\n                            :image=\"addItem.url\"\n                            :aspect-ratio=\"cropperAspectRatio\"\n                            :min-width=\"cropperMinWidth\"\n                            :max-width=\"cropperMaxWidth\"\n                            :min-height=\"cropperMinHeight\"\n                            :max-height=\"cropperMaxHeight\"\n                    />\n                </modal>\n\n                <modal ref=\"editModal\" size=\"xl\" @ok=\"onSaveEdit\" ok-title=\"Save\">\n                    <image-cropper\n                            ref=\"editCropper\"\n                            v-if=\"editItem\"\n                            :image=\"editItem.url\"\n                            :aspect-ratio=\"cropperAspectRatio\"\n                            :min-width=\"cropperMinWidth\"\n                            :max-width=\"cropperMaxWidth\"\n                            :min-height=\"cropperMinHeight\"\n                            :max-height=\"cropperMaxHeight\"\n                    />\n                </modal>\n            </template>\n        </component>\n\n        <light-box\n                v-if=\"viewable\"\n                ref=\"lightBox\"\n                :media=\"lightBoxMedia\"\n                :show-light-box=\"false\"\n                :show-thumbs=\"false\"\n        />\n    </div>\n</template>\n\n<script>\n    import FilePicker from \"./FilePicker/index.vue\";\n    import Modal from \"./Modal.vue\";\n    import ImageCropper from \"./ImageCropper.vue\";\n    import Grid from \"./Views/Grid.vue\";\n    import Single from \"./Views/Single.vue\";\n    import Media from \"../Media.js\";\n    import {isDownloadable, isEditable, isViewable, usesPortal} from \"../mixins\";\n    import LightBox from 'vue-image-lightbox';\n\n    export default {\n        name: \"MediaLibrary\",\n        components: {ImageCropper, Modal, FilePicker, Grid, Single, LightBox},\n        mixins: [isDownloadable, isEditable, isViewable, usesPortal],\n        props: {\n            media: {\n                type: Array,\n                required: true,\n            },\n            accept: {\n                type: Array,\n                default(){\n                    return ['*']\n                }\n            },\n            limit: {\n                type: Number,\n                default: -1,\n            },\n            viewMode: {\n                type: String,\n                default: 'grid',\n                validator(value) {\n                    return [\n                        'grid',\n                        'single',\n                        // 'list' todo:\n                    ].indexOf(value) !== -1\n                }\n            },\n            filePickerMode: {\n                type: String,\n                default: 'button',\n                validator(value) {\n                    return [\n                        'button',\n                        'drag' // fixme: make it more graceful\n                    ].indexOf(value) !== -1\n                }\n            },\n            collectionName: {\n                type: String,\n                default: 'default',\n            },\n            readonly: {\n                type: Boolean,\n                default: false,\n            },\n            cropperAspectRatio: {\n                type: Number\n            },\n            cropperMinWidth: {\n                type: Number\n            },\n            cropperMaxWidth: {\n                type: Number\n            },\n            cropperMinHeight: {\n                type: Number\n            },\n            cropperMaxHeight: {\n                type: Number\n            },\n            gridColumns: {\n                type: Object,\n            },\n            gridSquaredItems: {\n                type: Boolean,\n                default: false,\n            },\n            gridDisplayLimit: {\n                type: Number,\n                default: -1\n            },\n            uploadBaseUrl: {\n                type: String\n            },\n            uploadModelClass: {\n                type: String\n            },\n        },\n        data(){\n            return {\n                /**\n                 * @var {Media|null} addItem\n                 */\n                addItem: null,\n                /**\n                 * @var {Media|null} editItem\n                 */\n                editItem: null,\n                /**\n                 * @var {Media[]} items\n                 */\n                items: [],\n                /**\n                 * @param {Array<Object>} addedItems where each item is an Object which has media property and optional\n                 * pendingMediaId property\n                 */\n                addedItems: [],\n                /**\n                 * @param {Array<Object>} updatedItems where each item is an Object which has media property and optional\n                 * pendingMediaId property\n                 */\n                updatedItems: [],\n                /**\n                 * @var {Media[]} deletedItems\n                 */\n                deletedItems: [],\n                /**\n                 * @param {Object} uploadingMedia\n                 */\n                uploadingMedia: [],\n            }\n        },\n        watch: {\n            media(new_){\n                this.items = this.filterMedia(this.mapObjectsToMedia(new_));\n            }\n        },\n        mounted(){\n            this.items = this.filterMedia(this.mapObjectsToMedia(this.media));\n        },\n        methods: {\n            onSelected(file){\n                let img = URL.createObjectURL(file); // fixme: do only for images\n                this.addItem = new Media(null, this.collectionName, file.name, file.type, file, img, img);\n\n                if (this.editable){\n                    this.$nextTick(() => {\n                        this.$nextTick(() => {\n                            this.$refs.addModal.show()\n                        })\n                    })\n                }\n                else {\n                    this.items.push(this.addItem);\n                    this.$emit('added', this.addItem);\n                }\n            },\n            onSaveCreate(){\n                this.$refs.addModal.hide();\n\n                let img = this.$refs.addCropper.getResult();\n\n                this.dataUrlToFile(img, this.addItem)\n                    .then(file => {\n                        let item = this.addItem.clone();\n                        item.url = item.thumbnail = img;\n                        item.file = file;\n\n                        this.items.push(item);\n\n                        this.$emit('added', item);\n\n                        if (this.shouldAutoUpload){\n                            this.storePendingMedia(item)\n                                .then(({pendingMediaId}) => {\n                                    this.addedItems.push({media: item, pendingMediaId});\n                                })\n                                .catch(error => {\n                                    // todo: manage properly\n                                    console.error(error)\n                                });\n                        }\n                        else {\n                            this.addedItems.push({media: item});\n                        }\n                    })\n                    .catch(reason => {\n                        console.error(reason)\n                    });\n            },\n            onSaveEdit(){\n                this.$refs.editModal.hide();\n\n                let img = this.$refs.editCropper.getResult();\n\n                this.dataUrlToFile(img, this.editItem)\n                    .then(file => {\n                        let editedMedia = this.editItem.clone();\n                        editedMedia.url = editedMedia.thumbnail = img;\n                        editedMedia.file = file;\n\n                        this.items = this.items.map(item => {\n                            if (item.id === editedMedia.id){\n                                item.url = img;\n                                item.thumbnail = img;\n                                item.file = this.editItem.file;\n                            }\n                            return item;\n                        });\n\n                        this.$emit('updated', this.editItem);\n\n                        let previous = this.updatedItems.find(item => item.media.id === editedMedia.id);\n                        if (previous){\n                            this.updatedItems = this.updatedItems.map(item => {\n                                if (item.media.id === editedMedia.id){\n                                    item.media = editedMedia;\n                                }\n                                return item;\n                            });\n\n                            if (this.shouldAutoUpload){\n                                let updatedItem = this.updatedItems.find(item => item.media.id === editedMedia.id);\n\n                                this.updatePendingMedia(updatedItem.media, updatedItem.pendingMediaId)\n                                    .then(() => {\n                                        this.updatedItems = this.updatedItems.map(item => {\n                                            if (item.media.id === editedMedia.id){\n                                                item.pendingMediaId = updatedItem.pendingMediaId;\n                                            }\n                                            return item;\n                                        });\n                                    })\n                                    .catch(error => {\n                                        // todo: manage properly\n                                        console.error(error)\n                                    });\n                            }\n                        }\n                        else if (this.shouldAutoUpload) {\n                            this.storePendingMedia(editedMedia)\n                                .then(({pendingMediaId}) => {\n                                    this.updatedItems.push({media: editedMedia, pendingMediaId});\n                                })\n                                .catch(error => {\n                                    // todo: manage properly\n                                    console.error(error)\n                                });\n                        }\n                        else {\n                            this.updatedItems.push({media: editedMedia});\n                        }\n                    })\n                    .catch(reason => {\n                        console.error(reason);\n                    });\n            },\n            async dataUrlToFile(data, item){\n                return new Promise((resolve, reject) => {\n                    fetch(data)\n                        .then(res => res.blob())\n                        .then(blob => {\n                            let file = new File([blob], item.fileName,{ type: item.mimeType });\n                            resolve(file);\n                        })\n                        .catch(reject);\n                })\n            },\n\n            /**\n             * @param {Media} item\n             */\n            onView(item){\n                let i = this.items.map(v => v.v_id).indexOf(item.v_id);\n                this.$refs.lightBox.showImage(i);\n            },\n            onDownload(item){\n                console.log('onDownload', item);\n            },\n            onEdit(item){\n                this.editItem = item;\n                this.$refs.editModal.show()\n            },\n            onDelete(item){\n                if (confirm('Sure?')){ // fixme: use tailwind dialog\n                    this.delete(item);\n                }\n            },\n            delete(item){\n                this.items = this.items.filter(mediaItem => {\n                    return mediaItem.v_id !== item.v_id;\n                });\n\n                let previous;\n                if (item.id){\n                    this.deletedItems.push({...item});\n                    previous = this.updatedItems.find(mediaItem => mediaItem.media.v_id === item.v_id);\n                    this.updatedItems = this.updatedItems.filter(mediaItem => mediaItem.media.v_id !== item.v_id);\n                }\n                else {\n                    previous = this.addedItems.find(mediaItem => mediaItem.media.v_id === item.v_id);\n                    this.addedItems = this.addedItems.filter(mediaItem => mediaItem.media.v_id !== item.v_id);\n                }\n\n                if (previous && this.shouldAutoUpload){\n                    this.deletePendingMedia(previous.pendingMediaId);\n                }\n\n                this.$emit('deleted', item)\n            },\n\n            /**\n             * @param {Object[]} items\n             * @return {Media[]}\n             */\n            mapObjectsToMedia(items){\n                return items.map(item => Media.fromObject(item))\n            },\n\n            /**\n             * Filters \"mediaItems\" param based on collectionName\n             * @param {Media[]} mediaItems\n             * @return {Media[]}\n             */\n            filterMedia(mediaItems){\n                return mediaItems.filter(item => item.collection_name === this.collectionName)\n            },\n\n            /**\n             * @param {Media} media\n             */\n            storePendingMedia(media){\n                return new Promise((resolve, reject) => {\n                    this.uploadingMedia.push({media, progress: 0});\n\n                    let data = new FormData();\n                    data.set('collection_name', this.collectionName);\n                    data.set('model_class', this.uploadModelClass);\n                    data.set('media[file]', media.file);\n\n                    let config = {\n                        onUploadProgress: (progressEvent) => this.onUploadProgress(media, progressEvent),\n                    };\n\n                    this.axios\n                        .post(this.pendingStoreUrl, data, config)\n                        .then(({data}) => {\n                            this.removeUploadingMedia(media);\n                            resolve({pendingMediaId: data.id});\n                        })\n                        .catch(error => {\n                            console.error(error);\n                            reject(error);\n                        });\n                })\n            },\n\n            /**\n             * @param {Media} media\n             * @param {Number} pendingMediaId\n             */\n            updatePendingMedia(media, pendingMediaId){\n                return new Promise((resolve, reject) => {\n                    this.uploadingMedia.push({media, progress: 0});\n\n                    let data = new FormData();\n                    data.set('_method', 'PUT'); // we cannot send 'multipart/form-data' wit PUT request method\n                    data.set('collection_name', this.collectionName);\n                    data.set('model_class', this.uploadModelClass);\n                    data.set('media[file]', media.file);\n\n                    let config = {\n                        onUploadProgress: (progressEvent) => this.onUploadProgress(media, progressEvent),\n                    };\n\n                    this.axios\n                        .post(this.pendingUpdateUrl.replace('{id}', `${pendingMediaId}`), data, config)\n                        .then(({data}) => {\n                            resolve(data);\n                        })\n                        .catch(error => {\n                            console.error(error);\n                            reject(error);\n                        });\n                })\n            },\n\n            /**\n             * @param {Number} pendingMediaId\n             */\n            deletePendingMedia(pendingMediaId){\n                return new Promise((resolve, reject) => {\n                    this.axios\n                        .delete(this.pendingDeleteUrl.replace('{id}', `${pendingMediaId}`))\n                        .then(({data}) => {\n                            resolve(data);\n                        })\n                        .catch(error => {\n                            console.error(error);\n                            reject(error);\n                        });\n                })\n            },\n\n            onUploadProgress(media, progressEvent){\n                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');\n\n                if (totalLength !== null) {\n                    this.updateProgressValue(media, Math.round( (progressEvent.loaded * 100) / totalLength ));\n                }\n            },\n\n            updateProgressValue(media, value){\n                this.uploadingMedia = this.uploadingMedia.map(item => {\n                    if (item.media.v_id === media.v_id){\n                        item.progress = value;\n                    }\n                    return item;\n                })\n            },\n\n            removeUploadingMedia(media){\n                this.uploadingMedia = this.uploadingMedia.filter(item => item.media.v_id !== media.v_id)\n            },\n\n            /**\n             *\n             * @param {FormData} formData\n             */\n            fillFormData(formData){\n                this.addedItems.forEach(item => {\n                    if (item.pendingMediaId !== undefined){\n                        formData.append(`media[store][${this.collectionName}][][pending_media_id]`, item.pendingMediaId);\n                    }\n                    else {\n                        formData.append(`media[store][${this.collectionName}][][file]`, item.media.file);\n                    }\n                });\n\n                this.updatedItems.forEach((item, index) => {\n                    formData.set(`media[update][${index}][id]`, item.media.id);\n                    if (item.pendingMediaId !== undefined){\n                        formData.set(`media[update][${index}][pending_media_id]`, item.pendingMediaId);\n                    }\n                    else {\n                        formData.set(`media[update][${index}][file]`, item.media.file);\n                    }\n                });\n\n                this.deletedItems.forEach(item => {\n                    formData.append('media[delete][]', item.id);\n                });\n            }\n        },\n        computed: {\n            lightBoxMedia(){\n                /**\n                 * @param {Media} item\n                 */\n                return this.items.map((item) => {\n                    return {thumb: item.url, src: item.url}\n                })\n            },\n            pendingStoreUrl() {\n                return `${this.uploadBaseUrl}/laravel-media-library/pending`;\n            },\n            pendingUpdateUrl() {\n                return `${this.uploadBaseUrl}/laravel-media-library/pending/{id}`;\n            },\n            pendingDeleteUrl() {\n                return `${this.uploadBaseUrl}/laravel-media-library/pending/{id}`;\n            },\n            shouldAutoUpload() {\n                return this.uploadBaseUrl !== undefined && this.uploadModelClass !== undefined;\n            },\n        }\n    }\n</script>\n\n<style scoped>\n    >>> .vue-lb-footer-count{\n        display: none;\n    }\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$b = "data-v-d4e6b54c";
  /* module identifier */
  var __vue_module_identifier__$b = undefined;
  /* functional template */
  var __vue_is_functional_template__$b = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$b = normalizeComponent(
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

require('vue-image-lightbox/dist/vue-image-lightbox.min.css');

// Declare install function executed by Vue.use()
function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('media-library', __vue_component__$b);
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

exports.default = __vue_component__$b;
//# sourceMappingURL=index.js.map
