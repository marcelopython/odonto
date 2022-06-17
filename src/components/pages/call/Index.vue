<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
    <div class="flex" v-if="permission('order.read')">
      <div class="col-6 mb-3">   
          <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
          <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input  @keyup="searchOrder" v-model="search" type="search" id="search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar" required>
          </div>
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">#ID</th>
          <th scope="col" class="px-6 py-3">Dotor</th>
          <th scope="col" class="px-6 py-3">Cliente</th>
          <th scope="col" class="px-6 py-3">Conta</th>
          <th scope="col" class="px-6 py-3">Valor</th>
          <th scope="col" class="px-6 py-3">Data</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="order in dataorder.data"
          :key="order.id"
        >
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            <div class="read-status"></div><span> {{ order.id }}</span>
          </th>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {{ order.doctor }}
          </th>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {{ order.customer.name }}
          </th>
          <td class="px-6 py-4">
            <span>{{ order.customer.phone }}</span>
            <br />
            <span>{{ order.customer.email }}</span>
          </td>
          <td class="px-6 py-4">
            <span>{{ formatMoney(order.amount) }}</span>
          </td>
          <td class="px-6 py-4">
            <span>{{ moment(order.created_at).format('DD/MM/YYYY') }}</span>
          </td>
          <td class="px-6 py-4 text-right">
              <a @click="showInfo(order.id)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver</a>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination @changePage="paginate" :links="dataorder.links" />

  </div>
</template>

<script>

import Client from '@/services/Client'
const client = new Client()
import moment from 'moment'
import Buttons from '@/components/Button.vue'
import Pagination from '@/components/base/Pagination.vue'
import { mapGetters } from 'vuex'
   

export default {
  props:{
    load: {
      default: false
    }
  },
  data() {
    return {
      dataorder: [],
      search: ''
    }
  },
  components: {
    Buttons,
    Pagination
  },
  watch:{
    load: function(){
      if(this.load){
        this.orders() 
      }
    }
  },
  computed: {
    ...mapGetters(['permission']),
    getAnddress: function () {
      return (data, slice = true) => {
        let text = data.neighborhood + ' - ' + data.street + ' - ' + data.number
        if (text.length > 20 && slice) {
          return text.slice(0, 20) + '...'
        }
        return text
      }
    },
    formatMoney: function(){
      return (value) => {
          return Number(value / 100).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
      }
    }
  },
  methods: {
    showInfo(id){
      this.$emit('showInfo', id);
    },
    searchOrder(){
      setTimeout(()=>{
        this.orders() 
      }, 500);
    },
    async orders(page='1') {
      let linkPage = ''
      if(page.url) {
          linkPage = 'order?page=' + page.url.split('?page=')[1]
      }else{
          linkPage = 'order?page='+page
      }
      let search = '';

      if(this.search.split('+').length > 1){
        search = this.search.split('+')[1];
      }else{
        search = this.search;
      }
      
      return await client.get(linkPage+'&search='+search).then((response) => {
        console.log(response.data)
        this.dataorder = response.data
      })
    },
    tooltipAddress() {
      const targetEl = document.getElementsByClassName('tooltip-address')
      const triggerEl = document.getElementsByClassName('content-address')
      const options = {
        placement: 'bottom',
        triggerType: 'hover',
      };
      [...targetEl].forEach((element, index) => {
        new Tooltip(element, triggerEl[index], options)
      })
    },
    async paginate(page){
      await this.orders(page)
      this.tooltipAddress()
    }
  },
  async mounted() {
    if(this.permission('order.read')){
      this.paginate(1)
    }
  },
}
</script>
<script setup>
// import { ChartBarIcon, TrendingUpIcon, TrendingDownIcon, MinusIcon } from '@heroicons/vue/outline'
</script>

<style >
  .read-status{
    display: inline-block;
    margin-right: 5px;
    height: 10px;
    width: 10px;
    background-color: rgb(0, 4, 255);
    border-radius: 50%;
  }
</style>