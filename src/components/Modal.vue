<template>
    <component :is="usePortal ? 'portal' : 'div'" :to="portalTarget">
        <div v-if="visible" class="fixed inset-0 flex items-center justify-center">
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
    export default {
        name: "Modal",
        props: {
            noBackdropClosing: {
                type: Boolean,
                default: false,
            },
            widthContent: {
                type: Boolean,
                default: false,
            },
            usePortal: {
                type: Boolean,
                default: false,
            },
            portalTarget: {
                type: String,
                default: 'modals',
            },
        },
        data() {
            return {
                visible: false,
                backdropLeaving: false,
                cardLeaving: false,
            }
        },
        methods: {
            show(){
                this.visible = true;
            },
            hide(){
                this.visible = false;
            },
        }
    }
</script>

<style scoped>

    .w-max-content{
        width: max-content;
    }

</style>
