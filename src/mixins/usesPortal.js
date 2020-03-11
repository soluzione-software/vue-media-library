export default {
    props: {
        usePortal: {
            type: Boolean,
            default: false,
        },
        portalTarget: {
            type: String,
            default: 'modals',
        },
    }
}