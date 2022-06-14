<template>
    <PageWrapper title="Serviços">
    <template #header>
      <div class="p-4 sm:p-6">
        <h2 class="text-xl font-semibold leading-tight">Serviços</h2>
        <Buttons
         variant="info"
         :class="'float-right mb-3'"
         @click="modalService"
         v-if="permission('service.create')"
        > Cadastar Serviço </Buttons>
      </div>
    </template>
    
    <Index 
      v-if="permission('service.read')"
      :load="loadList"
    />
    <Create
      @createOrUpdate="create"
      @cancel="returnCreate"
      :load="loadCreate"
      v-if="permission('service.create')"
    />
    </PageWrapper>
</template>

<script>

import Client from '@/services/Client'
const client = new Client()
import moment from 'moment'
import Index from '@/components/pages/service/Index.vue'
import Create from '@/components/pages/service/Create.vue'
import { mapGetters } from 'vuex'
    
export default {
    components: {
        Index,
        Create
    },
    data(){
        return{
            inCreate: false,
            loadCreate: false,
            loadList: false
        }
    },
    computed:{
      ...mapGetters(['permission']),
    },
    methods: {
      modalService(){
        this.loadCreate = true
      },
      create(){
        this.inCreate = false
        this.loadCreate = false
        this.loadList = true
      },
      returnCreate(){
        this.inCreate = false
        this.loadCreate = false
      },
    }

}
</script>

<script setup>
import PageWrapper from '@/components/PageWrapper.vue'
import Buttons from '@/components/Button.vue'
import Pagination from '@/components/base/Pagination.vue'
</script>
