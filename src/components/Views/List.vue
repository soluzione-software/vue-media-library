<template>
    <div>
        <ul class="list-unstyled">
            <li
                v-for="item in items"
                :key="item.v_id"
            >
                <template v-if="!readonly">
                    <b-button variant="outline-light" class="mx-1" @click="$emit('delete', item)">
                        <DeleteIcon/>
                    </b-button>
                </template>
                {{ item.file_name }}
            </li>
        </ul>
    </div>
</template>

<script>
import DeleteIcon from "../Icons/Delete.vue";

export default {
    name: "ListView",
    components: {DeleteIcon},
    props: {
        items: {
            type: Array,
            default() {
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
