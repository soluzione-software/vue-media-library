<template>
    <div>
        <component
                :is="viewMode"
                :items="items"
                :readonly="readonly"
                :viewable="viewable"
                :editable="editable"
                :downloadable="downloadable"
                @view="onView"
                @download="onDownload"
                @edit="onEdit"
                @delete="onDelete"
        />

        <template v-if="!readonly">
            <file-picker v-if="viewMode !== 'single' || items.length === 0" class="my-2 mx-1" :accept="accept" @selected="onSelected"/>

            <modal ref="addModal" :use-portal="usePortal" :portal-target="portalTarget">
                <div class="p-4 bg-white rounded-lg shadow-2xl">
                    <image-cropper v-if="addItem" ref="cropper" :image="addItem.url"/>
                    <div class="mt-4 text-center">
                        <button class="rounded border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150"
                                @click="() => { $refs.addModal.hide() }">Cancel</button>
                        <button class="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="onSaveCreate">Save</button>
                    </div>
                </div>
            </modal>

            <modal ref="editModal" :use-portal="usePortal" :portal-target="portalTarget">
                <div class="p-4 bg-white rounded-lg shadow-2xl">
                    <image-cropper v-if="editItem" ref="cropper" :image="editItem.url"/>
                    <div class="mt-4 text-center">
                        <button class="rounded border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150"
                                @click="() => { $refs.editModal.hide() }">Cancel</button>
                        <button class="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="onSaveEdit">Save</button>
                    </div>
                </div>
            </modal>
        </template>

        <modal ref="previewModal" :use-portal="usePortal" :portal-target="portalTarget">
            <div class="bg-white rounded-lg shadow-2xl">
                <img v-if="previewItem" :src="previewItem.thumbnail" class="preview" alt=""/>
            </div>
        </modal>

    </div>
</template>

<script>
    import "tailwindcss/dist/base.css";
    import "tailwindcss/dist/components.css";
    import "tailwindcss/dist/utilities.css";

    import FilePicker from "./FilePicker.vue";
    import Modal from "./Modal.vue";
    import ImageCropper from "./ImageCropper.vue";
    import Grid from "./Views/Grid.vue";
    import Single from "./Views/Single.vue";
    import Media from "../Media.js";

    export default {
        name: "MediaLibrary",
        components: {ImageCropper, Modal, FilePicker, Grid, Single},
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
            collectionName: {
                type: String,
                default: 'default',
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            viewable: {
                type: Boolean,
                default: false
            },
            editable: {
                type: Boolean,
                default: false
            },
            downloadable: {
                type: Boolean,
                default: false
            },
            usePortal: {
                type: Boolean,
                default: false,
            },
            portalTarget: {
                type: String,
                default: 'modals',
            },
        },
        data(){
            return {
                /**
                 * @var {Media|null} previewItem
                 */
                previewItem: null,
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
                this.items = new_.map(item => {
                    return Media.fromObject(item);
                });
            }
        },
        mounted(){
            this.items = this.media.map(item => {
                return Media.fromObject(item);
            });
        },
        methods: {
            onSelected(file){
                let img = URL.createObjectURL(file); // fixme: do only for images
                this.addItem = new Media(null, this.collectionName, file.name, file.type, file, img, img);

                if (this.editable){
                    this.$refs.addModal.show();
                }
                else {
                    this.items.push(this.addItem);
                    this.$emit('added', this.addItem);
                }
            },
            onSaveCreate(){
                this.$refs.addModal.hide();

                let img = this.$refs.cropper.getResult();

                this.dataUrlToFile(img, this.addItem)
                    .then(file => {
                        let item = {...this.addItem};
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

                let img = this.$refs.cropper.getResult();

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
            onView(item){
                this.previewItem = item;
                this.$refs.previewModal.show();
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
    }
</script>

<style scoped>
    .preview{
        max-height: 100vh;
    }


</style>
