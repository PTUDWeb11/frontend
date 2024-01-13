<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
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

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
