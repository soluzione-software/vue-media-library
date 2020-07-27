<template>
    <cropper
            ref="cropper"
            classname="v-cropper"
            :src="image"
            :aspect-ratio="aspectRatio"
            :min-crop-box-width="minWidth"
            :max-crop-box-width="maxWidth"
            :min-crop-box-height="minHeight"
            :max-crop-box-height="maxHeight"
    />
</template>

<script>
    import Cropper from 'vue-cropperjs';
    import 'cropperjs/dist/cropper.css';

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
            fillColor: {
                // from cropperjs: a color to fill any alpha values in the output canvas, the default value is transparent.
                type: String,
            },
        },
        data(){
            return {
            }
        },
        methods: {
            /**
             * @param {BlobCallback} callback
             * @param {string?} type
             * @param {number?} quality
             */
            getResult(callback, type, quality){
                this.$refs.cropper.getCroppedCanvas({
                    minWidth: this.minWidth,
                    minHeight: this.minHeight,
                    maxWidth: this.maxWidth,
                    maxHeight: this.maxHeight,
                    fillColor: this.fillColor,
                }).toBlob(callback, type, quality)
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
