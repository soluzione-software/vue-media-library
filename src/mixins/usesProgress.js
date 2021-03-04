export default {
    methods: {
        shouldShowProgress(uploadingMedia, item) {
            return this.getUploadingItem(uploadingMedia, item) !== undefined;
        },
        getProgressValue(uploadingMedia, item) {
            let uploadingItem = this.getUploadingItem(uploadingMedia, item);
            return uploadingItem ? uploadingItem.progress : null;
        },
        getUploadingItem(uploadingMedia, item) {
            return uploadingMedia.filter(i => i.media.v_id === item.v_id)[0];
        },
    },
}
