export default class CartItem {
	constructor(id, product, quantity) {
		this.id = id;
		this.product = product;
		this.quantity = quantity;
	}

	get total() {
		return this.product.price * this.quantity;
	}
}
