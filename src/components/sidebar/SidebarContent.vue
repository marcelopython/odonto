<template>
    <PerfrectScrollbar
        tagname="nav"
        aria-label="main"
        class="relative flex flex-col flex-1 max-h-full gap-4 px-3"
    >
        <SidebarLink
            title="Dashboard"
            :to="{ name: 'Dashboard' }"
            :active="isCurrentRoute('Dashboard')"
        >
            <template #icon>
                <DashboardIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
        </SidebarLink>
        <SidebarLink  
            :to="{ name: 'Blank' }"
             title="Financeiro" 
             :active="isCurrentRoute('Blank')"
             >
            <template #icon>
                <CurrencyDollarIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
        </SidebarLink>

        <SidebarLink  
            :to="{ name: 'Blank' }"
             title="Serviços" 
             :active="isCurrentRoute('Blank')"
             >
            <template #icon>
                <CheckIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
        </SidebarLink>
        <!-- <SidebarCollapsible title="Pages" :active="isCurrentPath('/pages')">
            <template #icon>
                <DocumentIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
            <SidebarCollapsibleItem
                :to="{ name: 'Blank' }"
                title="Blank"
                :active="isCurrentRoute('Blank')"
            />
        </SidebarCollapsible> -->
        <SidebarLink  
            :to="{ name: 'Blank' }"
             title="Produtos" 
             :active="isCurrentRoute('Blank')"
             >
            <template #icon>
                <PlusIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
        </SidebarLink>
        <SidebarLink  
            :to="{ name: 'Blank' }"
             title="Relatorios" 
             :active="isCurrentRoute('Blank')"
             >
            <template #icon>
                <ChartBarIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
        </SidebarLink>
        <SidebarLink  
            :to="{ name: 'Blank' }"
             title="Documentos" 
             :active="isCurrentRoute('Blank')"
             >
            <template #icon>
                <DocumentTextIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
        </SidebarLink>
        <SidebarLink  
            :to="{ name: 'Blank' }"
             title="Receituario" 
             :active="isCurrentRoute('Blank')"
             >
            <template #icon>
                <DocumentTextIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
        </SidebarLink>
        <SidebarLink  
            :to="{ name: 'Blank' }" 
            title="Clientes" 
            :active="isCurrentRoute('Blank')"
        >
            <template #icon>
                <UserGroupIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
        </SidebarLink>
        <SidebarLink  
            :to="{ name: 'Blank' }"
             title="Calendario" 
             :active="isCurrentRoute('Blank')"
             >
            <template #icon>
                <CalendarIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
        </SidebarLink>
        <SidebarLink  
            :to="{ name: 'Blank' }"
             title="Chat" 
             :active="isCurrentRoute('Blank')"
             >
            <template #icon>
                <ChatAlt2Icon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
        </SidebarLink>
        <SidebarLink  
            :to="{ name: 'User' }"
             title="Usuários" 
             :active="isCurrentRoute('User')"
             >
            <template #icon>
                <UserCircleIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
        </SidebarLink>
        <SidebarCollapsible title="Authentication">
            <template #icon>
                <ShieldCheckIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
            </template>
            <SidebarCollapsibleItem :to="{ name: 'Login' }" title="Login" />
            <SidebarCollapsibleItem :to="{ name: 'Register' }" title="Register" />
            <SidebarCollapsibleItem :to="{ name: 'VerifyEmail' }" title="Verify Email" />
            <SidebarCollapsibleItem :to="{ name: 'ForgotPassword' }" title="Forgot Password" />
            <SidebarCollapsibleItem :to="{ name: 'ResetPassword' }" title="Reset Password" />
            <SidebarCollapsibleItem :to="{ name: 'ConfirmPassword' }" title="Confirm Password" />
        </SidebarCollapsible>
    </PerfrectScrollbar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import PerfrectScrollbar from '@/components/PerfectScrollbar.vue'
import SidebarLink from '@/components/sidebar/SidebarLink.vue'
import { DashboardIcon } from '@/components/icons/outline'
import { ShieldCheckIcon, DocumentIcon, UserCircleIcon,
 UserGroupIcon, CheckIcon, PlusIcon, CurrencyDollarIcon, CalendarIcon
 ,ChatAlt2Icon, ChartBarIcon, DocumentTextIcon
 } from '@heroicons/vue/outline'
import SidebarCollapsible from '@/components/sidebar/SidebarCollapsible.vue'
import SidebarCollapsibleItem from '@/components/sidebar/SidebarCollapsibleItem.vue'

const isCurrentRoute = (routeName) => {
    return useRouter().currentRoute.value.name == routeName
}

const isCurrentPath = (path) => {
    return useRouter().currentRoute.value.path.startsWith(path)
}
</script>
