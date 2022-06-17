<template>
  <div style="width: 65%">
    <form>
      <div class="mb-6">
        <span class="title-step"> <span class="number-step">1.</span> Dados básicos</span>
        <div style="width: 100%" class="mt-3">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Selecione o Doutor
          </label>
          <Multiselect
            v-model="order.doctor_id"
            placeholder="Selecionar o Cliente"
            track-by="name"
            label="name"
            :close-on-select="true"
            :search="true"
            :options="doctor"
            :style="`height:50px`"
            :class="`     
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
                dark:focus:border-blue-500`"
          />
        </div>
        <div style="width: 100%" class="mt-3">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Selecione o Cliente
          </label>
          <Multiselect
            v-model="order.customer_id"
            placeholder="Selecionar o Cliente"
            track-by="name"
            label="name"
            :close-on-select="true"
            :search="true"
            :options="customers"
            :style="`height:50px`"
            :class="`     
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
                dark:focus:border-blue-500`"
          />
        </div>
      </div>

      <div class="mb-6">
        <span class="title-step"><span class="number-step">2.</span> Serviços para orçamento</span>

        <div style="width: 100%" class="mt-3">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Selecione o Serviços
          </label>
          <Multiselect
            v-model="order.service_id"
            mode="tags"
            placeholder="Selecionar os serviços"
            track-by="name"
            label="name"
            :close-on-select="false"
            :search="true"
            :options="services"
            :class="`     
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
                  dark:focus:border-blue-500`"
          />
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3" v-if="order.service_id.length">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">Nome</th>
                <th scope="col" class="px-6 py-3">QTD.</th>
                <th scope="col" class="px-6 py-3">Valor</th>
                <th scope="col" class="px-6 py-3">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                v-for="service in getService_id"
                :key="service.value"
              >
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {{ service.name }}
                </th>
                <td class="px-6 py-4">
                  <div class="flex">
                    <span
                      class="
                        inline-flex
                        items-center
                        px-3
                        text-sm text-gray-900
                        bg-gray-200
                        border border-r-0 border-gray-300
                        rounded-l-md
                        dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600
                      "
                      style="cursor: pointer"
                      @click="service.item--"
                    >
                      -
                    </span>
                    <input
                      v-model="service.item"
                      type="text"
                      style="width: 10px"
                      class="
                        rounded-none
                        bg-gray-50
                        border border-gray-300
                        text-gray-900
                        focus:ring-blue-500 focus:border-blue-500
                        block
                        flex-1
                        min-w-0
                        w-full
                        text-sm
                        border-gray-300
                        p-2.5
                        dark:bg-gray-700
                        dark:border-gray-600
                        dark:placeholder-gray-400
                        dark:text-white
                        dark:focus:ring-blue-500
                        dark:focus:border-blue-500
                      "
                    />
                    <span
                      class="
                        inline-flex
                        items-center
                        px-3
                        text-sm text-gray-900
                        bg-gray-200
                        border border-r-0 border-gray-300
                        rounded-r-md
                        dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600
                      "
                      style="cursor: pointer"
                      @click="service.item++"
                    >
                      +
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4">R$ {{ Number(service.amount).toFixed(2) }}</td>
                <td class="px-6 py-4">R$ {{ getAmountItem(service) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mb-6">
        <span class="title-step"><span class="number-step">3.</span> Desconto.</span>
        <div class="mt-3">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Informe o Desconto</label>
          <input
            @keyup="formatarDescountMoeda"
            type="text"
            style="width: 150px"
            class="
              rounded-none
              bg-gray-50
              border border-gray-300
              text-gray-900
              focus:ring-blue-500 focus:border-blue-500
              block
              flex-1
              min-w-0
              w-full
              text-sm
              border-gray-300
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
          />
        </div>
      </div>

      <div class="mb-6">
        <span class="title-step"><span class="number-step">4.</span> Método de Pagamento.</span>
        <div class="mt-3">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Informe o Método de Pagamento</label
          >
          <Multiselect
            v-model="order.payment_method"
            placeholder="Selecionar o Método de Pagamento"
            mode="tags"
            :close-on-select="false"
            :search="true"
            track-by="name"
            label="name"
            :options="paymentMethods"
            :class="`     
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
                dark:focus:border-blue-500`"
          />
        </div>
        <div class="mt-3" v-if="order.payment_method.find(item => item === 'CREDIT_CARD' || item === 'BOLETO')">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Informe a quantidade máxima de parcelas</label
          >
          <input
            v-model="order.installment"
            type="number"
            style="width: 80px; height:50px; margin-left:"
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
          />
        </div>
        <div class="mb-6" v-if="order.payment_method.find(item => item === 'MONEY') && order.payment_method.length > 1">
        <div class="mt-3">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Informe o valor pago em dinheiro</label>
          <input
            @keyup="formatarPaydMoneyMoeda"
            type="text"
            style="width: 150px"
            class="
              rounded-none
              bg-gray-50
              border border-gray-300
              text-gray-900
              focus:ring-blue-500 focus:border-blue-500
              block
              flex-1
              min-w-0
              w-full
              text-sm
              border-gray-300
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
          />
        </div>
      </div>
      </div>
      <!-- <div class="mb-6" v-if="order.installment > 1">
        <div class="mt-3">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Informe o período de cobrança</label
          >
          <Multiselect
            v-model="order.payment_period"
            placeholder="Selecionar o período de cobrança"
            track-by="name"
            label="name"
            :close-on-select="true"
            :search="true"
            :options="paymentPeriod"
            :style="`height:50px`"
            :class="`     
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
                dark:focus:border-blue-500`"
          />
        </div>
      </div> -->
      <div class="mb-6">
        <span class="title-step"><span class="number-step">5.</span> Observação.</span>
        <div class="mt-3">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Informe a observação</label>
          <textarea v-model="order.desciption" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <span class="title-total">Total:</span>
        <span class="amount-total">R$ {{ getAmount }}</span>
      </div>
      <div style="display: flex; margin: 15px 0 55px">
        <Buttons 
          @click="finished"
          variant="success" :class="'float-right mb-3'"
         :style="`width: 100%; padding: 15px`">
            Prosseguir
        </Buttons>
      </div>
    </form>
  </div>
</template>
<script setup>
import {PlusIcon } from '@heroicons/vue/outline'
</script>

<script>
import Buttons from '@/components/Button.vue'
import Client from '@/services/Client'
import Multiselect from '@vueform/multiselect'
const client = new Client()
import { warnToast, successToast, errorToast } from '@/toast'
import BaseModal from '@/components/base/Modal.vue'

export default {
  props: {
    // load: {
    //   default: true,
    // },
  },
  data() {
    return {
      order: {
        amount_money_paid: 0.0,
        customer_id: null,
        // payment_period: null,
        payment_method: [],
        service_id: [],
        service_total: [],
        descount: 0.0,
        installment: 1,
        amount: 0,
        desciption: '',
        doctor_id: null,
      },
      services: [],
      paymentMethods: [
        { value: 'CREDIT_CARD', name: 'Cartão' },
        { value: 'MONEY', name: 'Dinheiro' },
        { value: 'BOLETO', name: 'Boleto' },
        { value: 'PIX', name: 'Pix' },
      ],
      paymentPeriod: [
        { value: 'AVISTA', name: 'Avista' },
        // { value: 'SEMANAL', name: 'Semanal' },
        { value: 'MENSAL', name: 'Mensal' },
        // { value: 'ANUAL', name: 'Anual' },
      ],
      inCreate: false,
      loadCreate: false,
      loadList: false,
      dataClassModal: null,
      customers: [],
      dataTableService: [],
      doctor: [],
      dataClassModal: null
    }
  },
  components: {
    Buttons,
    Multiselect,
    BaseModal
  },
  watch: {},
  computed: {
    nameService: function () {
      return (id) => {
        return this.services.find((item) => {
          if (item.value == id) {
            return item.name
          }
        }).name
      }
    },
    getAmountItem: function () {
      return (item) => {
        return (Number.parseFloat(item.amount) * +item.item).toFixed(2)
      }
    },
    getAmount: function () {
      let amount = 0
      this.order.service_id.forEach((itemSelected) => {
        let service = this.services.find((item) => item.value == itemSelected)
        amount += Number.parseFloat(service.amount) * +service.item
      })
      let descount = 0
      if (Number(this.order.descount)) {
        descount = this.order.descount
      }

      return this.order.amount = (amount - Number(descount)).toFixed(2)
    },
    getAmountMin: function () {
      let amount = 0
      this.order.service_id.forEach((itemSelected) => {
        let service = this.services.find((item) => item.value == itemSelected)
        amount += Number.parseFloat(service.amount_min) * +service.item
      })
      return amount.toFixed(2)
    },
    getService_id() {
      this.dataTableService = []
      this.order.service_id.forEach((itemSelected) => {
        this.dataTableService.push(this.services.find((item) => item.value == itemSelected))
      })
      return this.dataTableService
    },
  },
  methods: {
    async finished() {
      this.order.service_total = []
      this.order.service_id.forEach((itemSelected) => {
        let service = this.services.find((item) => item.value == itemSelected)
        this.order.service_total.push({id: itemSelected, total: service.item})
      })

      // if(order.payment_method.find(item => item === 'MONEY') && order.payment_method.length === 1){
      //   this.order.payment_period = 'AVISTA'
      // }

      let response = await client.post('order', this.order)
      
      this.$router.push('/atendimentos/'+response.data.id)

    },
    formatarDescountMoeda(event) {
      let elemento = event.target
      let valor = elemento.value
      let income = valor.replace(/\D/g, '')
      let divisao = 100
      this.order.descount = income / divisao
      elemento.value = (income / divisao).toLocaleString('pt-br', { minimumFractionDigits: 2 })
    },

    formatarPaydMoneyMoeda(event) {
      let elemento = event.target
      let valor = elemento.value
      let income = valor.replace(/\D/g, '')
      let divisao = 100
      this.order.amount_money_paid = income / divisao
      elemento.value = (income / divisao).toLocaleString('pt-br', { minimumFractionDigits: 2 })
    },

    changeTotal(value, itemSelected) {
      this.services.find((item, index) => {
        if (item.value == itemSelected) {
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
          item: 1,
        })
      })
    },
    modal() {
      const targetEl = document.getElementById('modal-order')
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
      return  new Modal(targetEl, options)
    },
    showModal() {
      this.dataClassModal = this.modal()
      this.dataClassModal.show()
    },
    cancel() {
      this.dataClassModal.hide()
      this.$emit('cancel')
    },
    async getDoctor(){
      let response = await client.get('user/list?type=DOUTOR&_c[]=first_name&_c[]=last_name&_c[]=id')
      response.data.forEach((element) => {
        if(element.id == this.$store.state.user.id){
          this.order.doctor_id = element.id
        }
        this.doctor.push({ value: element.id, name: element.first_name+' '+(element.last_name ?? '') })
      })
    }
  },
  async mounted() {
    this.getDoctor()
    this.getCustomer()
    this.getServicies()
  },
}
</script>

<style>
.title-total {
  font-size: 18px;
  font-weight: 700;
}
.amount-total {
  font-size: 18px;
  color: green;
  font-weight: 700;
}

.title-step {
  font-size: 16px;
  font-weight: 700;
  color: #7f7f7f;
}

.number-step {
  color: cornflowerblue;
  margin-right: 12px;
}
</style>