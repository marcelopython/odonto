<template>
      <BaseModal
        size="smal"
        :id="this.idModal"
        @modalHide="modalHide"
        @create="createUser"
        :disabledBtn="disabledBtn"
        :title="'Cadastro de usuário'"
        v-if="permission('user.create')"
      >
        <template #body>
          <form>
            <div class="grid gap-6 mb-6 lg:grid-cols-2">
              <div>
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Primeiro nome</label
                >
                <input
                  v-model="user.first_name"
                  type="text"
                  id="first_name"
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
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Sobrenome</label
                >
                <input
                  v-model="user.last_name"
                  type="text"
                  id="last_name"
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
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Telefone</label
                >
                <input
                  v-model="user.phone"
                  type="tel"
                  id="phone"
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
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>
            </div>
            <div class="mb-6">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">E-mail</label>
              <input
                v-model="user.email"
                type="email"
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
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div class="mb-6">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Senha</label
              >
              <input
                v-model="user.password"
                type="password"
                id="password"
                maxlength="8"
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
                placeholder="•••••••••"
                required
              />
            </div>
            <div class="mb-6">
              <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Confirm password</label
              >
              <input
                v-model="user.confirm_password"
                type="password"
                id="confirm_password"
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
                placeholder="•••••••••"
                required
              />
            </div>
            <div class="mb-6">
              <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Grupo de permissão</label
              >
              <select
                v-model="user.permission_group_id"
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
                <option v-for="group in permissionGroup" :key="group.id" :value="group.id">{{ group.name }}</option>
              </select>
            </div>
          </form>
        </template>
      </BaseModal>
</template>
<script>
import Client from '@/services/Client'
const client = new Client()
import { mapGetters } from 'vuex'
import BaseModal from '@/components/base/Modal.vue'
import IndexPermission from '@/components/pages/user/IndexPermission.vue'
import { warnToast, successToast, errorToast } from '@/toast'

export default {
  props:{
    isOpen:{
      default: false
    }
  },
  data() {
    return {
      permissionGroup: [],
      loadPermission: false,
      disabledBtn: false,
      idModal: 'modal-user',
      user: {
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        password: null,
        confirm_password: null,
        permission_group_id: null,
      },
    }
  },
  watch:{
    isOpen: function(){
      if(this.isOpen){
        this.openModal()
      }
    }
  },
  components: {
    BaseModal,
  },
  computed: {
    ...mapGetters(['permission']),
  },
  methods: {
    async createUser() {
      try {
        if (!this.user['first_name']) {
          return errorToast({
            text: 'Obrigatório informar o nome!',
            title: 'Usuário',
          })
        } else if (!this.user['email']) {
          return errorToast({
            text: 'Obrigatorio informar o E-mail!',
            title: 'Usuário',
          })
        } else if (!this.user['password']) {
          return errorToast({
            text: 'Obrigatório informar a senha!',
            title: 'Usuário',
          })
        }else if(this.user['password'].length < 8){
          return errorToast({
            text: 'Senha muito curta!',
            title: 'Usuário',
          })
        }
         else if (this.user['password'] !== this.user['confirm_password']) {
          return errorToast({
            text: 'Senhas não conferem!',
            title: 'Usuário',
          })
        } else if (!this.user['permission_group_id']) {
          return errorToast({
            text: 'Obrigatório informar o grupo de permissão!',
            title: 'Usuário',
          })
        }
        this.disabledBtn = true

        let response = await client.post('user/register', this.user)

        this.disabledBtn = false
        if (response.data.success) {
          this.modalHide()
          this.$emit('createUser', response.data)
          return successToast({
            text: 'Usuário cadastrado com sucesso!',
            title: 'Usuário',
          })
        }

        return errorToast({
          text: 'Falha ao cadastrar usuário!',
          title: 'Usuário',
        })
      } catch (e) {
        this.disabledBtn = false
        console.log(e)
      }
    },
    async getPermissionGroup() {
      try {
        let response = await client.get('permission-group/list')
        this.permissionGroup = response.data
      } catch (e) {
        console.log(e)
      }
    },
    async openModal() {
      await this.getPermissionGroup()
      this.dataClassModal = this.modal()
      this.dataClassModal.show()
    },
    modal() {
      const targetEl = document.getElementById('modal-user')
      const options = {
        placement: 'bottom-left',
        backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
        onHide: () => {
          
        },
        onShow: () => {
          console.log('modal is shown')
        },
        onToggle: () => {
          console.log('modal has been toggled')
        },
      }
      return new Modal(targetEl, options)
    },
    modalHide() {
      this.disabledBtn = false
      this.user = {
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        password: null,
        confirm_password: null,
        permission_group_id: null,
      }
      this.dataClassModal.hide()
      this.$emit('modalHide')
    },
  },
}
</script>
<script setup>
// import PageWrapper from '@/components/PageWrapper.vue'
// import { onMounted, ref } from 'vue'
// import BaseCard from '@/components/BaseCard.vue'
// import Button from '@/components/Button.vue'
// import ApexCharts from 'apexcharts'
// import { ChartBarIcon, TrendingUpIcon, TrendingDownIcon, MinusIcon } from '@heroicons/vue/outline'
</script>

<style scoped>
.base-table > thead {
  text-align: left !important;
}
</style>