<template>
    <div>
        <ul>
            <li
                v-for="item in items"
                :key="item.v_id"
            >{{ item.file_name }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "ListView",
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
            uploadingMedia: {
                type: Array,
                default() {
                    return [];
                }
            },
        }
    }
</script>

<style scoped>

</style>
