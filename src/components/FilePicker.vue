<template>
    <div>
        <p @click="$refs.input.click()">Drag your files here or click in this area.</p>
        <input ref="input" type="file" :accept="acceptFiles" @change="onChange">
    </div>
</template>

<script>
    export default {
        name: "FilePicker",
        props: {
            accept: {
                type: Array,
                required: true,
            }
        },
        methods: {
            onChange(){
                let file = this.filter(this.$refs.input.files[0]);
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
    p{
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 2em;
        line-height: 170px;
        background-color: #cecece;
        border: 3px dashed gray;
        color: #4a4a4a;
        cursor: pointer;
    }
    p:hover{
        color: #242424;
    }
    input{
        display: none;
    }
</style>
