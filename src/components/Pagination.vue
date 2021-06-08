<template>
    <div class="col-12">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                
            <li class="page-item" :class="[!data?.prev_page_url && 'disabled']">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="paginate(data.prev_page_url)">
                <span aria-hidden="true">Previous</span>
                <span class="sr-only">Previous</span>
                </a>
            </li>
            <li v-for="link in pageNumbers" :key="link" class="page-item" :class="[link.active && 'disabled active']" >
                <a class="page-link" href="#" @click.prevent="!!link.url && paginate(link.url)">{{ link.label }}</a>
            </li>
            <li class="page-item" :class="[!data?.next_page_url && 'disabled']">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="paginate(data.next_page_url)">
                <span aria-hidden="true">Next</span>
                <span class="sr-only">Next</span>
                </a>
            </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
    props: ['data'],
    name: 'Pagination',
    setup(props, context) {

        const pageNumbers = computed(() => {
            return props.data?.links?.filter((link, index) => !link.label.includes('&'))
        });

        const paginate = (url) => {
            context.emit('paginate', url)
        }

        return { pageNumbers, paginate }
    }

}
</script>

<style>

</style>