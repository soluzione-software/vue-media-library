<template>
    <div>
        <columns
                :items="visibleItems"
                :readonly="readonly"
                :viewable="viewable"
                :editable="editable"
                :downloadable="downloadable"
                :columns-count="columnsCount"
                :squared-items="squaredItems"
                :more-count="moreCount"
                :more-item="visibleItems[visibleItems.length - 1]"
                @view="(args) => {$emit('view', args)}"
                @download="(args) => {$emit('download', args)}"
                @edit="(args) => {$emit('edit', args)}"
                @delete="(args) => {$emit('delete', args)}"
                @more="onMore"
        />

        <modal v-if="" ref="moreModal" size="6xl" :use-portal="usePortal" :portal-target="portalTarget">
            <columns
                    :items="items"
                    :readonly="readonly"
                    :viewable="viewable"
                    :editable="editable"
                    :downloadable="downloadable"
                    :columns-count="columnsCount"
                    :squared-items="squaredItems"
                    @view="(args) => {$emit('view', args)}"
                    @download="(args) => {$emit('download', args)}"
                    @edit="(args) => {$emit('edit', args)}"
                    @delete="(args) => {$emit('delete', args)}"
            />
        </modal>
    </div>
</template>

<script>
    import Columns from "./Columns.vue";
    import {isDownloadable, isEditable, isViewable, usesPortal} from "../../mixins";
    import Modal from "../Modal.vue";

    export default {
        name: "GridView",
        components: {Columns, Modal},
        mixins: [isDownloadable, isEditable, isViewable, usesPortal],
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
            columnsCount: {
                type: Object,
            },
            squaredItems: {
                type: Boolean,
                default: false,
            },
            displayLimit: {
                type: Number,
                default: -1
            },
        },
        data(){
            return {
            }
        },
        methods: {
            onMore(item){
                this.$refs.moreModal.show();
            }
        },
        computed: {
            visibleCount(){
                return this.displayLimit > 0 ? Math.min(this.displayLimit, this.items.length) : this.items.length;
            },
            moreCount(){
                let count = this.items.length - this.visibleCount;
                return count > 0 ? count + 1 : undefined;
            },
            visibleItems(){
                return this.items.slice(0, this.visibleCount);
            }
        }
    }
</script>

<style scoped>
</style>
