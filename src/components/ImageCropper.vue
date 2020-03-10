<template>
    <cropper
            ref="cropper"
            classname="v-cropper"
            :src="image"
            :stencil-props="stencilProps"
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
            }
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
            }
        }
    }
</script>

<style scoped>
    .v-cropper {
        max-height: 80vh;
    }
</style>
