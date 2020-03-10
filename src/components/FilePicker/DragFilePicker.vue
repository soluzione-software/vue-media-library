<template>
    <div>
        <p @click="$refs.input.click()">Drag your files here or click in this area.</p>
        <input ref="input" type="file" :accept="accept" @change="() => {$emit('change', $refs.input.files)}">
    </div>
</template>

<script>
    export default {
        name: "DragFilePicker",
        props: {
            accept: {
                type: String,
                required: true,
            }
        },
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