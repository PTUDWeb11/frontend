import ProductCard from '@/components/ProductCard.vue';

<template>
  <Header />
  <Navbar />
  <div class="search-results">
    <h2>Kết quả tìm kiếm cho "{{ keyword }}"</h2>
    <p>Tìm thấy {{ totalResults }} sản phẩm</p>
    <div class="product-list">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <Pagination :total-items="totalResults" :items-per-page="itemsPerPage" @page-changed="onPageChange" />
  </div>
  <Footer />
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import Pagination from '@/components/Pagination.vue';

export default {
    name: 'SearchView',
  components: { ProductCard, Pagination },
  data() {
    return {
      keyword: '',
      products: [],
      totalResults: 0,
      itemsPerPage: 10,
      currentPage: 1
    };
  },
  methods: {
    onPageChange(newPage) {
      this.currentPage = newPage;
      // Gọi API để cập nhật `products` dựa trên `currentPage`
    }
  },
  // ...rest of the component
};
</script>

<style scoped>
/* CSS cho view này */
</style>



