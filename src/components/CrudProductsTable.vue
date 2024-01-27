<template>
  <div >
    <VaModal v-model="state.showEditModal" ok-text="Apply" class="modal-crud" @ok="onApply">
        <div v-if="state.selectedRow && state.selectedRow.images && state.selectedRow.images.length > 0" class="flex">
          <VaImage
            v-for="(image, index) in state.selectedRow.images"
            :key="index"
            class="w-full md:w-1/2 lg:w-1/3 m-2"
            :src="image"
          />
        </div>   
        <VaInput type="file" @change="handleFileUpload" label="Upload image" multiple/>
        <VaInput v-model="state.selectedRow.name" label="Name" placeholder="Name" autofocus = true class="my-6"/>
        <VaInput v-model="state.selectedRow.price"  label="Price"  :placeholder="state.selectedRow.price"  />
        <VaInput v-model="state.selectedRow.description" label="Description" :placeholder="state.selectedRow.description" class="my-6" />
        <VaInput v-model="state.selectedRow.quantity" label="Quantity"  :placeholder="state.selectedRow.quantity" class="my-6" />
    </VaModal>


    <div style="display: flex; justify-content: flex-end; margin-bottom: 20px">
      <VaButtonGroup>
        <div class="flex">
          <VaButton icon="add" class="mr-2">
            Add
          </VaButton>
          <VaButton icon="edit" class="mr-2" @click="onEditItem">
            Edit
          </VaButton>
          <VaButton icon="delete" @click="onDeleteItem">
            Delete
          </VaButton>
        </div>
      </VaButtonGroup>
    </div>


    <ag-grid-vue 
      style="height: 520px" 
      :class="themeClass" 
      :columnDefs="colDefs" 
      @grid-ready="onGridReady" 
      :rowData="rowData" 
      :defaultColDef="defaultColDef" 
      :pagination="false" 
      :rowSelection="'multiple'"
      @cell-value-changed="onCellValueChanged" 
      @selection-changed="onSelectionChanged"
      >
    </ag-grid-vue>

    <div style="display: flex; justify-content: flex-end; margin-top: 20px">
      <VaPagination 
        v-model="state.page"
        :pages="state.totalPages"
      />
    </div>

   
  </div>
</template>

<script>
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridVue } from 'ag-grid-vue3';
import { onMounted, ref, watch } from 'vue';
import { reactive } from 'vue';
import { useUserStore } from '@/stores/user.js';
import config from '@/config';


export default ({
  name: "CrudProductsTable",
  components: {
    AgGridVue,
  },
  methods: {
    onCellValueChanged(event) {
      console.log(`New Cell Value: ${event.value}`);
    },
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
       console.log(file);
      }
      state.selectedRow.newImages = files
    }
  },

  setup(props) {
    const rowData = ref([]);
    const gridApi = ref();

    const state = reactive({
      showEditModal: false,
      selectedRow: null,
      page: 1,
      totalPages: 1
    });

    watch(() => state.page, async (newValue, oldValue) => {
      console.log(`Page number changed from ${oldValue} to ${newValue}`);
      // Fetch data from the new page
      try {
        const responseProducts = await fetch(`${config.APIEndpoint}/admin/products?page=${newValue}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const dataProducts = await responseProducts.json();

        rowData.value = dataProducts.data;
        console.log(rowData.value);
      }
      catch (e) {
        console.log('error');
      }
    });

    const userStore = useUserStore();
    const token = userStore.token;

    // Fetch data when the component is mounted
    onMounted(async () => {
      try {
        const responseProducts = await fetch(`${config.APIEndpoint}/admin/products?page=1`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const dataProducts = await responseProducts.json();

        rowData.value = dataProducts.data;
        state.totalPages = dataProducts.meta._total_page;
        console.log(rowData.value);
      }
      catch (e) {
        console.log('error');
      }
    });

    // Actions buttons
    const onEditItem = () => {
      if (gridApi.value) {
        const selectedRows = gridApi.value.getSelectedRows();
        if (selectedRows[0]){
          state.selectedRow = selectedRows[0];
          state.showEditModal = true;  
        }
      }
    };

    const onApply = async () => {
      if (state.selectedRow) {
        // Update the data...

      }
    };

    const onDeleteItem = async () => {
        if (state.selectedRow) {
          console.log('delete');
          // Delete the data...
          // API call to delete the data on the server.

          // Find the deleted row in rowData and remove it
          const index = rowData.value.findIndex(row => row.id === state.selectedRow.id);
          if (index !== -1) {
            console.log(index);
            console.log(rowData.value[index]);
            rowData.value.splice(index, 1);
            console.log(rowData.value[index]);
          }

          // Refresh the grid 
          if (gridApi.value) {
            gridApi.value.refreshCells();
          }

          //state.showModal = false;
        }
      };

    const dateFormatter = (params) => {
      return new Date(params.value).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    };

    const colDefs = ref([
      { field: 'name', width: 250, checkboxSelection: true },
      {
        headerName: 'Image',
        field: 'images',
        width: 150,
        cellRenderer: (params) => {
          return `<div style="display: flex; overflow: auto;">${params.value.map(src => `<img src="${src}" style="width: 40px; height: auto"/>`).join('')}</div>`;
        }
      },
      { field: 'price', width: 130 },
      { field: 'description', width: 225 },
      { field: 'quantity', width: 130 },
      { field: 'createdAt', valueFormatter: dateFormatter },
      { field: 'updatedAt', valueFormatter: dateFormatter },
      
    ]);

    const defaultColDef = ref({
      filter: true,
    });

    const onGridReady = (params) => {
      gridApi.value = params.api;
      console.log('GridReady');
    };

    const onSelectionChanged = () => {
      if (gridApi.value) {
        const selectedRows = gridApi.value.getSelectedRows();
        console.log('click onSelectionChanged');
        //console.log(selectedRows[0].name);
        //state.selectedRow = selectedRows[0];
        //state.showModal = true;  
      }
    };

    return {
      state,
      rowData,
      gridApi,
      colDefs,
      defaultColDef,
      onGridReady,
      onSelectionChanged,
      onEditItem, 
      onDeleteItem,
      onApply,
      themeClass: "ag-theme-quartz",
    };
  },


});
</script>


<style lang="scss" scoped>
.table-crud {
  --va-form-element-default-width: 0;

  .va-input {
    display: block;
  }

  &__slot {
    th {
      vertical-align: middle;
    }
  }
}

.modal-crud {
  .va-input {
    display: block;
  }
}
</style>

