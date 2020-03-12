<template>
    <div class="flex flex-wrap">
        <column
                :class="columnClasses"
                v-for="(column, i) in columns"
                :key="i"
                :items="column"
                :readonly="readonly"
                :viewable="viewable"
                :editable="editable"
                :downloadable="downloadable"
                :squared-items="squaredItems"
                :more-count="moreCount"
                :more-item="moreItem"
                @view="(args) => {$emit('view', args)}"
                @download="(args) => {$emit('download', args)}"
                @edit="(args) => {$emit('edit', args)}"
                @delete="(args) => {$emit('delete', args)}"
                @more="(args) => {$emit('more', args)}"
        />
    </div>
</template>

<script>
    import Column from "./Column.vue";
    import {isDownloadable, isEditable, isViewable} from "../../mixins";
    import Media from "../../Media";

    const defaultColumns = {
        'xs': 1,
        'sm': 2,
        'md': 3,
        'lg': 4,
        'xl': 5
    };

    export default {
        name: "Columns",
        components: {Column},
        mixins: [isDownloadable, isEditable, isViewable],
        props: {
            items: {
                type: Array,
                default(){
                    return []
                },
            },
            readonly: {
                type: Boolean,
                default: false
            },
            columnsCount: {
                type: Object,
                default(){
                    return defaultColumns;
                }
            },
            squaredItems: {
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
        data(){
            return {
                window: {
                    width: 0,
                    height: 0
                },
                breakpoints: {
                    // https://tailwindcss.com/docs/responsive-design/
                    'sm': 640,
                    'md': 768,
                    'lg': 1024,
                    'xl': 1280,
                }
            }
        },
        mounted() {

        },
        created() {
            this.handleResize();
            window.addEventListener('resize', this.handleResize);
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            chunk(array, chunks){
                let res = [];

                for (let i = 0; i < chunks; i++){
                    res.push([]);
                }

                let current = 0;
                array.forEach(item => {
                    res[current].push(item);
                    current = current + 1 < chunks ? current + 1 : 0;
                });

                return res;
            },
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
            getColumnsCount(breakpoint){
                return this.columnsCount[breakpoint] || defaultColumns[breakpoint];
            },
            getColumnClass(breakpoint){
                let count = this.getColumnsCount(breakpoint);
                let prefix = breakpoint !== 'xs' ? `${breakpoint}:` : '';
                let w = count === 1 ? 'full' : `1/${count}`;
                return `${prefix}w-${w}`;
            },
        },
        computed: {
            columns(){
                let chunks = this.getColumnsCount(this.currentBreakpoint);

                return this.chunk(this.items, chunks);
            },
            currentBreakpoint(){
                let breakpoint = 'xs';

                Object.entries(this.breakpoints).reverse().every(entry => {
                    let br = entry[0];
                    let size = entry[1];
                    if (this.window.width >= size){
                        breakpoint = br;
                        return false;
                    }
                    return true;
                });

                return breakpoint;
            },
            columnClasses(){
                return [
                    this.getColumnClass('xs'),
                    this.getColumnClass('sm'),
                    this.getColumnClass('md'),
                    this.getColumnClass('lg'),
                    this.getColumnClass('xl')
                ]
            },
        }
    }
</script>

<style scoped>
</style>
