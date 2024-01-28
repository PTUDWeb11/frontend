<script setup>
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
</script>

<template>
	<div class="product-card">
		<a :href="link">
			<Card class="w-[250px] h-[380px] mx-auto shadow-md p-2 text-card">
				<CardContent class="mx-auto p-0 h-[60%] aspect-square">
					<img
						class="h-full mx-auto object-scale-down"
						:src="product.images[0]"
						alt="Laptop"
					/>
				</CardContent>
				<CardHeader class="p-2 text-left h-[30%] text-foreground">
					<p class="p-0 m-0 font-semibold line-clamp-2 text-ellipsis">
						{{ product.name }}
					</p>
					<CardTitle class="text-primary">
						<p class="text-red-500 text-right p-0 m-0">{{ product.price }}$</p>
					</CardTitle>
				</CardHeader>
				<CardFooter class="p-2 h-[10%] text-foreground">
					<p v-if="product.quantity < 1" class="text-left">Out of stock</p>
					<p v-else class="text-left">Available now</p>
				</CardFooter>
			</Card>
		</a>
	</div>
</template>

<script>
export default {
	name: "ProductCard",
	components: {
		Card,
		CardHeader,
		CardTitle,
		CardContent,
		CardFooter,
	},
	props: {
		product: {
			type: Object,
			required: true,
		},
	},
	computed: {
		link() {
			if (this.product.mainCategory == null) {
				return `/product/${this.product.slug}`;
			}

			return `/${this.product.mainCategory.slug}/${this.product.slug}`;
		},
	},
};
</script>
