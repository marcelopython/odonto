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
          <th v-if="sidebarState.isOpen">Visualizar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="permission in permissionGroup.data" :key="permission.id">
          <td>{{ permission.id }}</td>
          <td>{{ permission.name }}</td>
          <td>{{ permission.total }}</td>
          <td v-if="sidebarState.isOpen">{{ moment(permission.updated_at).format('DD/MM/YYYY') }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <Pagination @changePage="settings" :links="permissionGroup.links" />
    <ModalPermission 
      :isOpen="isOpen"
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

export default {
  props: {
    load: {
      default: false
    }
  },
  data() {
    return {
      permissionGroup: [],
      isOpen: false
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
    modalHide(){
      this.isOpen = false
    },
    openModal(){
      this.isOpen = true
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
        console.log('permissionG==>', permissionG)
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