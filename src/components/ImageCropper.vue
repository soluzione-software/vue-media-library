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
            /**
             *
             * @param {BlobCallback} callback
             * @param {string?} type
             * @param {number?} quality
             */
            getResult(callback, type, quality){
                this.$refs.cropper.getResult().canvas.toBlob(callback, type, quality);
            },
        },
        computed: {
            stencilProps(){
                return {
                    aspectRatio: this.aspectRatio,
                }
            },
            restrictions(){
                if (this.minWidth || this.minHeight || this.maxWidth || this.maxHeight){
                    return () => {
                        return {
                            minWidth: this.minWidth,
                            minHeight: this.minHeight,
                            maxWidth: this.maxWidth,
                            maxHeight: this.maxHeight,
                        }
                    }
                }
                return undefined;
            },
        }
    }
</script>

<style scoped>
    .v-cropper {
        max-height: 80vh;
    }
</style>
