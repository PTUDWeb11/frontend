<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const keyword = ref('');
const sharedKeyword = inject('sharedKeyword');
const router = useRouter();

const emitSearch = () => {
  if (sharedKeyword) {
    sharedKeyword.value = keyword.value;
    router.push({ name: 'Search', query: { q: sharedKeyword.value } });
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
