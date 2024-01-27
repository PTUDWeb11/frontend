<template>
	<div class="large-category-card">
		<a href="#" class="flex flex-col justify-center px-3 py-1">
			<div class="aspect-square w-[130px] h-[130px]">
				<img
					class="image h-full w-full object-scale-down"
					:src="category.image"
				/>
			</div>

			<span class="block mt-2 text-center font-semibold">
				{{ category.name }}
			</span>
		</a>
	</div>
</template>

<script>
export default {
	name: "LargeCategoryCard",
	components: {},
	props: {
		category: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped>
.image {
	max-width: 100%;
	max-height: 100%;
}
</style>
