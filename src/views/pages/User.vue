<template>
  <PageWrapper title="Usuários">
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
        id="tabExample"
        role="tablist"
      >
        <li class="mr-2" role="presentation">
          <button
            class="
              inline-flex
              p-4
              rounded-t-lg
              border-b-2 border-transparent
              hover:text-gray-600 hover:border-gray-300
              dark:hover:text-gray-300
              group
            "
            id="profile-tab-example"
            type="button"
            role="tab"
            aria-controls="profile-example"
            aria-selected="false"
          >
            <svg
              class="
                mr-2
                w-5
                h-5
                text-gray-400
                group-hover:text-gray-500
                dark:text-gray-500 dark:group-hover:text-gray-300
              "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Usuários
          </button>
        </li>
        <li class="mr-2" role="presentation" v-if="permission('permission-group.read')">
          <button
            class="
              inline-flex
              p-4
              rounded-t-lg
              border-b-2 border-transparent
              hover:text-gray-600 hover:border-gray-300
              dark:hover:text-gray-300
              group
            "
            id="settings-tab-example"
            type="button"
            role="tab"
            aria-controls="settings-example"
            aria-selected="false"
          >
            <svg
              class="
                mr-2
                w-5
                h-5
                text-gray-400
                group-hover:text-gray-500
                dark:text-gray-500 dark:group-hover:text-gray-300
              "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
              ></path>
            </svg>
            Configuração
          </button>
        </li>
      </ul>
    </div>
    <div id="tabContentExample">
      <IndexUsers :load="loadUsers" />
      <IndexPermission :load="loadPermission" />
    </div>
  </PageWrapper>
</template>
<script>
import Client from '@/services/Client'
const client = new Client()
import { mapGetters } from 'vuex'
import moment from 'moment'
import Buttons from '@/components/Button.vue'
import Pagination from '@/components/base/Pagination.vue'
import BaseModal from '@/components/base/Modal.vue'
import IndexPermission from '@/components/pages/user/IndexPermission.vue'
import IndexUsers from '@/components/pages/user/IndexUser.vue'
import { sidebarState } from '@/composables'
import { warnToast, successToast, errorToast } from '@/toast'

export default {
  data() {
    return {
      usersData: [],
      loadUsers: false,
      loadPermission: false,
    }
  },
  components: {
    IndexPermission,
    IndexUsers
  },
  computed: {
    ...mapGetters(['permission']),
  },
  methods: {
  },
  mounted() {
    const tabElements = [
      {
        id: 'profile',
        triggerEl: document.querySelector('#profile-tab-example'),
        targetEl: document.querySelector('#profile-example'),
      },
    ]

    if (this.permission('permission-group.read')) {
      tabElements.push({
        id: 'settings',
        triggerEl: document.querySelector('#settings-tab-example'),
        targetEl: document.querySelector('#settings-example'),
      })
    }

    // options with default values
    const options = {
      defaultTabId: 'settings',
      activeClasses:
        'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500',
      inactiveClasses:
        'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
      onShow: async (e) => {
        // console.log('tab is shown', e)
        switch (e._activeTab.id) {
          case 'settings':
            return (this.loadPermission = true)
          case 'profile':
            return this.loadUsers = true
        }
        this.loadUsers = false
        this.loadPermission = false
      },
    }
 
    const tabs = new Tabs(tabElements, options)

    tabs.show('profile')
    tabs.getActiveTab()
  },
}
</script>
<script setup>
import PageWrapper from '@/components/PageWrapper.vue'
import { onMounted, ref } from 'vue'
import BaseCard from '@/components/BaseCard.vue'
import Button from '@/components/Button.vue'
import ApexCharts from 'apexcharts'
import { ChartBarIcon, TrendingUpIcon, TrendingDownIcon, MinusIcon } from '@heroicons/vue/outline'
</script>

<style scoped>
.base-table > thead {
  text-align: left !important;
}
</style>