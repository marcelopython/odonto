<template>
  <form>
    <div class="mb-6">
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Nome </label>
      <input
        v-model="data.name"
        type="name"
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
    <div class="mb-6">
      <label for="description" class="block mb-2 text-sm font-medium "
        >Descrição do produto</label
      >
      <textarea
        v-model="data.description"
        id="description"
        rows="4"
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
    <div class="mb-6" style="display: flex;  justify-content: space-between">
      <div style="width: 25%">
        <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Valor
        </label>
        <input
          v-model="data.amount"
          type="text"
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
      <div style="width: 35%">
        <label for="total_stock" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Total de items
        </label>
        <input
          v-model="data.total_stock"
          type="number"
          id="total_stock"
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
        <label for="total_stock_min" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Total Minimo
        </label>
        <input
          v-model="data.total_stock_min"
          type="number"
          id="total_stock_min"
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
        <label for="default-toggle" class="mt-3 relative inline-flex items-center mb-4 cursor-pointer">
          <input type="checkbox" 
              v-model="data.stock_alert"
              id="default-toggle"
              class="sr-only peer" 
              name="stock_alert"
              :checked="data.stock_alert"
          >
          <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Ser Alertado
          </span>
        </label>
      </div>
    </div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Imagem</label>
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file">
    <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">
      Selecione a imagem do seu produto.
    </div>
  </form>
  <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 mt-5">
      <button 
        data-modal-toggle="extralarge-modal"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
         focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
         @click="createOrUpdate"
      >
        Cadastrar
      </button>
      <button 
        data-modal-toggle="extralarge-modal"
        type="button"
        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none
         focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5
         py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300
         dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        @click="cancel"
      >
        Voltar
      </button>
  </div>
</template>

<script>
import Buttons from '@/components/Button.vue'
import Client from '@/services/Client'
const client = new Client()

export default {
  props: {
    load: {
      default: true,
    },
  },
  components: {
    Buttons,
  },
  data() {
    return {
      data: {
        name: null,
        description: null,
        amount: null,
        total_stock: null,
        total_stock_min: null,
        stock_alert: null,
      },
    }
  },
  watch: {},
  computed: {},
  methods: {
    createOrUpdate(){
      this.create()
      this.$emit('createOrUpdate')
    },
    async create(){
      try{
        
        let response = await client.post('product', this.data);
        console.log(response)

      }catch(e){
        console.log(e)
      }
    },
    cancel(){
      this.$emit('cancel')
    }
  },
  mounted: () => {
    console.log()
  },
}
</script>