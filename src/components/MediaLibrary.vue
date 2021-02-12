<template>
    <div>
        <component
            :is="viewMode"
            :items="items"
            :readonly="readonly"
            :viewable="viewable"
            :editable="editable"
            :downloadable="downloadable"
            :columns-count="gridColumns"
            :squared-items="gridSquaredItems"
            :display-limit="gridDisplayLimit"
            :use-portal="usePortal"
            :portal-target="portalTarget"
            :uploading-media="uploadingMedia"
            @view="onView"
            @download="onDownload"
            @edit="onEdit"
            @delete="onDelete"
        />

        <file-picker
            v-if="!readonly && (viewMode === 'single' ? items.length === 0 : (limit === -1 || items.length < limit))"
            class="my-2 mx-1"
            :mode="filePickerMode"
            :accept="accept"
            @selected="onSelected"
            @error:wrong_files="args => $emit('error:wrong_files', args)"
        >
            <template v-if="$scopedSlots['file-picker']" #default="{change, accept: acceptFiles}">
                <slot name="file-picker" :change="change" :accept="acceptFiles"/>
            </template>

            <template #help>
                <slot name="help"/>
            </template>
        </file-picker>

        <component
            v-if="!readonly"
            :is="usePortal ? 'portal' : 'div'"
            :to="portalTarget"
        >
            <modal
                ref="cropperModal"
                size="xl"
                @ok="onSave"
                ok-title="Save"
            >
                <image-cropper
                    ref="cropper"
                    v-if="cropperMedia"
                    :image="cropperMedia.url"
                    :options="cropperOptions"
                >
                    <slot
                        name="cropper-tools"
                        slot-scope="scope"
                        v-bind="scope"
                    />
                </image-cropper>
            </modal>
        </component>

        <slot v-if="viewable" name="viewer"/>
    </div>
</template>

<script>
import FilePicker from "./FilePicker/index.vue";
import Modal from "./Modal.vue";
import ImageCropper from "./ImageCropper.vue";
import Grid from "./Views/Grid.vue";
import Single from "./Views/Single.vue";
import List from "./Views/List.vue";
import Media from "../Media.js";
import {isDownloadable, isEditable, isViewable, usesPortal} from "../mixins";

