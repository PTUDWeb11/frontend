/**
 * Represents a category.
 * @class
 */
export default class Product {
	/**
	 * Creates an instance of Category.
	 * @constructor
	 * @param {number} id - The ID of the category.
	 * @param {string} name - The name of the category.
	 * @param {number} price - The price of the category.
	 * @param {string} description - The description of the category.
	 * @param {number} quantity - The quantity of the category.
	 * @param {string[]} images - The images of the category.
	 * @param {Category[]} categories - The categories of the category.
	 */

	constructor(id, name, price, description, quantity, images, categories) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.description = description;
		this.quantity = quantity;
		this.images = images;
		this.categories = categories;
	}

	get image() {
		return this.images[0];
	}

	save() {
		// TODO: save category to database
	}

	static parse(obj) {
		return new Product(
			obj.id,
			obj.name,
			obj.price,
			obj.description,
			obj.quantity,
			obj.images,
			parseCategories(obj.categories)
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
			};
		}
	}

	static async fetchAll() {
		return fetch("https://poshop-ea528.ondigitalocean.app/products/main")
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
		return fetch(`https://poshop-ea528.ondigitalocean.app/products/${slug}`)
			.then((response) => response.json())

			.then((data) => data.data)
			.then((data) => {
				console.log(data);
				return Product.parse(data);
			});
	}
}
