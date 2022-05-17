<template>

  <div
    class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
    id="profile-example"
    role="tabpanel"
    aria-labelledby="profile-tab-example"
  >
    <Buttons 
      v-if="permission('user.create')"
      :class="'float-right mb-3'"
      @click="openModal"
    >
      Cadastar Usuário 
    </Buttons>

    <table width="100%" cellpadding="5" class="base-table">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Grupo</th>
          <th v-if="permission('user.update')">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in usersData.data"
          :key="user.id"
        >
          <td>{{user.id}}</td>
          <td>{{user.first_name}} {{user.last_name}}</td>
          <td>{{user.phone}}</td> 
          <td>{{user.email}}</td>
          <td>{{user.permission_group}}</td>      
          <td v-if="permission('user.update')">
            <button @click="editUser(user)">
              <PencilIcon style="width:25px"/>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination @changePage="users" :links="usersData.links" />

    <ModalUser
      :isOpen="isOpen"
      @createUser="users"
      @modalHide="modalHide"
      @updateUser="users"
      :userEdit="userData"
    />
  </div>
</template>
<script>
import Client from '@/services/Client'
const client = new Client()
import { mapGetters } from 'vuex'
import moment from 'moment'
import Buttons from '@/components/Button.vue'
import Pagination from '@/components/base/Pagination.vue'
import ModalUser from '@/components/pages/user/ModalUser.vue'
import { warnToast, successToast, errorToast } from '@/toast'

export default {
  props: {
    load: {
      default: true
    }
  },
  data() {
    return {
      usersData: [],
      isOpen: false,
      userData: {}
    }
  },
  watch: {
    load: function(){
      if(this.load){
        this.users()
      }
    }
  },
  components: {
    ModalUser
  },
  computed: {
    ...mapGetters(['permission']),
  },
  methods: {
    editUser(userData){
      this.openModal()
      this.userData = userData 
    },
    openModal(){
      this.isOpen = true;
      this.userData = {}
    },
    modalHide(){
      this.isOpen = false
      this.edit = false
      this.userData = {}
    },
    async users() {
      try{
        let response = await client.get('user')
        this.usersData = response.data
        console.log(this.usersData)
      }catch(e){
        console.log(e)
      }
    },
  }
}
</script>
<script setup>
// import PageWrapper from '@/components/PageWrapper.vue'
// import { onMounted, ref } from 'vue'
// import BaseCard from '@/components/BaseCard.vue'
// import Button from '@/components/Button.vue'
// import ApexCharts from 'apexcharts'
import { PencilIcon } from '@heroicons/vue/outline'
</script>

<style scoped>
.base-table > thead {
  text-align: left !important;
}
</style>