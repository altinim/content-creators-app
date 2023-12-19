import { useEffect, useState } from "react";
import { ProductType } from "../components/Product/ProductType";
import { getAllProducts } from "../services/product";

const useProductData = () => {
	const [products, setProducts] = useState<ProductType[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const productsData = await getAllProducts();
				setProducts(productsData);
			} catch (error: any) {
				console.error("Error fetching product data:", error.message);
			}
		};

		fetchData();
	}, []);
	return products;
};

export default useProductData;
