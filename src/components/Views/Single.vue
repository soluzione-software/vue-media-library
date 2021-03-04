<template>
    <ImageItem
            v-if="items.length > 0"
            class="mt-2"
            :item="mediaItem"
            :readonly="readonly"
            :viewable="viewable"
            :editable="editable"
            :downloadable="downloadable"
            :show-progress="progress !== undefined"
            :progress-value="progress"
            @view="(args) => {$emit('view', args)}"
            @download="(args) => {$emit('download', args)}"
            @edit="(args) => {$emit('edit', args)}"
            @delete="(args) => {$emit('delete', args)}"
    />
</template>

<script>
    import ImageItem from "./ImageItem.vue";
    import {isDownloadable, isEditable, isViewable} from "../../mixins";

    export default {
        name: "SingleView",
        components: {ImageItem},
        mixins: [isDownloadable, isEditable, isViewable],
        props: {
            items: {
                type: Array,
                default(){
                    return []
                },
            },
            readonly: {
                type: Boolean,
                default: false
            },
            uploadingMedia: {
                type: Array,
                default() {
                    return [];
                }
            },
        },
        computed: {
            mediaItem(){
                return this.items[0];
            },
            progress(){
                let uploadingMedia = this.uploadingMedia.find(item => item.media.v_id === this.mediaItem.v_id);

                return uploadingMedia !== undefined ? uploadingMedia.progress : undefined;
            }
        },
    }
</script>
