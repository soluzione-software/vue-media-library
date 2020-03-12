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
                @view="(args) => {$emit('view', args)}"
                @download="(args) => {$emit('download', args)}"
                @edit="(args) => {$emit('edit', args)}"
                @delete="(args) => {$emit('delete', args)}"
        />
    </div>
</template>

<script>
    import ImageItem from "./ImageItem.vue";
    import {isDownloadable, isEditable, isViewable} from "../../mixins";

    export default {
        name: "Column",
        components: {ImageItem},
        mixins: [isDownloadable, isEditable, isViewable],
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
        }
    }
</script>

<style scoped>

</style>
