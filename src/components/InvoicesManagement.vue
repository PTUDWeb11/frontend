<template>
  <div>
      <VaModal
        v-model="state.updateSuccess"
        :message="message"
      >
          Update successful
      </VaModal>

      <VaModal
        v-model="state.updateFailed"
        :message="message"
      >
          Update failed
      </VaModal>

      <VaModal
        v-model="state.deleteSuccess"
        :message="message"
      >
        Delete successful
      </VaModal>

      <VaModal
        v-model="state.addSuccess"
        :message="message"
      >
        Add successful
      </VaModal>     

      <VaModal
        v-model="state.addFailed"
        :message="message"
      >
        Add failed
      </VaModal>  

    <VaModal v-model="state.showEditModal" ok-text="Apply" class="modal-crud" @ok="onApply">
      <div class="flex flex-col">
        <VaRadio
          v-for="status in ['paying', 'processing', 'delivering', 'delivered', 'canceled']"
          :key="status"
          v-model="state.selectedRow.status"
          :option="status"
          :label="status"
          name="status"
          class="mb-6"
        />
      </div>
    </VaModal>

    <VaModal v-model="state.showDeleteConfirm" ok-text="Yes" class="modal-crud" @ok="deleteProduct">
      Are you sure you want to delete {{ state.selectedRow.name }}?
    </VaModal>

    <div style="display: flex; justify-content: flex-end; margin-bottom: 20px">
      <VaButtonGroup>
        <div class="flex">
          <VaButton icon="edit" class="mr-2" @click="onEditItem">
            Update status
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
  name: "InvoicesManagement",
  components: {
    AgGridVue,
  },
  methods: {
    onCellValueChanged(event) {
      console.log(`New Cell Value: ${event.value}`);
    },
  },

  setup(props) {
    const rowData = ref([]);
    const gridApi = ref();
    const selectionCategory = ref([]);
    const categories = ref([]);

    const state = reactive({
      showEditModal: false,
      showDeleteConfirm: false, 
      selectedRow: {},
      page: 1,
      totalPages: 1,
      updateSuccess: false,
      updateFailed: false,
      addSuccess: false,
      addFailed: false,
      deleteSuccess: false,
      selectedFileNames: [],
    });

    const handleFileUpload = (event) => {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file);
      }
      state.selectedRow.newImages = Array.from(files);
      state.selectedFileNames = Array.from(files).map(file => file.name); 
      console.log(state.selectedRow.newImages.length);
    };

    const userStore = useUserStore();
    const token = userStore.token;

    const fetchData = async (page) => {
      try {
        const responseProducts = await fetch(`${config.APIEndpoint}/admin/invoices?page=${page}&limit=10`, {
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
    };

    const fetchCategories = async (page = 1, limit = 10) => {
      try {
        const response = await fetch(`${config.APIEndpoint}/admin/categories?page=${page}&limit=${limit}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        categories.value = data.data; 
      }
      catch (e) {
        console.log('error');
      }
    };

    // Fetch data when the component is mounted
    onMounted(() => {
      fetchData(state.page);
      fetchCategories();
    }
    );

    // Fetch data when the page number changes
    watch(() => state.page, fetchData);

    
    // Actions buttons
    // Edit
    const onEditItem = () => {
      if (gridApi.value) {
        const selectedRows = gridApi.value.getSelectedRows();
        if (selectedRows[0]){
          state.selectedRow = selectedRows[0];
          state.showEditModal = true;  
        }
      }
    };

    const onDeleteImage = (index) => {
      state.selectedRow.images.splice(index, 1);
    };


    const onApply = async () => {
      if (state.selectedRow) {
        // Prepare the invoice data
        const invoiceData = {
          status: state.selectedRow.status,
        };

        // Send the updated invoice data to the update invoice API
        let response;
        if (state.selectedRow.id) {
          // If the invoice has an ID, update it
          response = await fetch(`${config.APIEndpoint}/admin/invoices/${state.selectedRow.id}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceData),
          });

          if (response.ok) {
            state.updateSuccess = true;
            // Refresh the grid
            fetchData(state.page)
          }
          else {
            state.updateFailed = true;
          }
        }

        state.showEditModal = false;
      }
    };

    // Add
    const onAddItem = () => {
      state.selectedRow = {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        categories: [],
        images: [],
        newImages: [],
      };
      state.showEditModal = true;
    };


    // Delete
    const onDeleteItem = () => {
      if (gridApi.value) {
        const selectedRows = gridApi.value.getSelectedRows();
        if (selectedRows[0]){
          state.selectedRow = selectedRows[0];
          state.showDeleteConfirm = true; 
        }
      }
    };

    const deleteProduct = async () => {
      if (state.selectedRow) {
        const response = await fetch(`${config.APIEndpoint}/admin/products/${state.selectedRow.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          state.deleteSuccess = true;
          // Refresh the grid
          fetchData(state.page);
        }
      }

      state.showDeleteConfirm = false; 
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
      {
        headerName: 'Avatar',
        field: 'user.avatar',
        width: 80,
        cellRenderer: (params) => {
          return `<img src="${params.value}" style="width: 40px; height: auto"/>`;
        }
      },
      { field: 'user.email', headerName: 'Email', width: 250 },
      { field: 'user.name', headerName: 'Name', width: 200 },
      { field: 'status', headerName: 'Status', width: 100 },
      { field: 'totalPrice', headerName: 'Total Price', width: 150 },
      { field: 'code', headerName: 'Code', width: 200 },
      { field: 'createdAt', headerName: 'Created At', valueFormatter: dateFormatter },
      { field: 'updatedAt', headerName: 'Updated At', valueFormatter: dateFormatter }, 
    ]);
    const defaultColDef = ref({
      filter: true,
    });

    const onGridReady = (params) => {
      gridApi.value = params.api;
      console.log('GridReady');
    };

 

    return {
      state,
      rowData,
      gridApi,
      colDefs,
      defaultColDef,
      onGridReady,
      onEditItem, 
      onAddItem,
      onDeleteItem,
      deleteProduct,
      onDeleteImage,
      onApply,
      selectionCategory,
      handleFileUpload,
      themeClass: "ag-theme-quartz",
      categories, 
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