export default {
    name: "VueMediaLibrary",
    components: {ImageCropper, Modal, FilePicker, Grid, Single, List},
    mixins: [isDownloadable, isEditable, isViewable, usesPortal],
    props: {
        media: {
            type: Array,
            required: true,
        },
        accept: {
            type: Array,
            default() {
                return ['*']
            }
        },
        limit: {
            type: Number,
            default: -1,
        },
        viewMode: {
            type: String,
            default: 'list',
            validator(value) {
                return [
                    'grid',
                    'single',
                    'list',
                ].indexOf(value) !== -1
            }
        },
        filePickerMode: {
            type: String,
            default: 'button',
            validator(value) {
                return [
                    'button',
                    'drag' // fixme: make it more graceful
                ].indexOf(value) !== -1
            }
        },
        collectionName: {
            type: String,
            default: 'default',
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        cropperOptions: {
            type: Object,
        },
        mimeType: {
            type: String,
        },
        gridColumns: {
            type: Object,
        },
        gridSquaredItems: {
            type: Boolean,
            default: false,
        },
        gridDisplayLimit: {
            type: Number,
            default: -1
        },
        uploadBaseUrl: {
            type: String
        },
        uploadModelClass: {
            type: String
        },
    },
    model: {
        prop: 'media',
    },
    data() {
        return {
            /**
             * @var {Media|null} cropperMedia
             */
            cropperMedia: null,

            /**
             * @var {boolean} creating
             */
            creating: false,

            /**
             * @var {boolean} updating
             */
            updating: false,

            /**
             * @var {Media[]} items
             */
            items: [],
            /**
             * @param {Array<Object>} addedItems where each item is an Object which has media property and optional
             * pendingMediaId property
             */
            addedItems: [],
            /**
             * @param {Array<Object>} updatedItems where each item is an Object which has media property and optional
             * pendingMediaId property
             */
            updatedItems: [],
            /**
             * @var {Media[]} deletedItems
             */
            deletedItems: [],
            /**
             * @param {Object} uploadingMedia
             */
            uploadingMedia: [],
        }
    },
    watch: {
        media(new_) {
            this.items = this.filterMedia(this.mapObjectsToMedia(new_));
        }
    },
    mounted() {
        this.items = this.filterMedia(this.mapObjectsToMedia(this.media));
    },
    methods: {
        onSelected(file) {
            let img = URL.createObjectURL(file); // fixme: do only for images

            if (this.editable) {
                this.creating = true;

                let image = new Image();
                image.onload = () => {
                    if (this.cropperMinWidth && image.width < this.cropperMinWidth) {
                        this.$emit('error:wrong_width', {image});
                    } else if (this.cropperMinHeight && image.height < this.cropperMinHeight) {
                        this.$emit('error:wrong_height', {image});
                    } else {
                        this.cropperMedia = new Media(null, this.collectionName, file.name, file.type, file, img, img);

                        this.$nextTick(() => {
                            this.$nextTick(() => {
                                this.$refs.cropperModal.show()
                            })
                        })
                    }
                }
                image.src = img;
            } else {
                let media = new Media(null, this.collectionName, file.name, file.type, file, img, img);
                this.onAdded(media);
            }
        },

        onSave() {
            this.$refs.cropperModal.hide();

            this.$refs.cropper.getResult(blob => {
                let item = this.blobToMedia(blob, this.cropperMedia);

                if (this.creating) {
                    this.onAdded(item);
                } else if (this.updating) {
                    this.onEdited(item);
                }
            }, this.mimeType || this.cropperMedia.mime_type);
        },

        /**
         * @param {Media} media
         */
        onAdded(media) {
            this.items.push(media);

            this.onCreated(media);

            if (this.shouldAutoUpload) {
                this.storePendingMedia(media)
                    .then(({pendingMediaId}) => {
                        this.addedItems.push({media, pendingMediaId});
                        this.$emit('uploaded', {media, pendingMediaId});
                    })
                    .catch(error => {
                        // todo: manage properly
                        console.error(error)
                    });
            } else {
                this.addedItems.push({media});
            }

            this.creating = false;
        },

        /**
         * @param {Media} media
         */
        onEdited(media) {
            this.items = this.items.map(item => {
                if (item.id === media.id) {
                    item.url = media.url;
                    item.thumbnail = media.thumbnail;
                    item.file = media.file;
                }
                return item;
            });

            this.onUpdated(media);

            let previous = this.updatedItems.find(item => item.media.id === media.id);
            if (previous) {
                this.updatedItems = this.updatedItems.map(item => {
                    if (item.media.id === media.id) {
                        item.media = media;
                    }
                    return item;
                });

                if (this.shouldAutoUpload) {
                    let updatedItem = this.updatedItems.find(item => item.media.id === media.id);

                    this.updatePendingMedia(updatedItem.media, updatedItem.pendingMediaId)
                        .then(() => {
                            this.updatedItems = this.updatedItems.map(item => {
                                if (item.media.id === media.id) {
                                    item.pendingMediaId = updatedItem.pendingMediaId;
                                }
                                return item;
                            });
                        })
                        .catch(error => {
                            // todo: manage properly
                            console.error(error)
                        });
                }
            } else if (this.shouldAutoUpload) {
                this.storePendingMedia(media)
                    .then(({pendingMediaId}) => {
                        this.updatedItems.push({media: media, pendingMediaId});
                    })
                    .catch(error => {
                        // todo: manage properly
                        console.error(error)
                    });
            } else {
                this.updatedItems.push({media: media});
            }

            this.updating = false;
        },

        /**
         * @param {Blob} blob
         * @param {Media} item
         */
        blobToMedia(blob, item) {
            let newItem = item.clone();

            let file = new File([blob], newItem.file_name, {type: blob.type});
            let url = URL.createObjectURL(blob);
            newItem.url = newItem.thumbnail = url;
            newItem.file = file;

            return newItem;
        },

        /**
         * @param {Media} item
         */
        onView(item) {
            let i = this.items.map(v => v.v_id).indexOf(item.v_id);
            this.$emit('view', {media: item, index: i});
        },
        onDownload(item) {
            console.log('onDownload', item);
        },
        onEdit(media) {
            this.updating = true;
            this.cropperMedia = media;
            this.$refs.cropperModal.show();
        },
        onDelete(item) {
            this.$emit('delete', {item, delete: this.delete});
        },
        delete(item) {
            this.items = this.items.filter(mediaItem => {
                return mediaItem.v_id !== item.v_id;
            });

            let previous;
            if (item.id) {
                this.deletedItems.push({...item});
                previous = this.updatedItems.find(mediaItem => mediaItem.media.v_id === item.v_id);
                this.updatedItems = this.updatedItems.filter(mediaItem => mediaItem.media.v_id !== item.v_id);
            } else {
                previous = this.addedItems.find(mediaItem => mediaItem.media.v_id === item.v_id);
                this.addedItems = this.addedItems.filter(mediaItem => mediaItem.media.v_id !== item.v_id);
            }

            if (previous && this.shouldAutoUpload) {
                this.deletePendingMedia(previous.pendingMediaId);
            }

            this.onDeleted(item);
        },

        /**
         * @param {Object[]} items
         * @return {Media[]}
         */
        mapObjectsToMedia(items) {
            return items.map(item => Media.fromObject(item))
        },

        /**
         * Filters "mediaItems" param based on collectionName
         * @param {Media[]} mediaItems
         * @return {Media[]}
         */
        filterMedia(mediaItems) {
            return mediaItems.filter(item => item.collection_name === this.collectionName)
        },

        /**
         * @param {Media} media
         */
        storePendingMedia(media) {
            return new Promise((resolve, reject) => {
                this.uploadingMedia.push({media, progress: 0});

                let data = new FormData();
                data.set('collection_name', this.collectionName);
                data.set('model_class', this.uploadModelClass);
                data.set('media[file]', media.file);

                let config = {
                    onUploadProgress: (progressEvent) => this.onUploadProgress(media, progressEvent),
                };

                this.axios
                    .post(this.pendingStoreUrl, data, config)
                    .then(({data}) => {
                        this.removeUploadingMedia(media);
                        resolve({pendingMediaId: data.id});
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            })
        },

        /**
         * @param {Media} media
         * @param {Number} pendingMediaId
         */
        updatePendingMedia(media, pendingMediaId) {
            return new Promise((resolve, reject) => {
                this.uploadingMedia.push({media, progress: 0});

                let data = new FormData();
                data.set('_method', 'PUT'); // we cannot send 'multipart/form-data' wit PUT request method
                data.set('collection_name', this.collectionName);
                data.set('model_class', this.uploadModelClass);
                data.set('media[file]', media.file);

                let config = {
                    onUploadProgress: (progressEvent) => this.onUploadProgress(media, progressEvent),
                };

                this.axios
                    .post(this.pendingUpdateUrl.replace('{id}', `${pendingMediaId}`), data, config)
                    .then(({data}) => {
                        resolve(data);
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            })
        },

        /**
         * @param {Number} pendingMediaId
         */
        deletePendingMedia(pendingMediaId) {
            return new Promise((resolve, reject) => {
                this.axios
                    .delete(this.pendingDeleteUrl.replace('{id}', `${pendingMediaId}`))
                    .then(({data}) => {
                        resolve(data);
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            })
        },

        onUploadProgress(media, progressEvent) {
            const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

            if (totalLength !== null) {
                this.updateProgressValue(media, Math.round((progressEvent.loaded * 100) / totalLength));
            }
        },

        updateProgressValue(media, value) {
            this.uploadingMedia = this.uploadingMedia.map(item => {
                if (item.media.v_id === media.v_id) {
                    item.progress = value;
                }
                return item;
            })
        },

        removeUploadingMedia(media) {
            this.uploadingMedia = this.uploadingMedia.filter(item => item.media.v_id !== media.v_id)
        },

        /**
         *
         * @param {FormData} formData
         */
        fillFormData(formData) {
            this.addedItems.forEach(item => {
                if (item.pendingMediaId !== undefined) {
                    formData.append(`media[store][${this.collectionName}][][pending_media_id]`, item.pendingMediaId);
                } else {
                    formData.append(`media[store][${this.collectionName}][][file]`, item.media.file);
                }
            });

            this.updatedItems.forEach((item, index) => {
                formData.set(`media[update][${index}][id]`, item.media.id);
                if (item.pendingMediaId !== undefined) {
                    formData.set(`media[update][${index}][pending_media_id]`, item.pendingMediaId);
                } else {
                    formData.set(`media[update][${index}][file]`, item.media.file);
                }
            });

            this.deletedItems.forEach(item => {
                formData.append('media[delete][]', item.id);
            });
        },
        onCreated(item) {
            this.$emit('created', item);
            this.$emit('input', this.items);
        },
        onUpdated(item) {
            this.$emit('updated', item);
            this.$emit('input', this.items);
        },
        onDeleted(item) {
            this.$emit('deleted', item);
            this.$emit('input', this.items);
        },
    },
    computed: {
        pendingStoreUrl() {
            return `${this.uploadBaseUrl}/laravel-media-library/pending`;
        },
        pendingUpdateUrl() {
            return `${this.uploadBaseUrl}/laravel-media-library/pending/{id}`;
        },
        pendingDeleteUrl() {
            return `${this.uploadBaseUrl}/laravel-media-library/pending/{id}`;
        },
        shouldAutoUpload() {
            return this.uploadBaseUrl !== undefined && this.uploadModelClass !== undefined;
        },
    }
}
</script>

<style scoped>
</style>
