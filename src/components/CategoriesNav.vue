<template>
	<div class="categories-nav">
		<h1 class="text-left font-semibold text-xl pb-4 border-b border-gray-200">
			DANH MỤC
		</h1>
		<div
			id="category-cards"
			class="max-h-96 shadow flex flex-wrap flex-col content-start pt-px pl-px"
		>
			<CategoryCard
				v-for="category in categories"
				:key="category.id"
				:category="category"
			/>
		</div>
	</div>
</template>

<script>
import CategoryCard from "@/components/CategoryCard.vue";
import Category from "@/models/category.js";

export default {
	name: "CategoriesNav",
	components: {
		CategoryCard,
	},
	data() {
		return {
			categories: [
				new Category("1", null, "Điện thoại", "https://picsum.photos/200/300", [
					new Category(
						"1",
						null,
						"Điện thoại",
						"https://picsum.photos/200/300",
						[]
					),
					new Category(
						"2",
						null,
						"Máy tính bảng",
						"https://picsum.photos/200/300",
						[]
					),
					new Category(
						"3",
						null,
						"Laptop",
						"https://picsum.photos/200/300",
						[]
					),
				]),
				new Category(
					"2",
					null,
					"Máy tính bảng",
					"https://picsum.photos/200/300"
				),
				new Category("3", null, "Laptop", "https://picsum.photos/200/300", []),
				new Category(
					"4",
					null,
					"Phụ kiện",
					"https://picsum.photos/200/300",
					[]
				),
				new Category("5", null, "Đồng hồ", "https://picsum.photos/200/300", []),
				new Category("6", null, "Máy ảnh", "https://picsum.photos/200/300", []),
				new Category("7", null, "Tivi", "https://picsum.photos/200/300", []),
				new Category(
					"8",
					null,
					"Thiết bị âm thanh",
					"https://picsum.photos/200/300",
					[]
				),
				new Category(
					"9",
					null,
					"Điện gia dụng",
					"https://picsum.photos/200/300",
					[]
				),
				new Category("10", null, "Laptop", "https://picsum.photos/200/300", []),
				new Category(
					"11",
					null,
					"Phụ kiện",
					"https://picsum.photos/200/300",
					[]
				),
				new Category(
					"12",
					null,
					"Đồng hồ",
					"https://picsum.photos/200/300",
					[]
				),
				new Category(
					"13",
					null,
					"Điện thoại",
					"https://picsum.photos/200/300",
					[]
				),
				new Category(
					"2",
					null,
					"Máy tính bảng",
					"https://picsum.photos/200/300",
					[]
				),
				new Category("14", null, "Laptop", "https://picsum.photos/200/300", []),
				new Category(
					"15",
					null,
					"Phụ kiện",
					"https://picsum.photos/200/300",
					[]
				),
				new Category(
					"16",
					null,
					"Đồng hồ",
					"https://picsum.photos/200/300",
					[]
				),
				new Category(
					"17",
					null,
					"Máy ảnh",
					"https://picsum.photos/200/300",
					[]
				),
				new Category("18", null, "Tivi", "https://picsum.photos/200/300", []),
				new Category(
					"19",
					null,
					"Thiết bị âm thanh",
					"https://picsum.photos/200/300",
					[]
				),
				new Category(
					"20",
					null,
					"Điện gia dụng",
					"https://picsum.photos/200/300",
					[]
				),
				new Category("21", null, "Laptop", "https://picsum.photos/200/300", []),
				new Category(
					"22",
					null,
					"Phụ kiện",
					"https://picsum.photos/200/300",
					[]
				),
				new Category(
					"23",
					null,
					"Đồng hồ",
					"https://picsum.photos/200/300",
					[]
				),
			],
		};
	},
};
</script>
