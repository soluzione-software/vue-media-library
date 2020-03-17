<template>
    <div class="position-relative image-container d-flex align-items-center">
        <div v-if="squared" class="spacer"></div>
        <img
                class="image"
                :class="{'h-100': squared, 'position-absolute': squared, 't-0': squared, 'object-cover': squared}"
                :src="item.thumbnail"
                alt=""
        />
        <div class="overlay d-flex flex-column justify-content-center align-items-center">
            <div>
                <b-button v-if="isMoreItem" @click.prevent="$emit('more', item)">+{{ moreCount }}</b-button>
                <template v-else>
                    <b-button v-if="viewable" variant="outline-light" class="mx-1" @click="$emit('view', item)">
                        <Icon class="fill-current" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
                    </b-button>

                    <b-button v-if="downloadable" variant="outline-light" class="mx-1" @click="$emit('download', item)">
                        <Icon class="fill-current" d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"/>
                    </b-button>

                    <template v-if="!readonly">

                        <b-button v-if="editable" variant="outline-light" class="mx-1" @click="$emit('edit', item)">
                            <Icon class="fill-current" d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"/>
                        </b-button>

                        <b-button variant="outline-light" class="mx-1" @click="$emit('delete', item)">
                            <Icon class="fill-current" d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"/>
                        </b-button>

                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from "../Icon.vue";
    import {isDownloadable, isEditable, isViewable} from "../../mixins";
    import Media from "../../Media";
    export default {
        name: "ImageItem",
        components: {Icon},
        mixins: [isDownloadable, isEditable, isViewable],
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
        },
        computed: {
            isMoreItem(){
                return this.moreCount !== undefined && this.moreItem !== undefined && this.moreItem.v_id === this.item.v_id;
            },
            overlayVisible(){
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

    .spacer{
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
         overflow:hidden;
     }

    .image-container .overlay {
        width:100%;
        height:100%;
        position:absolute;
        overflow:hidden;
        top:0;
        left:0;
        opacity:0;
        background-color:rgba(0,0,0,0.5);
        -webkit-transition:all .4s ease-in-out;
        transition:all .4s ease-in-out
    }

    .image-container img {
        -webkit-transition:all .4s linear;
        transition:all .4s linear;
    }

    .image-container:hover img {
        -ms-transform:scale(1.2);
        -webkit-transform:scale(1.2);
        transform:scale(1.2);
    }

    .image-container:hover .overlay {
        opacity:1;
        filter:alpha(opacity=100);
    }

</style>
