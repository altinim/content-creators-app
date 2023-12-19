// Product.tsx
import { getSessionStorageKey } from "../../utils/Session";
import { associateProductWithUser } from "../../services/user";
import { ProductType } from "./ProductType";
import { removeProductFromUser } from "../../services/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ProductProps {
	product: ProductType;
	showAddToCart: boolean;
	onDelete?: (userId: number) => void;
}
const Product: React.FC<ProductProps> = ({
	product,
	showAddToCart,
	onDelete,
}) => {
	const userId: number = Number(getSessionStorageKey("id"));

	const handleAddToCart = async () => {
		await associateProductWithUser(userId, product.id);
		addToCartAlert();
	};
	const handleRemoveItemFromCart = async () => {
		await removeProductFromUser(userId, product.id);
		if (onDelete) onDelete(product.id);
		removeFromCartAlert();
	};

	const addToCartAlert = () => {
		toast.info("Added to the cart", {
			position: "top-center",
			autoClose: 500,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};
	const removeFromCartAlert = () => {
		toast.info("Removed from  the cart", {
			position: "top-center",
			autoClose: 500,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};
	return (
		<div className="bg-white p-4 rounded-md shadow-xl  ring-1 ring-blue-400 flex flex-col justify-between ">
			<ToastContainer />
			<h1 className="text-gray-800 text-2xl py-2 font-bold ">
				{product.name}
			</h1>
			<p className="text-lg text-gray-800 font-bold">${product.price}</p>
			<p className="text-gray-500">{product.category}</p>
			{!showAddToCart ? (
				<button
					className=" bg-red-600 rounded-md font-semibold text-white my-2 p-2 hover:bg-red-500 "
					onClick={handleRemoveItemFromCart}
				>
					Remove from Cart
				</button>
			) : (
				<button
					className=" bg-blue-700 rounded-md font-semibold text-white my-2 p-2 hover:bg-blue-600"
					onClick={handleAddToCart}
				>
					Add to cart
				</button>
			)}
		</div>
	);
};

export default Product;
