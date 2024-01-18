<template>
	<div class="home p-10">
		<CategoriesNav />
	</div>
</template>

<script>
// @ is an alias to /src
import CategoriesNav from "@/components/CategoriesNav.vue";

export default {
	name: "HomeView",
	components: {
		CategoriesNav,
	},
};
</script>
