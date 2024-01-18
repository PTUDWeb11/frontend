/**
 * Represents a category.
 * @class
 */
export default class Category {
	/**
	 * Creates an instance of Category.
	 * @constructor
	 * @param {number} id - The ID of the category.
	 * @param {number|null} parent_id - The ID of the parent category. Null if no parent.
	 * @param {string} name - The name of the category.
	 * @param {string|null} image - The URL of the category image.
	 * @param {Category[]} subCategories - The subcategories of the category.
	 */

	constructor(id, parent_id, name, image, subCategories) {
		this.id = id;
		this.parent_id = parent_id;
		this.name = name;
		this.image = image;
		this.subCategories = subCategories;
	}
	save() {
		// TODO: save category to database
	}
}
