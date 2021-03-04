export default {
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
    },
}
