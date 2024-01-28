import CardItem from "./cartItem";
import Product from "./product";

export default {
	toCardItems(cart) {
		// cart is an array
		// remove item where product is null
		cart = cart.filter((item) => item.product !== null);
		console.log(cart);
		return cart.map(
			(item) =>
				new CardItem(item.id, Product.parse(item.product), item.quantity)
		);
	},
};
