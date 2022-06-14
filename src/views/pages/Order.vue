<template>
    <PageWrapper title="Orçamentos">

        <Create/>

    </PageWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import Index from '@/components/pages/order/Index.vue'
import Create from '@/components/pages/order/Create.vue'

export default {

    data(){
        return {
            // create: false
        }
    },
    components:{
        Index,
        Create
    },
    computed: {
        ...mapGetters(['permission']),
    },

}
</script>

<script setup>
import PageWrapper from '@/components/PageWrapper.vue'
import Buttons from '@/components/Button.vue'
import Pagination from '@/components/base/Pagination.vue'
</script>
