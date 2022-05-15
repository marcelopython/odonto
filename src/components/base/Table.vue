<template>
     <table width="100%" class="base-table">
        <thead >
          <tr>
            <th 
              v-for="column in columns"
              :key="column"
              >
              {{column}}
            </th>
          </tr>
        </thead>
        <tbody >
          <tr
            v-for="item in data"
          >
            <td v-for="text in item">
              
            </td>
          </tr>
        </tbody>
      </table>
</template>

<script setup>
import { computed } from 'vue'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'

const props = defineProps({
    columns: {
        default: []
    }
})

</script>
