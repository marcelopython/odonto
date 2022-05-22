<template>
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
      <div style="width: 15%">
        <label for="birth_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Data de nascimento
        </label>
        <input
          type="tel" v-mask="'##/##/####'"
          v-model="data.birth_date"
          id="birth_date"
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
      <div style="width: 15%">
        <label for="birth_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Sexo </label>
        <select
          v-model="data.sexo"
          type="date"
          id="birth_date"
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
        >
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </div>
      <div style="width: 25%">
        <label for="cpf_cnpj" 
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          CPF
        </label>
        <input
          v-mask="'###.###.###-##'"
          v-model="data.cpf_cnpj"
          type="text"
          id="cpf_cnpj"
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
   
   <div class="mb-6" style="display: flex; justify-content: space-between">
      <div style="width: 35%">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900
         dark:text-gray-300"> E-mail </label>
        <input
          v-model="data.email"
          type="text"
          id="email"
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
        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Telefone
        </label>
        <input
          v-model="data.phone"
          type="text"
          id="phone"
          v-mask="'+55 (##) #####-####'"
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
        <label for="zipcode" class="block mb-2 text-sm font-medium text-gray-900 
        dark:text-gray-300"> CEP </label>
        <input
          @keyup="pesquisacep"
          v-mask="'#####-###'"
          v-model="data.zipcode"
          type="text"
          id="zipcode"
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

    <div class="mb-6" style="display: flex; justify-content: space-between">
      <div style="width: 35%">
        <label for="street" class="block mb-2 text-sm font-medium text-gray-900
         dark:text-gray-300"> Rua </label>
        <input
          v-model="data.street"
          type="text"
          id="street"
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
        <label for="neighborhood" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Bairro
        </label>
        <input
          v-model="data.neighborhood"
          type="text"
          id="neighborhood"
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
        <label for="zipcode" class="block mb-2 text-sm font-medium text-gray-900 
        dark:text-gray-300"> Numero </label>
        <input
          v-model="data.number"
          type="text"
          id="zipcode"
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
    
    <div class="mb-6" style="display: flex">
      <div style="width: 35%" class="mr-5">
        <label for="city" class="block mb-2 text-sm font-medium text-gray-900
         dark:text-gray-300"> Cidade </label>
        <input
          v-model="data.city"
          type="text"
          id="city"
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
      <div style="width: 35%" class="ml-3">
        <label for="up" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Estado
        </label>
        <input
          v-model="data.uf"
          maxlength="2"
          type="text"
          id="up"
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
        <label for="complement" class="block mb-2 text-sm font-medium">Complemento</label>
        <textarea
          v-model="data.complement"
          id="complement"
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
    <div class="mb-6">
      <label for="description" class="block mb-2 text-sm font-medium">Observação</label>
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

  </form>
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
<script>
import Buttons from '@/components/Button.vue'
import Client from '@/services/Client'

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
  },
  data() {
    return {
      data: {
        name: null,
        phone: null,
        email: null,
        cpf_cnpj: null,
        zipcode: null,
        street: null,
        number: null,
        complement: null,
        neighborhood: null,
        city: null,
        uf: null,
        sexo: null,
        birth_date: null,
      },
    }
  },
  watch: {},
  computed: {},
  methods: {
    limpa_formulário_cep() {
        this.data.street = null
        this.data.number = null
        this.data.complement = null
        this.data.neighborhood = null
        this.data.city = null
        this.data.uf = null
    },
    pesquisacep(valor) {
        valor = valor.target.value
        var cep = valor.replace(/\D/g, '');
        if (cep != "") {
            var validacep = /^[0-9]{8}$/;
            if(validacep.test(cep)) {
                let src = 'https://viacep.com.br/ws/'+ cep + '/json/';
                fetch(src)
                  .then(re=>{
                    return re.json()
                  })
                  .then(re=>{
                    this.data.street = re.logradouro
                    this.data.complement = re.complemento
                    this.data.neighborhood = re.bairro
                    this.data.city = re.localidade
                    this.data.uf = re.uf
                  }).catch(e=>{
                    errorToast({
                      text: 'Falha ao buscar endereço',
                      text: 'Endereço'
                    })
                    console.log(e)
                  });
            } 
            else {
                this.limpa_formulário_cep();
            }
        }else {
           this.limpa_formulário_cep();
        }
    },
    
    validation() {
      console.log(this.data)
      if (!this.data.name) {
        warnToast({
          text: 'Nome é obrigatório!',
          title: 'Paciente',
        })
        return false
      } else if (!this.data.birth_date) {
        warnToast({
          text: 'Data de nascimento é obrigatório!',
          title: 'Paciente',
        })
        return false
      } else if (!this.data.sexo) {
        warnToast({
          text: 'Sexo é obrigatório!',
          title: 'Paciente',
        })
        return false
      } else if (!this.data.cpf_cnpj) {
        warnToast({
          text: 'CPF é obrigatório!',
          title: 'Paciente',
        })
        return false
      }else if (!this.data.email) {
        warnToast({
          text: 'E-mail é obrigatório!',
          title: 'Paciente',
        })
        return false
      }else if (!this.data.phone) {
        warnToast({
          text: 'Telefone é obrigatório!',
          title: 'Paciente',
        })
        return false
      } else if (!this.data.zipcode) {
        warnToast({
          text: 'CEP é obrigatório!',
          title: 'Paciente',
        })
        return false
      } else if (!this.data.street) {
        warnToast({
          text: 'Rua é obrigatório!',
          title: 'Paciente',
        })
        return false
      } else if (!this.data.number) {
        warnToast({
          text: 'Número é obrigatório!',
          title: 'Paciente',
        })
        return false
      } else if (!this.data.neighborhood) {
        warnToast({
          text: 'Bairro é obrigatório!',
          title: 'Paciente',
        })
        return false
      } else if (!this.data.neighborhood) {
        warnToast({
          text: 'Bairro é obrigatório!',
          title: 'Paciente',
        })
        return false
      } else if (!this.data.city) {
        warnToast({
          text: 'Cidade é obrigatório!',
          title: 'Paciente',
        })
        return false
      } else if (!this.data.uf) {
        warnToast({
          text: 'Estado é obrigatório!',
          title: 'Paciente',
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
        let response = await client.post('customer', this.data)
        if (response.data.id) {
          this.$emit('createOrUpdate')
          successToast({
            text: 'Paciente cadastrado com sucesso.',
            title: 'Paciente',
          })
        }
      } catch (e) {
        console.log(e)
        if(e.response.status !== 422){
          errorToast({
            text: 'Falha inesperada ao finalizar cadastro.',
            title: 'Paciente',
          })
        }
          
      }
    },
    cancel() {
      this.$emit('cancel')
    },
  },
  mounted: () => {
    console.log()
  },
}
</script>