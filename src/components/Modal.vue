<template>
    <component :is="usePortal ? 'portal' : 'div'" :to="portalTarget">
        <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white z-50 bg-black opacity-75" @click="hide" title="(Esc)">
                <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
            </div>

            <transition
                    @before-leave="backdropLeaving = true"
                    @after-leave="backdropLeaving = false"
                    enter-active-class="transition-all transition-fast ease-out-quad"
                    leave-active-class="transition-all transition-medium ease-in-quad"
                    enter-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-class="opacity-100"
                    leave-to-class="opacity-0"
                    appear
            >
                <div v-if="visible">
                    <div class="absolute inset-0 bg-black opacity-75" @click="hide"></div>
                </div>
            </transition>

            <transition
                    @before-leave="cardLeaving = true"
                    @after-leave="cardLeaving = false"
                    enter-active-class="transition-all transition-fast ease-out-quad"
                    leave-active-class="transition-all transition-medium ease-in-quad"
                    enter-class="opacity-0 scale-70"
                    enter-to-class="opacity-100 scale-100"
                    leave-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-70"
                    appear
            >
                <div class="relative">
                    <slot></slot>
                </div>
            </transition>
        </div>
    </component>
</template>

<script>
    import {usesPortal} from "../mixins";

    export default {
        name: "Modal",
        mixins: [usesPortal],
        props: {
            noBackdropClosing: {
                type: Boolean,
                default: false,
            },
            widthContent: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                visible: false,
                backdropLeaving: false,
                cardLeaving: false,
            }
        },
        mounted() {
            document.addEventListener("keydown", this.keydownListener);
        },
        destroyed() {
            document.removeEventListener("keydown", this.keydownListener);
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
            }
        }
    }
</script>

<style scoped>

    .w-max-content{
        width: max-content;
    }

</style>
