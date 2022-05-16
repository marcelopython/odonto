<template>
    <BaseModal size="smal" 
      :id="this.idModal"
      @modalHide="modalHide"
      @create="storePermission"
      :disabledBtn="disabledBtn"
      :title="'Configuração permissão'"
    >
      <template #body>
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Nome do grupo
          </label>
          <input
            type="text"
            id="name"
            @keyup="(e)=> nameGroupPermission = e.target.value"
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
            placeholder="Admin..."
            required
          />
        </div>
        <!-- <div style="display: flex; justify-content: space-between"> -->
        <div class="grid gap-6 mb-6 lg:grid-cols-2 flex">
          <div style="padding-right: 15px" v-for="(role, index) in roles" :key="index">
            <span for="" >{{ index }}</span>
            <hr>
            <br>
            <div style="display:flex; justify-content: left;">
            <label
              :for="'toggle' + permission.id"
              class="inline-flex relative items-center cursor-pointer ml-1"
              
              v-for="permission in role"
              :key="permission.id"
            >
              <input type="checkbox" @change="checkPermission" :value="permission.id" :id="'toggle' + permission.id" class="sr-only peer" />
              <div
                class="
                  w-11
                  h-6
                  bg-gray-200
                  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                  dark:peer-focus:ring-blue-800
                  rounded-full
                  peer
                  dark:bg-gray-700
                  peer-checked:after:translate-x-full peer-checked:after:border-white
                  after:content-['']
                  after:absolute
                  after:top-[2px]
                  after:left-[2px]
                  after:bg-white
                  after:border-gray-300
                  after:border
                  after:rounded-full
                  after:h-5
                  after:w-5
                  after:transition-all
                  dark:border-gray-600
                  peer-checked:bg-blue-600
                "
              ></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                this.namePermission(permission.name)
              }}</span>
            </label>
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
</template>
<script>
import Client from '@/services/Client'
const client = new Client()
import { mapGetters } from 'vuex'
import moment from 'moment'
import Buttons from '@/components/Button.vue'
import Pagination from '@/components/base/Pagination.vue'
import BaseModal from '@/components/base/Modal.vue'
import { sidebarState } from '@/composables'
import { warnToast, successToast, errorToast } from '@/toast'


export default {
  props:{
    isOpen: {
      default: false
    }
  },
  data() {
    return {
      permissionGroup: [],
      idModal: 'modal-create-permission',
      dataClassModal: null,
      roles: {},
      permissionSelected: [],
      nameGroupPermission: '',
      disabledBtn: false
    }
  },
  watch: {
    isOpen: function(){
      console.log(this.isOpen)
      if(this.isOpen){
        this.openModalFormPermission(this.idModal)
      }
    }
  },
  components: {
    Modal,
    Buttons,
    Pagination
  },
  computed: {
    ...mapGetters(['permission']),
    namePermission: function () {
      return (permission) => {
        switch (permission.split('.')[1]) {
          case 'read':
            return 'Visualizar'
          case 'update':
            return 'Atualizar'
          case 'delete':
            return 'Remover'
          case 'create':
            return 'Cadastrar'
          default:
            return 'Não configurado'
        }
      }
    },
  },
  methods: {
    async storePermission(){
      try {        

        if(!this.permissionSelected[0]){
          warnToast({
             text: 'Permissão e obrigatório!',
             title: 'Permissão'
          })
          return false;
        }
        if(!this.nameGroupPermission){
          return warnToast({
             text: 'Nome do grupo e obrigatório!',
             title: 'Permissão'
          })
        }
        this.disabledBtn = true
        let roles = await client.post('permission-group',{
          'permissions' : this.permissionSelected,
          'name': this.nameGroupPermission
        })

        this.disabledBtn = false
        if(roles.data && roles.data.id){
          this.modalHide();
          this.$emit('createPermission');
           return successToast({
              text: 'Grupo de permissão configurado com sucesso!',
              title: 'Permissão'
          })
        }
        errorToast({
            text: 'Ocorreu uma falha ao cadastrar grupo de permissão',
            title: 'Permissão'
        })
      } catch (e) {
        this.disabledBtn = false
        console.log(e)
      }
    },
    checkPermission(el){
      let value = el.target.value
      if(el.target.checked){
        this.permissionSelected.push({'role_id': value})
      }else{
        this.permissionSelected = this.permissionSelected.filter(item=>item.role_id != value)
      }
    },
    openModalFormPermission(idModal) {
      this.roles = {}
      this.nameGroupPermission = ''
      this.getRoles()
      this.idModal = idModal
      this.dataClassModal = this.modal()
      this.dataClassModal.show()
    },
    async getRoles() {
      try {
        let roles = await client.get('permission-group/role/')

        let data = {}

        roles.data.forEach((element) => {
          if (!data[element.title]) {
            data = Object.assign(data, { [element.title]: [element] })
          } else {
            data[element.title].push(element)
          }
        })

        this.roles = data

        console.log(this.roles)
      } catch (e) {
        console.log(e)
      }
    },
    modal() {
      const targetEl = document.getElementById(this.idModal)
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
      this.dataClassModal.hide()
      this.$emit('modalHide')
    },
  },
}
</script>
<script setup>
import PageWrapper from '@/components/PageWrapper.vue'
import { onMounted, ref } from 'vue'
import BaseCard from '@/components/BaseCard.vue'
import Button from '@/components/Button.vue'
import ApexCharts from 'apexcharts'
import { ChartBarIcon, TrendingUpIcon, TrendingDownIcon, MinusIcon } from '@heroicons/vue/outline'
</script>

<style scoped>
.base-table > thead {
  text-align: left !important;
}
</style>