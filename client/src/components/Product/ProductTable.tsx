import Product from "./Product";
import useProductData from "../../hooks/useProductData";
type Props = {};
const ProductTable = (props: Props) => {
	const products = useProductData();

	return (
		<div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
			{products.map((product) => (
				<Product
					key={product.id}
					product={product}
					showAddToCart={true}
				/>
			))}
		</div>
	);
};

export default ProductTable;
