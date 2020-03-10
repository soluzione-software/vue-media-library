<template>
    <div class="flex flex-wrap">
        <column
                class="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                v-for="(column, i) in columns"
                :key="i"
                :items="column"
                :readonly="readonly"
                :viewable="viewable"
                :editable="editable"
                :downloadable="downloadable"
                @view="(args) => {$emit('view', args)}"
                @download="(args) => {$emit('download', args)}"
                @edit="(args) => {$emit('edit', args)}"
                @delete="(args) => {$emit('delete', args)}"
        />
    </div>
</template>

<script>
    import Column from "./Column.vue";

    export default {
        name: "GridView",
        components: {Column},
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
            }
        },
        computed: {
            columns(){
                let columns = {
                    'xs': 1,
                    'sm': 2,
                    'md': 3,
                    'lg': 4,
                    'xl': 5,
                };

                let chunks = columns[this.currentBreakpoint];

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
            }
        }
    }
</script>

<style scoped>
</style>
