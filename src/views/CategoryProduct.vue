<template>
<h3>Category: {{ categoryId }}</h3>
  <div>
    <div v-if="totalResults > 0">
      <p>Total Results: {{ totalResults }}</p>
      <div class="products-container">
        <div v-for="product in products" :key="product.id" class="product-item">
          <ProductCard :product="product" />
        </div>
      </div>
      
      <Pagination
      :totalItems="totalResults"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      :totalPage="totalPage" 
      @page-changed="onPageChange"
    />
    </div>
    <p v-else>No results found</p>
  </div>
</template>

<script>
import { inject, watch, ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import Pagination from '@/components/Pagination.vue';
import config from '@/config/index.js';
import Search from '@/components/Search.vue';

export default {
  name: 'CategoryProductView',
  components: { ProductCard, Pagination, Search },
  setup() {
    const sharedKeyword = inject('sharedKeyword');
    const products = ref([]);
    const totalResults = ref(0);
    const currentPage = ref(1);
    const itemsPerPage = 3;
    const totalPage = ref(0);
    const route = useRoute();

    function fetchProductsByCategory(category) {
      const queryParams = new URLSearchParams({
        category: category,
        page: currentPage.value,
        limit: itemsPerPage
      });

      fetch(`${config.APIEndpoint}/products?${queryParams}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          products.value = data.data;
          totalResults.value = data.meta._total;
          totalPage.value = data.meta._total_page;
          console.log(data.data);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }


    const categoryId = route.params.category_id;

    const onPageChange = (newPage) => {
        currentPage.value = newPage;
        fetchProductsByCategory(categoryId);
    };

    onMounted(() => {
      fetchProductsByCategory(categoryId);
    });

    return {
      products,
      totalResults,
      currentPage,
      onPageChange,
      categoryId
    };
  },
};
</script>


<style scoped>
.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; 
  justify-content: center; 
}

.product-item {
  flex: 0 1 calc(25% - 1rem);
}

/* Thêm responsive cho các màn hình nhỏ hơn */
@media (max-width: 600px) {
  .product-item {
    flex: 0 1 calc(50% - 1rem); 
  }
}

h3{
  text-transform: uppercase;
}
</style>