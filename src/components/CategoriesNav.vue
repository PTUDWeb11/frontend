<script setup>
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
</script>

<template>
	<div class="categories-nav flex flex-col items-start">
		<div class="flex flex-row items-center text-foreground">
			<h1 class="text-2xl font-semibold tracking-tight pr-4">Categories</h1>

			<div class="text-card-foreground">
				<Button variant="outline" size="icon" @click="prev">
					<ChevronLeft class="w-4 h-4" />
				</Button>
				<Button variant="outline" size="icon" @click="next">
					<ChevronRight class="w-4 h-4" />
				</Button>
			</div>
		</div>
		<Carousel class="w-full text-foreground" ref="carousel" :items-to-show="5">
			<Slide v-for="category in categories" :key="category.id">
				<CategoryCard class="carousel__item" :category="category" />
			</Slide>
		</Carousel>
	</div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import CategoryCard from "./CategoryCard.vue";
import { ref } from "vue";

const carousel = ref(null);

export default {
	name: "CategoriesNav",
	components: {
		Carousel,
		Slide,
		Button,
		CategoryCard,
		ChevronLeft,
		ChevronRight,
	},
	props: {
		categories: {
			type: Array,
			required: true,
		},
	},
	methods: {
		next() {
			carousel.value.next();
		},
		prev() {
			carousel.value.prev();
		},
	},
};
</script>
