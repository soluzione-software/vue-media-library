<template>
    <div>
        <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded"
                @click.prevent="$refs.input.click()"
        >Select a file</button>
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