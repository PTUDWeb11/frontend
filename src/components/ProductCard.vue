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
		<a href="#">
			<Card class="w-[250px] h-[380px] mx-auto shadow-md p-2 text-card">
				<CardContent class="m-0 p-0 h-[60%]">
					<img class="h-full mx-auto" :src="product.images[0]" alt="Laptop" />
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
					<p v-if="product.quantity < 1" class="text-left">Hết hàng</p>
					<p v-else class="text-left">Sẵn hàng</p>
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
};
</script>
