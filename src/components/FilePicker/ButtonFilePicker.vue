<template>
    <div>
        <b-button variant="primary" @click.prevent="$refs.input.click()">Select a file</b-button>
        <input ref="input" type="file" :accept="accept" @change="() => {$emit('change', $refs.input.files)}"/>
    </div>
</template>

<script>
    export default {
        name: "ButtonFilePicker",
        props: {
            accept: {
                type: String,
                required: true,
            }
        },
    }
</script>

<style scoped>
    input{
        display: none;
    }
</style>
