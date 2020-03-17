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

        <component :is="usePortal ? 'portal' : 'template'" :to="portalTarget">
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
    import Media from "../Media.js";
    import {isDownloadable, isEditable, isViewable, usesPortal} from "../mixins";
    import LightBox from 'vue-image-lightbox';

    export default {
        name: "MediaLibrary",
        components: {ImageCropper, Modal, FilePicker, Grid, Single, LightBox},
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
                default: 'grid',
                validator(value) {
                    return [
                        'grid',
                        'single',
                        // 'list' todo:
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
                 * @var {Media[]} addedItems
                 */
                addedItems: [],
                /**
                 * @var {Media[]} updatedItems
                 */
                updatedItems: [],
                /**
                 * @var {Media[]} deletedItems
                 */
                deletedItems: [],
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
                    this.items.push(this.addItem);
                    this.$emit('added', this.addItem);
                }
            },
            onSaveCreate(){
                this.$refs.addModal.hide();

                let img = this.$refs.addCropper.getResult();

                this.dataUrlToFile(img, this.addItem)
                    .then(file => {
                        let item = this.addItem.clone();
                        item.url = item.thumbnail = img;
                        item.file = file;

                        this.items.push(item);

                        this.addedItems.push(item);

                        this.$emit('added', item);
                    })
                    .catch(reason => {
                        console.error(reason)
                    });
            },
            onSaveEdit(){
                this.$refs.editModal.hide();

                let img = this.$refs.editCropper.getResult();

                this.dataUrlToFile(img, this.editItem)
                    .then(file => {
                        this.editItem.url = img;
                        this.editItem.thumbnail = img;
                        this.editItem.file = file;

                        this.items = this.items.map(item => {
                            if (item.v_id === this.editItem.v_id){
                                item.url = img;
                                item.thumbnail = img;
                                item.file = this.editItem.file;
                            }
                            return item;
                        });

                        if (this.editItem.id){
                            let previous = this.updatedItems.find(item => item.v_id === this.editItem.v_id);
                            if (previous){
                                this.updatedItems.map(item => {
                                    return item.v_id === this.editItem.v_id ? this.editItem : item;
                                })
                            }
                            else {
                                this.updatedItems.push({...this.editItem});
                            }
                        }
                        else {
                            this.addedItems.map(item => {
                                return item.v_id === this.editItem.v_id ? this.editItem : item;
                            })
                        }

                        this.$emit('updated', this.editItem);
                    })
                    .catch(reason => {
                        console.error(reason);
                    });
            },
            async dataUrlToFile(data, item){
                return new Promise((resolve, reject) => {
                    fetch(data)
                        .then(res => res.blob())
                        .then(blob => {
                            let file = new File([blob], item.fileName,{ type: item.mimeType });
                            resolve(file);
                        })
                        .catch(reject);
                })
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
                this.addedItems = this.addedItems.filter(mediaItem => {
                    return mediaItem.v_id !== item.v_id;
                });
                this.updatedItems = this.updatedItems.filter(mediaItem => {
                    return mediaItem.v_id !== item.v_id;
                });

                if (item.id){
                    this.deletedItems.push({...item});
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
             *
             * @param {FormData} formData
             */
            fillFormData(formData){
                this.addedItems.forEach(item => {
                    formData.append(`media[store][${this.collectionName}][][file]`, item.file);
                });

                this.updatedItems.forEach(item => {
                    formData.append('media[update][][id]', item.id);
                    formData.append('media[update][][file]', item.file);
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
            }
        }
    }
</script>

<style scoped>
    >>> .vue-lb-footer-count{
        display: none;
    }
</style>
