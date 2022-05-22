<template>
  <PageWrapper>
    <template #header>
      <div class="p-4 sm:p-6">
        <h2 class="text-xl font-semibold leading-tight">Pacientes</h2>
        <Buttons
         variant="info"
         :class="'float-right mb-3'"
         @click="inCreate = !inCreate"
         v-if="!inCreate"
        > Cadastar Paciente </Buttons>
      </div>
    </template>
    
    <Index 
      v-if="!inCreate"
    />
    <Create
      @createOrUpdate="create"
      @cancel="returnCreate"
     v-if="inCreate"
    />

  </PageWrapper>
</template>

<script>
import Client from '@/services/Client'
const client = new Client()
import moment from 'moment'
import Index from '@/components/pages/customer/Index.vue'
import Create from '@/components/pages/customer/Create.vue'

export default {
    components: {
        Index,
        Create
    },
    data(){
        return{
            inCreate: false,
        }
    },
    methods: {
      create(){
        this.inCreate = false
      },
      returnCreate(){
        this.inCreate = false
      },
      
    },

}
</script>

<script setup>
import PageWrapper from '@/components/PageWrapper.vue'
import Buttons from '@/components/Button.vue'
import Pagination from '@/components/base/Pagination.vue'
</script>
