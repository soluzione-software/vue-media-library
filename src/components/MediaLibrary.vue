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

        <template v-if="!readonly">
            <file-picker
                    v-if="(viewMode === 'single' && items.length === 0) || (viewMode !== 'single' && (limit === -1 || items.length < limit))"
                    class="my-2 mx-1"
                    :mode="filePickerMode"
                    :accept="accept"
                    @selected="onSelected"
            >
                <template #help>
                    <slot name="help"/>
                </template>
            </file-picker>
        </template>

        <component :is="usePortal ? 'portal' : 'div'" :to="portalTarget">
            <template v-if="!readonly">
                <modal ref="addModal" size="xl" @ok="onSaveCreate" ok-title="Save">
                    <image-cropper
                            ref="addCropper"
                            v-if="addItem"
                            :image="addItem.url"
                            :aspect-ratio="cropperAspectRatio"
                            :min-width="cropperMinWidth"
                            :max-width="cropperMaxWidth"
                            :min-height="cropperMinHeight"
                            :max-height="cropperMaxHeight"
                    />
                </modal>

                <modal ref="editModal" size="xl" @ok="onSaveEdit" ok-title="Save">
                    <image-cropper
                            ref="editCropper"
                            v-if="editItem"
                            :image="editItem.url"
                            :aspect-ratio="cropperAspectRatio"
                            :min-width="cropperMinWidth"
                            :max-width="cropperMaxWidth"
                            :min-height="cropperMinHeight"
                            :max-height="cropperMaxHeight"
                    />
                </modal>
            </template>
        </component>

        <light-box
                v-if="viewable"
                ref="lightBox"
                :media="lightBoxMedia"
                :show-light-box="false"
                :show-thumbs="false"
        />
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
    import LightBox from 'vue-image-lightbox';

    export default {
        name: "MediaLibrary",
        components: {ImageCropper, Modal, FilePicker, Grid, Single, List, LightBox},
        mixins: [isDownloadable, isEditable, isViewable, usesPortal],
        props: {
            media: {
                type: Array,
                required: true,
            },
            accept: {
                type: Array,
                default(){
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
            cropperAspectRatio: {
                type: Number
            },
            cropperMinWidth: {
                type: Number
            },
            cropperMaxWidth: {
                type: Number
            },
            cropperMinHeight: {
                type: Number
            },
            cropperMaxHeight: {
                type: Number
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
        data(){
            return {
                /**
                 * @var {Media|null} addItem
                 */
                addItem: null,
                /**
                 * @var {Media|null} editItem
                 */
                editItem: null,
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
            media(new_){
                this.items = this.filterMedia(this.mapObjectsToMedia(new_));
            }
        },
        mounted(){
            this.items = this.filterMedia(this.mapObjectsToMedia(this.media));
        },
        methods: {
            onSelected(file){
                let img = URL.createObjectURL(file); // fixme: do only for images
                this.addItem = new Media(null, this.collectionName, file.name, file.type, file, img, img);

                if (this.editable){
                    this.$nextTick(() => {
                        this.$nextTick(() => {
                            this.$refs.addModal.show()
                        })
                    })
                }
                else {
                    let item = this.addItem.clone();
                    this.items.push(item);
                    this.addedItems.push({media: item});
                    this.$emit('added', item);
                }
            },

            onSaveCreate(){
                this.$refs.addModal.hide();

                this.$refs.addCropper.getResult(blob => {
                        let item = this.blobToMedia(blob, this.addItem);

                        this.items.push(item);

                        this.$emit('added', item);

                        if (this.shouldAutoUpload){
                            this.storePendingMedia(item)
                                .then(({pendingMediaId}) => {
                                    this.addedItems.push({media: item, pendingMediaId});
                                })
                                .catch(error => {
                                    // todo: manage properly
                                    console.error(error)
                                });
                        }
                        else {
                            this.addedItems.push({media: item});
                        }
                    }, this.addItem.mime_type);
            },

            onSaveEdit(){
                this.$refs.editModal.hide();

                this.$refs.editCropper.getResult(blob => {
                    let editedMedia = this.blobToMedia(blob, this.editItem);

                    this.items = this.items.map(item => {
                        if (item.id === editedMedia.id){
                            item.url = editedMedia.url;
                            item.thumbnail = editedMedia.thumbnail;
                            item.file = editedMedia.file;
                        }
                        return item;
                    });

                    this.$emit('updated', this.editItem);

                    let previous = this.updatedItems.find(item => item.media.id === editedMedia.id);
                    if (previous){
                        this.updatedItems = this.updatedItems.map(item => {
                            if (item.media.id === editedMedia.id){
                                item.media = editedMedia;
                            }
                            return item;
                        });

                        if (this.shouldAutoUpload){
                            let updatedItem = this.updatedItems.find(item => item.media.id === editedMedia.id);

                            this.updatePendingMedia(updatedItem.media, updatedItem.pendingMediaId)
                                .then(() => {
                                    this.updatedItems = this.updatedItems.map(item => {
                                        if (item.media.id === editedMedia.id){
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
                    }
                    else if (this.shouldAutoUpload) {
                        this.storePendingMedia(editedMedia)
                            .then(({pendingMediaId}) => {
                                this.updatedItems.push({media: editedMedia, pendingMediaId});
                            })
                            .catch(error => {
                                // todo: manage properly
                                console.error(error)
                            });
                    }
                    else {
                        this.updatedItems.push({media: editedMedia});
                    }
                }, this.editItem.mime_type);
            },

            /**
             * @param {Blob} blob
             * @param {Media} item
             */
            blobToMedia(blob, item){
                let newItem = item.clone();

                let file = new File([blob], newItem.file_name,{ type: blob.type });
                let url = URL.createObjectURL(blob);
                newItem.url = newItem.thumbnail = url;
                newItem.file = file;

                return newItem;
            },

            /**
             * @param {Media} item
             */
            onView(item){
                let i = this.items.map(v => v.v_id).indexOf(item.v_id);
                this.$refs.lightBox.showImage(i);
            },
            onDownload(item){
                console.log('onDownload', item);
            },
            onEdit(item){
                this.editItem = item;
                this.$refs.editModal.show()
            },
            onDelete(item){
                if (confirm('Sure?')){ // fixme: use tailwind dialog
                    this.delete(item);
                }
            },
            delete(item){
                this.items = this.items.filter(mediaItem => {
                    return mediaItem.v_id !== item.v_id;
                });

                let previous;
                if (item.id){
                    this.deletedItems.push({...item});
                    previous = this.updatedItems.find(mediaItem => mediaItem.media.v_id === item.v_id);
                    this.updatedItems = this.updatedItems.filter(mediaItem => mediaItem.media.v_id !== item.v_id);
                }
                else {
                    previous = this.addedItems.find(mediaItem => mediaItem.media.v_id === item.v_id);
                    this.addedItems = this.addedItems.filter(mediaItem => mediaItem.media.v_id !== item.v_id);
                }

                if (previous && this.shouldAutoUpload){
                    this.deletePendingMedia(previous.pendingMediaId);
                }

                this.$emit('deleted', item)
            },

            /**
             * @param {Object[]} items
             * @return {Media[]}
             */
            mapObjectsToMedia(items){
                return items.map(item => Media.fromObject(item))
            },

            /**
             * Filters "mediaItems" param based on collectionName
             * @param {Media[]} mediaItems
             * @return {Media[]}
             */
            filterMedia(mediaItems){
                return mediaItems.filter(item => item.collection_name === this.collectionName)
            },

            /**
             * @param {Media} media
             */
            storePendingMedia(media){
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
            updatePendingMedia(media, pendingMediaId){
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
            deletePendingMedia(pendingMediaId){
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

            onUploadProgress(media, progressEvent){
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

                if (totalLength !== null) {
                    this.updateProgressValue(media, Math.round( (progressEvent.loaded * 100) / totalLength ));
                }
            },

            updateProgressValue(media, value){
                this.uploadingMedia = this.uploadingMedia.map(item => {
                    if (item.media.v_id === media.v_id){
                        item.progress = value;
                    }
                    return item;
                })
            },

            removeUploadingMedia(media){
                this.uploadingMedia = this.uploadingMedia.filter(item => item.media.v_id !== media.v_id)
            },

            /**
             *
             * @param {FormData} formData
             */
            fillFormData(formData){
                this.addedItems.forEach(item => {
                    if (item.pendingMediaId !== undefined){
                        formData.append(`media[store][${this.collectionName}][][pending_media_id]`, item.pendingMediaId);
                    }
                    else {
                        formData.append(`media[store][${this.collectionName}][][file]`, item.media.file);
                    }
                });

                this.updatedItems.forEach((item, index) => {
                    formData.set(`media[update][${index}][id]`, item.media.id);
                    if (item.pendingMediaId !== undefined){
                        formData.set(`media[update][${index}][pending_media_id]`, item.pendingMediaId);
                    }
                    else {
                        formData.set(`media[update][${index}][file]`, item.media.file);
                    }
                });

                this.deletedItems.forEach(item => {
                    formData.append('media[delete][]', item.id);
                });
            }
        },
        computed: {
            lightBoxMedia(){
                /**
                 * @param {Media} item
                 */
                return this.items.map((item) => {
                    return {thumb: item.url, src: item.url}
                })
            },
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
    >>> .vue-lb-footer-count{
        display: none;
    }
</style>
