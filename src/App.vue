<script setup>
import { ref, provide, inject } from 'vue';
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';

// Create a reactive reference for the shared keyword
const sharedKeyword = inject('sharedKeyword', ref(''));


// Provide the sharedKeyword to be available in the component tree
provide('sharedKeyword', sharedKeyword);
</script>

<template>

  <div v-if="this.$route.meta.adminOnly">
    <RouterView />
  </div>
  <div v-else>
    <Header />
    <RouterView />
    <Toaster />
  </div>

</template>

<!-- Your existing style -->
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
