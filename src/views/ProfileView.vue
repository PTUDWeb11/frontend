<script setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const user = storeToRefs(userStore).user;
</script>

<template>
	<div class="profile">
		<h1>This is the user profile page of {{ user.name }} ({{ user.email }})</h1>
	</div>
</template>
