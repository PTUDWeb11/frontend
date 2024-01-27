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

	save() {
		// TODO: save category to database
	}

	static async fetchAll() {
		throw new Error("Not implemented");
	}
}
