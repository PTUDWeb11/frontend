import config from "@/config/index.js";
/**
 * Represents a category.
 * @class
 */
export default class Product {
	/**
	 * Creates an instance of Product.
	 * @constructor
	 * @param {number} id - The ID of the product.
	 * @param {string} name - The name of the product.
	 * @param {string} slug - The slug of the product.
	 * @param {number} price - The price of the product.
	 * @param {string} description - The description of the product.
	 * @param {number} quantity - The quantity of the product.
	 * @param {string[]} images - The images of the product.
	 * @param {Category[]} categories - The categories of the product.
	 */

	constructor(
		id,
		name,
		slug,
		price,
		description,
		quantity,
		images,
		categories
	) {
		this.id = id;
		this.name = name;
		this.slug = slug;
		this.price = price;
		this.description = description;
		this.quantity = quantity;
		this.images = images;
		this.categories = categories;
	}

	get image() {
		return this.images[0];
	}

	get mainCategory() {
		if (this.categories.length === 0) {
			return null;
		}
		return this.categories[0];
	}

	save() {
		// TODO: save category to database
	}

	static parse(obj) {
		return new Product(
			obj.id,
			obj.name,
			obj.slug,
			obj.price,
			obj.description,
			obj.quantity,
			obj.images,
			obj.categories ? parseCategories(obj.categories) : []
		);

		function parseCategories(categories) {
			const parsedCategories = [];
			categories.forEach((category) => {
				parsedCategories.push(parseCategory(category));
			});
			return parsedCategories;
		}

		function parseCategory(category) {
			return {
				id: category.id,
				name: category.name,
				slug: category.slug,
			};
		}
	}

	static async fetchAll() {
		return fetch(`${config.APIEndpoint}/products/main`)
			.then((response) => response.json())
			.then((data) => data.data)
			.then((data) => {
				const products = [];
				data.forEach((item) => {
					products.push(Product.parse(item));
				});
				return products;
			});
	}

	static async fetchRelatedProducts(productSlug) {
		var url = new URL(`${config.APIEndpoint}/products/${productSlug}/related`);

		return fetch(url.toString())
			.then((response) => response.json())
			.then((data) => data.data)
			.then((data) => {
				const products = [];
				data.forEach((item) => {
					products.push(Product.parse(item));
				});
				return products;
			});
	}

	static async getProductBySlug(slug) {
		return fetch(`${config.APIEndpoint}/products/${slug}`)
			.then((response) => response.json())

			.then((data) => data.data)
			.then((data) => {
				console.log(data);
				return Product.parse(data);
			});
	}
}
