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
            LOGO
          </VaNavbarItem>
        </template>
      </VaNavbar>
    </template>

    <template #left>
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
            <VaIcon name="category" />
            <VaSidebarItemTitle>
              Category
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem :active="page === 3" @click="page = 3" :class="{ 'active-page': page === 3 }">
          <VaSidebarItemContent>
            <VaIcon name="production_quantity_limits" />
            <VaSidebarItemTitle>
              Products
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
      </VaSidebar>
    </template>

    <template #content>
      <main
        v-if="page === 1"
        class="p-4"
      >
        <h3 class="va-h3">
          Page 1
        </h3>
        
      </main>

      <main
        v-else-if="page === 2"
        class="p-4"
      >
        <h3 class="va-h3">
          Page 2
        </h3>
       <VaDataTable :items></VaDataTable>
      </main>

      <main
        v-else-if="page === 3"
        class="p-4"
      >
        <h3 class="va-h3">
          Products list
        </h3>
        <CrudDataTable />
      </main>

      <main
        v-else-if="page === 4"
        class="p-4"
      >
        <h3 class="va-h3">
          Page 4
        </h3>
       <VaDataTable :items></VaDataTable>
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
import CrudDataTable from '@/components/CrudDataTable.vue';
import { VaDataTable, VaLayout, VaNavbar, VaSidebar, VaSidebarItem, VaInput } from "vuestic-ui"

export default {
	name: 'Admin',
	components: {
    HelloWorld,
    VaDataTable,
    CrudDataTable,
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
      items: [
        {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        phone: "1-463-123-4447",
        website: "ramiro.info",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        phone: "493-170-9623 x156",
        website: "kale.biz",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        phone: "(254)954-1289",
        website: "demarco.info",
      },
      ],
      breakpoints: {
        smDown: true, // Or any other value you need
      },
      showSidebar: false,
      page: 1,
      
    };
  },

  
};
  
</script>
