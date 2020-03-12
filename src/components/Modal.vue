<template>
<!--    <component :is="usePortal ? 'portal' : 'div'" :to="portalTarget">-->
        <div v-if="visible" class="animated fadeIn faster z-50 pin fixed inset-0 w-full h-full py-3">
            <div class="fixed inset-0 bg-dark opacity-75" @click="hide"></div>
            <div :class="`max-w-${this.size}`" class="relative max-h-full z-50 animated border border-smoke-lighter border-solid shadow-inner mx-auto bg-white md:rounded md:shadow flex flex-col pb-4">
                <div class="flex justify-end">
                    <span @click="hide" class="flex flex-col justify-end">
                        <svg class="h-6 w-6 font-hairline text-grey hover:text-grey-lighter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>(Esc)</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                        </svg>
                    </span>
                </div>

                <div class="px-6 overflow-y-auto">
                    <slot></slot>
                </div>
            </div>
        </div>
<!--    </component>-->
</template>

<script>
    import {usesPortal} from "../mixins";

    export default {
        name: "Modal",
        mixins: [usesPortal],
        props: {
            size: {
                type: String,
                default: "2xl"
            },
        },
        data() {
            return {
                visible: false,

                paddingRight: 0,
                isModalOverflowing: false,
                isBodyOverflowing: false
            }
        },
        watch: {
            isModalOverflowing: function(overflowing) {
                console.log(overflowing ? "modal is overflowing" : "");
            },
            isBodyOverflowing: function(overflowing) {
                console.log(overflowing ? "body is overflowing" : "");
            }
        },
        mounted() {
            document.addEventListener("keydown", this.keydownListener);

            this._checkScrollbar();

            this._setScrollbar();
            this._adjustDialog();

            this.toggleBodyClass("add", "overflow-hidden");
        },
        destroyed() {
            document.removeEventListener("keydown", this.keydownListener);

            this._resetAdjustments();
            this._resetScrollbar();

            this.toggleBodyClass("remove", "overflow-hidden");
        },
        methods: {
            show(){
                this.visible = true;
            },
            hide(){
                this.visible = false;
            },
            keydownListener(e){
                // Close modal with 'esc' key
                if (("key" in e && (e.key === "Escape" || e.key === "Esc")) || e.keyCode === 27) {
                    this.hide();
                }
            },
            toggleBodyClass(addRemoveClass, className) {
                const el = document.body;

                if (addRemoveClass === "add") {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },

            // ----------------------------------------------------------------------
            // Thanks to:
            // https://github.com/twbs/bootstrap/blob/3b558734382ce58b51e5fc676453bfd53bba9201/js/src/modal.js
            //
            // the following methods are used to handle overflowing modals
            // ----------------------------------------------------------------------
            _adjustDialog() {
                this.isModalOverflowing =
                    this.$el.scrollHeight > document.documentElement.clientHeight;

                if (!this.isBodyOverflowing && this.isModalOverflowing) {
                    this.$el.style.paddingLeft = `${this._scrollbarWidth}px`;
                }

                if (this.isBodyOverflowing && !this.isModalOverflowing) {
                    this.$el.style.paddingRight = `${this._scrollbarWidth}px`;
                }
            },

            _resetAdjustments() {
                this.$el.style.paddingLeft = "";
                this.$el.style.paddingRight = "";
            },

            _checkScrollbar() {
                const rect = document.body.getBoundingClientRect();
                this.isBodyOverflowing = rect.left + rect.right < window.innerWidth;
                this._scrollbarWidth = this._getScrollbarWidth();
            },

            _setScrollbar() {
                if (this.isBodyOverflowing) {
                    // Adjust body padding
                    const actualPadding = document.body.style.paddingRight;
                    const calculatedPadding = $(document.body).css("padding-right");

                    this.paddingRight = actualPadding;

                    $(document.body).css(
                        "padding-right",
                        `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`
                    );
                }
            },

            _resetScrollbar() {
                // Restore body padding
                const padding = this.paddingRight;

                // Reset storing var
                this.paddingRight = 0;

                document.body.style.paddingRight = padding ? padding : 0;
            },

            _getScrollbarWidth() {
                // thx d.walsh
                const scrollDiv = document.createElement("div");
                scrollDiv.className = "modal-scrollbar-measure";
                document.body.appendChild(scrollDiv);
                const scrollbarWidth =
                    scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            }
        },
    }
</script>

<style scoped>

</style>
