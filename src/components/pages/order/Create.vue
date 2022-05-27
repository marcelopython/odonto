<template>
  <div style="width: 65%">
    <form>
      <div class="mb-6">
        <span class="title-step"> <span class="number-step">1.</span> Dados básicos</span>
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
            @keyup="formatarMoeda"
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
            track-by="name"
            label="name"
            :close-on-select="true"
            :search="true"
            :options="paymentMethods"
            :style="`height:50px; width:80%; float:left`"
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
            /
          </span>
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
      </div>
      <div class="mb-6" v-if="order.installment > 1">
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
      </div>

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
        variant="success" :class="'float-right mb-3'" :style="`width: 100%; padding: 15px`">
            Prosseguir
        </Buttons>
      </div>
    </form>
     <BaseModal 
        size="smal"
        id="modal-order"
        :title="'Serviço'"
        @modalHide="cancel"
      >

      <template #body>
        <div>
        <Buttons 
          @click="showModal"
          variant="success"
          :class="'float-right mb-3'"
          :style="`width: 100%; padding: 15px`"
        >
            Gerar orçamento
        </Buttons>

        <Buttons 
          @click="showModal"
          variant="success"
          :class="'float-right mb-3'"
          :style="`width: 100%; padding: 15px`"
        >
            Finalizar venda
        </Buttons>
        </div>
      </template>


     </BaseModal>
  </div>
</template>
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
        payment_method: null,
        customer_id: null,
        payment_period: null,
        service_id: [],
        service_total: [],
        descount: 0.0,
        installment: 1,
        amount: 0,
        desciption: ''
      },
      services: [],
      paymentMethods: [
        { value: 'CREDIT_CARD', name: 'Cartão' },
        { value: 'MONEY', name: 'Dinheiro' },
        { value: 'BOLETO', name: 'Boleto' },
        { value: 'PIX', name: 'Pix' },
      ],
      paymentPeriod: [
        { value: 'SEMANAL', name: 'Semanal' },
        { value: 'MENSAL', name: 'Mensal' },
        { value: 'ANUAL', name: 'Anual' },
      ],
      inCreate: false,
      loadCreate: false,
      loadList: false,
      dataClassModal: null,
      customers: [],
      dataTableService: [],
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

      let response = await client.post('order', this.order)
      console.log(this.order)
      console.log(response)
      
    },
    formatarMoeda(event) {
      let elemento = event.target
      let valor = elemento.value
      let income = valor.replace(/\D/g, '')
      let divisao = 100
      this.order.descount = income / divisao
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
  },
  mounted() {
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