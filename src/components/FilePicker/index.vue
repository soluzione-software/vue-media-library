<template>
    <component
            :is="`${mode}-file-picker`"
            :accept="acceptFiles"
            @change="onChange"/>
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
            onChange(files){
                let file = files[0];
                if (!file){
                    console.error('File type not accepted', file);
                    return;
                }

                this.$emit('selected', file);
            },
            /**
             *
             * @param {File} file
             * @returns {File|null}
             */
            filter(file){
                return this.accept.indexOf(file.type) >= 0 || this.accept.indexOf('*') >= 0 ? file : null;
            }
        },
        computed: {
            acceptFiles(){
                return this.accept.join(',');
            }
        }
    }
</script>

<style scoped>

</style>
