<template>
    <b-modal
            :id="modalId"
            :size="size"
            :static="true"
            :lazy="true"
            :ok-title="okTitle"
            @ok="(args) => {$emit('ok', args)}"
    >
        <slot></slot>
    </b-modal>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            modalId: {
                type: String,
                default(){
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
            show(){
                this.$bvModal.show(this.modalId)
            },
            hide(){
                this.$bvModal.hide(this.modalId)
            },
        },
    }
</script>

<style scoped>

</style>
