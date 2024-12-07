<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import { useStore } from '@/stores/store.js'

export default {
    mounted() {
        this.drawSVG(this.$refs.svgElement, 1000);
    },
    methods: {
        ...mapActions(useStore, ['drawSVG']),
    },
};
</script>

<template>
<svg ref="svgElement" width="1601" height="227" viewBox="0 0 1601 227" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M132.86 67.076C620.59 21.966 1115.22 -22.9239 1597.68 61.6261C1101.13 24.6261 602.88 96.1861 114 190.626C487.53 24.2761 982.05 74.626 1407.53 102.276" stroke="#FF92F0" stroke-width="27" stroke-miterlimit="10"/>
</svg>

</template>