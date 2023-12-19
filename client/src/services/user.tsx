// apiService.ts
import { getAll, get, create, update, remove, getUserByEmail } from "./api";

const USER_ENDPOINT = "api/authorization/Registration";

export const getAllUsers = async () => {
	return getAll(USER_ENDPOINT);
};

export const getUser = async (userId: number) => {
	return get(USER_ENDPOINT, userId);
};
export const createUser = async (userData: any) => {
	return create(USER_ENDPOINT, userData);
};

export const updateUser = async (userId: number, userData: any) => {
	return update(USER_ENDPOINT, userId, userData);
};

export const deleteUser = async (userId: number) => {
	return remove(USER_ENDPOINT, userId);
};
export const associateProductWithUser = async (
	userId: number,
	productId: number
) => {
	const user = await get(USER_ENDPOINT, userId);
	if (!user.productsIds) {
		user.productsIds = [];
	}
	user.productsIds.push(productId);

	return update(USER_ENDPOINT, userId, user);
};

export const getUsersCart = async (userId: number) => {
	const user = await get(USER_ENDPOINT, userId);

	if (!user.productsIds) {
		return [];
	}
	return user.productsIds;
};

export const getUsersCartCount = async (userId: number) => {
	const user = await get(USER_ENDPOINT, userId);

	if (!user.productsIds) {
		return 0;
	}
	return user.productsIds.length;
};

export const removeProductFromUser = async (
	userId: number,
	productId: number
) => {
	const user = await get(USER_ENDPOINT, userId);

	user.productsIds = user.productsIds.filter(
		(id: number) => id !== productId
	);

	await update(USER_ENDPOINT, userId, user);
};
