<script setup>
import { ref, inject } from 'vue';

const keyword = ref('');
const sharedKeyword = inject('sharedKeyword');

const emitSearch = () => {
  if (sharedKeyword) {
    sharedKeyword.value = keyword.value;
  }
};

</script>

<template>
  <div>
    <input
      v-model="keyword"
      @keyup.enter="emitSearch"
      type="search"
      placeholder="Search..."
      class="md:w-[100px] lg:w-[300px] m-3"
    />
  </div>
</template>
