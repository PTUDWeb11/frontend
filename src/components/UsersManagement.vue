<template>
  <div>
      <VaModal
        v-model="state.deleteSuccess"
        :message="message"
      >
        Delete successful
      </VaModal>

   

    <VaModal v-model="state.showDeleteConfirm" ok-text="Yes" class="modal-crud" @ok="deleteUser">
      Are you sure you want to delete {{ state.selectedRow.name }}?
    </VaModal>

    <div style="display: flex; justify-content: flex-end; margin-bottom: 20px">
      <VaButtonGroup>
        <div class="flex">
          <VaButton icon="delete" @click="onDeleteItem" color="danger">
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
  name: "UsersManagement",
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

    const state = reactive({
      showEditModal: false,
      showDeleteConfirm: false, 
      selectedRow: {},
      page: 1,
      totalPages: 1,
      deleteSuccess: false,
    });


    const userStore = useUserStore();
    const token = userStore.token;

    const fetchData = async (page) => {
      try {
        const responseProducts = await fetch(`${config.APIEndpoint}/admin/users?page=${page}&limit=5`, {
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


    // Fetch data when the component is mounted
    onMounted(() => {
      fetchData(state.page);
    }
    );

    // Fetch data when the page number changes
    watch(() => state.page, fetchData);

    
    // Actions buttons



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

    const deleteUser = async () => {
      if (state.selectedRow) {
        const response = await fetch(`${config.APIEndpoint}/admin/users/${state.selectedRow.id}`, {
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
            field: 'avatar',
            width: 150,
            cellRenderer: (params) => {
                return `<img src="${params.value}" style="width: 40px; height: auto"/>`;
            }
        },
        { field: 'email', width: 250 },
        { field: 'name', width: 200 },
        { field: 'isAdmin', width: 100,
            cellRenderer: params => {
                const cellValue = params.value ? 'tick-in-circle' : 'cross-in-circle';
                console.log(cellValue)
                return `
                    <span style="display: flex; justify-content: center; height: 100%; align-items: center;">
                    <img
                        alt="${params.value}"
                        src="https://www.ag-grid.com/example-assets/icons/${cellValue}.png"
                        style="width: auto; height: auto;"
                    />
                    </span>
                `;
            }
         },
        { field: 'createdAt', valueFormatter: dateFormatter },
        { field: 'updatedAt', valueFormatter: dateFormatter },
        { field: 'address' },
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
      onDeleteItem,
      deleteUser,
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

