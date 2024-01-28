<template>
	<div class="large-category-card">
		<a href="#" class="flex flex-col justify-center items-center px-3 py-1">
			<div class="aspect-square w-[130px] h-[130px]">
				<div v-if="isSvg" class="svg-container h-full w-full object-scale-down">
					<object
						:data="category.image"
						type="image/svg+xml"
						width="100%"
						height="100%"
					></object>
				</div>
				<div v-else class="flex items-center h-full">
					<img
						class="object-cover"
						:src="category.image"
						:alt="category.name"
					/>
				</div>
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
	computed: {
		isSvg() {
			return this.category.image.endsWith(".svg");
		},
	},
};
</script>

<style scoped>
.image {
	max-width: 100%;
	max-height: 100%;
}

.svg-container > * {
	color: black;
}
</style>
