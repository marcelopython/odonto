<template>
  <PageWrapper title="Atendimentos">
    <template #header>
      <div class="p-4 sm:p-6">
        <h2 class="text-xl font-semibold leading-tight">Atendimentos</h2>
        <div>
          <Buttons variant="info" :class="'float-right mb-3'" @click="showModal" v-if="permission('call.create')">
            Orçamento
          </Buttons>
        </div>
      </div>
    </template>

<!-- <webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview> -->

<div id="painel_whatsapp"></div>

    <Index v-if="permission('call.read')" :load="loadList" />

    <BaseModal size="large" id="modal-call" :title="'Orçamento'">
      <template #body>
        <div>
          <div class="mb-3">
            <span style="margin-bottom: 15px">1. Selecione o Paciente</span>
          </div>
          <Multiselect
            v-model="customerSelected"
            placeholder="Selecionar o Paciente"
            track-by="name"
            label="name"
            :close-on-select="true"
            :search="true"
            :options="customers"
          />
        </div>
        <div v-show="customerSelected">
          <div class="mb-3">
            <span style="margin-bottom: 15px">2. Selecione o(s) serviço(s)</span>
          </div>
          <Multiselect
            v-model="serviceSelected"
            mode="tags"
            placeholder="Selecionar os serviços"
            track-by="name"
            label="name"
            :close-on-select="false"
            :search="true"
            :options="services"
          />
        </div>
        <div v-show="serviceSelected && serviceSelected.length">
          <div class="mb-3">
            <span style="margin-bottom: 15px">3. Informe a quantidade por serviço</span>
          </div>
          <div style="display: inline-block; margin-left: 15px" v-for="item in serviceSelected" :key="item">
            <strong>{{ nameService(item) }}</strong
            >:
            <input
              @keyup="(event) =>changeTotal(event.target.value, item)"
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              type="number"
              style="width: 55px"
              value="1"
            />
          </div>
        </div>

        <div v-show="serviceSelected && serviceSelected.length">
          <div class="mb-3">
            <span style="margin-bottom: 15px">4. Enviar para o cliente.</span>
          </div>
          <div style="width: 20%; margin-bottom: 15px; ">
            <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Desconto
            </label>
              <input
              type="tel"
              @keyup="formatarMoeda"
              id="amount_discount"
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              required
            />
          </div>
          <div style="display: flex; justify-content: space-around">
            <div style="width: 45%">
              <span
                >Valor
                <span
                  class="
                    bg-green-100
                    text-green-800 text-sm
                    font-medium
                    mr-2
                    px-2.5
                    py-0.5
                    rounded
                    dark:bg-green-200 dark:text-green-900
                  "
                  style="font-size: 18px"
                  >R$ {{ getAmount }}</span
                >
              </span>
              <br />
              <br />
              <div>
                <Buttons 
                    @click="sendZap({amount: getAmount})" 
                    style="width: 100%" variant="black">Enviar</Buttons>
              </div>
            </div>
            <div style="width: 45%">
              <span
                >Mínimo
                <span
                  class="
                    bg-green-100
                    text-green-800 text-sm
                    font-medium
                    mr-2
                    px-2.5
                    py-0.5
                    rounded
                    dark:bg-green-200 dark:text-green-900
                  "
                  style="font-size: 18px"
                  >R$ {{getAmountMin}}</span
                >
              </span>
              <br />
              <br />
              <Buttons 
                @click="sendZap({amount: getAmountMin})"
                style="width: 100%" variant="black">Enviar</Buttons>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 mt-5">
          <button
            data-modal-toggle="extralarge-modal"
            type="button"
            class="
              text-white
              bg-blue-700
              hover:bg-blue-800
              focus:ring-4 focus:outline-none focus:ring-blue-300
              font-medium
              rounded-lg
              text-sm
              px-5
              py-2.5
              text-center
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            "
          >
            Cadastrar
          </button>
          <button
            data-modal-toggle="extralarge-modal"
            type="button"
            class="
              text-gray-500
              bg-white
              hover:bg-gray-100
              focus:ring-4 focus:outline-none focus:ring-gray-200
              rounded-lg
              border border-gray-200
              text-sm
              font-medium
              px-5
              py-2.5
              hover:text-gray-900
              focus:z-10
              dark:bg-gray-700
              dark:text-gray-300
              dark:border-gray-500
              dark:hover:text-white
              dark:hover:bg-gray-600
              dark:focus:ring-gray-600
            "
            @click="cancel"
          >
            Voltar
          </button>
        </div>
      </template>
    </BaseModal>
  </PageWrapper>
</template>

<script>
import Client from '@/services/Client'
const client = new Client()
import moment from 'moment'
import Index from '@/components/pages/call/Index.vue'
import Create from '@/components/pages/call/Create.vue'
import BaseModal from '@/components/base/Modal.vue'
import { mapGetters } from 'vuex'
import Multiselect from '@vueform/multiselect'

export default {
  components: {
    Index,
    BaseModal,
    Multiselect,
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
    getAmount: function(){
        let amount = 0
        this.serviceSelected.forEach(itemSelected=>{
            let service = this.services.find(item=>(item.value == itemSelected))
            console.log('service', service)
            amount += (Number.parseFloat(service.amount) * (+service.item))
        })
        return amount.toFixed(2)
    }, 
    getAmountMin: function(){
        let amount = 0
        this.serviceSelected.forEach(itemSelected=>{
            let service = this.services.find(item=>(item.value == itemSelected))
            amount += (Number.parseFloat(service.amount_min) * (+service.item))
        })
        return amount.toFixed(2)
    },
  },
  methods: {
    formatarMoeda(event) {
        var elemento = event.target;
        var valor = elemento.value;

        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }

        elemento.value = valor;
        if(valor == 'NaN') elemento.value = '';
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
    changeTotal(value, itemSelected){
        this.services.find((item, index)=>{
            if(item.value == itemSelected){
                this.services[index].item = value
            }
        })
    },
    async getCustomer() {
      let customer = await client.get('customer/list')
      customer.data.forEach((element) => {
        this.customers.push({ value: element.id, name: element.name })
      })
    },
    async getServicies() {

      let service = await client.get('service/list')
      service.data.forEach((element) => {
        this.services.push({ 
            value: element.id,
            name: element.name,
            amount: element.amount,
            amount_min: element.amount_min,
            item: 1
        })
      })
    },
    modal() {
      const targetEl = document.getElementById('modal-call')
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
    },
  },
  mounted() {
    this.getCustomer()
    this.getServicies()

  },
}
</script>

<script setup>
import PageWrapper from '@/components/PageWrapper.vue'
import Buttons from '@/components/Button.vue'
import Pagination from '@/components/base/Pagination.vue'
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
