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
                @view="(args) => {$emit('view', args)}"
                @download="(args) => {$emit('download', args)}"
                @edit="(args) => {$emit('edit', args)}"
                @delete="(args) => {$emit('delete', args)}"
        />
    </div>
</template>

<script>
    import ImageItem from "./ImageItem.vue";

    export default {
        name: "Column",
        components: {ImageItem},
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
            viewable: {
                type: Boolean,
                default: false
            },
            editable: {
                type: Boolean,
                default: false
            },
            downloadable: {
                type: Boolean,
                default: false
            },
        }
    }
</script>

<style scoped>

</style>
