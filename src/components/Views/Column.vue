<template>
    <div class="column px-1">
        <ImageItem
                class="mt-2"
                v-for="item in items"
                :key="item.v_id"
                :item="item"
                :readonly="readonly"
                :viewable="viewable"
                :editable="editable"
                :downloadable="downloadable"
                :squared="squaredItems"
                :more-count="moreCount"
                :more-item="moreItem"
                :show-progress="shouldShowProgress(uploadingMedia, item)"
                :progress-value="getProgressValue(uploadingMedia, item)"
                @view="(args) => {$emit('view', args)}"
                @download="(args) => {$emit('download', args)}"
                @edit="(args) => {$emit('edit', args)}"
                @delete="(args) => {$emit('delete', args)}"
                @more="(args) => {$emit('more', args)}"
        />
    </div>
</template>

<script>
    import ImageItem from "./ImageItem.vue";
    import {
        isDownloadable,
        isEditable,
        isViewable,
        usesProgress,
    } from "../../mixins";
    import Media from "../../Media";

    export default {
        name: "Column",
        components: {ImageItem},
        mixins: [
            isDownloadable,
            isEditable,
            isViewable,
            usesProgress,
        ],
        props: {
            items: {
                type: Array,
                default(){
                    return []
                }
            },
            readonly: {
                type: Boolean,
                default: false
            },
            squaredItems: {
                type: Boolean,
                default: false,
            },
            moreCount: {
                type: Number
            },
            moreItem: {
                type: Media,
            },
            uploadingMedia: {
                type: Array,
                default() {
                    return [];
                }
            },
        },
    }
</script>
