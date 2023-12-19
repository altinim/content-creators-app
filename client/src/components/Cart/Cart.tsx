import { getProduct } from "../../services/product";
import { getUsersCart } from "../../services/user";
import { getSessionStorageKey } from "../../utils/Session";
import Product from "../Product/Product";
import { ProductType } from "../Product/ProductType";
import { useEffect, useState } from "react";
type Props = {};

const Cart = (props: Props) => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const sumOfProducts = (): number => {
		let sum: number = 0;
		products.map((product) => {
			sum += product.price;
		});
		return sum;
	};
	const handleDelete = (productId: number) => {
		setProducts((prevProducts) =>
			prevProducts.filter((product) => product.id !== productId)
		);
	};
	const showAddToCart = false;
	
	useEffect(() => {
		const fetchData = async () => {
			const userId: number = Number(getSessionStorageKey("id"));
			const usersProductIds = await getUsersCart(userId);

			const productsPromises = usersProductIds.map((productId: number) =>
				getProduct(productId)
			);
			const productsData = await Promise.all(productsPromises);
			setProducts(productsData);
		};
		fetchData();
	}, []);

	return (
		<>
			<div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{products.map((product) => (
					<Product
						key={product.id}
						product={product}
						showAddToCart={showAddToCart}
						onDelete={handleDelete}
					/>
				))}
			</div>
			<div className="p-4 text-2xl ">
				Sum of products <b>${sumOfProducts().toFixed(2)}</b>
			</div>
		</>
	);
};

export default Cart;
