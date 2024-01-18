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

	static fetchAll() {
		return getRandomCategoryArray(24); // Mock data
	}
}

function getRandomCategory() {
	const id = Math.floor(Math.random() * 100).toString();
	const parent_id = null;
	const name = "Category " + id;
	const image = `https://picsum.photos/200/300?random=${id}`;
	const subCategories = [];

	const numSubCategories = Math.floor(Math.random() * 4 + 2);

	for (let i = 0; i < numSubCategories; i++) {
		const subCategoryId = id + "-" + i;
		const subCategoryName = "Subcategory " + subCategoryId;
		const subCategoryImage = `https://picsum.photos/200/300?random=${subCategoryId}`;

		subCategories.push(
			new Category(subCategoryId, id, subCategoryName, subCategoryImage, [])
		);
	}

	return new Category(id, parent_id, name, image, subCategories);
}

function getRandomCategoryArray(count) {
	const categories = [];
	for (let i = 0; i < count; i++) {
		categories.push(getRandomCategory());
	}
	return categories;
}
