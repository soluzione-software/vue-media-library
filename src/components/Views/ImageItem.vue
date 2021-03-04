<template>
    <div class="position-relative image-container d-flex align-items-center">
        <div v-if="squared" class="spacer"></div>
        <img
            class="image"
            :class="{'h-100': squared, 'position-absolute': squared, 't-0': squared, 'object-cover': squared}"
            :src="item.thumbnail"
            alt=""
        />

        <div v-if="showProgress" class="visible-overlay d-flex flex-column justify-content-center align-items-center">
            <div class="w-100 px-3">
                <b-progress :value="progressValue" variant="info" striped animated/>
            </div>
        </div>

        <div v-else class="d-flex flex-column justify-content-center align-items-center"
             :class="isMoreItem ? 'visible-overlay' : 'overlay'">
            <div>
                <b-link v-if="isMoreItem" class="more-link text-white display-4" @click.prevent="$emit('more', item)">
                    +{{ moreCount }}
                </b-link>
                <template v-else>
                    <b-button v-if="viewable" variant="outline-light" class="mx-1" @click="$emit('view', item)">
                        <ViewIcon/>
                    </b-button>

                    <b-button v-if="downloadable" variant="outline-light" class="mx-1" @click="$emit('download', item)">
                        <DownloadIcon/>
                    </b-button>

                    <template v-if="!readonly">

                        <b-button v-if="editable && item.id" variant="outline-light" class="mx-1"
                                  @click="$emit('edit', item)">
                            <EditIcon/>
                        </b-button>

                        <b-button variant="outline-light" class="mx-1" @click="$emit('delete', item)">
                            <DeleteIcon/>
                        </b-button>

                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {
    isDownloadable,
    isEditable,
    isViewable,
} from "../../mixins";
import DeleteIcon from "../Icons/Delete.vue";
import DownloadIcon from "../Icons/Download.vue";
import EditIcon from "../Icons/Edit.vue";
import Media from "../../Media";
import ViewIcon from "../Icons/View.vue";

export default {
    name: "ImageItem",
    components: {
        DeleteIcon,
        DownloadIcon,
        EditIcon,
        ViewIcon,
    },
    mixins: [
        isDownloadable,
        isEditable,
        isViewable,
    ],
    props: {
        item: {
            type: Object,
            required: true
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        squared: {
            type: Boolean,
            default: false,
        },
        moreCount: {
            type: Number
        },
        moreItem: {
            type: Media,
        },
        showProgress: {
            type: Boolean,
            default: false
        },
        progressValue: {
            type: Number,
            default: 0
        }
    },
    computed: {
        isMoreItem() {
            return this.moreCount !== undefined && this.moreItem !== undefined && this.moreItem.v_id === this.item.v_id;
        },
        overlayVisible() {
            return this.isMoreItem || this.viewable || this.downloadable || !this.readonly;
        }
    }
}
</script>

<style scoped>
.image {
    vertical-align: middle;
    width: 100%;
    backface-visibility: hidden;
}

.image-container:hover .overlay {
    opacity: 1;
}

.spacer {
    padding-top: 100%;
}

.t-0 {
    top: 0;
}

.fill-current {
    fill: currentColor;
}

.object-cover {
    object-fit: cover;
}

.image-container {
    overflow: hidden;
}

.overlay,
.visible-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out
}

.overlay {
    opacity: 0;
}

.image-container img {
    -webkit-transition: all .4s linear;
    transition: all .4s linear;
}

.image-container:hover img {
    -ms-transform: scale(1.2);
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
}

.image-container:hover .overlay {
    opacity: 1;
    filter: alpha(opacity=100);
}

.more-link {
    text-decoration: none;
}

</style>
