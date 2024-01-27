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
			<Card class="w-[250px] h-[380px] mx-auto shadow-md p-2">
				<CardContent class="m-0 p-0 h-[60%]">
					<img
						class="h-full mx-auto"
						src="https://images.thinkgroup.vn/unsafe/460x460/filters:quality(100)/https://media-api-beta.thinkpro.vn/media/core/products/2022/7/27/ThinkBook-16p-NX-ARH-ThinkPro-01.jpg"
						alt="Laptop"
					/>
				</CardContent>
				<CardHeader class="p-2 text-left h-[30%]">
					<p class="p-0 m-0 font-semibold line-clamp-2 text-ellipsis">
						{{ product.name }}
					</p>
					<CardTitle>
						<p class="text-red-500 text-right p-0 m-0">{{ product.price }}$</p>
					</CardTitle>
				</CardHeader>
				<CardFooter class="p-2 h-[10%]">
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
