<template>
    <div>
        <ul class="list-unstyled">
            <ListItem
                v-for="item in items"
                :key="item.v_id"
                :item="item"
                :show-progress="shouldShowProgress(uploadingMedia, item)"
                :progress-value="getProgressValue(uploadingMedia, item)"
                @delete="args => $emit('delete', args)"
            />
        </ul>
    </div>
</template>

<script>
import ListItem from "./ListItem.vue";
import View from "./View";
import {usesProgress} from "../../mixins";

export default {
    extends: View,
    components: {ListItem},
    mixins: [usesProgress],
}
</script>
