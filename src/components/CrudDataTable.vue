<template>
  <div>
    <VaButton @click="showModal = !showModal"> Edit </VaButton>
    <VaModal v-model="showModal" message="Classic modal overlay which represents a dialog box or other interactive component, such as a dismissible alert, sub-window, etc." ok-text="Apply" blur />
    <ag-grid-vue 
      style="height: 520px" 
      :class="themeClass" 
      :columnDefs="colDefs" 
      @grid-ready="onGridReady" 
      :rowData="rowData" 
      :defaultColDef="defaultColDef" 
      :pagination="true" 
      :rowSelection="'multiple'"
      @cell-value-changed="onCellValueChanged" 
      @selection-changed="onSelectionChanged" >
    </ag-grid-vue>
  </div>
</template>

<script>
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridVue } from 'ag-grid-vue3';
import { onMounted, ref } from 'vue';

export default ({
  name: "CrudDataTable",
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

    // Fetch data when the component is mounted
    onMounted(async () => {
      try {
        const response = await fetch('https://poshop-ea528.ondigitalocean.app/products/main');
        const data = await response.json();
        rowData.value = data.data;
        console.log(rowData.value);
      }
      catch (e) {
        console.log('error');
      }
    });

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
      editable: true,
    });

    const onGridReady = (params) => {
      gridApi.value = params.api;
      console.log('GridReady');
    };

    const onSelectionChanged = () => {
      if (gridApi.value) {
        const selectedRows = gridApi.value.getSelectedRows();
        console.log('click onSelectionChanged');
        console.log(selectedRows[0].name);
      }
    };

    return {
      rowData,
      gridApi,
      colDefs,
      defaultColDef,
      onGridReady,
      onSelectionChanged,
      themeClass: "ag-theme-quartz",
    };
  },
  data() {
    return {
      showModal: false,
    };
  },
});
</script>
