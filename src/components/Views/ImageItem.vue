<template>
    <div class="relative image-container flex items-center">
        <div v-if="squared" class="spacer"></div>
        <img
                class="image"
                :class="{'h-full': squared, 'absolute': squared, 't-0': squared, 'object-cover': squared}"
                :src="item.thumbnail"
                alt=""
        />

        <div class="overlay w-full text-center">
            <button
                    type="button"
                    v-if="viewable"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded"
                    @click="$emit('view', item)"
            ><Icon d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></button>
            <button
                    type="button"
                    v-if="downloadable"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded"
                    @click="$emit('download', item)"
            ><Icon d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"/></button>
            <template v-if="!readonly">
                <button
                        type="button"
                        v-if="editable"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded ml-1"
                        @click="$emit('edit', item)"
                ><Icon d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"/></button>
                <button
                        type="button"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded ml-1"
                        @click="$emit('delete', item)"
                ><Icon d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"/></button>
            </template>
        </div>
    </div>
</template>

<script>
    import Icon from "../Icon.vue";
    import {isDownloadable, isEditable, isViewable} from "../../mixins";
    export default {
        name: "ImageItem",
        components: {Icon},
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
        },
    }
</script>

<style scoped>
    /*
        todo: use tailwind
     */
    .image {
        vertical-align: middle;
        width: 100%;
        transition: .5s ease;
        backface-visibility: hidden;
    }

    .overlay {
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
    }

    .image-container:hover .image {
        opacity: 0.3;
    }

    .image-container:hover .overlay {
        opacity: 1;
    }

    .spacer{
        padding-top: 100%;
    }
</style>
