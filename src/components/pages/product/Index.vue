<template>
  <div
    class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
    id="product-tab"
    role="tabpanel"
    aria-labelledby="product-tab-"
  >
    <div v-if="!isEdit">
      <div style="display: block" class="h-20" v-if="permission('user.create')">
        <Buttons :class="' float-right mb-3'" @click="isEdit = !isEdit"> Cadastar Produto </Buttons>
      </div>
      <div :style="styleContentProduct">
        <div
          class="m-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
          :style="!isMobile ? 'width: 25%; display: inline-block;' : ''"
          v-for="product in products.data "
          :key="product.id"
        >
          <a href="#">

            <img class="rounded-t-lg" 
              :src="product.image ? product.image.link.link : 'https://flowbite.com/docs/images/blog/image-1.jpg'"
              alt="" 
            />
            
          </a>
          <div class="p-5">
            <a href="#">
              <h6 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                {{product.name}}  
              </h6>
            </a>
            <p
              class="mb-3 font-normal text-gray-700 dark:text-gray-400"
              style="display: flex; justify-content: space-around"
            >
              <span title="Estoque Total">Estoque: {{product.total_stock}}</span>
              <span title="Quantidade Mínima">QT: Mínima: {{product.total_stock_min}}</span>
            </p>
            <span title="Valor Total">Valor Total: R$ {{product.amount}}</span>
          </div>
        </div>
      </div>

      <Pagination @changePage="index" :links="products.links" />

    </div>
    <div v-else>
      <CreateOrUpdate @createOrUpdate="createOrUpdate" @cancel="cancel" />
    </div>
  </div>
</template>

<script>
import Buttons from '@/components/Button.vue'
import { sidebarState } from '@/composables'
import CreateOrUpdate from '@/components/pages/product/CreateOrUpdate.vue'
import Client from '@/services/Client'
const client = new Client()
import Pagination from '@/components/base/Pagination.vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    load: {
      default: true,
    },
  },
  components: {
    Buttons,
    CreateOrUpdate,
    Pagination
  },
  data() {
    return {
      data: {},
      isEdit: false,
      products: {}
    }
  },
  watch: {
    load: function () {
      if (this.load) {
        this.index()
      }
    },
  },
  computed: {
    ...mapGetters(['permission']),
    styleContentProduct: function () {
      if (!this.isMobile) {
        return 'display: block; text-align: center;'
      }
      return ''
    },
    isMobile: function () {
      if (window.innerWidth < 745) {
        return true
      }
      return false
    },
  },
  methods: {
    async index(link = null) {
      
      try {
        let linkPage = ''
        if (!link) {
          linkPage = 'product'
        } else {
          linkPage = 'product?page=' + link.url.split('?page=')[1]
        }

        let response = await client.get(linkPage)
        this.products = response.data

      } catch (e) {
        console.log(e)
      }
    },
    createOrUpdate() {
      this.isEdit = !this.isEdit
      this.index()
    },
    cancel() {
      this.isEdit = !this.isEdit
    },
  },
  mounted() {
     this.index()
     this.isEdit = false
  },
}
</script>