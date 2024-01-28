<template>
  <VaLayout>
    <template #top>
      <VaNavbar
        class="py-2"
        color="primary" 
      >
        <template #left>
          <VaButton
            :icon="showSidebar ? 'menu_open' : 'menu'"
            @click="showSidebar = !showSidebar"
          />
        </template>
        <template #center>
          <VaNavbarItem class="font-bold text-lg">
            Admin
          </VaNavbarItem>
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <div style="height: 100%"> 
      <VaSidebar v-model="showSidebar" class="py-4"  >
        <VaSidebarItem :active="page === 1" @click="page = 1" :class="{ 'active-page': page === 1 }">
          <VaSidebarItemContent>
            <VaIcon name="bar_chart" /> 
            <VaSidebarItemTitle>
              Home
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem :active="page === 2" @click="page = 2" :class="{ 'active-page': page === 2 }">
          <VaSidebarItemContent>
            <VaIcon name="production_quantity_limits" />
            <VaSidebarItemTitle>
              Products
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem :active="page === 3" @click="page = 3" :class="{ 'active-page': page === 3 }">
          <VaSidebarItemContent>
            <VaIcon name="category"  />
            <VaSidebarItemTitle>
              Category
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem :active="page === 4" @click="page = 4" :class="{ 'active-page': page === 4 }">
          <VaSidebarItemContent>
            <VaIcon name="group" />
            <VaSidebarItemTitle>
              Users
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem :active="page === 6" @click="page = 6" :class="{ 'active-page': page === 6 }">
          <VaSidebarItemContent>
            <VaIcon name="receipt_long" />
            <VaSidebarItemTitle>
              Invoices
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSpacer />
        <VaSidebarItem :active="page === 5" @click="$router.push('/')" :class="{ 'active-page': page === 5 }">
          <VaSidebarItemContent>
            <VaIcon name="arrow_back" />
            <VaSidebarItemTitle>
              Back
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>

      
      </div>
    </template>

    <template #content>
      <main
        v-if="page === 1"
        class="p-4"
      >
        <h3 class="va-h3">
          Statistics
          <Dashboard></Dashboard>
        </h3>
        
      </main>

      <main
        v-else-if="page === 2"
        class="p-4"
      >
        <h3 class="va-h3">
          Products Management
        </h3>
        <CrudProductsTable/>
      </main>

      <main
        v-else-if="page === 3"
        class="p-4"
      >
        <h3 class="va-h3">
          Categories Management
        </h3>
         <CategoriesManagement/>
      </main>

      <main
        v-else-if="page === 4"
        class="p-4"
      >
        <h3 class="va-h3">
          Users Management
        </h3>
        <UsersManagement/>
      </main>

      <main
        v-else-if="page === 6"
        class="p-4"
      >
        <h3 class="va-h3">
          Invoices Management
        </h3>
        <InvoicesManagement/>
      </main>
    </template>
  </VaLayout>
</template>

<style scoped>
  .active-page {
   
  }
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import CrudProductsTable from '@/components/CrudProductsTable.vue';
import Dashboard from '@/components/Dashboard.vue';
import CategoriesManagement   from  '@/components/CategoriesManagement.vue';
import UsersManagement from '@/components/UsersManagement.vue';
import InvoicesManagement from '@/components/InvoicesManagement.vue';
import { VaDataTable, VaLayout, VaNavbar, VaSidebar, VaSidebarItem, VaInput } from "vuestic-ui"

export default {
	name: 'Admin',
	components: {
    HelloWorld,
    VaDataTable,
    CrudProductsTable,
    CategoriesManagement,
    UsersManagement,
    InvoicesManagement,
    Dashboard,
    VaLayout
	},
  computed: {
    navbarColor() {
      //return getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim();
      return '#2c3e50';
    }
  },
	data() {
    return {
      breakpoints: {
        smDown: true,
      },
      showSidebar: false,
      page: 1,
      
    };
  },

  
};
  
</script>
