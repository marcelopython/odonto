<template>
    <PageWrapper title="Orçamentos">
        <template #header>
        <div class="p-4 sm:p-6">
            <h2 class="text-xl font-semibold leading-tight">Orçamentos</h2>
            <div>
            <Buttons variant="info" :class="'float-right mb-3'" v-if="permission('order.create')">
                Orçamento
            </Buttons>
            </div>
        </div>
        </template>

        <!-- <Index /> -->


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
