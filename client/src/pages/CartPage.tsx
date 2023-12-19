import React from "react";
import Cart from "../components/Cart/Cart";
import Header from "../components/Header";

type Props = {};

const CartPage = (props: Props) => {
	return (
		<div>
			<Header />
			<Cart />
		</div>
	);
};

export default CartPage;
