<script setup>
import MainNav from './MainNav.vue';
import Search from './Search.vue';
import UserNav from './UserNav.vue';
import AuthNav from './AuthNav.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const isLogged = storeToRefs(userStore).isLoggedIn;
</script>

<template>
	<header class="hidden flex-col md:flex text-foreground">
		<div class="flex h-16 items-center px-4">
			<a class="relative z-20 flex items-center text-lg font-medium" href="/">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					class="mr-2 h-6 w-6">
					<path
						d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
				</svg>
				Poshop
			</a>
			<Search />
			<div class="ml-auto flex items-center space-x-4">
				<MainNav class="mx-6" />
				<UserNav v-if="isLogged" />
				<AuthNav v-else />
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Header',
};
</script>
