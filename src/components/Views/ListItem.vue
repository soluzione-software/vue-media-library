<template>
    <li>
        <b-progress v-if="showProgress" :value="progressValue" variant="info" striped animated/>
        <template v-else-if="!readonly">
            <b-button variant="outline-light" class="mx-1" @click="$emit('delete', item)">
                <DeleteIcon/>
            </b-button>
        </template>
        {{ item.file_name }}
    </li>
</template>

<script>
import DeleteIcon from "../Icons/Delete.vue";
import {usesProgress} from "../../mixins";

export default {
    components: {
        DeleteIcon,
    },
    mixins: [
        usesProgress,
    ],
    props: {
        item: {
            type: Object,
            required: true,
        },
        readonly: {
            type: Boolean,
            default: false
        },
        showProgress: {
            type: Boolean,
            default: false,
        },
        progressValue: {
            type: Number,
        },
    },
}
</script>
