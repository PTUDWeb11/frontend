<template>
  <div class="products-container">
    <ProductCard 
      v-for="product in products" 
      :key="product.id" 
      :product="product"
      class="product-item" 
    />
  </div>
</template>


<script>
import { inject, watch , ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';
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
    const route = useRoute();

    function fetchProductsByCategory(category) {
  
        const queryParams = new URLSearchParams({
            category: category,
            
        });

        fetch(`${config.APIEndpoint}/products?${queryParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            products.value = data.data;
            console.log(data.data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }


    

    const onPageChange = (newPage) => {
        currentPage.value = newPage;
        searchProducts(sharedKeyword.value);
    };

    const categoryId = route.params.category_id;

    onMounted(() => {
        fetchProductsByCategory(categoryId);
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
