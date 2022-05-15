<template>
      <div
        v-if="permission('permission-group.read')"
        class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
        id="settings-example"
        role="tabpanel"
        aria-labelledby="settings-tab-example"
      >
        <Buttons :class="' float-right mb-3'" @click="openModalFormPermission('modal-create-permission')">
          Cadastar Grupo de permissão
        </Buttons>
        <table width="100%" cellpadding="5" class="base-table">
          <thead>
            <tr>
              <th>#ID</th>
              <th>Nome</th>
              <th>Usuários</th>
              <th v-if="sidebarState.isOpen">Data Atualização</th>
              <th v-if="sidebarState.isOpen">Visualizar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="permission in permissionGroup.data" :key="permission.id">
              <td>{{ permission.id }}</td>
              <td>{{ permission.name }}</td>
              <td>{{permission.total}}</td>
              <td v-if="sidebarState.isOpen">{{ moment(permission.updated_at).format('DD/MM/YYYY') }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        
      <Pagination
        @changePage="settings"
        :links="permissionGroup.links"
      />

      </div>
    </div>
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

        if(roles.data && roles.data.id){
          this.settings()
          this.modalHide();
          this.disabledBtn = false
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
    async settings(link = null) {
      try {
        let linkPage = ''
        if(!link){
          linkPage = 'permission-group'
        }else{
          linkPage = 'permission-group?page='+link.url.split('?page=')[1]
        }
        let permissionG = await client.get(linkPage)
        this.permissionGroup = permissionG.data
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
          console.log('modal is hidden')
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
    },
    users() {},
    
  },
  mounted() {
    const tabElements = [
      {
        id: 'profile',
        triggerEl: document.querySelector('#profile-tab-example'),
        targetEl: document.querySelector('#profile-example'),
      },
    ]

    if (this.permission('permission-group.read')) {
      tabElements.push({
        id: 'settings',
        triggerEl: document.querySelector('#settings-tab-example'),
        targetEl: document.querySelector('#settings-example'),
      })
    }

    // options with default values
    const options = {
      defaultTabId: 'settings',
      activeClasses:
        'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500',
      inactiveClasses:
        'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
      onShow: async (e) => {
        // console.log('tab is shown', e)
        switch (e._activeTab.id) {
          case 'settings':
            await this.settings()
            break
        }
      },
    }

    const tabs = new Tabs(tabElements, options)

    tabs.show('profile')
    tabs.getActiveTab()
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