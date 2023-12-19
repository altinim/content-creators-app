// apiService.ts
import { getAll, get, create, update, remove } from "./api";

const PRODUCT_ENDPOINT = "products";

export const getAllProducts = async () => {
	return getAll(PRODUCT_ENDPOINT);
};

export const getProduct = async (productId: number) => {
	return get(PRODUCT_ENDPOINT, productId);
};


export const createProduct = async (productData: any) => {
	return create(PRODUCT_ENDPOINT, productData);
};

export const updateProduct = async (productId: number, productData: any) => {
	return update(PRODUCT_ENDPOINT, productId, productData);
};

export const deleteProduct = async (productId: number) => {
	return remove(PRODUCT_ENDPOINT, productId);
};
