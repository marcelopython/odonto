<template>
  
<div aria-label="Page navigation" class="mt-3">
  <ul class="inline-flex items-center -space-x-px">
    <li 
      v-for="link in links"
      :key="link.id"
    >
      <button href="#" 
        :disabled="!link.url"
        :class="classCorrentPage(link.active)"
         v-html="link.label"
         @click="changePage(link)"
      >
      </button>
    </li>
  </ul>
</div>   

</template>

<script>
export default {
  props: {
    links: {

    }
  },
  computed: {
    classCorrentPage: function(){
      return (active)=>{
        if(active){
          return 'z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
        }
        return "py-2 px-3 leading-tight text-gray-500 bg-white  border border-gray-300 hover:bg-gray-100 hover:text-gray-700       dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      }
    }
  },
  methods: {
    changePage(link){
      this.$emit('changePage', link)
    }
  }
}
</script>