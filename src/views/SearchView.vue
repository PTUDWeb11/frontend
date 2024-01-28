<template>
  <div>
    <div v-if="totalResults > 0">
      <p>Total Results: {{ totalResults }}</p>
      <div class="products-container">
        <div v-for="product in products" :key="product.id" class="product-item">
          <ProductCard :product="product" />
        </div>
      </div>
      <!-- Hiển thị phân trang-->
      <Pagination
      v-if="totalResults > 0"
      :totalItems="totalResults"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      @page-changed="onPageChange"
    />
      
    </div>
    <!-- Hiển thị thông báo nếu không có kết quả -->
    <p v-else>No results found</p>
  </div>
</template>

<script>
import { inject, watch , ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import Pagination from '@/components/Pagination.vue';
import config from '@/config/index.js';
import Search from '@/components/Search.vue';

export default {
  name: 'SearchView',
  components: { ProductCard, Pagination, Search },
  setup() {
    const sharedKeyword = inject('sharedKeyword');
    const products = ref([]);
    const totalResults = ref(0);
    const currentPage = ref(1);
    const itemsPerPage = 3;

    const searchProducts = (keyword) => {
      const apiUrl = `${config.APIEndpoint}/products/search`;
      const params = new URLSearchParams({
        q: keyword,
        page: currentPage.value,
        limit: itemsPerPage
      });
      

      fetch(`${apiUrl}?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data.data.length);
        products.value = data.data; 
        totalResults.value = data.meta._total;
        
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    };

    const onPageChange = (newPage) => {
        currentPage.value = newPage;
        searchProducts(sharedKeyword.value);
    };

    watch(sharedKeyword, (newKeyword) => {
      if (newKeyword !== '') {
        searchProducts(newKeyword);
      }
    });

    return {
      products, 
      totalResults,
      currentPage,
      onPageChange,
    };
  }
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
</style>
