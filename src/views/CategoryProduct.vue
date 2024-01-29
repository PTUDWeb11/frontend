<template>
<div class="dropdown-container">
    <h3>Category: {{ categoryId }}</h3>
    <button @click="togglePriceMenu">Chọn khoảng giá</button>

    <!-- Dropdown menu với các lựa chọn khoảng giá -->
    <div v-if="showPriceMenu" class="dropdown-menu">
      <label v-for="(range, index) in priceRanges" :key="index">
        <input type="radio" :value="range.value || 'all'" v-model="selectedPriceRange" @click="selectPriceRange(range.value || 'all')">
        {{ range.text }}
      </label>
    </div>
  </div>
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
import { inject, watch, ref, onMounted, onUnmounted } from 'vue';
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
    const showPriceMenu = ref(false);

    function fetchProductsByCategory(category, priceRange) {
      let queryParams = new URLSearchParams({
        category: category,
        page: currentPage.value,
        limit: itemsPerPage
      });

      // If a price range has been selected, add the min and max price to the query params
      if (priceRange && priceRange !== 'all') {
        const [minPrice, maxPrice] = priceRange.split('-');
        queryParams.append('min_price', minPrice);
        if (maxPrice) {
          queryParams.append('max_price', maxPrice);
        }
      }

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
      window.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      window.removeEventListener('click', handleClickOutside);
    });

    const togglePriceMenu = () => {
      showPriceMenu.value = !showPriceMenu.value;
    };

    function closePriceMenu() {
      showPriceMenu.value = false;
    };

    function handleClickOutside(event) {
      if (!event.target.closest('.dropdown-container')) {
        closePriceMenu();
      }
    };

    const selectedPriceRange = ref(null); 
    const selectPriceRange = (value) => {
      selectedPriceRange.value = value;
      fetchProductsByCategory(categoryId, value);
    };

    return {
      products,
      totalResults,
      currentPage,
      onPageChange,
      categoryId,
      showPriceMenu,
      togglePriceMenu,
      priceRanges: [
        { text: 'All', value: null },
        { text: 'Under $100', value: '0-100' },
        { text: '$100 - $1000', value: '100-1000' },
        { text: '$1000 - $2000', value: '1000-2000' },
        { text: '$2000 - $3000', value: '2000-3000' },
        { text: 'Over $3000', value: '3000-' },
      ],

      selectPriceRange,
      selectedPriceRange
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

.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 30%; 
  background-color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  padding: 10px;
  border-radius: 5px;
  z-index: 100; 
  width: max-content; 
}
</style>