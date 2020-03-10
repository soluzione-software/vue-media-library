<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path class="heroicon-ui" :d="d"/>
    </svg>
</template>

<script>
    export default {
        name: "Icon",
        props: {
            d: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>