<template>
  <div
    v-if="permission('permission-group.read')"
    class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
    id="settings-example"
    role="tabpanel"
    aria-labelledby="settings-tab-example"
  >
    <Buttons :class="' float-right mb-3'" @click="openModal">
      Cadastar Grupo de permissão
    </Buttons>
    <table width="100%" cellpadding="5" class="base-table">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Nome</th>
          <th>Usuários</th>
          <th v-if="sidebarState.isOpen">Data Atualização</th>
          <th v-if="(this.permission('permission-group.update') || this.permission('permission-group.delete')) && sidebarState.isOpen">Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="permission in permissionGroup.data" :key="permission.id">
          <td>{{ permission.id }}</td>
          <td>{{ permission.name }}</td>
          <td>{{ permission.total }}</td>
          <td v-if="sidebarState.isOpen">{{ moment(permission.updated_at).format('DD/MM/YYYY') }}</td>
          <td
          v-if="(this.permission('permission-group.update') || this.permission('permission-group.delete'))"
          >
            <Dropdown align="right" width="48" 
              v-if="!permission.default">
              <template #trigger>
                    <button
                        class="flex text-sm transition border-2 border-transparent rounded-md focus:outline-none focus:ring focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark-eval-1"
                    >
                      <DotsHorizontalIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
                    </button>
                </template>
                <template #content>
                    <button 
                    v-if="this.permission('permission-group.update')"
                    style="display: flex; padding: 10px" @click="edit(permission)">
                      <PencilIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
                      <span style="margin-left: 5px">Editar</span>
                    </button>
                    <button 
                    v-if="this.permission('permission-group.delete')"
                    style="display: flex; padding: 10px">
                      <FolderRemoveIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
                      <span style="margin-left: 5px">Remover</span>
                    </button>
                </template>
            </Dropdown>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination @changePage="settings" :links="permissionGroup.links" />
    <ModalPermission 
      :isOpen="isOpen"
      :edit="permissionEdit"
      @createPermission="settings"
      @modalHide="modalHide"
    />
  </div>
</template>

<script>
import Client from '@/services/Client'
const client = new Client()
import moment from 'moment'
import Buttons from '@/components/Button.vue'
import Pagination from '@/components/base/Pagination.vue'
import ModalPermission from '@/components/pages/user/ModalPermission.vue'
import { warnToast, successToast, errorToast } from '@/toast'
import { mapGetters } from 'vuex'
import { sidebarState } from '@/composables'
import Dropdown from '@/components/Dropdown.vue'
import { DotsHorizontalIcon, PencilIcon, FolderRemoveIcon } from '@heroicons/vue/outline'

export default {
  props: {
    load: {
      default: false
    }
  },
  data() {
    return {
      permissionGroup: [],
      isOpen: false,
      permissionEdit: {}
    }
  },
  computed: {
    ...mapGetters(['permission']),
  },
  watch: {
    load: function(){
      if(this.load){
        this.settings()
      }
    }
  },
  components: {
    Buttons,
    Pagination,
  },
  methods: {
    edit(permission){
      console.log(permission)
      this.openModal()
      this.permissionEdit = permission
    },
    modalHide(){
      this.isOpen = false
    },
    openModal(){
      this.isOpen = true
      this.permissionEdit = {}
    },
    async settings(link = null) {
      try {
        this.isOpen = false
        let linkPage = ''
        if (!link) {
          linkPage = 'permission-group'
        } else {
          linkPage = 'permission-group?page=' + link.url.split('?page=')[1]
        }
        let permissionG = await client.get(linkPage)
        this.permissionGroup = permissionG.data
      } catch (e) {
        console.log(e)
      }
    }
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