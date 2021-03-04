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
            :uploading-media="uploadingMedia"
            @view="(args) => {$emit('view', args)}"
            @download="(args) => {$emit('download', args)}"
            @edit="(args) => {$emit('edit', args)}"
            @delete="(args) => {$emit('delete', args)}"
            @more="onMore"
        />

        <component :is="usePortal ? 'portal' : 'div'" :to="portalTarget">
            <modal v-if="" ref="moreModal" size="xl">
                <columns
                    :items="items"
                    :readonly="readonly"
                    :viewable="viewable"
                    :editable="editable"
                    :downloadable="downloadable"
                    :columns-count="columnsCount"
                    :squared-items="squaredItems"
                    :uploading-media="uploadingMedia"
                    @view="(args) => {$emit('view', args)}"
                    @download="(args) => {$emit('download', args)}"
                    @edit="(args) => {$emit('edit', args)}"
                    @delete="(args) => {$emit('delete', args)}"
                />
            </modal>
        </component>
    </div>
</template>

<script>
import Columns from "./Columns.vue";
import {isDownloadable, isEditable, isViewable, usesPortal} from "../../mixins";
import Modal from "../Modal.vue";
import View from "./View";

export default {
    extends: View,
    components: {
        Columns,
        Modal,
    },
    mixins: [
        isDownloadable,
        isEditable,
        isViewable,
        usesPortal,
    ],
    props: {
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
    methods: {
        onMore() {
            this.$nextTick(() => {
                this.$nextTick(() => {
                    this.$refs.moreModal.show();
                })
            });
        }
    },
    computed: {
        visibleCount() {
            return this.displayLimit > 0 ? Math.min(this.displayLimit, this.items.length) : this.items.length;
        },
        moreCount() {
            let count = this.items.length - this.visibleCount;
            return count > 0 ? count + 1 : undefined;
        },
        visibleItems() {
            return this.items.slice(0, this.visibleCount);
        }
    }
}
</script>
