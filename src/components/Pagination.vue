<template>
        <div class="col-12">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="paginate(data.prev_page_url)">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li v-for="link in pageNumbers" :key="link" class="page-item" :class="[link.active && 'active']">
                        <a class="page-link" href="#" @click.prevent="paginate(link.url)">{{ link.label }}</a>
                </li>
                <!-- <li class="page-item"><a class="page-link" href="#" @click.prevent="paginate('https://payroll-ent-cloud.herokuapp.com/api/payrolluser?page=1')">1</a></li>
                <li class="page-item"><a class="page-link" href="#" @click.prevent="nyaw">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="paginate(data.next_page_url)">
                    <span aria-hidden="true">&raquo;</span>
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
            // console.log(url)
        }


        return { pageNumbers, paginate }
    }

}
</script>

<style>

</style>