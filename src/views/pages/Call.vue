<template>
  <PageWrapper title="Atendimentos">
    <template #header>
      <div class="p-4 sm:p-6">
        <h2 class="text-xl font-semibold leading-tight">Atendimentos</h2>
        <!-- <div>
          <Buttons variant="info" :class="'float-right mb-3'" @click="showModal" v-if="permission('call.create')">
            Orçamento
          </Buttons>
        </div> -->
      </div>
    </template>
    
    <Show 
      :callId="callId"
      @modalHide="cancel" 
    />

    <Index v-if="permission('call.read')" :load="loadList" @showInfo="showInfo"/>

  </PageWrapper>
</template>

<script>
import Client from '@/services/Client'
const client = new Client()
// import moment from 'moment'
import Index from '@/components/pages/call/Index.vue'
import Show from '@/components/pages/call/Show.vue'
// import Create from '@/components/pages/call/Create.vue'
import { mapGetters } from 'vuex'
import Multiselect from '@vueform/multiselect'

export default {
  components: {
    Index,
    Multiselect,
    Show
  },
  data() {
    return {
      customerSelected: null,
      serviceSelected: [],
      services: [],
      inCreate: false,
      loadCreate: false,
      loadList: false,
      dataClassModal: null,
      customers: [],

      callId: null
    }
  },
  computed: {
    ...mapGetters(['permission']),
    nameService: function(){
        return (id)=>{
            return this.services.find(item=>{
                if(item.value == id){
                    return item.name
                }
            }).name
        }
    },
  },
  methods: {
    showInfo(id){
      if(this.dataClassModal){
       this.cancel();
      }
 
      this.$router.push({name: 'Call', params: {_id: id}})
      this.callId = id
      this.dataClassModal = this.modal('bottom-right-modal')
      this.dataClassModal.show()
    },
    async sendZap({amount}){

        let customer = await client.get('customer/show/'+this.customerSelected)
    
        let servicesName = '';
        this.serviceSelected.forEach(itemSelected=>{
            servicesName += this.nameService(itemSelected)+', '
        })

        let text = `
            Olá *${customer.data.name.split(' ')[0]}*\n\n_Segue nosso orçamento_.\n\n*Valor*: R$ ${amount}\n\n*Forma de pagamento*: Cartão / 3\n\n*Serviço(s)*: ${servicesName.slice(0, -2)}
        `;

        let link = `https://web.whatsapp.com/send?phone=${customer.data.phone}&text=`+window.encodeURIComponent(text)
        window.open(link, '_blank').focus();
    },
    modal(id = 'modal-call' ) {
      const targetEl = document.getElementById(id)
      const options = {
        placement: 'bottom-left',
        backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
        onHide: () => {},
        onShow: () => {
          this.data = {
            name: null,
            amount: null,
            amount_min: null,
            description: null,
          }
        },
        onToggle: () => {
          console.log('modal has been toggled')
        },
      }
      return new Modal(targetEl, options)
    },
    showModal() {
      this.dataClassModal = this.modal()
      this.dataClassModal.show()
    },
    cancel() {
      this.dataClassModal.hide()
      this.$emit('cancel')
      this.$router.push('/atendimentos')
    },
  },
  mounted() {
    if(this.dataClassModal){
      this.cancel();
    }
 
    if(this.$route.params._id){
      this.showInfo(this.$route.params._id)
    }

  },
}
</script>

<script setup>
import PageWrapper from '@/components/PageWrapper.vue'
import Buttons from '@/components/Button.vue'
import Pagination from '@/components/base/Pagination.vue'
</script>

