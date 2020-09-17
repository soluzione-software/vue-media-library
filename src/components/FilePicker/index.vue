<template>
    <div>
        <slot :change="onChange" :accept="acceptFiles"/>

        <component
            v-if="!$scopedSlots['default']"
            :is="`${mode}-file-picker`"
            :accept="acceptFiles"
            @change="onChange"
        />

        <div class="mt-1">
            <slot name="help"/>
        </div>
    </div>
</template>

<script>
import ButtonFilePicker from "./ButtonFilePicker.vue";
import DragFilePicker from "./DragFilePicker.vue";

export default {
    name: "FilePicker",
    components: {ButtonFilePicker, DragFilePicker},
    props: {
        accept: {
            type: Array,
            required: true,
        },
        mode: {
            type: String,
            default: 'button',
        },
    },
    methods: {
        /**
         * @param {FileList} files
         * @returns void
         */
        onChange(files) {
            let file = this.filter(files[0]);
            if (!file) {
                this.$emit('error:wrong_files', {files});
                return;
            }

            this.$emit('selected', file);
        },

        /**
         * @param {File} file
         * @returns {File|null}
         */
        filter(file) {
            return this.accept.indexOf(file.type) >= 0 || this.accept.indexOf('*') >= 0 ? file : null;
        }
    },
    computed: {
        acceptFiles() {
            return this.accept.join(',');
        }
    }
}
</script>

<style scoped>

</style>
