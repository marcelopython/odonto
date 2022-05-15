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
          <td>{{ permission.total }}</td>
          <td v-if="sidebarState.isOpen">{{ moment(permission.updated_at).format('DD/MM/YYYY') }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <Pagination @changePage="settings" :links="permissionGroup.links" />
  </div>
</template>

<script>
import Client from '@/services/Client'
const client = new Client()
import moment from 'moment'
import Buttons from '@/components/Button.vue'
import Pagination from '@/components/base/Pagination.vue'
import { warnToast, successToast, errorToast } from '@/toast'

export default {
  data() {
    return {
      permissionGroup: [],
      dataClassModal: null,
    }
  },
  components: {
    Buttons,
    Pagination,
  },
  methods: {
    async storePermission() {
      try {
        if (!this.permissionSelected[0]) {
          warnToast({
            text: 'Permissão e obrigatório!',
            title: 'Permissão',
          })
          return false
        }
        if (!this.nameGroupPermission) {
          return warnToast({
            text: 'Nome do grupo e obrigatório!',
            title: 'Permissão',
          })
        }
        this.disabledBtn = true
        let roles = await client.post('permission-group', {
          permissions: this.permissionSelected,
          name: this.nameGroupPermission,
        })

        if (roles.data && roles.data.id) {
          this.settings()
          this.modalHide()
          this.disabledBtn = false
          return successToast({
            text: 'Grupo de permissão configurado com sucesso!',
            title: 'Permissão',
          })
        }
        errorToast({
          text: 'Ocorreu uma falha ao cadastrar grupo de permissão',
          title: 'Permissão',
        })
      } catch (e) {
        console.log(e)
      }
    },
    async settings(link = null) {
      try {
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

<style scoped>
.base-table > thead {
  text-align: left !important;
}
</style>