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
        <div v-if="state.selectedRow && state.selectedRow.image" class="relative w-full md:w-1/2 lg:w-1/3 m-2 border-dashed border-2 border-gray-500">
            <VaImage :src="state.selectedRow.image" fit="fill" class="max-h-32 col-span-1 bg-gray-300"/>
        </div>
        <VaInput type="file" @change="handleFileUpload" label="Change image" multiple/>
        <div class="va-title text-[var(--va-primary)] mb-2" v-for="(fileName, index) in state.selectedFileNames" :key="index">
            {{ fileName }}
        </div>
        <VaInput v-model="state.selectedRow.name" label="Name" placeholder="Name" autofocus = true class="my-6" :rules="[(v) => !!v || 'Name is required']"/>

        <div v-if="!state.isEditing" class="va-title text-[var(--va-primary)] mb-2">
            Parent Category
        </div>
        <div v-if="!state.isEditing" class="mb-2">
            <VaDropdown :close-on-content-click="false" style="display: inline-block;">
                <template #anchor>
                    <VaButton icon="edit" preset="plain"></VaButton>
                </template>
                <VaDropdownContent>
                    <div class="flex flex-col">
                        <VaRadio
                            v-for="category in categories"
                            :key="category.id"
                            v-model="state.selectedRow.parentId"
                            :option="category.id"
                            :label="category.name"
                            name="parent-category"
                            class="mb-6"
                        />
                    </div>
                </VaDropdownContent>
            </VaDropdown>
            {{ categories.find(category => category.id === state.selectedRow.parentId)?.name || 'No parent category' }}
        </div>
    </VaModal>

    <VaModal v-model="state.showDeleteConfirm" ok-text="Yes" class="modal-crud" @ok="deleteProduct">
      Are you sure you want to delete {{ state.selectedRow.name }}?
    </VaModal>

    <div style="display: flex; justify-content: flex-end; margin-bottom: 20px">
      <VaButtonGroup>
        <div class="flex">
          <VaButton icon="add" class="mr-2" @click="onAddItem">
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
  name: "CategoriesManagement",
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
      isEditing: false,
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


    const fetchData = async (page = 1, limit = 10) => {
      try {
        const response = await fetch(`${config.APIEndpoint}/admin/categories?page=${page}&limit=10`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        rowData.value = data.data; 
        categories.value = data.data; 
        state.totalPages = data.meta._total_page;
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
    // Edit
    const onEditItem = () => {
      if (gridApi.value) {
        const selectedRows = gridApi.value.getSelectedRows();
        if (selectedRows[0]){
          state.selectedRow = selectedRows[0];
          state.selectedFileNames = [];
          state.showEditModal = true;  
          state.isEditing = true;
        }
      }
    };

    const onDeleteImage = (index) => {
      state.selectedRow.images.splice(index, 1);
    };


    const onApply = async () => {
      if (state.selectedRow) {
        let image = null;
        // If new images are uploaded, send them to the image upload API
        if (state.selectedRow.newImages) {
          const formData = new FormData();
          for (let i = 0; i < state.selectedRow.newImages.length; i++) {
            formData.append('files', state.selectedRow.newImages[i]);
          }
          const uploadResponse = await fetch(`https://images.phihungtf.me/upload`, {
            method: 'PUT',
            body: formData,
            headers: {
              'Authorization': `Bearer ${token}`,
              'X-API-KEY': 'my-super-strong-secret'
            }
          });

          if (uploadResponse.ok) {
            const uploadResult = await uploadResponse.json();
            for (const key in uploadResult) {
                // Ensure state.selectedRow.images is initialized
                if (!state.selectedRow.images) {
                    state.selectedRow.images = [];
                }
                state.selectedRow.images.push(uploadResult[key].path);
            }
          } else {
            console.error('Image upload failed');
          }
        }

        let response;
        if (state.selectedRow.id) {
           const categoryData = {
                name: state.selectedRow.name,
                image: state.selectedRow.images[0],
            };

          // If the category has an ID, update it
          response = await fetch(`${config.APIEndpoint}/admin/categories/${state.selectedRow.id}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
          });

          if (response.ok) {
            state.updateSuccess = true;
            // Refresh the grid
            fetchData(state.page)
          }
          else {
            state.updateFailed = true;
          }
        } else {
            // Send the updated category data to the update category API
            const categoryData = {
                parent_id: state.selectedRow.parentId,
                name: state.selectedRow.name,
                image: state.selectedRow.images[0],
            };

          // If the category doesn't have an ID, create a new one
          response = await fetch(`${config.APIEndpoint}/admin/categories`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
          });
          

         if (response.ok) {
            state.addSuccess = true;
            // Refresh the grid
            fetchData(state.page)
          }
          else {
            state.addFailed = true;
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
      state.isEditing = false;
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
        { field: 'name', width: 250, checkboxSelection: true, sort: 'desc', sortIndex: 0 },
        { field: 'createdAt', valueFormatter: dateFormatter },
        { field: 'updatedAt', valueFormatter: dateFormatter },
        {
            headerName: 'Image',
            field: 'image',
            width: 150,
            cellRenderer: (params) => {
                return `<img src="${params.value}" style="width: 40px; height: auto"/>`;
            }
        },
        {
            headerName: 'Parent Name',
            field: 'parent.name',
            width: 150,
        },
        {
            headerName: 'Parent Image',
            field: 'parent.image',
            width: 150,
            cellRenderer: (params) => {
                return `<img src="${params.value}" style="width: 40px; height: auto"/>`;
            }
        },
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

