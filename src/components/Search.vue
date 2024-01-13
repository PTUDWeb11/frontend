<script setup>
import { Input } from './ui/input';
</script>

<template>
	<div>
		<Input
			type="search"
			placeholder="Search..."
			class="md:w-[100px] lg:w-[300px] m-3" />
	</div>
</template>

<script>
export default {
	name: 'Search',
};
</script>
