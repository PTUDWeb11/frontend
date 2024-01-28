<template>
  <div>
    <div v-if="totalResults > 0">
      <p>Total Results: {{ totalResults }}</p>
      <div class="products-container">
        <div v-for="product in products" :key="product.id" class="product-item">
          <ProductCard :product="product" />
        </div>
      </div>
      <!-- Sử dụng component Pagination và truyền props tương ứng -->
      <Pagination
        :totalItems="totalResults"
        :itemsPerPage="itemsPerPage"
        :currentPage="currentPage"
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
    const itemsPerPage = 8;
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
    };
  },
};
</script>


<style scoped>
.products-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem; 
}

.product-item {
  width: calc(25% - 2rem); 
  margin: 0.5rem; 
}
</style>