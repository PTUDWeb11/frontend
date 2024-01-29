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
  emits: ['page-changed'],
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 3
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
.pagination {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.pagination button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  cursor: pointer;
}

.pagination button.active {
  border-color: #3490dc;
  background-color: #3490dc;
  color: white;
}

.pagination button:hover {
  border-color: #3490dc;
}
</style>