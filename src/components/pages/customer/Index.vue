<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
    <div class="flex" v-if="permission('customer.read')">
      <div class="col-6 mb-3">
        <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
        <div class="relative">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            @keyup="searchCustomer"
            v-model="search"
            type="search"
            id="search"
            class="
              block
              p-4
              pl-10
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
            placeholder="Buscar"
            required
          />
        </div>
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Nome</th>
          <th scope="col" class="px-6 py-3">Contato</th>
          <th scope="col" class="px-6 py-3">CPF</th>
          <th scope="col" class="px-6 py-3">Endereço</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="customer in dataCustomer.data"
          :key="customer.id"
        >
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {{ customer.name }}
          </th>
          <td class="px-6 py-4">
            <span>{{ customer.phone }}</span>
            <br />
            <span>{{ customer.email }}</span>
          </td>
          <td class="px-6 py-4">
            {{ customer.cpf_cnpj }}
          </td>
          <td class="px-6 py-4 content-address">
            <span>{{ getAnddress(customer) }}</span>
            <div
              role="tooltip"
              class="
                tooltip-address
                inline-block
                absolute
                invisible
                z-10
                py-2
                px-3
                text-sm
                font-medium
                text-white
                bg-gray-900
                rounded-lg
                shadow-sm
                opacity-0
                transition-opacity
                duration-300
                tooltip
                dark:bg-gray-700
              "
            >
              {{ getAnddress(customer, false) }}
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
          </td>
          <td class="px-6 py-4 text-right">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination @changePage="paginate" :links="dataCustomer.links" />
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
  data() {
    return {
      dataCustomer: [],
      search: '',
    }
  },
  components: {
    Buttons,
    Pagination,
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
  },
  methods: {
    searchCustomer() {
      setTimeout(() => {
        this.customers()
      }, 500)
    },
    async customers(page = '1') {
      let linkPage = ''
      if (page.url) {
        linkPage = 'customer?page=' + page.url.split('?page=')[1]
      } else {
        linkPage = 'customer?page=' + page
      }
      let search = ''

      if (this.search.split('+').length > 1) {
        search = this.search.split('+')[1]
      } else {
        search = this.search
      }

      return await client.get(linkPage + '&search=' + search).then((response) => {
        this.dataCustomer = response.data
      })
    },
    tooltipAddress() {
      const targetEl = document.getElementsByClassName('tooltip-address')
      const triggerEl = document.getElementsByClassName('content-address')
      const options = {
        placement: 'bottom',
        triggerType: 'hover',
      }
      ;[...targetEl].forEach((element, index) => {
        new Tooltip(element, triggerEl[index], options)
      })
    },
    async paginate(page) {
      await this.customers(page)
      this.tooltipAddress()
    },
  },
  async mounted() {
    if (this.permission('customer.read')) {
      this.paginate(1)
    }
  },
}
</script>