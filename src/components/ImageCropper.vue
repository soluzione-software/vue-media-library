<template>
    <div>
        <cropper
            ref="cropper"
            :src="image"
            v-bind="options"
        />

        <div class="mt-3">
            <slot v-bind="slotBindings"/>
        </div>
    </div>
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
            options: {
                type: Object,
                default: () => {
                    return {};
                },
            },
        },
        data(){
            return {}
        },
        methods: {
            /**
             * @param {BlobCallback} callback
             * @param {string?} type
             * @param {number?} quality
             */
            getResult(callback, type, quality){
                this.$refs.cropper.getCroppedCanvas(this.options).toBlob(callback, type, quality)
            },
        },
        computed: {
            slotBindings(){
                return {
                    reset: (...args) => this.$refs.cropper.reset(...args),
                    clear: (...args) => this.$refs.cropper.clear(...args),
                    initCrop: (...args) => this.$refs.cropper.initCrop(...args),
                    replace: (...args) => this.$refs.cropper.replace(...args),
                    enable: (...args) => this.$refs.cropper.enable(...args),
                    disable: (...args) => this.$refs.cropper.disable(...args),
                    destroy: (...args) => this.$refs.cropper.destroy(...args),
                    move: (...args) => this.$refs.cropper.move(...args),
                    moveTo: (...args) => this.$refs.cropper.moveTo(...args),
                    relativeZoom: (...args) => this.$refs.cropper.relativeZoom(...args),
                    zoomTo: (...args) => this.$refs.cropper.zoomTo(...args),
                    rotate: (...args) => this.$refs.cropper.rotate(...args),
                    rotateTo: (...args) => this.$refs.cropper.rotateTo(...args),
                    scaleX: (...args) => this.$refs.cropper.scaleX(...args),
                    scaleY: (...args) => this.$refs.cropper.scaleY(...args),
                    scale: (...args) => this.$refs.cropper.scale(...args),
                    getData: (...args) => this.$refs.cropper.getData(...args),
                    setData: (...args) => this.$refs.cropper.setData(...args),
                    getContainerData: (...args) => this.$refs.cropper.getContainerData(...args),
                    getImageData: (...args) => this.$refs.cropper.getImageData(...args),
                    getCanvasData: (...args) => this.$refs.cropper.getCanvasData(...args),
                    setCanvasData: (...args) => this.$refs.cropper.setCanvasData(...args),
                    getCropBoxData: (...args) => this.$refs.cropper.getCropBoxData(...args),
                    setCropBoxData: (...args) => this.$refs.cropper.setCropBoxData(...args),
                    setAspectRatio: (...args) => this.$refs.cropper.setAspectRatio(...args),
                    setDragMode: (...args) => this.$refs.cropper.setDragMode(...args),
                };
            },
        },
    }
</script>

<style scoped>

</style>
