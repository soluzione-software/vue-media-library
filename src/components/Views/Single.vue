<template>
    <ImageItem
            v-if="items.length > 0"
            class="mt-2"
            :item="items[0]"
            :readonly="readonly"
            :viewable="viewable"
            :editable="editable"
            :downloadable="downloadable"
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
        },
    }
</script>

<style scoped>

</style>