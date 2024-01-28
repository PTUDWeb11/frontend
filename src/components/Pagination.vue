<template>
  <div class="pagination">
    <button
      v-for="page in totalPages"
      :key="page"
      :class="{ active: currentPage === page }"
      @click="emitPageChange(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  methods: {
    emitPageChange(page) {
      this.$emit('page-changed', page);
    }
  }
};
</script>

<style scoped>
/* Thêm CSS cho pagination ở đây */
.pagination button.active {
  /* Style cho nút trang hiện tại */
}
</style>
