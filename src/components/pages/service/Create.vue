<template>
  <BaseModal 
    size="smal"
    id="modal-service"
    :title="'Cadastrar serviço'"
    @modalHide="cancel"
  >
 
    <template #body>
      <form>
        <div class="mb-6" style="display: flex; justify-content: space-between">
          <div style="width: 35%">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Nome </label>
            <input
              v-model="data.name"
              type="text"
              id="name"
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
          <div style="width: 35%">
            <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Valor
            </label>
            <input
              type="tel"
              @keyup="formatarMoeda"
              id="amount"
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

          <div style="width: 25%">
            <label for="amount_min" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Valor mínimo
            </label>

            <input
              @keyup="formatarMoeda"           
              type="text"
              id="amount_min"
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
        </div>
        <div class="mb-6">
          <label for="description" class="block mb-2 text-sm font-medium">Descrição</label>
          <textarea
            v-model="data.description"
            id="description"
            rows="2"
            class="
              block
              p-2.5
              w-full
              text-sm text-gray-900
              bg-gray-50
              rounded-lg
              border border-gray-300
              focus:ring-blue-500 focus:border-blue-500
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
          ></textarea>
        </div>
      </form>
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
          @click="createOrUpdate"
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
</template>
<script>
import Buttons from '@/components/Button.vue'
import Client from '@/services/Client'
import BaseModal from '@/components/base/Modal.vue'

const client = new Client()
import { warnToast, successToast, errorToast } from '@/toast'


export default {
  props: {
    load: {
      default: true,
    },
  },
  components: {
    Buttons,
    BaseModal,
  },
  data() {
    return {
      data: {
        name: null,
        amount: '0,00',
        amount_min: '0,00',
        description: null,
      },
      dataClassModal: null
    }
  },
  watch: {
    load: function () {
      if (this.load) {
        this.showModal()
      }
    },
  },
  computed: {},
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
    validation() {
      this.data.amount_min = document.getElementById('amount_min').value
      this.data.amount = document.getElementById('amount').value
      if (!this.data.name) {
        warnToast({
          text: 'Nome é obrigatório!',
          title: 'Serviço',
        })
        return false
      } else if (!this.data.amount) {
        warnToast({
          text: 'Valor é obrigatório!',
          title: 'Serviço',
        })
        return false
      } else if (!this.data.amount_min) {
        warnToast({
          text: 'Valor mínimo é obrigatório!',
          title: 'Serviço',
        })
        return false
      }
      return true
    },
    createOrUpdate() {
      if (!this.validation()) {
        return false
      }
      this.create()
    },
    async create() {
      try {
        let response = await client.post('service', this.data)
        if (response.data.id) {
          this.dataClassModal.hide()
          this.$emit('createOrUpdate')
          successToast({
            text: 'Serviço cadastrado com sucesso.',
            title: 'Paciente',
          })
        }
      } catch (e) {
        console.log(e)
        if (e.response.status !== 422) {
          errorToast({
            text: 'Falha inesperada ao finalizar cadastro.',
            title: 'Paciente',
          })
        }
      }
    },
    modal() {
      const targetEl = document.getElementById('modal-service')
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
}
</script>