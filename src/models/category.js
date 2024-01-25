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

	static async fetchAll() {
		return fetch("https://poshop-ea528.ondigitalocean.app/categories/main")
			.then((response) => response.json())
			.then((data) => data.data)
			.then((data) => {
				console.log(data);
				const categories = [];
				data.forEach((item) => {
					categories.push(parse(item, data));
				});
				console.log(categories);
				return categories;
			});

		function parse(obj) {
			const subCategories = [];

			// Skip if the category is a subcategory
			if (obj.parentId === null) {
				obj.children.forEach((child) => {
					subCategories.push(parse(child));
				});
			}

			return new Category(
				obj.id,
				obj.parentId,
				obj.name,
				obj.image,
				subCategories
			);
		}
	}
}
