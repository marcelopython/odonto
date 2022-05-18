<template>
  <div
    class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
    id="estoque-tab"
    role="tabpanel"
    aria-labelledby="estoque-tab-"
  >

  </div>
</template>

<script>
import Buttons from '@/components/Button.vue'

export default {
  props: {
    load: {
      default: true
    }
  },
  components: {
    Buttons
  },
  data(){
    return {
      data: {}
    }
  },
  watch: {
    load: function(){
      if(this.load){
        this.products()
      }
    }
  },
  methods: {
    products: () => {

    }
  }
}
</script>