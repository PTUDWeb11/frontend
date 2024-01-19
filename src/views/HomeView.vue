<template>
	<div class="home p-10">
		<CategoriesNav />
		<img
			src="images/happy_new_year_banner.jpg"
			alt="Happy New Year Banner"
			class="w-4/6 h-64 object-cover mx-auto my-3"
		/>
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
