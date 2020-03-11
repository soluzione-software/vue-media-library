<template>
    <cropper
            ref="cropper"
            classname="v-cropper"
            :src="image"
            :stencil-props="stencilProps"
            :restrictions="restrictions"
    />
</template>

<script>
    import { Cropper } from 'vue-advanced-cropper'

    export default {
        name: "ImageCropper",
        components: {Cropper},
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
        data(){
            return {
            }
        },
        methods: {
            getResult(){
                return this.$refs.cropper.getResult().canvas.toDataURL();
            },
        },
        computed: {
            stencilProps(){
                return {
                    aspectRatio: this.aspectRatio,
                }
            },
            restrictions(){
                return () => {
                    return {
                        minWidth: this.minWidth,
                        minHeight: this.minHeight,
                        maxWidth: this.maxWidth,
                        maxHeight: this.maxHeight,
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .v-cropper {
        max-height: 80vh;
    }
</style>
